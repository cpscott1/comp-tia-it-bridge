
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Badge } from "@/components/ui/badge";
import { ArrowLeft, RotateCcw, CheckCircle, XCircle, RefreshCw } from "lucide-react";
import { Link } from "react-router-dom";

const Flashcards = () => {
  const [currentCard, setCurrentCard] = useState(0);
  const [isFlipped, setIsFlipped] = useState(false);
  const [studiedCards, setStudiedCards] = useState<boolean[]>([]);
  const [correctCards, setCorrectCards] = useState<boolean[]>([]);

  const hardwareFlashcards = [
    {
      id: 1,
      category: "Components",
      difficulty: "Easy",
      front: "What does CPU stand for?",
      back: "Central Processing Unit - The main processor that executes instructions and performs calculations in a computer system."
    },
    {
      id: 2,
      category: "Components", 
      difficulty: "Easy",
      front: "What does RAM stand for?",
      back: "Random Access Memory - Volatile memory that temporarily stores data and programs currently being used by the CPU."
    },
    {
      id: 3,
      category: "Storage",
      difficulty: "Medium",
      front: "What is the difference between SSD and HDD?",
      back: "SSD (Solid State Drive) uses flash memory with no moving parts, offering faster speeds and lower power consumption. HDD (Hard Disk Drive) uses spinning magnetic disks and is typically slower but offers more storage per dollar."
    },
    {
      id: 4,
      category: "Motherboard",
      difficulty: "Medium", 
      front: "What is a motherboard chipset?",
      back: "A group of integrated circuits that manage communication between the CPU, memory, storage, and other peripherals. It consists of the northbridge (memory controller) and southbridge (I/O controller)."
    },
    {
      id: 5,
      category: "Power",
      difficulty: "Easy",
      front: "What does PSU stand for?",
      back: "Power Supply Unit - Converts AC power from the wall outlet to DC power used by computer components, typically providing +3.3V, +5V, and +12V rails."
    }
  ];

  const currentFlashcard = hardwareFlashcards[currentCard];
  const totalCards = hardwareFlashcards.length;
  const progress = studiedCards.filter(Boolean).length / totalCards * 100;
  const correctCount = correctCards.filter(Boolean).length;

  const handleFlip = () => {
    setIsFlipped(!isFlipped);
    if (!isFlipped && !studiedCards[currentCard]) {
      const newStudiedCards = [...studiedCards];
      newStudiedCards[currentCard] = true;
      setStudiedCards(newStudiedCards);
    }
  };

  const handleAnswer = (isCorrect: boolean) => {
    const newCorrectCards = [...correctCards];
    newCorrectCards[currentCard] = isCorrect;
    setCorrectCards(newCorrectCards);
    
    // Auto advance to next card
    setTimeout(() => {
      if (currentCard < totalCards - 1) {
        setCurrentCard(currentCard + 1);
        setIsFlipped(false);
      }
    }, 500);
  };

  const handleNextCard = () => {
    if (currentCard < totalCards - 1) {
      setCurrentCard(currentCard + 1);
      setIsFlipped(false);
    }
  };

  const handlePrevCard = () => {
    if (currentCard > 0) {
      setCurrentCard(currentCard - 1);
      setIsFlipped(false);
    }
  };

  const handleRestart = () => {
    setCurrentCard(0);
    setIsFlipped(false);
    setStudiedCards([]);
    setCorrectCards([]);
  };

  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty) {
      case 'Easy': return 'bg-green-100 text-green-800';
      case 'Medium': return 'bg-yellow-100 text-yellow-800';
      case 'Hard': return 'bg-red-100 text-red-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

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
                <h1 className="text-xl font-bold text-gray-900">Hardware Flashcards</h1>
                <p className="text-sm text-gray-500">Week 1-2 • Key Terms & Concepts</p>
              </div>
            </div>
            <Badge variant="outline" className="bg-blue-50 text-blue-700 border-blue-200">
              Card {currentCard + 1} of {totalCards}
            </Badge>
          </div>
        </div>
      </header>

      <div className="container mx-auto px-4 py-8">
        <div className="max-w-4xl mx-auto">
          {/* Progress Section */}
          <Card className="mb-6 bg-white/70 backdrop-blur">
            <CardContent className="p-6">
              <div className="flex justify-between text-sm text-gray-600 mb-2">
                <span>Study Progress</span>
                <span>{Math.round(progress)}% Complete</span>
              </div>
              <Progress value={progress} className="h-3" />
              <div className="grid grid-cols-3 gap-4 mt-4">
                <div className="text-center p-3 bg-blue-50 rounded-lg">
                  <div className="text-xl font-bold text-blue-600">{studiedCards.filter(Boolean).length}</div>
                  <div className="text-sm text-gray-600">Studied</div>
                </div>
                <div className="text-center p-3 bg-green-50 rounded-lg">
                  <div className="text-xl font-bold text-green-600">{correctCount}</div>
                  <div className="text-sm text-gray-600">Correct</div>
                </div>
                <div className="text-center p-3 bg-gray-50 rounded-lg">
                  <div className="text-xl font-bold text-gray-600">{totalCards - studiedCards.filter(Boolean).length}</div>
                  <div className="text-sm text-gray-600">Remaining</div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Flashcard */}
          <div className="flex justify-center mb-6">
            <div className="relative w-full max-w-2xl h-80">
              <Card 
                className={`absolute inset-0 cursor-pointer transition-transform duration-500 bg-white/70 backdrop-blur ${
                  isFlipped ? 'rotate-y-180' : ''
                }`}
                onClick={handleFlip}
                style={{ transformStyle: 'preserve-3d' }}
              >
                {/* Front of card */}
                <div className={`absolute inset-0 ${isFlipped ? 'opacity-0' : 'opacity-100'} transition-opacity duration-300`}>
                  <CardHeader className="text-center">
                    <div className="flex justify-center space-x-2 mb-3">
                      <Badge variant="secondary">{currentFlashcard.category}</Badge>
                      <Badge className={getDifficultyColor(currentFlashcard.difficulty)}>
                        {currentFlashcard.difficulty}
                      </Badge>
                    </div>
                    <CardTitle className="text-xl">Question</CardTitle>
                    <CardDescription>Click to reveal answer</CardDescription>
                  </CardHeader>
                  <CardContent className="flex items-center justify-center text-center p-8">
                    <h2 className="text-2xl font-medium text-gray-900 leading-relaxed">
                      {currentFlashcard.front}
                    </h2>
                  </CardContent>
                </div>

                {/* Back of card */}
                <div className={`absolute inset-0 ${isFlipped ? 'opacity-100' : 'opacity-0'} transition-opacity duration-300`}>
                  <CardHeader className="text-center">
                    <div className="flex justify-center space-x-2 mb-3">
                      <Badge variant="secondary">{currentFlashcard.category}</Badge>
                      <Badge className={getDifficultyColor(currentFlashcard.difficulty)}>
                        {currentFlashcard.difficulty}
                      </Badge>
                    </div>
                    <CardTitle className="text-xl">Answer</CardTitle>
                    <CardDescription>Did you get it right?</CardDescription>
                  </CardHeader>
                  <CardContent className="flex items-center justify-center text-center p-8">
                    <p className="text-lg text-gray-700 leading-relaxed">
                      {currentFlashcard.back}
                    </p>
                  </CardContent>
                </div>
              </Card>
            </div>
          </div>

          {/* Action Buttons */}
          {isFlipped && (
            <div className="flex justify-center space-x-4 mb-6">
              <Button 
                onClick={() => handleAnswer(false)}
                variant="outline"
                className="border-red-200 text-red-600 hover:bg-red-50"
              >
                <XCircle className="mr-2 h-4 w-4" />
                Need More Practice
              </Button>
              <Button 
                onClick={() => handleAnswer(true)}
                className="bg-green-600 hover:bg-green-700"
              >
                <CheckCircle className="mr-2 h-4 w-4" />
                Got It Right!
              </Button>
            </div>
          )}

          {/* Navigation */}
          <div className="flex justify-between items-center">
            <Button 
              onClick={handlePrevCard}
              disabled={currentCard === 0}
              variant="outline"
            >
              Previous Card
            </Button>

            <div className="flex space-x-2">
              <Button onClick={handleFlip} variant="ghost">
                <RefreshCw className="h-4 w-4 mr-2" />
                Flip Card
              </Button>
              <Button onClick={handleRestart} variant="ghost">
                <RotateCcw className="h-4 w-4 mr-2" />
                Restart
              </Button>
            </div>

            <Button 
              onClick={handleNextCard}
              disabled={currentCard === totalCards - 1}
            >
              Next Card
            </Button>
          </div>

          {/* Completion Message */}
          {studiedCards.filter(Boolean).length === totalCards && (
            <Card className="mt-6 bg-green-50/70 backdrop-blur border-green-200">
              <CardContent className="p-6 text-center">
                <CheckCircle className="h-12 w-12 text-green-600 mx-auto mb-3" />
                <h3 className="text-xl font-bold text-green-900 mb-2">Great Job!</h3>
                <p className="text-green-700 mb-4">
                  You've studied all {totalCards} flashcards. You got {correctCount} correct on first try.
                </p>
                <div className="flex justify-center space-x-3">
                  <Button onClick={handleRestart}>
                    Study Again
                  </Button>
                  <Link to="/practice">
                    <Button variant="outline">
                      Take Practice Quiz
                    </Button>
                  </Link>
                </div>
              </CardContent>
            </Card>
          )}
        </div>
      </div>
    </div>
  );
};

export default Flashcards;
