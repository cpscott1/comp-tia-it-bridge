
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Badge } from "@/components/ui/badge";
import { ArrowLeft, CheckCircle, XCircle, RotateCcw, Target } from "lucide-react";
import { Link } from "react-router-dom";

const Practice = () => {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState<number | null>(null);
  const [showFeedback, setShowFeedback] = useState(false);
  const [score, setScore] = useState(0);
  const [answeredQuestions, setAnsweredQuestions] = useState<boolean[]>([]);

  const hardwareQuestions = [
    {
      id: 1,
      question: "Which component is primarily responsible for temporarily storing data that the CPU needs quick access to?",
      options: [
        "Hard Drive",
        "RAM (Random Access Memory)",
        "Graphics Card",
        "Power Supply"
      ],
      correctAnswer: 1,
      explanation: "RAM (Random Access Memory) is volatile memory that provides fast access to data and programs currently in use by the CPU. Unlike storage devices, RAM loses its contents when power is removed.",
      domain: "Hardware",
      difficulty: "Easy"
    },
    {
      id: 2,
      question: "What is the standard form factor for most modern desktop motherboards?",
      options: [
        "Mini-ITX",
        "Micro-ATX",
        "ATX",
        "E-ATX"
      ],
      correctAnswer: 2,
      explanation: "ATX (Advanced Technology eXtended) is the most common motherboard form factor for desktop computers, measuring 12 × 9.6 inches and providing good expansion capabilities.",
      domain: "Hardware",
      difficulty: "Medium"
    },
    {
      id: 3,
      question: "Which connector type is commonly used for modern SATA drives?",
      options: [
        "4-pin Molex",
        "6-pin PCIe",
        "15-pin SATA power",
        "24-pin ATX"
      ],
      correctAnswer: 2,
      explanation: "SATA drives use a 15-pin SATA power connector that provides 3.3V, 5V, and 12V power rails. This is different from the older 4-pin Molex connectors.",
      domain: "Hardware",
      difficulty: "Medium"
    },
    {
      id: 4,
      question: "What is the purpose of the BIOS/UEFI in a computer system?",
      options: [
        "To provide internet connectivity",
        "To manage file storage",
        "To initialize hardware and boot the operating system",
        "To run application software"
      ],
      correctAnswer: 2,
      explanation: "BIOS (Basic Input/Output System) or UEFI (Unified Extensible Firmware Interface) is firmware that initializes hardware components during startup and provides the bootloader with information needed to boot the operating system.",
      domain: "Hardware",
      difficulty: "Easy"
    },
    {
      id: 5,
      question: "Which type of memory is considered non-volatile?",
      options: [
        "RAM",
        "Cache memory",
        "SSD storage",
        "System memory"
      ],
      correctAnswer: 2,
      explanation: "Non-volatile memory retains its contents even when power is removed. SSDs, hard drives, and flash memory are examples of non-volatile storage, while RAM is volatile.",
      domain: "Hardware",
      difficulty: "Easy"
    },
    {
      id: 6,
      question: "What is the maximum theoretical transfer rate of USB 3.0?",
      options: [
        "480 Mbps",
        "5 Gbps",
        "10 Gbps",
        "20 Gbps"
      ],
      correctAnswer: 1,
      explanation: "USB 3.0 (also known as USB 3.1 Gen 1) has a maximum theoretical transfer rate of 5 Gbps (gigabits per second), which is significantly faster than USB 2.0's 480 Mbps.",
      domain: "Hardware",
      difficulty: "Medium"
    },
    {
      id: 7,
      question: "Which CPU socket type is commonly used for Intel's 12th generation processors?",
      options: [
        "LGA 1151",
        "LGA 1200",
        "LGA 1700",
        "LGA 2066"
      ],
      correctAnswer: 2,
      explanation: "LGA 1700 is the socket used for Intel's 12th generation Alder Lake processors. Each generation of processors typically requires a specific socket type.",
      domain: "Hardware",
      difficulty: "Hard"
    },
    {
      id: 8,
      question: "What is the primary function of a graphics card's VRAM?",
      options: [
        "Store the operating system",
        "Store textures, frame buffers, and graphics data",
        "Process CPU instructions",
        "Manage network connections"
      ],
      correctAnswer: 1,
      explanation: "VRAM (Video RAM) is dedicated memory on a graphics card used to store textures, frame buffers, and other graphics-related data for quick access by the GPU.",
      domain: "Hardware",
      difficulty: "Medium"
    },
    {
      id: 9,
      question: "Which power connector is typically used for modern graphics cards?",
      options: [
        "4-pin Molex",
        "SATA power",
        "6-pin or 8-pin PCIe",
        "24-pin ATX"
      ],
      correctAnswer: 2,
      explanation: "Modern graphics cards typically use 6-pin, 8-pin, or combinations of PCIe power connectors to provide the additional power they need beyond what the PCIe slot can supply.",
      domain: "Hardware",
      difficulty: "Medium"
    },
    {
      id: 10,
      question: "What does POST stand for in computer terminology?",
      options: [
        "Power On Self Test",
        "Processor Operating System Test",
        "Primary Output System Test",
        "Peripheral Operating Status Test"
      ],
      correctAnswer: 0,
      explanation: "POST (Power On Self Test) is a diagnostic testing sequence that a computer runs when it's first powered on to check that hardware components are functioning properly.",
      domain: "Hardware",
      difficulty: "Easy"
    },
    {
      id: 11,
      question: "Which interface is fastest for connecting storage devices?",
      options: [
        "SATA III",
        "USB 3.0",
        "NVMe",
        "IDE"
      ],
      correctAnswer: 2,
      explanation: "NVMe (Non-Volatile Memory Express) is the fastest interface for storage devices, capable of much higher speeds than SATA III, especially when used with PCIe 3.0 or 4.0 slots.",
      domain: "Hardware",
      difficulty: "Medium"
    },
    {
      id: 12,
      question: "What is the purpose of thermal paste on a CPU?",
      options: [
        "To insulate the CPU from electrical damage",
        "To improve heat transfer between CPU and cooler",
        "To prevent dust accumulation",
        "To secure the CPU to the motherboard"
      ],
      correctAnswer: 1,
      explanation: "Thermal paste (or thermal compound) fills microscopic gaps between the CPU and cooler, improving heat transfer efficiency by eliminating air pockets that would otherwise insulate.",
      domain: "Hardware",
      difficulty: "Easy"
    },
    {
      id: 13,
      question: "Which component determines the maximum RAM capacity of a system?",
      options: [
        "CPU",
        "Power Supply",
        "Motherboard chipset",
        "Graphics Card"
      ],
      correctAnswer: 2,
      explanation: "The motherboard chipset determines the maximum RAM capacity, number of memory slots, and supported memory types. The CPU also plays a role but the chipset is the primary limiting factor.",
      domain: "Hardware",
      difficulty: "Medium"
    },
    {
      id: 14,
      question: "What is the difference between DDR4 and DDR5 RAM?",
      options: [
        "DDR5 operates at lower voltages and higher speeds",
        "DDR4 is faster than DDR5",
        "DDR5 uses more power than DDR4",
        "There is no significant difference"
      ],
      correctAnswer: 0,
      explanation: "DDR5 RAM operates at lower voltages (1.1V vs 1.2V) and achieves higher speeds than DDR4, while also offering improved power efficiency and higher capacity modules.",
      domain: "Hardware",
      difficulty: "Hard"
    },
    {
      id: 15,
      question: "Which expansion slot type is primarily used for graphics cards?",
      options: [
        "PCI",
        "PCIe x1",
        "PCIe x16",
        "AGP"
      ],
      correctAnswer: 2,
      explanation: "PCIe x16 slots are primarily designed for graphics cards as they provide the highest bandwidth (16 lanes) needed for high-performance graphics processing.",
      domain: "Hardware",
      difficulty: "Easy"
    },
    {
      id: 16,
      question: "What is the purpose of ECC memory?",
      options: [
        "To increase memory speed",
        "To detect and correct memory errors",
        "To reduce power consumption",
        "To improve graphics performance"
      ],
      correctAnswer: 1,
      explanation: "ECC (Error-Correcting Code) memory can detect and automatically correct single-bit memory errors, making it important for servers and workstations where data integrity is critical.",
      domain: "Hardware",
      difficulty: "Hard"
    },
    {
      id: 17,
      question: "Which component converts AC power to DC power in a computer?",
      options: [
        "Motherboard",
        "Power Supply Unit (PSU)",
        "CPU",
        "RAM"
      ],
      correctAnswer: 1,
      explanation: "The Power Supply Unit (PSU) converts alternating current (AC) from the wall outlet to direct current (DC) at various voltages (3.3V, 5V, 12V) that computer components require.",
      domain: "Hardware",
      difficulty: "Easy"
    },
    {
      id: 18,
      question: "What is the typical lifespan of an SSD compared to an HDD?",
      options: [
        "SSDs last much shorter than HDDs",
        "SSDs and HDDs have similar lifespans",
        "SSDs typically last longer than HDDs",
        "Lifespan depends only on usage patterns"
      ],
      correctAnswer: 2,
      explanation: "SSDs typically last longer than HDDs because they have no moving parts, making them less susceptible to mechanical failure. However, they do have limited write cycles.",
      domain: "Hardware",
      difficulty: "Medium"
    },
    {
      id: 19,
      question: "Which cooling method is most effective for high-performance CPUs?",
      options: [
        "Stock air cooler",
        "Liquid cooling (AIO)",
        "Passive cooling",
        "Case fans only"
      ],
      correctAnswer: 1,
      explanation: "Liquid cooling systems (All-In-One or custom loops) are generally most effective for high-performance CPUs as they can dissipate heat more efficiently than air coolers.",
      domain: "Hardware",
      difficulty: "Medium"
    },
    {
      id: 20,
      question: "What does TDP stand for in CPU specifications?",
      options: [
        "Total Data Processing",
        "Thermal Design Power",
        "Turbo Dynamic Performance",
        "Temperature Detection Point"
      ],
      correctAnswer: 1,
      explanation: "TDP (Thermal Design Power) represents the maximum amount of heat a CPU is designed to generate under normal operation, measured in watts. It helps determine cooling requirements.",
      domain: "Hardware",
      difficulty: "Medium"
    }
  ];

  const currentQ = hardwareQuestions[currentQuestion];
  const totalQuestions = hardwareQuestions.length;
  const progress = ((currentQuestion + 1) / totalQuestions) * 100;

  const handleAnswerSelect = (answerIndex: number) => {
    if (showFeedback) return;
    setSelectedAnswer(answerIndex);
  };

  const handleSubmitAnswer = () => {
    if (selectedAnswer === null) return;
    
    setShowFeedback(true);
    const newAnsweredQuestions = [...answeredQuestions];
    newAnsweredQuestions[currentQuestion] = true;
    setAnsweredQuestions(newAnsweredQuestions);
    
    if (selectedAnswer === currentQ.correctAnswer) {
      setScore(score + 1);
    }
  };

  const handleNextQuestion = () => {
    if (currentQuestion < totalQuestions - 1) {
      setCurrentQuestion(currentQuestion + 1);
      setSelectedAnswer(null);
      setShowFeedback(false);
    }
  };

  const handleRestartQuiz = () => {
    setCurrentQuestion(0);
    setSelectedAnswer(null);
    setShowFeedback(false);
    setScore(0);
    setAnsweredQuestions([]);
  };

  const isQuizComplete = currentQuestion === totalQuestions - 1 && showFeedback;

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-green-50">
      {/* Header */}
      <header className="bg-white shadow-sm border-b">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <Link to="/">
                <Button variant="ghost" size="sm">
                  <ArrowLeft className="h-4 w-4 mr-2" />
                  Back to Home
                </Button>
              </Link>
              <div>
                <h1 className="text-xl font-bold text-gray-900">Hardware Foundations Practice</h1>
                <p className="text-sm text-gray-500">Week 1-2 • Component Identification</p>
              </div>
            </div>
            <Badge variant="outline" className="bg-blue-50 text-blue-700 border-blue-200">
              Question {currentQuestion + 1} of {totalQuestions}
            </Badge>
          </div>
        </div>
      </header>

      <div className="container mx-auto px-4 py-8">
        {!isQuizComplete ? (
          <div className="max-w-4xl mx-auto">
            {/* Progress Bar */}
            <Card className="mb-6 bg-white/70 backdrop-blur">
              <CardContent className="p-6">
                <div className="flex justify-between text-sm text-gray-600 mb-2">
                  <span>Practice Progress</span>
                  <span>{Math.round(progress)}% Complete</span>
                </div>
                <Progress value={progress} className="h-3" />
                <div className="flex justify-between mt-4">
                  <div className="text-center">
                    <div className="text-lg font-bold text-green-600">{score}</div>
                    <div className="text-sm text-gray-600">Correct</div>
                  </div>
                  <div className="text-center">
                    <div className="text-lg font-bold text-blue-600">{answeredQuestions.filter(Boolean).length}</div>
                    <div className="text-sm text-gray-600">Answered</div>
                  </div>
                  <div className="text-center">
                    <div className="text-lg font-bold text-orange-600">{currentQ.difficulty}</div>
                    <div className="text-sm text-gray-600">Difficulty</div>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Question Card */}
            <Card className="mb-6 bg-white/70 backdrop-blur">
              <CardHeader>
                <div className="flex items-center justify-between">
                  <Badge variant="secondary">{currentQ.domain}</Badge>
                  <Badge variant="outline">{currentQ.difficulty}</Badge>
                </div>
                <CardTitle className="text-lg leading-relaxed">
                  {currentQ.question}
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {currentQ.options.map((option, index) => (
                    <button
                      key={index}
                      onClick={() => handleAnswerSelect(index)}
                      disabled={showFeedback}
                      className={`w-full p-4 text-left rounded-lg border-2 transition-all ${
                        selectedAnswer === index
                          ? showFeedback
                            ? index === currentQ.correctAnswer
                              ? 'border-green-500 bg-green-50 text-green-900'
                              : 'border-red-500 bg-red-50 text-red-900'
                            : 'border-blue-500 bg-blue-50 text-blue-900'
                          : showFeedback && index === currentQ.correctAnswer
                          ? 'border-green-500 bg-green-50 text-green-900'
                          : 'border-gray-200 bg-white hover:border-gray-300 hover:bg-gray-50'
                      }`}
                    >
                      <div className="flex items-center justify-between">
                        <span>{option}</span>
                        {showFeedback && index === currentQ.correctAnswer && (
                          <CheckCircle className="h-5 w-5 text-green-600" />
                        )}
                        {showFeedback && selectedAnswer === index && index !== currentQ.correctAnswer && (
                          <XCircle className="h-5 w-5 text-red-600" />
                        )}
                      </div>
                    </button>
                  ))}
                </div>

                {showFeedback && (
                  <div className="mt-6 p-4 bg-blue-50 rounded-lg border border-blue-200">
                    <h4 className="font-medium text-blue-900 mb-2">Explanation:</h4>
                    <p className="text-blue-800">{currentQ.explanation}</p>
                  </div>
                )}

                <div className="mt-6 flex justify-between">
                  {!showFeedback ? (
                    <Button 
                      onClick={handleSubmitAnswer}
                      disabled={selectedAnswer === null}
                      className="ml-auto"
                    >
                      Submit Answer
                    </Button>
                  ) : (
                    <Button 
                      onClick={handleNextQuestion}
                      disabled={currentQuestion === totalQuestions - 1}
                      className="ml-auto"
                    >
                      {currentQuestion === totalQuestions - 1 ? 'Complete Quiz' : 'Next Question'}
                    </Button>
                  )}
                </div>
              </CardContent>
            </Card>
          </div>
        ) : (
          /* Quiz Complete */
          <div className="max-w-2xl mx-auto text-center">
            <Card className="bg-white/70 backdrop-blur">
              <CardHeader>
                <Target className="h-16 w-16 text-green-600 mx-auto mb-4" />
                <CardTitle className="text-2xl">Practice Session Complete!</CardTitle>
                <CardDescription>Great work on completing the hardware foundations practice</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-3 gap-4 mb-6">
                  <div className="text-center p-4 bg-green-50 rounded-lg">
                    <div className="text-3xl font-bold text-green-600">{score}</div>
                    <div className="text-sm text-gray-600">Correct</div>
                  </div>
                  <div className="text-center p-4 bg-blue-50 rounded-lg">
                    <div className="text-3xl font-bold text-blue-600">{Math.round((score / totalQuestions) * 100)}%</div>
                    <div className="text-sm text-gray-600">Score</div>
                  </div>
                  <div className="text-center p-4 bg-purple-50 rounded-lg">
                    <div className="text-3xl font-bold text-purple-600">{totalQuestions}</div>
                    <div className="text-sm text-gray-600">Total</div>
                  </div>
                </div>
                
                <div className="space-y-3">
                  <Button onClick={handleRestartQuiz} className="w-full">
                    <RotateCcw className="mr-2 h-4 w-4" />
                    Practice Again
                  </Button>
                  <Link to="/flashcards" className="block">
                    <Button variant="outline" className="w-full">
                      Study with Flashcards
                    </Button>
                  </Link>
                  <Link to="/" className="block">
                    <Button variant="ghost" className="w-full">
                      Return to Dashboard
                    </Button>
                  </Link>
                </div>
              </CardContent>
            </Card>
          </div>
        )}
      </div>
    </div>
  );
};

export default Practice;
