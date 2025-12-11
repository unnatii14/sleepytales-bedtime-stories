import { motion } from 'motion/react';
import { Heart, Star, Play } from 'lucide-react';
import type { Story, Screen } from '../App';

interface FavoritesProps {
  stories: Story[];
  onNavigate: (screen: Screen, story?: Story) => void;
  onToggleFavorite: (storyId: string) => void;
}

export function Favorites({ stories, onNavigate, onToggleFavorite }: FavoritesProps) {
  return (
    <div className="min-h-screen pb-24 px-6">
      {/* Header */}
      <div className="pt-12 pb-6">
        <div className="flex items-center gap-3 mb-2">
          <Heart className="w-8 h-8 text-red-400 fill-red-400" />
          <h1 className="text-[#F8EDEB]">Favorites</h1>
        </div>
        <p className="text-[#A8C7FF]">
          {stories.length === 0 
            ? 'No favorites yet. Start adding stories you love!' 
            : `${stories.length} ${stories.length === 1 ? 'story' : 'stories'} saved`
          }
        </p>
      </div>

      {/* Favorites List */}
      {stories.length === 0 ? (
        <div className="flex flex-col items-center justify-center py-20">
          <div className="w-24 h-24 bg-[#162B5B]/60 rounded-full flex items-center justify-center mb-4">
            <Heart className="w-12 h-12 text-[#A8C7FF]/40" />
          </div>
          <p className="text-[#A8C7FF] text-center mb-6">
            Tap the heart icon on any story<br />to add it to your favorites
          </p>
          <button
            onClick={() => onNavigate('stories')}
            className="px-6 py-3 bg-gradient-to-r from-[#5B84D8] to-[#162B5B] rounded-2xl text-[#F8EDEB] hover:scale-105 transition-transform"
          >
            Browse Stories
          </button>
        </div>
      ) : (
        <div className="space-y-3">
          {stories.map((story, index) => (
            <motion.div
              key={story.id}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: index * 0.05 }}
              className="bg-[#162B5B]/60 backdrop-blur-sm rounded-2xl overflow-hidden border border-[#5B84D8]/10 hover:border-[#5B84D8]/30 transition-all"
            >
              <div className="flex items-center gap-4 p-4">
                <button
                  onClick={() => onNavigate('story-player', story)}
                  className="relative w-20 h-20 rounded-xl overflow-hidden flex-shrink-0"
                >
                  <img
                    src={story.coverImage}
                    alt={story.title}
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute inset-0 bg-[#0B2545]/40 flex items-center justify-center opacity-0 hover:opacity-100 transition-opacity">
                    <Play className="w-6 h-6 text-[#F8EDEB]" />
                  </div>
                </button>

                <button
                  onClick={() => onNavigate('story-player', story)}
                  className="flex-1 text-left"
                >
                  <h3 className="text-[#F8EDEB] mb-1">{story.title}</h3>
                  <div className="flex items-center gap-2 text-[#A8C7FF] text-sm mb-1">
                    <span>{story.genre}</span>
                    <span>•</span>
                    <span>{story.duration}</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <Star className="w-3 h-3 text-[#F8EDEB] fill-[#F8EDEB]" />
                    <span className="text-[#F8EDEB] text-sm">{story.rating}</span>
                  </div>
                </button>

                <button
                  onClick={() => onToggleFavorite(story.id)}
                  className="w-10 h-10 bg-[#0B2545]/60 rounded-full flex items-center justify-center hover:scale-110 transition-transform flex-shrink-0"
                >
                  <Heart className="w-5 h-5 text-red-400 fill-red-400" />
                </button>
              </div>
            </motion.div>
          ))}
        </div>
      )}

      {/* Decorative Elements */}
      {stories.length > 0 && (
        <div className="fixed bottom-32 right-6 pointer-events-none">
          <motion.div
            animate={{
              scale: [1, 1.2, 1],
              rotate: [0, 5, -5, 0],
            }}
            transition={{
              duration: 3,
              repeat: Infinity,
              ease: "easeInOut"
            }}
          >
            <Heart className="w-16 h-16 text-red-400/20 fill-red-400/20" />
          </motion.div>
        </div>
      )}
    </div>
  );
}
