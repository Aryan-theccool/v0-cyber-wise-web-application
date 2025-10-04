"use client"

import { useState } from "react"
import Link from "next/link"
import { Shield, ArrowLeft, BookOpen, Award, ChevronRight, CheckCircle2, XCircle } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Progress } from "@/components/ui/progress"
import Image from "next/image"
import { useTranslation } from "@/lib/i18n/useTranslation"

interface CaseStudy {
  id: string
  title: string
  category: string
  description: string
  story: string
  detailedStory: string
  imageUrl: string
  risks: string[]
  prevention: string[]
  outcome: string
}

const caseStudies: CaseStudy[] = [
  {
    id: "1",
    title: "The Phishing Email Scam",
    category: "Scams",
    description: "How a student almost lost their account to a fake email",
    story:
      "Sarah received an email that looked like it was from her school, asking her to verify her account by clicking a link and entering her password.",
    detailedStory:
      "Sarah, a 16-year-old high school student, was checking her email one evening when she received what appeared to be an urgent message from her school's IT department. The email had the school logo, official-looking formatting, and claimed her account would be suspended within 24 hours if she didn't verify her credentials immediately. The message created a sense of panic and urgency. However, before clicking the link, Sarah noticed something odd - the sender's email address was 'support@schooldistrict-verify.com' instead of the official 'support@schooldistrict.edu'. She also noticed several grammatical errors in the email body. Sarah reported the email to her school's actual IT department, who confirmed it was a phishing attempt targeting multiple students. Her quick thinking and attention to detail prevented her account from being compromised.",
    imageUrl: "/phishing-email-scam-illustration-with-fake-login-p.jpg",
    risks: [
      "Complete loss of email and school account access",
      "Identity theft and unauthorized use of personal information",
      "Access to private conversations and sensitive documents",
      "Potential financial loss if payment information is stored",
      "Compromised accounts used to target friends and family",
    ],
    prevention: [
      "Always verify the sender's email address matches the official domain exactly",
      "Look for red flags: urgency, threats, grammatical errors, suspicious links",
      "Hover over links to preview the actual URL before clicking",
      "Never enter passwords or personal information from email links",
      "Go directly to official websites by typing the URL yourself",
      "Enable two-factor authentication on all important accounts",
      "Report suspicious emails to your IT department or security team",
    ],
    outcome:
      "Sarah's vigilance prevented a security breach. The school sent a warning to all students about the phishing campaign, and several other students came forward with similar emails. The IT department blocked the malicious domain and reinforced cybersecurity training.",
  },
  {
    id: "2",
    title: "Cyberbullying in Group Chats",
    category: "Cyberbullying",
    description: "When online conversations turn harmful",
    story:
      "Alex was added to a group chat where classmates started sharing embarrassing photos and making hurtful comments about another student.",
    detailedStory:
      "Alex, a 15-year-old sophomore, was added to a WhatsApp group chat with about 20 classmates. Initially, it seemed like a normal group for sharing homework and school updates. However, things took a dark turn when some members began posting embarrassing photos of another student, Jordan, without consent. The messages quickly escalated to cruel jokes, body-shaming comments, and personal attacks. Alex felt uncomfortable but initially stayed silent, fearing becoming the next target. The bullying continued for several days, with Jordan visibly distressed at school. Finally, Alex decided to take action - they took screenshots of the harmful messages, left the group, and reported everything to a trusted school counselor. The counselor worked with the principal to address the situation, providing support to Jordan and implementing consequences for the bullies. Alex's courage to speak up made a significant difference in stopping the harassment and helping Jordan get the support they needed.",
    imageUrl: "/cyberbullying-group-chat-with-mean-messages-illust.jpg",
    risks: [
      "Severe emotional and psychological trauma for victims",
      "Depression, anxiety, and long-term mental health issues",
      "Academic performance decline and school avoidance",
      "Self-harm or suicidal thoughts in extreme cases",
      "Legal consequences for perpetrators including criminal charges",
      "Permanent digital footprint of harmful content",
      "Damaged relationships and social isolation",
    ],
    prevention: [
      "Never participate in, share, or forward harmful content about others",
      "Stand up for victims when it's safe to do so - your voice matters",
      "Document evidence by taking screenshots with timestamps",
      "Report bullying immediately to trusted adults, teachers, or counselors",
      "Block and report abusive users on all platforms",
      "Support victims privately and encourage them to seek help",
      "Understand that silence enables bullying - speak up",
    ],
    outcome:
      "The school took immediate action. The students involved in the bullying faced disciplinary measures and were required to attend counseling sessions about digital citizenship. Jordan received support from the school counselor and peer support groups. The incident led to a school-wide assembly on cyberbullying awareness.",
  },
  {
    id: "3",
    title: "Social Media Impersonation",
    category: "Harassment",
    description: "When someone creates a fake account pretending to be you",
    story:
      "Jamie discovered that someone had created a fake Instagram account using their photos and name, sending inappropriate messages to friends.",
    detailedStory:
      "Jamie, a 17-year-old student, started receiving confused messages from friends asking about strange DMs they had received. Investigating further, Jamie discovered that someone had created a fake Instagram account using their name, profile picture, and personal photos scraped from their public account. The impersonator was sending inappropriate messages to Jamie's friends, posting embarrassing content, and even attempting to scam people by asking for money. Jamie's reputation was being damaged, and friends were starting to question their character. Jamie immediately took action: they posted a warning on their real account about the fake profile, reported the impersonation to Instagram with evidence, changed all their passwords, enabled two-factor authentication, and made their account private. They also informed their school and parents about the situation. Within 48 hours, Instagram removed the fake account, but the emotional toll and damaged relationships took weeks to repair. Jamie learned the importance of privacy settings and being cautious about what personal information is shared online.",
    imageUrl: "/fake-social-media-profile-impersonation-illustrati.jpg",
    risks: [
      "Severe damage to personal reputation and credibility",
      "Loss of trust from friends, family, and professional contacts",
      "Emotional distress, anxiety, and feelings of violation",
      "Potential legal issues from impersonator's fraudulent actions",
      "Financial scams targeting your contacts",
      "Difficulty proving your identity and innocence",
      "Long-term impact on college applications or job opportunities",
    ],
    prevention: [
      "Use strong, unique passwords for every account (use a password manager)",
      "Enable two-factor authentication on all social media accounts",
      "Set strict privacy settings - limit who can see your posts and photos",
      "Be cautious about accepting friend requests from unknown people",
      "Regularly search for fake accounts using your name or photos",
      "Watermark personal photos before posting online",
      "Report fake accounts immediately with evidence to the platform",
      "Inform friends and family about impersonation attempts",
      "Document everything for potential legal action",
    ],
    outcome:
      "Instagram removed the fake account after Jamie's report. Jamie worked with their school counselor to address the emotional impact and rebuilt trust with friends by being transparent about the situation. They became an advocate for digital privacy awareness at their school.",
  },
  {
    id: "4",
    title: "The Free Gift Card Trap",
    category: "Scams",
    description: "Too good to be true offers that steal your data",
    story:
      "Marcus saw a post on social media offering free $100 gift cards. All he had to do was complete a survey and provide personal information.",
    detailedStory:
      "Marcus, a 14-year-old middle school student, was scrolling through Facebook when he saw a post that seemed too good to pass up: 'Get a FREE $100 Amazon Gift Card! Only 50 available - Click here now!' The post had thousands of likes and comments from people claiming they received their gift cards. Excited, Marcus clicked the link and was taken to a professional-looking website that asked him to complete a short survey. The survey asked for his full name, email address, phone number, home address, date of birth, and even his parents' names. After submitting the information, the site said the gift card would arrive in 3-5 business days. Days passed with no gift card, but Marcus started receiving dozens of spam calls and emails daily. His email inbox was flooded with phishing attempts, and his phone number was sold to multiple telemarketing companies. Worse, his family started receiving targeted scam calls using information Marcus had provided. His parents had to change phone numbers and set up identity theft monitoring. Marcus learned a painful lesson about online scams and the real cost of 'free' offers.",
    imageUrl: "/fake-gift-card-scam-website-illustration.jpg",
    risks: [
      "Personal information sold to data brokers and scammers",
      "Constant spam calls, texts, and emails",
      "Increased vulnerability to targeted phishing attacks",
      "Potential identity theft using collected information",
      "Malware or spyware installation on devices",
      "Financial scams targeting you and your family",
      "Compromised accounts if you reused passwords",
    ],
    prevention: [
      "Remember: if it seems too good to be true, it probably is",
      "Never share personal information for 'free' prizes or offers",
      "Research companies thoroughly before providing any data",
      "Check for HTTPS and legitimate domain names",
      "Read reviews and look for scam warnings online",
      "Use disposable email addresses for online forms",
      "Never provide financial information for free offers",
      "Report scam websites to the FTC and social media platforms",
      "Educate family members about common online scams",
    ],
    outcome:
      "Marcus's family had to take extensive measures to protect their information, including changing phone numbers and monitoring credit reports. Marcus shared his experience at school to warn other students, and the school incorporated scam awareness into their digital literacy curriculum.",
  },
]

interface QuizQuestion {
  id: number
  question: string
  options: string[]
  correctAnswer: number
  explanation: string
}

const quizQuestions: QuizQuestion[] = [
  {
    id: 1,
    question:
      "You receive an email from 'support@amaz0n-security.com' asking you to verify your account. What should you do?",
    options: [
      "Click the link and enter your password immediately",
      "Delete the email - it's likely a phishing attempt",
      "Reply with your account information",
      "Forward it to all your friends",
    ],
    correctAnswer: 1,
    explanation:
      "This is a phishing attempt! Notice the '0' instead of 'o' in the domain. Always check sender addresses carefully and never click suspicious links. Go directly to official websites instead.",
  },
  {
    id: 2,
    question: "Someone is posting mean comments about you on social media. What's the best first step?",
    options: [
      "Post mean comments back to get revenge",
      "Ignore it completely and hope it stops",
      "Document the harassment with screenshots and report it",
      "Delete all your social media accounts",
    ],
    correctAnswer: 2,
    explanation:
      "Documenting and reporting is crucial. Take screenshots as evidence, report to the platform, and tell a trusted adult. Don't engage with the bully, as it often makes things worse.",
  },
  {
    id: 3,
    question:
      "A stranger online offers you a great deal on concert tickets and asks for payment via gift cards. Should you?",
    options: [
      "Yes, gift cards are safe and untraceable",
      "No, this is a common scam tactic",
      "Yes, but only if they have good reviews",
      "Ask them to meet in person instead",
    ],
    correctAnswer: 1,
    explanation:
      "Gift card payments are a major red flag! Scammers love gift cards because they're untraceable. Legitimate sellers use secure payment methods. Never buy from strangers requesting gift cards.",
  },
  {
    id: 4,
    question: "What's the strongest type of password?",
    options: [
      "Your birthday and name",
      "The word 'password123'",
      "A long phrase with numbers, symbols, and mixed case letters",
      "Your pet's name",
    ],
    correctAnswer: 2,
    explanation:
      "Strong passwords are long (12+ characters), use a mix of uppercase, lowercase, numbers, and symbols, and aren't based on personal information. Consider using a password manager!",
  },
  {
    id: 5,
    question: "You see someone being cyberbullied in a group chat. What should you do?",
    options: [
      "Join in so you don't become the next target",
      "Stay silent and leave the chat",
      "Support the victim and report the bullying",
      "Screenshot and share it for entertainment",
    ],
    correctAnswer: 2,
    explanation:
      "Standing up for victims is important! Support them privately, report the bullying to authorities, and don't participate. Your actions can make a real difference in someone's life.",
  },
]

export default function AwarenessPage() {
  const { t } = useTranslation();
  const [selectedCase, setSelectedCase] = useState<CaseStudy | null>(null)
  const [showQuiz, setShowQuiz] = useState(false)
  const [currentQuestion, setCurrentQuestion] = useState(0)
  const [selectedAnswer, setSelectedAnswer] = useState<number | null>(null)
  const [showExplanation, setShowExplanation] = useState(false)
  const [score, setScore] = useState(0)
  const [quizComplete, setQuizComplete] = useState(false)

  const handleAnswerSelect = (answerIndex: number) => {
    setSelectedAnswer(answerIndex)
    setShowExplanation(true)

    if (answerIndex === quizQuestions[currentQuestion].correctAnswer) {
      setScore(score + 1)
    }
  }

  const handleNextQuestion = () => {
    if (currentQuestion < quizQuestions.length - 1) {
      setCurrentQuestion(currentQuestion + 1)
      setSelectedAnswer(null)
      setShowExplanation(false)
    } else {
      setQuizComplete(true)
    }
  }

  const resetQuiz = () => {
    setCurrentQuestion(0)
    setSelectedAnswer(null)
    setShowExplanation(false)
    setScore(0)
    setQuizComplete(false)
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-50 to-white">
      {/* Header */}
      <header className="sticky top-0 z-50 border-b border-slate-200 bg-white/80 backdrop-blur-sm">
        <div className="container mx-auto flex h-16 items-center justify-between px-4">
          <div className="flex items-center gap-4">
            <Button variant="ghost" size="icon" asChild>
              <Link href="/">
                <ArrowLeft className="h-5 w-5" />
              </Link>
            </Button>
            <div className="flex items-center gap-2">
              <Shield className="h-5 w-5 text-blue-600" />
              <span className="font-semibold text-slate-900">{t("awareness.title")}</span>
            </div>
          </div>
        </div>
      </header>

      <div className="container mx-auto max-w-6xl px-4 py-12">
        {/* Hero Section */}
        <div className="mb-16 text-center">
          <h1 className="mb-4 text-5xl font-bold text-slate-900">{t("awareness.heroTitle")}</h1>
          <p className="mx-auto max-w-2xl text-lg leading-relaxed text-slate-600">
            {t("awareness.heroDesc")}
          </p>
        </div>

        {/* Case Studies Section */}
        <section className="mb-16">
          <div className="mb-8 flex items-center justify-between">
            <div>
              <h2 className="text-3xl font-bold text-slate-900">{t("awareness.caseStudiesTitle")}</h2>
              <p className="mt-2 text-slate-600">{t("awareness.caseStudiesDesc")}</p>
            </div>
            <BookOpen className="h-8 w-8 text-blue-600" />
          </div>

          <div className="grid gap-6 md:grid-cols-2">
            {caseStudies.map((caseStudy) => (
              <Card
                key={caseStudy.id}
                className="group cursor-pointer overflow-hidden border-slate-200 bg-white transition-all hover:border-blue-300 hover:shadow-xl"
                onClick={() => setSelectedCase(caseStudy)}
              >
                <div className="relative h-48 w-full overflow-hidden bg-slate-100">
                  <Image
                    src={caseStudy.imageUrl || "/placeholder.svg"}
                    alt={caseStudy.title}
                    fill
                    className="object-cover transition-transform duration-300 group-hover:scale-105"
                  />
                </div>
                <CardHeader>
                  <div className="mb-2 inline-block rounded-full bg-blue-100 px-3 py-1 text-xs font-medium text-blue-700">
                    {caseStudy.category}
                  </div>
                  <CardTitle className="text-xl text-slate-900">{caseStudy.title}</CardTitle>
                  <CardDescription className="text-slate-600">{caseStudy.description}</CardDescription>
                </CardHeader>
                <CardContent>
                  <Button variant="ghost" className="w-full justify-between text-blue-600 hover:bg-blue-50">
                    Read Full Story
                    <ChevronRight className="h-4 w-4" />
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
        </section>

        {/* Quiz Section */}
        <section>
          <div className="mb-8 flex items-center justify-between">
            <div>
              <h2 className="text-3xl font-bold text-slate-900">Interactive Safety Quiz</h2>
              <p className="mt-2 text-slate-600">Test your cybersecurity knowledge and earn badges</p>
            </div>
            <Award className="h-8 w-8 text-blue-600" />
          </div>

          <Card className="border-blue-200 bg-gradient-to-br from-blue-50 to-indigo-50">
            <CardHeader>
              <CardTitle className="text-slate-900">Cyber Safety Challenge</CardTitle>
              <CardDescription className="text-slate-600">
                Answer 5 questions about online safety. Can you get a perfect score?
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Button onClick={() => setShowQuiz(true)} size="lg" className="w-full bg-blue-600 hover:bg-blue-700">
                Start Quiz
              </Button>
            </CardContent>
          </Card>
        </section>
      </div>

      {/* Case Study Modal */}
      <Dialog open={!!selectedCase} onOpenChange={() => setSelectedCase(null)}>
        <DialogContent className="max-h-[85vh] overflow-y-auto bg-white sm:max-w-[800px]">
          {selectedCase && (
            <>
              <DialogHeader>
                <div className="mb-4 overflow-hidden rounded-lg">
                  <Image
                    src={selectedCase.imageUrl || "/placeholder.svg"}
                    alt={selectedCase.title}
                    width={800}
                    height={400}
                    className="h-64 w-full object-cover"
                  />
                </div>
                <div className="mb-2 inline-block rounded-full bg-blue-100 px-3 py-1 text-xs font-medium text-blue-700">
                  {selectedCase.category}
                </div>
                <DialogTitle className="text-2xl text-slate-900">{selectedCase.title}</DialogTitle>
                <DialogDescription className="text-slate-600">{selectedCase.description}</DialogDescription>
              </DialogHeader>

              <div className="space-y-6 py-4">
                <div>
                  <h3 className="mb-3 text-lg font-semibold text-slate-900">The Full Story</h3>
                  <p className="leading-relaxed text-slate-700">{selectedCase.detailedStory}</p>
                </div>

                <div className="rounded-lg bg-red-50 p-4">
                  <h3 className="mb-3 flex items-center gap-2 font-semibold text-red-700">
                    <XCircle className="h-5 w-5" />
                    Potential Risks
                  </h3>
                  <ul className="space-y-2">
                    {selectedCase.risks.map((risk, index) => (
                      <li key={index} className="flex items-start gap-2">
                        <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-red-500" />
                        <span className="text-sm leading-relaxed text-slate-700">{risk}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="rounded-lg bg-green-50 p-4">
                  <h3 className="mb-3 flex items-center gap-2 font-semibold text-green-700">
                    <CheckCircle2 className="h-5 w-5" />
                    How to Protect Yourself
                  </h3>
                  <ul className="space-y-2">
                    {selectedCase.prevention.map((tip, index) => (
                      <li key={index} className="flex items-start gap-2">
                        <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0 text-green-600" />
                        <span className="text-sm leading-relaxed text-slate-700">{tip}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="rounded-lg bg-blue-50 p-4">
                  <h3 className="mb-2 font-semibold text-blue-900">What Happened Next</h3>
                  <p className="text-sm leading-relaxed text-slate-700">{selectedCase.outcome}</p>
                </div>
              </div>

              <Button onClick={() => setSelectedCase(null)} className="w-full bg-blue-600 hover:bg-blue-700">
                Close
              </Button>
            </>
          )}
        </DialogContent>
      </Dialog>

      {/* Quiz Modal */}
      <Dialog open={showQuiz} onOpenChange={setShowQuiz}>
        <DialogContent className="bg-white sm:max-w-[600px]">
          {!quizComplete ? (
            <>
              <DialogHeader>
                <DialogTitle className="text-slate-900">
                  Question {currentQuestion + 1} of {quizQuestions.length}
                </DialogTitle>
                <DialogDescription>
                  <Progress
                    value={((currentQuestion + 1) / quizQuestions.length) * 100}
                    className="mt-2 bg-slate-200"
                  />
                </DialogDescription>
              </DialogHeader>

              <div className="space-y-4 py-4">
                <p className="text-lg font-medium leading-relaxed text-slate-900">
                  {quizQuestions[currentQuestion].question}
                </p>

                <div className="space-y-3">
                  {quizQuestions[currentQuestion].options.map((option, index) => (
                    <button
                      key={index}
                      onClick={() => !showExplanation && handleAnswerSelect(index)}
                      disabled={showExplanation}
                      className={`w-full rounded-lg border-2 p-4 text-left transition-all ${
                        showExplanation
                          ? index === quizQuestions[currentQuestion].correctAnswer
                            ? "border-green-500 bg-green-50"
                            : index === selectedAnswer
                              ? "border-red-500 bg-red-50"
                              : "border-slate-200 bg-slate-50"
                          : selectedAnswer === index
                            ? "border-blue-500 bg-blue-50"
                            : "border-slate-200 bg-white hover:border-blue-300 hover:bg-slate-50"
                      }`}
                    >
                      <div className="flex items-center gap-3">
                        <div
                          className={`flex h-6 w-6 shrink-0 items-center justify-center rounded-full border-2 ${
                            showExplanation && index === quizQuestions[currentQuestion].correctAnswer
                              ? "border-green-500 bg-green-500"
                              : showExplanation && index === selectedAnswer
                                ? "border-red-500 bg-red-500"
                                : selectedAnswer === index
                                  ? "border-blue-500 bg-blue-500"
                                  : "border-slate-300"
                          }`}
                        >
                          {showExplanation && index === quizQuestions[currentQuestion].correctAnswer && (
                            <CheckCircle2 className="h-4 w-4 text-white" />
                          )}
                          {showExplanation &&
                            index === selectedAnswer &&
                            index !== quizQuestions[currentQuestion].correctAnswer && (
                              <XCircle className="h-4 w-4 text-white" />
                            )}
                        </div>
                        <span className="text-sm text-slate-700">{option}</span>
                      </div>
                    </button>
                  ))}
                </div>

                {showExplanation && (
                  <div className="rounded-lg border border-blue-200 bg-blue-50 p-4">
                    <p className="text-sm leading-relaxed text-slate-700">
                      {quizQuestions[currentQuestion].explanation}
                    </p>
                  </div>
                )}
              </div>

              {showExplanation && (
                <Button onClick={handleNextQuestion} className="w-full bg-blue-600 hover:bg-blue-700">
                  {currentQuestion < quizQuestions.length - 1 ? "Next Question" : "See Results"}
                </Button>
              )}
            </>
          ) : (
            <>
              <DialogHeader>
                <div className="mx-auto mb-4 flex h-20 w-20 items-center justify-center rounded-full bg-blue-100">
                  <Award className="h-10 w-10 text-blue-600" />
                </div>
                <DialogTitle className="text-center text-2xl text-slate-900">Quiz Complete!</DialogTitle>
                <DialogDescription className="text-center text-slate-600">
                  You scored {score} out of {quizQuestions.length}
                </DialogDescription>
              </DialogHeader>

              <div className="py-4">
                <div className="mb-6 text-center">
                  <div className="text-5xl font-bold text-blue-600">
                    {Math.round((score / quizQuestions.length) * 100)}%
                  </div>
                  <p className="mt-3 text-slate-600">
                    {score === quizQuestions.length
                      ? "Perfect score! You're a cybersecurity expert!"
                      : score >= quizQuestions.length * 0.8
                        ? "Great job! You know your stuff!"
                        : score >= quizQuestions.length * 0.6
                          ? "Good effort! Keep learning!"
                          : "Keep practicing! Review the case studies for more tips."}
                  </p>
                </div>

                <div className="space-y-2">
                  <Button
                    onClick={() => {
                      resetQuiz()
                      setShowQuiz(false)
                    }}
                    className="w-full bg-blue-600 hover:bg-blue-700"
                  >
                    Close
                  </Button>
                  <Button
                    onClick={resetQuiz}
                    variant="outline"
                    className="w-full border-slate-300 bg-white text-slate-700 hover:bg-slate-50"
                  >
                    Retake Quiz
                  </Button>
                </div>
              </div>
            </>
          )}
        </DialogContent>
      </Dialog>
    </div>
  )
}
