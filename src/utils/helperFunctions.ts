import { HttpException, HttpStatus } from '@nestjs/common';
import * as nodemailer from 'nodemailer';
import { CreateContactDto } from 'src/reviews/dto/create-review.dto';

export const CustomErrorHandler = (Errormsg: string, ErrorStatus: string) => {
  throw new HttpException(Errormsg, HttpStatus[ErrorStatus]);
};

const transporter = nodemailer.createTransport({
  host: 'mail.blindsandcurtains.ae',
  port: 587,
  secure: false,
  auth: {
    user: process.env.ADMIN_MAIL,
    pass: process.env.ADMIN_PASSWORD,
  },
});

export function getStatusNameByCode(code: number): string | undefined {
  const entry = Object.entries(HttpStatus).find(([_, value]) => value === code);
  console.log(entry);
  return entry ? entry[0] : undefined;
}

export function capitalizeWords(input: any): any {
  if (Array.isArray(input)) {
    return input.map((word) =>
      word
        .split('_')
        .map((part) => part.charAt(0).toUpperCase() + part.slice(1))
        .join(' '),
    );
  } else if (typeof input === 'string') {
    return input.split(',').map((word) =>
      word
        .split('_')
        .map((part) => part.charAt(0).toUpperCase() + part.slice(1))
        .join(''),
    );
  } else {
    return input;
  }
}

async function contactHandler(CreateContactDto: CreateContactDto) {
  try {
    const { fullName, email, phone, whatsapp, message } = CreateContactDto;

    const mailOptions = {
      from: process.env.SENDER_EMAIL,
      to: process.env.RECEIVER_MAIL1, // you can add more recipients
      subject: `New Contact Us Request from ${fullName}`,
      html: `
          <div style="font-family: Arial, sans-serif; color: #333;">
            <h2 style="color: #4CAF50;">📩 New Contact Us Submission</h2>
            <p><strong>Name:</strong> ${fullName}</p>
            <p><strong>Email:</strong> ${email}</p>
            <p><strong>Phone:</strong> ${phone || 'Not Provided'}</p>
            <p><strong>Phone:</strong> ${whatsapp || 'Not Provided'}</p>

            <p><strong>Message:</strong></p>
            <blockquote style="background: #f9f9f9; padding: 10px; border-left: 4px solid #4CAF50;">
              ${message}
            </blockquote>
            <hr>
            <p style="font-size: 12px; color: #999;">This email was generated from your website contact form.</p>
          </div>
        `,
    };

    // Use your mail service (e.g., nodemailer or SendGrid)
    await transporter.sendMail(mailOptions);

    return { success: true, message: 'Contact form submitted successfully' };
  } catch (error: any) {
    console.log(error, 'err');
    return CustomErrorHandler(
      `${error.message || JSON.stringify(error)}`,
      'GATEWAY_TIMEOUT',
    );
  }
}
