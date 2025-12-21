import { Collection } from "discord.js";
import { Command } from "../types/Command";
import fs from "fs";
import path from "path";
import findCommandFiles from "./findCommandFiles";

export default function loadCommands(): Collection<string, Command> {
  const commands = new Collection<string, Command>();
  const commandPath = path.join(__dirname, "../commands");
  const commandFilePaths = findCommandFiles(commandPath);

  for (const filePath of commandFilePaths) {
    const commandModule = require(filePath);
    const fileName = path.basename(filePath, ".ts");

    let command: Command = commandModule.default || commandModule[fileName];

    if (
      command &&
      command.data &&
      command.execute &&
      typeof command.execute === "function"
    ) {
      commands.set(command.data.name, command);
    } else {
      console.warn(
        `Warning: Command at ${filePath} is missing data or execute function.`,
      );
    }
  }

  return commands;
}
