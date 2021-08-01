const {Command} = require('discord.js-commando');
const Discord = require('discord.js');
;
const fetch = require('node-fetch');

module.exports = class smug extends Command {
	constructor(client) {
		super(client, {
			name: 'smug',
			group: 'fun',
			memberName: 'smug',
			description: 'smug owo'
     
		});
  }
	
 async run(message, { arg }) {

   const link =  await fetch('https://nekos.life/api/v2/img/smug').then(res => res.json())

      

   

    const embed = new Discord.MessageEmbed()
        .setColor('RANDOM')
        .setDescription(`<:dt_arrowpink:864185398581133332> **${message.author.username}** *smugs*`)
        .setImage(link.url)
   message.channel.send(embed)
  }
};