const keep_alive = require('./keep_alive.js');

const express = require('express');
const Topgg = require('@top-gg/sdk');

const app = express();

const webhook = new Topgg.Webhook(process.env.topgg);
app.post(
  '/dblwebhook',
  webhook.listener(vote => {
    console.log(vote.user);
  })
);

app.listen(3000);
const Discord = require('discord.js');
const { Database } = require('quickmongo');
const db = new Database(process.env.MONGODB_SRV);
const fs = require('fs');
let ms = require('ms');
const moment = require('moment');
const YAML = require('yaml');
const DIG = require('discord-image-generation');
const txtgen = require('txtgen');
const pretty = require('pretty-ms');
const urban = require('urban');
const fetch = require('node-fetch');
const got = require('got');
const translate = require('@iamtraction/google-translate');
const { OpusEncoder } = require('@discordjs/opus');
const encoder = new OpusEncoder(48000, 2);
const { Client, MessageEmbed } = require('discord.js');
require('discord-reply');
require('@weky/inlinereply');

const dbs = require('quick.db');

const Commando = require('discord.js-commando');
const client = new Commando.Client({
  commandPrefix: 'etest',
  owner: '754296226903490571' 
});
require('discord-buttons')(client);
const disbut = require('discord-buttons');
const { MessageMenuOption, MessageMenu } = require('discord-buttons');
const { GiveawaysManager } = require('discord-giveaways');
client.commands = new Discord.Collection();
client.cooldowns = new Discord.Collection();
const path = require('path');

const MongoClient = require('mongodb').MongoClient;
const MongoDBProvider = require('commando-provider-mongo').MongoDBProvider;



client.registry
.registerDefaultTypes('path')
 
  .registerGroups([
    ['utility', 'Utility commands'],
    ['fun', 'Fun commands'],
    ['games', 'Minigames'],
    ['image', 'Image generation commands'],
    ['text', 'Text generation commands']
  ])
  .registerDefaultGroups()
  
  .registerDefaultCommands({
		help: false,
    unknownCommand: false,
})

 
  .registerCommandsIn(path.join(__dirname, 'commands'));

const PREFIX = 'ec'; // bot's prefix
var roleFunc = { _destroyed: true };
const shootcd = new Set();
const immunity = new Set();
const sniper = new Set();
const gun = new Set();
const namecd = new Set();
const hicd = new Set();
const heistcd = new Set();
const shield = new Set();
const nukeperm = new Set();
const nukeone = new Set();
const isnuke = new Set();
const ismping = new Set();

const manager = new GiveawaysManager(client, {
  storage: './giveaways.json',
  updateCountdownEvery: 10000,
  hasGuildMembersIntent: false,
  default: {
    botsCanWin: false,
    exemptPermissions: ['MANAGE_MESSAGES', 'ADMINISTRATOR'],
    embedColor: '#FF0000',
    embedColorEnd: '#000000',
    reaction: '<a:party_popper:856167558176440370>'
  }
});
// We now have a giveawaysManager property to access the manager everywhere!
client.giveawaysManager = manager;

//prefix, roleName, size, speed, logging

db.on('ready', () => {
  console.log(`Database connected!`);
});

(async () => { await client.setProvider(
	MongoClient.connect(process.env.MONGODB_SRV,{ useNewUrlParser: true }).then(client => new MongoDBProvider(client, 'abot'))
).catch(console.error);

})()
const freeload = require ('./events/freeloader.js')
const welcome = require ('./events/welcome.js')
const ban = require ('./events/ban.js')
const leave = require ('./events/leave.js')
const unban = require ('./events/unban.js')
const vcshift = require ('./events/vcshift.js')

client.on('ready', () => {
  console.log(`Logged in as ${client.user.tag}!`);
  client.user.setPresence({
    status: 'idle',
    activity: {
      name: 'Your HeartBeat | ec',
      type: 'LISTENING'
    }
  });
  welcome(client)
  ban(client)
  unban(client)
  leave(client, db)
  freeload(client, db, MessageEmbed )
  vcshift(client, db)
});


var dare = require('./resources/dare.js')
var truth = require('./resources/truth.js')
var insult = require('./resources/insult.js')
var rname = require('./resources/rname.js')
var eightball = require('./resources/eightballqs.js')



client.on('error', console.error);



client.on('message', async(message)=> {

if (message.guild.id === "795569524170031124") {
if(message.channel.id == "799816886610558977") {
message.member.roles.add('799823687418904577')
}
}
})

client.on('message', async message => {
  if (message.author.equals(client.user)) return;

  if (message.author.bot == true) return;

  if (!message.content.toLowerCase().startsWith(PREFIX)) return;

  var args = message.content.slice(PREFIX.length).split(' ');
  var command = args[0].toLowerCase();

  if (command === 'gstart') {
    client.giveawaysManager.start(message.channel, {
      time: ms(args[1]),
      winnerCount: parseInt(args[2]),
      prize: args.slice(3).join(' '),
      messages: {
        giveaway:
          '<:milkparty:856169266785026098> **GIVEAWAY** <:mochaparty:856169291035705394>',
        giveawayEnded:
          '<a:premium:856168152093032488> **GIVEAWAY ENDED** <a:premium:856168152093032488>',
        timeRemaining: 'Time remaining: **{duration}**',
        inviteToParticipate:
          'React with <a:party_popper:856167558176440370> to participate!',
        winMessage:
          'Congratulations, {winners}!<a:stickdance:851070681223135273> You won **{prize}**!\n{messageURL}',
        embedFooter: 'Eclipse',
        noWinner: 'Giveaway cancelled, no valid participations.',
        hostedBy: 'Hosted by: {user}',
        winners: 'winner(s)',
        endedAt: 'Ended at',
        units: {
          seconds: 'seconds',
          minutes: 'minutes',
          hours: 'hours',
          days: 'days',
          pluralS: false // Not needed, because units end with a S so it will automatically removed if the unit value is lower than 2
        }
      }
    });
  }

  if (command === 'greroll') {
    let giveaway =
      // Search with giveaway prize
      client.giveawaysManager.giveaways.find(
        g => g.guildID === message.guild.id && g.prize === args.join(' ')
      ) ||
      // Search with messageID
      client.giveawaysManager.giveaways.find(
        g => g.guildID === message.guild.id && g.messageID === args[1]
      );

    // If no giveaway was found
    if (!giveaway)
      return message.channel.send(
        'Unable to find a giveaway for `' + args.join(' ') + '`.'
      );
    const messageID = args[1];
    client.giveawaysManager
      .reroll(messageID)
      .then(() => {
        message.channel.send('Success! Giveaway rerolled!');
      })
      .catch(err => {
        message.channel.send(
          'No giveaway found for ' + messageID + ', please check and try again'
        );
      });
  }

  if (command == 'info') {
    // creates the command *info
    message.channel.send(
      "Henlo! <:cat_heart:845413372820062249> My name is Eclipse and I'm here to assist you! My prefix is `ec`, If you have any issues, then you can contact Moon🌙stalker#4050 <:asunathanks:843194215936163850>"
    ); // gives u info
  }

  if (command == '123ping123') {
    message.channel.send(
      `🏓 Pong!\n ღ__Latency__ is ${Date.now() -
      message.createdTimestamp}ms\n ღ__API Latency__ is ${Math.round(
        client.ws.ping
      )}ms`
    );

    // answers with "Pong!"
  }

  if (command == 'event') {
    if (
      !message.guild.member(message.author).hasPermission('ADMINISTRATOR') &&
      !message.member.roles.cache.has('813680473695060011')
    ) {
      return message.lineReply(`Only Event managers can use this command.`);
    }
    if (!args[1]) {
      return message.lineReply(
        'You need to state the name of the event [example `ecevent mafia`]'
      );
    }
    if (args[3]) {
      var prize = '[Prize: ' + args.slice(2).join(' ') + ']';
    } else {
      var prize = String.fromCharCode(8203);
    }

    if (args[1] == 'split') {
      var desc =
        '**__SPLIT OR STEAL__!  ⠀⠀⠀⠀⠀' +
        prize +
        '**\n\nTwo people will be choosen,they both have DM their choice to the host either `split` or `steal`\n-If both choose `Split`, then they both will get half of the prize each\n-If one chooses `Split`, other chooses `Steal`, then the person to choose `Steal` gets all the prize\n-If both chooses `Steal`, then No one get anything!\n\n(*If you win, then you must DM your choice to the host within **60 seconds** else you will be rerolled!*)';
      var thum =
        'https://cdn.discordapp.com/attachments/799811022301954099/855073418701307963/images.png';
    } else if (args[1] == 'mafia') {
      var desc =
        '**__Mafia__!:detective:  ⠀⠀⠀⠀⠀' +
        prize +
        "**\n\n__**Info**__\n⇨ When the game starts, everyone receives their role through Dms, the role can be on of the 3 sides `mafia`, `villagers` and `neutral` to get info about any particlular role type `m.role <name of the role>` in Dms of mafia-bot\n   ⇨ To win as the mafia, they must kill everyone or outnumber the villagers \n⇨ To win as a villager/neutral, all the mafia have to die\n⇨When Game starts everyone goes to sleep, active roles do their thing, people wake up and are notified of who has died. They then discuss who they think the Mafia is, and try to vote them out. The most voted person will be killed. :skull:\n\n**Mafia rules**:\n  ⇨ No Robbing\n⇨ No SS's/Snitching\n⇨ Don't talk when dead, throw the game, or illegally teaming\n⇨ No trolling, spamming, or going AFK";
      var thum =
        'https://cdn.discordapp.com/attachments/799811022301954099/855346970176389120/BlueGrippingEkaltadeta-size_restricted.gif';
    } else if (args[1] == 'blacktea') {
      var desc =
        '**__BlackTea__:  ⠀⠀⠀⠀⠀' +
        prize +
        '**\n\n__**Info**__\n>React to the <:o_check:855493553971134494> emoji to enter the game.\n-Once the game starts, the bot will ping users in turns  to type out a word containing the three letters (*Please refrain from asking “when’s my turn” every few mins.If the bot hasn’t pinged you, you most likely haven’t entered the game in time*).\n-Failing to type a word in given time, will lead to users being eliminated.Last one standing wins.\n\n__**Rules**__\n• No chitchat when the game is ongoing\n• No helping/typing out words when it’s not your turn';
      var thum =
        'https://i.pinimg.com/originals/29/9a/80/299a80bf221e8ac22459c7b248d8ca46.gif';
    } else if (args[1] == 'greentea') {
      var desc =
        '**__Greentea__:  ⠀⠀⠀⠀⠀' +
        prize +
        '**\n\n__**Info**__\n>React to the <:o_check:855493553971134494> emoji to enter the game.\n-Once the game starts, the bot will give out three letters for the players to make up a word with. First one to type a word wins 5 Points. Second and third receive 3 and 1 Points respectively.The one with the most points, wins the game. .\n\n__**Rules**__\n• No chitchat when the game is ongoing\n• Please refrain from typing out words if you are late/haven’t entered the game in time.';
      var thum =
        'https://static-bebeautiful-in.unileverservices.com/3-reasons-matcha-great-for-your-skin-care-routine-600x350-picmobhome_0.gif';
    } else {
      return message.lineReply("That's not a valid event name");
    }

    let embed = new MessageEmbed()
      .setColor('RANDOM')
      .setDescription(desc)
      .setAuthor(`Host - ` + message.author.username)
      .setThumbnail(thum)
      .setTimestamp()
      .setFooter(
        'Dank Maniac',
        'https://cdn.discordapp.com/icons/795569524170031124/a_113c467109d001bdaaf3bc82c84b24bb.gif?size'
      );
    message.channel.send('<@&800168841349955644', {
      embed: embed
    });
  }

  if (command == '123revive123') {
    message.channel.send(`<@&842751031746363403>` + args);
  }

  if (command == 'massping') {

    if (args[1] !== `stop`) {
      if (
        !message.guild.member(message.author).hasPermission('ADMINISTRATOR')
      ) {
        return message.lineReply(
          `You don't have permission to use this command.`
        );
      }


      if (ismping.has(message.guild.id)) {
        return message.lineReply(
          'A massping process is already going on in the server, wait for it to end 1st!'
        );
      }

      const user = message.mentions.users.first() || message.author;
      let name = message.guild.member(user).displayName || user.username;

      if(user.id == '735050935180460052' || user.id == '789366868543799297'){
        return message.lineReply(
          'You can not use massping action this user'
        );
      }

      message.lineReply(
        'Are you sure that you wanna perform a massping on **' +
        name +
        '**  `yes` or `no`?, you have 30 seconds to respond!'
      );
      message.channel
        .awaitMessages(m => m.author.id == message.author.id, {
          max: 1,
          time: 30000
        })
        .then(collected => {
          if (collected.first().content.toLowerCase() == 'yes') {
            collected.first().lineReply('Massping starting');

            ismping.add(message.guild.id)
            setTimeout(function() {
              pingFunc = setInterval(function() {
                message.channel.send(`<@!${user.id}>`);
              }, 1000);
            }, 3000);

            setTimeout(function() {
              clearInterval(pingFunc);
              ismping.delete(message.guild.id)
            }, 20000);
          } else if (collected.first().content.toLowerCase() == 'no') {
            collected.first().lineReply('Cancelled the action');
          } else {
            collected.first().lineReply('Invalid response');
          }
        })
        .catch(() => {
          message.reply(`You didn't choose anything in the given time`);
        });
    } else if (args[1] == `stop`) {
      clearInterval(pingFunc);
      ismping.delete(message.guild.id)
    }
  }

  if (command == 'guessthenumber' || command == 'gtn') {
    if (!args[1]) {
      return message.lineReply('Please provide a number example `ecgtn 10`');
    }

    let rawGuess = parseInt(args[1]);
    let finalGuess = Math.floor(Math.random() * rawGuess + 1);
    const filter = a => parseInt(a.content) === parseInt(finalGuess);
    message.channel.send(
      `${message.author} I have sent you the correct number in Dm!`
    );
    message.author.send('The number to be guessed is **' + finalGuess + '**');
    message.channel.updateOverwrite(message.channel.guild.roles.everyone, {
      SEND_MESSAGES: true
    });
    message.channel.send(
      'Game of Guess the number has been started [range is **0 - ' +
      rawGuess +
      '**], Game will end when someone guesses the correct number and the channel will be locked! Good Luck <:Kanao_smile:860909096659714048>'
    );
    message.channel
      .awaitMessages(filter, { max: 1, time: 60000000 })
      .then(collected => {
        try {
          message.channel.send(`${collected.first().author} guessed it!`, {
            embed: {
              title: 'Game Ended',
              description: `The correct number was **${finalGuess}**!`,
              timestamp: new Date()
            }
          });
          message.channel.updateOverwrite(
            message.channel.guild.roles.everyone,
            {
              SEND_MESSAGES: false
            }
          );
        } catch (e) {
          console.log(e);
        }
      })
      .catch(console.error);
  }

  if (command == 'ui' || command == 'userinfo') {
    if (args[1] && args[1].toLowerCase() == 'get') {
      if (!args[2]) {
        return message.lineReply(
          'You need to provide the User-ID to get info, example `ecui get [user-id]`'
        );
      }

      let user = await client.users.fetch(args[2]).catch(console.error);

      if (!user) {
        return message.lineReply(
          "I couldn't find any user with ID `" + args[2] + '`'
        );
      }

      const getembed = new MessageEmbed()
        .setThumbnail(user.avatarURL({ dynamic: true }))
        .setDescription(
          '<:setabranca_subs2:864068094170234900> __**' +
          user.tag +
          '**__  <@' +
          user.id +
          '>'
        )
        .setColor('RANDOM')
        .addField('Username:', '`' + user.username + '`', true)
        .addField('ID:', '`' + user.id + '`', true)
        .addField(
          'Created On: ',
          `${moment.utc(user.createdAt).format(' MMMM Do YYYY')} (${ms(
            Date.now() - user.createdAt,
            { long: true }
          )} ago)`,
          true
        )
        .setFooter(
          'Userinfo requested by ' + message.author.tag,
          message.author.avatarURL({ dynamic: true })
        );

      return message.channel.send(getembed);
    } else {
      let member;
      var permissions = [];
      var acknowledgements = [];
      if (!args[1]) {
        // Display info about the calling user
        member = message.author;
      } else {
        // Display info about the user specified by the first argument
        member =
          message.mentions.users.first() ||
          (await client.users.fetch(args[1]).catch(console.error));

        // Check we were able to retrieve the member (member is undefined)
        if (!member) {
          return message.lineReply(
            `I couldn't find a user with the ID \`${args[1]}\``
          );
        }

        let guser = await message.guild.members
          .fetch(member.id)
          .catch(() => null);

        if (!message.guild.member(member.id)) {
          return message.lineReply(
            `I couldn't find a user with the ID \`${
            args[1]
            }\` in the server, Use \`ecui get <user>\` to find globally`
          );
        }
      }

      if (message.guild.member(member.id).hasPermission('ADMINISTRATOR')) {
        permissions.push('Administrator [ALL]');
      } else {
        if (message.guild.member(member.id).hasPermission('BAN_MEMBERS')) {
          permissions.push('Ban Members');
        }

        if (message.guild.member(member.id).hasPermission('KICK_MEMBERS')) {
          permissions.push('Kick Members');
        }

        if (message.guild.member(member.id).hasPermission('MANAGE_ROLES')) {
          permissions.push('Manage Roles');
        }

        if (message.guild.member(member.id).hasPermission('MENTION_EVERYONE')) {
          permissions.push('Mention Everyone');
        }

        if (message.guild.member(member.id).hasPermission('MANAGE_CHANNELS')) {
          permissions.push('Manage Channels');
        }

        if (message.guild.member(member.id).hasPermission('MANAGE_MESSAGES')) {
          permissions.push('Manage Messages');
        }

        if (message.guild.member(member.id).hasPermission('MANAGE_NICKNAMES')) {
          permissions.push('Manage Nicknames');
        }

        if (permissions.length == 0) {
          permissions.push('No Key Permissions Found');
        }
      }

      if (member.id == message.guild.ownerID) {
        acknowledgements.push(':crown: Server Owner');
      } else if (
        message.guild.member(member.id).hasPermission('ADMINISTRATOR')
      ) {
        acknowledgements.push(':shield: Server admin');
      } else if (
        message.guild.member(member.id).hasPermission('MANAGE_GUILD')
      ) {
        acknowledgements.push('🛠️ Server manager');
      }

      let result =
        (await message.guild.members.fetch())
          .sorted((a, b) => a.joinedAt - b.joinedAt)
          .array()
          .findIndex(m => m.id === member.id) + 1;

      acknowledgements.push(' Member **#' + result + '**');

      let status;

      if (member.presence.status == 'offline') {
        status = 'Offline `💤`';
      } else if (member.presence.status == 'online') {
        status = 'Online `🟢`';
      } else if (member.presence.status == 'idle') {
        status = 'Idle `🌙`';
      } else if (member.presence.status == 'dnd') {
        status = 'DND `⛔`';
      }

      // Construct Reply
      const embed = new MessageEmbed()
        .setThumbnail(member.avatarURL({ dynamic: true }))
        .setDescription(
          '<:setabranca_subs2:864068094170234900>__**' +
          member.tag +
          '**__  <@' +
          member.id +
          '>'
        )
        .setColor('RANDOM')
        .addField('Username:', `${member.username}`, true)
        .addField('ID:', '`' + member.id + '`', true)
        .addField(
          'Nickname:',
          message.guild.member(member).displayName || 'None',
          true
        )
        .addField('Status: ', status, true)
        .addField(
          'Joined On:',
          `${moment
            .utc(message.guild.member(member).joinedAt)
            .format('MMMM Do YYYY')} (${ms(
              Date.now() - message.guild.member(member).joinedAt,
              { long: true }
            )} ago)`,
          true
        )
        .addField(
          'Created On: ',
          `${moment.utc(member.createdAt).format(' MMMM Do YYYY')} (${ms(
            Date.now() - member.createdAt,
            { long: true }
          )} ago)`,
          true
        )
        .setFooter(
          'Userinfo requested by ' +
          message.author.tag +
          ' | ' +
          message.guild.name,
          message.author.avatarURL({ dynamic: true })
        )
        .addField(
          'Highest Role:',
          '<@&' + message.guild.member(member).roles.highest.id + '>',
          true
        )
        .addField('Acknowledgements:', `${acknowledgements}`, true)
        .addField('\nKey Permissions:', `${permissions.join(`, `)}`);

      return message.channel.send(embed);
    }
  }

  if (command == 'cnuke') {
    if (!message.guild.member(message.author).hasPermission('ADMINISTRATOR')) {
      return message.lineReply(
        `You don't have permission to use this command <:facepalmblue:830790044578873395>`
      );
    }
    if (message.channel.id == '795569524631142402') {
      return message.lineReply(
        `That command is not allowed in **${
        message.channel.name
        }**  <:facepalmblue:830790044578873395>`
      );
    }
    message.channel.send(
      `:radioactive: Are you sure you wanna nuke **${
      message.channel.name
      }** ? \`YES\` / \`NO\``
    );
    message.channel
      .awaitMessages(m => m.author.id == message.author.id, {
        max: 1,
        time: 30000
      })
      .then(collected => {
        if (collected.first().content.toLowerCase() == 'yes') {
          message.channel.send(
            '⚠️ This is your final warning!, nuking will wipe out everything from this channel\n**This cannot be undone.**\n\nDo you absolutely wanna do this? (`y`/`n`)'
          );
          message.channel
            .awaitMessages(m => m.author.id == message.author.id, {
              max: 1,
              time: 30000
            })
            .then(collected => {
              if (collected.first().content.toLowerCase() == 'y') {
                message.channel
                  .clone({ position: message.channel.rawPosition })
                  .then(ch => {
                    ch.send(
                      'https://cdn.discordapp.com/attachments/830750367452889128/855878107008860220/ezgif.com-gif-maker.gif'
                    )
                      .then(c =>
                        setTimeout(() => {
                          c.delete();
                        }, 10000)
                      )
                      .catch();
                  });
                message.channel.delete();
              } else
                collected
                  .first()
                  .lineReply('Alright, I have cancelled the nuke');
            })
            .catch(() => {
              message.reply(
                'Operation has been canceled due to Timeout <:facepalmblue:830790044578873395>'
              );
            });
        } else
          collected.first().lineReply('Alright, I have cancelled the nuke');
      })
      .catch(() => {
        message.reply(
          'Operation has been canceled due to Timeout <:facepalmblue:830790044578873395>'
        );
      });
  }

  if (command == 'nuke') {
    message.channel.send(
      'Are you sure you wanna perform a nuke? `YES` / `NO`,\nYou have 30 seconds to Reply!'
    );
    message.channel
      .awaitMessages(m => m.author.id == message.author.id, {
        max: 1,
        time: 30000
      })
      .then(collected => {
        // only accept messages by the user who sent the command
        // accept only 1 message, and return the promise after 30000ms = 30s

        // first (and, in this case, only) message of the collection
        if (collected.first().content.toLowerCase() == 'yes') {
          message.author.send(
            'https://tenor.com/view/dance-moves-dancing-singer-groovy-gif-17029825'
          );
          collected
            .first()
            .lineReply(
              'Alright, Nuking in progress...\nCheck your Dms for further instructions!'
            );
        } else
          collected
            .first()
            .lineReply('Okay whatever, operation has been canceled.');
      })
      .catch(() => {
        message.reply('Operation has been canceled due to Timeout.');
      });
  }

  if (command == 'testgtn') {
    let array = ['754296226903490571', '818790805459566602'];
    if (
      array.includes(message.author.id) &&
      message.content.toLowerCase().includes('clan')
    ) {
      let numb = !args[1] ? 10 : args[1];
      let num = Math.floor(Math.random() * numb);
      const em = new MessageEmbed()
        .setDescription(
          `Host: <@${message.author.id}>\n\n*Starting this pain game...*`
        )
        .setFooter(
          `Choose a correct number between 0-${numb} to win team points.`
        );

      message.channel.send(em);
      message.channel
        .awaitMessages(m => m.content.startsWith(num), { max: 1 })
        .then(c => {
          if (c.first().content == num) {
            let us = c.first().author.id;

            let me = message.guild.members.cache.get(us)._roles;
            if (me.includes('849968752292134962')) {
              (async () => {
                message.channel.send(
                  `<@${us}> Guessed it right!\nAdded 1 Point to Stardust`
                );
                await db.add(`clanpoint_795569524170031124_stardust`, 1);
              })();
            } else if (me.includes('849968747967545384')) {
              (async () => {
                message.channel.send(
                  `<@${us}> Guessed it right!\nAdded 1 Point to Celestial`
                );
                await db.add(`clanpoint_795569524170031124_celestial`, 1);
              })();
            } else if (me.includes('849962635289165855')) {
              (async () => {
                message.channel.send(
                  `<@${us}> Guessed it right!\nAdded 1 Point to Supernova`
                );
                await db.add(`clanpoint_795569524170031124_supernova`, 1);
              })();
            }
          }
        });
    } else {
      let numb = !args[1] ? 10 : args[1];
      let num = Math.floor(Math.random() * numb);
      const em = new MessageEmbed()
        .setDescription(
          `Host: <@${message.author.id}>\n\n*Starting this pain game...*`
        )
        .setFooter(`Choose a correct number between 0-${numb} to win`);

      message.channel.send(em);
      message.channel
        .awaitMessages(m => m.content.startsWith(num), { max: 1 })
        .then(c => {
          if (c.first().content == num) {
            let us = c.first().author.id;

            message.channel.send(`<@${us}> Guessed it right! IT WAS ${num}`);
          }
        });
    }
  }

  if (command == 'fight') {
    const { Fight } = require('weky');
    await Fight({
      message: message,
      opponent: message.mentions.users.first(),
      embed: {
        title: 'Fight',
        color: '#7289da',
        timestamp: true
      },
      buttons: {
        hit: 'Hit',
        heal: 'Heal',
        cancel: 'Stop',
        accept: 'Accept',
        deny: 'Deny'
      },
      acceptMessage:
        '<@{{challenger}}> has challenged <@{{opponent}}> for a fight!',
      winMessage: 'GG, <@{{winner}}> won the fight!',
      endMessage:
        "<@{{opponent}}> didn't answer in time. So, I dropped the game!",
      cancelMessage: '<@{{opponent}}> refused to have a fight with you!',
      fightMessage: '{{player}} you go first!',
      opponentsTurnMessage: 'Please wait for your opponents move!',
      highHealthMessage: 'You cannot heal if your HP is above 80!',
      lowHealthMessage: 'You cannot cancel the fight if your HP is below 50!',
      returnWinner: false,
      othersMessage: 'Only {{author}} can use the buttons!'
    });
  }

  if (command == 'trigger') {
    let user;
    if (message.mentions.users.first()) {
      user = message.mentions.users.first();
    } else if (args[0]) {
      user = message.guild.members.cache.get(args[0]).user;
    } else {
      user = message.author;
    }

    let avatar = await user.displayAvatarURL({ dynamic: false, format: 'png' });
    let image = await new DIG.Triggered().getImage(avatar);
    let attach = new Discord.MessageAttachment(image, 'triggered.gif');
    return message.channel.send(attach);
  }

  if (command == 'delete') {
    let user;
    if (message.mentions.users.first()) {
      user = message.mentions.users.first();
    } else if (args[0]) {
      user = message.guild.members.cache.get(args[0]).user;
    } else {
      user = message.author;
    }

    let avatar = await user.displayAvatarURL({ dynamic: false, format: 'png' });
    let image = await new DIG.Delete().getImage(avatar);
    let attach = new Discord.MessageAttachment(image, 'triggered.gif');
    return message.channel.send(attach);
  }

  if (command == 'rip') {
    let user;
    if (message.mentions.users.first()) {
      user = message.mentions.users.first();
    } else if (args[0]) {
      user = message.guild.members.cache.get(args[0]).user;
    } else {
      user = message.author;
    }

    let avatar = await user.displayAvatarURL({ dynamic: false, format: 'png' });
    let image = await new DIG.Rip().getImage(avatar);
    let attach = new Discord.MessageAttachment(image, 'triggered.gif');
    return message.channel.send(attach);
  }

  if (command == 'testtod') {
    let button = new disbut.MessageButton()
      .setStyle('blurple')
      .setLabel('Truth!')
      .setID('click_to_function');

    let button2 = new disbut.MessageButton()
      .setStyle('blurple')
      .setLabel('Dare!')
      .setID('second_button_function')
      .setDisabled();

    let row = new disbut.MessageActionRow().addComponents(button, button2);

    message.channel.send('Truth or Dare', row);
  }

  if (command == 'tbutton') {
    let button = new disbut.MessageButton()
      .setStyle('blurple')
      .setLabel('role')
      .setID('testrole');

    message.channel.send('Testrole', button);
  }

  if (command == 'menu') {
    let option = new MessageMenuOption()
      .setLabel('Your Label')
      .setEmoji('🍔')
      .setValue('menuid')
      .setDescription('Custom Description!');

    let select = new MessageMenu()
      .setID('customid')
      .setPlaceholder('Click me! :D')
      .setMaxValues(1)
      .setMinValues(1)
      .addOption(option);

    message.channel.send('Text with menu!', select);
  }

  if (command == 'gay') {
    let user;
    if (message.mentions.users.first()) {
      user = message.mentions.users.first();
    } else if (args[0]) {
      user = message.guild.members.cache.get(args[0]).user;
    } else {
      user = message.author;
    }

    let avatar = await user.displayAvatarURL({ dynamic: false, format: 'png' });
    let image = await new DIG.Gay().getImage(avatar);
    let attach = new Discord.MessageAttachment(image, 'gay.gif');
    return message.channel.send(attach);
  }

  if (command == 'jail') {
    let user;
    if (message.mentions.users.first()) {
      user = message.mentions.users.first();
    } else if (args[1]) {
      user = message.guild.members.cache.get(args[0]).user;
    } else {
      user = message.author;
    }

    let avatar = await user.displayAvatarURL({ dynamic: false, format: 'png' });
    let image = await new DIG.Jail().getImage(avatar);
    let attach = new Discord.MessageAttachment(image, 'jail.gif');
    return message.channel.send(attach);
  }

  if (command == 'trash') {
    let user;
    if (message.mentions.users.first()) {
      user = message.mentions.users.first();
    } else if (args[0]) {
      user = message.guild.members.cache.get(args[0]).user;
    } else {
      user = message.author;
    }

    let avatar = await user.displayAvatarURL({ dynamic: false, format: 'png' });
    let image = await new DIG.Trash().getImage(avatar);
    let attach = new Discord.MessageAttachment(image, 'triggered.gif');
    return message.channel.send(attach);
  }

  if (command == 'trivia') {
    const { Trivia } = require('weky');
    await Trivia({
      message: message,
      embed: {
        title: 'Trivia ',
        description: 'You only have **{{time}}** to guess the answer!',
        color: '#7289da',
        timestamp: true
      },
      difficulty: 'hard',
      thinkMessage: 'I am thinking',
      winMessage:
        'GG, It was **{{answer}}**. You gave the correct answer in **{{time}}**.',
      loseMessage:
        'Better luck next time! The correct answer was **{{answer}}**.',
      emojis: {
        one: '1️⃣',
        two: '2️⃣',
        three: '3️⃣',
        four: '4️⃣'
      },
      othersMessage: 'Only <@{{author}}> can use the buttons!',
      returnWinner: false
    });
  }

  if (command == 'shuffle' || command == 'guess' || command == 'shuffleguess') {
    const { ShuffleGuess } = require('weky');
    await ShuffleGuess({
      message: message,
      embed: {
        title: 'Shuffle Guess',
        color: '#7289da',
        timestamp: true
      },

      button: { cancel: 'Cancel', reshuffle: 'Reshuffle' },
      startMessage:
        'I shuffled a word it is **`{{word}}`**. You have **{{time}}** to find the correct word!',
      winMessage:
        'GG, It was **{{word}}**! You gave the correct answer in **{{time}}.**',
      loseMessage:
        'Better luck next time! The correct answer was **{{answer}}**.',
      incorrectMessage: "No {{author}}! The word isn't `{{answer}}`",
      othersMessage: 'Only <@{{author}}> can use the buttons!',
      time: 60000
    });
  }

  if (command == 'nhie' || command == 'neverhaveiever') {
    const { NeverHaveIEver } = require('weky');
    await NeverHaveIEver({
      message: message,
      embed: {
        title: 'Never Have I Ever',
        color: '#7289da',
        timestamp: true
      },
      thinkMessage: 'I am thinking',
      othersMessage: 'Only <@{{author}}> can use the buttons!',
      buttons: { optionA: 'Yes', optionB: 'No' }
    });
  }

  if (
    command == 'wyptb' ||
    command == 'willyou' ||
    command == 'willyoupressthebutton'
  ) {
    const { WillYouPressTheButton } = require('weky');
    await WillYouPressTheButton({
      message: message,
      embed: {
        title: 'Will you press the button?',
        description: '```{{statement1}}```\n**but**\n\n```{{statement2}}```',
        color: '#7289da',
        timestamp: true
      },
      button: { yes: 'Yes', no: 'No' },
      thinkMessage: 'I am thinking',
      othersMessage: 'Only <@{{author}}> can use the buttons!'
    });
  }

  if (command == 'wyr' || command == 'wouldyourather') {
    const { WouldYouRather } = require('weky');
    await WouldYouRather({
      message: message,
      embed: {
        title: 'Would you rather...',
        color: '#7289da',
        timestamp: true
      },
      thinkMessage: 'I am thinking',
      othersMessage: 'Only <@{{author}}> can use the buttons!',
      buttons: { optionA: 'Option A', optionB: 'Option B' }
    });
  }

  if (command == 'pick' || command == 'choose') {
    const { randomizeString } = require('weky');
    randomizeString(args.slice(1));
  }

  if (command == 'lis') {
    const { LieSwatter } = require('weky');
    await LieSwatter({
      message: message,
      embed: {
        title: 'Lie Swatter',
        color: '#7289da',
        timestamp: true
      },
      thinkMessage: 'I am thinking',
      winMessage:
        'GG, It was a **{{answer}}**. You got it correct in **{{time}}**.',
      loseMessage: 'Better luck next time! It was a **{{answer}}**.',
      othersMessage: 'Only <@{{author}}> can use the buttons!',
      buttons: { true: 'Truth', lie: 'Lie' }
    });
  }

  if (command == 'cw' || command == 'chaoswords') {
    if (args[1] == 'easy') {
      var rw = 2;
      var mt = 5;
      var cg = 18;
    } else if (args[1] == 'medium') {
      var rw = 3;
      var mt = 3;
      var cg = 22;
    } else if (args[1] == 'hard') {
      var rw = 5;
      var mt = 2;
      var cg = 25;
    } else if (args[1] == 'nightmare' || args[1] == 'nm') {
      var rw = 7;
      var mt = 1;
      var cg = 35;
    } else {
      return message.lineReply(
        'You need to choose the game difficulty level: `easy` , `medium` , `hard` or `nightmare/nm`\nfor example `eccw medium`'
      );
    }

    const { ChaosWords } = require('weky');
    var randomWords = require('random-words');

    await ChaosWords({
      message: message,
      embed: {
        title: 'ChaosWords ',
        description:
          'You have **{{time}}** to find the hidden words in the below sentence.',
        color: '#7289da',
        field1: 'Sentence:',
        field2: 'Words Found/Remaining Words:',
        field3: 'Words found:',
        field4: 'Words:',
        timestamp: true
      },
      winMessage: 'GG, You won! You made it in **{{time}}**.',
      loseMessage: 'Better luck next time!',
      wrongWordMessage:
        'Wrong Guess! You have **{{remaining_tries}}** tries left.',
      correctWordMessage:
        'GG, **{{word}}** was correct! You have to find **{{remaining}}** more word(s).',
      time: 60000,
      words: randomWords(rw),
      charGenerated: cg,
      maxTries: mt,
      buttonText: 'Cancel',
      othersMessage: 'Only <@{{author}}> can use the buttons!'
    });
  }

  if (command == 'fast' || command == 'fasttype') {
    const { FastType } = require('weky');
    await FastType({
      message: message,
      embed: {
        title: 'FastType',
        description: 'You have **{{time}}** to type the below sentence.',
        color: '#7289da',
        timestamp: true
      },
      sentence: txtgen.sentence().replace(/[,.;]/g, '')
    });
  }

  if (command == 'kiss') {
    let user;
    if (message.mentions.users.first()) {
      user = message.mentions.users.first();
    } else if (args[0]) {
      user = message.guild.members.cache.get(args[0]).user;
    } else {
      user = message.author;
    }
    let avatar2 = await message.author.displayAvatarURL({
      dynamic: false,
      format: 'png'
    });
    let avatar = await user.displayAvatarURL({ dynamic: false, format: 'png' });
    let image = await new DIG.Kiss().getImage(avatar, avatar2);
    let attach = new Discord.MessageAttachment(image, 'triggered.gif');
    return message.channel.send(attach);
  }
  if (command == 'sudo') {
    const { Sudo } = require('weky');

    await Sudo({
      message: message,
      text: args.slice(2).join(' '),
      member: message.mentions.members.first(),
      deleteMessage: true
    });
  }

  if (command == 'gtp') {
    const { GuessThePokemon } = require('weky');
    await GuessThePokemon({
      message: message,
      embed: {
        title: 'Guess The Pokémon',
        description:
          '**Type:**\n{{type}}\n\n**Abilities:**\n{{abilities}}\n\nYou only have **{{time}}** to guess the pokémon.',
        color: '#7289da',
        timestamp: true
      },
      thinkMessage: 'I am thinking',
      othersMessage: 'Only <@{{author}}> can use the buttons!',
      winMessage:
        'GG, It was a **{{answer}}**. You got it correct in **{{time}}**.',
      loseMessage: 'Better luck next time! It was a **{{answer}}**.',
      time: 60000,
      incorrectMessage: "No {{author}}! The pokémon isn't `{{answer}}`",
      buttonText: 'Cancel'
    });
  }

  if (command == 'mirror') {
    const weky = require('weky');
    message.channel.send(weky.mirror(args.slice(1).join(' ')));
  }

  if (command == 'mock') {
    const weky = require('weky');
    message.channel.send(weky.randomCase(args.slice(1).join(' ')));
  }

  if (command == 'vapourwave' || command == 'vw') {
    const weky = require('weky');
    message.channel.send(weky.vaporwave(args.slice(1).join(' ')));
  }

  if (command == 'tinycaptial' || command == 'tc') {
    const weky = require('weky');
    message.channel.send(weky.tinyCaptial(args.slice(1).join(' ')));
  }

  if (command == 'reversetext' || command == 'rt') {
    const weky = require('weky');
    message.channel.send(weky.reverseText(args.slice(1).join(' ')));
  }

  if (command == 'bent') {
    const weky = require('weky');
    message.channel.send(weky.bent(args.slice(1).join(' ')));
  }

  if (command == 'flip') {
    const weky = require('weky');
    message.channel.send(weky.flip(args.slice(1).join(' ')));
  }

  if (command == 'tod' || command == 'truthordare') {
    const user = message.mentions.users.first() || message.author;

    message.channel.send(
      '`Truth or dare`\n' +
      `<@` +
      user.id +
      '>  What will you choose?, You have 30 seconds to respond'
    );
    message.channel
      .awaitMessages(m => m.author.id == user.id, { max: 1, time: 30000 })
      .then(collected => {
        if (collected.first().content.toLowerCase() == 'truth') {
          collected
            .first()
            .lineReply(
              truth[Math.floor(Math.random() * truth.length).toString()]
            );
        } else if (collected.first().content.toLowerCase() == 'dare') {
          collected
            .first()
            .lineReply(
              dare[Math.floor(Math.random() * dare.length).toString()]
            );
        } else {
          collected.first().lineReply('Invalid response');
        }
      })
      .catch(() => {
        message.reply(`You didn't choose anything in the given time`);
      });
  }

  if (command == 'insult') {
    const user = message.mentions.users.first();
    if (!user) {
      return message.lineReply('You must mention a member');
    }
    message.channel.send(
      `<@` +
      user.id +
      '>\n' +
      insult[Math.floor(Math.random() * insult.length).toString()]
    );
  }

  if (command == 'invite') {
    let button = new disbut.MessageButton()
      .setStyle('url')
      .setURL(
        'https://discord.com/api/oauth2/authorize?client_id=845379036816343092&permissions=8&scope=bot'
      )
      .setLabel('Invite link!');
    message.channel.send(
      'Hello, <@' +
      message.author.id +
      '>\nClick below if you want to add me in your server',
      button
    );
  }

  if (command == 'ping') {
    let ave = await db.ping();

    let m = await message.lineReply(
      '<a:Discord_loading:851190538181935124> Pinging...'
    );
    let ping = message.createdTimestamp - m.createdTimestamp;
    if (args[1] == 'db' || args[1] == 'database') {
      setTimeout(function() {
        m.edit(
          `:ping_pong: Pong!\n ღ__DB Latency__ is ${
          ave.average
          }ms\nღ__DB Read Latency__ is ${
          ave.read
          }ms\nღ__DB Write Latency__ is ${ave.write}ms`
        );
      }, 1000);
    } else {
      let min = Date.now() - message.createdTimestamp;
      setTimeout(function() {
        m.edit(
          `:ping_pong: Pong!\nღ__Message Latency__ is ${min}ms\n ღ__Round Trip Latency__ is ${m.createdTimestamp -
          message.createdTimestamp}ms\n ღ__API Latency__ is ${
          client.ws.ping
          }ms`
        );
      }, 2000);
    }
  }

  if (command == 'tping') {
    let ave = await db.ping();

    let m = await message.lineReply(
      '<a:Discord_loading:851190538181935124> Pinging...'
    );
    let ping = m.createdTimestamp - message.createdTimestamp;
    let pembed = new MessageEmbed()
      .setColor('RANDOM')
      .setTitle('🏓 Pong!')
      .setDescription(
        `ღ__Latency__ is ${m.createdTimestamp -
        message.createdTimestamp}ms\n ღ__API Latency__ is ${
        client.ws.ping
        }ms\nღ__DB Latency__ is ${ave.average}ms\nღ__DB Read Latency__ is ${
        ave.read
        }ms\nღ__DB Write Latency__ is ${ave.write}ms`
      )
      .setTimestamp()
      .setFooter(`Eclipse`);

    setTimeout(function() {
      m.edit(pembed);
    }, 2000);
  }

  if (command == 'snake') {
    const { Snake } = require('weky');
    await Snake({
      message: message,
      embed: {
        title: 'Snake',
        description: 'GG, you scored **{{score}}** points!',
        color: '#7289da',
        timestamp: true
      },
      emojis: {
        empty: '⬛',
        snakeBody: ':o:',
        food: '🍎',
        up: '⬆️',
        right: '⬅️',
        down: '⬇️',
        left: '➡️'
      },
      othersMessage: 'Only <@{{author}}> can use the buttons!',
      buttonText: 'Cancel'
    });
  }

  if (command == 'qc' || command == 'quickclick') {
    const { QuickClick } = require('weky');
    await QuickClick({
      message: message,
      embed: {
        title: 'Quick Click',
        color: '#7289da',
        timestamp: false
      },
      time: 60000,
      waitMessage: 'The buttons may appear anytime now!',
      startMessage:
        'First person to press the correct button will win. You have **{{time}}**!',
      winMessage:
        'GG, <@{{winner}}> pressed the button in **{{time}} seconds**.',
      loseMessage: 'No one pressed the button in time. So, I dropped the game!',
      emoji: '👆',
      ongoingMessage:
        "A game is already runnning in <#{{channel}}>. You can't start a new one!"
    });
  }

  if (command == 'gtn2') {
    const { GuessTheNumber } = require('weky');
    await GuessTheNumber({
      message: message,
      embed: {
        title: 'Guess The Number',
        description: 'You have **{{time}}** to guess the number.',
        color: '#7289da',
        timestamp: true
      },
      publicGame: true,
      number: 0,
      time: 60000,
      winMessage: {
        publicGame:
          'GG, The number which I guessed was **{{number}}**. <@{{winner}}> made it in **{{time}}**.\n\n__**Stats of the game:**__\n**Duration**: {{time}}\n**Number of participants**: {{totalparticipants}} Participants\n**Participants**: {{participants}}',
        privateGame:
          'GG, The number which I guessed was **{{number}}**. You made it in **{{time}}**.'
      },
      loseMessage:
        'Better luck next time! The number which I guessed was **{{number}}**.',
      bigNumberMessage:
        'No {{author}}! My number is greater than **{{number}}**.',
      smallNumberMessage:
        'No {{author}}! My number is smaller than **{{number}}**.',
      othersMessage: 'Only <@{{author}}> can use the buttons!',
      buttonText: 'Cancel',
      ongoingMessage:
        "A game is already runnning in <#{{channel}}>. You can't start a new one!",
      returnWinner: false
    });
  }

  if (command == 'rps' || command == 'rockpaperscissors') {
    if (!message.mentions.users.first()) {
    }
    const { RockPaperScissors } = require('weky');
    await RockPaperScissors({
      message: message,
      opponent: message.mentions.users.first(),
      embed: {
        title: 'Rock Paper Scissors',
        description: 'Press the button below to choose your element.',
        color: '#7289da',
        timestamp: true
      },
      buttons: {
        rock: 'Rock',
        paper: 'Paper',
        scissors: 'Scissors',
        accept: 'Accept',
        deny: 'Deny'
      },
      time: 60000,
      acceptMessage:
        '<@{{challenger}}> has challenged <@{{opponent}}> for a game of Rock Paper and Scissors!',
      winMessage: 'GG, <@{{winner}}> won!',
      drawMessage: 'Game Tied!',
      endMessage:
        "<@{{opponent}}> didn't answer in time. So, I dropped the game!",
      timeEndMessage:
        "Both of you didn't pick something in time. So, I dropped the game!",
      cancelMessage:
        '<@{{opponent}}> refused to have a game of Rock Paper and Scissors with you!',
      choseMessage: 'You picked {{emoji}}',
      noChangeMessage: 'You cannot change your selection!',
      othersMessage: 'Only {{author}} can use the buttons!',
      returnWinner: false
    });
  }

  if (command == 'ship') {
    if (!args[1]) args[1] = `<@${message.author.id}>`;
    args[0] = args[0].toLowerCase();
    args[1] = args[1].toLowerCase();
    const loveTexts = [
      'Worse than ever :poop:',
      'Terrible :sob:',
      'Very bad :disappointed_relieved:',
      'Bad :frowning2:',
      'Idk :thinking:',
      'Not bad :confused:',
      'Friends :+1:',
      'Mmmm ( ͡° ͜ʖ ͡°)',
      'Fine! :heartpulse:',
      'Incredible!!! :heart_eyes:',
      'PERFECT!!! :heart_exclamation:'
    ];
    if (!(await client.shipData.findOne({ lover1: args[0], lover2: args[1] })))
      await client.shipData.create({
        lover1: args[0],
        lover2: args[1],
        percents: client.random(1, 100)
      });

    const ship = await client.shipData.findOne({
      lover1: args[0],
      lover2: args[1]
    });
    const percents = ship.percents;
    const loveText = loveTexts[Math.floor(percents / 10)];
    const segments = '■'.repeat(Math.round(percents / 10));

    const embed = new MessageEmbed()
      .setTitle('❤️ MATCHMAKING ❤️')
      .setColor('ff00b0')
      .setDescription(
        `▼***${args[0]}***\n▲***${
        args[1]
        }***\n\n💞 **${percents}%** [${segments +
        '□'.repeat(10 - segments.length)}]\n\n**${loveText}**`
      )
      .setTimestamp();
    message.channel.send({ embed });
  }

  if (command == 'roll') {
    let num1 = parseInt(args[1]);
    let num2 = parseInt(args[2]);
    if (isNaN(num1)) num1 = 1;
    if (isNaN(num2)) num2 = 10;

    if (num1 > num2) {
      let num3 = num2;
      num2 = num1;
      num1 = num3;
    }

    const randomNum = Math.round(Math.random(num1, num2));
    var embed = new MessageEmbed()
      .setAuthor(
        `Random number from ${num1} to ${num2}`,
        message.author.avatarURL
      )
      .setDescription(`**Result: \`${randomNum}\`**:game_die:`)
      .setColor('RANDOM');
    message.channel.send(embed);
  }

  if (command == 'autodel' || command == 'adel') {
    if (!message.guild.member(message.author).hasPermission('ADMINISTRATOR')) {
      return message.lineReply(
        `You don't have permission to use this command.`
      );
    }

    if (!args[1]) {
      return message.lineReply(
        'Please specify a user whose messages I should delete, example `ecadel <user-id>`'
      );
    }

    if (args[1].toLowerCase() == 'off' || args[1].toLowerCase() == 'false') {
      await db.set(`adel_${message.guild.id}`, '0');
      message.react('<a:AL_check11:861213307720957982>');
    } else {
      let user = args[1].replace(/[\\<>@#&!]/g, '');

      let member = await client.users.fetch(user).catch(console.error);

      if (!member) {
        return message.lineReply(
          "I couldn't find any user with ID: `" + user + '`'
        );
      }

      await db.set(`adel_${message.guild.id}`, member.id);

      message.react('<a:AL_check11:861213307720957982>');
    }
  }

  if (command == 'mimic') {
    if (!message.guild.member(message.author).hasPermission('ADMINISTRATOR')) {
      return message.lineReply(
        `You don't have permission to use this command.`
      );
    }
    if (!args[1]) {
      return message.lineReply(
        'Please specify a user whose messages I should mimic, example `ecmimic <user-id>`'
      );
    }
    if (args[1].toLowerCase() == 'off' || args[1].toLowerCase() == 'false') {
      await db.set(`mimic_${message.guild.id}`, '0');
      message.react('<a:AL_check11:861213307720957982>');
    } else {
      let user = args[1].replace(/[\\<>@#&!]/g, '');

      let member = await client.users.fetch(user).catch(console.error);

      if (!member) {
        return message.lineReply(
          "I couldn't find any user with ID: `" + user + '`'
        );
      }

      await db.set(`mimic_${message.guild.id}`, member.id);
      message.react('<a:AL_check11:861213307720957982>');
    }
  }

  if (command == 'tp') {
    if (
      message.author.id !== '754296226903490571' &&
      message.author.id !== '812226766990344222'
    ) {
      return message.lineReply(
        `I couldn't find your *Secret Base*, Do you even have a *Secret base* you wanna teleport to? <:facepalmblue:830790044578873395>`
      );
    }
    if (args[1] == 'me') {
      var link = `https://discord.com/channels/847930595320791051/849580519460438018`;
    } else if (args[1] == 'ch') {
      var link = `https://discord.com/channels/795569524170031124/848920713200140325`;
    } else if (args[1] == 'gc') {
      var link = `https://discord.com/channels/795569524170031124/795569524631142402`;
    } else if (args[1] == 'me') {
      var link = `https://discord.com/channels/847930595320791051/799811022301954099`;
    } else if (args[1] == 'a') {
      var link = `https://discord.com/channels/795569524170031124/799811022301954099`;
    } else if (args[1] == 's') {
      var link = `https://discord.com/channels/795569524170031124/813713513776152606`;
    } else {
      var link = `https://discord.com/channels/795569524170031124/848920713200140325`;
    }
    let moon = new MessageEmbed()
      .setColor('#8aee99')
      .setDescription(`[Teleport link](` + link + `)`)
      .setAuthor(message.author.username)
      .setThumbnail(
        'https://cdn.discordapp.com/attachments/849580519460438018/851476751011414026/92829318f319e3e164d06bef169a5974.png'
      )
      .setTimestamp()
      .setFooter('Secret OwO', message.author.avatarURL({ dynamic: true }));

    let kadita = new MessageEmbed()
      .setColor('RANDOM')
      .setDescription(
        `[Teleport link](https://discord.com/channels/795569524170031124/830165141797470258)`
      )
      .setAuthor(message.author.username)
      .setThumbnail(
        'https://cdn.discordapp.com/attachments/830165141797470258/851904881861853204/TikTok.jpg'
      )
      .setTimestamp()
      .setFooter(
        'Weeeeee',
        'https://cdn.discordapp.com/attachments/830165141797470258/851905200452403210/Str0bry_phr0g.png'
      );

    if (message.author.id == '754296226903490571') {
      message.lineReply(moon);
    } else if (message.author.id == '812226766990344222') {
      message.lineReply(kadita);
    }
  }

  if (command == 'nitro') {
    let noon = new MessageEmbed()
      .setColor('RANDOM')
      .setTitle('__Nitro Generated__')
      .setDescription(
        `[Redeem link](https://dis.cord.gifts/u1PL8uscm8cPva32
)`
      )
      .setAuthor(message.author.username)
      .setThumbnail(
        'https://cdn.discordapp.com/emojis/848127711275909150.gif?v=1'
      )
      .setTimestamp()
      .setFooter(
        `What's this OwO`,
        'https://cdn.discordapp.com/emojis/811983266352726067.gif?v=1'
      );

    message.lineReply(noon);
  }

  if (command == 'pat') {
    const user = message.mentions.users.first();
    if (user === undefined) {
      return message.channel.send('there is no user.'); // Do not proceed, there is no user.
    }
    const name = user.username; // creates the command cookie
    if (args[1])
      message.lineReplyNoMention(
        message.author.username.toString() +
        ' *gently pats*  ' +
        name +
        ' <:ds_girlTinyPat:830790017215496202>'
      );
    // sends the message saying someone has given someone else a cookie if someone mentions someone else
    else
      message.lineReply(
        'You must mention the user you wanna  pat? (example: `ecpat @username`)'
      );
  }

  if (command == 'peasant') {
    if (message.guild.id !== '795569524170031124') {
      return message.lineReply(
        'This command is not supported in this server! <:Kanao_peek:860909383830470708>'
      );
    }
    if (message.author.id !== '372742045099360257')
      return message.lineReply(
        'You tried:tm: <a:DM_hahaawww:848628203479367731> but you are not worthy enough to make anyone your peasant!'
      );

    var user = message.mentions.members.first();
    if (user === undefined)
      return message.lineReply(
        'You need to mention the member you wanna make your peasant!'
      );

    const member = message.guild.members.cache.get(user.id);
    let role = message.guild.roles.cache.find(
      r => r.id === '826838525139353702'
    );

    let peasrole = member.roles.cache.find(r => r.id === '826838525139353702');
    if (peasrole != null) {
      peas = true;
    } else {
      peas = false;
    }

    if (peas === true) {
      member.roles.remove(role);
      message.lineReply(
        message.mentions.users.first().username + ' is no longer your peasant'
      );
    } else {
      member.roles.add(role);
      message.lineReply(
        message.mentions.users.first().username +
        ' has been accepted as your Peasant'
      );
    }
  }

  if (command == 'role') {
    var user = message.mentions.users.first();
    if (user === undefined) {
      return;
    }
    {
      if (message.guild.member(message.author).hasPermission('ADMINISTRATOR')) {
        const perms = message.member.permissions;
        const member = message.guild.members.cache.get(user.id);
        var name = user.username;

        if (args[1].toLowerCase() == 'mod') {
          message.lineReplyNoMention('Added **₊˚ˑ༄ؘModerators彡✩** to ' + name);
        }

        if (args[1].toLowerCase() == 'admin') {
          message.lineReplyNoMention('Added **₊˚ˑ༄ؘAdmins彡|✩** to ' + name);
        }

        if (args[1].toLowerCase() == 'founder') {
          message.lineReplyNoMention('Added **₊˚ˑ༄ؘFounders彡✩** to ' + name);
        }
      } else
        message.channel.send(
          '`ERROR`\n```User is Missing the following permissions: ADMINISTRATOR```'
        );
    }
  }

  if (command == 'battle') {
    let bembd = new MessageEmbed()
      .setColor('RANDOM')
      .setDescription('Battle')
      .setTitle('**__Battle:__**')
      .setThumbnail(
        'https://media1.tenor.com/images/3b0e7abd638704460bb85eb74a9da710/tenor.gif?itemid=17933853'
      )
      .setTimestamp()
      .setFooter(
        'Dank Maniac',
        'https://cdn.discordapp.com/icons/795569524170031124/a_113c467109d001bdaaf3bc82c84b24bb.gif?size=256'
      );

    message.lineReply(bembd);
  }

  if (command == 'clan') {
    if (message.guild.id !== '795569524170031124') {
      return message.lineReply(
        'This command is not supported  in this server! <:Kanao_peek:860909383830470708>'
      );
    }

    if (!args[1]) {
      (async () => {
        let user1 = await client.users.fetch('331137818057506817');

        let user2 = await client.users.fetch('737115771188281405');
        let user3 = await client.users.fetch('372742045099360257');
        let cembd = new MessageEmbed()
          .setColor('RANDOM')
          .addField(
            `ღ Supernova ${message.guild.members.cache
              .get(message.author.id)
              ._roles.includes('849962635289165855')
              .toString()
              .replace(true, '<a:DM_black:800188521935011849>')
              .replace(false, '')}`,
            `>>> Leader: **${
            user1.username
            }** [ <@331137818057506817> ]\n-type \` ecclan supernova \` to join`
          )
          .addField(
            `ღ Stardust ${message.guild.members.cache
              .get(message.author.id)
              ._roles.includes('849968752292134962')
              .toString()
              .replace(true, '<a:DM_black:800188521935011849>')
              .replace(false, '')}`,
            `>>> Leader: **${
            user2.username
            }** [ <@737115771188281405> ]\n-type \` ecclan stardust \` to join`
          )
          .addField(
            `ღ Celestial ${message.guild.members.cache
              .get(message.author.id)
              ._roles.includes('849968747967545384')
              .toString()
              .replace(true, '<a:DM_black:800188521935011849>')
              .replace(false, '')}`,
            `>>> Leader: **${
            user3.username
            }** [ <@372742045099360257> ]\n-type \` ecclan celestial \` to join`
          )
          .setTitle('**__You need to specify which clan you wanna join:__**')
          .setThumbnail(
            'https://i.pinimg.com/originals/1e/41/28/1e41285c42116f40d6b6a2cd3277cff5.gif'
          )
          .setTimestamp()
          .setFooter(
            'Dank Maniac',
            'https://cdn.discordapp.com/icons/795569524170031124/a_113c467109d001bdaaf3bc82c84b24bb.gif?size=256'
          );

        return message.lineReplyNoMention(cembd);
      })();
    }

    if (
      args[1].toLowerCase() !== 'supernova' &&
      args[1].toLowerCase() !== 'celestial' &&
      args[1].toLowerCase() !== 'stardust'
    ) {
      return message.lineReply(
        "That isn't a valid clan name. <:facepalmblue:830790044578873395>, The clans available right now are:\n`Supernova`, `Stardust`, and `Celestial`"
      );
    }
    const timeout = 1209600000; // 7 days in milliseconds, change to the desired cooldown time, in milliseconds

    const cooldown = await db.get(
      `test_${message.guild.id}_${message.author.id}`
    );
    if (Date.now() < cooldown) {
      const time = pretty(cooldown - Date.now());
      message.channel.send(
        `Sorry, you must wait **${time}** before you can change your clan.`
      );
    } else {
      let name =
        message.guild.member(message.author).displayName ||
        message.author.username;
      const user = message.author;
      let mnlt = message.guild.roles.cache.get('849962635289165855');
      let strd = message.guild.roles.cache.get('849968752292134962');
      let celt = message.guild.roles.cache.get('849968747967545384');
      //code here that runs if there is no cooldown
      if (args[1].toLowerCase() == 'supernova') {
        message.lineReply(
          'Are you sure you wanna join this clan? say `yes` to confirm!\n*you can not switch your clan for **14 days** after joining so choose wisely*'
        );
        message.channel
          .awaitMessages(m => m.author.id == message.author.id, {
            max: 1,
            time: 60000
          })
          .then(collected => {
            if (collected.first().content.toLowerCase() == 'yes') {
              collected
                .first()
                .lineReply(
                  `Success, you are now a member of __🌟 Supernova__ clan! <a:DM_success:800189155208462378>`
                );
              try {
                const member = message.guild.members.cache.get(user.id);
                member.roles.add(mnlt);
                member.roles.remove(strd);
                member.roles.remove(celt);
              } catch (err) {
                message.channel.send('');
              }
              (async () => {
                await db.set(
                  `test_${message.guild.id}_${message.author.id}`,
                  Date.now() + ms('14d')
                );
              })();
              if (name.includes(`🌟`) !== true) {
                message.guild.members
                  .fetch(message.author.id)
                  .then(c => c.setNickname(name.replace(/🔱|💫/g, '') + ' 🌟'));
              }
            } else if (collected.first().content.toLowerCase() == 'no') {
              collected.first().lineReply('Cancelled');
            } else {
              collected
                .first()
                .lineReply(
                  'Invalid response <:facepalmblue:830790044578873395>'
                );
            }
          });
      } else if (args[1].toLowerCase() == 'stardust') {
        message.lineReply(
          'Are you sure you wanna join this clan? say `yes` to confirm!\n*you can not switch your clan for **14 days** after joining so choose wisely*'
        );
        message.channel
          .awaitMessages(m => m.author.id == message.author.id, {
            max: 1,
            time: 60000
          })
          .then(collected => {
            if (collected.first().content.toLowerCase() == 'yes') {
              collected
                .first()
                .lineReply(
                  `Success, you are now a member of __💫 Stardust__ clan! <a:DM_success:800189155208462378>`
                );
              try {
                const member = message.guild.members.cache.get(user.id);
                member.roles.remove(mnlt);
                member.roles.add(strd);
                member.roles.remove(celt);
              } catch (err) {
                message.channel.send('');
              }
              (async () => {
                await db.set(
                  `test_${message.guild.id}_${message.author.id}`,
                  Date.now() + ms('14d')
                );
              })();
              if (name.includes(`💫`) !== true) {
                message.guild.members
                  .fetch(message.author.id)
                  .then(c => c.setNickname(name.replace(/🔱|🌟/g, '') + ' 💫'));
              }
            } else if (collected.first().content.toLowerCase() == 'no') {
              collected.first().lineReply('Cancelled');
            } else {
              collected
                .first()
                .lineReply(
                  'Invalid response <:facepalmblue:830790044578873395>'
                );
            }
          });
      }
      if (args[1].toLowerCase() == 'celestial') {
        message.lineReply(
          'Are you sure you wanna join this clan? say `yes` to confirm!\n*you can not switch your clan for **14 days** after joining so choose wisely*'
        );
        message.channel
          .awaitMessages(m => m.author.id == message.author.id, {
            max: 1,
            time: 60000
          })
          .then(collected => {
            if (collected.first().content.toLowerCase() == 'yes') {
              collected
                .first()
                .lineReply(
                  `Success, you are now a member of __🔱 Celestial__ clan <a:DM_success:800189155208462378>`
                );
              try {
                const member = message.guild.members.cache.get(user.id);
                member.roles.remove(mnlt);
                member.roles.remove(strd);
                member.roles.add(celt);
              } catch (err) {
                message.channel.send('');
              }
              (async () => {
                await db.set(
                  `test_${message.guild.id}_${message.author.id}`,
                  Date.now() + ms('14d')
                );
              })();
              if (name.includes(`🔱`) !== true) {
                message.guild.members
                  .fetch(message.author.id)
                  .then(c => c.setNickname(name.replace(/🌟|💫/g, '') + ' 🔱'));
              }
            } else if (collected.first().content.toLowerCase() == 'no') {
              collected.first().lineReply('Cancelled');
            } else {
              collected
                .first()
                .lineReply(
                  'Invalid response <:facepalmblue:830790044578873395>'
                );
            }
          });
      }
    }
  }
  if (command === 'points') {
    if (message.guild.id !== '795569524170031124') {
      return message.lineReply(
        'This command is not supported  in this server! <:Kanao_peek:860909383830470708>'
      );
    }
    const pch = message.guild.channels.cache.get(`851407683881926686`);

    if (args[1] == 'add') {
      if (
        message.author.id !== '754296226903490571' &&
        message.author.id !== '694977735948238868' &&
        message.author.id !== '331137818057506817' &&
        message.author.id !== '372742045099360257' &&
        message.author.id !== '818790805459566602'
      ) {
        return message.lineReply('You are not authorized to run this command!');
      }
      if (!args[2]) {
        return message.channel.send(
          'You need to state which clan you wanna add points to.\nexample - `ecpoints add supernova`'
        );
      }
      const pch = message.guild.channels.cache.get(`851407683881926686`);
      var reason;
      if (!args[3]) {
        reason = String.fromCharCode(8203);
      } else {
        reason = `, Reason: ` + args.slice(3).join(' ');
      }

      if (
        args[2] !== `supernova` &&
        args[2] !== `stardust` &&
        args[2] !== `celestial`
      ) {
        return message.channel.lineReply(
          "That's not a valid clan name :facepalmblue:"
        );
      } else if (args[2].toLowerCase() == 'supernova') {
        message.lineReply('How many points you wanna add to that clan?');
        message.channel
          .awaitMessages(m => m.author.id == message.author.id, {
            max: 1,
            time: 30000
          })
          .then(collected => {
            let b = collected
              .map(c => c.content)
              .join(' ')
              .split(' ')[0];
            collected
              .first()
              .lineReply(
                `Success, added **` +
                collected.first().content +
                `** points to 🌟supernova clan`
              );
            (async () => {
              await db.add(
                `clanpoint_${message.guild.id}_supernova`,
                Number(parseFloat(collected.first().content))
              );

              var tpsn = await db.get(
                `clanpoint_${message.guild.id}_supernova`
              );
              let embeded = new MessageEmbed()
                .setDescription(
                  `Added **+` +
                  collected.first().content +
                  `** points to <@&849962635289165855> clan` +
                  reason
                )
                .setFooter(`Total Points: ${tpsn}`)
                .setColor('#18FF00');
              pch.send(`#SUPERNOVA`, embeded);
            })();
          })
          .catch(() => {
            message.reply(
              `You didn't provided any valid response <:facepalmblue:830790044578873395>`
            );
          });
      } else if (args[2].toLowerCase() == 'stardust') {
        message.lineReply('How many points you wanna add to that  clan?');
        message.channel
          .awaitMessages(m => m.author.id == message.author.id, {
            max: 1,
            time: 30000
          })
          .then(collected => {
            collected
              .first()
              .lineReply(
                `Success, added **` +
                collected.first().content +
                `** points to 💫Stardust clan`
              );
            (async () => {
              await db.add(
                `clanpoint_${message.guild.id}_stardust`,
                Number(parseFloat(collected.first().content))
              );

              const tpst = await db.get(
                `clanpoint_${message.guild.id}_stardust`
              );

              let embeded = new MessageEmbed()
                .setDescription(
                  `Added **+` +
                  collected.first().content +
                  `** points to <@&849968752292134962> clan` +
                  reason
                )
                .setFooter(`Total Points: ${tpst}`)
                .setColor('#18FF00');
              pch.send(`#STARDUST`, embeded);
            })();
          })
          .catch(() => {
            message.reply(
              `You didn't provided any valid response <:facepalmblue:830790044578873395>`
            );
          });
      } else if (args[2].toLowerCase() == 'celestial') {
        message.lineReply('How many points you wanna add to that clan?');
        message.channel
          .awaitMessages(m => m.author.id == message.author.id, {
            max: 1,
            time: 30000
          })
          .then(collected => {
            collected
              .first()
              .lineReply(
                `Success, added **` +
                collected.first().content +
                `** points to 🔱Celestial clan`
              );
            (async () => {
              await db.add(
                `clanpoint_${message.guild.id}_celestial`,
                Number(parseFloat(collected.first().content))
              );

              var tpcl = await db.get(
                `clanpoint_${message.guild.id}_celestial`
              );

              let embeded = new MessageEmbed()
                .setDescription(
                  `Added **+` +
                  collected.first().content +
                  `** points to <@&849968747967545384> clan` +
                  reason
                )
                .setFooter(`Total Points: ${tpcl}`)
                .setColor('#18FF00');
              pch.send(`#CELESTIAL`, embeded);
            })();
          })
          .catch(() => {
            message.reply(
              `You didn't provided any valid response <:facepalmblue:830790044578873395>`
            );
          });
      }
    } else if (args[1] == 'remove') {
      if (
        message.author.id !== '754296226903490571' &&
        message.author.id !== '818790805459566602'
      ) {
        return message.lineReply('You are not authorized to run this command!');
      }
      if (!args[2]) {
        return message.channel.send(
          'You need to state which clan you wanna remove points from.\nexample - `ecpoints remove supernova`'
        );
      }
      if (
        args[2] !== `supernova` &&
        args[2] !== `stardust` &&
        args[2] !== `celestial`
      ) {
        return message.channel.lineReply(
          "That's not a valid clan name <:facepalmblue:830790044578873395>"
        );
      }

      var reason;
      if (!args[3]) {
        reason = String.fromCharCode(8203);
      } else {
        reason = `, Reason: ` + args.slice(3).join(' ');
      }

      if (
        args[2] !== `supernova` &&
        args[2] !== `stardust` &&
        args[2] !== `celestial`
      ) {
        return message.channel.lineReply(
          "That's not a valid clan name :facepalmblue:"
        );
      } else if (args[2].toLowerCase() == 'supernova') {
        message.lineReply('How many points you wanna remove from that clan?');
        message.channel
          .awaitMessages(m => m.author.id == message.author.id, {
            max: 1,
            time: 30000
          })
          .then(collected => {
            collected
              .first()
              .lineReply(
                `Success, removed **` +
                collected.first().content +
                `** points from  🌟Supernova clan`
              );
            (async () => {
              await db.subtract(
                `clanpoint_${message.guild.id}_supernova`,
                Number(parseFloat(collected.first().content))
              );

              var tpsn = await db.get(
                `clanpoint_${message.guild.id}_supernova`
              );

              let embeded = new MessageEmbed()
                .setDescription(
                  `Removed **-` +
                  collected.first().content +
                  `** points from <@&849962635289165855> clan` +
                  reason
                )
                .setFooter(`Total Points: ${tpsn}`)
                .setColor('#FF0000');
              pch.send(`#SUPERNOVA`, embeded);
            })();
          })
          .catch(() => {
            message.reply(`You didn't provided any response`);
          });
      } else if (args[2].toLowerCase() == 'stardust') {
        message.lineReply('How many points you wanna remove from that clan?');
        message.channel
          .awaitMessages(m => m.author.id == message.author.id, {
            max: 1,
            time: 30000
          })
          .then(collected => {
            collected
              .first()
              .lineReply(
                `Success, removed **` +
                collected.first().content +
                `** points from 💫Stardust clan`
              );
            (async () => {
              await db.subtract(
                `clanpoint_${message.guild.id}_stardust`,
                Number(parseFloat(collected.first().content))
              );
              var tpst = await db.get(`clanpoint_${message.guild.id}_stardust`);

              let embeded = new MessageEmbed()
                .setDescription(
                  `Removed **-` +
                  collected.first().content +
                  `** points from <@&849968752292134962> clan` +
                  reason
                )
                .setFooter(`Total Points: ${tpst}`)
                .setColor('#FF0000');
              pch.send(`#STARDUST`, embeded);
            })();
          })
          .catch(() => {
            message.reply(`You didn't provided any response`);
          });
      } else if (args[2].toLowerCase() == 'celestial') {
        message.lineReply('How many points you wanna remove from that clan?');
        message.channel
          .awaitMessages(m => m.author.id == message.author.id, {
            max: 1,
            time: 30000
          })
          .then(collected => {
            collected
              .first()
              .lineReply(
                `Success, removed **` +
                collected.first().content +
                `** points from 🔱Celestial clan`
              );
            (async () => {
              await db.subtract(
                `clanpoint_${message.guild.id}_celestial`,
                Number(parseFloat(collected.first().content))
              );
              var tpcl = await db.get(
                `clanpoint_${message.guild.id}_celestial`
              );

              let embeded = new MessageEmbed()
                .setDescription(
                  `Removed **-` +
                  collected.first().content +
                  `** points from <@&849968747967545384> clan` +
                  reason
                )
                .setFooter(`Total Points: ${tpcl}`)
                .setColor('#FF0000');
              pch.send(`#CELESTIAL`, embeded);
            })();
          })
          .catch(() => {
            message.reply(`You didn't provided any response`);
          });
      }
    } else if (args[1] !== 'remove' && args[1] !== 'add') {
      var spoints = await db.get(`clanpoint_795569524170031124_supernova`);
      var sdpoints = await db.get(`clanpoint_795569524170031124_stardust`);
      var cpoints = await db.get(`clanpoint_795569524170031124_celestial`);

      let embd = new MessageEmbed()
        .setColor('RANDOM')
        .setTitle('__Clan-points Leaderboard:__')
        .setDescription(`Total Clan Points: ${spoints + sdpoints + cpoints}`)
        .addField(
          `#1. __Supernova__`,
          `>>> Points: ${spoints}\nSymbol: \` 🌟 \` `
        )
        .addField(
          '#2. __Stardust__ ',
          `>>> Points: ${sdpoints}\nSymbol: \` 💫 \` `
        )
        .addField(
          `#3. __Celestial__ `,
          `>>> Points: ${cpoints}\nSymbol: \` 🔱 \` `
        )
        .setThumbnail(
          'https://cdn.discordapp.com/icons/795569524170031124/a_113c467109d001bdaaf3bc82c84b24bb.gif?size=256'
        )
        .setTimestamp()
        .setFooter(
          'Dank maniac',
          'https://cdn.discordapp.com/emojis/770759353887358986.png?v=1'
        );

      message.lineReplyNoMention(embd);
    }
  }

  if (command == 'myrole') {
    if (args[1] === 'set') {
      if (
        !message.guild.member(message.author).hasPermission('ADMINISTRATOR')
      ) {
        return message.lineReply(
          `You don't have permission to set custom roles, contact any admin for that`
        );
      }
      if (!args[2]) {
        return message.lineReply(
          'You need to provide user-id and role-id to set any custom role\n(example: `ecmyrole set [userid] [roleid]`)'
        );
      }
      if (!args[3]) {
        return message.lineReply(
          'You need to proive user-id and role-id to set their custom role\n(example: `ecmyrole set [userid] [roleid]`'
        );
      }

      const user = await client.users.fetch(args[2]).catch(console.error);

      if (!user) {
        return message.lineReply(
          "I couldn't find any member with ID `" + args[2] + '`'
        );
      }

      let roleid = message.guild.roles.cache.find(r => r.id === args[3]);

      if (!roleid) {
        return message.lineReply(
          "I couldn't find any role with ID  `" + args[3] + '`'
        );
      }

      await db.set(`myrole_${message.guild.id}_${user.id}`, roleid.id);

      message.lineReply(`Successfully set the Custom role`);
    } else {
      if (!args[1]) {
        return message.channel.send(
          'You need to specify what you want to edit `name` or `color`\n(example: `ecmyrole name hello` or `ecmyrole color #f87671`)'
        );
      }

      const rid = await db.get(
        `myrole_${message.guild.id}_${message.author.id}`
      );

      if (!rid) {
        return message.lineReply('You do not own any custom role!');
      }

      var role = message.guild.roles.cache.find(r => r.id === rid);

      if (!rid) {
        return message.lineReply(
          "I couldn't find your custom role in server, it might have been deleted"
        );
      }

      if (args[1].toLowerCase() == 'name') {
        if (!args[2]) {
          return message.lineReply(
            "You didn't provided any name (example: `ecmyrole name hello`)"
          );
        }
        var name = args.slice(2).join(' ');
        role.edit({
          name: name
        });
        message.lineReply(
          'Custom role name has been changed <a:DM_success:800189155208462378>'
        );
      } else if (args[1].toLowerCase() == 'color') {
        if (!args[2]) {
          return message.lineReply(
            "You didn't provided any color HEX (example: `ecmyrole color #f87671`)"
          );
        }
        var color = args[2];
        role.edit({
          color: color
        });
        message.lineReply(
          'Custom role color has been changed <a:moondance:828746485423800340>'
        );
      } else {
        return message.lineReply(
          "That's not a valid option lol , You need to specify what you want to edit `name` or `color`"
        );
      }
    }
  }

  if (command == 'cake') {
    // creates the command cookie
    if (args[1])
      message.lineReply(
        message.author.username.toString() +
        ' has given ' +
        args[1].toString() +
        ' a Mooncake :moon_cake:',
        { allowedMentions: { parse: ['users'] } }
      );
    // sends the message saying someone has given someone else a cookie if someone mentions someone else
    else
      message.lineReply(
        'You must mention the user you wanna  send a Mooncake to? :moon_cake: (example: `eccake @username`)'
      );
  }

  if (command == 'ban') {
    const user = message.mentions.users.first();
    if (user === undefined) return; // Do not proceed, there is no user.
    // creates the command cookie
    const name = user.username; // creates the command cookie
    if (args[1]) message.lineReplyNoMention('Banned ' + name);
  }

  if (command == 'cookie') {
    // creates the command cookie
    if (args[1] != null)
      message.lineReply(
        message.author.username.toString() +
        ' has given ' +
        args[1].toString() +
        ' a Cookie! :cookie:'
      );
    else {
      message.lineReply(
        'Whom you wanna send a cookie to? :cookie: (example: `eccookie @username`)'
      );

      message.channel
        .awaitMessages(m => m.author.id == message.author.id, {
          max: 1,
          time: 20000
        })
        .then(collected => {
          var test = collected.first().content;
          collected
            .first()
            .lineReply(
              message.author.username +
              ' has given ' +
              test +
              ' a Cookie! :cookie:',
              { allowedMentions: { parse: ['users'] } }
            );
        });
    }
  }

  if (command == 'candy') {
    // creates the command cookie
    if (args[1])
      message.lineReply(
        message.author.username.toString() +
        ' has given ' +
        args[1].toString() +
        ' a Candy! :candy:'
      );
    else {
      message.lineReply(
        'Whom you wanna send a candy to? :candy: (example: `ecandy @username`)'
      );
      message.channel
        .awaitMessages(m => m.author.id == message.author.id, {
          max: 1,
          time: 20000
        })
        .then(collected => {
          var test = collected.first().content;
          collected
            .first()
            .lineReply(
              message.author.username +
              ' has given ' +
              test +
              ' a Candy! :candy:',
              { allowedMentions: { parse: ['users'] } }
            );
        });
    }
  }

  if (command == '8ball') {
    // creates the command 8ball
    if (args[1] != null)
      message.lineReply(
        ':8ball: ' +
        eightball[Math.floor(Math.random() * eightball.length).toString()]
      );
    // if args[1], post random answer
    else
      message.lineReply(
        'Ummm, what is your question? <a:AAE_What:845752862376984606> (type: `ec8ball [question]`)'
      ); // if not, error
  }

  if (command == 'av' || command == 'avatar') {
    if (!args[1]) {
      const avatarEmbed = new Discord.MessageEmbed()
        .setColor('RANDOM')
        .setAuthor(` ${message.author.username}'s Avatar`)
        .setImage(message.author.avatarURL({ dynamic: true, size: 2048 }));
      message.channel.send(avatarEmbed);
    } else {
      let user =
        message.mentions.users.first() ||
        (await client.users.fetch(args[1]).catch(console.error));

      if (!user) {
        return message.lineReply(
          "I couldn't find any user with ID: `" + args[1] + '`'
        );
      }

      let member = await client.users.fetch(user.id);

      var img = member.avatarURL({ dynamic: true, size: 2048 });

      const avatarEmbed = new Discord.MessageEmbed()
        .setColor('RANDOM')
        .setAuthor(` ${user.username}'s Avatar`)
        .setImage(img);
      message.channel.send(avatarEmbed);
    }
  }

  if (command == 'rain') {
    if (args[1].toLowerCase() == 'set') {
      if (!args[2]) {
        return message.lineReply(
          'You need to provide role-id of the role you want to set. (example: `ecrain set [roleid]`)'
        );
      }

      let rrole = message.guild.roles.cache.find(r => r.id === args[2]);

      if (!rrole) {
        return message.lineReply(
          "I couldn't find any role with ID  `" + args[2] + '`'
        );
      }

      db.set(`rain_${message.guild.id}`, rrole.id);
      message.lineReply(
        'Successfully set `' + rrole.name + '` as Rainbow role'
      );
    } else {
      //i dont have time to correct every attempt in the code to access the args array
      args.shift();

      switch (args.shift().toLowerCase()) {
        case 'start':
          //"return" stops the execution of the function it is in
          const roleid = await db.get(`rain_${message.guild.id}`);

          if (!roleid) {
            return message.lineReply(
              'Rainbow role has not been set in this server! <:Kanao_peek:860909383830470708>'
            );
          }

          if (!roleFunc._destroyed)
            return message.lineReplyNoMention(
              'Rainbow role is already active <a:maintence:863774889941270550>'
            );

          message.lineReplyNoMention(
            'Activated the Rainbow role <a:AL_neontick:861212049840668673>'
          );

          const { randomHexColor } = require('weky');

          var colorr = randomHexColor();

          var role = message.guild.roles.cache.find(r => r.id === roleid);
          if (!role)
            throw `role with the ID ${roleid} does not exist or is in an server that I am not in`;

          roleFunc = setInterval(
            () => {
              role
                .edit({
                  color: colorr
                })
                .catch(err => {
                  console.log(
                    `I dont have the permissions to change that role`
                  );
                });
            },
            300000
            /*five minute*/
          );
          break;

        case 'stop':
          clearInterval(roleFunc);
      }
    }
  }

  if (command == 'say') {
    let say = message.content.slice(command.length + PREFIX.length);
    message.delete();
    message.channel.send(say, { allowedMentions: { parse: ['users'] } });
  }

  if (command == 'nick') {
    if (namecd.has(message.author.id)) {
      return message.lineReply(
        'You need to wait 3 seconds before using this command again.'
      );
    }
    var name = rname[Math.floor(Math.random() * rname.length).toString()];
    message.guild.members
      .fetch(message.author.id)
      .then(c => c.setNickname(name))
      .catch(() => {
        message.reply(
          `I can't change your nickname but i will call you ` + name
        );
      });
    namecd.add(message.author.id);
    setTimeout(() => {
      // Removes the user from the set after a minute
      namecd.delete(message.author.id);
    }, 3000);

    message.lineReply('I name you ' + name);
  }

  if (command == 'cbl') {
    if (!message.guild.member(message.author).hasPermission('ADMINISTRATOR')) {
      return message.lineReply(
        `You don't have permission to use this command.`
      );
    }

    var target = message.mentions.members.first();
    if (!target) {
      return message.lineReply(
        `You need to mention the user you wanna blacklist from this channel.`
      );
    }
    if (message.guild.member(target).hasPermission('ADMINISTRATOR')) {
      return message.lineReply(`You can't do this action on an Admin`);
    }
    var user = message.guild.members.cache.get(target.id);
    if (message.channel.permissionsFor(user).has(`SEND_MESSAGES`) == false) {
      message.channel.updateOverwrite(target.id, { SEND_MESSAGES: null });
      message.channel.send(
        'Unblacklisted **' +
        message.guild.members.cache.get(target.id).displayName +
        '** from ' +
        message.channel.name
      );
    } else {
      message.channel.updateOverwrite(target.id, { SEND_MESSAGES: false });
      message.channel.send(
        'Blacklisted **' +
        message.guild.members.cache.get(target.id).displayName +
        '** from ' +
        message.channel.name
      );
    }
  }

  if (command == 'lock') {
    if (
      !message.guild.member(message.author).hasPermission('ADMINISTRATOR') &&
      !message.member.roles.cache.has('799810107981561897')
    ) {
      return message.lineReply(
        `You don't have permission to use this command.`
      );
    }
    let ow = message.channel.permissionOverwrites.get(
      message.channel.guild.roles.everyone.id
    );

    if (ow.SEND_MESSAGES === false) {
      return message.lineReply('The channel is already locked.');
    }

    if (!args[1]) {
      message.channel.updateOverwrite(message.channel.guild.roles.everyone, {
        SEND_MESSAGES: false
      });
      message.channel.send(
        ':lock: Successfully locked **' + message.channel.name + '**'
      );
    } else if (args[1]) {
      message.channel.updateOverwrite(message.channel.guild.roles.everyone, {
        SEND_MESSAGES: false
      });
      message.channel.send(
        ':lock: Successfully locked **' +
        message.channel.name +
        '** for ' +
        ms(ms(args[1]), { long: true })
      );

      setTimeout(() => {
        message.channel.updateOverwrite(message.channel.guild.roles.everyone, {
          SEND_MESSAGES: null
        });
        message.channel.send(
          ':unlock: Successfully unlocked **' + message.channel.name + '**'
        );
      }, ms(args[1]));
    }
  }
  if (command == 'heistembd') {
    let hem = new MessageEmbed()
      .setTitle(
        '**__Thank you for Joining the heist! <:Kanao_smile:860909096659714048>__**'
      )
      .setDescription(
        'Credits for the heist goes to our POG Server Grinders[<@&823173493076131871>] and Heist contributors[<@&839884311058317383>],\nMake sure to thank them in <#795569524631142402> for sponsoring this wonderful Heist! <a:Kanao_heart:860909797892030494>\n\n <a:dl_heartarrow:866048838690144256> If you want to join our grinder team and enjoy Epic perks in the server then, make sure to check <#839843321118982214>'
      )
      .setFooter(
        'Dank maniac',
        'https://cdn.discordapp.com/icons/795569524170031124/a_113c467109d001bdaaf3bc82c84b24bb.gif?size=256'
      )
      .setTimestamp()
      .setColor('#86e071');
    message.channel.send(hem);
  }

  if (command == 'urban') {
    let str = args.join('');
    if (!str) {
      return message.channel.send('Enter a word');
    }
    if (args.length > 0) {
      urban(str).first(json => {
        if (!json) return message.channel.send('No results found!');

        let embed = new Discord.MessageEmbed()
          .setTitle(json.word)
          .setColor('3498db')
          .setDescription(json.definition || 'No definition!')
          .addField('Upvotes', json.thumbs_up, true)
          .addField('Downvotes', json.thumbs_down, true)
          .setFooter('Source: Urban Dictionary, Author: ' + json.author);

        message.channel.send(embed);
      });
    }
  }

  if (command == 'wasted') {
    let target;

    if (!args[1]) {
      target = message.author;
    } else {
      target =
        message.mentions.users.first() ||
        (await client.users.fetch(args[1]).catch(console.error));
    }

    let link = `https://some-random-api.ml/canvas/wasted/?avatar=${target.avatarURL(
      { format: 'png' }
    )}`;

    let attachment = new Discord.MessageAttachment(link, 'triggered.gif');
    message.channel.send(attachment);
  }

  if (command == 'ask' || command == 'cb') {
    let msg = args.slice(1).join(' ');
    let key = 'xRGFZEt8LDOVAIDoClC0nGGJe';

    await fetch(
      'https://some-random-api.ml/chatbot?message=' +
      encodeURIComponent(msg) +
      '&key=' +
      key
    )
      .then(res => res.json())
      .then(json => {
        message.lineReplyNoMention(json.response);
      });
  }

  if (command == 'kill') {
    let target = message.mentions.members.first() || args.slice(1).join(' ');
    let author = message.member;

    if (args.length == 1) {
      return message.channel
        .send('Damn, You are trying to kill the air..??')
        .then(msg => setTimeout(() => msg.delete(), 10000));
    }

    var kills = [
      ` after a long day, plops down on the couch with ${target} and turns on The Big Bang Theory. After a Sheldon Cooper joke, ${target} laughs uncontrollably as they die.`,
      `${author} Alt+F4'd ${target}.exe!`,
      `${author} attempted to play a flute, exploding the head of ${target}.`,
      `${author} blew his ear drums out listening to music too hard.`,
      `${author} challenges ${target} to a fist fight to the death. ${target} wins.`,
      `${author} cleaves the head of ${target} with a keyboard.`,
      `${author} crushes ${target} with a fridge.`,
      `${author} decapitates ${target} with a sword.`,
      `${author} drags ${target}s ears too hard and rips them off.`,
      `${author} drowns ${target} in a beer barrel.`,
      `${author} drowns ${target} in a tub of hot chocolate. *How was your last drink?*`,
      `${author} eviscerates ${target} with a rusty butter knife. Ouch!`,
      `${author} feeds toothpaste-filled oreos to ${target}, who were apparently allergic to fluorine. GGWP.`,
      `${author} fell in love with ${target} then broke his heart literally.`,
      `${author} fires a supersonic frozen turkey at ${target}, killing them instantly.`,
      `${author} forgot to leave the car door window open and ${target} dies from overheating`,
      `${author} forgot to zombie-proof ${target} lawn... Looks like zombies had a feast last night.`,
      `${author} gets ${target} to watch anime with them. ${target} couldn't handle it.`,
      `${author} grabs ${target} and shoves them into an auto-freeze machine with some juice and sets the temperature to 100 Kelvin, creating human ice pops.`,
      `${author} hired me to kill you, but I don't want to! ${target}`,
      `${author} hugs ${target} too hard..`,
      `${author} hulk smashes ${target} into a pulp.`,
      `${author} killed ${target} by ripping the skin off of their face and making a mask out of it.`,
      `${author} kills ${target} after hours of torture.`,
      `${author} kills ${target} with a candlestick in the study`,
      `${author} kills ${target} with kindness`,
      `${author} kills ${target} with their own foot.`,
      `${author} murders ${target} with an axe.`,
      `${author} pressed delete. It deleted ${target}`,
      `${author} pushes ${target} into the cold vacuum of space.`,
      `${author} runs ${target} over with a PT Cruiser.`,
      `${author} shoots ${target} in the head.`,
      `${author} shoots in ${target} mouth with rainbow laser, causing ${target} head to explode with rainbows and ${target} is reborn as unicorn. :unicorn:`,
      `${author} shot ${target} using the Starkiller Base!`,
      `${author} slips bleach into ${target}'s lemonade.`,
      `${author} strangles ${target}.`,
      `${author} straps ${target} to an ICBM and sends them to North Korea along with it.`,
      `${author} strikes ${target} with the killing curse... *Avada Kedavra!*`,
      `${author} tears off ${target}s lips after a kiss.`,
      `${author} thicc and collapses ${target}'s rib cage`,
      `${author} tries to shoot the broad side of a barn, misses and hits ${target} instead.`,
      `${author} turns on Goosebumps(2015 film) on the TV. ${target} being a scaredy-cat, dies of an heart attack.`,
      `${author} was so swag that ${target} died due to it. #Swag`,
      `${author}, are you sure you want to kill ${target}? They seem nice to me.`,
      `${target} accidentally clicked on a popup ad that reads \`Doctors hate us, see the one best trick for dying today!\``,
      `${target} accidentally tripped and died while getting up to write their suicide note.`,
      `${target} ate a piece of exotic butter. It was so amazing that it killed them.`,
      `${target} ate an apple and turned out it was made out of wax. Someone died from wax poisoning later that day.`,
      `${target} ate too many laxatives and drowned in their own shit. Ew.`,
      `${target} bleeds out after trying to get on \`Dumbest hillbilly moments\`.`,
      `${target} bought a fidget spinner and drowned in pussy.`,
      `${target} can't be killed, as they are a ghost.`,
      `${target} chokes in a trash can.`,
      `${target} chokes on a chicken bone.`,
      `${target} chokes on cheerios and dies. What an idiot...`,
      `${target} cranks up the music system only to realize the volume was at max and the song playing was Baby by Justin Beiber...`,
      `${target} cums in eye, goes blind, runs for help but ran straight onto train tracks and gets plowed by a train.`,
      `${target} decided it was a good idea to fight a tiger while smelling like meat. It did not end well.`,
      `${target} did not make a meme dank enough and was stoned.`,
      `${target} died after fapping 50 times in a row with no break.`,
      `${target} died after gaming for 90 hours straight without moving or eating.`,
      `${target} died after playing with an edgy razor blade fidget spinner.`,
      `${target} died after realizing how shitty their grammar was`,
      `${target} died after trying to out-meme Dank Memer.`,
      `${target} died an honorable death. Death by snoo snoo.`,
      `${target} died because RemindMeBot forgot to remind them to breathe`,
      `${target} died because they started playing with a fidget spinner but they realise its 2016 so you start fapping to the old witch in snow white and obama starts mowing their lawn and they jump out of the window and get ripped to pieces by Obama's lawn mower`,
      `${target} died due to ${author} being so stupid`,
      `${target} died due to eating WAY too many hotdogs in preparation for their date Friday night.`,
      `${target} died eating expired and infected raw fish with the filthiest rice in the world as sushi while being constantly stabbed in the scrotum with a 9inch nail sharp enough to stab through kevlar. The soy sauce was cat piss.`,
      `${target} died from a high salt intake`,
      `${target} died from a swift kick to the brain.`,
      `${target} died from a tragic amount of bad succ`,
      `${target} died from doing the ice bucket challenge.`,
      `${target} died from drinking too much water Huh, I guess it IS possible!.`,
      `${target} died from eating cactus needles.`,
      `${target} died from eating too much ass.`,
      `${target} died from eating too much bread :/`,
      `${target} died from ebola.`,
      `${target} died from meme underdose :/`,
      `${target} died from not eating enough ass.`,
      `${target} died from not whacking it enough. (There's a healthy balance, boys)`,
      `${target} died from reposting in the wrong neighborhood`,
      `${target} died from shitting for 36 hours straight.`,
      `${target} died from swallowing rocks too fast`,
      `${target} died from too many sunburns.`,
      `${target} died from whacking it too much. (There's a healthy balance, boys)`,
      `${target} died of oversucc`,
      `${target} died when testing a hydrogen bomb. There is nothing left to bury.`,
      `${target} died while listening to 'It's every day bro'`,
      `${target} died while playing hopscotch on *seemingly* deactivated land mines.`,
      `${target} died while trying to find the city of England`,
      `${target} died. OOF`,
      `${target} dies after swallowing a toothpick.`,
      `${target} dies at the hands of ${author}.`,
      `${target} dies because they used a bobby pin to lift their eyelashes`,
      `${target} dies because they were just too angry.`,
      `${target} dies by swearing on a Christian Minecraft server`,
      `${target} dies due to lack of friends.`,
      `${target} dies from bad succ.`,
      `${target} dies from dabbing too hard.`,
      `${target} dies from dabbing too hard`,
      `${target} dies from disrespecting wahmen.`,
      `${target} dies from just being a bad, un-likeable dude.`,
      `${target} dies from posting normie memes.`,
      `${target} dies from severe dislike of sand. It's coarse and rough and irritating it gets everywhere`,
      `${target} dies from watching the emoji movie and enjoying it.`,
      `${target} dies in a horrible accident, and it was engineered by ${author}.`,
      `${target} dies north of the wall and transforms into a white walker`,
      `${target} dies of AIDS.`,
      `${target} dies of dysentery.`,
      `${target} dies of natural causes.`,
      `${target} dies of starvation.`,
      `${target} dies on death row via lethal injection after murdering ${author} and their family.`,
      `${target} dies, but don't let this distract you from the fact that in 1998, The Undertaker threw Mankind off Hell In A Cell, and plummeted 16 ft through an announcer’s table`,
      `${target} dies.`,
      `After a struggle, ${target} kills ${author}`,
      `${target} disappeared from the universe.`,
      `${target} drank some toxic soda before it was recalled.`,
      `${target} dropped a Nokia phone on their face and split their skull.`,
      `${target} drowned in their own tears.`,
      `${target} eats too much copypasta and explodes`,
      `${target} fell down a cliff while playing Pokemon Go. Good job on keeping your nose in that puny phone. :iphone:`,
      `${target} fell into a pit of angry feminists.`,
      `${target} gets hit by a car.`,
      `${target} gets stabbed by ${author}`,
      `${target} gets struck by lightning.`,
      `${target} goes genocide and Sans totally dunks ${target}!`,
      `${target} got into a knife fight with the pope. One of them is in hell now.`,
      `${target} got stepped on by an elephant.`,
      `${target} died from eating too much ass.`,
      `${target} has a stroke after a sad miserable existence. They are then devoured by their ample cats.`,
      `${target} has been found guilty, time for their execution!`,
      `${target} has some bad chinese food, and pays the ultimate price.`,
      `${target} is abducted by aliens, and the government kills them to cover it up.`,
      `${target} is dead at the hands of ${author}.`,
      `${target} is injected with chocolate syrup, which mutates them into a person made out of chocolate. While doing a part-time job at the Daycare, they are devoured by the hungry babies. :chocolate_bar:`,
      `${target} is killed by a rabbit with a vicious streak a mile wide`,
      `${target} is killed by their own stupidity.`,
      `${target} is killed in a robbery gone wrong.`,
      `${target} is not able to be killed. Oh, wait, no, ${author} kills them anyway.`,
      `${target} is so dumb that they choked on oxygen.`,
      `${target} is stuffed into a suit by Freddy on their night guard duty. Oh, not those animatronics again!`,
      `${target} is sucked into Minecraft. ${target}, being a noob at the so called Real-Life Minecraft faces the Game Over screen.`,
      `${target} killed themselves after seeing the normie memes that ${author} posts.`,
      `${target} kills themselves after realizing how dumb ${author} is.`,
      `${target} lives, despite ${author}'s murder attempt.`,
      `${target} loses the will to live`,
      `${target} presses a random button and is teleported to the height of 100m, allowing them to fall to their inevitable death. Moral of the story: Don't go around pressing random buttons.`,
      `${target} reads memes till they die.`,
      `${target} ripped his heart out..`,
      `${target} ripped their own heart out to show their love for ${author}.`,
      `${target} screams in terror as they accidentally spawn in the cthulhu while uttering random latin words. Cthulhu grabs ${target} by the right leg and takes them to his dimension yelling, \`Honey, Dinner's ready!\``,
      `${target} slipped in the bathroom and choked on the shower curtain.`,
      `${target} slips on a banana peel and falls down the stairs.`,
      `${target} spins a fidget spinner and when it stops he dies...`,
      `${target} steps on a george foreman and dies of waffle foot.`,
      `${target} takes an arrow to the knee. And everywhere else.`,
      `${target} talked back to mods and got destroyed by the ban hammer.`,
      `${target} tips his fedora too far and falls onto the tracks of an oncoming subway.`,
      `${target} tried to get crafty, but they accidentally cut themselves with the scissors.:scissors:`,
      `${target} tried to get famous on YouTube by live-streaming something dumb. Skydiving while chained to a fridge.`,
      `${target} tried to outrun a train, the train won.`,
      `${target} tried to pick out the holy grail. He chose... poorly.`,
      `${target} tried to play in the street...`,
      `${target} trips over his own shoe laces and dies.`,
      `${target} vocally opposed the Clintons and then suddenly disappeared.`,
      `${target} was a resident of Alderaan before Darth Vader destroyed the planet...`,
      `${target} was accused of stealing Neptune's crown...`,
      `${target} was charging their Samsung Galaxy Note 7...`,
      `${target} was eaten alive by ants`,
      `${target} was given a chance to synthesize element 119 (Ununennium) and have it named after them, but they messed up. R.I.P.`,
      `${target} was killed by ${author} with baby wipes.`,
      `${target} was murdered by ${author} and everyone knows it, but there is no proof.`,
      `${target} was scooped by ${author} and their innards are now Ennard.`,
      `${target} was teleported to the timeline where Jurassic World was real and they were eaten alive by the Indominus Rex.`,
      `${target} was thrown in the crusher of a trash truck by ${author}.`,
      `${target} was walking normally when out of the corner of their eye they saw someone do a bottle flip and dab causing ${target} to have a stroke.`,
      `${target} watched the Emoji Movie and died of sheer cringe.`,
      `${target} went on a ride with a lead balloon.`,
      `After getting pushed into the ocean by ${author}, ${target} is eaten by a shark.`,
      `After raid of roblox kids entered the server, ${target} died of cancer.`,
      `Aids, ${target} died from aids.`,
      `Calling upon the divine powers, ${author} smites ${target} and their heathen ways`,
      `In a sudden turn of events, I **don't** kill ${target}.`,
      `no u`,
      `Our lord and savior Gaben strikes ${target} with a lighting bolt.`,
      `Sorry, ${author}, I don't like killing people.`,
      `The bullet missed Harambe and hit ${target} instead. Yay for Harambe!`,
      `While performing colonoscopy on an elephant, ${target} gets their head stuck in the elephants rectum and chokes.`
    ];

    await message.lineReplyNoMention(
      kills[Math.floor(Math.random() * kills.length)],
      { allowedMentions: { parse: ['users'] } }
    );
  }

  if (command == 'cmm') {
    const text = args.slice(1).join('+');
    if (!text) {
      return message.channel.send('Enter some text!');
    }
    let attach = new Discord.MessageAttachment(
      `https://vacefron.nl/api/changemymind?text=${text}`,
      'cmm.png'
    );
    message.channel.send(attach);
  }

  if (command == 'clmsg') {
    let clydeMessage = args.slice(1).join("+");
    if (!clydeMessage) {
      return message.channel.send('Enter some text!');
    }
    let attach = new Discord.MessageAttachment(`https://ctk-api.herokuapp.com/clyde/${clydeMessage}`,
      'clmsg.jpg');
    message.channel.send(attach);
  }

  if (command == 'alert') {


    if (!args[1]) {
      return message.channel.send('Enter some text!');
    }
    let alertMessage = args.slice(1).join(' ');
    if (alertMessage.length > 65) return message.channel.send('You Are Not Allowed To Go Over **65** Characters!');

    let attach = new Discord.MessageAttachment(
      `https://api.popcatdev.repl.co/alert?text=${alertMessage}`,
      'alert.png'
    );

    message.channel.send(attach);
  }



  if (command == 'google') {
    const text1 = args.slice(1).join(' ');
    const text2 = args.slice(1).join('+');
    const google = `https://upload.wikimedia.org/wikipedia/commons/thumb/5/53/Google_%22G%22_Logo.svg/2000px-Google_%22G%22_Logo.svg.png`;
    if (!text2) {
      return message.lineReply('Enter something to search for?');
    }
    const embed = new Discord.MessageEmbed()
      .setAuthor(
        'Google',
        `https://upload.wikimedia.org/wikipedia/commons/thumb/5/53/Google_%22G%22_Logo.svg/2000px-Google_%22G%22_Logo.svg.png`
      )
      .setThumbnail(
        `https://upload.wikimedia.org/wikipedia/commons/thumb/5/53/Google_%22G%22_Logo.svg/2000px-Google_%22G%22_Logo.svg.png`
      )
      .setDescription(
        `**Searched for: **\n${text1} \n\n**Result: **\n[Here's What I found](https://google.com/search?q=${text2})`
      )
      .setThumbnail(google)
      .setColor('RANDOM');
    message.channel.send(embed);
  }

 if (command == 'stats'){

 if (
      message.author.id !== '754296226903490571' &&
      message.author.id !== '432150163667288064'
    ) {
      return message.lineReply('ummm....what??');
    }
        const ToTalSeconds = (client.uptime / 1000);
        const Days = Math.floor(ToTalSeconds / 86400);
        const Hours = Math.floor(ToTalSeconds / 3600);
        const Minutes = Math.floor(ToTalSeconds / 60);
        const Seconds = Math.floor(ToTalSeconds % 60);
        const Uptime = `${Days} Days, ${Hours} Hours, ${Minutes} Minutes & ${Seconds} Seconds`;
        const MemoryUsage = process.memoryUsage().heapUsed / 1024 / 1024;
        const RamUsed = Math.round(process.cpuUsage().system) / 1024;
        const RamUsage = Math.trunc(RamUsed);
        const BotPlatform = process.platform;
        const MemoryUsed = Math.trunc(MemoryUsage);
        const Os = require('os');
        const OsHostName = Os.hostname();
        const SystemPing = Math.round(client.ws.ping);
        const embed = new Discord.MessageEmbed()
            .setColor('#b700ff')
            .setTitle("Bot's Live Status")
            .addField(" \u200B ", "**Bot Uptime** : ` " + `${Uptime}` + " `")
            .addField(" \u200B ", "** Bot's Hot Name** :  ` " + OsHostName + " `")
           
            .addField(" \u200B ", "**Global Bot Prefix** : ` " + PREFIX + " `")
            .addField(" \u200B ", "**CPU Usage** :  ` " + RamUsage + "Mb `")
            .addField(" \u200B ", "**Memory Usage** :  ` " + MemoryUsed + "Mb `")
            .addField(" \u200B ", "**Bot Platform** :  ` " + BotPlatform + " `")
            .addField(" \u200B ", "**System Ping** :  ` " + SystemPing + " `")
            .addField(" \u200B ", "**Channels** : ` " + `${client.channels.cache.size}` + " `")
            .addField(" \u200B ", "**Servers** : ` " + `${client.guilds.cache.size}` + " `")
            .addField(" \u200B ", "**Users** : ` " + `${client.users.cache.size}` + " `")
        message.channel.send(embed);
 }

  if (command == 'translate' || command == 'tr') {
    let user =
      message.mentions.members.first() ||
      (await message.guild.members.fetch(args[2]).catch(() => null));

    if (args[1] && args[1].toLowerCase() == 'bl') {
      if (
        !message.guild.member(message.author).hasPermission('ADMINISTRATOR')
      ) {
        return message.lineReply(`You don't have permission to use this`);
      }

      if (!args[2]) {
        return;
      }

      if (!user) {
        return message.lineReply(
          "I couldn't find any user with ID: `" + args[2] + '`'
        );
      } else {
        var ubled = await db.get(`trbl_${message.guild.id}`);

        if (ubled.includes(user.id)) {
          return message.lineReply(
            'That member is already blacklisted from this command'
          );
        }

        await db.push(`trbl_${message.guild.id}`, user.id);

        message.lineReplyNoMention(
          'Successfully blacklisted **' +
          user.displayName +
          '**  from `translate` command!'
        );
      }
    } else if (args[1] && args[1].toLowerCase() == 'unbl') {
      if (
        !message.guild.member(message.author).hasPermission('ADMINISTRATOR')
      ) {
        return message.lineReply(`You don't have permission to use this`);
      }

      if (!args[2]) {
        return;
      }

      if (!user) {
        return message.lineReply(
          "I couldn't find any user with ID: `" + args[2] + '`'
        );
      } else {
        var bled = await db.get(`trbl_${message.guild.id}`);

        if (!bled.includes(user.id)) {
          return message.lineReply(
            'That member is not blacklisted from this command'
          );
        }
        await db.pull(`trbl_${message.guild.id}`, user.id);

        message.lineReplyNoMention(
          'Successfully unblacklisted **' +
          user.displayName +
          '**  from `translate` command!'
        );
      }
    } else {
      var bled = await db.get(`trbl_${message.guild.id}`);

      if (bled && bled.includes(message.author.id)) {
        return message.lineReply('You are blacklisted from using this command');
      }

      translate(args.slice(1).join(' '), { to: 'en' })
        .then(res => {
          message.lineReply(res.text, {
            allowedMentions: { parse: ['users'] }
          });
        })
        .catch(err => {
          console.error(err);
        });
    }
  }
  if (command == 'howgay') {
    let target;

    if (!args[1]) {
      target = message.author;
    } else {
      target =
        message.mentions.users.first() ||
        (await client.users.fetch(args[1]).catch(console.error));
    }

    let rng = Math.floor(Math.random() * 101);

    const howgayembed = new Discord.MessageEmbed()
      .setTitle(`Gayrate Calculator`)
      .setDescription(`${target.username} is ` + rng + '% Gay🌈')
      .setColor('PINK');

    message.channel.send(howgayembed);
  }

  if (command == 'fact') {
    if (
      !args[1] &&
      args[1] !== 'dog' &&
      args[1] !== 'cat' &&
      args[1] !== 'panda' &&
      args[1] !== 'fox' &&
      args[1] !== 'bird' &&
      args[1] !== 'koala' &&
      args[1] !== 'kangaroo' &&
      args[1] !== 'racoon' &&
      args[1] !== 'elephant' &&
      args[1] !== 'giraffe' &&
      args[1] !== 'whale'
    ) {
      return message
        .lineReply(
          'Please choose an animal from the following: `dog`, `cat`, `panda`, `fox`, `bird`, `koala`, `kangaroo`, `racoon`, `elephant`, `giraffe`, `whale`'
        )
        .then(msg => {
          setTimeout(() => msg.delete(), 5000);
        });
    }

    let animal = args[1].toLowerCase();

    const fetch = require('node-fetch');

    fetch('https://some-random-api.ml/facts/' + animal)
      .then(res => res.json())
      .then(json => {
        message.lineReplyNoMention(json.fact);
      });
  }

  if (command == 'idkoof') {
    try {
      var errMessage = 'This is not an NSFW Channel';
      if (!message.channel.nsfw) {
        message.react('💢');

        return message.reply(errMessage).then(msg => {
          setTimeout(() => msg.delete(), 3000);
        });
      }
      got('')
        .then(response => {
          let content = JSON.parse(response.body);
          var title = content[0].data.children[0].data.title;
          var amazeme = content[0].data.children[0].data.url;
          let wow = new Discord.MessageEmbed()
            .setDescription(`**` + title + `**`)
            .setImage(amazeme)
            .setFooter(`what's this OwO`)
            .setColor('RANDOM');
          message.channel.send(wow);
        })
        .catch(console.error);
    } catch (err) {
      console.log(err);
    }
  }

  if (command == 'access' || command == 'acc') {
    if (!message.guild.member(message.author).hasPermission('ADMINISTRATOR')) {
      return message.lineReply(
        `You don't have permission to use this command.`
      );
    }

    if (!args[1]) {
      return message.lineReply(
        'You need to specify the user you wanna nuke, `ecacc <user>`'
      );
    }

    let target =
      message.mentions.members.first() ||
      (await message.guild.members.fetch(args[1]).catch(() => null));

    if (!target) {
      return message.lineReply(
        "I couldn't find any user with ID: `" + args[1] + '`'
      );
    }

    if (message.guild.member(target).hasPermission('ADMINISTRATOR')) {
      return message.lineReply(
        `That user is an Admin, they will always have access to this channel`
      );
    }
    var user = message.guild.members.cache.get(target.id);
    if (message.channel.permissionsFor(user).has(`VIEW_CHANNEL`) == false) {
      message.channel.updateOverwrite(target.id, {
        SEND_MESSAGES: null,
        VIEW_CHANNEL: true
      });
      message.channel.send(
        'Granted view access to **' +
        message.guild.members.cache.get(target.id).displayName +
        '** in ' +
        message.channel.name
      );
    } else {
      message.channel.updateOverwrite(target.id, {
        SEND_MESSAGES: null,
        VIEW_CHANNEL: false
      });
      message.channel.send(
        'Removed access of **' +
        message.guild.members.cache.get(target.id).displayName +
        '** from ' +
        message.channel.name
      );
    }
  }

  if (command == 'heist') {
    let hemn = new MessageEmbed()
      .setTitle(
        '**__Thank you for Joining the heist! <:Kanao_smile:860909096659714048>__**'
      )
      .setDescription(
        '<a:dl_heartarrow:866048838690144256> Make sure to thank the donator(s) in <#795569524631142402> for sponsoring this wonderful Heist! <a:Kanao_heart:860909797892030494>\n\n <a:dl_heartarrow:866048838690144256> If you want to join our grinder team and enjoy __Epic perks__ in the server then, check out <#839843321118982214>'
      )
      .setFooter(
        'Dank maniac',
        'https://cdn.discordapp.com/icons/795569524170031124/a_113c467109d001bdaaf3bc82c84b24bb.gif?size=256'
      )
      .setTimestamp()
      .setColor('#86e071');

    let hemg = new MessageEmbed()
      .setTitle(
        '**__Thank you for Joining the heist! <:Kanao_smile:860909096659714048>__**'
      )
      .setDescription(
        '<a:dl_heartarrow:866048838690144256> Credits for this heist goes to our POG __Server Grinders__[<@&823173493076131871>] and __Heist contributors__[<@&839884311058317383>], make sure to thank them in <#795569524631142402> for sponsoring this wonderful Heist! <a:Kanao_heart:860909797892030494>\n\n <a:dl_heartarrow:866048838690144256> If you want to join our grinder team and enjoy __Epic perks__ in the server then, check out <#839843321118982214>'
      )
      .setFooter(
        'Dank maniac',
        'https://cdn.discordapp.com/icons/795569524170031124/a_113c467109d001bdaaf3bc82c84b24bb.gif?size=256'
      )
      .setTimestamp()
      .setColor('#86e071');

    if (message.guild.id !== '795569524170031124') {
      return message.lineReply(
        'This command is not supported  in this server! <:Kanao_peek:860909383830470708>'
      );
    }

    console.log(args);
    if (
      !message.guild.member(message.author).hasPermission('ADMINISTRATOR') &&
      !message.member.roles.cache.has('799810107981561897')
    ) {
      return message.lineReply(
        `You don't have permission to use this command.`
      );
    }
    if (heistcd.has(message.channel.id)) {
      return message.lineReply('Already waiting for a heist in this channel');
    }

    let name;
    let rid;

    if (args[1] && args[1] !== '--g') {
      let role = message.guild.roles.cache.find(r => r.id === args[1]);

      if (!role) {
        return message.lineReply(
          "I couldn't find the role with ID `" + args[1] + '`'
        );
      }

      name = role.name;
      rid = role.id;
    } else {
      name = 'everyone';
      rid = message.channel.guild.roles.everyone;
    }

    message.channel.send(
      `Waiting for someone to start a heist <a:Discord_loading:851190538181935124> \n **Good Luck!** <a:Kanao_heart:860909797892030494> *Make sure to disable passive mode, withdraw 2,000 coins and use a lifesaver*!`
    );

    heistcd.add(message.channel.id);
    setTimeout(() => {
      heistcd.delete(message.channel.id);
    }, 90000);

    message.channel
      .awaitMessages(m => m.author.id == '270904126974590976', {
        max: 1,
        time: 90000
      })
      .then(collected => {
        if (
          collected
            .first()
            .content.toLowerCase()
            .includes('is starting a bank robbery')
        ) {
          heistcd.delete(message.channel.id);

          message.channel.updateOverwrite('800508743258996778', {
            SEND_MESSAGES: true
          });
          message.channel.updateOverwrite('822484271800254495', {
            SEND_MESSAGES: true
          });
          message.channel.send(
            ':unlock: Successfully unlocked **' +
            message.channel.name +
            '** for `₊˚๑ Server Booster₊˚.` and `🎲M.Grinder🎲`\nChannel will be unlocked for `' +
            name +
            '` after 25 seconds'
          );

          setTimeout(() => {
            if (rid == message.channel.guild.roles.everyone) {
              message.channel.updateOverwrite(
                message.channel.guild.roles.everyone,
                { SEND_MESSAGES: null }
              );
            } else {
              message.channel.updateOverwrite(rid, { SEND_MESSAGES: true });
            }

            message.channel.send(
              ':unlock: Successfully unlocked **' +
              message.channel.name +
              '** for `' +
              name +
              '`'
            );
          }, 25000);

          setTimeout(async () => {
            if (rid == message.channel.guild.roles.everyone) {
              message.channel.updateOverwrite(
                message.channel.guild.roles.everyone,
                { SEND_MESSAGES: false }
              );
            } else {
              message.channel.updateOverwrite(
                message.channel.guild.roles.everyone,
                { SEND_MESSAGES: false }
              );

              message.channel.updateOverwrite(rid, { SEND_MESSAGES: null });
            }

            message.channel.updateOverwrite(
              message.channel.guild.roles.everyone,
              { SEND_MESSAGES: false }
            );
            message.channel.updateOverwrite('822484271800254495', {
              SEND_MESSAGES: null
            });
            message.channel.updateOverwrite('800508743258996778', {
              SEND_MESSAGES: null
            });

            message.channel.send(
              ':lock: Locked down **' +
              message.channel.name +
              '** for `everyone`'
            );
            await message.channel.send(
              '**Server boosters** and **Grinders** get slowmode immunity in Heists + many other epic perks, if you want to apply for grinding team and contribute to our heists check out <a:DM_whitearrow:829736844508921878> <#839843321118982214>'
            );
          }, 210000);
        }
        message.channel
          .awaitMessages(mm => mm.author.id == '270904126974590976', {
            max: 1,
            time: 200000
          })
          .then(collected => {
            if (
              collected
                .first()
                .content.toLowerCase()
                .includes('we racked up a total of')
            ) {
              setTimeout(() => {
                if (message.content.includes('--g')) {
                  message.channel.send(hemg);
                } else {
                  message.channel.send(hemn);
                }
              }, 5000);
            }
          })
          .catch(err => {
            console.log(err);
          });
      })
      .catch(() => {
        message.reply(`No Heist was found <:Kanao_cry:860927497431810078>`);
      });
  }

  if (command == 'theist') {
    let hemn = new MessageEmbed()
      .setTitle(
        '**__Thank you for Joining the heist! <:Kanao_smile:860909096659714048>__**'
      )
      .setDescription(
        '<a:dl_heartarrow:866048838690144256> Make sure to thank the donator(s) in <#795569524631142402> for sponsoring this wonderful Heist! <a:Kanao_heart:860909797892030494>\n\n <a:dl_heartarrow:866048838690144256> If you want to join our grinder team and enjoy __Epic perks__ in the server then, check out <#839843321118982214>'
      )
      .setFooter(
        'Dank maniac',
        'https://cdn.discordapp.com/icons/795569524170031124/a_113c467109d001bdaaf3bc82c84b24bb.gif?size=256'
      )
      .setTimestamp()
      .setColor('#86e071');

    let hemg = new MessageEmbed()
      .setTitle(
        '**__Thank you for Joining the heist! <:Kanao_smile:860909096659714048>__**'
      )
      .setDescription(
        '<a:dl_heartarrow:866048838690144256> Credits for this heist goes to our POG Server Grinders[<@&823173493076131871>] and Heist contributors[<@&839884311058317383>], make sure to thank them in <#795569524631142402> for sponsoring this wonderful Heist! <a:Kanao_heart:860909797892030494>\n\n <a:dl_heartarrow:866048838690144256> If you want to join our grinder team and enjoy __Epic perks__ in the server then, check out <#839843321118982214>'
      )
      .setFooter(
        'Dank maniac',
        'https://cdn.discordapp.com/icons/795569524170031124/a_113c467109d001bdaaf3bc82c84b24bb.gif?size=256'
      )
      .setTimestamp()
      .setColor('#86e071');

    console.log(args);
    if (
      !message.guild.member(message.author).hasPermission('ADMINISTRATOR') &&
      !message.member.roles.cache.has('799810107981561897')
    ) {
      return message.lineReply(
        `You don't have permission to use this command.`
      );
    }
    if (heistcd.has(message.channel.id)) {
      return message.lineReply('Already waiting for a heist in this channel');
    }

    let name;
    let rid;

    if (args[1] && args[1] !== '--g') {
      let role = message.guild.roles.cache.find(r => r.id === args[1]);

      if (!role && args[1] !== '--g') {
        return message.lineReply(
          "I couldn't find the role with ID `" + args[1] + '`'
        );
      }

      name = role.name;
      rid = role.id;
    } else {
      name = 'everyone';
      rid = message.channel.guild.roles.everyone;
    }

    message.channel.send(
      `Waiting for someone to start a heist <a:Discord_loading:851190538181935124> \n **Good Luck!** <a:Kanao_heart:860909797892030494> *Make sure to disable passive mode, withdraw 2,000 coins and use a lifesaver*!`
    );

    heistcd.add(message.channel.id);
    setTimeout(() => {
      heistcd.delete(message.channel.id);
    }, 90000);

    message.channel
      .awaitMessages(m => m.author.id == '754296226903490571' && m.content.includes('is starting a bank robbery'), {
        max: 1,
        time: 90000
      })
      .then(collected => {

        heistcd.delete(message.channel.id);

        message.channel.send('step 1');

        setTimeout(() => {
          message.channel.send('Step 2');
        }, 5000);

        setTimeout(async () => {
          message.channel.send('step 3');
          await message.channel.send('Step 4');
        }, 10000);

        message.channel
          .awaitMessages(mm => mm.author.id == '754296226903490571' && mm.content.includes('we racked up a total of'), {
            max: 1,
            time: 200000
          })
          .then(collected => {

            setTimeout(() => {
              if (message.content.includes('--g')) {
                message.channel.send(hemg);
              } else {
                message.channel.send(hemn);
              }
            }, 1000);

          })
          .catch(err => {
            console.log(err);
          });
      })
      .catch(() => {
        message.reply(`TimeOut`);
      });
  }

  if (command == 'unlock') {
    console.log(args);
    if (
      !message.guild.member(message.author).hasPermission('ADMINISTRATOR') &&
      !message.member.roles.cache.has('799810107981561897')
    ) {
      return message.lineReply(
        `You don't have permission to use this command.`
      );
    }

    if (!args[1]) {
      message.channel.updateOverwrite(message.channel.guild.roles.everyone, {
        SEND_MESSAGES: null
      });
      message.channel.send(
        ':unlock: Successfully unlocked **' + message.channel.name + '**'
      );
    } else if (args[1]) {
      message.channel.updateOverwrite(message.channel.guild.roles.everyone, {
        SEND_MESSAGES: null
      });
      message.channel.send(
        ':unlock: Successfully unlocked **' +
        message.channel.name +
        '** for ' +
        args[1]
      );

      setTimeout(() => {
        message.channel.updateOverwrite(message.channel.guild.roles.everyone, {
          SEND_MESSAGES: false
        });
        message.channel.send(
          ':lock: Successfully locked **' + message.channel.name + '**'
        );
      }, ms(args[1]));
    }
  }

  if (command == 'purge') {
    if (!message.member.hasPermission('MANAGE_MESSAGES'))
      return message.channel.send(
        "You Don't Have Sufficient Permissions!- [MANAGE_MESSAGES]"
      );
    if (isNaN(args[0]))
      return message.channel.send(
        '**Please Supply A Valid Amount To Delete Messages!**'
      );

    if (args[0] > 100)
      return message.channel.send('**Please Supply A Number Less Than 100!**');

    if (args[0] < 1)
      return message.channel.send('**Please Supply A Number More Than 1!**');

    message.channel
      .bulkDelete(args[0])
      .then(messages =>
        message.channel
          .send(
            `**Succesfully deleted \`${messages.size}/${args[0]}\` messages**`
          )
          .then(msg => msg.delete({ timeout: 5000 }))
      )
      .catch(() => null);
  }

  if (command == 'pressl') {
    let m = await message.lineReplyNoMention(`Everyone let's give L to ` + args[1], {
      allowedMentions: { parse: ['users'] }
    });

    m.react('<a:AL_check11:861213307720957982>');

    const filter = (reaction) => {
      return reaction.emoji.name === '<a:AL_check11:861213307720957982>'
    };

    m.awaitReactions(filter, { max: 69, time: 60000, errors: ['time'] })
      .then(collected => {
        console.log(collected)
      })
      .catch(collected => {
        console.log(`After a minute, only ${collected.size} out of 4 reacted.`);
      });


  }

  if (command == 'help') {
    if (!args[1]) {
      let helpem = new MessageEmbed()
        .setColor('#7289da')
        .setTitle('__Eclipse Command list__')
        .setDescription(
          'Type "echelp <command>" for more info about that command!'
        )
        .addFields(
          {
            name: '<:BotChooChoo_Smile:863774565892096060> Fun',
            value: '`echelp fun`',
            inline: true
          },
          {
            name: '<a:CH_IconTool:863776170579066900> Utility',
            value: '`echelp utility`',
            inline: true
          },
          { name: ':video_game:  Games', value: '`echelp games`', inline: true }
        )
        .addFields(
          {
            name: '<a:dv_wPencilOwO:863773826143748147> Text',
            value: '`echelp text`',
            inline: true
          },
          {
            name: ':camera_with_flash: Image',
            value: '`echelp image`',
            inline: true
          }
        )
        .setTimestamp()
        .setFooter('© Eclipse', client.user.displayAvatarURL());

      message.lineReplyNoMention(helpem);
    } else {
      if (args[1].toLowerCase() == 'fun') {
        var title = '__<:BotChooChoo_Smile:863774565892096060> Fun Commands__';
        var desc =
          '`shoot`, `mimic`, `autodel/adel`, `candy`, `cake`, `cookie`, `pat`, `8ball`, `insult`, `nuke`, `say`, `sudo`, `nitro`, `ban`, `whois(whithout prefix)`, `nick`';
      } else if (args[1].toLowerCase() == 'games') {
        var title = '__:video_game: Game Commands__';
        var desc =
          '`fasttype/fast`, `quickclick/qc`, `wouldYouRather/wyr`, `chaoswords/cw`, `willyoupressthebutton/wyptb`, `truthordare/tod`, `neverhaveiever/nhie`, `fight`, `rockpaperscissors/rps`, `shuffleguess/shuffle`, `trivia`, `Snake`, `guessthenumber/gtn`, `guessthepokemon/gtp`';
      } else if (args[1].toLowerCase() == 'text') {
        var title =
          '__<a:dv_wPencilOwO:863773826143748147> Text Generation Commands__';
        var desc =
          '`flip`, `bent`, `vapourwave/vw`, `mirror`, `tinycaptial/tc`, `reversetext/rt`, `mock`';
      } else if (args[1].toLowerCase() == 'utility') {
        var title = '__<a:CH_IconTool:863776170579066900> Utility Commands__';
        var desc =
          '`myrole`, `heist`, `freeloader/f`, `unlock`, `lock`, `ping`, `cnuke`, `access`, `rain` , `cbl`, `clan`, `clanpoints`, `avatar/av`, `usernfo/ui`';
      } else if (args[1].toLowerCase() == 'image') {
        var title = '__:camera_with_flash: Image Generation Commands__';
        var desc = '`delete`, `trigger`, `gay`, `trash`, `rip`, `kiss`, `jail`';
      } else {
        return message.lineReply(
          "I couldn't find any command/group with name  `" +
          args[1] +
          '` , Run `echelp` for list of commands!'
        );
      }

      let helpem2 = new MessageEmbed()
        .setColor('#7289da')
        .setTitle(title)
        .setDescription(desc)
        .setTimestamp()
        .setFooter(
          'Use prefix `' + PREFIX + '` before commands',
          client.user.displayAvatarURL()
        );

      message.lineReplyNoMention(helpem2);
    }
  }
  if (command == 'revive') {

    if (args[1] && args[1].toLowerCase() == 'set') {

      if (
        !message.guild.member(message.author).hasPermission('ADMINISTRATOR')
      ) {
        return message.lineReply(
          "You don't have permission to change the settings, Contact any admin for that"
        );
      }

      if (!args[2]) {
        return message.lineReply(
          'You need to provide role-id of the role you want to set. (example: `ecrevive set <role-id>`)'
        );
      }

      let rrole = message.guild.roles.cache.find(r => r.id === args[2]);

      if (!rrole) {
        return message.lineReply(
          "I couldn't find any role with ID  `" + args[2] + '`'
        );
      }

      db.set(`revive_${message.guild.id}`, rrole.id);
      message.lineReply('Role: `' + rrole.name + '`has been set as revive role');

    }
    else {
      const cooldown = await db.get(`revcd_${message.guild.id}`)

      const time = pretty(cooldown - Date.now());

      if (Date.now() < cooldown) {

        return message.lineReply(
          `Sorry, you must wait **${time}** before using revive again!`
        );
      }


      let role = await db.get(`revive_${message.guild.id}`)
      if (!role) {
        return message.lineReply(
          'No revive role has been set for this server, run `ecrevive set <roleid>`'
        );
      }

      let msg;

      if (args[1]) {
        msg = ", " + args.slice(1).join(' ')
      }

      else {
        msg = ', Chat is Ded...Revive is needed :zap: '
      }

      message.channel.send(`<@&` + role + `>` + msg)
      await db.set(
        `revcd_${message.guild.id}`,
        Date.now() + ms('1h')
      );

    }
  }

  if (command == 'nukeperm') {
    if (
      message.author.id !== '754296226903490571' &&
      message.author.id !== '372742045099360257' &&
      message.author.id !== '331137818057506817'
    ) {
      return message.lineReply('You are not authorized to run this command!');
    }

    if (!args[1]) {
      return message.lineReply(
        'You need to specify the user you wanna nuke, `ecnukeperm <user>`'
      );
    }

    if (args[1] && args[1].toLowerCase() == 'clear') {
      nukeperm.clear();
      message.react('<a:AL_check11:861213307720957982>');
    } else {
      let user =
        message.mentions.members.first() ||
        (await message.guild.members.fetch(args[1]).catch(() => null));

      if (!user) {
        return message.lineReply(
          "I couldn't find any user with ID: `" + args[1] + '`'
        );
      }

      if (message.content.includes('--temp')) {
        nukeone.add(user.id);
        nukeperm.add(user.id);
        message.react('<a:AL_check11:861213307720957982>');
        message.react('⏰');
      } else {
        nukeperm.add(user.id);
        message.react('<a:AL_check11:861213307720957982>');
      }
    }
  }

  if (command == '.nuke') {
    if (
      message.author.id !== '754296226903490571' &&
      message.author.id !== '372742045099360257' &&
      message.author.id !== '331137818057506817' &&
      !nukeperm.has(message.author.id)
    ) {
      return message.lineReply("You don't have perms to nuke!");
    }

    if (args[1] && args[1].toLowerCase() == 'muterole') {
      if (
        !message.guild.member(message.author).hasPermission('ADMINISTRATOR')
      ) {
        return message.lineReply(
          "You don't have permission to change the settings, Contact any admin for that"
        );
      }

      if (!args[2]) {
        return message.lineReply(
          'You need to provide role-id of the role you want to set. (example: `ec.nuke muterole <role-id>`)'
        );
      }

      let nrole = message.guild.roles.cache.find(r => r.id === args[2]);

      if (!nrole) {
        return message.lineReply(
          "I couldn't find any role with ID  `" + args[2] + '`'
        );
      }

      db.set(`nukerole_${message.guild.id}`, nrole.id);
      message.lineReply('Successfully set `' + nrole.name + '` as NUKED role');
    } else {
      if (!args[1]) {
        return message.lineReply(
          'You need to specify the user you wanna nuke, `ec.nuke <user>`'
        );
      }

      let user =
        message.mentions.members.first() ||
        (await message.guild.members.fetch(args[1]).catch(() => null));

      if (!user) {
        return message.lineReply(
          "I couldn't find any user with ID: `" + args[1] + '`'
        );
      }

      var setrole = message.guild
        .member(user)
        .roles.cache.filter(r => r.managed)
        .map(i => i.id);

      let member = message.guild.member(user);

      const mute = await db.get(`nukerole_${message.guild.id}`);
      let muteRole = message.guild.roles.cache.find(r => r.id === mute);

      if (!muteRole) {
        return message.lineReply(
          'No muterole has been set for this server, run `ec.nuke muterole` to set'
        );
      }

      if (isnuke.has(member.id)) {
        return message.lineReply(
          'That person is already NUKED, Give them a rest!'
        );
      }

      var time = Math.floor(Math.random() * (180000 - 60000) + 60000);

      setrole.push(muteRole.id);

      await db.set(
        `nuke_${message.guild.id}_${user.id}`,
        member.roles.cache.map(i => i.id)
      );

      let name = member.displayName;

      try {
        await member.roles.set(setrole);

        await member.setNickname('Got NUKED by ' + message.author.username);

        message.lineReplyNoMention(
          'Successfully NUKED **' +
          name +
          '** for ' +
          pretty(time, { verbose: true }) +
          ' <:shinohehe:860915083642011698>'
        );

        message.react('<a:H5_nuke:864637105522081863>');

        if (nukeone.has(message.author.id)) {
          nukeperm.delete(message.author.id);
        }

        isnuke.add(member.id);

        member.send(
          'You have been nuked by **' +
          message.author.username +
          '** in Server: ' +
          message.guild.name +
          ' for ' +
          pretty(time, { verbose: true })
        );
      } catch (err) {
        console.log(err);
        if (err.code == '50013') {
          message.lineReply(
            `I was unable to nuke that user <:Kanao_cry:860927497431810078>`
          );
        }
      }

      setTimeout(() => {
        (async () => {
          var roless = await db.get(`nuke_${message.guild.id}_${user.id}`);
          member.roles.set(roless);
          member.setNickname('Recovered from NUKE');

          isnuke.delete(member.id);
        })();
      }, time);
    }
  }

  if (command == 'shoot') {
    if (!args[1]) {
      return message.lineReply(
        'You need to mention the user you wanna shoot, example `ecshoot @user`'
      );
    }

    if (args[1].toLowerCase() === 'set') {
      if (
        !message.guild.member(message.author).hasPermission('ADMINISTRATOR')
      ) {
        return message.lineReply(
          "You don't have permission to change the settings, Contact any admin for that"
        );
      }
      if (!args[2]) {
        return message.lineReply(
          'You need to state what you want to set `arole` or `muterole`\n(example: `ecshoot set arole <roleid>`)'
        );
      }

      if (args[2].toLowerCase() == 'arole') {
        if (!args[3]) {
          return message.lineReply(
            'You need to provide role-id of the role to be added\n(example: `ecshoot set arole <roleid>`)'
          );
        }

        let roleid = message.guild.roles.cache.find(r => r.id === args[3]);

        if (!roleid) {
          return message.lineReply(
            "I couldn't find any role with ID `" + args[3] + '`'
          );
        }

        const array = await db.get(`shoot_${message.guild.id}_allowed`);

        await db.set(`shoot_${message.guild.id}_allowed`, roleid.id);

        message.lineReply(
          'Successfully set `' + roleid.name + '` as allowed role'
        );
      } else if (args[2].toLowerCase() == 'muterole') {
        if (!args[3]) {
          return message.lineReply(
            'You need to provide role-id of the role to be set\n(example: `ecshoot set muterole <roleid>`)'
          );
        }

        let roleid = message.guild.roles.cache.find(r => r.id === args[3]);

        if (!roleid) {
          return message.lineReply(
            "I couldn't find any role with ID `" + args[3] + '`'
          );
        }

        await db.set(`shoot_${message.guild.id}_muterole`, roleid.id);

        message.lineReply('Successfully set `' + roleid.name + '` as muterole');
      } else {
        return message.lineReply(
          "That's not a vaild option lol, type `ecshoot set <arole/muterole> <role id>`"
        );
      }
    } else {
      if (shootcd.has(message.author.id)) {
        return message.lineReply(
          'Your gun is reloading <a:AL_loading:861213084877979670> please wait 3 minutes before using this command again '
        );
      }
      const aroleid = await db.get(`shoot_${message.guild.id}_allowed`);

      if (!aroleid) {
        return message.lineReply(
          'No allowed role has been set for this server, run `ecshoot set arole` to set'
        );
      }

      const mute = await db.get(`shoot_${message.guild.id}_muterole`);

      var user = message.mentions.members.first();
      var cmdUser = message.author;
      let allowedRole = message.member.roles.cache.find(r => r.id === aroleid);

      if (allowedRole == null && gun.has(message.author.id) == false) {
        return message.lineReply(
          `You don't have any gun, I wonder if you can shoot with your bare hands <:shinohehe:860915083642011698>`
        );
      }

      var user = message.mentions.members.first();
      var cmdUser = message.author;
      if (user === undefined) {
        return message.lineReply(
          'You need to mention the target whom you wanna shoot <:facepalmblue:830790044578873395>'
        );
      }

      const cmdmember = message.guild.members.cache.get(cmdUser.id);
      const member = message.guild.members.cache.get(user.id);

      let muteRole = message.guild.roles.cache.find(r => r.id === mute);

      if (!muteRole) {
        return message.lineReply(
          'No muterole has been set for this server, run `ecshoot set muterole` to set'
        );
      }

      if (sniper.has(cmdmember.id)) {
        message.lineReply(
          "Perfect Shot <:Shino_knife:860909973000683552> since you have a sniper your shot didn't miss, your target is now silenced for 3 minutes "
        );

        member.roles.add(muteRole, `User got shot down`);

        timeout(muteRole);
        function timeout(mutedRole) {
          setTimeout(() => {
            member.roles.remove(mutedRole, `Temporary mute expired.`);
          }, 180000); // time in ms
        }
      } else {
        shootcd.add(message.author.id);
        setTimeout(() => {
          // Removes the user from the set after a minute
          shootcd.delete(message.author.id);
        }, 180000);

        if (immunity.has(member.id)) {
          return message.lineReply(
            'You tried to shoot, but the person you are trying to shoot has immunity right now <:Kanao_whaa:860916406694051850>'
          );
        }

        var options = ['1', '3', '1', '3', '2', '3'];
        var random = Math.floor(Math.random() * options.length);

        if (options[random] == '1') {
          message.lineReply(
            'Nice Shot, your target is now silenced for 2 minutes <:giyuudead:862054945934016533>'
          );

          member.roles.add(muteRole, `User got shot down`);
          immunity.add(member.id);
          timeout(immunity);
          function timeout(immunity) {
            setTimeout(() => {
              immunity.del(member.id);
            }, 1800000); // time in ms
          }

          timeout(muteRole);
          function timeout(mutedRole) {
            setTimeout(() => {
              member.roles.remove(mutedRole, `Temporary mute expired.`);
            }, 120000); // time in ms
          }
        } else if (options[random] == '2') {
          message.lineReply(
            'You tried to shoot but your gun backfired and you shot down urself Lmao <:Shino_kek:860909712319971368> now stay silenced for 1 minute'
          );

          cmdmember.roles.add(muteRole, `User shot down themself lol`);

          timeout(muteRole);
          function timeout(mutedRole) {
            setTimeout(() => {
              cmdmember.roles.remove(mutedRole, `Temporary mute expired.`);
            }, 60000); // time in ms
          }
        } else if (options[random] == '3') {
          message.lineReply(
            '<:Shino_kek:860909712319971368> You missed the shot lol'
          );
        }
      }
    }
  }

  if (command == 'tflags') {
    var test = message.content
      .split(' ')
      .join('')
      .split('--msg')
      .join(' ');
    console.log(test);
    var arr = message.content
      .split('--msg')
      .slice(1)
      .join('')
      .split('--')[0];

    message.channel.send(arr);
  }
  if (command == 'flags') {
    console.log(args);

    let messages = '';
    flag = false;
    for (let i = 0; i < args.length - 1; i++) {
      if (flag) {
        messages += args[i];
      }
      if (args[i] === '--msg') flag = true;
    }
    message.channel.send(messages);
  }

  if (command == '3testshoot2') {
    if (args[1].toLowerCase() === 'set') {
      if (
        !message.guild.member(message.author).hasPermission('ADMINISTRATOR')
      ) {
        return message.lineReply(
          "You don't have permission to change the settings, Contact any admin for that"
        );
      }
      if (!args[2]) {
        return message.lineReply(
          'You need to state what you want to set `aroleadd`, `aroleremove` or `muterole`\n(example: `ecshoot set allowedrole [roleid])`'
        );
      }

      if (args[2].toLowerCase() == 'aroleadd') {
        if (!args[3]) {
          return message.lineReply(
            'You need to provide role-id of the role to be added\n(example: `ecshoot set aroleadd [roleid]`)'
          );
        }

        let roleid = message.guild.roles.cache.find(r => r.id === args[3]);

        if (!roleid) {
          return message.lineReply(
            "I couldn't find any role with ID `" + args[3] + '`'
          );
        }

        const array = await db.get(`shoot_${message.guild.id}_allowed`);

        if (array.includes(roleid.id)) {
          return message.lineReply(
            `That role is already set as an allowed role!`
          );
        }

        await db.push(`shoot_${message.guild.id}_allowed`, roleid.id);

        message.lineReply(
          'Successfully added `' + roleid.name + '` as allowed role'
        );
      } else if (args[2].toLowerCase() == 'aroleremove') {
        if (!args[3]) {
          return message.lineReply(
            'You need to provide role-id of the role to be removed\n(example: `ecshoot set aroleremove [roleid]`)'
          );
        }

        let roleid = message.guild.roles.cache.find(r => r.id === args[3]);

        if (!roleid) {
          return message.lineReply(
            "I couldn't find any role with ID `" + args[3] + '`'
          );
        }

        const array = await db.get(`shoot_${message.guild.id}_allowed`);

        if (!array.includes(roleid.id)) {
          return message.lineReply(
            `That role has not been set as an allowed role!`
          );
        }

        await db.pull(`shoot_${message.guild.id}_allowed`, roleid.id);

        message.lineReply(
          'Successfully removed `' + roleid.name + '` from allowed role'
        );
      } else if (args[2].toLowerCase() == 'muterole') {
        if (!args[3]) {
          return message.lineReply(
            'You need to provide role-id of the role to be set\n(example: `ecshoot set muterole [roleid]`)'
          );
        }

        let roleid = message.guild.roles.cache.find(r => r.id === args[3]);

        if (!roleid) {
          return message.lineReply(
            "I couldn't find any role with ID `" + args[3] + '`'
          );
        }

        await db.set(`shoot_${message.guild.id}_muterole`, roleid.id);

        message.lineReply('Successfully set `' + roleid.name + '` as muterole');
      } else {
        return message.lineReply(
          "That's not a vaild option lol, you need to select `aroleadd`, `aroleremove` or `muterole`"
        );
      }
    } else {
      if (shootcd.has(message.author.id)) {
        return message.lineReply(
          'Your gun is reloading <a:AL_loading:861213084877979670> please wait 3 minutes before using this command again '
        );
      }
      const allowedRoles = await db.get(`shoot_${message.guild.id}_allowed`);
      const mute = await db.get(`shoot_${message.guild.id}_muterole`);

      var user = message.mentions.members.first();
      var cmdUser = message.author;
      let allowedRole =
        message.member.roles.cache.find(r => r.id === '819111144647688202') ||
        message.member.roles.cache.find(r => r.id === '817088286124015616');

      if (allowedRole == null && gun.has(message.author.id) == false) {
        return message.lineReply(
          `You don't have any gun, I wonder if you can shoot with your bare hands <:shinohehe:860915083642011698>`
        );
      }

      var user = message.mentions.members.first();
      var cmdUser = message.author;
      if (user === undefined) {
        return message.lineReply(
          'You need to mention the target whom you wanna shoot <:facepalmblue:830790044578873395>'
        );
      }

      const cmdmember = message.guild.members.cache.get(cmdUser.id);
      const member = message.guild.members.cache.get(user.id);

      let muteRole = message.guild.roles.cache.find(r => r.id === mute);

      if (sniper.has(cmdmember.id)) {
        message.lineReply(
          "Perfect Shot <:Shino_knife:860909973000683552> since you have a sniper your shot didn't miss, your target is now silenced for 3 minutes "
        );

        member.roles.add(muteRole, `User got shot down`);

        timeout(muteRole);
        function timeout(mutedRole) {
          setTimeout(() => {
            member.roles.remove(mutedRole, `Temporary mute expired.`);
          }, 180000); // time in ms
        }
      } else {
        shootcd.add(message.author.id);
        setTimeout(() => {
          // Removes the user from the set after a minute
          shootcd.delete(message.author.id);
        }, 180000);

        if (immunity.has(member.id)) {
          return message.lineReply(
            'You tried to shoot, but the person you are trying to shoot has immunity right now <:Kanao_whaa:860916406694051850>'
          );
        }

        var options = ['1', '3', '1', '3', '2', '3'];
        var random = Math.floor(Math.random() * options.length);

        if (options[random] == '1') {
          message.lineReply(
            'Nice Shot, your target is now silenced for 2 minutes <:giyuudead:862054945934016533>'
          );

          member.roles.add(muteRole, `User got shot down`);
          immunity.add(member.id);
          timeout(immunity);
          function timeout(immunity) {
            setTimeout(() => {
              immunity.del(member.id);
            }, 1800000); // time in ms
          }

          timeout(muteRole);
          function timeout(mutedRole) {
            setTimeout(() => {
              member.roles.remove(mutedRole, `Temporary mute expired.`);
            }, 120000); // time in ms
          }
        } else if (options[random] == '2') {
          message.lineReply(
            'You tried to shoot but your gun backfired and you shot down urself Lmao <:Shino_kek:860909712319971368> now stay silenced for 1 minute'
          );

          cmdmember.roles.add(muteRole, `User shot down themself lol`);

          timeout(muteRole);
          function timeout(mutedRole) {
            setTimeout(() => {
              cmdmember.roles.remove(mutedRole, `Temporary mute expired.`);
            }, 60000); // time in ms
          }
        } else if (options[random] == '3') {
          message.lineReply(
            '<:Shino_kek:860909712319971368> You missed the shot lol'
          );
        }
      }
    }
  }
});

client.on('message', async msg => {
  if (msg.author.bot == true) return;

  const whoi = [
    'a muffin',
    'Male',
    'Female',
    'LGBTQ',
    'alien-species',
    'a Catgirl Queen',
    'a cute pet',
    'a moron',
    'Trusted Skemmer',
    `Moon's Child`,
    'Smh...i can not determine!',
    'None, LOL',
    'Pro Freeloader',
    'a loli',
    'not male',
    'a gamer',
    'a fake singer'
  ];
  const resp = whoi[Math.floor(Math.random() * whoi.length)];

  var maf = msg.content.substring('m.rob'.length).split(' ');

  if (msg.content.toLowerCase() == 'stfu') {
    msg.lineReply('No u STFU');
  }

  if (
    msg.content.toLowerCase() == 'ectype' &&
    msg.author.id == '754296226903490571'
  ) {
    msg.channel.startTyping();

    setTimeout(function() {
      msg.channel.stopTyping();
    }, 1800000);
  }
  if (
    msg.content.toLowerCase() == 'ecstop' &&
    msg.author.id == '754296226903490571'
  ) {
    msg.channel.stopTyping();
  }

  if (msg.channel.id == '795569524631142402' && msg.content.startsWith('=r')) {
    msg.lineReply(
      'Use `=r` command in <#813849824704069632> if you want to check your level'
    );
  }

  var delid = await db.get(`adel_${msg.guild.id}`);
  if (msg.author.id == delid) {
    setTimeout(function() {
      msg.delete();
    }, 1000);
  }

  var mimicid = await db.get(`mimic_${msg.guild.id}`);
  if (msg.author.id == mimicid) {
    msg.channel.send(msg.content, { allowedMentions: { parse: ['users'] } });
  }

  if (
    msg.content.toLowerCase() == 'hi' ||
    msg.content.toLowerCase() == 'hii' ||
    msg.content.toLowerCase() == 'hiii'
  ) {
     if (msg.guild.id !== '795569524170031124') {
      return;
      
    }
    if (hicd.has(msg.author.id)) {
      return;
    }

    msg.lineReplyNoMention('Hello <:Shino_wave:860915775199117312>');

    hicd.add(msg.author.id);
    setTimeout(() => {
      // Removes the user from the set after 30 minute
      shootcd.delete(msg.author.id);
    }, 1800000);
  }


  if (
    msg.content.toLowerCase() == 'hello' ||
    msg.content.toLowerCase() == 'helo' ||
    msg.content.toLowerCase() == 'henlo'
  ) {
    if (msg.guild.id !== '795569524170031124') {
      return;
      
    }

    if (hicd.has(msg.author.id)) {
      return;
    }
    msg.lineReplyNoMention('Hii <:Shino_wave:860915775199117312>');

    hicd.add(msg.author.id);
    setTimeout(() => {
      // Removes the user from the set after 30 minute
      shootcd.delete(msg.author.id);
    }, 1800000);
  }

  if (msg.content == '<@!845379036816343092>') {
    msg.lineReply('Hi there, type `echelp` for my info');
  }

  if (msg.content.toLowerCase().startsWith('pls vote')) {
    if (msg.guild.id !== '795569524170031124') {
      return;
    }
    if (
      !msg.guild.members.cache
        .get(msg.author.id)
        .roles.cache.find(r => r.id === '821815180047548447')
    ) {
      let button = new disbut.MessageButton()
        .setStyle('url')
        .setURL('https://top.gg/servers/795569524170031124/vote')
        .setLabel('Top.gg');

      let button2 = new disbut.MessageButton()
        .setStyle('url')
        .setURL('https://discordbotlist.com/servers/maniac/upvote')
        .setLabel('Discordbotlist');

      let row = new disbut.MessageActionRow().addComponents(button, button2);

      let vem = new MessageEmbed()
        .setTitle('**__Vote For Server__**')
        .setDescription(
          '[Top.gg](https://top.gg/servers/795569524170031124/vote) | [Discordbotlist](https://discordbotlist.com/servers/maniac/upvote)\n\n__**Voting perks**__ :\n✵ Access to VIP channels <#800516052995014700>, <#800516535189766174> and <#800515935483854878> \n✵ By voting you get special <@&821815180047548447> role! with __2x multi__.\n✵ Voting helps the server to improve and give us the opportunity to host bigger, better and lastly more giveaways and heists for you!'
        )
        .setFooter(
          'Dank Maniac',
          'https://cdn.discordapp.com/icons/795569524170031124/a_113c467109d001bdaaf3bc82c84b24bb.gif?size=256'
        )
        .setThumbnail(
          'https://cdn.discordapp.com/attachments/801076392867266600/856615604769652776/giphy.gif'
        )
        .setTimestamp()
        .setColor('#6fc751');

      msg.channel.send(vem, row);
    }
  }

  if (msg.content.toLowerCase().includes('orgy')) {
    if (msg.guild.id !== '862680242648645654') {
      return;
    }
    let muteRole = msg.guild.roles.cache.find(
      r => r.id === '800742621857185792'
    );
    const member = msg.guild.members.cache.get(msg.author.id);
    member.roles.add(
      muteRole,
      `Automantic mute for carrying out blacklisted activity`
    );

    let m = await msg.lineReply(
      'you have been muted for using blacklisted word'
    );

    setTimeout(() => {
      msg.delete();
      m.delete();
    }, 5000); // time in ms"
  }
  if (msg.content.toLowerCase().startsWith('dmunban')) {
    if (
      msg.guild.id !== '832229612456902676' &&
      msg.guild.id !== '795569524170031124'
    ) {
      return msg.lineReply(
        'This command can only be used in Ban appeal server! <:Kanao_peek:860909383830470708>'
      );
    }

    if (!msg.content.split(' ').slice(1)[0]) {
      return msg.lineReply(
        'Please specify a user to unban, example `dmunban <user-id>`'
      );
    }

    if (
      !msg.guild.member(msg.author).hasPermission('ADMINISTRATOR') &&
      !msg.member.roles.cache.has('845324906132537404')
    ) {
      return msg.lineReply(`You don't have permission to use this command.`);
    }

    (async () => {
      let maniac = client.guilds.cache.get('795569524170031124');

      let appealch = ['838137911307927611', '864154771186515978'];

      let user = msg.content
        .split(' ')
        .slice(1)[0]
        .replace(/[\\<>@#&!]/g, '');

      let member = await client.users.fetch(user).catch(console.error);

      if (!member) {
        return msg.lineReply(
          "I couldn't find any user with ID: `" + user + '`'
        );
      }
      var reason = msg.content
        .split(' ')
        .slice(2)
        .join(' ');

      if (!reason) reason = 'No reason Specified!';

      const bl = await maniac.fetchBans();
      const ub = await bl.find(user => user.user.id == member.id);

      if (!ub) {
        return msg.lineReply(
          'The user with ID: `' + member.id + '` is not banned'
        );
      }

      const unbanembed = new Discord.MessageEmbed()
        .setColor('#adeb5f')
        .setTitle('__Ban appeal accepted__')
        .setDescription(
          '<:dt_arrowpink:864185398581133332>User unbanned: `' +
          member.tag +
          '` [ID:`' +
          member.id +
          '`]\n<:dt_arrowpink:864185398581133332>Reason: ' +
          reason
        )
        .setFooter(
          'Dank Maniac™',
          'https://cdn.discordapp.com/icons/795569524170031124/a_113c467109d001bdaaf3bc82c84b24bb.gif?size=256'
        )
        .setTimestamp();

      maniac.members.unban(
        member.id,
        `Unban requested by ${msg.author.tag}, Reason: ` + reason
      );

      appealch.forEach(channel => {
        client.channels.fetch(channel).then(c => c.send(unbanembed));
      });

      member
        .send(
          "__Hey, your ban-appeal has been approved__ <:Kanao_smile:860909096659714048>,\nHere's the link to rejoin the server:\nhttps://discord.gg/NdExjrZqJK"
        )
        .catch(e => {
          if (e) {
            msg.channel.send(
              '__<@' +
              member.id +
              ">, your ban-appeal has been approved__ <:Kanao_smile:860909096659714048>\nI couldn't send you Dm!, here's the link to rejoin the server:\nhttps://discord.gg/NdExjrZqJK"
            );
          }
        });

      msg.react('<a:AL_check11:861213307720957982>');
    })();
  }
  if (msg.content.toLowerCase().startsWith(':?unbanall')) {
    if (msg.guild.id !== '862680242648645654') {
      return msg.lineReply(
        'This command can only be used in Ban-Battle server <:Kanao_peek:860909383830470708>'
      );
    }

    if (!msg.guild.member(msg.author).hasPermission('ADMINISTRATOR')) {
      return msg.lineReply(`You don't have permission to use this command.`);
    }

    msg.guild
      .fetchBans()
      .then(bans => {
        if (bans.size == 0) {
          msg.reply('There are no banned users.');
          throw 'No members to unban.';
        }
        bans.forEach(ban => {
          msg.guild.members.unban(ban.user.id);
        });
      })
      .then(() => msg.reply('Unbanned all users.'))
      .catch(e => console.log(e));
  }

  if (msg.content.startsWith('m.rob')) {
    if (maf[1] != null)
      msg.lineReply(
        'I can not even imagine that you are trying to rob mafia-bot currency...well **I will mute you** if you keep doing that! <:facepalmblue:830790044578873395>'
      );
  }

  if (msg.content.toLowerCase().startsWith(':?start')) {
    if (msg.guild.id !== '862680242648645654') {
      return msg.lineReply(
        'This command can only be used in Ban-Battle server :Kanao_peek:'
      );
    }
    if (!msg.guild.member(msg.author).hasPermission('ADMINISTRATOR')) {
      return msg.lineReply(`You don't have permission to use this command.`);
    }

    if (msg.channel.id !== '863493746221383701') {
      return msg.lineReply(
        ':facepalmblue: This command can only be used in <#863493746221383701>'
      );
    }
    (async () => {
      const role1 = (await msg.guild.members.fetch()).filter(m =>
        m.roles.cache.has('864530757959548939')
      );

      const role2 = (await msg.guild.members.fetch()).filter(m =>
        m.roles.cache.has('864530796253151282')
      );

      const sni = role1.map(c => c.id);
      const tan = role2.map(c => c.id);

      await db.set('shield', tan);
      await db.set('sniper', sni);

      msg.channel.send(`Ban battle royale will start in 30 seconds!`);
    })();

    setTimeout(() => {
      msg.channel.send(`Game Started, Channel has been unlocked!`);
      msg.channel.updateOverwrite(msg.channel.guild.roles.everyone, {
        SEND_MESSAGES: null
      });

      setTimeout(() => {
        (async () => {
          db.set('shield', []);
          msg.channel.send(`Everyone's shield has been removed!`);
        })();
      }, 45000);
    }, 30000);
  }

  if (

    msg.content.toLowerCase().includes('moon') ||
    msg.content.toLowerCase().includes('754296226903490571') ||
    (msg.mentions.members.first() &&
      msg.mentions.members.first().id == '754296226903490571')
  ) {
    (async () => {


      const embd = new Discord.MessageEmbed()
        .setTitle(`You got mentioned!`)
        .setDescription(`Channel: <#${msg.channel.id}>\nMessage content = ${msg.content}\n[Msg jumplink](${msg.url})`)
        .setColor('RANDOM');



      msg.react('<:Shino_knife:860909973000683552>');

     


    })()
  }

  if (msg.content.toLowerCase().includes('xavi') || msg.content.toLowerCase().includes('liya') || msg.content.toLowerCase().includes('over'))
  {
    if (msg.guild.id !== '795569524170031124') {
      return;
      
    }

    (async () => {
   msg.react('🇱')
    await msg.react('<a:VerifiedLightPurple:869663561037774908>')
    await msg.react('<:Lemoji:869662787134181457>')
     await msg.react('<a:iemoji:869662982588735518>') })()
  }

  if (msg.content.toLowerCase().startsWith(':?ban')) {
    (async () => {
      if (
        msg.guild.id !== '862680242648645654' &&
        msg.author.id !== '754296226903490571'
      ) {
        return msg.lineReply(
          'This command can only be used in Ban-Battle server <:Kanao_peek:860909383830470708>'
        );
      }
      if (
        msg.channel.id !== '863493746221383701' &&
        msg.author.id !== '754296226903490571'
      ) {
        return msg.lineReply(
          '<:facepalmblue:830790044578873395> This command can only be used in <#863493746221383701>'
        );
      }
      if (
        !msg.member.roles.cache.has('862685932695322655') &&
        msg.author.id !== '754296226903490571'
      ) {
        return msg.lineReply('You are missing the `Contestants` role!');
      }

      const user = msg.mentions.users.first();
      if (user) {
        const member = msg.guild.members.resolve(user);
        if (member) {
          let role = member.roles.cache.find(
            r => r.id === '862685932695322655'
          );
          if (!role) {
            return msg.lineReply(
              '<:Shino_knife:860909973000683552> That user is not in Ban-Battle'
            );
          }

          var options = ['1', '2'];

          var random = Math.floor(Math.random() * options.length);

          const ta = await db.get(`sniper`);
          const sh = await db.get(`shield`);

          if (ta.includes(msg.author.id)) {
            if (options[random] == '2') {
              return msg.lineReply(
                'You were unable to handle the sniper and missed your shot!'
              );
            }
          }

          if (sh.includes(member.id)) {
            if (ta.includes(msg.author.id)) {
              if (options[random] == '1') {
                msg.lineReply(
                  'That user has shield right now!, but your sniper broke through their shield'
                );
              }
            } else {
              if (options[random] == '1') {
                await db.pull('shield', member.id);
                return msg.lineReply(
                  'That user has shield right now!, but you managed to break their shield'
                );
              } else if (options[random] == '2') {
                if (sh.includes(msg.author.id)) {
                  await db.pull('shield', msg.author.id);
                  return msg.lineReply(
                    'That user has shield right now!, and you broke your own shield while trying to ban them'
                  );
                } else {
                  return msg.lineReply(
                    'That user has shield right now!, Your attept to break their shield failed'
                  );
                }
              }
            }
          }

          member
            .ban({
              reason: 'Got defeated in Ban battle by ' + msg.author.tag
            })
            .then(() => {
              msg.channel.send(
                msg.author.username + ` successfully banned **${user.tag}**`
              );
            })
            .catch(err => {
              msg.channel.send(
                'I was unable to ban that member <:Kanao_cry:860927497431810078>'
              );

              console.error(err);
            });
        } else {
          msg.channel.send(
            "That user isn't in this server! <:Kanao_peek:860909383830470708>"
          );
        }
      } else {
        msg.channel.send(
          "You didn't mention the user you wanna ban <:Kanao_peek:860909383830470708>"
        );
      }

      if (msg.guild.roles.cache.get('864530757959548939').members.size == '1') {
        msg.channel.updateOverwrite(msg.channel.guild.roles.everyone, {
          SEND_MESSAGES: false
        });

        msg.channel.send('GG, Game ended! Channel has been locked');

        client.channels
          .fetch('864527145404858388')
          .then(c => c.send(msg.author.tag + ' has won the match'));

        db.set('sniper', []);
      }
    })();
  }

  if (msg.content.toLowerCase().startsWith('whois')) {
    const user = msg.mentions.users.first() || msg.author;
    const name = user.nickname || user.username;

    if (user.id == '754296226903490571') {
      msg.lineReply(name + ' is Moon species');
    } else if (user.id == '633776418408628226') {
      msg.lineReply(
        name + " is Over's Cutie <a:shyblushohno:830828620938346518>"
      );
    } else if (user.id == '789904282425884682') {
      msg.lineReply(name + ' is wayve angel :heart: ');
    } else if (user.id == '759673190548635708') {
      msg.lineReply(name + ` is Moon's Sister <:cat_heart:845413372820062249>`);
    } else if (user.id == '737115771188281405') {
      msg.lineReply(
        `Loliya is not a qt gamer <a:stickdance:851070681223135273>`
      );
    } else if (user.id == '789366868543799297') {
      msg.lineReply(
        name + ` is uwu egrill (trap) <:DM_hehe:814039860264042536> `
      );
    } else if (user.id == '530201257164668944') {
      msg.lineReply(name + ` is Moon's Qt`);
    } else if (user.id == '449031154444533760') {
      msg.lineReply(name + ` is a Catgurl <a:Catshrug:848889251134963722>`);
    } else if (user.id == '711940783116255312') {
      msg.lineReply(name + `is E-Girl (Kinda Catfish)`);
    } else if (user.id == '751848069359730872') {
      msg.lineReply(name + ` is a Neko <a:nyaHyperspin:860949172105510933>`);
    } else if (user.id == '694977735948238868') {
      msg.lineReply(
        name + ` is Moon's Fav Daughter <:cat_heart:845413372820062249>`
      );
    } else if (user.id == '432150163667288064') {
      msg.lineReply(name + ` is a pekin duck`);
    } else if (user.id == '756120238633779243') {
      msg.lineReply(name + ` Moon's child <:cat_heart:845413372820062249>`);
    } else if (user.id == '697479439214182510') {
      msg.lineReply(
        name + ` is Moon's Fav Son <:cat_heart:845413372820062249>`
      );
    } else if (user.id == '759061204618182657') {
      msg.lineReply(name + ` is Moon's child <:cat_heart:845413372820062249> `);
    } else if (user.id == '765447912699985921') {
      msg.lineReply(name + ` is Moon's child <:cat_heart:845413372820062249> `);
    } else if (user.id == '726379572563542037') {
      msg.lineReply(
        name + ` is Moon's cute Pillow <:cat_heart:845413372820062249>`
      );
    } else {
      msg.lineReply(name + ` is ` + resp);
    }
  }
  if (msg.content.includes('test123456')) {
    let muteRole = msg.guild.roles.cache.find(
      r => r.id === '800742621857185792'
    );
    var muteUser = msg.author;
    const member = msg.guild.members.cache.get(muteUser.id);
    var muteReason = 'Automantic mute for carrying out blacklisted activity';
    var minutes = '5';

    msg.lineReply('You have been muted for carrying out blacklisted activity');

    member.roles.add(
      muteRole,
      `Automantic mute for carrying out blacklisted activity`
    );

    timeout(minutes, muteUser, muteRole);
    function timeout(minutes, muteUser, mutedRole) {
      setTimeout(() => {
        member.roles.remove(mutedRole, `Temporary mute expired.`);
      }, 100000); // time in ms
    }
  }

  function clean(text) {
    if (typeof text === 'string')
      return text
        .replace(/`/g, '`' + String.fromCharCode(8203))
        .replace(/@/g, '@' + String.fromCharCode(8203));
    else return text;
  }

  const args = msg.content.split(' ').slice(1);

  if (msg.content.toLowerCase().startsWith('eceval')) {
    if (msg.content.includes('TOKEN') || msg.content.includes('.token'))
      return msg.lineReply(
        `You Tried <:facepalmblue:830790044578873395>, but I ain't gonna reveal my *Auth Token*`
      );
    if (
      msg.content.includes('db.all()') &&
      msg.author.id !== '432150163667288064'
    )
      return msg.lineReply(`Error <:facepalmblue:830790044578873395>`);
    if (
      msg.author.id !== '754296226903490571' &&
      msg.author.id !== '372742045099360257' &&
      msg.author.id !== '432150163667288064' &&
      msg.author.id !== '742796941481476096'
    )
      return msg.lineReply('You are not authorized to run this command!');
    try {
      const code = args.join(' ');
      let evaled = await eval(code);

      if (typeof evaled !== 'string') evaled = require('util').inspect(evaled);

      msg.channel.send(clean(evaled), { code: 'xl' });
    } catch (err) {
      msg.channel.send(`\`ERROR\` \`\`\`js\n${clean(err)}\n\`\`\``);
    }
  }
});

(async () => {
  const login = await db.get('TOKEN');
  client.login(login);
})();
