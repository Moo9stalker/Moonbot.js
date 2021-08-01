const {Command} = require('discord.js-commando');
const Discord = require('discord.js');

const fetch = require('node-fetch');

module.exports = class neko extends Command {
	constructor(client) {
		super(client, {
			name: 'neko',
			group: 'fun',
			memberName: 'neko',
			description: 'neko gif',
     
		});
  }
	
 async run(message, ) {

      var errMessage = 'This is not an NSFW Channel';
      if (!message.channel.nsfw) {
        message.react('💢');

        return message.reply(errMessage).then(msg => {
          setTimeout(() => msg.delete(), 4000);
        });
      }

   const link =  await fetch('https://nekos.life/api/neko').then(res => res.json())

const embed = new Discord.MessageEmbed()
        .setColor('RANDOM')
        .setDescription(`<:dt_arrowpink:864185398581133332> ${message.author.username} here's a neko *Meow!*`)
        .setImage(link.neko);

   message.channel.send(embed)

 

  }
};