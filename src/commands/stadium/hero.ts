import { SlashCommandBuilder } from "discord.js";
import { Command, Hero } from "../../types";
import {
  getHeroSearchParams,
  handleHeroInfoResponse,
  handleItemsResponse,
  handlePowersResponse,
} from "../../utils/commandsUtils";

export const hero: Command = {
  data: new SlashCommandBuilder()
    .setName("hero")
    .setDescription("List current heroes")
    .addSubcommand((subcommand) =>
      subcommand
        .setName("info")
        .setDescription("Get basic hero information")
        .addStringOption((option) =>
          option
            .setName("name")
            .setDescription("Name of the hero")
            .setAutocomplete(true),
        )
        .addStringOption((option) =>
          option
            .setName("role")
            .setDescription("Role of the hero")
            .addChoices(
              { name: "tank", value: "tank" },
              { name: "damage", value: "damage" },
              { name: "support", value: "support" },
            ),
        ),
    )
    .addSubcommand((subcommand) =>
      subcommand
        .setName("powers")
        .setDescription("Get powers of the hero")
        .addStringOption((option) =>
          option
            .setName("name")
            .setDescription("Name of the hero")
            .setRequired(true)
            .setAutocomplete(true),
        ),
    )
    .addSubcommand((subcommand) =>
      subcommand
        .setName("items")
        .setDescription("Get items of the hero")
        .addStringOption((option) =>
          option
            .setName("name")
            .setDescription("Name of the hero")
            .setRequired(true)
            .setAutocomplete(true),
        ),
    ),
  async execute(interaction) {
    await interaction.deferReply();

    try {
      const subcommand = interaction.options.getSubcommand();

      switch (subcommand) {
        case "info": {
          const searchParams = getHeroSearchParams(interaction);
          if (!searchParams) {
            await interaction.editReply("Please provide a hero name or role.");
            return;
          }

          const heroes =
            await interaction.client.services.hero.getHero(searchParams);

          if (heroes.length === 0) {
            await interaction.editReply(
              "No heroes found with the given parameters.",
            );
            return;
          }

          await handleHeroInfoResponse(interaction, heroes);
          break;
        }
        case "powers": {
          const heroName = interaction.options.getString("name") ?? "";

          const powers =
            await interaction.client.services.hero.getHeroPowers(heroName);

          if (powers.length === 0) {
            await interaction.editReply(
              `Powers not found for hero ${heroName}.`,
            );
            return;
          }

          await handlePowersResponse(interaction, powers);
          break;
        }
        case "items": {
          const heroName = interaction.options.getString("name") ?? "";

          const items =
            await interaction.client.services.hero.getHeroItems(heroName);

          if (items.length === 0) {
            await interaction.editReply(
              `Items not found for hero ${heroName}.`,
            );
            return;
          }

          await handleItemsResponse(interaction, items);
          break;
        }
      }
    } catch (error) {
      console.error(error);
      await interaction.editReply("Could not fetch the hero data.");
    }
  },

  async autocomplete(interaction) {
    const focusedValue = interaction.options.getFocused();

    try {
      const heroes = await interaction.client.services.hero.getHero({
        hero: focusedValue,
      });
      const choices = heroes
        .slice(0, 25)
        .map((hero: Hero) => ({ name: hero.hero, value: hero.hero }));
      await interaction.respond(choices);
    } catch (error) {
      console.error(error);
      await interaction.respond([]);
    }
  },
};
