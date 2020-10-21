// import elasticsearch from 'elasticsearch';
const { Client } = require('@elastic/elasticsearch');

export default function (server) {
  const client = new Client({
    node: 'http://192.168.1.11:9200',
  });
  server.route({
    path: '/api/kibana-lighthouse-plugin/elasticApi',
    method: 'GET',
    async handler() {
      // let response;
      return await client.search({
        index: 'lighthouse',
        body: {
          // query: {
          // match: { hello: 'world' }
          // }
        },
      });
    },
  });
}
