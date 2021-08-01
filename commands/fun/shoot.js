const { Command } = require('discord.js-commando');
const shootcd = new Set();
const immunity = new Set();
const sniper = new Set();
const gun = new Set();

const { Database } = require('quickmongo');
const db = new Database(process.env.MONGODB_SRV);


module.exports = class Shoot extends Command {
	constructor(client) {
		super(client, {
			name: 'shoot',
			group: 'fun',
			memberName: 'shoot',
			description: 'Shoot down a member...',
      args: [
				{
					key: 'arg',
					prompt: 'Whom do you wanna shoot?',
					type: 'string',
				},
			],
		});
	}


async run(message, { arg }) {

    if(arg[0].toLowerCase() === 'set') {
      if (
        !message.guild.member(message.author).hasPermission('ADMINISTRATOR')
      ) {
        return message.lineReply(
          "You don't have permission to change the settings, Contact any admin for that"
        );
      }
      if (!arg[1]) {
        return message.lineReply(
          'You need to state what you want to set `arole` or `muterole`\n(example: `ecshoot set arole <roleid>`)'
        );
      }

      if (arg[1].toLowerCase() == 'arole') {
        if (!arg[2]) {
          return message.lineReply(
            'You need to provide role-id of the role to be added\n(example: `ecshoot set arole <roleid>`)'
          );
        }

        let roleid = message.guild.roles.cache.find(r => r.id === arg[2]);

        if (!roleid) {
          return message.lineReply(
            "I couldn't find any role with ID `" + arg[2] + '`'
          );
        }

        const array = await db.get(`shoot_${message.guild.id}_allowed`);

        await db.set(`shoot_${message.guild.id}_allowed`, roleid.id);

        message.lineReply(
          'Successfully set `' + roleid.name + '` as allowed role'
        );
      } else if (arg[1].toLowerCase() == 'muterole') {
        if (!arg[2]) {
          return message.lineReply(
            'You need to provide role-id of the role to be set\n(example: `ecshoot set muterole <roleid>`)'
          );
        }

        let roleid = message.guild.roles.cache.find(r => r.id === arg[2]);

        if (!roleid) {
          return message.lineReply(
            "I couldn't find any role with ID `" + arg[2] + '`'
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

          tout(muteRole);
          function tout(mutedRole) {
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
};