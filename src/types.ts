export interface NewsItem {
  id: number;
  title: string;
  category: 'Pembangunan' | 'Kuliner' | 'Budaya' | 'Ekonomi' | 'Pendidikan' | 'RSS Antara' | 'RSS Detik' | 'RSS Pemkab' | 'RSS Pemkot';
  date: string;
  readTime: string;
  summary: string;
  content: string;
  author: string;
  imageBg: string; // custom gradient/styling
  link?: string;
  thumbnail?: string;
}

export interface JobItem {
  id: number;
  title: string;
  company: string;
  location: string;
  type: 'Full-time' | 'Part-time' | 'Freelance';
  salary: string;
  requirements: string[];
  postedAt: string;
}

export interface UMKMItem {
  id: number;
  name: string;
  price: number;
  category: 'Makanan' | 'Kerajinan' | 'Jasa' | 'Fashion';
  description: string;
  contact: string;
  seller: string;
  rating: number;
  imageBg: string;
}

export interface CitizenReport {
  id: number;
  title: string;
  reporter: string;
  category: 'Lalu Lintas' | 'Kehilangan' | 'Darurat' | 'Event' | 'Fasilitas' | 'Lainnya';
  time: string;
  urgency: 'Rendah' | 'Sedang' | 'Tinggi';
  upvotes: number;
  comments: { id: number; author: string; text: string; time: string }[];
  description: string;
  isUpvoted?: boolean;
}
