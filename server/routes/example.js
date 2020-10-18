export default function(server) {
  server.route({
    path: '/api/kibana-lighthouse-plugin/example',
    method: 'GET',
    handler() {
      return { time: new Date().toISOString() };
    },
  });
}
