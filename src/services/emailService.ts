import nodemailer from 'nodemailer';
import dotenv from 'dotenv';

dotenv.config();

// Configuración del transportador de email
const transporter = nodemailer.createTransport({
  service: 'gmail', // Puedes cambiar esto por tu proveedor de email
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS,
  },
});

export const sendPasswordResetEmail = async (to: string, resetToken: string): Promise<void> => {
  // URL para restablecer contraseña - ajusta según tu frontend
  const resetUrl = `${process.env.FRONTEND_URL}/reset-password?token=${resetToken}`;
  
  const mailOptions = {
    from: process.env.EMAIL_USER,
    to,
    subject: 'Recuperación de Contraseña - Cannabica',
    html: `
      <div style="max-width: 600px; margin: 0 auto; padding: 20px; font-family: Arial, sans-serif;">
        <h2 style="color: #333; text-align: center;">Recuperación de Contraseña</h2>
        <p>Has solicitado restablecer tu contraseña.</p>
        <p>Haz clic en el siguiente enlace para crear una nueva contraseña:</p>
        <div style="text-align: center; margin: 30px 0;">
          <a href="${resetUrl}" 
             style="background-color: #4CAF50; color: white; padding: 12px 30px; text-decoration: none; border-radius: 5px; display: inline-block;">
            Restablecer Contraseña
          </a>
        </div>
        <p style="color: #666; font-size: 14px;">
          Este enlace expirará en 1 hora por seguridad.
        </p>
        <p style="color: #666; font-size: 14px;">
          Si no solicitaste este cambio, puedes ignorar este correo.
        </p>
      </div>
    `,
  };

  try {
    await transporter.sendMail(mailOptions);
    console.log('Email de recuperación enviado exitosamente');
  } catch (error) {
    console.error('Error enviando email de recuperación:', error);
    throw new Error('Error enviando email de recuperación');
  }
}; 