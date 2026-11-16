import React, { useEffect, useState } from 'react';
import { X, Heart, Send } from 'lucide-react';

export default function StoryViewerModal({ story, stories, onClose, onSelectStory }) {
  const [progress, setProgress] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const [message, setMessage] = useState('');
  const [liked, setLiked] = useState(false);

  useEffect(() => {
    if (!story) return;
    setProgress(0);
    setLiked(false);
  }, [story]);

  useEffect(() => {
    if (!story || isPaused) return;

    const interval = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          handleNext();
          return 0;
        }
        return prev + 2;
      });
    }, 80);

    return () => clearInterval(interval);
  }, [story, isPaused]);

  if (!story) return null;

  const currentIndex = stories.findIndex((s) => s.id === story.id);

  const handleNext = () => {
    if (currentIndex < stories.length - 1) {
      onSelectStory(stories[currentIndex + 1]);
    } else {
      onClose();
    }
  };

  const handlePrev = () => {
    if (currentIndex > 0) {
      onSelectStory(stories[currentIndex - 1]);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/85 backdrop-blur-md animate-fade-in">
      <div 
        className="relative w-full max-w-[400px] h-[92vh] max-h-[820px] bg-slate-900 rounded-[36px] overflow-hidden shadow-2xl flex flex-col justify-between"
        onMouseDown={() => setIsPaused(true)}
        onMouseUp={() => setIsPaused(false)}
        onTouchStart={() => setIsPaused(true)}
        onTouchEnd={() => setIsPaused(false)}
      >
        {/* Story Background Image */}
        <img
          src={story.media_url}
          alt={story.full_name}
          className="absolute inset-0 w-full h-full object-cover select-none"
        />
        
        {/* Top Gradient Overlay */}
        <div className="absolute inset-x-0 top-0 h-32 bg-gradient-to-b from-black/70 to-transparent pointer-events-none" />

        {/* Top Header & Progress bars */}
        <div className="relative z-10 p-4 space-y-3">
          {/* Progress indicators for each story */}
          <div className="flex gap-1.5 items-center">
            {stories.map((s, idx) => {
              let fill = '0%';
              if (idx < currentIndex) fill = '100%';
              else if (idx === currentIndex) fill = `${progress}%`;

              return (
                <div key={s.id} className="h-1 flex-1 bg-white/30 rounded-full overflow-hidden">
                  <div
                    className="h-full bg-white transition-all duration-75"
                    style={{ width: fill }}
                  />
                </div>
              );
            })}
          </div>

          {/* User info & Close */}
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-2.5">
              <img
                src={story.avatar_url}
                alt={story.full_name}
                className="w-10 h-10 rounded-full object-cover border-2 border-white/80 shadow"
              />
              <div>
                <p className="text-white text-sm font-semibold leading-tight">{story.full_name}</p>
                <p className="text-white/70 text-xs">Recently active</p>
              </div>
            </div>

            <button
              onClick={onClose}
              className="p-2 rounded-full bg-black/40 text-white hover:bg-black/60 transition"
            >
              <X size={18} />
            </button>
          </div>
        </div>

        {/* Tap zones for navigation */}
        <div className="absolute inset-0 z-0 flex">
          <div className="w-1/3 h-full cursor-pointer" onClick={handlePrev} />
          <div className="w-2/3 h-full cursor-pointer" onClick={handleNext} />
        </div>

        {/* Bottom Interaction Bar */}
        <div className="relative z-10 p-4 pt-8 bg-gradient-to-t from-black/80 via-black/40 to-transparent">
          <div className="flex items-center space-x-2">
            <input
              type="text"
              placeholder={`Reply to ${story.username}...`}
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === 'Enter' && message.trim()) {
                  setMessage('');
                  onClose();
                }
              }}
              className="flex-1 bg-white/20 text-white placeholder-white/60 text-sm px-4 py-2.5 rounded-full border border-white/25 focus:outline-none focus:ring-2 focus:ring-[#5790DF]"
            />
            <button
              onClick={() => setLiked(!liked)}
              className={`p-2.5 rounded-full transition ${liked ? 'bg-red-500 text-white' : 'bg-white/20 text-white hover:bg-white/30'}`}
            >
              <Heart size={20} className={liked ? 'fill-white' : ''} />
            </button>
            <button
              onClick={() => {
                if (message.trim()) setMessage('');
                onClose();
              }}
              className="p-2.5 rounded-full bg-[#5790DF] text-white hover:bg-[#487bc2] transition"
            >
              <Send size={18} />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
