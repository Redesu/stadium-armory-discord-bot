import { ChatInputCommandInteraction } from "discord.js";
import { Power, Hero, Item, PageData } from "../types";
import {
  createHeroesEmbed,
  createItemsEmbed,
  createPowersEmbed,
} from "./embedCreators";
import { createPagination } from "../utils/pagination";

export async function sendHeroesEmbed(
  interaction: ChatInputCommandInteraction,
  heroes: Hero[],
  options: {
    itemsPerPage?: number;
    timeout?: number;
  } = {},
): Promise<void> {
  const itemsPerPage = options.itemsPerPage ?? 4;
  const timeout = options.timeout ?? 30000;

  const totalPages = Math.ceil(heroes.length / itemsPerPage);

  const pageCreator = (page: number, totalPages: number): PageData => {
    return createHeroesEmbed(heroes, page, totalPages, itemsPerPage);
  };

  await createPagination(interaction, totalPages, pageCreator, timeout);
}

export async function sendPowersEmbed(
  interaction: ChatInputCommandInteraction,
  powers: Power[],
  options: {
    powersPerPage?: number;
    embedColor?: number;
    timeout?: number;
  } = {},
): Promise<void> {
  const powersPerPage = options.powersPerPage ?? 4;
  const embedColor = options.embedColor ?? 0x5865f2;
  const timeout = options.timeout ?? 30000;

  const totalPages = Math.ceil(powers.length / powersPerPage);

  const pageCreator = (page: number, totalPages: number): PageData => {
    return createPowersEmbed(
      powers,
      page,
      totalPages,
      powersPerPage,
      embedColor,
    );
  };

  await createPagination(interaction, totalPages, pageCreator, timeout);
}

export async function sendItemsEmbed(
  interaction: ChatInputCommandInteraction,
  items: Item[],
  options: {
    itemsPerPage?: number;
    timeout?: number;
  } = {},
): Promise<void> {
  const itemsPerPage = options.itemsPerPage ?? 4;
  const timeout = options.timeout ?? 30000;

  const totalPages = Math.ceil(items.length / itemsPerPage);

  const pageCreator = (page: number, totalPages: number): PageData => {
    return createItemsEmbed(items, page, totalPages, itemsPerPage);
  };

  await createPagination(interaction, totalPages, pageCreator, timeout);
}
