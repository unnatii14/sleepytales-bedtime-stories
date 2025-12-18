import { useState, useRef, useEffect } from 'react';
import { motion } from 'motion/react';
import { CloudRain, Waves, Music as MusicIcon, Wind, Radio, Trees, Play, Pause, Volume2, Mic } from 'lucide-react';
import type { Music, Rhyme, Screen } from '../App';

interface MusicPlayerProps {
  musicTracks: Music[];
  rhymes: Rhyme[];
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

export function MusicPlayer({ musicTracks, rhymes, onNavigate }: MusicPlayerProps) {
  const [tracks, setTracks] = useState(musicTracks);
  const [rhymeList, setRhymeList] = useState(rhymes);
  const [currentTrack, setCurrentTrack] = useState<Music | null>(null);
  const [currentRhyme, setCurrentRhyme] = useState<Rhyme | null>(null);
  const [volume, setVolume] = useState(70);
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const audioContextRef = useRef<AudioContext | null>(null);
  const oscillatorRef = useRef<OscillatorNode | null>(null);
  const gainNodeRef = useRef<GainNode | null>(null);
  const synthRef = useRef<SpeechSynthesis>(window.speechSynthesis);
  const utteranceRef = useRef<SpeechSynthesisUtterance | null>(null);
  // Load voices and set best default
  useEffect(() => {
    function loadVoices() {
      const allVoices = synthRef.current.getVoices();
      setVoices(allVoices);
      // Try to pick a child-friendly female English voice
      const preferred =
        allVoices.find(v => v.name.toLowerCase().includes('child')) ||
        allVoices.find(v => v.name.includes('Zira')) ||
        allVoices.find(v => v.name.includes('Google UK English Female')) ||
        allVoices.find(v => v.name.includes('Samantha')) ||
        allVoices.find(v => v.lang.startsWith('en') && v.name.toLowerCase().includes('female')) ||
        allVoices.find(v => v.lang.startsWith('en')) ||
        allVoices[0];
      if (preferred) setSelectedVoiceURI(preferred.voiceURI);
    }
    if (typeof window !== 'undefined' && window.speechSynthesis) {
      if (synthRef.current.getVoices().length === 0) {
        window.speechSynthesis.onvoiceschanged = loadVoices;
      } else {
        loadVoices();
      }
    }
  }, []);

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
      synthRef.current.cancel();
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
    // Stop any playing rhyme first
    synthRef.current.cancel();
    setRhymeList(rhymeList.map(r => ({ ...r, isPlaying: false })));
    setCurrentRhyme(null);

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

  const handlePlayRhyme = (rhymeId: string) => {
    // Stop any playing sound first
    if (oscillatorRef.current) {
      try {
        oscillatorRef.current.stop();
      } catch (e) {}
    }
    setTracks(tracks.map(t => ({ ...t, isPlaying: false })));
    setCurrentTrack(null);

    const rhyme = rhymeList.find(r => r.id === rhymeId);
    if (!rhyme) return;

    if (currentRhyme?.id === rhymeId && currentRhyme.isPlaying) {
      // Stop playing
      if (audioRef.current) {
        audioRef.current.pause();
        audioRef.current.currentTime = 0;
      }
      setRhymeList(rhymeList.map(r => ({ ...r, isPlaying: false })));
      setCurrentRhyme(null);
    } else {
      // Stop any other rhyme and play this one
      if (audioRef.current) {
          audioRef.current.pause();
          audioRef.current.currentTime = 0;
          // Use Vite base URL for correct asset path
          const base = import.meta.env.BASE_URL || '/';
          audioRef.current.src = `${base}music/${rhyme.audio}`;
          audioRef.current.volume = volume / 100;
          // Play in user event to avoid autoplay restrictions
          audioRef.current.play().catch(() => {});
        }
      setRhymeList(rhymeList.map(r => ({
        ...r,
        isPlaying: r.id === rhymeId
      })));
      setCurrentRhyme({ ...rhyme, isPlaying: true });
    }
  };

  // Update volume if changed while playing
  useEffect(() => {
    if (audioRef.current) {
      audioRef.current.volume = volume / 100;
    }
  }, [volume]);


  return (
    <div className="min-h-screen pb-24 px-2 sm:px-4 flex flex-col items-center">
      <div className="w-full max-w-5xl mx-auto bg-[#0B2545]/80 border border-[#5B84D8]/30 rounded-3xl shadow-2xl shadow-[#0B2545]/30 p-4 sm:p-8 mt-6 mb-8">
        {/* Navigation Bar */}
        <div className="flex items-center gap-3 pt-2 pb-2">
          <button
            onClick={() => onNavigate('home')}
            className="flex items-center gap-2 text-[#A8C7FF] hover:text-[#F8EDEB] text-base font-medium px-3 py-2 rounded-lg transition-colors"
          >
            <svg width="22" height="22" fill="none" viewBox="0 0 24 24" stroke="currentColor" className="w-5 h-5">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15.75 19.5L8.25 12l7.5-7.5" />
            </svg>
            <span>Stories</span>
          </button>
          <span className="text-[#5B84D8] font-bold text-lg">/</span>
          <span className="text-[#F8EDEB] font-semibold text-lg">Music & Rhymes</span>
        </div>

        {/* Header */}
        <div className="pt-2 sm:pt-4 pb-6 sm:pb-8 text-center">
          <h1 className="text-[#F8EDEB] text-2xl sm:text-3xl mb-2">Music & Rhymes</h1>
          <p className="text-[#A8C7FF] text-sm sm:text-base">
            Soothing nursery rhymes and calming sleep sounds, side by side.
          </p>
        </div>

        {/* Current Playing */}
        {(currentTrack?.isPlaying || currentRhyme?.isPlaying) && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="mb-6 bg-gradient-to-r from-[#5B84D8]/30 to-[#162B5B] rounded-3xl p-6 border border-[#5B84D8]/30"
          >
            <div className="flex items-center gap-4 mb-4">
              <div className="w-16 h-16 bg-[#F8EDEB]/20 rounded-full flex items-center justify-center">
                {currentRhyme?.isPlaying ? (
                  <span className="text-3xl">{currentRhyme.emoji}</span>
                ) : currentTrack && (
                  (() => {
                    const Icon = iconMap[currentTrack.icon];
                    return <Icon className="w-8 h-8 text-[#F8EDEB]" />;
                  })()
                )}
              </div>
              <div className="flex-1">
                <h3 className="text-[#F8EDEB] mb-1">Now Playing</h3>
                <p className="text-[#A8C7FF]">{currentRhyme?.title || currentTrack?.name}</p>
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
                {currentRhyme?.isPlaying ? (
                  <Mic className="w-6 h-6 text-[#5B84D8]" />
                ) : (
                  <Volume2 className="w-6 h-6 text-[#5B84D8]" />
                )}
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

        {/* Main Content: Rhymes & Sounds - stacked and centered */}
        <div className="flex flex-col gap-10 items-center">
          {/* Nursery Rhymes Section */}
          <div className="w-full max-w-2xl">
            <div className="mb-4 text-center">
              <h2 className="text-[#A8C7FF] text-lg font-semibold border-b border-[#5B84D8]/30 pb-2 mb-2 inline-block">
                🎵 Nursery Rhymes
              </h2>
            </div>
            {/* Audio element for rhyme playback (always rendered, src set by play handler) */}
            <audio
              ref={audioRef}
              onEnded={() => {
                setRhymeList(rhymeList.map(r => ({ ...r, isPlaying: false })));
                setCurrentRhyme(null);
              }}
              style={{ display: 'none' }}
            />
            <div className="space-y-3 sm:space-y-4">
              {rhymeList.map((rhyme, index) => (
                <motion.button
                  key={rhyme.id}
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: index * 0.05 }}
                  onClick={() => handlePlayRhyme(rhyme.id)}
                  className={`w-full relative overflow-hidden rounded-2xl px-4 py-3 sm:px-6 sm:py-4 flex items-center justify-between gap-4 transition-all active:scale-95 ${
                    rhyme.isPlaying
                      ? 'bg-gradient-to-br from-[#5B84D8] to-[#162B5B] border-2 border-[#5B84D8]'
                      : 'bg-[#162B5B]/60 backdrop-blur-sm border border-[#5B84D8]/20 hover:border-[#5B84D8]/40'
                  }`}
                >
                  {rhyme.isPlaying && (
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

                  <div className="relative z-10 flex items-center gap-3 sm:gap-4 flex-1">
                    <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-full bg-[#F8EDEB]/10 flex items-center justify-center text-2xl sm:text-3xl">
                      {rhyme.emoji}
                    </div>
                    <div className="text-left">
                      <h3 className="text-[#F8EDEB] mb-1 text-sm sm:text-base font-medium line-clamp-2">
                        {rhyme.title}
                      </h3>
                      <p className="text-[#A8C7FF] text-xs sm:text-sm">
                        Tap to play this nursery rhyme
                      </p>
                    </div>
                  </div>

                  <div className={`relative z-10 w-9 h-9 sm:w-11 sm:h-11 rounded-full bg-[#F8EDEB]/10 flex items-center justify-center ${
                    rhyme.isPlaying ? 'bg-[#F8EDEB]/20' : ''
                  }`}>
                    {rhyme.isPlaying ? (
                      <Pause className="w-4 h-4 sm:w-5 sm:h-5 text-[#F8EDEB]" />
                    ) : (
                      <Play className="w-4 h-4 sm:w-5 sm:h-5 text-[#F8EDEB]" />
                    )}
                  </div>
                </motion.button>
              ))}
            </div>
          </div>

          {/* Sleep Sounds Section */}
          <div className="w-full max-w-2xl">
            <div className="mb-4 text-center">
              <h2 className="text-[#A8C7FF] text-lg font-semibold border-b border-[#5B84D8]/30 pb-2 mb-2 inline-block">
                🎧 Sleep Sounds
              </h2>
            </div>
            <div className="space-y-3 sm:space-y-4">
              {tracks.map((track, index) => {
                const Icon = iconMap[track.icon];

                return (
                  <motion.button
                    key={track.id}
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ delay: index * 0.05 }}
                    onClick={() => handleTogglePlay(track.id)}
                    className={`w-full relative overflow-hidden rounded-2xl px-4 py-3 sm:px-6 sm:py-4 flex items-center justify-between gap-4 transition-all active:scale-95 ${
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

                    <div className="relative z-10 flex items-center gap-3 sm:gap-4 flex-1">
                      <motion.div
                        animate={track.isPlaying ? {
                          rotate: [0, 360],
                        } : {}}
                        transition={{
                          duration: 20,
                          repeat: Infinity,
                          ease: "linear"
                        }}
                        className="w-10 h-10 sm:w-12 sm:h-12 bg-[#F8EDEB]/20 rounded-full flex items-center justify-center"
                      >
                        <Icon className="w-7 h-7 sm:w-8 sm:h-8 text-[#F8EDEB]" />
                      </motion.div>

                      <div className="text-left">
                        <h3 className="text-[#F8EDEB] mb-1 text-sm sm:text-base font-medium">
                          {track.name}
                        </h3>
                        <p className="text-[#A8C7FF] text-xs sm:text-sm">
                          {track.duration}
                        </p>
                      </div>
                    </div>

                    <div className={`relative z-10 w-9 h-9 sm:w-11 sm:h-11 rounded-full bg-[#F8EDEB]/10 flex items-center justify-center ${
                      track.isPlaying ? 'bg-[#F8EDEB]/20' : ''
                    }`}>
                      {track.isPlaying ? (
                        <Pause className="w-4 h-4 sm:w-5 sm:h-5 text-[#F8EDEB]" />
                      ) : (
                        <Play className="w-4 h-4 sm:w-5 sm:h-5 text-[#F8EDEB]" />
                      )}
                    </div>
                  </motion.button>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
