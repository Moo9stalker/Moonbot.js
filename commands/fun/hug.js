const {Command} = require('discord.js-commando');
const Discord = require('discord.js');
const { Database } = require('quickmongo');
const db = new Database(process.env.MONGODB_SRV);
const fetch = require('node-fetch');

module.exports = class hug extends Command {
	constructor(client) {
		super(client, {
			name: 'hug',
			group: 'fun',
			memberName: 'hug',
			description: 'hug someone',
      args: [
				{
					key: 'arg',
					prompt: 'Whom do you wanna hug?',
					type: 'user'},
			],
     
		});
  }
	
 async run(message, { arg }) {

   if(message.author.id == arg.id){

     return  message.lineReply('<:Kanao_smile:860909096659714048> Seems you need a hug, let me hug you...')
   }

   const link =  await fetch('https://nekos.life/api/hug').then(res => res.json())

  let hugn;
  let num;

  if(await db.get(`hug_${message.author.id}_${arg.id}`)){
    hugn = await db.get(`hug_${message.author.id}_${arg.id}`) + ` times <3`;

    num = 1

  } else { hugn = `1st time <3`;
  num = 2 }
      

   

    const embed = new Discord.MessageEmbed()
        .setColor('RANDOM')
        .setDescription(`<:dt_arrowpink:864185398581133332> **${message.author.username}** *hugs* ‎\u200B **${arg.username}**`)
        .setImage(link.url).setFooter(`${arg.username} has been hugged by ${message.author.username} ${hugn}`,
          message.author.avatarURL({ dynamic: true }));

   message.channel.send(embed)

   await db.add(`hug_${message.author.id}_${arg.id}`, num)


  }
};