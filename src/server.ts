import express from 'express';
import SocketIO from 'socket.io';
import {Server} from 'http';
import {ApiController} from './controllers/apiController';
import {SocketController} from './controllers/socketController';
import {AggregatorService} from "./service/AggregatorService";

const expressApp: express.Application = express();
const httpApp: Server = new Server(expressApp);
const io: SocketIO.Server = SocketIO(httpApp);

const aggregator = new AggregatorService(io);
const socketController: SocketController = new SocketController(io, aggregator);
const apiController: ApiController = new ApiController(expressApp, aggregator);

/**
 * AI endpoint
 */
apiController.initiate(httpApp);

/**
 * Socket endpoint
 */
socketController.initiate();

/**
 * Run aggregator data collector
 */
setInterval(() => {
  aggregator.refreshData();
}, 1000 * 60 * 10);  // Every 10 minutes
