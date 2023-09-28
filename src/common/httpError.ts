import { HttpException, HttpStatus } from '@nestjs/common';
import { ErrorCode } from './error-code.enum';

export class ForbiddenException extends HttpException {
  constructor(error) {
    super(
      {
        status: HttpStatus.FORBIDDEN,
        error: `Github token is expired! or something went wrong by ${error}`,
      },
      HttpStatus.FORBIDDEN,
    );
  }
}

export class UnauthorizedException extends HttpException {
  constructor(error) {
    super(
      {
        status: HttpStatus.UNAUTHORIZED,
        error: `Github token is not authorized ${error}`,
      },
      HttpStatus.UNAUTHORIZED,
    );
  }
}

export class BadRequestError extends HttpException {
  constructor(error) {
    super(
      {
        status: HttpStatus.BAD_REQUEST,
        error: `${error}`,
      },
      HttpStatus.BAD_REQUEST,
    );
  }
}

export class InternalServerError extends HttpException {
  constructor() {
    super(
      {
        status: HttpStatus.INTERNAL_SERVER_ERROR,
        error: 'Internal Server Error',
      },
      HttpStatus.INTERNAL_SERVER_ERROR,
    );
  }
}

export class PayloadTooLargeException extends HttpException {
  constructor(message: any = 'Request size is over the limit') {
    super(
      { errorCode: ErrorCode.PAYLOAD_TOO_LARGE, message },
      HttpStatus.PAYLOAD_TOO_LARGE,
    );
  }
}
