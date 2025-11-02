import { SlashCommandBuilder } from "discord.js";
import { Command } from "../../types";
import { getHeroSearchParams, handleHeroInfoResponse } from "../../utils/heroUtils";

export const hero: Command = {
    data: new SlashCommandBuilder()
        .setName('hero')
        .setDescription('List current heroes')
        .addSubcommand(subcommand =>
            subcommand
                .setName('info')
                .setDescription('Get basic hero information')
                .addStringOption(option => option.setName('name').setDescription('Name of the hero'))
                .addStringOption((option) =>
                    option
                        .setName('role')
                        .setDescription('Role of the hero')
                        .addChoices(
                            { name: 'tank', value: 'tank' },
                            { name: 'damage', value: 'damage' },
                            { name: 'support', value: 'support' },
                        ),
                )
        )
        .addSubcommand(subcommand =>
            subcommand
                .setName('powers')
                .setDescription('Get powers of the hero')
                .addStringOption(option =>
                    option
                        .setName('name')
                        .setDescription('Name of the hero')
                        .setRequired(true)
                )
        )
        .addSubcommand(subcommand =>
            subcommand
                .setName('items')
                .setDescription('Get items of the hero')
                .addStringOption(option =>
                    option
                        .setName('name')
                        .setDescription('Name of the hero')
                        .setRequired(true)
                )
        ),
    async execute(interaction) {
        await interaction.deferReply();

        try {
            const subcommand = interaction.options.getSubcommand();

            switch (subcommand) {
                case 'info': {
                    const searchParams = getHeroSearchParams(interaction);
                    if (!searchParams) {
                        await interaction.editReply('Please provide a hero name or role.');
                        return;
                    }

                    const heroes = await interaction.client.services.hero.getHero(searchParams);

                    await handleHeroInfoResponse(interaction, heroes);
                    break;
                }
                case 'powers': {
                    const heroName = interaction.options.getString('name') ?? '';

                    const data = await interaction.client.services.hero.getHeroPowers(heroName);

                    data.name = heroName;


                    break;
                }
                case 'items': {
                    const heroName = interaction.options.getString('name') ?? '';

                    const data = await interaction.client.services.hero.getHeroItems(heroName);

                    await interaction.editReply(`Data received: ${JSON.stringify(data)}`);
                    break;
                }
            }
        } catch (error) {
            console.error(error);
            await interaction.editReply('Could not fetch the hero data.');
        }
    }
}