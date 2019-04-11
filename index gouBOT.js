const Discord = require ('discord.js');
const client = new Discord.Client();
var prefix = "/";
 
client.login ('NTYxNTQzODEwNzM2NDU1Njkx.XKkZLw.1aCYXUnwrlHw0ewA7oQclR5n7bs');
 
client.on("ready", async () => {
    console.log("BOT EN LIGNE")
    client.user.setActivity("dev par 『BTR』Manare#2881 /help")
    });

client.on("message", async message => {
    if (message.content === "salut") {
    message.channel.send("Salut tu va bien?");
    }
});

client.on("message", async message => {
    if (message.content === "oui et toi") {
    message.channel.send("bien tfq");
    }
});

client.on("message", async message => {
    if (message.content === "rien") {
    message.channel.send("moi je code un bot qui s'appelle 『BTR』Manare");
    }
});


 
client.on('guildMemberAdd', member =>{
    let embed = new Discord.RichEmbed()
        .setDescription(':tada:' +  member.user.username + ' est arrivé'   )
        .setFooter('Nous sommes désormais ' + member.guild.memberCount)
    member.guild.channels.get('556473673171599372').send(embed)
    member.addRole('564199166683644076')


});

client.on('guildMemberRemove', member =>{
    let embed = new Discord.RichEmbed()
        .setDescription(':cry:' +  member.user.username  + ' nous sommes ' + member.guild.memberCount )
        .setFooter('Nous sommes désormais ' + member.guild.memberCount)
    member.guild.channels.get('556473673171599372').send(embed)

});

/*Kick*/

client.on('message', message =>{
    if (!message.guild) return
    let args = message.content.trimLeft().split(/ +/g)
    if (args[0].toLowerCase() === prefix + 'kick'){
        if (!message.member.hasPermission('KICK_MEMBERS')) return message.channel.send("Vous n'avez pas la permision d'executer cette commande );")
        let member = message.mentions.members.first()
        if (!member) return message.channel.send("Veuillez mentionner un utilisateur :x:")
        if(member.highestRole.caculatedPosition >= message.member.highestRolecaculatedPosition && message.author.id === message.guild.owner.id) return message.channel.send("Vous ne pouvez pas kick cette utilisateur")
        if (!member.kickable) return message.channel.send("Il est impossible pour moi de kick cette utilisateur")
        member.kick()
        message.channel.send(member.user.username + ' a été exclu :white_check_mark:')
    }

});

/*Ban*/

client.on('message', message =>{
    if (!message.guild) return
    let args = message.content.trimLeft().split(/ +/g)
    if (args[0].toLowerCase() === prefix + 'ban'){
        if (!message.member.hasPermission('BAN_MEMBERS')) return message.channel.send("Vous n'avez pas la permision d'executer cette commande );")
        let member = message.mentions.members.first()
        if (!member) return message.channel.send("Veuillez mentionner un utilisateur :x:")
        if(member.highestRole.caculatedPosition >= message.member.highestRolecaculatedPosition && message.author.id === message.guild.owner.id) return message.channel.send("Vous ne pouvez pas kick cette utilisateur")
        if (!member.bannable) return message.channel.send("Il est impossible pour moi de bannir cette utilisateur")
        member.ban()
        message.channel.send(member.user.username + 'a été banni :white_check_mark:')
    }
    
});

client.on("message", message =>{
    if (!message.guild) return
    let args = message.content.trim().split(/ +/g)

    if (args[0].toLowerCase() === prefix + "clear") {
        if (!message.member.hasPermission('MANAGE_MESSAGE')) return message.channel.send("Vous n'avez pas la permission d'executer cette commande")
        let count = args[1]
        if(!count) return message.channel.send("Veuliez indiquer un nombre de message a supprimer")
        if (isNaN(count)) return message.channel.send("Veulliez indiquer un nombre valide")
        if (count < 1 || count > 100) return message.channel.send("Veulliez indiquer un nombre entre 1 et 100")
        message.channel.bulkDelete(parseInt(count) + 1)
    }

    if (args[0].toLowerCase() === prefix + "mute") {
        if (!message.member.hasPermission('MUTE_MEMBERS')) return message.channel.send("Vous n'avez pas la permission d'executer cette commande")
        let member = message.mentions.members.first()
        if(!member) return message.channel.send("Veulliez mentionner un utilisateur")
        if (member.highestRole.caculatedPosition >= message.member.highestRole.caculatedPosition && message.author.id !== message.guild.ownerID) return message.channel.send("Vous ne pouvez pas mute cette utilisateur")
        if (member.highestRole.caculamtedPosition >= message.guild.me.highestRole.caculatedPosition || member.id === message.guild.ownerID) return message.channel.send("je ne peux pas mute cette utilisateur")
        let muterole = message.guild.roles.find(role => role.name === 'Muted')
        if (muterole) {
            member.addRole(muterole)
            message.channel.send(member.user.username + ' a été mute :white_check_mark:')
        }
        else {
            message.guild.createRole({name: 'Muted', permissions: 0}).then((role) =>{
                message.guild.channels.filter(channel => channel.type === 'text').forEach(channel =>{
                    channel.overwritePermissions(role, {
                        SEND_MESSAGE: false
                    })
                })
                member.addRole(role)
                message.channel.send(member.user.username + ' a été mute :white_check_mark:')
            })
        }