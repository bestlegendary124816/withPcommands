const { loadCommands } = require("../../Handlers/commandHandler");
const chalk = require("chalk");
module.exports = {
  name: "ready",
  once: "true",
  execute(client) {
    console.log(chalk.green(`Logined as ${client.user.tag}`));
    const activities = [
      "V3.0 MonDisTech",
      `With ${client.guilds.cache.size} guild(s)`,
    ];
    let i = 0;
    setInterval(
      () =>
        client.user.setPresence({
          activities: [{ name: activities[i++ % activities.length] }],
          status: "ONLINE",
        }),
      5000
    );
    console.log(chalk.bgRedBright("NOTE: THIS CODE IS MADE BY TECHNOLOGYPOWER#3174 AND USING THIS CODE WITHOUT THE CREDITS WILL LEAD TO A PUNISHMENT!"))
    const { connect } = require("mongoose");
    connect(client.config.DataBaseURL, {}).then(() => {
      console.log(chalk.grey("Connected to the database"));
    });

    console.log(chalk.red("BOT POWERED BY DISCORD.JS V14"));
    loadCommands(client);
  },
};
