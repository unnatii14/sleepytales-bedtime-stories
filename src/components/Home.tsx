import { motion } from 'motion/react';
import { BookOpen, Music, Sparkles, Star, TrendingUp } from 'lucide-react';
import type { Story, Screen } from '../App';

interface HomeProps {
  onNavigate: (screen: Screen, story?: Story, genre?: string) => void;
  recentStories: Story[];
}

export function Home({ onNavigate, recentStories }: HomeProps) {
  // Get featured stories (high-rated stories)
  const featuredStories = recentStories
    .filter(story => story.rating >= 4.8)
    .slice(0, 5);

  const genres = [
    { name: 'Animals', emoji: '🐾', count: 13 },
    { name: 'Space', emoji: '🚀', count: 4 },
    { name: 'Magical world', emoji: '✨', count: 5 },
    { name: 'Adventures', emoji: '🗺️', count: 8 },
    { name: 'Fairy tales', emoji: '👸', count: 18 },
    { name: 'Moral stories', emoji: '💭', count: 6 },
    { name: 'Nature stories', emoji: '🌿', count: 6 }
  ];

  return (
    <div className="min-h-screen pb-24 px-4 sm:px-6">
      {/* Header */}
      <div className="pt-12 pb-8">
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="flex items-center justify-center gap-3 mb-2"
        >
          <div className="w-16 h-16 bg-gradient-to-br from-[#F8EDEB] to-[#A8C7FF] rounded-full flex items-center justify-center">
            <span className="text-3xl">🌙</span>
          </div>
        </motion.div>
        <h1 className="text-center text-[#F8EDEB] mb-2">SleepyTales</h1>
        <p className="text-center text-[#A8C7FF] opacity-80">Sweet dreams await...</p>
      </div>

      {/* Greeting Card */}
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        className="bg-gradient-to-r from-[#162B5B] to-[#5B84D8]/30 rounded-[20px] sm:rounded-[28px] p-4 sm:p-6 mb-6 border border-[#5B84D8]/20"
      >
        <div className="flex items-center gap-3 sm:gap-4">
          <div className="w-10 h-10 sm:w-12 sm:h-12 bg-[#F8EDEB]/20 rounded-full flex items-center justify-center flex-shrink-0">
            <Sparkles className="w-5 h-5 sm:w-6 sm:h-6 text-[#F8EDEB]" />
          </div>
          <div>
            <h2 className="text-[#F8EDEB] text-lg sm:text-xl">Good Night! 🌟</h2>
            <p className="text-[#A8C7FF] text-sm sm:text-base">Browse stories by genre</p>
          </div>
        </div>
      </motion.div>

      {/* Story Genres Grid */}
      <div className="mb-6">
        <h3 className="text-[#F8EDEB] mb-4 text-lg sm:text-xl">Story Genres</h3>
        <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 sm:gap-4">
          {genres.map((genre, index) => (
            <motion.button
              key={genre.name}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.05 }}
              onClick={() => onNavigate('stories', undefined, genre.name)}
              className="bg-[#162B5B]/60 backdrop-blur-sm rounded-2xl p-4 sm:p-5 border border-[#5B84D8]/20 hover:border-[#5B84D8]/40 transition-all active:scale-95"
            >
              <div className="text-3xl sm:text-4xl mb-2">{genre.emoji}</div>
              <div className="text-[#F8EDEB] text-sm sm:text-base font-medium mb-1">{genre.name}</div>
              <div className="text-[#A8C7FF] text-xs sm:text-sm">{genre.count} stories</div>
            </motion.button>
          ))}
        </div>
      </div>

      {/* Sleep Music Card */}
      <motion.button
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.4 }}
        onClick={() => onNavigate('music')}
        className="w-full bg-gradient-to-br from-[#162B5B] to-[#5B84D8]/50 rounded-2xl p-4 sm:p-5 mb-6 border border-[#5B84D8]/30 hover:border-[#5B84D8]/50 transition-all active:scale-95"
      >
        <div className="flex items-center gap-4">
          <div className="w-12 h-12 sm:w-14 sm:h-14 bg-[#F8EDEB]/20 rounded-full flex items-center justify-center flex-shrink-0">
            <Music className="w-6 h-6 sm:w-7 sm:h-7 text-[#F8EDEB]" />
          </div>
          <div className="text-left flex-1">
            <div className="text-[#F8EDEB] font-medium text-base sm:text-lg">Sleep Music</div>
            <div className="text-[#A8C7FF] text-sm sm:text-base">6 calming sounds</div>
          </div>
        </div>
      </motion.button>

      {/* Featured Stories */}
      {featuredStories.length > 0 && (
        <div className="mb-6">
          <div className="flex items-center gap-2 mb-4">
            <TrendingUp className="w-4 h-4 sm:w-5 sm:h-5 text-[#F8EDEB]" />
            <h3 className="text-[#F8EDEB] text-lg sm:text-xl">Featured Stories</h3>
          </div>
          <div className="flex gap-3 overflow-x-auto pb-2 scrollbar-hide -mx-4 sm:-mx-6 px-4 sm:px-6">
            {featuredStories.map((story, index) => (
              <motion.button
                key={story.id}
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.5 + index * 0.05 }}
                onClick={() => onNavigate('story-player', story)}
                className="flex-shrink-0 w-32 sm:w-40 bg-[#162B5B]/60 backdrop-blur-sm rounded-2xl overflow-hidden border border-[#5B84D8]/10 hover:border-[#5B84D8]/30 transition-all active:scale-95"
              >
                <div className="relative aspect-[3/4]">
                  <img
                    src={story.coverImage}
                    alt={story.title}
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#0B2545]/90 via-transparent to-transparent" />
                  <div className="absolute top-2 right-2 bg-[#0B2545]/80 backdrop-blur-sm px-2 py-1 rounded-lg flex items-center gap-1">
                    <Star className="w-3 h-3 text-[#F8EDEB] fill-[#F8EDEB]" />
                    <span className="text-[#F8EDEB] text-xs">{story.rating}</span>
                  </div>
                  <div className="absolute bottom-0 left-0 right-0 p-3">
                    <h4 className="text-[#F8EDEB] text-sm mb-1 line-clamp-2">{story.title}</h4>
                    <span className="text-[#A8C7FF] text-xs">{story.duration}</span>
                  </div>
                </div>
              </motion.button>
            ))}
          </div>
        </div>
      )}

      {/* Recently Added */}
      <div className="mb-6">
        <h3 className="text-[#F8EDEB] mb-4 text-lg sm:text-xl">Recently Added</h3>
        <div className="space-y-2 sm:space-y-3">
          {recentStories.slice(0, 3).map((story, index) => (
            <motion.button
              key={story.id}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.7 + index * 0.05 }}
              onClick={() => onNavigate('story-player', story)}
              className="w-full bg-[#162B5B]/60 backdrop-blur-sm rounded-2xl p-3 sm:p-4 flex items-center gap-3 sm:gap-4 hover:bg-[#162B5B]/80 transition-all border border-[#5B84D8]/10 active:scale-98"
            >
              <img
                src={story.coverImage}
                alt={story.title}
                className="w-14 h-14 sm:w-16 sm:h-16 rounded-xl object-cover flex-shrink-0"
              />
              <div className="flex-1 text-left">
                <h4 className="text-[#F8EDEB] mb-1">{story.title}</h4>
                <div className="flex items-center gap-2 text-[#A8C7FF] text-sm">
                  <span>{story.genre}</span>
                  <span>•</span>
                  <span>{story.duration}</span>
                </div>
              </div>
              <div className="w-10 h-10 bg-[#5B84D8]/30 rounded-full flex items-center justify-center">
                <Play className="w-5 h-5 text-[#F8EDEB] ml-0.5" />
              </div>
            </motion.button>
          ))}
        </div>
      </div>

      {/* Decorative Stars */}
      <div className="fixed top-20 right-10 pointer-events-none">
        <motion.div
          animate={{
            opacity: [0.3, 1, 0.3],
            scale: [1, 1.2, 1],
          }}
          transition={{
            duration: 3,
            repeat: Infinity,
            ease: "easeInOut"
          }}
        >
          <Sparkles className="w-8 h-8 text-[#F8EDEB]/40" />
        </motion.div>
      </div>

      <div className="fixed top-40 left-8 pointer-events-none">
        <motion.div
          animate={{
            opacity: [0.2, 0.8, 0.2],
            scale: [1, 1.3, 1],
          }}
          transition={{
            duration: 4,
            repeat: Infinity,
            ease: "easeInOut",
            delay: 1
          }}
        >
          <Sparkles className="w-6 h-6 text-[#A8C7FF]/30" />
        </motion.div>
      </div>
    </div>
  );
}

function Play({ className = '', ...props }: React.SVGProps<SVGSVGElement>) {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="currentColor" stroke="none" className={className} {...props}>
      <polygon points="5 3 19 12 5 21 5 3"/>
    </svg>
  );
}
