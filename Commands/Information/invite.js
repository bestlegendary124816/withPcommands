const {
  ChatInputCommandInteraction,
  SlashCommandBuilder,
  Client,
  EmbedBuilder,
} = require("discord.js");

module.exports = {
  data: new SlashCommandBuilder()
    .setName("invite")
    .setDescription("Sends a invite link to the channel of this bot."),
  /**
   *
   * @param {ChatInputCommandInteraction} interaction
   * @param {Client} client
   */
  execute(interaction, client) {
    const link = `[**INVITE ME**](https://discord.com/api/oauth2/authorize?client_id=${client.user.id}&permissions=1110517509238&scope=bot%20applications.commands)`;
    const invite = new EmbedBuilder()
      .setAuthor({ name: "My Invite Link🙂" })
      .setTitle(`${client.user.tag}`)
      .setDescription(`${link}`)
      .setColor("Random");

    interaction.reply({ embeds: [invite], ephemeral: false });
  },
};
