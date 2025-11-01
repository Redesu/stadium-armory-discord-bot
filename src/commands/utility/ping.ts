import { CommandInteraction, SlashCommandBuilder } from "discord.js";
import { Command } from "../../types/Command";

export const ping: Command = {
    data: new SlashCommandBuilder()
        .setName('ping')
        .setDescription('Replies with Pong!'),
    async execute(interaction: CommandInteraction) {
        await interaction.reply({
            content: 'Pinging...',
            withResponse: true
        });

        const apiPing = Date.now() - interaction.createdTimestamp;

        await interaction.editReply(`Pong! ${apiPing}ms.`);
    },
}

export default ping;