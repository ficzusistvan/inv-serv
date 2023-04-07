import { Controller, Get } from '@nestjs/common';
import { ModbusService } from './modbus.service';

@Controller('modbus')
export class ModbusController {
  constructor(private readonly modbusService: ModbusService) {}

  @Get()
  async getThisShit(): Promise<string> {
    const res = await this.modbusService.getThisShit();
    return res.buffer.toString();
  }
}
