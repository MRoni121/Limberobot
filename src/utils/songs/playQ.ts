import { Guild, Message, TextChannel } from "discord.js";
import ytdl from "ytdl-core";
import ytSearch from 'yt-search';
import Queue from "../../@types/queue";

interface Song {
  title: string,
  url: string
}

export default async (message: Message, serverQueue: Queue, queue: Map<string, Queue>) => {
  const voiceChannel = message.member?.voice.channel;
  if(!voiceChannel) return message.channel.send('Vai pra um canal de voz amigooooo');

  const args = message.content.split(' ').slice(1);
  const song: Song = {} as Song

  if(ytdl.validateURL(args[0])) {
    const songInfo = await ytdl.getInfo(args[0]);
    song.title = songInfo.videoDetails.title;
    song.url = songInfo.videoDetails.video_url;
  }

  else {
    const video = await videoFinder(args.join(' '));
    if(!!video) {
      song.title = video.title;
      song.url = video.url;
    }

    else return message.channel.send('Amigo não achei a música ou o vídeo :(');
  }
  

  if(!serverQueue) {
    const queueConstructor: Queue = {
      textChannel: <TextChannel> message.channel,
      voiceChannel,
      connection: null,
      songs: [],
      volume: 5,
      playing: true
    }
    queue.set(message.guild?.id as string, queueConstructor);
    queueConstructor.songs.push(song);

    try {
      const connection = await voiceChannel.join();
      queueConstructor.connection = connection;
      play(message.guild, queueConstructor.songs[0], queue);

    } catch(err) {
      queue.delete(message.guild?.id as string);
      console.log(err);
      return message.channel.send(`Amigo... não consegui :(`);
    }
  }
  else {
    serverQueue.songs.push(song);
    return message.channel.send(`AMIGO adicionei ${song.title} na fila`);
  }
}

const play = (guild: Guild | null, song: Queue['songs'][0], queue: Map<string, Queue>) => {
  const serverQueue = queue.get(guild?.id as string);
  if(!song) {
    serverQueue?.textChannel.send('Acabaram as músicas, amigos')
    serverQueue?.voiceChannel.leave();
    queue.delete(guild?.id as string);
    return;
  }
  console.log(serverQueue);
  const dispatcher = serverQueue?.connection
      ?.play(ytdl(song.url, {filter: 'audioonly'}))
      .on("finish", () => {
          serverQueue.songs.shift();
          play(guild, serverQueue.songs[0], queue);
      })
      .on("error", error => console.error(error));

  dispatcher?.setVolumeLogarithmic(serverQueue?.volume as number / 5);
  serverQueue?.textChannel.send(`Tocando agora: ${song.title}`);
}

const videoFinder = async (query: string) => {
  const videoResult = await ytSearch(query);
  return !!videoResult.videos.length ? videoResult.videos[0] : null;
}