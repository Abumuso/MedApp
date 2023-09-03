import {
  BadRequestException,
  CanActivate,
  ExecutionContext,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { Owner } from '../owner/models/owner.model';

@Injectable()
export class OwnerGuard implements CanActivate {
  constructor(private readonly jwtService: JwtService) {}

  canActivate(context: ExecutionContext) {
    const req = context.switchToHttp().getRequest();
    const authHeader = req.headers.authorization;
    if (!authHeader) {
      throw new UnauthorizedException('Owner unathorized');
    }
    const bearer = authHeader.split(' ')[0];
    const token = authHeader.split(' ')[1];
    console.log(token);

    if (bearer != 'Bearer' || !token) {
      throw new UnauthorizedException('Owner unathorized');
    }
    async function verify(token: string, jwtService: JwtService) {
      const owner: Partial<Owner> = await jwtService.verify(token, {
        secret: process.env.ACCESS_TOKEN_KEY,
      });
      if (!owner) {
        throw new UnauthorizedException('Invalid token provided');
      }
      if (!owner.is_active) {
        throw new BadRequestException('Owner is not active');
      }

      req.user = owner;

      return true;
    }
    return verify(token, this.jwtService);
  }
}
