const Discord = require('discord.js');
const {createSubbedUser} = require('../crud')
module.exports = {
	name: 'subscribe',
    args:2,
    usage:'<district code> <age>',
	execute(message) {
        const {author} = message
        const args = message.content.trim().split(/ +/g); 
        createSubbedUser(author.id,args[1],args[2]);
        let subToNotifications = new Discord.MessageEmbed()
        .setTitle(`Successfully subscribed🔔`)
        .setColor('YELLOW')
        .addField('NemesisX Subscribed', "NemesisX has successfully subscribed to hourly notification.You will recieve notifications directly in your dm", false)
		message.channel.send(subToNotifications);
	},
};