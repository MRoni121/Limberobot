import { TextChannel, VoiceChannel, VoiceConnection } from "discord.js";

interface Queue {
  textChannel: TextChannel,
  voiceChannel: VoiceChannel,
  connection: VoiceConnection | null,
  songs: {
    title: string,
    url: string
  }[],
  volume: number,
  playing: boolean,
}

export default Queue