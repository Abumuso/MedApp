import { Module } from '@nestjs/common';
import { OwnerService } from './owner.service';
import { OwnerController } from './owner.controller';
import { SequelizeModule } from '@nestjs/sequelize';
import { JwtModule } from '@nestjs/jwt';
import { MailModule } from '../mail/mail.module';
import { Owner } from './models/owner.model';

@Module({
  imports: [
    SequelizeModule.forFeature([Owner]),
    JwtModule.register({}),
    MailModule,
  ],
  controllers: [OwnerController],
  providers: [OwnerService],
})
export class OwnerModule {}
