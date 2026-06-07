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
  TrendingUp,
  Save,
  History,
  Briefcase,
  FolderOpen,
  Calculator,
  Percent,
  RotateCcw,
  Coins
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
  INITIAL_COURSES_MGMT,
  INITIAL_GALLERY, 
  INITIAL_GALLERY_MGMT,
  INITIAL_PROJECTS, 
  INITIAL_TASKS, 
  INITIAL_TRENDS 
} from './mockData';

import { i18n, Language, MOCK_DATA_TRANSLATIONS } from './i18n';

export default function App() {
  // Language & Translation States
  const [lang, setLang] = useState<Language>('en');
  const t = i18n[lang];

  // Dynamic localization mapping helpers
  const getLocalizedNode = (node: KnowledgeNode): KnowledgeNode => {
    const tr = MOCK_DATA_TRANSLATIONS[node.id]?.[lang];
    if (tr) {
      return {
        ...node,
        name: tr.name || node.name,
        category: tr.category || node.category,
        description: tr.description || node.description,
        content: tr.content || node.content
      };
    }
    return node;
  };

  const getLocalizedCourse = (course: Course): Course => {
    const tr = MOCK_DATA_TRANSLATIONS[course.id]?.[lang];
    const localizedLessons = course.lessons.map(lesson => {
      const lesTr = MOCK_DATA_TRANSLATIONS[lesson.id]?.[lang];
      if (lesTr) {
        return {
          ...lesson,
          title: lesTr.title || lesson.title,
          content: lesTr.content || lesson.content,
          quiz: lesson.quiz && lesTr.quiz ? {
            ...lesson.quiz,
            question: lesTr.quiz.question || lesson.quiz.question,
            options: lesTr.quiz.options || lesson.quiz.options,
            explanation: lesTr.quiz.explanation || lesson.quiz.explanation
          } : lesson.quiz
        };
      }
      return lesson;
    });

    if (tr) {
      return {
        ...course,
        title: tr.title || course.title,
        description: tr.description || course.description,
        lessons: localizedLessons
      };
    }
    return { ...course, lessons: localizedLessons };
  };

  const getLocalizedGalleryAsset = (asset: GalleryAsset): GalleryAsset => {
    const tr = MOCK_DATA_TRANSLATIONS[asset.id]?.[lang];
    if (tr) {
      return {
        ...asset,
        name: tr.name || asset.name,
        category: tr.category || asset.category,
        tags: tr.tags || asset.tags
      };
    }
    return asset;
  };

  const getLocalizedProject = (proj: Project): Project => {
    const tr = MOCK_DATA_TRANSLATIONS[proj.id]?.[lang];
    if (tr) {
      return {
        ...proj,
        name: tr.name || proj.name,
        description: tr.description || proj.description
      };
    }
    return proj;
  };

  const getLocalizedTask = (task: Task): Task => {
    const tr = MOCK_DATA_TRANSLATIONS[task.id]?.[lang];
    if (tr) {
      return {
        ...task,
        title: tr.title || task.title
      };
    }
    return task;
  };

  const getLocalizedTrend = (trend: IdeaTrend): IdeaTrend => {
    const tr = MOCK_DATA_TRANSLATIONS[trend.id]?.[lang];
    if (tr) {
      return {
        ...trend,
        title: tr.title || trend.title,
        description: tr.description || trend.description,
        simulatedScenario: tr.simulatedScenario || trend.simulatedScenario
      };
    }
    return trend;
  };

  // Navigation & Core States
  const [activeTab, setActiveTab] = useState<'dashboard' | 'knowledge' | 'academy' | 'academy_mgmt' | 'gallery' | 'gallery_mgmt' | 'projects' | 'advisor' | 'future'>('dashboard');
  const [searchQuery, setSearchQuery] = useState('');
  const [currentTime, setCurrentTime] = useState('');

  // Domain states with local defaults (providing standard client persistence)
  const [nodes, setNodes] = useState<KnowledgeNode[]>(INITIAL_NODES);
  const [projects, setProjects] = useState<Project[]>(INITIAL_PROJECTS);
  const [selectedProject, setSelectedProject] = useState<Project>(INITIAL_PROJECTS[0]);
  const [tasks, setTasks] = useState<Task[]>(INITIAL_TASKS);
  const [courses, setCourses] = useState<Course[]>(INITIAL_COURSES);
  const [coursesMgmt, setCoursesMgmt] = useState<Course[]>(INITIAL_COURSES_MGMT);
  const [gallery, setGallery] = useState<GalleryAsset[]>(INITIAL_GALLERY);
  const [galleryMgmt, setGalleryMgmt] = useState<GalleryAsset[]>(INITIAL_GALLERY_MGMT);
  const [trends, setTrends] = useState<IdeaTrend[]>(INITIAL_TRENDS);

  // Active Interactive Selection States
  const [selectedNode, setSelectedNode] = useState<KnowledgeNode | null>(INITIAL_NODES[0]);
  const [selectedCourse, setSelectedCourse] = useState<Course>(INITIAL_COURSES[0]);
  const [activeLesson, setActiveLesson] = useState<Lesson>(INITIAL_COURSES[0].lessons[0]);
  const [quizAnswer, setQuizAnswer] = useState<number | null>(null);
  const [quizSubmitted, setQuizSubmitted] = useState<boolean>(false);
  const [quizScore, setQuizScore] = useState<number>(0);

  // Management interactive selection states
  const [selectedCourseMgmt, setSelectedCourseMgmt] = useState<Course>(INITIAL_COURSES_MGMT[0]);
  const [activeLessonMgmt, setActiveLessonMgmt] = useState<Lesson>(INITIAL_COURSES_MGMT[0].lessons[0]);
  const [quizAnswerMgmt, setQuizAnswerMgmt] = useState<number | null>(null);
  const [quizSubmittedMgmt, setQuizSubmittedMgmt] = useState<boolean>(false);
  const [quizScoreMgmt, setQuizScoreMgmt] = useState<number>(0);
  const [isDraggingMgmt, setIsDraggingMgmt] = useState(false);
  const fileInputRefMgmt = useRef<HTMLInputElement>(null);

  // Management asset detail modal & dynamic ROI calculator states
  const [selectedMgmtAsset, setSelectedMgmtAsset] = useState<GalleryAsset | null>(null);
  const [calcHotelPrice, setCalcHotelPrice] = useState<number>(2000000);
  const [calcEquity, setCalcEquity] = useState<number>(600000);
  const [calcInterestRate, setCalcInterestRate] = useState<number>(4.5);
  const [calcTermYears, setCalcTermYears] = useState<number>(15);
  const [calcOperatingCostsPercent, setCalcOperatingCostsPercent] = useState<number>(70);
  const [calcMinTargetProfit, setCalcMinTargetProfit] = useState<number>(100000);
  const [calcActiveTab, setCalcActiveTab] = useState<'calculator' | 'study'>('calculator');

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

  // Update chat helper text dynamically when language changes
  useEffect(() => {
    const welcomeText = {
      en: 'Good day. I am the ELYSORA Academy AI Advisor. I have mapped the topological and microclimatic criteria for our upcoming Swiss Alpine retreats. Ask me to compare design layouts, suggest materials, or summarize development folders.',
      fr: 'Bonjour. Je suis le conseiller IA de l\'Académie ELYSORA. J\'ai cartographié les critères topologiques et microclimatiques de nos prochains retraites alpines suisses. Demandez-moi de comparer des configurations, de suggérer des matériaux ou de synthétiser des dossiers de développement.',
      zh: '您好。我是 ELYSORA 酒店学院 AI 创意顾问。我已经为您规划了即将建设的瑞士阿尔卑斯山奢华度假村的地理与微气候设计特征。欢迎请我比对空间格局、推荐环保材质，或总结工程开发案卷。'
    };
    
    setChatHistory(prev => prev.map(msg => {
      if (msg.id === 'welcome-msg') {
        return { ...msg, text: welcomeText[lang] };
      }
      return msg;
    }));
  }, [lang]);

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

  // AI Advisor Draft Logs State
  const [draftTitle, setDraftTitle] = useState('');
  const [loadedDraftId, setLoadedDraftId] = useState<string | null>(null);
  const [draftLogs, setDraftLogs] = useState<any[]>(() => {
    try {
      const saved = localStorage.getItem('elysora_consultation_drafts');
      return saved ? JSON.parse(saved) : [];
    } catch (e) {
      return [];
    }
  });

  // Sync draftLogs to local storage
  useEffect(() => {
    localStorage.setItem('elysora_consultation_drafts', JSON.stringify(draftLogs));
  }, [draftLogs]);
  
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

  // Localized dynamic datasets
  const localizedNodes = nodes.map(getLocalizedNode);
  const localizedCourses = courses.map(getLocalizedCourse);
  const localizedCoursesMgmt = coursesMgmt.map(getLocalizedCourse);
  const localizedGallery = gallery.map(getLocalizedGalleryAsset);
  const localizedGalleryMgmt = galleryMgmt.map(getLocalizedGalleryAsset);
  const localizedProjects = projects.map(getLocalizedProject);
  const localizedTrends = trends.map(getLocalizedTrend);

  // Localized Active items
  const localizedSelectedNode = selectedNode ? getLocalizedNode(selectedNode) : null;
  const localizedSelectedCourse = getLocalizedCourse(selectedCourse);
  const localizedSelectedCourseMgmt = getLocalizedCourse(selectedCourseMgmt);
  const localizedActiveLesson = localizedSelectedCourse.lessons.find(l => l.id === activeLesson.id) || activeLesson;
  const localizedActiveLessonMgmt = localizedSelectedCourseMgmt.lessons.find(l => l.id === activeLessonMgmt.id) || activeLessonMgmt;
  const localizedSelectedProject = getLocalizedProject(selectedProject);

  // Sync active project selection in task board
  const activeProjectTasks = tasks.filter(t => t.projectId === selectedProject.id).map(getLocalizedTask);

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

  // Handle saving current conversation
  const handleSaveDraft = (e?: React.FormEvent) => {
    if (e) e.preventDefault();
    if (chatHistory.length === 0) return;

    // Use input title or fallback
    const titleToSave = draftTitle.trim() || `${t.unnamedDraft} #${draftLogs.length + 1}`;
    
    // Check if we are overwriting an existing loaded draft or saving a new one
    if (loadedDraftId) {
      // Overwrite / Update the existing draft
      setDraftLogs(prev => prev.map(draft => {
        if (draft.id === loadedDraftId) {
          return {
            ...draft,
            title: titleToSave,
            messages: [...chatHistory],
            timestamp: new Date().toLocaleString([], { month: 'short', day: 'numeric', hour: '2-digit', minute: '2-digit' })
          };
        }
        return draft;
      }));
      setDraftTitle('');
      // Show checkmark / system notification
      const sysLogEntry: Message = {
        id: `sys-log-${Date.now()}`,
        sender: 'system',
        text: `Draft "${titleToSave}" updated successfully to workspace storage.`,
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
      };
      setChatHistory(prev => [...prev.filter(m => m.id !== 'sys-log-last'), { ...sysLogEntry, id: 'sys-log-last' }]);
    } else {
      // Save as brand new draft
      const newDraft = {
        id: `draft-${Date.now()}`,
        title: titleToSave,
        messages: [...chatHistory],
        timestamp: new Date().toLocaleString([], { month: 'short', day: 'numeric', hour: '2-digit', minute: '2-digit' })
      };
      
      setDraftLogs(prev => [newDraft, ...prev]);
      setLoadedDraftId(newDraft.id);
      setDraftTitle('');
      
      const sysLogEntry: Message = {
        id: `sys-log-${Date.now()}`,
        sender: 'system',
        text: `Draft "${titleToSave}" successfully persistent in workspace database.`,
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
      };
      setChatHistory(prev => [...prev.filter(m => m.id !== 'sys-log-last'), { ...sysLogEntry, id: 'sys-log-last' }]);
    }
  };

  // Handle loading select draft
  const handleLoadDraft = (draft: any) => {
    setChatHistory(draft.messages);
    setLoadedDraftId(draft.id);
    setDraftTitle(draft.title);
  };

  // Handle deleting a draft
  const handleDeleteDraft = (draftId: string, e: React.MouseEvent) => {
    e.stopPropagation();
    setDraftLogs(prev => prev.filter(d => d.id !== draftId));
    if (loadedDraftId === draftId) {
      setLoadedDraftId(null);
      setDraftTitle('');
    }
  };

  // Create new active chat (reset current chat and unselect any draft)
  const handleNewChat = () => {
    const welcomeText = {
      en: 'Good day. I am the ELYSORA Academy AI Advisor. I have mapped the topological and microclimatic criteria for our upcoming Swiss Alpine retreats. Ask me to compare design layouts, suggest materials, or summarize development folders.',
      fr: 'Bonjour. Je suis le conseiller IA de l\'Académie ELYSORA. J\'ai cartographié les critères topologiques et microclimatiques de nos prochains retraites alpines suisses. Demandez-moi de comparer des configurations, de suggérer des matériaux ou de synthétiser des dossiers de développement.',
      zh: '您好。我是 ELYSORA 酒店学院 AI 创意顾问。我已经为您规划了即将建设的瑞士阿尔卑斯山奢华度假村的地理与微气候设计特征。欢迎请我比对空间格局、推荐环保材质，或总结工程开发案卷。'
    };
    setChatHistory([
      {
        id: 'welcome-msg',
        sender: 'assistant',
        text: welcomeText[lang],
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
      }
    ]);
    setLoadedDraftId(null);
    setDraftTitle('');
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

  // Management quiz handlers
  const handleQuizAnswerMgmt = (optionIdx: number) => {
    if (quizSubmittedMgmt) return;
    setQuizAnswerMgmt(optionIdx);
  };

  const submitQuizMgmt = () => {
    if (quizAnswerMgmt === null || !activeLessonMgmt.quiz) return;
    setQuizSubmittedMgmt(true);
    if (quizAnswerMgmt === activeLessonMgmt.quiz.correctAnswer) {
      setQuizScoreMgmt(prev => prev + 1);
      // Boost course's progress state slightly as reward
      setCoursesMgmt(prev => prev.map(c => {
        if (c.id === selectedCourseMgmt.id) {
          const newProg = Math.min(c.progress + 15, 100);
          return { ...c, progress: newProg };
        }
        return c;
      }));
    }
  };

  const nextLessonMgmt = () => {
    setQuizAnswerMgmt(null);
    setQuizSubmittedMgmt(false);
    const lessonIdx = selectedCourseMgmt.lessons.findIndex(l => l.id === activeLessonMgmt.id);
    if (lessonIdx !== -1 && lessonIdx < selectedCourseMgmt.lessons.length - 1) {
      setActiveLessonMgmt(selectedCourseMgmt.lessons[lessonIdx + 1]);
    }
  };

  // Management drag & drop file upload simulators
  const handleDragOverMgmt = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDraggingMgmt(true);
  };

  const handleDragLeaveMgmt = () => {
    setIsDraggingMgmt(false);
  };

  const handleDropMgmt = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDraggingMgmt(false);
    if (e.dataTransfer.files && e.dataTransfer.files.length > 0) {
      simulateFileUploadMgmt(e.dataTransfer.files[0].name);
    }
  };

  const handleFileSelectMgmt = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      simulateFileUploadMgmt(e.target.files[0].name);
    }
  };

  const simulateFileUploadMgmt = (fileName: string) => {
    const isDoc = fileName.endsWith('.pdf') || fileName.endsWith('.xlsx') || fileName.endsWith('.dwg') || fileName.endsWith('.xls') || fileName.endsWith('.csv') || fileName.endsWith('.doc') || fileName.endsWith('.docx');
    const displayCategory = isDoc ? 'operations' : 'planning';
    const tagList = isDoc ? ['Document', 'Operations', 'Finance'] : ['Image', 'Inspiration', 'Concept'];
    const imageUrl = isDoc 
      ? 'https://images.unsplash.com/photo-1450133064473-71024230f91b?q=80&w=600&auto=format&fit=crop'
      : 'https://images.unsplash.com/photo-1542601906990-b4d3fb778b09?q=80&w=600&auto=format&fit=crop';

    const newAsset: GalleryAsset = {
      id: `gal-mgmt-${Date.now()}`,
      name: fileName.replace(/\.[^/.]+$/, ""), // remove file extension
      category: displayCategory,
      imageUrl: imageUrl,
      dimensions: 'Bespoke Asset',
      tags: ['Uploaded', 'User Concept', ...tagList]
    };

    setGalleryMgmt(prev => [newAsset, ...prev]);

    // Send instant system message in chat logs regarding the uploaded management resource
    const uploadNotice: Message = {
      id: `notice-mgmt-${Date.now()}`,
      sender: 'system',
      text: `Successfully registered management concept resource: "${fileName}". The file was routed to the operations cluster & analyzed by Director AI.`,
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
  const filteredNodes = localizedNodes.filter(n => 
    n.name.toLowerCase().includes(searchQuery.toLowerCase()) || 
    n.description.toLowerCase().includes(searchQuery.toLowerCase())
  );

  // Generate historical completion tracking data over a 6-month period for courses in the academy
  const getTrendsData = () => {
    const activeBlueprints = localizedCourses.map(c => ({
      id: c.id,
      title: c.title,
      currentProgress: c.progress
    }));

    const months = [
      { name: lang === 'zh' ? '一月' : lang === 'fr' ? 'Janv' : 'Jan', scale: 0.20 },
      { name: lang === 'zh' ? '二月' : lang === 'fr' ? 'Févr' : 'Feb', scale: 0.40 },
      { name: lang === 'zh' ? '三月' : lang === 'fr' ? 'Mars' : 'Mar', scale: 0.60 },
      { name: lang === 'zh' ? '四月' : lang === 'fr' ? 'Avri' : 'Apr', scale: 0.75 },
      { name: lang === 'zh' ? '五月' : lang === 'fr' ? 'Mai' : 'May', scale: 0.88 },
      { name: lang === 'zh' ? '六月' : lang === 'fr' ? 'Juin' : 'Jun', scale: 1.00 }
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
            <span className="text-sm">{t.dashboard}</span>
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
            <span className="text-sm">{t.knowledge}</span>
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
            <span className="text-sm">{t.academy}</span>
          </button>

          {/* Management Academy */}
          <button 
            id="nav-btn-academy-mgmt"
            onClick={() => {
              setActiveTab('academy_mgmt');
              if (coursesMgmt.length > 0 && !selectedCourseMgmt) {
                setSelectedCourseMgmt(coursesMgmt[0]);
                setActiveLessonMgmt(coursesMgmt[0].lessons[0]);
              }
            }}
            className={`w-full text-left flex items-center space-x-3 px-4 py-3 rounded-lg transition-all ${
              activeTab === 'academy_mgmt' 
                ? 'bg-[#d4af37]/10 text-[#d4af37] border-l-2 border-[#d4af37] font-medium' 
                : 'text-white/60 hover:text-white hover:bg-white/5'
            }`}
          >
            <Briefcase className="w-4 h-4 text-[#d4af37]" />
            <span className="text-sm">{t.academy_mgmt}</span>
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
            <span className="text-sm">{t.gallery}</span>
          </button>

          {/* Management Gallery */}
          <button 
            id="nav-btn-gallery-mgmt"
            onClick={() => setActiveTab('gallery_mgmt')}
            className={`w-full text-left flex items-center space-x-3 px-4 py-3 rounded-lg transition-all ${
              activeTab === 'gallery_mgmt' 
                ? 'bg-[#d4af37]/10 text-[#d4af37] border-l-2 border-[#d4af37] font-medium' 
                : 'text-white/60 hover:text-white hover:bg-white/5'
            }`}
          >
            <FolderOpen className="w-4 h-4 text-[#d4af37]" />
            <span className="text-sm">{t.gallery_mgmt}</span>
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
            <span className="text-sm">{t.projects}</span>
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
            <span className="text-sm">{t.advisor}</span>
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
            <span className="text-sm">{t.future}</span>
          </button>
        </nav>

        {/* Sidebar Active Session Status (Artistic Flair Spec) */}
        <div className="p-6 mt-auto">
          <div className="bg-[#064e3b] p-4 rounded-xl border border-[#d4af37]/30 font-sans">
            <div className="text-[10px] uppercase tracking-widest text-[#d4af37] mb-1">{t.activeBroker}</div>
            <div className="text-white font-serif text-sm flex items-center gap-1.5 font-medium animate-pulse">
              <Sparkles className="w-3.5 h-3.5 text-[#d4af37]" />
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
          <div className="flex items-center flex-1 max-w-sm mr-4">
            <Search className="w-4 h-4 text-black/30" />
            <input 
              id="search-input"
              type="text" 
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder={t.searchPlaceholder} 
              className="ml-3 bg-transparent outline-none w-full text-sm placeholder:text-black/30 decoration-none"
            />
            {searchQuery && (
              <button onClick={() => setSearchQuery('')} className="text-xs text-black/40 hover:text-black hover:underline ml-2">{t.clear}</button>
            )}
          </div>
          <div className="flex items-center space-x-6 text-sm font-medium">
            {/* Language Selector */}
            <div id="language-switcher" className="flex items-center gap-1 bg-[#1a1a1a]/5 p-1 rounded-xl border border-black/5">
              <button 
                id="lang-en"
                onClick={() => setLang('en')} 
                className={`px-3 py-1 text-xs rounded-lg font-mono transition-all flex items-center gap-1 ${lang === 'en' ? 'bg-[#1a1a1a] text-[#d4af37] font-semibold shadow-sm' : 'text-black/50 hover:text-black hover:bg-black/5'}`}
              >
                <span>🇬🇧</span> <span className="hidden sm:inline">EN</span>
              </button>
              <button 
                id="lang-fr"
                onClick={() => setLang('fr')} 
                className={`px-3 py-1 text-xs rounded-lg font-mono transition-all flex items-center gap-1 ${lang === 'fr' ? 'bg-[#1a1a1a] text-[#d4af37] font-semibold shadow-sm' : 'text-black/50 hover:text-black hover:bg-black/5'}`}
              >
                <span>🇫🇷</span> <span className="hidden sm:inline">FR</span>
              </button>
              <button 
                id="lang-zh"
                onClick={() => setLang('zh')} 
                className={`px-3 py-1 text-xs rounded-lg font-mono transition-all flex items-center gap-1 ${lang === 'zh' ? 'bg-[#1a1a1a] text-[#d4af37] font-semibold shadow-sm' : 'text-black/50 hover:text-black hover:bg-black/5'}`}
              >
                <span>🇨🇳</span> <span className="hidden sm:inline">中文</span>
              </button>
            </div>
            
            <span className="text-[#064e3b] italic font-serif text-lg hidden md:inline">{t.projectTitle}</span>
            <div className="flex items-center gap-2">
              <span className="text-xs text-black/60 font-medium hidden sm:inline">{t.directorWorkspace}</span>
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
                {t.welcome} <span className="italic">{t.director}</span>
              </h1>
              <p className="text-xs tracking-wide text-black/50 mt-2 font-mono uppercase">{t.subWelcome}</p>
            </div>
            <div className="text-left sm:text-right">
              <div className="text-[10px] tracking-widest uppercase opacity-40 font-mono">{t.localTime}</div>
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
                    <div className="text-3xl font-serif text-[#1a1a1a]">{projects.length} {t.activeHotspots}</div>
                    <div className="text-xs uppercase tracking-widest opacity-40 font-mono">{t.villasSpasGardens}</div>
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
                    <div className="text-3xl font-serif text-[#1a1a1a]">84% {t.completedLabel}</div>
                    <div className="text-xs uppercase tracking-widest opacity-40 font-mono">{t.strategicPlan}</div>
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
                      {t.advisorRecommendation}
                    </div>
                    <div className="text-xs opacity-90 leading-relaxed font-sans">
                      {t.advisorRecText}
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
                      <div className="text-xs uppercase tracking-widest text-[#d4af37] font-mono mb-2">{t.primaryCurriculum}</div>
                      <h3 className="font-serif text-2xl sm:text-3xl max-w-xl font-semibold leading-snug">
                        {selectedCourse.title}
                      </h3>
                      <p className="text-white/70 text-xs mt-2 max-w-lg font-sans">
                        {t.instructor}: {selectedCourse.instructor} • Level: {selectedCourse.level}
                      </p>
                    </div>

                    <div className="mt-6 space-y-3 relative z-10">
                      <div className="flex justify-between items-center text-xs text-white/80">
                        <span>{t.currep}</span>
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
                          {t.accessModules} <ChevronRight className="w-3.5 h-3.5" />
                        </button>
                      </div>
                    </div>
                  </div>

                  {/* Management & Operations Row (Académie de gestion & Galerie de gestion) */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">

                    {/* Management Academy - Académie de gestion */}
                    <div id="mgmt-academy-dashboard-card" className="bg-[#1e293b] text-white rounded-3xl p-6 relative overflow-hidden flex flex-col justify-between min-h-[220px] shadow-sm border border-slate-700/30 hover:border-[#d4af37]/40 transition-all group">
                      <div className="absolute top-0 right-0 p-6 opacity-5">
                        <Briefcase className="w-36 h-36" />
                      </div>
                      <div className="relative z-10">
                        <div className="text-xs uppercase tracking-widest text-[#d4af37] font-mono mb-2">{lang === 'zh' ? '管理学院特训' : lang === 'fr' ? 'Académie de gestion' : 'Management Curriculum'}</div>
                        <h3 className="font-serif text-xl font-semibold leading-snug">
                          {selectedCourseMgmt.title}
                        </h3>
                        <p className="text-white/60 text-[11px] mt-1.5 font-sans">
                          {t.instructor}: {selectedCourseMgmt.instructor} • Level: {selectedCourseMgmt.level}
                        </p>
                      </div>

                      <div className="mt-4 space-y-2 relative z-10">
                        <div className="flex justify-between items-center text-[11px] text-white/80">
                          <span>{t.currep}</span>
                          <span className="font-mono">{selectedCourseMgmt.progress}%</span>
                        </div>
                        <div className="h-1 bg-white/20 rounded-full overflow-hidden">
                          <div className="h-full bg-[#d4af37]" style={{ width: `${selectedCourseMgmt.progress}%` }}></div>
                        </div>
                        <div className="pt-2 flex justify-end">
                          <button 
                            onClick={() => setActiveTab('academy_mgmt')}
                            className="px-4 py-2 bg-[#d4af37] text-[#1a1a1a] rounded-lg text-xs font-bold uppercase tracking-widest hover:bg-white hover:text-black transition-all flex items-center gap-1"
                          >
                            {lang === 'zh' ? '开启管理舱' : lang === 'fr' ? 'Accéder aux cours' : 'Access Modules'} <ChevronRight className="w-3.5 h-3.5" />
                          </button>
                        </div>
                      </div>
                    </div>

                    {/* Management Gallery - Galerie de gestion */}
                    <div id="mgmt-gallery-dashboard-card" className="bg-white border border-[#1a1a1a]/5 rounded-3xl p-6 shadow-sm flex flex-col justify-between min-h-[220px] hover:border-[#d4af37]/50 transition-all group">
                      <div>
                        <div className="flex justify-between items-start">
                          <div className="text-xs uppercase tracking-widest text-[#d4af37] font-mono mb-1">{lang === 'zh' ? '管理画廊' : lang === 'fr' ? 'Galerie de gestion' : 'Management Gallery'}</div>
                          <span className="text-[10px] font-mono text-black/40 bg-black/5 px-2 py-0.5 rounded-full">{galleryMgmt.length} {lang === 'zh' ? '个资产' : lang === 'fr' ? 'actifs' : 'assets'}</span>
                        </div>
                        <h3 className="font-serif text-lg font-medium text-[#1a1a1a] leading-tight mt-1">
                          {lang === 'zh' ? '营运与合规灵感库' : lang === 'fr' ? 'Aperçu des Actifs de Gestion' : 'Operations & Compliance Hub'}
                        </h3>
                        
                        {/* Thumbnail Grid */}
                        <div className="grid grid-cols-4 gap-2 mt-3">
                          {galleryMgmt.slice(0, 4).map(asset => (
                            <div key={asset.id} className="h-10 rounded-lg overflow-hidden bg-black/10 relative group-hover:scale-105 transition-transform duration-300">
                              <img src={asset.imageUrl} className="w-full h-full object-cover" alt="" referrerPolicy="no-referrer" />
                            </div>
                          ))}
                        </div>
                      </div>

                      <div className="mt-4 pt-2 border-t border-black/5 flex justify-between items-center">
                        <span className="text-[10px] font-mono text-black/45">{lang === 'zh' ? '可上传管理文档/照片' : lang === 'fr' ? 'Soutient docs & photos' : 'Supports Doc/Photo uploads'}</span>
                        <button 
                          onClick={() => setActiveTab('gallery_mgmt')}
                          className="px-3 py-1.5 bg-[#fcfaf5] border border-black/10 hover:border-[#d4af37] text-black rounded-lg text-xs font-serif font-medium transition-all flex items-center gap-1"
                        >
                          {lang === 'zh' ? '进入画廊' : lang === 'fr' ? 'Ouvrir la galerie' : 'Open Gallery'} <ChevronRight className="w-3.5 h-3.5" />
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
                          {t.academyTrends}
                        </h3>
                        <p className="text-xs text-black/50 mt-1">
                          {t.academyTrendsSub}
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
                          <span className="text-black/60">{t.cumulative}</span>
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
                          {localizedCourses.map((c, index) => (
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
                            name={lang === 'zh' ? '累计进度' : lang === 'fr' ? 'Progrès cumulé' : 'Cumulative Progress'}
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
                        <h3 className="font-serif text-xl italic text-brand-dark">{t.interactivePreview}</h3>
                        <p className="text-xs text-black/50">{t.visualizeIntel}</p>
                      </div>
                      <button 
                        onClick={() => setActiveTab('knowledge')}
                        className="text-xs text-[#064e3b] font-medium hover:underline flex items-center gap-1"
                      >
                        {t.launchGraph} <ArrowRight className="w-3.5 h-3.5" />
                      </button>
                    </div>

                    <div className="h-44 bg-[#fcfaf5]/50 border border-black/5 rounded-2xl flex flex-col justify-center items-center relative overflow-hidden">
                      {/* Interactive concept bubble simulation */}
                      <div className="absolute top-6 left-12 p-2.5 bg-[#1a1a1a] text-white rounded-xl text-xs font-serif shadow-md border border-[#d4af37]/20">
                        {lang === 'zh' ? '水疗材质' : lang === 'fr' ? 'Matériaux de Spa' : 'Spa Materials'}
                      </div>
                      <div className="absolute bottom-6 right-12 p-2.5 bg-[#d4af37]/20 border border-[#d4af37]/40 text-black rounded-xl text-xs font-serif shadow-md">
                        {lang === 'zh' ? '热力学系统' : lang === 'fr' ? 'Thermodynamique' : 'Thermal Dynamics'}
                      </div>
                      <div className="absolute top-1/2 left-1/3 p-3 bg-[#064e3b] text-white rounded-xl text-xs font-serif shadow-md animate-pulse">
                        {lang === 'zh' ? '生态亲生物形态' : lang === 'fr' ? 'Contours Biophiliques' : 'Biophilic Contours'}
                      </div>
                      {/* Connection lines using SVG */}
                      <svg className="absolute inset-0 w-full h-full pointer-events-none opacity-20" xmlns="http://www.w3.org/2000/svg">
                        <line x1="80" y1="35" x2="160" y2="110" stroke="black" strokeWidth="1" strokeDasharray="3,3" />
                        <line x1="160" y1="110" x2="300" y2="140" stroke="black" strokeWidth="1" strokeDasharray="3,3" />
                        <line x1="80" y1="35" x2="300" y2="140" stroke="black" strokeWidth="1" />
                      </svg>
                      <span className="text-[11px] text-black/30 font-mono tracking-widest uppercase relative z-10 p-2 bg-white/80 rounded-full border border-black/5">{t.activeNodesLinked}</span>
                    </div>
                  </div>

                </div>

                {/* Right Side - News Activity Feed & Direct Advisor Prompts */}
                <div className="lg:col-span-4 space-y-6">
                  
                  {/* Curated Pre-Compiled Action Recommendations */}
                  <div className="bg-white rounded-3xl p-6 border border-[#1a1a1a]/5 shadow-sm space-y-4">
                    <h4 className="text-[10px] tracking-widest uppercase text-black/40 font-mono font-bold">{t.presetEnquiries}</h4>
                    <div className="space-y-2.5 text-xs">
                      
                      <button 
                        onClick={() => {
                          setActiveTab('advisor');
                          applyPresetPrompt("Contrast the biophilic footprint of Zen Minimalist design with rustic materials.");
                        }}
                        className="w-full text-left p-3 rounded-xl bg-[#fcfaf5] border border-black/5 hover:border-[#d4af37] hover:bg-white transition-all group flex justify-between items-center"
                      >
                        <span className="text-[#1a1a1a] font-medium group-hover:text-[#064e3b]">{t.compareSpa}</span>
                        <ChevronRight className="w-3.5 h-3.5 text-black/30 group-hover:text-black" />
                      </button>

                      <button 
                        onClick={() => {
                          setActiveTab('advisor');
                          applyPresetPrompt("Simulate the thermal properties of thermal saunas built inside natural dolomite excavation zones.");
                        }}
                        className="w-full text-left p-3 rounded-xl bg-[#fcfaf5] border border-black/5 hover:border-[#d4af37] hover:bg-white transition-all group flex justify-between items-center"
                      >
                        <span className="text-[#1a1a1a] font-medium group-hover:text-[#064e3b]">{t.dolomiteThermal}</span>
                        <ChevronRight className="w-3.5 h-3.5 text-black/30 group-hover:text-black" />
                      </button>

                      <button 
                        onClick={() => {
                          setActiveTab('advisor');
                          applyPresetPrompt("How can we implement Omotenashi anticipatory services into our Botanical Gardens smart lighting circuits?");
                        }}
                        className="w-full text-left p-3 rounded-xl bg-[#fcfaf5] border border-black/5 hover:border-[#d4af37] hover:bg-white transition-all group flex justify-between items-center"
                      >
                        <span className="text-[#1a1a1a] font-medium group-hover:text-[#064e3b]">{t.botanicalSmart}</span>
                        <ChevronRight className="w-3.5 h-3.5 text-black/30 group-hover:text-black" />
                      </button>

                    </div>
                  </div>

                  {/* Recent Activity Log Panel (Artistic Flair specification layout) */}
                  <div className="bg-white rounded-3xl p-6 border border-[#1a1a1a]/5 shadow-sm space-y-4">
                    <h4 className="text-[10px] tracking-widest uppercase text-black/40 font-mono font-bold">{t.systemLog}</h4>
                    
                    <div className="space-y-3.5">
                      <div className="flex items-start space-x-3">
                        <div className="w-2 h-2 rounded-full bg-[#064e3b] mt-1.5 flex-shrink-0 animate-pulse"></div>
                        <p className="text-[11px] leading-relaxed text-black/70">
                          <span className="font-bold text-black">{t.aiCuration}</span> {t.aiCurationText}
                        </p>
                      </div>

                      <div className="flex items-start space-x-3">
                        <div className="w-2 h-2 rounded-full bg-[#d4af37] mt-1.5 flex-shrink-0"></div>
                        <p className="text-[11px] leading-relaxed text-black/70">
                          <span className="font-bold text-black">{t.directorUploaded}</span> {t.directorUploadedText}
                        </p>
                      </div>

                      <div className="flex items-start space-x-3">
                        <div className="w-2 h-2 rounded-full bg-[#1a1a1a]/30 mt-1.5 flex-shrink-0"></div>
                        <p className="text-[11px] leading-relaxed text-black/70">
                          {t.curatorApproved}
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
                  <h2 className="text-3xl font-serif text-brand-dark">{t.biophilicGraph}</h2>
                  <p className="text-sm text-black/50">{t.constructRules}</p>
                </div>
                
                {/* Search / Filter status */}
                <div className="bg-white border border-[#1a1a1a]/5 px-4 py-2 rounded-xl text-xs font-mono text-black/60 flex items-center gap-2">
                  <Filter className="w-3.5 h-3.5 text-[#d4af37]" />
                  <span>{t.showingVariables.replace('{count}', filteredNodes.length.toString())}</span>
                </div>
              </div>

              {/* Graphic Layout Grid */}
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
                
                {/* Visual SVG Core Connector Map - Left */}
                <div className="lg:col-span-8 bg-white border border-[#1a1a1a]/5 rounded-3xl p-6 shadow-sm flex flex-col justify-between min-h-[460px]">
                  <div className="flex justify-between items-center border-b border-black/5 pb-4">
                    <span className="text-xs uppercase font-mono tracking-wider opacity-50">{t.gridCanvas}</span>
                    <span className="text-[10px] bg-[#064e3b]/10 text-[#064e3b] px-2.5 py-1 rounded-full font-bold">{t.interactiveModel}</span>
                  </div>

                  {/* SVG Canvas Map */}
                  <div className="flex-1 min-h-[300px] relative bg-[#fcfaf5]/40 rounded-2xl overflow-hidden flex items-center justify-center my-4 border border-black/5">
                    
                    {/* SVG Connections drawing dynamically */}
                    <svg className="absolute inset-0 w-full h-full" xmlns="http://www.w3.org/2000/svg">
                      {GRAPH_CONNECTIONS.map((c, i) => {
                        const sNode = localizedNodes.find(n => n.id === c.source);
                        const tNode = localizedNodes.find(n => n.id === c.target);
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
                    {localizedNodes.map(node => {
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
                  {localizedSelectedNode ? (
                    <div className="bg-white border border-[#1a1a1a]/5 rounded-3xl p-6 shadow-sm space-y-6">
                      <div className="flex justify-between items-center border-b border-black/5 pb-4">
                        <span className="text-[10px] tracking-widest uppercase font-mono bg-[#d4af37]/15 text-[#1a1a1a] px-3 py-1 rounded-full font-bold">
                          {localizedSelectedNode.category}
                        </span>
                        <div className="text-right">
                          <div className="text-[9px] uppercase font-mono opacity-40">{t.impactMetrics}</div>
                          <div className="text-xl font-serif text-[#064e3b] font-bold">{localizedSelectedNode.impactScore}/100</div>
                        </div>
                      </div>

                      <div className="space-y-3">
                        <h3 className="font-serif text-2xl text-brand-dark">{localizedSelectedNode.name}</h3>
                        <p className="text-xs text-black/55 leading-relaxed font-sans">{localizedSelectedNode.description}</p>
                      </div>

                      {localizedSelectedNode.imageUrl && (
                        <div className="h-36 rounded-2xl overflow-hidden border border-black/5">
                          <img 
                            src={localizedSelectedNode.imageUrl} 
                            alt={localizedSelectedNode.name} 
                            referrerPolicy="no-referrer"
                            className="w-full h-full object-cover" 
                          />
                        </div>
                      )}

                      <div className="space-y-3 bg-[#fcfaf5] p-4 rounded-2xl border border-black/5">
                        <h4 className="text-xs uppercase tracking-widest text-[#d4af37] font-mono font-bold">{t.conceptPrinciples}</h4>
                        <p className="text-[11px] text-[#1a1a1a] leading-relaxed font-serif italic">"{localizedSelectedNode.content}"</p>
                      </div>

                      <div className="space-y-2.5">
                        <div className="text-[10px] uppercase font-mono tracking-wider text-black/40">{t.associatedTags}</div>
                        <div className="flex flex-wrap gap-1.5">
                          {localizedSelectedNode.relatedConcepts.map((tag, i) => (
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
                            applyPresetPrompt(`Detail the architectural construction parameters regarding our knowledge component: "${localizedSelectedNode.name}" and provide the chemical or structural specifications needed.`);
                          }}
                          className="w-full py-3 bg-[#1a1a1a] text-[#d4af37] rounded-xl text-xs font-bold uppercase tracking-widest hover:bg-[#d4af37] hover:text-[#1a1a1a] transition-all flex items-center justify-center gap-2"
                        >
                          <Bot className="w-4 h-4" />
                          {t.consultAdvisor}
                        </button>
                      </div>
                    </div>
                  ) : (
                    <div className="bg-white border border-[#1a1a1a]/5 rounded-3xl p-6 shadow-sm text-center py-16 text-black/40">
                      <HelpCircle className="w-12 h-12 mx-auto stroke-1 text-[#d4af37] mb-3" />
                      <p className="text-sm">{t.selectNodeHelp}</p>
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
                <h2 className="text-3xl font-serif text-brand-dark">{t.academy}</h2>
                <p className="text-sm text-black/50">High-end design courses, masterclass blueprints, and instant AI quizzes.</p>
              </div>

              {/* Course Catalog Grid */}
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
                
                {/* Available Courses list - Left */}
                <div className="lg:col-span-4 space-y-4">
                  <div className="text-xs uppercase font-mono tracking-widest text-[#d4af37] font-semibold mb-2">{t.availableMasterclasses}</div>
                  
                  {localizedCourses.map(course => {
                    const isSelected = localizedSelectedCourse.id === course.id;
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
                            <span>{t.completeness}</span>
                            <span>{course.progress}%</span>
                          </div>
                          <div className="h-1 bg-black/5 rounded-full overflow-hidden">
                            <div className="h-full bg-[#064e3b]" style={{ width: `${course.progress}%` }}></div>
                          </div>
                          <div className="text-[10px] text-black/40 pt-2 flex justify-between">
                            <span>{t.instructor}: {course.instructor}</span>
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
                      <span className="text-[10px] tracking-widest font-mono text-black/40 uppercase">{t.courseReader}</span>
                      <h3 className="font-serif text-2xl text-brand-dark">{localizedSelectedCourse.title}</h3>
                    </div>
                    
                    {/* Lesson toggle select list */}
                    <div className="flex gap-1 bg-[#fcfaf5] p-1 rounded-xl border border-black/5">
                      {localizedSelectedCourse.lessons.map((lesson, index) => {
                        const isActive = localizedActiveLesson.id === lesson.id;
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
                      <span>{t.duration}: {localizedActiveLesson.duration}</span>
                      <span>•</span>
                      <span className="text-[#064e3b] font-bold">Curated learning curriculum</span>
                    </div>

                    <h4 className="text-xl font-serif leading-none italic">{localizedActiveLesson.title}</h4>
                    <p className="text-sm font-sans text-brand-dark leading-relaxed font-light whitespace-pre-line bg-[#fcfaf5] p-6 rounded-2xl border border-black/5">
                      {localizedActiveLesson.content}
                    </p>
                  </div>

                  {/* Active AI Quiz Interactive Widget */}
                  {localizedActiveLesson.quiz && (
                    <div className="border-t border-black/5 pt-6 space-y-4">
                      
                      <div className="flex items-center space-x-2 bg-[#d4af37]/10 px-4 py-2 rounded-xl border border-[#d4af37]/20">
                        <Sparkles className="w-4 h-4 text-[#d4af37] animate-pulse" />
                        <span className="text-xs font-serif font-semibold text-[#1a1a1a]">{t.immediateQuiz}</span>
                      </div>

                      <div className="bg-[#fcfaf5] border border-black/5 p-6 rounded-2xl space-y-4">
                        <p className="text-sm font-serif font-medium leading-relaxed">{localizedActiveLesson.quiz.question}</p>
                        
                        <div className="space-y-2">
                          {localizedActiveLesson.quiz.options.map((option, idx) => {
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
                              {t.submitVerification}
                            </button>
                          </div>
                        )}

                        {/* Quiz result screen */}
                        {quizSubmitted && (
                          <div className={`p-4 rounded-xl border space-y-2 animate-fade-in ${
                            quizAnswer === localizedActiveLesson.quiz.correctAnswer 
                              ? 'bg-[#064e3b]/5 border-[#064e3b]/30 text-[#064e3b]' 
                              : 'bg-red-50 border-red-200 text-red-700'
                          }`}>
                            <div className="font-bold flex items-center gap-1.5 text-xs font-serif">
                              {quizAnswer === localizedActiveLesson.quiz.correctAnswer ? (
                                <>
                                  <CheckCircle2 className="w-4 h-4 text-[#064e3b] animate-bounce" />
                                  {t.conceptMastered}
                                </>
                              ) : (
                                <>
                                  <AlertCircle className="w-4 h-4 text-red-600" />
                                  {t.analysisDivergence}
                                </>
                              )}
                            </div>
                            <p className="text-xs">{localizedActiveLesson.quiz.explanation}</p>
                            
                            <div className="pt-2 flex justify-end gap-2 text-xs font-sans">
                              <button 
                                onClick={() => {
                                  setQuizAnswer(null);
                                  setQuizSubmitted(false);
                                }}
                                className="px-3.5 py-1.5 text-black border border-black/5 bg-white hover:bg-[#fcfaf5] rounded font-medium"
                              >
                                {t.retryQuiz}
                              </button>
                              
                              {localizedSelectedCourse.lessons.findIndex(l => l.id === localizedActiveLesson.id) < localizedSelectedCourse.lessons.length - 1 && (
                                <button 
                                  onClick={nextLesson}
                                  className="px-3.5 py-1.5 bg-[#d4af37] text-black font-bold uppercase tracking-wider rounded text-[10px]"
                                >
                                  {t.nextModule}
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
                      <span>{t.credentialsWarning}</span>
                    </div>
                    {localizedSelectedCourse.progress === 100 && (
                      <div className="bg-[#064e3b] text-white px-3 py-1.5 rounded font-serif italic flex items-center gap-1">
                        {t.credentialsUnlocked}
                      </div>
                    )}
                  </div>

                </div>

              </div>
            </div>
          )}

          {/* VIEW C2: MANAGEMENT ACADEMY (Académie de gestion) */}
          {activeTab === 'academy_mgmt' && (
            <div className="space-y-8 animate-fade-in">
              <div className="border-b border-black/5 pb-4">
                <h2 className="text-3xl font-serif text-brand-dark">{lang === 'zh' ? '管理学院' : lang === 'fr' ? 'Académie de gestion' : 'Management Academy'}</h2>
                <p className="text-sm text-black/50">{lang === 'zh' ? '高端酒店运营课程，全面合规性与策略蓝图' : lang === 'fr' ? 'Cours de gestion haut de gamme, conformité réglementaire et stratégies hôtelières.' : 'High-end hospitality operations, compliance blueprints, and tactical checklists.'}</p>
              </div>

              {/* Course Catalog Grid */}
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
                
                {/* Available Courses list - Left */}
                <div className="lg:col-span-4 space-y-4">
                  <div className="text-xs uppercase font-mono tracking-widest text-[#d4af37] font-semibold mb-2">{lang === 'zh' ? '管理特训大纲' : lang === 'fr' ? 'Cursus de Gestion Dispos' : 'Management Curriculums'}</div>
                  
                  {localizedCoursesMgmt.map(course => {
                    const isSelected = localizedSelectedCourseMgmt.id === course.id;
                    return (
                      <div 
                        key={course.id}
                        onClick={() => {
                          setSelectedCourseMgmt(course);
                          setActiveLessonMgmt(course.lessons[0]);
                          setQuizAnswerMgmt(null);
                          setQuizSubmittedMgmt(false);
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
                            <span>{t.completeness}</span>
                            <span>{course.progress}%</span>
                          </div>
                          <div className="h-1 bg-black/5 rounded-full overflow-hidden">
                            <div className="h-full bg-[#1e293b]" style={{ width: `${course.progress}%` }}></div>
                          </div>
                          <div className="text-[10px] text-black/40 pt-2 flex justify-between">
                            <span>{t.instructor}: {course.instructor}</span>
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
                      <span className="text-[10px] tracking-widest font-mono text-black/45 uppercase">{lang === 'zh' ? '管理读本' : lang === 'fr' ? 'Lecteur du cours' : 'Course Reader'}</span>
                      <h3 className="font-serif text-2xl text-brand-dark">{localizedSelectedCourseMgmt.title}</h3>
                    </div>
                    
                    {/* Lesson toggle select list */}
                    <div className="flex gap-1 bg-[#fcfaf5] p-1 rounded-xl border border-black/5">
                      {localizedSelectedCourseMgmt.lessons.map((lesson, index) => {
                        const isActive = localizedActiveLessonMgmt.id === lesson.id;
                        return (
                          <button
                            key={lesson.id}
                            onClick={() => {
                              setActiveLessonMgmt(lesson);
                              setQuizAnswerMgmt(null);
                              setQuizSubmittedMgmt(false);
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
                      <span>{t.duration}: {localizedActiveLessonMgmt.duration}</span>
                      <span>•</span>
                      <span className="text-[#064e3b] font-bold">{lang === 'zh' ? '营运智慧课程' : lang === 'fr' ? 'Plan d\'études opérationnelles' : 'Operations Management Curriculum'}</span>
                    </div>

                    <h4 className="text-xl font-serif leading-none italic">{localizedActiveLessonMgmt.title}</h4>
                    <p className="text-sm font-sans text-brand-dark leading-relaxed font-light whitespace-pre-line bg-[#fcfaf5] p-6 rounded-2xl border border-black/5">
                      {localizedActiveLessonMgmt.content}
                    </p>
                  </div>

                  {/* Active AI Quiz Interactive Widget */}
                  {localizedActiveLessonMgmt.quiz && (
                    <div className="border-t border-black/5 pt-6 space-y-4">
                      
                      <div className="flex items-center space-x-2 bg-[#d4af37]/10 px-4 py-2 rounded-xl border border-[#d4af37]/20">
                        <Sparkles className="w-4 h-4 text-[#d4af37] animate-pulse" />
                        <span className="text-xs font-serif font-semibold text-[#1a1a1a]">{lang === 'zh' ? '即时管理合规度评估' : lang === 'fr' ? 'Évaluation immédiate' : 'Immediate Management Assessment'}</span>
                      </div>

                      <div className="bg-[#fcfaf5] border border-black/5 p-6 rounded-2xl space-y-4">
                        <p className="text-sm font-serif font-medium leading-relaxed">{localizedActiveLessonMgmt.quiz.question}</p>
                        
                        <div className="space-y-2">
                          {localizedActiveLessonMgmt.quiz.options.map((option, idx) => {
                            const isSelected = quizAnswerMgmt === idx;
                            return (
                              <button
                                key={idx}
                                disabled={quizSubmittedMgmt}
                                onClick={() => handleQuizAnswerMgmt(idx)}
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

                        {quizAnswerMgmt !== null && !quizSubmittedMgmt && (
                          <div className="flex justify-end pt-2">
                            <button 
                              onClick={submitQuizMgmt}
                              className="px-6 py-2.5 bg-[#064e3b] text-white rounded-lg text-xs font-bold uppercase tracking-widest hover:bg-[#1a1a1a] transition-all"
                            >
                              {t.submitVerification}
                            </button>
                          </div>
                        )}

                        {/* Quiz result screen */}
                        {quizSubmittedMgmt && (
                          <div className={`p-4 rounded-xl border space-y-2 animate-fade-in ${
                            quizAnswerMgmt === localizedActiveLessonMgmt.quiz.correctAnswer 
                              ? 'bg-[#064e3b]/5 border-[#064e3b]/30 text-[#064e3b]' 
                              : 'bg-red-50 border-red-200 text-red-700'
                          }`}>
                            <div className="font-bold flex items-center gap-1.5 text-xs font-serif">
                              {quizAnswerMgmt === localizedActiveLessonMgmt.quiz.correctAnswer ? (
                                <>
                                  <CheckCircle2 className="w-4 h-4 text-[#064e3b] animate-bounce" />
                                  {lang === 'zh' ? '管理概念已学成' : lang === 'fr' ? 'Concept de gestion maîtrisé' : 'Management Concept Mastered'}
                                </>
                              ) : (
                                <>
                                  <AlertCircle className="w-4 h-4 text-red-600" />
                                  {t.analysisDivergence}
                                </>
                              )}
                            </div>
                            <p className="text-xs">{localizedActiveLessonMgmt.quiz.explanation}</p>
                            
                            <div className="pt-2 flex justify-end gap-2 text-xs font-sans">
                              <button 
                                onClick={() => {
                                  setQuizAnswerMgmt(null);
                                  setQuizSubmittedMgmt(false);
                                }}
                                className="px-3.5 py-1.5 text-black border border-black/5 bg-white hover:bg-[#fcfaf5] rounded font-medium"
                              >
                                {t.retryQuiz}
                              </button>
                              
                              {localizedSelectedCourseMgmt.lessons.findIndex(l => l.id === localizedActiveLessonMgmt.id) < localizedSelectedCourseMgmt.lessons.length - 1 && (
                                <button 
                                  onClick={nextLessonMgmt}
                                  className="px-3.5 py-1.5 bg-[#d4af37] text-black font-bold uppercase tracking-wider rounded text-[10px]"
                                >
                                  {t.nextModule}
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
                      <span>{lang === 'zh' ? '取得 Elysora 企业运营战略资格证明。' : lang === 'fr' ? 'Complétez ce module pour obtenir la certification légale Elysora.' : 'Earn credentials for compliance & corporate intelligence.'}</span>
                    </div>
                    {localizedSelectedCourseMgmt.progress === 100 && (
                      <div className="bg-[#064e3b] text-white px-3 py-1.5 rounded font-serif italic flex items-center gap-1">
                        {lang === 'zh' ? '经营勋章已开启' : lang === 'fr' ? 'Certificat de gestion activé' : 'Management Credentials Unlocked'}
                      </div>
                    )}
                  </div>

                </div>

              </div>
            </div>
          )}

          {/* VIEW D2: MANAGEMENT GALLERY (Galerie de gestion, identical/inspired by design gallery) */}
          {activeTab === 'gallery_mgmt' && (
            <div className="space-y-8 animate-fade-in">
              <div className="border-b border-black/5 pb-4">
                <h2 className="text-3xl font-serif text-brand-dark">{lang === 'zh' ? '管理画廊与资产库' : lang === 'fr' ? 'Galerie de gestion hôtelière' : 'Hospitality Management Gallery'}</h2>
                <p className="text-sm text-black/50">{lang === 'zh' ? '运营管理标准说明、财务审计数据与合规性资产库。' : lang === 'fr' ? 'Blueprints opérationnels, audits de conformité, rapports financiers et photos d\'inspiration.' : 'Operations logs, financial spreadsheets, safety approvals, and concept notes.'}</p>
              </div>

              {/* Upload Drop Zone Simulators */}
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
                
                {/* File Drop & Control side - Left */}
                <div className="lg:col-span-4 space-y-6">
                  
                  {/* Drag and Drop Zone */}
                  <div 
                    onDragOver={handleDragOverMgmt}
                    onDragLeave={handleDragLeaveMgmt}
                    onDrop={handleDropMgmt}
                    className={`border-2 border-dashed rounded-3xl p-8 py-12 text-center transition-all cursor-pointer flex flex-col justify-center items-center ${
                      isDraggingMgmt 
                        ? 'border-[#d4af37] bg-[#d4af37]/5 scale-[0.98]' 
                        : 'border-[#1a1a1a]/15 bg-white hover:border-[#d4af37]/60'
                    }`}
                    onClick={() => fileInputRefMgmt.current?.click()}
                  >
                    <input 
                      type="file" 
                      ref={fileInputRefMgmt}
                      onChange={handleFileSelectMgmt}
                      className="hidden" 
                      accept=".png,.jpg,.jpeg,.pdf,.dwg,.xlsx,.xls,.doc,.docx,.csv"
                    />
                    <Upload className="w-10 h-10 text-[#d4af37] mb-4 stroke-1" />
                    <h4 className="text-sm font-serif font-medium text-[#1a1a1a]">Import New Concept Asset</h4>
                    <p className="text-xs text-black/40 mt-1 max-w-xs justify-center leading-relaxed font-sans">
                      {lang === 'zh' ? '拖拽审计电子表格、可行性方案或直接点击以选择文件 (Excel, PDF, JPG)。' : lang === 'fr' ? 'Faites glisser des rapports, photos de conformité ou cliquez pour charger (.XLSX, .PDF, .PNG).' : 'Drag financial reports, compliance photos or click to upload (.XLSX, .PDF, .PNG).'}
                    </p>
                    <span className="mt-4 px-3 py-1 bg-black/5 rounded-full text-[10px] uppercase font-mono tracking-wider text-black/50">
                      Auto-registers with AI Advisor
                    </span>
                  </div>

                  {/* Asset list filter details */}
                  <div className="bg-white border border-[#1a1a1a]/5 rounded-3xl p-6 space-y-4">
                    <h5 className="text-[10px] uppercase font-mono tracking-widest text-[#d4af37] font-bold">{lang === 'zh' ? '管理库类别分布' : lang === 'fr' ? 'Actifs par catégorie' : 'Category Distribution'}</h5>
                    <div className="space-y-2 text-xs">
                      <div className="flex justify-between border-b border-black/5 pb-1">
                        <span>{lang === 'zh' ? '运营审计手册' : lang === 'fr' ? 'Manuels d\'Opérations' : 'Operations (SOP)'}</span>
                        <span className="font-mono">{galleryMgmt.filter(g => g.category === 'operations').length}</span>
                      </div>
                      <div className="flex justify-between border-b border-black/5 pb-1">
                        <span>{lang === 'zh' ? '战略规划材料' : lang === 'fr' ? 'Planifications & Stratégies' : 'Planning Studies'}</span>
                        <span className="font-mono">{galleryMgmt.filter(g => g.category === 'planning').length}</span>
                      </div>
                    </div>
                  </div>

                </div>

                {/* Render Grid Assets - Right */}
                <div className="lg:col-span-8 space-y-4">
                  <div className="text-xs uppercase font-mono tracking-widest text-black/40 mb-2">{lang === 'zh' ? '战略资产浏览网格' : lang === 'fr' ? 'Grille d\'Inspirations de Gestion' : 'Strategic Compliance Asset Grid'}</div>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {localizedGalleryMgmt.map(asset => {
                      const isPdfOrSheet = asset.imageUrl.includes('photo-1450133064473');
                      const isCalculator = asset.id === 'gal-mgmt-5';
                      return (
                        <div key={asset.id} className="bg-white border border-black/5 rounded-3xl overflow-hidden shadow-sm hover:border-[#d4af37]/50 transition-all flex flex-col group">
                          
                          <div 
                            onClick={() => setSelectedMgmtAsset(asset)}
                            className="h-56 relative overflow-hidden bg-[#1a1a1a] border-b border-black/10 cursor-pointer"
                          >
                            <img 
                              src={asset.imageUrl} 
                              alt={asset.name} 
                              referrerPolicy="no-referrer"
                              className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" 
                            />
                            <span className="absolute top-4 left-4 text-[9px] tracking-widest uppercase font-mono bg-[#1a1a1a] text-[#d4af37] px-2.5 py-1 rounded-full border border-[#d4af37]/30">
                              {asset.category}
                            </span>
                            {isCalculator && (
                              <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center backdrop-blur-sm">
                                <span className="bg-white text-black px-4 py-2 rounded-xl text-xs font-serif font-semibold shadow-xl flex items-center gap-1.5 animate-pulse">
                                  <Calculator className="w-4 h-4 text-[#d4af37]" />
                                  {lang === 'zh' ? '开启独立计算测算舱' : lang === 'fr' ? 'Ouvrir l\'étude interactive' : 'Open Interactive Study'}
                                </span>
                              </div>
                            )}
                          </div>

                          <div className="p-6 space-y-4 flex-1 flex flex-col justify-between">
                            <div className="space-y-1">
                              <h4 
                                onClick={() => setSelectedMgmtAsset(asset)}
                                className="font-serif text-lg font-medium text-[#1a1a1a] hover:text-[#d4af37] transition-colors leading-tight cursor-pointer"
                              >
                                {asset.name}
                              </h4>
                              <p className="text-xs text-black/40 font-mono italic">
                                {isCalculator 
                                  ? (lang === 'zh' ? '交互式财务收益测算工具' : lang === 'fr' ? 'Modèle financier interactif' : 'Interactive Yield Study')
                                  : isPdfOrSheet 
                                    ? 'Corporate Audit Document' 
                                    : 'Inspiration Concept Asset'
                                }
                              </p>
                            </div>

                            <div className="space-y-3">
                              <div className="flex flex-wrap gap-1">
                                {asset.tags.map((tag, i) => (
                                  <span key={i} className="text-[9px] font-mono px-2 py-0.5 bg-black/5 rounded-full border border-black/5">
                                    {tag}
                                  </span>
                                ))}
                              </div>

                              <div className="flex flex-col gap-2">
                                {isCalculator && (
                                  <button 
                                    onClick={() => setSelectedMgmtAsset(asset)}
                                    className="w-full py-2.5 bg-[#d4af37] text-black rounded-xl text-xs font-serif font-bold hover:bg-[#1a1a1a] hover:text-[#d4af37] transition-all flex items-center justify-center gap-1.5 shadow-sm"
                                  >
                                    <Calculator className="w-3.5 h-3.5" />
                                    {lang === 'zh' ? '开启测算与学习舱' : lang === 'fr' ? 'Ouvrir le simulateur & la leçon' : 'Open Simulator & Study'}
                                  </button>
                                )}

                                <button 
                                  onClick={() => {
                                    setActiveTab('advisor');
                                    applyPresetPrompt(`Evaluate the operational parameters and statutory risk elements for the management asset in our archive: "${asset.name}" categorized under: "${asset.category}". Provide structured feedback on audit resilience and compliance.`);
                                  }}
                                  className="w-full py-2 bg-[#fcfaf5] border border-black/10 hover:border-[#d4af37] rounded-xl text-xs font-serif font-medium text-[#1a1a1a] hover:bg-white transition-all flex items-center justify-center gap-1.5"
                                >
                                  <Bot className="w-3.5 h-3.5 text-black/40" />
                                  Inspect with AI Advisor
                                </button>
                              </div>
                            </div>
                          </div>

                        </div>
                      );
                    })}
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
                    {localizedGallery.map(asset => (
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
                  <h2 className="text-3xl font-serif text-brand-dark">{t.hotelProjects}</h2>
                  <p className="text-sm text-black/50">Coordinate luxury construction variables across Swiss suites and botanical developments.</p>
                </div>

                {/* Project Selector tabs */}
                <div className="flex gap-1.5 bg-[#1a1a1a] p-1.5 rounded-2xl border border-[#d4af37]/20 select-none">
                  {localizedProjects.map(proj => (
                    <button 
                      key={proj.id}
                      onClick={() => setSelectedProject(proj)}
                      className={`px-4 py-2 rounded-xl text-xs font-serif transition-all ${
                        localizedSelectedProject.id === proj.id 
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
                  <h3 className="font-serif text-3xl font-semibold leading-snug">{localizedSelectedProject.name}</h3>
                  <p className="text-xs text-white/70 max-w-xl font-sans leading-relaxed">{localizedSelectedProject.description}</p>
                </div>
                
                <div className="md:col-span-4 bg-black/20 p-6 rounded-2xl border border-white/10 flex flex-col justify-between">
                  <div className="flex justify-between text-xs font-mono">
                    <span className="opacity-65">Curated Budget Portfolio:</span>
                    <span className="font-bold text-[#d4af37]">{localizedSelectedProject.budget}</span>
                  </div>
                  <div className="mt-4 space-y-2">
                    <div className="flex justify-between text-xs font-mono">
                      <span>Tasks completion metrics</span>
                      <span>{localizedSelectedProject.completedTasksCount}/{localizedSelectedProject.tasksCount} Done</span>
                    </div>
                    <div className="h-1.5 bg-white/15 rounded-full overflow-hidden">
                      <div 
                        className="h-full bg-[#d4af37]" 
                        style={{ width: `${localizedSelectedProject.tasksCount > 0 ? (localizedSelectedProject.completedTasksCount / localizedSelectedProject.tasksCount) * 100 : 0}%` }}
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
                    <div className="flex items-center gap-2 flex-wrap">
                      <div className="w-2.5 h-2.5 bg-[#064e3b] rounded-full animate-ping"></div>
                      <span className="text-xs font-mono font-bold uppercase tracking-widest text-black/70">Intellectual Server Pathway</span>
                      {loadedDraftId && (
                        <span className="bg-[#d4af37]/15 text-[#1a1a1a] border border-[#d4af37]/30 text-[9px] px-2 py-0.5 rounded-full font-mono uppercase font-bold animate-pulse">
                          {t.activeChatLabel}: {draftLogs.find(d => d.id === loadedDraftId)?.title || 'Draft'}
                        </span>
                      )}
                    </div>
                    <div className="flex items-center gap-3">
                      <button 
                        onClick={handleNewChat}
                        className="text-[10px] text-[#064e3b] font-semibold hover:underline flex items-center gap-1 cursor-pointer"
                      >
                        <span>+</span> {lang === 'zh' ? '新建会话' : lang === 'fr' ? 'Nouveau' : 'New Session'}
                      </button>
                      <button onClick={() => setChatHistory([])} className="text-[10px] text-red-500 hover:underline cursor-pointer">Clear Consultation Logs</button>
                    </div>
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

                  {/* Saved Consultation Drafts */}
                  <div id="saved-drafts-card" className="bg-white border border-[#1a1a1a]/5 rounded-3xl p-6 shadow-sm space-y-4">
                    <div className="flex items-center justify-between border-b border-black/5 pb-2">
                      <div className="flex items-center gap-2 text-[10px] uppercase font-mono tracking-widest text-[#d4af37] font-bold">
                        <History className="w-4 h-4 text-[#d4af37]" />
                        <span>{t.draftsSidebarTitle}</span>
                      </div>
                      {loadedDraftId && (
                        <button 
                          onClick={handleNewChat}
                          className="text-[9px] uppercase font-mono text-black/40 hover:text-black hover:underline cursor-pointer"
                        >
                          {lang === 'zh' ? '重置' : lang === 'fr' ? 'Réinitialiser' : 'Reset'}
                        </button>
                      )}
                    </div>
                    
                    {/* Form to Name and Save Current Chat */}
                    <form onSubmit={(e) => { e.preventDefault(); handleSaveDraft(); }} className="space-y-2">
                      <label className="text-[9px] uppercase font-mono opacity-50 block mb-1">
                        {loadedDraftId ? (lang === 'zh' ? '更新草稿名称' : lang === 'fr' ? 'Modifier le titre' : 'Update Draft Title') : (lang === 'zh' ? '保存当前会话为草稿' : lang === 'fr' ? 'Sauvegarder en brouillon' : 'Save Current Session as Draft')}
                      </label>
                      <div className="flex gap-2">
                        <input 
                          type="text" 
                          placeholder={t.draftNamePlaceholder}
                          value={draftTitle}
                          onChange={(e) => setDraftTitle(e.target.value)}
                          className="flex-1 text-xs p-2.5 bg-[#fcfaf5] border border-black/5 rounded-xl outline-none placeholder:text-black/30"
                        />
                        <button 
                          type="submit"
                          disabled={chatHistory.length <= 1}
                          className={`px-3 bg-[#064e3b] text-white rounded-xl text-xs font-bold transition-all flex items-center justify-center gap-1.5 cursor-pointer ${chatHistory.length <= 1 ? 'opacity-40 cursor-not-allowed' : 'hover:bg-[#d4af37] hover:text-[#1a1a1a]'}`}
                          title="Save Draft Log"
                        >
                          <Save className="w-3.5 h-3.5" />
                        </button>
                      </div>
                      {chatHistory.length <= 1 && (
                        <p className="text-[9px] text-black/30 font-mono italic">
                          {lang === 'zh' ? '开启对话后方可保存草稿。' : lang === 'fr' ? 'Commencez une discussion pour sauvegarder.' : 'Start a conversation to save a draft.'}
                        </p>
                      )}
                    </form>

                    <div className="space-y-2 max-h-48 overflow-y-auto pr-1">
                      {draftLogs.length === 0 ? (
                        <div className="text-center py-6 text-black/30 text-xs italic">
                          {t.noDraftsYet}
                        </div>
                      ) : (
                        draftLogs.map((draft) => {
                          const isActive = draft.id === loadedDraftId;
                          return (
                            <div 
                              key={draft.id}
                              onClick={() => handleLoadDraft(draft)}
                              className={`p-3 rounded-xl border transition-all text-left cursor-pointer group flex items-center justify-between ${
                                isActive 
                                  ? 'bg-[#064e3b]/5 border-[#064e3b]/30' 
                                  : 'bg-[#fcfaf5] border-black/5 hover:border-[#d4af37]'
                              }`}
                            >
                              <div className="flex-1 min-w-0 pr-2">
                                <div className="flex items-center gap-1.5 justify-start">
                                  {isActive && <div className="w-1.5 h-1.5 bg-[#064e3b] rounded-full animate-pulse flex-shrink-0" />}
                                  <h4 className={`text-xs font-serif font-bold truncate ${isActive ? 'text-[#064e3b]' : 'text-[#1a1a1a]'}`}>
                                    {draft.title}
                                  </h4>
                                </div>
                                <div className="flex items-center gap-2 text-[9px] text-black/40 font-mono mt-0.5">
                                  <span>{draft.timestamp}</span>
                                  <span>•</span>
                                  <span>{draft.messages.length} msgs</span>
                                </div>
                              </div>
                              <div className="flex items-center gap-1 opacity-60 group-hover:opacity-100 transition-all">
                                <button
                                  onClick={(e) => {
                                    e.stopPropagation();
                                    handleLoadDraft(draft);
                                  }}
                                  className={`px-1.5 py-0.5 text-[9px] font-mono rounded ${isActive ? 'bg-[#064e3b] text-white font-semibold' : 'bg-black/5 hover:bg-[#d4af37] text-black hover:text-[#1a1a1a]'}`}
                                >
                                  {t.loadDraftBtn}
                                </button>
                                <button
                                  onClick={(e) => handleDeleteDraft(draft.id, e)}
                                  className="p-1 hover:text-red-500 hover:bg-red-50 rounded transition-all cursor-pointer"
                                  title="Delete Draft"
                                >
                                  <Trash2 className="w-3 h-3" />
                                </button>
                              </div>
                            </div>
                          );
                        })
                      )}
                    </div>
                  </div>

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

        {/* MANAGEMENT GALLERY LIGHTBOX / INTERACTIVE MODAL */}
        {selectedMgmtAsset && (
          <div className="fixed inset-0 z-50 overflow-y-auto flex items-center justify-center p-4 bg-black/60 backdrop-blur-md animate-fade-in">
            <div className={`bg-white rounded-3xl overflow-hidden shadow-2xl max-w-5xl w-full border border-black/5 flex flex-col md:max-h-[90vh] ${selectedMgmtAsset.id === 'gal-mgmt-5' ? 'h-[85vh]' : ''}`}>
              
              {/* Header */}
              <div className="flex justify-between items-center bg-[#1a1a1a] text-white p-6 border-b border-white/5">
                <div className="flex items-center space-x-3">
                  <div className="p-2.5 bg-[#d4af37]/10 rounded-xl border border-[#d4af37]/30 font-mono">
                    <Briefcase className="w-5 h-5 text-[#d4af37]" />
                  </div>
                  <div>
                    <span className="text-[10px] tracking-widest font-mono text-white/50 uppercase">{selectedMgmtAsset.category}</span>
                    <h3 className="font-serif text-lg leading-tight text-[#d4af37]">{selectedMgmtAsset.name}</h3>
                  </div>
                </div>
                
                <button 
                  onClick={() => setSelectedMgmtAsset(null)}
                  className="p-2 hover:bg-white/10 rounded-xl transition-all text-white/70 hover:text-white"
                >
                  <span className="text-2xl font-light">&times;</span>
                </button>
              </div>

              {/* Body */}
              {selectedMgmtAsset.id === 'gal-mgmt-5' ? (
                // HIGH FIDELITY HOTEL REVENUE WORKSHOP MODAL
                <div className="flex-1 overflow-y-auto flex flex-col bg-[#fcfaf5]">
                  
                  {/* Internal tabs picker */}
                  <div className="bg-white border-b border-black/5 px-6 py-3 flex gap-4 text-xs font-serif">
                    <button 
                      onClick={() => setCalcActiveTab('calculator')}
                      className={`pb-2 border-b-2 transition-all font-medium flex items-center gap-1.5 ${calcActiveTab === 'calculator' ? 'border-[#d4af37] text-black' : 'border-transparent text-black/50 hover:text-black'}`}
                    >
                      <Calculator className="w-4 h-4 text-[#d4af37]" />
                      {lang === 'zh' ? '交互智能计算舱' : lang === 'fr' ? 'Simulateur Dynamique' : 'Dynamic Simulator'}
                    </button>
                    <button 
                      onClick={() => setCalcActiveTab('study')}
                      className={`pb-2 border-b-2 transition-all font-medium flex items-center gap-1.5 ${calcActiveTab === 'study' ? 'border-[#d4af37] text-black' : 'border-transparent text-black/50 hover:text-black'}`}
                    >
                      <Award className="w-4 h-4 text-[#d4af37]" />
                      {lang === 'zh' ? '特训精讲读本' : lang === 'fr' ? 'Évaluation & Manuel' : 'Manual & Calculations'}
                    </button>
                  </div>

                  {calcActiveTab === 'calculator' ? (
                    // INTERACTIVE CALCULATOR
                    <div className="p-6 md:p-8 grid grid-cols-1 lg:grid-cols-12 gap-8 flex-1">
                      
                      {/* Left: Input sliders */}
                      <div className="lg:col-span-5 space-y-6 bg-white p-6 rounded-2xl border border-black/5 shadow-sm">
                        <div className="border-b border-black/5 pb-3">
                          <h4 className="font-serif font-semibold text-black flex items-center gap-2">
                            <Coins className="w-5 h-5 text-[#d4af37]" />
                            {lang === 'zh' ? '投资与借贷杠杆参数' : lang === 'fr' ? 'Paramètres d\'Acquisition' : 'Acquisition Parameters'}
                          </h4>
                          <p className="text-[11px] text-black/40 font-sans mt-0.5">{lang === 'zh' ? '调整酒店的实控数据测算最低保底CA' : lang === 'fr' ? 'Modifiez ces variables pour reculer le point mort réel' : 'Move sliders to recalculate required margins'}</p>
                        </div>

                        {/* Slider 1: Hotel Acquisition Price */}
                        <div className="space-y-2">
                          <div className="flex justify-between text-xs">
                            <span className="text-black/70 font-serif">{lang === 'zh' ? '酒店收购价格' : lang === 'fr' ? 'Prix d\'achat de l\'hôtel' : 'Hotel Purchase Price'}</span>
                            <span className="font-mono font-bold text-[#d4af37]">{calcHotelPrice.toLocaleString('fr-FR')} €</span>
                          </div>
                          <input 
                            type="range" 
                            min="500000" 
                            max="8000000" 
                            step="100000"
                            value={calcHotelPrice} 
                            onChange={(e) => {
                              const val = Number(e.target.value);
                              setCalcHotelPrice(val);
                              if (calcEquity > val) setCalcEquity(val);
                            }}
                            className="w-full h-1.5 bg-black/10 rounded-lg appearance-none cursor-pointer accent-[#d4af37]"
                          />
                        </div>

                        {/* Slider 2: Equity Contribution (Apport) */}
                        <div className="space-y-2">
                          <div className="flex justify-between text-xs">
                            <span className="text-black/70 font-serif">{lang === 'zh' ? '首付准备及个人投入' : lang === 'fr' ? 'Votre Apport Personnel' : 'Equity Contribution'}</span>
                            <span className="font-mono font-bold text-[#d4af37]">{calcEquity.toLocaleString('fr-FR')} € ({((calcEquity / calcHotelPrice) * 100).toFixed(0)}%)</span>
                          </div>
                          <input 
                            type="range" 
                            min="100000" 
                            max={calcHotelPrice} 
                            step="5000"
                            value={calcEquity} 
                            onChange={(e) => setCalcEquity(Number(e.target.value))}
                            className="w-full h-1.5 bg-black/10 rounded-lg appearance-none cursor-pointer accent-[#d4af37]"
                          />
                        </div>

                        {/* Computed block: Bank Loan Principal */}
                        <div className="bg-[#fcfaf5] p-3 rounded-xl border border-black/5 flex justify-between items-center text-xs">
                          <span className="text-black/55 font-serif">{lang === 'zh' ? '需借款银行贷款额' : lang === 'fr' ? 'Crédit bancaire requis' : 'Required Bank Credit'}</span>
                          <span className="font-mono font-bold text-black/80">{(calcHotelPrice - calcEquity).toLocaleString('fr-FR')} €</span>
                        </div>

                        {/* Slider 3 & 4 */}
                        <div className="grid grid-cols-2 gap-4">
                          <div className="space-y-2">
                            <div className="flex justify-between text-xs">
                              <span className="text-black/70 font-serif">{lang === 'zh' ? '年利率' : lang === 'fr' ? 'Taux d\'intérêt' : 'Interest Rate'}</span>
                              <span className="font-mono font-bold text-black">{calcInterestRate}%</span>
                            </div>
                            <input 
                              type="range" 
                              min="1.0" 
                              max="8.0" 
                              step="0.1"
                              value={calcInterestRate} 
                              onChange={(e) => setCalcInterestRate(Number(e.target.value))}
                              className="w-full h-1.5 bg-black/10 rounded-lg appearance-none cursor-pointer accent-black"
                            />
                          </div>

                          <div className="space-y-2">
                            <div className="flex justify-between text-xs">
                              <span className="text-black/70 font-serif">{lang === 'zh' ? '借款期限' : lang === 'fr' ? 'Durée (Années)' : 'Term (Years)'}</span>
                              <span className="font-mono font-bold text-black">{calcTermYears} {lang === 'zh' ? '年' : 'ans'}</span>
                            </div>
                            <input 
                              type="range" 
                              min="5" 
                              max="25" 
                              step="1"
                              value={calcTermYears} 
                              onChange={(e) => setCalcTermYears(Number(e.target.value))}
                              className="w-full h-1.5 bg-black/10 rounded-lg appearance-none cursor-pointer accent-black"
                            />
                          </div>
                        </div>

                        {/* Slider 5: Operating Cost Percent */}
                        <div className="space-y-2">
                          <div className="flex justify-between text-xs">
                            <span className="text-black/70 font-serif">{lang === 'zh' ? '运营成本及费用比率' : lang === 'fr' ? 'Charges d\'opération hôtelières' : 'Operating Costs Ratio'}</span>
                            <span className="font-mono font-bold text-[#d4af37]">{calcOperatingCostsPercent}%</span>
                          </div>
                          <input 
                            type="range" 
                            min="40" 
                            max="85" 
                            step="1"
                            value={calcOperatingCostsPercent} 
                            onChange={(e) => setCalcOperatingCostsPercent(Number(e.target.value))}
                            className="w-full h-1.5 bg-black/10 rounded-lg appearance-none cursor-pointer accent-[#d4af37]"
                          />
                          <p className="text-[10px] text-black/40 font-mono">
                            {lang === 'zh' ? '包含人工 (30-40%), 能源与安全 (5-10%), OTA 佣金 (10-20%)' : lang === 'fr' ? 'Rappels : Personnel ~35%, Énergie ~8%, Commissions OTA (Booking) ~15%' : 'Includes Staff ~35%, Power ~8%, OTA commissions ~15%'}
                          </p>
                        </div>

                        {/* Slider 6: Minimum Target Profit */}
                        <div className="space-y-2">
                          <div className="flex justify-between text-xs">
                            <span className="text-black/70 font-serif">{lang === 'zh' ? '期望最低净利润' : lang === 'fr' ? 'Bénéfice Net Cible minimum' : 'Target Min Net profit'}</span>
                            <span className="font-mono font-bold text-emerald-600">{calcMinTargetProfit.toLocaleString('fr-FR')} €</span>
                          </div>
                          <input 
                            type="range" 
                            min="20000" 
                            max="300000" 
                            step="5000"
                            value={calcMinTargetProfit} 
                            onChange={(e) => setCalcMinTargetProfit(Number(e.target.value))}
                            className="w-full h-1.5 bg-black/10 rounded-lg appearance-none cursor-pointer accent-emerald-600"
                          />
                        </div>

                        {/* Reset button */}
                        <div className="pt-2 flex justify-between items-center">
                          <span className="text-[9px] font-mono text-black/30">ELYSORA Leveraged Model</span>
                          <button 
                            onClick={() => {
                              setCalcHotelPrice(2000000);
                              setCalcEquity(600000);
                              setCalcInterestRate(4.5);
                              setCalcTermYears(15);
                              setCalcOperatingCostsPercent(70);
                              setCalcMinTargetProfit(100000);
                            }}
                            className="flex items-center gap-1 text-[11px] font-serif hover:text-[#d4af37] text-black/50 transition-colors"
                          >
                            <RotateCcw className="w-3 h-3" />
                            {lang === 'zh' ? '重置原始2M融资模板' : lang === 'fr' ? 'Réinitialiser le modèle' : 'Reset default scenario'}
                          </button>
                        </div>
                      </div>

                      {/* Right: Dynamic Outputs */}
                      {(() => {
                        const P = calcHotelPrice - calcEquity;
                        const r = (calcInterestRate / 100) / 12;
                        const n = calcTermYears * 12;
                        let monthlyLoanRepayment = 0;
                        if (P > 0) {
                          if (r > 0) {
                            monthlyLoanRepayment = P * (r * Math.pow(1 + r, n)) / (Math.pow(1 + r, n) - 1);
                          } else {
                            monthlyLoanRepayment = P / n;
                          }
                        }
                        const annualDebtService = monthlyLoanRepayment * 12;
                        const totalBaselineToCover = annualDebtService + calcMinTargetProfit;
                        const requiredMinCA = totalBaselineToCover / (1 - (calcOperatingCostsPercent / 100));

                        // Comfort levels
                        const vitalMin = requiredMinCA * 0.95;
                        const goodMin = requiredMinCA * 1.15;
                        const excellentMin = requiredMinCA * 1.45;

                        return (
                          <div className="lg:col-span-7 flex flex-col justify-between space-y-6">
                            
                            {/* Big Revenue Goal Widget */}
                            <div className="bg-[#1e293b] text-white p-6 rounded-3xl border border-slate-700/30 shadow-md relative overflow-hidden flex flex-col justify-between">
                              <div className="absolute -right-12 -bottom-12 opacity-5 select-none pointer-events-none text-white">
                                <Calculator className="w-64 h-64" />
                              </div>

                              <div className="space-y-4">
                                <span className="bg-[#d4af37]/10 text-[#d4af37] px-3 py-1 rounded-full text-[10px] uppercase font-mono tracking-wider border border-[#d4af37]/20 self-start inline-block">
                                  {lang === 'zh' ? '测算：年度最低营业额要求' : lang === 'fr' ? 'CHIFFRE D\'AFFAIRES ANNUEL MINIMUM REQUIS' : 'MINIMUM VIABLE ANNUAL TURNOVER TARGET'}
                                </span>

                                <div className="space-y-1">
                                  <div className="text-4xl md:text-5xl font-mono text-emerald-400 font-bold tracking-tight">
                                    {Math.round(requiredMinCA).toLocaleString('fr-FR')} € / an
                                  </div>
                                  <p className="text-xs text-white/50 max-w-md">
                                    {lang === 'zh' ? '以此营业额，您方可在偿还债务及缴交运营费用的同时完全保障设定的最低净利润。' : lang === 'fr' ? 'À ce niveau de CA, vos charges d\'opérations hôtelières sont payées, la dette est annulée à date et votre bénéfice net est sécurisé' : 'Operating charges paid, active mortgages repaid, and your baseline net gain realized'}
                                  </p>
                                </div>
                              </div>

                              {/* Breakdown Formulas */}
                              <div className="grid grid-cols-2 gap-4 pt-6 mt-6 border-t border-white/10 text-xs">
                                <div>
                                  <span className="text-white/40 font-serif block">{lang === 'zh' ? '月度还银行贷款金' : lang === 'fr' ? 'Échéance mensuelle' : 'Monthly payment'}</span>
                                  <span className="font-mono text-white text-base font-semibold">{Math.round(monthlyLoanRepayment).toLocaleString('fr-FR')} € / mois</span>
                                </div>
                                <div>
                                  <span className="text-white/40 font-serif block">{lang === 'zh' ? '年累计偿还金' : lang === 'fr' ? 'Dette annuelle cumulée' : 'Annual mortgage debt'}</span>
                                  <span className="font-mono text-[#d4af37] text-base font-semibold">{Math.round(annualDebtService).toLocaleString('fr-FR')} € / an</span>
                                </div>
                              </div>
                            </div>

                            {/* Investment Benchmark gauges */}
                            <div className="space-y-3">
                              <h5 className="text-[10px] uppercase tracking-widest font-mono text-black/55 font-bold mb-1">
                                {lang === 'zh' ? '2025年度 运营目标区间指标' : lang === 'fr' ? 'INTERVALLES DE SÉCURITÉ DE L\'INVESTISSEUR' : 'INVESTOR CONFIDENCE SCALES'}
                              </h5>

                              <div className="space-y-2">
                                
                                {/* 1. RED */}
                                <div className="p-3 bg-red-50/50 border border-red-100 rounded-xl flex justify-between items-center">
                                  <div className="flex items-center gap-2">
                                    <div className="w-5 h-5 rounded-full bg-red-100 flex items-center justify-center text-red-600 font-bold text-[10px]">!</div>
                                    <div>
                                      <h6 className="font-serif font-semibold text-red-800 text-[11px]">{lang === 'zh' ? '警戒保底线 (高危)' : lang === 'fr' ? 'Minimum Vital (Risqué)' : 'Critical Lower Bound'}</h6>
                                      <span className="text-[9px] text-black/40 block leading-tight">{lang === 'zh' ? '勉强偿还债务，几乎无任何储备，极度依靠季节性溢价' : lang === 'fr' ? 'Vous remboursez le crédit mais n\'avez presque aucune marge hôtelière' : 'Barely covers operations and debt service'}</span>
                                    </div>
                                  </div>
                                  <span className="font-mono text-xs font-bold text-red-700">{Math.round(vitalMin).toLocaleString('fr-FR')} €</span>
                                </div>

                                {/* 2. YELLOW */}
                                <div className="p-3 bg-yellow-50/50 border border-yellow-200 rounded-xl flex justify-between items-center">
                                  <div className="flex items-center gap-2">
                                    <div className="w-5 h-5 rounded-full bg-yellow-100 flex items-center justify-center text-yellow-600 font-bold text-[10px]">~</div>
                                    <div>
                                      <h6 className="font-serif font-semibold text-yellow-800 text-[11px]">{lang === 'zh' ? '健康平稳区间 (推荐)' : lang === 'fr' ? 'Bon Niveau (Durable)' : 'Balanced Operating Level'}</h6>
                                      <span className="text-[9px] text-black/40 block leading-tight">{lang === 'zh' ? '酒店良性运转，现金流平稳，有良性的流动资金安全余地' : lang === 'fr' ? 'Hôtel stable, bonne rentabilité financière et sécurité accrue' : 'Healthy room yields, robust buffer reserves'}</span>
                                    </div>
                                  </div>
                                  <span className="font-mono text-xs font-bold text-yellow-700">{Math.round(goodMin).toLocaleString('fr-FR')} €</span>
                                </div>

                                {/* 3. GREEN */}
                                <div className="p-3 bg-emerald-50/50 border border-emerald-200 rounded-xl flex justify-between items-center">
                                  <div className="flex items-center gap-2">
                                    <div className="w-5 h-5 rounded-full bg-emerald-100 flex items-center justify-center text-emerald-600 font-bold text-[10px]">★</div>
                                    <div>
                                      <h6 className="font-serif font-semibold text-emerald-800 text-[11px]">{lang === 'zh' ? '黄金表现线 (极佳)' : lang === 'fr' ? 'Excellent hôtelier (Très Confortable)' : 'High Performing Cashflow'}</h6>
                                      <span className="text-[9px] text-black/40 block leading-tight">{lang === 'zh' ? '超强资金流动性，完全有能力进行二次精装修与战略升级' : lang === 'fr' ? 'Excellent cashflow, capacité d\'investir, de rénover et forte revente' : 'Superior ROI, high margin safety, aggressive organic expansions'}</span>
                                    </div>
                                  </div>
                                  <span className="font-mono text-xs font-bold text-emerald-700">{Math.round(excellentMin).toLocaleString('fr-FR')} €</span>
                                </div>

                              </div>
                            </div>

                            {/* Advisory Insight */}
                            <div className="bg-white border border-[#1a1a1a]/5 p-4 rounded-2xl text-[11px] leading-relaxed text-black/60 shadow-sm">
                              <div className="font-bold font-serif text-brand-dark mb-1 flex items-center gap-1">
                                <Sparkles className="w-3.5 h-3.5 text-[#d4af37]" />
                                {lang === 'zh' ? '📝 智能顾问杠杆评估报告：' : lang === 'fr' ? '📝 Diagnostic de viabilité financière' : '📝 Dynamic Yield Diagnostics:'}
                              </div>
                              <p>
                                {lang === 'zh' 
                                  ? `设定年利率 ${calcInterestRate}% 借款 ${(calcHotelPrice - calcEquity).toLocaleString('fr-FR')} € (期限 ${calcTermYears} 年) 意味着每年均负债高达 ${Math.round(annualDebtService).toLocaleString('fr-FR')} €。因为设定运营成本率约为 ${calcOperatingCostsPercent}%，意味着可用于给付债务和支撑纯利的毛盈余配额为 ${100 - calcOperatingCostsPercent}%。建议提升每间夜价格 (ADR) 以缓解资产折现率。` 
                                  : lang === 'fr'
                                    ? `Avec un crédit de ${(calcHotelPrice - calcEquity).toLocaleString('fr-FR')} € indexé à ${calcInterestRate}% sur ${calcTermYears} ans, votre service annuel de dette exige ${Math.round(annualDebtService).toLocaleString('fr-FR')} €. Votre ratio de charges d'opération fixé à ${calcOperatingCostsPercent}% de votre CA laisse ${100 - calcOperatingCostsPercent}% de marge brute pour couvrir votre banque & votre bénéfice souhaité.`
                                    : `Leveraging ${(calcHotelPrice - calcEquity).toLocaleString('fr-FR')} € at ${calcInterestRate}% over ${calcTermYears} years results in an yearly debt obligations of ${Math.round(annualDebtService).toLocaleString('fr-FR')} €. Operating at a ${calcOperatingCostsPercent}% cost margin yields a ${100 - calcOperatingCostsPercent}% residual gross retention rate to satisfy structural debt and target gains.`
                                }
                              </p>
                            </div>

                          </div>
                        );
                      })()}

                    </div>
                  ) : (
                    // L'ÉDUCATION & PRESET STUDY LESSON BOARD
                    <div className="p-6 md:p-8 space-y-6 flex-1 bg-white">
                      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 h-[65vh]">
                        
                        {/* Infographic visualization pane (Left or Top) */}
                        <div className="lg:col-span-5 space-y-4 flex flex-col justify-between">
                          <div>
                            <h4 className="font-serif font-bold text-[#1a1a1a] text-sm uppercase tracking-wider border-b pb-2 mb-2">
                              {lang === 'zh' ? '2025年度 投资收益测算 Infographic 图例' : lang === 'fr' ? 'Modèle Infographique de Référence' : 'Static Compliance Infographic Reference'}
                            </h4>
                            <p className="text-xs text-black/40 leading-relaxed mb-4">
                              {lang === 'zh' ? '此为2M欧元酒店并购案模型经典拓扑结构，已注册进入 ELYSORA 本地战略档案。' : lang === 'fr' ? 'Structure classique d\'étude financière homologuée pour un hôtel de 2 millions d\'euros acquis en 2025.' : 'Verified topological blueprint representing real 2025 hotel yield profiles, saved locally.'}
                            </p>
                          </div>
                          
                          <div className="border border-black/5 rounded-2xl overflow-hidden shadow-md flex-1 bg-[#1a1a1a] relative flex items-center justify-center">
                            <img 
                              src="/src/assets/images/hotel_revenue_2025_1780860199149.png" 
                              alt="Chiffre d'Affaires Minimum" 
                              className="w-full h-full object-contain max-h-[45vh]"
                              referrerPolicy="no-referrer"
                            />
                          </div>
                        </div>

                        {/* Interactive Textual Curriculum (Right) */}
                        <div className="lg:col-span-7 space-y-4 h-full overflow-y-auto pr-3">
                          <h4 className="font-serif font-bold text-lg text-brand-dark border-b pb-2">
                            {lang === 'zh' ? '📖 2.0M融资标准课：最低营业额科学测算' : lang === 'fr' ? '📖 Manuel d\'étude : Viabilité & Chiffre d\'Affaires Minimal' : '📖 Operating Manual: Hotel Revenue Demands'}
                          </h4>

                          <div className="space-y-4 text-xs font-sans text-black/75">
                            
                            <div className="bg-[#fcfaf5] border border-black/5 p-4 rounded-xl space-y-1.5 shadow-sm">
                              <span className="text-[10px] uppercase font-mono tracking-wider text-[#d4af37] font-bold">Étape 1</span>
                              <h5 className="font-serif font-bold text-sm text-[#1a1a1a]">Structure Capitale</h5>
                              <p className="leading-relaxed">
                                Un hôtel de <strong>2 000 000 €</strong> financé avec <strong>600 000 € d'apport personnel</strong> (30%) requiert une enveloppe de financement bancaire de <strong>1 400 000 €</strong>.
                              </p>
                            </div>

                            <div className="bg-[#fcfaf5] border border-black/5 p-4 rounded-xl space-y-1.5 shadow-sm">
                              <span className="text-[10px] uppercase font-mono tracking-wider text-[#d4af37] font-bold">Étape 2</span>
                              <h5 className="font-serif font-bold text-sm text-[#1a1a1a]">Frais de Crédit Hôtelier 2025</h5>
                              <p className="leading-relaxed">
                                Sous les conditions du marché en 2025, un taux fixe à <strong>4,5 % sur 15 ans</strong> génère des échéances de remboursement stables d'environ <strong>10 500 € par mois</strong>.
                              </p>
                              <div className="p-2bg-black/5 font-mono text-center text-black/80 rounded bg-black/[0.03] mt-1 font-semibold text-[10.5px]">
                                Calcul de la charge annuelle : 10 500 € &times; 12 mois ≈ 126 000 € / an
                              </div>
                            </div>

                            <div className="bg-[#fcfaf5] border border-black/5 p-4 rounded-xl space-y-1.5 shadow-sm">
                              <span className="text-[10px] uppercase font-mono tracking-wider text-[#d4af37] font-bold">Étape 3</span>
                              <h5 className="font-serif font-bold text-sm text-[#1a1a1a]">Charges Réelles en France</h5>
                              <p className="leading-relaxed">
                                La réalité opérationnelle d'un hôtel en France exige en moyenne <strong>65% à 75% du chiffre d'affaires</strong> en frais et charges fixes ou variables :
                              </p>
                              <div className="grid grid-cols-2 gap-2 text-[10px] font-mono p-2 bg-black/[0.02] rounded">
                                <div>• Personnel : 30-40%</div>
                                <div>• Énergie (Électricité, Gaz) : 5-10%</div>
                                <div>• Commissions OTA (Booking...) : 10-20%</div>
                                <div>• Entretien & Maintenance : 5-8%</div>
                                <div>• Taxes + Assurances : 5%</div>
                              </div>
                            </div>

                            <div className="bg-[#fcfaf5] border border-black/5 p-4 rounded-xl space-y-1.5 shadow-sm">
                              <span className="text-[10px] uppercase font-mono tracking-wider text-[#d4af37] font-bold">Étape 4</span>
                              <h5 className="font-serif font-bold text-sm text-[#1a1a1a]">Objectif Minimal de Solvabilité</h5>
                              <p className="leading-relaxed">
                                Un investisseur doit en permanence viser une <strong>marge nette de 10 % à 15 %</strong> pour sécuriser ses activités et ses réserves financières.
                              </p>
                            </div>

                            <div className="bg-[#eaf5ec] border border-emerald-100 p-4 rounded-xl space-y-1.5 shadow-sm text-emerald-800">
                              <span className="text-[10px] uppercase font-mono tracking-wider font-bold">Formule Simplifiée</span>
                              <h5 className="font-serif font-bold text-sm text-[#064e3b]">Rapports de seuil de rentabilité</h5>
                              <p className="leading-relaxed">
                                Pour couvrir les charges hôtelières stabilisées à <strong>70 %</strong> (laissant 30 % disponibles), repayer le prêt à hauteur de <strong>126 000 €</strong> et conserver un bénéfice vital d'exercice de <strong>100 000 €</strong>:
                              </p>
                              <div className="bg-white/40 p-2.5 rounded font-mono text-center font-bold text-[#064e3b] mt-1 text-[11px]">
                                CA &times; 0.30 &ge; 226 000 € &rArr; CA &ge; 226 000 € / 0.30 &approx; 750 000 € / an
                              </div>
                            </div>

                          </div>
                        </div>

                      </div>
                    </div>
                  )}

                </div>
              ) : (
                // STANDARD IMAGE PREVIEW FOR OTHER GALLERY MGMT ASSETS
                <div className="overflow-y-auto flex-1 p-8 grid grid-cols-1 md:grid-cols-2 gap-8 bg-[#fcfaf5]">
                  <div className="border border-black/5 rounded-2xl overflow-hidden shadow-sm aspect-video bg-neutral-900 relative">
                    <img 
                      src={selectedMgmtAsset.imageUrl} 
                      alt={selectedMgmtAsset.name} 
                      className="w-full h-full object-contain"
                      referrerPolicy="no-referrer"
                    />
                  </div>
                  
                  <div className="space-y-6">
                    <div>
                      <span className="text-[10px] tracking-widest font-mono text-black/45 uppercase">{selectedMgmtAsset.category}</span>
                      <h4 className="font-serif text-2xl font-bold text-[#1a1a1a] leading-tight">{selectedMgmtAsset.name}</h4>
                      {selectedMgmtAsset.dimensions && (
                        <p className="text-xs text-black/40 font-mono mt-1">Format: {selectedMgmtAsset.dimensions}</p>
                      )}
                    </div>

                    <div className="space-y-2">
                      <span className="text-[10px] uppercase font-mono tracking-widest text-[#d4af37] block font-bold">Metadata Tags</span>
                      <div className="flex flex-wrap gap-1.5">
                        {selectedMgmtAsset.tags.map((tag, i) => (
                          <span key={i} className="text-xs font-serif bg-white border border-black/5 px-2.5 py-1 rounded-xl shadow-sm">
                            {tag}
                          </span>
                        ))}
                      </div>
                    </div>

                    {/* AI Advisor trigger inside modal */}
                    <div className="bg-white p-6 rounded-2xl border border-black/5 shadow-sm space-y-4">
                      <div className="flex items-center space-x-2">
                        <Bot className="w-5 h-5 text-[#d4af37]" />
                        <h5 className="font-serif font-bold text-sm">Interactive AI Advisor Audit</h5>
                      </div>
                      <p className="text-xs text-black/60 leading-relaxed">
                        Authorize Director AI to load and inspect this operational archive regarding legal compliance, municipal safety parameters, and financial margins.
                      </p>
                      <button 
                        onClick={() => {
                          setSelectedMgmtAsset(null);
                          setActiveTab('advisor');
                          applyPresetPrompt(`Run an extensive risk & compliance audit on the operational repository asset: "${selectedMgmtAsset.name}" categorized under "${selectedMgmtAsset.category}". State safety checklists, corporate risk variables and compliance recommendations.`);
                        }}
                        className="w-full py-3 bg-[#1a1a1a] text-[#d4af37] rounded-xl text-xs font-serif font-bold hover:bg-[#d4af37] hover:text-[#1a1a1a] transition-all flex items-center justify-center gap-1.5"
                      >
                        Run Compliance Audit
                      </button>
                    </div>
                  </div>
                </div>
              )}

              {/* Footer */}
              <div className="p-4 bg-white border-t border-black/5 flex justify-end text-xs font-serif">
                <button 
                  onClick={() => setSelectedMgmtAsset(null)}
                  className="px-5 py-2 hover:bg-black/5 text-[#1a1a1a] border border-black/10 rounded-xl font-medium transition-all"
                >
                  {lang === 'zh' ? '关闭工作舱' : lang === 'fr' ? 'Fermer l\'étude' : 'Close Workshop'}
                </button>
              </div>

            </div>
          </div>
        )}

        {/* 4. DESIGN FOOTER SECTION */}
        <footer className="py-8 px-10 border-t border-[#1a1a1a]/5 text-center text-black/40 text-[10px] tracking-wider uppercase font-mono flex flex-col md:flex-row justify-between items-center gap-4 bg-white/30 backdrop-blur-md">
          <span>© 2026 ELYSORA Academy operating system. All rights reserved.</span>
          <span>Security status: Verified. Offline Local Storage active.</span>
        </footer>

      </main>
    </div>
  );
}
