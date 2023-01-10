const w = require("../../../Schemas/Welcome");
const c = require("../../../Schemas/Chatbot");
const l = require("../../../Schemas/remove");
const suggest = require("../../../Schemas/Suggestion");
const Reply = require("../../../Systems/Reply");
module.exports = {
  subCommand: "disable.plugin",
  async execute(interaction) {
    const { guild, options } = interaction;
    let welcome = await w.findOne({ Guild: guild.id }).catch((err) => {});
    let chatbot = await c.findOne({ Guild: guild.id }).catch((err) => {});
    let leave = await l.findOne({ Guild: guild.id }).catch((err) => {});

    let action = options.getString("plugin");
    if (action == "Welcome System") {
      if (!welcome) {
        interaction.reply({
          content: "**Welcome System** is already disabled",
          ephemeral: true,
        });
      }
      if (welcome) {
        w.findOneAndDelete({ Guild: guild.id }).catch((err) => {});
        return interaction.reply({
          content: "**Welcome System** has been disabled",
          ephemeral: true,
        });
      }
    }
    if (action == "Chatbot System") {
      if (!chatbot) {
        interaction.reply({
          content: "**Chatbot System** is already disabled",
          ephemeral: true,
        });
      }
      if (chatbot) {
        c.findOneAndDelete({ Guild: guild.id }).catch((err) => {});
        return interaction.reply({
          content: "**Chatbot System** has been disabled",
          ephemeral: true,
        });
      }
    }
    if (action == "Leave System") {
      if (!leave) {
        interaction.reply({
          content: "**Leave System** is already disabled",
          ephemeral: true,
        });
      }
      if (leave) {
        l.findOneAndDelete({ Guild: guild.id }).catch((err) => {});
        return interaction.reply({
          content: "**Leave System** has been disabled",
          ephemeral: true,
        });
      }
    }
    if (action == "Suggestion System") {
      const Data = await suggest.findOne({ Guild: guild.id });
      if (!Data) {
        interaction.reply({
          content: "**Suggestion System** is already disable",
          ephemeral: true,
        });
      }

      if (Data) {
        suggest.findOneAndDelete({ Guild: guild.id });
        interaction.reply({
          content: "**Suggestion System** has been disabled",
          ephemeral: true,
        });
      }
    }
  },
};
