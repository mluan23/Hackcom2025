import { ElevenLabsClient } from '@elevenlabs/elevenlabs-js';
import 'dotenv/config';

const elevenLabs = new ElevenLabsClient({
    apiKey: process.env.ELEVENLABS_API_KEY
});

function createPromptForRecipe(recipe) {
    return `
    # Current Context
    
    You are currently helping the user with a specific recipe: ${recipe}
    
    
    # Personality

    You are a helpful cooking assistant named Bennett. You are encouraging, patient, and very detail-oriented. You use easy-to-understand language and can explain cooking terminology well. You are passionate about cooking and enjoy sharing your knowledge with others.

    # Environment

    You are assisting a user who is looking at the recipe for ${recipe}. You should be ready to answer specific questions about this recipe, its ingredients, cooking techniques, and any potential modifications. You may also provide general cooking advice related to this dish.

    # Goal

    Your primary goal is to help the user successfully prepare ${recipe}. Focus on:
    1. Answering specific questions about this recipe
    2. Providing detailed ingredient information and possible substitutions
    3. Explaining cooking techniques required for this dish
    4. Troubleshooting any issues they encounter
    5. Suggesting tips and tricks specific to this recipe
    `;
}

export async function createAgent(req, res) {
    try {
        const recipe  = req.body;

        
        if (!recipe) {
            return res.status(400).json({ error: 'Recipe name is required' });
        }

        const dynamicPrompt = createPromptForRecipe(recipe);

        const agent = await elevenLabs.conversationalAi.agents.create({
            name: `Cooking Assistant - ${recipe}`,
            tags: ["recipe", "cooking"],
            conversationConfig: {
                tts: {
                    voiceId: process.env.DEFAULT_VOICE_ID,
                    modelId: "eleven_flash_v2",
                },
                agent: {
                    firstMessage: `Hi! I see you're interested in making this recipe. I'm Bennett, and I'm here to help you make this recipe successfully. What would you like to know about it?`,
                    prompt: {
                        prompt: dynamicPrompt,
                    }
                }
            }
        });

        res.json({ agentId: agent.agentId });
    } catch (error) {
        console.error('Error creating agent:', error);
        res.status(500).json({ error: 'Failed to create agent' });
    }
}

// export async function sendMessage(req, res) {
//     const { conversationId, message } = req.body;

//     if (!conversationId || !message) {
//         return res.status(400).json({ error: 'Conversation ID and message are required' });
//     }

//     try {
//         // Get audio response from the agent
//         const audioStream = await elevenLabs.conversationalAi.conversations.messages.create({
//             conversationId,
//             text: message
//         });

//         // Set response headers for audio streaming
//         res.set({
//             'Content-Type': 'audio/mpeg',
//             'Cache-Control': 'no-cache, no-store, must-revalidate',
//             'Pragma': 'no-cache',
//             'Expires': '0',
//             'Transfer-Encoding': 'chunked'
//         });

//         // Stream the audio response
//         audioStream.pipe(res);

//         audioStream.on('error', (err) => {
//             console.error('Stream Error:', err);
//             if (!res.headersSent) {
//                 res.status(500).send('Audio streaming failed');
//             }
//         });
//     } catch (error) {
//         console.error('Error sending message:', error);
//         if (!res.headersSent) {
//             res.status(500).json({ error: 'Failed to process message' });
//         }
//     }
// }

export default {
    createAgent
};