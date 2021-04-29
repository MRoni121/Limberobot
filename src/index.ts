import discord, { TextChannel } from "discord.js";
import dotEnv from 'dotenv';
import { prefix } from '../config.json';
import playQ from "./utils/songs/playQ";
import skipQ from "./utils/songs/skipQ";
import stopQ from "./utils/songs/stopQ";
import welcome from "./utils/welcome";
import express from 'express';

const app = express();
app.get('/', (req, res) => res.send('Hello World'));
app.listen(3000, () => console.log('App running on port 3000'));

const client = new discord.Client();
const queue = new Map();
dotEnv.config();

client.on('ready', async () => {
  const aChannel = client.channels.cache.get('837351685906628681');
  const channel = <TextChannel> aChannel;

  await channel?.send('Online e sem calcinha');
})


client.on('message', async (message) => {
  if(message.author.bot) return;
  const msg = message.content;

  // ---------------------------   musica   -------------------------------- //
  if(msg.startsWith(prefix)) {
    const serverQueue = queue.get(message.guild?.id);

    if(msg.startsWith(`${prefix}play`)) {
      playQ(message, serverQueue, queue);
      return;
    }

    else if(msg.startsWith(`${prefix}stop`)) {
      stopQ(message, serverQueue);
      return;
    }

    else if(msg.startsWith(`${prefix}skip`)) {
      skipQ(message, serverQueue);
      return;
    }

    else if(msg.startsWith(`${prefix}help`)) {
      message.channel.send(`Seguinte, amigo: 
      Se tu quer botar uma música pra tocar, escreve "!play nome ou link da musica".
      Se tu quer pular uma música, escreve "!skip".
      Agora se tu quer me matar, escreve "!stop".
      `);
    } 

    else {
      message.channel.send('Digita um comando que existe amigoooo');
      message.channel.send('Se tiver dúvida, escreve !help');
    }
  }

  // ---------------------------   musica   -------------------------------- //
  
  else if(msg.toUpperCase() === 'OI LIMBEROBOT') {
    message.channel.send(`Oi ${message.author.toString()}`);
    // message.member?.voice.setMute(true);
  }
  
  else if(msg.toUpperCase().includes('UNMUTE')) {
    const members = await message.guild?.members.fetch();
    const memberToUnmute = members?.find(member => msg.toUpperCase().includes(member.user.username.toUpperCase()));
    memberToUnmute?.voice.setMute(false);
  }
  
  else if(msg.toUpperCase().includes('MUTE')) {
    const members = await message.guild?.members.fetch();
    const memberToMute = members?.find(member => msg.toUpperCase().includes(member.user.username.toUpperCase()));
    memberToMute?.voice.setMute(true);
  }
})

client.on('guildMemberAdd', async member => {
  const aChannel = client.channels.cache.get('837351685906628681');
  const channel = <TextChannel> aChannel;

  await channel?.send('AMIGOOOOOOOOOOOOO');
  await channel?.send(welcome(member.user.username));

})
client.login(process.env.TOKEN);
console.log('deu tudo certo');