import { CommandInteraction, SlashCommandBuilder } from "discord.js";
import { Command } from "../../types";

export const user: Command = {
    data: new SlashCommandBuilder()
        .setName('user')
        .setDescription('Tells you about the user'),
    async execute(interaction: CommandInteraction) {
        await interaction.reply(`Your tag: ${interaction.user.tag}\nYour id: ${interaction.user.id}`);
    },
}

export default user;