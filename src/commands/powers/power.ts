import { SlashCommandBuilder } from "discord.js";
import { Command } from "../../types";

export const power: Command = {
    data: new SlashCommandBuilder()
        .setName('power')
        .setDescription('List current powers')
        .addStringOption(option => option.setName('name').setDescription('Name of the power'))
        .addStringOption(option => option.setName('description').setDescription('Description of the power'))
        .addIntegerOption(option => option.setName('hero id').setDescription('The hero id of the power')),


    async execute(interaction) {
        await interaction.deferReply();

        const powerName = interaction.options.getString('name') ?? '';
        const powerDescription = interaction.options.getString('description') ?? '';
        const powerHeroId = interaction.options.getInteger('hero id') ?? '';

        const power = {
            name: powerName,
            description: powerDescription,
            hero_id: Number(powerHeroId)
        };

        try {
            const data = await interaction.client.services.power.getPower(power);

            await interaction.reply(`Data received: ${JSON.stringify(data)}`);
        } catch (error) {
            console.error(error);
            await interaction.reply('Could not fetch the power data.')
        }
    }
}