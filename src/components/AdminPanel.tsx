import React, { useState } from 'react';
import { 
  NewsItem, 
  JobItem, 
  UMKMItem, 
  CitizenReport,
  RssRotationSource,
  ViralInfoItem,
  ComplaintChannel,
  MadiunWeather
} from '../types';
import { 
  Lock, 
  Key, 
  ShieldCheck, 
  LogOut, 
  PlusCircle, 
  Edit3, 
  Trash2, 
  Newspaper, 
  Briefcase, 
  ShoppingBag, 
  AlertTriangle, 
  TrendingUp, 
  Settings, 
  Search, 
  X, 
  Check, 
  Info,
  Calendar,
  DollarSign,
  MapPin,
  Phone,
  User,
  Clock,
  Eye,
  AlertCircle,
  UploadCloud,
  Image as ImageIcon,
  Tv,
  Youtube,
  Facebook,
  Instagram,
  RefreshCw,
  CloudSun,
  ExternalLink
} from 'lucide-react';

interface AdminPanelProps {
  newsList: NewsItem[];
  setNewsList: React.Dispatch<React.SetStateAction<NewsItem[]>>;
  jobsList: JobItem[];
  setJobsList: React.Dispatch<React.SetStateAction<JobItem[]>>;
  umkmList: UMKMItem[];
  setUmkmList: React.Dispatch<React.SetStateAction<UMKMItem[]>>;
  reportsList: CitizenReport[];
  setReportsList: React.Dispatch<React.SetStateAction<CitizenReport[]>>;
  tickerText: string;
  setTickerText: (text: string) => void;
  rssSources: RssRotationSource[];
  setRssSources: React.Dispatch<React.SetStateAction<RssRotationSource[]>>;
  viralFeed: ViralInfoItem[];
  setViralFeed: React.Dispatch<React.SetStateAction<ViralInfoItem[]>>;
  complaintChannels: ComplaintChannel[];
  setComplaintChannels: React.Dispatch<React.SetStateAction<ComplaintChannel[]>>;
  triggerToast: (msg: string, type?: 'success' | 'error' | 'info') => void;
  weatherData: MadiunWeather;
  setWeatherData: React.Dispatch<React.SetStateAction<MadiunWeather>>;
  autoGenerateTickerText: () => string;
  portalBgUrl: string;
  setPortalBgUrl: (url: string) => void;
}

export default function AdminPanel({
  newsList,
  setNewsList,
  jobsList,
  setJobsList,
  umkmList,
  setUmkmList,
  reportsList,
  setReportsList,
  tickerText,
  setTickerText,
  rssSources,
  setRssSources,
  viralFeed,
  setViralFeed,
  complaintChannels,
  setComplaintChannels,
  triggerToast,
  weatherData,
  setWeatherData,
  autoGenerateTickerText,
  portalBgUrl,
  setPortalBgUrl
}: AdminPanelProps) {
  // Authentication State
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(() => {
    return localStorage.getItem('bm_admin_logged') === 'true';
  });
  const [pinInput, setPinInput] = useState('');
  const [showPin, setShowPin] = useState(false);

  // Sub Tabs inside Admin Dashboard
  const [subTab, setSubTab] = useState<'news' | 'jobs' | 'umkm' | 'reports' | 'rotation' | 'viral' | 'channels'>('news');
  const [adminSearch, setAdminSearch] = useState('');

  // Form States (Generic Modal for Add / Edit)
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [editMode, setEditMode] = useState<boolean>(false);
  const [activeItemId, setActiveItemId] = useState<number | null>(null);
  const [activeRotationId, setActiveRotationId] = useState<string | null>(null);

  // Draft states for forms
  const [newsDraft, setNewsDraft] = useState<Partial<NewsItem>>({
    title: '',
    category: 'Pembangunan',
    author: '',
    readTime: '3 Menit Baca',
    summary: '',
    content: '',
    imageBg: 'from-emerald-800 to-teal-950',
    date: 'Baru saja'
  });

  const [jobDraft, setJobDraft] = useState<Partial<JobItem>>({
    title: '',
    company: '',
    location: '',
    type: 'Full-time',
    salary: '',
    requirements: [''],
    postedAt: 'Hari ini',
    link: ''
  });

  const [umkmDraft, setUmkmDraft] = useState<Partial<UMKMItem>>({
    name: '',
    price: 0,
    category: 'Makanan',
    description: '',
    contact: '',
    seller: '',
    rating: 5.0,
    imageBg: 'bg-amber-100 text-amber-800',
    address: '',
    imageUrl: ''
  });

  const [reportDraft, setReportDraft] = useState<Partial<CitizenReport>>({
    title: '',
    reporter: '',
    category: 'Lainnya',
    urgency: 'Sedang',
    description: '',
    upvotes: 1,
    time: 'Baru saja',
    comments: [],
    location: '',
    imageUrl: ''
  });

  const [rotationDraft, setRotationDraft] = useState<Partial<RssRotationSource>>({
    name: '',
    category: 'RSS Antara',
    hours: '',
    color: 'from-blue-600 to-indigo-950',
    textAccent: 'text-blue-600',
    badgeColor: 'bg-blue-500 text-white',
    borderColor: 'border-blue-200'
  });

  const [viralDraft, setViralDraft] = useState<Partial<ViralInfoItem>>({
    platform: 'youtube',
    title: '',
    sourceUrl: '',
    author: '',
    date: 'Baru saja',
    likes: '0',
    views: '',
    description: '',
    imageUrl: '',
    location: 'Kota Madiun'
  });

  const [channelDraft, setChannelDraft] = useState<Partial<ComplaintChannel>>({
    name: '',
    targetRegion: 'Kota Madiun',
    type: 'whatsapp',
    contactValue: '',
    description: '',
    actionUrl: ''
  });

  // Delete confirmation modal states
  const [deleteConfirmId, setDeleteConfirmId] = useState<number | null>(null);
  const [deleteConfirmRotationId, setDeleteConfirmRotationId] = useState<string | null>(null);

  // Pre-made imageBg choices for News & UMKM
  const newsGradients = [
    { name: 'Emerald Teal', value: 'from-emerald-800 to-teal-950' },
    { name: 'Amber Orange', value: 'from-amber-700 to-orange-950' },
    { name: 'Blue Indigo', value: 'from-blue-800 to-indigo-950' },
    { name: 'Purple Fuchsia', value: 'from-purple-800 to-fuchsia-950' },
    { name: 'Slate Gray', value: 'from-slate-700 to-slate-900' }
  ];

  const umkmStyles = [
    { name: 'Kuning Amber', value: 'bg-amber-100 text-amber-800' },
    { name: 'Pink Fuchsia', value: 'bg-fuchsia-100 text-fuchsia-800' },
    { name: 'Hijau Emerald', value: 'bg-emerald-100 text-emerald-800' },
    { name: 'Biru Ocean', value: 'bg-blue-100 text-blue-800' },
    { name: 'Orange Sunset', value: 'bg-orange-100 text-orange-800' }
  ];

  // PIN Authentication Handler
  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    if (pinInput === '12345') {
      setIsAuthenticated(true);
      localStorage.setItem('bm_admin_logged', 'true');
      triggerToast('Autentikasi Berhasil! Selamat datang di Dashboard Admin Berita Madiun.', 'success');
      setPinInput('');
    } else {
      triggerToast('PIN Administrasi Salah! Silakan coba lagi.', 'error');
    }
  };

  const handleLogout = () => {
    setIsAuthenticated(false);
    localStorage.removeItem('bm_admin_logged');
    triggerToast('Anda telah keluar dari sesi administrasi.', 'info');
  };

  // Open Add Form
  const openAddForm = () => {
    setEditMode(false);
    setActiveItemId(null);

    // Reset drafts
    if (subTab === 'news') {
      setNewsDraft({
        title: '',
        category: 'Pembangunan',
        author: 'Admin Portal',
        readTime: '3 Menit Baca',
        summary: '',
        content: '',
        imageBg: 'from-emerald-800 to-teal-950',
        date: 'Baru saja'
      });
    } else if (subTab === 'jobs') {
      setJobDraft({
        title: '',
        company: '',
        location: 'Madiun Raya',
        type: 'Full-time',
        salary: 'Rp 1.800.000 - Rp 2.200.000',
        requirements: [''],
        postedAt: 'Hari ini',
        link: ''
      });
    } else if (subTab === 'umkm') {
      setUmkmDraft({
        name: '',
        price: 0,
        category: 'Makanan',
        description: '',
        contact: '628',
        seller: '',
        rating: 5.0,
        imageBg: 'bg-amber-100 text-amber-800',
        address: '',
        imageUrl: ''
      });
    } else if (subTab === 'reports') {
      setReportDraft({
        title: '',
        reporter: 'Warga Madiun',
        category: 'Lainnya',
        urgency: 'Sedang',
        description: '',
        upvotes: 1,
        time: 'Baru saja',
        comments: [],
        location: '',
        imageUrl: ''
      });
    } else if (subTab === 'rotation') {
      setRotationDraft({
        name: '',
        category: 'RSS Antara',
        hours: '',
        color: 'from-blue-600 to-indigo-950',
        textAccent: 'text-blue-600',
        badgeColor: 'bg-blue-500 text-white',
        borderColor: 'border-blue-200'
      });
      setActiveRotationId(null);
    } else if (subTab === 'viral') {
      setViralDraft({
        platform: 'youtube',
        title: '',
        sourceUrl: '',
        author: '',
        date: 'Baru saja',
        likes: '0',
        views: '',
        description: '',
        imageUrl: '',
        location: 'Kota Madiun'
      });
    } else if (subTab === 'channels') {
      setChannelDraft({
        name: '',
        targetRegion: 'Kota Madiun',
        type: 'whatsapp',
        contactValue: '',
        description: '',
        actionUrl: ''
      });
    }
    setIsFormOpen(true);
  };

  // Open Edit Form
  const openEditForm = (item: any) => {
    setEditMode(true);
    setActiveItemId(item.id || null);

    if (subTab === 'news') {
      setNewsDraft({ ...item });
    } else if (subTab === 'jobs') {
      setJobDraft({ ...item, requirements: [...item.requirements] });
    } else if (subTab === 'umkm') {
      setUmkmDraft({ ...item });
    } else if (subTab === 'reports') {
      setReportDraft({ ...item });
    } else if (subTab === 'rotation') {
      setRotationDraft({ ...item });
      setActiveRotationId(item.id);
    } else if (subTab === 'viral') {
      setViralDraft({ ...item });
    } else if (subTab === 'channels') {
      setChannelDraft({ ...item });
    }
    setIsFormOpen(true);
  };

  // Form Submission
  const handleFormSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (subTab === 'news') {
      if (!newsDraft.title || !newsDraft.summary || !newsDraft.content || !newsDraft.author) {
        triggerToast('Harap isi semua kolom berita!', 'error');
        return;
      }
      if (editMode && activeItemId) {
        setNewsList(prev => prev.map(n => n.id === activeItemId ? { ...n, ...newsDraft } as NewsItem : n));
        triggerToast('Berita berhasil diperbarui!', 'success');
      } else {
        const newItem: NewsItem = {
          id: Date.now(),
          title: newsDraft.title!,
          category: newsDraft.category as NewsItem['category'],
          date: 'Baru saja',
          readTime: newsDraft.readTime || '3 Menit Baca',
          summary: newsDraft.summary!,
          content: newsDraft.content!,
          author: newsDraft.author!,
          imageBg: newsDraft.imageBg || 'from-emerald-800 to-teal-950'
        };
        setNewsList(prev => [newItem, ...prev]);
        triggerToast('Berita baru berhasil ditambahkan!', 'success');
      }
    } else if (subTab === 'jobs') {
      if (!jobDraft.title || !jobDraft.company || !jobDraft.location || !jobDraft.salary) {
        triggerToast('Harap isi semua kolom lowongan kerja!', 'error');
        return;
      }
      const filteredReqs = jobDraft.requirements?.filter(r => r.trim() !== '') || ['Kualifikasi umum'];
      if (editMode && activeItemId) {
        setJobsList(prev => prev.map(j => j.id === activeItemId ? { ...j, ...jobDraft, requirements: filteredReqs } as JobItem : j));
        triggerToast('Lowongan kerja berhasil diperbarui!', 'success');
      } else {
        const newItem: JobItem = {
          id: Date.now(),
          title: jobDraft.title!,
          company: jobDraft.company!,
          location: jobDraft.location!,
          type: jobDraft.type as JobItem['type'],
          salary: jobDraft.salary!,
          requirements: filteredReqs,
          postedAt: 'Hari ini',
          link: jobDraft.link || ''
        };
        setJobsList(prev => [newItem, ...prev]);
        triggerToast('Lowongan kerja baru berhasil ditambahkan!', 'success');
      }
    } else if (subTab === 'umkm') {
      if (!umkmDraft.name || !umkmDraft.seller || !umkmDraft.contact || umkmDraft.price === undefined) {
        triggerToast('Harap lengkapi semua kolom UMKM!', 'error');
        return;
      }
      // sanitize contact to starts with 62
      let contact = umkmDraft.contact.trim();
      if (contact.startsWith('0')) {
        contact = '62' + contact.slice(1);
      }

      if (editMode && activeItemId) {
        setUmkmList(prev => prev.map(u => u.id === activeItemId ? { ...u, ...umkmDraft, contact } as UMKMItem : u));
        triggerToast('Produk UMKM berhasil diperbarui!', 'success');
      } else {
        const newItem: UMKMItem = {
          id: Date.now(),
          name: umkmDraft.name!,
          price: Number(umkmDraft.price),
          category: umkmDraft.category as UMKMItem['category'],
          description: umkmDraft.description || 'Tidak ada deskripsi.',
          contact,
          seller: umkmDraft.seller!,
          rating: umkmDraft.rating || 5.0,
          imageBg: umkmDraft.imageBg || 'bg-amber-100 text-amber-800',
          address: umkmDraft.address || '',
          imageUrl: umkmDraft.imageUrl || ''
        };
        setUmkmList(prev => [newItem, ...prev]);
        triggerToast('Produk UMKM baru berhasil dipromosikan!', 'success');
      }
    } else if (subTab === 'reports') {
      if (!reportDraft.title || !reportDraft.reporter || !reportDraft.description) {
        triggerToast('Harap isi semua kolom laporan warga!', 'error');
        return;
      }
      if (editMode && activeItemId) {
        setReportsList(prev => prev.map(r => r.id === activeItemId ? { ...r, ...reportDraft } as CitizenReport : r));
        triggerToast('Laporan warga berhasil diperbarui!', 'success');
      } else {
        const newItem: CitizenReport = {
          id: Date.now(),
          title: reportDraft.title!,
          reporter: reportDraft.reporter!,
          category: reportDraft.category as CitizenReport['category'],
          time: 'Baru saja',
          urgency: reportDraft.urgency as CitizenReport['urgency'],
          upvotes: Number(reportDraft.upvotes) || 1,
          comments: reportDraft.comments || [],
          description: reportDraft.description!,
          location: reportDraft.location || '',
          imageUrl: reportDraft.imageUrl || ''
        };
        setReportsList(prev => [newItem, ...prev]);
        triggerToast('Laporan kejadian warga baru berhasil dipublikasikan!', 'success');
      }
    } else if (subTab === 'rotation') {
      if (!rotationDraft.name || !rotationDraft.category || !rotationDraft.hours) {
        triggerToast('Harap isi nama, kategori RSS, dan jam giliran!', 'error');
        return;
      }
      if (editMode && activeRotationId) {
        setRssSources(prev => prev.map(r => r.id === activeRotationId ? { ...r, ...rotationDraft } as RssRotationSource : r));
        triggerToast('Jadwal giliran berhasil diperbarui!', 'success');
      } else {
        const newItem: RssRotationSource = {
          id: 'rot_' + Date.now(),
          name: rotationDraft.name!,
          category: rotationDraft.category!,
          hours: rotationDraft.hours!,
          color: rotationDraft.color || 'from-blue-600 to-indigo-950',
          textAccent: rotationDraft.textAccent || 'text-blue-600',
          badgeColor: rotationDraft.badgeColor || 'bg-blue-500 text-white',
          borderColor: rotationDraft.borderColor || 'border-blue-200'
        };
        setRssSources(prev => [...prev, newItem]);
        triggerToast('Jadwal giliran baru berhasil ditambahkan!', 'success');
      }
    } else if (subTab === 'viral') {
      if (!viralDraft.title || !viralDraft.author || !viralDraft.sourceUrl) {
        triggerToast('Harap isi judul, pengunggah (author), dan tautan sumber!', 'error');
        return;
      }
      if (editMode && activeItemId) {
        setViralFeed(prev => prev.map(v => v.id === activeItemId ? { ...v, ...viralDraft } as ViralInfoItem : v));
        triggerToast('Info viral berhasil diperbarui!', 'success');
      } else {
        const newItem: ViralInfoItem = {
          id: Date.now(),
          platform: (viralDraft.platform || 'youtube') as ViralInfoItem['platform'],
          title: viralDraft.title!,
          sourceUrl: viralDraft.sourceUrl!,
          author: viralDraft.author!,
          date: viralDraft.date || 'Baru saja',
          likes: viralDraft.likes || '0',
          views: viralDraft.views || '',
          description: viralDraft.description || '',
          imageUrl: viralDraft.imageUrl || '',
          location: (viralDraft.location || 'Kota Madiun') as ViralInfoItem['location']
        };
        setViralFeed(prev => [newItem, ...prev]);
        triggerToast('Info viral baru berhasil ditambahkan!', 'success');
      }
    } else if (subTab === 'channels') {
      if (!channelDraft.name || !channelDraft.contactValue || !channelDraft.description) {
        triggerToast('Harap isi nama saluran, nilai kontak, dan deskripsi!', 'error');
        return;
      }
      if (editMode && activeItemId) {
        setComplaintChannels(prev => prev.map(c => c.id === activeItemId ? { ...c, ...channelDraft } as ComplaintChannel : c));
        triggerToast('Saluran pengaduan berhasil diperbarui!', 'success');
      } else {
        const newItem: ComplaintChannel = {
          id: Date.now(),
          name: channelDraft.name!,
          targetRegion: (channelDraft.targetRegion || 'Seluruh Madiun') as ComplaintChannel['targetRegion'],
          type: (channelDraft.type || 'whatsapp') as ComplaintChannel['type'],
          contactValue: channelDraft.contactValue!,
          description: channelDraft.description!,
          actionUrl: channelDraft.actionUrl || ''
        };
        setComplaintChannels(prev => [...prev, newItem]);
        triggerToast('Saluran pengaduan baru berhasil ditambahkan!', 'success');
      }
    }

    setIsFormOpen(false);
  };

  // Delete Item handler
  const handleDeleteItem = (id: number) => {
    if (subTab === 'news') {
      setNewsList(prev => prev.filter(n => n.id !== id));
      triggerToast('Berita berhasil dihapus!', 'success');
    } else if (subTab === 'jobs') {
      setJobsList(prev => prev.filter(j => j.id !== id));
      triggerToast('Lowongan kerja berhasil dihapus!', 'success');
    } else if (subTab === 'umkm') {
      setUmkmList(prev => prev.filter(u => u.id !== id));
      triggerToast('Produk UMKM berhasil dihapus!', 'success');
    } else if (subTab === 'reports') {
      setReportsList(prev => prev.filter(r => r.id !== id));
      triggerToast('Laporan warga berhasil dihapus!', 'success');
    } else if (subTab === 'viral') {
      setViralFeed(prev => prev.filter(v => v.id !== id));
      triggerToast('Info viral berhasil dihapus!', 'success');
    } else if (subTab === 'channels') {
      setComplaintChannels(prev => prev.filter(c => c.id !== id));
      triggerToast('Saluran pengaduan berhasil dihapus!', 'success');
    }
    setDeleteConfirmId(null);
  };

  const handleDeleteRotationItem = (id: string) => {
    setRssSources(prev => prev.filter(r => r.id !== id));
    triggerToast('Jadwal giliran berhasil dihapus!', 'success');
    setDeleteConfirmRotationId(null);
  };

  const resetChannelsToDefault = () => {
    const defaults: ComplaintChannel[] = [
      {
        id: 1,
        name: 'Call Center Kota Madiun (24 Jam)',
        targetRegion: 'Kota Madiun',
        type: 'phone',
        contactValue: '112',
        description: 'Layanan panggilan darurat bebas pulsa 24 jam untuk segala jenis kejadian darurat di Kota Madiun.',
        actionUrl: 'tel:112'
      },
      {
        id: 2,
        name: 'WhatsApp Awak Sigap (Kota Madiun)',
        targetRegion: 'Kota Madiun',
        type: 'whatsapp',
        contactValue: '08113577800',
        description: 'Layanan aduan tanggap cepat khusus untuk seluruh warga Kota Madiun via WhatsApp.',
        actionUrl: 'https://wa.me/628113577800'
      },
      {
        id: 3,
        name: 'Damkar Kota Madiun',
        targetRegion: 'Kota Madiun',
        type: 'phone',
        contactValue: '(0351) 482255',
        description: 'Layanan Pemadam Kebakaran Kota Madiun untuk penanggulangan kebakaran dan penyelamatan darurat.',
        actionUrl: 'tel:0351482255'
      },
      {
        id: 4,
        name: 'Satpol PP & Damkar Kota Madiun (Kantor)',
        targetRegion: 'Kota Madiun',
        type: 'phone',
        contactValue: '(0351) 463258',
        description: 'Kantor Satuan Polisi Pamong Praja & Pemadam Kebakaran Kota Madiun untuk pengaduan ketertiban umum.',
        actionUrl: 'tel:0351463258'
      },
      {
        id: 5,
        name: 'BPBD Kabupaten Madiun',
        targetRegion: 'Kabupaten Madiun',
        type: 'phone',
        contactValue: '085299006620',
        description: 'Badan Penanggulangan Bencana Daerah Kabupaten Madiun untuk kedaruratan bencana alam & non-alam.',
        actionUrl: 'tel:085299006620'
      },
      {
        id: 6,
        name: 'Pemadam Kebakaran Kab. Madiun',
        targetRegion: 'Kabupaten Madiun',
        type: 'phone',
        contactValue: '(0351)491991 (08113751700) (08113781700)',
        description: 'Pos Siaga Pemadam Kebakaran Kabupaten Madiun. Hubungi kontak darurat untuk penanganan segera.',
        actionUrl: 'tel:0351491991'
      },
      {
        id: 7,
        name: 'PMI Kabupaten Madiun',
        targetRegion: 'Kabupaten Madiun',
        type: 'phone',
        contactValue: '0895400306989',
        description: 'Palang Merah Indonesia Kabupaten Madiun untuk layanan ambulans, donor darah, dan bantuan kemainan.',
        actionUrl: 'tel:0895400306989'
      },
      {
        id: 8,
        name: 'RSUD Caruban',
        targetRegion: 'Kabupaten Madiun',
        type: 'phone',
        contactValue: '0351 383956',
        description: 'Rumah Sakit Umum Daerah Caruban untuk layanan Unit Gawat Darurat (UGD) dan medis siaga.',
        actionUrl: 'tel:0351383956'
      }
    ];
    setComplaintChannels(defaults);
    triggerToast('Saluran pengaduan berhasil dikembalikan ke data default instansi resmi!', 'success');
  };

  // Requirements fields managers for jobs
  const handleAddRequirement = () => {
    setJobDraft(prev => ({
      ...prev,
      requirements: [...(prev.requirements || []), '']
    }));
  };

  const handleRequirementChange = (index: number, val: string) => {
    setJobDraft(prev => {
      const copy = [...(prev.requirements || [])];
      copy[index] = val;
      return { ...prev, requirements: copy };
    });
  };

  const handleRemoveRequirement = (index: number) => {
    setJobDraft(prev => {
      const copy = [...(prev.requirements || [])];
      copy.splice(index, 1);
      return { ...prev, requirements: copy.length === 0 ? [''] : copy };
    });
  };

  // Filter lists in admin panel based on admin search query
  const searchedNews = newsList.filter(n => n.title.toLowerCase().includes(adminSearch.toLowerCase()) || n.author.toLowerCase().includes(adminSearch.toLowerCase()));
  const searchedJobs = jobsList.filter(j => j.title.toLowerCase().includes(adminSearch.toLowerCase()) || j.company.toLowerCase().includes(adminSearch.toLowerCase()));
  const searchedUMKMs = umkmList.filter(u => u.name.toLowerCase().includes(adminSearch.toLowerCase()) || u.seller.toLowerCase().includes(adminSearch.toLowerCase()));
  const searchedReports = reportsList.filter(r => r.title.toLowerCase().includes(adminSearch.toLowerCase()) || r.reporter.toLowerCase().includes(adminSearch.toLowerCase()));
  const searchedRotations = rssSources.filter(r => r.name.toLowerCase().includes(adminSearch.toLowerCase()) || r.category.toLowerCase().includes(adminSearch.toLowerCase()));
  const searchedViral = viralFeed.filter(v => v.title.toLowerCase().includes(adminSearch.toLowerCase()) || v.author.toLowerCase().includes(adminSearch.toLowerCase()) || v.location.toLowerCase().includes(adminSearch.toLowerCase()));
  const searchedChannels = complaintChannels.filter(c => 
    c.name.toLowerCase().includes(adminSearch.toLowerCase()) || 
    c.targetRegion.toLowerCase().includes(adminSearch.toLowerCase()) || 
    c.description.toLowerCase().includes(adminSearch.toLowerCase())
  );

  // Lock Screen View if not Authenticated
  if (!isAuthenticated) {
    return (
      <div className="max-w-md mx-auto my-12 bg-white rounded-3xl p-8 border border-slate-100 shadow-xl text-center" id="admin-lock-screen">
        <div className="mx-auto w-16 h-16 bg-emerald-50 rounded-2xl flex items-center justify-center text-emerald-600 mb-6 border border-emerald-100">
          <Lock className="h-8 w-8" />
        </div>
        <h2 className="text-2xl font-extrabold text-slate-900 font-serif mb-2">Panel Administrasi</h2>
        <p className="text-slate-500 text-xs sm:text-sm leading-relaxed mb-6">
          Halaman ini khusus untuk Pengelola Portal Berita Madiun. Masukkan PIN keamanan untuk mengakses instrumen tambah, edit, dan hapus konten.
        </p>

        {/* Informative Hint */}
        <div className="bg-amber-50 border border-amber-200 text-amber-900 rounded-2xl p-4 text-xs font-semibold mb-6 flex items-start text-left">
          <Key className="h-5 w-5 text-amber-600 mr-2.5 shrink-0 mt-0.5" />
          <div>
            <p className="font-bold">Informasi Akses Simulasi:</p>
            <p className="font-medium text-amber-800 mt-1">Masukkan PIN default penguji berikut ini:</p>
            <p className="text-sm font-extrabold tracking-widest text-slate-900 bg-white/70 px-2 py-0.5 rounded border border-amber-300 mt-1.5 inline-block text-center">12345</p>
          </div>
        </div>

        <form onSubmit={handleLogin} className="space-y-4">
          <div className="relative">
            <span className="absolute inset-y-0 left-0 flex items-center pl-3.5 text-slate-400">
              <Key className="h-4.5 w-4.5" />
            </span>
            <input
              type={showPin ? 'text' : 'password'}
              maxLength={10}
              placeholder="Masukkan PIN Admin"
              value={pinInput}
              onChange={(e) => setPinInput(e.target.value)}
              className="w-full bg-slate-50 border border-slate-200 rounded-2xl py-3 pl-11 pr-12 text-center text-sm font-bold tracking-widest focus:outline-none focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500 transition-all"
              required
            />
            <button
              type="button"
              onClick={() => setShowPin(!showPin)}
              className="absolute inset-y-0 right-0 pr-3.5 flex items-center text-xs font-bold text-slate-400 hover:text-slate-600"
            >
              {showPin ? 'Sembunyikan' : 'Lihat'}
            </button>
          </div>

          <button
            type="submit"
            className="w-full bg-slate-900 hover:bg-slate-800 text-white font-bold py-3 px-4 rounded-2xl text-xs sm:text-sm transition duration-200 shadow"
          >
            Masuk Sesi Pengelola
          </button>
        </form>
      </div>
    );
  }

  // Admin Dashboard View
  return (
    <div className="space-y-8" id="admin-portal-dashboard">
      
      {/* Admin Panel Header / Top Summary */}
      <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-100 shadow-sm flex flex-col md:flex-row justify-between items-start md:items-center gap-6" id="admin-header-panel">
        <div>
          <div className="flex items-center space-x-2">
            <span className="h-2.5 w-2.5 rounded-full bg-emerald-500 animate-pulse"></span>
            <span className="text-[10px] font-bold tracking-wider uppercase text-emerald-600 bg-emerald-50 px-2.5 py-0.5 rounded-full">Sesi Aktif Pengelola</span>
          </div>
          <h2 className="text-2xl font-extrabold text-slate-900 font-serif mt-2 flex items-center gap-2">
            <ShieldCheck className="h-6 w-6 text-emerald-600" /> Pusat Manajemen Konten
          </h2>
          <p className="text-slate-500 text-xs sm:text-sm mt-1">
            Gunakan instrumen di bawah untuk mengedit, menambah, dan menghapus seluruh menu & kategori portal.
          </p>
        </div>
        
        <button
          onClick={handleLogout}
          className="bg-rose-50 hover:bg-rose-100 text-rose-700 font-bold py-2.5 px-4 rounded-xl text-xs transition duration-150 border border-rose-100 flex items-center gap-1.5 self-end md:self-auto"
        >
          <LogOut className="h-4 w-4" /> Keluar Sesi Admin
        </button>
      </div>

      {/* QUICK STATS CARDS */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6" id="admin-stats-grid">
        <div className="bg-white p-5 rounded-3xl border border-slate-100 shadow-sm flex items-center justify-between">
          <div>
            <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400 block">Total Berita</span>
            <span className="text-2xl font-extrabold text-slate-900 mt-1 block">{newsList.length}</span>
            <span className="text-[10px] text-emerald-600 font-semibold flex items-center mt-1">● Publik</span>
          </div>
          <div className="h-11 w-11 rounded-xl bg-slate-50 text-slate-700 flex items-center justify-center border border-slate-100">
            <Newspaper className="h-5 w-5" />
          </div>
        </div>

        <div className="bg-white p-5 rounded-3xl border border-slate-100 shadow-sm flex items-center justify-between">
          <div>
            <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400 block">Total Loker</span>
            <span className="text-2xl font-extrabold text-slate-900 mt-1 block">{jobsList.length}</span>
            <span className="text-[10px] text-emerald-600 font-semibold flex items-center mt-1">● Publik</span>
          </div>
          <div className="h-11 w-11 rounded-xl bg-slate-50 text-slate-700 flex items-center justify-center border border-slate-100">
            <Briefcase className="h-5 w-5" />
          </div>
        </div>

        <div className="bg-white p-5 rounded-3xl border border-slate-100 shadow-sm flex items-center justify-between">
          <div>
            <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400 block">Total UMKM</span>
            <span className="text-2xl font-extrabold text-slate-900 mt-1 block">{umkmList.length}</span>
            <span className="text-[10px] text-emerald-600 font-semibold flex items-center mt-1">● Publik</span>
          </div>
          <div className="h-11 w-11 rounded-xl bg-slate-50 text-slate-700 flex items-center justify-center border border-slate-100">
            <ShoppingBag className="h-5 w-5" />
          </div>
        </div>

        <div className="bg-white p-5 rounded-3xl border border-slate-100 shadow-sm flex items-center justify-between">
          <div>
            <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400 block">Laporan Warga</span>
            <span className="text-2xl font-extrabold text-slate-900 mt-1 block">{reportsList.length}</span>
            <span className="text-[10px] text-amber-600 font-semibold flex items-center mt-1">● Interaktif</span>
          </div>
          <div className="h-11 w-11 rounded-xl bg-slate-50 text-slate-700 flex items-center justify-center border border-slate-100">
            <AlertTriangle className="h-5 w-5 text-amber-500" />
          </div>
        </div>
      </div>

      {/* PORTAL FEATURES, TICKER & WEATHER MANAGER */}
      <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-100 shadow-sm space-y-8" id="admin-ticker-editor">
        
        {/* Ticker Section */}
        <div>
          <h3 className="text-sm font-extrabold text-slate-900 uppercase tracking-wider flex items-center justify-between gap-2 mb-3">
            <span className="flex items-center gap-2">
              <Settings className="h-4.5 w-4.5 text-slate-500" /> Teks Berita Berjalan (Madiun Hari Ini)
            </span>
            <span className="text-[10px] bg-amber-500 text-white px-2 py-0.5 rounded-full font-bold uppercase tracking-wider">Live Ticker</span>
          </h3>
          <p className="text-xs text-slate-500 leading-relaxed mb-4">
            Teks ini berjalan secara horizontal di bagian atas seluruh halaman situs untuk menyalurkan pengumuman darurat, prakiraan cuaca, atau agenda acara terbaru.
          </p>
          <div className="space-y-3">
            <div className="flex flex-col sm:flex-row gap-3">
              <input
                type="text"
                value={tickerText}
                onChange={(e) => setTickerText(e.target.value)}
                className="flex-1 bg-slate-50 border border-slate-200 rounded-2xl py-2.5 px-4 text-xs sm:text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500 font-semibold"
                placeholder="Ketik teks pengumuman penting portal..."
              />
              <button
                onClick={() => triggerToast('Pengumuman Ticker Berhasil Disimpan!', 'success')}
                className="bg-emerald-600 hover:bg-emerald-700 text-white font-bold py-2.5 px-4 rounded-xl text-xs transition duration-150 shadow"
              >
                Terapkan
              </button>
            </div>

            <div className="flex flex-wrap items-center gap-2 pt-1">
              <button
                type="button"
                onClick={() => {
                  const generated = autoGenerateTickerText();
                  if (generated) {
                    triggerToast('Berhasil membuat ticker info hit secara otomatis!', 'success');
                  }
                }}
                className="flex items-center gap-1.5 text-[10px] font-extrabold text-indigo-700 hover:text-white bg-indigo-50 hover:bg-indigo-600 border border-indigo-100 rounded-lg px-3 py-2 transition cursor-pointer"
                title="Menyusun pengumuman berjalan secara pintar dari berita terbaru, aduan, dan cuaca"
              >
                <RefreshCw className="h-3 w-3 animate-spin-slow" />
                <span>Generasi Otomatis "Madiun Hari Ini" (Trending & Cuaca)</span>
              </button>
            </div>
          </div>
        </div>

        <hr className="border-slate-100" />

        {/* BMKG Weather Forecast Section */}
        <div>
          <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-3 mb-4">
            <div>
              <h3 className="text-sm font-extrabold text-slate-900 uppercase tracking-wider flex items-center gap-2">
                <CloudSun className="h-5 w-5 text-emerald-600" /> Prakiraan Cuaca Madiun Raya
              </h3>
              <p className="text-xs text-slate-500 leading-relaxed mt-1">
                Atur prakiraan cuaca umum yang tampil pada header portal. Sinkronisasikan langsung dari data satelit BMKG Jawa Timur atau edit manual bila diperlukan.
              </p>
            </div>
            
            <button
              type="button"
              onClick={async () => {
                triggerToast('Menghubungi satelit BMKG...', 'info');
                try {
                  const res = await fetch('/api/weather');
                  if (res.ok) {
                    const data = await res.json();
                    if (data && data.kota && data.kabupaten) {
                      setWeatherData(data);
                      triggerToast('Prakiraan cuaca berhasil diperbarui langsung dari BMKG!', 'success');
                    } else {
                      throw new Error('Data format error');
                    }
                  } else {
                    throw new Error('Server returned error');
                  }
                } catch (err) {
                  triggerToast('Gagal memuat cuaca dari BMKG, menggunakan simulasi offline terperinci', 'error');
                }
              }}
              className="flex items-center justify-center gap-1.5 bg-white hover:bg-slate-50 text-emerald-700 font-extrabold py-2 px-3.5 rounded-xl text-xs border border-slate-200 shadow-sm transition shrink-0 cursor-pointer"
              title="Ambil data perkiraan cuaca real-time dari BMKG"
            >
              <RefreshCw className="h-3.5 w-3.5" />
              <span>Sinkronkan Cuaca dari BMKG</span>
            </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 bg-slate-50 p-5 rounded-3xl border border-slate-150">
            {/* Kota Madiun Weather Form */}
            <div className="space-y-4">
              <div className="flex items-center gap-2 pb-2 border-b border-slate-200">
                <span className="text-sm font-bold text-slate-800">🏢 Kota Madiun</span>
                <span className="text-[9px] bg-slate-200 text-slate-600 font-bold px-1.5 py-0.5 rounded uppercase">Metropolitan</span>
              </div>
              
              <div className="grid grid-cols-2 gap-3">
                <div className="space-y-1">
                  <label className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block">Suhu</label>
                  <input
                    type="text"
                    value={weatherData.kota.temp}
                    onChange={(e) => setWeatherData({
                      ...weatherData,
                      kota: { ...weatherData.kota, temp: e.target.value }
                    })}
                    className="w-full bg-white border border-slate-200 rounded-xl py-2 px-3 text-xs focus:outline-none focus:ring-2 focus:ring-emerald-500/20 font-bold text-slate-800"
                    placeholder="Contoh: 31°C"
                  />
                </div>

                <div className="space-y-1">
                  <label className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block">Kondisi</label>
                  <select
                    value={weatherData.kota.condition}
                    onChange={(e) => {
                      const cond = e.target.value;
                      let icon = '☁️';
                      if (cond === 'Cerah') icon = '☀️';
                      else if (cond === 'Cerah Berawan') icon = '⛅';
                      else if (cond === 'Hujan Ringan' || cond === 'Hujan Sedang') icon = '🌧️';
                      else if (cond === 'Hujan Petir') icon = '⛈️';
                      
                      setWeatherData({
                        ...weatherData,
                        kota: { ...weatherData.kota, condition: cond, icon }
                      });
                    }}
                    className="w-full bg-white border border-slate-200 rounded-xl py-2 px-2.5 text-xs focus:outline-none focus:ring-2 focus:ring-emerald-500/20 font-bold text-slate-800"
                  >
                    <option value="Cerah">☀️ Cerah</option>
                    <option value="Cerah Berawan">⛅ Cerah Berawan</option>
                    <option value="Berawan">☁️ Berawan</option>
                    <option value="Hujan Ringan">🌧️ Hujan Ringan</option>
                    <option value="Hujan Sedang">🌧️ Hujan Sedang</option>
                    <option value="Hujan Petir">⛈️ Hujan Petir</option>
                    <option value="Kabut">🌫️ Kabut</option>
                  </select>
                </div>

                <div className="space-y-1">
                  <label className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block">Kelembaban</label>
                  <input
                    type="text"
                    value={weatherData.kota.humidity}
                    onChange={(e) => setWeatherData({
                      ...weatherData,
                      kota: { ...weatherData.kota, humidity: e.target.value }
                    })}
                    className="w-full bg-white border border-slate-200 rounded-xl py-2 px-3 text-xs focus:outline-none focus:ring-2 focus:ring-emerald-500/20 font-medium text-slate-700"
                    placeholder="Contoh: 65%"
                  />
                </div>

                <div className="space-y-1">
                  <label className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block">Kec. Angin</label>
                  <input
                    type="text"
                    value={weatherData.kota.windSpeed}
                    onChange={(e) => setWeatherData({
                      ...weatherData,
                      kota: { ...weatherData.kota, windSpeed: e.target.value }
                    })}
                    className="w-full bg-white border border-slate-200 rounded-xl py-2 px-3 text-xs focus:outline-none focus:ring-2 focus:ring-emerald-500/20 font-medium text-slate-700"
                    placeholder="Contoh: 12 km/j"
                  />
                </div>
              </div>
            </div>

            {/* Kabupaten Madiun Weather Form */}
            <div className="space-y-4">
              <div className="flex items-center gap-2 pb-2 border-b border-slate-200">
                <span className="text-sm font-bold text-slate-800">🌳 Kabupaten Madiun (Caruban)</span>
                <span className="text-[9px] bg-slate-200 text-slate-600 font-bold px-1.5 py-0.5 rounded uppercase">Caruban</span>
              </div>
              
              <div className="grid grid-cols-2 gap-3">
                <div className="space-y-1">
                  <label className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block">Suhu</label>
                  <input
                    type="text"
                    value={weatherData.kabupaten.temp}
                    onChange={(e) => setWeatherData({
                      ...weatherData,
                      kabupaten: { ...weatherData.kabupaten, temp: e.target.value }
                    })}
                    className="w-full bg-white border border-slate-200 rounded-xl py-2 px-3 text-xs focus:outline-none focus:ring-2 focus:ring-emerald-500/20 font-bold text-slate-800"
                    placeholder="Contoh: 29°C"
                  />
                </div>

                <div className="space-y-1">
                  <label className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block">Kondisi</label>
                  <select
                    value={weatherData.kabupaten.condition}
                    onChange={(e) => {
                      const cond = e.target.value;
                      let icon = '☁️';
                      if (cond === 'Cerah') icon = '☀️';
                      else if (cond === 'Cerah Berawan') icon = '⛅';
                      else if (cond === 'Hujan Ringan' || cond === 'Hujan Sedang') icon = '🌧️';
                      else if (cond === 'Hujan Petir') icon = '⛈️';
                      
                      setWeatherData({
                        ...weatherData,
                        kabupaten: { ...weatherData.kabupaten, condition: cond, icon }
                      });
                    }}
                    className="w-full bg-white border border-slate-200 rounded-xl py-2 px-2.5 text-xs focus:outline-none focus:ring-2 focus:ring-emerald-500/20 font-bold text-slate-800"
                  >
                    <option value="Cerah">☀️ Cerah</option>
                    <option value="Cerah Berawan">⛅ Cerah Berawan</option>
                    <option value="Berawan">☁️ Berawan</option>
                    <option value="Hujan Ringan">🌧️ Hujan Ringan</option>
                    <option value="Hujan Sedang">🌧️ Hujan Sedang</option>
                    <option value="Hujan Petir">⛈️ Hujan Petir</option>
                    <option value="Kabut">🌫️ Kabut</option>
                  </select>
                </div>

                <div className="space-y-1">
                  <label className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block">Kelembaban</label>
                  <input
                    type="text"
                    value={weatherData.kabupaten.humidity}
                    onChange={(e) => setWeatherData({
                      ...weatherData,
                      kabupaten: { ...weatherData.kabupaten, humidity: e.target.value }
                    })}
                    className="w-full bg-white border border-slate-200 rounded-xl py-2 px-3 text-xs focus:outline-none focus:ring-2 focus:ring-emerald-500/20 font-medium text-slate-700"
                    placeholder="Contoh: 72%"
                  />
                </div>

                <div className="space-y-1">
                  <label className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block">Kec. Angin</label>
                  <input
                    type="text"
                    value={weatherData.kabupaten.windSpeed}
                    onChange={(e) => setWeatherData({
                      ...weatherData,
                      kabupaten: { ...weatherData.kabupaten, windSpeed: e.target.value }
                    })}
                    className="w-full bg-white border border-slate-200 rounded-xl py-2 px-3 text-xs focus:outline-none focus:ring-2 focus:ring-emerald-500/20 font-medium text-slate-700"
                    placeholder="Contoh: 10 km/j"
                  />
                </div>
              </div>
            </div>
          </div>
          
          <div className="mt-3 flex items-center justify-between text-[10px] text-slate-400 font-bold uppercase tracking-wider">
            <span>Sumber Resmi: <a href="https://www.bmkg.go.id" target="_blank" rel="noreferrer" className="text-emerald-600 hover:underline">bmkg.go.id</a></span>
            <span>Pembaruan Terakhir: {weatherData.lastUpdated}</span>
          </div>
        </div>

        <hr className="border-slate-100" />

        {/* Interactive Portal Background Section */}
        <div>
          <h3 className="text-sm font-extrabold text-slate-900 uppercase tracking-wider flex items-center gap-2 mb-2">
            <Tv className="h-4.5 w-4.5 text-emerald-600" /> Latar Belakang Portal Interaktif (Banner Utama)
          </h3>
          <p className="text-xs text-slate-500 leading-relaxed mb-4">
            Ubah atau sesuaikan gambar latar belakang (background) dari banner utama "Portal Interaktif" di halaman depan. Anda dapat mengunggah alamat URL baru atau menggunakan preset eksklusif "Madiun Dalam Berita".
          </p>

          <div className="space-y-4">
            <div className="flex flex-col sm:flex-row gap-3">
              <input
                type="text"
                value={portalBgUrl}
                onChange={(e) => setPortalBgUrl(e.target.value)}
                className="flex-1 bg-slate-50 border border-slate-200 rounded-2xl py-2.5 px-4 text-xs focus:outline-none focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500 font-mono text-slate-700"
                placeholder="Masukkan URL gambar background (https://...)"
              />
              <button
                onClick={() => triggerToast('Latar Belakang Portal Berhasil Disimpan!', 'success')}
                className="bg-emerald-600 hover:bg-emerald-700 text-white font-bold py-2.5 px-4 rounded-xl text-xs transition duration-150 shadow shrink-0"
              >
                Simpan URL
              </button>
            </div>

            <div className="p-4 bg-slate-50 rounded-2xl border border-slate-150 flex flex-col md:flex-row items-center gap-4 justify-between">
              <div className="flex items-center gap-3">
                <div className="h-14 w-24 rounded-lg overflow-hidden border border-slate-200 bg-slate-100 shrink-0 shadow-sm">
                  <img
                    src={portalBgUrl}
                    alt="Pratinjau Background"
                    className="w-full h-full object-cover"
                    onError={(e) => {
                      (e.target as HTMLImageElement).src = 'https://images.unsplash.com/photo-1541872703-74c5e44368f9?auto=format&fit=crop&w=600&q=80';
                    }}
                  />
                </div>
                <div>
                  <p className="text-xs font-bold text-slate-800">Pratinjau Latar Belakang</p>
                  <p className="text-[10px] text-slate-500">Banner depan akan menyesuaikan secara real-time.</p>
                </div>
              </div>

              <div className="flex flex-wrap gap-2">
                <button
                  type="button"
                  onClick={() => {
                    setPortalBgUrl('/src/assets/images/portal_bg_1783079800952.jpg');
                    triggerToast('Menggunakan Preset Premium: Madiun Dalam Berita!', 'success');
                  }}
                  className="bg-white hover:bg-slate-150 text-slate-700 font-extrabold py-2 px-3.5 rounded-xl text-xs border border-slate-200 shadow-sm transition"
                >
                  📺 Preset "Madiun Dalam Berita"
                </button>
                
                <button
                  type="button"
                  onClick={() => {
                    setPortalBgUrl('');
                    triggerToast('Menggunakan warna gradasi emerald bawaan!', 'info');
                  }}
                  className="bg-white hover:bg-slate-150 text-slate-700 font-extrabold py-2 px-3.5 rounded-xl text-xs border border-slate-200 shadow-sm transition"
                >
                  🟢 Gradasi Emerald Bawaan
                </button>
              </div>
            </div>
          </div>
        </div>

      </div>

      {/* INTERACTIVE DATA MANAGER SUBNAV */}
      <div className="bg-white rounded-3xl border border-slate-100 shadow-sm overflow-hidden" id="admin-data-manager">
        {/* Navigation & Search bar combined */}
        <div className="p-4 sm:p-6 bg-slate-50 border-b border-slate-100 flex flex-col lg:flex-row justify-between items-start lg:items-center gap-4">
          <div className="flex flex-wrap gap-1.5 bg-white p-1 rounded-2xl border border-slate-200">
            <button
              onClick={() => { setSubTab('news'); setAdminSearch(''); }}
              className={`flex items-center space-x-1.5 px-3.5 py-2 rounded-xl text-xs font-bold transition duration-150 ${
                subTab === 'news'
                  ? 'bg-emerald-600 text-white shadow-md'
                  : 'text-slate-500 hover:text-slate-800'
              }`}
            >
              <Newspaper className="h-3.5 w-3.5" />
              <span>Kelola Berita ({newsList.length})</span>
            </button>

            <button
              onClick={() => { setSubTab('jobs'); setAdminSearch(''); }}
              className={`flex items-center space-x-1.5 px-3.5 py-2 rounded-xl text-xs font-bold transition duration-150 ${
                subTab === 'jobs'
                  ? 'bg-emerald-600 text-white shadow-md'
                  : 'text-slate-500 hover:text-slate-800'
              }`}
            >
              <Briefcase className="h-3.5 w-3.5" />
              <span>Kelola Loker ({jobsList.length})</span>
            </button>

            <button
              onClick={() => { setSubTab('umkm'); setAdminSearch(''); }}
              className={`flex items-center space-x-1.5 px-3.5 py-2 rounded-xl text-xs font-bold transition duration-150 ${
                subTab === 'umkm'
                  ? 'bg-emerald-600 text-white shadow-md'
                  : 'text-slate-500 hover:text-slate-800'
              }`}
            >
              <ShoppingBag className="h-3.5 w-3.5" />
              <span>Kelola UMKM ({umkmList.length})</span>
            </button>

            <button
              onClick={() => { setSubTab('reports'); setAdminSearch(''); }}
              className={`flex items-center space-x-1.5 px-3.5 py-2 rounded-xl text-xs font-bold transition duration-150 ${
                subTab === 'reports'
                  ? 'bg-emerald-600 text-white shadow-md'
                  : 'text-slate-500 hover:text-slate-800'
              }`}
            >
              <AlertTriangle className="h-3.5 w-3.5 text-amber-500" />
              <span>Laporan Warga ({reportsList.length})</span>
            </button>

            <button
              onClick={() => { setSubTab('rotation'); setAdminSearch(''); }}
              className={`flex items-center space-x-1.5 px-3.5 py-2 rounded-xl text-xs font-bold transition duration-150 ${
                subTab === 'rotation'
                  ? 'bg-emerald-600 text-white shadow-md'
                  : 'text-slate-500 hover:text-slate-800'
              }`}
            >
              <Clock className="h-3.5 w-3.5 text-blue-500" />
              <span>Kelola Giliran RSS ({rssSources.length})</span>
            </button>

            <button
              onClick={() => { setSubTab('viral'); setAdminSearch(''); }}
              className={`flex items-center space-x-1.5 px-3.5 py-2 rounded-xl text-xs font-bold transition duration-150 ${
                subTab === 'viral'
                  ? 'bg-emerald-600 text-white shadow-md'
                  : 'text-slate-500 hover:text-slate-800'
              }`}
            >
              <TrendingUp className="h-3.5 w-3.5 text-rose-500" />
              <span>Info Viral Medsos ({viralFeed.length})</span>
            </button>

            <button
              onClick={() => { setSubTab('channels'); setAdminSearch(''); }}
              className={`flex items-center space-x-1.5 px-3.5 py-2 rounded-xl text-xs font-bold transition duration-150 ${
                subTab === 'channels'
                  ? 'bg-emerald-600 text-white shadow-md'
                  : 'text-slate-500 hover:text-slate-800'
              }`}
            >
              <ShieldCheck className="h-3.5 w-3.5 text-emerald-500" />
              <span>Kelola Pengaduan Resmi ({complaintChannels.length})</span>
            </button>
          </div>

          <div className="flex gap-2 w-full lg:w-auto items-center">
            <div className="relative flex-1 lg:w-60">
              <span className="absolute inset-y-0 left-0 flex items-center pl-3 text-slate-400">
                <Search className="h-3.5 w-3.5" />
              </span>
              <input
                type="text"
                placeholder="Cari item di sini..."
                value={adminSearch}
                onChange={(e) => setAdminSearch(e.target.value)}
                className="w-full bg-white border border-slate-200 rounded-xl py-2 pl-9 pr-3 text-xs focus:outline-none focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500 transition-all"
              />
            </div>
            
            <button
              onClick={openAddForm}
              className="bg-slate-900 hover:bg-slate-800 text-white font-bold py-2 px-3.5 rounded-xl text-xs flex items-center gap-1 transition duration-150 shadow"
            >
              <PlusCircle className="h-4 w-4" /> <span>Tambah</span>
            </button>
          </div>
        </div>

        {/* Dynamic List Content for Admin Management */}
        <div className="p-6">
          {/* 1. NEWS TABLE */}
          {subTab === 'news' && (
            <div className="overflow-x-auto">
              {searchedNews.length === 0 ? (
                <div className="py-12 text-center text-slate-400 text-xs font-medium">Data Berita Kosong atau Tidak Ditemukan.</div>
              ) : (
                <table className="w-full text-left border-collapse">
                  <thead>
                    <tr className="border-b border-slate-100 text-[10px] font-bold uppercase tracking-wider text-slate-400 pb-3">
                      <th className="py-3 px-2">Info Utama</th>
                      <th className="py-3 px-2">Kategori</th>
                      <th className="py-3 px-2">Penulis</th>
                      <th className="py-3 px-2 text-right">Aksi Kelola</th>
                    </tr>
                  </thead>
                  <tbody>
                    {searchedNews.map((news) => (
                      <tr key={news.id} className="border-b border-slate-50 hover:bg-slate-50/50 transition">
                        <td className="py-3 px-2 max-w-sm">
                          <p className="font-serif font-bold text-slate-900 text-xs sm:text-sm line-clamp-1">{news.title}</p>
                          <p className="text-[10px] text-slate-400 mt-0.5 line-clamp-1">{news.summary}</p>
                        </td>
                        <td className="py-3 px-2">
                          <span className="bg-slate-100 text-slate-700 font-bold text-[9px] uppercase tracking-wider px-2 py-0.5 rounded">
                            {news.category}
                          </span>
                        </td>
                        <td className="py-3 px-2 text-xs font-semibold text-slate-600">{news.author}</td>
                        <td className="py-3 px-2 text-right">
                          <div className="flex justify-end gap-1.5">
                            <button
                              onClick={() => openEditForm(news)}
                              className="text-slate-500 hover:text-emerald-600 hover:bg-emerald-50 p-1.5 rounded-lg transition"
                              title="Edit Konten"
                            >
                              <Edit3 className="h-4 w-4" />
                            </button>
                            <button
                              onClick={() => setDeleteConfirmId(news.id)}
                              className="text-slate-500 hover:text-rose-600 hover:bg-rose-50 p-1.5 rounded-lg transition"
                              title="Hapus Konten"
                            >
                              <Trash2 className="h-4 w-4" />
                            </button>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              )}
            </div>
          )}

          {/* 2. JOBS TABLE */}
          {subTab === 'jobs' && (
            <div className="overflow-x-auto">
              {searchedJobs.length === 0 ? (
                <div className="py-12 text-center text-slate-400 text-xs font-medium">Data Lowongan Kerja Kosong atau Tidak Ditemukan.</div>
              ) : (
                <table className="w-full text-left border-collapse">
                  <thead>
                    <tr className="border-b border-slate-100 text-[10px] font-bold uppercase tracking-wider text-slate-400 pb-3">
                      <th className="py-3 px-2">Jabatan & Instansi</th>
                      <th className="py-3 px-2">Sistem / Jam</th>
                      <th className="py-3 px-2">Gaji Estimasi</th>
                      <th className="py-3 px-2 text-right">Aksi Kelola</th>
                    </tr>
                  </thead>
                  <tbody>
                    {searchedJobs.map((job) => (
                      <tr key={job.id} className="border-b border-slate-50 hover:bg-slate-50/50 transition">
                        <td className="py-3 px-2">
                          <p className="font-bold text-slate-900 text-xs sm:text-sm">{job.title}</p>
                          <p className="text-[10px] text-emerald-700 font-semibold">{job.company} • {job.location}</p>
                        </td>
                        <td className="py-3 px-2">
                          <span className="bg-blue-50 text-blue-700 font-bold text-[9px] uppercase tracking-wider px-2 py-0.5 rounded">
                            {job.type}
                          </span>
                        </td>
                        <td className="py-3 px-2 text-xs font-semibold text-slate-600">{job.salary}</td>
                        <td className="py-3 px-2 text-right">
                          <div className="flex justify-end gap-1.5">
                            <button
                              onClick={() => openEditForm(job)}
                              className="text-slate-500 hover:text-emerald-600 hover:bg-emerald-50 p-1.5 rounded-lg transition"
                            >
                              <Edit3 className="h-4 w-4" />
                            </button>
                            <button
                              onClick={() => setDeleteConfirmId(job.id)}
                              className="text-slate-500 hover:text-rose-600 hover:bg-rose-50 p-1.5 rounded-lg transition"
                            >
                              <Trash2 className="h-4 w-4" />
                            </button>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              )}
            </div>
          )}

          {/* 3. UMKM TABLE */}
          {subTab === 'umkm' && (
            <div className="overflow-x-auto">
              {searchedUMKMs.length === 0 ? (
                <div className="py-12 text-center text-slate-400 text-xs font-medium">Data Lapak UMKM Kosong atau Tidak Ditemukan.</div>
              ) : (
                <table className="w-full text-left border-collapse">
                  <thead>
                    <tr className="border-b border-slate-100 text-[10px] font-bold uppercase tracking-wider text-slate-400 pb-3">
                      <th className="py-3 px-2">Nama Usaha / Produk</th>
                      <th className="py-3 px-2">Kategori</th>
                      <th className="py-3 px-2">Harga</th>
                      <th className="py-3 px-2">Pemilik (WA)</th>
                      <th className="py-3 px-2 text-right">Aksi Kelola</th>
                    </tr>
                  </thead>
                  <tbody>
                    {searchedUMKMs.map((umkm) => (
                      <tr key={umkm.id} className="border-b border-slate-50 hover:bg-slate-50/50 transition">
                        <td className="py-3 px-2">
                          <p className="font-bold text-slate-900 text-xs sm:text-sm">{umkm.name}</p>
                          <p className="text-[10px] text-slate-400 line-clamp-1 mt-0.5">{umkm.description}</p>
                        </td>
                        <td className="py-3 px-2">
                          <span className="bg-slate-100 text-slate-700 font-bold text-[9px] uppercase tracking-wider px-2 py-0.5 rounded">
                            {umkm.category}
                          </span>
                        </td>
                        <td className="py-3 px-2 text-xs font-bold text-emerald-600">
                          {new Intl.NumberFormat('id-ID', { style: 'currency', currency: 'IDR', maximumFractionDigits: 0 }).format(umkm.price)}
                        </td>
                        <td className="py-3 px-2">
                          <p className="text-xs font-semibold text-slate-600">{umkm.seller}</p>
                          <p className="text-[9px] font-mono text-slate-400">+{umkm.contact}</p>
                        </td>
                        <td className="py-3 px-2 text-right">
                          <div className="flex justify-end gap-1.5">
                            <button
                              onClick={() => openEditForm(umkm)}
                              className="text-slate-500 hover:text-emerald-600 hover:bg-emerald-50 p-1.5 rounded-lg transition"
                            >
                              <Edit3 className="h-4 w-4" />
                            </button>
                            <button
                              onClick={() => setDeleteConfirmId(umkm.id)}
                              className="text-slate-500 hover:text-rose-600 hover:bg-rose-50 p-1.5 rounded-lg transition"
                            >
                              <Trash2 className="h-4 w-4" />
                            </button>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              )}
            </div>
          )}

          {/* 4. REPORTS TABLE */}
          {subTab === 'reports' && (
            <div className="overflow-x-auto">
              {searchedReports.length === 0 ? (
                <div className="py-12 text-center text-slate-400 text-xs font-medium">Data Laporan Kejadian Warga Kosong atau Tidak Ditemukan.</div>
              ) : (
                <table className="w-full text-left border-collapse">
                  <thead>
                    <tr className="border-b border-slate-100 text-[10px] font-bold uppercase tracking-wider text-slate-400 pb-3">
                      <th className="py-3 px-2">Judul Laporan</th>
                      <th className="py-3 px-2">Kategori</th>
                      <th className="py-3 px-2">Urgensi</th>
                      <th className="py-3 px-2">Pelapor / Upvotes</th>
                      <th className="py-3 px-2 text-right">Aksi Kelola</th>
                    </tr>
                  </thead>
                  <tbody>
                    {searchedReports.map((report) => (
                      <tr key={report.id} className="border-b border-slate-50 hover:bg-slate-50/50 transition">
                        <td className="py-3 px-2 max-w-sm">
                          <div className="flex items-center gap-2">
                            {report.imageUrl && (
                              <img src={report.imageUrl} alt="" className="w-8 h-8 rounded object-cover shrink-0 border border-slate-100" />
                            )}
                            <div className="min-w-0 flex-1">
                              <p className="font-bold text-slate-900 text-xs sm:text-sm line-clamp-1">{report.title}</p>
                              <div className="flex items-center gap-1.5 text-[10px] text-slate-400 mt-0.5">
                                <span className="truncate">{report.description}</span>
                                {report.location && (
                                  <span className="text-emerald-700 font-bold bg-emerald-50 px-1 py-0.2 rounded text-[8px] shrink-0">📍 {report.location}</span>
                                )}
                              </div>
                            </div>
                          </div>
                        </td>
                        <td className="py-3 px-2">
                          <span className="bg-slate-100 text-slate-700 font-bold text-[9px] uppercase tracking-wider px-2 py-0.5 rounded">
                            {report.category}
                          </span>
                        </td>
                        <td className="py-3 px-2">
                          <span className={`px-2 py-0.5 rounded text-[9px] font-bold uppercase tracking-wider ${
                            report.urgency === 'Tinggi' ? 'bg-rose-50 text-rose-700 border border-rose-100' :
                            report.urgency === 'Sedang' ? 'bg-amber-50 text-amber-700 border border-amber-100' :
                            'bg-slate-100 text-slate-600'
                          }`}>
                            {report.urgency}
                          </span>
                        </td>
                        <td className="py-3 px-2">
                          <p className="text-xs font-semibold text-slate-600">{report.reporter}</p>
                          <p className="text-[9px] text-slate-400 font-bold">👍 {report.upvotes} Upvotes</p>
                        </td>
                        <td className="py-3 px-2 text-right">
                          <div className="flex justify-end gap-1.5">
                            <button
                              onClick={() => openEditForm(report)}
                              className="text-slate-500 hover:text-emerald-600 hover:bg-emerald-50 p-1.5 rounded-lg transition"
                            >
                              <Edit3 className="h-4 w-4" />
                            </button>
                            <button
                              onClick={() => setDeleteConfirmId(report.id)}
                              className="text-slate-500 hover:text-rose-600 hover:bg-rose-50 p-1.5 rounded-lg transition"
                            >
                              <Trash2 className="h-4 w-4" />
                            </button>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              )}
            </div>
          )}

          {/* 5. ROTATION TABLE */}
          {subTab === 'rotation' && (
            <div className="overflow-x-auto">
              {searchedRotations.length === 0 ? (
                <div className="py-12 text-center text-slate-400 text-xs font-medium">Data Saring Berita / Giliran Kosong atau Tidak Ditemukan.</div>
              ) : (
                <table className="w-full text-left border-collapse">
                  <thead>
                    <tr className="border-b border-slate-100 text-[10px] font-bold uppercase tracking-wider text-slate-400 pb-3">
                      <th className="py-3 px-2">Nama Media</th>
                      <th className="py-3 px-2">Kategori RSS</th>
                      <th className="py-3 px-2">Jam Giliran</th>
                      <th className="py-3 px-2">Visual Gradient & Warna</th>
                      <th className="py-3 px-2 text-right">Aksi Kelola</th>
                    </tr>
                  </thead>
                  <tbody>
                    {searchedRotations.map((rot) => (
                      <tr key={rot.id} className="border-b border-slate-50 hover:bg-slate-50/50 transition">
                        <td className="py-3 px-2 max-w-sm">
                          <p className="font-bold text-slate-900 text-xs sm:text-sm">{rot.name}</p>
                        </td>
                        <td className="py-3 px-2">
                          <span className="bg-slate-100 text-slate-700 font-bold text-[9px] uppercase tracking-wider px-2 py-0.5 rounded">
                            {rot.category}
                          </span>
                        </td>
                        <td className="py-3 px-2">
                          <p className="text-xs text-slate-600 font-mono">{rot.hours}</p>
                        </td>
                        <td className="py-3 px-2">
                          <div className="flex items-center gap-2">
                            <div className={`h-4 w-12 rounded-md bg-gradient-to-tr ${rot.color}`} title={rot.color}></div>
                            <span className={`text-[10px] font-bold ${rot.textAccent}`}>{rot.textAccent.replace('text-', '')}</span>
                          </div>
                        </td>
                        <td className="py-3 px-2 text-right">
                          <div className="flex justify-end gap-1.5">
                            <button
                              onClick={() => openEditForm(rot)}
                              className="text-slate-500 hover:text-emerald-600 hover:bg-emerald-50 p-1.5 rounded-lg transition"
                            >
                              <Edit3 className="h-4 w-4" />
                            </button>
                            <button
                              onClick={() => setDeleteConfirmRotationId(rot.id)}
                              className="text-slate-500 hover:text-rose-600 hover:bg-rose-50 p-1.5 rounded-lg transition"
                            >
                              <Trash2 className="h-4 w-4" />
                            </button>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              )}
            </div>
          )}

          {/* 6. VIRAL FEED TABLE */}
          {subTab === 'viral' && (
            <div className="overflow-x-auto">
              {searchedViral.length === 0 ? (
                <div className="py-12 text-center text-slate-400 text-xs font-medium">Data Info Viral Medsos Kosong atau Tidak Ditemukan.</div>
              ) : (
                <table className="w-full text-left border-collapse">
                  <thead>
                    <tr className="border-b border-slate-100 text-[10px] font-bold uppercase tracking-wider text-slate-400 pb-3">
                      <th className="py-3 px-2">Info Utama</th>
                      <th className="py-3 px-2">Wilayah</th>
                      <th className="py-3 px-2">Media & Pengunggah</th>
                      <th className="py-3 px-2">Statistik</th>
                      <th className="py-3 px-2 text-right">Aksi Kelola</th>
                    </tr>
                  </thead>
                  <tbody>
                    {searchedViral.map((viral) => (
                      <tr key={viral.id} className="border-b border-slate-50 hover:bg-slate-50/50 transition">
                        <td className="py-3 px-2 max-w-xs">
                          <div className="flex gap-2.5 items-start">
                            {viral.imageUrl ? (
                              <img src={viral.imageUrl} alt={viral.title} className="w-12 h-12 object-cover rounded-lg border border-slate-100 shrink-0" referrerPolicy="no-referrer" />
                            ) : (
                              <div className="w-12 h-12 rounded-lg bg-slate-100 flex items-center justify-center shrink-0 text-slate-400">
                                {viral.platform === 'youtube' && <Youtube className="h-5 w-5 text-rose-600" />}
                                {viral.platform === 'facebook' && <Facebook className="h-5 w-5 text-blue-600" />}
                                {viral.platform === 'instagram' && <Instagram className="h-5 w-5 text-pink-600" />}
                                {viral.platform === 'tiktok' && <Tv className="h-5 w-5 text-slate-800" />}
                              </div>
                            )}
                            <div>
                              <p className="font-bold text-slate-900 text-xs line-clamp-1">{viral.title}</p>
                              <p className="text-[10px] text-slate-400 mt-0.5 line-clamp-1">{viral.description || 'Tidak ada deskripsi.'}</p>
                              <span className="text-[9px] font-bold text-slate-500 uppercase tracking-wider block mt-0.5">{viral.date}</span>
                            </div>
                          </div>
                        </td>
                        <td className="py-3 px-2">
                          <span className="bg-slate-100 text-slate-700 font-bold text-[9px] uppercase tracking-wider px-2 py-0.5 rounded">
                            {viral.location}
                          </span>
                        </td>
                        <td className="py-3 px-2 text-xs">
                          <div className="flex items-center space-x-1">
                            {viral.platform === 'youtube' && <Youtube className="h-3.5 w-3.5 text-rose-600 shrink-0" />}
                            {viral.platform === 'facebook' && <Facebook className="h-3.5 w-3.5 text-blue-600 shrink-0" />}
                            {viral.platform === 'instagram' && <Instagram className="h-3.5 w-3.5 text-pink-600 shrink-0" />}
                            {viral.platform === 'tiktok' && <Tv className="h-3.5 w-3.5 text-slate-800 shrink-0" />}
                            <span className="font-bold text-slate-700">{viral.author}</span>
                          </div>
                          <a href={viral.sourceUrl} target="_blank" rel="noopener noreferrer" className="text-emerald-600 hover:underline text-[10px] mt-0.5 block truncate max-w-[150px]">
                            Buka Tautan Asli ↗
                          </a>
                        </td>
                        <td className="py-3 px-2 text-[10px] text-slate-500 font-medium">
                          <p>❤️ {viral.likes || '0'} Likes</p>
                          {viral.views && <p>👁️ {viral.views} Views</p>}
                        </td>
                        <td className="py-3 px-2 text-right">
                          <div className="flex justify-end gap-1.5">
                            <button
                              onClick={() => openEditForm(viral)}
                              className="text-slate-500 hover:text-emerald-600 hover:bg-emerald-50 p-1.5 rounded-lg transition"
                              title="Edit Konten"
                            >
                              <Edit3 className="h-4 w-4" />
                            </button>
                            <button
                              onClick={() => setDeleteConfirmId(viral.id)}
                              className="text-slate-500 hover:text-rose-600 hover:bg-rose-50 p-1.5 rounded-lg transition"
                              title="Hapus Konten"
                            >
                              <Trash2 className="h-4 w-4" />
                            </button>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              )}
            </div>
          )}

          {/* 7. COMPLAINT CHANNELS TABLE */}
          {subTab === 'channels' && (
            <div className="overflow-x-auto" id="admin-channels-table">
              <div className="p-4 bg-emerald-50/50 border border-emerald-100 rounded-2xl mb-4 text-xs text-emerald-800 leading-relaxed flex flex-col md:flex-row md:items-center justify-between gap-4">
                <div className="flex items-start gap-2">
                  <Info className="h-4 w-4 shrink-0 text-emerald-600 mt-0.5" />
                  <span>
                    Di sini Anda dapat menambah, mengedit, dan menghapus saluran pengaduan instansi resmi Pemerintah Daerah Madiun (seperti nomor WhatsApp, SMS, web, dll). Perubahan akan langsung tersimpan di database lokal dan terupdate secara real-time pada widget sidebar "Aduan Cepat Instansi Resmi" di tab Laporan Kejadian Warga.
                  </span>
                </div>
                <button
                  type="button"
                  onClick={resetChannelsToDefault}
                  className="bg-emerald-600 hover:bg-emerald-700 text-white font-extrabold py-2 px-3.5 rounded-xl text-[10px] transition shrink-0 uppercase tracking-wider flex items-center justify-center gap-1.5 self-start md:self-auto shadow-sm"
                  title="Kembalikan semua daftar kontak ke data instansi resmi bawaan"
                >
                  <RefreshCw className="h-3 w-3" />
                  <span>Reset Default</span>
                </button>
              </div>
              
              {searchedChannels.length === 0 ? (
                <div className="py-12 text-center text-slate-400 text-xs font-medium">Data Saluran Pengaduan Kosong atau Tidak Ditemukan.</div>
              ) : (
                <table className="w-full text-left border-collapse">
                  <thead>
                    <tr className="border-b border-slate-100 text-[10px] font-bold uppercase tracking-wider text-slate-400 pb-3">
                      <th className="py-3 px-2">Saluran Pengaduan</th>
                      <th className="py-3 px-2">Wilayah Sasaran</th>
                      <th className="py-3 px-2">Tipe & Kontak</th>
                      <th className="py-3 px-2">Keterangan / Deskripsi</th>
                      <th className="py-3 px-2 text-right">Aksi Kelola</th>
                    </tr>
                  </thead>
                  <tbody>
                    {searchedChannels.map((channel) => (
                      <tr key={channel.id} className="border-b border-slate-50 hover:bg-slate-50/50 transition">
                        <td className="py-3 px-2">
                          <span className="font-bold text-slate-900 text-xs">{channel.name}</span>
                        </td>
                        <td className="py-3 px-2">
                          <span className={`text-[9px] font-extrabold px-2 py-0.5 rounded uppercase tracking-wider ${
                            channel.targetRegion === 'Kota Madiun' ? 'bg-indigo-50 text-indigo-700 border border-indigo-100/50' :
                            channel.targetRegion === 'Kabupaten Madiun' ? 'bg-amber-50 text-amber-700 border border-amber-100/50' :
                            'bg-slate-100 text-slate-700'
                          }`}>
                            {channel.targetRegion}
                          </span>
                        </td>
                        <td className="py-3 px-2 text-xs">
                          <div className="flex flex-col">
                            <span className="font-mono font-bold text-slate-800">{channel.contactValue}</span>
                            <span className="text-[9px] text-slate-400 font-bold uppercase tracking-wider mt-0.5">{channel.type}</span>
                          </div>
                        </td>
                        <td className="py-3 px-2 text-xs text-slate-500 max-w-xs truncate" title={channel.description}>
                          {channel.description}
                        </td>
                        <td className="py-3 px-2 text-right">
                          <div className="flex justify-end gap-1.5">
                            <button
                              onClick={() => openEditForm(channel)}
                              className="text-slate-500 hover:text-emerald-600 hover:bg-emerald-50 p-1.5 rounded-lg transition"
                              title="Edit Saluran"
                            >
                              <Edit3 className="h-4 w-4" />
                            </button>
                            <button
                              onClick={() => setDeleteConfirmId(channel.id)}
                              className="text-slate-500 hover:text-rose-600 hover:bg-rose-50 p-1.5 rounded-lg transition"
                              title="Hapus Saluran"
                            >
                              <Trash2 className="h-4 w-4" />
                            </button>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              )}
            </div>
          )}
        </div>
      </div>

      {/* CRUD MODAL FOR CREATING AND EDITING CONTENT */}
      {isFormOpen && (
        <div className="fixed inset-0 z-50 overflow-y-auto" aria-labelledby="modal-title" role="dialog" aria-modal="true" id="admin-crud-modal">
          <div className="flex items-center justify-center min-h-screen px-4 pt-4 pb-20 text-center sm:block sm:p-0">
            <div className="fixed inset-0 transition-opacity bg-slate-900/60 backdrop-blur-sm" onClick={() => setIsFormOpen(false)}></div>
            <span className="hidden sm:inline-block sm:align-middle sm:h-screen" aria-hidden="true">&#8203;</span>
            
            <div className="inline-block relative z-10 align-bottom bg-white rounded-3xl text-left overflow-hidden shadow-2xl transform transition-all sm:my-8 sm:align-middle sm:max-w-2xl sm:w-full animate-fade-in">
              <div className="p-6">
                
                {/* Modal Title */}
                <div className="flex items-center justify-between border-b border-slate-100 pb-4 mb-4">
                  <div>
                    <h3 className="font-extrabold text-base text-slate-900 font-serif">
                      {editMode ? 'Edit' : 'Tambah'} {
                        subTab === 'news' ? 'Berita Baru' :
                        subTab === 'jobs' ? 'Lowongan Kerja' :
                        subTab === 'umkm' ? 'Lapak UMKM' :
                        subTab === 'reports' ? 'Laporan Warga' :
                        subTab === 'viral' ? 'Info Viral Medsos' :
                        subTab === 'channels' ? 'Saluran Pengaduan' : 'Giliran RSS'
                      }
                    </h3>
                    <p className="text-xs text-slate-400 mt-0.5">Isi seluruh properti di bawah secara valid dan lengkap.</p>
                  </div>
                  <button 
                    onClick={() => setIsFormOpen(false)}
                    className="text-slate-400 hover:text-slate-600 p-1 rounded-full hover:bg-slate-50 transition"
                  >
                    <X className="h-5 w-5" />
                  </button>
                </div>

                <form onSubmit={handleFormSubmit} className="space-y-4">
                  {/* --- SUBTAB: NEWS FORM --- */}
                  {subTab === 'news' && (
                    <div className="space-y-4">
                      <div>
                        <label className="block text-[10px] font-bold text-slate-400 uppercase tracking-wider mb-1">Judul Utama Kabar Berita</label>
                        <input
                          type="text"
                          placeholder="Masukkan judul berita yang menarik..."
                          value={newsDraft.title || ''}
                          onChange={(e) => setNewsDraft(prev => ({ ...prev, title: e.target.value }))}
                          className="w-full bg-slate-50 border border-slate-200 rounded-xl py-2 px-3 text-xs focus:outline-none focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500"
                          required
                        />
                      </div>

                      <div className="grid grid-cols-2 gap-3">
                        <div>
                          <label className="block text-[10px] font-bold text-slate-400 uppercase tracking-wider mb-1">Kategori Berita</label>
                          <select
                            value={newsDraft.category || 'Pembangunan'}
                            onChange={(e) => setNewsDraft(prev => ({ ...prev, category: e.target.value as NewsItem['category'] }))}
                            className="w-full bg-slate-50 border border-slate-200 rounded-xl py-2 px-2.5 text-xs focus:outline-none focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500"
                          >
                            <option value="Pembangunan">Pembangunan</option>
                            <option value="Kuliner">Kuliner</option>
                            <option value="Budaya">Budaya</option>
                            <option value="Ekonomi">Ekonomi</option>
                            <option value="Pendidikan">Pendidikan</option>
                          </select>
                        </div>
                        <div>
                          <label className="block text-[10px] font-bold text-slate-400 uppercase tracking-wider mb-1">Nama Jurnalis / Penulis</label>
                          <input
                            type="text"
                            placeholder="Contoh: Admin Redaksi"
                            value={newsDraft.author || ''}
                            onChange={(e) => setNewsDraft(prev => ({ ...prev, author: e.target.value }))}
                            className="w-full bg-slate-50 border border-slate-200 rounded-xl py-2 px-3 text-xs focus:outline-none focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500"
                            required
                          />
                        </div>
                      </div>

                      <div className="grid grid-cols-2 gap-3">
                        <div>
                          <label className="block text-[10px] font-bold text-slate-400 uppercase tracking-wider mb-1">Estimasi Waktu Baca</label>
                          <input
                            type="text"
                            placeholder="Contoh: 3 Menit Baca"
                            value={newsDraft.readTime || ''}
                            onChange={(e) => setNewsDraft(prev => ({ ...prev, readTime: e.target.value }))}
                            className="w-full bg-slate-50 border border-slate-200 rounded-xl py-2 px-3 text-xs focus:outline-none focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500"
                          />
                        </div>
                        <div>
                          <label className="block text-[10px] font-bold text-slate-400 uppercase tracking-wider mb-1">Pilihan Warna Latar (Gradien)</label>
                          <select
                            value={newsDraft.imageBg || ''}
                            onChange={(e) => setNewsDraft(prev => ({ ...prev, imageBg: e.target.value }))}
                            className="w-full bg-slate-50 border border-slate-200 rounded-xl py-2 px-2.5 text-xs focus:outline-none focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500"
                          >
                            {newsGradients.map((g) => (
                              <option key={g.value} value={g.value}>{g.name}</option>
                            ))}
                          </select>
                        </div>
                      </div>

                      <div>
                        <label className="block text-[10px] font-bold text-slate-400 uppercase tracking-wider mb-1">Ringkasan Singkat (Summary)</label>
                        <textarea
                          placeholder="Tulis 1-2 kalimat ringkasan kabar yang menarik pembaca..."
                          rows={2}
                          value={newsDraft.summary || ''}
                          onChange={(e) => setNewsDraft(prev => ({ ...prev, summary: e.target.value }))}
                          className="w-full bg-slate-50 border border-slate-200 rounded-xl py-2 px-3 text-xs focus:outline-none focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500 resize-none"
                          required
                        ></textarea>
                      </div>

                      <div>
                        <label className="block text-[10px] font-bold text-slate-400 uppercase tracking-wider mb-1">Konten Berita Lengkap</label>
                        <textarea
                          placeholder="Tulis konten berita lengkap secara detail di sini..."
                          rows={6}
                          value={newsDraft.content || ''}
                          onChange={(e) => setNewsDraft(prev => ({ ...prev, content: e.target.value }))}
                          className="w-full bg-slate-50 border border-slate-200 rounded-xl py-2 px-3 text-xs focus:outline-none focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500 font-serif"
                          required
                        ></textarea>
                      </div>
                    </div>
                  )}

                  {/* --- SUBTAB: JOBS FORM --- */}
                  {subTab === 'jobs' && (
                    <div className="space-y-4">
                      <div>
                        <label className="block text-[10px] font-bold text-slate-400 uppercase tracking-wider mb-1">Posisi Jabatan Pekerjaan</label>
                        <input
                          type="text"
                          placeholder="Contoh: Customer Service & Admin Online"
                          value={jobDraft.title || ''}
                          onChange={(e) => setJobDraft(prev => ({ ...prev, title: e.target.value }))}
                          className="w-full bg-slate-50 border border-slate-200 rounded-xl py-2 px-3 text-xs focus:outline-none focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500"
                          required
                        />
                      </div>

                      <div className="grid grid-cols-2 gap-3">
                        <div>
                          <label className="block text-[10px] font-bold text-slate-400 uppercase tracking-wider mb-1">Nama Instansi / Perusahaan</label>
                          <input
                            type="text"
                            placeholder="Contoh: PT Sumber Rejeki Madiun"
                            value={jobDraft.company || ''}
                            onChange={(e) => setJobDraft(prev => ({ ...prev, company: e.target.value }))}
                            className="w-full bg-slate-50 border border-slate-200 rounded-xl py-2 px-3 text-xs focus:outline-none focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500"
                            required
                          />
                        </div>
                        <div>
                          <label className="block text-[10px] font-bold text-slate-400 uppercase tracking-wider mb-1">Lokasi Kantor / Cabang</label>
                          <input
                            type="text"
                            placeholder="Contoh: Jl. Sudirman, Kota Madiun"
                            value={jobDraft.location || ''}
                            onChange={(e) => setJobDraft(prev => ({ ...prev, location: e.target.value }))}
                            className="w-full bg-slate-50 border border-slate-200 rounded-xl py-2 px-3 text-xs focus:outline-none focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500"
                            required
                          />
                        </div>
                      </div>

                      <div className="grid grid-cols-2 gap-3">
                        <div>
                          <label className="block text-[10px] font-bold text-slate-400 uppercase tracking-wider mb-1">Sistem Kerja</label>
                          <select
                            value={jobDraft.type || 'Full-time'}
                            onChange={(e) => setJobDraft(prev => ({ ...prev, type: e.target.value as JobItem['type'] }))}
                            className="w-full bg-slate-50 border border-slate-200 rounded-xl py-2 px-2.5 text-xs focus:outline-none focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500"
                          >
                            <option value="Full-time">Full-time (Penuh Waktu)</option>
                            <option value="Part-time">Part-time (Paruh Waktu)</option>
                            <option value="Freelance">Freelance (Pekerja Lepas)</option>
                          </select>
                        </div>
                        <div>
                          <label className="block text-[10px] font-bold text-slate-400 uppercase tracking-wider mb-1">Estimasi Kisaran Gaji</label>
                          <input
                            type="text"
                            placeholder="Contoh: Rp 2.000.000 - Rp 2.500.000"
                            value={jobDraft.salary || ''}
                            onChange={(e) => setJobDraft(prev => ({ ...prev, salary: e.target.value }))}
                            className="w-full bg-slate-50 border border-slate-200 rounded-xl py-2 px-3 text-xs focus:outline-none focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500"
                            required
                          />
                        </div>
                      </div>

                      <div>
                        <label className="block text-[10px] font-bold text-slate-400 uppercase tracking-wider mb-1">Tautan Link Pendaftaran (Opsional)</label>
                        <input
                          type="text"
                          placeholder="Contoh: https://perusahaan.com/karir atau kosongkan untuk lamaran langsung via web"
                          value={jobDraft.link || ''}
                          onChange={(e) => setJobDraft(prev => ({ ...prev, link: e.target.value }))}
                          className="w-full bg-slate-50 border border-slate-200 rounded-xl py-2 px-3 text-xs focus:outline-none focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500"
                        />
                        <p className="text-[10px] text-slate-400 mt-1">Jika dikosongkan, tombol 'Lamar Pekerjaan Ini' akan membuka formulir lamaran langsung di website Berita Madiun agar aman dan tidak 404.</p>
                      </div>

                      {/* Dynamic array inputs for Job Requirements */}
                      <div>
                        <div className="flex justify-between items-center mb-1">
                          <label className="block text-[10px] font-bold text-slate-400 uppercase tracking-wider">Persyaratan Syarat Pelamar</label>
                          <button
                            type="button"
                            onClick={handleAddRequirement}
                            className="text-emerald-600 hover:text-emerald-800 text-[10px] font-extrabold flex items-center gap-1"
                          >
                            + Tambah Syarat
                          </button>
                        </div>
                        <div className="space-y-2">
                          {(jobDraft.requirements || ['']).map((req, idx) => (
                            <div key={idx} className="flex gap-2 items-center">
                              <span className="text-[10px] font-extrabold text-slate-400 w-4">{idx + 1}.</span>
                              <input
                                type="text"
                                placeholder="Tuliskan 1 poin syarat kualifikasi..."
                                value={req}
                                onChange={(e) => handleRequirementChange(idx, e.target.value)}
                                className="flex-1 bg-slate-50 border border-slate-200 rounded-xl py-1.5 px-3 text-xs focus:outline-none focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500"
                                required
                              />
                              <button
                                type="button"
                                onClick={() => handleRemoveRequirement(idx)}
                                className="text-rose-500 hover:text-rose-700 p-1.5 rounded-lg hover:bg-rose-50"
                              >
                                <X className="h-4 w-4" />
                              </button>
                            </div>
                          ))}
                        </div>
                      </div>
                    </div>
                  )}

                  {/* --- SUBTAB: UMKM FORM --- */}
                  {subTab === 'umkm' && (
                    <div className="space-y-4">
                      <div className="grid grid-cols-2 gap-3">
                        <div className="col-span-2 sm:col-span-1">
                          <label className="block text-[10px] font-bold text-slate-400 uppercase tracking-wider mb-1">Nama Produk / Jasa Usaha</label>
                          <input
                            type="text"
                            placeholder="Contoh: Sambel Pecel Daun Jeruk Sri"
                            value={umkmDraft.name || ''}
                            onChange={(e) => setUmkmDraft(prev => ({ ...prev, name: e.target.value }))}
                            className="w-full bg-slate-50 border border-slate-200 rounded-xl py-2 px-3 text-xs focus:outline-none focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500"
                            required
                          />
                        </div>
                        <div className="col-span-2 sm:col-span-1">
                          <label className="block text-[10px] font-bold text-slate-400 uppercase tracking-wider mb-1">Kategori UMKM</label>
                          <select
                            value={umkmDraft.category || 'Makanan'}
                            onChange={(e) => setUmkmDraft(prev => ({ ...prev, category: e.target.value as UMKMItem['category'] }))}
                            className="w-full bg-slate-50 border border-slate-200 rounded-xl py-2 px-2.5 text-xs focus:outline-none focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500"
                          >
                            <option value="Makanan">Makanan</option>
                            <option value="Kerajinan">Kerajinan</option>
                            <option value="Jasa">Jasa</option>
                            <option value="Fashion">Fashion</option>
                          </select>
                        </div>
                      </div>

                      <div className="grid grid-cols-2 gap-3">
                        <div>
                          <label className="block text-[10px] font-bold text-slate-400 uppercase tracking-wider mb-1">Harga (Rupiah)</label>
                          <input
                            type="number"
                            placeholder="Contoh: 15000"
                            value={umkmDraft.price || ''}
                            onChange={(e) => setUmkmDraft(prev => ({ ...prev, price: parseFloat(e.target.value) || 0 }))}
                            className="w-full bg-slate-50 border border-slate-200 rounded-xl py-2 px-3 text-xs focus:outline-none focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500"
                            required
                          />
                        </div>
                        <div>
                          <label className="block text-[10px] font-bold text-slate-400 uppercase tracking-wider mb-1">Pilihan Warna Aksen Lapak</label>
                          <select
                            value={umkmDraft.imageBg || ''}
                            onChange={(e) => setUmkmDraft(prev => ({ ...prev, imageBg: e.target.value }))}
                            className="w-full bg-slate-50 border border-slate-200 rounded-xl py-2 px-2.5 text-xs focus:outline-none focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500"
                          >
                            {umkmStyles.map((s) => (
                              <option key={s.value} value={s.value}>{s.name}</option>
                            ))}
                          </select>
                        </div>
                      </div>

                      <div className="grid grid-cols-2 gap-3">
                        <div>
                          <label className="block text-[10px] font-bold text-slate-400 uppercase tracking-wider mb-1">Nama Pemilik / Seller</label>
                          <input
                            type="text"
                            placeholder="Contoh: Bu Sri Hartati"
                            value={umkmDraft.seller || ''}
                            onChange={(e) => setUmkmDraft(prev => ({ ...prev, seller: e.target.value }))}
                            className="w-full bg-slate-50 border border-slate-200 rounded-xl py-2 px-3 text-xs focus:outline-none focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500"
                            required
                          />
                        </div>
                        <div>
                          <label className="block text-[10px] font-bold text-slate-400 uppercase tracking-wider mb-1">Kontak WhatsApp (Dimulai 628...)</label>
                          <input
                            type="tel"
                            placeholder="Contoh: 6281234567890"
                            value={umkmDraft.contact || ''}
                            onChange={(e) => setUmkmDraft(prev => ({ ...prev, contact: e.target.value }))}
                            className="w-full bg-slate-50 border border-slate-200 rounded-xl py-2 px-3 text-xs focus:outline-none focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500"
                            required
                          />
                        </div>
                      </div>

                      <div>
                        <label className="block text-[10px] font-bold text-slate-400 uppercase tracking-wider mb-1">Deskripsi & Cara Pemesanan</label>
                        <textarea
                          placeholder="Jelaskan detail rasa, bahan, jam operasional, atau jangkauan kirim..."
                          rows={4}
                          value={umkmDraft.description || ''}
                          onChange={(e) => setUmkmDraft(prev => ({ ...prev, description: e.target.value }))}
                          className="w-full bg-slate-50 border border-slate-200 rounded-xl py-2 px-3 text-xs focus:outline-none focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500 resize-none"
                          required
                        ></textarea>
                      </div>

                      <div>
                        <label className="block text-[10px] font-bold text-slate-400 uppercase tracking-wider mb-1">Alamat Lapak / Lokasi Usaha (Opsional)</label>
                        <input
                          type="text"
                          placeholder="Contoh: Jl. Pahlawan No. 24, Kartoharjo, Madiun"
                          value={umkmDraft.address || ''}
                          onChange={(e) => setUmkmDraft(prev => ({ ...prev, address: e.target.value }))}
                          className="w-full bg-slate-50 border border-slate-200 rounded-xl py-2 px-3 text-xs focus:outline-none focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500"
                        />
                      </div>

                      <div>
                        <label className="block text-[10px] font-bold text-slate-400 uppercase tracking-wider mb-1">Foto Produk / Lapak (Maks 2MB)</label>
                        <div className="flex items-center space-x-3 mt-1">
                          {umkmDraft.imageUrl ? (
                            <div className="relative w-16 h-16 rounded-xl overflow-hidden border border-slate-200 shrink-0">
                              <img src={umkmDraft.imageUrl} alt="Pratinjau" className="w-full h-full object-cover" />
                              <button
                                type="button"
                                onClick={() => setUmkmDraft(prev => ({ ...prev, imageUrl: '' }))}
                                className="absolute inset-0 bg-black/50 text-white flex items-center justify-center text-[10px] font-bold opacity-0 hover:opacity-100 transition"
                              >
                                Hapus
                              </button>
                            </div>
                          ) : (
                            <div className="w-16 h-16 rounded-xl bg-slate-100 border-2 border-dashed border-slate-200 flex items-center justify-center text-slate-400 shrink-0">
                              <ImageIcon className="h-6 w-6" />
                            </div>
                          )}
                          <div className="flex-1">
                            <label className="cursor-pointer inline-flex items-center space-x-1.5 bg-white border border-slate-200 hover:border-slate-300 rounded-xl py-2 px-3 text-xs font-bold text-slate-700 transition">
                              <UploadCloud className="h-4 w-4 text-slate-500" />
                              <span>Pilih Foto...</span>
                              <input
                                type="file"
                                accept="image/*"
                                onChange={(e) => {
                                  const file = e.target.files?.[0];
                                  if (file) {
                                    if (file.size > 2 * 1024 * 1024) {
                                      triggerToast('Ukuran foto terlalu besar! Maksimal 2MB.', 'error');
                                      return;
                                    }
                                    const reader = new FileReader();
                                    reader.onloadend = () => {
                                      setUmkmDraft(prev => ({ ...prev, imageUrl: reader.result as string }));
                                    };
                                    reader.readAsDataURL(file);
                                  }
                                }}
                                className="hidden"
                              />
                            </label>
                            <p className="text-[10px] text-slate-400 mt-1">Gunakan format JPG, PNG, atau WEBP.</p>
                          </div>
                        </div>
                      </div>
                    </div>
                  )}

                  {/* --- SUBTAB: REPORTS FORM --- */}
                  {subTab === 'reports' && (
                    <div className="space-y-4">
                      <div>
                        <label className="block text-[10px] font-bold text-slate-400 uppercase tracking-wider mb-1">Judul Kejadian / Kejadian Viral</label>
                        <input
                          type="text"
                          placeholder="Contoh: Genangan Air Setinggi 30cm di Jalan Mastrip"
                          value={reportDraft.title || ''}
                          onChange={(e) => setReportDraft(prev => ({ ...prev, title: e.target.value }))}
                          className="w-full bg-slate-50 border border-slate-200 rounded-xl py-2 px-3 text-xs focus:outline-none focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500"
                          required
                        />
                      </div>

                      <div className="grid grid-cols-2 gap-3">
                        <div>
                          <label className="block text-[10px] font-bold text-slate-400 uppercase tracking-wider mb-1">Nama Warga Pelapor</label>
                          <input
                            type="text"
                            placeholder="Contoh: Agus Setiawan"
                            value={reportDraft.reporter || ''}
                            onChange={(e) => setReportDraft(prev => ({ ...prev, reporter: e.target.value }))}
                            className="w-full bg-slate-50 border border-slate-200 rounded-xl py-2 px-3 text-xs focus:outline-none focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500"
                            required
                          />
                        </div>
                        <div>
                          <label className="block text-[10px] font-bold text-slate-400 uppercase tracking-wider mb-1">Kategori Laporan</label>
                          <select
                            value={reportDraft.category || 'Lainnya'}
                            onChange={(e) => setReportDraft(prev => ({ ...prev, category: e.target.value as CitizenReport['category'] }))}
                            className="w-full bg-slate-50 border border-slate-200 rounded-xl py-2 px-2.5 text-xs focus:outline-none focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500"
                          >
                            <option value="Lalu Lintas">Lalu Lintas</option>
                            <option value="Kehilangan">Kehilangan</option>
                            <option value="Darurat">Darurat</option>
                            <option value="Event">Event</option>
                            <option value="Fasilitas">Fasilitas</option>
                            <option value="Lainnya">Lainnya</option>
                          </select>
                        </div>
                      </div>

                      <div className="grid grid-cols-2 gap-3">
                        <div>
                          <label className="block text-[10px] font-bold text-slate-400 uppercase tracking-wider mb-1">Tingkat Urgensi Kejadian</label>
                          <select
                            value={reportDraft.urgency || 'Sedang'}
                            onChange={(e) => setReportDraft(prev => ({ ...prev, urgency: e.target.value as CitizenReport['urgency'] }))}
                            className="w-full bg-slate-50 border border-slate-200 rounded-xl py-2 px-2.5 text-xs focus:outline-none focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500"
                          >
                            <option value="Rendah">Rendah (Aspirasi/Event/Kehilangan)</option>
                            <option value="Sedang">Sedang (Lalu lintas padat/Infrastruktur rusak)</option>
                            <option value="Tinggi">Tinggi (Banjir bandang/Darurat kecelakaan)</option>
                          </select>
                        </div>
                        <div>
                          <label className="block text-[10px] font-bold text-slate-400 uppercase tracking-wider mb-1">Jumlah Dukungan (Upvotes Awal)</label>
                          <input
                            type="number"
                            placeholder="Contoh: 15"
                            value={reportDraft.upvotes || 1}
                            onChange={(e) => setReportDraft(prev => ({ ...prev, upvotes: parseInt(e.target.value) || 1 }))}
                            className="w-full bg-slate-50 border border-slate-200 rounded-xl py-2 px-3 text-xs focus:outline-none focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500"
                          />
                        </div>
                      </div>

                      <div>
                        <label className="block text-[10px] font-bold text-slate-400 uppercase tracking-wider mb-1">Deskripsi Rinci Kejadian</label>
                        <textarea
                          placeholder="Jelaskan kondisi riil, lokasi spesifik, jam kejadian, dan imbauan kepada warga setempat..."
                          rows={3}
                          value={reportDraft.description || ''}
                          onChange={(e) => setReportDraft(prev => ({ ...prev, description: e.target.value }))}
                          className="w-full bg-slate-50 border border-slate-200 rounded-xl py-2 px-3 text-xs focus:outline-none focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500 resize-none"
                          required
                        ></textarea>
                      </div>

                      <div>
                        <label className="block text-[10px] font-bold text-slate-400 uppercase tracking-wider mb-1">Alamat / Lokasi Kejadian (Opsional)</label>
                        <input
                          type="text"
                          placeholder="Contoh: Depan Stasiun Madiun, Kec. Manguharjo"
                          value={reportDraft.location || ''}
                          onChange={(e) => setReportDraft(prev => ({ ...prev, location: e.target.value }))}
                          className="w-full bg-slate-50 border border-slate-200 rounded-xl py-2 px-3 text-xs focus:outline-none focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500"
                        />
                      </div>

                      <div>
                        <label className="block text-[10px] font-bold text-slate-400 uppercase tracking-wider mb-1">Foto Bukti / Kejadian (Maks 2MB)</label>
                        <div className="flex items-center space-x-3 mt-1">
                          {reportDraft.imageUrl ? (
                            <div className="relative w-16 h-16 rounded-xl overflow-hidden border border-slate-200 shrink-0 bg-slate-50">
                              <img src={reportDraft.imageUrl} alt="Bukti" className="w-full h-full object-cover" />
                              <button
                                type="button"
                                onClick={() => setReportDraft(prev => ({ ...prev, imageUrl: '' }))}
                                className="absolute inset-0 bg-black/50 text-white flex items-center justify-center text-[10px] font-bold opacity-0 hover:opacity-100 transition"
                              >
                                Hapus
                              </button>
                            </div>
                          ) : (
                            <div className="w-16 h-16 rounded-xl bg-slate-100 border-2 border-dashed border-slate-200 flex items-center justify-center text-slate-400 shrink-0">
                              <ImageIcon className="h-6 w-6" />
                            </div>
                          )}
                          <div className="flex-1">
                            <label className="cursor-pointer inline-flex items-center space-x-1.5 bg-white border border-slate-200 hover:border-slate-300 rounded-xl py-2 px-3 text-xs font-bold text-slate-700 transition">
                              <UploadCloud className="h-4 w-4 text-slate-500" />
                              <span>Pilih Foto...</span>
                              <input
                                type="file"
                                accept="image/*"
                                onChange={(e) => {
                                  const file = e.target.files?.[0];
                                  if (file) {
                                    if (file.size > 2 * 1024 * 1024) {
                                      triggerToast('Ukuran foto terlalu besar! Maksimal 2MB.', 'error');
                                      return;
                                    }
                                    const reader = new FileReader();
                                    reader.onloadend = () => {
                                      setReportDraft(prev => ({ ...prev, imageUrl: reader.result as string }));
                                    };
                                    reader.readAsDataURL(file);
                                  }
                                }}
                                className="hidden"
                              />
                            </label>
                            <p className="text-[10px] text-slate-400 mt-1">Gunakan format JPG, PNG, atau WEBP.</p>
                          </div>
                        </div>
                      </div>
                    </div>
                  )}

                  {/* --- SUBTAB: ROTATION FORM --- */}
                  {subTab === 'rotation' && (
                    <div className="space-y-4">
                      <div>
                        <label className="block text-[10px] font-bold text-slate-400 uppercase tracking-wider mb-1">Nama Media Giliran</label>
                        <input
                          type="text"
                          placeholder="Contoh: Radar Madiun"
                          value={rotationDraft.name || ''}
                          onChange={(e) => setRotationDraft(prev => ({ ...prev, name: e.target.value }))}
                          className="w-full bg-slate-50 border border-slate-200 rounded-xl py-2 px-3 text-xs focus:outline-none focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500"
                          required
                        />
                      </div>

                      <div className="grid grid-cols-2 gap-3">
                        <div>
                          <label className="block text-[10px] font-bold text-slate-400 uppercase tracking-wider mb-1">Kategori RSS Sumber</label>
                          <select
                            value={rotationDraft.category || 'RSS Antara'}
                            onChange={(e) => setRotationDraft(prev => ({ ...prev, category: e.target.value }))}
                            className="w-full bg-slate-50 border border-slate-200 rounded-xl py-2 px-2.5 text-xs focus:outline-none focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500"
                          >
                            <option value="RSS Antara">RSS Antara (Radar Madiun)</option>
                            <option value="RSS Detik">RSS Detik (Detik Madiun)</option>
                            <option value="RSS Pemkab">RSS Pemkab (Pemkab Madiun)</option>
                            <option value="RSS Pemkot">RSS Pemkot (Pemkot Madiun)</option>
                          </select>
                        </div>
                        <div>
                          <label className="block text-[10px] font-bold text-slate-400 uppercase tracking-wider mb-1">Pilihan Desain Tampilan</label>
                          <select
                            value={rotationDraft.color === 'from-blue-600 to-indigo-950' ? 'blue' : 
                                   rotationDraft.color === 'from-rose-600 to-red-950' ? 'red' :
                                   rotationDraft.color === 'from-amber-600 to-yellow-950' ? 'amber' :
                                   rotationDraft.color === 'from-emerald-600 to-teal-950' ? 'emerald' : 'purple'}
                            onChange={(e) => {
                              const val = e.target.value;
                              if (val === 'blue') {
                                setRotationDraft(prev => ({
                                  ...prev,
                                  color: 'from-blue-600 to-indigo-950',
                                  textAccent: 'text-blue-600',
                                  badgeColor: 'bg-blue-500 text-white',
                                  borderColor: 'border-blue-200'
                                }));
                              } else if (val === 'red') {
                                setRotationDraft(prev => ({
                                  ...prev,
                                  color: 'from-rose-600 to-red-950',
                                  textAccent: 'text-rose-600',
                                  badgeColor: 'bg-rose-500 text-white',
                                  borderColor: 'border-rose-200'
                                }));
                              } else if (val === 'amber') {
                                setRotationDraft(prev => ({
                                  ...prev,
                                  color: 'from-amber-600 to-yellow-950',
                                  textAccent: 'text-amber-600',
                                  badgeColor: 'bg-amber-500 text-white',
                                  borderColor: 'border-amber-200'
                                }));
                              } else if (val === 'emerald') {
                                setRotationDraft(prev => ({
                                  ...prev,
                                  color: 'from-emerald-600 to-teal-950',
                                  textAccent: 'text-emerald-600',
                                  badgeColor: 'bg-emerald-500 text-white',
                                  borderColor: 'border-emerald-200'
                                }));
                              } else {
                                setRotationDraft(prev => ({
                                  ...prev,
                                  color: 'from-purple-600 to-violet-950',
                                  textAccent: 'text-purple-600',
                                  badgeColor: 'bg-purple-500 text-white',
                                  borderColor: 'border-purple-200'
                                }));
                              }
                            }}
                            className="w-full bg-slate-50 border border-slate-200 rounded-xl py-2 px-2.5 text-xs focus:outline-none focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500"
                          >
                            <option value="blue">Tema Biru (Gaya Radar)</option>
                            <option value="red">Tema Merah (Gaya Detik)</option>
                            <option value="amber">Tema Kuning (Gaya Pemkab)</option>
                            <option value="emerald">Tema Hijau (Gaya Pemkot)</option>
                            <option value="purple">Tema Ungu (Kreatif)</option>
                          </select>
                        </div>
                      </div>

                      <div>
                        <label className="block text-[10px] font-bold text-slate-400 uppercase tracking-wider mb-1">Jam Giliran (Format 24 jam dipisahkan koma)</label>
                        <input
                          type="text"
                          placeholder="Contoh: 00:00-02:00, 08:00-10:00, 16:00-18:00"
                          value={rotationDraft.hours || ''}
                          onChange={(e) => setRotationDraft(prev => ({ ...prev, hours: e.target.value }))}
                          className="w-full bg-slate-50 border border-slate-200 rounded-xl py-2 px-3 text-xs focus:outline-none focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500"
                          required
                        />
                        <p className="text-[10px] text-slate-400 mt-1 font-medium">Harap isi slot jam giliran 2 jam berturut-turut untuk media ini. Contoh format: 00:00-02:00, 08:00-10:00, 16:00-18:00</p>
                      </div>
                    </div>
                  )}

                  {/* --- SUBTAB: VIRAL FORM --- */}
                  {subTab === 'viral' && (
                    <div className="space-y-4">
                      <div>
                        <label className="block text-[10px] font-bold text-slate-400 uppercase tracking-wider mb-1">Judul Kejadian / Postingan Medsos</label>
                        <input
                          type="text"
                          placeholder="Masukkan judul postingan viral..."
                          value={viralDraft.title || ''}
                          onChange={(e) => setViralDraft(prev => ({ ...prev, title: e.target.value }))}
                          className="w-full bg-slate-50 border border-slate-200 rounded-xl py-2 px-3 text-xs focus:outline-none focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500"
                          required
                        />
                      </div>

                      <div className="grid grid-cols-2 gap-3">
                        <div>
                          <label className="block text-[10px] font-bold text-slate-400 uppercase tracking-wider mb-1">Platform Media Sosial</label>
                          <select
                            value={viralDraft.platform || 'youtube'}
                            onChange={(e) => setViralDraft(prev => ({ ...prev, platform: e.target.value as any }))}
                            className="w-full bg-slate-50 border border-slate-200 rounded-xl py-2 px-2.5 text-xs focus:outline-none focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500"
                          >
                            <option value="youtube">YouTube</option>
                            <option value="facebook">Facebook</option>
                            <option value="instagram">Instagram</option>
                            <option value="tiktok">TikTok</option>
                          </select>
                        </div>
                        <div>
                          <label className="block text-[10px] font-bold text-slate-400 uppercase tracking-wider mb-1">Wilayah Kejadian</label>
                          <select
                            value={viralDraft.location || 'Kota Madiun'}
                            onChange={(e) => setViralDraft(prev => ({ ...prev, location: e.target.value as any }))}
                            className="w-full bg-slate-50 border border-slate-200 rounded-xl py-2 px-2.5 text-xs focus:outline-none focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500"
                          >
                            <option value="Kota Madiun">Kota Madiun</option>
                            <option value="Kabupaten Madiun">Kabupaten Madiun</option>
                          </select>
                        </div>
                      </div>

                      <div className="grid grid-cols-2 gap-3">
                        <div>
                          <label className="block text-[10px] font-bold text-slate-400 uppercase tracking-wider mb-1">Nama Akun Pengunggah (Author)</label>
                          <input
                            type="text"
                            placeholder="Contoh: @madiun_info"
                            value={viralDraft.author || ''}
                            onChange={(e) => setViralDraft(prev => ({ ...prev, author: e.target.value }))}
                            className="w-full bg-slate-50 border border-slate-200 rounded-xl py-2 px-3 text-xs focus:outline-none focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500"
                            required
                          />
                        </div>
                        <div>
                          <label className="block text-[10px] font-bold text-slate-400 uppercase tracking-wider mb-1">Tautan Sumber Postingan</label>
                          <input
                            type="url"
                            placeholder="Contoh: https://youtube.com/watch?v=..."
                            value={viralDraft.sourceUrl || ''}
                            onChange={(e) => setViralDraft(prev => ({ ...prev, sourceUrl: e.target.value }))}
                            className="w-full bg-slate-50 border border-slate-200 rounded-xl py-2 px-3 text-xs focus:outline-none focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500"
                            required
                          />
                        </div>
                      </div>

                      <div className="grid grid-cols-3 gap-3">
                        <div>
                          <label className="block text-[10px] font-bold text-slate-400 uppercase tracking-wider mb-1">Jumlah Likes</label>
                          <input
                            type="text"
                            placeholder="Contoh: 1.2K"
                            value={viralDraft.likes || ''}
                            onChange={(e) => setViralDraft(prev => ({ ...prev, likes: e.target.value }))}
                            className="w-full bg-slate-50 border border-slate-200 rounded-xl py-2 px-3 text-xs focus:outline-none focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500"
                          />
                        </div>
                        <div>
                          <label className="block text-[10px] font-bold text-slate-400 uppercase tracking-wider mb-1">Jumlah Views (Opsional)</label>
                          <input
                            type="text"
                            placeholder="Contoh: 45K"
                            value={viralDraft.views || ''}
                            onChange={(e) => setViralDraft(prev => ({ ...prev, views: e.target.value }))}
                            className="w-full bg-slate-50 border border-slate-200 rounded-xl py-2 px-3 text-xs focus:outline-none focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500"
                          />
                        </div>
                        <div>
                          <label className="block text-[10px] font-bold text-slate-400 uppercase tracking-wider mb-1">Keterangan Waktu</label>
                          <input
                            type="text"
                            placeholder="Contoh: 2 jam yang lalu"
                            value={viralDraft.date || ''}
                            onChange={(e) => setViralDraft(prev => ({ ...prev, date: e.target.value }))}
                            className="w-full bg-slate-50 border border-slate-200 rounded-xl py-2 px-3 text-xs focus:outline-none focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500"
                          />
                        </div>
                      </div>

                      <div>
                        <label className="block text-[10px] font-bold text-slate-400 uppercase tracking-wider mb-1">Deskripsi / Keterangan Postingan</label>
                        <textarea
                          placeholder="Jelaskan deskripsi atau keterangan detail dari kejadian medsos tersebut..."
                          rows={3}
                          value={viralDraft.description || ''}
                          onChange={(e) => setViralDraft(prev => ({ ...prev, description: e.target.value }))}
                          className="w-full bg-slate-50 border border-slate-200 rounded-xl py-2 px-3 text-xs focus:outline-none focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500 resize-none"
                        ></textarea>
                      </div>

                      <div>
                        <label className="block text-[10px] font-bold text-slate-400 uppercase tracking-wider mb-1">Foto Sampul / Poster Bukti (Maks 2MB)</label>
                        <div className="flex items-center space-x-3 mt-1">
                          {viralDraft.imageUrl ? (
                            <div className="relative w-16 h-16 rounded-xl overflow-hidden border border-slate-200 shrink-0 bg-slate-50">
                              <img src={viralDraft.imageUrl} alt="Pratinjau" className="w-full h-full object-cover" />
                              <button
                                type="button"
                                onClick={() => setViralDraft(prev => ({ ...prev, imageUrl: '' }))}
                                className="absolute inset-0 bg-black/50 text-white flex items-center justify-center text-[10px] font-bold opacity-0 hover:opacity-100 transition"
                              >
                                Hapus
                              </button>
                            </div>
                          ) : (
                            <div className="w-16 h-16 rounded-xl bg-slate-100 border-2 border-dashed border-slate-200 flex items-center justify-center text-slate-400 shrink-0">
                              <ImageIcon className="h-6 w-6" />
                            </div>
                          )}
                          <div className="flex-1">
                            <label className="cursor-pointer inline-flex items-center space-x-1.5 bg-white border border-slate-200 hover:border-slate-300 rounded-xl py-2 px-3 text-xs font-bold text-slate-700 transition">
                              <UploadCloud className="h-4 w-4 text-slate-500" />
                              <span>Pilih Foto...</span>
                              <input
                                type="file"
                                accept="image/*"
                                onChange={(e) => {
                                  const file = e.target.files?.[0];
                                  if (file) {
                                    if (file.size > 2 * 1024 * 1024) {
                                      triggerToast('Ukuran foto terlalu besar! Maksimal 2MB.', 'error');
                                      return;
                                    }
                                    const reader = new FileReader();
                                    reader.onloadend = () => {
                                      setViralDraft(prev => ({ ...prev, imageUrl: reader.result as string }));
                                    };
                                    reader.readAsDataURL(file);
                                  }
                                }}
                                className="hidden"
                              />
                            </label>
                            <p className="text-[10px] text-slate-400 mt-1">JPG, PNG, atau WEBP.</p>
                          </div>
                        </div>
                      </div>
                    </div>
                  )}

                  {/* --- SUBTAB: COMPLAINT CHANNELS FORM --- */}
                  {subTab === 'channels' && (
                    <div className="space-y-4">
                      <div>
                        <label className="block text-[10px] font-bold text-slate-400 uppercase tracking-wider mb-1">Nama Instansi / Nama Saluran Pengaduan</label>
                        <input
                          type="text"
                          placeholder="Contoh: WhatsApp AWAK SIGAP atau SP4N-LAPOR!"
                          value={channelDraft.name || ''}
                          onChange={(e) => setChannelDraft(prev => ({ ...prev, name: e.target.value }))}
                          className="w-full bg-slate-50 border border-slate-200 rounded-xl py-2 px-3 text-xs focus:outline-none focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500"
                          required
                        />
                      </div>

                      <div className="grid grid-cols-2 gap-3">
                        <div>
                          <label className="block text-[10px] font-bold text-slate-400 uppercase tracking-wider mb-1">Wilayah Sasaran Kerja</label>
                          <select
                            value={channelDraft.targetRegion || 'Kota Madiun'}
                            onChange={(e) => setChannelDraft(prev => ({ ...prev, targetRegion: e.target.value as any }))}
                            className="w-full bg-slate-50 border border-slate-200 rounded-xl py-2 px-2.5 text-xs focus:outline-none focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500"
                          >
                            <option value="Kota Madiun">Kota Madiun</option>
                            <option value="Kabupaten Madiun">Kabupaten Madiun</option>
                            <option value="Seluruh Madiun">Seluruh Wilayah Madiun</option>
                          </select>
                        </div>
                        <div>
                          <label className="block text-[10px] font-bold text-slate-400 uppercase tracking-wider mb-1">Tipe Penghubung (Koneksi)</label>
                          <select
                            value={channelDraft.type || 'whatsapp'}
                            onChange={(e) => setChannelDraft(prev => ({ ...prev, type: e.target.value as any }))}
                            className="w-full bg-slate-50 border border-slate-200 rounded-xl py-2 px-2.5 text-xs focus:outline-none focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500"
                          >
                            <option value="whatsapp">WhatsApp Chat</option>
                            <option value="phone">Telepon Saluran Siaga</option>
                            <option value="website">Situs Web Resmi</option>
                            <option value="sms">Layanan SMS</option>
                            <option value="email">Alamat Email Resmi</option>
                          </select>
                        </div>
                      </div>

                      <div className="grid grid-cols-2 gap-3">
                        <div>
                          <label className="block text-[10px] font-bold text-slate-400 uppercase tracking-wider mb-1">Nomor / Identitas Kontak Utama</label>
                          <input
                            type="text"
                            placeholder="Contoh: 08113577800 atau SMS ke 1708"
                            value={channelDraft.contactValue || ''}
                            onChange={(e) => setChannelDraft(prev => ({ ...prev, contactValue: e.target.value }))}
                            className="w-full bg-slate-50 border border-slate-200 rounded-xl py-2 px-3 text-xs focus:outline-none focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500"
                            required
                          />
                        </div>
                        <div>
                          <label className="block text-[10px] font-bold text-slate-400 uppercase tracking-wider mb-1">Tautan Tindakan / Link Aksi (Opsional)</label>
                          <input
                            type="text"
                            placeholder="Contoh: https://wa.me/628113577800 atau https://lapor.go.id"
                            value={channelDraft.actionUrl || ''}
                            onChange={(e) => setChannelDraft(prev => ({ ...prev, actionUrl: e.target.value }))}
                            className="w-full bg-slate-50 border border-slate-200 rounded-xl py-2 px-3 text-xs focus:outline-none focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500"
                          />
                        </div>
                      </div>

                      <div>
                        <label className="block text-[10px] font-bold text-slate-400 uppercase tracking-wider mb-1">Deskripsi Ringkas Layanan</label>
                        <textarea
                          placeholder="Jelaskan mengenai kegunaan saluran ini, cara warga menggunakannya, dll..."
                          rows={3}
                          value={channelDraft.description || ''}
                          onChange={(e) => setChannelDraft(prev => ({ ...prev, description: e.target.value }))}
                          className="w-full bg-slate-50 border border-slate-200 rounded-xl py-2 px-3 text-xs focus:outline-none focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500 resize-none"
                          required
                        ></textarea>
                      </div>
                    </div>
                  )}

                  {/* Submit buttons */}
                  <div className="flex gap-2 pt-4 border-t border-slate-100">
                    <button
                      type="button"
                      onClick={() => setIsFormOpen(false)}
                      className="flex-1 bg-slate-100 hover:bg-slate-200 text-slate-700 font-bold py-2 rounded-xl text-xs transition"
                    >
                      Batal
                    </button>
                    <button
                      type="submit"
                      className="flex-1 bg-emerald-600 hover:bg-emerald-700 text-white font-bold py-2 rounded-xl text-xs transition shadow"
                    >
                      Simpan Data
                    </button>
                  </div>
                </form>

              </div>
            </div>
          </div>
        </div>
      )}

      {/* DELETE CONFIRMATION DIALOG */}
      {deleteConfirmId !== null && (
        <div className="fixed inset-0 z-50 overflow-y-auto" aria-labelledby="modal-title" role="dialog" aria-modal="true" id="admin-delete-confirm-modal">
          <div className="flex items-center justify-center min-h-screen px-4 pt-4 pb-20 text-center sm:block sm:p-0">
            <div className="fixed inset-0 transition-opacity bg-slate-900/60 backdrop-blur-sm" onClick={() => setDeleteConfirmId(null)}></div>
            <span className="hidden sm:inline-block sm:align-middle sm:h-screen" aria-hidden="true">&#8203;</span>
            
            <div className="inline-block relative z-10 align-bottom bg-white rounded-3xl text-left overflow-hidden shadow-2xl transform transition-all sm:my-8 sm:align-middle sm:max-w-md sm:w-full animate-fade-in">
              <div className="p-6 text-center">
                <div className="mx-auto w-12 h-12 bg-rose-50 rounded-2xl flex items-center justify-center text-rose-600 mb-4 border border-rose-100">
                  <AlertCircle className="h-6 w-6" />
                </div>
                <h3 className="font-extrabold text-slate-900 text-base font-serif mb-1">Konfirmasi Hapus Konten</h3>
                <p className="text-slate-500 text-xs sm:text-sm leading-relaxed mb-6">
                  Apakah Anda benar-benar yakin ingin menghapus item ini? Tindakan ini bersifat permanen dan konten akan langsung hilang dari halaman publik portal.
                </p>

                <div className="flex gap-2">
                  <button
                    type="button"
                    onClick={() => setDeleteConfirmId(null)}
                    className="flex-1 bg-slate-100 hover:bg-slate-200 text-slate-700 font-bold py-2 rounded-xl text-xs transition"
                  >
                    Batal
                  </button>
                  <button
                    type="button"
                    onClick={() => handleDeleteItem(deleteConfirmId)}
                    className="flex-1 bg-rose-600 hover:bg-rose-700 text-white font-bold py-2 rounded-xl text-xs transition shadow"
                  >
                    Ya, Hapus Sekarang
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* DELETE CONFIRMATION FOR ROTATION SOURCES */}
      {deleteConfirmRotationId !== null && (
        <div className="fixed inset-0 z-50 overflow-y-auto" aria-labelledby="modal-title" role="dialog" aria-modal="true" id="admin-delete-confirm-rotation-modal">
          <div className="flex items-center justify-center min-h-screen px-4 pt-4 pb-20 text-center sm:block sm:p-0">
            <div className="fixed inset-0 transition-opacity bg-slate-900/60 backdrop-blur-sm" onClick={() => setDeleteConfirmRotationId(null)}></div>
            <span className="hidden sm:inline-block sm:align-middle sm:h-screen" aria-hidden="true">&#8203;</span>
            
            <div className="inline-block relative z-10 align-bottom bg-white rounded-3xl text-left overflow-hidden shadow-2xl transform transition-all sm:my-8 sm:align-middle sm:max-w-md sm:w-full animate-fade-in">
              <div className="p-6 text-center">
                <div className="mx-auto w-12 h-12 bg-rose-50 rounded-2xl flex items-center justify-center text-rose-600 mb-4 border border-rose-100">
                  <AlertCircle className="h-6 w-6" />
                </div>
                <h3 className="font-extrabold text-slate-900 text-base font-serif mb-1">Konfirmasi Hapus Giliran</h3>
                <p className="text-slate-500 text-xs sm:text-sm leading-relaxed mb-6">
                  Apakah Anda benar-benar yakin ingin menghapus jadwal giliran ini? Tindakan ini bersifat permanen dan media ini tidak akan masuk dalam rotasi 2 jam otomatis.
                </p>

                <div className="flex gap-2">
                  <button
                    type="button"
                    onClick={() => setDeleteConfirmRotationId(null)}
                    className="flex-1 bg-slate-100 hover:bg-slate-200 text-slate-700 font-bold py-2 rounded-xl text-xs transition"
                  >
                    Batal
                  </button>
                  <button
                    type="button"
                    onClick={() => handleDeleteRotationItem(deleteConfirmRotationId)}
                    className="flex-1 bg-rose-600 hover:bg-rose-700 text-white font-bold py-2 rounded-xl text-xs transition shadow"
                  >
                    Ya, Hapus Sekarang
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

    </div>
  );
}
