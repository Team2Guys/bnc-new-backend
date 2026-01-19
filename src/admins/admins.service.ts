import { Injectable, UnauthorizedException } from '@nestjs/common';
import { Prisma } from '@prisma/client';
import { PrismaService } from '../../prisma/prisma.service';
import { CustomErrorHandler } from '../utils/helperFunctions';
import * as bcrypt from 'bcrypt';
import { loginAdminDto, Super_admin_dto } from './dto/create-admin.dto';
import { JwtService } from '@nestjs/jwt';
import * as jwt from 'jsonwebtoken';
import { Response, Request } from 'express';
import { google } from 'googleapis';
import { oauth2 } from 'googleapis/build/src/apis/oauth2';
// import file from '../../src/keyfile.json '
// import fs from 'fs';
// import * as path from 'path';
// const keyfilePath = path.resolve(__dirname, '../../../keyfile.json');
// const keyfile = require(keyfilePath);



@Injectable()
export class AdminsService {
  constructor(private prisma: PrismaService) { }

  async create(createAdminDto: Prisma.AdminsCreateInput) {
    console.log(createAdminDto, "admin dto")
    const { email, fullname, } = createAdminDto
    const { password, ...withoutpassword } = createAdminDto

    if (!email || !fullname || !password) return CustomErrorHandler("Fields are required", "FORBIDDEN")
    let saltOrRounds = 10
    const hash = await bcrypt.hash(password, saltOrRounds);
    console.log('Password:', hash);
    console.log('Salt Rounds:', saltOrRounds, "password");

    try {
      let existingAdmin = await this.prisma.admins.findUnique({ where: { email: email } })
      if (existingAdmin) return CustomErrorHandler("User is already Exist", "FORBIDDEN")

      let response = this.prisma.admins.create({
        data: { password: hash, ...withoutpassword }
      })
      return response
    } catch (error) {
      return CustomErrorHandler(error.message || JSON.stringify(error), "INTERNAL_SERVER_ERROR")
    }


  }

  async findAll() {
    try {
      let admins = await this.prisma.admins.findMany()
      return admins;
    } catch (error) {
      return CustomErrorHandler(error.message || JSON.stringify(error), "INTERNAL_SERVER_ERROR")

    }
  }

  async findOne(id: number) {
    try {
      let admin = await this.prisma.admins.findUnique({ where: { id: id } })
      return admin
    } catch (error) {
      return CustomErrorHandler(error.message || JSON.stringify(error), "INTERNAL_SERVER_ERROR")

    }
  }

  async update(id: number, updateAdminDto: Prisma.AdminsUpdateInput) {
    try {
      const {password, ...withoutPassword} = updateAdminDto
      console.log(password, "passowrd")
      let saltOrRounds = 10
      let hash:string | undefined 
   if(password){
     hash = await bcrypt.hash(password as any, saltOrRounds)
   }

      let existingAdmin = await this.prisma.admins.findUnique({ where: { id: id } })
      if (!existingAdmin) return CustomErrorHandler("No admin found", "INTERNAL_SERVER_ERROR")

      let updated_admin = await this.prisma.admins.update({ where: { id: id }, data: {...withoutPassword, password:hash? hash : existingAdmin.password } })
      return updated_admin
    } catch (error) {
      return CustomErrorHandler(error.message || JSON.stringify(error), "INTERNAL_SERVER_ERROR")

    }

  }

  async remove(id: number) {
    try {
      let admin = await this.prisma.admins.findUnique({ where: { id: id } })
      if (!admin) return CustomErrorHandler("No admin found", "NOT_FOUND")
      let deleted = await this.prisma.admins.delete({ where: { id: id } })
      return deleted
    } catch (error) {
      return CustomErrorHandler(error.message || JSON.stringify(error), "INTERNAL_SERVER_ERROR")

    }
  }

  async adminlogin(login_credentials: loginAdminDto, res: Response) {
    try {
      const { email, password } = login_credentials
      if (!email || !password) return CustomErrorHandler("All fields are required", "FORBIDDEN")

      let admin_user = await this.prisma.admins.findUnique({ where: { email: email } })
      if (!admin_user) return CustomErrorHandler("User not found", 'NOT-FOUND')

      const payload = {
        email: admin_user.email,
        role: admin_user.role,
        id: admin_user.id
      };

      let passowrd_check = await bcrypt.compare(password, admin_user.password)
      console.log(passowrd_check, "passowrd-check")
      if (!passowrd_check) return CustomErrorHandler("Passowrd is incorrect", "FORBIDDEN")
      let access_token = jwt.sign(payload, process.env.JWT_SECRET, { expiresIn: '24h' })

      const { password: Newpassword, ...wthoutPassowrd } = admin_user

      res.cookie('2guysAdminToken', access_token, {
        // httpOnly: true,
        // secure: process.env.NODE_ENV === 'production',
        secure: false,
        maxAge: 24 * 60 * 60 * 1000,
      });
      console.log(access_token, "acces-token")

      return {
        message: 'Login successfull 🎉',
        user: wthoutPassowrd,
        token: access_token
      };





    } catch (error) {
      return CustomErrorHandler(error.message || JSON.stringify(error), "INTERNAL_SERVER_ERROR")

    }


  }

  async getAdminHandler(req: Request | any) {
    try {
      const { email } = req.user
      if(!email) return CustomErrorHandler("Email is required", "NOT_FOUND")
      let admin_user = await this.prisma.admins.findUnique({ where: { email: email } })
      if (!admin_user) CustomErrorHandler("User not found", "FORBIDDEN")
      const { password, ...withoupassword } = admin_user
      return withoupassword


    } catch (error) {
      return CustomErrorHandler(error.message || JSON.stringify(error), "INTERNAL_SERVER_ERROR")

    }
  }

  // super_admin

  async super_login_admin_handler(super_admin_login: Super_admin_dto, res: Response) {
    try {
      const { email, password } = super_admin_login
      if ((email !== process.env.super_admin_email) || password !== process.env.super_admin_passoword) {
        return CustomErrorHandler("Invalid Credentials", "UNAUTHORIZED")

      }



      let super_admin_credentials = {
        fullname: process.env.super_admin_name,
        email: process.env.super_admin_email,
        role: 'super-Admin'
      }

      let access_token = jwt.sign(super_admin_credentials, process.env.JWT_SECRET, { expiresIn: '24h' })


      res.cookie('superAdminToken', access_token, {
        // httpOnly: true,
        // secure: process.env.NODE_ENV === 'production',
        secure: false,
        maxAge: 24 * 60 * 60 * 1000,
      });
 
      return {
        message: 'Login successfull 🎉',
        user:  super_admin_credentials,
        token: access_token
      };

    } catch (error) {
      return CustomErrorHandler(error.message || JSON.stringify(error), "INTERNAL_SERVER_ERROR")

    }
  }

  
  async getSuperAdminHandler(req: Request | any) {
    try {
      let super_admin_credentials = {
        fullname: process.env.super_admin_name,
        email: process.env.super_admin_email,
        role: "super-Admin"
      }

      const { email } = req.user
      let admin_user = super_admin_credentials.email === email
      console.log(admin_user, "admin", email)
      if (!admin_user) return CustomErrorHandler("User not found", "FORBIDDEN")
      return super_admin_credentials

    } catch (error) {
      return CustomErrorHandler(error.message || JSON.stringify(error), "INTERNAL_SERVER_ERROR")

    }
  }
  
  // Get record sales
  async getRecords() {
    try {
      let total_products = await this.prisma.products.count({})
      let total_categories = await this.prisma.categories.count({})
      let total_subCategories = await this.prisma.subCategories.count({})
      let total_admins = await this.prisma.admins.count({})
      let total_appointments = await this.prisma.appointments.count({})
      let total_Blogs = await this.prisma.blogs.count({})

      return {
        total_admins,
        total_appointments,
        total_categories,
        total_products,
        total_subCategories,
        total_Blogs

      }

    } catch (error) {
      return CustomErrorHandler(error.message || JSON.stringify(error), "INTERNAL_SERVER_ERROR")

    }

  }




  // Getch Reveiws
//   async getReviews() {
// try {

// console.log(keyfilePath, "keyfile")
//   const auth = new google.auth.GoogleAuth({
//     keyFile: keyfilePath as any, 
//     scopes: ['https://www.googleapis.com/auth/business.manage'],
//     clientOptions:{email: "blind-curtains@sunny-mountain-343711.iam.gserviceaccount.com",},
    
//   });

  
//   const client = await auth.getClient();
//   const mybusiness = google.mybusinessaccountmanagement({ version: 'v1', auth: client as any });

//   const result = await mybusiness.accounts.list();
//   console.log('Accounts:', result.data);

//   let accountId = "011F5D-96EF92-0B0224";
//   let locationId = "ChIJ4V0HC41pXz4Rvla-qGM1PiI";
//   let url = `https://mybusiness.googleapis.com/v4/accounts/${accountId}/locations/${locationId}/reviews`;
//   const res:any = await client.request({
//     url:url,
//   });
//   console.log(res.data)
//   return res.data.reviews;
  
// } catch (error) {
//   console.log(error)
// }


//   }



async  fetchReviewsHandler  (){
  try {
    // let url = `https://maps.googleapis.com/maps/api/place/details/json?placeid=${process.env.NEXT_PUBLIC_PLACE_ID}&key=${process.env.NEXT_PUBLIC_REVIEWS_API_KEY}`
    // let response = await fetch(url,)
    // let data = await response.json()
    // console.log(data, "slide")
    return [];
  }

  catch (error) {
    return CustomErrorHandler(error.message || JSON.stringify(error), "INTERNAL_SERVER_ERROR")
  }
}

async getMonthlyAppointments() {
  const today = new Date();
  const currentYear = today.getFullYear();
  const currentMonth = today.getMonth(); // 0-based

  // Fetch appointments from Jan 1st to end of current month
  const appointments = await this.prisma.appointments.findMany({
    where: {
      createdAt: {
        gte: new Date(currentYear, 0, 1),
        lt: new Date(currentYear, currentMonth + 1, 1),
      },
    },
  });

  // Group appointments by year and month
  const monthlyData = appointments.reduce(
    (acc, appointment) => {
      const date = new Date(appointment?.createdAt ?? "");
      const year = date.getFullYear();
      const month = date.getMonth(); 
      const key = `${year}-${month}`;

      if (!acc[key]) {
        acc[key] = {
          year,
          month,
          count: 0,
        };
      }

      acc[key].count += 1;

      return acc;
    },
    {} as Record<string, { year: number; month: number; count: number }>,
  );

  const result = Object.values(monthlyData).map((data:any) => ({
    year: data.year,
    month: data.month + 1,
    count: data.count,
  }));

  // Sort by year/month
  result.sort((a, b) => a.year - b.year || a.month - b.month);

  // Generate a complete array with all months till current one
  const monthNames = [
    'January', 'February', 'March', 'April', 'May', 'June',
    'July', 'August', 'September', 'October', 'November', 'December',
  ];

  const completeMonthlyData = Array.from({ length: currentMonth + 1 }, (_, i) => ({
    month: `${monthNames[i]} ${currentYear}`,
    Appointments: 0,
  }));

  // Fill in the counts
  result.forEach((item) => {
    const index = item.month - 1;
    completeMonthlyData[index] = {
      month: `${monthNames[index]} ${item.year}`,
      Appointments: item.count,
    };
  });

  return {appointments: completeMonthlyData};
}




async getLast7DaysStats() {
  const today = new Date();
  const startDate = new Date();
  startDate.setDate(today.getDate() - 6); // last 7 days including today

  const dateKeys = Array.from({ length: 7 }, (_, i) => {
    const d = new Date(startDate);
    d.setDate(d.getDate() + i);
    return d.toISOString().split('T')[0]; // e.g., "2025-06-23"
  });

  // Fetch appointments
  const appointments = await this.prisma.appointments.findMany({
    where: {
      createdAt: {
        gte: startDate,
        lte: today,
      },
    },
  });

  const dailyAppointmentsMap = appointments.reduce((acc, appointment) => {
    const key = new Date(appointment?.createdAt ?? "").toISOString().split('T')[0];
    if (!acc[key]) acc[key] = 0;
    acc[key] += 1;
    return acc;
  }, {} as Record<string, number>);

  // Merge data with day name
  const finalStats = dateKeys.map((dateStr) => {
    const dateObj = new Date(dateStr);
    const dayName = dateObj.toLocaleDateString('en-US', { weekday: 'short' });

    return {
      date: dateStr,
      day: dayName,
      Appointments: dailyAppointmentsMap[dateStr] || 0,
    };
  });

  console.log(finalStats, "finalStats");
  return finalStats;
}



}
