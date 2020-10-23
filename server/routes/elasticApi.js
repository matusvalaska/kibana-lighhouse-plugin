import es from 'elasticsearch';
// const { Client } = require('@elastic/elasticsearch');

// const elasticsearchHost = 'http://192.168.1.11:9200';
const elasticsearchHost = 'https://10.244.7.29:9200';
const elasticsearchIndex = 'speed-000003';

function getIndexRequestBody(gte, lte) {
  return `{"version":true,"size":500,"sort":[{"datetime":{"order":"desc","unmapped_type":"boolean"}}],"aggs":{"2":{"date_histogram":{"field":"datetime","fixed_interval":"30s","time_zone":"Europe/Bratislava","min_doc_count":1}}},"stored_fields":["*"],"script_fields":{},"docvalue_fields":[{"field":"@timestamp","format":"date_time"},{"field":"BPO_TIMESTAMP","format":"date_time"},{"field":"EVENT_TIME","format":"date_time"},{"field":"OSTimestamp","format":"date_time"},{"field":"OS_TIMESTAMP","format":"date_time"},{"field":"datetime","format":"date_time"},{"field":"errorDateTime","format":"date_time"}],"_source":{"excludes":[]},"query":{"bool":{"must":[],"filter":[{"match_all":{}},{"match_phrase":{"fields.is_lighthouse":true}},{"range":{"dateTime":{"gte":"${gte}","lte":"${lte}","format":"epoch_millis"}}}],"should":[],"must_not":[]}}}`;
}

export default function (server) {
  const { callWithInternalUser } = server.plugins.elasticsearch.getCluster('data');
  const internalQuery = {
    format: 'JSON',
  };
  callWithInternalUser('cat.indices', internalQuery).then((response) => {
    console.log('Cluster indices:' + response);
    server.route({
      path: '/api/kibana-lighthouse-plugin/elasticApi/lighthouse/report',
      method: 'GET',
      async handler(req, reply) {
        const client = new es.Client({
          node: elasticsearchHost,
          host: elasticsearchHost,
          hosts: elasticsearchHost,
        });
        const queryParams = req.query;
        return await client.search({
          index: elasticsearchIndex,
          // q: query,
          body: JSON.parse(getIndexRequestBody(queryParams.gte, queryParams.lte)),
        });
      },
    });
  });
}
