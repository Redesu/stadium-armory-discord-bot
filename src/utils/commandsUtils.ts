import { ChatInputCommandInteraction } from "discord.js";
import {
  sendPowersEmbed,
  sendItemsEmbed,
  sendHeroesEmbed,
} from "../embeds/embedHandlers";

export function getHeroSearchParams(
  interaction: ChatInputCommandInteraction,
): { name?: string; role?: string } | null {
  const heroName = interaction.options.getString("name") ?? undefined;
  const heroHole = interaction.options.getString("role") ?? undefined;

  if (!heroName && !heroHole) {
    return null;
  }

  return {
    name: heroName,
    role: heroHole,
  };
}

export async function handleHeroInfoResponse(
  interaction: ChatInputCommandInteraction,
  heroes: any[],
): Promise<void> {
  await sendHeroesEmbed(interaction, heroes, { itemsPerPage: 4 });
}

export async function handlePowersResponse(
  interaction: ChatInputCommandInteraction,
  powers: any[],
): Promise<void> {
  await sendPowersEmbed(interaction, powers, {
    powersPerPage: 3,
    embedColor: 0xfd681f,
  });
}

export async function handleItemsResponse(
  interaction: ChatInputCommandInteraction,
  items: any[],
): Promise<void> {
  await sendItemsEmbed(interaction, items, {
    itemsPerPage: 3,
  });
}
