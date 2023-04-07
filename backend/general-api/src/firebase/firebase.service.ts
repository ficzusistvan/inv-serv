import { Inject, Injectable } from '@nestjs/common';
import { auth, credential } from 'firebase-admin';
import { initializeApp } from 'firebase-admin/app';
import { getFirestore } from 'firebase-admin/firestore';
import { FirebaseModuleOptions } from './firebase-module-options.interface';
import { FIREBASE_MODULE_OPTIONS } from './firebase.constants';

@Injectable()
export class FirebaseService {
  private db;

  constructor(@Inject(FIREBASE_MODULE_OPTIONS) private readonly options: FirebaseModuleOptions) {
    initializeApp({
      credential: credential.cert({
        projectId: this.options.projectId,
        privateKey: this.options.privateKey,
        clientEmail: this.options.clientEmail,
      }),
    });

    this.db = getFirestore();
  }

  verifyIdToken(idToken: string) {
    return auth().verifyIdToken(idToken, true);
  }

  async getCompetitions() {
    const snapshot = await this.db.collection('competitions').get();
    return snapshot.docs.map((doc) => {
      const { startDate, endDate, name } = doc.data();
      return { startDate: startDate.seconds, endDate: endDate.seconds, name };
    });
  }
}
