const config = {
    "api": {
        "base": "https://demo.ledgerpay.io",
        "proxy": "http://ledgerpay.local"
    },
    "socket": {
        "url": "wss://api-demo.ledgerpay.io/ws/"
    },
    "isDev": true,
    "needConsole": true,
    "blockedFromRobot": [
        "/request-password-reset",
        "/email-confirm",
        "/reset-password",
        "/ga-confirm"
    ],
    "lastPurge": 1504705114108
};

export default config;
