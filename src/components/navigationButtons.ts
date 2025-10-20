import { ActionRowBuilder, ButtonBuilder, ButtonStyle } from "discord.js"

export function createNavigationButtons(page: number, totalPages: number): ActionRowBuilder<ButtonBuilder> {
    return new ActionRowBuilder<ButtonBuilder>()
        .addComponents(
            new ButtonBuilder()
                .setCustomId('first')
                .setLabel('⏮️')
                .setStyle(ButtonStyle.Primary)
                .setDisabled(page === 0),
            new ButtonBuilder()
                .setCustomId('previous')
                .setLabel('⏪')
                .setStyle(ButtonStyle.Primary)
                .setDisabled(page === 0),
            new ButtonBuilder()
                .setCustomId('next')
                .setLabel('⏩')
                .setStyle(ButtonStyle.Primary)
                .setDisabled(page === totalPages - 1),
            new ButtonBuilder()
                .setCustomId('last')
                .setLabel('⏭️')
                .setStyle(ButtonStyle.Primary)
                .setDisabled(page === totalPages - 1)
        )
}

export function createDisabledButtons(page: number): ActionRowBuilder<ButtonBuilder> {
    return new ActionRowBuilder<ButtonBuilder>()
        .addComponents(
            new ButtonBuilder()
                .setCustomId('first')
                .setLabel('⏮️')
                .setStyle(ButtonStyle.Primary)
                .setDisabled(true),
            new ButtonBuilder()
                .setCustomId('previous')
                .setLabel('⏪')
                .setStyle(ButtonStyle.Primary)
                .setDisabled(true),
            new ButtonBuilder()
                .setCustomId('next')
                .setLabel('⏩')
                .setStyle(ButtonStyle.Primary)
                .setDisabled(true),
            new ButtonBuilder()
                .setCustomId('last')
                .setLabel('⏭️')
                .setStyle(ButtonStyle.Primary)
                .setDisabled(true)
        )
}