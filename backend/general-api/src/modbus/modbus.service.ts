import { Injectable } from '@nestjs/common';
import ModbusRTU from 'modbus-serial';

@Injectable()
export class ModbusService {
  private client: ModbusRTU;

  constructor() {
    // create an empty modbus client
    this.client = new ModbusRTU();
    // open connection to a serial port
    this.client.connectRTUBuffered('/dev/ttyUSB0', { baudRate: 9600 });
    // set timeout, if slave did not reply back
    this.client.setTimeout(500);
  }

  getThisShit() {
    return this.client.readInputRegisters(0, 1);
  }
}
