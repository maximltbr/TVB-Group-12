
import React from 'react';
import { motion } from 'framer-motion';
import { AlertCircle, Bell, ChevronRight, Clock, Trash2 } from 'lucide-react';
import { Alert } from '@/lib/types';
import GlassCard from './ui/GlassCard';
import { Button } from '@/components/ui/button';
import { Switch } from '@/components/ui/switch';
import { Badge } from '@/components/ui/badge';
import { cn } from '@/lib/utils';

interface AlertsListProps {
  alerts: Alert[];
  onDelete: (id: string) => void;
  onToggle: (id: string, active: boolean) => void;
  onEdit: (id: string) => void;
}

const AlertsList: React.FC<AlertsListProps> = ({ 
  alerts, 
  onDelete, 
  onToggle,
  onEdit
}) => {
  const container = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  };

  const item = {
    hidden: { y: 20, opacity: 0 },
    show: { y: 0, opacity: 1 }
  };

  return (
    <motion.div 
      className="space-y-4"
      variants={container}
      initial="hidden"
      animate="show"
    >
      {alerts.length === 0 ? (
        <div className="text-center py-10">
          <p className="text-muted-foreground">No alerts created yet.</p>
        </div>
      ) : (
        alerts.map((alert) => (
          <motion.div key={alert.id} variants={item}>
            <GlassCard 
              animate={false}
              className={cn(
                'p-4 relative overflow-hidden transition-all duration-300',
                alert.isActive ? 'border-l-4 border-l-primary' : 'border-l-4 border-l-muted'
              )}
            >
              <div className="flex items-center justify-between mb-3">
                <div className="flex items-center gap-2">
                  <span className={cn(
                    "w-2 h-2 rounded-full",
                    alert.isActive ? "bg-primary animate-pulse" : "bg-muted"
                  )}></span>
                  <h3 className="font-medium">{alert.name}</h3>
                </div>
                <Switch 
                  checked={alert.isActive} 
                  onCheckedChange={(checked) => onToggle(alert.id, checked)}
                  className="data-[state=checked]:bg-primary"
                />
              </div>
              
              <p className="text-sm text-muted-foreground mb-3">{alert.description}</p>
              
              <div className="flex flex-wrap gap-2 mb-3">
                {alert.rules.map(rule => (
                  <Badge key={rule.id} variant="outline" className="bg-accent/40 text-xs">
                    {rule.symbol && <span className="font-semibold mr-1">{rule.symbol}:</span>}
                    {rule.condition}
                  </Badge>
                ))}
              </div>
              
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2 text-xs text-muted-foreground">
                  <Clock size={12} />
                  <span>
                    {alert.rules[0]?.frequency === 'instant' 
                      ? 'Real-time' 
                      : alert.rules[0]?.frequency === 'daily'
                        ? 'Daily'
                        : 'Weekly'}
                  </span>
                </div>
                
                <div className="flex items-center gap-2">
                  <Button 
                    size="sm" 
                    variant="ghost" 
                    className="h-8 w-8 p-0 rounded-full" 
                    onClick={() => onDelete(alert.id)}
                  >
                    <Trash2 size={14} className="text-muted-foreground" />
                  </Button>
                  <Button 
                    size="sm" 
                    variant="ghost" 
                    className="h-8 w-8 p-0 rounded-full"
                    onClick={() => onEdit(alert.id)}
                  >
                    <ChevronRight size={16} />
                  </Button>
                </div>
              </div>

              <div className="flex mt-3 pt-3 border-t border-border/30">
                <div className="flex items-center gap-1 text-xs">
                  <span className="text-muted-foreground">Delivery:</span>
                  {alert.deliveryChannels.map(channel => 
                    channel.enabled && (
                      <Badge 
                        key={channel.type} 
                        variant="outline" 
                        className="text-xs bg-secondary/50 mr-1"
                      >
                        {channel.type === 'push' ? 'Push' : 
                         channel.type === 'email' ? 'Email' : 'SMS'}
                      </Badge>
                    )
                  )}
                </div>
              </div>
            </GlassCard>
          </motion.div>
        ))
      )}
    </motion.div>
  );
};

export default AlertsList;
