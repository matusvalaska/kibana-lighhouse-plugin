const elasticsearchIndex = 'speed-000003';

function getIndexRequestBody(gte, lte) {
  return `{"version":true,"size":500,"sort":[{"datetime":{"order":"desc","unmapped_type":"boolean"}}],"aggs":{"2":{"date_histogram":{"field":"datetime","fixed_interval":"30s","time_zone":"Europe/Bratislava","min_doc_count":1}}},"stored_fields":["*"],"script_fields":{},"docvalue_fields":[{"field":"@timestamp","format":"date_time"},{"field":"BPO_TIMESTAMP","format":"date_time"},{"field":"EVENT_TIME","format":"date_time"},{"field":"OSTimestamp","format":"date_time"},{"field":"OS_TIMESTAMP","format":"date_time"},{"field":"datetime","format":"date_time"},{"field":"errorDateTime","format":"date_time"}],"_source":{"excludes":[]},"query":{"bool":{"must":[],"filter":[{"match_all":{}},{"match_phrase":{"fields.is_lighthouse":true}},{"range":{"dateTime":{"gte":"${gte}","lte":"${lte}","format":"epoch_millis"}}}],"should":[],"must_not":[]}}}`;
}

export default function (server) {
  const { callWithRequest } = server.plugins.elasticsearch.getCluster('data');
  server.route({
    path: '/api/kibana-lighthouse-plugin/report',
    method: 'GET',
    async handler(req, reply) {
      const internalQuery = {
        format: 'JSON',
        index: elasticsearchIndex,
        size: 10,
        body: JSON.parse(getIndexRequestBody(req.query.gte, req.query.lte)),
      };
      try {
        return await callWithRequest(req, 'search', internalQuery).then((response) => {
          return response;
        });
      } catch (errResp) {
        throw errResp;
      }
    },
  });
}
