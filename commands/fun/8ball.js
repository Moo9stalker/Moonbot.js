const { Command } = require('discord.js-commando');

var eball = require('../../resources/eightballqs.js')

module.exports = class eightball extends Command {
	constructor(client) {
		super(client, {
			name: '8ball',
			group: 'fun',
			memberName: '8ball',
			description: 'Ask a yes and no Squestion to the magic eightball.',
      argsPromptLimit: 1,
      args: [
				{
					key: 'arg',
					prompt: 'Ummm, what is your question? <a:AAE_What:845752862376984606>',
					type: 'string',
        
				},
			],
     
		});
	}

async run(message, { arg }) {

  

      message.lineReply(
        ':8ball: ' +
        eball[Math.floor(Math.random() * eball.length).toString()]
      )
}
  	
};