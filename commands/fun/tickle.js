const {Command} = require('discord.js-commando');
const Discord = require('discord.js');
const { Database } = require('quickmongo');
const db = new Database(process.env.MONGODB_SRV);
const fetch = require('node-fetch');

module.exports = class tickle extends Command {
	constructor(client) {
		super(client, {
			name: 'tickle',
			group: 'fun',
			memberName: 'tickle',
			description: 'tickle someone',
      args: [
				{
					key: 'arg',
					prompt: 'Whom do you wanna tickle?',
					type: 'user'},
			],
     
		});
  }
	
 async run(message, { arg }) {

   const link =  await fetch('https://nekos.life/api/v2/img/tickle').then(res => res.json())

  let ticklen;
  let num;

  if(await db.get(`tickle_${message.author.id}_${arg.id}`)){
    ticklen = await db.get(`tickle_${message.author.id}_${arg.id}`) + ` times <3`;

    num = 1

  } else { ticklen = `1st time <3`;
  num = 2 }
      

   

    const embed = new Discord.MessageEmbed()
        .setColor('RANDOM')
        .setDescription(`<:dt_arrowpink:864185398581133332> **${message.author.username}** *tickles* ‎\u200B **${arg.username}**`)
        .setImage(link.url).setFooter(`${message.author.username} has tickled ${arg.username} ${ticklen}`,
          message.author.avatarURL({ dynamic: true }));

   message.channel.send(embed)

   await db.add(`tickle_${message.author.id}_${arg.id}`, num)


  }
};