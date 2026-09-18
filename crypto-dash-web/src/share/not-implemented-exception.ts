import { HttpException, HttpStatus } from '@nestjs/common';

export class NotImplementedSwitchError extends HttpException {
  constructor(value: any) {
    super(
      {
        statusCode: HttpStatus.INTERNAL_SERVER_ERROR,
        message: `Not implemented switch with type ${value}`,
      },
      HttpStatus.INTERNAL_SERVER_ERROR,
    );
  }
}
