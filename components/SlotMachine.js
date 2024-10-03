"use client";

import { useState, useEffect } from "react";
import { Button } from "./ui/Button";
import Confetti from "react-confetti";

// const symbols = ["7", "BAR", "🍒", "💎", "🍋", "🔔"];
const symbols = ["7", "BAR", "🍒", "💎", "🍋", "🔔"];

export default function SlotMachine() {
  const [reels, setReels] = useState(["7", "7", "7"]);
  const [spinning, setSpinning] = useState(false);
  const [credits, setCredits] = useState(100);
  const [win, setWin] = useState(0);
  const [showConfetti, setShowConfetti] = useState(false);

  const spin = () => {
    if (credits < 10) return;
    setCredits((prev) => prev - 10);
    setSpinning(true);
    setWin(0);
    setShowConfetti(false);

    const newReels = reels.map(
      () => symbols[Math.floor(Math.random() * symbols.length)]
    );

    setTimeout(() => {
      setReels(newReels);
      setSpinning(false);
      checkWin(newReels);
    }, 2000);
  };

  const checkWin = (newReels) => {
    if (newReels[0] === newReels[1] && newReels[1] === newReels[2]) {
      const winAmount = newReels[0] === "7" ? 1000 : 500;
      setCredits((prev) => prev + winAmount);
      setWin(winAmount);
      setShowConfetti(true); // Show confetti on win
    }
  };

  useEffect(() => {
    const interval = setInterval(() => {
      if (spinning) {
        setReels(
          reels.map(() => symbols[Math.floor(Math.random() * symbols.length)])
        );
      }
    }, 100);
    return () => clearInterval(interval);
  }, [spinning, reels]);

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-b from-purple-900 to-black p-4">
      {showConfetti && <Confetti />}
      <div className="w-full max-w-md bg-gray-800 rounded-lg shadow-lg overflow-hidden">
        <div className="bg-gradient-to-r from-green-400 to-blue-500 p-1">
          <div className="bg-gray-900 p-4">
            <div className="flex justify-between mb-4">
              <div className="text-white">Credits: {credits}</div>
              <div className="text-yellow-400">Win: {win}</div>
            </div>
            <div className="flex justify-center space-x-2 mb-4">
              {reels.map((symbol, index) => (
                <div
                  key={index}
                  className="w-20 h-20 bg-white rounded-lg flex items-center justify-center text-4xl shadow-inner"
                >
                  {symbol}
                </div>
              ))}
            </div>
            <Button
              onClick={spin}
              disabled={spinning || credits < 10}
              className="w-full bg-red-600 hover:bg-red-700 text-white font-bold py-2 px-4 rounded transition duration-200 ease-in-out transform hover:scale-105"
            >
              {spinning ? "Spinning..." : "Spin (10 credits)"}
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
