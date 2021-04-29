import { Message } from "discord.js";
import Queue from "../../@types/queue";

export default (message: Message, serverQueue: Queue) => {
  if(!message.member?.voice.channel) {
    return message.channel.send('Vai pra um canal de voz amigooooo');
  }

  if(!serverQueue) {
    return message.channel.send('Não tem música tocando amigão');
  }

  serverQueue.songs = [];
  serverQueue.connection?.dispatcher.end();
}