import { Injectable, CanActivate, ExecutionContext } from '@nestjs/common';
import { FastifyRequest } from 'fastify-multipart';
import { BadRequestError, PayloadTooLargeException } from './httpError';

@Injectable()
export class UploadGuard implements CanActivate {
  public async canActivate(ctx: ExecutionContext): Promise<boolean> {
    const req = ctx.switchToHttp().getRequest() as FastifyRequest;
    const isMultipart = req.isMultipart();
    const fileLimit = 1024 * 1024 * 10; // limit is still unknown
    if (!isMultipart)
      throw new BadRequestError('multipart/form-data expected.');
    const file = await req.file();
    if (!file) throw new BadRequestError('file expected');
    req.incomingFile = file;
    const fileSize = (await file.toBuffer()).length;
    if (fileSize > fileLimit) {
      throw new PayloadTooLargeException();
    }
    return true;
  }
}
