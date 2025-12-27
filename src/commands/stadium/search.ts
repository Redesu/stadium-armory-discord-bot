import { SlashCommandBuilder } from "discord.js";
import { Command } from "../../types";
import { handleSearchResponse } from "../../utils/commandsUtils";

export const search: Command = {
  data: new SlashCommandBuilder()
    .setName("search")
    .setDescription(
      "Search across stadium items and powers. Use abbreviations, if multiple, use a comma."
    )
    .addStringOption((option) =>
      option
        .setName("query")
        .setDescription("The search query")
        .setRequired(true)
    ),
  async execute(interaction) {
    await interaction.deferReply();

    const query = interaction.options.getString("query", true);

    try {
      const results = await interaction.client.services.search.search(query);
      if (results.length === 0) {
        await interaction.editReply("No results found.");
      }

      await handleSearchResponse(interaction, results);
    } catch (error) {
      console.error(error);
      await interaction.editReply("Could not perform the search.");
    }
  },
};
