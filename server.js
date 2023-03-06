import { Configuration, OpenAIApi } from 'openai';
import { createRequire } from 'module';

const require = createRequire(import.meta.url);
require('dotenv').config();

const openAI_SECRET_KEY = process.env.OPENAI_SECRET_KEY;
const configuration = new Configuration({
	apiKey: openAI_SECRET_KEY,
});

const openai = new OpenAIApi(configuration);

async function sendPrompt() {
	const model = 'gpt-3.5-turbo';
	const messages = [
		{
			role: 'system',
			content: 'You are a helpful assistant',
        },
        {
			role: 'user',
			content: 'How to make banana muffins?',
		},
    ];
    
    const completion = await openai.createChatCompletion({
        model,
        messages
    })
    console.log(completion.data.choices)
}





sendPrompt()









