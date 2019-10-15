import * as SocketIO from "socket.io";
import {ClientService} from "./ClientService";
import {RemoteDataService} from "./RemoteDataService";
import {EalyzeMeasurement, MData, MeterMeasurement, SolarEdgeMeasurement} from "../model";


export class AggregatorService {
  private meterMeasurements: MData<MeterMeasurement> = {};
  private ealyzeMeasurements: MData<EalyzeMeasurement> = {};
  private solarEdgeMeasurements: MData<SolarEdgeMeasurement> = {};

  private clientService: ClientService;
  private remote: RemoteDataService;

  constructor(io: SocketIO.Server) {
    this.clientService = new ClientService(io);
    this.remote = new RemoteDataService();
    this.refreshData();
  }

  public addMeterMeasurement = (data: MeterMeasurement) => {
    this.meterMeasurements[data.id] = data;
    this.clientService.sendMeterMeasurements(this.meterMeasurements);
  };

  public sendDataToUser = (socket: SocketIO.Socket) => {
    this.clientService.sendMeterMeasurements(this.meterMeasurements, socket);
    this.clientService.sendEalyzeMeasurements(this.ealyzeMeasurements, socket);
    this.clientService.sendSolarEdgeMeasurements(this.solarEdgeMeasurements, socket);
  };

  public refreshData = () => {
    this.remote.getEalyzeData().then(
      data => {
        data.forEach((measurement: EalyzeMeasurement) => {
          this.ealyzeMeasurements[measurement.id] = measurement;
        });
        this.clientService.sendEalyzeMeasurements(this.ealyzeMeasurements);
      }
    ).catch(r => {
      console.log('Unable to get Ealyze data:', r.errno);
    });
    this.remote.getSolarEdgeData().then(
      data => {
        data.forEach((measurement: SolarEdgeMeasurement) => {
          this.solarEdgeMeasurements[measurement.id] = measurement;
        });
        this.clientService.sendSolarEdgeMeasurements(this.solarEdgeMeasurements);
      }
    ).catch(r => {
      console.log('Unable to get SolarEdge data:', r.errno);
    });
  };
}
