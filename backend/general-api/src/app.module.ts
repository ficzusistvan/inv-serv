import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthModule } from './auth/auth.module';
import { ProfileController } from './profile/profile.controller';
import { CompetitionsModule } from './competitions/competitions.module';
import { CompetitionsController } from './competitions/competitions.controller';
import { ProfileModule } from './profile/profile.module';

@Module({
  imports: [ConfigModule.forRoot({ isGlobal: true }), AuthModule, CompetitionsModule, ProfileModule],
  controllers: [AppController, ProfileController, CompetitionsController],
  providers: [AppService],
})
export class AppModule {}
