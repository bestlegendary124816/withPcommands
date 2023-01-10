const { EmbedBuilder, GuildMember } = require("discord.js");
const Schema = require("../../Schemas/Welcome");

module.exports = {
  name: "guildMemberAdd",
  /**
   *
   * @param {GuildMember} member
   */
  async execute(member) {
    //welcome add
    Schema.findOne({ Guild: member.guild.id }, async (err, data) => {
      if (!data) return;
      const { user, guild } = member;

      const Message = `Hey ${user}, welcome to **${guild.name}**`;

      let dmMsg;
      if (data.DMMessage !== null) {
        var dmMessage = data.DMMessage.content;
        if (dmMessage.length !== 0) dmMsg = dmMessage;
        else dmMsg = Message;
      } else dmMsg = Message;

      const Channel = member.guild.channels.cache.get(data.Channel);

      if (!Channel) return;

      const Embed = new EmbedBuilder()
        .setTitle("**New member!**")
        .setDescription("Welcome to your Server Please read rules")
        .setColor(0x037821)
        .addFields({ name: "Total members", value: `${guild.memberCount}` })
        .addFields({ name: `Member Name`, value: `<@${member.id}>` })
        .setTimestamp();

      Channel.send({ embeds: [Embed] });

      if (data.DM === true) {
        const Embed = data.DMMessage.embed;
        if (data.Content === true && data.Embed === true) {
          const Sent = await member
            .send({ content: `${dmMsg}` })
            .catch((err) => {
              if (err.code !== 50007) return console.log(err);
            });
          if (!Sent) return;
          if (Embed) Sent.edit({ embeds: [Embed] });
        } else if (data.Content === true && data.Embed !== true) {
          const Sent = member.send({ content: `${dmMsg}` }).catch((err) => {
            if (err.code !== 50007) return console.log(err);
          });

          if (!Sent) return;
        } else if (data.Content !== true && data.Embed === true) {
          if (Embed)
            member.send({ embeds: [Embed] }).catch((err) => {
              if (err.code !== 50007) return console.log(err);
            });
        } else return;
      }
    });
  },
};
