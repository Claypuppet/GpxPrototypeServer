interface MeterMeasurementData {
  raw: string;
  id: number;
}

export class MeterMeasurement {
  private _consumption1: number;
  private _consumption2: number;
  private _production1: number;
  private _production2: number;

  id: number;
  moment: Date;
  serial: string;
  consumption: number;
  production: number;
  currentConsumption: number;
  currentProduction: number;

  constructor(data: MeterMeasurementData) {
    this.parseFromRaw(data.raw);
    this.id = +data.id;
    this.consumption = this._consumption1 + this._consumption2;
    this.production = this._production1 + this._production2;
  }

  isValid(): boolean {
    return this.id > 0 && this.consumption > 0;
  }

  private parseFromRaw(raw: string): void {
    raw.split(';;').forEach(line => {

      if (line.startsWith('0-0:1.0.0')) {
        const moment = line.match(/\((?<year>\d{2})(?<month>\d{2})(?<day>\d{2})(?<hour>\d{2})(?<min>\d{2})(?<sec>\d{2})(?<ws>W|S)\)/);
        this.moment = new Date(
          2000 + parseInt(moment.groups.year, 10),
          parseInt(moment.groups.month, 10),
          parseInt(moment.groups.day, 10),
          parseInt(moment.groups.hour, 10),
          parseInt(moment.groups.min, 10),
          parseInt(moment.groups.sec, 10),
        );
      } else if (line.startsWith('0-0:96.1.1')) {
        this.serial = line.match(/\((.*)\)/)[1];
      } else if (line.startsWith('1-0:1.8.1')) {
        this._consumption1 = parseFloat(line.match(/\((\d+\.\d+)\*kWh\)/)[1]);
      } else if (line.startsWith('1-0:1.8.2')) {
        this._consumption2 = parseFloat(line.match(/\((\d+\.\d+)\*kWh\)/)[1]);
      } else if (line.startsWith('1-0:2.8.1')) {
        this._production1 = parseFloat(line.match(/\((\d+\.\d+)\*kWh\)/)[1]);
      } else if (line.startsWith('1-0:2.8.2')) {
        this._production2 = parseFloat(line.match(/\((\d+\.\d+)\*kWh\)/)[1]);
      } else if (line.startsWith('1-0:1.7.0')) {
        this.currentConsumption = parseFloat(line.match(/\((\d+\.\d+)\*kW\)/)[1]);
      } else if (line.startsWith('1-0:2.7.0')) {
        this.currentProduction = parseFloat(line.match(/\((\d+\.\d+)\*kW\)/)[1]);
      } else if (line.startsWith('!')) {
        return;
      }
    });
  }

  applyBaseValues(importKWH: number, exportKWH: number = 0){
    this.consumption -= importKWH;
    this.production -= exportKWH;
  }
}
