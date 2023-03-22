require("discord-player/smoothVolume");
const { Player } = require("discord-player");
const { Logger } = require("fallout-utility");
const {
  Client,
  GatewayIntentBits,
  Partials,
  Collection,
  EmbedBuilder,
} = require("discord.js");
const {
  Guilds,
  GuildMembers,
  GuildMessages,
  MessageContent,
  GuildVoiceStates,
} = GatewayIntentBits;
const { User, Message, GuildMember, ThreadMember } = Partials;

const client = new Client({
  intents: [
    Guilds,
    GuildMembers,
    GuildMessages,
    MessageContent,
    GuildVoiceStates,
  ],
  partials: [User, Message, GuildMember, ThreadMember],
});
const { loadEvents } = require("./Handlers/eventHandler");

client.config = require("./config.json");
client.events = new Collection();
client.subCommands = new Collection(); //SubCommand handler
client.commands = new Collection();
client.pcommands = new Collection();

// const player = new Player(client);
// player.on("trackStart", (queue, track) =>
//   queue.metadata.channel.send(`🎶 | Now playing **${track.title}**!`)
// );

// Add the player on the client
client.player = new Player(client, {
  ytdlOptions: {
    quality: "highestaudio",
    highWaterMark: 1 << 25,
  },
});

loadEvents(client);

const logger = new Logger({ name: "MonDisTechLogger" });

process.on("unhandledRejection", (reason, p) => {
  const ChannelID = client.config.Anti_Crash_System_Channel_ID;
  console.error("Unhandled promise rejection:", reason, p);
  const Embed = new EmbedBuilder()
    .setColor("Random")
    .setTimestamp()
    .setFooter({ text: "⚠️Anti Crash system" })
    .setTitle("Error Encountered");
  const Channel = client.channels.cache.get(ChannelID);
  if (!Channel) return;
  Channel.send({
    embeds: [
      Embed.setDescription(
        "**Unhandled Rejection/Catch:\n\n** ```" + reason + "```"
      ),
    ],
  });
  logger.error(reason);
  // Create logger to file
logger.logToFile("./logs/latest.log");
});

client.login(client.config.token);
