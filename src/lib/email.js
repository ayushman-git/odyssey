import { Resend } from 'resend';
import { generateDynamicWelcomeEmail, EMAIL_CONFIG } from './email-service';

const resend = new Resend(process.env.RESEND_KEY);

export const sendWelcomeEmail = async (email) => {
  try {
    // Generate dynamic email content with latest articles
    const emailData = generateDynamicWelcomeEmail(email);
    
    if (!emailData.success) {
      console.warn('Email generation had issues, but continuing with fallback template:', emailData.error);
    }
    
    const { template } = emailData;
    
    const { data, error } = await resend.emails.send({
      from: `${EMAIL_CONFIG.from.name} <${EMAIL_CONFIG.from.email}>`,
      to: [email],
      subject: EMAIL_CONFIG.subjects.welcome,
      html: template.html,
      text: template.text
    });

    if (error) {
      console.error('Resend error:', error);
      return { success: false, error };
    }

    return { 
      success: true, 
      data,
      articlesIncluded: emailData.articlesIncluded,
      emailGenerated: emailData.success
    };
  } catch (error) {
    console.error('Email sending error:', error);
    return { success: false, error: error.message };
  }
};
