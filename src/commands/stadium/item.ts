import { SlashCommandBuilder } from "discord.js";
import { Command } from "../../types";

export const item: Command = {
    data: new SlashCommandBuilder()
        .setName('item')
        .setDescription('List current items')
        .addStringOption((option) =>
            option
                .setName('rarity')
                .setDescription('Rarity of the item')
                .addChoices(
                    { name: 'Common', value: 'common' },
                    { name: 'Rare', value: 'rare' },
                    { name: 'Epic', value: 'epic' },
                ),
        )
        .addStringOption((option) =>
            option
                .setName('name')
                .setDescription('Name of the item'),
        )
        .addStringOption((option) =>
            option
                .setName('type')
                .setDescription('Type of the item')
                .addChoices(
                    { name: 'Hero Item (Weapon)', value: 'hero_item_weapon' },
                    { name: 'Hero Item (Survival)', value: 'hero_item_survival' },
                    { name: 'Hero Item (Ability)', value: 'hero_item_ability' },
                    { name: 'Gadget', value: 'gadget' },
                )
        )
        .addStringOption((option) =>
            option
                .setName('description')
                .setDescription('The description of the item'),
        )
        .addIntegerOption((option) =>
            option
                .setName('price')
                .setDescription('The price of the item')
        )
        .addIntegerOption((option) =>
            option
                .setName('hero_id')
                .setDescription('The hero id of the item')
        ),

    async execute(interaction) {
        await interaction.deferReply();

        const itemName = interaction.options.getString('name') ?? '';
        const itemRarity = interaction.options.getString('rarity') ?? '';
        const itemType = interaction.options.getString('type') ?? '';
        const itemDescription = interaction.options.getString('description') ?? '';
        const itemPrice = interaction.options.getInteger('price') ?? '';
        const itemHeroId = interaction.options.getInteger('hero id') ?? '';

        const item = {
            name: itemName,
            rarity: itemRarity,
            type: itemType,
            description: itemDescription,
            price: Number(itemPrice),
            hero_id: Number(itemHeroId)
        }

        try {
            const data = await interaction.client.services.item.getItem(item);

            await interaction.reply(`Data received: ${JSON.stringify(data)}`);
        } catch (error) {
            console.error(error);
            await interaction.reply('Could not fetch the item data.')
        }
    }
}