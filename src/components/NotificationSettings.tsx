
import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { ArrowLeft, Bell, Mail, MessageSquare, Smartphone } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Switch } from '@/components/ui/switch';
import GlassCard from './ui/GlassCard';
import { UserSettings } from '@/lib/types';
import { mockUserSettings } from '@/lib/mockData';
import { useToast } from '@/components/ui/use-toast';

interface NotificationSettingsProps {
  onBack: () => void;
}

const NotificationSettings: React.FC<NotificationSettingsProps> = ({ onBack }) => {
  const { toast } = useToast();
  const [settings, setSettings] = useState<UserSettings>(mockUserSettings);
  
  const handlePushToggle = (enabled: boolean) => {
    setSettings({
      ...settings,
      deliveryPreferences: {
        ...settings.deliveryPreferences,
        push: enabled,
      },
    });
  };
  
  const handleEmailToggle = (enabled: boolean) => {
    setSettings({
      ...settings,
      deliveryPreferences: {
        ...settings.deliveryPreferences,
        email: enabled,
      },
    });
  };
  
  const handleSmsToggle = (enabled: boolean) => {
    setSettings({
      ...settings,
      deliveryPreferences: {
        ...settings.deliveryPreferences,
        sms: enabled,
      },
    });
  };
  
  const handleSave = () => {
    toast({
      title: "Settings Saved",
      description: "Your notification preferences have been updated.",
    });
    onBack();
  };
  
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: 20 }}
      transition={{ duration: 0.3 }}
      className="max-w-3xl mx-auto"
    >
      <div className="mb-6 flex items-center">
        <Button variant="ghost" size="icon" onClick={onBack} className="mr-3">
          <ArrowLeft size={18} />
        </Button>
        <h1 className="text-2xl font-semibold">Notification Settings</h1>
      </div>
      
      <div className="space-y-6">
        <GlassCard className="p-6">
          <h2 className="text-lg font-medium mb-6">Contact Information</h2>
          <div className="space-y-4">
            <div>
              <Label htmlFor="name">Name</Label>
              <Input 
                id="name" 
                value={settings.name} 
                onChange={(e) => setSettings({ ...settings, name: e.target.value })} 
                className="glass-input mt-1"
              />
            </div>
            
            <div>
              <Label htmlFor="email">Email Address</Label>
              <Input 
                id="email" 
                type="email" 
                value={settings.email} 
                onChange={(e) => setSettings({ ...settings, email: e.target.value })} 
                className="glass-input mt-1"
              />
            </div>
            
            <div>
              <Label htmlFor="phone">Phone Number (for SMS)</Label>
              <Input 
                id="phone" 
                type="tel" 
                value={settings.phone || ''} 
                onChange={(e) => setSettings({ ...settings, phone: e.target.value })} 
                placeholder="+1 (123) 456-7890"
                className="glass-input mt-1"
              />
            </div>
          </div>
        </GlassCard>
        
        <GlassCard className="p-6">
          <h2 className="text-lg font-medium mb-6">Notification Channels</h2>
          <div className="space-y-6">
            <div className="flex items-start">
              <div className="mr-3 mt-1">
                <Bell size={20} />
              </div>
              <div className="flex-1">
                <div className="flex items-center justify-between">
                  <div>
                    <h3 className="font-medium">Push Notifications</h3>
                    <p className="text-sm text-muted-foreground mt-1">
                      Receive alerts on this device
                    </p>
                  </div>
                  <Switch 
                    checked={settings.deliveryPreferences.push} 
                    onCheckedChange={handlePushToggle}
                  />
                </div>
              </div>
            </div>
            
            <div className="flex items-start">
              <div className="mr-3 mt-1">
                <Mail size={20} />
              </div>
              <div className="flex-1">
                <div className="flex items-center justify-between">
                  <div>
                    <h3 className="font-medium">Email Notifications</h3>
                    <p className="text-sm text-muted-foreground mt-1">
                      Receive alerts at {settings.email}
                    </p>
                  </div>
                  <Switch 
                    checked={settings.deliveryPreferences.email} 
                    onCheckedChange={handleEmailToggle}
                  />
                </div>
              </div>
            </div>
            
            <div className="flex items-start">
              <div className="mr-3 mt-1">
                <Smartphone size={20} />
              </div>
              <div className="flex-1">
                <div className="flex items-center justify-between">
                  <div>
                    <h3 className="font-medium">SMS Notifications</h3>
                    <p className="text-sm text-muted-foreground mt-1">
                      {settings.phone 
                        ? `Receive text alerts at ${settings.phone}` 
                        : 'Add a phone number to enable SMS alerts'}
                    </p>
                  </div>
                  <Switch 
                    checked={settings.deliveryPreferences.sms} 
                    onCheckedChange={handleSmsToggle}
                    disabled={!settings.phone}
                  />
                </div>
              </div>
            </div>
          </div>
        </GlassCard>
        
        <GlassCard className="p-6">
          <h2 className="text-lg font-medium mb-6">AI Assistant Preferences</h2>
          <div className="space-y-4">
            <div className="flex items-start">
              <div className="mr-3 mt-1">
                <MessageSquare size={20} />
              </div>
              <div className="flex-1">
                <h3 className="font-medium">Default AI Model</h3>
                <p className="text-sm text-muted-foreground mt-1">
                  Select your preferred AI model for market insights
                </p>
                <div className="mt-3 space-y-3">
                  <div className="flex items-center">
                    <input 
                      type="radio"
                      id="model-gpt"
                      name="ai-model"
                      value="gpt"
                      checked={settings.defaultAIModel === 'gpt'}
                      onChange={() => setSettings({ ...settings, defaultAIModel: 'gpt' })}
                      className="mr-2"
                    />
                    <Label htmlFor="model-gpt">ChatGPT (Balanced analysis)</Label>
                  </div>
                  <div className="flex items-center">
                    <input 
                      type="radio"
                      id="model-deepseek"
                      name="ai-model"
                      value="deepseek"
                      checked={settings.defaultAIModel === 'deepseek'}
                      onChange={() => setSettings({ ...settings, defaultAIModel: 'deepseek' })}
                      className="mr-2"
                    />
                    <Label htmlFor="model-deepseek">DeepSeek (Technical analysis focus)</Label>
                  </div>
                  <div className="flex items-center">
                    <input 
                      type="radio"
                      id="model-claude"
                      name="ai-model"
                      value="claude"
                      checked={settings.defaultAIModel === 'claude'}
                      onChange={() => setSettings({ ...settings, defaultAIModel: 'claude' })}
                      className="mr-2"
                    />
                    <Label htmlFor="model-claude">Claude (Detailed explanations)</Label>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </GlassCard>
        
        <div className="flex justify-end gap-3 pt-4">
          <Button variant="outline" onClick={onBack}>Cancel</Button>
          <Button onClick={handleSave}>Save Settings</Button>
        </div>
      </div>
    </motion.div>
  );
};

export default NotificationSettings;
