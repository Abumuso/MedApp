import { MailerService } from '@nestjs-modules/mailer';
import { Injectable } from '@nestjs/common';
import { Admin } from '../admin/models/admin.model';
import { Owner } from '../owner/models/owner.model';
import { User } from '../user/models/user.model';
import { Deliveryman } from '../deliveryman/models/deliveryman.model';

@Injectable()
export class MailService {
  constructor(private mailerService: MailerService) {}

  async sendConfirmation(
    info: Admin | Owner | User | Deliveryman,
    table_name: string,
  ): Promise<void> {
    try {
      const url = `${process.env.API_HOST}/${table_name}/activate/${info.activation_link}`;
      console.log(url);
      await this.mailerService.sendMail({
        to: info.email,
        subject: 'Wellcome to MedApp! Confirm your Email!',
        template: './confirmation',
        context: {
          name: info.first_name,
          url,
        },
      });
    } catch (error) {
      console.log(error);
    }
  }
}
