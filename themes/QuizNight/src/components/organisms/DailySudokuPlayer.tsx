import React, { useState, useEffect } from 'react';
import { cn } from '@lib/utils/cn';

type Cell = {
  value: number;
  isInitial: boolean;
  pencilMarks: Set<number>;
};

type SudokuGrid = Cell[][];

interface LeaderboardEntry {
  name: string;
  score: number;
  time: number;
  mistakes: number;
  date: string;
}

/**
 * DailySudokuPlayer Component - Daily Challenge Sudoku
 *
 * Features:
 * - One puzzle per day (same for everyone)
 * - Score based on time and mistakes
 * - Leaderboard tracking
 * - Can only complete once per day
 */
const DailySudokuPlayer: React.FC = () => {
  const [grid, setGrid] = useState<SudokuGrid>([]);
  const [solution, setSolution] = useState<number[][]>([]);
  const [selectedCell, setSelectedCell] = useState<{row: number, col: number} | null>(null);
  const [pencilMode, setPencilMode] = useState(false);
  const [history, setHistory] = useState<SudokuGrid[]>([]);
  const [historyIndex, setHistoryIndex] = useState(-1);
  const [mistakes, setMistakes] = useState(0);
  const [timeElapsed, setTimeElapsed] = useState(0);
  const [isCompleted, setIsCompleted] = useState(false);
  const [alreadyCompleted, setAlreadyCompleted] = useState(false);
  const [playerName, setPlayerName] = useState('');
  const [showNameInput, setShowNameInput] = useState(false);
  const [leaderboard, setLeaderboard] = useState<LeaderboardEntry[]>([]);

  const todayString = new Date().toISOString().split('T')[0];

  // Check if already completed today
  useEffect(() => {
    const completed = localStorage.getItem(`sudoku-daily-${todayString}`);
    if (completed) {
      setAlreadyCompleted(true);
      const savedData = JSON.parse(completed);
      setTimeElapsed(savedData.time);
      setMistakes(savedData.mistakes);
      setIsCompleted(true);
    } else {
      generateDailyPuzzle();
    }
    loadLeaderboard();
  }, []);

  // Timer
  useEffect(() => {
    if (isCompleted || alreadyCompleted) return;

    const timer = setInterval(() => {
      setTimeElapsed(prev => prev + 1);
    }, 1000);

    return () => clearInterval(timer);
  }, [isCompleted, alreadyCompleted]);

  // Format time as MM:SS
  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  // Seeded random number generator
  const seededRandom = (seed: number) => {
    let state = seed;
    return () => {
      state = (state * 1103515245 + 12345) & 0x7fffffff;
      return state / 0x7fffffff;
    };
  };

  // Get today's seed from date
  const getTodaySeed = () => {
    const date = new Date();
    return date.getFullYear() * 10000 + (date.getMonth() + 1) * 100 + date.getDate();
  };

  // Shuffle array with seed
  const seededShuffle = (array: number[], random: () => number) => {
    const newArray = [...array];
    for (let i = newArray.length - 1; i > 0; i--) {
      const j = Math.floor(random() * (i + 1));
      [newArray[i], newArray[j]] = [newArray[j], newArray[i]];
    }
    return newArray;
  };

  // Check if number is valid in position
  const isValidMove = (board: number[][], row: number, col: number, num: number): boolean => {
    for (let x = 0; x < 9; x++) {
      if (board[row][x] === num) return false;
    }
    for (let x = 0; x < 9; x++) {
      if (board[x][col] === num) return false;
    }
    const boxRow = Math.floor(row / 3) * 3;
    const boxCol = Math.floor(col / 3) * 3;
    for (let i = 0; i < 3; i++) {
      for (let j = 0; j < 3; j++) {
        if (board[boxRow + i][boxCol + j] === num) return false;
      }
    }
    return true;
  };

  // Solve sudoku with seeded randomness
  const solveSudoku = (board: number[][], random: () => number): boolean => {
    for (let row = 0; row < 9; row++) {
      for (let col = 0; col < 9; col++) {
        if (board[row][col] === 0) {
          const numbers = seededShuffle([1, 2, 3, 4, 5, 6, 7, 8, 9], random);
          for (const num of numbers) {
            if (isValidMove(board, row, col, num)) {
              board[row][col] = num;
              if (solveSudoku(board, random)) {
                return true;
              }
              board[row][col] = 0;
            }
          }
          return false;
        }
      }
    }
    return true;
  };

  // Generate daily puzzle (same for everyone today)
  const generateDailyPuzzle = () => {
    const seed = getTodaySeed();
    const random = seededRandom(seed);

    // Generate solution
    const board: number[][] = Array(9).fill(0).map(() => Array(9).fill(0));
    solveSudoku(board, random);

    // Create puzzle (medium difficulty for daily challenge)
    const puzzle = board.map(row => [...row]);
    const cellsToRemove = 50; // Medium difficulty

    let removed = 0;
    while (removed < cellsToRemove) {
      const row = Math.floor(random() * 9);
      const col = Math.floor(random() * 9);
      if (puzzle[row][col] !== 0) {
        puzzle[row][col] = 0;
        removed++;
      }
    }

    const initialGrid: SudokuGrid = puzzle.map(row =>
      row.map(value => ({
        value,
        isInitial: value !== 0,
        pencilMarks: new Set<number>()
      }))
    );

    setGrid(initialGrid);
    setSolution(board);
    setHistory([initialGrid]);
    setHistoryIndex(0);
    setMistakes(0);
    setTimeElapsed(0);
    setIsCompleted(false);
  };

  // Calculate score (lower is better)
  const calculateScore = () => {
    // Score = time in seconds + (mistakes * 30)
    return timeElapsed + (mistakes * 30);
  };

  // Load leaderboard from localStorage
  const loadLeaderboard = () => {
    const saved = localStorage.getItem(`sudoku-leaderboard-${todayString}`);
    if (saved) {
      setLeaderboard(JSON.parse(saved));
    }
  };

  // Save to leaderboard
  const saveToLeaderboard = (name: string) => {
    const score = calculateScore();
    const entry: LeaderboardEntry = {
      name,
      score,
      time: timeElapsed,
      mistakes,
      date: todayString
    };

    const saved = localStorage.getItem(`sudoku-leaderboard-${todayString}`);
    let currentLeaderboard: LeaderboardEntry[] = saved ? JSON.parse(saved) : [];
    currentLeaderboard.push(entry);
    currentLeaderboard.sort((a, b) => a.score - b.score);
    currentLeaderboard = currentLeaderboard.slice(0, 100); // Keep top 100

    localStorage.setItem(`sudoku-leaderboard-${todayString}`, JSON.stringify(currentLeaderboard));
    setLeaderboard(currentLeaderboard);

    // Save completion
    localStorage.setItem(`sudoku-daily-${todayString}`, JSON.stringify({
      time: timeElapsed,
      mistakes,
      score,
      name
    }));
  };

  // Check if puzzle is complete
  const checkCompletion = (currentGrid: SudokuGrid) => {
    for (let row = 0; row < 9; row++) {
      for (let col = 0; col < 9; col++) {
        if (currentGrid[row][col].value === 0 ||
            currentGrid[row][col].value !== solution[row][col]) {
          return false;
        }
      }
    }
    return true;
  };

  // Handle cell value change
  const handleCellChange = (row: number, col: number, value: number) => {
    if (grid[row][col].isInitial || isCompleted) return;

    const newGrid = grid.map(r => r.map(c => ({...c, pencilMarks: new Set(c.pencilMarks)})));

    if (pencilMode && value !== 0) {
      if (newGrid[row][col].pencilMarks.has(value)) {
        newGrid[row][col].pencilMarks.delete(value);
      } else {
        newGrid[row][col].pencilMarks.add(value);
      }
    } else {
      newGrid[row][col].value = value;
      newGrid[row][col].pencilMarks.clear();

      if (value !== 0 && value !== solution[row][col]) {
        setMistakes(prev => prev + 1);
      }
    }

    const newHistory = history.slice(0, historyIndex + 1);
    newHistory.push(newGrid);
    setHistory(newHistory);
    setHistoryIndex(newHistory.length - 1);

    setGrid(newGrid);

    if (checkCompletion(newGrid)) {
      setIsCompleted(true);
      setShowNameInput(true);
    }
  };

  // Undo
  const handleUndo = () => {
    if (historyIndex > 0) {
      setHistoryIndex(historyIndex - 1);
      setGrid(history[historyIndex - 1]);
    }
  };

  // Check if cell has conflicts
  const hasConflict = (row: number, col: number): boolean => {
    if (grid[row][col].value === 0) return false;

    const value = grid[row][col].value;

    for (let c = 0; c < 9; c++) {
      if (c !== col && grid[row][c].value === value) return true;
    }

    for (let r = 0; r < 9; r++) {
      if (r !== row && grid[r][col].value === value) return true;
    }

    const boxRow = Math.floor(row / 3) * 3;
    const boxCol = Math.floor(col / 3) * 3;
    for (let r = boxRow; r < boxRow + 3; r++) {
      for (let c = boxCol; c < boxCol + 3; c++) {
        if ((r !== row || c !== col) && grid[r][c].value === value) return true;
      }
    }

    return false;
  };

  // Submit score
  const handleSubmitScore = () => {
    if (playerName.trim()) {
      saveToLeaderboard(playerName.trim());
      setShowNameInput(false);
    }
  };

  // Already completed view
  if (alreadyCompleted) {
    return (
      <div className="max-w-4xl mx-auto">
        <div className="bg-white rounded-2xl shadow-xl p-8 sm:p-12 text-center">
          <div className="text-6xl mb-6">✅</div>
          <h2 className="text-3xl sm:text-4xl font-display font-bold text-dark-900 mb-4">
            Daily Challenge Completed!
          </h2>
          <p className="text-lg text-dark-600 mb-8">
            You've already completed today's challenge. Come back tomorrow for a new puzzle!
          </p>

          <div className="grid grid-cols-2 gap-4 max-w-md mx-auto mb-8">
            <div className="bg-primary-50 rounded-xl p-4">
              <p className="text-sm text-dark-600 mb-1">Your Time</p>
              <p className="text-2xl font-bold text-primary-600">{formatTime(timeElapsed)}</p>
            </div>
            <div className="bg-red-50 rounded-xl p-4">
              <p className="text-sm text-dark-600 mb-1">Mistakes</p>
              <p className="text-2xl font-bold text-red-600">{mistakes}</p>
            </div>
          </div>

          {leaderboard.length > 0 && (
            <div className="mt-8">
              <h3 className="text-2xl font-bold mb-4">Today's Leaderboard</h3>
              <div className="bg-dark-50 rounded-xl p-6 max-w-2xl mx-auto">
                {leaderboard.slice(0, 10).map((entry, index) => (
                  <div key={index} className="flex items-center justify-between py-3 border-b border-dark-200 last:border-0">
                    <div className="flex items-center gap-4">
                      <span className={cn(
                        "text-2xl font-bold w-8",
                        index === 0 && "text-yellow-500",
                        index === 1 && "text-gray-400",
                        index === 2 && "text-orange-600"
                      )}>
                        {index + 1}
                      </span>
                      <span className="font-semibold text-dark-900">{entry.name}</span>
                    </div>
                    <div className="text-right">
                      <p className="text-sm text-dark-600">{formatTime(entry.time)}</p>
                      <p className="text-xs text-red-600">{entry.mistakes} mistakes</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          <div className="mt-8">
            <a
              href="/sudoku"
              className="px-8 py-4 bg-primary-600 hover:bg-primary-700 text-white font-bold rounded-xl transition-all inline-block"
            >
              Play Random Sudoku
            </a>
          </div>
        </div>
      </div>
    );
  }

  // Completion with name input
  if (isCompleted && showNameInput) {
    return (
      <div className="max-w-2xl mx-auto">
        <div className="bg-white rounded-2xl shadow-xl p-8 sm:p-12 text-center">
          <div className="text-6xl mb-6">🎉</div>
          <h2 className="text-3xl sm:text-4xl font-display font-bold text-dark-900 mb-4">
            Congratulations!
          </h2>
          <p className="text-xl text-dark-600 mb-8">
            You completed today's daily challenge!
          </p>

          <div className="grid grid-cols-3 gap-4 mb-8">
            <div className="bg-primary-50 rounded-xl p-4">
              <p className="text-3xl font-bold text-primary-600">⏱️</p>
              <p className="text-lg font-semibold text-dark-900">{formatTime(timeElapsed)}</p>
              <p className="text-xs text-dark-600">Time</p>
            </div>
            <div className="bg-red-50 rounded-xl p-4">
              <p className="text-3xl font-bold text-red-600">❌</p>
              <p className="text-lg font-semibold text-dark-900">{mistakes}</p>
              <p className="text-xs text-dark-600">Mistakes</p>
            </div>
            <div className="bg-accent-50 rounded-xl p-4">
              <p className="text-3xl font-bold text-accent-600">🏆</p>
              <p className="text-lg font-semibold text-dark-900">{calculateScore()}</p>
              <p className="text-xs text-dark-600">Score</p>
            </div>
          </div>

          <div className="mb-6">
            <label className="block text-left font-semibold text-dark-900 mb-2">
              Enter your name for the leaderboard:
            </label>
            <input
              type="text"
              value={playerName}
              onChange={(e) => setPlayerName(e.target.value)}
              onKeyPress={(e) => e.key === 'Enter' && handleSubmitScore()}
              placeholder="Your name"
              maxLength={20}
              className="w-full px-4 py-3 border-2 border-dark-200 rounded-lg focus:border-primary-500 focus:outline-none"
            />
          </div>

          <button
            onClick={handleSubmitScore}
            disabled={!playerName.trim()}
            className="w-full px-8 py-4 bg-primary-600 hover:bg-primary-700 text-white font-bold rounded-xl transition-all disabled:opacity-50 disabled:cursor-not-allowed"
          >
            Submit Score
          </button>
        </div>
      </div>
    );
  }

  // Completion with leaderboard
  if (isCompleted && !showNameInput) {
    return (
      <div className="max-w-4xl mx-auto">
        <div className="bg-white rounded-2xl shadow-xl p-8 sm:p-12">
          <div className="text-center mb-8">
            <div className="text-6xl mb-4">🏆</div>
            <h2 className="text-3xl font-bold text-dark-900 mb-2">Score Submitted!</h2>
            <p className="text-dark-600">Come back tomorrow for a new challenge</p>
          </div>

          {leaderboard.length > 0 && (
            <div>
              <h3 className="text-2xl font-bold mb-6 text-center">Today's Leaderboard</h3>
              <div className="bg-dark-50 rounded-xl p-6">
                {leaderboard.slice(0, 10).map((entry, index) => (
                  <div key={index} className="flex items-center justify-between py-3 border-b border-dark-200 last:border-0">
                    <div className="flex items-center gap-4">
                      <span className={cn(
                        "text-2xl font-bold w-8",
                        index === 0 && "text-yellow-500",
                        index === 1 && "text-gray-400",
                        index === 2 && "text-orange-600"
                      )}>
                        {index + 1}
                      </span>
                      <span className="font-semibold text-dark-900">{entry.name}</span>
                    </div>
                    <div className="text-right">
                      <p className="text-sm font-bold text-primary-600">{entry.score} pts</p>
                      <p className="text-xs text-dark-600">{formatTime(entry.time)} • {entry.mistakes} errors</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          <div className="mt-8 text-center">
            <a
              href="/sudoku"
              className="px-8 py-4 bg-primary-600 hover:bg-primary-700 text-white font-bold rounded-xl transition-all inline-block"
            >
              Play Random Sudoku
            </a>
          </div>
        </div>
      </div>
    );
  }

  // Main game view
  return (
    <div className="max-w-4xl mx-auto">
      {/* Daily Challenge Info */}
      <div className="bg-gradient-to-r from-yellow-100 to-orange-100 rounded-2xl p-6 mb-6 border-2 border-yellow-400">
        <div className="flex items-center justify-between">
          <div>
            <h3 className="text-xl font-bold text-dark-900 mb-1">🏆 Daily Challenge</h3>
            <p className="text-sm text-dark-600">{new Date().toLocaleDateString('en-US', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })}</p>
          </div>
          <div className="text-right">
            <p className="text-sm text-dark-600 mb-1">Your Score</p>
            <p className="text-2xl font-bold text-orange-600">{calculateScore()} pts</p>
          </div>
        </div>
      </div>

      {/* Sudoku Grid with Stats */}
      <div className="bg-white rounded-2xl shadow-xl p-4 sm:p-8 mb-6 relative">
        {/* Time and Mistakes - Top Right */}
        <div className="absolute top-4 right-4 sm:top-8 sm:right-8 flex flex-col gap-2 text-right z-20">
          <div className="bg-dark-100 px-3 py-2 rounded-lg">
            <p className="text-xs text-dark-600">⏱️ Time</p>
            <p className="text-lg font-bold text-dark-900">{formatTime(timeElapsed)}</p>
          </div>
          <div className="bg-red-100 px-3 py-2 rounded-lg">
            <p className="text-xs text-dark-600">❌ Errors</p>
            <p className="text-lg font-bold text-red-900">{mistakes}</p>
          </div>
        </div>

        <div className="aspect-square max-w-xl mx-auto">
          <div className="grid grid-cols-9 gap-0 border-4 border-dark-900 bg-dark-900">
            {grid.map((row, rowIndex) =>
              row.map((cell, colIndex) => {
                const isSelected = selectedCell?.row === rowIndex && selectedCell?.col === colIndex;
                const isInBox = selectedCell &&
                  Math.floor(selectedCell.row / 3) === Math.floor(rowIndex / 3) &&
                  Math.floor(selectedCell.col / 3) === Math.floor(colIndex / 3);
                const isInRowOrCol = selectedCell &&
                  (selectedCell.row === rowIndex || selectedCell.col === colIndex);
                const hasError = hasConflict(rowIndex, colIndex);

                return (
                  <button
                    key={`${rowIndex}-${colIndex}`}
                    onClick={() => setSelectedCell({row: rowIndex, col: colIndex})}
                    className={cn(
                      "aspect-square border border-dark-200 flex items-center justify-center font-bold text-lg sm:text-xl transition-colors relative",
                      cell.isInitial ? "bg-dark-100 text-dark-900" : "bg-white text-primary-600 hover:bg-primary-50",
                      isSelected && "ring-4 ring-primary-500 ring-inset z-10",
                      isInBox && !isSelected && "bg-primary-50",
                      isInRowOrCol && !isSelected && !isInBox && "bg-secondary-50",
                      hasError && "bg-red-100 text-red-700",
                      colIndex % 3 === 2 && colIndex !== 8 && "border-r-2 border-r-dark-900",
                      rowIndex % 3 === 2 && rowIndex !== 8 && "border-b-2 border-b-dark-900"
                    )}
                  >
                    {cell.value !== 0 ? cell.value : (
                      cell.pencilMarks.size > 0 && (
                        <div className="grid grid-cols-3 gap-0 absolute inset-0 p-0.5 text-[6px] sm:text-[8px] text-dark-400 leading-none">
                          {[1,2,3,4,5,6,7,8,9].map(num => (
                            <span key={num} className="flex items-center justify-center h-full">
                              {cell.pencilMarks.has(num) ? num : ''}
                            </span>
                          ))}
                        </div>
                      )
                    )}
                  </button>
                );
              })
            )}
          </div>
        </div>
      </div>

      {/* Controls */}
      <div className="bg-white rounded-2xl shadow-lg p-6 mb-6">
        {/* Number Pad */}
        <div className="grid grid-cols-9 gap-2 mb-6">
          {[1,2,3,4,5,6,7,8,9].map(num => (
            <button
              key={num}
              onClick={() => selectedCell && handleCellChange(selectedCell.row, selectedCell.col, num)}
              disabled={!selectedCell || grid[selectedCell.row][selectedCell.col].isInitial}
              className="aspect-square bg-gradient-to-br from-primary-100 to-secondary-100 hover:from-primary-200 hover:to-secondary-200 text-dark-900 font-bold text-xl rounded-lg transition-all disabled:opacity-50 disabled:cursor-not-allowed shadow hover:shadow-lg"
            >
              {num}
            </button>
          ))}
        </div>

        {/* Action Buttons */}
        <div className="grid grid-cols-3 gap-3">
          <button
            onClick={() => selectedCell && handleCellChange(selectedCell.row, selectedCell.col, 0)}
            disabled={!selectedCell || grid[selectedCell?.row][selectedCell?.col].isInitial}
            className="px-4 py-3 bg-dark-100 hover:bg-dark-200 text-dark-900 font-semibold rounded-lg transition-all disabled:opacity-50"
          >
            ❌ Clear
          </button>
          <button
            onClick={() => setPencilMode(!pencilMode)}
            className={cn(
              "px-4 py-3 font-semibold rounded-lg transition-all",
              pencilMode
                ? "bg-accent-600 text-white"
                : "bg-dark-100 hover:bg-dark-200 text-dark-900"
            )}
          >
            ✏️ Notes
          </button>
          <button
            onClick={handleUndo}
            disabled={historyIndex <= 0}
            className="px-4 py-3 bg-dark-100 hover:bg-dark-200 text-dark-900 font-semibold rounded-lg transition-all disabled:opacity-50"
          >
            ↩️ Undo
          </button>
        </div>
      </div>
    </div>
  );
};

export default DailySudokuPlayer;
