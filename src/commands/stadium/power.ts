import { SlashCommandBuilder } from "discord.js";
import { Command } from "../../types";
import { Power } from "../../types";
import { handlePowersResponse } from "../../utils/commandsUtils";

export const power: Command = {
  data: new SlashCommandBuilder()
    .setName("power")
    .setDescription("List current powers")
    .addStringOption((option) =>
      option
        .setName("name")
        .setDescription("Name of the power")
        .setAutocomplete(true),
    )
    .addStringOption((option) =>
      option.setName("description").setDescription("Description of the power"),
    )
    .addIntegerOption((option) =>
      option.setName("hero_id").setDescription("The hero id of the power"),
    ),

  async execute(interaction) {
    await interaction.deferReply();

    const powerData = {
      name: interaction.options.getString("name"),
      description: interaction.options.getString("description"),
      hero_id: interaction.options.getInteger("hero_id"),
    };

    const power: Power = Object.fromEntries(
      Object.entries(powerData).filter(
        ([_, value]) => value !== null && value !== undefined,
      ),
    );

    try {
      const powers = await interaction.client.services.power.getPower(power);
      if (powers.length === 0) {
        await interaction.editReply("Power or powers not found.");
        return;
      }

      await handlePowersResponse(interaction, powers);
    } catch (error) {
      console.error(error);
      await interaction.reply("Could not fetch the power data.");
    }
  },

  async autocomplete(interaction) {
    const focusedValue = interaction.options.getFocused();

    try {
      const powers = await interaction.client.services.power.getPower({
        name: focusedValue,
      });
      const choices = powers
        .slice(0, 25)
        .map((power: Power) => ({ name: power.name, value: power.name }));
      await interaction.respond(choices);
    } catch (error) {
      console.error(error);
      await interaction.respond([]);
    }
  },
};
