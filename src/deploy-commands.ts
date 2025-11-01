import path from 'path';
import 'dotenv/config';
import { REST, Routes } from 'discord.js';
import findCommandFiles from './utils/findCommandFiles';
import { Command } from './types/Command';

const commands = [];
const commandsPath = path.join(__dirname, './commands');
const commandFilePaths = findCommandFiles(commandsPath);
const CLIENT_ID = process.env.DISCORD_CLIENT_ID;

if (!CLIENT_ID) {
    console.log('Missing CLIENT_ID');
    process.exit(1);
}

for (const filePath of commandFilePaths) {
    const commandModule = require(filePath);
    const fileName = path.basename(filePath, '.ts');

    const command: Command = commandModule.default || commandModule[fileName];
    if (command && command.data && command.execute && typeof command.execute === 'function') {
        commands.push(command.data.toJSON());
        console.log(`Command loaded: ${command.data.name}`);
        console.log(command.data.toJSON());
    } else {
        console.log(`Warning: Command at ${filePath} is missing data or execute function.`);
    }
}


const rest = new REST().setToken(process.env.DISCORD_TOKEN!);

(async () => {
    try {
        if (!commands.length) {
            console.log('No commands to deploy.');
            return;
        }

        console.log(`Started refreshing ${commands.length} application (/) commands.`);

        const data: any = await rest.put(Routes.applicationCommands(CLIENT_ID), { body: commands });

        console.log(`Successfully reloaded ${data.length} application (/) commands.`);
    } catch (error) {
        console.error(error);
    }
})();