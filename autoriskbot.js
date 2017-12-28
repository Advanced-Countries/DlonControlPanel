(() => {
	const client = window.client = new Discord.Client(); //Makes the discord client.
	client.on('ready', () => {
		console.log('[CLIENT] Ready!');
		window.generalChannel = client.guilds.find('id', '386688984845123585').channels.find('name', 'spam'); //Find the #spam channel, and set it to var generalChannel.
		window.botDm = client.guilds.find('id', '386688984845123585').members.find("id", "386688418224275456"); //Find The Cartographer's user object, and save to botDm.
		botDm.createDM();//Creates a dm if nonexistent.
		botDm.send("!fullmap");//Gets the map, list of countries, and guns available.
		botDm.send("!list")
		botDm.send("!guns");
		generalChannel.send("!stats " + client.user.toString());//Since there are no way to identify who sent these commands (lag, would havve to find the entire message list, etc) they are ran by mentioning the user.
		generalChannel.send("!force " + client.user.toString());
		generalChannel.send("!resource " + client.user.toString());
	});
	client.on('debug', console.log);//Logs what the bot is doing.
	client.on('error', console.error);
	client.ws.on('close', (event) => console.log('[CLIENT] Disconnect!', event));//Logs out.
	client.on('message', (message) => {//When it detects a message.
		if (message.author.id === "386688418224275456") {//Only check messages if the author is the cartographer.
			console.log(message.content);//Logs the message for simple debugging.
			if (message.content === "") {//If the message is blank, it must have the map.
				document.getElementById("map").src = message.attachments.first().url;//Grab the url of the map, and make it the src of the map image.
			} else if (message.channel.id === "386688984845123587") {//If it is in the daily news chanenl, it is a daily news. So, put it in the daily news area.
				document.getElementById("news").innerHTML = "Last Daily News:\n" + message.content;
				botDm.send("!fullmap");
				botDm.send("!list");
				generalChannel.send("!stats " + client.user.toString());
				generalChannel.send("!force " + client.user.toString());
				generalChannel.send("!resource " + client.user.toString());
			} else if (message.content.includes("guns")) {//If it includes the word guns, it is the gun list. Put it in the guns area.
				document.getElementById("guns").innerHTML = message.content;
			} else if (message.content.includes("force") & message.content.includes(client.user.toString().replace("<@", "<@!"))) {//If it contains force and your mention, it is your force. Put it in the force area.
				document.getElementById("force").innerHTML = message.content;
			} else if (message.content.includes("you mine") & message.content.includes(client.user.toString().replace("<@", "<@!"))) {//If it contains "you mine" and your mention, it is your resources. Put in in the resources ara.
				document.getElementById("resource").innerHTML = message.content;
			} else if (message.content.includes(client.user.tag)) {//If it contains your tag, ("<username><#1234>") it is your stats. Put it in the stats area.
				document.getElementById("stats").innerHTML = "Your Stats:\n" + message.content;
			} else if (message.content.includes("economyType:")) {//Someone else's stats.

			} else if (message.content.includes("resource")) {//Someone else;'s resources.

			} else if (message.content.includes("force")) {//Someone else's force.

			} else if (message.content.includes("\n")) {//List of countries, so puut it in the list area.
				document.getElementById("list").innerHTML = "List of Countries:\n" + message.content;
			}

		}
	});
	client.login(localStorage.token || window.token || prompt('Please put your token here: (Open Discord, press ctrl-shift-i, go to Application, click local storage, and copy token.', 'abcdef123456').replace("\"", ""))
		.then((token) => localStorage.token = token); //Prompts for user's token, stores it in localstorage, never online or anywhere else.

	//Button click functions
	function war(where) { //Reference so i dont have to type it over and over again. Mostly self-explanatory.
		generalChannel.send("!war " + where);
		setTimeout(function () {
			generalChannel.send("!fullmap");
		}, 1000);//Waits 1 second, then updates the map.
	}
	function update(){
		setTimeout(function () {
			generalChannel.send("!stats " + client.user.toString());
			generalChannel.send("!resource " + client.user.toString());
			generalChannel.send("!force " + client.user.toString());
		}, 1000);
	}
	document.getElementById("warall").onclick = function () {
		war("all");//Most of these are self explanatory, this one wars all.
	};
	document.getElementById("warnone").onclick = function () {
		war("none");
	};
	document.getElementById("warcountry").onclick = function () {
		war(prompt("Which country would you like to war? None to cancel", "Country"));//Prompts for country to war.
	};
	document.getElementById("setpower").onclick = function () {
		generalChannel.send("!manpower " + prompt("What manpower would you like? (1-100)", "Numbers Only"));//Prompts for manpower to use.
		update();
	};
	document.getElementById("setgun").onclick = function () {
		generalChannel.send("!setgun " + prompt("Which gun? Remember, setting up removes 10% of your resource! (Gun list at bottom of page)", "AWP, M1, etc."));
		update();
	};
	document.getElementById("ally").onclick = function () {
		generalChannel.send("!ally " + prompt("Which country to ally?", "Country Name"));
	};
	document.getElementById("unally").onclick = function () {
		generalChannel.send("!unally " + prompt("Which country to unally?", "Country Name"));
	};
	document.getElementById("color").onclick = function () {
		generalChannel.send("!color " + prompt("What color? ([RRR] [GGG] [BBB])", "RRR GGG BBB"));
		update();
	};
	document.getElementById("capital").onclick = function () {
		generalChannel.send("!movecapital " + prompt("Where to? ([X] [Y])", "X Y"));
		update();
	};
	document.getElementById("giveland").onclick = function () {
		generalChannel.send("!giveland " + prompt("To whom and where? ([country] [x] [y] [size])", "[country] [x] [y] [size]"));
		update();
	};
	document.getElementById("giveppl").onclick = function () {
		generalChannel.send("!givepeople " + prompt("To whom? ([country] [amount])", "[country] [amount]"));
		update();
	};
	document.getElementById("map").onclick = function () {
		botDm.send("!fullmap");
		botDm.send("!list");
		generalChannel.send("!stats " + client.user.toString());
		generalChannel.send("!force " + client.user.toString());
		generalChannel.send("!resource " + client.user.toString());
	}
})();