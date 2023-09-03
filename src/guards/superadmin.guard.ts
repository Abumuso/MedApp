import {
  BadRequestException,
  CanActivate,
  ExecutionContext,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { Admin } from '../admin/models/admin.model';

@Injectable()
export class SuperAdminGuard implements CanActivate {
  constructor(private readonly jwtService: JwtService) {}
  canActivate(context: ExecutionContext) {
    const req = context.switchToHttp().getRequest();

    const authHeader = req.headers.authorization;
    if (!authHeader) {
      throw new UnauthorizedException('Admin unathorized');
    }
    const bearer = authHeader.split(' ')[0];
    const token = authHeader.split(' ')[1];
    console.log(token);

    if (bearer != 'Bearer' || !token) {
      throw new UnauthorizedException('Admin unathorized');
    }
    async function verify(token: string, jwtService: JwtService) {
      const admin: Partial<Admin> = await jwtService.verify(token, {
        secret: process.env.ACCESS_TOKEN_KEY,
      });
      // console.log(admin.is_active);
      // console.log(admin.is_super);
      if (!admin) {
        throw new UnauthorizedException('Invalid token provided');
      }
      if (!admin.is_active) {
        throw new BadRequestException('Admin is not active');
      }
      if (!admin.is_super) {
        throw new BadRequestException('Admin is not superadmin');
      }
      req.user = admin;
      // console.log(req);
      return true;
    }
    return verify(token, this.jwtService);
  }
}
