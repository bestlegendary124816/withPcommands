const { SlashCommandBuilder, EmbedBuilder, PermissionFlagsBits } = require("discord.js");

module.exports = {
    Cooldown: true,
    data: new SlashCommandBuilder()
        .setName("qotd")
        .setDescription("Send a question of the day to a channel.")
        .setDefaultMemberPermissions(PermissionFlagsBits.Administrator)
        .addStringOption((option) =>
            option.setName("question")
                .setDescription("What do you want the question to be")
                .setRequired(true)
        )
        .addStringOption((option) =>
        option.setName("role")
        .setDescription("What role do you want to be pinged")
        .setRequired(true)
        )
        .addStringOption((option) =>
            option.setName("emoji-1")
                .setDescription("What emoji do you want to send")
                .setRequired(true)
        )
        .addStringOption((option) =>
            option.setName("emoji-2")
                .setDescription("What emoji do you want to send")
                .setRequired(true)
        ),
    async execute(interaction) {
        const { channel, options } = interaction;
        const question = options.getString("question");
        const emoji1 = options.getString("emoji-1");
        const emoji2 = options.getString("emoji-2");
        const role = options.getString("role");

        const embed = new EmbedBuilder()
            .setTitle(":question: Question Of The Day :question:")
            .setDescription(question)
            .setColor(0xaedd15)

        await channel.send({ content: (role) });
        const sendEmbed = await channel.send({ embeds: [embed] });
        sendEmbed.react(emoji1)
        sendEmbed.react(emoji2)

        interaction.reply({ content: "Question Of The Day was sent.", ephemeral: true });
    }
}