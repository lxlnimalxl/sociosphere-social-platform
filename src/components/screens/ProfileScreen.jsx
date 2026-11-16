import React, { useState } from 'react';
import { ArrowLeft, MessageSquare, UserPlus, UserCheck, Grid, Image as ImageIcon, Video, Home, Search, Plus, User } from 'lucide-react';
import profileCover from '../../assets/images/profile-cover.png';
import avatarCatherine from '../../assets/images/avatar-catherine.png';
import gallery1 from '../../assets/images/gallery-1.png';
import gallery2 from '../../assets/images/gallery-2.png';
import gallery3 from '../../assets/images/gallery-3.png';
import gallery4 from '../../assets/images/gallery-4.png';
import gallery5 from '../../assets/images/gallery-5.png';
import gallery6 from '../../assets/images/gallery-6.png';

const GALLERY_PHOTOS = [
  { id: 1, src: gallery1, span: 'h-52', col: 1 },
  { id: 2, src: gallery2, span: 'h-36', col: 2 },
  { id: 3, src: gallery3, span: 'h-40', col: 1 },
  { id: 4, src: gallery4, span: 'h-52', col: 2 },
  { id: 5, src: gallery5, span: 'h-44', col: 1 },
  { id: 6, src: gallery6, span: 'h-38', col: 2 },
];

export default function ProfileScreen({
  profile,
  onToggleFollow,
  onNavigate,
  onViewImage,
  onOpenCreatePost
}) {
  const [activeTab, setActiveTab] = useState('All');
  const [isFollowing, setIsFollowing] = useState(profile?.is_following || false);
  const [followersCount, setFollowersCount] = useState(profile?.followers_count || 1024);

  const handleFollowClick = () => {
    const nextState = !isFollowing;
    setIsFollowing(nextState);
    setFollowersCount((prev) => (nextState ? prev + 1 : prev - 1));
    if (onToggleFollow) onToggleFollow(profile?.username || 'Catherine13');
  };

  const col1Photos = GALLERY_PHOTOS.filter((p) => p.col === 1);
  const col2Photos = GALLERY_PHOTOS.filter((p) => p.col === 2);

  return (
    <div className="relative flex-1 flex flex-col bg-[#E6EEFA] pb-24">
      {/* Top Cover Banner */}
      <div className="relative w-full h-[180px] bg-slate-800">
        <img
          src={profileCover}
          alt="Profile Cover"
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-black/40 via-transparent to-black/20" />

        {/* Top Header Navigation Overlay */}
        <div className="absolute inset-x-0 top-3 flex items-center justify-between px-5 z-10">
          <button
            onClick={() => onNavigate('home')}
            className="w-10 h-10 rounded-full bg-white/80 backdrop-blur-md shadow text-slate-800 flex items-center justify-center hover:bg-white transition cursor-pointer"
            title="Back to Home"
          >
            <ArrowLeft size={19} className="stroke-[2.5]" />
          </button>

          <button
            onClick={() => onNavigate('chat')}
            className="w-10 h-10 rounded-full bg-white/80 backdrop-blur-md shadow text-slate-800 flex items-center justify-center hover:bg-white transition cursor-pointer"
            title="Direct Message"
          >
            <MessageSquare size={18} className="stroke-[2.2]" />
          </button>
        </div>
      </div>

      {/* Profile Bio Section */}
      <div className="relative px-5 pt-0 -mt-14 flex flex-col items-center text-center">
        {/* Avatar */}
        <div className="relative w-24 h-24 rounded-full overflow-hidden border-4 border-white shadow-lg bg-white mb-2.5">
          <img
            src={avatarCatherine}
            alt="Catherine Vance"
            className="w-full h-full object-cover"
          />
        </div>

        {/* Name & Username */}
        <h2 className="text-xl font-bold text-slate-900 tracking-tight">Catherine Vance</h2>
        <p className="text-xs font-medium text-[#6C7A9C] mb-2.5">@Catherine13</p>

        {/* Bio */}
        <p className="text-xs text-slate-600 leading-relaxed max-w-[310px] mb-4">
          My name is Catherine. I like dancing in the rain and travelling all around the world.
        </p>

        {/* Stats Row & Actions */}
        <div className="w-full max-w-[340px] bg-white rounded-2xl p-3.5 card-shadow border border-slate-100 flex items-center justify-between mb-5">
          <div className="flex space-x-6 pl-2 text-left">
            <div>
              <p className="text-base font-bold text-slate-900">
                {followersCount >= 1000 ? `${(followersCount / 1000).toFixed(1)}k` : followersCount}
              </p>
              <p className="text-[11px] text-[#6C7A9C] font-medium">Followers</p>
            </div>
            <div className="w-[1px] h-8 bg-slate-100 self-center" />
            <div>
              <p className="text-base font-bold text-slate-900">{profile?.following_count || 342}</p>
              <p className="text-[11px] text-[#6C7A9C] font-medium">Following</p>
            </div>
          </div>

          <div className="flex items-center space-x-2">
            <button
              onClick={handleFollowClick}
              className={`px-4 py-2 rounded-xl text-xs font-semibold transition-all cursor-pointer flex items-center space-x-1.5 shadow-xs ${
                isFollowing
                  ? 'bg-slate-100 text-slate-700 hover:bg-slate-200'
                  : 'bg-[#5790DF] text-white hover:bg-[#487bc2] shadow-[#5790DF]/20'
              }`}
            >
              {isFollowing ? (
                <>
                  <UserCheck size={14} />
                  <span>Following</span>
                </>
              ) : (
                <>
                  <UserPlus size={14} />
                  <span>Follow</span>
                </>
              )}
            </button>

            <button
              onClick={() => onNavigate('chat')}
              className="p-2 rounded-xl bg-slate-100 text-slate-700 hover:bg-slate-200 transition cursor-pointer"
              title="Message"
            >
              <MessageSquare size={16} />
            </button>
          </div>
        </div>

        {/* Category Tabs */}
        <div className="w-full max-w-[340px] flex items-center justify-center space-x-2 mb-4 bg-white/70 p-1 rounded-2xl border border-slate-200/50">
          {[
            { name: 'All', icon: Grid },
            { name: 'Photos', icon: ImageIcon },
            { name: 'Videos', icon: Video },
          ].map((tab) => {
            const Icon = tab.icon;
            const isActive = activeTab === tab.name;
            return (
              <button
                key={tab.name}
                onClick={() => setActiveTab(tab.name)}
                className={`flex-1 py-1.5 px-3 rounded-xl text-xs font-semibold flex items-center justify-center space-x-1.5 transition-all cursor-pointer ${
                  isActive
                    ? 'bg-[#5790DF] text-white shadow-xs'
                    : 'text-slate-600 hover:text-slate-900'
                }`}
              >
                <Icon size={13} />
                <span>{tab.name}</span>
              </button>
            );
          })}
        </div>

        {/* Asymmetrical 2-Column Masonry Gallery */}
        <div className="w-full max-w-[350px] grid grid-cols-2 gap-3">
          {/* Column 1 */}
          <div className="flex flex-col gap-3">
            {col1Photos.map((photo) => (
              <div
                key={photo.id}
                onClick={() => onViewImage(photo.src)}
                className={`relative w-full ${photo.span} rounded-2xl overflow-hidden card-shadow bg-slate-200 cursor-pointer group`}
              >
                <img
                  src={photo.src}
                  alt={`Catherine Gallery ${photo.id}`}
                  className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-black/0 group-hover:bg-black/15 transition-colors" />
              </div>
            ))}
          </div>

          {/* Column 2 */}
          <div className="flex flex-col gap-3">
            {col2Photos.map((photo) => (
              <div
                key={photo.id}
                onClick={() => onViewImage(photo.src)}
                className={`relative w-full ${photo.span} rounded-2xl overflow-hidden card-shadow bg-slate-200 cursor-pointer group`}
              >
                <img
                  src={photo.src}
                  alt={`Catherine Gallery ${photo.id}`}
                  className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-black/0 group-hover:bg-black/15 transition-colors" />
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Floating Bottom Tab Bar */}
      <div className="sticky bottom-4 mx-auto w-[342px] max-w-[calc(100%-32px)] z-20 mt-auto pt-2">
        <div className="bg-white/95 backdrop-blur-md rounded-full px-5 py-2.5 floating-tab-shadow border border-slate-200/70 flex items-center justify-between">
          <button
            onClick={() => onNavigate('home')}
            className="flex flex-col items-center justify-center text-slate-400 hover:text-slate-700 transition cursor-pointer"
          >
            <Home size={22} className="stroke-[2]" />
          </button>

          <button
            onClick={() => onNavigate('home')}
            className="flex flex-col items-center justify-center text-slate-400 hover:text-slate-700 transition cursor-pointer"
          >
            <Search size={21} className="stroke-[2]" />
          </button>

          <div className="relative -top-4">
            <button
              onClick={onOpenCreatePost}
              className="w-12 h-12 rounded-full bg-gradient-to-tr from-[#5790DF] to-[#3B82F6] text-white flex items-center justify-center shadow-[0_8px_20px_rgba(87,144,223,0.45)] hover:scale-105 active:scale-95 transition-all cursor-pointer ring-4 ring-[#E6EEFA]"
              title="Create Post"
            >
              <Plus size={24} className="stroke-[3]" />
            </button>
          </div>

          <button
            onClick={() => onNavigate('chat')}
            className="relative flex flex-col items-center justify-center text-slate-400 hover:text-slate-700 transition cursor-pointer"
          >
            <MessageSquare size={21} className="stroke-[2]" />
            <span className="absolute -top-1 -right-1 w-4 h-4 rounded-full bg-[#093D89] text-[9px] text-white font-bold flex items-center justify-center border border-white">
              2
            </span>
          </button>

          <button
            onClick={() => onNavigate('profile')}
            className="flex flex-col items-center justify-center cursor-pointer group"
          >
            <div className="w-6 h-6 rounded-full overflow-hidden border-2 border-[#5790DF] shadow-xs">
              <img src={avatarCatherine} alt="Catherine" className="w-full h-full object-cover" />
            </div>
            <span className="w-1.5 h-1.5 rounded-full bg-[#5790DF] mt-0.5" />
          </button>
        </div>
      </div>
    </div>
  );
}
