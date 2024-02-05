const { ActionRowBuilder, ModalBuilder, TextInputBuilder } = require('discord.js');
const { TextInputStyle } = require('discord-api-types/v10');

module.exports = {
	async execute(interaction) {
		const modal = new ModalBuilder()
			.setCustomId(`myModal-${interaction.user.id}`)
			.setTitle('My Modal');

		const favoriteColorInput = new TextInputBuilder()
			.setCustomId('favoriteColorInput')
			.setLabel('What is your favorite color?')
			.setStyle(TextInputStyle.Short);

		const hobbiesInput = new TextInputBuilder()
			.setCustomId('hobbiesInput')
			.setLabel('What is some of your favorite hobbies?')
			.setStyle(TextInputStyle.Paragraph);

		const firstActionRow = new ActionRowBuilder().addComponents(favoriteColorInput);
		const secondActionRow = new ActionRowBuilder().addComponents(hobbiesInput);

		modal.addComponents(firstActionRow, secondActionRow);

		await interaction.showModal(modal);

		// eslint-disable-next-line no-shadow

		const filter = (i) => i.customId === `myModal-${interaction.user.id}` && i.user.id === interaction.user.id;

		interaction
			.awaitModalSubmit({ filter, time: 30_000 })
			.then((modalInteraction) => {
				const favoriteColorValue = modalInteraction.fields.getTextInputValue('favoriteColorInput');
				const hobbiesValue = modalInteraction.fields.getTextInputValue('hobbiesInput');

				modalInteraction.reply(
					`Your Favorite color: ${favoriteColorValue}\nYour hobbies: ${hobbiesValue}`,
				);
			})
			.catch((err) => {
				console.log(`Error: ${err}`);
			});

	},

	data: {
		name: 'showmodal',
		description: 'Shows a modal!',
	},
};