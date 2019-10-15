export const config = {
  ealyze: {
    endpoint: 'http://localhost:10101/ealyze',
    key: process.env.EALYZE_KEY
  },
  solaredge: {
    endpoint: 'http://localhost:10101/solaredge',
    key: process.env.SOLAREDGE_KEY
  },
  ioPort: process.env.SOCKET_PORT || 3000,
  apiPort: process.env.API_PORT || 3000
};
