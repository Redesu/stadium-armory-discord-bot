export interface PageData {
    embeds: EmbedBuilder[];
    files: AttachmentBuilder[];
}

export type PageCreator = (page: number, totalPages: number) => PageData;