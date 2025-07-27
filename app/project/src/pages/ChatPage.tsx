import React, { useState, useRef, useEffect } from 'react';
import { Send, Mic, AlertTriangle } from 'lucide-react';
import KnightAvatar from '../components/KnightAvatar';

interface Message {
  id: number;
  text: string;
  isUser: boolean;
  timestamp: Date;
}

const ChatPage: React.FC = () => {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: 1,
      text: "Hello! I'm GuardianKnight, your AI safety companion. How can I help keep you safe today?",
      isUser: false,
      timestamp: new Date()
    }
  ]);
  const [inputText, setInputText] = useState('');
  const [isListening, setIsListening] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(scrollToBottom, [messages]);

  const getAIResponse = (userMessage: string): string => {
    const lowerMessage = userMessage.toLowerCase();
    
    if (lowerMessage.includes('emergency') || lowerMessage.includes('help') || lowerMessage.includes('danger')) {
      return "🚨 I detect this might be an emergency. I'm activating emergency protocols and notifying nearby volunteers. Stay calm and try to get to a safe location.";
    }
    
    if (lowerMessage.includes('lost') || lowerMessage.includes('missing')) {
      return "I can help you with lost person protocols. Would you like me to activate Lost Mode to help locate someone? I can also guide you through reporting procedures.";
    }
    
    if (lowerMessage.includes('crowd') || lowerMessage.includes('busy')) {
      return "For crowded areas, I recommend activating Crowd Mode. This will monitor crowd density and help you avoid bottlenecks. Would you like me to enable it?";
    }
    
    if (lowerMessage.includes('hiking') || lowerMessage.includes('outdoor')) {
      return "For outdoor activities, Hiking Mode provides group tracking and offline maps. I can also set up SOS beacons for your safety. Shall I activate it?";
    }
    
    if (lowerMessage.includes('safe') || lowerMessage.includes('security')) {
      return "Your safety is my priority! I can activate Solo Mode for personal monitoring, or help you choose the best safety mode for your current situation.";
    }
    
    return "I'm here to help with your safety needs. You can ask me about emergency procedures, activate different safety modes, or get guidance on staying safe in various situations.";
  };

  const handleSendMessage = () => {
    if (!inputText.trim()) return;

    const userMessage: Message = {
      id: messages.length + 1,
      text: inputText,
      isUser: true,
      timestamp: new Date()
    };

    setMessages(prev => [...prev, userMessage]);
    setInputText('');

    // Simulate AI response delay
    setTimeout(() => {
      const aiResponse: Message = {
        id: messages.length + 2,
        text: getAIResponse(inputText),
        isUser: false,
        timestamp: new Date()
      };
      setMessages(prev => [...prev, aiResponse]);
    }, 1000);
  };

  const handleVoiceInput = () => {
    if ('webkitSpeechRecognition' in window || 'SpeechRecognition' in window) {
      const SpeechRecognition = (window as any).webkitSpeechRecognition || (window as any).SpeechRecognition;
      const recognition = new SpeechRecognition();
      
      recognition.continuous = false;
      recognition.interimResults = false;
      recognition.lang = 'en-US';

      recognition.onstart = () => {
        setIsListening(true);
      };

      recognition.onresult = (event: any) => {
        const transcript = event.results[0][0].transcript;
        setInputText(transcript);
        setIsListening(false);
      };

      recognition.onerror = () => {
        setIsListening(false);
      };

      recognition.onend = () => {
        setIsListening(false);
      };

      recognition.start();
    } else {
      alert('Speech recognition not supported in this browser');
    }
  };

  const handleEmergency = () => {
    const emergencyMessage: Message = {
      id: messages.length + 1,
      text: "🚨 EMERGENCY ACTIVATED",
      isUser: true,
      timestamp: new Date()
    };

    setMessages(prev => [...prev, emergencyMessage]);

    setTimeout(() => {
      const aiResponse: Message = {
        id: messages.length + 2,
        text: "🚨 EMERGENCY PROTOCOL ACTIVATED! I'm immediately notifying emergency services and nearby volunteers. Help is on the way. Stay calm and follow safety procedures.",
        isUser: false,
        timestamp: new Date()
      };
      setMessages(prev => [...prev, aiResponse]);
    }, 500);
  };

  return (
    <div className="h-screen flex flex-col pt-4">
      {/* Header */}
      <div className="flex items-center justify-center p-4 border-b border-cyan-500/20">
        <KnightAvatar size="sm" animated />
        <div className="ml-3">
          <h1 className="text-xl font-bold text-cyan-400">Ask Knight</h1>
          <p className="text-sm text-gray-400">AI Safety Assistant</p>
        </div>
      </div>

      {/* Messages */}
      <div className="flex-1 overflow-y-auto p-4 space-y-4">
        {messages.map((message) => (
          <div
            key={message.id}
            className={`flex ${message.isUser ? 'justify-end' : 'justify-start'}`}
          >
            <div className={`max-w-xs lg:max-w-md px-4 py-3 rounded-2xl ${
              message.isUser
                ? 'bg-gradient-to-r from-cyan-500 to-blue-600 text-white'
                : 'bg-white/10 backdrop-blur-sm text-white border border-cyan-500/20'
            }`}>
              <p className="text-sm">{message.text}</p>
              <p className="text-xs opacity-70 mt-1">
                {message.timestamp.toLocaleTimeString('en-US', { 
                  hour: '2-digit', 
                  minute: '2-digit' 
                })}
              </p>
            </div>
          </div>
        ))}
        <div ref={messagesEndRef} />
      </div>

      {/* Emergency Button */}
      <div className="px-4 pb-2">
        <button
          onClick={handleEmergency}
          className="w-full bg-gradient-to-r from-red-500 to-red-600 hover:from-red-600 hover:to-red-700 text-white py-3 rounded-xl font-semibold transition-all duration-300 transform hover:scale-105 flex items-center justify-center space-x-2 animate-pulse"
        >
          <AlertTriangle className="h-5 w-5" />
          <span>EMERGENCY</span>
        </button>
      </div>

      {/* Input */}
      <div className="p-4 border-t border-cyan-500/20">
        <div className="flex items-center space-x-3">
          <div className="flex-1 relative">
            <input
              type="text"
              value={inputText}
              onChange={(e) => setInputText(e.target.value)}
              onKeyPress={(e) => e.key === 'Enter' && handleSendMessage()}
              placeholder="Ask Knight anything..."
              className="w-full px-4 py-3 bg-white/10 border border-cyan-500/20 rounded-xl text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-cyan-400 focus:border-transparent transition-all duration-300"
            />
          </div>
          <button
            onClick={handleVoiceInput}
            disabled={isListening}
            className={`p-3 rounded-xl transition-all duration-300 ${
              isListening 
                ? 'bg-red-500 animate-pulse' 
                : 'bg-white/10 hover:bg-white/20 border border-cyan-500/20'
            }`}
          >
            <Mic className={`h-5 w-5 ${isListening ? 'text-white' : 'text-cyan-400'}`} />
          </button>
          <button
            onClick={handleSendMessage}
            disabled={!inputText.trim()}
            className="p-3 bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-600 hover:to-blue-700 disabled:from-gray-600 disabled:to-gray-700 text-white rounded-xl transition-all duration-300 transform hover:scale-105 disabled:scale-100 disabled:cursor-not-allowed"
          >
            <Send className="h-5 w-5" />
          </button>
        </div>
      </div>
    </div>
  );
};

export default ChatPage;