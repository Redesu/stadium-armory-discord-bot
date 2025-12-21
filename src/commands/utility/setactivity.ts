import { ActivityType, SlashCommandBuilder } from "discord.js";
import { Command } from "../../types";

export const setactivity: Command = {
  data: new SlashCommandBuilder()
    .setName("setactivity")
    .setDescription("Set the bot activity status (OWNER ONLY)")
    .addStringOption((option) =>
      option
        .setName("type")
        .setDescription("The type of activity")
        .setRequired(true)
        .addChoices(
          { name: "Playing", value: "PLAYING" },
          { name: "Streaming", value: "STREAMING" },
          { name: "Listening", value: "LISTENING" },
          { name: "Watching", value: "WATCHING" },
          { name: "Competing", value: "COMPETING" }
        )
    )
    .addStringOption((option) =>
      option
        .setName("text")
        .setDescription("The activity text")
        .setRequired(true)
    )
    .setDefaultMemberPermissions(0),

  execute: async (interaction) => {
    const OWNERID = "230850304432799744";

    if (interaction.user.id !== OWNERID) {
      await interaction.reply({
        content: "You do not have permission to use this command.",
        ephemeral: true,
      });
      return;
    }

    const type = interaction.options.getString("type");
    const text = interaction.options.getString("text");

    const activityType = {
      PLAYING: ActivityType.Playing,
      STREAMING: ActivityType.Streaming,
      LISTENING: ActivityType.Listening,
      WATCHING: ActivityType.Watching,
      COMPETING: ActivityType.Competing,
    };

    await interaction.client.user?.setPresence({
      activities: [
        {
          name: text || "",
          type: activityType[type as keyof typeof activityType],
        },
      ],
    });

    await interaction.reply({
      content: `Activity set to ${type} ${text}`,
      ephemeral: true,
    });
  },
};
