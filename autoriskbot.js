/*jshint esversion: 6 */

async function updateSpam() {
  var tmp = "";
  var messages = client.guilds
    .find("id", "386688984845123585")
    .channels.find("name", "sparm").messages;
  setTimeout(() => {
    last5 = messages.last(5);
    last5.forEach(msg => {
      tmp += `[${msg.author.tag}] ${msg.content}\n`;
    });
    document.getElementById("spambox").innerHTML = tmp;
  }, 100);
}

async function updateChat() {
  var tmp = "";
  var messages = client.guilds
    .find("id", "386688984845123585")
    .channels.find("name", "general").messages;
  setTimeout(() => {
    last5 = messages.last(5);
    last5.forEach(msg => {
      tmp += `[${msg.author.tag}] ${msg.content}\n`;
    });
    document.getElementById("chatbox").innerHTML = tmp;
  }, 100);
}

(async () => {
  const client = (window.client = new Discord.Client()); //Makes the discord client.
  client.on("ready", async () => {
    console.log("[CLIENT] Ready!");
    var generalChannel = await client.guilds
      .find("id", "386688984845123585")
      .channels.find("name", "sparm"); //Find the #spam channel, and set it to var generalChannel.
    var theBot = await client.guilds
      .find("id", "386688984845123585")
      .members.find("id", "386688418224275456"); //Find The Cartographer's user object, and save to generalChannel.
    window.myId = await client.user.id;
    generalChannel.send("!fullmap"); //Gets the map, list of countries, and guns available.
    generalChannel.send("!list");
    generalChannel.send("!guns");
    generalChannel.send("!stats");
    generalChannel.send("!force webInt");
    generalChannel.send("!resource webInt");
    document.getElementById("upd8").onclick = updateChat();
    document.getElementById("upd81").onclick = updateSpam();
    document.getElementById("sendBtn").onclick = async function() {
      var sendTo = await client.guilds
        .find("id", "386688984845123585")
        .channels.find("name", "general");
      sendTo.send(document.getElementById("chatTxt").value);
      document.getElementById("chatTxt").value = "";
      setTimeout(async function() {
        var tmp = "";
        var messages = await client.guilds
          .find("id", "386688984845123585")
          .channels.find("name", "general").messages;
        setTimeout(async () => {
          last5 = messages.last(5);
          last5.forEach(msg => {
            tmp += `[${msg.author.tag}] ${msg.content}\n`;
          });
          document.getElementById("chatbox").innerHTML = tmp;
        }, 100);
      }, 100);
    };

    document.getElementById("sendBtn1").onclick = async function() {
      var sendTo = await client.guilds
        .find("id", "386688984845123585")
        .channels.find("name", "sparm");
      sendTo.send(document.getElementById("chatTxt1").value);
      document.getElementById("chatTxt1").value = "";
      setTimeout(async function() {
        var tmp = "";
        var messages = await client.guilds
          .find("id", "386688984845123585")
          .channels.find("name", "sparm").messages;
        setTimeout(async () => {
          last5 = messages.last(5);
          last5.forEach(msg => {
            tmp += `[${msg.author.tag}] ${msg.content}\n`;
          });
          document.getElementById("sparmbox").innerHTML = tmp;
        });
      }, 100);
    };
  });
  client.on("debug", console.log); //Logs what the bot is doing.
  client.on("error", console.error);
  client.ws.on("close", event => console.log("[CLIENT] Disconnect!", event)); //Logs out.
  client.on("message", async message => {
    if (message.channel.id == "387583736213929985") {
      //Updates chat on new message.
      updateChat();
    }
    if (
      message.channel.id == "386736565356986368" &&
      message.author.id != "386688418224275456"
    ) {
      //Updates spam on new message, except if it is actually spam.
      updateSpam();
    }
    if (message.author.id === "386688418224275456") {
      //When it detects a message.
      //Only check messages if the author is the cartographer.
      console.log(message.content); //Logs the message for simple debugging.
      if (message.content === "Fullmap:") {
        //If the message is blank, it must have the map.
        document.getElementById("map").src = message.attachments.first().url; //Grab the url of the map, and make it the src of the map image.
      } else if (message.channel.id === "386688984845123587") {
        //If it is in the daily news chanenl, it is a daily news. So, put it in the daily news area.
        document.getElementById("news").innerHTML =
          "Last Daily News:\n" + message.content;
        generalChannel.send("!fullmap");
        generalChannel.send("!list");
        generalChannel.send("!stats");
        generalChannel.send("!force webInt");
        generalChannel.send("!resource webInt");
      } else if (message.content.includes("guns")) {
        //If it includes the word guns, it is the gun list. Put it in the guns area.
        document.getElementById("guns").innerHTML = message.content;
      } else if (message.content.includes(`${myId}WEBINT_FORCE`)) {
        //If it contains force and your id, it is your force. Put it in the force area.
        document.getElementById("force").innerHTML = message.content.replace(
          `${myId}WEBINT_FORCE`,
          ""
        );
      } else if (message.content.includes(`${myId}WEBINT_RESOURCE`)) {
        //If it contains "you mine" and your mention, it is your resources. Put in in the resources ara.
        document.getElementById("resource").innerHTML = message.content.replace(
          `${myId}WEBINT_RESOURCE`,
          ""
        );
      } else if (message.content.includes(client.user.tag)) {
        //If it contains your tag, ("<username><#1234>") it is your stats. Put it in the stats area.
        document.getElementById("stats").innerHTML =
          "Your Stats:\n" + message.content;
      } else if (message.content.includes("List of countries:")) {
        document.getElementById("list").innerHTML = message.content;
      }
    }
  });
  client
    .login(
      localStorage.token ||
        window.token ||
        prompt(
          "Please put your token here: (Open Discord, press ctrl-shift-i, go to Application, click local storage, and copy token.",
          "abcdef123456"
        ).replace('"', "")
    )
    .then(token => (localStorage.token = token)); //Prompts for user's token, stores it in localstorage, never online or anywhere else.

  //Button click functions
  async function war(where) {
    //Reference so i dont have to type it over and over again. Mostly self-explanatory.
    generalChannel.send("!war " + where);
    setTimeout(function() {
      generalChannel.send("!fullmap");
    }, 1000); //Waits 1 second, then updates the map.
  }

  async function update() {
    setTimeout(function() {
      generalChannel.send("!stats");
      generalChannel.send("!resource webInt");
      generalChannel.send("!force webInt");
    }, 1000);
  }
  document.getElementById("warall").onclick = async function() {
    war("all"); //Most of these are self explanatory, this one wars all.
  };
  document.getElementById("warnone").onclick = async function() {
    war("none");
  };
  document.getElementById("warcountry").onclick = async function() {
    war(
      prompt("Which country would you like to war? None to cancel", "Country")
    ); //Prompts for country to war.
  };
  document.getElementById("setpower").onclick = async function() {
    generalChannel.send(
      "!manpower " +
        prompt("What manpower would you like? (1-100)", "Numbers Only")
    ); //Prompts for manpower to use.
    update();
  };
  document.getElementById("setgun").onclick = async function() {
    generalChannel.send(
      "!setgun " +
        prompt(
          "Which gun? Remember, setting up removes 10% of your resource! (Gun list at bottom of page)",
          "AWP, M1, etc."
        )
    );
    update();
  };
  document.getElementById("ally").onclick = async function() {
    generalChannel.send(
      "!ally " + prompt("Which country to ally?", "Country Name")
    );
  };
  document.getElementById("unally").onclick = async function() {
    generalChannel.send(
      "!unally " + prompt("Which country to unally?", "Country Name")
    );
  };
  document.getElementById("color").onclick = async function() {
    generalChannel.send(
      "!color " + prompt("What color? ([RRR] [GGG] [BBB])", "RRR GGG BBB")
    );
    update();
  };
  document.getElementById("capital").onclick = async function() {
    generalChannel.send("!movecapital " + prompt("Where to? ([X] [Y])", "X Y"));
    update();
  };
  document.getElementById("giveland").onclick = async function() {
    generalChannel.send(
      "!giveland " +
        prompt(
          "To whom and where? ([country] [x] [y] [size])",
          "[country] [x] [y] [size]"
        )
    );
    update();
  };
  document.getElementById("giveppl").onclick = async function() {
    generalChannel.send(
      "!givepeople " +
        prompt("To whom? ([country] [amount])", "[country] [amount]")
    );
    update();
  };
  document.getElementById("map").onclick = async function() {
    generalChannel.send("!fullmap");
    generalChannel.send("!list");
    generalChannel.send("!stats webInt");
    generalChannel.send("!force webInt");
    generalChannel.send("!resource webInt");
  };
})();
