import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { User, UserService } from '../user';
import { GoogleStrategy } from './strategies/google-strategy';
import { SequelizeModule } from '@nestjs/sequelize';
import { PassportModule } from '@nestjs/passport';

@Module({
  imports: [
    SequelizeModule.forFeature([User]),
    PassportModule.register({ defaultStrategy: 'github' }),
  ],
  controllers: [AuthController],
  providers: [AuthService, UserService, GoogleStrategy],
})
export class AuthModule {}
