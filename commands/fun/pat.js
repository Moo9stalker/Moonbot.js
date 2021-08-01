const {Command} = require('discord.js-commando');
const Discord = require('discord.js');
const { Database } = require('quickmongo');
const db = new Database(process.env.MONGODB_SRV);
const fetch = require('node-fetch');

module.exports = class pat extends Command {
	constructor(client) {
		super(client, {
			name: 'pat',
			group: 'fun',
			memberName: 'pat',
			description: 'pat someone',
      args: [
				{
					key: 'arg',
					prompt: 'Whom do you wanna pat?',
					type: 'user'},
			],
     
		});
  }
	
 async run(message, { arg }) {

   if(message.author.id == arg.id){

     return  message.lineReply(`w~wait ${arg.username} don't pat urself, I will pat you ...`)
   }

   const link =  await fetch('https://nekos.life/api/pat').then(res => res.json())

  let patn;
  let num;

  if(await db.get(`pat_${message.author.id}_${arg.id}`)){
    patn = await db.get(`pat_${message.author.id}_${arg.id}`) + ` times <3`;

    num = 1

  } else { patn = `1st time <3`;
  num = 2 }
      

   

    const embed = new Discord.MessageEmbed()
        .setColor('RANDOM')
        .setDescription(`<:dt_arrowpink:864185398581133332> **${message.author.username}** *gently pats* ‎\u200B **${arg.username}** <:ds_girlTinyPat:830790017215496202>`)
        .setImage(link.url).setFooter(`${arg.username} has been patted by ${message.author.username} ${patn}`,
          message.author.avatarURL({ dynamic: true }));

   message.channel.send(embed)

   await db.add(`pat_${message.author.id}_${arg.id}`, num)


  }
};