import axios from 'axios';

import {config} from '../config/env.config';
import {EalyzeMeasurement, SolarEdgeMeasurement} from '../model';

export class RemoteDataService {

  getEalyzeData = (): Promise<EalyzeMeasurement> => {
    return new Promise((resolve, reject) => {
      axios.get(config.ealyze.endpoint, {
      }).then(r => {
        resolve();
      }).catch(e => reject(e));
    });
  };

  getSolarEdgeData = (id: string): Promise<SolarEdgeMeasurement> => {
    return new Promise((resolve, reject) => {
      const url = config.solaredge.endpoint.replace('{0}', id);
      axios.get(url, {
        params: {
          api_key: config.solaredge.key,
          format: 'json',
        }
      }).then(r => {
        resolve({currentPower: r.data.overview.currentPower.power});
      }).catch(e => reject(e));
    });
  };
}
