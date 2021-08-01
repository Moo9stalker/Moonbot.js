const {Command} = require('discord.js-commando');
const Discord = require('discord.js');

const fetch = require('node-fetch');

module.exports = class smile extends Command {
	constructor(client) {
		super(client, {
			name: 'smile',
			group: 'fun',
			memberName: 'smile',
			description: 'smile owo'
     
		});
  }
	
 async run(message, { arg }) {

   const link =  await fetch('https://purrbot.site/api/img/sfw/smile/gif').then(res => res.json())

      

   

    const embed = new Discord.MessageEmbed()
        .setColor('RANDOM')
        .setDescription(`<:dt_arrowpink:864185398581133332> **${message.author.username}** *is smiling*`)
        .setImage(link.link)

   message.channel.send(embed)
  }
};