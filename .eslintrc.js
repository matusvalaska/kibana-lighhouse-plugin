module.exports = {
  root: true,
  extends: ['@elastic/eslint-config-kibana', 'plugin:@elastic/eui/recommended'],
  settings: {
    'import/resolver': {
      '@kbn/eslint-import-resolver-kibana': {
        rootPackageName: 'lighthouse_plugin',
      },
    },
  },
  overrides: [
    {
      files: ['**/public/**/*'],
      settings: {
        'import/resolver': {
          '@kbn/eslint-import-resolver-kibana': {
            forceNode: false,
            rootPackageName: 'lighthouse_plugin',
          },
        },
      },
    },
  ]
};
