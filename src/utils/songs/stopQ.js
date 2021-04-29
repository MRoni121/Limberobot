"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = (function (message, serverQueue) {
    var _a, _b;
    if (!((_a = message.member) === null || _a === void 0 ? void 0 : _a.voice.channel)) {
        return message.channel.send('Vai pra um canal de voz amigooooo');
    }
    if (!serverQueue) {
        return message.channel.send('Não tem música tocando amigão');
    }
    serverQueue.songs = [];
    (_b = serverQueue.connection) === null || _b === void 0 ? void 0 : _b.dispatcher.end();
});
