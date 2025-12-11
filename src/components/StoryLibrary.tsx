import { useState } from 'react';
import { motion } from 'motion/react';
import { Search, Heart, Star, SlidersHorizontal } from 'lucide-react';
import type { Story, Screen } from '../App';

interface StoryLibraryProps {
  stories: Story[];
  onNavigate: (screen: Screen, story?: Story, genre?: string) => void;
  onToggleFavorite: (storyId: string) => void;
  initialGenre?: string;
}

export function StoryLibrary({ stories, onNavigate, onToggleFavorite, initialGenre = 'All' }: StoryLibraryProps) {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedGenre, setSelectedGenre] = useState<string>(initialGenre);
  const [sortBy, setSortBy] = useState<'title' | 'rating' | 'duration'>('rating');
  const [showFilters, setShowFilters] = useState(false);

  const genres = ['All', 'Animals', 'Space', 'Magical world', 'Adventures', 'Fairy tales', 'Moral stories', 'Nature stories'];

  const filteredStories = stories
    .filter(story => {
      const matchesSearch = story.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                           story.genre.toLowerCase().includes(searchQuery.toLowerCase());
      const matchesGenre = selectedGenre === 'All' || story.genre === selectedGenre;
      return matchesSearch && matchesGenre;
    })
    .sort((a, b) => {
      if (sortBy === 'rating') return b.rating - a.rating;
      if (sortBy === 'title') return a.title.localeCompare(b.title);
      if (sortBy === 'duration') {
        const getDuration = (d: string) => parseInt(d.replace(' min', ''));
        return getDuration(a.duration) - getDuration(b.duration);
      }
      return 0;
    });

  return (
    <div className="min-h-screen pb-24 px-4 sm:px-6">
      {/* Header */}
      <div className="pt-8 sm:pt-12 pb-4 sm:pb-6">
        <div className="flex items-center justify-between mb-4 sm:mb-6">
          <div className="flex items-center gap-3">
            {selectedGenre !== 'All' && (
              <button
                onClick={() => setSelectedGenre('All')}
                className="w-9 h-9 sm:w-10 sm:h-10 bg-[#162B5B]/60 rounded-full flex items-center justify-center hover:bg-[#162B5B] transition-colors"
              >
                <span className="text-[#F8EDEB] text-xl">←</span>
              </button>
            )}
            <h1 className="text-[#F8EDEB] text-2xl sm:text-3xl">
              {selectedGenre === 'All' ? 'Story Library' : selectedGenre}
            </h1>
          </div>
          <button
            onClick={() => setShowFilters(!showFilters)}
            className={`w-9 h-9 sm:w-10 sm:h-10 rounded-full flex items-center justify-center transition-colors ${
              showFilters ? 'bg-[#5B84D8]' : 'bg-[#162B5B]/60'
            }`}
          >
            <SlidersHorizontal className="w-4 h-4 sm:w-5 sm:h-5 text-[#F8EDEB]" />
          </button>
        </div>

        {/* Search Bar */}
        <div className="relative mb-4 sm:mb-6">
          <Search className="absolute left-3 sm:left-4 top-1/2 -translate-y-1/2 w-4 h-4 sm:w-5 sm:h-5 text-[#A8C7FF]/60" />
          <input
            type="text"
            placeholder="Search stories..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full bg-[#162B5B]/60 backdrop-blur-sm rounded-xl sm:rounded-2xl pl-10 sm:pl-12 pr-3 sm:pr-4 py-2.5 sm:py-4 text-sm sm:text-base text-[#F8EDEB] placeholder-[#A8C7FF]/40 border border-[#5B84D8]/20 focus:border-[#5B84D8]/50 focus:outline-none transition-colors"
          />
        </div>

        {/* Sorting Options */}
        {showFilters && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="mb-4 overflow-hidden"
          >
            <p className="text-[#A8C7FF] text-xs sm:text-sm mb-2">Sort by:</p>
            <div className="flex gap-2">
              <button
                onClick={() => setSortBy('rating')}
                className={`px-3 sm:px-4 py-1.5 sm:py-2 rounded-full text-xs sm:text-sm transition-all ${
                  sortBy === 'rating'
                    ? 'bg-[#5B84D8] text-[#F8EDEB]'
                    : 'bg-[#162B5B]/60 text-[#A8C7FF] border border-[#5B84D8]/20'
                }`}
              >
                ⭐ Rating
              </button>
              <button
                onClick={() => setSortBy('title')}
                className={`px-3 sm:px-4 py-1.5 sm:py-2 rounded-full text-xs sm:text-sm transition-all ${
                  sortBy === 'title'
                    ? 'bg-[#5B84D8] text-[#F8EDEB]'
                    : 'bg-[#162B5B]/60 text-[#A8C7FF] border border-[#5B84D8]/20'
                }`}
              >
                🔤 A-Z
              </button>
              <button
                onClick={() => setSortBy('duration')}
                className={`px-3 sm:px-4 py-1.5 sm:py-2 rounded-full text-xs sm:text-sm transition-all ${
                  sortBy === 'duration'
                    ? 'bg-[#5B84D8] text-[#F8EDEB]'
                    : 'bg-[#162B5B]/60 text-[#A8C7FF] border border-[#5B84D8]/20'
                }`}
              >
                ⏱️ Duration
              </button>
            </div>
          </motion.div>
        )}

        {/* Genre Filter */}
        <div className="flex gap-2 overflow-x-auto pb-2 scrollbar-hide">
          {genres.map((genre) => (
            <button
              key={genre}
              onClick={() => setSelectedGenre(genre)}
              className={`px-3 sm:px-4 py-1.5 sm:py-2 rounded-full whitespace-nowrap text-xs sm:text-sm transition-all ${
                selectedGenre === genre
                  ? 'bg-[#5B84D8] text-[#F8EDEB]'
                  : 'bg-[#162B5B]/60 text-[#A8C7FF] border border-[#5B84D8]/20'
              }`}
            >
              {genre}
            </button>
          ))}
        </div>

        {/* Results Count */}
        <p className="text-[#A8C7FF] text-xs sm:text-sm mt-3 sm:mt-4">
          {filteredStories.length} {filteredStories.length === 1 ? 'story' : 'stories'} found
        </p>
      </div>

      {/* Story Grid */}
      <div className="grid grid-cols-2 lg:grid-cols-3 gap-3 sm:gap-4">
        {filteredStories.map((story, index) => (
          <motion.div
            key={story.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.05 }}
            className="relative"
          >
            <button
              onClick={() => onNavigate('story-player', story)}
              className="w-full bg-[#162B5B]/60 backdrop-blur-sm rounded-xl sm:rounded-2xl overflow-hidden border border-[#5B84D8]/10 hover:border-[#5B84D8]/30 transition-all active:scale-95"
            >
              <div className="relative aspect-[3/4]">
                <img
                  src={story.coverImage}
                  alt={story.title}
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#0B2545]/90 via-transparent to-transparent" />
                <div className="absolute top-2 right-2 bg-[#0B2545]/80 backdrop-blur-sm px-2 py-1 rounded-lg">
                  <span className="text-[#F8EDEB] text-xs">{story.duration}</span>
                </div>
                <div className="absolute bottom-0 left-0 right-0 p-3">
                  <h3 className="text-[#F8EDEB] text-sm mb-1 line-clamp-2">{story.title}</h3>
                  <div className="flex items-center gap-1 text-[#A8C7FF] text-xs">
                    <span>{story.genre}</span>
                  </div>
                  <div className="flex items-center gap-1 mt-1">
                    <Star className="w-3 h-3 text-[#F8EDEB] fill-[#F8EDEB]" />
                    <span className="text-[#F8EDEB] text-xs">{story.rating}</span>
                  </div>
                </div>
              </div>
            </button>

            {/* Favorite Button */}
            <button
              onClick={(e) => {
                e.stopPropagation();
                onToggleFavorite(story.id);
              }}
              className="absolute top-2 left-2 w-8 h-8 bg-[#0B2545]/80 backdrop-blur-sm rounded-full flex items-center justify-center hover:scale-110 transition-transform"
            >
              <Heart
                className={`w-4 h-4 transition-all ${
                  story.isFavorite
                    ? 'text-red-400 fill-red-400'
                    : 'text-[#F8EDEB]'
                }`}
              />
            </button>
          </motion.div>
        ))}
      </div>

      {filteredStories.length === 0 && (
        <div className="text-center py-12">
          <p className="text-[#A8C7FF]">No stories found</p>
        </div>
      )}
    </div>
  );
}
