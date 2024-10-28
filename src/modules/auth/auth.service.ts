import { BadRequestException, Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UserService } from '../user';

@Injectable()
export class AuthService {
  constructor(
    private userService: UserService,
    private jwt: JwtService,
  ) {}

  async googleAuth(req: any) {


    const foundeduser = await this.userService.findOne(req.user.emails[0].value);

    if (foundeduser) {
      const accessToken = this.jwt.sign(
        { id: foundeduser.id, name: foundeduser.name },
        { secret: 'my-secret-key' },
      );
      return { accessToken, user: foundeduser, isNew: false };
    }

    const newUser = await this.userService.create({
      name: req.user.displayName,
      email: req.user.emails[0].value,
      image: req.user.photos[0].value,
    });

    const accessToken = this.jwt.sign(
      { id: newUser.id, name: newUser.name },
      { secret: 'my-secret-key' },
    );


    return { accessToken, user: newUser, isNew: true };
  }


  async githubAuth(req: any) {
    const email = req.user.emails?.[0]?.value;
    const name = req.user.displayName || req.user.username;
    const photo = req.user.photos?.[0]?.value;

    if (!email) {
      throw new BadRequestException("GitHub account does not have an accessible email.");
    }

    const existingUser = await this.userService.findOne(email);
    if (existingUser) {
      const accessToken = this.jwt.sign(
        { id: existingUser.id, name: existingUser.name },
        { secret: 'my-secret-key' },
      );
      return { accessToken, user: existingUser, isNew: false };
    }

    const newUser = await this.userService.create({
      name,
      email,
      image: photo,
    });

    const accessToken = this.jwt.sign(
      { id: newUser.id, name: newUser.name },
      { secret: 'my-secret-key' },
    );
    return { accessToken, user: newUser, isNew: true };
  }
}