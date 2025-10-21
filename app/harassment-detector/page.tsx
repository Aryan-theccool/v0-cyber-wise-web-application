"use client";

import { useState } from "react";
import { Shield, AlertTriangle, MessageSquare, CheckCircle, XCircle } from "lucide-react";
import { useTranslation } from "@/lib/i18n/useTranslation";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";

interface DetectionResult {
  category: 'safe' | 'bully' | 'harassment' | 'fraud';
  confidence: number;
  reason: string;
  matchedKeywords: string[];
}

// Keywords and detection logic ported from the Streamlit app
const bullyKeywords = [
  'stupid', 'idiot', 'dumb', 'loser', 'worthless', 'pathetic', 'ugly', 'fat',
  'hate you', 'kill yourself', 'die', 'nobody likes you', 'waste of space',
  'retard', 'moron', 'freak', 'weirdo', 'disgusting', 'trash', 'garbage',
  'shut up', 'go away', 'leave me alone', 'annoying', 'stupid bitch',
  'piece of shit', 'fuck you', 'fuck off', 'asshole', 'bastard', 'slut', 'whore'
];

const fraudKeywords = [
  'click here', 'urgent', 'verify your account', 'suspended', 'confirm your identity',
  'prize', 'winner', 'lottery', 'inheritance', 'nigerian prince', 'bank account',
  'credit card', 'social security', 'password', 'pin', 'claim your', 'act now',
  'limited time', 'free money', 'cash prize', 'wire transfer', 'bitcoin', 'crypto',
  'investment opportunity', 'guaranteed return', 'risk-free', 'double your money'
];

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

function detectBully(text: string): { score: number; matchedKeywords: string[] } {
  const textLower = text.toLowerCase();
  let bullyScore = 0;
  const matchedKeywords: string[] = [];

  for (const keyword of bullyKeywords) {
    if (textLower.includes(keyword)) {
      bullyScore += 1;
      matchedKeywords.push(keyword);
    }
  }

  // Check for aggressive patterns
  if (/\b(hate|despise|loathe)\s+(you|him|her|them)\b/.test(textLower)) {
    bullyScore += 1;
  }
  if (/\b(kill|hurt|harm)\s+(yourself|you)\b/.test(textLower)) {
    bullyScore += 2;
  }

  return { score: bullyScore, matchedKeywords };
}

function detectFraud(text: string): number {
  const textLower = text.toLowerCase();
  let fraudScore = 0;

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

function detectHarassment(text: string): { score: number; matchedKeywords: string[] } {
  const textLower = text.toLowerCase();
  let harassmentScore = 0;
  const matchedKeywords: string[] = [];

  for (const keyword of harassmentKeywords) {
    if (textLower.includes(keyword)) {
      harassmentScore += 1;
      matchedKeywords.push(keyword);
    }
  }

  // Check for creepy patterns
  if (/\b(sexy|hot|beautiful)\s+(girl|boy|woman|man|lady)\b/.test(textLower)) {
    harassmentScore += 1;
  }
  if (/\b(send|show)\s+(me|pics|pictures|photos)\b/.test(textLower)) {
    harassmentScore += 2;
  }
  if (/\b(meet|come)\s+(me|over|tonight|alone)\b/.test(textLower)) {
    harassmentScore += 1;
  }

  return { score: harassmentScore, matchedKeywords };
}

function classifyMessage(text: string): DetectionResult {
  if (!text.trim()) {
    return {
      category: 'safe',
      confidence: 1.0,
      reason: 'No text provided',
      matchedKeywords: []
    };
  }

  // Check for harassment first (highest priority for creepy content)
  const harassmentResult = detectHarassment(text);
  if (harassmentResult.score >= 2) {
    const confidence = Math.min(0.95, 0.65 + (harassmentResult.score * 0.08));
    const keywordsStr = harassmentResult.matchedKeywords.slice(0, 3).join(', ');
    return {
      category: 'harassment',
      confidence,
      reason: `Inappropriate/creepy content detected: ${keywordsStr}`,
      matchedKeywords: harassmentResult.matchedKeywords
    };
  }

  // Check for bullying/toxicity
  const bullyResult = detectBully(text);
  if (bullyResult.score >= 2) {
    const confidence = Math.min(0.95, 0.65 + (bullyResult.score * 0.08));
    const keywordsStr = bullyResult.matchedKeywords.slice(0, 3).join(', ');
    return {
      category: 'bully',
      confidence,
      reason: `Toxic/bullying content detected: ${keywordsStr}`,
      matchedKeywords: bullyResult.matchedKeywords
    };
  }

  // Check for fraud
  const fraudScore = detectFraud(text);
  if (fraudScore >= 2) {
    const confidence = Math.min(0.95, 0.6 + (fraudScore * 0.1));
    return {
      category: 'fraud',
      confidence,
      reason: 'Potential fraud/scam detected',
      matchedKeywords: []
    };
  }

  // Classification logic with priority order (lower thresholds)
  if (harassmentResult.score >= 1) {
    return {
      category: 'harassment',
      confidence: 0.75,
      reason: 'Potentially inappropriate content detected',
      matchedKeywords: harassmentResult.matchedKeywords
    };
  } else if (bullyResult.score >= 1) {
    return {
      category: 'bully',
      confidence: 0.70,
      reason: 'Potentially toxic content detected',
      matchedKeywords: bullyResult.matchedKeywords
    };
  } else if (fraudScore >= 1) {
    return {
      category: 'fraud',
      confidence: 0.70,
      reason: 'Suspicious content detected',
      matchedKeywords: []
    };
  } else {
    return {
      category: 'safe',
      confidence: 0.95,
      reason: 'Message appears safe',
      matchedKeywords: []
    };
  }
}

export default function HarassmentDetectorPage() {
  const { t } = useTranslation();
  const [text, setText] = useState('');
  const [result, setResult] = useState<DetectionResult | null>(null);
  const [isAnalyzing, setIsAnalyzing] = useState(false);

  const handleAnalyze = async () => {
    if (!text.trim()) return;

    setIsAnalyzing(true);
    // Simulate processing time for better UX
    await new Promise(resolve => setTimeout(resolve, 1000));

    const detectionResult = classifyMessage(text);
    setResult(detectionResult);
    setIsAnalyzing(false);
  };

  const getCategoryIcon = (category: string) => {
    switch (category) {
      case 'safe':
        return <CheckCircle className="h-6 w-6 text-green-500" />;
      case 'bully':
        return <AlertTriangle className="h-6 w-6 text-orange-500" />;
      case 'harassment':
        return <XCircle className="h-6 w-6 text-red-500" />;
      case 'fraud':
        return <AlertTriangle className="h-6 w-6 text-yellow-500" />;
      default:
        return <MessageSquare className="h-6 w-6 text-gray-500" />;
    }
  };

  const getCategoryColor = (category: string) => {
    switch (category) {
      case 'safe':
        return 'bg-green-50 border-green-200 text-green-800 dark:bg-green-900/20 dark:border-green-800';
      case 'bully':
        return 'bg-orange-50 border-orange-200 text-orange-800 dark:bg-orange-900/20 dark:border-orange-800';
      case 'harassment':
        return 'bg-red-50 border-red-200 text-red-800 dark:bg-red-900/20 dark:border-red-800';
      case 'fraud':
        return 'bg-yellow-50 border-yellow-200 text-yellow-800 dark:bg-yellow-900/20 dark:border-yellow-800';
      default:
        return 'bg-gray-50 border-gray-200 text-gray-800 dark:bg-gray-900/20 dark:border-gray-800';
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-teal-50 to-purple-50 dark:from-slate-900 dark:via-slate-800 dark:to-slate-900 p-4">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="text-center mb-8">
          <div className="flex items-center justify-center gap-3 mb-4">
            <Shield className="h-12 w-12 text-primary" />
            <h1 className="text-4xl font-bold">
              <span
                className="bg-gradient-to-r from-[#4A90E2] via-[#9B59B6] to-[#1ABC9C] bg-clip-text text-transparent"
                style={{
                  WebkitBackgroundClip: "text",
                  WebkitTextFillColor: "transparent",
                  backgroundClip: "text",
                }}
              >
                Harassment Detector
              </span>
            </h1>
          </div>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Analyze messages for bullying, harassment, fraud, and other harmful content.
            Stay safe online by checking suspicious messages before responding.
          </p>
        </div>

        <div className="grid gap-6 md:grid-cols-2">
          {/* Input Section */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <MessageSquare className="h-5 w-5" />
                Message Analysis
              </CardTitle>
              <CardDescription>
                Enter or paste the message you want to analyze
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <Textarea
                value={text}
                onChange={(e) => setText(e.target.value)}
                placeholder="Type or paste text here..."
                className="min-h-[200px] resize-none"
              />
              <Button
                onClick={handleAnalyze}
                disabled={!text.trim() || isAnalyzing}
                className="w-full bg-gradient-to-r from-[#4A90E2] via-[#9B59B6] to-[#1ABC9C] hover:opacity-90"
              >
                {isAnalyzing ? 'Analyzing...' : '🔍 Analyze Message'}
              </Button>
            </CardContent>
          </Card>

          {/* Results Section */}
          <Card>
            <CardHeader>
              <CardTitle>Analysis Results</CardTitle>
              <CardDescription>
                {result ? 'Detection results and recommendations' : 'Results will appear here after analysis'}
              </CardDescription>
            </CardHeader>
            <CardContent>
              {isAnalyzing ? (
                <div className="space-y-4">
                  <div className="flex items-center justify-center">
                    <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
                  </div>
                  <p className="text-center text-muted-foreground">Analyzing message...</p>
                  <Progress value={75} className="w-full" />
                </div>
              ) : result ? (
                <div className="space-y-4">
                  {/* Category Badge */}
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      {getCategoryIcon(result.category)}
                      <Badge className={getCategoryColor(result.category)}>
                        {result.category.toUpperCase()}
                      </Badge>
                    </div>
                    <div className="text-right">
                      <div className="text-sm font-medium">Confidence</div>
                      <div className="text-lg font-bold text-primary">
                        {(result.confidence * 100).toFixed(1)}%
                      </div>
                    </div>
                  </div>

                  {/* Reason */}
                  <div className="p-4 rounded-lg bg-muted">
                    <p className="text-sm">{result.reason}</p>
                  </div>

                  {/* Matched Keywords */}
                  {result.matchedKeywords.length > 0 && (
                    <div>
                      <h4 className="font-medium mb-2">Detected Keywords:</h4>
                      <div className="flex flex-wrap gap-2">
                        {result.matchedKeywords.map((keyword, index) => (
                          <Badge key={index} variant="outline" className="text-xs">
                            {keyword}
                          </Badge>
                        ))}
                      </div>
                    </div>
                  )}

                  {/* Recommendations */}
                  <div className="space-y-2">
                    <h4 className="font-medium">Recommendations:</h4>
                    {result.category === 'safe' ? (
                      <p className="text-sm text-green-700 dark:text-green-400">
                        ✅ This message appears to be safe. You can respond normally.
                      </p>
                    ) : result.category === 'harassment' ? (
                      <div className="space-y-2">
                        <p className="text-sm text-red-700 dark:text-red-400">
                          🚫 This message contains inappropriate or creepy content.
                        </p>
                        <ul className="text-sm space-y-1 ml-4">
                          <li>• Do not respond to the message</li>
                          <li>• Block the sender if possible</li>
                          <li>• Report to platform moderators</li>
                          <li>• Save evidence for authorities if needed</li>
                        </ul>
                      </div>
                    ) : result.category === 'bully' ? (
                      <div className="space-y-2">
                        <p className="text-sm text-orange-700 dark:text-orange-400">
                          ⚠️ This message contains harmful or toxic content.
                        </p>
                        <ul className="text-sm space-y-1 ml-4">
                          <li>• Do not engage with the bully</li>
                          <li>• Report the incident to platform moderators</li>
                          <li>• Tell a trusted adult or authority</li>
                          <li>• Save screenshots as evidence</li>
                        </ul>
                      </div>
                    ) : (
                      <div className="space-y-2">
                        <p className="text-sm text-yellow-700 dark:text-yellow-400">
                          🚨 This message appears to be a scam or fraud attempt.
                        </p>
                        <ul className="text-sm space-y-1 ml-4">
                          <li>• Do not click any links or provide personal information</li>
                          <li>• Report to relevant authorities</li>
                          <li>• Mark as spam/phishing</li>
                          <li>• Warn others about similar attempts</li>
                        </ul>
                      </div>
                    )}
                  </div>
                </div>
              ) : (
                <div className="text-center py-8 text-muted-foreground">
                  <MessageSquare className="h-12 w-12 mx-auto mb-4 opacity-50" />
                  <p>Enter a message and click "Analyze" to see results</p>
                </div>
              )}
            </CardContent>
          </Card>
        </div>

        {/* Additional Info */}
        <Card className="mt-6">
          <CardHeader>
            <CardTitle>About This Tool</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid gap-4 md:grid-cols-3">
              <div className="text-center">
                <Shield className="h-8 w-8 mx-auto mb-2 text-blue-500" />
                <h3 className="font-medium mb-1">AI-Powered Detection</h3>
                <p className="text-sm text-muted-foreground">
                  Uses advanced pattern recognition to identify harmful content
                </p>
              </div>
              <div className="text-center">
                <AlertTriangle className="h-8 w-8 mx-auto mb-2 text-orange-500" />
                <h3 className="font-medium mb-1">Multiple Categories</h3>
                <p className="text-sm text-muted-foreground">
                  Detects bullying, harassment, fraud, and other threats
                </p>
              </div>
              <div className="text-center">
                <CheckCircle className="h-8 w-8 mx-auto mb-2 text-green-500" />
                <h3 className="font-medium mb-1">Actionable Advice</h3>
                <p className="text-sm text-muted-foreground">
                  Provides specific recommendations for each type of threat
                </p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
