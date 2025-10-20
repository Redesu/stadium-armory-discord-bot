import { PageCreator } from "../types";

export async function createPagination(
    interaction: ChatInputCommandInteraction,
    totalPages: number,
    pageCreator: PageCreator,
    timeout: number = 300000
): Promise<void> {
    let currentPage = 0;

    const { embeds, files } = pageCreator(currentPage, totalPages);

    const message = await interaction.editReply({
        embeds,
        files,
        components: [createNavigationButtons(currentPage, totalPages)]
    });


    const collector = message.createMessageComponentCollector({
        componentType: ComponentType.Button,
        time: timeout
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
            await interaction.editReply({
                components: [createDisabledButtons(currentPage)]
            });
        } catch (error) {
            // If the pagination is already closed, this error will be thrown
            console.error(error);
        }
    })
}