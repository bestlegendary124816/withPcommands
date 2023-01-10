const { SlashCommandBuilder, PermissionFlagsBits } = require("discord.js");

module.exports = {
  data: new SlashCommandBuilder()
    .setName("enable")
    .setDescription("Enable a plugin in your server")
    .setDefaultMemberPermissions(PermissionFlagsBits.Administrator)
    .addSubcommand((subCommand) =>
      subCommand
        .setName("plugin")
        .setDescription("Plugin to enable")
        .addStringOption((option) =>
          option
            .setName("plugin")
            .setDescription("Select a plugin")
            .setRequired(true)
            .addChoices(
              { name: "Welcome System", value: "Welcome System" },
              { name: "Chatbot System", value: "Chatbot System" },
              { name: "Leave System", value: "Leave System" },
              { name: "Suggestion System", value: "Suggestion System" }
            )
        )
        .addChannelOption((option) =>
          option
            .setName("channel")
            .setDescription("Channel (required) for all the plugins")
            .setRequired(true)
        )
    ),
};
