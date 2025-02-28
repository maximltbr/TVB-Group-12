
import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { AlertRule } from '@/lib/types';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Switch } from '@/components/ui/switch';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Textarea } from '@/components/ui/textarea';
import { ArrowLeft, Plus, X } from 'lucide-react';
import GlassCard from './ui/GlassCard';
import { Badge } from '@/components/ui/badge';
import { useToast } from '@/components/ui/use-toast';
import { Alert, DeliveryChannel } from '@/lib/types';

interface AlertRulesProps {
  existingAlert?: Alert;
  onSave: (alert: Omit<Alert, 'id' | 'createdAt'>) => void;
  onCancel: () => void;
}

const AlertRules: React.FC<AlertRulesProps> = ({ existingAlert, onSave, onCancel }) => {
  const { toast } = useToast();
  const [name, setName] = useState(existingAlert?.name || '');
  const [description, setDescription] = useState(existingAlert?.description || '');
  const [rules, setRules] = useState<Omit<AlertRule, 'id'>[]>(
    existingAlert?.rules.map(({ id, ...rest }) => rest) || [{
      type: 'stock',
      condition: 'News with specific sentiment',
      symbol: '',
      sentiment: 'negative',
      frequency: 'instant',
    }]
  );
  const [deliveryChannels, setDeliveryChannels] = useState<DeliveryChannel[]>(
    existingAlert?.deliveryChannels || [
      { type: 'push', enabled: true },
      { type: 'email', enabled: true },
      { type: 'sms', enabled: false },
    ]
  );
  const [keywords, setKeywords] = useState<string[]>(
    existingAlert?.rules.flatMap(rule => rule.keywords || []) || []
  );
  const [newKeyword, setNewKeyword] = useState('');

  const handleAddRule = () => {
    setRules([...rules, {
      type: 'stock',
      condition: 'News with specific sentiment',
      symbol: '',
      sentiment: 'negative',
      frequency: 'instant',
    }]);
  };

  const handleRemoveRule = (index: number) => {
    setRules(rules.filter((_, i) => i !== index));
  };

  const handleRuleChange = (index: number, field: string, value: any) => {
    const updatedRules = [...rules];
    updatedRules[index] = { ...updatedRules[index], [field]: value };
    setRules(updatedRules);
  };

  const handleAddKeyword = () => {
    if (newKeyword && !keywords.includes(newKeyword)) {
      setKeywords([...keywords, newKeyword]);
      setNewKeyword('');
    }
  };

  const handleRemoveKeyword = (keyword: string) => {
    setKeywords(keywords.filter(k => k !== keyword));
  };

  const handleChannelToggle = (type: 'push' | 'email' | 'sms', enabled: boolean) => {
    setDeliveryChannels(
      deliveryChannels.map(channel => 
        channel.type === type ? { ...channel, enabled } : channel
      )
    );
  };

  const handleSave = () => {
    if (!name.trim()) {
      toast({
        title: "Error",
        description: "Alert name is required",
        variant: "destructive",
      });
      return;
    }

    if (rules.length === 0) {
      toast({
        title: "Error",
        description: "At least one rule is required",
        variant: "destructive",
      });
      return;
    }

    // Check for required fields in rules
    for (const rule of rules) {
      if (rule.type === 'stock' && !rule.symbol) {
        toast({
          title: "Error",
          description: "Stock symbol is required for stock alerts",
          variant: "destructive",
        });
        return;
      }
    }

    // For rules that use keywords, apply the keywords list
    const finalRules = rules.map(rule => {
      if (rule.type === 'news' || rule.type === 'sector') {
        return { ...rule, keywords };
      }
      return rule;
    });

    onSave({
      name,
      description,
      rules: finalRules.map((rule, index) => ({ ...rule, id: `rule-${index}` })),
      isActive: true,
      deliveryChannels,
    });

    toast({
      title: "Success",
      description: existingAlert ? "Alert updated successfully" : "Alert created successfully",
    });
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
        <Button variant="ghost" size="icon" onClick={onCancel} className="mr-3">
          <ArrowLeft size={18} />
        </Button>
        <h1 className="text-2xl font-semibold">{existingAlert ? 'Edit Alert' : 'Create New Alert'}</h1>
      </div>

      <div className="space-y-6">
        <GlassCard className="p-6">
          <div className="space-y-4">
            <div>
              <Label htmlFor="alertName">Alert Name</Label>
              <Input 
                id="alertName" 
                value={name} 
                onChange={(e) => setName(e.target.value)} 
                placeholder="E.g., AAPL Stock News"
                className="glass-input mt-1"
              />
            </div>
            
            <div>
              <Label htmlFor="alertDescription">Description (Optional)</Label>
              <Textarea 
                id="alertDescription" 
                value={description} 
                onChange={(e) => setDescription(e.target.value)} 
                placeholder="Briefly describe what this alert is for"
                className="glass-input mt-1"
              />
            </div>
          </div>
        </GlassCard>

        <Tabs defaultValue="rules" className="w-full">
          <TabsList className="w-full grid grid-cols-2 mb-4">
            <TabsTrigger value="rules">Alert Rules</TabsTrigger>
            <TabsTrigger value="delivery">Delivery Settings</TabsTrigger>
          </TabsList>
          
          <TabsContent value="rules" className="space-y-4">
            {rules.map((rule, index) => (
              <GlassCard key={index} className="p-6 relative">
                <Button 
                  variant="ghost" 
                  size="icon" 
                  className="absolute top-2 right-2 h-7 w-7"
                  onClick={() => handleRemoveRule(index)}
                  disabled={rules.length === 1}
                >
                  <X size={16} />
                </Button>
                
                <div className="space-y-4 mt-2">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <Label>Alert Type</Label>
                      <Select 
                        value={rule.type} 
                        onValueChange={(value) => handleRuleChange(index, 'type', value)}
                      >
                        <SelectTrigger className="glass-input mt-1">
                          <SelectValue placeholder="Select a type" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="stock">Stock</SelectItem>
                          <SelectItem value="crypto">Cryptocurrency</SelectItem>
                          <SelectItem value="news">Financial News</SelectItem>
                          <SelectItem value="sector">Market Sector</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    
                    <div>
                      <Label>Condition</Label>
                      <Select 
                        value={rule.condition} 
                        onValueChange={(value) => handleRuleChange(index, 'condition', value)}
                      >
                        <SelectTrigger className="glass-input mt-1">
                          <SelectValue placeholder="Select a condition" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="News with specific sentiment">News with specific sentiment</SelectItem>
                          <SelectItem value="Price change threshold">Price change threshold</SelectItem>
                          <SelectItem value="Volume spike">Volume spike</SelectItem>
                          <SelectItem value="Keyword mentions">Keyword mentions</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </div>
                  
                  {(rule.type === 'stock' || rule.type === 'crypto') && (
                    <div>
                      <Label htmlFor={`symbol-${index}`}>Symbol</Label>
                      <Input 
                        id={`symbol-${index}`} 
                        value={rule.symbol || ''} 
                        onChange={(e) => handleRuleChange(index, 'symbol', e.target.value)} 
                        placeholder="E.g., AAPL, BTC"
                        className="glass-input mt-1"
                      />
                    </div>
                  )}
                  
                  {rule.condition.includes('sentiment') && (
                    <div>
                      <Label>Sentiment</Label>
                      <RadioGroup 
                        value={rule.sentiment} 
                        onValueChange={(value) => handleRuleChange(index, 'sentiment', value)} 
                        className="flex space-x-4 mt-1"
                      >
                        <div className="flex items-center space-x-2">
                          <RadioGroupItem value="positive" id={`positive-${index}`} />
                          <Label htmlFor={`positive-${index}`} className="text-green-500">Positive</Label>
                        </div>
                        <div className="flex items-center space-x-2">
                          <RadioGroupItem value="negative" id={`negative-${index}`} />
                          <Label htmlFor={`negative-${index}`} className="text-red-500">Negative</Label>
                        </div>
                        <div className="flex items-center space-x-2">
                          <RadioGroupItem value="neutral" id={`neutral-${index}`} />
                          <Label htmlFor={`neutral-${index}`} className="text-gray-500">Neutral</Label>
                        </div>
                      </RadioGroup>
                    </div>
                  )}
                  
                  {rule.condition.includes('threshold') && (
                    <div>
                      <Label htmlFor={`threshold-${index}`}>Percentage Threshold</Label>
                      <div className="flex items-center mt-1">
                        <Input 
                          id={`threshold-${index}`} 
                          type="number" 
                          value={rule.threshold || 5} 
                          onChange={(e) => handleRuleChange(index, 'threshold', parseFloat(e.target.value))} 
                          className="glass-input w-24"
                          min="0.1"
                          step="0.1"
                        />
                        <span className="ml-2">%</span>
                      </div>
                    </div>
                  )}
                  
                  <div>
                    <Label>Alert Frequency</Label>
                    <Select 
                      value={rule.frequency} 
                      onValueChange={(value) => handleRuleChange(index, 'frequency', value)}
                    >
                      <SelectTrigger className="glass-input mt-1">
                        <SelectValue placeholder="Select frequency" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="instant">Instant (Real-time)</SelectItem>
                        <SelectItem value="daily">Daily Summary</SelectItem>
                        <SelectItem value="weekly">Weekly Summary</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>
              </GlassCard>
            ))}
            
            <Button 
              variant="outline" 
              onClick={handleAddRule} 
              className="w-full mt-2 border-dashed border-2"
            >
              <Plus size={16} className="mr-2" /> Add Another Rule
            </Button>
            
            {(rules.some(rule => rule.type === 'news' || rule.type === 'sector' || rule.condition.includes('keyword'))) && (
              <GlassCard className="p-6 mt-4">
                <Label className="block mb-2">Keywords</Label>
                <div className="flex flex-wrap gap-2 mb-4">
                  {keywords.map((keyword) => (
                    <Badge key={keyword} variant="secondary" className="py-1 px-3">
                      {keyword}
                      <Button 
                        variant="ghost" 
                        size="icon" 
                        className="h-4 w-4 ml-2 p-0"
                        onClick={() => handleRemoveKeyword(keyword)}
                      >
                        <X size={10} />
                      </Button>
                    </Badge>
                  ))}
                  {keywords.length === 0 && (
                    <span className="text-sm text-muted-foreground">No keywords added yet</span>
                  )}
                </div>
                <div className="flex">
                  <Input 
                    value={newKeyword} 
                    onChange={(e) => setNewKeyword(e.target.value)} 
                    placeholder="Add keyword" 
                    className="glass-input"
                    onKeyDown={(e) => e.key === 'Enter' && handleAddKeyword()}
                  />
                  <Button 
                    variant="outline" 
                    onClick={handleAddKeyword} 
                    className="ml-2"
                    disabled={!newKeyword.trim()}
                  >
                    Add
                  </Button>
                </div>
              </GlassCard>
            )}
          </TabsContent>
          
          <TabsContent value="delivery" className="space-y-4">
            <GlassCard className="p-6">
              <h3 className="text-lg font-medium mb-4">Notification Channels</h3>
              
              <div className="space-y-6">
                <div className="flex items-center justify-between">
                  <div>
                    <h4 className="font-medium">Push Notifications</h4>
                    <p className="text-sm text-muted-foreground">Receive alerts on this device</p>
                  </div>
                  <Switch 
                    checked={deliveryChannels.find(c => c.type === 'push')?.enabled || false}
                    onCheckedChange={(checked) => handleChannelToggle('push', checked)}
                  />
                </div>
                
                <div className="flex items-center justify-between">
                  <div>
                    <h4 className="font-medium">Email Notifications</h4>
                    <p className="text-sm text-muted-foreground">Receive alerts via email</p>
                  </div>
                  <Switch 
                    checked={deliveryChannels.find(c => c.type === 'email')?.enabled || false}
                    onCheckedChange={(checked) => handleChannelToggle('email', checked)}
                  />
                </div>
                
                <div className="flex items-center justify-between">
                  <div>
                    <h4 className="font-medium">SMS Notifications</h4>
                    <p className="text-sm text-muted-foreground">Receive alerts via text message</p>
                  </div>
                  <Switch 
                    checked={deliveryChannels.find(c => c.type === 'sms')?.enabled || false}
                    onCheckedChange={(checked) => handleChannelToggle('sms', checked)}
                  />
                </div>
              </div>
            </GlassCard>
          </TabsContent>
        </Tabs>
        
        <div className="flex justify-end gap-3 pt-4">
          <Button variant="outline" onClick={onCancel}>Cancel</Button>
          <Button onClick={handleSave}>Save Alert</Button>
        </div>
      </div>
    </motion.div>
  );
};

export default AlertRules;
