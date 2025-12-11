import { useState, useRef, useEffect } from 'react';
import { motion } from 'motion/react';
import { CloudRain, Waves, Music as MusicIcon, Wind, Radio, Trees, Play, Pause, Volume2 } from 'lucide-react';
import type { Music, Screen } from '../App';

interface MusicPlayerProps {
  musicTracks: Music[];
  onNavigate: (screen: Screen) => void;
}

const iconMap: Record<string, React.ComponentType<{ className?: string }>> = {
  'cloud-rain': CloudRain,
  'waves': Waves,
  'music': MusicIcon,
  'wind': Wind,
  'radio': Radio,
  'trees': Trees,
};

// Map sound types to audio generation frequencies/patterns
const soundGenerators: Record<string, () => void> = {
  'Rain': () => {},
  'Ocean Waves': () => {},
  'Piano Lullaby': () => {},
  'Wind Chimes': () => {},
  'White Noise': () => {},
  'Forest Sounds': () => {},
};

export function MusicPlayer({ musicTracks, onNavigate }: MusicPlayerProps) {
  const [tracks, setTracks] = useState(musicTracks);
  const [currentTrack, setCurrentTrack] = useState<Music | null>(null);
  const [volume, setVolume] = useState(70);
  const audioContextRef = useRef<AudioContext | null>(null);
  const oscillatorRef = useRef<OscillatorNode | null>(null);
  const gainNodeRef = useRef<GainNode | null>(null);

  useEffect(() => {
    // Initialize Web Audio API
    audioContextRef.current = new (window.AudioContext || (window as any).webkitAudioContext)();
    gainNodeRef.current = audioContextRef.current.createGain();
    gainNodeRef.current.connect(audioContextRef.current.destination);
    gainNodeRef.current.gain.value = volume / 100;

    return () => {
      if (oscillatorRef.current) {
        oscillatorRef.current.stop();
      }
      if (audioContextRef.current) {
        audioContextRef.current.close();
      }
    };
  }, []);

  useEffect(() => {
    if (gainNodeRef.current) {
      gainNodeRef.current.gain.value = volume / 100;
    }
  }, [volume]);

  const generateAmbientSound = (trackName: string) => {
    if (!audioContextRef.current || !gainNodeRef.current) return;

    // Stop any existing sound
    if (oscillatorRef.current) {
      oscillatorRef.current.stop();
    }

    const ctx = audioContextRef.current;
    
    // Create different sounds based on track
    if (trackName === 'White Noise') {
      // White noise using buffer source
      const bufferSize = ctx.sampleRate * 2;
      const buffer = ctx.createBuffer(1, bufferSize, ctx.sampleRate);
      const data = buffer.getChannelData(0);
      for (let i = 0; i < bufferSize; i++) {
        data[i] = Math.random() * 2 - 1;
      }
      const source = ctx.createBufferSource();
      source.buffer = buffer;
      source.loop = true;
      source.connect(gainNodeRef.current);
      source.start();
      (oscillatorRef as any).current = source;
    } else if (trackName === 'Rain' || trackName === 'Forest Sounds') {
      // Rain/forest simulation with multiple noise sources
      const bufferSize = ctx.sampleRate * 2;
      const buffer = ctx.createBuffer(1, bufferSize, ctx.sampleRate);
      const data = buffer.getChannelData(0);
      for (let i = 0; i < bufferSize; i++) {
        data[i] = (Math.random() * 2 - 1) * 0.3;
      }
      const source = ctx.createBufferSource();
      source.buffer = buffer;
      source.loop = true;
      
      // Add filter for more natural sound
      const filter = ctx.createBiquadFilter();
      filter.type = 'lowpass';
      filter.frequency.value = 800;
      
      source.connect(filter);
      filter.connect(gainNodeRef.current);
      source.start();
      (oscillatorRef as any).current = source;
    } else {
      // Oscillator-based sounds for others
      const oscillator = ctx.createOscillator();
      oscillator.type = 'sine';
      
      // Different frequencies for different tracks
      const frequencies: Record<string, number> = {
        'Ocean Waves': 110,
        'Piano Lullaby': 261.63, // Middle C
        'Wind Chimes': 440,
      };
      
      oscillator.frequency.value = frequencies[trackName] || 220;
      
      // LFO for wave-like modulation
      const lfo = ctx.createOscillator();
      lfo.frequency.value = 0.5;
      const lfoGain = ctx.createGain();
      lfoGain.gain.value = 20;
      
      lfo.connect(lfoGain);
      lfoGain.connect(oscillator.frequency);
      
      oscillator.connect(gainNodeRef.current);
      oscillator.start();
      lfo.start();
      
      oscillatorRef.current = oscillator;
    }
  };

  const handleTogglePlay = (trackId: string) => {
    const track = tracks.find(t => t.id === trackId);
    if (!track) return;

    // If clicking the same track, toggle it
    if (currentTrack?.id === trackId) {
      if (currentTrack.isPlaying) {
        if (oscillatorRef.current) {
          try {
            oscillatorRef.current.stop();
          } catch (e) {
            // Already stopped
          }
        }
        setCurrentTrack(null);
      } else {
        generateAmbientSound(track.name);
        setCurrentTrack({ ...track, isPlaying: true });
      }
      setTracks(tracks.map(t =>
        t.id === trackId ? { ...t, isPlaying: !t.isPlaying } : t
      ));
    } else {
      // Stop all other tracks and play this one
      if (oscillatorRef.current) {
        try {
          oscillatorRef.current.stop();
        } catch (e) {
          // Already stopped
        }
      }
      
      setTracks(tracks.map(t => ({
        ...t,
        isPlaying: t.id === trackId
      })));
      
      generateAmbientSound(track.name);
      setCurrentTrack({ ...track, isPlaying: true });
    }
  };

  return (
    <div className="min-h-screen pb-24 px-4 sm:px-6">
      {/* Header */}
      <div className="pt-8 sm:pt-12 pb-4 sm:pb-6">
        <h1 className="text-[#F8EDEB] text-2xl sm:text-3xl mb-2">Sleep Music</h1>
        <p className="text-[#A8C7FF] text-sm sm:text-base">Soothing sounds for sweet dreams</p>
      </div>

      {/* Current Playing */}
      {currentTrack?.isPlaying && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-6 bg-gradient-to-r from-[#5B84D8]/30 to-[#162B5B] rounded-3xl p-6 border border-[#5B84D8]/30"
        >
          <div className="flex items-center gap-4 mb-4">
            <div className="w-16 h-16 bg-[#F8EDEB]/20 rounded-full flex items-center justify-center">
              {(() => {
                const Icon = iconMap[currentTrack.icon];
                return <Icon className="w-8 h-8 text-[#F8EDEB]" />;
              })()}
            </div>
            <div className="flex-1">
              <h3 className="text-[#F8EDEB] mb-1">Now Playing</h3>
              <p className="text-[#A8C7FF]">{currentTrack.name}</p>
            </div>
            <motion.div
              animate={{
                scale: [1, 1.2, 1],
                opacity: [1, 0.7, 1],
              }}
              transition={{
                duration: 2,
                repeat: Infinity,
                ease: "easeInOut"
              }}
            >
              <Volume2 className="w-6 h-6 text-[#5B84D8]" />
            </motion.div>
          </div>

          {/* Volume Control */}
          <div className="flex items-center gap-3">
            <Volume2 className="w-4 h-4 text-[#A8C7FF]" />
            <input
              type="range"
              min="0"
              max="100"
              value={volume}
              onChange={(e) => setVolume(Number(e.target.value))}
              className="flex-1 h-1 bg-[#0B2545] rounded-full appearance-none cursor-pointer 
                [&::-webkit-slider-thumb]:appearance-none 
                [&::-webkit-slider-thumb]:w-4 
                [&::-webkit-slider-thumb]:h-4 
                [&::-webkit-slider-thumb]:rounded-full 
                [&::-webkit-slider-thumb]:bg-[#F8EDEB]
                [&::-webkit-slider-thumb]:cursor-pointer
                [&::-moz-range-thumb]:w-4
                [&::-moz-range-thumb]:h-4
                [&::-moz-range-thumb]:rounded-full
                [&::-moz-range-thumb]:bg-[#F8EDEB]
                [&::-moz-range-thumb]:border-0
                [&::-moz-range-thumb]:cursor-pointer"
              style={{
                background: `linear-gradient(to right, #5B84D8 0%, #5B84D8 ${volume}%, #0B2545 ${volume}%, #0B2545 100%)`
              }}
            />
            <span className="text-[#A8C7FF] text-sm w-10 text-right">{volume}%</span>
          </div>
        </motion.div>
      )}

      {/* Music Grid */}
      <div className="grid grid-cols-2 lg:grid-cols-3 gap-3 sm:gap-4">
        {tracks.map((track, index) => {
          const Icon = iconMap[track.icon];

          return (
            <motion.button
              key={track.id}
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: index * 0.05 }}
              onClick={() => handleTogglePlay(track.id)}
              className={`relative overflow-hidden rounded-xl sm:rounded-2xl p-4 sm:p-6 aspect-square flex flex-col items-center justify-center gap-3 sm:gap-4 transition-all active:scale-95 ${
                track.isPlaying
                  ? 'bg-gradient-to-br from-[#5B84D8] to-[#162B5B] border-2 border-[#5B84D8]'
                  : 'bg-[#162B5B]/60 backdrop-blur-sm border border-[#5B84D8]/20 hover:border-[#5B84D8]/40'
              }`}
            >
              {track.isPlaying && (
                <motion.div
                  className="absolute inset-0 bg-gradient-to-br from-[#5B84D8]/20 to-transparent"
                  animate={{
                    opacity: [0.3, 0.6, 0.3],
                  }}
                  transition={{
                    duration: 2,
                    repeat: Infinity,
                    ease: "easeInOut"
                  }}
                />
              )}

              <div className="relative z-10">
                <motion.div
                  animate={track.isPlaying ? {
                    rotate: [0, 360],
                  } : {}}
                  transition={{
                    duration: 20,
                    repeat: Infinity,
                    ease: "linear"
                  }}
                  className="w-14 h-14 sm:w-16 sm:h-16 bg-[#F8EDEB]/20 rounded-full flex items-center justify-center mb-2"
                >
                  <Icon className="w-7 h-7 sm:w-8 sm:h-8 text-[#F8EDEB]" />
                </motion.div>

                <h3 className="text-[#F8EDEB] text-center mb-1 text-sm sm:text-base">{track.name}</h3>
                <p className="text-[#A8C7FF] text-xs sm:text-sm text-center">{track.duration}</p>

                <div className={`mt-3 sm:mt-4 w-10 h-10 sm:w-12 sm:h-12 mx-auto bg-[#F8EDEB]/10 rounded-full flex items-center justify-center ${
                  track.isPlaying ? 'bg-[#F8EDEB]/20' : ''
                }`}>
                  {track.isPlaying ? (
                    <Pause className="w-5 h-5 sm:w-6 sm:h-6 text-[#F8EDEB]" />
                  ) : (
                    <Play className="w-5 h-5 sm:w-6 sm:h-6 text-[#F8EDEB]" />
                  )}
                </div>
              </div>
            </motion.button>
          );
        })}
      </div>
    </div>
  );
}
