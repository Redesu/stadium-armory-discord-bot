import { SlashCommandBuilder } from "discord.js";
import { Command } from "../../types";
import { EmbedBuilder } from "@discordjs/builders";

export const help: Command = {
    data: new SlashCommandBuilder()
        .setName('help')
        .setDescription('List all commands'),
    execute: async (interaction) => {
        await interaction.deferReply();

        const embed = new EmbedBuilder()
            .setTitle('Avaible commands')
            .setColor(0x0099FF)
            .addFields(
                { name: 'List hero or heroes info', value: '/hero info' },
                { name: 'List a hero items', value: '/hero items' },
                { name: 'List a hero powers', value: '/hero powers' },
                { name: 'Search for an item', value: '/item' },
                { name: 'Search for a power', value: '/power' },
            )
            .setFooter({ text: 'Made by @redesu' })

        await interaction.editReply({ embeds: [embed] });
    }
}