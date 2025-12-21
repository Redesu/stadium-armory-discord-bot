import {
  AutocompleteInteraction,
  ChatInputCommandInteraction,
  SlashCommandBuilder,
} from "discord.js";
import { Command, Item } from "../../types";
import { handleItemsResponse } from "../../utils/commandsUtils";

export const item: Command = {
  data: new SlashCommandBuilder()
    .setName("item")
    .setDescription("List current items")
    .addStringOption((option) =>
      option
        .setName("rarity")
        .setDescription("Rarity of the item")
        .addChoices(
          { name: "Common", value: "common" },
          { name: "Rare", value: "rare" },
          { name: "Epic", value: "epic" },
        ),
    )
    .addStringOption((option) =>
      option
        .setName("name")
        .setDescription("Name of the item")
        .setAutocomplete(true),
    )
    .addStringOption((option) =>
      option
        .setName("type")
        .setDescription("Type of the item")
        .addChoices(
          { name: "Hero Item (Weapon)", value: "hero_item_weapon" },
          { name: "Hero Item (Survival)", value: "hero_item_survival" },
          { name: "Hero Item (Ability)", value: "hero_item_ability" },
          { name: "Gadget", value: "gadget" },
        ),
    )
    .addStringOption((option) =>
      option
        .setName("description")
        .setDescription("The description of the item"),
    )
    .addIntegerOption((option) =>
      option.setName("price").setDescription("The price of the item"),
    )
    .addIntegerOption((option) =>
      option.setName("hero_id").setDescription("The hero id of the item"),
    ),

  async execute(interaction) {
    await interaction.deferReply();

    const itemData = {
      name: interaction.options.getString("name"),
      rarity: interaction.options.getString("rarity"),
      type: interaction.options.getString("type"),
      description: interaction.options.getString("description"),
      price: interaction.options.getInteger("price"),
      hero_id: interaction.options.getInteger("hero id"),
    };

    const item: Partial<Item> = Object.fromEntries(
      Object.entries(itemData).filter(
        ([_, value]) => value !== null && value !== undefined,
      ),
    );

    try {
      const items = await interaction.client.services.item.getItem(item);
      if (items.length === 0) {
        await interaction.editReply("Items or item not found.");
        return;
      }

      await handleItemsResponse(interaction, items);
    } catch (error) {
      console.error(error);
      await interaction.reply("Could not fetch the item data.");
    }
  },

  async autocomplete(interaction) {
    const focusedValue = interaction.options.getFocused();

    try {
      const items = await interaction.client.services.item.getItem({
        name: focusedValue,
      });
      const choices = items
        .slice(0, 25)
        .map((item: Item) => ({ name: item.name, value: item.name }));
      await interaction.respond(choices);
    } catch (error) {
      console.error(error);
      await interaction.respond([]);
    }
  },
};
