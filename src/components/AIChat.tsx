
import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { SendHorizonal, Bot, Loader2, X, ChevronDown, CircleUser } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { AIModel, ChatMessage } from '@/lib/types';
import { mockChatHistory, mockUserSettings } from '@/lib/mockData';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import GlassCard from './ui/GlassCard';
import { cn } from '@/lib/utils';
import { Badge } from '@/components/ui/badge';
import { useToast } from '@/components/ui/use-toast';

const AIChat: React.FC = () => {
  const { toast } = useToast();
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<ChatMessage[]>(mockChatHistory);
  const [inputValue, setInputValue] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [model, setModel] = useState<AIModel>(mockUserSettings.defaultAIModel);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  
  useEffect(() => {
    if (messagesEndRef.current && isOpen) {
      messagesEndRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  }, [messages, isOpen]);

  const handleSendMessage = () => {
    if (!inputValue.trim()) return;
    
    const newUserMessage: ChatMessage = {
      id: `user-${Date.now()}`,
      content: inputValue,
      sender: 'user',
      timestamp: new Date().toISOString(),
    };
    
    setMessages([...messages, newUserMessage]);
    setInputValue('');
    setIsLoading(true);
    
    // Simulate AI response after a delay
    setTimeout(() => {
      const newAIMessage: ChatMessage = {
        id: `ai-${Date.now()}`,
        content: generateMockResponse(inputValue),
        sender: 'assistant',
        timestamp: new Date().toISOString(),
        model,
      };
      
      setMessages(prevMessages => [...prevMessages, newAIMessage]);
      setIsLoading(false);
      
      toast({
        title: "Analysis Completed",
        description: "AI has analyzed your query.",
      });
    }, 2000);
  };

  const generateMockResponse = (query: string): string => {
    if (query.toLowerCase().includes('tech') || query.toLowerCase().includes('technology')) {
      return "The tech industry is seeing significant changes this month. Job growth in AI and machine learning roles has increased by 24%, while traditional IT positions have declined slightly. Several major companies have announced new product launches for Q3, with a particular focus on sustainable technology and improved privacy features. Venture capital funding has increased by 15% compared to last quarter, primarily in healthcare tech, clean energy, and cybersecurity startups.";
    } else if (query.toLowerCase().includes('climate') || query.toLowerCase().includes('environment')) {
      return "Recent climate initiatives have gained momentum across both public and private sectors. New policies introduced in the EU aim to reduce carbon emissions by 55% by 2030. Corporate sustainability pledges have increased by 38% this year, with more companies setting science-based targets. The renewable energy sector has seen 15% growth in employment, while green technology patents have increased by 22% year-over-year. Community-level programs focused on resilience and adaptation have expanded to over 250 cities worldwide.";
    } else if (query.toLowerCase().includes('health') || query.toLowerCase().includes('healthcare')) {
      return "The healthcare landscape continues to evolve with telemedicine usage remaining 300% above pre-pandemic levels. Mental health services have expanded significantly, with a 45% increase in digital platform offerings. Recent research breakthroughs in Alzheimer's treatment show promising results in early clinical trials. Preventative care programs have gained increased insurance coverage, and personalized medicine approaches based on genetic testing have become more accessible with costs decreasing by 30% over the past year.";
    } else {
      return "Based on recent trends, we're seeing increased interest in personalized content and experiences across digital platforms. User engagement with interactive content has risen by 34%, while traditional passive consumption has declined slightly. Privacy concerns continue to shape user behavior, with 65% of consumers indicating they're more selective about sharing personal data. Cross-platform integration and seamless experiences between devices remain top priorities for users, with 72% reporting they regularly use three or more connected devices throughout their day.";
    }
  };

  return (
    <>
      {/* Chat button */}
      <motion.div
        initial={{ scale: 0.8, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ duration: 0.3 }}
        className="fixed bottom-6 right-6 z-50"
      >
        <Button
          onClick={() => setIsOpen(true)}
          className="h-14 w-14 rounded-full shadow-lg"
        >
          <Bot size={24} />
        </Button>
      </motion.div>
      
      {/* Chat dialog */}
      <AnimatePresence>
        {isOpen && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 0.3 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 bg-black z-40"
              onClick={() => setIsOpen(false)}
            />
            
            <motion.div
              initial={{ opacity: 0, y: 100, scale: 0.9 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: 100, scale: 0.9 }}
              transition={{ 
                type: "spring",
                damping: 25,
                stiffness: 350
              }}
              className="fixed bottom-6 right-6 w-full max-w-md max-h-[600px] z-50"
            >
              <GlassCard className="h-full flex flex-col overflow-hidden">
                {/* Header */}
                <div className="p-4 border-b flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <span className="bg-primary rounded-full h-2 w-2 animate-pulse"></span>
                    <h3 className="font-medium">AI Assistant</h3>
                  </div>
                  
                  <div className="flex items-center gap-2">
                    <Select value={model} onValueChange={(value: AIModel) => setModel(value)}>
                      <SelectTrigger className="w-[110px] h-8 text-xs">
                        <SelectValue placeholder="Select Model" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="gpt">ChatGPT</SelectItem>
                        <SelectItem value="deepseek">DeepSeek</SelectItem>
                        <SelectItem value="claude">Claude</SelectItem>
                      </SelectContent>
                    </Select>
                    
                    <Button variant="ghost" size="icon" onClick={() => setIsOpen(false)}>
                      <X size={18} />
                    </Button>
                  </div>
                </div>
                
                {/* Messages */}
                <div className="flex-1 overflow-y-auto p-4 space-y-4">
                  {messages.map((message, index) => (
                    <motion.div
                      key={message.id}
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.3, delay: index * 0.1 }}
                      className={cn(
                        "flex",
                        message.sender === 'user' ? "justify-end" : "justify-start"
                      )}
                    >
                      <div className={cn(
                        "max-w-[80%] rounded-xl p-3",
                        message.sender === 'user' 
                          ? "bg-primary text-primary-foreground rounded-tr-none" 
                          : "glass-panel rounded-tl-none"
                      )}>
                        {message.sender === 'assistant' && (
                          <div className="flex items-center gap-2 mb-1">
                            <Avatar className="h-6 w-6">
                              <AvatarImage src="" />
                              <AvatarFallback className="text-xs">
                                <Bot size={14} />
                              </AvatarFallback>
                            </Avatar>
                            <Badge variant="outline" className="text-xs font-normal py-0 h-5">
                              {message.model === 'gpt' ? 'ChatGPT' : 
                               message.model === 'deepseek' ? 'DeepSeek' : 'Claude'}
                            </Badge>
                          </div>
                        )}
                        <div className="text-sm">
                          {message.content}
                        </div>
                      </div>
                    </motion.div>
                  ))}
                  
                  {isLoading && (
                    <motion.div
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      className="flex justify-start"
                    >
                      <div className="glass-panel rounded-xl rounded-tl-none p-3">
                        <div className="flex items-center gap-2">
                          <Loader2 size={16} className="animate-spin" />
                          <span className="text-sm">Analyzing your request...</span>
                        </div>
                      </div>
                    </motion.div>
                  )}
                  
                  <div ref={messagesEndRef} />
                </div>
                
                {/* Input */}
                <div className="p-4 border-t border-border/50">
                  <form 
                    onSubmit={(e) => {
                      e.preventDefault();
                      handleSendMessage();
                    }}
                    className="flex items-center gap-2"
                  >
                    <Input
                      value={inputValue}
                      onChange={(e) => setInputValue(e.target.value)}
                      placeholder="Ask me anything..."
                      className="glass-input"
                      disabled={isLoading}
                    />
                    <Button 
                      type="submit" 
                      size="icon" 
                      disabled={isLoading || !inputValue.trim()}
                    >
                      <SendHorizonal size={18} />
                    </Button>
                  </form>
                </div>
              </GlassCard>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
};

export default AIChat;
