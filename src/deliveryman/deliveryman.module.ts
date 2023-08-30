import { Module } from '@nestjs/common';
import { DeliverymanService } from './deliveryman.service';
import { DeliverymanController } from './deliveryman.controller';
import { SequelizeModule } from '@nestjs/sequelize';
import { JwtModule } from '@nestjs/jwt';
import { MailModule } from '../mail/mail.module';
import { Deliveryman } from './models/deliveryman.model';

@Module({
  imports: [
    SequelizeModule.forFeature([Deliveryman]),
    JwtModule.register({}),
    MailModule,
  ],
  controllers: [DeliverymanController],
  providers: [DeliverymanService],
})
export class DeliverymanModule {}
