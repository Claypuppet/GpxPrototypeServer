import {AggregatorService} from "../../service/AggregatorService";
import {MeterMeasurement} from "../../model";


export class MeasurementApiHandler {
  aggregator: AggregatorService;

  constructor(aggregator: AggregatorService) {
    this.aggregator = aggregator;
  }

  /**
   * @param req: Http request with body of `RoomModel`
   * @param res: response Object
   * @returns : String
   */
  newMeasurement = (req: any, res: any) => {
    const measurement = new MeterMeasurement(req.body);
    if (measurement.isValid()) {
      res.status(200).send('OK');
      console.log('Received new measurement for meter', measurement.id);
      this.aggregator.addMeterMeasurement(measurement);
    } else {
      res.status(400).send('INVALID');
    }
  };
}
