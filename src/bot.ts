import { Client, IntentsBitField } from 'discord.js';
import * as commandsModules from './commands';
import config from './config';

const commands = Object(commandsModules);

const myIntents = new IntentsBitField();
myIntents.add(
	IntentsBitField.Flags.Guilds,
	IntentsBitField.Flags.GuildMessages,
	IntentsBitField.Flags.DirectMessages
);

export const client = new Client({
	intents: myIntents,
});

client.once('ready', () => {
	console.log('Discord bot is ready');
});

client.on('interactionCreate', interaction => {
	if (!interaction.isChatInputCommand()) return;

	const { commandName } = interaction;
	commands[commandName].execute(interaction, client);
});

client.login(config.DISCORD_TOKEN);

