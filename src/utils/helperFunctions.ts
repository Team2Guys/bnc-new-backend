import { HttpException, HttpStatus } from '@nestjs/common';

export const CustomErrorHandler = (Errormsg: string, ErrorStatus: string) => {
  throw new HttpException(Errormsg, HttpStatus[ErrorStatus]);
};

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
