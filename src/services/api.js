// Hybrid API Client: Connects to Django Backend if available, falls back to rich local state for GitHub Pages

import avatarCatherine from '../assets/images/avatar-catherine.png';
import profileCover from '../assets/images/profile-cover.png';
import avatarClaire from '../assets/images/avatar-claire.png';
import avatarFarita from '../assets/images/avatar-farita.png';
import avatarBenjamin from '../assets/images/avatar-benjamin.png';
import storyYou from '../assets/images/story-you.png';
import storyBenjamin from '../assets/images/story-benjamin.png';
import storyFarita from '../assets/images/story-farita.png';
import storyMarie from '../assets/images/story-marie.png';
import storyClaire from '../assets/images/story-claire.png';
import postClaire from '../assets/images/post-claire.png';
import postFarita from '../assets/images/post-farita.png';
import gallery1 from '../assets/images/gallery-1.png';
import gallery2 from '../assets/images/gallery-2.png';
import gallery3 from '../assets/images/gallery-3.png';
import gallery4 from '../assets/images/gallery-4.png';
import gallery5 from '../assets/images/gallery-5.png';
import gallery6 from '../assets/images/gallery-6.png';

const API_BASE_URL = 'http://127.0.0.1:8000/api';

const INITIAL_PROFILES = [
  {
    username: 'Catherine13',
    full_name: 'Catherine Vance',
    avatar_url: avatarCatherine,
    cover_url: profileCover,
    bio: 'My name is Catherine. I like dancing in the rain and travelling all around the world.',
    followers_count: 1024,
    following_count: 342,
    is_following: false,
    gallery: [gallery1, gallery2, gallery3, gallery4, gallery5, gallery6]
  },
  {
    username: 'ClaireD15',
    full_name: 'Claire Dangais',
    avatar_url: avatarClaire,
    bio: 'Visual artist & street photographer living between Paris and Tokyo.',
    followers_count: 2480,
    following_count: 410,
    is_following: true
  },
  {
    username: 'SmithFa',
    full_name: 'Farita Smith',
    avatar_url: avatarFarita,
    bio: 'Architectural minimalist | Coffee enthusiast | Exploring geometric forms.',
    followers_count: 1890,
    following_count: 312,
    is_following: false
  },
  {
    username: 'BenjaminM',
    full_name: 'Benjamin Moore',
    avatar_url: avatarBenjamin,
    bio: 'Product designer & tech explorer.',
    followers_count: 980,
    following_count: 210,
    is_following: true
  }
];

const INITIAL_STORIES = [
  { id: 1, username: 'You', full_name: 'You', avatar_url: storyYou, media_url: storyYou, is_seen: false },
  { id: 2, username: 'Benjamin', full_name: 'Benjamin Moore', avatar_url: storyBenjamin, media_url: storyBenjamin, is_seen: false },
  { id: 3, username: 'Farita', full_name: 'Farita Smith', avatar_url: storyFarita, media_url: storyFarita, is_seen: false },
  { id: 4, username: 'Marie', full_name: 'Marie Dupont', avatar_url: storyMarie, media_url: storyMarie, is_seen: false },
  { id: 5, username: 'Claire', full_name: 'Claire Dangais', avatar_url: storyClaire, media_url: storyClaire, is_seen: false },
];

const INITIAL_POSTS = [
  {
    id: 1,
    author_username: 'ClaireD15',
    author_name: 'Claire Dangais',
    author_avatar: avatarClaire,
    media_url: postClaire,
    caption: 'Morning brew in the heart of Shibuya. The light today was completely unmatched.',
    likes_count: 1420,
    comments_count: 38,
    is_liked: true,
    created_at: '2 hours ago',
    comments: [
      { id: 1, author_name: 'Catherine Vance', author_avatar: avatarCatherine, text: 'The atmosphere here is pure perfection! Which lens did you use?' },
      { id: 2, author_name: 'Benjamin Moore', author_avatar: avatarBenjamin, text: 'Amazing lighting and color palette!' }
    ]
  },
  {
    id: 2,
    author_username: 'SmithFa',
    author_name: 'Farita Smith',
    author_avatar: avatarFarita,
    media_url: postFarita,
    caption: 'Golden hour architectural reflections. Minimalist lines meeting organic warmth.',
    likes_count: 892,
    comments_count: 19,
    is_liked: false,
    created_at: '5 hours ago',
    comments: [
      { id: 3, author_name: 'Claire Dangais', author_avatar: avatarClaire, text: 'Sensational symmetry and composition!' }
    ]
  }
];

const INITIAL_MESSAGES = [
  { id: 1, sender: 'Benjamin Moore', text: 'Hi Catherine ! How are you?', is_me: false, time: '11:40 AM' },
  { id: 2, sender: 'Catherine Vance', text: 'I’m good and you?', is_me: true, time: '11:41 AM' },
  { id: 3, sender: 'Catherine Vance', text: 'I’m working on my app design.', is_me: true, time: '11:42 AM' },
  { id: 4, sender: 'Benjamin Moore', text: 'That sounds great! ', is_me: false, time: '11:42 AM' },
  { id: 5, sender: 'Benjamin Moore', text: 'I’m doing good. What are you doing ?', is_me: false, time: '11:43 AM' },
  { id: 6, sender: 'Benjamin Moore', text: 'Let’s get lunch! How about sushi ?', is_me: false, time: '11:44 AM' },
];

class StorageService {
  constructor() {
    this.profiles = this.load('socio_profiles', INITIAL_PROFILES);
    this.stories = this.load('socio_stories', INITIAL_STORIES);
    this.posts = this.load('socio_posts', INITIAL_POSTS);
    this.messages = this.load('socio_messages', INITIAL_MESSAGES);
  }

  load(key, fallback) {
    try {
      const data = localStorage.getItem(key);
      return data ? JSON.parse(data) : fallback;
    } catch {
      return fallback;
    }
  }

  save(key, data) {
    try {
      localStorage.setItem(key, JSON.stringify(data));
    } catch {
      // Storage unavailable
    }
  }

  getProfiles() { return this.profiles; }
  
  getProfile(username) {
    return this.profiles.find(p => p.username.toLowerCase() === username.toLowerCase()) || this.profiles[0];
  }

  toggleFollow(username) {
    this.profiles = this.profiles.map(p => {
      if (p.username.toLowerCase() === username.toLowerCase()) {
        const nextState = !p.is_following;
        return {
          ...p,
          is_following: nextState,
          followers_count: nextState ? p.followers_count + 1 : Math.max(0, p.followers_count - 1)
        };
      }
      return p;
    });
    this.save('socio_profiles', this.profiles);
    return this.getProfile(username);
  }

  getStories() { return this.stories; }

  addStory(story) {
    this.stories = [story, ...this.stories];
    this.save('socio_stories', this.stories);
    return this.stories;
  }

  getPosts() { return this.posts; }

  addPost(post) {
    this.posts = [post, ...this.posts];
    this.save('socio_posts', this.posts);
    return this.posts;
  }

  toggleLike(postId) {
    this.posts = this.posts.map(p => {
      if (p.id === postId) {
        const nextLiked = !p.is_liked;
        return {
          ...p,
          is_liked: nextLiked,
          likes_count: nextLiked ? p.likes_count + 1 : Math.max(0, p.likes_count - 1)
        };
      }
      return p;
    });
    this.save('socio_posts', this.posts);
    return this.posts.find(p => p.id === postId);
  }

  addComment(postId, text, authorName = 'Catherine Vance') {
    let newComment = null;
    this.posts = this.posts.map(p => {
      if (p.id === postId) {
        newComment = {
          id: Date.now(),
          author_name: authorName,
          author_avatar: avatarCatherine,
          text
        };
        return {
          ...p,
          comments_count: (p.comments_count || 0) + 1,
          comments: [...(p.comments || []), newComment]
        };
      }
      return p;
    });
    this.save('socio_posts', this.posts);
    return newComment;
  }

  getMessages() { return this.messages; }

  sendMessage(text, isMe = true) {
    const newMsg = {
      id: Date.now(),
      sender: isMe ? 'Catherine Vance' : 'Benjamin Moore',
      text,
      is_me: isMe,
      time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    };
    this.messages = [...this.messages, newMsg];
    this.save('socio_messages', this.messages);
    return newMsg;
  }
}

export const localStore = new StorageService();

// API facade with graceful fallback to localStore
export const api = {
  async getProfiles() {
    try {
      const res = await fetch(`${API_BASE_URL}/profiles/`);
      if (res.ok) return await res.json();
    } catch {}
    return localStore.getProfiles();
  },

  async getProfile(username = 'Catherine13') {
    try {
      const res = await fetch(`${API_BASE_URL}/profiles/${username}/`);
      if (res.ok) return await res.json();
    } catch {}
    return localStore.getProfile(username);
  },

  async toggleFollow(username) {
    try {
      const res = await fetch(`${API_BASE_URL}/profiles/${username}/follow/`, { method: 'POST' });
      if (res.ok) return await res.json();
    } catch {}
    return localStore.toggleFollow(username);
  },

  async getStories() {
    try {
      const res = await fetch(`${API_BASE_URL}/stories/`);
      if (res.ok) return await res.json();
    } catch {}
    return localStore.getStories();
  },

  async getPosts() {
    try {
      const res = await fetch(`${API_BASE_URL}/posts/`);
      if (res.ok) return await res.json();
    } catch {}
    return localStore.getPosts();
  },

  async toggleLike(postId) {
    try {
      const res = await fetch(`${API_BASE_URL}/posts/${postId}/toggle_like/`, { method: 'POST' });
      if (res.ok) return await res.json();
    } catch {}
    return localStore.toggleLike(postId);
  },

  async addComment(postId, text) {
    try {
      const res = await fetch(`${API_BASE_URL}/posts/${postId}/comments/`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ text, author_name: 'Catherine Vance', author_avatar: avatarCatherine })
      });
      if (res.ok) return await res.json();
    } catch {}
    return localStore.addComment(postId, text);
  },

  async getMessages(contact = 'Benjamin') {
    try {
      const res = await fetch(`${API_BASE_URL}/messages/?contact=${contact}`);
      if (res.ok) return await res.json();
    } catch {}
    return localStore.getMessages();
  },

  async sendMessage(text) {
    try {
      const res = await fetch(`${API_BASE_URL}/messages/`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          sender_name: 'Catherine Vance',
          recipient_name: 'Benjamin Moore',
          text,
          is_me: true
        })
      });
      if (res.ok) return await res.json();
    } catch {}
    return localStore.sendMessage(text, true);
  }
};
