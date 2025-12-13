import { AttachmentBuilder, EmbedBuilder } from "discord.js";
import { Power, Hero, Item, PageData } from "../types";
import { base64ImageToBuffer, sanitizeFileName } from "../utils/attachments";
import { getHeroRoleColor, getRarityColor } from "../utils/colors";

export function createHeroesEmbed(
  heroes: Hero[],
  page: number,
  totalPages: number,
  heroesPerPage: number
): PageData {
  const embeds: EmbedBuilder[] = [];

  const start = page * heroesPerPage;
  const end = start + heroesPerPage;
  const pageHeroes = heroes.slice(start, end);

  for (const hero of pageHeroes) {
    const embed = new EmbedBuilder()
      .setTitle(`${hero.hero} (${hero.role})`)
      .setColor(getRarityColor(hero.role))
      .addFields({ name: "ID", value: `${hero.heroid}` })
      .setColor(getHeroRoleColor(hero.role))
      .setFooter({ text: `Page ${page + 1} of ${totalPages}` });

    if (hero.passive) {
      embed.addFields(
        { name: "Passive", value: `${hero.passive ?? "None"}` },
        { name: "Description", value: `${hero.description ?? "None"}` }
      );
    }

    embeds.push(embed);
  }

  return { embeds, files: [] };
}

export function createPowersEmbed(
  powers: Power[],
  page: number,
  totalPages: number,
  powersPerPage: number,
  embedColor: number
): PageData {
  const embeds: EmbedBuilder[] = [];
  const files: AttachmentBuilder[] = [];

  const start = page * powersPerPage;
  const end = start + powersPerPage;
  const pagePowers = powers.slice(start, end);

  for (const power of pagePowers) {
    const imageBuffer = base64ImageToBuffer(power.image_url || "");
    const fileName = sanitizeFileName(power.name || "unknown");

    const attachment = new AttachmentBuilder(imageBuffer, {
      name: `${fileName}.png`,
    });

    const embed = new EmbedBuilder()
      .setTitle(power.name || "Unknown")
      .setDescription(power.description || "No description")
      .setThumbnail(`attachment://${fileName}.png`)
      .setColor(embedColor)
      .setFooter({ text: `Page ${page + 1} of ${totalPages}` });

    embeds.push(embed);
    files.push(attachment);
  }

  return { embeds, files };
}

export function createItemsEmbed(
  items: Item[],
  page: number,
  totalPages: number,
  itemsPerPage: number
): PageData {
  const embeds: EmbedBuilder[] = [];
  const files: AttachmentBuilder[] = [];

  const start = page * itemsPerPage;
  const end = start + itemsPerPage;
  const pageItems = items.slice(start, end);

  for (const item of pageItems) {
    const imageBuffer = base64ImageToBuffer(item.image_url || "");
    const fileName = sanitizeFileName(item.name);

    const attachment = new AttachmentBuilder(imageBuffer, {
      name: `${fileName}.png`,
    });

    const statsvalue =
      item.stats && item.stats.length > 0
        ? item.stats
            .map(
              (stat) =>
                `${stat.stat_modifier}${stat.stat_value}${stat.stat_unit} ${stat.stat_type}`
            )
            .join("\n")
        : "N/A";

    const embed = new EmbedBuilder()
      .setTitle(item.name || "Unknown")
      .addFields(
        { name: "Rarity", value: item.rarity, inline: true },
        { name: "Type", value: item.type, inline: true },
        { name: "Price", value: `${item.price}`, inline: true },
        {
          name: "Stats",
          value: statsvalue,
          inline: true,
        }
      )
      .setThumbnail(`attachment://${fileName}.png`)
      .setColor(getRarityColor(item.rarity))
      .setFooter({ text: `Page ${page + 1} of ${totalPages}` });

    if (item.hero) {
      embed.addFields({ name: "Hero", value: item.hero, inline: true });
    }
    if (item.description && item.description.trim() !== "") {
      embed.addFields({ name: "Description", value: `${item.description}` });
    } else {
      embed.addFields({ name: "Description", value: "No description" });
    }

    embeds.push(embed);
    files.push(attachment);
  }

  return { embeds, files };
}
