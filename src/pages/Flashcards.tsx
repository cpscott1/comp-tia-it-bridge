
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Badge } from "@/components/ui/badge";
import { ArrowLeft, RotateCcw, CheckCircle, XCircle, RefreshCw, BookOpen } from "lucide-react";
import { Link } from "react-router-dom";
import { useFlashcards } from "@/hooks/useFlashcards";
import { useQuizTopics, QuizTopic } from "@/hooks/usePracticeQuestions";
import { TopicSelector } from "@/components/TopicSelector";

const Flashcards = () => {
  const [selectedTopic, setSelectedTopic] = useState<QuizTopic | null>(null);
  const [currentCard, setCurrentCard] = useState(0);
  const [isFlipped, setIsFlipped] = useState(false);
  const [studiedCards, setStudiedCards] = useState<boolean[]>([]);
  const [correctCards, setCorrectCards] = useState<boolean[]>([]);
  const [showCompletion, setShowCompletion] = useState(false);

  const { data: topics = [], isLoading: topicsLoading } = useQuizTopics();
  const { data: flashcards = [], isLoading: flashcardsLoading } = useFlashcards(selectedTopic?.id);

  const currentFlashcard = flashcards[currentCard];
  const totalCards = flashcards.length;
  const studiedCount = studiedCards.filter(Boolean).length;
  const progress = studiedCount / totalCards * 100;
  const correctCount = correctCards.filter(Boolean).length;

  // Check if all cards have been studied
  const allCardsStudied = studiedCount === totalCards && totalCards > 0;

  const handleTopicSelect = (topic: QuizTopic) => {
    setSelectedTopic(topic);
    setCurrentCard(0);
    setIsFlipped(false);
    setStudiedCards([]);
    setCorrectCards([]);
    setShowCompletion(false);
  };

  const handleBackToTopics = () => {
    setSelectedTopic(null);
    setCurrentCard(0);
    setIsFlipped(false);
    setStudiedCards([]);
    setCorrectCards([]);
    setShowCompletion(false);
  };

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
    
    // Check if this was the last card to be studied
    const newStudiedCount = studiedCards.filter(Boolean).length;
    if (newStudiedCount === totalCards) {
      setShowCompletion(true);
    } else {
      // Auto advance to next unstudied card or next card
      setTimeout(() => {
        const nextCard = findNextCard();
        if (nextCard !== null) {
          setCurrentCard(nextCard);
          setIsFlipped(false);
        }
      }, 500);
    }
  };

  const findNextCard = () => {
    // Find next unstudied card
    for (let i = currentCard + 1; i < totalCards; i++) {
      if (!studiedCards[i]) return i;
    }
    // If no unstudied cards after current, wrap around
    for (let i = 0; i < currentCard; i++) {
      if (!studiedCards[i]) return i;
    }
    // If all cards studied, just go to next card or stay
    return currentCard < totalCards - 1 ? currentCard + 1 : currentCard;
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
    setShowCompletion(false);
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
              {selectedTopic ? (
                <Button variant="ghost" size="sm" onClick={handleBackToTopics}>
                  <ArrowLeft className="h-4 w-4 mr-2" />
                  Back to Topics
                </Button>
              ) : (
                <Link to="/">
                  <Button variant="ghost" size="sm">
                    <ArrowLeft className="h-4 w-4 mr-2" />
                    Back to Home
                  </Button>
                </Link>
              )}
              <div>
                <h1 className="text-xl font-bold text-gray-900">
                  {selectedTopic ? `${selectedTopic.name} Flashcards` : "CompTIA A+ Flashcards"}
                </h1>
                <p className="text-sm text-gray-500">
                  {selectedTopic 
                    ? selectedTopic.description 
                    : "Choose a topic to start studying with flashcards"
                  }
                </p>
              </div>
            </div>
            {selectedTopic && totalCards > 0 && (
              <Badge variant="outline" className="bg-blue-50 text-blue-700 border-blue-200">
                Card {currentCard + 1} of {totalCards}
              </Badge>
            )}
          </div>
        </div>
      </header>

      <div className="container mx-auto px-4 py-8">
        {!selectedTopic ? (
          /* Topic Selection */
          <div className="max-w-6xl mx-auto">
            <div className="text-center mb-8">
              <BookOpen className="h-16 w-16 text-blue-600 mx-auto mb-4" />
              <h2 className="text-3xl font-bold text-gray-900 mb-2">Choose Your Study Topic</h2>
              <p className="text-gray-600">Select a topic to start studying with flashcards</p>
            </div>
            <TopicSelector 
              topics={topics} 
              onTopicSelect={handleTopicSelect}
              loading={topicsLoading}
            />
          </div>
        ) : flashcardsLoading ? (
          /* Loading State */
          <div className="max-w-4xl mx-auto">
            <Card className="animate-pulse">
              <CardHeader>
                <div className="h-4 bg-gray-200 rounded w-3/4"></div>
                <div className="h-8 bg-gray-200 rounded w-full"></div>
              </CardHeader>
              <CardContent>
                <div className="h-40 bg-gray-200 rounded"></div>
              </CardContent>
            </Card>
          </div>
        ) : totalCards === 0 ? (
          /* No Flashcards Available */
          <div className="max-w-2xl mx-auto text-center">
            <Card>
              <CardContent className="p-8">
                <BookOpen className="h-16 w-16 text-gray-400 mx-auto mb-4" />
                <h3 className="text-xl font-semibold text-gray-900 mb-2">No Flashcards Available</h3>
                <p className="text-gray-600 mb-4">
                  There are currently no flashcards for this topic.
                </p>
                <Button onClick={handleBackToTopics}>
                  Choose Another Topic
                </Button>
              </CardContent>
            </Card>
          </div>
        ) : (
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
                    <div className="text-xl font-bold text-blue-600">{studiedCount}</div>
                    <div className="text-sm text-gray-600">Studied</div>
                  </div>
                  <div className="text-center p-3 bg-green-50 rounded-lg">
                    <div className="text-xl font-bold text-green-600">{correctCount}</div>
                    <div className="text-sm text-gray-600">Correct</div>
                  </div>
                  <div className="text-center p-3 bg-gray-50 rounded-lg">
                    <div className="text-xl font-bold text-gray-600">{totalCards - studiedCount}</div>
                    <div className="text-sm text-gray-600">Remaining</div>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Show completion message if all cards studied */}
            {showCompletion || allCardsStudied ? (
              <Card className="mb-6 bg-green-50/70 backdrop-blur border-green-200">
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
            ) : null}

            {/* Flashcard - always show if we have cards */}
            {currentFlashcard && (
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
                        <CardDescription>Click to reveal explanation</CardDescription>
                      </CardHeader>
                      <CardContent className="flex items-center justify-center text-center p-8">
                        <h2 className="text-lg font-medium text-gray-900 leading-relaxed">
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
                        <CardTitle className="text-xl">Explanation</CardTitle>
                        <CardDescription>Did you understand it?</CardDescription>
                      </CardHeader>
                      <CardContent className="flex items-center justify-center text-center p-8">
                        <p className="text-base text-gray-700 leading-relaxed">
                          {currentFlashcard.back}
                        </p>
                      </CardContent>
                    </div>
                  </Card>
                </div>
              </div>
            )}

            {/* Action Buttons - only show if card is flipped and not completed */}
            {isFlipped && !showCompletion && !allCardsStudied && (
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

            {/* Navigation - always show */}
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
          </div>
        )}
      </div>
    </div>
  );
};

export default Flashcards;
