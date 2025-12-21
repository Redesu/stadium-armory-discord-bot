import {
  ActivityType,
  Client,
  Events,
  GatewayIntentBits,
  Interaction,
} from "discord.js";
import "dotenv/config";
import loadCommands from "./utils/commandLoader";
import { ClientWithCommands } from "./types";
import { ServiceManager } from "./services/ServicesManager";
import { LoggerService } from "./services/loggerService";

const logger = new LoggerService();

const token = process.env.DISCORD_TOKEN;
const client = new Client({
  intents: [GatewayIntentBits.Guilds],
}) as ClientWithCommands;

client.commands = loadCommands();

client.services = new ServiceManager();

client.once(Events.ClientReady, (c) => {
  console.log(`Ready! Logged in as ${c.user.tag}`);
  console.log(`Guilds: ${c.guilds.cache.size}`);

  client.user?.setPresence({
    activities: [
      {
        name: `Welcome to the armory!`,
        type: ActivityType.Watching,
      },
    ],
    status: "online",
  });
});

client.on(Events.InteractionCreate, async (interaction: Interaction) => {
  if (interaction.isAutocomplete()) {
    const command = client.commands.get(interaction.commandName);

    if (!command) {
      console.error(
        `No command matching ${interaction.commandName} was found.`,
      );
      return;
    }

    try {
      if (command.autocomplete) {
        await command.autocomplete(interaction);
      }
    } catch (error) {
      console.error(error);
    }
    return;
  }

  if (!interaction.isChatInputCommand()) return;

  const command = client.commands.get(interaction.commandName);

  if (!command) {
    console.error(`No command matching ${interaction.commandName} was found.`);
    return;
  }

  logger.logCommand(
    interaction.user.id,
    interaction.guildId || "DM",
    interaction.commandName,
  );

  try {
    await command.execute(interaction);
  } catch (error) {
    console.error(error);
    const errorMessage = "There was an error while executing this command!";

    if (interaction.replied || interaction.deferred) {
      await interaction.followUp({ content: errorMessage, ephemeral: true });
    } else {
      await interaction.reply({ content: errorMessage, ephemeral: true });
    }
  }
});

client.login(token);
