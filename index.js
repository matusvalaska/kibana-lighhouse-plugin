import { resolve } from 'path';
import { existsSync } from 'fs';

import { i18n } from '@kbn/i18n';

import exampleRoute from './server/routes/example';

export default function(kibana) {
  return new kibana.Plugin({
    require: ['elasticsearch'],
    name: 'lighthouse_plugin',
    uiExports: {
      app: {
        title: 'Lighthouse Plugin',
        description: 'Lighthouse audit plugin',
        main: 'plugins/lighthouse_plugin/app',
      },
      hacks: ['plugins/lighthouse_plugin/hack'],
      styleSheetPaths: [
        resolve(__dirname, 'public/app.scss'),
        resolve(__dirname, 'public/app.css'),
      ].find(p => existsSync(p)),
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
        const featureId = 'lighthouse_plugin';

        xpackMainPlugin.registerFeature({
          id: featureId,
          name: i18n.translate('lighthousePlugin.featureRegistry.featureName', {
            defaultMessage: 'lighthouse-plugin',
          }),
          navLinkId: featureId,
          icon: 'questionInCircle',
          app: [featureId, 'kibana'],
          catalogue: [],
          privileges: {
            all: {
              api: [],
              savedObject: {
                all: [],
                read: [],
              },
              ui: ['show'],
            },
            read: {
              api: [],
              savedObject: {
                all: [],
                read: [],
              },
              ui: ['show'],
            },
          },
        });
      }

      // Add server routes and initialize the plugin here
      exampleRoute(server);
      const message = `Server adress is ${server.info.uri}`;
      server.log(['info'], message + '***************** ****************');
    },
  });
}
