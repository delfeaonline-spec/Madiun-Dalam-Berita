import { jsPDF } from 'jspdf';

export function generateSystemRisalahPDF(): void {
  // Initialize PDF (A4 size: 210 x 297 mm)
  const doc = new jsPDF({
    orientation: 'portrait',
    unit: 'mm',
    format: 'a4'
  });

  const pageWidth = 210;
  const pageHeight = 297;
  const margin = 20;
  const contentWidth = pageWidth - (margin * 2);

  // Helper variables
  let currentPage = 1;
  let yPos = 0;

  // Primary color: Emerald Green (#059669)
  const primaryColor = { r: 5, g: 150, b: 105 };
  // Secondary color: Slate Grey (#475569)
  const secondaryColor = { r: 71, g: 85, b: 105 };
  // Text color: Dark Charcoal (#1e293b)
  const textColor = { r: 30, g: 41, b: 59 };
  // Muted color: Light Slate (#94a3b8)
  const mutedColor = { r: 148, g: 163, b: 184 };

  // Helper to add a clean header and footer to pages (except cover)
  const drawPageDecorations = (pageNumber: number) => {
    if (pageNumber === 1) return; // Skip cover

    // Header
    doc.setFont('helvetica', 'normal');
    doc.setFontSize(8);
    doc.setTextColor(secondaryColor.r, secondaryColor.g, secondaryColor.b);
    doc.text('DOKUMEN RESUME & TOPOLOGI SISTEM — PORTAL BERITA MADIUN', margin, 12);
    
    // Header Line
    doc.setDrawColor(226, 232, 240); // border-slate-200
    doc.setLineWidth(0.2);
    doc.line(margin, 14, pageWidth - margin, 14);

    // Footer Line
    doc.line(margin, pageHeight - 15, pageWidth - margin, pageHeight - 15);

    // Footer Text
    doc.text('Hak Cipta © 2026 Portal Berita Madiun. All Rights Reserved.', margin, pageHeight - 10);
    doc.text(`Halaman ${pageNumber}`, pageWidth - margin - 15, pageHeight - 10);
  };

  // Helper to check page bounds and handle page break
  const checkPageBreak = (neededHeight: number) => {
    if (yPos + neededHeight > pageHeight - 20) {
      doc.addPage();
      currentPage++;
      drawPageDecorations(currentPage);
      yPos = margin + 5; // Reset yPos for the new page
    }
  };

  // Helper to add a heading with appropriate styling
  const addHeading = (text: string, level: 1 | 2 | 3) => {
    let size = 16;
    let spacing = 8;
    let fontStyle = 'bold';
    let color = primaryColor;

    if (level === 1) {
      size = 15;
      spacing = 8;
      color = primaryColor;
    } else if (level === 2) {
      size = 12;
      spacing = 6;
      color = secondaryColor;
    } else {
      size = 10;
      spacing = 4;
      color = textColor;
    }

    checkPageBreak(size / 2 + spacing);
    
    doc.setFont('helvetica', fontStyle);
    doc.setFontSize(size);
    doc.setTextColor(color.r, color.g, color.b);
    
    yPos += spacing;
    doc.text(text, margin, yPos);
    yPos += (size / 2.5);
  };

  // Helper to add paragraph text with auto wrapping
  const addParagraph = (text: string, style: 'normal' | 'italic' | 'bold' = 'normal', indent = 0) => {
    doc.setFont('helvetica', style);
    doc.setFontSize(10);
    doc.setTextColor(textColor.r, textColor.g, textColor.b);

    const splitText: string[] = doc.splitTextToSize(text, contentWidth - indent);
    const lineHeight = 5.2;

    splitText.forEach((line) => {
      checkPageBreak(lineHeight);
      doc.text(line, margin + indent, yPos);
      yPos += lineHeight;
    });
    
    yPos += 2; // Small gap after paragraph
  };

  // Helper to add bullet point
  const addBulletPoint = (label: string, text: string, indent = 4) => {
    checkPageBreak(6);
    
    doc.setFont('helvetica', 'bold');
    doc.setFontSize(10);
    doc.setTextColor(primaryColor.r, primaryColor.g, primaryColor.b);
    doc.text('•  ' + label + ':', margin + indent, yPos);
    
    const labelWidth = doc.getTextWidth('•  ' + label + ': ');
    
    doc.setFont('helvetica', 'normal');
    doc.setTextColor(textColor.r, textColor.g, textColor.b);
    
    const splitText: string[] = doc.splitTextToSize(text, contentWidth - indent - labelWidth - 2);
    const lineHeight = 5.2;

    splitText.forEach((line, index) => {
      checkPageBreak(lineHeight);
      const xOffset = index === 0 ? margin + indent + labelWidth + 1 : margin + indent + 6;
      doc.text(line, xOffset, yPos);
      yPos += lineHeight;
    });
    
    yPos += 1.5;
  };

  // ==========================================
  // PAGE 1: COVER PAGE
  // ==========================================
  
  // Decorative Left Color bar
  doc.setFillColor(primaryColor.r, primaryColor.g, primaryColor.b);
  doc.rect(0, 0, 15, pageHeight, 'F');

  // Decorative header corner accent
  doc.setFillColor(secondaryColor.r, secondaryColor.g, secondaryColor.b);
  doc.rect(15, 0, pageWidth - 15, 8, 'F');

  yPos = 50;

  // Document Badge
  doc.setFillColor(240, 253, 250); // bg-emerald-50
  doc.setDrawColor(primaryColor.r, primaryColor.g, primaryColor.b);
  doc.setLineWidth(0.3);
  doc.rect(30, yPos, 85, 8, 'DF');
  doc.setFont('helvetica', 'bold');
  doc.setFontSize(8.5);
  doc.setTextColor(primaryColor.r, primaryColor.g, primaryColor.b);
  doc.text('DOKUMEN RESUME & TOPOLOGI PORTAL', 35, yPos + 5.5);

  yPos += 20;

  // Main Title
  doc.setFont('helvetica', 'bold');
  doc.setFontSize(24);
  doc.setTextColor(textColor.r, textColor.g, textColor.b);
  doc.text('PORTAL BERITA MADIUN', 30, yPos);
  
  yPos += 10;
  
  // Subtitle
  doc.setFontSize(14);
  doc.setFont('helvetica', 'normal');
  doc.setTextColor(secondaryColor.r, secondaryColor.g, secondaryColor.b);
  const titleDesc = 'Uraian Analisis Sistem, Topologi Arsitektur, Penjelasan Fungsi Menu, dan Panduan Teknis Integrasi Cloud Database';
  const splitTitleDesc: string[] = doc.splitTextToSize(titleDesc, contentWidth - 20);
  splitTitleDesc.forEach((line) => {
    doc.text(line, 30, yPos);
    yPos += 7;
  });

  yPos += 15;

  // Decorative separating line
  doc.setDrawColor(primaryColor.r, primaryColor.g, primaryColor.b);
  doc.setLineWidth(1.5);
  doc.line(30, yPos, 120, yPos);

  yPos += 25;

  // Scope metadata description
  doc.setFont('helvetica', 'normal');
  doc.setFontSize(10.5);
  doc.setTextColor(textColor.r, textColor.g, textColor.b);
  doc.text('Lingkup Bahasan Dokumen:', 30, yPos);
  
  yPos += 7;
  doc.setFont('helvetica', 'bold');
  const scopeItems = [
    'Latar Belakang & Pendahuluan Implementasi',
    'Arsitektur dan Topologi Jaringan & Data (Full-Stack)',
    'Fungsi, Kegunaan, dan Desain Alur Tiap Menu/Fitur',
    'Sistem Manajemen Data (Firebase Cloud Integration)',
    'Kontrol Konfigurasi Portal (Panel Admin)'
  ];
  scopeItems.forEach((item) => {
    doc.text(`-  ${item}`, 35, yPos);
    yPos += 6;
  });

  yPos = pageHeight - 65;

  // Logo Placeholder / Emblem Graphic
  doc.setFillColor(241, 245, 249); // slate-100
  doc.rect(30, yPos, 140, 25, 'F');
  
  // Outer Border for graphic
  doc.setDrawColor(203, 213, 225); // slate-300
  doc.setLineWidth(0.3);
  doc.rect(30, yPos, 140, 25, 'D');

  // Text inside Emblem
  doc.setFont('helvetica', 'bold');
  doc.setFontSize(11);
  doc.setTextColor(primaryColor.r, primaryColor.g, primaryColor.b);
  doc.text('BERITA MADIUN', 35, yPos + 9);
  
  doc.setFont('helvetica', 'normal');
  doc.setFontSize(8.5);
  doc.setTextColor(secondaryColor.r, secondaryColor.g, secondaryColor.b);
  doc.text('Sistem Informasi Kolaborasi Digital Kemasyarakatan, Ekonomi Mikro, dan Pelaporan Warga', 35, yPos + 15);
  doc.text('Integrasi Server-Side Node.js, React SPA, Tailwind CSS, dan Firebase Firestore Cloud', 35, yPos + 20);

  yPos += 35;

  // Footer Metadata
  doc.setFont('helvetica', 'bold');
  doc.setFontSize(9);
  doc.setTextColor(textColor.r, textColor.g, textColor.b);
  doc.text('Diterbitkan Oleh:', 30, yPos);
  doc.text('Tanggal Dokumen:', 120, yPos);
  
  yPos += 5;
  doc.setFont('helvetica', 'normal');
  doc.setTextColor(secondaryColor.r, secondaryColor.g, secondaryColor.b);
  doc.text('Tim Pengembang Redaksi Digital Madiun', 30, yPos);
  doc.text('15 Juli 2026 (Waktu Sistem Resmi)', 120, yPos);

  yPos += 4;
  doc.text('Pemberdayaan Teknologi Lokal Berkelanjutan', 30, yPos);
  doc.text('Versi Rilis Aplikasi: v1.2.0 (Stable)', 120, yPos);


  // ==========================================
  // PAGE 2: PENDAHULUAN & LATAR BELAKANG
  // ==========================================
  doc.addPage();
  currentPage++;
  drawPageDecorations(currentPage);
  
  yPos = margin + 5;
  
  addHeading('I. PENDAHULUAN', 1);
  
  addHeading('1.1 Latar Belakang Masalah', 2);
  addParagraph('Perkembangan pesat teknologi informasi pada era digital menuntut ketersediaan akses informasi yang cepat, kredibel, dan transparan bagi masyarakat di tingkat kabupaten maupun kota. Wilayah Madiun Raya (Kota dan Kabupaten Madiun) memiliki dinamika masyarakat yang tinggi dengan pertumbuhan ekonomi lokal yang bertumpu pada Usaha Mikro, Kecil, dan Menengah (UMKM). Di sisi lain, isu-isu sosial kemasyarakatan seperti penyerapan tenaga kerja (lowongan pekerjaan), pengelolaan sarana publik, koordinasi penanganan kejadian darurat, serta pengawasan visual tata kota secara real-time menjadi perhatian utama warga.');
  addParagraph('Selama ini, akses informasi tersebut sering kali terfragmentasi di berbagai platform media sosial yang terpisah-pisah, kurang terverifikasi, dan sulit disaring secara terstruktur. Sebagai akibatnya, pelaku UMKM kesulitan mendapatkan etalase produk yang terintegrasi, pencari kerja kesulitan menemukan lowongan lokal yang kredibel, serta pemerintah daerah atau warga lainnya lambat merespons laporan kejadian darurat di lingkungan mereka.');
  addParagraph('Untuk mengatasi tantangan tersebut, diperlukan sebuah infrastruktur "Single Window Portal" yang menyatukan seluruh pilar kolaborasi digital warga. Portal "Berita Madiun" hadir sebagai platform digital komprehensif yang dirancang secara khusus untuk warga Madiun Raya, mengintegrasikan pilar-pilar informasi esensial dalam satu aplikasi yang ringkas, interaktif, cepat, dan responsif.');

  addHeading('1.2 Maksud dan Tujuan Pengembangan', 2);
  addParagraph('Pengembangan aplikasi portal Berita Madiun memiliki maksud untuk menyediakan wadah kolaborasi digital kemasyarakatan yang menggabungkan aspek jurnalisme warga, pemberdayaan ekonomi kreatif, informasi karir lokal, dan transparansi pelayanan publik.');
  addParagraph('Adapun tujuan taktis dan strategis dari platform ini adalah sebagai berikut:');
  
  addBulletPoint('Pusat Informasi Terkini', 'Menyediakan saluran berita yang kredibel dan up-to-date, baik yang dirilis langsung oleh redaksi portal maupun sinkronisasi real-time RSS Feed dari media nasional regional Jawa Timur.');
  addBulletPoint('Pemberdayaan Ekonomi Mikro (Pasar UMKM)', 'Memberikan ruang etalase gratis dan terstruktur bagi pelaku UMKM Madiun untuk mengiklankan produk mereka lengkap dengan rincian kontak WhatsApp langsung tanpa biaya perantara.');
  addBulletPoint('Peningkatan Penyerapan Tenaga Kerja', 'Memfasilitasi informasi lowongan pekerjaan (Loker) lokal guna meminimalisir angka pengangguran di wilayah Madiun Raya.');
  addBulletPoint('Kanal Pengaduan Cepat Warga', 'Menyediakan fitur "Lapor Kejadian Warga" secara real-time guna mempercepat pelaporan kendala infrastruktur, bencana alam, kemacetan lalu lintas, maupun kejadian viral.');
  addBulletPoint('Monitoring Visual Kota', 'Menghubungkan warga dengan kamera pengintai lalu lintas (CCTV) Madiun guna mengantisipasi kemacetan dan mengamati kondisi wilayah strategis secara aktual.');


  // ==========================================
  // PAGE 3: TOPOLOGI & ARSITEKTUR SISTEM
  // ==========================================
  doc.addPage();
  currentPage++;
  drawPageDecorations(currentPage);
  
  yPos = margin + 5;
  
  addHeading('II. TOPOLOGI & ARSITEKTUR SISTEM', 1);
  
  addHeading('2.1 Topologi Logis Aplikasi (Full-Stack)', 2);
  addParagraph('Aplikasi Portal Berita Madiun dirancang dengan arsitektur modern berkinerja tinggi, memanfaatkan model full-stack modern dengan runtime Express di backend dan React 19 di frontend, yang dideploy secara aman dalam platform Cloud Run. Struktur database menggunakan Firebase Firestore untuk menyimpan data secara persisten dan melayani pembaruan riil-waktu (real-time sync).');
  
  yPos += 2;
  
  // DRAWING TOPOLOGY DIAGRAM
  // Frame box for diagram
  doc.setFillColor(248, 250, 252); // slate-50
  doc.setDrawColor(203, 213, 225); // slate-300
  doc.setLineWidth(0.4);
  doc.rect(margin, yPos, contentWidth, 75, 'DF');

  // Title inside diagram box
  doc.setFont('helvetica', 'bold');
  doc.setFontSize(8.5);
  doc.setTextColor(secondaryColor.r, secondaryColor.g, secondaryColor.b);
  doc.text('DIAGRAM TOPOLOGI LOGIS & ARSITEKTUR ALUR DATA', margin + 5, yPos + 6);

  // Box 1: Browser Client (Frontend)
  doc.setFillColor(255, 255, 255);
  doc.setDrawColor(primaryColor.r, primaryColor.g, primaryColor.b);
  doc.rect(margin + 45, yPos + 12, 80, 14, 'DF');
  doc.setFont('helvetica', 'bold');
  doc.setFontSize(9);
  doc.setTextColor(primaryColor.r, primaryColor.g, primaryColor.b);
  doc.text('USER BROWSER / CLIENT LAYER', margin + 57, yPos + 17.5);
  doc.setFont('helvetica', 'normal');
  doc.setFontSize(7.5);
  doc.setTextColor(textColor.r, textColor.g, textColor.b);
  doc.text('React 19 SPA | Tailwind CSS | Lucide Icons | Motion Animasi', margin + 49, yPos + 22.5);

  // Arrow Down 1
  doc.setDrawColor(secondaryColor.r, secondaryColor.g, secondaryColor.b);
  doc.line(margin + 85, yPos + 26, margin + 85, yPos + 34);
  doc.line(margin + 83, yPos + 32, margin + 85, yPos + 34);
  doc.line(margin + 87, yPos + 32, margin + 85, yPos + 34);

  // Box 2: Node.js Express Server
  doc.setFillColor(255, 255, 255);
  doc.setDrawColor(secondaryColor.r, secondaryColor.g, secondaryColor.b);
  doc.rect(margin + 40, yPos + 34, 90, 14, 'DF');
  doc.setFont('helvetica', 'bold');
  doc.setFontSize(9);
  doc.setTextColor(secondaryColor.r, secondaryColor.g, secondaryColor.b);
  doc.text('BACKEND ENGINE & MIDDLEWARE LAYER', margin + 48, yPos + 39.5);
  doc.setFont('helvetica', 'normal');
  doc.setFontSize(7.5);
  doc.setTextColor(textColor.r, textColor.g, textColor.b);
  doc.text('Node.js & Express | Proxy API Keamanan | Vite Dev Server', margin + 46, yPos + 44.5);

  // Connecting line below Server to 3 split boxes
  doc.line(margin + 85, yPos + 48, margin + 85, yPos + 54);
  doc.line(margin + 25, yPos + 54, margin + 145, yPos + 54);
  
  // Arrow Down to DB
  doc.line(margin + 25, yPos + 54, margin + 25, yPos + 59);
  doc.line(margin + 23, yPos + 57, margin + 25, yPos + 59);
  doc.line(margin + 27, yPos + 57, margin + 25, yPos + 59);

  // Arrow Down to CCTV
  doc.line(margin + 85, yPos + 54, margin + 85, yPos + 59);
  doc.line(margin + 83, yPos + 57, margin + 85, yPos + 59);
  doc.line(margin + 87, yPos + 57, margin + 85, yPos + 59);

  // Arrow Down to RSS
  doc.line(margin + 145, yPos + 54, margin + 145, yPos + 59);
  doc.line(margin + 143, yPos + 57, margin + 145, yPos + 59);
  doc.line(margin + 147, yPos + 57, margin + 145, yPos + 59);

  // Bottom Box A: Firebase Firestore Cloud
  doc.setFillColor(254, 243, 199); // amber-100
  doc.setDrawColor(245, 158, 11); // amber-500
  doc.rect(margin + 5, yPos + 59, 40, 11, 'DF');
  doc.setFont('helvetica', 'bold');
  doc.setFontSize(7.5);
  doc.setTextColor(180, 83, 9); // amber-800
  doc.text('FIREBASE FIRESTORE', margin + 10, yPos + 64);
  doc.setFont('helvetica', 'normal');
  doc.setFontSize(6.5);
  doc.text('Real-time DB / Cloud Sync', margin + 9, yPos + 67.5);

  // Bottom Box B: Live CCTV Gateway
  doc.setFillColor(254, 226, 226); // rose-100
  doc.setDrawColor(239, 68, 68); // rose-500
  doc.rect(margin + 65, yPos + 59, 40, 11, 'DF');
  doc.setFont('helvetica', 'bold');
  doc.setFontSize(7.5);
  doc.setTextColor(185, 28, 28); // rose-800
  doc.text('LIVE CCTV GATEWAY', margin + 69, yPos + 64);
  doc.setFont('helvetica', 'normal');
  doc.setFontSize(6.5);
  doc.text('HLS Stream Kominfo Madiun', margin + 67, yPos + 67.5);

  // Bottom Box C: RSS Live Feed Gateway
  doc.setFillColor(224, 242, 254); // sky-100
  doc.setDrawColor(14, 165, 233); // sky-500
  doc.rect(margin + 125, yPos + 59, 40, 11, 'DF');
  doc.setFont('helvetica', 'bold');
  doc.setFontSize(7.5);
  doc.setTextColor(3, 105, 161); // sky-800
  doc.text('RSS NEWS FEED API', margin + 129, yPos + 64);
  doc.setFont('helvetica', 'normal');
  doc.setFontSize(6.5);
  doc.text('Jatim Media XML Parser', margin + 128, yPos + 67.5);

  yPos += 80;

  addHeading('2.2 Penjelasan Aliran Data Sistem', 2);
  addParagraph('Alur kerja interaksi data di dalam sistem terbagi menjadi tiga komponen logis:');
  addBulletPoint('Sinkronisasi Data Dua Arah (Real-Time Cloud Sync)', 'Aplikasi mendengarkan pembaruan koleksi database Firestore secara asinkron. Perubahan yang dilakukan oleh Admin di panel kendali langsung terdistribusi ke seluruh browser warga aktif tanpa perlu memuat ulang halaman (zero-reload). Jika koneksi terputus, sistem secara otomatis beralih menggunakan LocalStorage sebagai mekanisme cadangan (fallback) offline.');
  addBulletPoint('Integrasi Media Publik (RSS Feed Parser)', 'Aplikasi melakukan panggilan asinkron ke server backend untuk mem-parsing umpan berita RSS dari kanal terpercaya Jawa Timur (misal: Detikcom Jatim / Antara News Jatim). Data XML dikonversi menjadi skema JSON yang seragam untuk ditampilkan secara dinamis di tab Berita.');
  addBulletPoint('Monitoring Lalu Lintas Real-time', 'Gateway CCTV menghubungkan pemutar video HLS (HTTP Live Streaming) dalam format iframe/video player ke server umpan visual streaming Dinas Perhubungan/Kominfo Kota/Kabupaten Madiun secara langsung.');


  // ==========================================
  // PAGE 4: DETAIL MENU & FITUR PORTAL
  // ==========================================
  doc.addPage();
  currentPage++;
  drawPageDecorations(currentPage);
  
  yPos = margin + 5;
  
  addHeading('III. PENJELASAN DETIL MENU & FITUR APLIKASI', 1);
  addParagraph('Portal Berita Madiun didesain dengan antarmuka yang ramah pengguna, berfokus pada kemudahan akses, kecepatan muat data, serta fungsionalitas yang tinggi. Berikut adalah rincian fungsionalitas dari setiap menu utama yang tersedia di portal:');
  
  addHeading('3.1 Menu Berita Terkini (Portal & RSS Live)', 2);
  addParagraph('Menu utama ini dirancang untuk menyajikan informasi visual dan tekstual seputar kejadian terbaru di Madiun Raya. Fitur pendukungnya meliputi:');
  addBulletPoint('Pilihan Sumber Berita', 'Warga dapat menyaring tampilan berita antara rilis "Redaksi Lokal Berita Madiun" (yang dikelola admin) atau "Live Feed RSS" dari jaringan media nasional Jawa Timur.');
  addBulletPoint('Sistem Filter Kategori', 'Pengguna dapat memilah berita berdasarkan kategori seperti Politik, Ekonomi, Sosial, Wisata, Kuliner, Kebencanaan, dan Olahraga.');
  addBulletPoint('Fungsi Estimasi Waktu Baca (Read Time Indicator)', 'Membantu pembaca memperkirakan waktu yang dibutuhkan untuk memahami isi berita (misal: "3 menit membaca").');

  addHeading('3.2 Menu Lowongan Kerja (Loker Madiun)', 2);
  addParagraph('Fitur penyerapan tenaga kerja yang mempertemukan pencari kerja dengan pelaku usaha lokal di Madiun Raya secara langsung tanpa perantara. Kegunaannya meliputi:');
  addBulletPoint('Filter Jenis Loker', 'Pencarian lowongan berdasarkan kategori kontrak kerja, seperti Full-Time (Penuh Waktu), Part-Time (Paruh Waktu), Freelance, Magang, atau Kontrak.');
  addBulletPoint('Detail Kualifikasi & Deskripsi Kerja', 'Informasi mendalam mengenai kualifikasi pendidikan, rentang gaji, tanggung jawab pekerjaan, serta alamat perusahaan pemberi kerja.');
  addBulletPoint('Formulir Lamaran Langsung', 'Warga dapat melamar pekerjaan langsung melalui modal pendaftaran digital dengan mengunggah resume atau memasukkan data profil diri.');

  addHeading('3.3 Menu Pasar UMKM Madiun', 2);
  addParagraph('Katalog digital terstruktur untuk mempromosikan produk, kuliner, kerajinan, maupun jasa lokal khas Madiun. Fungsionalitasnya meliputi:');
  addBulletPoint('Tautan Pemesanan WhatsApp Langsung', 'Menghilangkan hambatan transaksi dengan menyediakan tombol pintas yang langsung membuka aplikasi WhatsApp chat ke penjual dengan draf pesan otomatis.');
  addBulletPoint('Sistem Penilaian & Testimoni', 'Meningkatkan kredibilitas lapak melalui sistem bintang rating dan ulasan tertulis dari warga yang pernah bertransaksi.');
  addBulletPoint('Filter Berdasarkan Wilayah Lapak', 'Mempermudah pencarian penjual terdekat yang berlokasi di Kota Madiun maupun Kabupaten Madiun.');


  // ==========================================
  // PAGE 5: DETAIL MENU (CONT.) & PENUTUP
  // ==========================================
  doc.addPage();
  currentPage++;
  drawPageDecorations(currentPage);
  
  yPos = margin + 5;
  
  addHeading('3.4 Menu Kejadian / Viral (Aduan Warga)', 2);
  addParagraph('Menu ini berfungsi sebagai wadah pelaporan kejadian penting atau keluhan pelayanan publik yang ditemukan warga di lapangan. Kegunaannya meliputi:');
  addBulletPoint('Sistem Pelaporan Mandiri', 'Warga dapat mendaftarkan kejadian baru dengan menentukan judul, kategori (Lalu Lintas, Bencana, Kerusakan Jalan, Kamtibmas), wilayah, dan unggahan tautan gambar bukti.');
  addBulletPoint('Sistem Dukungan Warga (Upvoting)', 'Masyarakat dapat mengklik tombol "Dukung Laporan" (upvote) untuk menaikkan popularitas aduan, sehingga laporan yang memiliki urgensi tinggi otomatis naik ke posisi atas.');
  addBulletPoint('Kolom Komentar / Diskusi Interaktif', 'Memungkinkan terjadinya dialog dan klarifikasi antarwarga mengenai perkembangan penanganan kejadian di lapangan.');

  addHeading('3.5 Menu CCTV Madiun (Live Monitoring)', 2);
  addParagraph('Kegunaan utama fitur ini adalah memberikan kemudahan bagi warga untuk memantau situasi lalu lintas, genangan air banjir, maupun kondisi cuaca di persimpangan jalan utama Madiun Raya secara aktual.');

  addHeading('3.6 Menu Kelola Portal (Panel Admin Kendali)', 2);
  addParagraph('Panel manajemen khusus yang hanya dapat diakses oleh petugas administrator portal menggunakan sandi pengaman. Kegunaannya meliputi:');
  addBulletPoint('Pembaruan Teks Berjalan (Running Ticker Text)', 'Mengubah teks pengumuman penting atau darurat yang berjalan di bagian atas halaman portal secara instan.');
  addBulletPoint('Manajemen CRUD Konten Lengkap', 'Menambah, mengubah (edit), atau menghapus item Berita, Loker, Lapak UMKM, aduan warga, maupun mengatur tautan URL CCTV.');
  addBulletPoint('Kustomisasi Tampilan Latar Belakang Portal', 'Mengganti gambar latar belakang (background wallpaper) utama portal secara dinamis dengan menginput URL gambar baru.');

  addHeading('IV. PENUTUP & KESIMPULAN', 1);
  addHeading('4.1 Kesimpulan', 2);
  addParagraph('Portal Berita Madiun telah berhasil direalisasikan menjadi platform kolaborasi kemasyarakatan yang tangguh, modern, dan fungsional. Melalui integrasi teknologi full-stack Node.js + React dan sinkronisasi Firestore Cloud, platform ini mampu melayani lalu lintas informasi aktual secara real-time, memberdayakan UMKM lokal untuk menembus pasar digital, memfasilitasi penyerapan lapangan kerja, mempercepat respons aduan warga, serta mempermudah pemantauan lalu lintas jalan raya.');
  
  addHeading('4.2 Rekomendasi Pengembangan Lanjutan', 2);
  addBulletPoint('Integrasi AI untuk Moderasi Konten', 'Memanfaatkan model Gemini AI untuk menyaring laporan kejadian warga secara otomatis guna mendeteksi hoaks, kata-kata kasar, atau konten sensitif sebelum ditayangkan.');
  addBulletPoint('Sistem Notifikasi Push (Push Notification)', 'Mengirimkan notifikasi langsung ke smartphone warga jika ada kejadian darurat bencana alam atau pengumuman penting dari pemerintah daerah.');
  addBulletPoint('Peta Sebaran Laporan Interaktif', 'Menampilkan lokasi aduan warga dan lapak UMKM menggunakan Google Maps API agar koordinat geografis pelaporan lebih akurat dan mudah dianalisis.');

  yPos += 10;
  
  // Signature block
  checkPageBreak(30);
  doc.setFont('helvetica', 'normal');
  doc.setFontSize(9.5);
  doc.setTextColor(secondaryColor.r, secondaryColor.g, secondaryColor.b);
  doc.text('Madiun, 15 Juli 2026', pageWidth - margin - 50, yPos);
  yPos += 5;
  doc.text('Disetujui untuk Rilis Publik,', pageWidth - margin - 50, yPos);
  yPos += 12;
  doc.setFont('helvetica', 'bold');
  doc.setTextColor(textColor.r, textColor.g, textColor.b);
  doc.text('REDANGSI DIGITAL MADIUN', pageWidth - margin - 50, yPos);

  // Save the PDF doc
  doc.save('Risalah_dan_Topologi_Portal_Berita_Madiun.pdf');
}
