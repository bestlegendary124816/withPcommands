const c = require("../../../Schemas/Chatbot");
const l = require("../../../Schemas/remove");
const suggest = require("../../../Schemas/Suggestion");
const Reply = require("../../../Systems/Reply");
module.exports = {
  subCommand: "enable.plugin",

  async execute(interaction) {
    const { guild, options } = interaction;
    let chatbot = await c.findOne({ Guild: guild.id }).catch((err) => {});
    let leave = await l.findOne({ Guild: guild.id }).catch((err) => {});

    let action = options.getString("plugin");
    let channel = options.getChannel("channel");
    if (action == "Welcome System") {
      Reply(
        interaction,
        ":x:",
        "__**Welcome System**__\n**Hey, the latest version of this plugin cannot be enabled using this command**\n*To enable this plugin you need to [`visit`](https://dashboard-mondistech.tk) our dashboard*",
        true
      );
    }
    if (action == "Chatbot System") {
      if (chatbot) {
        return interaction.reply({
          content: "**Chatbot System** is already enabled",
          ephemeral: true,
        });
      }
      if (!chatbot) {
        await c.create({
          Guild: guild.id,
          Channel: channel.id,
        });
        interaction.reply({
          content: "**Chatbot System** has been enabled",
          ephemeral: true,
        });
      }
    }
    if (action == "Leave System") {
      if (leave) {
        return interaction.reply({
          content: "**Leave System** is already enabled",
          ephemeral: true,
        });
      }
      if (!leave) {
        await l.create({
          Guild: guild.id,
          Channel: channel.id,
        });
        interaction.reply({
          content: "**Leave System** has been enabled",
          ephemeral: true,
        });
      }
    }
    if (action == "Suggestion System") {
      const Data = await suggest.findOne({ Guild: guild.id });
      if (Data) {
        interaction.reply({
          content: "**Suggestion System** is already enabled",
          ephemeral: true,
        });
      }
      if (!Data) {
        suggest.create({
          Guild: guild.id,
          Channel: channel.id,
        });
        interaction.reply({
          content: "**Suggestion System** has been enabled",
          ephemeral: true,
        });
      }
    }
  },
};
