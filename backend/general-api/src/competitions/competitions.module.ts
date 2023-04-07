import { Module } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { FirebaseModule } from 'src/firebase/firebase.module';
import { CompetitionsController } from './competitions.controller';
import { CompetitionsService } from './competitions.service';

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
  controllers: [CompetitionsController],
  providers: [CompetitionsService],
  exports: [CompetitionsService]
})
export class CompetitionsModule {}
