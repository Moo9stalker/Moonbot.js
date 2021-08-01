const {Command} = require('discord.js-commando');
const Discord = require('discord.js');
const { Database } = require('quickmongo');
const db = new Database(process.env.MONGODB_SRV);
const fetch = require('node-fetch');

module.exports = class kiss extends Command {
	constructor(client) {
		super(client, {
			name: 'kiss',
			group: 'fun',
			memberName: 'kiss',
			description: 'kiss someone',
      args: [
				{
					key: 'arg',
					prompt: 'Whom do you wanna kiss?',
					type: 'user'},
			],
     
		});
  }
	
 async run(message, { arg }) {

   if(message.author.id == arg.id){

     return  message.lineReply('<:Kanao_whaa:860916406694051850> I wonder how you can kiss yourself...')
   }

   const link =  await fetch('https://nekos.life/api/kiss').then(res => res.json())

  let kissn;
  let num;

  if(await db.get(`kiss_${message.author.id}_${arg.id}`)){
    kissn = await db.get(`kiss_${message.author.id}_${arg.id}`) + ` times <3`;

    num = 1

  } else { kissn = `1st time <3`;
  num = 2 }
      

   

    const embed = new Discord.MessageEmbed()
        .setColor('RANDOM')
        .setDescription(`<:dt_arrowpink:864185398581133332> **${message.author.username}** *kisses* ‎\u200B **${arg.username}** <:dv_wShinyHeartsOwO:869906717708812308>`)
        .setImage(link.url).setFooter(`${message.author.username} has kissed ${arg.username} ${kissn}`,
          message.author.avatarURL({ dynamic: true }));

   message.channel.send(embed)

   await db.add(`kiss_${message.author.id}_${arg.id}`, num)


  }
};