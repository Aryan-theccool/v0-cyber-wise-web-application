import { NextRequest, NextResponse } from 'next/server';

const GEMINI_API_KEY = process.env.GEMINI_API_KEY;
const GEMINI_API_URL = 'https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash:generateContent';

// System prompt for the chatbot - defines its personality and behavior
const SYSTEM_PROMPT = `You are a compassionate and empathetic AI counselor for CyberWise, a platform dedicated to helping students deal with cyberbullying, online harassment, scams, and digital safety issues.

Your role:
- Provide immediate emotional support and validation
- Listen actively and respond with empathy
- Offer practical advice for dealing with cyber threats
- Encourage students to seek additional help when needed
- Never judge or minimize their experiences
- Be supportive, understanding, and professional
- Keep responses concise but meaningful (2-4 sentences)
- Use age-appropriate language for teenagers

Important guidelines:
- If someone mentions self-harm or suicide, immediately encourage them to contact emergency services or crisis hotlines
- For serious threats or ongoing harassment, suggest reporting to authorities
- Remind them they're not alone and help is available
- Maintain confidentiality and create a safe space

Respond in the same language as the user's message (English or Hindi).`;

interface ChatMessage {
  role: 'user' | 'assistant';
  content: string;
}

export async function POST(request: NextRequest) {
  try {
    const { message, conversationHistory = [] }: { message: string; conversationHistory?: ChatMessage[] } = await request.json();

    if (!message || message.trim().length === 0) {
      return NextResponse.json(
        { error: 'Message is required' },
        { status: 400 }
      );
    }

    if (!GEMINI_API_KEY) {
      console.error('GEMINI_API_KEY is not configured');
      return NextResponse.json(
        { error: 'AI service is not configured. Please contact support.' },
        { status: 500 }
      );
    }

    // Build conversation context
    const conversationContext = conversationHistory
      .slice(-6) // Keep last 6 messages for context (3 exchanges)
      .map(msg => `${msg.role === 'user' ? 'Student' : 'Counselor'}: ${msg.content}`)
      .join('\n');

    // Construct the full prompt
    const fullPrompt = `${SYSTEM_PROMPT}

${conversationContext ? `Previous conversation:\n${conversationContext}\n\n` : ''}Student: ${message}

Counselor:`;

    // Call Gemini API
    const response = await fetch(`${GEMINI_API_URL}?key=${GEMINI_API_KEY}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        contents: [
          {
            parts: [
              {
                text: fullPrompt
              }
            ]
          }
        ],
        generationConfig: {
          temperature: 0.7,
          topK: 40,
          topP: 0.95,
          maxOutputTokens: 1024,
        },
        safetySettings: [
          {
            category: 'HARM_CATEGORY_HARASSMENT',
            threshold: 'BLOCK_NONE'
          },
          {
            category: 'HARM_CATEGORY_HATE_SPEECH',
            threshold: 'BLOCK_NONE'
          },
          {
            category: 'HARM_CATEGORY_SEXUALLY_EXPLICIT',
            threshold: 'BLOCK_MEDIUM_AND_ABOVE'
          },
          {
            category: 'HARM_CATEGORY_DANGEROUS_CONTENT',
            threshold: 'BLOCK_NONE'
          }
        ]
      }),
    });

    if (!response.ok) {
      const errorData = await response.json();
      console.error('Gemini API error:', errorData);
      return NextResponse.json(
        { error: 'Failed to get AI response. Please try again.' },
        { status: response.status }
      );
    }

    const data = await response.json();
    
    // Extract the AI response
    const aiResponse = data.candidates?.[0]?.content?.parts?.[0]?.text;

    if (!aiResponse) {
      console.error('No response from Gemini API:', data);
      return NextResponse.json(
        { error: 'No response from AI. Please try again.' },
        { status: 500 }
      );
    }

    return NextResponse.json({
      response: aiResponse.trim(),
      timestamp: new Date().toISOString()
    });

  } catch (error) {
    console.error('Chat API error:', error);
    return NextResponse.json(
      { error: 'An error occurred while processing your message. Please try again.' },
      { status: 500 }
    );
  }
}
