const transporter = require("../config/mailer");
const { getHtml } = require("../utils/common");

const sendEmail = async (to, subject, title, message, ctaText, ctaLink) => {
  try {
    const info = await transporter.sendMail({
      from: `"DevTinder" <${process.env.GOOGLE_APP_MAIL}>`,
      to,
      subject,
      text: message, // fallback for plain text clients
      html: getHtml(title, ctaText, ctaLink, subject, message),
    });

    console.log("Message sent:", info.messageId);
  } catch (error) {
    console.error("Error sending email:", error);
    throw error;
  }
};

module.exports = sendEmail;
