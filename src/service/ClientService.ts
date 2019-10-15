import * as SocketIO from "socket.io";
import {EalyzeMeasurement, MData, MeterMeasurement, SolarEdgeMeasurement} from "../model";

export class ClientService {
  private io: SocketIO.Server;

  constructor(io: SocketIO.Server) {
    this.io = io;
  }

  /**
   * @param measurements
   * @param socket
   */
  sendMeterMeasurements = (measurements: MData<MeterMeasurement>, socket?: SocketIO.Socket): boolean => {
    return this.emit('measurement:meter', measurements, socket);
  };

  /**
   * @param measurements
   * @param socket
   */
  sendEalyzeMeasurements = (measurements: MData<EalyzeMeasurement>, socket?: SocketIO.Socket): boolean => {
    return this.emit('measurement:ealyze', measurements, socket);
  };

  /**
   * @param measurements
   * @param socket
   */
  sendSolarEdgeMeasurements = (measurements: MData<SolarEdgeMeasurement>, socket?: SocketIO.Socket): boolean => {
    return this.emit('measurement:solaredge', measurements, socket);
  };

  /**
   * @param name
   * @param data
   * @param socket
   */
  private emit = (name: string, data: any, socket?: SocketIO.Socket): boolean => {
    return socket ? socket.emit(name, data) : this.io.sockets.emit(name, data);
  };
}
