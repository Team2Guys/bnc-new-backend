import { Injectable, ConsoleLogger } from '@nestjs/common';

@Injectable()
export class MyLoggerService extends ConsoleLogger {
  error(message: any, stackorContext?: string) {
    super.error(message, stackorContext);
  }
}
