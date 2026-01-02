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
    medium: 3,
    hard: 2,
    expert: 1
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

  // Shuffle array helper
  const shuffle = (array: number[]) => {
    const newArray = [...array];
    for (let i = newArray.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [newArray[i], newArray[j]] = [newArray[j], newArray[i]];
    }
    return newArray;
  };

  // Check if number is valid in position
  const isValidMove = (board: number[][], row: number, col: number, num: number): boolean => {
    // Check row
    for (let x = 0; x < 9; x++) {
      if (board[row][x] === num) return false;
    }

    // Check column
    for (let x = 0; x < 9; x++) {
      if (board[x][col] === num) return false;
    }

    // Check 3x3 box
    const boxRow = Math.floor(row / 3) * 3;
    const boxCol = Math.floor(col / 3) * 3;
    for (let i = 0; i < 3; i++) {
      for (let j = 0; j < 3; j++) {
        if (board[boxRow + i][boxCol + j] === num) return false;
      }
    }

    return true;
  };

  // Solve sudoku using backtracking
  const solveSudoku = (board: number[][]): boolean => {
    for (let row = 0; row < 9; row++) {
      for (let col = 0; col < 9; col++) {
        if (board[row][col] === 0) {
          const numbers = shuffle([1, 2, 3, 4, 5, 6, 7, 8, 9]);
          for (const num of numbers) {
            if (isValidMove(board, row, col, num)) {
              board[row][col] = num;
              if (solveSudoku(board)) {
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

  // Generate a complete valid Sudoku solution
  const generateSolution = (): number[][] => {
    const board: number[][] = Array(9).fill(0).map(() => Array(9).fill(0));
    solveSudoku(board);
    return board;
  };

  // Remove numbers to create puzzle based on difficulty
  const createPuzzle = (solution: number[][], difficulty: string): number[][] => {
    const puzzle = solution.map(row => [...row]);

    // Number of cells to remove based on difficulty
    const cellsToRemove = {
      easy: 40,    // 41 clues remaining
      medium: 50,  // 31 clues remaining
      hard: 55,    // 26 clues remaining
      expert: 60   // 21 clues remaining
    }[difficulty] || 50;

    let removed = 0;
    const attempts = cellsToRemove * 2; // Safety limit
    let attemptCount = 0;

    while (removed < cellsToRemove && attemptCount < attempts) {
      const row = Math.floor(Math.random() * 9);
      const col = Math.floor(Math.random() * 9);

      if (puzzle[row][col] !== 0) {
        puzzle[row][col] = 0;
        removed++;
      }
      attemptCount++;
    }

    return puzzle;
  };

  // Generate a new Sudoku puzzle
  const generatePuzzle = () => {
    // Generate complete solution
    const solution = generateSolution();

    // Create puzzle by removing numbers
    const puzzle = createPuzzle(solution, difficulty);

    const selected = { puzzle, solution };
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
