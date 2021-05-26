const Discord = require('discord.js');
module.exports = {
	name: 'help',
	execute(message) {
        let commandList = new Discord.MessageEmbed()
        .setTitle(`Commands List 👨‍💻`)
        .setColor('BLUE')
        .addField('Lists districts of Kerala', "`!dist`", false)
        .addField("To get hourly notifications", "`!subscribe <district code> <age>`", false)
        .addField("To modify age", "`!modify age <age>`", false)
        .addField('To modify district', "`!modify district <district code>`", false)
        .addField('To unsubcribe from notifications', "`!unsubscribe`", false)
        .addField('To find slot in your districts', "`!find district <district code>`", false)
		message.channel.send(commandList);
	},
};