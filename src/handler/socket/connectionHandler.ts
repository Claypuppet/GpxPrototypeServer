export class ConnectionHandler {
  client: SocketIO.Socket;
  ioManager: SocketIO.Server;
  token: string;

  constructor(socket: SocketIO.Socket, io: SocketIO.Server) {
    this.client = socket;
    this.ioManager = io;
  }

  handleDisconnect = (data: any, resolve: (d?: any) => void): void => {
    resolve('OK')
  };
}
