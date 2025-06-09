import { Resend } from 'resend';

const resend = new Resend(process.env.RESEND_KEY);

export const sendWelcomeEmail = async (email) => {
  try {
    const { data, error } = await resend.emails.send({
      from: 'Odyssey Newsletter <newsletter@me.ayushman.dev>',
      to: [email],
      subject: 'Welcome to Odyssey Newsletter! 🚀',
      html: `
        <!DOCTYPE html>
        <html lang="en">
        <head>
          <meta charset="UTF-8">
          <meta name="viewport" content="width=device-width, initial-scale=1.0">
          <title>Welcome to Odyssey Newsletter</title>
        </head>
        <body style="margin: 0; padding: 0; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif; background-color: #f8fafc;">
          <div style="max-width: 600px; margin: 0 auto; padding: 40px 20px;">
            
            <!-- Header -->
            <div style="text-align: center; margin-bottom: 40px;">
              <h1 style="color: #1e293b; font-size: 28px; font-weight: 700; margin: 0; letter-spacing: -0.025em;">
                Welcome to Odyssey! 🌟
              </h1>
              <p style="color: #64748b; font-size: 16px; margin: 8px 0 0 0;">
                Thank you for subscribing to our newsletter
              </p>
            </div>

            <!-- Main Content -->
            <div style="background: white; border-radius: 12px; padding: 32px; box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1); margin-bottom: 32px;">
              <p style="color: #334155; font-size: 16px; line-height: 1.6; margin: 0 0 20px 0;">
                Hi there! 👋
              </p>
              
              <p style="color: #334155; font-size: 16px; line-height: 1.6; margin: 0 0 20px 0;">
                Welcome to <strong>Odyssey Newsletter</strong>! I'm thrilled to have you join our community of curious minds and tech enthusiasts.
              </p>
              
              <p style="color: #334155; font-size: 16px; line-height: 1.6; margin: 0 0 20px 0;">
                Here's what you can expect from this newsletter:
              </p>
              
              <ul style="color: #334155; font-size: 16px; line-height: 1.6; margin: 0 0 20px 0; padding-left: 20px;">
                <li style="margin-bottom: 8px;">🚀 <strong>Latest Tech Insights:</strong> Deep dives into cutting-edge technologies</li>
                <li style="margin-bottom: 8px;">🧠 <strong>Thoughtful Analysis:</strong> Perspectives on space, science, and innovation</li>
                <li style="margin-bottom: 8px;">💻 <strong>Development Stories:</strong> Behind-the-scenes of exciting projects</li>
                <li style="margin-bottom: 8px;">🌌 <strong>Cosmic Curiosities:</strong> Exploring the wonders of our universe</li>
              </ul>
              
              <p style="color: #334155; font-size: 16px; line-height: 1.6; margin: 0 0 20px 0;">
                I'll be sharing new articles, insights, and discoveries that I think you'll find fascinating. No spam, just quality content delivered to your inbox.
              </p>
              
              <div style="text-align: center; margin: 32px 0;">
                <a href="https://ayushman.dev/blog" 
                   style="display: inline-block; background-color: #3b82f6; color: white; text-decoration: none; padding: 12px 24px; border-radius: 8px; font-weight: 600; font-size: 16px;">
                  Explore Latest Articles
                </a>
              </div>
            </div>

            <!-- Footer -->
            <div style="text-align: center; color: #64748b; font-size: 14px;">
              <p style="margin: 0 0 8px 0;">
                Follow the journey at <a href="https://ayushman.dev" style="color: #3b82f6; text-decoration: none;">ayushman.dev</a>
              </p>
              <p style="margin: 0; font-size: 12px;">
                You're receiving this because you subscribed to Odyssey Newsletter.<br>
                If you no longer wish to receive these emails, you can <a href="#" style="color: #64748b;">unsubscribe here</a>.
              </p>
            </div>

          </div>
        </body>
        </html>
      `,
      text: `
        Welcome to Odyssey Newsletter! 🌟

        Hi there! 👋

        Welcome to Odyssey Newsletter! I'm thrilled to have you join our community of curious minds and tech enthusiasts.

        Here's what you can expect from this newsletter:

        🚀 Latest Tech Insights: Deep dives into cutting-edge technologies
        🧠 Thoughtful Analysis: Perspectives on space, science, and innovation  
        💻 Development Stories: Behind-the-scenes of exciting projects
        🌌 Cosmic Curiosities: Exploring the wonders of our universe

        I'll be sharing new articles, insights, and discoveries that I think you'll find fascinating. No spam, just quality content delivered to your inbox.

        Explore latest articles: https://ayushman.dev/blog

        Follow the journey at https://ayushman.dev

        You're receiving this because you subscribed to Odyssey Newsletter.
      `
    });

    if (error) {
      console.error('Resend error:', error);
      return { success: false, error };
    }

    return { success: true, data };
  } catch (error) {
    console.error('Email sending error:', error);
    return { success: false, error: error.message };
  }
};
