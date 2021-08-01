const {Command} = require('discord.js-commando');
const Discord = require('discord.js');
const { Database } = require('quickmongo');
const db = new Database(process.env.MONGODB_SRV);
const fetch = require('node-fetch');

module.exports = class slap extends Command {
	constructor(client) {
		super(client, {
			name: 'slap',
			group: 'fun',
			memberName: 'slap',
			description: 'slap someone',
      args: [
				{
					key: 'arg',
					prompt: 'Whom do you wanna slap?',
					type: 'user'},
			],
     
		});
  }
	
 async run(message, { arg }) {

   if(message.author.id == arg.id){

     return  message.lineReply(`<:Kanao_cry:860927497431810078> No ${arg.username}, self harm is not good...`)
   }

   const link =  await fetch('https://nekos.life/api/v2/img/slap').then(res => res.json())

  let slapn;
  let num;

  if(await db.get(`slap_${message.author.id}_${arg.id}`)){
    slapn = await db.get(`slap_${message.author.id}_${arg.id}`) + ` times <3`;

    num = 1

  } else { slapn = `1st time <3`;
  num = 2 }
      

   

    const embed = new Discord.MessageEmbed()
        .setColor('RANDOM')
        .setDescription(`<:dt_arrowpink:864185398581133332> **${message.author.username}** *slaps* ‎\u200B **${arg.username}** oof`)
        .setImage(link.url).setFooter(`${message.author.username} has slapped ${arg.username} ${slapn}`,
          message.author.avatarURL({ dynamic: true }));

   message.channel.send(embed)

   await db.add(`slap_${message.author.id}_${arg.id}`, num)


  }
};