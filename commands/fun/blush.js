const {Command} = require('discord.js-commando');
const Discord = require('discord.js');

const fetch = require('node-fetch');

module.exports = class blush extends Command {
	constructor(client) {
		super(client, {
			name: 'blush',
			group: 'fun',
			memberName: 'blush',
			description: 'blush owo'
     
		});
  }
	
 async run(message, { arg }) {

   const link =  await fetch('https://purrbot.site/api/img/sfw/blush/gif').then(res => res.json())

   const embed = new Discord.MessageEmbed()
        .setColor('RANDOM')
        .setDescription(`<:dt_arrowpink:864185398581133332> **${message.author.username}** *is blushing*`)
        .setImage(link.link)

   message.channel.send(embed)
  }
};