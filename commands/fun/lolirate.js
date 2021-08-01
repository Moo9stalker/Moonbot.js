const { Command } = require('discord.js-commando');
const Discord = require('discord.js');

module.exports = class loli extends Command {
	constructor(client) {
		super(client, {
			name: 'loli',
			group: 'fun',
			memberName: 'lolirate',
			description: 'Replies with the text you provide.',
			args: [
				{
					key: 'user',
					prompt: 'Whose loli Rate you wanna determine?',
					type: 'user',
				},
			],
		});
	}

	run(message, { user }) { 
    

    let rng;
    
    if(user.id == `737115771188281405`){
      rng = '100'
    }
    else if(user.id == `754296226903490571` || user.id == '432150163667288064'){
      rng = '0'
    } else {
    rng = Math.floor(Math.random() * 101);

    }

    const lembed = new Discord.MessageEmbed()
      .setTitle(`LoliRate Calculator`)
      .setDescription(`${user.username} is ` + rng + '% Loli <:ds_girlTinyPat:830790017215496202>')
      .setColor('ec80b1');

    message.channel.send(lembed);
  

	}
}