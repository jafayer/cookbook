import {
  Injectable,
  NestInterceptor,
  ExecutionContext,
  CallHandler,
} from '@nestjs/common';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import * as jwt from "jsonwebtoken";
import { ConfigService } from '@nestjs/config';

@Injectable()
export class SessionInterceptor implements NestInterceptor {
  constructor (private configService: ConfigService) {}
  intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
    const request = context.switchToHttp().getRequest();
    const response = context.switchToHttp().getResponse();

    const access_token = request.cookies?.access_token;
    if (access_token) {
      try {
        const decoded = jwt.verify(access_token, this.configService.get<string>('JWT_SECRET'));
        request.user = decoded;
      } catch (error) {
        response.clearCookie('access_token');
      }
    }

    return next.handle().pipe(
      map((data) => {
        const accessToken = request.cookies?.access_token;
        return { ...data, accessToken };
      }),
    );
  }
}
