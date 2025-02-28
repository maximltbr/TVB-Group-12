
import { Alert, ChatMessage, UserSettings } from './types';

export const mockAlerts: Alert[] = [
  {
    id: '1',
    name: 'Tech Industry News',
    description: 'Track news about technology companies',
    createdAt: '2023-05-15T10:30:00Z',
    rules: [
      {
        id: '101',
        type: 'news',
        condition: 'News with specific sentiment',
        keywords: ['AI', 'machine learning', 'tech layoffs'],
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
    name: 'Climate Change Updates',
    description: 'Stay informed about climate policy changes',
    createdAt: '2023-05-20T14:20:00Z',
    rules: [
      {
        id: '201',
        type: 'news',
        condition: 'Keyword mentions',
        keywords: ['climate change', 'carbon emissions', 'renewable energy'],
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
    name: 'Health & Wellness Trends',
    description: 'Weekly summary of health news and research',
    createdAt: '2023-06-01T09:15:00Z',
    rules: [
      {
        id: '301',
        type: 'news',
        condition: 'Keyword mentions',
        keywords: ['health research', 'wellness', 'mental health'],
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
    name: 'Social Media Activity',
    description: 'Track significant engagement on your content',
    createdAt: '2023-06-05T16:45:00Z',
    rules: [
      {
        id: '401',
        type: 'stock',
        condition: 'Volume spike',
        symbol: 'SOCIAL',
        threshold: 50,
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
    content: 'What\'s happening with the latest tech layoffs?',
    sender: 'user',
    timestamp: '2023-06-10T09:30:00Z',
  },
  {
    id: '2',
    content: 'Recent reports show that tech layoffs have slowed by 35% compared to last quarter. Major companies like Google and Microsoft have announced they\'re resuming hiring in AI divisions while maintaining hiring freezes in other departments. Startups are still facing funding challenges, but the overall sentiment in the industry has improved with new job openings up 12% month-over-month.',
    sender: 'assistant',
    timestamp: '2023-06-10T09:30:10Z',
    model: 'gpt',
  },
  {
    id: '3',
    content: 'How is the new climate bill affecting renewable energy adoption?',
    sender: 'user',
    timestamp: '2023-06-10T09:32:00Z',
  },
  {
    id: '4',
    content: 'The new climate legislation has accelerated renewable energy adoption, with solar installations up 28% and wind projects increasing by 15%. Tax incentives have made these technologies more affordable for consumers and businesses alike. The bill has also sparked a 40% increase in green energy job postings across the country, particularly in manufacturing and installation sectors. Analysts project this growth trend will continue for at least the next 3-5 years.',
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
    title: 'New Study Shows Benefits of Hybrid Work Models',
    source: 'Business Insider',
    timestamp: '2 hours ago',
    sentiment: 'positive',
  },
  {
    id: '2',
    title: 'Major Data Breach Affects Millions of Users',
    source: 'Tech Chronicle',
    timestamp: '4 hours ago',
    sentiment: 'negative',
  },
  {
    id: '3',
    title: 'Global Summit on Climate Change Concludes',
    source: 'Environmental Today',
    timestamp: '6 hours ago',
    sentiment: 'neutral',
  },
  {
    id: '4',
    title: 'New Breakthrough in Cancer Research Announced',
    source: 'Health Journal',
    timestamp: '8 hours ago',
    sentiment: 'positive',
  },
];

export const marketSummary = {
  indices: [
    { name: 'Trending News', value: '128 stories', change: '+12% today', direction: 'up' },
    { name: 'Your Posts', value: '24 engagements', change: '+8% today', direction: 'up' },
    { name: 'Notifications', value: '17 new', change: '-3% today', direction: 'down' },
    { name: 'Messages', value: '5 unread', change: '+2 today', direction: 'up' },
  ],
  topGainers: [
    { symbol: 'TECH', name: 'Technology', change: '+28%' },
    { symbol: 'HLTH', name: 'Healthcare', change: '+15%' },
    { symbol: 'EDU', name: 'Education', change: '+10%' },
  ],
  topLosers: [
    { symbol: 'TRSP', name: 'Transportation', change: '-7%' },
    { symbol: 'RTIL', name: 'Retail', change: '-4%' },
    { symbol: 'ENT', name: 'Entertainment', change: '-2%' },
  ],
};
