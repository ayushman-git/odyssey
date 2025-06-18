// Email template for announcing a new article publication
export const generateArticleAnnouncementTemplate = (article) => {
  const baseUrl = 'https://ayushman.dev';
  const articleUrl = `${baseUrl}/blog/${article.slug}`;
  
  // Format the publish date nicely
  const formatDate = (dateString) => {
    if (!dateString) return '';
    try {
      const date = new Date(dateString.split("-").reverse().join("-"));
      return date.toLocaleDateString('en-US', { 
        year: 'numeric', 
        month: 'long', 
        day: 'numeric' 
      });
    } catch (error) {
      return dateString;
    }
  };

  const publishDate = formatDate(article.date);
  const currentYear = new Date().getFullYear();

  return {
    html: `
      <!DOCTYPE html>
      <html lang="en">
      <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>New Article Published: ${article.title}</title>
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
                VOL. I — ${currentYear}
              </div>
              <h1 style="margin: 0 0 16px 0; font-size: 48px; font-weight: 300; color: #000; letter-spacing: -0.025em;" class="mobile-title">
                ODYSSEY
              </h1>
              <p style="margin: 0; font-size: 14px; color: #64748b; text-transform: uppercase; letter-spacing: 0.2em;">
                A Journal of Ideas
              </p>
            </div>

            <!-- Announcement Banner -->
            <div style="background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); color: white; text-align: center; padding: 24px 20px; margin: 0 20px 40px 20px;">
              <h2 style="margin: 0 0 8px 0; font-size: 24px; font-weight: 600;">
                📝 New Article Published
              </h2>
              <p style="margin: 0; font-size: 16px; opacity: 0.9;">
                ${publishDate}
              </p>
            </div>

            <!-- Article Feature -->
            <div style="border: 1px solid #e2e8f0; padding: 40px 30px; margin: 0 20px 40px 20px;" class="mobile-padding">
              <h3 style="margin: 0 0 16px 0; font-size: 28px; font-weight: 700; color: #1e293b; line-height: 1.3;" class="mobile-article-title">
                ${article.title}
              </h3>
              
              ${article.description ? `
              <p style="color: #64748b; font-size: 17px; line-height: 1.6; margin: 0 0 32px 0;">
                ${article.description}
              </p>
              ` : ''}
              
              ${article.type ? `
              <div style="margin: 0 0 24px 0;">
                <span style="background: #f1f5f9; color: #334155; padding: 4px 12px; font-size: 12px; text-transform: uppercase; letter-spacing: 0.1em; font-weight: 500;">
                  ${article.type}
                </span>
              </div>
              ` : ''}

              <!-- Personal Note -->
              <div style="background: #f8fafc; padding: 24px; margin: 32px 0; border-left: 4px solid #3b82f6;">
                <p style="color: #334155; font-size: 16px; line-height: 1.6; margin: 0 0 16px 0; font-style: italic;">
                  "I've been working on this piece for a while now, diving deep into the nuances and connections that fascinate me. I hope it sparks your curiosity as much as it did mine while writing it."
                </p>
                <p style="color: #64748b; font-size: 14px; margin: 0;">
                  — Ayushman
                </p>
              </div>

              <!-- CTA Button -->
              <div style="text-align: center; margin: 32px 0 0 0;">
                <a href="${articleUrl}" 
                   style="display: inline-block; background-color: #000; color: white; text-decoration: none; padding: 16px 32px; font-weight: 500; font-size: 16px; text-transform: uppercase; letter-spacing: 0.1em;">
                  Read the Article
                </a>
              </div>
            </div>

            <!-- Footer -->
            <div style="text-align: center; color: #64748b; font-size: 14px; padding: 0 20px 40px 20px;">
              <div style="width: 80px; height: 1px; background: #d1d5db; margin: 0 auto 24px auto;"></div>
              
              <p style="margin: 0 0 16px 0;">
                Continue exploring at <a href="${baseUrl}/blog" style="color: #3b82f6; text-decoration: none; font-weight: 500;">ayushman.dev/blog</a>
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
      VOL. I — ${currentYear}

      📝 NEW ARTICLE PUBLISHED
      ${publishDate}

      ${article.title}
      ${article.description ? `\n${article.description}` : ''}

      ${article.type ? `Category: ${article.type}` : ''}

      "I've been working on this piece for a while now, diving deep into the nuances and connections that fascinate me. I hope it sparks your curiosity as much as it did mine while writing it."
      — Ayushman

      Read the full article: ${articleUrl}

      Continue exploring: ${baseUrl}/blog

      You're receiving this because you subscribed to Odyssey Newsletter.
    `
  };
};
