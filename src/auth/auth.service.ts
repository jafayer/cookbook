import { Injectable } from '@nestjs/common';
import { UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { ConfigService } from '@nestjs/config';


@Injectable()
export class AuthService {
  constructor(
    private jwtService: JwtService,
    private configService: ConfigService,
  ) {}
  private readonly users = [
    {
      userId: 1,
      username: this.configService.get<string>('AUTH_USERNAME'),
      password: this.configService.get<string>('AUTH_PASSWORD'),
    },
  ];

  async signIn(username: string, password: string): Promise<any> {
    const user = this.users.find((user) => user.username === username);

    if (!user || user?.password !== password) {
      throw new UnauthorizedException();
    }

    const { password: _, ...result } = user;
    const payload = { username: user.username, sub: user.userId };

    return {
      access_token: await this.jwtService.signAsync(payload),
    };
  }
}
