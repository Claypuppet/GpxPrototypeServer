interface MeterMeasurementData {
  raw: string;
  id: number;
}

export class MeterMeasurement {
  moment: Date;
  serial: string;
  consumption1: number;
  consumption2: number;
  production1: number;
  production2: number;
  currentConsumption: number;
  currentProduction: number;

  constructor(data: MeterMeasurementData) {
    this.parseFromRaw(data.raw);
  }

  isValid(): boolean {
    return this.consumption1 !== undefined;
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
        this.serial = line.match(/\((.*)\)/)[1]
      } else if (line.startsWith('1-0:1.8.1')) {
        this.consumption1 = parseFloat(line.match(/\((\d+\.\d+)\*kWh\)/)[1]);
      } else if (line.startsWith('1-0:1.8.2')) {
        this.consumption2 = parseFloat(line.match(/\((\d+\.\d+)\*kWh\)/)[1]);
      } else if (line.startsWith('1-0:2.8.1')) {
        this.production1 = parseFloat(line.match(/\((\d+\.\d+)\*kWh\)/)[1]);
      } else if (line.startsWith('1-0:2.8.2')) {
        this.production2 = parseFloat(line.match(/\((\d+\.\d+)\*kWh\)/)[1]);
      } else if (line.startsWith('1-0:1.7.0')) {
        this.currentConsumption = parseFloat(line.match(/\((\d+\.\d+)\*kW\)/)[1]);
      } else if (line.startsWith('1-0:2.7.0')) {
        this.currentProduction = parseFloat(line.match(/\((\d+\.\d+)\*kW\)/)[1]);
      } else if (line.startsWith('!')) {
        return;
      }
    });
  }
}
