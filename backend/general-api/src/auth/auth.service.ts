import { Injectable } from '@nestjs/common';
import { FirebaseService } from 'src/firebase/firebase.service';

@Injectable()
export class AuthService {
  constructor(private firebaseService: FirebaseService) {}

  async validateToken(idToken: string): Promise<string> {
    const now = new Date().valueOf() / 1000;
    const result = await this.firebaseService.verifyIdToken(idToken);
    console.log(`Check if expired exp[${result.exp}] vs. now[${now}]`);
    if (now < result.exp) return JSON.stringify(result);
    else return null;
  }
}
