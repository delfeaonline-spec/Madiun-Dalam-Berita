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
  id: number | string;
  title: string;
  company: string;
  location: string;
  type: 'Full-time' | 'Part-time' | 'Freelance';
  salary: string;
  requirements: string[];
  postedAt: string;
  link?: string;
  description?: string;
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
  imageUrl?: string;
  address?: string;
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
  imageUrl?: string;
  location?: string;
}

export interface RssRotationSource {
  id: string;
  name: string;
  category: string;
  hours: string;
  color: string;
  textAccent: string;
  badgeColor: string;
  borderColor: string;
}

export interface ViralInfoItem {
  id: number;
  platform: 'youtube' | 'facebook' | 'instagram' | 'tiktok';
  title: string;
  sourceUrl: string;
  author: string;
  date: string;
  likes: string;
  views?: string;
  description: string;
  imageUrl?: string;
  location: 'Kabupaten Madiun' | 'Kota Madiun';
}

export interface ComplaintChannel {
  id: number;
  name: string;
  targetRegion: 'Kota Madiun' | 'Kabupaten Madiun' | 'Seluruh Madiun';
  type: 'whatsapp' | 'sms' | 'website' | 'phone' | 'app';
  contactValue: string;
  description: string;
  actionUrl?: string;
}

export interface WeatherInfo {
  temp: string;
  condition: string;
  humidity: string;
  windSpeed: string;
  icon: string;
}

export interface MadiunWeather {
  kota: WeatherInfo;
  kabupaten: WeatherInfo;
  source: string;
  lastUpdated: string;
}


