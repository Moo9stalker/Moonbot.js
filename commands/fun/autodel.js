const { Command } = require('discord.js-commando');

const { Database } = require('quickmongo');
const db = new Database(process.env.MONGODB_SRV);

module.exports = class Autodel extends Command {
	constructor(client) {
		super(client, {
			name: 'autodel',
			group: 'fun',
      aliases: ['adel'],
			memberName: 'autodel',
      argsPromptLimit: 0,
      argsType: 'multiple',
			description: 'Deletes all the messages of the a certain member',
      args: [
				{
					key: 'arg',
					prompt: 'Whom do you wanna auto-delete?',
					type: 'string',
          default: '',
        
				},
			],
     
		});
	}

  


async run(message, { arg }) {

  let prefix =  message.guild.commandPrefix

    if (!message.guild.member(message.author).hasPermission('ADMINISTRATOR')) {
      return message.lineReply(
        `You don't have permission to use this command.`
      );
    }

    if (!arg[0]) {
      return message.lineReply(`Please specify the user whose messages I should delete.\n>Usage example: \`${prefix}adel <userid>\` or \`${prefix}adel off\``);
    }

    if (arg.toLowerCase() == 'off' || arg.toLowerCase() == 'false') {
      await db.set(`adel_${message.guild.id}`, '0');
      message.react('<:ec_check:871010259228065803>');
    } else {
      let user = arg.replace(/[\\<>@#&!]/g, '').split(' ')[0];;

      let member = await this.client.users.fetch(user).catch(console.error);

      if (!member) {
        return message.lineReply(
          "I couldn't find any user with ID: `" + user + '`'
        );
      }

      await db.set(`adel_${message.guild.id}`, member.id);

      message.react('<:ec_check:871010259228065803>');
    }
 	}
};