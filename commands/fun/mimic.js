const { Command } = require('discord.js-commando');

const { Database } = require('quickmongo');
const db = new Database(process.env.MONGODB_SRV);


module.exports = class Mimic extends Command {
	constructor(client) {
		super(client, {
			name: 'mimic',
			group: 'fun',
			memberName: 'mimic',
			description: 'makes the bot copy the messages of a member',
      args: [
				{
					key: 'arg',
					prompt: 'Whom do you wanna mimic?',
					type: 'string',
          default: ' ',
        
				},
			],
     
		});
	}


async run(message, { arg }) {

  

    if (!message.guild.member(message.author).hasPermission('ADMINISTRATOR')) {
      return message.lineReply(
        `You don't have permission to use this command.`
      );
    }
    if (!arg[0]) {
      return message.lineReply(
        'Please specify a user whose messages I should mimic, example `ecmimic <user-id>`'
      );
    }
    if (arg.toLowerCase() == 'off' || arg.toLowerCase() == 'false') {
      await db.set(`mimic_${message.guild.id}`, '0');
      message.react('<a:AL_check11:861213307720957982>');
    } else {
      let user = arg.replace(/[\\<>@#&!]/g, '').split(' ')[0];

      let member = await this.client.users.fetch(user).catch(console.error);

      if (!member) {
        return message.lineReply(
          "I couldn't find any user with ID: `" + user + '`'
        );
      }

      await db.set(`mimic_${message.guild.id}`, member.id);
      message.react('<a:AL_check11:861213307720957982>');
    }
  
  	}
};