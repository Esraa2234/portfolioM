
// Resume data for Mahmoud Yosary.
// Used by About, Skills, Resume and Home timeline.

import { projects } from './projects'

// Verified statistics from Mahmoud's CV.
export const stats = [
  {
    value: 6,
    suffix: '+',
    label: {
      ar: 'تطبيقات ويب تم تطويرها',
      en: 'web applications developed',
    },
  },
  {
    value: 90,
    suffix: '%+',
    label: {
      ar: 'نتيجة Lighthouse للأداء في عدة مشاريع',
      en: 'Lighthouse performance score on multiple projects',
    },
  },
  {
    value: projects.length,
    suffix: '',
    label: {
      ar: 'مشروع معروض',
      en: 'featured projects',
    },
  },
]

// Professional experience.
export const experience = [
  {
    key: 'frontend-developer',
    current: true,

    period: {
      ar: 'مايو 2025 – حتى الآن',
      en: 'May 2025 – Present',
    },

    role: {
      ar: 'مطور واجهات أمامية – تدريب ومشاريع شخصية',
      en: 'Frontend Developer Intern / Personal Projects',
    },

    org: {
      ar: 'مشاريع ذاتية وتدريب أونلاين – القاهرة (عن بُعد)',
      en: 'Self-Initiated Projects & Online Training – Cairo (Remote)',
    },

    note: {
      ar: 'تطوير تطبيقات ومواقع ويب باستخدام تقنيات Frontend',
      en: 'Web development and frontend training',
    },

    bullets: {
      ar: [
        'تطوير أكثر من 6 تطبيقات ويب متجاوبة باستخدام HTML5 وCSS3 وJavaScript (ES6+) وReact.js.',
        'تحويل تصميمات UI/UX إلى واجهات نظيفة ومنظمة وتفاعلية وسهلة الاستخدام.',
        'التعامل مع REST APIs لجلب البيانات وإدارتها وعرضها، مع معالجة الأخطاء وحالات التحميل.',
        'تحسين أداء المواقع وتحقيق نتائج Lighthouse Performance Score تتجاوز 90% في عدة مشاريع.',
        'استخدام Git وGitHub لإدارة إصدارات الكود وتنظيم العمل والتعاون.',
        'تحسين توافق المواقع مع المتصفحات المختلفة وتطبيق أساسيات Accessibility وARIA وSemantic HTML.',
      ],

      en: [
        'Developed 6+ responsive web applications using HTML5, CSS3, JavaScript (ES6+), and React.js.',
        'Translated UI/UX designs into clean, maintainable, and interactive user interfaces.',
        'Integrated REST APIs to fetch, manage, and display dynamic data with proper error handling and loading states.',
        'Improved website performance, achieving 90%+ Lighthouse performance scores on multiple projects.',
        'Applied Git and GitHub for version control, branching, and collaborative workflow management.',
        'Ensured cross-browser compatibility and implemented accessibility best practices, including ARIA and semantic HTML.',
      ],
    },

    tech: [
      'HTML5',
      'CSS3',
      'JavaScript (ES6+)',
      'React.js',
      'REST APIs',
      'Git',
      'GitHub',
      'ARIA',
      'Semantic HTML',
    ],
  },
]

// Education.
export const education = [
  {
    key: 'web-development-diploma',

    period: {
      ar: 'أغسطس 2025',
      en: 'August 2025',
    },

    degree: {
      ar: 'دبلومة تطوير الويب',
      en: 'Diploma in Web Development',
    },

    school: {
      ar: 'El Academy Bravo – الزقازيق، مصر',
      en: 'El Academy Bravo – Zagazig, Egypt',
    },

    note: {
      ar: 'دبلومة مكثفة في تطوير الويب Full Stack، شملت تقنيات Frontend وBackend.',
      en: 'Intensive Full Stack Web Development diploma covering frontend and backend technologies.',
    },

    bullets: {
      ar: [
        'تطبيق عملي على HTML وCSS وJavaScript وReact.js.',
        'دراسة أساسيات تطوير Backend وتطوير الخوادم وقواعد البيانات وREST APIs.',
        'تنفيذ مشاريع عملية باستخدام تقنيات تطوير الويب الحديثة وإدارة إصدارات الكود.',
      ],

      en: [
        'Gained hands-on experience building responsive user interfaces using HTML, CSS, JavaScript, and React.js.',
        'Studied backend fundamentals, including server-side development, databases, and REST API integration.',
        'Developed multiple real-world projects using modern development practices and Git version control.',
      ],
    },
  },

  {
    key: 'bachelor-mis',

    period: {
      ar: 'يونيو 2025',
      en: 'June 2025',
    },

    degree: {
      ar: 'بكالوريوس نظم معلومات إدارية',
      en: "Bachelor's Degree in Management Information Systems",
    },

    school: {
      ar: 'معهد الدلتا العالي لنظم المعلومات الإدارية – المنصورة، مصر',
      en: 'Delta Higher Institute for Management Information Systems – Mansoura, Egypt',
    },

    bullets: {
      ar: [
        'دراسة مفاهيم نظم المعلومات وقواعد البيانات وحلول تكنولوجيا الأعمال.',
        'تنفيذ مشاريع عملية في تطوير الويب باستخدام HTML وCSS وJavaScript وPHP وLaravel وMySQL.',
        'تنمية مهارات التحليل وحل المشكلات وتصميم الأنظمة.',
      ],

      en: [
        'Studied core concepts of information systems, databases, and business technology solutions.',
        'Completed practical web development projects using HTML, CSS, JavaScript, PHP, Laravel, and MySQL.',
        'Strengthened analytical, problem-solving, and system design skills.',
      ],
    },
  },

  {
    key: 'full-stack-diploma',

    period: {
      ar: 'أكتوبر 2024',
      en: 'October 2024',
    },

    degree: {
      ar: 'دبلومة تطوير Full Stack Web Development',
      en: 'Diploma in Full Stack Web Development',
    },

    school: {
      ar: 'Creativo Academy – المنصورة، مصر',
      en: 'Creativo Academy – Mansoura, Egypt',
    },

    bullets: {
      ar: [
        'إتمام دبلومة متكاملة في تطوير الويب Full Stack شملت تقنيات Frontend وBackend.',
        'إنشاء واجهات مستخدم تفاعلية باستخدام HTML5 وCSS3 وJavaScript وVue.js.',
        'تطوير تطبيقات Backend باستخدام PHP وMySQL، بما يشمل التعامل مع قواعد البيانات ومنطق العمل على الخادم.',
        'تطبيق ممارسات تطوير الويب الحديثة وإدارة إصدارات الكود باستخدام Git وGitHub في المشاريع العملية.',
      ],

      en: [
        'Completed a Full Stack Web Development diploma covering frontend and backend technologies.',
        'Built interactive user interfaces using HTML5, CSS3, JavaScript, and Vue.js.',
        'Developed backend applications using PHP and MySQL, including database integration and server-side logic.',
        'Applied modern development practices and version control using Git/GitHub in practical projects.',
      ],
    },
  },
]

// Technical skills.
// Skill levels are intentionally omitted because the CV does not specify them.


export const skillGroups = [
  {
    key: 'frontend',
    items: [
      { name: 'HTML5', level: 3 },
      { name: 'CSS3', level: 3 },
      { name: 'JavaScript (ES6+)', level: 3 },
      { name: 'React.js', level: 2 },
      { name: 'Responsive Web Design', level: 3 },
      { name: 'CSS Flexbox & Grid', level: 3 },
      { name: 'DOM Manipulation', level: 3 },
      { name: 'UI/UX Implementation', level: 2 },
      { name: 'Cross-Browser Compatibility', level: 2 },
    ],
  },
  {
    key: 'devops',
    items: [
      { name: 'Git & GitHub', level: 2 },
      { name: 'Version Control', level: 2 },
      { name: 'VS Code', level: 3 },
      { name: 'Chrome Developer Tools', level: 3 },
      { name: 'npm (Basic)', level: 2 },
    ],
  },
  {
    key: 'other',
    items: [
      { name: 'REST API Integration', level: 2 },
      { name: 'Web Performance Optimization', level: 2 },
      { name: 'Accessibility Basics', level: 2 },
      { name: 'ARIA', level: 1 },
      { name: 'Semantic HTML', level: 3 },
    ],
  },
]


// Languages.
export const languages = [
  {
    name: {
      ar: 'العربية',
      en: 'Arabic',
    },

    level: {
      ar: 'اللغة الأم',
      en: 'Native',
    },
  },

  {
    name: {
      ar: 'الإنجليزية',
      en: 'English',
    },

    level: {
      ar: 'إجادة مهنية في العمل',
      en: 'Professional Working Proficiency',
    },
  },
]

// Project names and details are not yet available in the supplied CV.
export const cvProjects = []

// No separate training courses were listed in the supplied CV.
// Education diplomas are already displayed in the Education section.
// export const training = []

// Technical Growth.
// Key technical areas Mahmoud has developed through learning and practice.
export const training = [
  {
    key: 'frontend-development',
    title: {
      ar: 'تطوير الواجهات الأمامية',
      en: 'Modern Frontend Development',
    },
    description: {
      ar: 'تطوير واجهات ويب حديثة وتفاعلية باستخدام HTML وCSS وJavaScript وReact.',
      en: 'Building modern and interactive web interfaces using HTML, CSS, JavaScript, and React.',
    },
    tech: ['HTML5', 'CSS3', 'JavaScript', 'React.js'],
  },

  {
    key: 'responsive-design',
    title: {
      ar: 'تصميم واجهات متجاوبة',
      en: 'Responsive UI Development',
    },
    description: {
      ar: 'إنشاء واجهات متوافقة مع مختلف أحجام الشاشات والأجهزة.',
      en: 'Creating user interfaces that adapt to different screen sizes and devices.',
    },
    tech: ['Responsive Design', 'Flexbox', 'CSS Grid'],
  },

  {
    key: 'api-integration',
    title: {
      ar: 'التعامل مع واجهات البرمجة',
      en: 'API Integration',
    },
    description: {
      ar: 'ربط تطبيقات الويب بمصادر البيانات والتعامل مع REST APIs وعرض البيانات الديناميكية.',
      en: 'Connecting web applications to data sources and working with REST APIs and dynamic data.',
    },
    tech: ['REST APIs', 'JSON', 'JavaScript'],
  },

  {
    key: 'performance',
    title: {
      ar: 'تحسين أداء المواقع',
      en: 'Web Performance Optimization',
    },
    description: {
      ar: 'تحسين سرعة تحميل المواقع وتجربة المستخدم ومراجعة الأداء باستخدام Lighthouse.',
      en: 'Improving website loading speed and user experience using Lighthouse performance audits.',
    },
    tech: ['Lighthouse', 'Performance', 'Accessibility'],
  },

  {
    key: 'version-control',
    title: {
      ar: 'إدارة إصدارات الكود',
      en: 'Version Control & Collaboration',
    },
    description: {
      ar: 'تنظيم الكود وتتبع التعديلات وإدارة المشاريع باستخدام Git وGitHub.',
      en: 'Managing code changes, organizing development workflows, and maintaining projects using Git and GitHub.',
    },
    tech: ['Git', 'GitHub', 'Version Control'],
  },
]

