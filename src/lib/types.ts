
export type AIModel = 'gpt' | 'deepseek' | 'claude';

export interface Alert {
  id: string;
  name: string;
  description: string;
  createdAt: string;
  rules: AlertRule[];
  isActive: boolean;
  deliveryChannels: DeliveryChannel[];
}

export interface AlertRule {
  id: string;
  type: 'stock' | 'crypto' | 'news' | 'sector';
  condition: string;
  symbol?: string;
  keywords?: string[];
  sentiment?: 'positive' | 'negative' | 'neutral';
  frequency?: 'instant' | 'daily' | 'weekly';
  threshold?: number;
}

export type DeliveryChannel = {
  type: 'push' | 'email' | 'sms';
  enabled: boolean;
  config?: {
    email?: string;
    phone?: string;
  };
};

export interface ChatMessage {
  id: string;
  content: string;
  sender: 'user' | 'assistant';
  timestamp: string;
  model?: AIModel;
}

export interface UserSettings {
  name: string;
  email: string;
  phone?: string;
  deliveryPreferences: {
    push: boolean;
    email: boolean;
    sms: boolean;
  };
  defaultAIModel: AIModel;
}
