import { MailerService } from '@nestjs-modules/mailer';
import { Injectable } from '@nestjs/common';
import { Admin } from '../admin/models/admin.model';
import { Owner } from '../owner/models/owner.model';

@Injectable()
export class MailService {
  constructor(private mailerService: MailerService) {}

  async sendAdminConfirmation(admin: Admin): Promise<void> {
    const url = `${process.env.API_HOST}/admin/activate/${admin.activation_link}`;
    console.log(url);
    await this.mailerService.sendMail({
      to: admin.email,
      subject: 'Wellcome to MedApp! Confirm your Email!',
      template: './confirmation',
      context: {
        name: admin.first_name,
        url,
      },
    });
  }

    async sendOwnerConfirmation(owner: Owner): Promise<void> {
      const url = `${process.env.API_HOST}/owner/activate/${owner.activation_link}`;
      console.log(url);
      await this.mailerService.sendMail({
        to: owner.email,
        subject: 'Wellcome to cleaneApp! Confirm your Email!',
        template: './confirmation',
        context: {
          name: owner.first_name,
          url,
        },
      });
    }

  //   async sendWorkerConfirmation(worker: Worker): Promise<void> {
  //     const url = `${process.env.API_HOST}/workers/activate/${worker.activation_link}`;
  //     console.log(url);
  //     await this.mailerService.sendMail({
  //       to: worker.email,
  //       subject: 'Wellcome to cleaneApp! Confirm your Email!',
  //       template: './confirmation',
  //       context: {
  //         name: worker.first_name,
  //         url,
  //       },
  //     });
  //   }
}