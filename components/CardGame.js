"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Loader2, Trophy, Clock, Star, XCircle } from "lucide-react";
import { Button } from "./ui/cardgame/button";
import { Input } from "./ui/cardgame/Input";
import { Card } from "./ui/cardgame/Card";
import { CardContent } from "./ui/cardgame/CardContent";
import { Progress } from "./ui/cardgame/Progress";

const generateCards = (level) => {
  // Limit the max number of pairs to 6, leading to a maximum of 12 cards
  const numPairs = Math.min(level + 1, 6);
  const emojis = ["🍎", "🍌", "🍒", "🍓", "🍊", "🍋", "🍉", "🍇", "🍍", "🥝"];
  const cards = [];
  for (let i = 0; i < numPairs; i++) {
    cards.push(emojis[i], emojis[i]);
  }
  return cards.sort(() => Math.random() - 0.5);
};

export default function MindFlip() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [playerName, setPlayerName] = useState("");
  const [level, setLevel] = useState(0);
  const [cards, setCards] = useState([]);
  const [flipped, setFlipped] = useState([]);
  const [matched, setMatched] = useState([]);
  const [score, setScore] = useState(0);
  const [highScore, setHighScore] = useState(0);
  const [isGameOver, setIsGameOver] = useState(false);
  const [leaderboard, setLeaderboard] = useState([]);
  const [wrongMatches, setWrongMatches] = useState(0);
  const [timer, setTimer] = useState(30);
  const [showAllCards, setShowAllCards] = useState(true);
  const [gameStarted, setGameStarted] = useState(false); // New state for tracking game start

  useEffect(() => {
    if (showAllCards) {
      const timerId = setTimeout(() => {
        setShowAllCards(false);
      }, 3000);
      return () => clearTimeout(timerId);
    }
  }, [showAllCards]);

  useEffect(() => {
    if (flipped.length === 2) {
      if (cards[flipped[0]] === cards[flipped[1]]) {
        setMatched((prev) => [...prev, ...flipped]);
        setScore((prev) => prev + 10 * level);
        setFlipped([]);
      } else {
        setWrongMatches((prev) => prev + 1);
        setTimeout(() => setFlipped([]), 1000);
      }
    }
  }, [flipped, cards, level]);

  useEffect(() => {
    if (wrongMatches >= 3) {
      restartGame();
    }
  }, [wrongMatches]);

  useEffect(() => {
    if (matched.length === cards.length) {
      nextLevel();
    }
  }, [matched, cards.length]);

  useEffect(() => {
    if (gameStarted && timer > 0) {
      const timerId = setInterval(() => {
        setTimer((prev) => prev - 1);
      }, 1000);
      return () => clearInterval(timerId);
    } else if (timer === 0) {
      restartGame();
    }
  }, [timer, gameStarted]);

  const handleCardClick = (index) => {
    if (
      flipped.length < 2 &&
      !flipped.includes(index) &&
      !matched.includes(index) &&
      !showAllCards
    ) {
      setFlipped((prev) => [...prev, index]);
    }
  };

  const startGame = () => {
    setLevel(1); // Ensure the level starts at 1
    setGameStarted(true); // Set gameStarted to true
    setCards(generateCards(1)); // Generate initial cards for level 1
    setShowAllCards(true); // Show all cards initially
    setTimer(30); // Reset the timer
  };

  const nextLevel = () => {
    const nextLevel = level + 1;
    setLevel(nextLevel);

    // Decrease the timer as levels increase, but ensure it's at least 10 seconds
    const newTimer = Math.max(30 - nextLevel * 2, 10);

    setCards(generateCards(nextLevel));
    setFlipped([]);
    setMatched([]);
    setWrongMatches(0);
    setTimer(newTimer); // Use the updated timer
    setShowAllCards(true);
  };

  const restartGame = () => {
    if (score > highScore) {
      setHighScore(score);
      updateLeaderboard(playerName, score);
    }
    setLevel(1);
    setCards(generateCards(1));
    setFlipped([]);
    setMatched([]);
    setScore(0);
    setIsGameOver(false);
    setWrongMatches(0);
    setTimer(30);
    setShowAllCards(true);
    setGameStarted(false); // Reset gameStarted for a fresh start
  };

  const updateLeaderboard = (name, score) => {
    const newLeaderboard = [...leaderboard, { name, highScore: score }]
      .sort((a, b) => b.highScore - a.highScore)
      .slice(0, 5);
    setLeaderboard(newLeaderboard);
  };

  const handleLogin = (e) => {
    e.preventDefault();
    if (playerName.trim()) {
      setIsLoggedIn(true);
    }
  };

  if (!isLoggedIn) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-gradient-to-r from-purple-400 via-pink-500 to-red-500">
        <Card className="w-96 p-6 bg-white rounded-lg shadow-xl">
          <h1 className="text-3xl font-bold text-center mb-6">MindFlip</h1>
          <form onSubmit={handleLogin} className="space-y-4">
            <Input
              type="text"
              placeholder="Enter your name"
              value={playerName}
              onChange={(e) => setPlayerName(e.target.value)}
              className="w-full px-3 py-2 border rounded-md"
            />
            <Button type="submit" className="w-full">
              Start Game
            </Button>
          </form>
        </Card>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-r from-purple-400 via-pink-500 to-red-500 p-8">
      <div className="max-w-4xl mx-auto bg-white rounded-lg shadow-xl p-8">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-3xl font-bold">MindFlip: Level {level}</h1>
          <div className="flex items-center space-x-4">
            <div className="flex items-center">
              <Star className="w-5 h-5 text-yellow-400 mr-1" />
              <span className="text-xl font-semibold">{score}</span>
            </div>
            <div className="flex items-center">
              <Trophy className="w-5 h-5 text-yellow-600 mr-1" />
              <span className="text-xl font-semibold">{highScore}</span>
            </div>
            <div className="flex items-center">
              <Clock className="w-5 h-5 text-blue-500 mr-1" />
              <span className="text-xl font-semibold">{timer}s</span>
            </div>
          </div>
        </div>

        {gameStarted ? (
          <>
            <div className="mb-4">
              <Progress value={(timer / 30) * 100} className="h-2" />
            </div>
            <div className="grid grid-cols-4 gap-4 mb-6">
              <AnimatePresence>
                {cards.map((card, index) => (
                  <motion.div
                    key={index}
                    className={`aspect-square rounded-lg shadow-md cursor-pointer flex items-center justify-center text-4xl overflow-hidden
                      ${
                        flipped.includes(index) ||
                        matched.includes(index) ||
                        showAllCards
                          ? "bg-green-200"
                          : "bg-blue-200"
                      }`}
                    onClick={() => handleCardClick(index)}
                    initial={{ rotateY: 0 }}
                    animate={{
                      rotateY:
                        flipped.includes(index) || matched.includes(index)
                          ? 180
                          : 0,
                    }}
                    exit={{ rotateY: 0 }}
                    transition={{ duration: 0.3 }}
                  >
                    <div
                      className={`absolute w-full h-full flex items-center justify-center backface-hidden transition-opacity duration-300 ${
                        flipped.includes(index) ||
                        matched.includes(index) ||
                        showAllCards
                          ? "opacity-100"
                          : "opacity-0"
                      }`}
                    >
                      {card}
                    </div>
                    <div
                      className={`absolute w-full h-full flex items-center justify-center backface-hidden transition-opacity duration-300 ${
                        flipped.includes(index) ||
                        matched.includes(index) ||
                        showAllCards
                          ? "opacity-0"
                          : "opacity-100"
                      }`}
                    >
                      ?
                    </div>
                  </motion.div>
                ))}
              </AnimatePresence>
            </div>
            <div className="flex items-center">
              <XCircle className="w-5 h-5 text-red-500 mr-2" />
              <span className="text-xl font-semibold">{wrongMatches}/3</span>
            </div>
          </>
        ) : (
          <div className="text-center">
            <Button onClick={startGame}>Start Game</Button>
          </div>
        )}

        {isGameOver && (
          <div className="mt-4 text-red-600 text-lg text-center">
            Game Over! You have made 3 wrong matches. Please try again!
          </div>
        )}

        {/* Leaderboard Section */}
      </div>

      <div className="max-w-4xl mx-auto bg-white rounded-lg shadow-xl p-8 mt-7">
        <div>
          <h2 className="text-2xl font-bold mb-4">Score Board</h2>
          <ul className="space-y-2">
            {leaderboard.map((entry, index) => (
              <li key={index} className="flex justify-between">
                <span>{entry.name}</span>
                <span>{entry.highScore}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
}
