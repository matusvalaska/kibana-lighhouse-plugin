import { resolve } from 'path';
import { existsSync } from 'fs';

import { i18n } from '@kbn/i18n';

import exampleRoute from './server/routes/example';
import elasticApi from './server/routes/elasticApi';

export default function (kibana) {
  return new kibana.Plugin({
    require: ['elasticsearch'],
    name: 'kibana-lighthouse-plugin',
    uiExports: {
      app: {
        title: 'Lighthouse Plugin',
        description: 'Lighthouse audit plugin',
        main: 'plugins/kibana-lighthouse-plugin/app',
      },
      hacks: ['plugins/kibana-lighthouse-plugin/hack'],
      styleSheetPaths: [
        resolve(__dirname, 'public/app.scss'),
        resolve(__dirname, 'public/app.css'),
      ].find((p) => existsSync(p)),
    },

    config(Joi) {
      return Joi.object({
        enabled: Joi.boolean().default(true),
      }).default();
    },

    // eslint-disable-next-line no-unused-vars
    init(server, options) {
      const xpackMainPlugin = server.plugins.xpack_main;
      if (xpackMainPlugin) {
        const featureId = 'kibana-lighthouse-plugin';

        xpackMainPlugin.registerFeature({
          id: featureId,
          name: i18n.translate('lighthousePlugin.featureRegistry.featureName', {
            defaultMessage: 'lighthouse-plugin',
          }),
          navLinkId: featureId,
          icon: 'questionInCircle',
          app: [featureId, 'kibana'],
          catalogue: ['discover'],
          privileges: {
            all: {
              app: ['kibana'],
              catalogue: ['discover'],
              savedObject: {
                all: ['search', 'query'],
                read: ['index-pattern'],
              },
              ui: ['show'],
            },
            read: {
              app: ['kibana'],
              catalogue: ['discover'],
              savedObject: {
                all: [],
                read: ['index-pattern', 'search', 'query'],
              },
              ui: ['show'],
            },
          },
        });
      }

      // Add server routes and initialize the plugin here
      exampleRoute(server);
      elasticApi(server);
      const message = `Server adress is ${server.info.uri}`;
      server.log(['info'], message + '***************** ****************');
    },
  });
}
