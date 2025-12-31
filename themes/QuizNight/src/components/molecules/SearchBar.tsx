import React, { useState } from 'react';
import { Input, Button } from '@components/atoms';
import { Search, X } from 'lucide-react';
import { cn } from '@lib/utils/cn';

export interface SearchBarProps {
  placeholder?: string;
  onSearch?: (query: string) => void;
  className?: string;
  showButton?: boolean;
}

/**
 * SearchBar Component - Atomic Design: Molecule
 *
 * Search input with clear and submit functionality.
 * Mobile-optimized with responsive layout.
 *
 * @example
 * <SearchBar placeholder="Search quizzes..." onSearch={handleSearch} />
 */
export const SearchBar: React.FC<SearchBarProps> = ({
  placeholder = 'Search quizzes...',
  onSearch,
  className,
  showButton = true,
}) => {
  const [query, setQuery] = useState('');

  const handleSearch = (e?: React.FormEvent) => {
    e?.preventDefault();
    onSearch?.(query);
  };

  const handleClear = () => {
    setQuery('');
    onSearch?.('');
  };

  return (
    <form
      onSubmit={handleSearch}
      className={cn('flex gap-2 w-full', className)}
    >
      <div className="flex-1 relative">
        <Input
          type="search"
          placeholder={placeholder}
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          leftIcon={<Search size={18} />}
          rightIcon={
            query && (
              <button
                type="button"
                onClick={handleClear}
                className="hover:text-dark-700 transition-colors"
                aria-label="Clear search"
              >
                <X size={18} />
              </button>
            )
          }
          className="pr-10"
        />
      </div>

      {showButton && (
        <Button
          type="submit"
          variant="primary"
          size="md"
          className="hidden sm:inline-flex px-6"
        >
          Search
        </Button>
      )}
    </form>
  );
};
