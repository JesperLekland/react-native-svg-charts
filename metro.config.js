const blacklist = require('metro-config/src/defaults/blacklist')

/**
 * Metro configuration for React Native
 * https://github.com/facebook/react-native
 *
 * @format
 */
module.exports = {
    resolver: {
        blacklistRE: blacklist(['<rootDir>/lib/']),
    },
    transformer: {
        getTransformOptions: async () => ({
            transform: {
                experimentalImportSupport: false,
                inlineRequires: false,
            },
        }),
    },
}
