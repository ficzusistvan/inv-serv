import { Module } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { FirebaseModule } from 'src/firebase/firebase.module';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';

@Module({
  imports: [
    FirebaseModule.forRootAsync({
      inject: [ConfigService],
      useFactory: (configService: ConfigService) => {
        const FIREBASE_CONFIG = JSON.parse(
          configService.get<string>('GOOGLE_FIREBASE'),
        );    
        return {
          projectId: FIREBASE_CONFIG.PROJECT_ID,
          privateKey: FIREBASE_CONFIG.PRIVATE_KEY,
          clientEmail: FIREBASE_CONFIG.CLIENT_EMAIL,
        };
      },
    }),
  ],
  controllers: [AuthController],
  providers: [AuthService],
  exports: [AuthService]
})
export class AuthModule {}
