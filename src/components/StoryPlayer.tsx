import { useState, useEffect, useRef } from 'react';
import { motion } from 'motion/react';
import { ArrowLeft, Heart, Play, Pause, SkipBack, SkipForward, Star, Type, Timer, Volume2 } from 'lucide-react';
import type { Story, Screen } from '../App';

interface StoryPlayerProps {
  story: Story;
  allStories: Story[];
  onNavigate: (screen: Screen, story?: Story) => void;
  onToggleFavorite: (storyId: string) => void;
  onRateStory: (storyId: string, rating: number) => void;
}

export function StoryPlayer({ story, allStories, onNavigate, onToggleFavorite, onRateStory }: StoryPlayerProps) {
  const [isPlaying, setIsPlaying] = useState(false);
  const [showRating, setShowRating] = useState(false);
  const [textSize, setTextSize] = useState<'small' | 'medium' | 'large'>('medium');
  const [showTimer, setShowTimer] = useState(false);
  const [selectedTimer, setSelectedTimer] = useState<number | null>(null);
  const [autoScroll, setAutoScroll] = useState(false);
  const [voicesLoaded, setVoicesLoaded] = useState(false);
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const synth = useRef<SpeechSynthesis>(window.speechSynthesis);
  const utterance = useRef<SpeechSynthesisUtterance | null>(null);

  const textSizes = {
    small: 'text-sm',
    medium: 'text-base',
    large: 'text-lg'
  };

  const timerOptions = [10, 15, 30, 45, 60];

  // Extract moral from story text if it exists
  const storyParts = story.text.split('✨ Moral:');
  const storyContent = storyParts[0];
  const moral = storyParts[1] || null;

  // Get recommended stories based on same genre
  const recommendedStories = allStories
    .filter(s => s.id !== story.id && s.genre === story.genre)
    .slice(0, 3);

  // Load voices
  useEffect(() => {
    const loadVoices = () => {
      const voices = synth.current.getVoices();
      if (voices.length > 0) {
        setVoicesLoaded(true);
      }
    };

    // Load voices immediately
    loadVoices();

    // Some browsers load voices asynchronously
    if (synth.current.onvoiceschanged !== undefined) {
      synth.current.onvoiceschanged = loadVoices;
    }

    return () => {
      if (synth.current.onvoiceschanged !== undefined) {
        synth.current.onvoiceschanged = null;
      }
    };
  }, []);

  // Initialize text-to-speech with expressive, child-friendly voice
  useEffect(() => {
    if (!voicesLoaded) return;

    // Create new utterance with story content
    utterance.current = new SpeechSynthesisUtterance(storyContent);
    utterance.current.lang = 'en-US';
    utterance.current.rate = 0.8; // Comfortable storytelling pace
    utterance.current.pitch = 1.2; // Slightly higher, friendly pitch
    utterance.current.volume = 1.0;
    
    // Get available voices
    const voices = synth.current.getVoices();
    
    if (voices.length > 0) {
      // Select best child-friendly voice with multiple fallbacks
      const selectedVoice = 
        voices.find(v => v.name.includes('Zira') && v.lang.startsWith('en')) || // Windows female
        voices.find(v => v.name.includes('Microsoft Zira')) ||
        voices.find(v => v.name.includes('Google UK English Female')) || // Chrome female
        voices.find(v => v.name.includes('Google US English Female')) ||
        voices.find(v => v.name.includes('Samantha')) || // Mac female
        voices.find(v => v.name.includes('Karen')) || // Mac female
        voices.find(v => v.name.includes('Victoria')) || // Windows female
        voices.find(v => v.lang.startsWith('en') && v.name.toLowerCase().includes('female')) ||
        voices.find(v => v.lang.startsWith('en')) ||
        voices[0]; // Ultimate fallback
      
      if (selectedVoice) {
        utterance.current.voice = selectedVoice;
      }
    }
    
    utterance.current.onend = () => {
      setIsPlaying(false);
    };

    utterance.current.onerror = (error) => {
      console.error('Speech synthesis error:', error);
      setIsPlaying(false);
    };

    return () => {
      synth.current.cancel();
    };
  }, [story.id, storyContent, voicesLoaded]);

  const togglePlayPause = () => {
    if (!voicesLoaded) {
      console.log('Voices not loaded yet');
      return;
    }

    if (isPlaying) {
      // Stop instead of pause for better browser compatibility
      synth.current.cancel();
      setIsPlaying(false);
    } else {
      // Always recreate utterance for reliability
      if (utterance.current) {
        synth.current.cancel(); // Clear any existing speech
        synth.current.speak(utterance.current);
        setIsPlaying(true);
      }
    }
  };

  const stopReading = () => {
    synth.current.cancel();
    setIsPlaying(false);
  };

  useEffect(() => {
    return () => {
      synth.current.cancel();
    };
  }, []);

  return (
    <div className="min-h-screen pb-8 px-4 sm:px-6 relative overflow-hidden">
      {/* Animated Background */}
      <div className="absolute inset-0 pointer-events-none">
        <motion.div
          animate={{
            opacity: [0.1, 0.2, 0.1],
            scale: [1, 1.1, 1],
          }}
          transition={{
            duration: 8,
            repeat: Infinity,
            ease: "easeInOut"
          }}
          className="absolute top-20 right-10 w-32 h-32 bg-[#5B84D8]/20 rounded-full blur-3xl"
        />
        <motion.div
          animate={{
            opacity: [0.1, 0.15, 0.1],
            scale: [1, 1.2, 1],
          }}
          transition={{
            duration: 10,
            repeat: Infinity,
            ease: "easeInOut",
            delay: 2
          }}
          className="absolute bottom-40 left-10 w-40 h-40 bg-[#A8C7FF]/10 rounded-full blur-3xl"
        />
      </div>

      {/* Header */}
      <div className="relative pt-12 pb-6 flex items-center justify-between">
        <button
          onClick={() => onNavigate('stories')}
          className="w-10 h-10 bg-[#162B5B]/60 backdrop-blur-sm rounded-full flex items-center justify-center hover:bg-[#162B5B] transition-colors"
        >
          <ArrowLeft className="w-5 h-5 text-[#F8EDEB]" />
        </button>

        <div className="flex items-center gap-2">
          <button
            onClick={() => setShowTimer(!showTimer)}
            className="w-10 h-10 bg-[#162B5B]/60 backdrop-blur-sm rounded-full flex items-center justify-center hover:bg-[#162B5B] transition-colors relative"
          >
            <Timer className="w-5 h-5 text-[#F8EDEB]" />
            {selectedTimer && (
              <span className="absolute -top-1 -right-1 w-5 h-5 bg-[#5B84D8] rounded-full text-[#F8EDEB] text-xs flex items-center justify-center">
                ✓
              </span>
            )}
          </button>

          <button
            onClick={() => onToggleFavorite(story.id)}
            className="w-10 h-10 bg-[#162B5B]/60 backdrop-blur-sm rounded-full flex items-center justify-center hover:bg-[#162B5B] transition-colors"
          >
            <Heart
              className={`w-5 h-5 transition-all ${
                story.isFavorite
                  ? 'text-red-400 fill-red-400'
                  : 'text-[#F8EDEB]'
              }`}
            />
          </button>
        </div>
      </div>

      {/* Timer Options */}
      {showTimer && (
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          className="relative mb-4 bg-[#162B5B]/80 backdrop-blur-sm rounded-2xl p-4 border border-[#5B84D8]/20"
        >
          <p className="text-[#F8EDEB] text-sm mb-3">Sleep Timer</p>
          <div className="flex flex-wrap gap-2">
            {timerOptions.map((minutes) => (
              <button
                key={minutes}
                onClick={() => setSelectedTimer(selectedTimer === minutes ? null : minutes)}
                className={`px-4 py-2 rounded-xl transition-all ${
                  selectedTimer === minutes
                    ? 'bg-[#5B84D8] text-[#F8EDEB]'
                    : 'bg-[#0B2545]/60 text-[#A8C7FF] border border-[#5B84D8]/20'
                }`}
              >
                {minutes} min
              </button>
            ))}
          </div>
        </motion.div>
      )}

      {/* Story Cover */}
      <motion.div
        initial={{ scale: 0.9, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        className="relative mb-4 sm:mb-6 rounded-2xl sm:rounded-3xl overflow-hidden aspect-[4/3] mx-auto max-w-md"
      >
        <img
          src={story.coverImage}
          alt={story.title}
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-[#0B2545]/60 via-transparent to-transparent" />
        
        {/* Audio Status Indicator */}
        {isPlaying && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="absolute top-3 right-3 bg-[#5B84D8] text-[#F8EDEB] px-3 py-1.5 rounded-full flex items-center gap-2 text-xs sm:text-sm"
          >
            <Volume2 className="w-4 h-4" />
            <span>Reading...</span>
          </motion.div>
        )}
      </motion.div>

      {/* Story Info */}
      <div className="relative mb-4 sm:mb-6 text-center">
        <h2 className="text-[#F8EDEB] text-xl sm:text-2xl mb-2">{story.title}</h2>
        <div className="flex items-center justify-center gap-2 sm:gap-3 text-[#A8C7FF] text-xs sm:text-sm flex-wrap">
          <span>{story.genre}</span>
          <span>•</span>
          <span>{story.duration}</span>
          <span>•</span>
          <span>{story.ageRange} years</span>
        </div>

        {/* Rating */}
        <div className="flex items-center justify-center gap-2 mt-4">
          <button
            onClick={() => setShowRating(!showRating)}
            className="flex items-center gap-2 px-4 py-2 bg-[#162B5B]/60 backdrop-blur-sm rounded-full hover:bg-[#162B5B] transition-colors"
          >
            <Star className="w-4 h-4 text-[#F8EDEB] fill-[#F8EDEB]" />
            <span className="text-[#F8EDEB] text-sm">{story.rating}</span>
          </button>
        </div>

        {showRating && (
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="flex items-center justify-center gap-2 mt-3"
          >
            {[1, 2, 3, 4, 5].map((rating) => (
              <button
                key={rating}
                onClick={() => {
                  onRateStory(story.id, rating);
                  setShowRating(false);
                }}
                className="hover:scale-110 transition-transform"
              >
                <Star
                  className={`w-6 h-6 ${
                    rating <= story.rating
                      ? 'text-[#F8EDEB] fill-[#F8EDEB]'
                      : 'text-[#A8C7FF]/30'
                  }`}
                />
              </button>
            ))}
          </motion.div>
        )}
      </div>

      {/* Story Text */}
      <div className="relative mb-8">
        <div className="flex items-center justify-between mb-3">
          <h3 className="text-[#F8EDEB]">Story Text</h3>
          <div className="flex gap-2">
            <button
              onClick={() => setTextSize('small')}
              className={`px-3 py-1.5 rounded-lg transition-all ${
                textSize === 'small'
                  ? 'bg-[#5B84D8] text-[#F8EDEB]'
                  : 'bg-[#162B5B]/60 text-[#A8C7FF]'
              }`}
            >
              <Type className="w-3 h-3" />
            </button>
            <button
              onClick={() => setTextSize('medium')}
              className={`px-3 py-1.5 rounded-lg transition-all ${
                textSize === 'medium'
                  ? 'bg-[#5B84D8] text-[#F8EDEB]'
                  : 'bg-[#162B5B]/60 text-[#A8C7FF]'
              }`}
            >
              <Type className="w-4 h-4" />
            </button>
            <button
              onClick={() => setTextSize('large')}
              className={`px-3 py-1.5 rounded-lg transition-all ${
                textSize === 'large'
                  ? 'bg-[#5B84D8] text-[#F8EDEB]'
                  : 'bg-[#162B5B]/60 text-[#A8C7FF]'
              }`}
            >
              <Type className="w-5 h-5" />
            </button>
          </div>
        </div>

        <div className="bg-[#162B5B]/40 backdrop-blur-sm rounded-2xl p-6 border border-[#5B84D8]/20 max-h-96 overflow-y-auto">
          <p className={`text-[#F8EDEB]/90 leading-relaxed whitespace-pre-line ${textSizes[textSize]}`} style={{ fontSize: textSize === 'small' ? '14px' : textSize === 'large' ? '18px' : '16px' }}>
            {storyContent}
          </p>
          {moral && (
            <div className="mt-6 pt-6 border-t border-[#5B84D8]/20">
              <p className={`text-[#A8C7FF] italic ${textSizes[textSize]}`} style={{ fontSize: textSize === 'small' ? '14px' : textSize === 'large' ? '18px' : '16px' }}>
                ✨ Moral: {moral}
              </p>
            </div>
          )}
        </div>
      </div>

      {/* Playback Controls */}
      <div className="relative mb-6">
        <div className="bg-[#162B5B]/60 backdrop-blur-sm rounded-2xl sm:rounded-3xl p-4 sm:p-6 border border-[#5B84D8]/20">
          <div className="flex items-center justify-center gap-4 sm:gap-6">
            <button
              onClick={stopReading}
              className="w-12 h-12 sm:w-14 sm:h-14 bg-[#0B2545] rounded-full flex items-center justify-center hover:bg-[#162B5B] transition-all"
            >
              <SkipBack className="w-5 h-5 sm:w-6 sm:h-6 text-[#F8EDEB]" />
            </button>

            <button
              onClick={togglePlayPause}
              className="w-16 h-16 sm:w-20 sm:h-20 bg-gradient-to-br from-[#5B84D8] to-[#162B5B] rounded-full flex items-center justify-center hover:scale-105 transition-all active:scale-95 shadow-lg shadow-[#5B84D8]/20"
            >
              {isPlaying ? (
                <Pause className="w-7 h-7 sm:w-9 sm:h-9 text-[#F8EDEB]" />
              ) : (
                <Play className="w-7 h-7 sm:w-9 sm:h-9 text-[#F8EDEB] ml-1" />
              )}
            </button>

            <button
              onClick={() => onToggleFavorite(story.id)}
              className={`w-12 h-12 sm:w-14 sm:h-14 rounded-full flex items-center justify-center transition-all ${
                story.isFavorite
                  ? 'bg-[#5B84D8]'
                  : 'bg-[#0B2545] hover:bg-[#162B5B]'
              }`}
            >
              <Heart
                className={`w-5 h-5 sm:w-6 sm:h-6 ${
                  story.isFavorite
                    ? 'fill-[#F8EDEB] text-[#F8EDEB]'
                    : 'text-[#F8EDEB]'
                }`}
              />
            </button>
          </div>
          
          {isPlaying && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="mt-4 text-center"
            >
              <p className="text-[#A8C7FF] text-xs sm:text-sm">
                🔊 Audio reading in progress...
              </p>
            </motion.div>
          )}
        </div>
      </div>

      {/* Recommended Stories */}
      {recommendedStories.length > 0 && (
        <div className="relative mt-8">
          <h3 className="text-[#F8EDEB] mb-4">More {story.genre} Stories</h3>
          <div className="space-y-3">
            {recommendedStories.map((recommendedStory, index) => (
              <motion.button
                key={recommendedStory.id}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: index * 0.1 }}
                onClick={() => onNavigate('story-player', recommendedStory)}
                className="w-full bg-[#162B5B]/60 backdrop-blur-sm rounded-2xl p-4 flex items-center gap-4 hover:bg-[#162B5B]/80 transition-all border border-[#5B84D8]/10"
              >
                <img
                  src={recommendedStory.coverImage}
                  alt={recommendedStory.title}
                  className="w-16 h-16 rounded-xl object-cover"
                />
                <div className="flex-1 text-left">
                  <h4 className="text-[#F8EDEB] mb-1">{recommendedStory.title}</h4>
                  <div className="flex items-center gap-2 text-[#A8C7FF] text-sm">
                    <Star className="w-3 h-3 text-[#F8EDEB] fill-[#F8EDEB]" />
                    <span>{recommendedStory.rating}</span>
                    <span>•</span>
                    <span>{recommendedStory.duration}</span>
                  </div>
                </div>
                <div className="w-10 h-10 bg-[#5B84D8]/30 rounded-full flex items-center justify-center">
                  <Play className="w-5 h-5 text-[#F8EDEB] ml-0.5" />
                </div>
              </motion.button>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
