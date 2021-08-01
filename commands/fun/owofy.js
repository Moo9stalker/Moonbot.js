const {Command} = require('discord.js-commando');

const fetch = require('node-fetch');

module.exports = class owofy extends Command {
	constructor(client) {
		super(client, {
			name: 'owofy',
			group: 'fun',
			memberName: 'owofy',
      aliases: ['owo'],
			description: 'owofy a text',
      argsPromptLimit: 0,

      args: [
				{
					key: 'arg',
					prompt: 'Provide a text to owofy...',
					type: 'string',
          default: ''
          },
			],
     
		});
  }
	
 async run(message, { arg }) {

   if(!arg){

  return message.lineReply('You need to provide me a text to owofy')  

   }

 else {


 const text = arg;

  if(text.length > 200) return msg.send("oopsie whoopsie text can not be over 200 charachters");

    const { owo } = await fetch(`https://nekos.life/api/v2/owoify?text=${text}`)
      .then((res) => res.json());

      message.lineReplyNoMention(owo)
  }
 }
};