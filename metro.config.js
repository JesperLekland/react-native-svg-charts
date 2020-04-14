const path = require('path')
const blacklist = require('metro-config/src/defaults/blacklist')
const escape = require('escape-string-regexp')

const root = path.resolve(__dirname, '.')

/**
 * Metro configuration for React Native
 * https://github.com/facebook/react-native
 *
 * @format
 */
module.exports = {
    // projectRoot: __dirname,
    // watchFolders: [root],
    resolver: {
        // prevent lib folder to be watched
        blacklistRE: blacklist([new RegExp(`^${escape(path.join(root, 'lib'))}\\/.*$`)]),
    },
    transformer: {
        getTransformOptions: async () => ({
            transform: {
                experimentalImportSupport: false,
                inlineRequires: true,
            },
        }),
    },
}
