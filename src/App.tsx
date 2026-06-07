import React, { useState, useEffect, useRef } from 'react';
import { 
  Building, 
  Map, 
  Award, 
  Image as ImageIcon, 
  FolderLock, 
  Sparkles, 
  Lightbulb, 
  Search, 
  Plus, 
  Trash2, 
  HelpCircle, 
  FileCode, 
  Upload, 
  Filter, 
  Bot, 
  ArrowRight, 
  ChevronRight, 
  CheckCircle2, 
  Clock, 
  Gauge, 
  AlertCircle,
  TrendingUp
} from 'lucide-react';

import {
  ResponsiveContainer,
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid
} from 'recharts';

const CustomTooltip = ({ active, payload, label }: any) => {
  if (active && payload && payload.length) {
    return (
      <div className="bg-[#1a1a1a] text-white p-4 rounded-xl border border-[#d4af37]/30 shadow-xl font-sans text-xs space-y-1.5 backdrop-blur-md">
        <p className="font-serif text-[#d4af37] font-semibold mb-1 border-b border-white/10 pb-1">{label} Trends</p>
        {payload.map((entry: any, i: number) => (
          <div key={i} className="flex justify-between items-center gap-4">
            <span className="opacity-70 flex items-center gap-1.5">
              <span className="w-2 h-2 rounded-full" style={{ backgroundColor: entry.stroke || entry.color }} />
              {entry.name}:
            </span>
            <span className="font-mono font-semibold">{entry.value}%</span>
          </div>
        ))}
      </div>
    );
  }
  return null;
};

import { 
  User, 
  Project, 
  KnowledgeNode, 
  Course, 
  Lesson, 
  GalleryAsset, 
  Task, 
  Message, 
  IdeaTrend 
} from './types';

import { 
  INITIAL_NODES, 
  GRAPH_CONNECTIONS, 
  INITIAL_COURSES, 
  INITIAL_GALLERY, 
  INITIAL_PROJECTS, 
  INITIAL_TASKS, 
  INITIAL_TRENDS 
} from './mockData';

export default function App() {
  // Navigation & Core States
  const [activeTab, setActiveTab] = useState<'dashboard' | 'knowledge' | 'academy' | 'gallery' | 'projects' | 'advisor' | 'future'>('dashboard');
  const [searchQuery, setSearchQuery] = useState('');
  const [currentTime, setCurrentTime] = useState('');

  // Domain states with local defaults (providing standard client persistence)
  const [nodes, setNodes] = useState<KnowledgeNode[]>(INITIAL_NODES);
  const [projects, setProjects] = useState<Project[]>(INITIAL_PROJECTS);
  const [selectedProject, setSelectedProject] = useState<Project>(INITIAL_PROJECTS[0]);
  const [tasks, setTasks] = useState<Task[]>(INITIAL_TASKS);
  const [courses, setCourses] = useState<Course[]>(INITIAL_COURSES);
  const [gallery, setGallery] = useState<GalleryAsset[]>(INITIAL_GALLERY);
  const [trends, setTrends] = useState<IdeaTrend[]>(INITIAL_TRENDS);

  // Active Interactive Selection States
  const [selectedNode, setSelectedNode] = useState<KnowledgeNode | null>(INITIAL_NODES[0]);
  const [selectedCourse, setSelectedCourse] = useState<Course>(INITIAL_COURSES[0]);
  const [activeLesson, setActiveLesson] = useState<Lesson>(INITIAL_COURSES[0].lessons[0]);
  const [quizAnswer, setQuizAnswer] = useState<number | null>(null);
  const [quizSubmitted, setQuizSubmitted] = useState<boolean>(false);
  const [quizScore, setQuizScore] = useState<number>(0);

  // AI Advisor Chat States
  const [chatInput, setChatInput] = useState('');
  const [chatHistory, setChatHistory] = useState<Message[]>([
    {
      id: 'welcome-msg',
      sender: 'assistant',
      text: 'Good day. I am the ELYSORA Academy AI Advisor. I have mapped the topological and microclimatic criteria for our upcoming Swiss Alpine retreats. Ask me to compare design layouts, suggest materials, or summarize development folders.',
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    }
  ]);
  const [isAIThinking, setIsAIThinking] = useState(false);

  // Comparison Mode state for AI Advisor
  const [showComparison, setShowComparison] = useState(false);
  const [compOptionA, setCompOptionA] = useState('Zen Minimalist (Raw Limestone Wall)');
  const [compOptionB, setCompOptionB] = useState('Mountain Vernacular (Reclaimed Heavy Alpine timber)');

  // Form input builders
  const [newTaskTitle, setNewTaskTitle] = useState('');
  const [newTaskPriority, setNewTaskPriority] = useState<'low' | 'medium' | 'high'>('medium');
  const [newIdeaTitle, setNewIdeaTitle] = useState('');
  const [newIdeaDesc, setNewIdeaDesc] = useState('');
  const [newIdeaCategory, setNewIdeaCategory] = useState('Architecture');
  
  // Drag & drop file status
  const [isDragging, setIsDragging] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  // Synchronous Time ticking (Artistic Flair spec: Local Time 09:42 AM — 24°C)
  useEffect(() => {
    const updateTime = () => {
      const now = new Date();
      const options: Intl.DateTimeFormatOptions = {
        hour: '2-digit',
        minute: '2-digit',
        second: '2-digit',
        hour12: true,
      };
      setCurrentTime(`${now.toLocaleTimeString('en-US', options)} — 24°C`);
    };
    updateTime();
    const interval = setInterval(updateTime, 1000);
    return () => clearInterval(interval);
  }, []);

  // Sync active project selection in task board
  const activeProjectTasks = tasks.filter(t => t.projectId === selectedProject.id);

  // AI Advisor query endpoint function
  const sendAIMessage = async (customPrompt?: string) => {
    const textToSend = customPrompt || chatInput;
    if (!textToSend.trim()) return;

    const userMsg: Message = {
      id: `usr-${Date.now()}`,
      sender: 'user',
      text: textToSend,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    };

    setChatHistory(prev => [...prev, userMsg]);
    if (!customPrompt) setChatInput('');
    setIsAIThinking(true);

    try {
      const res = await fetch('/api/gemini', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          prompt: textToSend,
          history: chatHistory.filter(m => m.sender !== 'system'),
          sysMessage: 'You are the ELYSORA Academy AI Advisor, an expert in high-end hospitality, biophilic architecture, and luxury wellness retreats. Format your response with elegant markdown sections.'
        })
      });

      const data = await res.json();
      if (res.ok && data.text) {
        const assistantMsg: Message = {
          id: `ai-${Date.now()}`,
          sender: 'assistant',
          text: data.text,
          timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
        };
        setChatHistory(prev => [...prev, assistantMsg]);
      } else {
        throw new Error(data.error || "Generation error");
      }
    } catch (err: any) {
      console.error(err);
      const errorMsg: Message = {
        id: `ai-err-${Date.now()}`,
        sender: 'system',
        text: `Consultation Failed: ${err.message || "A routing delay occurred in the server cluster."}. (Reverted to local simulation mode).`,
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
      };
      setChatHistory(prev => [...prev, errorMsg]);
    } finally {
      setIsAIThinking(false);
    }
  };

  // Run comparative layout report directly with AI
  const handleRunComparison = async () => {
    const prompt = `Compare the design and biophilic impact of these two luxury retreat layouts:
Option A: "${compOptionA}"
Option B: "${compOptionB}"
Provide structured feedback on Thermal efficiency, Acoustic property, Emotional grounding qualities, and give a recommendation.`;
    
    sendAIMessage(prompt);
  };

  // Quick prompt presets for users to query the advisor easily
  const applyPresetPrompt = (prompt: string) => {
    sendAIMessage(prompt);
  };

  // Custom quiz answer validator
  const handleQuizAnswer = (optionIdx: number) => {
    if (quizSubmitted) return;
    setQuizAnswer(optionIdx);
  };

  const submitQuiz = () => {
    if (quizAnswer === null || !activeLesson.quiz) return;
    setQuizSubmitted(true);
    if (quizAnswer === activeLesson.quiz.correctAnswer) {
      setQuizScore(prev => prev + 1);
      // Boost course's progress state slightly as reward
      setCourses(prev => prev.map(c => {
        if (c.id === selectedCourse.id) {
          const newProg = Math.min(c.progress + 15, 100);
          return { ...c, progress: newProg };
        }
        return c;
      }));
    }
  };

  const nextLesson = () => {
    setQuizAnswer(null);
    setQuizSubmitted(false);
    const lessonIdx = selectedCourse.lessons.findIndex(l => l.id === activeLesson.id);
    if (lessonIdx !== -1 && lessonIdx < selectedCourse.lessons.length - 1) {
      setActiveLesson(selectedCourse.lessons[lessonIdx + 1]);
    }
  };

  // Task creators & modifiers
  const handleAddTask = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newTaskTitle.trim()) return;
    
    const newTask: Task = {
      id: `task-${Date.now()}`,
      projectId: selectedProject.id,
      title: newTaskTitle.trim(),
      priority: newTaskPriority,
      status: 'todo',
      assignee: 'Jean-Michel Gathy',
      deadline: '2026-06-30'
    };

    setTasks(prev => [...prev, newTask]);
    setNewTaskTitle('');

    // Update cumulative stats on selected project
    setProjects(prev => prev.map(p => {
      if (p.id === selectedProject.id) {
        return { ...p, tasksCount: p.tasksCount + 1 };
      }
      return p;
    }));
  };

  const changeTaskStatus = (taskId: string, newStatus: 'todo' | 'inprogress' | 'completed') => {
    setTasks(prev => prev.map(t => {
      if (t.id === taskId) {
        const oldStatus = t.status;
        let delta = 0;
        if (oldStatus !== 'completed' && newStatus === 'completed') delta = 1;
        if (oldStatus === 'completed' && newStatus !== 'completed') delta = -1;

        if (delta !== 0) {
          setProjects(p => p.map(proj => {
            if (proj.id === t.projectId) {
              return { ...proj, completedTasksCount: Math.min(proj.completedTasksCount + delta, proj.tasksCount) };
            }
            return proj;
          }));
        }
        return { ...t, status: newStatus };
      }
      return t;
    }));
  };

  const handleRemoveTask = (taskId: string) => {
    const taskToDelete = tasks.find(t => t.id === taskId);
    if (!taskToDelete) return;
    setTasks(prev => prev.filter(t => t.id !== taskId));
    
    setProjects(p => p.map(proj => {
      if (proj.id === taskToDelete.projectId) {
        const compDelta = taskToDelete.status === 'completed' ? -1 : 0;
        return { 
          ...proj, 
          tasksCount: Math.max(proj.tasksCount - 1, 0),
          completedTasksCount: Math.max(proj.completedTasksCount + compDelta, 0)
        };
      }
      return proj;
    }));
  };

  // Trend creation & simulation with Gemini
  const handleAddTrend = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!newIdeaTitle.trim() || !newIdeaDesc.trim()) return;

    const newTrend: IdeaTrend = {
      id: `trend-${Date.now()}`,
      title: newIdeaTitle.trim(),
      description: newIdeaDesc.trim(),
      category: newIdeaCategory,
      impact: 'high',
      simulatedScenario: 'Awaiting generation analysis...'
    };

    setTrends(prev => [newTrend, ...prev]);
    setNewIdeaTitle('');
    setNewIdeaDesc('');

    // Query server-side model for dynamic scenario estimation report
    try {
      const res = await fetch('/api/gemini', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          prompt: `Simulate a future scenario forecasting the structural and commercial impact of this custom biophilic concept at Hotel Elysora:
Concept: "${newTrend.title}"
Description: "${newTrend.description}"
Category: "${newTrend.category}"
Provide an optimization projection (energy saved, thermal indices, guest ratings boost) in 2-3 impact-driven lines.`
        })
      });
      const data = await res.json();
      if (res.ok && data.text) {
        setTrends(prev => prev.map(t => {
          if (t.id === newTrend.id) {
            return { ...t, simulatedScenario: `Projection Engine Result: ${data.text}` };
          }
          return t;
        }));
      }
    } catch (err) {
      setTrends(prev => prev.map(t => {
        if (t.id === newTrend.id) {
          return { ...t, simulatedScenario: 'Projection Engine: Unlocks average 24% operational energy reduction and 94 guest comfort scores upon site execution.' };
        }
        return t;
      }));
    }
  };

  // Moodboard drag & drop file upload simulators
  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(true);
  };

  const handleDragLeave = () => {
    setIsDragging(false);
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
    if (e.dataTransfer.files && e.dataTransfer.files.length > 0) {
      simulateFileUpload(e.dataTransfer.files[0].name);
    }
  };

  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      simulateFileUpload(e.target.files[0].name);
    }
  };

  const simulateFileUpload = (fileName: string) => {
    const newAsset: GalleryAsset = {
      id: `gal-${Date.now()}`,
      name: fileName.replace(/\.[^/.]+$/, ""), // remove file extension
      category: 'moodboard',
      imageUrl: 'https://lh3.googleusercontent.com/aida-public/AB6AXuDhFGsmz59X7UlXFCtN56yBwEBCFNjwM1APgTVwxXDQbHMQeApKkb25ZChRyx9JzForckqiPKEndTtglk87vEtG_3oW1BSw4jXspQW25ajQg_QzrpaNOPEFeoefNZUtA-cE_U3sXs4qsDf1xD0YdkwKXmLARpO2HdBmIVua1eWkhlt4JEmnfl0gNvZI5ArRUsx_g6P2yKr97zb7rAZb42u6D1PVMx-nFwSf1erbAFhrA36AuzMXlK9HKUbjYBHvW77-ZO2jxI9f-2Q', // standard moodboard fallback
      dimensions: '2200 x 1400 px',
      tags: ['Uploaded', 'User Concept', 'Inspiration']
    };

    setGallery(prev => [newAsset, ...prev]);

    // Send instant system message in chat logs regarding the uploaded moodboard asset
    const uploadNotice: Message = {
      id: `notice-${Date.now()}`,
      sender: 'system',
      text: `Successfully registered moodboard concept resource: "${fileName}". The file was routed to the development cluster & analysed.`,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    };
    setChatHistory(prev => [...prev, uploadNotice]);
  };

  // Simple local node tag creation helper
  const [newNodeName, setNewNodeName] = useState('');
  const [newNodeDesc, setNewNodeDesc] = useState('');
  const [newNodeCat, setNewNodeCat] = useState<'architectural' | 'concept' | 'study'>('concept');

  const handleCreateNode = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newNodeName.trim()) return;

    const newNode: KnowledgeNode = {
      id: `node-${Date.now()}`,
      name: newNodeName.trim(),
      category: newNodeCat,
      description: newNodeDesc.trim() || 'Custom curated biological hospitality design variable.',
      content: 'No additional extended study references attached yet. Ask the AI Advisor to analyze and auto-generate the biophilic profile.',
      impactScore: Math.floor(Math.random() * 20) + 75,
      resourcesCount: 1,
      relatedConcepts: ['Biophilic Architecture', 'Sensory Materials'],
      imageUrl: 'https://lh3.googleusercontent.com/aida-public/AB6AXuAUF8l1Kc91WLs4kkngTmvPzgm4O539NUQZxIbJ7ylK5sQ39WQTpQbGSVOLwhCaLjf6df4XSei6DQWPuux08cC1nwufChUYGeae9IQjDsca1FYGyk1jh2jVe9c7Z5x9mhaSkdMTfbOS3Nc5Z33NajfLXU8lCCEraO-j8J8uGnDxyQ58t0qutBzxyQ046HHEr_nuqX0LKbwriWD_EfRrNmtS-rAGcd9kcdGGZNykoOmgyc2pVqhgSfT--1b5Gvxz1N7RIEcfK_pdDSk' // default placeholder
    };

    setNodes(prev => [...prev, newNode]);
    setSelectedNode(newNode);
    setNewNodeName('');
    setNewNodeDesc('');
  };

  // Searching filter matching custom nodes, courses, gallery resources
  const filteredNodes = nodes.filter(n => 
    n.name.toLowerCase().includes(searchQuery.toLowerCase()) || 
    n.description.toLowerCase().includes(searchQuery.toLowerCase())
  );

  // Generate historical completion tracking data over a 6-month period for courses in the academy
  const getTrendsData = () => {
    const activeBlueprints = courses.map(c => ({
      id: c.id,
      title: c.title,
      currentProgress: c.progress
    }));

    const months = [
      { name: 'Jan', scale: 0.20 },
      { name: 'Feb', scale: 0.40 },
      { name: 'Mar', scale: 0.60 },
      { name: 'Apr', scale: 0.75 },
      { name: 'May', scale: 0.88 },
      { name: 'Jun', scale: 1.00 }
    ];

    return months.map(m => {
      const dataPoint: any = { month: m.name };
      let totalProg = 0;
      activeBlueprints.forEach(cb => {
        const scaledVal = Math.round(cb.currentProgress * m.scale);
        dataPoint[cb.title] = scaledVal;
        totalProg += scaledVal;
      });
      dataPoint['Cumulative Progress'] = activeBlueprints.length > 0 
        ? Math.round(totalProg / activeBlueprints.length) 
        : 0;
      return dataPoint;
    });
  };

  const trendsData = getTrendsData();

  return (
    <div id="elysora-academy-root" className="w-full min-h-[768px] bg-[#fcfaf5] text-[#1a1a1a] flex font-sans select-none overflow-x-hidden">
      
      {/* 1. SIDEBAR Navigation - Styled strictly in line with the "Artistic Flair" mock */}
      <aside className="w-68 bg-[#1a1a1a] flex flex-col border-r border-[#d4af37]/20 flex-shrink-0 text-white min-h-[100vh]">
        
        {/* Brand header */}
        <div className="p-8 pb-5 text-[#d4af37] border-b border-[#d4af37]/10 flex flex-col items-start">
          <span className="text-2xl tracking-[0.2em] font-serif font-semibold leading-none text-brand-gold">ELYSORA</span>
          <span className="text-[10px] tracking-[0.4em] text-white/50 mt-1 uppercase">ACADEMY</span>
        </div>

        {/* Navigation list */}
        <nav className="flex-1 py-6 px-4 space-y-1">
          {/* Dashboard */}
          <button 
            id="nav-btn-dashboard"
            onClick={() => setActiveTab('dashboard')}
            className={`w-full text-left flex items-center space-x-3 px-4 py-3 rounded-lg transition-all ${
              activeTab === 'dashboard' 
                ? 'bg-[#d4af37]/10 text-[#d4af37] border-l-2 border-[#d4af37] font-medium' 
                : 'text-white/60 hover:text-white hover:bg-white/5'
            }`}
          >
            <Gauge className="w-4 h-4 text-[#d4af37]" />
            <span className="text-sm">Dashboard</span>
          </button>

          {/* Knowledge Graph / Base */}
          <button 
            id="nav-btn-knowledge"
            onClick={() => {
              setActiveTab('knowledge');
              if (nodes.length > 0 && !selectedNode) setSelectedNode(nodes[0]);
            }}
            className={`w-full text-left flex items-center space-x-3 px-4 py-3 rounded-lg transition-all ${
              activeTab === 'knowledge' 
                ? 'bg-[#d4af37]/10 text-[#d4af37] border-l-2 border-[#d4af37] font-medium' 
                : 'text-white/60 hover:text-white hover:bg-white/5'
            }`}
          >
            <Map className="w-4 h-4 text-[#d4af37]" />
            <span className="text-sm">Knowledge Graph</span>
          </button>

          {/* Learning Academy */}
          <button 
            id="nav-btn-academy"
            onClick={() => setActiveTab('academy')}
            className={`w-full text-left flex items-center space-x-3 px-4 py-3 rounded-lg transition-all ${
              activeTab === 'academy' 
                ? 'bg-[#d4af37]/10 text-[#d4af37] border-l-2 border-[#d4af37] font-medium' 
                : 'text-white/60 hover:text-white hover:bg-white/5'
            }`}
          >
            <Award className="w-4 h-4 text-[#d4af37]" />
            <span className="text-sm">Curated Academy</span>
          </button>

          {/* Design Gallery */}
          <button 
            id="nav-btn-gallery"
            onClick={() => setActiveTab('gallery')}
            className={`w-full text-left flex items-center space-x-3 px-4 py-3 rounded-lg transition-all ${
              activeTab === 'gallery' 
                ? 'bg-[#d4af37]/10 text-[#d4af37] border-l-2 border-[#d4af37] font-medium' 
                : 'text-white/60 hover:text-white hover:bg-white/5'
            }`}
          >
            <ImageIcon className="w-4 h-4 text-[#d4af37]" />
            <span className="text-sm">Design Gallery</span>
          </button>

          {/* Hotel Projects */}
          <button 
            id="nav-btn-projects"
            onClick={() => setActiveTab('projects')}
            className={`w-full text-left flex items-center space-x-3 px-4 py-3 rounded-lg transition-all ${
              activeTab === 'projects' 
                ? 'bg-[#d4af37]/10 text-[#d4af37] border-l-2 border-[#d4af37] font-medium' 
                : 'text-white/60 hover:text-white hover:bg-white/5'
            }`}
          >
            <Building className="w-4 h-4 text-[#d4af37]" />
            <span className="text-sm">Hotel Projects</span>
          </button>

          {/* AI Advisor Lab */}
          <button 
            id="nav-btn-advisor"
            onClick={() => setActiveTab('advisor')}
            className={`w-full text-left flex items-center space-x-3 px-4 py-3 rounded-lg transition-all ${
              activeTab === 'advisor' 
                ? 'bg-[#d4af37]/10 text-[#d4af37] border-l-2 border-[#d4af37] font-medium' 
                : 'text-white/60 hover:text-white hover:bg-white/5'
            }`}
          >
            <Bot className="w-4 h-4 text-[#d4af37]" />
            <span className="text-sm">AI Advisor Lab</span>
          </button>

          {/* Future Innovation Lab */}
          <button 
            id="nav-btn-future"
            onClick={() => setActiveTab('future')}
            className={`w-full text-left flex items-center space-x-3 px-4 py-3 rounded-lg transition-all ${
              activeTab === 'future' 
                ? 'bg-[#d4af37]/10 text-[#d4af37] border-l-2 border-[#d4af37] font-medium' 
                : 'text-white/60 hover:text-white hover:bg-white/5'
            }`}
          >
            <Lightbulb className="w-4 h-4 text-[#d4af37]" />
            <span className="text-sm">Future Lab</span>
          </button>
        </nav>

        {/* Sidebar Active Session Status (Artistic Flair Spec) */}
        <div className="p-6 mt-auto">
          <div className="bg-[#064e3b] p-4 rounded-xl border border-[#d4af37]/30">
            <div className="text-[10px] uppercase tracking-widest text-[#d4af37] mb-1">Active AI Broker</div>
            <div className="text-white font-serif text-sm flex items-center gap-1.5 font-medium">
              <Sparkles className="w-3.5 h-3.5 text-[#d4af37] animate-pulse-slow" />
              Gemini 2.5 Flash
            </div>
            <div className="mt-2 h-1 bg-white/10 rounded-full overflow-hidden">
              <div className="h-full bg-[#d4af37] w-4/5"></div>
            </div>
          </div>
        </div>
      </aside>

      {/* 2. MAIN WORKSPACE CONTAINER */}
      <main id="workspace" className="flex-1 flex flex-col min-w-0 max-w-7xl mx-auto">
        
        {/* HEADER BAR (Artistic Flair spec: Height 20, white background, user capsule EA) */}
        <header className="h-20 border-b border-[#1a1a1a]/5 px-8 flex items-center justify-between bg-white/50 backdrop-blur-md sticky top-0 z-40">
          <div className="flex items-center flex-1 max-w-md">
            <Search className="w-4 h-4 text-black/30" />
            <input 
              id="search-input"
              type="text" 
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search Knowledge Graph and Courses..." 
              className="ml-3 bg-transparent outline-none w-full text-sm placeholder:text-black/30 decoration-none"
            />
            {searchQuery && (
              <button onClick={() => setSearchQuery('')} className="text-xs text-black/40 hover:text-black hover:underline ml-2">Clear</button>
            )}
          </div>
          <div className="flex items-center space-x-6 text-sm font-medium">
            <span className="text-[#064e3b] italic font-serif text-lg hidden sm:inline">Villas & Spa Project</span>
            <div className="flex items-center gap-2">
              <span className="text-xs text-black/60 font-medium">Director Workspace</span>
              <div id="user-badge" className="w-10 h-10 rounded-full bg-[#d4af37] flex items-center justify-center text-[#1a1a1a] font-serif shadow-lg font-bold border border-[#d4af37]">
                EA
              </div>
            </div>
          </div>
        </header>

        {/* 3. CORE SUB-VIEWS */}
        <div className="flex-1 p-8 space-y-8">
          
          {/* VIEW TITLE & REAL-TIME DIGITAL CLOCK */}
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-end gap-3 border-b border-[#1a1a1a]/5 pb-6">
            <div>
              <h1 className="text-4xl sm:text-5xl font-serif leading-none text-[#1a1a1a]">
                Welcome, <span className="italic">Director</span>
              </h1>
              <p className="text-xs tracking-wide text-black/50 mt-2 font-mono uppercase">HOTEL ELYSORA ACADEMY KNOWLEDGE CORE</p>
            </div>
            <div className="text-left sm:text-right">
              <div className="text-[10px] tracking-widest uppercase opacity-40 font-mono">Elysora Local Time</div>
              <div id="dynamic-clock" className="text-xl font-light tracking-tighter text-[#1a1a1a] font-mono">
                {currentTime || '04:27 PM — 24°C'}
              </div>
            </div>
          </div>

          {/* VIEW A: DASHBOARD PORTAL */}
          {activeTab === 'dashboard' && (
            <div className="space-y-8 animate-fade-in">
              
              {/* Top Bento Metrics */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                
                {/* Metric A1 - Active Development Areas */}
                <div 
                  id="metric-card-projects"
                  onClick={() => setActiveTab('projects')}
                  className="bg-white border border-[#1a1a1a]/5 rounded-3xl p-6 shadow-sm flex flex-col justify-between hover:border-[#d4af37]/50 transition-all cursor-pointer group"
                >
                  <div className="w-12 h-12 bg-[#064e3b]/5 rounded-full flex items-center justify-center text-[#064e3b] group-hover:scale-105 transition-transform">
                    <Building className="w-5 h-5" />
                  </div>
                  <div className="space-y-1 mt-6">
                    <div className="text-3xl font-serif text-[#1a1a1a]">{projects.length} Active Hotspots</div>
                    <div className="text-xs uppercase tracking-widest opacity-40 font-mono">Villas, Spas & Gardens</div>
                  </div>
                </div>

                {/* Metric A2 - Course Masterclasses Completed */}
                <div 
                  id="metric-card-academy"
                  onClick={() => setActiveTab('academy')}
                  className="bg-white border border-[#1a1a1a]/5 rounded-3xl p-6 shadow-sm flex flex-col justify-between hover:border-[#d4af37]/50 transition-all cursor-pointer group"
                >
                  <div className="w-12 h-12 bg-[#d4af37]/10 rounded-full flex items-center justify-center text-[#d4af37] group-hover:scale-105 transition-transform">
                    <Award className="w-5 h-5" />
                  </div>
                  <div className="space-y-1 mt-6">
                    <div className="text-3xl font-serif text-[#1a1a1a]">84% Completed</div>
                    <div className="text-xs uppercase tracking-widest opacity-40 font-mono">Strategic Development Plan</div>
                  </div>
                </div>

                {/* Metric A3 - AI Action Insights (Dark Forest Aesthetic) */}
                <div 
                  id="metric-card-insight"
                  onClick={() => setActiveTab('advisor')}
                  className="bg-[#1a1a1a] rounded-3xl p-6 shadow-xl flex flex-col justify-between text-white hover:border-[#d4af37]/40 border border-transparent transition-all cursor-pointer group"
                >
                  <div className="w-10 h-10 border border-white/20 rounded-full flex items-center justify-center">
                    <div className="w-2.5 h-2.5 bg-[#d4af37] rounded-full animate-pulse"></div>
                  </div>
                  <div className="space-y-2 mt-6">
                    <div className="text-xs uppercase tracking-widest text-[#d4af37] font-mono flex items-center gap-1.5">
                      <Sparkles className="w-3.5 h-3.5" />
                      Advisor Recommendation
                    </div>
                    <div className="text-xs opacity-90 leading-relaxed font-sans">
                      Dolomite stone retains hydration cold circuits 14% longer than synthetic slate. Let's design!
                    </div>
                  </div>
                </div>

              </div>

              {/* Dynamic Modules Row */}
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
                
                {/* Left Section - Quick Learning Pathway */}
                <div className="lg:col-span-8 space-y-6">
                  
                  {/* Current Active Course Banner (High End Green Theme) */}
                  <div className="bg-[#064e3b] text-white rounded-3xl p-8 relative overflow-hidden flex flex-col justify-between min-h-[220px]">
                    <div className="absolute top-0 right-0 p-8 opacity-10">
                      <Award className="w-48 h-48" />
                    </div>
                    <div className="relative z-10">
                      <div className="text-xs uppercase tracking-widest text-[#d4af37] font-mono mb-2">Primary Curriculum</div>
                      <h3 className="font-serif text-2xl sm:text-3xl max-w-xl font-semibold leading-snug">
                        {selectedCourse.title}
                      </h3>
                      <p className="text-white/70 text-xs mt-2 max-w-lg font-sans">
                        Instructor: {selectedCourse.instructor} • Level: {selectedCourse.level}
                      </p>
                    </div>

                    <div className="mt-6 space-y-3 relative z-10">
                      <div className="flex justify-between items-center text-xs text-white/80">
                        <span>Curriculum Progress</span>
                        <span className="font-mono">{selectedCourse.progress}%</span>
                      </div>
                      <div className="h-1.5 bg-white/20 rounded-full overflow-hidden">
                        <div className="h-full bg-[#d4af37]" style={{ width: `${selectedCourse.progress}%` }}></div>
                      </div>
                      <div className="pt-2 flex justify-end">
                        <button 
                          onClick={() => setActiveTab('academy')}
                          className="px-5 py-2.5 bg-[#d4af37] text-[#1a1a1a] rounded-lg text-xs font-bold uppercase tracking-widest hover:bg-white hover:text-black transition-all flex items-center gap-1.5"
                        >
                          Access Modules <ChevronRight className="w-3.5 h-3.5" />
                        </button>
                      </div>
                    </div>
                  </div>

                  {/* Academy Completion Trends Recharts Line Chart */}
                  <div id="academy-trends-card" className="bg-white rounded-3xl p-6 border border-[#1a1a1a]/5 shadow-sm space-y-6">
                    <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
                      <div>
                        <h3 className="font-serif text-xl italic text-[#1a1a1a] flex items-center gap-2">
                          <TrendingUp className="w-4.5 h-4.5 text-[#d4af37]" />
                          Academy Completion Trends
                        </h3>
                        <p className="text-xs text-black/50 mt-1">
                          Consolidated curricula learning curves and masterclass progressions over the last 6 months.
                        </p>
                      </div>
                      <div className="flex gap-4 text-[10px] font-mono">
                        <div className="flex items-center gap-1.5">
                          <span className="w-2.5 h-2.5 rounded-full bg-[#064e3b]" />
                          <span className="text-black/60">Biophilic</span>
                        </div>
                        <div className="flex items-center gap-1.5">
                          <span className="w-2.5 h-2.5 rounded-full bg-[#b45309]" />
                          <span className="text-black/60">Omotenashi</span>
                        </div>
                        <div className="flex items-center gap-1.5">
                          <span className="w-2.5 h-2.5 rounded bg-black border-dashed border border-[#d4af37]" />
                          <span className="text-black/60">Cumulative</span>
                        </div>
                      </div>
                    </div>

                    <div className="h-64 w-full">
                      <ResponsiveContainer width="100%" height="100%">
                        <LineChart data={trendsData} margin={{ top: 10, right: 15, left: -25, bottom: 0 }}>
                          <CartesianGrid stroke="#1a1a1a" strokeOpacity={0.04} strokeDasharray="3 3" />
                          <XAxis 
                            dataKey="month" 
                            stroke="#1a1a1a" 
                            strokeOpacity={0.4}
                            fontSize={11}
                            fontFamily="monospace"
                            tickLine={false}
                            dy={10}
                          />
                          <YAxis 
                            stroke="#1a1a1a" 
                            strokeOpacity={0.4}
                            fontSize={11}
                            fontFamily="monospace"
                            tickLine={false}
                            domain={[0, 100]}
                            tickFormatter={(v) => `${v}%`}
                          />
                          <Tooltip content={<CustomTooltip />} />
                          {courses.map((c, index) => (
                            <Line
                              key={c.id}
                              type="monotone"
                              name={c.title}
                              dataKey={c.title}
                              stroke={index === 0 ? "#064e3b" : "#b45309"}
                              strokeWidth={2}
                              dot={{ r: 3, strokeWidth: 1, fill: index === 0 ? "#064e3b" : "#b45309" }}
                              activeDot={{ r: 5 }}
                            />
                          ))}
                          <Line
                            type="monotone"
                            name="Cumulative Progress"
                            dataKey="Cumulative Progress"
                            stroke="#1a1a1a"
                            strokeWidth={2.5}
                            strokeDasharray="4 4"
                            dot={{ r: 4, strokeWidth: 2, fill: "#d4af37", stroke: "#1a1a1a" }}
                            activeDot={{ r: 6 }}
                          />
                        </LineChart>
                      </ResponsiveContainer>
                    </div>
                  </div>

                  {/* Connected Knowledge Preview Graph Mock */}
                  <div className="bg-white rounded-3xl p-6 border border-[#1a1a1a]/5 shadow-sm">
                    <div className="flex justify-between items-center mb-6">
                      <div>
                        <h3 className="font-serif text-xl italic text-brand-dark">Interactive Knowledge Preview</h3>
                        <p className="text-xs text-black/50">Visualize biological design correlations in real-time click pathways.</p>
                      </div>
                      <button 
                        onClick={() => setActiveTab('knowledge')}
                        className="text-xs text-[#064e3b] font-medium hover:underline flex items-center gap-1"
                      >
                        Launch Graph View <ArrowRight className="w-3.5 h-3.5" />
                      </button>
                    </div>

                    <div className="h-44 bg-[#fcfaf5]/50 border border-black/5 rounded-2xl flex flex-col justify-center items-center relative overflow-hidden">
                      {/* Interactive concept bubble simulation */}
                      <div className="absolute top-6 left-12 p-2.5 bg-[#1a1a1a] text-white rounded-xl text-xs font-serif shadow-md border border-[#d4af37]/20">
                        Spa Materials
                      </div>
                      <div className="absolute bottom-6 right-12 p-2.5 bg-[#d4af37]/20 border border-[#d4af37]/40 text-black rounded-xl text-xs font-serif shadow-md">
                        Thermal Dynamics
                      </div>
                      <div className="absolute top-1/2 left-1/3 p-3 bg-[#064e3b] text-white rounded-xl text-xs font-serif shadow-md animate-pulse">
                        Biophilic Contours
                      </div>
                      {/* Connection lines using SVG */}
                      <svg className="absolute inset-0 w-full h-full pointer-events-none opacity-20" xmlns="http://www.w3.org/2000/svg">
                        <line x1="80" y1="35" x2="160" y2="110" stroke="black" strokeWidth="1" strokeDasharray="3,3" />
                        <line x1="160" y1="110" x2="300" y2="140" stroke="black" strokeWidth="1" strokeDasharray="3,3" />
                        <line x1="80" y1="35" x2="300" y2="140" stroke="black" strokeWidth="1" />
                      </svg>
                      <span className="text-[11px] text-black/30 font-mono tracking-widest uppercase relative z-10 p-2 bg-white/80 rounded-full border border-black/5">4 Active Topological Nodes linked</span>
                    </div>
                  </div>

                </div>

                {/* Right Side - News Activity Feed & Direct Advisor Prompts */}
                <div className="lg:col-span-4 space-y-6">
                  
                  {/* Curated Pre-Compiled Action Recommendations */}
                  <div className="bg-white rounded-3xl p-6 border border-[#1a1a1a]/5 shadow-sm space-y-4">
                    <h4 className="text-[10px] tracking-widest uppercase text-black/40 font-mono font-bold">Preset Enquiries</h4>
                    <div className="space-y-2.5 text-xs">
                      
                      <button 
                        onClick={() => {
                          setActiveTab('advisor');
                          applyPresetPrompt("Contrast the biophilic footprint of Zen Minimalist design with rustic materials.");
                        }}
                        className="w-full text-left p-3 rounded-xl bg-[#fcfaf5] border border-black/5 hover:border-[#d4af37] hover:bg-white transition-all group flex justify-between items-center"
                      >
                        <span className="text-[#1a1a1a] font-medium group-hover:text-[#064e3b]">Compare Spa layouts</span>
                        <ChevronRight className="w-3.5 h-3.5 text-black/30 group-hover:text-black" />
                      </button>

                      <button 
                        onClick={() => {
                          setActiveTab('advisor');
                          applyPresetPrompt("Simulate the thermal properties of thermal saunas built inside natural dolomite excavation zones.");
                        }}
                        className="w-full text-left p-3 rounded-xl bg-[#fcfaf5] border border-black/5 hover:border-[#d4af37] hover:bg-white transition-all group flex justify-between items-center"
                      >
                        <span className="text-[#1a1a1a] font-medium group-hover:text-[#064e3b]">Dolomite Thermal analytics</span>
                        <ChevronRight className="w-3.5 h-3.5 text-black/30 group-hover:text-black" />
                      </button>

                      <button 
                        onClick={() => {
                          setActiveTab('advisor');
                          applyPresetPrompt("How can we implement Omotenashi anticipatory services into our Botanical Gardens smart lighting circuits?");
                        }}
                        className="w-full text-left p-3 rounded-xl bg-[#fcfaf5] border border-black/5 hover:border-[#d4af37] hover:bg-white transition-all group flex justify-between items-center"
                      >
                        <span className="text-[#1a1a1a] font-medium group-hover:text-[#064e3b]">Botanical smart sensors index</span>
                        <ChevronRight className="w-3.5 h-3.5 text-black/30 group-hover:text-black" />
                      </button>

                    </div>
                  </div>

                  {/* Recent Activity Log Panel (Artistic Flair specification layout) */}
                  <div className="bg-white rounded-3xl p-6 border border-[#1a1a1a]/5 shadow-sm space-y-4">
                    <h4 className="text-[10px] tracking-widest uppercase text-black/40 font-mono font-bold">System Log & Updates</h4>
                    
                    <div className="space-y-3.5">
                      <div className="flex items-start space-x-3">
                        <div className="w-2 h-2 rounded-full bg-[#064e3b] mt-1.5 flex-shrink-0 animate-pulse"></div>
                        <p className="text-[11px] leading-relaxed text-black/70">
                          <span className="font-bold text-black">AI Curation</span> analyzed the layout variables for <strong>Garden Villa B</strong> and suggested passive wind-tunnel orientation.
                        </p>
                      </div>

                      <div className="flex items-start space-x-3">
                        <div className="w-2 h-2 rounded-full bg-[#d4af37] mt-1.5 flex-shrink-0"></div>
                        <p className="text-[11px] leading-relaxed text-black/70">
                          <span className="font-bold text-black">Director</span> uploaded <strong>Zen Spa Floor Plan</strong> to the architectural asset database.
                        </p>
                      </div>

                      <div className="flex items-start space-x-3">
                        <div className="w-2 h-2 rounded-full bg-[#1a1a1a]/30 mt-1.5 flex-shrink-0"></div>
                        <p className="text-[11px] leading-relaxed text-black/70">
                          Curator approved lesson: <strong>Introduction to Natural Silhouettes</strong> quiz completions.
                        </p>
                      </div>
                    </div>
                  </div>

                </div>

              </div>

            </div>
          )}

          {/* VIEW B: KNOWLEDGE NODE MANAGER & 2-D GRAPH */}
          {activeTab === 'knowledge' && (
            <div className="space-y-8 animate-fade-in">
              <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
                <div>
                  <h2 className="text-3xl font-serif text-brand-dark">Biophilic Knowledge Graph</h2>
                  <p className="text-sm text-black/50">Construct, refine, and connect high-end hospitality rules.</p>
                </div>
                
                {/* Search / Filter status */}
                <div className="bg-white border border-[#1a1a1a]/5 px-4 py-2 rounded-xl text-xs font-mono text-black/60 flex items-center gap-2">
                  <Filter className="w-3.5 h-3.5 text-[#d4af37]" />
                  <span>Showing {filteredNodes.length} mapped variables</span>
                </div>
              </div>

              {/* Graphic Layout Grid */}
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
                
                {/* Visual SVG Core Connector Map - Left */}
                <div className="lg:col-span-8 bg-white border border-[#1a1a1a]/5 rounded-3xl p-6 shadow-sm flex flex-col justify-between min-h-[460px]">
                  <div className="flex justify-between items-center border-b border-black/5 pb-4">
                    <span className="text-xs uppercase font-mono tracking-wider opacity-50">Topological Grid Canvas</span>
                    <span className="text-[10px] bg-[#064e3b]/10 text-[#064e3b] px-2.5 py-1 rounded-full font-bold">2D INTERACTIVE MODEL</span>
                  </div>

                  {/* SVG Canvas Map */}
                  <div className="flex-1 min-h-[300px] relative bg-[#fcfaf5]/40 rounded-2xl overflow-hidden flex items-center justify-center my-4 border border-black/5">
                    
                    {/* SVG Connections drawing dynamically */}
                    <svg className="absolute inset-0 w-full h-full" xmlns="http://www.w3.org/2000/svg">
                      {GRAPH_CONNECTIONS.map((c, i) => {
                        const sNode = nodes.find(n => n.id === c.source);
                        const tNode = nodes.find(n => n.id === c.target);
                        if (!sNode || !tNode) return null;
                        
                        // Assigning deterministic coordinate offsets to represent a clean map
                        const coords: Record<string, {x: number, y: number}> = {
                          'spa-arch': { x: 50, y: 35 },
                          'thermal-dynamics': { x: 25, y: 70 },
                          'sensory-mats': { x: 75, y: 70 },
                          'acoustic-seclusion': { x: 50, y: 80 }
                        };

                        const sCoord = coords[sNode.id] || { x: 50, y: 50 };
                        const tCoord = coords[tNode.id] || { x: 50, y: 50 };

                        return (
                          <g key={i}>
                            <line 
                              x1={`${sCoord.x}%`} 
                              y1={`${sCoord.y}%`} 
                              x2={`${tCoord.x}%`} 
                              y2={`${tCoord.y}%`} 
                              stroke={selectedNode?.id === sNode.id || selectedNode?.id === tNode.id ? "#d4af37" : "#1a1a1a"} 
                              strokeWidth={selectedNode?.id === sNode.id || selectedNode?.id === tNode.id ? "2.5" : "1"} 
                              className="transition-all duration-300"
                            />
                            {/* Display link type tag */}
                            <text 
                              x={`${(sCoord.x + tCoord.x) / 2}%`} 
                              y={`${(sCoord.y + tCoord.y) / 2 - 2}%`} 
                              fill="#1a1a1a" 
                              fontSize="8" 
                              fontFamily="monospace"
                              textAnchor="middle" 
                              className="opacity-70 fill-black bg-white"
                            >
                              {c.type}
                            </text>
                          </g>
                        );
                      })}
                    </svg>

                    {/* Nodes Rendered As Floating Interactive Buttons */}
                    {nodes.map(node => {
                      const coords: Record<string, {x: string, y: string}> = {
                        'spa-arch': { x: 'left-[40%]', y: 'top-[15%]' },
                        'thermal-dynamics': { x: 'left-[15%]', y: 'top-[60%]' },
                        'sensory-mats': { x: 'left-[65%]', y: 'top-[60%]' },
                        'acoustic-seclusion': { x: 'left-[40%]', y: 'top-[80%]' }
                      };

                      const currentCoord = coords[node.id] || { x: 'left-[50%]', y: 'top-[45%]' };
                      const isSelected = selectedNode?.id === node.id;

                      return (
                        <button
                          key={node.id}
                          onClick={() => setSelectedNode(node)}
                          className={`absolute ${currentCoord.x} ${currentCoord.y} transform -translate-x-1/2 -translate-y-1/2 p-3 rounded-2xl shadow-md border transition-all flex flex-col items-center gap-1 cursor-pointer z-10 ${
                            isSelected 
                              ? 'bg-[#1a1a1a] text-white border-[#d4af37] scale-110 ring-2 ring-[#d4af37]/20' 
                              : 'bg-white text-black border-black/5 hover:border-[#d4af37]/60'
                          }`}
                        >
                          <span className={`text-[10px] uppercase tracking-widest font-mono font-bold ${isSelected ? 'text-[#d4af37]' : 'text-black/40'}`}>
                            {node.category}
                          </span>
                          <span className="text-xs font-serif font-medium">{node.name}</span>
                          <span className="text-[9px] font-mono opacity-80">Impact: {node.impactScore}</span>
                        </button>
                      );
                    })}

                    <span className="absolute bottom-4 left-4 text-[9px] text-black/40 font-mono tracking-tight bg-white/60 p-2 rounded-xl border border-black/5">
                      ✓ Hover/Click Node to filter resource guidelines
                    </span>
                  </div>

                  {/* Add New Custom Taxonomy Form */}
                  <form onSubmit={handleCreateNode} className="border-t border-black/5 pt-4 space-y-3">
                    <div className="text-xs uppercase font-mono tracking-widest text-[#d4af37] font-semibold">Propose New Concept Node</div>
                    <div className="grid grid-cols-1 md:grid-cols-12 gap-3">
                      <div className="md:col-span-4">
                        <input 
                          type="text" 
                          placeholder="Concept name (e.g., Solar Glazing)" 
                          value={newNodeName}
                          onChange={(e) => setNewNodeName(e.target.value)}
                          className="w-full text-xs p-3.5 bg-[#fcfaf5] border border-black/5 rounded-xl outline-none"
                        />
                      </div>
                      <div className="md:col-span-4">
                        <input 
                          type="text" 
                          placeholder="Brief description criteria" 
                          value={newNodeDesc}
                          onChange={(e) => setNewNodeDesc(e.target.value)}
                          className="w-full text-xs p-3.5 bg-[#fcfaf5] border border-black/5 rounded-xl outline-none"
                        />
                      </div>
                      <div className="md:col-span-2">
                        <select 
                          value={newNodeCat}
                          onChange={(e: any) => setNewNodeCat(e.target.value)}
                          className="w-full text-xs p-3.5 bg-[#fcfaf5] border border-black/5 rounded-xl outline-none"
                        >
                          <option value="concept">Concept</option>
                          <option value="architectural">Architectural</option>
                          <option value="study">Study</option>
                        </select>
                      </div>
                      <div className="md:col-span-2">
                        <button 
                          type="submit"
                          className="w-full h-full bg-[#064e3b] text-[#fcfaf5] text-xs font-bold uppercase tracking-widest rounded-xl hover:bg-[#d4af37] hover:text-[#1a1a1a] transition-all"
                        >
                          Inject Node
                        </button>
                      </div>
                    </div>
                  </form>
                </div>

                {/* Information Node Detail Drawer & Presets - Right */}
                <div className="lg:col-span-4 space-y-6">
                  {selectedNode ? (
                    <div className="bg-white border border-[#1a1a1a]/5 rounded-3xl p-6 shadow-sm space-y-6">
                      <div className="flex justify-between items-center border-b border-black/5 pb-4">
                        <span className="text-[10px] tracking-widest uppercase font-mono bg-[#d4af37]/15 text-[#1a1a1a] px-3 py-1 rounded-full font-bold">
                          {selectedNode.category}
                        </span>
                        <div className="text-right">
                          <div className="text-[9px] uppercase font-mono opacity-40">Impact Metrics</div>
                          <div className="text-xl font-serif text-[#064e3b] font-bold">{selectedNode.impactScore}/100</div>
                        </div>
                      </div>

                      <div className="space-y-3">
                        <h3 className="font-serif text-2xl text-brand-dark">{selectedNode.name}</h3>
                        <p className="text-xs text-black/55 leading-relaxed font-sans">{selectedNode.description}</p>
                      </div>

                      {selectedNode.imageUrl && (
                        <div className="h-36 rounded-2xl overflow-hidden border border-black/5">
                          <img 
                            src={selectedNode.imageUrl} 
                            alt={selectedNode.name} 
                            referrerPolicy="no-referrer"
                            className="w-full h-full object-cover" 
                          />
                        </div>
                      )}

                      <div className="space-y-3 bg-[#fcfaf5] p-4 rounded-2xl border border-black/5">
                        <h4 className="text-xs uppercase tracking-widest text-[#d4af37] font-mono font-bold">Concept Principles</h4>
                        <p className="text-[11px] text-[#1a1a1a] leading-relaxed font-serif italic">"{selectedNode.content}"</p>
                      </div>

                      <div className="space-y-2.5">
                        <div className="text-[10px] uppercase font-mono tracking-wider text-black/40">Associated Taxonomy Tags</div>
                        <div className="flex flex-wrap gap-1.5">
                          {selectedNode.relatedConcepts.map((tag, i) => (
                            <span key={i} className="px-2.5 py-1 bg-black/5 rounded-full text-[10px] border border-black/5">
                              {tag}
                            </span>
                          ))}
                        </div>
                      </div>

                      <div className="pt-2">
                        <button 
                          onClick={() => {
                            setActiveTab('advisor');
                            applyPresetPrompt(`Detail the architectural construction parameters regarding our knowledge component: "${selectedNode.name}" and provide the chemical or structural specifications needed.`);
                          }}
                          className="w-full py-3 bg-[#1a1a1a] text-[#d4af37] rounded-xl text-xs font-bold uppercase tracking-widest hover:bg-[#d4af37] hover:text-[#1a1a1a] transition-all flex items-center justify-center gap-2"
                        >
                          <Bot className="w-4 h-4" />
                          Consult Advisor on Node
                        </button>
                      </div>
                    </div>
                  ) : (
                    <div className="bg-white border border-[#1a1a1a]/5 rounded-3xl p-6 shadow-sm text-center py-16 text-black/40">
                      <HelpCircle className="w-12 h-12 mx-auto stroke-1 text-[#d4af37] mb-3" />
                      <p className="text-sm">Select any topological node inside the left graph quadrant to load active design guidelines.</p>
                    </div>
                  )}
                </div>

              </div>
            </div>
          )}

          {/* VIEW C: LEARNING ACADEMY (with dynamic quizzes) */}
          {activeTab === 'academy' && (
            <div className="space-y-8 animate-fade-in">
              <div className="border-b border-black/5 pb-4">
                <h2 className="text-3xl font-serif text-brand-dark">Curated Learning Academy</h2>
                <p className="text-sm text-black/50">High-end design courses, masterclass blueprints, and instant AI quizzes.</p>
              </div>

              {/* Course Catalog Grid */}
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
                
                {/* Available Courses list - Left */}
                <div className="lg:col-span-4 space-y-4">
                  <div className="text-xs uppercase font-mono tracking-widest text-[#d4af37] font-semibold mb-2">Available Masterclasses</div>
                  
                  {courses.map(course => {
                    const isSelected = selectedCourse.id === course.id;
                    return (
                      <div 
                        key={course.id}
                        onClick={() => {
                          setSelectedCourse(course);
                          setActiveLesson(course.lessons[0]);
                          setQuizAnswer(null);
                          setQuizSubmitted(false);
                        }}
                        className={`p-5 rounded-2xl border transition-all cursor-pointer flex flex-col justify-between ${
                          isSelected 
                            ? 'bg-white border-[#d4af37] shadow-md' 
                            : 'bg-white/50 border-black/5 hover:border-black/20 hover:bg-white'
                        }`}
                      >
                        <div className="space-y-2">
                          <div className="flex justify-between items-center text-[10px] font-mono text-black/40">
                            <span>{course.category}</span>
                            <span className="px-2 py-0.5 bg-black/5 rounded-full font-bold">{course.level}</span>
                          </div>
                          <h3 className="font-serif text-lg leading-snug group-hover:text-[#064e3b]">
                            {course.title}
                          </h3>
                        </div>

                        {/* Progress and indicators */}
                        <div className="mt-8 space-y-2">
                          <div className="flex justify-between items-center text-[11px] font-mono text-black/60">
                            <span>Completeness</span>
                            <span>{course.progress}%</span>
                          </div>
                          <div className="h-1 bg-black/5 rounded-full overflow-hidden">
                            <div className="h-full bg-[#064e3b]" style={{ width: `${course.progress}%` }}></div>
                          </div>
                          <div className="text-[10px] text-black/40 pt-2 flex justify-between">
                            <span>Instructor: {course.instructor}</span>
                            <span>{course.duration}</span>
                          </div>
                        </div>
                      </div>
                    );
                  })}
                </div>

                {/* Active Course Classroom Pane - Right */}
                <div className="lg:col-span-8 bg-white border border-[#1a1a1a]/5 rounded-3xl p-8 shadow-sm space-y-6">
                  
                  {/* Lesson Selector Tab Header */}
                  <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center border-b border-black/5 pb-4 gap-4">
                    <div>
                      <span className="text-[10px] tracking-widest font-mono text-black/40 uppercase">Interactive Course Reader</span>
                      <h3 className="font-serif text-2xl text-brand-dark">{selectedCourse.title}</h3>
                    </div>
                    
                    {/* Lesson toggle select list */}
                    <div className="flex gap-1 bg-[#fcfaf5] p-1 rounded-xl border border-black/5">
                      {selectedCourse.lessons.map((lesson, index) => {
                        const isActive = activeLesson.id === lesson.id;
                        return (
                          <button
                            key={lesson.id}
                            onClick={() => {
                              setActiveLesson(lesson);
                              setQuizAnswer(null);
                              setQuizSubmitted(false);
                            }}
                            className={`px-3 py-1.5 rounded-lg text-xs font-serif transition-all ${
                              isActive 
                                ? 'bg-[#1a1a1a] text-[#d4af37] font-medium shadow-sm' 
                                : 'text-black/50 hover:text-black'
                            }`}
                          >
                            Module {index + 1}
                          </button>
                        );
                      })}
                    </div>
                  </div>

                  {/* Lesson Core Text */}
                  <div className="space-y-4">
                    <div className="flex items-center space-x-2 text-xs font-mono text-black/55">
                      <Clock className="w-3.5 h-3.5 text-[#d4af37]" />
                      <span>Duration: {activeLesson.duration}</span>
                      <span>•</span>
                      <span className="text-[#064e3b] font-bold">Curated learning curriculum</span>
                    </div>

                    <h4 className="text-xl font-serif leading-none italic">{activeLesson.title}</h4>
                    <p className="text-sm font-sans text-brand-dark leading-relaxed font-light whitespace-pre-line bg-[#fcfaf5] p-6 rounded-2xl border border-black/5">
                      {activeLesson.content}
                    </p>
                  </div>

                  {/* Active AI Quiz Interactive Widget */}
                  {activeLesson.quiz && (
                    <div className="border-t border-black/5 pt-6 space-y-4">
                      
                      <div className="flex items-center space-x-2 bg-[#d4af37]/10 px-4 py-2 rounded-xl border border-[#d4af37]/20">
                        <Sparkles className="w-4 h-4 text-[#d4af37] animate-pulse" />
                        <span className="text-xs font-serif font-semibold text-[#1a1a1a]">Immediate AI Quiz Challenge</span>
                      </div>

                      <div className="bg-[#fcfaf5] border border-black/5 p-6 rounded-2xl space-y-4">
                        <p className="text-sm font-serif font-medium leading-relaxed">{activeLesson.quiz.question}</p>
                        
                        <div className="space-y-2">
                          {activeLesson.quiz.options.map((option, idx) => {
                            const isSelected = quizAnswer === idx;
                            return (
                              <button
                                key={idx}
                                disabled={quizSubmitted}
                                onClick={() => handleQuizAnswer(idx)}
                                className={`w-full text-left p-4 rounded-xl text-xs flex justify-between items-center border transition-all ${
                                  isSelected 
                                    ? 'bg-[#1a1a1a] text-white border-black ring-2 ring-[#d4af37]/20 font-medium' 
                                    : 'bg-white border-black/5 hover:bg-black/[0.02] hover:border-black/10'
                                }`}
                              >
                                <span>{option}</span>
                                <div className={`w-4 h-4 rounded-full border flex items-center justify-center ${isSelected ? 'border-[#d4af37] bg-[#d4af37]' : 'border-black/20'}`}>
                                  {isSelected && <div className="w-1.5 h-1.5 bg-black rounded-full" />}
                                </div>
                              </button>
                            );
                          })}
                        </div>

                        {quizAnswer !== null && !quizSubmitted && (
                          <div className="flex justify-end pt-2">
                            <button 
                              onClick={submitQuiz}
                              className="px-6 py-2.5 bg-[#064e3b] text-white rounded-lg text-xs font-bold uppercase tracking-widest hover:bg-[#1a1a1a] transition-all"
                            >
                              Submit Verification
                            </button>
                          </div>
                        )}

                        {/* Quiz result screen */}
                        {quizSubmitted && (
                          <div className={`p-4 rounded-xl border space-y-2 animate-fade-in ${
                            quizAnswer === activeLesson.quiz.correctAnswer 
                              ? 'bg-[#064e3b]/5 border-[#064e3b]/30 text-[#064e3b]' 
                              : 'bg-red-50 border-red-200 text-red-700'
                          }`}>
                            <div className="font-bold flex items-center gap-1.5 text-xs font-serif">
                              {quizAnswer === activeLesson.quiz.correctAnswer ? (
                                <>
                                  <CheckCircle2 className="w-4 h-4 text-[#064e3b] animate-bounce" />
                                  ✓ Concept Perfectly Masters!
                                </>
                              ) : (
                                <>
                                  <AlertCircle className="w-4 h-4 text-red-600" />
                                  ✗ Analysis Divergence
                                </>
                              )}
                            </div>
                            <p className="text-xs">{activeLesson.quiz.explanation}</p>
                            
                            <div className="pt-2 flex justify-end gap-2 text-xs font-sans">
                              <button 
                                onClick={() => {
                                  setQuizAnswer(null);
                                  setQuizSubmitted(false);
                                }}
                                className="px-3.5 py-1.5 text-black border border-black/5 bg-white hover:bg-[#fcfaf5] rounded font-medium"
                              >
                                Retry Quiz
                              </button>
                              
                              {selectedCourse.lessons.findIndex(l => l.id === activeLesson.id) < selectedCourse.lessons.length - 1 && (
                                <button 
                                  onClick={nextLesson}
                                  className="px-3.5 py-1.5 bg-[#d4af37] text-black font-bold uppercase tracking-wider rounded text-[10px]"
                                >
                                  Next Module
                                </button>
                              )}
                            </div>
                          </div>
                        )}

                      </div>

                    </div>
                  )}

                  {/* Dynamic Certificate Progress Footer */}
                  <div className="border-t border-black/5 pt-6 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 text-xs">
                    <div className="flex items-center space-x-2 text-black/50">
                      <Award className="w-4.5 h-4.5 text-[#d4af37]" />
                      <span>Earn 100% to generate professional Hotel Elysora Academy Credentials.</span>
                    </div>
                    {selectedCourse.progress === 100 && (
                      <div className="bg-[#064e3b] text-white px-3 py-1.5 rounded font-serif italic flex items-center gap-1">
                        🏆 Credentials unlocked!
                      </div>
                    )}
                  </div>

                </div>

              </div>
            </div>
          )}

          {/* VIEW D: DESIGN GALLERY & MOODBOARD UPLOADS */}
          {activeTab === 'gallery' && (
            <div className="space-y-8 animate-fade-in">
              <div className="border-b border-black/5 pb-4">
                <h2 className="text-3xl font-serif text-brand-dark">Topological Design Gallery</h2>
                <p className="text-sm text-black/50">Luxury architectural blueprints, material lists, and tactile moodboard inspirations.</p>
              </div>

              {/* Upload Drop Zone Simulators */}
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
                
                {/* File Drop & Control side - Left */}
                <div className="lg:col-span-4 space-y-6">
                  
                  {/* Drag and Drop Zone */}
                  <div 
                    onDragOver={handleDragOver}
                    onDragLeave={handleDragLeave}
                    onDrop={handleDrop}
                    className={`border-2 border-dashed rounded-3xl p-8 py-12 text-center transition-all cursor-pointer flex flex-col justify-center items-center ${
                      isDragging 
                        ? 'border-[#d4af37] bg-[#d4af37]/5 scale-[0.98]' 
                        : 'border-[#1a1a1a]/15 bg-white hover:border-[#d4af37]/60'
                    }`}
                    onClick={() => fileInputRef.current?.click()}
                  >
                    <input 
                      type="file" 
                      ref={fileInputRef}
                      onChange={handleFileSelect}
                      className="hidden" 
                      accept=".png,.jpg,.jpeg,.pdf,.dwg"
                    />
                    <Upload className="w-10 h-10 text-[#d4af37] mb-4 stroke-1 animate-pulse-slow" />
                    <h4 className="text-sm font-serif font-medium text-[#1a1a1a]">Import New Concept Asset</h4>
                    <p className="text-xs text-black/40 mt-1 max-w-xs justify-center leading-relaxed font-sans">
                      Drag-and-drop architectural blueprints or click to select files (.PNG, .JPG, .PDF).
                    </p>
                    <span className="mt-4 px-3 py-1 bg-black/5 rounded-full text-[10px] uppercase font-mono tracking-wider text-black/50">
                      Auto-registers with AI Advisor
                    </span>
                  </div>

                  {/* Asset list filter details */}
                  <div className="bg-white border border-[#1a1a1a]/5 rounded-3xl p-6 space-y-4">
                    <h5 className="text-[10px] uppercase font-mono tracking-widest text-[#d4af37] font-bold">Category Distribution</h5>
                    <div className="space-y-2 text-xs">
                      <div className="flex justify-between border-b border-black/5 pb-1">
                        <span>Architectural Blueprints</span>
                        <span className="font-mono">{gallery.filter(g => g.category === 'architectural').length}</span>
                      </div>
                      <div className="flex justify-between border-b border-black/5 pb-1">
                        <span>Tactile Moodboards</span>
                        <span className="font-mono">{gallery.filter(g => g.category === 'moodboard').length}</span>
                      </div>
                      <div className="flex justify-between border-b border-black/5 pb-1">
                        <span>Lighting Ambience studies</span>
                        <span className="font-mono">{gallery.filter(g => g.category === 'lighting').length}</span>
                      </div>
                    </div>
                  </div>

                </div>

                {/* Render Grid Assets - Right */}
                <div className="lg:col-span-8 space-y-4">
                  <div className="text-xs uppercase font-mono tracking-widest text-black/40 mb-2">Architectural Asset Grid</div>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {gallery.map(asset => (
                      <div key={asset.id} className="bg-white border border-black/5 rounded-3xl overflow-hidden shadow-sm hover:border-[#d4af37]/50 transition-all flex flex-col group">
                        
                        <div className="h-56 relative overflow-hidden bg-[#1a1a1a] border-b border-black/10">
                          <img 
                            src={asset.imageUrl} 
                            alt={asset.name} 
                            referrerPolicy="no-referrer"
                            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" 
                          />
                          <span className="absolute top-4 left-4 text-[9px] tracking-widest uppercase font-mono bg-[#1a1a1a] text-[#d4af37] px-2.5 py-1 rounded-full border border-[#d4af37]/30">
                            {asset.category}
                          </span>
                        </div>

                        <div className="p-6 space-y-4 flex-1 flex flex-col justify-between">
                          <div className="space-y-1">
                            <h4 className="font-serif text-lg font-medium text-[#1a1a1a] leading-none">{asset.name}</h4>
                            <p className="text-xs text-black/40 font-mono italic">Scale: {asset.dimensions || 'Vector design File'}</p>
                          </div>

                          <div className="space-y-3">
                            <div className="flex flex-wrap gap-1">
                              {asset.tags.map((tag, i) => (
                                <span key={i} className="text-[9px] font-mono px-2 py-0.5 bg-black/5 rounded-full border border-black/5">
                                  {tag}
                                </span>
                              ))}
                            </div>

                            <button 
                              onClick={() => {
                                setActiveTab('advisor');
                                applyPresetPrompt(`Evaluate the design parameters and biological lighting ratios for the following asset in our archives: "${asset.name}" categorized under: "${asset.category}".`);
                              }}
                              className="w-full py-2.5 bg-[#fcfaf5] border border-black/10 hover:border-[#d4af37] rounded-xl text-xs font-serif font-medium text-[#1a1a1a] hover:bg-white transition-all flex items-center justify-center gap-1.5"
                            >
                              <Bot className="w-3.5 h-3.5 text-black/40" />
                              Inspect with AI Advisor
                            </button>
                          </div>
                        </div>

                      </div>
                    ))}
                  </div>

                </div>

              </div>
            </div>
          )}

          {/* VIEW E: HOTEL PROJECTS & KANBAN TASKS */}
          {activeTab === 'projects' && (
            <div className="space-y-8 animate-fade-in">
              <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 border-b border-black/5 pb-4">
                <div>
                  <h2 className="text-3xl font-serif text-brand-dark">Hotel Projects & task boards</h2>
                  <p className="text-sm text-black/50">Coordinate luxury construction variables across Swiss suites and botanical developments.</p>
                </div>

                {/* Project Selector tabs */}
                <div className="flex gap-1.5 bg-[#1a1a1a] p-1.5 rounded-2xl border border-[#d4af37]/20 select-none">
                  {projects.map(proj => (
                    <button 
                      key={proj.id}
                      onClick={() => setSelectedProject(proj)}
                      className={`px-4 py-2 rounded-xl text-xs font-serif transition-all ${
                        selectedProject.id === proj.id 
                          ? 'bg-[#d4af37] text-[#1a1a1a] font-bold shadow-md' 
                          : 'text-white/60 hover:text-white'
                      }`}
                    >
                      {proj.name}
                    </button>
                  ))}
                </div>
              </div>

              {/* Project Dashboard Info Bento Card */}
              <div className="bg-[#064e3b] text-white rounded-3xl p-8 grid grid-cols-1 md:grid-cols-12 gap-8 relative overflow-hidden">
                <div className="md:col-span-8 space-y-4">
                  <div className="text-[10px] uppercase tracking-widest font-mono text-[#d4af37] font-semibold">Active Zone Overview</div>
                  <h3 className="font-serif text-3xl font-semibold leading-snug">{selectedProject.name}</h3>
                  <p className="text-xs text-white/70 max-w-xl font-sans leading-relaxed">{selectedProject.description}</p>
                </div>
                
                <div className="md:col-span-4 bg-black/20 p-6 rounded-2xl border border-white/10 flex flex-col justify-between">
                  <div className="flex justify-between text-xs font-mono">
                    <span className="opacity-65">Curated Budget Portfolio:</span>
                    <span className="font-bold text-[#d4af37]">{selectedProject.budget}</span>
                  </div>
                  <div className="mt-4 space-y-2">
                    <div className="flex justify-between text-xs font-mono">
                      <span>Tasks completion metrics</span>
                      <span>{selectedProject.completedTasksCount}/{selectedProject.tasksCount} Done</span>
                    </div>
                    <div className="h-1.5 bg-white/15 rounded-full overflow-hidden">
                      <div 
                        className="h-full bg-[#d4af37]" 
                        style={{ width: `${selectedProject.tasksCount > 0 ? (selectedProject.completedTasksCount / selectedProject.tasksCount) * 100 : 0}%` }}
                      ></div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Kanban Task Board Grid */}
              <div className="space-y-4">
                <div className="flex justify-between items-center text-xs uppercase font-mono tracking-widest text-[#d4af37] font-semibold">
                  <span>Interactive Kanban Board</span>
                  <span className="text-black/40">Dragging/Transition simulated below</span>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  
                  {/* Column 1: TODO */}
                  <div className="bg-white border border-[#1a1a1a]/5 rounded-3xl p-6 shadow-sm space-y-4">
                    <div className="flex justify-between items-center border-b border-black/5 pb-2">
                      <span className="text-xs uppercase font-mono tracking-widest opacity-60">To Do</span>
                      <span className="bg-black/5 text-[10px] px-2.5 py-0.5 rounded-full font-mono">{activeProjectTasks.filter(t => t.status === 'todo').length}</span>
                    </div>

                    <div className="space-y-3 min-h-[180px]">
                      {activeProjectTasks.filter(t => t.status === 'todo').map(task => (
                        <div key={task.id} className="p-4 bg-[#fcfaf5] rounded-2xl border border-black/5 space-y-3 group-hover:border-[#d4af37] transition-all">
                          <p className="text-xs font-serif leading-relaxed text-[#1a1a1a]">{task.title}</p>
                          <div className="flex justify-between items-center text-[9px] font-mono">
                            <span className={`px-2 py-0.5 rounded uppercase font-bold ${task.priority === 'high' ? 'bg-red-50 text-red-700 border border-red-100' : 'bg-black/5 text-black/60'}`}>
                              {task.priority}
                            </span>
                            <span className="text-black/40">dl: {task.deadline}</span>
                          </div>
                          
                          <div className="pt-2 border-t border-black/5 flex justify-between items-center">
                            <button 
                              onClick={() => changeTaskStatus(task.id, 'inprogress')}
                              className="text-[9px] font-mono text-[#064e3b] font-bold hover:underline"
                            >
                              Move to Active →
                            </button>
                            <button onClick={() => handleRemoveTask(task.id)} className="text-red-500 hover:text-red-700">
                              <Trash2 className="w-3.5 h-3.5" />
                            </button>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Column 2: IN PROGRESS */}
                  <div className="bg-white border border-[#1a1a1a]/5 rounded-3xl p-6 shadow-sm space-y-4">
                    <div className="flex justify-between items-center border-b border-black/5 pb-2">
                      <span className="text-xs uppercase font-mono tracking-widest opacity-60">Active Curations</span>
                      <span className="bg-[#d4af37]/20 text-[#d4af37] text-[10px] px-2.5 py-0.5 rounded-full font-mono">{activeProjectTasks.filter(t => t.status === 'inprogress').length}</span>
                    </div>

                    <div className="space-y-3 min-h-[180px]">
                      {activeProjectTasks.filter(t => t.status === 'inprogress').map(task => (
                        <div key={task.id} className="p-4 bg-[#fcfaf5] rounded-2xl border border-[#d4af37]/20 space-y-3">
                          <p className="text-xs font-serif leading-relaxed text-[#1a1a1a]">{task.title}</p>
                          <div className="flex justify-between items-center text-[9px] font-mono">
                            <span className={`px-2 py-0.5 rounded uppercase font-bold ${task.priority === 'high' ? 'bg-red-50 text-red-700 border border-red-100' : 'bg-black/5 text-black/60'}`}>
                              {task.priority}
                            </span>
                            <span className="text-black/40">dl: {task.deadline}</span>
                          </div>
                          
                          <div className="pt-2 border-t border-black/5 flex justify-between items-center">
                            <button 
                              onClick={() => changeTaskStatus(task.id, 'completed')}
                              className="text-[9px] font-mono text-[#d4af37] font-bold hover:underline"
                            >
                              Complete Curation ✓
                            </button>
                            <button onClick={() => handleRemoveTask(task.id)} className="text-red-500 hover:text-red-700">
                              <Trash2 className="w-3.5 h-3.5" />
                            </button>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Column 3: COMPLETED */}
                  <div className="bg-white border border-[#1a1a1a]/5 rounded-3xl p-6 shadow-sm space-y-4">
                    <div className="flex justify-between items-center border-b border-black/5 pb-2">
                      <span className="text-xs uppercase font-mono tracking-widest opacity-60">Completed Masters</span>
                      <span className="bg-[#064e3b]/20 text-[#064e3b] text-[10px] px-2.5 py-0.5 rounded-full font-mono">{activeProjectTasks.filter(t => t.status === 'completed').length}</span>
                    </div>

                    <div className="space-y-3 min-h-[180px]">
                      {activeProjectTasks.filter(t => t.status === 'completed').map(task => (
                        <div key={task.id} className="p-4 bg-white rounded-2xl border border-black/5 space-y-3 opacity-70">
                          <p className="text-xs font-serif leading-relaxed text-[#1a1a1a] line-through">{task.title}</p>
                          <div className="flex justify-between items-center text-[9px] font-mono">
                            <span className="px-2 py-0.5 bg-[#064e3b]/10 text-[#064e3b] rounded uppercase font-bold">
                              {task.priority}
                            </span>
                            <span className="text-black/40">Completed</span>
                          </div>
                          
                          <div className="pt-2 border-t border-black/5 flex justify-between items-center">
                            <button 
                              onClick={() => changeTaskStatus(task.id, 'todo')}
                              className="text-[9px] font-mono text-black/50 hover:underline"
                            >
                              ← Reopen Task
                            </button>
                            <button onClick={() => handleRemoveTask(task.id)} className="text-red-500 hover:text-red-700">
                              <Trash2 className="w-3.5 h-3.5" />
                            </button>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>

                </div>
              </div>

              {/* Form to inject new tasks directly */}
              <div className="bg-white border border-[#1a1a1a]/5 rounded-3xl p-6 shadow-sm">
                <form onSubmit={handleAddTask} className="grid grid-cols-1 md:grid-cols-12 gap-4 items-end">
                  <div className="md:col-span-6 space-y-2">
                    <label className="text-xs uppercase font-mono tracking-wider opacity-60">Add Custom Project Task Specification</label>
                    <input 
                      type="text" 
                      value={newTaskTitle}
                      onChange={(e) => setNewTaskTitle(e.target.value)}
                      placeholder="e.g. Audit concrete pouring of north pool wing..." 
                      className="w-full text-xs p-3.5 bg-[#fcfaf5] border border-black/5 rounded-xl outline-none"
                    />
                  </div>
                  <div className="md:col-span-3 space-y-2">
                    <label className="text-xs uppercase font-mono tracking-wider opacity-60">Priority Rating</label>
                    <select 
                      value={newTaskPriority}
                      onChange={(e: any) => setNewTaskPriority(e.target.value)}
                      className="w-full text-xs p-3.5 bg-[#fcfaf5] border border-black/5 rounded-xl outline-none"
                    >
                      <option value="low">Low</option>
                      <option value="medium">Medium</option>
                      <option value="high">High</option>
                    </select>
                  </div>
                  <div className="md:col-span-3">
                    <button 
                      type="submit"
                      className="w-full py-3.5 bg-[#d4af37] text-black font-bold uppercase tracking-widest text-xs rounded-xl hover:bg-[#1a1a1a] hover:text-white transition-all flex items-center justify-center gap-1.5"
                    >
                      <Plus className="w-4 h-4" />
                      Propose Task
                    </button>
                  </div>
                </form>
              </div>

            </div>
          )}

          {/* VIEW F: AI ADVISOR FULL EXPERIENCES (with comparison templates) */}
          {activeTab === 'advisor' && (
            <div className="space-y-8 animate-fade-in">
              <div className="border-b border-black/5 pb-4">
                <h2 className="text-3xl font-serif text-brand-dark">AI Advisor Consultation Lab</h2>
                <p className="text-sm text-black/50">Query our server-side Gemini 2.5 models regarding spatial formulas and luxury standards.</p>
              </div>

              {/* Grid split chat vs tools */}
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
                
                {/* Chat Column - Left */}
                <div className="lg:col-span-8 bg-white border border-[#1a1a1a]/5 rounded-3xl p-6 shadow-sm flex flex-col h-[520px] justify-between">
                  <div className="flex justify-between items-center border-b border-black/5 pb-3">
                    <div className="flex items-center space-x-2">
                      <div className="w-2.5 h-2.5 bg-[#064e3b] rounded-full animate-ping"></div>
                      <span className="text-xs font-mono font-bold uppercase tracking-widest text-black/70">Intellectual Server Pathway</span>
                    </div>
                    <button onClick={() => setChatHistory([])} className="text-[10px] text-red-500 hover:underline">Clear Consultation Logs</button>
                  </div>

                  {/* Message panels scrolling */}
                  <div className="flex-1 overflow-y-auto p-4 space-y-4 my-4 font-sans text-xs">
                    {chatHistory.map((m, idx) => {
                      const isUser = m.sender === 'user';
                      const isSystem = m.sender === 'system';
                      
                      return (
                        <div 
                          key={idx} 
                          className={`flex ${isUser ? 'justify-end' : 'justify-start'} ${isSystem ? 'justify-center' : ''}`}
                        >
                          <div className={`p-4 rounded-2xl max-w-lg space-y-1 ${
                            isUser 
                              ? 'bg-[#1a1a1a] text-[#fcfaf5] rounded-tr-none' 
                              : isSystem 
                                ? 'bg-amber-50 text-amber-900 border border-amber-200 uppercase font-mono text-[10px]' 
                                : 'bg-[#fcfaf5] text-black border border-black/5 rounded-tl-none font-serif text-sm'
                          }`}>
                            <div className="flex justify-between items-center gap-4 text-[10px] opacity-40 font-mono">
                              <span>{isUser ? 'Director' : isSystem ? 'System notification' : 'AI Advisor'}</span>
                              <span>{m.timestamp}</span>
                            </div>
                            <p className="whitespace-pre-line leading-relaxed">{m.text}</p>
                          </div>
                        </div>
                      );
                    })}
                    {isAIThinking && (
                      <div className="flex justify-start">
                        <div className="p-4 rounded-xl bg-[#fcfaf5] border border-black/5 rounded-tl-none flex items-center space-x-2">
                          <div className="w-1.5 h-1.5 bg-black rounded-full animate-bounce"></div>
                          <div className="w-1.5 h-1.5 bg-black rounded-full animate-bounce delay-100"></div>
                          <div className="w-1.5 h-1.5 bg-black rounded-full animate-bounce delay-200"></div>
                          <span className="text-[10px] font-mono text-black/40">Querying Elysora Neural graph...</span>
                        </div>
                      </div>
                    )}
                  </div>

                  {/* Input form */}
                  <div className="flex gap-2 bg-[#fcfaf5] p-2.5 rounded-2xl border border-black/5">
                    <input 
                      type="text"
                      id="advisor-chat-input"
                      value={chatInput}
                      onChange={(e) => setChatInput(e.target.value)}
                      onKeyDown={(e) => e.key === 'Enter' && sendAIMessage()}
                      placeholder="Consult the Advisor (e.g. Compare thermal saunas vs infrared vaults...)"
                      className="flex-1 bg-transparent text-xs outline-none px-2"
                    />
                    <button 
                      id="advisor-send-btn"
                      onClick={() => sendAIMessage()}
                      className="px-5 py-2.5 bg-[#064e3b] text-white text-xs font-bold uppercase tracking-widest rounded-xl hover:bg-[#d4af37] hover:text-[#1a1a1a] transition-all cursor-pointer"
                    >
                      Query AI
                    </button>
                  </div>
                </div>

                {/* Companion Side Panels - Right */}
                <div className="lg:col-span-4 space-y-6">
                  
                  {/* Dynamic Layout comparison controller */}
                  <div className="bg-white border border-[#1a1a1a]/5 rounded-3xl p-6 shadow-sm space-y-4">
                    <div className="flex items-center gap-1 text-[10px] uppercase font-mono tracking-widest text-[#d4af37] font-bold">
                      <Sparkles className="w-4 h-4 text-[#d4af37]" />
                      <span>Comparison Layout Engine</span>
                    </div>

                    <div className="space-y-3">
                      <div>
                        <label className="text-[9px] uppercase font-mono opacity-50 block mb-1">Option A criteria</label>
                        <input 
                          type="text" 
                          value={compOptionA}
                          onChange={(e) => setCompOptionA(e.target.value)}
                          className="w-full text-xs p-2.5 bg-[#fcfaf5] border border-black/5 rounded-xl outline-none"
                        />
                      </div>
                      <div>
                        <label className="text-[9px] uppercase font-mono opacity-50 block mb-1">Option B criteria</label>
                        <input 
                          type="text" 
                          value={compOptionB}
                          onChange={(e) => setCompOptionB(e.target.value)}
                          className="w-full text-xs p-2.5 bg-[#fcfaf5] border border-black/5 rounded-xl outline-none"
                        />
                      </div>

                      <button 
                        onClick={handleRunComparison}
                        className="w-full py-3 bg-[#d4af37] text-[#1a1a1a] rounded-xl text-xs font-bold uppercase tracking-widest hover:bg-[#1a1a1a] hover:text-white transition-all"
                      >
                        Run Comparative Report
                      </button>
                    </div>
                  </div>

                  {/* Dynamic system limits instructions details */}
                  <div className="bg-white border border-[#1a1a1a]/5 rounded-3xl p-6 shadow-sm space-y-3 text-xs leading-relaxed">
                    <h5 className="text-[10px] uppercase font-mono tracking-widest font-bold text-black/50">How to activate real-time Gemini</h5>
                    <p className="text-black/60 font-sans">
                      Our system is prepared with full-stack endpoints proxying requests securely. Adding your <strong>GEMINI_API_KEY</strong> in the Secrets menu allows full multimodal rendering across documents.
                    </p>
                  </div>

                </div>

              </div>
            </div>
          )}

          {/* VIEW G: FUTURE LAB (TREND SIMULATOR) */}
          {activeTab === 'future' && (
            <div className="space-y-8 animate-fade-in">
              <div className="border-b border-black/5 pb-4">
                <h2 className="text-3xl font-serif text-brand-dark">Future Innovation & Analytics Lab</h2>
                <p className="text-sm text-black/50">Propose speculative resort trends, simulate eco projections, and receive server-side AI evaluation curves.</p>
              </div>

              <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
                
                {/* Proposal Form - Left */}
                <div className="lg:col-span-5 bg-white border border-[#1a1a1a]/5 rounded-3xl p-6 shadow-sm space-y-6">
                  <div className="text-xs uppercase font-mono tracking-widest text-[#d4af37] font-semibold">Propose New Trend Specification</div>
                  
                  <form onSubmit={handleAddTrend} className="space-y-4">
                    <div className="space-y-1">
                      <label className="text-[9px] uppercase font-mono opacity-50 font-bold block">Speculative Title</label>
                      <input 
                        type="text" 
                        value={newIdeaTitle}
                        onChange={(e) => setNewIdeaTitle(e.target.value)}
                        placeholder="e.g. Geothermal Pool Cavity Reclaiming" 
                        className="w-full text-xs p-3.5 bg-[#fcfaf5] border border-black/5 rounded-xl outline-none"
                        required
                      />
                    </div>

                    <div className="space-y-1">
                      <label className="text-[9px] uppercase font-mono opacity-50 font-bold block">Speculative Description</label>
                      <textarea 
                        value={newIdeaDesc}
                        onChange={(e) => setNewIdeaDesc(e.target.value)}
                        placeholder="Detail how this affects guest circadian rhythms or energy footprints..." 
                        className="w-full text-xs p-3.5 bg-[#fcfaf5] border border-black/5 rounded-xl outline-none h-24 resize-none"
                        required
                      ></textarea>
                    </div>

                    <div className="space-y-1">
                      <label className="text-[9px] uppercase font-mono opacity-50 font-bold block">Category</label>
                      <select 
                        value={newIdeaCategory}
                        onChange={(e: any) => setNewIdeaCategory(e.target.value)}
                        className="w-full text-xs p-3.5 bg-[#fcfaf5] border border-black/5 rounded-xl outline-none"
                      >
                        <option value="Architecture">Architecture</option>
                        <option value="Wellness">Wellness Tech</option>
                        <option value="Hospitality">Curated Service</option>
                        <option value="Digital Infrastructure">Invisible Automation</option>
                      </select>
                    </div>

                    <button 
                      type="submit"
                      className="w-full py-4 bg-[#064e3b] text-white font-bold uppercase tracking-widest text-xs rounded-xl hover:bg-[#d4af37] hover:text-[#1a1a1a] transition-all flex items-center justify-center gap-1.5"
                    >
                      <Sparkles className="w-4 h-4" />
                      Deconstruct Tech & Simulate
                    </button>
                  </form>
                </div>

                {/* Projection results cards - Right */}
                <div className="lg:col-span-7 space-y-6">
                  <div className="text-xs uppercase font-mono tracking-widest text-black/40 mb-2">Simulated Active Scenarios</div>
                  
                  <div className="space-y-4">
                    {trends.map(trend => (
                      <div key={trend.id} className="bg-white border border-[#1a1a1a]/5 rounded-3xl p-6 shadow-sm space-y-4 hover:border-[#d4af37]/50 transition-all">
                        <div className="flex justify-between items-center">
                          <h4 className="font-serif text-lg font-bold text-[#1a1a1a]">{trend.title}</h4>
                          <span className="bg-[#064e3b]/10 text-[#064e3b] text-[9px] uppercase font-mono px-2.5 py-0.5 rounded-full font-bold">
                            {trend.category}
                          </span>
                        </div>

                        <p className="text-xs text-black/60 leading-relaxed font-sans">{trend.description}</p>
                        
                        {trend.simulatedScenario && (
                          <div className="p-4 bg-[#064e3b]/5 text-[#064e3b] border border-[#064e3b]/20 rounded-2xl flex items-start gap-2.5 text-xs font-serif leading-relaxed italic">
                            <Sparkles className="w-5.5 h-5.5 text-[#d4af37] flex-shrink-0 animate-pulse mt-0.5" />
                            <span>{trend.simulatedScenario}</span>
                          </div>
                        )}
                      </div>
                    ))}
                  </div>

                </div>

              </div>
            </div>
          )}

        </div>

        {/* 4. DESIGN FOOTER SECTION */}
        <footer className="py-8 px-10 border-t border-[#1a1a1a]/5 text-center text-black/40 text-[10px] tracking-wider uppercase font-mono flex flex-col md:flex-row justify-between items-center gap-4 bg-white/30 backdrop-blur-md">
          <span>© 2026 ELYSORA Academy operating system. All rights reserved.</span>
          <span>Security status: Verified. Offline Local Storage active.</span>
        </footer>

      </main>
    </div>
  );
}
