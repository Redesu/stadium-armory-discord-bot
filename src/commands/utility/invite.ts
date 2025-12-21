import { SlashCommandBuilder } from "discord.js";
import { Command } from "../../types";
import { EmbedBuilder } from "@discordjs/builders";

export const invite: Command = {
  data: new SlashCommandBuilder()
    .setName("invite")
    .setDescription("Get the bot invite link"),

  execute: async (interaction) => {
    await interaction.deferReply();

    const inviteUrl = `https://discord.com/api/oauth2/authorize?client_id=${process.env.DISCORD_CLIENT_ID}&scope=bot&permissions=51200`;

    const embed = new EmbedBuilder()
      .setDescription(`[Invite me to your server](${inviteUrl})`)
      .setColor(0xffffff);

    await interaction.editReply({ embeds: [embed] });
  },
};
