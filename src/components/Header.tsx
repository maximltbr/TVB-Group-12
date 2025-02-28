
import React from 'react';
import { motion } from 'framer-motion';
import { Bell, MessageSquare, Settings, Menu } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { mockUserSettings } from '@/lib/mockData';

interface HeaderProps {
  onMenuToggle: () => void;
}

const Header: React.FC<HeaderProps> = ({ onMenuToggle }) => {
  return (
    <header className="sticky top-0 z-10 backdrop-blur-md bg-background/80 border-b border-border/40 px-6 py-3">
      <div className="max-w-7xl mx-auto flex items-center justify-between">
        <div className="flex items-center gap-3">
          <Button 
            variant="ghost" 
            size="icon" 
            className="md:hidden" 
            onClick={onMenuToggle}
          >
            <Menu size={20} />
          </Button>
          <motion.div 
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.3 }}
            className="flex items-center gap-2"
          >
            <span className="bg-primary rounded-full h-3 w-3 animate-pulse-slow"></span>
            <h1 className="text-xl font-semibold tracking-tight">pulse</h1>
          </motion.div>
        </div>

        <div className="flex items-center gap-2">
          <motion.div 
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3, delay: 0.1 }}
          >
            <Button variant="ghost" size="icon" className="relative">
              <Bell size={18} />
              <span className="absolute top-1 right-1 w-2 h-2 bg-primary rounded-full"></span>
            </Button>
          </motion.div>
          
          <motion.div 
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3, delay: 0.2 }}
          >
            <Button variant="ghost" size="icon">
              <MessageSquare size={18} />
            </Button>
          </motion.div>
          
          <motion.div 
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3, delay: 0.3 }}
          >
            <Button variant="ghost" size="icon">
              <Settings size={18} />
            </Button>
          </motion.div>

          <motion.div 
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.3, delay: 0.4 }}
            className="ml-2"
          >
            <Avatar className="h-9 w-9 border border-border">
              <AvatarImage src="" />
              <AvatarFallback className="text-sm font-medium bg-accent">
                {mockUserSettings.name.split(' ').map(n => n[0]).join('')}
              </AvatarFallback>
            </Avatar>
          </motion.div>
        </div>
      </div>
    </header>
  );
};

export default Header;
