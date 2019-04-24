let config = {};

if (typeof process.env.CONFIG !== 'undefined') {
    config = process.env.CONFIG;
} else {
    config = require('core/configs/mobile').default;
}

export default config;
