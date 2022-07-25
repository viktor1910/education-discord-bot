import { REST } from '@discordjs/rest';
import { SlashCommandBuilder, Routes } from 'discord.js';
import config from './config';
import * as commandModules from './commands';

interface Command {
	data: unknown;
}

const commands = [];

for (const module of Object.values<Command>(commandModules)) {
	commands.push(module.data);
}

const rest = new REST({ version: '10' }).setToken(config.DISCORD_TOKEN);

rest
	.put(Routes.applicationGuildCommands(config.CLIENT_ID, config.GUILD_ID), {
		body: commands,
	})
	.then(() => {
		console.log('Successfully registered application commands');
	})
	.catch(console.error);

