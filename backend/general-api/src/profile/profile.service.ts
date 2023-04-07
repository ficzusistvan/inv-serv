import { Injectable } from '@nestjs/common';
import { FirebaseService } from 'src/firebase/firebase.service';

@Injectable()
export class ProfileService {
  constructor(private firebaseService: FirebaseService) {}

  getProfile(idToken: string): Promise<any> {
    return this.firebaseService.verifyIdToken(idToken);
  }
}
