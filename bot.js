const Discord = require('discord.js');
const client = new Discord.Client();

client.on('ready', () => {
    console.log("Connected as " + client.user.tag);

    client.user.setActivity("Youtube", {type: "WATCHING"});

    client.guilds.cache.forEach((guild) => {
        console.log(guild.name);
        guild.channels.cache.forEach((channel) => {
            console.log(` - ${channel.name} ${channel.type} ${channel.id}`);
        })

    })
    let testChannel = client.channels.cache.get("745084760543723601");
    const attachment = new Discord.MessageAttachment("https://www.gardenoflife.com/content/wp-content/uploads/2016/08/bowl-of-cherries_500x400.jpg");
    testChannel.send(attachment);
})


client.on('message', (receivedMessage) => {
    if (receivedMessage.author == client.user) {
        return
    }
    
    if (receivedMessage.content.startsWith("!")) {
        processCommand(receivedMessage);
    }
})

function processCommand(receivedMessage) {
    let fullCommand = receivedMessage.content.substr(1);
    let splitCommand = fullCommand.split(" ");
    let primaryCommand = splitCommand[0];
    let arguments = splitCommand.slice(1);

    if (primaryCommand == "help") {
        helpCommand(arguments, receivedMessage);
    } else if (primaryCommand == "multiply") {
        multiplyCommand(arguments, receivedMessage);
    } else if (primaryCommand == "bing") {
        receivedMessage.channel.send("bong");
    }else {
        receivedMessage.channel.send("Unknown Command. Try `!help` or `!multiply`");
    }
}

function multiplyCommand(arguments, receivedMessage) {
    if (arguments.length < 2) {
        receivedMessage.channel.send("Not enough arguments. Try `!multiply 2 10`");
        return
    }
    let product = 1;
    arguments.forEach((value) => {
        product = product * parseFloat(value);
    })
    receivedMessage.channel.send("The product of " + arguments + " is " + product.toString());
}

function helpCommand(arguments, receivedMessage) {
    if (arguments.length == 0) {
        receivedMessage.channel.send("I'm not sure what you need help with. Try `!help [topic]`"); 
    } else {
        receivedMessage.channel.send("It seems like you need help with " + arguments);
    }
}

client.login(/*input bot token*/);
