
import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useMediaQuery } from 'react-responsive';
import { Plus, Settings, BarChart3, ArrowUpRight, ArrowDownRight, ExternalLink } from 'lucide-react';
import Header from '@/components/Header';
import AlertsList from '@/components/AlertsList';
import AlertRules from '@/components/AlertRules';
import AIChat from '@/components/AIChat';
import NotificationSettings from '@/components/NotificationSettings';
import GlassCard from '@/components/ui/GlassCard';
import { Button } from '@/components/ui/button';
import { Alert } from '@/lib/types';
import { mockAlerts, recentNewsHeadlines, marketSummary } from '@/lib/mockData';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Badge } from '@/components/ui/badge';
import { cn } from '@/lib/utils';
import { useToast } from '@/components/ui/use-toast';

type View = 'dashboard' | 'create-alert' | 'edit-alert' | 'settings';

const Index = () => {
  const { toast } = useToast();
  const [alerts, setAlerts] = useState<Alert[]>(mockAlerts);
  const [currentView, setCurrentView] = useState<View>('dashboard');
  const [selectedAlertId, setSelectedAlertId] = useState<string | null>(null);
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const isLargeScreen = useMediaQuery({ minWidth: 1024 });

  const handleToggleAlert = (id: string, active: boolean) => {
    setAlerts(
      alerts.map(alert => (alert.id === id ? { ...alert, isActive: active } : alert))
    );
    
    toast({
      title: active ? "Alert Activated" : "Alert Deactivated",
      description: active 
        ? "You will now receive notifications for this alert" 
        : "Notifications for this alert have been paused",
    });
  };

  const handleDeleteAlert = (id: string) => {
    setAlerts(alerts.filter(alert => alert.id !== id));
    
    toast({
      title: "Alert Deleted",
      description: "The alert has been permanently removed",
    });
  };

  const handleCreateAlert = (alertData: Omit<Alert, 'id' | 'createdAt'>) => {
    const newAlert: Alert = {
      ...alertData,
      id: `alert-${Date.now()}`,
      createdAt: new Date().toISOString(),
    };
    
    setAlerts([newAlert, ...alerts]);
    setCurrentView('dashboard');
  };

  const handleUpdateAlert = (alertData: Omit<Alert, 'id' | 'createdAt'>) => {
    if (!selectedAlertId) return;
    
    setAlerts(
      alerts.map(alert => {
        if (alert.id === selectedAlertId) {
          return {
            ...alert,
            ...alertData,
          };
        }
        return alert;
      })
    );
    
    setSelectedAlertId(null);
    setCurrentView('dashboard');
  };

  const handleEditAlert = (id: string) => {
    setSelectedAlertId(id);
    setCurrentView('edit-alert');
  };

  const getSelectedAlert = () => {
    return alerts.find(alert => alert.id === selectedAlertId);
  };

  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-br from-background to-accent/20">
      <Header onMenuToggle={() => setIsSidebarOpen(!isSidebarOpen)} />
      
      <main className="flex-1 container px-4 py-6">
        <AnimatePresence mode="wait">
          {currentView === 'dashboard' && (
            <motion.div
              key="dashboard"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.3 }}
            >
              <div className="flex flex-col lg:flex-row gap-6">
                {/* Main content */}
                <div className="flex-1">
                  <motion.div 
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.3 }}
                    className="mb-6 flex flex-col sm:flex-row sm:items-center justify-between gap-4"
                  >
                    <div>
                      <h1 className="text-3xl font-semibold tracking-tight">Financial Pulse</h1>
                      <p className="text-muted-foreground mt-1">Your real-time financial alert system</p>
                    </div>
                    <Button onClick={() => setCurrentView('create-alert')} className="sm:w-auto w-full">
                      <Plus size={16} className="mr-2" /> Create Alert
                    </Button>
                  </motion.div>

                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
                    {marketSummary.indices.slice(0, 3).map((index, i) => (
                      <motion.div
                        key={index.name}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.3, delay: i * 0.1 }}
                      >
                        <GlassCard className="p-4 h-full">
                          <div className="flex items-center justify-between">
                            <h3 className="text-sm font-medium text-muted-foreground">{index.name}</h3>
                            <Badge 
                              variant={index.direction === 'up' ? 'outline' : 'destructive'} 
                              className={cn(
                                "text-xs",
                                index.direction === 'up' ? "text-green-600 bg-green-50 border-green-200" : "bg-red-50 border-red-200"
                              )}
                            >
                              {index.direction === 'up' ? 
                                <ArrowUpRight size={12} className="mr-1" /> : 
                                <ArrowDownRight size={12} className="mr-1" />
                              }
                              {index.change}
                            </Badge>
                          </div>
                          <p className="text-2xl font-medium mt-2">{index.value}</p>
                        </GlassCard>
                      </motion.div>
                    ))}
                  </div>

                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.3, delay: 0.2 }}
                    className="mb-6"
                  >
                    <h2 className="text-xl font-semibold mb-4">Your Alerts</h2>
                    <AlertsList 
                      alerts={alerts} 
                      onDelete={handleDeleteAlert}
                      onToggle={handleToggleAlert}
                      onEdit={handleEditAlert}
                    />
                    {alerts.length === 0 && (
                      <Button 
                        onClick={() => setCurrentView('create-alert')} 
                        variant="outline"
                        className="mt-4 w-full border-dashed border-2"
                      >
                        <Plus size={16} className="mr-2" /> Create Your First Alert
                      </Button>
                    )}
                  </motion.div>
                </div>

                {/* Side panel */}
                <div className="lg:w-80 space-y-6">
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.3, delay: 0.3 }}
                  >
                    <GlassCard className="p-4">
                      <div className="flex items-center justify-between mb-3">
                        <h3 className="font-medium">Market Overview</h3>
                        <Button 
                          variant="ghost" 
                          size="icon" 
                          className="h-7 w-7 rounded-full"
                        >
                          <BarChart3 size={14} />
                        </Button>
                      </div>
                      
                      <Tabs defaultValue="gainers">
                        <TabsList className="w-full">
                          <TabsTrigger value="gainers" className="text-xs">Top Gainers</TabsTrigger>
                          <TabsTrigger value="losers" className="text-xs">Top Losers</TabsTrigger>
                        </TabsList>
                        
                        <TabsContent value="gainers">
                          <div className="space-y-2 mt-2">
                            {marketSummary.topGainers.map((stock) => (
                              <div key={stock.symbol} className="flex items-center justify-between py-1">
                                <div className="flex items-center gap-2">
                                  <div className="w-8 h-8 bg-primary/10 rounded-full flex items-center justify-center text-xs font-semibold text-primary">
                                    {stock.symbol.substring(0, 2)}
                                  </div>
                                  <div>
                                    <p className="text-sm font-medium">{stock.name}</p>
                                    <p className="text-xs text-muted-foreground">{stock.symbol}</p>
                                  </div>
                                </div>
                                <Badge className="bg-green-50 text-green-600 border-green-200">
                                  {stock.change}
                                </Badge>
                              </div>
                            ))}
                          </div>
                        </TabsContent>
                        
                        <TabsContent value="losers">
                          <div className="space-y-2 mt-2">
                            {marketSummary.topLosers.map((stock) => (
                              <div key={stock.symbol} className="flex items-center justify-between py-1">
                                <div className="flex items-center gap-2">
                                  <div className="w-8 h-8 bg-red-50 rounded-full flex items-center justify-center text-xs font-semibold text-red-500">
                                    {stock.symbol.substring(0, 2)}
                                  </div>
                                  <div>
                                    <p className="text-sm font-medium">{stock.name}</p>
                                    <p className="text-xs text-muted-foreground">{stock.symbol}</p>
                                  </div>
                                </div>
                                <Badge variant="destructive" className="bg-red-50 border-red-200">
                                  {stock.change}
                                </Badge>
                              </div>
                            ))}
                          </div>
                        </TabsContent>
                      </Tabs>
                    </GlassCard>
                  </motion.div>
                  
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.3, delay: 0.4 }}
                  >
                    <GlassCard className="p-4">
                      <div className="flex items-center justify-between mb-3">
                        <h3 className="font-medium">Recent News</h3>
                        <Button 
                          variant="ghost" 
                          size="icon" 
                          className="h-7 w-7 rounded-full"
                        >
                          <ExternalLink size={14} />
                        </Button>
                      </div>
                      
                      <div className="space-y-3">
                        {recentNewsHeadlines.map((news) => (
                          <div key={news.id} className="border-b border-border/30 last:border-0 pb-3 last:pb-0">
                            <div className="flex items-center gap-2 mb-1">
                              <Badge 
                                variant="outline"
                                className={cn(
                                  "text-xs",
                                  news.sentiment === 'positive' 
                                    ? "bg-green-50 text-green-600 border-green-200" 
                                    : news.sentiment === 'negative'
                                      ? "bg-red-50 text-red-500 border-red-200"
                                      : "bg-gray-50 text-gray-500 border-gray-200"
                                )}
                              >
                                {news.sentiment}
                              </Badge>
                              <span className="text-xs text-muted-foreground">{news.timestamp}</span>
                            </div>
                            <h4 className="text-sm font-medium mb-1">{news.title}</h4>
                            <p className="text-xs text-muted-foreground">{news.source}</p>
                          </div>
                        ))}
                      </div>
                    </GlassCard>
                  </motion.div>
                  
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.3, delay: 0.5 }}
                  >
                    <Button 
                      variant="outline" 
                      onClick={() => setCurrentView('settings')}
                      className="w-full"
                    >
                      <Settings size={16} className="mr-2" /> Notification Settings
                    </Button>
                  </motion.div>
                </div>
              </div>
            </motion.div>
          )}
          
          {currentView === 'create-alert' && (
            <motion.div
              key="create-alert"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.3 }}
            >
              <AlertRules
                onSave={handleCreateAlert}
                onCancel={() => setCurrentView('dashboard')}
              />
            </motion.div>
          )}
          
          {currentView === 'edit-alert' && selectedAlertId && (
            <motion.div
              key="edit-alert"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.3 }}
            >
              <AlertRules
                existingAlert={getSelectedAlert()}
                onSave={handleUpdateAlert}
                onCancel={() => {
                  setSelectedAlertId(null);
                  setCurrentView('dashboard');
                }}
              />
            </motion.div>
          )}
          
          {currentView === 'settings' && (
            <motion.div
              key="settings"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.3 }}
            >
              <NotificationSettings
                onBack={() => setCurrentView('dashboard')}
              />
            </motion.div>
          )}
        </AnimatePresence>
      </main>
      
      <AIChat />
    </div>
  );
};

export default Index;
