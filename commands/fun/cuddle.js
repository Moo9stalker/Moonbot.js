const {Command} = require('discord.js-commando');
const Discord = require('discord.js');
const { Database } = require('quickmongo');
const db = new Database(process.env.MONGODB_SRV);
const fetch = require('node-fetch');

module.exports = class cuddle extends Command {
	constructor(client) {
		super(client, {
			name: 'cuddle',
			group: 'fun',
			memberName: 'cuddle',
			description: 'cuddle someone',
      args: [
				{
					key: 'arg',
					prompt: 'Whom do you wanna cuddle?',
					type: 'user'},
			],
     
		});
  }
	
 async run(message, { arg }) {

   if(message.author.id == arg.id){

     return  message.lineReply(`Awww why don't you cuddle me instead...`)
   }

   const link =  await fetch('https://nekos.life/api/v2/img/cuddle').then(res => res.json())

  let cuddlen;
  let num;

  if(await db.get(`cuddle_${message.author.id}_${arg.id}`)){
    cuddlen = await db.get(`cuddle_${message.author.id}_${arg.id}`) + ` times <3`;

    num = 1

  } else { cuddlen = `1st time <3`;
  num = 2 }
      

   

    const embed = new Discord.MessageEmbed()
        .setColor('RANDOM')
        .setDescription(`<:dt_arrowpink:864185398581133332> **${message.author.username}** *cuddles* ‎\u200B **${arg.username}** <:dv_wShinyHeartsOwO:869906717708812308>`)
        .setImage(link.url).setFooter(`${message.author.username} has cuddled ${arg.username} ${cuddlen}`,
          message.author.avatarURL({ dynamic: true }));

   message.channel.send(embed)

   await db.add(`cuddle_${message.author.id}_${arg.id}`, num)


  }
};