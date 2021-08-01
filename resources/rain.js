//class Rain { 
    /**
     * Creates a new rainbow.
     * @param {Number} size - the size of colors you want! @static Default size is 10
     * @param {String} prefix - the prefix of command! @static Default prefix is !
     * @param {Number} speed - speed of switching between colors! (in seconds) @static Default speed is 60000
     * @param {String} roleName - What should role name be? @static Default roleName is Rainbow
     * @param {String} logging - What should role name be? @static Default logging is false
     */
constructor(prefix, roleName, size, speed, logging) {
this.prefix = prefix || "es"
this.roleName = roleName || "Rainbow color" 
this.size = size || 10
this.speed = speed * 1000 || 60000
this.logging = logging || false
}

rainbow(client) {
const size = this.size
const rainbow = new Array(size)
for (var i=0; i<this.size; i++) {
  var red   = sin_to_hex(i, 0 * Math.PI * 2/3); // 0   deg
  var blue  = sin_to_hex(i, 1 * Math.PI * 2/3); // 120 deg
  var green = sin_to_hex(i, 2 * Math.PI * 2/3); // 240 deg

  rainbow[i] = '#'+ red + green + blue;
}

function sin_to_hex(i, phase) {
  var sin = Math.sin(Math.PI / size * 2 * i + phase);
  var int = Math.floor(sin * 127) + 128;
  var hex = int.toString(16);

  return hex.length === 1 ? '0'+hex : hex;
}

let place = 0;

client.on('message', async message => {
  if(message.content.startsWith(`${this.prefix}rainbow`)) {
    if(message.member.hasPermissions("MANAGE_ROLES")) {
      if(message.guild.roles.find(role => role.name === this.roleName)) return message.channel.send(`Remove all roles with this name \`\`Rainbow\`\` and then try again!`)
      message.channel.send(`⚠ **WARNING:**\n This won't work if you have many roles that named with this name \`\`${this.roleName}\`\` you need only 1 role with that name `)
     const role = await message.guild.createRole({
         name: this.roleName, 
         position: 1
       })
       await message.member.addRole(role, "Rainbow")
       await message.channel.send(`☑ Alright! I've created the role ${role} and gave it to you! :rainbow:`)
       setInterval(changeColor, this.speed)
    } else return message.channel.send(`:x: Seems you can't use that!`)
  }
})

client.on('ready', () => {
  console.log(`[Rainbow] is loaded`);  
  if(this.speed < 60000)console.log("The minimum speed is 60.000, if this gets abused your bot might get IP-banned");
  setInterval(changeColor, this.speed)
});

const loggign = this.logging
const role = this.roleName
function changeColor() {		
  client.guilds.forEach(guild => {
    if(!guild.roles.find(m => m.name === role)) return; 
    guild.roles.find(m =>  m.name === role).setColor(rainbow[place])
    if(loggign !== false){
      console.log(`[Rainbow] Changed color to ${rainbow[place]} in ${guild.name}`);
    }
    if(place == (size - 1)){
      place = 0;
    }else{
      place++;
  }
  })
}
 }
}

module.exports = Rain