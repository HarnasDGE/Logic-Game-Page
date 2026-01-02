import React, { useState, useEffect } from 'react';
import { cn } from '@lib/utils/cn';

type Cell = {
  value: number;
  isInitial: boolean;
  pencilMarks: Set<number>;
};

type SudokuGrid = Cell[][];

interface SudokuPlayerProps {
  difficulty: 'easy' | 'medium' | 'hard' | 'expert';
}

/**
 * SudokuPlayer Component - Interactive Sudoku Game
 *
 * Full-featured Sudoku game with:
 * - 9x9 grid gameplay
 * - Pencil marks for notes
 * - Timer and statistics
 * - Hint system
 * - Undo/Redo functionality
 */
const SudokuPlayer: React.FC<SudokuPlayerProps> = ({ difficulty }) => {
  const [grid, setGrid] = useState<SudokuGrid>([]);
  const [solution, setSolution] = useState<number[][]>([]);
  const [selectedCell, setSelectedCell] = useState<{row: number, col: number} | null>(null);
  const [pencilMode, setPencilMode] = useState(false);
  const [history, setHistory] = useState<SudokuGrid[]>([]);
  const [historyIndex, setHistoryIndex] = useState(-1);
  const [mistakes, setMistakes] = useState(0);
  const [hintsUsed, setHintsUsed] = useState(0);
  const [timeElapsed, setTimeElapsed] = useState(0);
  const [isCompleted, setIsCompleted] = useState(false);

  // Hint limits per difficulty
  const maxHints = {
    easy: 7,
    medium: 5,
    hard: 3,
    expert: 2
  }[difficulty];

  // Generate puzzle on mount
  useEffect(() => {
    generatePuzzle();
  }, [difficulty]);

  // Timer
  useEffect(() => {
    if (isCompleted) return;

    const timer = setInterval(() => {
      setTimeElapsed(prev => prev + 1);
    }, 1000);

    return () => clearInterval(timer);
  }, [isCompleted]);

  // Format time as MM:SS
  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  // Generate a new Sudoku puzzle
  const generatePuzzle = () => {
    // Multiple puzzles per difficulty - random selection
    const allPuzzles = {
      easy: [
        {
          puzzle: [[5,3,0,0,7,0,0,0,0],[6,0,0,1,9,5,0,0,0],[0,9,8,0,0,0,0,6,0],[8,0,0,0,6,0,0,0,3],[4,0,0,8,0,3,0,0,1],[7,0,0,0,2,0,0,0,6],[0,6,0,0,0,0,2,8,0],[0,0,0,4,1,9,0,0,5],[0,0,0,0,8,0,0,7,9]],
          solution: [[5,3,4,6,7,8,9,1,2],[6,7,2,1,9,5,3,4,8],[1,9,8,3,4,2,5,6,7],[8,5,9,7,6,1,4,2,3],[4,2,6,8,5,3,7,9,1],[7,1,3,9,2,4,8,5,6],[9,6,1,5,3,7,2,8,4],[2,8,7,4,1,9,6,3,5],[3,4,5,2,8,6,1,7,9]]
        },
        {
          puzzle: [[0,2,0,0,0,0,0,0,0],[0,0,0,6,0,0,0,0,3],[0,7,4,0,8,0,0,0,0],[0,0,0,0,0,3,0,0,2],[0,8,0,0,4,0,0,1,0],[6,0,0,5,0,0,0,0,0],[0,0,0,0,1,0,7,8,0],[5,0,0,0,0,9,0,0,0],[0,0,0,0,0,0,0,4,0]],
          solution: [[1,2,6,4,3,7,9,5,8],[8,9,5,6,2,1,4,7,3],[3,7,4,9,8,5,1,2,6],[4,5,7,1,9,3,8,6,2],[9,8,3,2,4,6,5,1,7],[6,1,2,5,7,8,3,9,4],[2,6,9,3,1,4,7,8,5],[5,4,8,7,6,9,2,3,1],[7,3,1,8,5,2,6,4,9]]
        },
        {
          puzzle: [[0,0,0,2,6,0,7,0,1],[6,8,0,0,7,0,0,9,0],[1,9,0,0,0,4,5,0,0],[8,2,0,1,0,0,0,4,0],[0,0,4,6,0,2,9,0,0],[0,5,0,0,0,3,0,2,8],[0,0,9,3,0,0,0,7,4],[0,4,0,0,5,0,0,3,6],[7,0,3,0,1,8,0,0,0]],
          solution: [[4,3,5,2,6,9,7,8,1],[6,8,2,5,7,1,4,9,3],[1,9,7,8,3,4,5,6,2],[8,2,6,1,9,5,3,4,7],[3,7,4,6,8,2,9,1,5],[9,5,1,7,4,3,6,2,8],[5,1,9,3,2,6,8,7,4],[2,4,8,9,5,7,1,3,6],[7,6,3,4,1,8,2,5,9]]
        }
      ],
      medium: [
        {
          puzzle: [[0,0,0,0,0,0,6,8,0],[0,0,0,0,7,3,0,0,9],[3,0,9,0,0,0,0,4,5],[4,9,0,0,0,0,0,0,0],[8,0,3,0,5,0,9,0,2],[0,0,0,0,0,0,0,3,6],[9,6,0,0,0,0,3,0,8],[7,0,0,6,8,0,0,0,0],[0,2,8,0,0,0,0,0,0]],
          solution: [[1,7,2,5,4,9,6,8,3],[6,4,5,8,7,3,2,1,9],[3,8,9,2,6,1,7,4,5],[4,9,6,3,2,7,8,5,1],[8,1,3,4,5,6,9,7,2],[2,5,7,1,9,8,4,3,6],[9,6,4,7,1,5,3,2,8],[7,3,1,6,8,2,5,9,4],[5,2,8,9,3,4,1,6,7]]
        },
        {
          puzzle: [[0,0,0,6,0,0,4,0,0],[7,0,0,0,0,3,6,0,0],[0,0,0,0,9,1,0,8,0],[0,0,0,0,0,0,0,0,0],[0,5,0,1,8,0,0,0,3],[0,0,0,3,0,6,0,4,5],[0,4,0,2,0,0,0,6,0],[9,0,3,0,0,0,0,0,0],[0,2,0,0,0,0,1,0,0]],
          solution: [[5,8,1,6,7,2,4,3,9],[7,9,2,8,4,3,6,5,1],[3,6,4,5,9,1,7,8,2],[4,3,8,9,5,7,2,1,6],[2,5,6,1,8,4,9,7,3],[1,7,9,3,2,6,8,4,5],[8,4,5,2,3,9,3,6,7],[9,1,3,7,6,5,5,2,4],[6,2,7,4,1,8,1,9,3]]
        },
        {
          puzzle: [[0,0,0,0,0,0,0,0,0],[0,0,0,0,0,3,0,8,5],[0,0,1,0,2,0,0,0,0],[0,0,0,5,0,7,0,0,0],[0,0,4,0,0,0,1,0,0],[0,9,0,0,0,0,0,0,0],[5,0,0,0,0,0,0,7,3],[0,0,2,0,1,0,0,0,0],[0,0,0,0,4,0,0,0,9]],
          solution: [[9,8,7,6,5,4,3,2,1],[2,4,6,1,7,3,9,8,5],[3,5,1,9,2,8,7,4,6],[1,2,8,5,3,7,6,9,4],[6,3,4,8,9,2,1,5,7],[7,9,5,4,6,1,8,3,2],[5,1,9,2,8,6,4,7,3],[4,7,2,3,1,9,5,6,8],[8,6,3,7,4,5,2,1,9]]
        }
      ],
      hard: [
        {
          puzzle: [[0,0,0,0,0,0,0,0,0],[0,0,0,0,0,3,0,8,5],[0,0,1,0,2,0,0,0,0],[0,0,0,5,0,7,0,0,0],[0,0,4,0,0,0,1,0,0],[0,9,0,0,0,0,0,0,0],[5,0,0,0,0,0,0,7,3],[0,0,2,0,1,0,0,0,0],[0,0,0,0,4,0,0,0,9]],
          solution: [[9,8,7,6,5,4,3,2,1],[2,4,6,1,7,3,9,8,5],[3,5,1,9,2,8,7,4,6],[1,2,8,5,3,7,6,9,4],[6,3,4,8,9,2,1,5,7],[7,9,5,4,6,1,8,3,2],[5,1,9,2,8,6,4,7,3],[4,7,2,3,1,9,5,6,8],[8,6,3,7,4,5,2,1,9]]
        },
        {
          puzzle: [[0,0,5,3,0,0,0,0,0],[8,0,0,0,0,0,0,2,0],[0,7,0,0,1,0,5,0,0],[4,0,0,0,0,5,3,0,0],[0,1,0,0,7,0,0,0,6],[0,0,3,2,0,0,0,8,0],[0,6,0,5,0,0,0,0,9],[0,0,4,0,0,0,0,3,0],[0,0,0,0,0,9,7,0,0]],
          solution: [[1,4,5,3,2,7,6,9,8],[8,3,9,6,5,4,1,2,7],[6,7,2,9,1,8,5,4,3],[4,9,6,1,8,5,3,7,2],[2,1,8,4,7,3,9,5,6],[7,5,3,2,9,6,4,8,1],[3,6,7,5,4,2,8,1,9],[9,8,4,7,6,1,2,3,5],[5,2,1,8,3,9,7,6,4]]
        },
        {
          puzzle: [[0,0,0,0,0,0,9,0,7],[0,0,0,0,0,0,0,0,5],[0,0,0,6,0,0,0,0,0],[0,0,0,0,0,1,0,0,0],[5,0,7,2,0,0,0,0,0],[0,0,0,0,0,3,0,4,0],[0,3,0,0,0,2,0,6,0],[0,0,0,0,0,0,4,0,0],[0,0,2,0,0,0,7,0,0]],
          solution: [[6,1,5,4,3,8,9,2,7],[7,4,9,1,2,6,3,8,5],[2,8,3,6,5,7,1,9,4],[3,6,4,5,7,1,8,5,9],[5,9,7,2,8,4,6,1,3],[8,2,1,9,6,3,5,4,7],[1,3,8,7,4,2,9,6,5],[9,7,6,3,1,5,4,2,8],[4,5,2,8,9,6,7,3,1]]
        }
      ],
      expert: [
        {
          puzzle: [[0,0,0,0,0,0,0,1,2],[0,0,0,0,0,0,0,0,3],[0,0,2,3,0,0,4,0,0],[0,0,1,8,0,0,0,0,5],[0,6,0,0,7,0,8,0,0],[0,0,0,0,0,9,0,0,0],[0,0,8,5,0,0,0,0,0],[9,0,0,0,4,0,5,0,0],[4,7,0,0,0,6,0,0,0]],
          solution: [[6,9,3,7,8,4,5,1,2],[7,4,5,6,1,2,9,8,3],[1,8,2,3,5,9,4,6,7],[3,2,1,8,6,7,3,9,5],[5,6,4,2,7,3,8,1,9],[8,3,7,4,5,9,1,2,6],[2,1,8,5,3,7,6,4,9],[9,3,6,1,4,8,5,7,2],[4,7,5,9,2,6,3,8,1]]
        },
        {
          puzzle: [[0,0,0,0,0,0,0,0,0],[0,0,0,0,0,0,1,2,3],[0,0,0,4,5,6,0,0,0],[0,0,7,0,0,0,0,0,0],[0,8,0,0,0,0,0,9,0],[0,0,0,0,0,0,4,0,0],[0,0,0,5,1,2,0,0,0],[5,3,1,0,0,0,0,0,0],[0,0,0,0,0,0,0,0,0]],
          solution: [[1,2,3,6,7,8,9,4,5],[6,5,4,9,3,1,1,2,3],[9,7,8,4,5,6,3,1,2],[3,4,7,8,2,5,6,1,9],[2,8,5,1,6,3,7,9,4],[1,6,9,7,4,9,4,5,8],[7,9,6,5,1,2,8,3,4],[5,3,1,2,8,4,5,6,7],[4,1,2,3,9,7,2,8,6]]
        }
      ]
    };

    // Randomly select a puzzle from the difficulty
    const puzzlesForDifficulty = allPuzzles[difficulty];
    const randomIndex = Math.floor(Math.random() * puzzlesForDifficulty.length);
    const selected = puzzlesForDifficulty[randomIndex];
    const initialGrid: SudokuGrid = selected.puzzle.map(row =>
      row.map(value => ({
        value,
        isInitial: value !== 0,
        pencilMarks: new Set<number>()
      }))
    );

    setGrid(initialGrid);
    setSolution(selected.solution);
    setHistory([initialGrid]);
    setHistoryIndex(0);
    setMistakes(0);
    setHintsUsed(0);
    setTimeElapsed(0);
    setIsCompleted(false);
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
      // Toggle pencil mark
      if (newGrid[row][col].pencilMarks.has(value)) {
        newGrid[row][col].pencilMarks.delete(value);
      } else {
        newGrid[row][col].pencilMarks.add(value);
      }
    } else {
      // Set value
      newGrid[row][col].value = value;
      newGrid[row][col].pencilMarks.clear();

      // Check if it's a mistake
      if (value !== 0 && value !== solution[row][col]) {
        setMistakes(prev => prev + 1);
      }
    }

    // Update history
    const newHistory = history.slice(0, historyIndex + 1);
    newHistory.push(newGrid);
    setHistory(newHistory);
    setHistoryIndex(newHistory.length - 1);

    setGrid(newGrid);

    // Check completion
    if (checkCompletion(newGrid)) {
      setIsCompleted(true);
    }
  };

  // Undo
  const handleUndo = () => {
    if (historyIndex > 0) {
      setHistoryIndex(historyIndex - 1);
      setGrid(history[historyIndex - 1]);
    }
  };

  // Redo
  const handleRedo = () => {
    if (historyIndex < history.length - 1) {
      setHistoryIndex(historyIndex + 1);
      setGrid(history[historyIndex + 1]);
    }
  };

  // Get hint
  const handleHint = () => {
    if (isCompleted || hintsUsed >= maxHints) return;

    // Find first empty cell and fill it
    for (let row = 0; row < 9; row++) {
      for (let col = 0; col < 9; col++) {
        if (!grid[row][col].isInitial && grid[row][col].value !== solution[row][col]) {
          handleCellChange(row, col, solution[row][col]);
          setHintsUsed(prev => prev + 1);
          return;
        }
      }
    }
  };

  // Check if cell has conflicts (always enabled)
  const hasConflict = (row: number, col: number): boolean => {
    if (grid[row][col].value === 0) return false;

    const value = grid[row][col].value;

    // Check row
    for (let c = 0; c < 9; c++) {
      if (c !== col && grid[row][c].value === value) return true;
    }

    // Check column
    for (let r = 0; r < 9; r++) {
      if (r !== row && grid[r][col].value === value) return true;
    }

    // Check 3x3 box
    const boxRow = Math.floor(row / 3) * 3;
    const boxCol = Math.floor(col / 3) * 3;
    for (let r = boxRow; r < boxRow + 3; r++) {
      for (let c = boxCol; c < boxCol + 3; c++) {
        if ((r !== row || c !== col) && grid[r][c].value === value) return true;
      }
    }

    return false;
  };

  // Completion screen
  if (isCompleted) {
    const getDifficultyColor = () => {
      switch (difficulty) {
        case 'easy': return 'text-green-600';
        case 'medium': return 'text-yellow-600';
        case 'hard': return 'text-orange-600';
        case 'expert': return 'text-red-600';
      }
    };

    return (
      <div class="max-w-2xl mx-auto">
        <div className="bg-white rounded-2xl shadow-xl p-8 sm:p-12 text-center">
          <div className="text-6xl mb-6">🎉</div>

          <h2 className="text-3xl sm:text-4xl font-display font-bold text-dark-900 mb-4">
            Puzzle Solved!
          </h2>

          <p className="text-xl font-semibold text-primary-600 mb-8">
            Congratulations! You completed the {difficulty} puzzle!
          </p>

          {/* Stats Display */}
          <div className="grid grid-cols-3 gap-4 mb-8">
            <div className="bg-primary-50 rounded-xl p-4">
              <p className="text-3xl font-bold text-primary-600">⏱️</p>
              <p className="text-lg font-semibold text-dark-900">{formatTime(timeElapsed)}</p>
              <p className="text-xs text-dark-600">Time</p>
            </div>
            <div className="bg-secondary-50 rounded-xl p-4">
              <p className="text-3xl font-bold text-secondary-600">❌</p>
              <p className="text-lg font-semibold text-dark-900">{mistakes}</p>
              <p className="text-xs text-dark-600">Mistakes</p>
            </div>
            <div className="bg-accent-50 rounded-xl p-4">
              <p className="text-3xl font-bold text-accent-600">💡</p>
              <p className="text-lg font-semibold text-dark-900">{hintsUsed}</p>
              <p className="text-xs text-dark-600">Hints Used</p>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex flex-wrap gap-4 justify-center">
            <button
              onClick={generatePuzzle}
              className="px-6 py-3 bg-primary-600 hover:bg-primary-700 text-white font-semibold rounded-lg transition-all"
            >
              Play Again
            </button>
            <a
              href="/sudoku"
              className="px-6 py-3 bg-white border-2 border-dark-200 hover:border-primary-300 text-dark-700 hover:text-primary-600 font-semibold rounded-lg transition-all"
            >
              Choose Difficulty
            </a>
            <a
              href="/"
              className="px-6 py-3 bg-white border-2 border-dark-200 hover:border-primary-300 text-dark-700 hover:text-primary-600 font-semibold rounded-lg transition-all"
            >
              Home
            </a>
          </div>
        </div>
      </div>
    );
  }

  // Main game view
  return (
    <div className="max-w-4xl mx-auto">
      {/* Sudoku Grid with Stats */}
      <div className="bg-white rounded-2xl shadow-xl p-4 sm:p-8 mb-6 relative">
        {/* Time and Hints - Top Right */}
        <div className="absolute top-4 right-4 sm:top-8 sm:right-8 flex flex-col gap-2 text-right z-20">
          <div className="bg-dark-100 px-3 py-2 rounded-lg">
            <p className="text-xs text-dark-600">⏱️ Time</p>
            <p className="text-lg font-bold text-dark-900">{formatTime(timeElapsed)}</p>
          </div>
          <div className="bg-yellow-100 px-3 py-2 rounded-lg">
            <p className="text-xs text-dark-600">💡 Hints</p>
            <p className="text-lg font-bold text-yellow-900">{hintsUsed}/{maxHints}</p>
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
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
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
          <button
            onClick={handleHint}
            disabled={hintsUsed >= maxHints}
            className={cn(
              "px-4 py-3 bg-yellow-100 hover:bg-yellow-200 text-yellow-900 font-semibold rounded-lg transition-all",
              hintsUsed >= maxHints && "opacity-50 cursor-not-allowed"
            )}
          >
            💡 Hint ({maxHints - hintsUsed} left)
          </button>
        </div>

        <div className="mt-4">
          <button
            onClick={generatePuzzle}
            className="w-full px-4 py-3 bg-red-100 hover:bg-red-200 text-red-900 font-semibold rounded-lg transition-all"
          >
            🔄 New Game
          </button>
        </div>
      </div>
    </div>
  );

  function getDifficultyColor(): string {
    switch (difficulty) {
      case 'easy': return 'text-green-600';
      case 'medium': return 'text-yellow-600';
      case 'hard': return 'text-orange-600';
      case 'expert': return 'text-red-600';
    }
  }
};

export default SudokuPlayer;
