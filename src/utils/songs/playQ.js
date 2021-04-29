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
var ytdl_core_1 = __importDefault(require("ytdl-core"));
var yt_search_1 = __importDefault(require("yt-search"));
exports.default = (function (message, serverQueue, queue) { return __awaiter(void 0, void 0, void 0, function () {
    var voiceChannel, args, song, songInfo, video, queueConstructor, connection, err_1;
    var _a, _b, _c;
    return __generator(this, function (_d) {
        switch (_d.label) {
            case 0:
                voiceChannel = (_a = message.member) === null || _a === void 0 ? void 0 : _a.voice.channel;
                if (!voiceChannel)
                    return [2 /*return*/, message.channel.send('Vai pra um canal de voz amigooooo')];
                args = message.content.split(' ').slice(1);
                song = {};
                if (!ytdl_core_1.default.validateURL(args[0])) return [3 /*break*/, 2];
                return [4 /*yield*/, ytdl_core_1.default.getInfo(args[0])];
            case 1:
                songInfo = _d.sent();
                song.title = songInfo.videoDetails.title;
                song.url = songInfo.videoDetails.video_url;
                return [3 /*break*/, 4];
            case 2: return [4 /*yield*/, videoFinder(args.join(' '))];
            case 3:
                video = _d.sent();
                if (!!video) {
                    song.title = video.title;
                    song.url = video.url;
                }
                else
                    return [2 /*return*/, message.channel.send('Amigo não achei a música ou o vídeo :(')];
                _d.label = 4;
            case 4:
                if (!!serverQueue) return [3 /*break*/, 9];
                queueConstructor = {
                    textChannel: message.channel,
                    voiceChannel: voiceChannel,
                    connection: null,
                    songs: [],
                    volume: 5,
                    playing: true
                };
                queue.set((_b = message.guild) === null || _b === void 0 ? void 0 : _b.id, queueConstructor);
                queueConstructor.songs.push(song);
                _d.label = 5;
            case 5:
                _d.trys.push([5, 7, , 8]);
                return [4 /*yield*/, voiceChannel.join()];
            case 6:
                connection = _d.sent();
                queueConstructor.connection = connection;
                play(message.guild, queueConstructor.songs[0], queue);
                return [3 /*break*/, 8];
            case 7:
                err_1 = _d.sent();
                queue.delete((_c = message.guild) === null || _c === void 0 ? void 0 : _c.id);
                console.log(err_1);
                return [2 /*return*/, message.channel.send("Amigo... n\u00E3o consegui :(")];
            case 8: return [3 /*break*/, 10];
            case 9:
                serverQueue.songs.push(song);
                return [2 /*return*/, message.channel.send("AMIGO adicionei " + song.title + " na fila")];
            case 10: return [2 /*return*/];
        }
    });
}); });
var play = function (guild, song, queue) {
    var _a;
    var serverQueue = queue.get(guild === null || guild === void 0 ? void 0 : guild.id);
    if (!song) {
        serverQueue === null || serverQueue === void 0 ? void 0 : serverQueue.textChannel.send('Acabaram as músicas, amigos');
        serverQueue === null || serverQueue === void 0 ? void 0 : serverQueue.voiceChannel.leave();
        queue.delete(guild === null || guild === void 0 ? void 0 : guild.id);
        return;
    }
    console.log(serverQueue);
    var dispatcher = (_a = serverQueue === null || serverQueue === void 0 ? void 0 : serverQueue.connection) === null || _a === void 0 ? void 0 : _a.play(ytdl_core_1.default(song.url, { filter: 'audioonly' })).on("finish", function () {
        serverQueue.songs.shift();
        play(guild, serverQueue.songs[0], queue);
    }).on("error", function (error) { return console.error(error); });
    dispatcher === null || dispatcher === void 0 ? void 0 : dispatcher.setVolumeLogarithmic((serverQueue === null || serverQueue === void 0 ? void 0 : serverQueue.volume) / 5);
    serverQueue === null || serverQueue === void 0 ? void 0 : serverQueue.textChannel.send("Tocando agora: " + song.title);
};
var videoFinder = function (query) { return __awaiter(void 0, void 0, void 0, function () {
    var videoResult;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0: return [4 /*yield*/, yt_search_1.default(query)];
            case 1:
                videoResult = _a.sent();
                return [2 /*return*/, !!videoResult.videos.length ? videoResult.videos[0] : null];
        }
    });
}); };
