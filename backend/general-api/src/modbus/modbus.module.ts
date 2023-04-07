import { Module } from '@nestjs/common';
import { ModbusController } from './modbus.controller';
import { ModbusService } from './modbus.service';
import { ConfigModule } from '@nestjs/config';

@Module({
  imports: [ConfigModule],
  controllers: [ModbusController],
  providers: [ModbusService]
})
export class ModbusModule {}
