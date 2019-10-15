import axios from 'axios';

import {config} from '../config/env.config';
import {EalyzeMeasurement, SolarEdgeMeasurement} from "../model";

export class RemoteDataService {

  getEalyzeData = (): Promise<EalyzeMeasurement[]> => {
    return new Promise((resolve, reject) => {
      console.log(config, config.solaredge, config.solaredge.endpoint);
      axios.get(config.ealyze.endpoint, {
        headers: {
          // 'Auth': config.ealyze.key
        }
      }).then(r => {
        resolve()
      }).catch(e => reject(e));
    });
  };

  getSolarEdgeData = (): Promise<SolarEdgeMeasurement[]> => {
    return new Promise((resolve, reject) => {
      axios.get(config.solaredge.endpoint, {
        headers: {
          // 'Auth': config.solaredge.key
        }
      }).then(r => {

      }).catch(e => reject(e));
    });
  };
}
