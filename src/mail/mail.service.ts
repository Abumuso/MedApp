import { MailerService } from '@nestjs-modules/mailer';
import { Injectable } from '@nestjs/common';
import { Admin } from '../admin/models/admin.model';

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

  //   async sendCustomerConfirmation(customer: Customer): Promise<void> {
  //     const url = `${process.env.API_HOST}/customers/activate/${customer.activation_link}`;
  //     console.log(url);
  //     await this.mailerService.sendMail({
  //       to: customer.email,
  //       subject: 'Wellcome to cleaneApp! Confirm your Email!',
  //       template: './confirmation',
  //       context: {
  //         name: customer.first_name,
  //         url,
  //       },
  //     });
  //   }

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
