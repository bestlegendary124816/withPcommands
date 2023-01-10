const { PermissionFlagsBits, SlashCommandBuilder } = require("discord.js");

module.exports = {
  data: new SlashCommandBuilder()
    .setName("disable")
    .setDescription("Disables a plugin from your server")
    .setDefaultMemberPermissions(PermissionFlagsBits.Administrator)
    .addSubcommand((subCommand) =>
      subCommand
        .setName("plugin")
        .setDescription("Disables a plugin from your server")
        .addStringOption((options) =>
          options
            .setName("plugin")
            .setDescription("Select a plugin to disable")
            .addChoices(
              { name: "Welcome System", value: "Welcome System" },
              { name: "Chatbot System", value: "Chatbot System" },
              { name: "Leave System", value: "Leave System" },
              { name: "Suggestion System", value: "Suggestion System" }
            )
            .setRequired(true)
        )
    ),
};
