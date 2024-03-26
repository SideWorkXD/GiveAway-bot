const { MessageEmbed, MessageActionRow, MessageSelectMenu } = require("discord.js")

module.exports = {
  name: 'help',
  description: '📜 View all the commands available to the bot!',
  run: async (client, interaction) => {
    const embed = new MessageEmbed()
      .setTitle(`Commands of ${client.user.username}`)
      .setColor('#800080')
      .setDescription('**Please Select a category to view all its commands**')
      .addField(`Links:`, `- [Youtube Channel](https://youtube.com/c/BilloXD)\n- [Discord Server](https://discord.gg/BsdfHF6r2M)\n- [Instagram](https://www.instagram.com/ig.billo)`, true)
      .setTimestamp()
      .setFooter({
        text: `Requested by ${interaction.user.username} | GiveawayBot™ v1 By BilloXD`,
        iconURL: interaction.user.displayAvatarURL()
      })

    const giveaway = new MessageEmbed()
      .setTitle("Categories » Giveaway")
      .setColor('#800080')
      .setDescription("```yaml\nHere are the giveaway commands:```")
      .addFields(
        { name: 'Create / Start', value: `Start a giveaway in your guild!\n > **Type: __\`slash\` / \`start\`__**`, inline: true },
        { name: 'Edit', value: `Edit an already running giveaway!\n > **Type: __\`slash\` / \`edit\`__**`, inline: true },
        { name: 'End', value: `End an already running giveaway!\n > **Type: __\`slash\` / \`end\`__**`, inline: true },
        { name: 'List', value: `List all the giveaways running within this guild!\n > **Type: __\`slash\` / \`list\`__**`, inline: true },
        { name: 'Pause', value: `Pause an already running giveaway!\n > **Type: __\`slash\`/ \`pause\__**`, inline: true },
        { name: 'Reroll', value: `Reroll an ended giveaway!\n > **Type: __\`slash\` / \`reroll\`__**`, inline: true },
        { name: 'Resume', value: `Resume a paused giveaway!\n > **Type: __\`slash\`/ \`resume\`__**`, inline: true },
      )
      .setTimestamp()
      .setFooter({
        text: `Requested by ${interaction.user.username} | GiveawayBot™ v1 By BilloXD`,
        iconURL: interaction.user.displayAvatarURL()
      })

    const general = new MessageEmbed()
      .setTitle("Categories » General")
      .setColor('#800080')
      .setDescription("```yaml\nHere are the general bot commands:```")
      .addFields(
        { name: 'Help', value: `Shows all available commands to this bot!\n > **Type: __\`slash\` / \`message\`__**`, inline: true },
        { name: 'Invite', value: `Get the bot's invite link!\n > **Type: __\`slash\` / \`message\`__**`, inline: true },
        { name: 'Ping', value: `Check the bot's websocket latency!\n > **Type: __\`slash\` / \`message\`__**`, inline: true },
      )
      .setTimestamp()
      .setFooter({
        text: `Requested by ${interaction.user.username} | GiveawayBot™ v1 By BilloXD`,
        iconURL: interaction.user.displayAvatarURL()
      })

    const components = (state) => [
      new MessageActionRow().addComponents(
        new MessageSelectMenu()
          .setCustomId("help-menu")
          .setPlaceholder("Please Select a Category")
          .setDisabled(state)
          .addOptions([{
            label: `Giveaways`,
            value: `giveaway`,
            description: `View all the giveaway based commands!`,
            emoji: `🎉`
          },
          {
            label: `General`,
            value: `general`,
            description: `View all the general bot commands!`,
            emoji: `⚙`
          }
          ])
      ),
    ];

    const initialMessage = await interaction.reply({ embeds: [embed], components: components(false) });

    const filter = (interaction) => interaction.user.id === interaction.member.id;

    const collector = interaction.channel.createMessageComponentCollector(
      {
        filter,
        componentType: "SELECT_MENU",
        idle: 300000,
        dispose: true,
      });

    collector.on('collect', (interaction) => {
      if (interaction.values[0] === "giveaway") {
        interaction.update({ embeds: [giveaway], components: components(false) }).catch((e) => { });
      } else if (interaction.values[0] === "general") {
        interaction.update({ embeds: [general], components: components(false) }).catch((e) => { });
      }
    });
    collector.on('end', (collected, reason) => {
      if (reason == "time") {
        initialMessage.edit({
          content: "Collector Destroyed, Try Again!",
          components: [],
        });
      }
    })
  }
}
