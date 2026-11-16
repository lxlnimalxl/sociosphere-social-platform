import React from 'react';
import DeviceFrame from '../layout/DeviceFrame';
import HomeScreen from './HomeScreen';
import ProfileScreen from './ProfileScreen';
import ChatRoomScreen from './ChatRoomScreen';
import { Layers, Sparkles } from 'lucide-react';

export default function ExecutiveCanvas({
  posts,
  stories,
  profile,
  messages,
  onSelectStory,
  onToggleLike,
  onOpenComments,
  onOpenCreatePost,
  onToggleFollow,
  onSendMessage,
  onNavigate,
  onViewImage
}) {
  return (
    <div className="w-full min-h-screen bg-[#E6EEFA] py-10 px-6 flex flex-col items-center">
      {/* Canvas Header */}
      <div className="text-center mb-8 max-w-2xl">
        <div className="inline-flex items-center space-x-2 px-3 py-1.5 rounded-full bg-white/80 border border-[#5790DF]/30 text-[#093D89] text-xs font-semibold mb-3 shadow-xs">
          <Sparkles size={14} className="text-[#5790DF]" />
          <span>Figma System Multi-Screen Verification</span>
        </div>
        <h1 className="text-3xl sm:text-4xl font-extrabold text-[#093D89] tracking-tight">
          SocioSphere Mobile Design System
        </h1>
        <p className="text-sm text-[#6C7A9C] mt-2 leading-relaxed">
          Production-grade Full-Stack Social App engineered with React 19, Tailwind CSS, and Django REST Framework.
          Simultaneous real-time multi-view canvas replicating Figma frame <code className="bg-white/60 px-1.5 py-0.5 rounded text-[#093D89]">17:789</code>.
        </p>
      </div>

      {/* Tri-screen Canvas Container */}
      <div className="w-full max-w-[1360px] flex flex-wrap justify-center items-start gap-10">
        {/* Screen 1: Home Feed */}
        <div className="flex flex-col items-center space-y-3">
          <div className="flex items-center space-x-2 text-xs font-bold text-[#093D89] bg-white/80 px-4 py-1.5 rounded-full shadow-2xs border border-slate-200/60">
            <span className="w-2 h-2 rounded-full bg-[#5790DF]" />
            <span>01 • Home & Story Carousel</span>
          </div>
          <DeviceFrame>
            <HomeScreen
              posts={posts}
              stories={stories}
              onSelectStory={onSelectStory}
              onToggleLike={onToggleLike}
              onOpenComments={onOpenComments}
              onOpenCreatePost={onOpenCreatePost}
              onNavigate={onNavigate}
              onViewImage={onViewImage}
            />
          </DeviceFrame>
        </div>

        {/* Screen 2: Profile & Masonry */}
        <div className="flex flex-col items-center space-y-3">
          <div className="flex items-center space-x-2 text-xs font-bold text-[#093D89] bg-white/80 px-4 py-1.5 rounded-full shadow-2xs border border-slate-200/60">
            <span className="w-2 h-2 rounded-full bg-[#5790DF]" />
            <span>02 • Profile & Masonry Gallery</span>
          </div>
          <DeviceFrame>
            <ProfileScreen
              profile={profile}
              onToggleFollow={onToggleFollow}
              onNavigate={onNavigate}
              onViewImage={onViewImage}
              onOpenCreatePost={onOpenCreatePost}
            />
          </DeviceFrame>
        </div>

        {/* Screen 3: Chat Room */}
        <div className="flex flex-col items-center space-y-3">
          <div className="flex items-center space-x-2 text-xs font-bold text-[#093D89] bg-white/80 px-4 py-1.5 rounded-full shadow-2xs border border-slate-200/60">
            <span className="w-2 h-2 rounded-full bg-[#5790DF]" />
            <span>03 • Live Chat & Direct Thread</span>
          </div>
          <DeviceFrame>
            <ChatRoomScreen
              messages={messages}
              onSendMessage={onSendMessage}
              onNavigate={onNavigate}
            />
          </DeviceFrame>
        </div>
      </div>
    </div>
  );
}
