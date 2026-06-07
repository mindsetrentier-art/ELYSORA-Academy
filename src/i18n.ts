export type Language = 'en' | 'fr' | 'zh';

export const i18n = {
  en: {
    // Brand
    brandSub: 'ACADEMY',
    activeBroker: 'Active AI Broker',

    // Nav
    dashboard: 'Dashboard',
    knowledge: 'Knowledge Graph',
    academy: 'Curated Academy',
    academy_mgmt: 'Management Academy',
    gallery: 'Design Gallery',
    gallery_mgmt: 'Management Gallery',
    projects: 'Hotel Projects',
    advisor: 'AI Advisor Lab',
    future: 'Future Lab',

    // Header
    searchPlaceholder: 'Search Knowledge Graph and Courses...',
    clear: 'Clear',
    projectTitle: 'Villas & Spa Project',
    directorWorkspace: 'Director Workspace',

    // Title
    welcome: 'Welcome,',
    director: 'Director',
    subWelcome: 'HOTEL ELYSORA ACADEMY KNOWLEDGE CORE',
    localTime: 'Elysora Local Time',

    // Dashboard Cards
    activeHotspots: 'Active Hotspots',
    villasSpasGardens: 'Villas, Spas & Gardens',
    completedLabel: 'Completed',
    strategicPlan: 'Strategic Development Plan',
    advisorRecommendation: 'Advisor Recommendation',
    advisorRecText: 'Dolomite stone retains hydration cold circuits 14% longer than synthetic slate. Let\'s design!',
    primaryCurriculum: 'Primary Curriculum',
    accessModules: 'Access Modules',
    currep: 'Curriculum Progress',
    academyTrends: 'Academy Completion Trends',
    academyTrendsSub: 'Consolidated curricula learning curves and masterclass progressions over the last 6 months.',
    cumulative: 'Cumulative',
    interactivePreview: 'Interactive Knowledge Preview',
    visualizeIntel: 'Visualize biological design correlations in real-time click pathways.',
    launchGraph: 'Launch Graph View',
    activeNodesLinked: '4 Active Topological Nodes linked',

    // Preset Enquiries
    presetEnquiries: 'Preset Enquiries',
    compareSpa: 'Compare Spa layouts',
    dolomiteThermal: 'Dolomite Thermal analytics',
    botanicalSmart: 'Botanical smart sensors index',

    // System Log
    systemLog: 'System Log & Updates',
    aiCuration: 'AI Curation',
    aiCurationText: 'analyzed the layout variables for Garden Villa B and suggested passive wind-tunnel orientation.',
    directorUploaded: 'Director',
    directorUploadedText: 'uploaded Zen Spa Floor Plan to the architectural asset database.',
    curatorApproved: 'Curator approved lesson: Introduction to Natural Silhouettes quiz completions.',

    // Knowledge View
    biophilicGraph: 'Biophilic Knowledge Graph',
    constructRules: 'Construct, refine, and connect high-end hospitality rules.',
    showingVariables: 'Showing {count} mapped variables',
    gridCanvas: 'Topological Grid Canvas',
    interactiveModel: '2D INTERACTIVE MODEL',
    hoverClick: '✓ Hover/Click Node to filter resource guidelines',
    proposeNode: 'Propose New Concept Node',
    conceptName: 'Concept name (e.g., Solar Glazing)',
    briefDesc: 'Brief description criteria',
    concept: 'Concept',
    architectural: 'Architectural',
    study: 'Study',
    injectNode: 'Inject Node',
    impactMetrics: 'Impact Metrics',
    associatedTags: 'Associated Taxonomy Tags',
    consultAdvisor: 'Consult Advisor on Node',
    selectNodeHelp: 'Select any topological node inside the left graph quadrant to load active design guidelines.',
    conceptPrinciples: 'Concept Principles',

    // Academy View
    availableMasterclasses: 'Available Masterclasses',
    duration: 'Duration',
    instructor: 'Instructor',
    completeness: 'Completeness',
    classroomPane: 'Active Course Classroom Pane',
    courseReader: 'Interactive Course Reader',
    immediateQuiz: 'Immediate AI Quiz Challenge',
    submitVerification: 'Submit Verification',
    conceptMastered: '✓ Concept Perfectly Masters!',
    analysisDivergence: '✗ Analysis Divergence',
    retryQuiz: 'Retry Quiz',
    nextModule: 'Next Module',
    credentialsWarning: 'Earn 100% to generate professional Hotel Elysora Academy Credentials.',
    credentialsUnlocked: '🏆 Credentials unlocked!',

    // Design Gallery View
    designGalleryTitle: 'Topological Design Gallery',
    designGallerySub: 'Luxury architectural blueprints, material lists, and tactile moodboard inspirations.',
    importAsset: 'Import New Concept Asset',
    dragDropText: 'Drag-and-drop architectural blueprints or click to select files (.PNG, .JPG, .PDF).',
    autoRegisters: 'Auto-registers with AI Advisor',
    categories: 'Category Distribution',
    archBlueprints: 'Architectural Blueprints',
    tactileMoodboards: 'Tactile Moodboards',
    lightingAmbience: 'Lighting Ambience studies',
    assetGrid: 'Architectural Asset Grid',
    inspectAdvisor: 'Inspect with AI Advisor',

    // Projects View
    projectsTitle: 'Hotel Projects & task boards',
    projectsSub: 'Coordinate luxury construction variables across Swiss suites and botanical developments.',
    zoneOverview: 'Active Zone Overview',
    budgetPortfolio: 'Curated Budget Portfolio',
    addProjectTask: 'Propose Project Task',
    taskTitlePlaceholder: 'Task title (e.g., Calibrate heat pumps)',
    priorityLabel: 'Priority Level',
    low: 'Low',
    medium: 'Medium',
    high: 'High',
    commitTask: 'Commit Project Task',
    columnTodo: 'To Do',
    columnProgress: 'In Progress',
    columnCompleted: 'Completed',
    noTasks: 'No tasks mapped in this column.',
    deadline: 'Deadline',

    // Advisor Lab View
    advisorLabTitle: 'AI Advisor Lab & Report Generator',
    advisorLabSub: 'Interact with Gemini 2.5 Flash trained on sovereign Alpine luxury parameters.',
    runComparison: 'Run Comparative Layout Report',
    optionAPlaceholder: 'Option A (e.g., Zen Minimalist)',
    optionBPlaceholder: 'Option B (e.g., Mountain Vernacular)',
    runMatrix: 'Run Matrix Correlation',
    askAdvisorPlaceholder: 'Ask the AI Advisor to compare materials, design layouts, or summarize plans...',
    advisorRunning: 'Advisor is computing microclimatic impact patterns...',
    sendPrompt: 'Send Prompt',
    suggestionsHeadline: 'Or query standard Alpine biophilic presets:',
    saveDraftBtn: 'Save Consultation Draft',
    draftsSidebarTitle: 'Saved Consultation Drafts',
    noDraftsYet: 'No drafts saved yet.',
    draftNamePlaceholder: 'e.g., Suite Thermal Analysis',
    loadDraftBtn: 'Load',
    deleteDraftBtn: 'Delete',
    activeChatLabel: 'Active Consultation',
    unnamedDraft: 'Unnamed Consultation',

    // Future Lab View
    futureLabTitle: 'Future Innovation Forecasting Lab',
    futureLabSub: 'Simulate high-end hospitality designs and projected commercial impact.',
    proposeFutureIcon: 'Propose Future Innovation',
    innovationTitlePlaceholder: 'Innovation Concept Title (e.g., Algae Thermal facades)',
    innovationDescPlaceholder: 'Describe the design application or technology...',
    selectCategory: 'Select Category',
    designInnovation: 'Design Innovation',
    wellbeingWellness: 'Wellbeing & Wellness',
    smartTechnology: 'Smart Technology',
    visualizeImpact: 'Simulate Impact Scenario',
    innovationsFeed: 'Active Innovations Feed',
    evaluatorAwaiting: 'Awaiting generation analysis...'
  },
  fr: {
    // Brand
    brandSub: 'ACADÉMIE',
    activeBroker: 'Courtier IA Actif',

    // Nav
    dashboard: 'Tableau de bord',
    knowledge: 'Graphe de connaissances',
    academy: 'Académie de design',
    academy_mgmt: 'Académie de gestion',
    gallery: 'Galerie de design',
    gallery_mgmt: 'Galerie de gestion',
    projects: 'Projets d\'hôtels',
    advisor: 'Lab d\'conseiller IA',
    future: 'Lab du futur',

    // Header
    searchPlaceholder: 'Rechercher dans le graphe et les cours...',
    clear: 'Effacer',
    projectTitle: 'Projet de Villas & Spa',
    directorWorkspace: 'Espace Directeur',

    // Title
    welcome: 'Bienvenue,',
    director: 'Directeur',
    subWelcome: 'NOYAU DE CONNAISSANCES DE L\'ACADÉMIE HOTEL ELYSORA',
    localTime: 'Heure locale d\'Elysora',

    // Dashboard Cards
    activeHotspots: 'Hotspots Actifs',
    villasSpasGardens: 'Villas, Spas & Jardins',
    completedLabel: 'Complété',
    strategicPlan: 'Plan de Développement Stratégique',
    advisorRecommendation: 'Recommandation du Conseiller',
    advisorRecText: 'La pierre dolomite retient les circuits de froid d\'hydratation 14% plus longtemps que l\'ardoise synthétique. À vos conceptions !',
    primaryCurriculum: 'Curriculum Principal',
    accessModules: 'Accéder aux Modules',
    currep: 'Progression du Curriculum',
    academyTrends: 'Tendances de complétion de l\'académie',
    academyTrendsSub: 'Courbes d\'apprentissage consolidées et progressions des masterclass sur les 6 derniers mois.',
    cumulative: 'Cumulatif',
    interactivePreview: 'Aperçu Interactif des Connaissances',
    visualizeIntel: 'Visualisez les corrélations de design biologique en temps réel.',
    launchGraph: 'Lancer la vue Graphe',
    activeNodesLinked: '4 Nœuds topologiques actifs liés',

    // Preset Enquiries
    presetEnquiries: 'Questions prédéfinies',
    compareSpa: 'Comparer les configurations de Spa',
    dolomiteThermal: 'Analyses thermiques de la Dolomie',
    botanicalSmart: 'Indice des capteurs intelligents',

    // System Log
    systemLog: 'Journal système et mises à jour',
    aiCuration: 'Curation IA',
    aiCurationText: 'a analysé les variables d\'aménagement pour la Villa Garden B et suggéré une orientation passive.',
    directorUploaded: 'Directeur',
    directorUploadedText: 'a téléchargé le plan d\'étage du Spa Zen dans la base d\'actifs.',
    curatorApproved: 'Le conservateur a approuvé les questionnaires du module Introduction aux Silhouettes Naturelles.',

    // Knowledge View
    biophilicGraph: 'Graphe de connaissances biophiliques',
    constructRules: 'Construire, affiner et connecter les règles d\'hospitalité haut de gamme.',
    showingVariables: 'Affichage de {count} variables cartographiées',
    gridCanvas: 'Toile de grille topologique',
    interactiveModel: 'MODÈLE INTERACTIF 2D',
    hoverClick: '✓ Survolez ou cliquez sur un nœud pour charger les consignes',
    proposeNode: 'Proposer un nouveau nœud de concept',
    conceptName: 'Nom du concept (ex: Vitrage Solaire)',
    briefDesc: 'Description des critères',
    concept: 'Concept',
    architectural: 'Architectural',
    study: 'Étude',
    injectNode: 'Injecter le nœud',
    impactMetrics: 'Mesures d\'impact',
    associatedTags: 'Tags taxonomiques associés',
    consultAdvisor: 'Consulter le conseiller sur le nœud',
    selectNodeHelp: 'Sélectionnez un nœud topologique dans le graphe de gauche pour charger ses consignes.',
    conceptPrinciples: 'Principes du concept',

    // Academy View
    availableMasterclasses: 'Masterclasses Disponibles',
    duration: 'Durée',
    instructor: 'Instructeur',
    completeness: 'Complétude',
    classroomPane: 'Salle de cours active',
    courseReader: 'Lecteur de cours interactif',
    immediateQuiz: 'Défi Quiz IA Immédiat',
    submitVerification: 'Soumettre la vérification',
    conceptMastered: '✓ Concept Parfaitement Maîtrisé !',
    analysisDivergence: '✗ Divergence d\'analyse',
    retryQuiz: 'Réessayer le Quiz',
    nextModule: 'Module Suivant',
    credentialsWarning: 'Atteignez 100% pour générer votre certificat professionnel de l\'Académie Elysora.',
    credentialsUnlocked: '🏆 Certificat déverrouillé !',

    // Design Gallery View
    designGalleryTitle: 'Galerie de design topologique',
    designGallerySub: 'Plans d\'architecture de luxe, listes de matériaux et moodboards tactiles.',
    importAsset: 'Importer un nouvel actif de concept',
    dragDropText: 'Glissez-déposez des plans ou cliquez pour sélectionner des fichiers (.PNG, .JPG, .PDF).',
    autoRegisters: 'S\'enregistre automatiquement auprès du conseiller IA',
    categories: 'Distribution des catégories',
    archBlueprints: 'Plans d\'architecture',
    tactileMoodboards: 'Moodboards tactiles',
    lightingAmbience: 'Études d\'ambiance lumineuse',
    assetGrid: 'Grille d\'actifs d\'architecture',
    inspectAdvisor: 'Inspecter avec le conseiller IA',

    // Projects View
    projectsTitle: 'Projets hôteliers et tableaux de tâches',
    projectsSub: 'Coordonnez les variables de construction de prestige sur l\'ensemble des suites et parcs botaniques.',
    zoneOverview: 'Aperçu de la zone de développement',
    budgetPortfolio: 'Budget du portefeuille',
    addProjectTask: 'Créer une tâche projet',
    taskTitlePlaceholder: 'Titre de la tâche (ex: Calibrer les pompes de chaleur)',
    priorityLabel: 'Niveau de priorité',
    low: 'Faible',
    medium: 'Moyenne',
    high: 'Élevée',
    commitTask: 'Valider la tâche projet',
    columnTodo: 'À Faire',
    columnProgress: 'En Cours',
    columnCompleted: 'Terminé',
    noTasks: 'Aucune tâche dans cette colonne.',
    deadline: 'Échéance',

    // Advisor Lab View
    advisorLabTitle: 'Laboratoire de l\'Équipe et Conseiller IA',
    advisorLabSub: 'Discutez avec Gemini 2.5 Flash entraîné sur les paramètres du luxe alpin.',
    runComparison: 'Générer un rapport comparatif de design',
    optionAPlaceholder: 'Option A (ex: Minimalisme Zen)',
    optionBPlaceholder: 'Option B (ex: Architecture Alpine)',
    runMatrix: 'Lancer l\'analyse matricielle',
    askAdvisorPlaceholder: 'Demandez au conseiller d\'analyser les matériaux, d\'évaluer les plans...',
    advisorRunning: 'Le conseiller calcule les schémas d\'impact microclimatique...',
    sendPrompt: 'Envoyer',
    suggestionsHeadline: 'Ou interrogez le conseiller sur des thèmes populaires :',
    saveDraftBtn: 'Enregistrer le brouillon de consultation',
    draftsSidebarTitle: 'Brouillons de consultation sauvegardés',
    noDraftsYet: 'Aucun brouillon sauvegardé pour l\'instant.',
    draftNamePlaceholder: 'ex: Analyse thermique de suite',
    loadDraftBtn: 'Charger',
    deleteDraftBtn: 'Supprimer',
    activeChatLabel: 'Consultation active',
    unnamedDraft: 'Consultation sans titre',

    // Future Lab View
    futureLabTitle: 'Laboratoire d\'Innovation et d\'Anticipation',
    futureLabSub: 'Simulez de nouveaux concepts d\'hospitalité et projetez leur impact commercial.',
    proposeFutureIcon: 'Proposer une innovation future',
    innovationTitlePlaceholder: 'Titre du concept innovant (ex: Façades thermiques d\'algues)',
    innovationDescPlaceholder: 'Décrivez l\'application de design ou la technologie...',
    selectCategory: 'Sélectionner une catégorie',
    designInnovation: 'Innovation de Design',
    wellbeingWellness: 'Bien-être & Wellness',
    smartTechnology: 'Technologie Intelligente',
    visualizeImpact: 'Simuler le scénario d\'impact',
    innovationsFeed: 'Flux d\'innovations actives',
    evaluatorAwaiting: 'En attente de l\'analyse générationnelle...'
  },
  zh: {
    // Brand
    brandSub: '学院',
    activeBroker: '运行中 AI 代理',

    // Nav
    dashboard: '设计主板',
    knowledge: '知识图谱',
    academy: '精品学院',
    academy_mgmt: '管理学院',
    gallery: '设计画廊',
    gallery_mgmt: '管理画廊',
    projects: '酒店项目',
    advisor: 'AI 顾问室',
    future: '未来实验室',

    // Header
    searchPlaceholder: '搜索知识图谱和学习课程...',
    clear: '清除',
    projectTitle: '别院与水疗项目',
    directorWorkspace: '总监工作区',

    // Title
    welcome: '欢迎回来，',
    director: '设计总监',
    subWelcome: 'ELYSORA 酒店学院设计与知识核心库',
    localTime: 'Elysora 当地时间',

    // Dashboard Cards
    activeHotspots: '活跃开发区',
    villasSpasGardens: '别院、水疗与景观设计',
    completedLabel: '已完成进度',
    strategicPlan: '战略发展与执行总纲',
    advisorRecommendation: 'AI 顾问推荐',
    advisorRecText: '白云石灰石的冷循环保温效果比合成板岩持久14%。让我们开始设计吧！',
    primaryCurriculum: '核心培训体系',
    accessModules: '查看详细模块',
    currep: '课程完成百分比',
    academyTrends: '学院结业趋势图',
    academyTrendsSub: '过去6个月内各专业学习曲线与大师班进度的汇总分析。',
    cumulative: '累计趋势',
    interactivePreview: '互动知识图谱预览',
    visualizeIntel: '实时点击并可视化生态与生物气候设计的关联特性。',
    launchGraph: '进入完整图谱',
    activeNodesLinked: '已连接 4 个生态与建造节点',

    // Preset Enquiries
    presetEnquiries: '推荐咨询方向',
    compareSpa: '比对水疗空间格局',
    dolomiteThermal: '白云石热力学特征研究',
    botanicalSmart: '植物园区智能照明传感器',

    // System Log
    systemLog: '系统运行日志与更新',
    aiCuration: 'AI 推荐',
    aiCurationText: '分析了庭院别院 B 的采光布局，建议采用被动风道设计。',
    directorUploaded: '总监',
    directorUploadedText: '向建筑资产库上传了「禅意水疗室平面图」。',
    curatorApproved: '管理员审核通过了课程《自然剪影入门》的测试反馈。',

    // Knowledge View
    biophilicGraph: '生态/亲生物设计知识图谱',
    constructRules: '构建、提炼和传授顶级度假酒店的策划和设计规范。',
    showingVariables: '当前已绘制 {count} 个设计变量标签',
    gridCanvas: '空间坐标系网络',
    interactiveModel: '2D 互动拓扑仿真模型',
    hoverClick: '✓ 悬停或点击标签以过滤并加载具体的规划与选材指南',
    proposeNode: '提议新的设计概念节点',
    conceptName: '设计概念名称（例：遮阳采光面板）',
    briefDesc: '概念评价指标与描述',
    concept: '概念设想',
    architectural: '建筑手法',
    study: '专题研究',
    injectNode: '注入该节点',
    impactMetrics: '影响度测量',
    associatedTags: '相关学科分类',
    consultAdvisor: '对该节点咨询 AI 专家',
    selectNodeHelp: '选择左侧空间座标区中的任何拓扑节点即可加载相应设计指南。',
    conceptPrinciples: '核心设计原理说明',

    // Academy View
    availableMasterclasses: '在选大师班课程',
    duration: '课程时长',
    instructor: '授课教授',
    completeness: '学习进度',
    classroomPane: '在线大师班学习面板',
    courseReader: '多功能文献阅览器',
    immediateQuiz: 'AI 专项测试挑战',
    submitVerification: '提交答案校验',
    conceptMastered: '✓ 完美掌握核心理念！',
    analysisDivergence: '✗ 逻辑出现偏差',
    retryQuiz: '重新测试',
    nextModule: '进入下一单元',
    credentialsWarning: '学习进度达到 100% 后可解锁生成艾莉索拉大酒店学院官方认证证书。',
    credentialsUnlocked: '🏆 结业证书已解锁！',

    // Design Gallery View
    designGalleryTitle: '空间景观视觉画廊',
    designGallerySub: '奢华建筑草图、顶级材质样板、以及前沿感官创意设计。',
    importAsset: '导入创意图形资产',
    dragDropText: '拖拽建筑施工图、设计效果图至此，或点击本地上传 (.PNG, .JPG, .PDF)。',
    autoRegisters: '自动上传并在 AI 智能顾问端生成多维分析',
    categories: '素材类别分布',
    archBlueprints: '建筑蓝图与施工图',
    tactileMoodboards: '触觉与环境情感看板',
    lightingAmbience: '光影与自然环境氛围研究',
    assetGrid: '项目创意素材库网格',
    inspectAdvisor: '委托 AI 顾问剖析设计',

    // Projects View
    projectsTitle: '酒店项目计划与任务看板',
    projectsSub: '协同管理瑞士别院及植物温室建筑工程中的各项特种施工变量。',
    zoneOverview: '施工区域实况',
    budgetPortfolio: '可用投资组合预算',
    addProjectTask: '新增项目施工任务',
    taskTitlePlaceholder: '任务名称（例：调试低温地温热泵）',
    priorityLabel: '优先级判定',
    low: '低等',
    medium: '中等',
    high: '紧急',
    commitTask: '确认指派此任务',
    columnTodo: '待办项',
    columnProgress: '进行中',
    columnCompleted: '已落成',
    noTasks: '该任务队列当前为空。',
    deadline: '完工限期',

    // Advisor Lab View
    advisorLabTitle: 'AI 创意总监顾问中心',
    advisorLabSub: '借助针对顶级高山生态建筑、亲生物疗愈学全面微调过的 Gemini 2.5 Flash。',
    runComparison: '运行设计比对深度报告',
    optionAPlaceholder: '设计方案 A（例：禅板山房）',
    optionBPlaceholder: '设计方案 B（例：重木梁高山墅）',
    runMatrix: '执行系统互耦分析',
    askAdvisorPlaceholder: '向 AI 顾问请教关于材料应用、风水、热效能或摘要总结...',
    advisorRunning: '智能顾问正基于微气候模型解析舒适度数据...',
    sendPrompt: '发送咨询',
    suggestionsHeadline: '或直接选用高山亲生物常用设计查询议题：',
    saveDraftBtn: '保存本次咨询草稿',
    draftsSidebarTitle: '已保存的咨询设计草稿',
    noDraftsYet: '暂无保存的草稿。',
    draftNamePlaceholder: '如：第A套房热敏分析',
    loadDraftBtn: '加载',
    deleteDraftBtn: '删除',
    activeChatLabel: '当前正在咨询',
    unnamedDraft: '未命名咨询',

    // Future Lab View
    futureLabTitle: '前沿创新与未来预测实验室',
    futureLabSub: '模拟并评估酒店行业下一代前瞻性绿色建筑与感官科技的商业价值。',
    proposeFutureIcon: '提议颠覆性创新概念',
    innovationTitlePlaceholder: '概念名称（例：生物微藻相变外墙）',
    innovationDescPlaceholder: '阐述设计细节或具体技术构成...',
    selectCategory: '选择研究领域',
    designInnovation: '先锋结构与设计',
    wellbeingWellness: '生命科学与康养水疗',
    smartTechnology: '边缘计算与智能自适应',
    visualizeImpact: '预测对能耗与声誉的影响',
    innovationsFeed: '前沿概念库流',
    evaluatorAwaiting: '正等待生成式大模型解析量化指标...'
  }
};

export const MOCK_DATA_TRANSLATIONS = {
  // NODES
  'spa-arch': {
    en: { name: 'Spa Architecture', category: 'Architectural', description: 'A comprehensive framework for designing restorative indoor wellness environments.', content: 'Our Spa Architecture balances deep, natural dark emerald stones with focused light-shaft structures. Designing spaces around raw stone formations optimizes thermal mass while creating a cathedral-like sanctuary.' },
    fr: { name: 'Architecture de Spa', category: 'Architectural', description: 'Un cadre global pour concevoir des environnements de bien-être intérieurs régénérateurs.', content: 'Notre architecture thermale associe des pierres de quartz émeraude sombres et naturelles à des puits de lumière ciblés. Aménager les espaces autour de formations rocheuses brutes optimise la masse thermique tout en créant un sanctuaire digne d\'une cathédrale.' },
    zh: { name: '水疗空间规划', category: '建筑手法', description: '用于规划和构筑生态室内康养理疗环境的综合设计框架。', content: '我们的理疗水疗空间糅合了天然深邃的祖母绿原石与汇聚的自适应采光井结构。围绕自然岩石肌理设计空间，不仅可以大幅提升蓄热建筑物理性能，更能营造成大教堂般高尚幽静的避世圣所。' }
  },
  'thermal-dynamics': {
    en: { name: 'Thermal Dynamics', category: 'Study', description: 'Technical analysis of dry and moist microclimate temperature zones within retreats.', content: 'Optimizing high-end recovery circuits by controlling humidity rates alongside variable infrared therapy. The transition between wood-panel saunas and glacial dip-tanks enhances circulation and lymphatic drainage.' },
    fr: { name: 'Thermodynamique', category: 'Étude', description: 'Analyse technique des zones de température sèches et humides au sein des retraites hôtelières.', content: 'Optimisation des circuits de récupération haut de gamme en régulant les taux d\'humidité parallèlement à des thérapies infrarouges variables. La transition entre les saunas en cèdre et les bassins de plongée glacés stimule la circulation et le drainage lymphatique.' },
    zh: { name: '绝热与微气候热力学', category: '专题研究', description: '对奢华度假别院内干湿微气候温控区域的技术性物理分析。', content: '通过精准掌控湿度及变频红外线热疗系统，优化高端理疗康复路径。从温润的木质芬兰桑拿房过渡到高山冰川冷水池，能极佳地促进血液循环与体感舒适度。' }
  },
  'sensory-mats': {
    en: { name: 'Sensory Materials', category: 'Concept', description: 'Bespoke integration of high-tactility textures for psychological grounding.', content: 'Using hand-chiselled local dolomite stones alongside reclaimed warm cedar panels. The materials communicate safety and permanent grounding before any active hospitality service begins.' },
    fr: { name: 'Matériaux de Spa', category: 'Concept', description: 'Intégration sur mesure de textures hautement tactiles pour un ancrage psychologique serein.', content: 'Utilisation de pierres de dolomie locales taillées à la main et de panneaux de cèdre chaleureux de récupération. Ces textures nobles inspirent la sécurité et un enracinement organique permanent avant même que ne débute le service de conciergerie.' },
    zh: { name: '触觉与感官材质', category: '概念设想', description: '精选极高触感和环境质感的设计肌理，提供深层的心理学空间安全感。', content: '采用纯手工凿刻的当地白云岩石与富含天然油脂的古旧雪松原木面板。这些天然材料在酒店服务开始之前，便向宾客耳语着自然的永恒安全感与大地厚重的归属感。' }
  },
  'acoustic-seclusion': {
    en: { name: 'Acoustic Seclusion', category: 'Architectural', description: 'Advanced sound dampening geometries to mute adjacent urban and environmental frequencies.', content: 'Eliminating echoing in high-vaulted spa ceilings using custom micro-perforated wood acoustic slats and heavy structural tapestries designed with abstract organic reliefs.' },
    fr: { name: 'Acoustique et Isolation', category: 'Architectural', description: 'Géométries acoustiques avancées pour neutraliser les fréquences environnantes indésirables.', content: 'Élimination de toute réverbération sous les hauts plafonds voûtés du spa grâce à l\'usage de lattes acoustiques en bois micro-perforées sur mesure et d\'épaisses tapisseries de laine vierge aux motifs biomorphiques en relief.' },
    zh: { name: '声学幽闭与降噪', category: '建筑手法', description: '采用前沿隔音网格结构与声学几何设计，将外界噪音与城市杂音完全屏蔽。', content: '通过定制的超细微孔木质声学吸音板以及融入抽象自然地形起伏的厚重手工壁毯，彻底消除高穹顶静音水疗走廊内的任何回音。' }
  },

  // GALLERY
  'gal-plan-1': {
    en: { name: 'Zen Spa Wing - Floor Plan', category: 'Architectural', tags: ['Spa', 'Floor Plan', 'Architecture', 'Limestone'] },
    fr: { name: 'Aile Spa Zen - Plan d\'Étage', category: 'Architectural', tags: ['Spa', 'Plan de Sol', 'Architecture', 'Calcaire'] },
    zh: { name: '禅意水疗别院 - 空间平面图', category: '建筑施工图', tags: ['水疗中心', '建筑图纸', '多维测绘', '白云石'] }
  },
  'gal-mood-1': {
    en: { name: 'Serene Materials - Textures', category: 'Moodboard', tags: ['Linen', 'Cedar', 'Dolomite', 'Warm Cream'] },
    fr: { name: 'Matériaux Sereins - Textures', category: 'Planche de tendance', tags: ['Lin', 'Cèdre', 'Dolomie', 'Crème Chaleureux'] },
    zh: { name: '静享自然材质 - 高山触觉样板', category: '情感看板', tags: ['高山材质', '雪松板', '白云石', '温暖色调'] }
  },
  'gal-light-1': {
    en: { name: 'Lighting Ambience - Dusk', category: 'Lighting', tags: ['Lobby', 'Dusk', 'Warm Glow', 'Ambient'] },
    fr: { name: 'Ambiance Lumineuse - Crépuscule', category: 'Éclairage', tags: ['Hall d\'accueil', 'Crépuscule', 'Lueur Douce', 'Ambiance'] },
    zh: { name: '光影环境研究 - 黄昏漫射', category: '环境氛围', tags: ['门厅大堂', '黄昏漫反射', '自然暖光', '自适应感官'] }
  },

  // PROJECTS
  'proj-spa': {
    en: { name: 'Suites Royales & Sensory Spa', description: 'An elite Swiss Alpine spa retreat including 12 detached infinity pool villas, custom sauna vaults, and natural spring integrations.' },
    fr: { name: 'Suites Royales & Spa Sensoriel', description: 'Une retraite thermale alpine suisse d\'élite comprenant 12 villas individuelles avec piscines à débordement, saunas voûtés sur mesure et intégration de sources d\'eau thermales.' },
    zh: { name: '皇家套房与感官水疗中心', description: '瑞士阿尔卑斯山奢华生态水疗项目，包含 12 栋独立悬崖无边泳池别院、定制穹顶桑拿以及天然温泉引入系统。' }
  },
  'proj-garden': {
    en: { name: 'Elysora Botanical Gardens', description: 'Lush organic multi-level gardens framing the hillside suites, optimized with localized microclimatic thermal channels.' },
    fr: { name: 'Jardins Botaniques d\'Elysora', description: 'Jardins d\'altitude luxuriants encadrant les suites de prestige, optimisés par des couloirs thermiques microclimatiques localisés.' },
    zh: { name: '艾莉索拉多层植物园', description: '环抱山体套房的多维层叠式自然植物园区，配备专用的微气候暖能导地热风道系统。' }
  },

  // TASKS
  'task-1': {
    en: { title: 'Finalize structural stone mockups with dolomite suppliers' },
    fr: { title: 'Finaliser les prototypes de pierre structurelle avec les fournisseurs de dolomie' },
    zh: { title: '与白云岩石供应商落实奢华温泉区石材拼装测绘与微结构样板' }
  },
  'task-2': {
    en: { title: 'Audit sound insulation of spa vault corridors' },
    fr: { title: 'Auditer l\'isolation phonique des couloirs voûtés du spa' },
    zh: { title: '全面核实无声理疗区穹顶走廊的声学消音与隔音指标' }
  },
  'task-3': {
    en: { title: 'Approve light conduit specs for circadian floor pathways' },
    fr: { title: 'Approuver les spécifications des conduits de lumière pour les chemins de sol circadiens' },
    zh: { title: '批准确认二十四小时昼夜自适应地面光导纤维管道工程规格' }
  },

  // TRENDS
  'trend-1': {
    en: { title: 'Bespoke Bio-Amenity Formulations', description: 'Deriving active luxury skincare lipids from live botanical garden cell matrices managed on-property, dynamically customized for guests seasonal skin index.', simulatedScenario: 'Scenario Simulator: Formulating active lipid chains on-property slashes product transport carbon footprints by 96% and boosts guest skin hydration indices by 42% compared to synthetic imports.' },
    fr: { title: 'Formulations de Soins Bio Actifs', description: 'Extraction de lipides de soins d\'élite issus des cellules souches de nos jardins botaniques, adaptés dynamiquement à l\'indice cutané saisonnier de chaque hôte.', simulatedScenario: 'Simulateur d\'Impact : Produire nos actifs biosurplace réduit l\'empreinte carbone du transport de 96% et augmente l\'hydratation de la peau des hôtes de 42% par rapport aux importations de synthèse.' },
    zh: { title: '庄园级自适应生物活肤护肤', description: '从庄园自建植物园提取活体细胞脂质，制成高端客房洗护套装，根据宾客当时的皮肤季节指数提供个性化现场配制。', simulatedScenario: '情境仿真器：在酒店内进行生物脂链调配，可使供应链配送碳排放锐减 96%，且与常态进口合成洗护相比，使客户皮肤水合指数提升 42%。' }
  },
  'trend-2': {
    en: { title: 'Digital-Twin Structural Airflows', description: 'Using high-resolution server-side sensor models that match natural wind corridors of local valleys, adjusting villa windows automatically to channel cool mountain currents.', simulatedScenario: 'Scenario Simulator: Enabling passive ventilation through digital twins decreases mechanical chiller loads by 34% during peak summer, maintaining pristine quietude.' },
    fr: { title: 'Flux d\'Air Structurels par Jumeau Numérique', description: 'Utilisation de capteurs géolocalisés haute résolution synchronisés avec les couloirs de vent de la vallée, ajustant automatiquement les ouvertures pour canaliser l\'air frais des cimes.', simulatedScenario: 'Simulateur d\'Impact : L\'activation de la ventilation passive via jumeau numérique réduit la charge des refroidisseurs thermodynamiques de 34% en saison estivale, préservant un silence souverain.' },
    zh: { title: '基于数字孪生高山自适应风调控', description: '利用微气候传感器高精感知高山谷地微风流向，自动调节客房气窗开启偏角，引入高山纯净凉风。', simulatedScenario: '情境仿真器：通过数字孪生辅助室外风流循环，夏季空调冷机电耗由此下降 34%，同时让高山微风低吟，保持完美的自然无感体验。' }
  },

  // COURSES
  'biophilic-hosp': {
    en: { title: 'Principles of Biophilic Hospitality', description: 'Integrating organic, architectural blueprints with natural foliage, ambient light wells, and natural microclimates to deliver quiet luxury.' },
    fr: { title: 'Principes de l\'Hospitalité Biophilique', description: 'Associer des tracés architecturaux organiques, des puits de lumière naturelle et des microclimats forestiers pour offrir l\'expérience ultime du luxe silencieux.' },
    zh: { title: '亲生物生态款待学设计原理', description: '融合大自然林木、天光散射井与自组调温微结构，构筑静谧高雅的高端生态旅居体验。' }
  },
  'omotenashi-tech': {
    en: { title: 'Omotenashi 2.0: Invisible Tech & Ethics', description: 'Synthesizing age-old Japanese hospitality traditions of deep anticipation with hidden sensor suites, ambient predictive computing, and server-side memory.' },
    fr: { title: 'Omotenashi 2.0 : Technologie Invisible et Éthique', description: 'Marier les rituels antiques d\'anticipation de l\'hospitalité japonaise Omotenashi à des capteurs hôteliers imperceptibles et à un historique d\'apprentissage sécurisé.' },
    zh: { title: '极致待客之礼 2.0 (隐形科技与服务美学)', description: '将日本传统的待客先机理念与现代不可见传感器、情境边缘计算与端侧用户主权记忆完美融合。' }
  },

  // LESSONS & QUIZZES
  'lesson-bio-1': {
    en: {
      title: 'Introduction to Natural Silhouettes',
      content: 'Biophilic geometry relies on curves and physical lines inspired by native plants and local geological formations. Rather than placing plant containers on standard desks, we must integrate structures where vegetation grows directly out of stone wall matrices, filtered by indirect sky-wells.',
      quiz: {
        question: 'What is the primary objective of structural integration in biophilic hospitality?',
        options: [
          'Inserting artificial plant pots into offices after builders complete construction',
          'Embedding live botanical systems into standard building columns to optimize air quality and emotional grounding',
          'Adding excessive digital monitors depicting rain forest vistas'
        ],
        explanation: 'Integrating live botanical structures provides a tangible sensory effect of permanent grounding and acoustic insulation.'
      }
    },
    fr: {
      title: 'Introduction aux Silhouettes Naturelles',
      content: 'La géométrie biophilique s\'appuie sur des spirales et des profils organiques inspirés de la flore alpine et de la géologie rocheuse locale. Au lieu de simples pots de fleurs posés sur des bureaux, nous concevons des structures de maçonnerie où la végétation se développe au cœur même des joints de mur en pierre, irriguée par des verrières d\'eau pluviale filtrée.',
      quiz: {
        question: 'Quel est l\'objectif d\'intégrer vivantes des structures botaniques en hôtellerie de prestige ?',
        options: [
          'Ajouter des pots de fleurs artificielles après la fin des chantiers de gros œuvre',
          'Enraciner des systèmes botaniques vivants dans les éléments porteurs pour purifier l\'air et favoriser l\'enracinement sensoriel',
          'Installer des écrans de résolution 8K affichant des forêts tropicales virtuelles'
        ],
        explanation: 'L\'inclusion de plantes et d\'échos vivants apporte un ancrage sensoriel véritable et un amortisement sain des fréquences aériennes.'
      }
    },
    zh: {
      title: '自然物理剪影设计入门',
      content: '亲生物形态学依赖于从乡土植被与本地地质走向中抽象出的自然曲线与立体面线。在设计中，我们彻底抛弃在传统桌面上点缀盆栽的做法，转而将植物生长矩阵无缝织入石砌骨架墙中，通过头顶的散射自适应采光天窗予以自然灌溉。',
      quiz: {
        question: '在亲生物建筑中，关于植物结构化融合的首要设计目标是什么？',
        options: [
          '在主体结构竣工后，向房间各角摆放人工塑料盆栽',
          '在建筑承重柱或墙体内直接铺设活体植被培养腔，以物理方式净化空气并提供深度的大地连结感',
          '安设大量展示瀑布和雨林视频的高清电子屏幕'
        ],
        explanation: '将活体植被培养与建筑实体相融合，能创造有触感的生命自循环体系，大幅抵消室内回音并稳定负离子指标。（选第项）'
      }
    }
  },
  'lesson-bio-2': {
    en: {
      title: 'Thermal Contouring & Water Seclusions',
      content: 'Integrating silent natural springs and geothermal structures in the heart of hospitality layouts. By shaping high-conductivity limestone paths around these thermal hubs, we establish natural radiant heating pathways.',
      quiz: {
        question: 'How do limestone pathways participate in Thermal Dynamics?',
        options: [
          'They act as simple walking areas with no energetic function',
          'They conduct heat from integrated thermal springs to provide natural floor-to-ceiling radiant heat',
          'They trigger cooling cycles for smart air-con networks'
        ],
        explanation: 'Limestone possesses significant thermal latency, radiating heat steadily and muting the hum of mechanical HVAC blowers.'
      }
    },
    fr: {
      title: 'Modelage Thermique et Enclaves Aquatiques',
      content: 'Intégration de sources d\'eau thermales résurgentes et de dalles de captage géothermiques au centre des espaces de repos. En orientant des sentiers de calcaire à haute conductivité autour de ces noyaux de chaleur, on génère un réseau de rayonnement radiatif doux entièrement passif.',
      quiz: {
        question: 'Comment les chaussées de marbre et de calcaire participent-elles à l\'effet thermique actif ?',
        options: [
          'Elles ne constituent que des aires de passage ordinaires sans rôle énergétique',
          'Elles absorbent l\'énergie géothermique de source pour irradier doucement du sol au plafond de façon naturelle',
          'Elles déclenchent des ventilations de climatisation mécanique forcée'
        ],
        explanation: 'Le calcaire cristallin possède une excellente inertie thermique, ce qui lui permet de restituer la douce chaleur d\'eau thermale d\'origine.'
      }
    },
    zh: {
      title: '绝热形态与水源密境',
      content: '将静谧高山冷泉与温泉热点巧妙安放在度假村的中轴线上。通过将高导热性石灰石板铺设在温泉微热回路四周，铺设天然的无风扇、零噪声的地板辐射热传导通道。',
      quiz: {
        question: '石灰石自然石径如何对微气候热平衡做出物理级贡献？',
        options: [
          '仅作为供旅客步行穿梭的物理硬质路面，不具有能源调节属性',
          '利用高热传导导热率吸收地下温泉管道的余热，自下而上持久散发自然辐射温控热能',
          '触发客房内的空调设备，使风机盘管自动切换制冷模式'
        ],
        explanation: '石灰石具备天然的热惯性常数，能够持续、温和地散发地板辐射热力，让客人在摆脱空调风机干燥与噪声的干扰下感受大地的温度。'
      }
    }
  },
  'lesson-omo-1': {
    en: {
      title: 'The Anticipatory Canvas',
      content: 'Anticipatory service requires recognizing guest cycles before requests occur. For instance, modifying ambient bedroom humidity dynamically based on biometric skin data and sleep stage, without asking the guests to modify complex wall consoles.',
      quiz: {
        question: 'Omotenashi 2.0 suggests tech interfaces should be...',
        options: [
          'Vibrant with large flashing neon light bars and buttons everywhere',
          'Completely hidden and pre-emptive, utilizing predictive algorithms to align with guests biological rhythms silently',
          'Inoperable unless controlled via mobile app logins'
        ],
        explanation: 'True luxury means getting what you desire without ever feeling the friction of technology dashboards.'
      }
    },
    fr: {
      title: 'Le Canevas Anticipatoire',
      content: 'L\'hospitalité anticipative suppose d\'identifier les préférences des voyageurs avant même l\'expression d\'une demande. Par exemple, réguler le niveau d\'humidité de la suite à l\'aide de micro-palpeurs mesurant le taux d\'activité nocturne de l\'hôte, éliminant toute console murale complexe.',
      quiz: {
        question: 'Selon la philosophie Omotenashi 2.0, les interfaces technologiques doivent être...',
        options: [
          'Tranchantes, garnies de pavés lumineux et de larges cadrans à boutons d\'accès directs',
          'Totalement invisibles et prédictives, alignant en continu les paramètres physiques sur les cycles physiologiques de l\'hôte',
          'Bloquées, n\'autorisant le déverrouillage que par authentification sur smartphone'
        ],
        explanation: 'Le raffinement suprême se traduit par l\'absence totale de bruit visuel ; les technologies de confort opèrent de manière secrète.'
      }
    },
    zh: {
      title: '尊客预判性情景画布',
      content: '高奢预判性服务依赖于在宾客自己意识到痛点前，就感知其身体状态。例如，系统通过非触及式传感机制，依据客人当下的皮肤屏障散热数据动态微调客房微气候湿度，完全略去任何让客人面对冷冰电子触控板操作的程序。',
      quiz: {
        question: '在极致款待理念中，空间科技界面的最佳呈现形态应该是：',
        options: [
          '五彩斑斓的巨型发光面板跟铺满整个控制墙底部的按键面板',
          '完全隐匿、悄无声息。融入人工智能与人体节律，静悄悄地自适应宾客状态',
          '非得绑定手机应用程序或扫码登录后才能激活'
        ],
        explanation: '奢华的终极内涵在于“无感与顺手”；旅客尚未动念，所需之物已如呼吸一般自然而至，没有任何可见科技带来的割裂与阻碍。'
      }
    }
  },
  
  // MANAGEMENT COURSES
  'luxury-yield': {
    en: { title: 'Luxury Operations & Yield Management', description: 'Bespoke forecasting models, premium suite pricing metrics, and dynamic staff alignment to deliver seamless guest experiences.' },
    fr: { title: 'Opérations de luxe & Yield Management', description: 'Modèles de prévision sur mesure, mesures de tarification des suites premium et alignement dynamique du personnel.' },
    zh: { title: '高端运营与收益管理', description: '高端预测模型、高档套房定价指标与员工动态排班，提供极致流畅的宾客体验。' }
  },
  'lesson-yield-1': {
    en: {
      title: 'Dynamic Forecasting for Alpine Retreats',
      content: 'Traditional hotels rely on generic third-party channels to discount premium rates. Elite alpine suites instead utilize dynamic environmental indices to shift pricing premiums. Rates must never fall below brand baseline to protect luxury exclusivity and maximize premium VIP guest configurations.',
      quiz: {
        question: 'What is the primary operational risk of standard OTA direct discount algorithms for boutique suites?',
        options: [
          'Overbooking wellness spa time allocations',
          'Sovereign brand equity dilution from public rate-slashing',
          'Restricting municipal clean energy grid configurations'
        ],
        explanation: 'Public discounting harms elite brand exclusivity and damages long-term customer trust.'
      }
    },
    fr: {
      title: 'Prévision dynamique pour les retraites alpines',
      content: 'Les hôtels traditionnels s’appuient sur des intermédiaires génériques pour brader leurs tarifs. Les suites alpines d’élite privilégient des indices thermiques et biométriques dynamiques pour ajuster leurs prix. Les tarifs ne doivent jamais descendre sous le seuil de marque pour préserver l’exclusivité du luxe.',
      quiz: {
        question: 'Quel est le principal risque opérationnel des algorithmes de réduction automatique des OTA pour nos suites ?',
        options: [
          'La surréservation des créneaux de soins du spa',
          'La dilution de l’image de marque de prestige par des baisses de tarifs publiques',
          'La restriction des configurations de notre réseau d’énergie propre'
        ],
        explanation: 'Brader publiquement les prix nuit gravement à l’exclusivité et rompt la confiance des clients premium.'
      }
    },
    zh: {
      title: '高山避世别院的动态收益预测',
      content: '传统酒店依赖第三方分销商打折以提高入住率，而顶级高山别院则根据局地微气候和客流热度动态浮动溢价。房价绝不能跌穿底线，以确保奢华的排他性并最优化VIP宾客构成。',
      quiz: {
        question: '常规网络渠道（OTA）自动打折算法对精品套房有什么主要的品牌 and 运营风险？',
        options: [
          '使水疗中心的预约时段发生过度重叠',
          '因公开打折导致高奢品牌溢价稀释与声誉受损',
          '限制市政清洁能源电网的负荷分配'
        ],
        explanation: '公开降价会侵蚀高奢品牌定位，并损害高净值客户对品牌的信任。（选第项）'
      }
    }
  },
  'lesson-yield-2': {
    en: {
      title: 'Roster Synchronicity & Wellness Peaks',
      content: 'Service fatigue occurs when staffing does not match guest cycles. By tracking automated check-in and checkout streams alongside thermal spa bookings, we align our concierge rosters precisely with peaks in biological therapy cycles.',
      quiz: {
        question: 'How does roster synchronicity optimize premium service curation?',
        options: [
          'It forces staff to be on-call 24 hours continuously',
          'It aligns service shifts precisely with real-time biometric and wellness therapy spikes',
          'It automates guest registration so that employees are not required'
        ],
        explanation: 'Coordinating shift schedules with high-demand wellness curves minimizes stress and preserves peak luxury execution.'
      }
    },
    fr: {
      title: 'Synchronicité des équipes & pics de bien-être',
      content: 'La fatigue du personnel survient quand les effectifs ne correspondent pas aux cycles des clients. En suivant les flux de réservations thermales et de check-in, nous alignons les horaires de nos concierges sur les besoins réels.',
      quiz: {
        question: 'Comment la synchronicité des plannings optimise-t-elle l’expérience client ?',
        options: [
          'Elle oblige les employés à rester d’astreinte en continu',
          'Elle aligne précisément les créneaux de travail sur les pics de bien-être physique et de soins biométriques',
          'Elle automatise l’enregistrement supprimant tout besoin de contact humain'
        ],
        explanation: 'Faire correspondre les plannings du personnel avec les heures de forte affluence thermale élimine le stress et garantit un service de prestige.'
      }
    },
    zh: {
      title: '员工排班同步与疗愈高峰期对齐',
      content: '当员工排班与客流量错位时，容易产生服务疲劳。通过追踪智能签入签退流与水疗预约指标，我们精准对齐礼宾排班与水疗理疗周期的高峰，创造完美的接待体验。',
      quiz: {
        question: '员工排班同步如何优化高奢服务品质？',
        options: [
          '强迫员工进行持续24小时不间断的待命',
          '使服务排班精准与真实的康养和理疗体验高峰相对齐',
          '实现宾客自助签到以彻底省去人工接待'
        ],
        explanation: '合理协调排班与高频水疗时间段对齐，可以缓解服务人员压力并保留高标准的执行品质。（选第项）'
      }
    }
  },
  'sustainable-finance': {
    en: { title: 'Sustainable Luxury Finance & Eco-Compliance', description: 'Integrating capital expenditures for biophilic systems, natural energy retention audits, and green operational budgets.' },
    fr: { title: 'Finance de luxe durable & Éco-compliance', description: 'Intégration du Capex pour les systèmes biophiliques, audits énergétiques et budgets d’exploitation verts.' },
    zh: { title: '可持续高奢财务与绿色合规', description: '评估亲生物建筑的前期资本投入、自然蓄热收益审计与绿色运营预算。' }
  },
  'lesson-finance-1': {
    en: {
      title: 'Capital Auditing of Deep Biophilic Systems',
      content: 'Embedding living thermal green walls or physical dolomite structures requires higher initial investment but cuts long-term HVAC cooling and humidity control bills by 45%. We justify this expense through energy retention and customer loyalty coefficients.',
      quiz: {
        question: 'What is the primary financial justification for high biophilic capital investments?',
        options: [
          'Increasing annual municipal property taxes',
          'Slashing thermodynamic cooling bills by 45% while boosting premium brand positioning and guest retention',
          'Lowering room rates to accommodate larger groups'
        ],
        explanation: 'Natural insulation reduces physical building operational overhead and appeals to environmentally conscious luxury customers.'
      }
    },
    fr: {
      title: 'Audit financier des investissements biophiliques',
      content: 'L’inclusion de structures en dolomie locale et de murs végétalisés implique un investissement initial plus lourd, mais diminue de 45% les frais de climatisation. Nous amortissons ce coût par cette inertie thermique exceptionnelle et la fidélisation des VIP.',
      quiz: {
        question: 'Quelle est la principale justification financière pour ces investissements biophiliques ?',
        options: [
          'L’augmentation des taxes foncières municipales annuelles',
          'La baisse de 45% des frais énergétiques combinée à l’excellent positionnement éco-luxe et à la fidélité des VIP',
          'La baisse du prix de nos chambres pour accueillir des flux importants'
        ],
        explanation: 'Les matériaux durables isolent passivement le bâtiment, supprimant les coûts mécaniques tout en séduisant les voyageurs éco-responsables.'
      }
    },
    zh: {
      title: '深层亲生物建造的资本审计',
      content: '将活体绿色生态墙和天然白云石砌体融入施工中需要略高的期初投资，但长期来看将降低空调和加湿约45%的费用支出。我们根据优异的蓄热蓄能指标与客人对绿色生态的极佳好评来支持此项工程。',
      quiz: {
        question: '对于高昂的前期亲生物资本投入，最主要的财务合理解释是：',
        options: [
          '提高本酒店年度需缴交的商业资产和市政地税',
          '大幅降低运行中的空调能耗开支达45%，同时提升高奢环保品牌地位与客群留存度',
          '通过降低单间房价来吸引大规模廉价旅行团入住'
        ],
        explanation: '自然绝热设计能削减机械控温开支，且在精神层面天然地吸引注重环保、追求品质的高净值旅行者。（选第项）'
      }
    }
  },

  // MANAGEMENT GALLERY
  'gal-mgmt-1': {
    en: { name: 'Q1 Financial Ledger & Budgetary Balance', category: 'Finance', tags: ['Operations', 'Excel', 'Budget', 'Alpine Suites'] },
    fr: { name: 'Grand livre financier T1 & Plan budgétaire', category: 'Finance', tags: ['Opérations', 'Excel', 'Budget', 'Suites alpines'] },
    zh: { name: '第一季度财务分类账与预算明细', category: '财务与预算', tags: ['财务管理', '电子表格', '预算分析', '高山房型'] }
  },
  'gal-mgmt-2': {
    en: { name: 'Staffing Synchronicity & Roster Matrix', category: 'Staffing', tags: ['Staffing', 'Scheduler', 'Operations', 'Concurrence'] },
    fr: { name: 'Plannings synchronisés & Matrice d’équipe', category: 'Équipe', tags: ['Plannings', 'Planification', 'Opérations', 'Répartition'] },
    zh: { name: '员工出勤同步与排班排位矩阵', category: '员工培训与排班', tags: ['人事架构', '排班排布', '日常运营', '高密集对齐'] }
  },
  'gal-mgmt-3': {
    en: { name: 'Eco-Compliance and Water Reclamation Study', category: 'Planning', tags: ['Sustainability', 'Greywater', 'Compliance', 'Swiss Alpine'] },
    fr: { name: 'Étude d’éco-compliance et réclame d’eau', category: 'Planification', tags: ['Durabilité', 'Eaux grises', 'Normes', 'Alpes suisses'] },
    zh: { name: '绿色建筑合规与中水循环水回收报告', category: '规划报告', tags: ['环保标准', '中水回收', '瑞士法规范', '低能耗系统'] }
  },
  'gal-mgmt-4': {
    en: { name: 'Standard Operations Handbook (SOP) for Wellness VIPs', category: 'Operations', tags: ['SOP', 'Operations', 'VIP Service', 'Omotenashi'] },
    fr: { name: 'Manuel des opérations standards (SOP) VIP', category: 'Opérations', tags: ['SOP', 'Opérations', 'Service VIP', 'Omotenashi'] },
    zh: { name: '客房理疗VIP标准运营作业程序 (SOP)', category: '日常运营', tags: ['SOP手册', '款待标准', '贵宾通道', '无形服务'] }
  },
  'gal-mgmt-5': {
    en: { name: 'Minimum Turnover Study for Hotels (2025)', category: 'Finance', tags: ['Yield', 'Calculator', 'Acquisition', 'ROI', '2025 Target'] },
    fr: { name: 'Chiffre d\'affaires minimum pour un hôtel (2025)', category: 'Finance', tags: ['Rendement', 'Calculateur', 'Acquisition', 'RSI', 'Objectif 2025'] },
    zh: { name: '2025年度酒店最低营业额与回本测算器', category: '财务与预算', tags: ['收益管理', '测算计算器', '酒店并购', '投资回报率', '2025指标'] }
  }
};
