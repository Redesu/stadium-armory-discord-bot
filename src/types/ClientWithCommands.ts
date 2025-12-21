import { Client, Collection } from "discord.js";
import { Command } from "./Command";

export interface ClientWithCommands extends Client {
  commands: Collection<string, Command>;
}
