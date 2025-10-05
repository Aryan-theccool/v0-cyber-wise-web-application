import { NextRequest, NextResponse } from 'next/server';

// Bullying/Toxic keywords
const bullyKeywords = [
  'stupid', 'idiot', 'dumb', 'loser', 'worthless', 'pathetic', 'ugly', 'fat',
  'hate you', 'kill yourself', 'die', 'nobody likes you', 'waste of space',
  'retard', 'moron', 'freak', 'weirdo', 'disgusting', 'trash', 'garbage',
  'shut up', 'go away', 'leave me alone', 'annoying', 'stupid bitch',
  'piece of shit', 'fuck you', 'fuck off', 'asshole', 'bastard', 'slut', 'whore'
];

// Fraud detection keywords
const fraudKeywords = [
  'click here', 'urgent', 'verify your account', 'suspended', 'confirm your identity',
  'prize', 'winner', 'lottery', 'inheritance', 'nigerian prince', 'bank account',
  'credit card', 'social security', 'password', 'pin', 'claim your', 'act now',
  'limited time', 'free money', 'cash prize', 'wire transfer', 'bitcoin', 'crypto',
  'investment opportunity', 'guaranteed return', 'risk-free', 'double your money'
];

// Harassment/Creepy words detection
const harassmentKeywords = [
  'sexy', 'hot body', 'send pics', 'send nudes', 'wanna hook up', 'dtf', 'netflix and chill',
  'come over', 'alone tonight', 'what are you wearing', 'undress', 'strip', 'naked',
  'bedroom', 'horny', 'turn me on', 'seduce', 'flirt', 'kiss me', 'touch you',
  'stalking', 'following you', 'watching you', 'obsessed with you', 'can\'t stop thinking',
  'you\'re mine', 'belong to me', 'won\'t leave you alone', 'know where you live',
  'creep', 'perv', 'sleazy', 'inappropriate', 'uncomfortable', 'boundaries',
  'age/sex/location', 'asl', 'private chat', 'secret between us', 'don\'t tell anyone',
  'meet in person', 'come to my place', 'get in my car', 'run away with me',
  'sugar daddy', 'sugar baby', 'pay for your time', 'compensated dating',
  'explicit', 'nsfw', 'adult content', 'x-rated', '18+', 'mature content'
];

function detectBully(text: string): { score: number; matches: string[] } {
  const textLower = text.toLowerCase();
  let bullyScore = 0;
  const matchedKeywords: string[] = [];
  
  // Check for bully keywords
  for (const keyword of bullyKeywords) {
    if (textLower.includes(keyword)) {
      bullyScore += 1;
      matchedKeywords.push(keyword);
    }
  }
  
  // Check for aggressive patterns
  if (/\b(hate|despise|loathe)\s+(you|him|her|them)/i.test(textLower)) {
    bullyScore += 1;
  }
  if (/\b(kill|hurt|harm)\s+(yourself|you)/i.test(textLower)) {
    bullyScore += 2;
  }
  
  return { score: bullyScore, matches: matchedKeywords };
}

function detectFraud(text: string): number {
  const textLower = text.toLowerCase();
  let fraudScore = 0;
  
  // Check for fraud keywords
  for (const keyword of fraudKeywords) {
    if (textLower.includes(keyword)) {
      fraudScore += 1;
    }
  }
  
  // Check for suspicious patterns
  if (/\b\d{16}\b/.test(text)) { // Credit card pattern
    fraudScore += 2;
  }
  if (/\b\d{3}-\d{2}-\d{4}\b/.test(text)) { // SSN pattern
    fraudScore += 2;
  }
  if (/https?:\/\/(?:[a-zA-Z]|[0-9]|[$-_@.&+]|[!*\\(\\),]|(?:%[0-9a-fA-F][0-9a-fA-F]))+/.test(text)) {
    fraudScore += 1; // Contains URL
  }
  
  return fraudScore;
}

function detectHarassment(text: string): { score: number; matches: string[] } {
  const textLower = text.toLowerCase();
  let harassmentScore = 0;
  const matchedKeywords: string[] = [];
  
  // Check for harassment keywords
  for (const keyword of harassmentKeywords) {
    if (textLower.includes(keyword)) {
      harassmentScore += 1;
      matchedKeywords.push(keyword);
    }
  }
  
  // Check for creepy patterns
  if (/\b(sexy|hot|beautiful)\s+(girl|boy|woman|man|lady)/i.test(textLower)) {
    harassmentScore += 1;
  }
  if (/\b(send|show)\s+(me|pics|pictures|photos)/i.test(textLower)) {
    harassmentScore += 2;
  }
  if (/\b(meet|come)\s+(me|over|tonight|alone)/i.test(textLower)) {
    harassmentScore += 1;
  }
  
  return { score: harassmentScore, matches: matchedKeywords };
}

function classifyMessage(text: string): {
  category: string;
  confidence: number;
  reason: string;
} {
  if (!text.trim()) {
    return {
      category: "safe",
      confidence: 0.0,
      reason: "No text provided"
    };
  }
  
  // Check for harassment first (highest priority for creepy content)
  const { score: harassmentScore, matches: harassmentMatches } = detectHarassment(text);
  if (harassmentScore >= 2) {
    const confidence = Math.min(0.95, 0.65 + (harassmentScore * 0.08));
    const keywordsStr = harassmentMatches.slice(0, 3).join(", ");
    return {
      category: "harassment",
      confidence,
      reason: `Inappropriate/creepy content detected: ${keywordsStr}`
    };
  }
  
  // Check for bullying/toxicity
  const { score: bullyScore, matches: bullyMatches } = detectBully(text);
  if (bullyScore >= 2) {
    const confidence = Math.min(0.95, 0.65 + (bullyScore * 0.08));
    const keywordsStr = bullyMatches.slice(0, 3).join(", ");
    return {
      category: "bully",
      confidence,
      reason: `Toxic/bullying content detected: ${keywordsStr}`
    };
  }
  
  // Check for fraud
  const fraudScore = detectFraud(text);
  if (fraudScore >= 2) {
    const confidence = Math.min(0.95, 0.6 + (fraudScore * 0.1));
    return {
      category: "fraud",
      confidence,
      reason: "Potential fraud/scam detected"
    };
  }
  
  // Classification logic with priority order (lower thresholds)
  if (harassmentScore >= 1) {
    return {
      category: "harassment",
      confidence: 0.75,
      reason: "Potentially inappropriate content detected"
    };
  } else if (bullyScore >= 1) {
    return {
      category: "bully",
      confidence: 0.70,
      reason: "Potentially toxic content detected"
    };
  } else if (fraudScore >= 1) {
    return {
      category: "fraud",
      confidence: 0.70,
      reason: "Suspicious content detected"
    };
  } else {
    return {
      category: "safe",
      confidence: 0.95,
      reason: "Message appears safe"
    };
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { text } = body;

    if (!text || typeof text !== 'string') {
      return NextResponse.json(
        { error: 'Text is required' },
        { status: 400 }
      );
    }

    const result = classifyMessage(text);

    return NextResponse.json({
      success: true,
      ...result
    });
  } catch (error) {
    console.error('Harassment detection error:', error);
    return NextResponse.json(
      { error: 'Failed to analyze message' },
      { status: 500 }
    );
  }
}
