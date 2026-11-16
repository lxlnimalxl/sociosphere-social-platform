import React, { useState } from 'react';
import { X, Image as ImageIcon, Sparkles, MapPin } from 'lucide-react';
import confetti from 'canvas-confetti';
import avatarCatherine from '../../assets/images/avatar-catherine.png';
import gallery1 from '../../assets/images/gallery-1.png';
import gallery2 from '../../assets/images/gallery-2.png';
import gallery3 from '../../assets/images/gallery-3.png';
import gallery4 from '../../assets/images/gallery-4.png';
import gallery5 from '../../assets/images/gallery-5.png';
import gallery6 from '../../assets/images/gallery-6.png';

const PRESET_PHOTOS = [gallery1, gallery2, gallery3, gallery4, gallery5, gallery6];

export default function CreatePostModal({ isOpen, onClose, onCreatePost }) {
  const [caption, setCaption] = useState('');
  const [location, setLocation] = useState('Kyoto, Japan');
  const [selectedImage, setSelectedImage] = useState(PRESET_PHOTOS[0]);
  const [customImage, setCustomImage] = useState(null);

  if (!isOpen) return null;

  const handleFileUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setCustomImage(reader.result);
        setSelectedImage(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!caption.trim()) return;

    onCreatePost({
      author_username: 'Catherine13',
      author_name: 'Catherine Vance',
      author_avatar: avatarCatherine,
      media_url: selectedImage,
      caption: caption.trim(),
      likes_count: 0,
      comments_count: 0,
      is_liked: false,
      created_at: 'Just now',
      comments: []
    });

    // Celebration Confetti
    confetti({
      particleCount: 80,
      spread: 70,
      origin: { y: 0.6 },
      colors: ['#5790DF', '#093D89', '#93C5FD', '#FBBF24']
    });

    setCaption('');
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-xs p-4 animate-fade-in">
      <div className="w-full max-w-[420px] bg-white rounded-[32px] shadow-2xl overflow-hidden flex flex-col animate-scale-up">
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-slate-100">
          <div className="flex items-center space-x-2">
            <Sparkles size={18} className="text-[#5790DF]" />
            <h3 className="font-semibold text-slate-900 text-base">Create New Post</h3>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 rounded-full text-slate-400 hover:text-slate-700 hover:bg-slate-100 transition"
          >
            <X size={18} />
          </button>
        </div>

        {/* Content Form */}
        <form onSubmit={handleSubmit} className="p-6 space-y-4">
          {/* Author snippet */}
          <div className="flex items-center space-x-3">
            <img
              src={avatarCatherine}
              alt="Catherine"
              className="w-10 h-10 rounded-full object-cover border-2 border-[#5790DF]/30"
            />
            <div>
              <p className="text-sm font-semibold text-slate-900">Catherine Vance</p>
              <div className="flex items-center text-xs text-slate-500 space-x-1">
                <MapPin size={11} className="text-[#5790DF]" />
                <input
                  type="text"
                  value={location}
                  onChange={(e) => setLocation(e.target.value)}
                  className="bg-transparent border-none p-0 focus:outline-none focus:ring-0 text-slate-500 text-xs w-28"
                />
              </div>
            </div>
          </div>

          {/* Caption Textarea */}
          <textarea
            rows={3}
            value={caption}
            onChange={(e) => setCaption(e.target.value)}
            placeholder="What's inspiring you today?"
            className="w-full p-3 text-sm text-slate-800 placeholder-slate-400 bg-slate-50 rounded-2xl border border-slate-200/80 focus:outline-none focus:ring-2 focus:ring-[#5790DF] focus:bg-white resize-none"
          />

          {/* Selected Media Preview */}
          <div className="space-y-2">
            <label className="text-xs font-medium text-slate-500">Selected Photo Preview</label>
            <div className="relative w-full h-44 rounded-2xl overflow-hidden bg-slate-100 border border-slate-200 flex items-center justify-center">
              <img
                src={selectedImage}
                alt="Selected preview"
                className="w-full h-full object-cover"
              />
            </div>
          </div>

          {/* Preset Photo Selector / Upload */}
          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <span className="text-xs font-medium text-slate-500">Choose from portfolio or upload:</span>
              <label className="cursor-pointer text-xs font-semibold text-[#5790DF] hover:underline flex items-center space-x-1">
                <ImageIcon size={13} />
                <span>Upload</span>
                <input type="file" accept="image/*" onChange={handleFileUpload} className="hidden" />
              </label>
            </div>

            <div className="grid grid-cols-6 gap-2">
              {PRESET_PHOTOS.map((img, idx) => (
                <button
                  type="button"
                  key={idx}
                  onClick={() => setSelectedImage(img)}
                  className={`relative aspect-square rounded-xl overflow-hidden border-2 transition cursor-pointer ${
                    selectedImage === img ? 'border-[#5790DF] scale-105 shadow-md' : 'border-transparent opacity-70 hover:opacity-100'
                  }`}
                >
                  <img src={img} alt={`Preset ${idx}`} className="w-full h-full object-cover" />
                </button>
              ))}
            </div>
          </div>

          {/* Submit Action */}
          <div className="pt-2">
            <button
              type="submit"
              disabled={!caption.trim()}
              className="w-full py-3 px-4 rounded-2xl bg-gradient-to-r from-[#5790DF] to-[#093D89] text-white font-medium text-sm shadow-md hover:shadow-lg transition-all disabled:opacity-40 disabled:cursor-not-allowed cursor-pointer flex items-center justify-center space-x-2"
            >
              <span>Publish to Feed</span>
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
