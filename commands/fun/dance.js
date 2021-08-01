const {Command} = require('discord.js-commando');
const Discord = require('discord.js');
;
const fetch = require('node-fetch');

module.exports = class dance extends Command {
	constructor(client) {
		super(client, {
			name: 'dance',
			group: 'fun',
			memberName: 'dance',
			description: 'dance owo'
     
		});
  }
	
 async run(message, { arg }) {

   const link =  await fetch('https://purrbot.site/api/img/sfw/dance/gif').then(res => res.json())

      

   

    const embed = new Discord.MessageEmbed()
        .setColor('RANDOM')
        .setDescription(`<:dt_arrowpink:864185398581133332> **${message.author.username}** *is dancing* :D`)
        .setImage(link.link)

   message.channel.send(embed)
  }
};