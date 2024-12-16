const path = require('path');

module.exports = {
    resolve: {
        alias: {
            '@': path.resolve(__dirname, 'src'), // '@'는 'src'로 매핑
        },
        extensions: ['.js', '.jsx', '.json'], // 확장자 자동 인식
    },
};
