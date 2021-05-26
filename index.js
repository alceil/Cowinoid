const fs = require('fs');
require('dotenv').config();
const Discord = require('discord.js');
const client = new Discord.Client();
const mongo = require('./mongo')
client.commands = new Discord.Collection();
const TOKEN = process.env.TOKEN;
const {startNotifyJob} = require('./startnotifyjob')
const cron = require('node-cron')

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
    console.log(file);
    client.on(prop.help.event, prop);
  });
});
client.on('ready',async () => {
  console.info(`Logged in as ${client.user.tag}!`);
  let welcomeMsg = new Discord.MessageEmbed()
  .setColor('#4545ff')
  .setTitle('Hey :wave:,\tCowinoid here 🤖')
  .setImage('https://github.com/alceil/images/blob/main/COVINOID.png?raw=true')
  .setDescription("Hello user, myself Cowinoid.\tYour all in one guide to get updates about vaccine in your locality \n \n**`Functions of Cowinoid🚀`** \n\n⭐Checks Covid vaccination slots availability in your area \n\n⭐Alert you when a slot becomes available.\n\n Type `!help` to Show list of all Commands")
  client.channels.cache.get('843561421610156045').send(welcomeMsg)

  await mongo().then((mongoose) => {
    try {
      console.log('Connected to mongo!')   
    } catch(err) {
      console.log(err)
    }
  cron.schedule('*/2 * * * *', async () => {
    console.log("job started")
    await startNotifyJob(client)
})
}
)
//'0 */1 * * * '

});
client.login(TOKEN);



// client.on('message', msg => {
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
