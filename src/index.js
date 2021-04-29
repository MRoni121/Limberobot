"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var discord_js_1 = __importDefault(require("discord.js"));
var dotenv_1 = __importDefault(require("dotenv"));
var config_json_1 = require("../config.json");
var playQ_1 = __importDefault(require("./utils/songs/playQ"));
var skipQ_1 = __importDefault(require("./utils/songs/skipQ"));
var stopQ_1 = __importDefault(require("./utils/songs/stopQ"));
var welcome_1 = __importDefault(require("./utils/welcome"));
var client = new discord_js_1.default.Client();
var queue = new Map();
dotenv_1.default.config();
client.on('ready', function () { return __awaiter(void 0, void 0, void 0, function () {
    var aChannel, channel;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                aChannel = client.channels.cache.get('837351685906628681');
                channel = aChannel;
                return [4 /*yield*/, (channel === null || channel === void 0 ? void 0 : channel.send('Online e sem calcinha'))];
            case 1:
                _a.sent();
                return [2 /*return*/];
        }
    });
}); });
client.on('message', function (message) { return __awaiter(void 0, void 0, void 0, function () {
    var msg, serverQueue, members, memberToUnmute, members, memberToMute;
    var _a, _b, _c;
    return __generator(this, function (_d) {
        switch (_d.label) {
            case 0:
                if (message.author.bot)
                    return [2 /*return*/];
                msg = message.content;
                if (!msg.startsWith(config_json_1.prefix)) return [3 /*break*/, 1];
                serverQueue = queue.get((_a = message.guild) === null || _a === void 0 ? void 0 : _a.id);
                if (msg.startsWith(config_json_1.prefix + "play")) {
                    playQ_1.default(message, serverQueue, queue);
                    return [2 /*return*/];
                }
                else if (msg.startsWith(config_json_1.prefix + "stop")) {
                    stopQ_1.default(message, serverQueue);
                    return [2 /*return*/];
                }
                else if (msg.startsWith(config_json_1.prefix + "skip")) {
                    skipQ_1.default(message, serverQueue);
                    return [2 /*return*/];
                }
                else if (msg.startsWith(config_json_1.prefix + "help")) {
                    message.channel.send("Seguinte, amigo: \n      Se tu quer botar uma m\u00FAsica pra tocar, escreve \"!play nome ou link da musica\".\n      Se tu quer pular uma m\u00FAsica, escreve \"!skip\".\n      Agora se tu quer me matar, escreve \"!stop\".\n      ");
                }
                else {
                    message.channel.send('Digita um comando que existe amigoooo');
                    message.channel.send('Se tiver dúvida, escreve !help');
                }
                return [3 /*break*/, 6];
            case 1:
                if (!(msg.toUpperCase() === 'OI LIMBEROBOT')) return [3 /*break*/, 2];
                message.channel.send("Oi " + message.author.toString());
                return [3 /*break*/, 6];
            case 2:
                if (!msg.toUpperCase().includes('UNMUTE')) return [3 /*break*/, 4];
                return [4 /*yield*/, ((_b = message.guild) === null || _b === void 0 ? void 0 : _b.members.fetch())];
            case 3:
                members = _d.sent();
                memberToUnmute = members === null || members === void 0 ? void 0 : members.find(function (member) { return msg.toUpperCase().includes(member.user.username.toUpperCase()); });
                memberToUnmute === null || memberToUnmute === void 0 ? void 0 : memberToUnmute.voice.setMute(false);
                return [3 /*break*/, 6];
            case 4:
                if (!msg.toUpperCase().includes('MUTE')) return [3 /*break*/, 6];
                return [4 /*yield*/, ((_c = message.guild) === null || _c === void 0 ? void 0 : _c.members.fetch())];
            case 5:
                members = _d.sent();
                memberToMute = members === null || members === void 0 ? void 0 : members.find(function (member) { return msg.toUpperCase().includes(member.user.username.toUpperCase()); });
                memberToMute === null || memberToMute === void 0 ? void 0 : memberToMute.voice.setMute(true);
                _d.label = 6;
            case 6: return [2 /*return*/];
        }
    });
}); });
client.on('guildMemberAdd', function (member) { return __awaiter(void 0, void 0, void 0, function () {
    var aChannel, channel;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                aChannel = client.channels.cache.get('837351685906628681');
                channel = aChannel;
                return [4 /*yield*/, (channel === null || channel === void 0 ? void 0 : channel.send('AMIGOOOOOOOOOOOOO'))];
            case 1:
                _a.sent();
                return [4 /*yield*/, (channel === null || channel === void 0 ? void 0 : channel.send(welcome_1.default(member.user.username)))];
            case 2:
                _a.sent();
                return [2 /*return*/];
        }
    });
}); });
client.login(process.env.TOKEN);
console.log('deu tudo certo');
