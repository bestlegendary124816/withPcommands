const { EmbedBuilder } = require("discord.js");
const Schema = require("../../Schemas/remove");

module.exports = {
  name: "guildMemberRemove",
  async execute(member) {
    //welcome add
    Schema.findOne({ Guild: member.guild.id }, async (err, data) => {
      if (!data) return;

      const { guild } = member;
      const welcomeChannel = member.guild.channels.cache.get(data.Channel);

      const welcomeEmbed = new EmbedBuilder()
        .setTitle("__Member Left :-(__")
        .setDescription(`**Some one left this amazing server :(**`)
        .setColor(0x037821)
        .addFields({ name: "Total members", value: `${guild.memberCount}` })
        .addFields({ name: `Member Name`, value: `<@${member.id}>` })
        .setTimestamp();

      welcomeChannel.send({ embeds: [welcomeEmbed] });
    });
  },
};
