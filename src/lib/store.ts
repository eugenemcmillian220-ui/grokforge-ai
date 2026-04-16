import { create } from "zustand";

export interface Business {
  id: string;
  name: string;
  revenue: number;
  agents: number;
  efficiency: number;
  xFollowers: number;
  status: "active" | "scaling" | "optimizing";
}

export interface Agent {
  id: string;
  name: string;
  role: string;
  status: "active" | "idle" | "learning";
  tasks: number;
  efficiency: number;
  icon: string;
}

export interface Signal {
  id: string;
  type: "opportunity" | "threat" | "trend" | "disruption";
  title: string;
  description: string;
  confidence: number;
  source: string;
}

export interface ChatMessage {
  id: string;
  role: "user" | "assistant";
  content: string;
  timestamp: number;
}

interface AppState {
  activeTab: string;
  setActiveTab: (tab: string) => void;
  apiKey: string;
  setApiKey: (key: string) => void;
  chatMessages: ChatMessage[];
  addChatMessage: (msg: ChatMessage) => void;
  isLoading: boolean;
  setIsLoading: (v: boolean) => void;
  businesses: Business[];
  agents: Agent[];
  signals: Signal[];
}

export const useStore = create<AppState>((set) => ({
  activeTab: "command",
  setActiveTab: (tab) => set({ activeTab: tab }),
  apiKey: "",
  setApiKey: (key) => set({ apiKey: key }),
  chatMessages: [],
  addChatMessage: (msg) =>
    set((s) => ({ chatMessages: [...s.chatMessages, msg] })),
  isLoading: false,
  setIsLoading: (v) => set({ isLoading: v }),
  businesses: [
    {
      id: "1",
      name: "AutoShip Commerce",
      revenue: 47200,
      agents: 4,
      efficiency: 94,
      xFollowers: 12400,
      status: "active",
    },
    {
      id: "2",
      name: "GrokTrade Signals",
      revenue: 31800,
      agents: 3,
      efficiency: 91,
      xFollowers: 8900,
      status: "scaling",
    },
    {
      id: "3",
      name: "NeuralContent Studio",
      revenue: 22100,
      agents: 5,
      efficiency: 88,
      xFollowers: 15600,
      status: "optimizing",
    },
  ],
  agents: [
    { id: "1", name: "DesignGrok", role: "Content & Design", status: "active", tasks: 147, efficiency: 96, icon: "🎨" },
    { id: "2", name: "MarketGrok", role: "Market Intelligence", status: "active", tasks: 312, efficiency: 94, icon: "📊" },
    { id: "3", name: "SupportGrok", role: "Customer Service", status: "idle", tasks: 89, efficiency: 92, icon: "🎧" },
    { id: "4", name: "DataGrok", role: "Data & Optimization", status: "active", tasks: 203, efficiency: 97, icon: "🔬" },
    { id: "5", name: "SalesGrok", role: "Sales Automation", status: "learning", tasks: 56, efficiency: 85, icon: "💰" },
    { id: "6", name: "TradeGrok", role: "Trading Signals", status: "active", tasks: 178, efficiency: 93, icon: "📈" },
  ],
  signals: [
    { id: "1", type: "opportunity", title: "AI SaaS demand surge in healthcare", description: "Healthcare AI market growing 42% YoY. Low competition in compliance automation.", confidence: 87, source: "Grok Market Analysis" },
    { id: "2", type: "threat", title: "OpenAI launching competing agent platform", description: "GPT-5 agent SDK announced. Expected launch Q3 2026. May commoditize basic agent features.", confidence: 73, source: "X Intelligence" },
    { id: "3", type: "trend", title: "Autonomous commerce adoption accelerating", description: "Self-running stores up 340% in 6 months. First-mover advantage window closing.", confidence: 91, source: "Market Data" },
    { id: "4", type: "disruption", title: "Grok-3 multimodal approach changes content game", description: "Real-time video + text generation. Opens new content creation verticals.", confidence: 82, source: "xAI Research" },
  ],
}));
