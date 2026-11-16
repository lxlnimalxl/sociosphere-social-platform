import React, { useState, useEffect, useRef } from 'react';
import { ArrowLeft, Phone, MoreVertical, Send, Paperclip, Smile, CheckCheck } from 'lucide-react';
import avatarBenjamin from '../../assets/images/avatar-benjamin.png';
import avatarCatherine from '../../assets/images/avatar-catherine.png';

export default function ChatRoomScreen({
  messages,
  onSendMessage,
  onNavigate
}) {
  const [inputText, setInputText] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages, isTyping]);

  const handleSend = (e) => {
    e.preventDefault();
    if (!inputText.trim()) return;

    const userText = inputText.trim();
    setInputText('');
    onSendMessage(userText);

    // Simulate Benjamin Moore's typing and reply
    setIsTyping(true);
    setTimeout(() => {
      setIsTyping(false);
      const responses = [
        "That's fantastic! I completely agree with your design intuition.",
        "Let's sync up on the prototype around 3 PM today.",
        "Great point, Catherine! I will push the latest vector tokens to the repo now.",
        "Love the typography scale and layout rhythm in this update!"
      ];
      const randomResponse = responses[Math.floor(Math.random() * responses.length)];
      onSendMessage(randomResponse, false); // false = from Benjamin
    }, 1500);
  };

  return (
    <div className="relative flex-1 flex flex-col bg-[#E6EEFA] h-full overflow-hidden">
      {/* Chat Room Top Bar */}
      <div className="flex items-center justify-between px-5 py-3.5 bg-white/90 backdrop-blur-md border-b border-slate-200/60 z-20">
        <div className="flex items-center space-x-3">
          <button
            onClick={() => onNavigate('home')}
            className="p-1.5 -ml-1 text-slate-700 hover:text-[#5790DF] transition cursor-pointer"
            title="Back"
          >
            <ArrowLeft size={20} className="stroke-[2.5]" />
          </button>

          <div className="relative">
            <img
              src={avatarBenjamin}
              alt="Benjamin Moore"
              className="w-10 h-10 rounded-full object-cover border border-slate-100 shadow-xs"
            />
            <span className="absolute bottom-0 right-0 w-3 h-3 rounded-full bg-emerald-500 border-2 border-white ring-1 ring-emerald-500/30" />
          </div>

          <div>
            <h2 className="text-sm font-semibold text-slate-900 leading-tight">
              Benjamin Moore
            </h2>
            <p className="text-[11px] text-[#5790DF] font-medium">
              {isTyping ? 'Typing...' : 'Online'}
            </p>
          </div>
        </div>

        <div className="flex items-center space-x-1 text-slate-600">
          <button
            onClick={() => alert('Starting secure voice call with Benjamin Moore...')}
            className="p-2 rounded-full hover:bg-slate-100 transition cursor-pointer text-slate-700 hover:text-[#5790DF]"
            title="Call"
          >
            <Phone size={18} />
          </button>
          <button className="p-2 rounded-full hover:bg-slate-100 transition cursor-pointer text-slate-700 hover:text-[#5790DF]">
            <MoreVertical size={18} />
          </button>
        </div>
      </div>

      {/* Messages Thread */}
      <div className="flex-1 overflow-y-auto p-4 space-y-3.5 no-scrollbar">
        {/* Timestamp Header */}
        <div className="flex justify-center my-2">
          <span className="text-[11px] font-medium text-slate-500 bg-white/70 backdrop-blur-xs px-3 py-1 rounded-full border border-slate-200/40 shadow-2xs">
            Today • 11:40 AM
          </span>
        </div>

        {messages.map((msg, index) => {
          const isMe = msg.is_me;
          return (
            <div
              key={msg.id || index}
              className={`flex items-end space-x-2 ${isMe ? 'justify-end' : 'justify-start'}`}
            >
              {!isMe && (
                <img
                  src={avatarBenjamin}
                  alt="Benjamin"
                  className="w-7 h-7 rounded-full object-cover mb-1 border border-slate-200/80"
                />
              )}

              <div
                className={`max-w-[76%] px-4 py-2.5 rounded-[22px] text-xs leading-relaxed shadow-sm transition-all ${
                  isMe
                    ? 'bg-[#093D89] text-white rounded-br-[4px] shadow-[#093D89]/20'
                    : 'bg-white text-slate-800 rounded-bl-[4px] border border-slate-100'
                }`}
              >
                <p>{msg.text}</p>
                <div
                  className={`flex items-center justify-end space-x-1 text-[9px] mt-1 ${
                    isMe ? 'text-blue-200' : 'text-slate-400'
                  }`}
                >
                  <span>{msg.created_at || '11:42 AM'}</span>
                  {isMe && <CheckCheck size={11} className="stroke-[2.5]" />}
                </div>
              </div>

              {isMe && (
                <img
                  src={avatarCatherine}
                  alt="Catherine"
                  className="w-7 h-7 rounded-full object-cover mb-1 border border-slate-200/80"
                />
              )}
            </div>
          );
        })}

        {/* Typing indicator bubble */}
        {isTyping && (
          <div className="flex items-center space-x-2 justify-start">
            <img
              src={avatarBenjamin}
              alt="Benjamin"
              className="w-7 h-7 rounded-full object-cover"
            />
            <div className="bg-white rounded-2xl rounded-bl-[4px] px-4 py-2.5 shadow-xs border border-slate-100 flex items-center space-x-1.5">
              <span className="w-1.5 h-1.5 rounded-full bg-slate-400 animate-bounce" />
              <span className="w-1.5 h-1.5 rounded-full bg-slate-400 animate-bounce [animation-delay:0.2s]" />
              <span className="w-1.5 h-1.5 rounded-full bg-slate-400 animate-bounce [animation-delay:0.4s]" />
            </div>
          </div>
        )}

        <div ref={messagesEndRef} />
      </div>

      {/* Input Field Bar */}
      <form
        onSubmit={handleSend}
        className="p-3 bg-white/95 backdrop-blur-md border-t border-slate-200/60 flex items-center space-x-2"
      >
        <button
          type="button"
          onClick={() => alert('Attachments ready: Images, Audio, Documents.')}
          className="p-2 text-slate-400 hover:text-slate-700 hover:bg-slate-100 rounded-full transition cursor-pointer"
        >
          <Paperclip size={18} />
        </button>

        <div className="flex-1 relative flex items-center">
          <input
            type="text"
            value={inputText}
            onChange={(e) => setInputText(e.target.value)}
            placeholder="Type a message..."
            className="w-full bg-slate-100 text-slate-900 placeholder-slate-400 text-xs py-2.5 pl-3.5 pr-8 rounded-full border border-slate-200 focus:outline-none focus:ring-2 focus:ring-[#5790DF]"
          />
          <button
            type="button"
            className="absolute right-2.5 text-slate-400 hover:text-slate-600 cursor-pointer"
          >
            <Smile size={16} />
          </button>
        </div>

        <button
          type="submit"
          disabled={!inputText.trim()}
          className="w-9 h-9 rounded-full bg-[#5790DF] text-white flex items-center justify-center shadow-md hover:bg-[#487bc2] transition cursor-pointer disabled:opacity-40 disabled:cursor-not-allowed"
        >
          <Send size={15} className="ml-0.5" />
        </button>
      </form>
    </div>
  );
}
