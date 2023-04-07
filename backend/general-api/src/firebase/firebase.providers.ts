import { FirebaseModuleOptions } from './firebase-module-options.interface';
import { FIREBASE_MODULE_OPTIONS } from './firebase.constants';

export function createFirebaseProvider(options: FirebaseModuleOptions): any[] {
  return [{ provide: FIREBASE_MODULE_OPTIONS, useValue: options || {} }];
}