const fs = require('fs');
require('dotenv').config();
const Discord = require('discord.js');
const client = new Discord.Client();
client.commands = new Discord.Collection();
const TOKEN = process.env.TOKEN;

module.exports = {
  client: client,
};


const commandFiles = fs.readdirSync('./commands').filter(file => file.endsWith('.js'));

for (const file of commandFiles) {
  const command = require(`./commands/${file}`);
  client.commands.set(command.name, command);
}




//Events section
fs.readdir('./events', (err, files) => {
  if (err) return console.log(err);
  let jsFiles = files.filter(file => file.split('.').pop() === 'js');
  jsFiles.forEach(file => {
    const prop = require(`./events/${file}`);
    client.on(prop.help.event, prop);
  });
});



bot.on('ready', () => {
  console.info(`Logged in as ${bot.user.tag}!`);
  client.channels.cache.get(process.env.GUILD_INIT).send(process.env.GUILD_INIT_MSG)
});

bot.login(TOKEN);



// bot.on('message', msg => {
//   if (msg.content === 'kindi') {
//     msg.reply('yo enn kindi 🎃');
//     msg.channel.send('dear kindi 🎃');

//   } else if (msg.content.startsWith('!kick')) {
//     if (msg.mentions.users.size) {
//       const taggedUser = msg.mentions.users.first();
//       msg.channel.send(`You wanted to kick: ${taggedUser.username}`);
//     } else {
//       msg.reply('Please tag a valid user!');
//     }  
//   } else if (message.content === "help") {
//       message.channel.send("```Available Commands:\n-help <Help list>\nping <test>\nweather <US Zipcode, UK Postcode, Canada Postalcode, IP address, Latitude/Longitude (decimal degree) or city name> (e.g: weather Athens)\n```"); 
//   } else if(msg.content === 'who is sarvesh'){
//     msg.reply('sarvesh is an idiot 🎃');
//   }  else if(msg.content === 'who is ashish'){
//   msg.reply('ashish is  🎃');
// } 
// });
