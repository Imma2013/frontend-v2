import React, { useState, useRef, useEffect } from 'react';
import { MessageCircle, X, Send, Bot } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

interface Message {
  id: string;
  sender: 'user' | 'ai';
  text: string;
}

export const ChatWidget: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([
    { id: '1', sender: 'ai', text: 'Hello! I am Cryzo Copilot. I only assist with iPhone and iPad wholesale inquiries. How can I help you today?' }
  ]);
  const [inputValue, setInputValue] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const toggleChat = () => setIsOpen(!isOpen);

  const handleSendMessage = async (e?: React.FormEvent) => {
    e?.preventDefault();
    const query = inputValue.trim();
    if (!query) return;

    const userMsg: Message = { id: Date.now().toString(), sender: 'user', text: query };
    setMessages(prev => [...prev, userMsg]);
    setInputValue('');
    setIsTyping(true);

    // Strict Wholesale AI Logic
    const lower = query.toLowerCase();
    let response = '';

    if (lower.includes('temperature') || lower.includes('weather') || lower.includes('sports') || lower.includes('news')) {
        response = "I apologize, but I am specifically integrated to handle iPhone and iPad wholesale inquiries for Cryzo. I cannot assist with general topics.";
    } else if (lower.includes('hello') || lower.includes('hi') || lower.includes('buy')) {
        response = "Hello! We specialize in bulk iPhone and iPad sourcing. You can browse our inventory or ask me about specific stock and shipping timelines.";
    } else {
        response = "I am checking our real-time inventory for " + query + ". Please refer to the product cards for exact availability and wholesale pricing.";
    }

    setTimeout(() => {
        const aiMsg: Message = { id: (Date.now() + 1).toString(), sender: 'ai', text: response };
        setMessages(prev => [...prev, aiMsg]);
        setIsTyping(false);
    }, 600);
  };

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages, isTyping, isOpen]);

  return (
    <div className="fixed bottom-6 right-6 z-50 flex flex-col items-end">
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, scale: 0.9, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9, y: 20 }}
            className="mb-4 w-[350px] md:w-[400px] h-[500px] bg-white rounded-2xl shadow-2xl border border-gray-200 flex flex-col overflow-hidden"
          >
            <div className="bg-gray-900 p-4 flex justify-between items-center text-white">
              <div className="flex items-center space-x-2">
                <Bot className="w-5 h-5 text-blue-500" />
                <h3 className="font-bold text-sm">Cryzo Copilot</h3>
              </div>
              <button onClick={() => setIsOpen(false)} className="p-1 hover:bg-white/10 rounded-full transition-colors">
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="flex-1 overflow-y-auto p-4 bg-gray-50 space-y-4">
              {messages.map((msg) => (
                <div key={msg.id} className={`flex ${msg.sender === 'user' ? 'justify-end' : 'justify-start'}`}>
                  <div className={`max-w-[80%] rounded-2xl px-4 py-2.5 text-sm ${
                    msg.sender === 'user' ? 'bg-blue-600 text-white rounded-br-none' : 'bg-white border border-gray-200 text-gray-800 rounded-bl-none shadow-sm'
                  }`}>
                    {msg.text}
                  </div>
                </div>
              ))}
              {isTyping && <div className="text-xs text-gray-400 animate-pulse pl-2">Cryzo is thinking...</div>}
              <div ref={messagesEndRef} />
            </div>

            <div className="p-3 bg-white border-t border-gray-100">
              <form onSubmit={handleSendMessage} className="relative flex items-center">
                <input
                  type="text"
                  value={inputValue}
                  onChange={(e) => setInputValue(e.target.value)}
                  placeholder="Ask Cryzo for data..."
                  className="w-full bg-gray-100 text-sm text-gray-900 rounded-full pl-4 pr-12 py-3 focus:outline-none"
                />
                <button type="submit" className="absolute right-1.5 p-1.5 bg-blue-600 text-white rounded-full"><Send className="w-4 h-4" /></button>
              </form>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <button onClick={toggleChat} className="w-14 h-14 rounded-full shadow-lg flex items-center justify-center bg-blue-600 text-white z-50">
        {isOpen ? <X className="w-6 h-6" /> : <MessageCircle className="w-7 h-7" />}
      </button>
    </div>
  );
};

export default ChatWidget;
