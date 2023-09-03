import {
  BadRequestException,
  CanActivate,
  ExecutionContext,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { Deliveryman } from '../deliveryman/models/deliveryman.model';

@Injectable()
export class DeliverymanGuard implements CanActivate {
  constructor(private readonly jwtService: JwtService) {}

  canActivate(context: ExecutionContext) {
    const req = context.switchToHttp().getRequest();
    const authHeader = req.headers.authorization;
    if (!authHeader) {
      throw new UnauthorizedException('Deliveryman unathorized');
    }
    const bearer = authHeader.split(' ')[0];
    const token = authHeader.split(' ')[1];
    console.log(token);

    if (bearer != 'Bearer' || !token) {
      throw new UnauthorizedException('Deliveryman unathorized');
    }
    async function verify(token: string, jwtService: JwtService) {
      const deliveryman: Partial<Deliveryman> = await jwtService.verify(token, {
        secret: process.env.ACCESS_TOKEN_KEY,
      });
      if (!deliveryman) {
        throw new UnauthorizedException('Invalid token provided');
      }
      if (!deliveryman.is_active) {
        throw new BadRequestException('Deliveryman is not active');
      }

      req.user = deliveryman;
      // console.log(req);
      return true;
    }
    return verify(token, this.jwtService);
  }
}
