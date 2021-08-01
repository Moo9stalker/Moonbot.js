const {Command} = require('discord.js-commando');
const Discord = require('discord.js');

const fetch = require('node-fetch');

module.exports = class waifu extends Command {
	constructor(client) {
		super(client, {
			name: 'waifu',
			group: 'fun',
			memberName: 'waifu',
			description: 'waifu gif',
     
		});
  }
	
 async run(message) {

   const link =  await fetch('https://nekos.life/api/v2/img/waifu').then(res => res.json())

const embed = new Discord.MessageEmbed()
        .setColor('RANDOM')
        .setDescription(`<:dt_arrowpink:864185398581133332> ${message.author.username} here's the waifu`)
        .setImage(link.url)

   message.channel.send(embed)

 

  }
};