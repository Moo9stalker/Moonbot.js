const {Command} = require('discord.js-commando');

module.exports = class games extends Command {
  constructor(client){
    super(client, {
      name: 'guessthenumber',
      aliases: ['gtn'],
      group: "games",
      memberName: 'gtn',
      description: 'Starts a game of **guess the number** (the 1st person to type the correct number will win)',
      args: [
        {
          key: 'number',
          prompt: 'Please provide a number!',
          type: 'integer'
        }
      ]
    });
  }
  async run(message, {number}) {
      let rawGuess = parseInt(number)
      let finalGuess = Math.floor(Math.random() * rawGuess + 1)
      const filter = a => parseInt(a.content) === parseInt(finalGuess) 
      message.channel.send(`${message.author} I have sent you the correct number in Dm!`)
      message.author.send('The number to be guessed is **' + finalGuess + '**')
      message.channel.updateOverwrite(message.channel.guild.roles.everyone, {
              SEND_MESSAGES: true
            })
      message.channel.send('Game of Guess the number has been started [range is **0 - '+ rawGuess + '**], Game will end when someone guesses the correct number and the channel will be locked! Good Luck <:Kanao_smile:860909096659714048>')
      message.channel.awaitMessages(filter, {max: 1, time: 60000000})
        .then(collected => {
          try{
            message.channel.send(`${collected.first().author} guessed it!`, {embed: {
              title: 'Game Ended',
              description: `The correct number was **${finalGuess}**!`,
              timestamp: new Date()
            }})
            message.channel.updateOverwrite(message.channel.guild.roles.everyone, {
              SEND_MESSAGES: false
            })
          } catch(e) {
            console.log(e)
          }
        })
        .catch(console.error)
    }
}