import {
  CanActivate,
  ExecutionContext,
  HttpException,
  HttpStatus,
  Injectable,
} from '@nestjs/common';
import { ExpressRequestInterface } from '../../types/expressRequest.interface';

@Injectable()
export class AdminGuard implements CanActivate {
  canActivate(context: ExecutionContext): boolean {
    const request = context
      .switchToHttp()
      .getRequest<ExpressRequestInterface>();
      
    console.log(request.user);
    
    if (request.user.role === 1) {
      return true;
    }

    throw new HttpException('Forbidden', HttpStatus.FORBIDDEN);
  }
}
