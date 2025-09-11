const getHtml = (title, ctaText, ctaLink, subject, message) => {
  const html = `
      <!DOCTYPE html>
      <html>
        <head>
          <meta charset="utf-8" />
          <title>${subject}</title>
        </head>
        <body style="font-family: Arial, sans-serif; background-color: #f4f4f7; padding: 20px; color: #333;">
          <table width="100%" cellspacing="0" cellpadding="0" style="max-width: 600px; margin: auto; background: #ffffff; border-radius: 8px; overflow: hidden; box-shadow: 0 2px 6px rgba(0,0,0,0.1);">
            <tr>
              <td style="background: #4f46e5; padding: 20px; text-align: center; color: #ffffff; font-size: 20px; font-weight: bold;">
                DevTinder
              </td>
            </tr>
            <tr>
              <td style="padding: 30px;">
                <h2 style="color: #111827; margin-bottom: 15px;">${title}</h2>
                <p style="font-size: 16px; line-height: 1.5; margin-bottom: 25px;">
                  ${message}
                </p>
                ${
                  ctaLink
                    ? `<p style="text-align: center;">
                        <a href="${ctaLink}" style="display: inline-block; padding: 12px 20px; font-size: 16px; color: #fff; background: #4f46e5; text-decoration: none; border-radius: 6px;">
                          ${ctaText || "View Request"}
                        </a>
                      </p>`
                    : ""
                }
              </td>
            </tr>
            <tr>
              <td style="background: #f9fafb; padding: 15px; text-align: center; font-size: 12px; color: #6b7280;">
                &copy; ${new Date().getFullYear()} DevTinder. All rights reserved.
              </td>
            </tr>
          </table>
        </body>
      </html>
    `;
  return html;
};
const membershipAmount = {
  silver: 300,
  gold: 700,
};

module.exports = { getHtml, membershipAmount };
