export default function(server) {
  server.route({
    path: '/api/lighthouse-plugin/example',
    method: 'GET',
    handler() {
      return { time: new Date().toISOString() };
    },
  });
}
