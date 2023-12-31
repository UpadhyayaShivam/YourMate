import openai from './config/open-ai.js';
import readlineSync from 'readline-sync';
import colors from 'colors';

async function main() {
  console.log(colors.italic.green('Welcome ,, YourMate is here.....'));
  console.log(colors.bold.green('You can start chatting with the me.....'));

  const chatHistory = []; 

  while (true) {
    // readlineSync.question
    const userInput = readlineSync.question(colors.yellow('You: '));

    try {
      const messages = chatHistory.map(([role, content]) => ({
        role,
        content,
      }));

      
      messages.push({ role: 'user', content: userInput });

      
      const completion = await openai.createChatCompletion({
        model: 'gpt-3.5-turbo',
        messages: messages,
      });

      
      const completionText = completion.data.choices[0].message.content;

      if (userInput.toLowerCase() === 'exit') {
        console.log(colors.green('Bot: ') + completionText);
        return;
      }

      console.log(colors.green('Bot: ') + completionText);

      chatHistory.push(['user', userInput]);
      chatHistory.push(['assistant', completionText]);
    } catch (error) {
      console.error(colors.red(error));
    }
  }
}

main();
