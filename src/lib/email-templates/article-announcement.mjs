// Email template for announcing a new article publication
export const generateArticleAnnouncementTemplate = (article) => {
  const baseUrl = 'https://ayushman.dev';
  const articleUrl = `${baseUrl}/blog/${convertToSlug(article.type)}/${article.slug}`;
  
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

  // Helper function to convert to slug (matching the component logic)
  function convertToSlug(text) {
    return text?.toLowerCase().replace(/\s+/g, '-').replace(/[^\w-]+/g, '') || '';
  }

  const publishDate = formatDate(article.date);
  const currentYear = new Date().getFullYear();

  return {
    html: `
      <!DOCTYPE html>
      <html lang="en">
      <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>New Article: ${article.title}</title>
        <style>
          body, table, td, p, a, li { 
            font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, sans-serif; 
            -webkit-font-smoothing: antialiased;
            -moz-osx-font-smoothing: grayscale;
          }
          @media only screen and (max-width: 600px) {
            .mobile-padding { padding: 20px 16px !important; }
            .mobile-title { font-size: 32px !important; }
            .mobile-article-title { font-size: 20px !important; }
            .mobile-cover { height: 200px !important; }
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

            <!-- Personal Greeting -->
            <div style="text-align: center; padding: 0 20px 40px 20px;">
              <h2 style="margin: 0 0 8px 0; font-size: 24px; font-weight: 600; color: #1e293b;">
                Something New to Explore 📖
              </h2>
              <p style="margin: 0; font-size: 15px; color: #64748b;">
                ${publishDate}
              </p>
            </div>

            <!-- Article Feature -->
            <div style="border: 1px solid #e2e8f0; margin: 0 20px 40px 20px;" class="mobile-padding">
              
              <!-- Cover Image -->
              ${article.cover_img ? `
              <div style="position: relative; height: 280px; overflow: hidden;" class="mobile-cover">
                <img src="${article.cover_img}" 
                     style="width: 100%; height: 100%; object-fit: cover; display: block;" 
                     alt="${article.title}">
                
                <!-- Category Badge on Image -->
                ${article.type ? `
                <div style="position: absolute; top: 20px; left: 20px;">
                  <span style="background: rgba(0, 0, 0, 0.8); color: white; padding: 6px 12px; font-size: 12px; text-transform: uppercase; letter-spacing: 0.1em; font-weight: 500;">
                    ${article.type}
                  </span>
                </div>
                ` : ''}
              </div>
              ` : ''}
              
              <!-- Article Content -->
              <div style="padding: 40px 30px;" class="mobile-padding">
                ${!article.cover_img && article.type ? `
                <div style="margin-bottom: 16px;">
                  <span style="background: #f1f5f9; color: #334155; padding: 4px 12px; font-size: 12px; text-transform: uppercase; letter-spacing: 0.1em; font-weight: 500;">
                    ${article.type}
                  </span>
                </div>
                ` : ''}
                
                <h3 style="margin: 0 0 16px 0; font-size: 28px; font-weight: 700; color: #1e293b; line-height: 1.3;" class="mobile-article-title">
                  ${article.title}
                </h3>
                
                ${!article.cover_img ? `
                <p style="margin: 0 0 16px 0; font-size: 14px; color: #64748b; font-weight: 500;">
                  Published ${publishDate}
                </p>
                ` : ''}
                
                ${article.description ? `
                <p style="color: #64748b; font-size: 17px; line-height: 1.6; margin: 0 0 32px 0;">
                  ${article.description}
                </p>
                ` : ''}

                <!-- Personal Note -->
                <div style="background: #f8fafc; padding: 24px; margin: 32px 0; border-left: 4px solid #3b82f6;">
                  <p style="color: #334155; font-size: 16px; line-height: 1.6; margin: 0 0 16px 0; font-style: italic;">
                    "This piece took me weeks to research and write. I hope it sparks the same curiosity in you that it did in me while exploring this topic."
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
