const Discord = require('discord.js');
const {unsubUser} = require('../crud')
module.exports = {
	name: 'unsubscribe',
	execute(message) {
        const {author} = message
        unsubUser(author.id);
        let unsubUserMsg = new Discord.MessageEmbed()
        .setTitle(`Unsubscribed Successfully`)
        .setColor('RED')
        .addField('Unsubscribed', "NemesisX has unsubscribed succesfully", false)
		message.channel.send(unsubUserMsg);
	},
};