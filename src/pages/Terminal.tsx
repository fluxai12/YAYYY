import React, { useState, useRef, useEffect } from 'react';
import { ArrowRight, User, ChevronLeft, XCircle, ExternalLink, ShieldCheck, MessageCircle } from 'lucide-react';
import { Link } from 'react-router-dom';
import { Logo } from '../components/Logo';

interface Message {
  id: string;
  type: 'user' | 'bot';
  content: string;
  timestamp: Date;
}

function ClockDisplay() {
  const [time, setTime] = useState(new Date().toUTCString());

  useEffect(() => {
    const timer = setInterval(() => {
      setTime(new Date().toUTCString());
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  return <span className="text-blue-400 text-sm font-medium">{time}</span>;
}

function NodeStatus() {
  return (
    <div className="space-y-3">
      <h3 className="text-sm font-medium text-slate-200">Node Status</h3>
      <div className="flex items-center justify-between">
        <span className="text-slate-400 text-sm">Status</span>
        <span className="text-green-400 text-sm font-medium flex items-center">
          <span className="w-2 h-2 rounded-full bg-green-400 mr-2 animate-pulse" />
          Online
        </span>
      </div>
      <div className="flex items-center justify-between">
        <span className="text-slate-400 text-sm">Latency</span>
        <span className="text-blue-400 text-sm font-medium">45ms</span>
      </div>
      <div className="flex items-center justify-between">
        <span className="text-slate-400 text-sm">Uptime</span>
        <span className="text-blue-400 text-sm font-medium">99.9%</span>
      </div>
    </div>
  );
}

function WhitelistModal({ isOpen, onClose }: { isOpen: boolean; onClose: () => void }) {
  const [isClosing, setIsClosing] = useState(false);
  const [isAnimatingIn, setIsAnimatingIn] = useState(false);

  useEffect(() => {
    if (isOpen) {
      setIsAnimatingIn(true);
      const timer = setTimeout(() => setIsAnimatingIn(false), 500);
      return () => clearTimeout(timer);
    }
  }, [isOpen]);

  const handleClose = () => {
    setIsClosing(true);
    setTimeout(() => {
      setIsClosing(false);
      onClose();
    }, 200);
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 flex items-center justify-center z-50">
      {/* Backdrop with enhanced animation */}
      <div 
        className={`absolute inset-0 transition-all duration-500 ${
          isClosing ? 'opacity-0 backdrop-blur-none' : 'opacity-100 backdrop-blur-lg'
        }`}
        style={{
          background: `radial-gradient(circle at ${isAnimatingIn ? '50%' : '50% 50%'}, rgba(0,0,0,0.7) 0%, rgba(0,0,0,0.8) 100%)`,
          transform: isAnimatingIn ? 'scale(1.1)' : 'scale(1)',
          transition: 'all 0.5s cubic-bezier(0.4, 0, 0.2, 1)'
        }}
        onClick={handleClose}
      />
      
      {/* Modal with enhanced animations */}
      <div 
        className={`relative bg-slate-800/90 border border-slate-700 rounded-xl overflow-hidden transform transition-all duration-500 ${
          isClosing 
            ? 'opacity-0 scale-95 translate-y-4' 
            : 'opacity-100 scale-100 translate-y-0'
        } ${
          isAnimatingIn ? 'animate-modal-in' : ''
        }`}
        style={{
          boxShadow: '0 0 50px rgba(59, 130, 246, 0.1)',
          maxWidth: '480px',
          width: '100%',
          margin: '1rem'
        }}
      >
        {/* Close button with hover effect */}
        <div className={`absolute top-4 right-4 z-10 transition-all duration-500 delay-300 ${
          isAnimatingIn ? 'opacity-0 translate-y-2' : 'opacity-100 translate-y-0'
        }`}>
          <button 
            onClick={handleClose}
            className="text-slate-400 hover:text-slate-200 transition-colors transform hover:rotate-90 duration-200"
          >
            <XCircle className="w-6 h-6" />
          </button>
        </div>

        {/* Header Section with staggered animations */}
        <div className="bg-gradient-to-r from-blue-500/20 to-purple-500/20 p-8 text-center border-b border-slate-700/50">
          <div className={`transition-all duration-500 delay-100 ${
            isAnimatingIn ? 'opacity-0 scale-90' : 'opacity-100 scale-100'
          }`}>
            <div className="w-16 h-16 bg-blue-500/10 rounded-full flex items-center justify-center mx-auto mb-4 relative">
              <div className="absolute inset-0 rounded-full bg-blue-500/20 animate-ping" />
              <Logo className="w-12 h-12 animate-pulse" />
            </div>
            <h3 className="text-2xl font-semibold mb-2 bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">
              Access Restricted
            </h3>
            <p className="text-slate-300 text-sm">
              Node access is limited to whitelisted users
            </p>
          </div>
        </div>

        {/* Content Section with staggered animations */}
        <div className="p-8">
          <div className="space-y-6">
            {/* Step 1: Buy $VERBOT */}
            <div className={`transition-all duration-500 delay-200 ${
              isAnimatingIn ? 'opacity-0 translate-y-4' : 'opacity-100 translate-y-0'
            }`}>
              <div className="bg-blue-500/10 rounded-lg p-4 border border-blue-500/20 hover:border-blue-500/40 transition-colors group">
                <div className="flex items-center text-blue-400 font-medium mb-2">
                  <span className="w-6 h-6 rounded-full bg-blue-500/20 flex items-center justify-center mr-2 text-sm group-hover:bg-blue-500/30 transition-colors">1</span>
                  Purchase $VERBOT
                </div>
                <p className="text-slate-300 text-sm">
                  Buy any amount of $VERBOT tokens to begin the whitelisting process. This is required for node access.
                </p>
                <a 
                  href="https://pump.fun/coin/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center space-x-1 text-sm text-blue-400 hover:text-blue-300 mt-2 transition-colors group"
                >
                  <span>Buy $VERBOT</span>
                  <ExternalLink className="w-3 h-3 transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
                </a>
              </div>
            </div>

            {/* Step 2: Contact for Whitelisting */}
            <div className={`transition-all duration-500 delay-300 ${
              isAnimatingIn ? 'opacity-0 translate-y-4' : 'opacity-100 translate-y-0'
            }`}>
              <div className="bg-slate-700/30 rounded-lg p-4 border border-slate-600/30">
                <div className="flex items-center text-slate-200 font-medium mb-3">
                  <span className="w-6 h-6 rounded-full bg-slate-600/30 flex items-center justify-center mr-2 text-sm">2</span>
                  Contact for Whitelisting
                </div>
                <div className="grid gap-3">
                  <a href="#" className="flex items-center space-x-3 p-2 rounded-lg bg-slate-700/30 hover:bg-slate-700/50 transition-colors group">
                    <div className="w-8 h-8 rounded-lg bg-blue-500/10 flex items-center justify-center">
                      <MessageCircle className="w-4 h-4 text-blue-400" />
                    </div>
                    <div className="text-1">
                      <div className="text-sm font-medium text-slate-200">Telegram</div>
                      <div className="text-xs text-blue-400">@Verbot_Whitelister</div>
                    </div>
                    
                  </a>
                  <a href="#" className="flex items-center space-x-3 p-2 rounded-lg bg-slate-700/30 hover:bg-slate-700/50 transition-colors group">
                    <div className="w-8 h-8 rounded-lg bg-purple-500/10 flex items-center justify-center">
                      <MessageCircle className="w-4 h-4 text-purple-400" />
                    </div>
                    <div className="text-1">
                      <div className="text-sm font-medium text-slate-200">Discord</div>
                      <div className="text-xs text-purple-400">@miguel.cabrita</div>
                    </div>
                
                  </a>
                </div>
              </div>
            </div>

            {/* Additional Info */}
            <div className={`transition-all duration-500 delay-400 ${
              isAnimatingIn ? 'opacity-0 translate-y-4' : 'opacity-100 translate-y-0'
            }`}>
              <div className="flex items-start space-x-3 text-sm text-slate-400 bg-slate-700/20 rounded-lg p-3">
                <ShieldCheck className="w-5 h-5 text-slate-400 flex-shrink-0 mt-0.5" />
                <p>
                  Access is carefully managed to ensure optimal performance. Future updates will expand capacity for more users.
                </p>
              </div>
            </div>
          </div>

          {/* Close Button */}
          <button
            onClick={handleClose}
            className={`w-full mt-6 bg-gradient-to-r from-blue-500/10 to-purple-500/10 hover:from-blue-500/20 hover:to-purple-500/20 text-blue-400 px-6 py-3 rounded-lg font-medium transition-all duration-300 border border-blue-500/20 hover:border-blue-500/30 transform hover:scale-[1.02] ${
              isAnimatingIn ? 'opacity-0 translate-y-4' : 'opacity-100 translate-y-0'
            }`}
            style={{ transitionDelay: '500ms' }}
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
}

export function Terminal() {
  const [messages, setMessages] = useState<Message[]>([{
    id: '0',
    type: 'bot',
    content: "Welcome to Verbot Terminal. I'm your AI trading assistant. How can I help you today?",
    timestamp: new Date()
  }]);
  const [input, setInput] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const [isLoaded, setIsLoaded] = useState(false);
  const [isConnecting, setIsConnecting] = useState(false);
  const [showWhitelistModal, setShowWhitelistModal] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const chatContainerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoaded(true);
    }, 100);

    return () => clearTimeout(timer);
  }, []);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
  };

  const handleConnectWallet = async () => {
    setShowWhitelistModal(true);
  };

  return (
    <div className="min-h-screen bg-slate-900 relative overflow-hidden">
      {/* Interactive Background with Animation */}
      <div className={`absolute inset-0 overflow-hidden pointer-events-none transition-opacity duration-1000 ${
        isLoaded ? 'opacity-100' : 'opacity-0'
      }`}>
        <div 
          className={`absolute inset-0 transition-transform duration-1000 ${
            isLoaded ? 'scale-100' : 'scale-110'
          }`}
          style={{
            backgroundImage: `
              linear-gradient(rgba(59, 130, 246, 0.02) 1px, transparent 1px),
              linear-gradient(90deg, rgba(59, 130, 246, 0.02) 1px, transparent 1px)
            `,
            backgroundSize: '50px 50px',
            transform: 'perspective(1000px) rotateX(60deg) translateY(-100px) translateZ(-200px)',
            opacity: 0.5
          }}
        />
        
        {/* Animated Gradient Orbs */}
        <div className={`absolute top-0 left-1/4 w-96 h-96 bg-blue-500/10 rounded-full blur-3xl transition-all duration-1000 ${
          isLoaded ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-12'
        }`} />
        <div className={`absolute bottom-0 right-1/4 w-96 h-96 bg-purple-500/10 rounded-full blur-3xl transition-all duration-1000 delay-300 ${
          isLoaded ? 'opacity-100 translate-y-0' : 'opacity-0 -translate-y-12'
        }`} />
      </div>

      {/* Navigation and Wallet */}
      <div className={`absolute top-8 left-8 right-8 flex justify-between items-center z-10 transition-all duration-700 ${
        isLoaded ? 'opacity-100 translate-y-0' : 'opacity-0 -translate-y-4'
      }`}>
        <Link 
          to="/" 
          className="flex items-center space-x-2 text-slate-400 hover:text-blue-400 transition-colors group"
        >
          <ChevronLeft className="w-5 h-5 group-hover:-translate-x-1 transition-transform" />
          <span>Back to Home</span>
        </Link>
        
        {/* Connect Wallet Button */}
        <button
          onClick={handleConnectWallet}
          disabled={isConnecting}
          className={`bg-slate-800/90 hover:bg-slate-700/90 transition-all duration-300 rounded-xl border border-slate-700 hover:border-blue-500/50 px-8 py-3 text-white font-medium transform hover:scale-[1.02] ${
            isConnecting ? 'opacity-50 cursor-not-allowed' : ''
          }`}
        >
          {isConnecting ? 'Connecting...' : 'Connect Wallet'}
        </button>
      </div>

      <div className="max-w-[1600px] mx-auto pt-24 px-8 relative transition-all duration-1000 delay-200">
        <div className="grid grid-cols-12 gap-8 h-[calc(100vh-8rem)]">
          {/* Side Information Panel */}
          <div className="col-span-3 space-y-6 h-full overflow-y-auto pr-2">
            {/* Node Status Panel */}
            <div className="bg-slate-800/50 backdrop-blur-xl border border-slate-700/50 rounded-xl p-4">
              <NodeStatus />
            </div>

            {/* Time and Network Status */}
            <div className="bg-slate-800/50 backdrop-blur-xl border border-slate-700/50 rounded-xl p-4">
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <span className="text-slate-400 text-sm">Network</span>
                  <span className="text-green-400 text-sm font-medium flex items-center">
                    <span className="w-2 h-2 rounded-full bg-green-400 mr-2 animate-pulse" />
                    Mainnet
                  </span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-slate-400 text-sm">Time (UTC)</span>
                  <ClockDisplay />
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-slate-400 text-sm">Status</span>
                  <span className="text-green-400 text-sm font-medium flex items-center">
                    <span className="w-2 h-2 rounded-full bg-green-400 mr-2 animate-pulse" />
                    Active
                  </span>
                </div>
              </div>
            </div>

            {/* Wallet Information */}
            <div className="bg-slate-800/50 backdrop-blur-xl border border-slate-700/50 rounded-xl p-4">
              <h3 className="text-sm font-medium text-slate-200 mb-3">Wallet Status</h3>
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <span className="text-slate-400 text-sm">Connection</span>
                  <span className="text-red-400 text-sm font-medium flex items-center">
                    <span className="w-2 h-2 rounded-full bg-red-400 mr-2 animate-pulse" />
                    Disconnected
                  </span>
                </div>
              </div>
            </div>

            {/* Recent Activity */}
            <div className="bg-slate-800/50 backdrop-blur-xl border border-slate-700/50 rounded-xl p-4">
              <h3 className="text-sm font-medium text-slate-200 mb-3">Recent Activity</h3>
              <div className="space-y-3">
                {/* Show message when no activity */}
                <div className="flex items-center justify-center py-6 text-sm text-slate-400">
                  No recent activity
                </div>
              </div>
            </div>
          </div>

          {/* Main Terminal Area */}
          <div className="col-span-9 h-full flex flex-col">
            <div className="bg-slate-800/50 backdrop-blur-xl border border-slate-700/50 rounded-2xl overflow-hidden shadow-2xl h-full flex flex-col">
              {/* Terminal Header */}
              <div className="border-b border-slate-700/50 px-6 py-4 flex items-center justify-between bg-slate-800/50">
                <div className="flex items-center space-x-3">
                  <div className="flex-shrink-0">
                    <Logo className="w-8 h-8" />
                  </div>
                  <h2 className="text-slate-200 font-medium">Verbot Terminal</h2>
                </div>
                <div className="flex items-center space-x-2">
                  <span className="text-slate-400 text-sm"></span>
                </div>
              </div>
              
              {/* Messages Container */}
              <div 
                ref={chatContainerRef}
                className="flex-1 overflow-y-auto p-6 space-y-6 scroll-smooth"
                style={{ minHeight: '500px' }}
              >
                {messages.map((message) => (
                  <div
                    key={message.id}
                    className={`flex items-start space-x-3 ${
                      message.type === 'user' ? 'justify-end' : 'justify-start'
                    }`}
                  >
                    {message.type === 'bot' ? (
                      <>
                        <div className="w-10 h-10 rounded-lg bg-blue-500/10 flex items-center justify-center flex-shrink-0">
                          <Logo className="w-11 h-11" />
                        </div>
                        <div className="bg-slate-700/50 rounded-lg p-4 max-w-[80%]">
                          <p className="text-slate-300 text-sm">{message.content}</p>
                        </div>
                      </>
                    ) : (
                      <>
                        <div className="bg-blue-500/10 border border-blue-500/20 rounded-lg p-4 max-w-[80%]">
                          <p className="text-blue-400 text-sm">{message.content}</p>
                        </div>
                        <div className="w-10 h-10 rounded-lg bg-blue-500/10 flex items-center justify-center flex-shrink-0">
                          <User className="w-6 h-6 text-blue-400" />
                        </div>
                      </>
                    )}
                  </div>
                ))}
                <div ref={messagesEndRef} />
                
                {isTyping && (
                  <div className="flex items-center space-x-2">
                    <div className="w-2 h-2 rounded-full bg-blue-400 animate-pulse" />
                    <div className="w-2 h-2 rounded-full bg-blue-400 animate-pulse delay-75" />
                    <div className="w-2 h-2 rounded-full bg-blue-400 animate-pulse delay-150" />
                  </div>
                )}
              </div>

              {/* Input Form */}
              <form onSubmit={handleSubmit} className="p-4 border-t border-slate-700/50">
                <div className="relative">
                  <input
                    type="text"
                    value={input}
                    disabled
                    placeholder="Connect your wallet to start trading"
                    className="w-full bg-slate-800/50 text-slate-200 placeholder-slate-400 px-4 py-3 rounded-lg focus:outline-none cursor-not-allowed opacity-50"
                  />
                  <button
                    type="submit"
                    disabled
                    className="absolute right-2 top-1/2 transform -translate-y-1/2 text-blue-400/50 cursor-not-allowed"
                  >
                    <ArrowRight className="w-5 h-5" />
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>

      {/* Whitelist Modal */}
      <WhitelistModal 
        isOpen={showWhitelistModal} 
        onClose={() => setShowWhitelistModal(false)} 
      />
    </div>
  );
}