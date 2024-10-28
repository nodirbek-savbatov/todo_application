import { Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { Strategy } from 'passport-github';

@Injectable()
export class GithubStrategy extends PassportStrategy(Strategy, 'github') {
  constructor() {
    super({
      clientID: process.env.GITHUB_CLIENT_ID,
      clientSecret: process.env.GITHUB_CLIENT_SECRET,
      callbackURL: 'http://localhost:3000/auth/github/callback',
      scope: ['user:email'],
    });
  }

  // GitHub doesn't need additional authorization params here
  authorizationParams(options: any): object {
    return {};
  }

  async validate(accessToken: string, refreshToken: string, profile: any) {
    return { ...profile, accessToken, refreshToken };
  }
}
