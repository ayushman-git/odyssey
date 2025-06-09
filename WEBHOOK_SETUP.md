# Email Webhook Setup

This webhook handler processes email events from Resend, particularly bounce notifications.

## Setup Instructions

### 1. Database Setup
Run the SQL migration in Supabase:
```sql
-- See: /database_migrations/add_bounce_columns.sql
ALTER TABLE newsletter_subscribers 
ADD COLUMN IF NOT EXISTS bounced BOOLEAN DEFAULT FALSE,
ADD COLUMN IF NOT EXISTS bounced_at TIMESTAMPTZ,
ADD COLUMN IF NOT EXISTS bounce_reason TEXT;
```

### 2. Resend Webhook Configuration
In your Resend dashboard:
1. Go to Webhooks section
2. Add a new webhook endpoint: `https://yourdomain.com/api/webhook`
3. Select these events:
   - `email.bounced`
   - `email.delivered` (optional)
   - `email.opened` (optional)

### 3. Webhook Payload Structure

The webhook receives payloads like:
```json
{
  "created_at": "2025-06-09T12:55:14.981Z",
  "data": {
    "bounce": {
      "message": "The recipient's email provider sent a general bounce message...",
      "subType": "General",
      "type": "Transient"
    },
    "created_at": "2025-06-09 12:55:13.463863+00",
    "email_id": "3cf1fdbf-a05f-446a-b85c-13e78b8ea2a3",
    "from": "Odyssey Newsletter <newsletter@me.ayushman.dev>",
    "subject": "Welcome to Odyssey Newsletter! 🚀",
    "to": ["user@example.com"]
  },
  "type": "email.bounced"
}
```

### 4. What Happens When Email Bounces

1. Webhook receives the bounce notification
2. Finds the subscriber by email address
3. Updates the database record:
   - `bounced = true`
   - `bounced_at = bounce timestamp`

### 5. Handling Bounced Emails

You can query bounced emails:
```sql
SELECT * FROM newsletter_subscribers WHERE bounced = true;
```

Consider implementing:
- Automatic retry logic for transient bounces
- Permanent removal for hard bounces
- Email validation improvements

## Security

- The webhook endpoint is publicly accessible
- Consider adding webhook signature verification for production
- Monitor webhook logs for unusual activity

## Monitoring

Check logs for:
- Successful bounce processing
- Failed database updates
- Unknown email addresses in bounces
