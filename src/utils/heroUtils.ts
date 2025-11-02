import { EmbedBuilder } from "@discordjs/builders";
import { Hero } from "../types";
import { ChatInputCommandInteraction } from "discord.js";
export function getHeroRoleColor(heroRole: string): number {
    const colors: Record<string, number> = {
        'Tank': 0xFAA81A,
        'Damage': 0xFF4655,
        'Support': 0xAAFF80
    }
    return colors[heroRole] ?? 0x5865F2;
}
export function createSingleHeroEmbed(hero: Hero): EmbedBuilder {
    const embed = new EmbedBuilder()
        .setTitle(`${hero.hero} (${hero.role})`)
        .setColor(getHeroRoleColor(hero.role))
        .addFields(
            { name: 'ID', value: `${hero.heroid}` },
        )
        .setTimestamp();

    if (hero.passive) {
        embed.addFields(
            { name: 'Passive', value: `${hero.passive ?? 'None'}` },
            { name: 'Description', value: `${hero.description ?? 'None'}` },
        )
    }
    return embed;
}
export function createMultipleHeroesEmbed(heroes: Hero[]): EmbedBuilder {
    const embed = new EmbedBuilder()
        .setTitle(`Found ${heroes.length} heroes`)
        .setColor(0x5865F2)
        .setDescription('Multiple heroes found. Here are the results.');

    const displayLimit = 10;

    heroes.slice(0, 10).forEach((hero: Hero) => {
        const passiveText = hero.passive ? `**Passive**: ${hero.passive}\n` : '';
        const descriptionText = hero.description ? `**Description**: ${hero.description}` : '';

        embed.addFields({
            name: `${hero.hero} (${hero.role})`,
            value: `**ID**: ${hero.heroid}\n${passiveText}${descriptionText}`,
            inline: false
        })
    });

    if (heroes.length > displayLimit) {
        embed.addFields({
            name: '\u200B',
            value: `... and ${heroes.length - displayLimit} more heroes.`
        })
    }

    return embed;
}

export function getHeroSearchParams(interaction: ChatInputCommandInteraction): { name?: string, role?: string } | null {
    const heroName = interaction.options.getString('name') ?? undefined;
    const heroHole = interaction.options.getString('role') ?? undefined;

    if (!heroName && !heroHole) {
        return null;
    }

    return {
        name: heroName,
        role: heroHole
    };
}

export async function handleHeroInfoResponse(interaction: ChatInputCommandInteraction, heroes: Hero[]): Promise<void> {

    if (heroes.length === 0) {
        await interaction.editReply('Hero or heroes not found.');
        return;
    }

    if (heroes.length > 1) {
        const embed = createMultipleHeroesEmbed(heroes);
        await interaction.editReply({ embeds: [embed] });
        return;
    }

    const embed = createSingleHeroEmbed(heroes[0]);
    await interaction.editReply({ embeds: [embed] });
}