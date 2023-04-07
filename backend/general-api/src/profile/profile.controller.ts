import { Controller, Get, UseGuards } from '@nestjs/common';
import { AuthGuard } from 'src/auth/auth.gard';
import { CurrentUser } from 'src/decorators/custom';

@Controller('profile')
@UseGuards(AuthGuard)
export class ProfileController {
  @Get()
  profile(@CurrentUser() user: any) {
    return user;
  }
}
