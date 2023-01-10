const {
  EmbedBuilder,
  SlashCommandBuilder,
  SelectMenuBuilder,
  ActionRowBuilder,
} = require("discord.js");

module.exports = {
  Cooldown: true,
  data: new SlashCommandBuilder()
    .setName("help")
    .setDescription("Sends help menu"),

  async execute(interaction, client) {
    const embed = new EmbedBuilder()
      .setTitle("Commands")
      .setDescription(
        "Click the drop down menu and select the category you like"
      )
      .setThumbnail(interaction.guild.iconURL())
      .setColor("Random");

    const embed1 = new EmbedBuilder()
      .setTitle("Moderation")
      .setColor("Random")
      .setDescription(
        `**disable, enable, warning, ban, clear, kick, lock, slowmode, timeout, unban, unlock**`
      );

    const embed2 = new EmbedBuilder()
      .setTitle("Fun/Public")
      .setDescription(
        `**anime, calculator, credits, dad-joke, impersonate, meme, ping, pixelate, qotd, rank, rps, afk**`
      )
      .setColor("Random");

    const embed3 = new EmbedBuilder()
      .setTitle("Information")
      .setDescription(`**botstat, help, invite, membercount, serverinf**`)
      .setColor("Random");

    const embed4 = new EmbedBuilder()
      .setTitle("Music")
      .setDescription(`**audio-filter, music, playlist, search, volume**`)
      .setColor("Random");

    const embed5 = new EmbedBuilder()
      .setTitle("Suggestions")
      .setDescription(`**poll, suggest**`)
      .setColor("Random");

    const embed6 = new EmbedBuilder()
      .setTitle("Tickets")
      .setDescription(`**ticketdelete, ticketsetup**`)
      .setColor("Random");

    const embed7 = new EmbedBuilder()
      .setTitle("Roles")
      .setDescription(`**add-role, panel, remove-role**`)
      .setColor("Random");

    let rowmenu = new ActionRowBuilder().addComponents(
      new SelectMenuBuilder()
        .setCustomId("menu2")
        .setPlaceholder("Help Menu")
        .setMinValues(1)
        .setMaxValues(1)
        .addOptions([
          {
            label: "🟥 Moderation",
            value: "option1",
            description:
              "Moderation commands for all the moderators, admins and owner",
          },
          {
            label: "🌝 Fun/Public",
            value: "option2",
            description: "Commands for local member of this server",
          },
          {
            label: "ℹ️ Information",
            value: "option3",
            description: "Information commands",
          },
          {
            label: "🎵 Music",
            value: "option4",
            description: "Music commands, play and enjoy it (youtube ads)",
          },
          {
            label: "📄 Suggestions",
            value: "option5",
            description:
              "Suggestions command like poll for admin and suggest for local members",
          },
          {
            label: "🎟️ Tickets",
            value: "option6",
            description: "Setup tickets for other members",
          },
          {
            label: "📜 Roles",
            value: "option7",
            description: "Reaction roles",
          },
        ])
    );

    const MESSAGE = await interaction.reply({
      embeds: [embed],
      components: [rowmenu],
      ephemeral: true,
    });
    const filter = (button) => button.user.id === interaction.user.id;
    const collector = MESSAGE.createMessageComponentCollector();

    collector.on("collect", async (b) => {
      if (b.values[0] == "option") {
        await b.update({
          embeds: [embed],
          components: [rowmenu],
          ephemeral: true,
        });
      }

      if (b.values[0] == "option1") {
        await b.update({
          embeds: [embed1],
          components: [rowmenu],
          ephemeral: true,
        });
      } //

      if (b.values[0] == "option2") {
        await b.update({
          embeds: [embed2],
          components: [rowmenu],
          ephemeral: true,
        });
      }

      if (b.values[0] == "option3") {
        await b.update({
          embeds: [embed3],
          components: [rowmenu],
          ephemeral: true,
        });
      }

      if (b.values[0] == "option4") {
        await b.update({
          embeds: [embed4],
          components: [rowmenu],
          ephemeral: true,
        });
      }
      if (b.values[0] == "option5") {
        await b.update({
          embeds: [embed5],
          components: [rowmenu],
          ephemeral: true,
        });
      }
      if (b.values[0] == "option6") {
        await b.update({
          embeds: [embed6],
          components: [rowmenu],
          ephemeral: true,
        });
      }
      if (b.values[0] == "option7") {
        await b.update({
          embeds: [embed7],
          components: [rowmenu],
          ephemeral: true,
        });
      }
    });
  },
};
