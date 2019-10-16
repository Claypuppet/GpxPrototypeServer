import express from 'express';
import {Server} from 'http';
import {config} from '../config/env.config';
import {MeasurementApiHandler} from '../handler/api/measurementApiHandler';
import {AggregatorService} from '../service/AggregatorService';

export class ApiController {
  expressApp: express.Application;

  aggregator: AggregatorService;

  constructor(expressApp: express.Application, aggregator: AggregatorService) {
    this.aggregator = aggregator;
    this.expressApp = expressApp;
    const measurementHandler = new MeasurementApiHandler(aggregator);

    this.expressApp.use(express.json());

    this.expressApp.route('/')
      .get((req: any, res: any) => {
        res.status(200).send('OK');
      });

    /**
     * @description: measurement endpoint to create a new measurement
     */
    this.expressApp.route('/measurements')
      .post(measurementHandler.newMeasurement);

  }

  initiate = (httpApp: Server) => {
    httpApp.listen(config.port, () => {
      console.log('API up and running at', config.port);
    });
  };

}
