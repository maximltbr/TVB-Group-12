
import { Alert, ChatMessage, UserSettings } from './types';

export const mockAlerts: Alert[] = [
  {
    id: '1',
    name: 'Apple Stock Alerts',
    description: 'Track negative news about Apple',
    createdAt: '2023-05-15T10:30:00Z',
    rules: [
      {
        id: '101',
        type: 'stock',
        condition: 'News with negative sentiment',
        symbol: 'AAPL',
        sentiment: 'negative',
        frequency: 'instant',
      }
    ],
    isActive: true,
    deliveryChannels: [
      { type: 'push', enabled: true },
      { type: 'email', enabled: true },
      { type: 'sms', enabled: false },
    ]
  },
  {
    id: '2',
    name: 'Crypto Regulation',
    description: 'Updates on cryptocurrency regulations in EU',
    createdAt: '2023-05-20T14:20:00Z',
    rules: [
      {
        id: '201',
        type: 'crypto',
        condition: 'News about regulations',
        keywords: ['regulation', 'EU', 'compliance', 'law'],
        frequency: 'daily',
      }
    ],
    isActive: true,
    deliveryChannels: [
      { type: 'push', enabled: true },
      { type: 'email', enabled: true },
      { type: 'sms', enabled: false },
    ]
  },
  {
    id: '3',
    name: 'Banking Sector Summary',
    description: 'Weekly summary of banking sector updates',
    createdAt: '2023-06-01T09:15:00Z',
    rules: [
      {
        id: '301',
        type: 'sector',
        condition: 'Major shifts in banking sector',
        keywords: ['banking', 'finance', 'banks'],
        frequency: 'weekly',
      }
    ],
    isActive: false,
    deliveryChannels: [
      { type: 'push', enabled: false },
      { type: 'email', enabled: true },
      { type: 'sms', enabled: false },
    ]
  },
  {
    id: '4',
    name: 'Tesla Price Movements',
    description: 'Significant price changes for Tesla stock',
    createdAt: '2023-06-05T16:45:00Z',
    rules: [
      {
        id: '401',
        type: 'stock',
        condition: 'Price change threshold',
        symbol: 'TSLA',
        threshold: 5,
        frequency: 'instant',
      }
    ],
    isActive: true,
    deliveryChannels: [
      { type: 'push', enabled: true },
      { type: 'email', enabled: false },
      { type: 'sms', enabled: true, config: { phone: '+11234567890' } },
    ]
  },
];

export const mockChatHistory: ChatMessage[] = [
  {
    id: '1',
    content: 'What\'s the latest sentiment on Tesla?',
    sender: 'user',
    timestamp: '2023-06-10T09:30:00Z',
  },
  {
    id: '2',
    content: 'Recent sentiment analysis shows Tesla has a moderately positive outlook. The company\'s Q2 earnings exceeded expectations, leading to a 3% stock price increase. Investors remain cautiously optimistic about production targets, though supply chain concerns persist. Media coverage has been 65% positive, focusing on innovation and expansion plans.',
    sender: 'assistant',
    timestamp: '2023-06-10T09:30:10Z',
    model: 'gpt',
  },
  {
    id: '3',
    content: 'How did the Fed\'s announcement impact the S&P 500?',
    sender: 'user',
    timestamp: '2023-06-10T09:32:00Z',
  },
  {
    id: '4',
    content: 'The Fed\'s recent decision to maintain current interest rates caused an immediate 0.7% rally in the S&P 500, with financial sector stocks showing the strongest gains at 1.2%. Trading volume was 15% above average. Market volatility, as measured by the VIX, decreased by 3 points, indicating reduced investor uncertainty. Analysts project continued market stability if inflation data remains within targeted ranges.',
    sender: 'assistant',
    timestamp: '2023-06-10T09:32:15Z',
    model: 'gpt',
  },
];

export const mockUserSettings: UserSettings = {
  name: 'Alex Morgan',
  email: 'alex.morgan@example.com',
  phone: '+11234567890',
  deliveryPreferences: {
    push: true,
    email: true,
    sms: false,
  },
  defaultAIModel: 'gpt',
};

export const recentNewsHeadlines = [
  {
    id: '1',
    title: 'Fed Signals Potential Rate Cut in Coming Months',
    source: 'Financial Times',
    timestamp: '2 hours ago',
    sentiment: 'positive',
  },
  {
    id: '2',
    title: 'Tech Giants Face New Antitrust Scrutiny',
    source: 'Wall Street Journal',
    timestamp: '4 hours ago',
    sentiment: 'negative',
  },
  {
    id: '3',
    title: 'Oil Prices Stabilize After OPEC+ Agreement',
    source: 'Bloomberg',
    timestamp: '6 hours ago',
    sentiment: 'neutral',
  },
  {
    id: '4',
    title: 'European Markets Rally on Strong Economic Data',
    source: 'Reuters',
    timestamp: '8 hours ago',
    sentiment: 'positive',
  },
];

export const marketSummary = {
  indices: [
    { name: 'S&P 500', value: '4,587.32', change: '+0.53%', direction: 'up' },
    { name: 'NASDAQ', value: '14,328.75', change: '+0.78%', direction: 'up' },
    { name: 'DOW', value: '36,124.56', change: '+0.32%', direction: 'up' },
    { name: 'FTSE 100', value: '7,492.83', change: '-0.21%', direction: 'down' },
  ],
  topGainers: [
    { symbol: 'NVDA', name: 'NVIDIA', change: '+3.2%' },
    { symbol: 'AMZN', name: 'Amazon', change: '+2.8%' },
    { symbol: 'MSFT', name: 'Microsoft', change: '+1.9%' },
  ],
  topLosers: [
    { symbol: 'BA', name: 'Boeing', change: '-2.4%' },
    { symbol: 'DIS', name: 'Disney', change: '-1.7%' },
    { symbol: 'JPM', name: 'JPMorgan', change: '-1.1%' },
  ],
};
