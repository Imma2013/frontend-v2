import React, { useState, useRef, useEffect } from 'react';
import { MessageCircle, X, Send, User, Bot } from 'lucide-react';

interface Message {
  id: string;
  text: string;
  sender: 'user' | 'ai';
  timestamp: Date;
}

export const ChatWidget: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [inputText, setInputText] = useState('');
  const [messages, setMessages] = useState<Message[]>([
    {
      id: '1',
      text: "Hi! I'm the Cryzo AI Assistant. I can help with grading, shipping logistics, or payment options.",
      sender: 'ai',
      timestamp: new Date()
    }
  ]);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages, isOpen]);

  const handleSend = () => {
    if (!inputText.trim()) return;

    const userMsg: Message = {
      id: Date.now().toString(),
      text: inputText,
      sender: 'user',
      timestamp: new Date()
    };

    setMessages(prev => [...prev, userMsg]);
    setInputText('');

    // AI Logic Simulation
    setTimeout(() => {
      let aiResponseText = "I'm analyzing our global logistics data for that...";
      const lowerInput = userMsg.text.toLowerCase();

      if (lowerInput.includes('human') || lowerInput.includes('person') || lowerInput.includes('call') || lowerInput.includes('support')) {
        aiResponseText = "You can reach our human support team directly at +1 940-400-9316. We are available 24/7 for wholesale partners.";
      } else if (lowerInput.includes('shipping') || lowerInput.includes('uae') || lowerInput.includes('cameroon')) {
        aiResponseText = "We ship via FedEx International Priority. HK to UAE takes ~2 days. USA to Cameroon takes ~4-5 days via consolidated air freight.";
      } else if (lowerInput.includes('price') || lowerInput.includes('cost')) {
        aiResponseText = "Market prices fluctuate daily based on our 4 USA wholesalers sheets and HK auctions. Please use the main AI Search bar above to pull the latest live quotes.";
      } else if (lowerInput.includes('pay') || lowerInput.includes('bank') || lowerInput.includes('wire') || lowerInput.includes('wise')) {
        aiResponseText = "We accept multi-currency payments via Wise Business, Stripe (Cards), ACH Transfer, and International Wire Transfer. Reservations are held for 48 hours pending payment.";
      }

      const aiMsg: Message = {
        id: (Date.now() + 1).toString(),
        text: aiResponseText,
        sender: 'ai',
        timestamp: new Date()
      };
      setMessages(prev => [...prev, aiMsg]);
    }, 1000);
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') handleSend();
  };

  return (
    <div className="fixed bottom-6 right-6 z-50 flex flex-col items-end">
      {isOpen && (
        <div className="bg-white rounded-2xl shadow-2xl w-80 sm:w-96 mb-4 overflow-hidden border border-gray-200 flex flex-col transition-all duration-200 ease-in-out h-[500px]">
          {/* Header */}
          <div className="bg-gradient-to-r from-blue-600 to-blue-700 p-4 flex justify-between items-center text-white">
            <div className="flex items-center space-x-2">
              <div className="bg-white/20 p-1.5 rounded-full">
                <Bot className="w-5 h-5" />
              </div>
              <div>
                <h3 className="font-bold text-sm">Cryzo Support AI</h3>
                <p className="text-xs text-blue-100 flex items-center">
                  <span className="w-1.5 h-1.5 bg-green-400 rounded-full mr-1"></span>
                  Online
                </p>
              </div>
            </div>
            <button onClick={() => setIsOpen(false)} className="hover:bg-white/20 p-1 rounded transition-colors">
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Messages Area */}
          <div className="flex-1 overflow-y-auto p-4 space-y-4 bg-gray-50">
            {messages.map((msg) => (
              <div key={msg.id} className={`flex ${msg.sender === 'user' ? 'justify-end' : 'justify-start'}`}>
                <div className={`max-w-[80%] rounded-2xl px-4 py-3 text-sm shadow-sm ${
                  msg.sender === 'user' 
                    ? 'bg-blue-600 text-white rounded-br-none' 
                    : 'bg-white text-gray-800 border border-gray-200 rounded-bl-none'
                }`}>
                  {msg.text}
                  {msg.text.includes('940-400-9316') && (
                     <a href="tel:9404009316" className="block mt-2 bg-white/20 text-center py-1 rounded hover:bg-white/30 transition-colors font-bold underline">
                       Call Now
                     </a>
                  )}
                </div>
              </div>
            ))}
            <div ref={messagesEndRef} />
          </div>

          {/* Input Area */}
          <div className="p-4 bg-white border-t border-gray-100">
            <div className="relative">
              <input
                type="text"
                placeholder="Ask about shipping, payment, or stock..."
                className="w-full pl-4 pr-12 py-3 bg-gray-100 border-none rounded-xl text-sm focus:ring-2 focus:ring-blue-500 focus:bg-white transition-all outline-none text-gray-800 placeholder-gray-500"
                value={inputText}
                onChange={(e) => setInputText(e.target.value)}
                onKeyDown={handleKeyPress}
              />
              <button 
                onClick={handleSend}
                disabled={!inputText.trim()}
                className="absolute right-2 top-1/2 -translate-y-1/2 p-1.5 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
              >
                <Send className="w-4 h-4" />
              </button>
            </div>
            <p className="text-[10px] text-gray-400 text-center mt-2">
              Powered by Cryzo Intelligence • Live Inventory Access
            </p>
          </div>
        </div>
      )}

      <button
        onClick={() => setIsOpen(!isOpen)}
        className={`p-4 rounded-full shadow-lg transition-all duration-300 transform hover:scale-105 ${
          isOpen ? 'bg-gray-700 rotate-90' : 'bg-blue-600 hover:bg-blue-700'
        } text-white flex items-center justify-center`}
      >
        {isOpen ? <X className="w-6 h-6" /> : <MessageCircle className="w-6 h-6" />}
      </button>
    </div>
  );
};

export default ChatWidget;
