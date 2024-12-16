const path = require('path');

module.exports = function override(config) {
    config.resolve.alias = {
        ...config.resolve.alias,
        '@': path.resolve(__dirname, 'src'), // '@'를 'src'로 매핑
    };
    return config;
};
