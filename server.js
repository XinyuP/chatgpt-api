import { Configuration, OpenAIApi } from 'openai';
import { createRequire } from 'module';

const require = createRequire(import.meta.url);
const express = require('express');
const app = express();
const port = 1337;

app.use(express.json());
app.use(require('cors')());

require('dotenv').config();

const openAI_SECRET_KEY = process.env.OPENAI_SECRET_KEY;
const configuration = new Configuration({
	apiKey: openAI_SECRET_KEY,
});

const openai = new OpenAIApi(configuration);

async function sendPrompt(input) {
	const model = 'gpt-3.5-turbo';
	const messages = [
		{
			role: 'system',
			content: 'You are a helpful assistant.',
		},
		{
			role: 'user',
			content: input,
		},
	];

	const completion = await openai.createChatCompletion({
		model,
		messages,
	});
	console.log(completion.data.choices);
	return completion.data.choices;
}

// sendPrompt();

// route
app.post('/api', async (req, res) => {
	const { prompt } = req.body;
	const answer = await sendPrompt(prompt);
	res.status(200).json({
		message: answer,
	});
});

app.listen(port, () => console.log(`Server has started on port: ${port}`));
