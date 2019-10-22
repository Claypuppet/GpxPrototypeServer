export const config = {
  ealyze: {
    endpoint: 'http://localhost:10101/ealyze',
    key: process.env.EALYZE_KEY
  },
  solaredge: {
    endpoint: 'https://monitoringapi.solaredge.com/site/{0}/overview',
    key: process.env.SOLAREDGE_KEY
  },
  lommerd: {
    meterId: 1,
    solaredgeId: '263997',
    importEan: '871687120050601718',
    exportEan: '871687180000556871',
  },
  dazo: {
    meterId: 2,
    importEan: '871687120050601664',
  },
  port: process.env.NODEJS_PORT || 3000,
};
