import { createClient } from '@supabase/supabase-js';

const supabaseUrl = 'https://kbvajtoedjylefsnfdxi.supabase.co';
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImtidmFqdG9lZGp5bGVmc25mZHhpIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzYzNzczMDgsImV4cCI6MjA5MTk1MzMwOH0.R49tDscwTiyj1K10TqyIIAe279z2Z7ESEtfYFLB8Yls';

const supabase = createClient(supabaseUrl, supabaseKey);

const SEED_MILESTONES = [
  {
    year: 2024,
    title: "The Beginning",
    title_ar: "البداية — أنا أحمد",
    description: "Frontend Engineer from Egypt with a passion for building digital experiences.",
    category: 'personal',
    theme: 'dreamy',
    theme_color: '#a78bfa',
    icon: '🚀',
    sort_order: 0,
    is_visible: true,
    metadata: { links: [{ label: 'LinkedIn', url: 'https://linkedin.com/in/ahmed-gomaa-ahmed' }] }
  },
  {
    year: 2019,
    title: "Engineering at Behira",
    title_ar: "هندسة البحيرة — المركز الثالث 🏆",
    description: "Bachelor of Computer Engineering & Computer Science at the High Institute of Engineering and Technology, Behira.",
    category: 'education',
    theme: 'engineering',
    theme_color: '#f97316',
    icon: '🎓',
    sort_order: 1,
    is_visible: true,
    metadata: { gpa: '3.65/4 (A-)', rank: '3rd in class', institution: 'Behira' }
  },
  {
    year: 2023,
    title: "OPKLEY — First Real Job",
    title_ar: "أوبكلي — أول خطوة في السوق",
    description: "Joined OPKLEY as a Frontend Engineer. Revamped legacy web applications improving resource loading by 80%.",
    category: 'work',
    theme: 'neon',
    theme_color: '#10b981',
    icon: '💻',
    sort_order: 2,
    is_visible: true,
    metadata: { company: 'OPKLEY', role: 'Frontend Engineer', skills: ['Next.js', 'Tailwind CSS', 'Redux', 'Twilio', 'Swiper.js'] }
  },
  {
    year: 2025,
    title: "ITI Scholarship",
    title_ar: "منحة الـ ITI — 4 شهور نار 🔥",
    description: "Earned a full-time intensive scholarship at the Information Technology Institute (ITI).",
    category: 'education',
    theme: 'cyber',
    theme_color: '#22d3ee',
    icon: '🎮',
    sort_order: 3,
    is_visible: true,
    metadata: { institution: 'ITI', skills: ['Firebase', 'Supabase', 'Flutter', 'React Native'] }
  },
  {
    year: 2025,
    title: "The Wedding",
    title_ar: "الجواز — فصل جديد 💍",
    description: "Got married and moved to Cairo. Balancing love and code.",
    category: 'personal',
    theme: 'warm',
    theme_color: '#f472b6',
    icon: '💍',
    sort_order: 4,
    is_visible: true,
    metadata: {}
  },
  {
    year: 2025,
    title: "ZAS — Lead Architect",
    title_ar: "نقلة القاهرة — ZAS Lead Architect 🏢",
    description: "Became Lead Frontend Engineer at ZAS, architecting Sky & ZAS ERP.",
    category: 'work',
    theme: 'corporate',
    theme_color: '#3b82f6',
    icon: '✈️',
    sort_order: 5,
    is_visible: true,
    metadata: { company: 'ZAS', role: 'Lead Frontend Engineer', skills: ['React.js', 'TypeScript', 'Zustand', 'React Query'] }
  }
];

async function seed() {
  console.log('Inserting seed milestones...');
  const { data, error } = await supabase.from('milestones').insert(SEED_MILESTONES).select('*');
  if (error) {
    console.error('Error seeding:', error);
  } else {
    console.log('Seeded successfully!', data);
  }
}

seed();
