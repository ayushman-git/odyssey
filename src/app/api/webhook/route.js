// Webhook handler for email events (bounces, deliveries, etc.)
import { NextResponse } from "next/server";
import { supabase } from "@/lib/supabase";

export async function POST(request) {
  try {
    const payload = await request.json();

    // Log the payload for debugging
    console.log("Webhook payload:", JSON.stringify(payload, null, 2));

    // Handle email bounce events
    if (payload.type === "email.bounced") {
      const { data: emailData } = payload;
      const bounceInfo = emailData.bounce;
      const recipientEmail = emailData.to?.[0]; // Get the first (and usually only) recipient

      if (!recipientEmail) {
        console.error("No recipient email found in bounce payload");
        return NextResponse.json(
          { error: "No recipient email found" },
          { status: 400 }
        );
      }

      // Create detailed bounce reason
      if (bounceInfo) {
        const bounceType = bounceInfo.type || "unknown";
        const bounceSubType = bounceInfo.subType || "unknown";
        const bounceMessage = bounceInfo.message || "No message provided";
      }

      // Update the subscriber record to mark as bounced
      const { data, error } = await supabase
        .from("newsletter_subscribers")
        .update({
          bounced: true,
          bounced_at: new Date(payload.created_at || new Date()).toISOString(),
        })
        .eq("email", recipientEmail.toLowerCase().trim())
        .select();

      if (error) {
        console.error("Error updating bounced subscriber:", error);
        return NextResponse.json(
          { error: "Failed to update subscriber bounce status" },
          { status: 500 }
        );
      }

      if (data && data.length > 0) {
        return NextResponse.json({
          message: "Bounce status updated successfully",
          email: recipientEmail,
          updated: data[0],
        });
      } else {
        console.warn(
          `Subscriber not found for bounced email: ${recipientEmail}`
        );
        return NextResponse.json(
          {
            message: "Subscriber not found",
            email: recipientEmail,
          },
          { status: 404 }
        );
      }
    }

    return NextResponse.json({
      message: "Webhook received",
      type: payload.type,
    });
  } catch (error) {
    console.error("Webhook processing error:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}
