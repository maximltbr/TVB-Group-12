
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
    if (query.toLowerCase().includes('tesla')) {
      return "Tesla's stock has shown increased volatility in the past week with a 3.2% gain overall. Recent sentiment analysis indicates a positive bias due to production numbers exceeding expectations in Asia. Institutional investors have increased their positions by 1.7% this month. The most significant recent news involves their energy division's new contracts, which analysts project could increase revenue by 4% next quarter.";
    } else if (query.toLowerCase().includes('fed') || query.toLowerCase().includes('interest rates')) {
      return "The Federal Reserve's recent signals suggest a cautious approach to rate changes in the coming quarter. Market analysts are pricing in a 67% probability of a rate hold at the next meeting, with futures indicating increased confidence in a potential 25 basis point cut in Q3. The yield curve has flattened slightly, with the 10-year Treasury yield decreasing 7 basis points this week in response to inflation numbers coming in below expectations at 2.8% annually.";
    } else if (query.toLowerCase().includes('crypto') || query.toLowerCase().includes('bitcoin')) {
      return "The cryptocurrency market is seeing renewed institutional interest this month. Bitcoin's on-chain metrics show accumulation by large holders, while exchange outflows have increased 12% week-over-week. Recent regulatory developments in Asia appear favorable, with Singapore announcing a streamlined framework for digital asset providers. Technical analysis suggests strong support at the $42,000 level, with declining volatility measurements indicating a potential price consolidation phase.";
    } else {
      return "Based on the latest market data, we're seeing mixed signals across major indices. The S&P 500 is up 0.4% this week, with technology and healthcare leading the gains. Trading volumes are 8% above monthly averages, and the CBOE Volatility Index has decreased 2 points to 17, indicating reduced market uncertainty. Recent earnings reports have generally exceeded expectations, with 73% of companies beating estimates. Analyst consensus suggests cautious optimism for Q3, with projected growth rates of 4.2% year-over-year.";
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
                    <h3 className="font-medium">Market Insights AI</h3>
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
                          <span className="text-sm">Analyzing market data...</span>
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
                      placeholder="Ask about market insights..."
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
