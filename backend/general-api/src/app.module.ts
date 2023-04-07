import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ModbusModule } from './modbus/modbus.module';

@Module({
  imports: [ConfigModule.forRoot({ isGlobal: true }), ModbusModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
