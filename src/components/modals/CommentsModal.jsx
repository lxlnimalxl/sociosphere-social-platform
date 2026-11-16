import React, { useState } from 'react';
import { X, Send, Heart } from 'lucide-react';
import avatarCatherine from '../../assets/images/avatar-catherine.png';

export default function CommentsModal({ post, isOpen, onClose, onAddComment }) {
  const [newComment, setNewComment] = useState('');

  if (!isOpen || !post) return null;

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!newComment.trim()) return;
    onAddComment(post.id, newComment.trim());
    setNewComment('');
  };

  return (
    <div className="fixed inset-0 z-50 flex items-end sm:items-center justify-center bg-black/60 backdrop-blur-xs transition-opacity animate-fade-in">
      <div className="w-full sm:max-w-[420px] max-h-[85vh] bg-white rounded-t-[32px] sm:rounded-[32px] shadow-2xl flex flex-col overflow-hidden animate-slide-up">
        {/* Header */}
        <div className="flex items-center justify-between px-5 py-4 border-b border-slate-100">
          <div className="flex items-center space-x-2">
            <h3 className="font-semibold text-slate-900 text-base">Comments</h3>
            <span className="text-xs px-2 py-0.5 rounded-full bg-[#E6EEFA] text-[#093D89] font-medium">
              {post.comments ? post.comments.length : post.comments_count}
            </span>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 rounded-full text-slate-400 hover:text-slate-700 hover:bg-slate-100 transition"
          >
            <X size={18} />
          </button>
        </div>

        {/* Comment list */}
        <div className="flex-1 overflow-y-auto p-5 space-y-4 max-h-[420px]">
          {post.comments && post.comments.length > 0 ? (
            post.comments.map((comment) => (
              <div key={comment.id} className="flex items-start space-x-3 group">
                <img
                  src={comment.author_avatar}
                  alt={comment.author_name}
                  className="w-8 h-8 rounded-full object-cover border border-slate-100"
                />
                <div className="flex-1 bg-slate-50 rounded-2xl px-3.5 py-2.5 text-xs text-slate-800">
                  <div className="flex items-center justify-between mb-0.5">
                    <span className="font-semibold text-slate-900">{comment.author_name}</span>
                    <span className="text-[10px] text-slate-400">Just now</span>
                  </div>
                  <p className="leading-relaxed text-slate-700">{comment.text}</p>
                </div>
              </div>
            ))
          ) : (
            <div className="text-center py-8 text-slate-400 text-xs">
              No comments yet. Start the conversation!
            </div>
          )}
        </div>

        {/* Post comment input */}
        <form onSubmit={handleSubmit} className="p-4 border-t border-slate-100 bg-white">
          <div className="flex items-center space-x-2.5">
            <img
              src={avatarCatherine}
              alt="You"
              className="w-8 h-8 rounded-full object-cover border border-slate-200"
            />
            <input
              type="text"
              placeholder="Add a comment..."
              value={newComment}
              onChange={(e) => setNewComment(e.target.value)}
              className="flex-1 bg-slate-100 text-slate-900 placeholder-slate-400 text-xs px-4 py-2.5 rounded-full focus:outline-none focus:ring-2 focus:ring-[#5790DF]"
            />
            <button
              type="submit"
              disabled={!newComment.trim()}
              className="p-2.5 rounded-full bg-[#5790DF] text-white disabled:opacity-40 hover:bg-[#487bc2] transition cursor-pointer disabled:cursor-not-allowed"
            >
              <Send size={15} />
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
