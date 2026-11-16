import React, { useState } from 'react';
import { Camera, Bell, Heart, MessageCircle, Send, Bookmark, MoreHorizontal, Plus, Home, Search, MessageSquare, User } from 'lucide-react';
import avatarCatherine from '../../assets/images/avatar-catherine.png';

export default function HomeScreen({
  posts,
  stories,
  onSelectStory,
  onToggleLike,
  onOpenComments,
  onOpenCreatePost,
  onNavigate,
  onViewImage
}) {
  const [savedPosts, setSavedPosts] = useState({});
  const [notifActive, setNotifActive] = useState(true);

  const toggleBookmark = (id) => {
    setSavedPosts((prev) => ({ ...prev, [id]: !prev[id] }));
  };

  return (
    <div className="relative flex-1 flex flex-col bg-[#E6EEFA] pb-24">
      {/* Top Header Bar */}
      <div className="flex items-center justify-between px-5 py-3.5">
        <button
          onClick={onOpenCreatePost}
          className="w-10 h-10 rounded-full bg-white shadow-sm border border-slate-200/60 flex items-center justify-center text-slate-700 hover:text-[#5790DF] hover:shadow transition cursor-pointer"
          title="Create Story or Post"
        >
          <Camera size={19} className="stroke-[2.2]" />
        </button>

        <h1 className="text-xl font-bold tracking-tight text-[#093D89]">
          Explore
        </h1>

        <button
          onClick={() => setNotifActive(!notifActive)}
          className="relative w-10 h-10 rounded-full bg-white shadow-sm border border-slate-200/60 flex items-center justify-center text-slate-700 hover:text-[#5790DF] hover:shadow transition cursor-pointer"
          title="Notifications"
        >
          <Bell size={19} className="stroke-[2.2]" />
          {notifActive && (
            <span className="absolute top-2.5 right-2.5 w-2 h-2 rounded-full bg-rose-500 ring-2 ring-white" />
          )}
        </button>
      </div>

      {/* Stories Carousel */}
      <div className="pt-1 pb-3">
        <div className="flex items-center space-x-3.5 px-5 overflow-x-auto no-scrollbar py-1">
          {stories.map((story, index) => {
            const isMe = story.username === 'You';
            return (
              <div
                key={story.id}
                onClick={() => onSelectStory(story)}
                className="flex flex-col items-center space-y-1.5 flex-shrink-0 cursor-pointer group"
              >
                <div className="relative">
                  <div
                    className={`w-[62px] h-[62px] rounded-full p-[2.5px] transition-transform duration-200 group-hover:scale-105 ${
                      isMe
                        ? 'bg-gradient-to-tr from-slate-200 to-slate-300'
                        : story.is_seen
                        ? 'bg-slate-300'
                        : 'bg-gradient-to-tr from-[#5790DF] via-[#3B82F6] to-[#093D89]'
                    }`}
                  >
                    <img
                      src={story.avatar_url}
                      alt={story.full_name}
                      className="w-full h-full rounded-full object-cover border-2 border-white bg-slate-100"
                    />
                  </div>
                  {isMe && (
                    <div
                      onClick={(e) => {
                        e.stopPropagation();
                        onOpenCreatePost();
                      }}
                      className="absolute bottom-0 right-0 w-5 h-5 rounded-full bg-[#5790DF] text-white flex items-center justify-center border-2 border-white shadow cursor-pointer hover:bg-[#487bc2]"
                      title="Add Story"
                    >
                      <Plus size={12} className="stroke-[3]" />
                    </div>
                  )}
                </div>
                <span className="text-[11px] font-medium text-slate-700 tracking-tight max-w-[62px] truncate text-center">
                  {story.username}
                </span>
              </div>
            );
          })}
        </div>
      </div>

      {/* Main Feed Post Cards */}
      <div className="px-4 space-y-4">
        {posts.map((post) => {
          const isSaved = !!savedPosts[post.id];
          return (
            <div
              key={post.id}
              className="bg-white rounded-[28px] p-3.5 card-shadow border border-slate-100 flex flex-col transition hover:shadow-lg"
            >
              {/* Post Header */}
              <div className="flex items-center justify-between mb-3 px-1">
                <div
                  onClick={() => onNavigate('profile')}
                  className="flex items-center space-x-2.5 cursor-pointer group"
                >
                  <img
                    src={post.author_avatar}
                    alt={post.author_name}
                    className="w-10 h-10 rounded-full object-cover border border-slate-100 group-hover:ring-2 group-hover:ring-[#5790DF]/40 transition"
                  />
                  <div>
                    <h3 className="text-[13px] font-semibold text-slate-900 group-hover:text-[#5790DF] transition leading-tight">
                      {post.author_name}
                    </h3>
                    <p className="text-[11px] text-[#6C7A9C]">
                      @{post.author_username} • {post.created_at}
                    </p>
                  </div>
                </div>

                <button className="text-slate-400 hover:text-slate-600 p-1.5 rounded-full hover:bg-slate-50 transition">
                  <MoreHorizontal size={18} />
                </button>
              </div>

              {/* Post Image */}
              <div
                onClick={() => onViewImage(post.media_url)}
                className="relative w-full aspect-[4/3] rounded-[22px] overflow-hidden bg-slate-100 cursor-pointer group"
              >
                <img
                  src={post.media_url}
                  alt={post.caption}
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-102"
                />
              </div>

              {/* Action Buttons & Likes Bar */}
              <div className="flex items-center justify-between px-1 pt-3 pb-1">
                <div className="flex items-center space-x-4">
                  {/* Like Button */}
                  <button
                    onClick={() => onToggleLike(post.id)}
                    className="flex items-center space-x-1.5 text-xs font-semibold text-slate-700 hover:text-rose-600 transition cursor-pointer"
                  >
                    <Heart
                      size={20}
                      className={`transition-all duration-200 ${
                        post.is_liked
                          ? 'fill-rose-500 stroke-rose-500 scale-110'
                          : 'stroke-slate-700 hover:stroke-rose-500'
                      }`}
                    />
                    <span>{post.likes_count}</span>
                  </button>

                  {/* Comment Button */}
                  <button
                    onClick={() => onOpenComments(post)}
                    className="flex items-center space-x-1.5 text-xs font-semibold text-slate-700 hover:text-[#5790DF] transition cursor-pointer"
                  >
                    <MessageCircle size={20} className="stroke-slate-700 hover:stroke-[#5790DF]" />
                    <span>{post.comments ? post.comments.length : post.comments_count}</span>
                  </button>

                  {/* Share Button */}
                  <button
                    onClick={() => {
                      if (navigator.clipboard) {
                        navigator.clipboard.writeText(window.location.href);
                        alert('Post link copied to clipboard!');
                      }
                    }}
                    className="text-slate-700 hover:text-[#5790DF] transition cursor-pointer"
                    title="Share Post"
                  >
                    <Send size={19} className="stroke-slate-700 -rotate-12 hover:stroke-[#5790DF]" />
                  </button>
                </div>

                {/* Bookmark Button */}
                <button
                  onClick={() => toggleBookmark(post.id)}
                  className="text-slate-700 hover:text-[#093D89] transition cursor-pointer p-1"
                >
                  <Bookmark
                    size={20}
                    className={isSaved ? 'fill-[#093D89] stroke-[#093D89]' : 'stroke-slate-700'}
                  />
                </button>
              </div>

              {/* Post Caption */}
              <div className="px-1 pt-1 text-[12px] leading-relaxed text-slate-800">
                <span className="font-semibold mr-1.5 text-slate-900">{post.author_name}</span>
                <span className="text-slate-600">{post.caption}</span>
              </div>
            </div>
          );
        })}
      </div>

      {/* Floating Bottom Tab Bar */}
      <div className="sticky bottom-4 mx-auto w-[342px] max-w-[calc(100%-32px)] z-20 mt-auto pt-2">
        <div className="bg-white/95 backdrop-blur-md rounded-full px-5 py-2.5 floating-tab-shadow border border-slate-200/70 flex items-center justify-between">
          {/* Home Tab */}
          <button
            onClick={() => onNavigate('home')}
            className="flex flex-col items-center justify-center text-[#5790DF] relative cursor-pointer"
          >
            <Home size={22} className="stroke-[2.5]" />
            <span className="w-1.5 h-1.5 rounded-full bg-[#5790DF] mt-0.5" />
          </button>

          {/* Search Tab */}
          <button
            onClick={() => onNavigate('home')}
            className="flex flex-col items-center justify-center text-slate-400 hover:text-slate-700 transition cursor-pointer"
          >
            <Search size={21} className="stroke-[2]" />
          </button>

          {/* Center Elevated Action Button */}
          <div className="relative -top-4">
            <button
              onClick={onOpenCreatePost}
              className="w-12 h-12 rounded-full bg-gradient-to-tr from-[#5790DF] to-[#3B82F6] text-white flex items-center justify-center shadow-[0_8px_20px_rgba(87,144,223,0.45)] hover:scale-105 active:scale-95 transition-all cursor-pointer ring-4 ring-[#E6EEFA]"
              title="Create Post"
            >
              <Plus size={24} className="stroke-[3]" />
            </button>
          </div>

          {/* Chat Tab */}
          <button
            onClick={() => onNavigate('chat')}
            className="relative flex flex-col items-center justify-center text-slate-400 hover:text-slate-700 transition cursor-pointer"
          >
            <MessageSquare size={21} className="stroke-[2]" />
            <span className="absolute -top-1 -right-1 w-4 h-4 rounded-full bg-[#093D89] text-[9px] text-white font-bold flex items-center justify-center border border-white">
              2
            </span>
          </button>

          {/* Profile Tab */}
          <button
            onClick={() => onNavigate('profile')}
            className="flex flex-col items-center justify-center cursor-pointer group"
          >
            <div className="w-6 h-6 rounded-full overflow-hidden border border-slate-300 group-hover:border-[#5790DF] transition">
              <img src={avatarCatherine} alt="Catherine" className="w-full h-full object-cover" />
            </div>
          </button>
        </div>
      </div>
    </div>
  );
}
