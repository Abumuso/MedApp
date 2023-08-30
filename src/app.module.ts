import { Module } from '@nestjs/common';
import { AdminModule } from './admin/admin.module';
import { MailModule } from './mail/mail.module';
import { ConfigModule } from '@nestjs/config';
import { SequelizeModule } from '@nestjs/sequelize';
import { Admin } from './admin/models/admin.model';
import { OwnerModule } from './owner/owner.module';

@Module({
  imports: [
    ConfigModule.forRoot({ envFilePath: `.env`, isGlobal: true }),
    SequelizeModule.forRoot({
      dialect: 'postgres',
      host: process.env.POSTGRES_HOST,
      port: Number(process.env.POSTGRES_PORT),
      username: process.env.POSTGRES_USER,
      password: String(process.env.POSTGRES_PASSWORD),
      database: process.env.POSTGRES_DB,
      models: [Admin],
      autoLoadModels: true,
      logging: false,
    }),
    AdminModule,
    MailModule,
    OwnerModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
