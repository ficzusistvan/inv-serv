import { Body, Controller, Post } from '@nestjs/common';
import { AuthService } from './auth.service';
import { LoginReq } from './dto/auth.dto';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('login')
  async login(@Body() body: LoginReq) {
    const res = await this.authService.validateToken(body.idToken);
    console.log(res);
    return { token: res ? body.idToken : null };
  }
}
