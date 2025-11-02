import { ActionRowBuilder, AttachmentBuilder, ButtonBuilder, ButtonStyle, ChatInputCommandInteraction, ColorResolvable, ComponentType, EmbedBuilder } from "discord.js";
import { PaginationItem } from "../types/PaginationItem";

export async function sendPaginationItems(
    interaction: ChatInputCommandInteraction,
    items: PaginationItem[],
    options: {
        itemsPerPage?: number;
        embedColor?: number;
        itemLabel?: string;
    } = {}
) {
    const itemsPerPage = options.itemsPerPage ?? 6;
    const embedColor = options.embedColor ?? 0x5865F2;
    const itemLabel = options.itemLabel ?? 'Items';

    const totalPages = Math.ceil(items.length / itemsPerPage);
    let currentPage = 0;

    function createPage(page: number): { embeds: EmbedBuilder[], files: AttachmentBuilder[] } {
        const embeds = [];
        const files = [];
        const start = page * itemsPerPage;
        const end = start + itemsPerPage;
        const pageItems = items.slice(start, end);

        for (const item of pageItems) {
            let base64Image = item.image_url || '';
            if (base64Image?.includes('base64,')) {
                base64Image = base64Image?.split('base64,')[1];
            }

            const imageBuffer = Buffer.from(base64Image, 'base64');
            const fileName = `${item.name}`.replace(/\s+/g, '_').replace(/[^a-zA-Z0-9_.-]/g, '');
            const attachment = new AttachmentBuilder(imageBuffer, { name: `${item.name}.png` });
            const embed = new EmbedBuilder()
                .setTitle(item.name ?? 'Unknown Item')
                .setDescription(item.description ?? 'No description')
                .setThumbnail(`attachment://${fileName}.png`)
                .setColor(embedColor)
                .setFooter({ text: `${itemLabel} ${start + 1}-${Math.min(end, items.length)} of ${items.length}` });
            embeds.push(embed);
            files.push(attachment);
        }

        return { embeds, files };
    }

    function createButtons(page: number): ActionRowBuilder<ButtonBuilder> {
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

    const { embeds, files } = createPage(currentPage);
    const message = await interaction.editReply({
        embeds,
        files,
        components: [createButtons(currentPage)]
    });

    const collector = message.createMessageComponentCollector({
        componentType: ComponentType.Button,
        time: 300000
    });

    collector.on('collect', async (interactor) => {
        if (interactor.user.id !== interaction.user.id) {
            await interactor.reply(
                {
                    content: 'You are not allowed to use this button.',
                    ephemeral: true
                }
            );
            return;
        }

        switch (interactor.customId) {
            case 'first':
                currentPage = 0;
                break;
            case 'previous':
                currentPage = Math.max(0, currentPage - 1);
                break;
            case 'next':
                currentPage = Math.min(totalPages - 1, currentPage + 1);
                break;
            case 'last':
                currentPage = totalPages - 1;
                break;
        }

        const { embeds, files } = createPage(currentPage);
        await interactor.update({
            embeds,
            files,
            components: [createButtons(currentPage)]
        });
    });

    collector.on('end', async () => {
        try {
            await interaction.editReply(`${itemLabel} pagination has ended.`);
        } catch (error) {
            // If the pagination is already closed, this error will be thrown
            console.error(error);
        }
    })

}