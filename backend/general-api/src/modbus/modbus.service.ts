import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import ModbusRTU from 'modbus-serial';

@Injectable()
export class ModbusService {
  private client: ModbusRTU;

  constructor(private configService: ConfigService) {
    const cfg = JSON.parse(this.configService.get('MODBUS'));
    console.log({ cfg });
    // create an empty modbus client
    this.client = new ModbusRTU();
    // open connection to a serial port
    this.client.connectRTUBuffered(cfg.port, {
      baudRate: cfg.baudrate,
      parity: cfg.parity,
      dataBits: cfg.bytesize,
      stopBits: cfg.stopbits,
    });
    // set timeout, if slave did not reply back
    this.client.setTimeout(500);
  }

  getThisShit() {
    return this.client.readHoldingRegisters(0, 81);
  }
}
