import { CanActivate, ExecutionContext, Inject, Injectable, UnauthorizedException } from '@nestjs/common';
import { ProfileService } from 'src/profile/profile.service';

@Injectable()
export class AuthGuard implements CanActivate {
    constructor(@Inject(ProfileService) private readonly profileService: ProfileService) {}

  getRequest(context: ExecutionContext) {
    const req = context.switchToHttp().getRequest();
    return req;
  }

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const req = context.switchToHttp().getRequest();
    const { authorization: authToken } = req.headers;
    if (!authToken) throw new UnauthorizedException();
    const idToken = authToken.split(' ').pop();
    const res = await this.profileService.getProfile(idToken);
    if (!res) throw new UnauthorizedException();
    req.user = res;
    req.publicIP = req.ip;
    req.idToken = idToken;
    req.jti = res.jti;
    return true;
  }
}
