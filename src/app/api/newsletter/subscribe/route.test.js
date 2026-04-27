import { describe, it, expect, vi, beforeEach } from "vitest";
import { POST } from "./route.js";

const insertSelect = vi.fn();
const checkSingle = vi.fn();

vi.mock("@/lib/supabase", () => ({
  getSupabaseAdminClient: () => ({
    from: () => ({
      select: () => ({
        eq: () => ({
          single: () => checkSingle(),
        }),
      }),
      insert: () => ({
        select: () => insertSelect(),
      }),
    }),
  }),
}));

vi.mock("@/lib/email", () => ({
  sendWelcomeEmail: vi.fn().mockResolvedValue({
    success: true,
    articlesIncluded: 0,
    emailGenerated: true,
  }),
}));

function jsonRequest(body, headers = {}) {
  return new Request("https://example.com/api/newsletter/subscribe", {
    method: "POST",
    headers: {
      "content-type": "application/json",
      ...headers,
    },
    body: JSON.stringify(body),
  });
}

describe("POST /api/newsletter/subscribe", () => {
  beforeEach(() => {
    checkSingle.mockReset();
    insertSelect.mockReset();
  });

  it("rejects invalid email with 400", async () => {
    const res = await POST(jsonRequest({ email: "not-an-email" }));
    expect(res.status).toBe(400);
    const data = await res.json();
    expect(data.error).toMatch(/valid email/i);
  });

  it("subscribes new email: insert + 201", async () => {
    checkSingle.mockResolvedValue({
      data: null,
      error: { code: "PGRST116" },
    });
    insertSelect.mockResolvedValue({
      data: [{ email: "new@example.com" }],
      error: null,
    });

    const res = await POST(
      jsonRequest(
        { email: "new@example.com", userAgent: "vitest" },
        { referer: "https://example.com/blog/" }
      )
    );
    expect(res.status).toBe(201);
    const data = await res.json();
    expect(data.message).toMatch(/subscribed/i);
    expect(data.subscriber.email).toBe("new@example.com");
  });

  it("returns 409 when already subscribed and not bounced", async () => {
    checkSingle.mockResolvedValue({
      data: { email: "taken@example.com", bounced: false, bounced_at: null },
      error: null,
    });

    const res = await POST(jsonRequest({ email: "taken@example.com" }));
    expect(res.status).toBe(409);
    const data = await res.json();
    expect(data).toMatchObject({ type: "duplicate" });
  });
});
