import { Injectable } from '@nestjs/common';
import { PrismaService } from '../../prisma/prisma.service';
import { Prisma } from '@prisma/client';
import { capitalizeWords, CustomErrorHandler } from '../utils/helperFunctions';
import * as nodemailer from 'nodemailer';
import { CreateUserDto } from '../../src/admins/dto/create-user.dto';
@Injectable()
export class AppointmentService {
  constructor(private prisma: PrismaService) { }
  private transporter = nodemailer.createTransport({
    host: 'mail.blindsandcurtains.ae',
    port: 587,
    secure: false,
    auth: {
      user: process.env.ADMIN_MAIL,
      pass: process.env.ADMIN_PASSWORD,
    },
  });
  gethello() {
    return 'hellow from appointments';
  }

  async AddOpointmentHandler(user_data: Prisma.AppointmentsCreateInput) {
    try {
      const newAppointment = await this.prisma.appointments.create({
        data: user_data,
      });

      const dateObject = new Date(user_data.prefered_Date);
      const hours = String(dateObject.getHours()).padStart(2, '0');
      const minutes = String(dateObject.getMinutes()).padStart(2, '0');

      const extractedTime = `${hours}:${minutes}`;
      const year = dateObject.getFullYear();
      const month = String(dateObject.getMonth() + 1).padStart(2, '0');
      const day = String(dateObject.getDate()).padStart(2, '0');
      const formattedDate = `${year}-${month}-${day}`;


      const windowDressingTypes = {
        roller_blinds: "roller_blinds",
        wooden_blinds: "wooden_blinds",
        curtains: "curtains",
        other_blinds: "other_blinds",
        plantation_shutters: "plantation_shutters",
        others: "others",
      };

      let params = {
        "name": user_data.name,
        "phone_number": user_data.phone_number,
        "whatsapp_number": user_data.whatsapp_number,
        "email": user_data.email,
        "availability": {
          "date": formattedDate,
          "time": extractedTime
        },
        "number_of_windows": user_data.windows,
        "referral_source": user_data.how_user_find_us,
        "location": "Downtown, Dubai",
        window_dressing_types: Object.keys(windowDressingTypes).reduce((acc, key) => {
          acc[key] = Array.isArray(user_data.product_type)
            ? user_data.product_type.includes(windowDressingTypes[key])
            : false;
          return acc;
        }, {}),
        "additional_requirements": user_data.user_query
      }


      await this.sendConfirmationEmail(user_data, null, newAppointment);
      await this.sendConfirmationEmail(user_data, user_data.email, newAppointment,);

      const response = await fetch('https://stage.twoguys.ae/blindcurtains/lead', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ params })
      });

      const contentType = response.headers.get('content-type');

if (contentType && contentType.includes('application/json')) {
  const data = await response.json();
  console.log(data, "data");
} 
 
      return { message: 'Appointment created successfully🎉', newAppointment };
    } catch (error) {
      if (error.response) {
        console.error('Error response data:', error.response.data);
        console.error('Error statuso:', error.response.status);
        console.error('Error headers:', error.response.headers);
      } else if (error.request) {
        console.error('Error request:', error.request);
      } else {
        console.error('Error message:', error.message);
      }
      return CustomErrorHandler(`${error.message}`, 'INTERNAL_SERVER_ERROR');
    }
  }



  getAllPointments() {
    try {
      return this.prisma.appointments.findMany();
    } catch (error) {
      return CustomErrorHandler(`${error.message}`, 'INTERNAL_SERVER_ERROR');
    }
  }

  private async sendConfirmationEmail(
    user_data: any,
    user_mail: string | null,
    appointment: Prisma.AppointmentsCreateInput,
  ) {
    try {
      console.log(user_data.product_type)
      const product_type = capitalizeWords(user_data.product_type);
      const recipients = user_mail ? `${user_mail}` : `${process.env.RECEIVER_MAIL1}, ${process.env.RECEIVER_MAIL3}, ${process.env.RECEIVER_MAIL4}`;
      const mailOptions = {
        from: `"The Team @ Blinds and Curtains Dubai" <${process.env.MAILER_MAIL}>`,
        to: recipients,
        subject: 'Online Book an Appointment - blindsandcurtains.ae',
        html: `<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Blinds And Curatins</title>
    <style>
    body {
      font-family: Arial, sans-serif;
      line-height: 1.6;
      color: #333;
      margin: 20px;
      font-size: 12px;
    }
    .contact-info {
      margin-bottom: 18px;
    }
    .contact-info p {
      margin: 5px 0;
    }
  </style>
</head>
<body>
    <p>Thank you for sending us your appointment enquiry. We will get back to you within a few hours to confirm your time slot.</br>
    Once it’s locked in, you can expect our professional team to arrive as close to the allotted time as possible. They'll bring as many samples as they can carry, allowing you a huge selection to choose from. You can browse comfortably at your leisure whilst they measure up.</br>
    Once fabric is selected they will provide you a quotation on the spot and if you wish to proceed, we can expect the deposit by cash, credit card or bank transfer (we can send an online link as well if required).</br>
    If you decide that you need more time to think about it, no problem at all, we dont do the pushy sales techniques and we will forward the quotation to you by the next working day at the latest.</p> 
    <p>Some benefits of ordering with <a href="http://www.blindsandcurtains.ae" target="_blank">http://www.blindsandcurtains.ae</a></p>
    <div>
        <ol>
            <li>One of the original home visit services in Dubai. Years of experience and corrections to perfect our appointment and installation process.</li>
            <li>Experienced sales teams and installers who will take great care in your home and clean up behind themselves, every single time.</li>
            <li>A comprehensive <strong>3-year warranty</strong> on all fabrics, and up to <strong>10 years on motors.</strong></li>
            <li>Free moving service valid for up to <strong>2 years</strong> when moving to the same Emirate. We will uninstall and re-install anything bought from us at no cost (unless alterations are needed).</li>
            <li><strong>750+ 5* reviews</strong> make us one of Dubai’s most loved blinds & curtains companies.</li>
            <li>We also offer <strong>furniture, wallpapers,</strong> and <strong>vinyl wrapping</strong> services. All offered with discount vouchers when bought in conjunction with blinds or curtains.</li>
          </ol>
    </div>
    <p>we are nothing without our customers and really appreciate the oppurtunity to show you what can do. In the event that you have any cause for concern, please do not hesitate to contact us on:</p>
     <div class="contact-info">
      <p><strong>WhatsApp:</strong><a href="https://wa.me/0544945332" target="_blank"> 054 494 5339</a></p>
<p><strong>Phone:</strong><a href="tel:042522025" target="_blank"> 04 252 2025</a></p>
      <p><strong>Email:</strong> <a href="mailto:sales@blindsandcurtains.ae">sales@blindsandcurtains.ae</a></p>
      <p><strong>Instagram:</strong> <a href="https://www.instagram.com/blindsandcurtainsdubai" target="_blank">https://www.instagram.com/blindsandcurtainsdubai</a></p>
    </div>
    <div>
      <ol>
        <li><b>Name: </b></br>${user_data.name}</li>
        <li><b>Phone Number: </b></br> ${user_data.phone_number}</li>
        <li><b>WhatsApp No. (If Different): </b></br>${user_data.whatsapp_number}</li>
        <li><b>Email: </b> <a href="mailto:${user_data.email}" target="_blank">${user_data.email}</a></li>
        <li><b>Tell us when you are available</b></br> ${new Date(user_data.prefered_Date).toLocaleDateString()} </li>
        <li><b>Time: </b></br>  ${user_data.prefered_time} </li>
        <li><b>How many windows: </b></br>  ${user_data.windows} </li>
        <li><b>How did you hear about us?: </b></br>  ${user_data.how_user_find_us} </li>
        <li><b>Tell us where you are located: </b></br>  ${user_data.area} </li>
        <li><b>Window Dressing Type: </b></br>  ${product_type} </li>
        <li><b>Any Other Requirements: </b>  ${user_data.user_query} </li>
      </ol>
    </div>
</body>
</html>
`,
      };

      await this.transporter.sendMail(mailOptions);
      console.log('Confirmation email sent successfully');
    } catch (error) {
      console.error('Error sending email:', error);
    }
  }



  async sendEmail(user_data: CreateUserDto) {
    try {
      const { name, email, phone } = user_data;

      const htmlContent =
        `
     <div style="font-family: Arial, sans-serif; padding: 20px;">
  <h2>Hi ${name},</h2>
  <p>Thank you for reaching out to Blinds And Curtains, Dubai’s trusted choice for premium blinds and curtains. We’ve received your enquiry, and one of our experts will be in touch with you shortly to assist with your window solution needs.</p>
  <ul>
    <li><strong>Name:</strong> ${name}</li>
    <li><strong>Email:</strong> ${email}</li>
    <li><strong>Phone:</strong> ${phone}</li>
  </ul>

  <p style="margin-top: 30px;">
    Warm regards,<br />
    <strong>Blinds & Curtains</strong><br />
    <a href="mailto:sales@blindsandcurtains.ae">sales@blindsandcurtains.ae</a>
  </p>
</div>

    `;




      // Send email to user
      await this.transporter.sendMail({
        from: `" Thank you for your inquiry request" <${process.env.MAILER_MAIL}>`,
        to: email,
        subject: 'Thank you for your inquiry request',
        html: htmlContent,
      });

      // Send email to admin
      await this.transporter.sendMail({
        from: `" Thank you for your inquiry request" <${process.env.MAILER_MAIL}>`,
        to: `${process.env.RECEIVER_MAIL1}, ${process.env.RECEIVER_MAIL3}, ${process.env.RECEIVER_MAIL4}`,
        subject: 'New Callback Request Received',
        html: htmlContent,
      });


      await this.prisma.callbacks.create({ data: user_data })
      return { success: true, message: 'Emails sent successfully' };
    } catch (error) {
      return CustomErrorHandler(`${error.message}`, 'INTERNAL_SERVER_ERROR');
    }
  }




  async AllBacks() {
    try {

      return await this.prisma.callbacks.findMany({})
    } catch (error) {
      return CustomErrorHandler(`${error.message}`, 'INTERNAL_SERVER_ERROR');
    }
  }


}
