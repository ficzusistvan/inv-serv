import { Module } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { FirebaseModule } from 'src/firebase/firebase.module';
import { ProfileController } from './profile.controller';
import { ProfileService } from './profile.service';

@Module({
  imports: [
    FirebaseModule.forRootAsync({
      inject: [ConfigService],
      useFactory: (configService: ConfigService) => {
        const FIREBASE_CONFIG = JSON.parse(configService.get<string>('GOOGLE_FIREBASE'));
        return {
          projectId: FIREBASE_CONFIG.PROJECT_ID,
          privateKey: FIREBASE_CONFIG.PRIVATE_KEY,
          clientEmail: FIREBASE_CONFIG.CLIENT_EMAIL,
        };
      },
    }),
  ],
  controllers: [ProfileController],
  providers: [ProfileService],
  exports: [ProfileService]
})
export class ProfileModule {}
