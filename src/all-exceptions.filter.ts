import { Catch, ArgumentsHost, HttpStatus, HttpException } from "@nestjs/common";
import { BaseExceptionFilter } from "@nestjs/core";
import { Request, Response } from 'express' 
import { MyLoggerService } from "./my-logger/my-logger.service";
import { PrismaClientValidationError } from "@prisma/client/runtime/library";

type MyResponseObj = {
    statusCode: number,
    timestamp: string,
    path: string,
    message: string | object,
}



@Catch()
export class AllExceptionsFilter extends BaseExceptionFilter {
    private readonly logger = new MyLoggerService(AllExceptionsFilter.name)

    catch(exception: unknown, host: ArgumentsHost) {
        const ctx = host.switchToHttp();
        const message = ctx.getResponse<Response>();
        const request = ctx.getRequest<Request>();

        const myResponseObj: MyResponseObj = {
            statusCode: 500,
            timestamp: new Date().toISOString(),
            path: request.url,
            message: '',
        }


        if (exception instanceof HttpException){
                myResponseObj.statusCode = exception.getStatus()
                console.log(exception?.getStatus(), "exception.getStatus()")
                myResponseObj.message = exception.getResponse()
        } else if (exception instanceof PrismaClientValidationError){ 
            myResponseObj.statusCode = HttpStatus.UNPROCESSABLE_ENTITY;
            myResponseObj.message = this.formatPrismaError(exception);
        } else {
            myResponseObj.statusCode = HttpStatus.INTERNAL_SERVER_ERROR
            myResponseObj.message = 'Internal Server Error'
        }

        myResponseObj.message = this.normalizeMessage(myResponseObj.message);


        this.logger.error(myResponseObj.message, AllExceptionsFilter.name)

        super.catch(exception, host)
    }

    private normalizeMessage(message: any): string {
        if (typeof message === 'string') {
            return message;
        } else if (typeof message === 'object' && message !== null) {
            return message.message || JSON.stringify(message);
        }
        return 'An error occurred';
    }

    private formatPrismaError(exception: PrismaClientValidationError): string {
        const errorLines = exception.message.split('\n');
        const relevantLine = errorLines.find(line => line.includes('Invalid')) || errorLines[0];
        
        return relevantLine.replace(/Invalid .*?$/, '').trim() + '.';
    }
}