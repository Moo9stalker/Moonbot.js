const {Command} = require('discord.js-commando');
const Discord = require('discord.js');
const { Database } = require('quickmongo');
const db = new Database(process.env.MONGODB_SRV);
const fetch = require('node-fetch');

module.exports = class lick extends Command {
	constructor(client) {
		super(client, {
			name: 'lick',
			group: 'fun',
			memberName: 'lick',
			description: 'lick someone',
      args: [
				{
					key: 'arg',
					prompt: 'Whom do you wanna lick?',
					type: 'user'},
			],
     
		});
  }
	
 async run(message, { arg }) {


   if(message.author.id == arg.id){

     return  message.lineReply(`<:Kanao_whaa:860916406694051850> ${arg.username} I don't think it's possible to lick yourself...`)
   }

   const link =  await fetch('https://purrbot.site/api/img/sfw/lick/gif').then(res => res.json())

  let lickn;
  let num;

  if(await db.get(`lick_${message.author.id}_${arg.id}`)){
    lickn = await db.get(`lick_${message.author.id}_${arg.id}`) + ` times <3`;

    num = 1

  } else { lickn = `1st time <3`;
  num = 2 }
      

   

    const embed = new Discord.MessageEmbed()
        .setColor('RANDOM')
        .setDescription(`<:dt_arrowpink:864185398581133332> **${message.author.username}** *licks* ‎\u200B **${arg.username}**`)
        .setImage(link.link).setFooter(`${message.author.username} has licked ${arg.username} ${lickn}`,
          message.author.avatarURL({ dynamic: true }));

   message.channel.send(embed)

   await db.add(`lick_${message.author.id}_${arg.id}`, num)


  }
};