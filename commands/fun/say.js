const { Command } = require('discord.js-commando');


module.exports = class SayCommand extends Command {
	constructor(client) {
		super(client, {
			name: 'say',
			group: 'fun',
			memberName: 'say',
			description: 'Replies with the text you provide.',
			args: [
				{
					key: 'text',
					prompt: 'What text would you like the bot to say?',
					type: 'string',
				},
			],
		});
	}

	run(message, { text }) {
    message.delete()
		message.channel.send(text, { allowedMentions: { parse: ["users"] } });
	}
};