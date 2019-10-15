import {ConnectionHandler} from "../handler/socket/connectionHandler";
import {AggregatorService} from "../service/AggregatorService";
import {config} from "../config/env.config";

export class SocketController {
  io: SocketIO.Server;
  aggregator: AggregatorService;

  constructor(io: SocketIO.Server, aggregator: AggregatorService) {
    this.io = io;
    this.aggregator = aggregator;
  }

  socketConnect = (socket: SocketIO.Socket) => {

    console.log('connected');

    const connectionHandler = new ConnectionHandler(socket, this.io);

    socket.on('disconnect', connectionHandler.handleDisconnect);

    this.aggregator.sendDataToUser(socket);
  };

  initiate = () => {
    this.io.sockets.on('connection', this.socketConnect);
    console.log('SocketIO up and running at', config.ioPort);
  };
}
