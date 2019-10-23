import * as SocketIO from 'socket.io';
import {ClientService} from './ClientService';
import {RemoteDataService} from './RemoteDataService';
import {EalyzeMeasurement, MData, MeterMeasurement, SolarEdgeMeasurement} from '../model';
import {config} from '../config/env.config';


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
    if (data.id === config.lommerd.meterId) {
      data.applyBaseValues(config.lommerd.baseImportKWH, config.lommerd.baseExportKWH);
      this.meterMeasurements.lommerd = data;
      this.clientService.sendMeterMeasurements(this.meterMeasurements);
    }
    else if (data.id === config.dazo.meterId) {
      data.applyBaseValues(config.dazo.baseImportKWH);
      this.meterMeasurements.dazo = data;
      this.clientService.sendMeterMeasurements(this.meterMeasurements);
    }
  };

  public sendDataToUser = (socket: SocketIO.Socket) => {
    this.clientService.sendMeterMeasurements(this.meterMeasurements, socket);
    this.clientService.sendEalyzeMeasurements(this.ealyzeMeasurements, socket);
    this.clientService.sendSolarEdgeMeasurements(this.solarEdgeMeasurements, socket);
  };

  public refreshData = () => {
    // this.remote.getEalyzeData().then(
    //   data => {
    //     if (data) {
    //       this.ealyzeMeasurements.lommerd = data;
    //     }
    //     this.clientService.sendEalyzeMeasurements(this.ealyzeMeasurements);
    //   }
    // ).catch(r => {
    //   console.log('Unable to get Ealyze data:', r.errno);
    // });
    this.remote.getSolarEdgeData(config.lommerd.solaredgeId).then(
      data => {
        this.solarEdgeMeasurements.lommerd = data;
        this.clientService.sendSolarEdgeMeasurements(this.solarEdgeMeasurements);
      }
    ).catch(r => {
      console.log('Unable to get SolarEdge data:', r.config.url);
    });
  };
}
