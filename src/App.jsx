import React, { useState, useEffect } from 'react';
import DeviceFrame from './components/layout/DeviceFrame';
import HomeScreen from './components/screens/HomeScreen';
import ProfileScreen from './components/screens/ProfileScreen';
import ChatRoomScreen from './components/screens/ChatRoomScreen';
import ExecutiveCanvas from './components/screens/ExecutiveCanvas';
import StoryViewerModal from './components/modals/StoryViewerModal';
import CommentsModal from './components/modals/CommentsModal';
import CreatePostModal from './components/modals/CreatePostModal';
import LightboxModal from './components/modals/LightboxModal';
import { api } from './services/api';
import { Smartphone, LayoutGrid, Server, Layers, Sparkles, ExternalLink } from 'lucide-react';

export default function App() {
  const [viewMode, setViewMode] = useState('simulator'); // 'simulator' | 'canvas'
  const [activeScreen, setActiveScreen] = useState('home'); // 'home' | 'profile' | 'chat'
  
  const [posts, setPosts] = useState([]);
  const [stories, setStories] = useState([]);
  const [profile, setProfile] = useState(null);
  const [messages, setMessages] = useState([]);
  
  // Modals state
  const [activeStory, setActiveStory] = useState(null);
  const [commentingPost, setCommentingPost] = useState(null);
  const [isCreatePostOpen, setIsCreatePostOpen] = useState(false);
  const [lightboxImage, setLightboxImage] = useState(null);
  const [isBackendConnected, setIsBackendConnected] = useState(false);

  // Initial Data Fetching
  useEffect(() => {
    async function loadData() {
      try {
        const [postsData, storiesData, profileData, messagesData] = await Promise.all([
          api.getPosts(),
          api.getStories(),
          api.getProfile('Catherine13'),
          api.getMessages('Benjamin')
        ]);

        setPosts(postsData);
        setStories(storiesData);
        setProfile(profileData);
        setMessages(messagesData);

        // Quick backend ping test
        try {
          const res = await fetch('http://127.0.0.1:8000/api/posts/');
          if (res.ok) setIsBackendConnected(true);
        } catch {
          setIsBackendConnected(false);
        }
      } catch (err) {
        console.error('Initialization error:', err);
      }
    }
    loadData();
  }, []);

  // Handlers
  const handleToggleLike = async (postId) => {
    // Optimistic UI update
    setPosts((prev) =>
      prev.map((p) => {
        if (p.id === postId) {
          const isLiked = !p.is_liked;
          return {
            ...p,
            is_liked: isLiked,
            likes_count: isLiked ? p.likes_count + 1 : p.likes_count - 1
          };
        }
        return p;
      })
    );
    await api.toggleLike(postId);
  };

  const handleAddComment = async (postId, text) => {
    const updatedPost = await api.addComment(postId, text);
    setPosts((prev) =>
      prev.map((p) => (p.id === postId ? updatedPost : p))
    );
    if (commentingPost?.id === postId) {
      setCommentingPost(updatedPost);
    }
  };

  const handleCreatePost = (newPostData) => {
    const newPost = {
      id: Date.now(),
      ...newPostData
    };
    setPosts((prev) => [newPost, ...prev]);
  };

  const handleToggleFollow = async (username) => {
    const updated = await api.toggleFollow(username);
    setProfile(updated);
  };

  const handleSendMessage = async (text, isMe = true) => {
    const newMsg = {
      id: Date.now(),
      text,
      is_me: isMe,
      created_at: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    };
    setMessages((prev) => [...prev, newMsg]);
    if (isMe) {
      await api.sendMessage(text);
    }
  };

  return (
    <div className="min-h-screen bg-[#E6EEFA] flex flex-col font-sans selection:bg-[#5790DF] selection:text-white">
      {/* Studio Top Control Bar */}
      <header className="sticky top-0 z-40 bg-white/80 backdrop-blur-md border-b border-slate-200/80 px-4 sm:px-8 py-3">
        <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-3">
          {/* Logo & Platform Info */}
          <div className="flex items-center space-x-3">
            <div className="w-9 h-9 rounded-xl bg-gradient-to-tr from-[#093D89] to-[#5790DF] flex items-center justify-center text-white shadow-md font-bold text-lg">
              S
            </div>
            <div>
              <div className="flex items-center space-x-2">
                <span className="font-bold text-slate-900 tracking-tight text-base">SocioSphere</span>
                <span className="text-[10px] uppercase font-bold tracking-wider px-2 py-0.5 rounded bg-blue-50 text-[#093D89] border border-blue-200/50">
                  Full-Stack Platform
                </span>
              </div>
              <p className="text-[11px] text-slate-500">
                React 19 Frontend + Django 5 REST Backend
              </p>
            </div>
          </div>

          {/* Mode Switcher */}
          <div className="flex items-center space-x-1 bg-slate-100 p-1 rounded-xl border border-slate-200">
            <button
              onClick={() => setViewMode('simulator')}
              className={`flex items-center space-x-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold transition cursor-pointer ${
                viewMode === 'simulator'
                  ? 'bg-white text-[#093D89] shadow-xs'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              <Smartphone size={14} />
              <span>Device Simulator</span>
            </button>
            <button
              onClick={() => setViewMode('canvas')}
              className={`flex items-center space-x-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold transition cursor-pointer ${
                viewMode === 'canvas'
                  ? 'bg-white text-[#093D89] shadow-xs'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              <LayoutGrid size={14} />
              <span>Figma Canvas (3 Screens)</span>
            </button>
          </div>

          {/* Screen quick tabs & Backend status */}
          <div className="flex items-center space-x-3">
            {viewMode === 'simulator' && (
              <div className="flex items-center space-x-1 bg-white p-1 rounded-lg border border-slate-200 shadow-2xs">
                {['home', 'profile', 'chat'].map((tab) => (
                  <button
                    key={tab}
                    onClick={() => setActiveScreen(tab)}
                    className={`px-2.5 py-1 rounded text-xs capitalize font-medium transition cursor-pointer ${
                      activeScreen === tab
                        ? 'bg-[#5790DF] text-white'
                        : 'text-slate-600 hover:text-slate-900'
                    }`}
                  >
                    {tab === 'home' ? 'Feed' : tab}
                  </button>
                ))}
              </div>
            )}

            {/* Backend status indicator */}
            <div className="flex items-center space-x-1.5 px-2.5 py-1 rounded-full text-[11px] font-medium border bg-white shadow-2xs">
              <span
                className={`w-2 h-2 rounded-full ${
                  isBackendConnected ? 'bg-emerald-500 animate-pulse' : 'bg-blue-500'
                }`}
              />
              <span className="text-slate-700">
                {isBackendConnected ? 'Django Live' : 'Active Storage'}
              </span>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content Area */}
      <main className="flex-1 flex flex-col justify-center items-center py-6 px-4">
        {viewMode === 'canvas' ? (
          <ExecutiveCanvas
            posts={posts}
            stories={stories}
            profile={profile}
            messages={messages}
            onSelectStory={setActiveStory}
            onToggleLike={handleToggleLike}
            onOpenComments={setCommentingPost}
            onOpenCreatePost={() => setIsCreatePostOpen(true)}
            onToggleFollow={handleToggleFollow}
            onSendMessage={handleSendMessage}
            onNavigate={(screen) => {
              setActiveScreen(screen);
              setViewMode('simulator');
            }}
            onViewImage={setLightboxImage}
          />
        ) : (
          <div className="flex flex-col items-center">
            {/* View Navigation hints */}
            <div className="mb-4 flex items-center space-x-3 text-xs text-slate-500">
              <span className="font-semibold text-[#093D89]">
                Active Screen:{' '}
                {activeScreen === 'home'
                  ? '01 • Feed & Stories'
                  : activeScreen === 'profile'
                  ? '02 • Catherine Vance Profile'
                  : '03 • Benjamin Moore Chat'}
              </span>
              <span>•</span>
              <span>Click bottom icons to switch screens</span>
            </div>

            <DeviceFrame>
              {activeScreen === 'home' && (
                <HomeScreen
                  posts={posts}
                  stories={stories}
                  onSelectStory={setActiveStory}
                  onToggleLike={handleToggleLike}
                  onOpenComments={setCommentingPost}
                  onOpenCreatePost={() => setIsCreatePostOpen(true)}
                  onNavigate={setActiveScreen}
                  onViewImage={setLightboxImage}
                />
              )}
              {activeScreen === 'profile' && (
                <ProfileScreen
                  profile={profile}
                  onToggleFollow={handleToggleFollow}
                  onNavigate={setActiveScreen}
                  onViewImage={setLightboxImage}
                  onOpenCreatePost={() => setIsCreatePostOpen(true)}
                />
              )}
              {activeScreen === 'chat' && (
                <ChatRoomScreen
                  messages={messages}
                  onSendMessage={handleSendMessage}
                  onNavigate={setActiveScreen}
                />
              )}
            </DeviceFrame>
          </div>
        )}
      </main>

      {/* Modals */}
      <StoryViewerModal
        story={activeStory}
        stories={stories}
        onClose={() => setActiveStory(null)}
        onSelectStory={setActiveStory}
      />

      <CommentsModal
        post={commentingPost}
        isOpen={!!commentingPost}
        onClose={() => setCommentingPost(null)}
        onAddComment={handleAddComment}
      />

      <CreatePostModal
        isOpen={isCreatePostOpen}
        onClose={() => setIsCreatePostOpen(false)}
        onCreatePost={handleCreatePost}
      />

      <LightboxModal
        image={lightboxImage}
        isOpen={!!lightboxImage}
        onClose={() => setLightboxImage(null)}
      />
    </div>
  );
}
