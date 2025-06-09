// Email template with a personal, letter-like welcome message
export const generateWelcomeEmailTemplate = (articles = []) => {
  const baseUrl = 'https://ayushman.dev';

  return {
    html: `
      <!DOCTYPE html>
      <html lang="en">
      <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>Welcome to Odyssey Newsletter</title>
        <style>
          body, table, td, p, a, li { font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif; }
          @media only screen and (max-width: 600px) {
            .mobile-padding { padding: 20px 16px !important; }
            .mobile-title { font-size: 32px !important; }
            .mobile-article-title { font-size: 20px !important; }
          }
        </style>
      </head>
      <body style="margin: 0; padding: 0; background-color: #f8fafc; line-height: 1.6;">
        
        <!-- Main Container -->
        <div style="padding: 40px 20px;">
          <div style="max-width: 600px; margin: 0 auto; background: white;">
            
            <!-- Header -->
            <div style="text-align: center; padding: 40px 20px;">
              <div style="margin-bottom: 16px; font-size: 12px; color: #64748b; text-transform: uppercase; letter-spacing: 0.1em;">
                VOL. I — ${new Date().getFullYear()}
              </div>
              <h1 style="margin: 0 0 16px 0; font-size: 48px; font-weight: 300; color: #000; letter-spacing: -0.025em;" class="mobile-title">
                ODYSSEY
              </h1>
              <p style="margin: 0; font-size: 14px; color: #64748b; text-transform: uppercase; letter-spacing: 0.2em;">
                A Journal of Ideas
              </p>
            </div>

            <!-- Welcome Message -->
            <div style="text-align: center; padding: 0 20px 40px 20px;">
              <h2 style="margin: 0 0 8px 0; font-size: 28px; font-weight: 700; color: #1e293b;" class="mobile-title">
                Welcome to Odyssey! 🌟
              </h2>
              <p style="margin: 0; font-size: 16px; color: #64748b;">
                Thank you for subscribing to my newsletter
              </p>
            </div>

            <!-- Main Content -->
            <div style="border: 1px solid #e2e8f0; padding: 40px 30px; margin: 0 20px 40px 20px;" class="mobile-padding">
              <p style="color: #334155; font-size: 17px; line-height: 1.7; margin: 0 0 24px 0;">
                Hey there,
              </p>
              
              <p style="color: #334155; font-size: 17px; line-height: 1.7; margin: 0 0 24px 0;">
                Thank you so much for subscribing — it truly means a lot to me.
              </p>
              
              <p style="color: #334155; font-size: 17px; line-height: 1.7; margin: 0 0 24px 0;">
                Every now and then (just once every few months), I send out something special — deep dives into topics I've been quietly obsessing over: from the wonders of the cosmos to curious bits of tech, and books that leave a mark.
              </p>
              
              <p style="color: #334155; font-size: 17px; line-height: 1.7; margin: 0 0 24px 0;">
                Each article is crafted with weeks of research and a whole lot of care. I try to write the way I think — slow, curious, and with an eye for the small details that often get overlooked.
              </p>
              
              <p style="color: #334155; font-size: 17px; line-height: 1.7; margin: 0 0 40px 0;">
                I hope these pieces add a little wonder to your day, or at least spark a new question or two. I'm really grateful to have you here.
              </p>
              
              <!-- Signature -->
              <div style="margin: 40px 0 32px 0;">
                <p style="color: #334155; font-size: 17px; line-height: 1.7; margin: 0 0 8px 0;">
                  Warmly,<br>
                  <strong>Ayushman</strong>
                </p>
                <p style="color: #64748b; font-size: 15px; font-style: italic; margin: 0;">
                  writing from the crossroads of code, stars, and stories.
                </p>
              </div>
              
              <!-- CTA Button -->
              <div style="text-align: center; margin: 32px 0 0 0;">
                <a href="${baseUrl}/blog" 
                   style="display: inline-block; background-color: #000; color: white; text-decoration: none; padding: 12px 24px; font-weight: 500; font-size: 14px; text-transform: uppercase; letter-spacing: 0.1em;">
                  Explore the Journal
                </a>
              </div>
            </div>

            <!-- Footer -->
            <div style="text-align: center; color: #64748b; font-size: 14px; padding: 0 20px 40px 20px;">
              <div style="width: 80px; height: 1px; background: #d1d5db; margin: 0 auto 24px auto;"></div>
              
              <p style="margin: 0 0 16px 0;">
                Follow the journey at <a href="${baseUrl}/blog" style="color: #3b82f6; text-decoration: none; font-weight: 500;">ayushman.dev/blog</a>
              </p>
              <p style="margin: 0; font-size: 12px; color: #9ca3af;">
                You're receiving this because you subscribed to Odyssey Newsletter.<br>
                If you no longer wish to receive these emails, you can <a href="#" style="color: #9ca3af; text-decoration: underline;">unsubscribe here</a>.
              </p>
            </div>

          </div>
        </div>
      </body>
      </html>
    `,
    
    text: `
      ODYSSEY - A Journal of Ideas
      VOL. I — ${new Date().getFullYear()}

      Welcome to Odyssey Newsletter! 🌟

      Hey there, 👋🏻

      Thank you so much for subscribing — it truly means a lot to me. 🌿

      Every now and then (just once every few months), I send out something special — deep dives into topics I've been quietly obsessing over: from the wonders of the cosmos to curious bits of tech, and books that leave a mark.

      Each article is crafted with weeks of research and a whole lot of care. I try to write the way I think — slow, curious, and with an eye for the small details that often get overlooked.

      I hope these pieces add a little wonder to your day, or at least spark a new question or two. I'm really grateful to have you here.

      Warmly,
      Ayushman
      writing from the crossroads of code, stars, and stories. ✨

      Explore the journal: ${baseUrl}/blog

      Follow the journey at ${baseUrl}

      You're receiving this because you subscribed to Odyssey Newsletter.
    `
  };
};
