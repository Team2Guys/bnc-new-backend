import { Body, Controller, Get, Post } from '@nestjs/common';
import { AppointmentService } from './appointment.service';
import { Prisma } from '@prisma/client';
import { CreateUserDto } from '../../src/admins/dto/create-user.dto';

@Controller('appointments')
export class AppointmentController {
  constructor(private readonly AppointmentService: AppointmentService) {}

  @Post('AddAppointment')
  Appointmentshandler(@Body() user_data: Prisma.AppointmentsCreateInput) {
    return this.AppointmentService.AddOpointmentHandler(user_data);
  }

  @Get('getAllappointments')
  GetAllappointments() {
    return this.AppointmentService.getAllPointments();
  }

  @Post('callback')
  CallbackHandler(@Body() user_data: CreateUserDto) {
    return this.AppointmentService.sendEmail(user_data);
  }

  @Post('AllBacks')
  AllBacks() {
    return this.AppointmentService.AllBacks();
  }
}
