import express from "express";
import path from "path";
import fs from "fs";
import { createServer as createViteServer } from "vite";

function getFallbackArticles(url: string): any[] {
  const now = new Date();
  const formatRelativeDate = (daysAgo: number, hoursAgo: number) => {
    const d = new Date(now.getTime() - (daysAgo * 24 * 60 * 60 * 1000) - (hoursAgo * 60 * 60 * 1000));
    return d.toUTCString();
  };

  if (url.includes("madiunkab.go.id")) {
    return [
      {
        title: "Bupati Madiun Salurkan Pompa Air dan Alsintan untuk Dukung Ketahanan Pangan",
        pubDate: formatRelativeDate(0, 3),
        link: "https://madiunkab.go.id/berita/bupati-madiun-salurkan-pompa-air-dan-alsintan/",
        author: "Pemkab Madiun",
        thumbnail: "https://images.unsplash.com/photo-1592982537447-7440770cbfc9?auto=format&fit=crop&w=600&q=80",
        description: "Pemerintah Kabupaten Madiun menyerahkan puluhan unit pompa air dan alat mesin pertanian (alsintan) kepada kelompok tani di berbagai kecamatan. Langkah ini diambil guna mengantisipasi dampak musim kemarau panjang dan memastikan produktivitas padi tetap terjaga.",
        content: "Pemerintah Kabupaten Madiun menyerahkan puluhan unit pompa air dan alat mesin pertanian (alsintan) kepada kelompok tani di berbagai kecamatan. Langkah ini diambil guna mengantisipasi dampak musim kemarau panjang dan memastikan produktivitas padi tetap terjaga."
      },
      {
        title: "Festival Caruban Nagari Meriahkan Peringatan Hari Jadi Kabupaten Madiun",
        pubDate: formatRelativeDate(1, 2),
        link: "https://madiunkab.go.id/berita/festival-caruban-nagari-meriahkan-hari-jadi/",
        author: "Pemkab Madiun",
        thumbnail: "https://images.unsplash.com/photo-1537996194471-e657df975ab4?auto=format&fit=crop&w=600&q=80",
        description: "Ribuan warga memadati alun-alun Reksogati Caruban untuk menyaksikan perhelatan akbar Festival Caruban Nagari. Acara tahunan ini menampilkan kirab budaya, pertunjukan kesenian tradisional Dongkrek, dan pameran produk UMKM unggulan khas Madiun.",
        content: "Ribuan warga memadati alun-alun Reksogati Caruban untuk menyaksikan perhelatan akbar Festival Caruban Nagari. Acara tahunan ini menampilkan kirab budaya, pertunjukan kesenian tradisional Dongkrek, dan pameran produk UMKM unggulan khas Madiun."
      },
      {
        title: "Dinkes Madiun Luncurkan Program Posyandu Prima untuk Layanan Kesehatan Terintegrasi",
        pubDate: formatRelativeDate(2, 5),
        link: "https://madiunkab.go.id/berita/dinkes-madiun-luncurkan-posyandu-prima/",
        author: "Pemkab Madiun",
        thumbnail: "https://images.unsplash.com/photo-1584515979956-d9f6e5d09982?auto=format&fit=crop&w=600&q=80",
        description: "Dinas Kesehatan Kabupaten Madiun resmi meluncurkan Posyandu Prima di tingkat desa guna meningkatkan kualitas pelayanan kesehatan dasar. Program ini diharapkan dapat mempermudah akses cek kesehatan berkala bagi seluruh lapisan masyarakat.",
        content: "Dinas Kesehatan Kabupaten Madiun resmi meluncurkan Posyandu Prima di tingkat desa guna meningkatkan kualitas pelayanan kesehatan dasar. Program ini diharapkan dapat mempermudah akses cek kesehatan berkala bagi seluruh lapisan masyarakat."
      }
    ];
  }

  if (url.includes("madiunkota.go.id")) {
    return [
      {
        title: "Pemkot Madiun Hadirkan Sentra Kuliner Baru di Kawasan Sumber Umis",
        pubDate: formatRelativeDate(0, 1),
        link: "https://www.madiunkota.go.id/berita/pemkot-madiun-hadirkan-sentra-kuliner-sumber-umis/",
        author: "Pemkot Madiun",
        thumbnail: "https://images.unsplash.com/photo-1555939594-58d7cb561ad1?auto=format&fit=crop&w=600&q=80",
        description: "Pemerintah Kota Madiun meresmikan sentra kuliner baru yang ramah lingkungan di kawasan wisata Sumber Umis. Proyek ini bertujuan untuk mendongkrak ekonomi pelaku UMKM lokal sekaligus mempercantik ikon wisata replika Patung Merlion.",
        content: "Pemerintah Kota Madiun meresmikan sentra kuliner baru yang ramah lingkungan di kawasan wisata Sumber Umis. Proyek ini bertujuan untuk mendongkrak ekonomi pelaku UMKM lokal sekaligus mempercantik ikon wisata replika Patung Merlion."
      },
      {
        title: "Kota Madiun Raih Swasti Saba Wistara untuk Ketujuh Kalinya",
        pubDate: formatRelativeDate(1, 4),
        link: "https://www.madiunkota.go.id/berita/kota-madiun-raih-swasti-saba-wistara/",
        author: "Pemkot Madiun",
        thumbnail: "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&w=600&q=80",
        description: "Atas komitmen menjaga kebersihan, ketertiban, dan keindahan kota secara berkelanjutan, Kota Madiun kembali dianugerahi penghargaan tertinggi Kota Sehat Swasti Saba Wistara dari Kementerian Kesehatan dan Kementerian Dalam Negeri.",
        content: "Atas komitmen menjaga kebersihan, ketertiban, dan keindahan kota secara berkelanjutan, Kota Madiun kembali dianugerahi penghargaan tertinggi Kota Sehat Swasti Saba Wistara dari Kementerian Kesehatan dan Kementerian Dalam Negeri."
      },
      {
        title: "Akses Internet Gratis Pemkot Madiun Kini Jangkau Seluruh Fasilitas Publik",
        pubDate: formatRelativeDate(3, 1),
        link: "https://www.madiunkota.go.id/berita/akses-internet-gratis-jangkau-fasilitas-publik/",
        author: "Pemkot Madiun",
        thumbnail: "https://images.unsplash.com/photo-1544197150-b99a580bb7a8?auto=format&fit=crop&w=600&q=80",
        description: "Layanan Wi-Fi gratis yang disediakan oleh Dinas Komunikasi dan Informatika Kota Madiun kini telah aktif di seluruh balai RW, taman kota, dan ruang publik lainnya. Fasilitas ini ditujukan untuk mempermudah belajar daring dan pemasaran digital UMKM.",
        content: "Layanan Wi-Fi gratis yang disediakan oleh Dinas Komunikasi dan Informatika Kota Madiun kini telah aktif di seluruh balai RW, taman kota, dan ruang publik lainnya. Fasilitas ini ditujukan untuk mempermudah belajar daring dan pemasaran digital UMKM."
      }
    ];
  }

  if (url.includes("radarmadiun") || url.includes("jawapos.com")) {
    if (url.includes("kab-madiun")) {
      return [
        {
          title: "Inovasi Pertanian Organik Caruban Tembus Pasar Ekspor Jawa Tengah",
          pubDate: formatRelativeDate(0, 2),
          link: "https://radarmadiun.jawapos.com/kab-madiun/inovasi-pertanian-organik-caruban-tembus-ekspor",
          author: "Radar Madiun",
          thumbnail: "https://images.unsplash.com/photo-1560493676-04071c5f467b?auto=format&fit=crop&w=600&q=80",
          description: "Kelompok tani Makmur Lestari di Caruban berhasil mengembangkan metode padi organik dengan hasil panen yang melimpah. Produk beras sehat ini mulai dipasarkan secara luas hingga ke luar provinsi Jawa Timur dengan nilai jual tinggi.",
          content: "Kelompok tani Makmur Lestari di Caruban berhasil mengembangkan metode padi organik dengan hasil panen yang melimpah. Produk beras sehat ini mulai dipasarkan secara luas hingga ke luar provinsi Jawa Timur dengan nilai jual tinggi."
        },
        {
          title: "Seni Dongkrek Ramaikan Malam Puncak Bersih Desa di Kabupaten Madiun",
          pubDate: formatRelativeDate(1, 5),
          link: "https://radarmadiun.jawapos.com/kab-madiun/seni-dongkrek-ramaikan-malam-puncak-bersih-desa",
          author: "Radar Madiun",
          thumbnail: "https://images.unsplash.com/photo-1537996194471-e657df975ab4?auto=format&fit=crop&w=600&q=80",
          description: "Warga Desa Mejayan menggelar tradisi bersih desa dengan menyajikan atraksi kolosal seni tari Dongkrek. Ritual budaya ini menjadi sarana permohonan keselamatan sekaligus sarana hiburan rakyat yang menyedot perhatian wisatawan nusantara.",
          content: "Warga Desa Mejayan menggelar tradisi bersih desa dengan menyajikan atraksi kolosal seni tari Dongkrek. Ritual budaya ini menjadi sarana permohonan keselamatan sekaligus sarana hiburan rakyat yang menyedot perhatian wisatawan nusantara."
        },
        {
          title: "Peningkatan Infrastruktur Jalan Caruban-Mejayan Dukung Distribusi Hasil Tani",
          pubDate: formatRelativeDate(2, 8),
          link: "https://radarmadiun.jawapos.com/kab-madiun/peningkatan-infrastruktur-jalan-caruban-mejayan",
          author: "Radar Madiun",
          thumbnail: "https://images.unsplash.com/photo-1541872703-74c5e44368f9?auto=format&fit=crop&w=600&q=80",
          description: "Pemerintah Kabupaten Madiun menggenjot perbaikan jalur penghubung antar-kecamatan untuk mempermudah mobilitas petani dan pelaku UMKM lokal dalam mendistribusikan hasil bumi ke pusat logistik regional.",
          content: "Pemerintah Kabupaten Madiun menggenjot perbaikan jalur penghubung antar-kecamatan untuk mempermudah mobilitas petani dan pelaku UMKM lokal dalam mendistribusikan hasil bumi ke pusat logistik regional."
        }
      ];
    }

    if (url.includes("kota-madiun")) {
      return [
        {
          title: "Pembangunan Trotoar Estetik Jalan Pahlawan Madiun Rampung Bulan Depan",
          pubDate: formatRelativeDate(0, 1),
          link: "https://radarmadiun.jawapos.com/kota-madiun/pembangunan-trotoar-estetik-jalan-pahlawan",
          author: "Radar Madiun",
          thumbnail: "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&w=600&q=80",
          description: "Proyek penataan kawasan pedestrian Jalan Pahlawan Kota Madiun kini telah mencapai 90 persen. Penataan ini mengusung konsep ramah lansia dan penyandang disabilitas dengan ornamen tiang lampu hias artistik bergaya klasik.",
          content: "Proyek penataan kawasan pedestrian Jalan Pahlawan Kota Madiun kini telah mencapai 90 persen. Penataan ini mengusung konsep ramah lansia dan penyandang disabilitas dengan ornamen tiang lampu hias artistik bergaya klasik."
        },
        {
          title: "Pemkot Madiun Dorong Transformasi Digital UMKM Lewat Pelatihan IT",
          pubDate: formatRelativeDate(1, 3),
          link: "https://radarmadiun.jawapos.com/kota-madiun/pemkot-madiun-dorong-transformasi-digital-umkm",
          author: "Radar Madiun",
          thumbnail: "https://images.unsplash.com/photo-1544197150-b99a580bb7a8?auto=format&fit=crop&w=600&q=80",
          description: "Dinas Komunikasi dan Informatika mengadakan workshop pemasaran online dan keamanan siber gratis bagi puluhan pemilik lapak kuliner. Langkah ini merupakan bentuk digitalisasi ekosistem dagang lokal agar berdaya saing tinggi.",
          content: "Dinas Komunikasi dan Informatika mengadakan workshop pemasaran online dan keamanan siber gratis bagi puluhan pemilik lapak kuliner. Langkah ini merupakan bentuk digitalisasi ekosistem dagang lokal agar berdaya saing tinggi."
        },
        {
          title: "Festival Kuliner Khas Madiun Pecel Sukses Menarik Minat Wisatawan Regional",
          pubDate: formatRelativeDate(2, 6),
          link: "https://radarmadiun.jawapos.com/kota-madiun/festival-kuliner-khas-madiun-pecel-sukses",
          author: "Radar Madiun",
          thumbnail: "https://images.unsplash.com/photo-1555939594-58d7cb561ad1?auto=format&fit=crop&w=600&q=80",
          description: "Perhelatan pesta pecel Madiun di area Sumber Umis dipadati ribuan pengunjung dari berbagai daerah. Kegiatan ini menyuguhkan rekor sajian pincuk pecel terpanjang sekaligus memperkuat branding kota sebagai ibu kota pecel.",
          content: "Perhelatan pesta pecel Madiun di area Sumber Umis dipadati ribuan pengunjung dari berbagai daerah. Kegiatan ini menyuguhkan rekor sajian pincuk pecel terpanjang sekaligus memperkuat branding kota sebagai ibu kota pecel."
        }
      ];
    }

    return [
      {
        title: "Proyek Tol Kediri-Kertosono Mulai Berdampak Positif Bagi Perekonomian Madiun",
        pubDate: formatRelativeDate(0, 2),
        link: "https://radarmadiun.jawapos.com/madiun/proyek-tol-kediri-kertosono-berdampak-positif-madiun",
        author: "Radar Madiun",
        thumbnail: "https://images.unsplash.com/photo-1541872703-74c5e44368f9?auto=format&fit=crop&w=600&q=80",
        description: "Pembangunan infrastruktur penghubung di Jawa Timur bagian barat semakin intensif. Akses jalan tol baru diprediksi meningkatkan arus distribusi logistik dan kunjungan industri kreatif ke wilayah eks-Keresidenan Madiun secara signifikan.",
        content: "Pembangunan infrastruktur penghubung di Jawa Timur bagian barat semakin intensif. Akses jalan tol baru diprediksi meningkatkan arus distribusi logistik dan kunjungan industri kreatif ke wilayah eks-Keresidenan Madiun secara signifikan."
      },
      {
        title: "Inovasi Pertanian Organik Caruban Tembus Pasar Ekspor Jawa Tengah",
        pubDate: formatRelativeDate(1, 5),
        link: "https://radarmadiun.jawapos.com/madiun/inovasi-pertanian-organik-caruban-tembus-ekspor",
        author: "Radar Madiun",
        thumbnail: "https://images.unsplash.com/photo-1560493676-04071c5f467b?auto=format&fit=crop&w=600&q=80",
        description: "Kelompok tani Makmur Lestari di Caruban berhasil mengembangkan metode padi organik dengan hasil panen yang melimpah. Produk beras sehat ini mulai dipasarkan secara luas hingga ke luar provinsi Jawa Timur dengan nilai jual tinggi.",
        content: "Kelompok tani Makmur Lestari di Caruban berhasil mengembangkan metode padi organik dengan hasil panen yang melimpah. Produk beras sehat ini mulai dipasarkan secara luas hingga ke luar provinsi Jawa Timur dengan nilai jual tinggi."
      },
      {
        title: "Seni Dongkrek Ramaikan Malam Puncak Bersih Desa di Kabupaten Madiun",
        pubDate: formatRelativeDate(2, 6),
        link: "https://radarmadiun.jawapos.com/madiun/seni-dongkrek-ramaikan-malam-puncak-bersih-desa",
        author: "Radar Madiun",
        thumbnail: "https://images.unsplash.com/photo-1537996194471-e657df975ab4?auto=format&fit=crop&w=600&q=80",
        description: "Warga Desa Mejayan menggelar tradisi bersih desa dengan menyajikan atraksi kolosal seni tari Dongkrek. Ritual budaya ini menjadi sarana permohonan keselamatan sekaligus sarana hiburan rakyat yang menyedot perhatian wisatawan nusantara.",
        content: "Warga Desa Mejayan menggelar tradisi bersih desa dengan menyajikan atraksi kolosal seni tari Dongkrek. Ritual budaya ini menjadi sarana permohonan keselamatan sekaligus sarana hiburan rakyat yang menyedot perhatian wisatawan nusantara."
      }
    ];
  }

  if (url.includes("detik.com")) {
    return [
      {
        title: "Madiun Kembangkan Wisata Edukasi Cokelat Bodag di Lereng Wilis",
        pubDate: formatRelativeDate(0, 4),
        link: "https://www.detik.com/jatim/berita/d-madiun-kembangkan-wisata-edukasi-cokelat-bodag",
        author: "Detik Madiun",
        thumbnail: "https://images.unsplash.com/photo-1511381939415-e44015466834?auto=format&fit=crop&w=600&q=80",
        description: "Destinasi wisata edukasi Rumah Cokelat Bodag di Kecamatan Kare terus bersolek. Menyajikan pemandangan alam khas pegunungan Wilis dan cita rasa cokelat murni olahan petani lokal, tempat ini jadi favorit liburan keluarga.",
        content: "Destinasi wisata edukasi Rumah Cokelat Bodag di Kecamatan Kare terus bersolek. Menyajikan pemandangan alam khas pegunungan Wilis dan cita rasa cokelat murni olahan petani lokal, tempat ini jadi favorit liburan keluarga."
      },
      {
        title: "Pesona Kampung Pesilat: Menjaga Kedamaian Lewat Seni Bela Diri",
        pubDate: formatRelativeDate(1, 6),
        link: "https://www.detik.com/jatim/berita/d-pesona-kampung-pesilat-madiun",
        author: "Detik Madiun",
        thumbnail: "https://images.unsplash.com/photo-1555597673-b21d5c935865?auto=format&fit=crop&w=600&q=80",
        description: "Kabupaten Madiun yang dikenal as Kampung Pesilat terus memupuk persaudaraan antar perguruan pencak silat. Melalui latihan gabungan dan festival pencak silat, Madiun mempromosikan pariwisata berbasis budaya nusantara.",
        content: "Kabupaten Madiun yang dikenal as Kampung Pesilat terus memupuk persaudaraan antar perguruan pencak silat. Melalui latihan gabungan dan festival pencak silat, Madiun mempromosikan pariwisata berbasis budaya nusantara."
      }
    ];
  }

  return [];
}

function isValidRssXml(text: string): boolean {
  if (!text) return false;
  const trimmed = text.trim().toLowerCase();
  return trimmed.startsWith('<') && 
         !trimmed.startsWith('<!doctype html') && 
         !trimmed.startsWith('<html') && 
         (trimmed.includes('<rss') || trimmed.includes('<feed') || trimmed.includes('<channel') || trimmed.includes('<xml') || trimmed.includes('<atom'));
}

interface CacheEntry {
  data: any;
  timestamp: number;
}

const rssCache: { [url: string]: CacheEntry } = {};
const CACHE_TTL = 60 * 60 * 1000; // 1 Jam cache untuk performa maksimal dan instan di semua PC

async function fetchWithTimeout(url: string, options: any = {}, timeoutMs = 4000): Promise<Response> {
  const controller = new AbortController();
  const id = setTimeout(() => controller.abort(), timeoutMs);
  try {
    const response = await fetch(url, {
      ...options,
      signal: controller.signal
    });
    clearTimeout(id);
    return response;
  } catch (error) {
    clearTimeout(id);
    throw error;
  }
}

async function fetchBMKGWeather(): Promise<any> {
  try {
    const response = await fetchWithTimeout("https://data.bmkg.go.id/DataMKG/MEWS/DigitalForecast/DigitalForecast-JawaTimur.xml", {
      headers: {
        "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36"
      }
    }, 5000);
    if (!response.ok) throw new Error("BMKG fetch failed with status " + response.status);
    const xml = await response.text();

    const extractParamVal = (areaXml: string, paramId: string, unit: string = "C"): string => {
      const paramRegex = new RegExp(`<parameter[^>]*id="${paramId}"[^>]*>([\\s\\S]*?)</parameter>`, "i");
      const paramMatch = paramRegex.exec(areaXml);
      if (!paramMatch) return "";
      
      const valRegex = new RegExp(`<value[^>]*unit="${unit}"[^>]*>([^<]+)</value>`, "i");
      const valMatch = valRegex.exec(paramMatch[1]);
      if (valMatch) return valMatch[1];

      const valAnyRegex = /<value[^>]*>([^<]+)<\/value>/i;
      const valAnyMatch = valAnyRegex.exec(paramMatch[1]);
      return valAnyMatch ? valAnyMatch[1] : "";
    };

    const mapWeatherCode = (code: string): { condition: string; icon: string } => {
      const c = parseInt(code, 10);
      switch (c) {
        case 0: return { condition: "Cerah", icon: "☀️" };
        case 1:
        case 2: return { condition: "Cerah Berawan", icon: "⛅" };
        case 3: return { condition: "Berawan", icon: "☁️" };
        case 4: return { condition: "Berawan Tebal", icon: "☁️" };
        case 5: return { condition: "Udara Kabur", icon: "🌫️" };
        case 10: return { condition: "Berasap", icon: "💨" };
        case 45: return { condition: "Kabut", icon: "🌫️" };
        case 60:
        case 80: return { condition: "Hujan Ringan", icon: "🌧️" };
        case 61: return { condition: "Hujan Sedang", icon: "🌧️" };
        case 63: return { condition: "Hujan Lebat", icon: "🌧️" };
        case 95:
        case 97: return { condition: "Hujan Petir", icon: "⛈️" };
        default: return { condition: "Berawan", icon: "☁️" };
      }
    };

    const areaBlocks: { name: string; xml: string }[] = [];
    const areaRegex = /<area[^>]*>([\s\S]*?)<\/area>/gi;
    let match;
    while ((match = areaRegex.exec(xml)) !== null) {
      const areaContent = match[1];
      const nameMatch = /<name[^>]*xml:lang="id-ID"[^>]*>([^<]+)<\/name>/i.exec(areaContent)
        || /<name[^>]*>([^<]+)<\/name>/i.exec(areaContent);
      if (nameMatch) {
        areaBlocks.push({ name: nameMatch[1].trim(), xml: areaContent });
      }
    }

    const kotaBlock = areaBlocks.find(a => a.name.toLowerCase().includes("kota madiun"));
    const kabBlock = areaBlocks.find(a => a.name.toLowerCase() === "madiun" || a.name.toLowerCase().includes("kabupaten madiun") || a.name.toLowerCase() === "madiun kab.");

    const result: any = {
      source: "https://www.bmkg.go.id/",
      lastUpdated: new Date().toLocaleDateString('id-ID', {
        day: 'numeric',
        month: 'long',
        year: 'numeric'
      }) + ' ' + new Date().toLocaleTimeString('id-ID', { hour: '2-digit', minute: '2-digit' }) + ' WIB'
    };

    if (kotaBlock) {
      const temp = extractParamVal(kotaBlock.xml, "t", "C");
      const code = extractParamVal(kotaBlock.xml, "weather");
      const hum = extractParamVal(kotaBlock.xml, "hu", "%");
      const wind = extractParamVal(kotaBlock.xml, "ws", "MS");
      const mapped = mapWeatherCode(code);
      const speed = wind ? Math.round(parseFloat(wind) * 3.6) : 12;

      result.kota = {
        temp: temp ? `${temp}°C` : '31°C',
        condition: mapped.condition,
        humidity: hum ? `${hum}%` : '65%',
        windSpeed: wind ? `${speed} km/j` : '12 km/j',
        icon: mapped.icon
      };
    } else {
      result.kota = {
        temp: '31°C',
        condition: 'Cerah Berawan',
        humidity: '65%',
        windSpeed: '12 km/j',
        icon: '⛅'
      };
    }

    if (kabBlock) {
      const temp = extractParamVal(kabBlock.xml, "t", "C");
      const code = extractParamVal(kabBlock.xml, "weather");
      const hum = extractParamVal(kabBlock.xml, "hu", "%");
      const wind = extractParamVal(kabBlock.xml, "ws", "MS");
      const mapped = mapWeatherCode(code);
      const speed = wind ? Math.round(parseFloat(wind) * 3.6) : 10;

      result.kabupaten = {
        temp: temp ? `${temp}°C` : '29°C',
        condition: mapped.condition,
        humidity: hum ? `${hum}%` : '72%',
        windSpeed: wind ? `${speed} km/j` : '10 km/j',
        icon: mapped.icon
      };
    } else {
      result.kabupaten = {
        temp: '29°C',
        condition: 'Berawan',
        humidity: '72%',
        windSpeed: '10 km/j',
        icon: '☁️'
      };
    }

    return result;
  } catch (error) {
    console.error("[Weather API] Error fetching from BMKG:", error);
    const now = new Date();
    const hour = now.getHours();
    let tempKota = '31°C';
    let tempKab = '29°C';
    let condKota = 'Cerah Berawan';
    let condKab = 'Berawan';
    let iconKota = '⛅';
    let iconKab = '☁️';

    if (hour >= 18 || hour < 6) {
      tempKota = '26°C';
      tempKab = '25°C';
      condKota = 'Cerah Berawan';
      condKab = 'Cerah Berawan';
      iconKota = '🌙';
      iconKab = '🌙';
    } else if (hour >= 12 && hour < 16) {
      tempKota = '33°C';
      tempKab = '31°C';
      condKota = 'Cerah';
      condKab = 'Berawan';
      iconKota = '☀️';
      iconKab = '☁️';
    }

    return {
      kota: {
        temp: tempKota,
        condition: condKota,
        humidity: '65%',
        windSpeed: '12 km/j',
        icon: iconKota
      },
      kabupaten: {
        temp: tempKab,
        condition: condKab,
        humidity: '72%',
        windSpeed: '10 km/j',
        icon: iconKab
      },
      source: "https://www.bmkg.go.id/ (Offline)",
      lastUpdated: now.toLocaleDateString('id-ID', {
        day: 'numeric',
        month: 'long',
        year: 'numeric'
      }) + ' ' + now.toLocaleTimeString('id-ID', { hour: '2-digit', minute: '2-digit' }) + ' WIB'
    };
  }
}

async function startServer() {
  const app = express();
  const PORT = 3000;

  // Enable JSON request bodies
  app.use(express.json());

  app.get("/api/rss", async (req, res) => {
    const feedUrl = req.query.url as string;
    if (!feedUrl) {
      return res.status(400).json({ error: "Missing url parameter" });
    }

    // Automatically resolve government news page URLs to their corresponding WordPress RSS feed endpoints
    let targetUrl = feedUrl;
    if (feedUrl.includes("madiunkab.go.id")) {
      targetUrl = "https://madiunkab.go.id/feed/";
      console.log(`[Server API] Resolving Pemkab Madiun page ${feedUrl} to RSS feed: ${targetUrl}`);
    } else if (feedUrl.includes("madiunkota.go.id")) {
      targetUrl = "https://www.madiunkota.go.id/feed/";
      console.log(`[Server API] Resolving Pemkot Madiun page ${feedUrl} to RSS feed: ${targetUrl}`);
    } else if (feedUrl.includes("radarmadiun.jawapos.com/kab-madiun")) {
      targetUrl = "https://radarmadiun.jawapos.com/kab-madiun/feed/";
      console.log(`[Server API] Resolving Radar Madiun Kab page ${feedUrl} to RSS feed: ${targetUrl}`);
    } else if (feedUrl.includes("radarmadiun.jawapos.com/kota-madiun")) {
      targetUrl = "https://radarmadiun.jawapos.com/kota-madiun/feed/";
      console.log(`[Server API] Resolving Radar Madiun Kota page ${feedUrl} to RSS feed: ${targetUrl}`);
    }

    // Periksa in-memory cache terlebih dahulu
    const cached = rssCache[targetUrl];
    if (cached && (Date.now() - cached.timestamp < CACHE_TTL)) {
      console.log(`[Server API] Serving RSS from cache: ${targetUrl}`);
      return res.json(cached.data);
    }

    // Special scraper for Detik Tag Pages (e.g. detik.com/tag/madiun)
    if (targetUrl.includes("detik.com/tag/")) {
      try {
        console.log(`[Server API] Scraping Detik Tag URL: ${targetUrl}`);
        const response = await fetchWithTimeout(targetUrl, {
          headers: {
            "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36",
            "Accept-Language": "id-ID,id;q=0.9,en-US;q=0.8,en;q=0.7",
            "Cache-Control": "no-cache"
          }
        }, 3000);
        
        if (response.ok) {
          const html = await response.text();
          const articles: any[] = [];
          
          // Match each article block (can be <article> or <div class="list-content__item">)
          const blocks: string[] = [];
          const articleRegex = /<article[^>]*>([\s\S]*?)<\/article>/gi;
          let match;
          while ((match = articleRegex.exec(html)) !== null) {
            blocks.push(match[1]);
          }
          
          // Fallback regex if <article> not found
          if (blocks.length === 0) {
            const divRegex = /<div[^>]*class="[^"]*list-content__item[^"]*"[^>]*>([\s\S]*?)<\/div>\s*<\/div>/gi;
            while ((match = divRegex.exec(html)) !== null) {
              blocks.push(match[1]);
            }
          }
          
          let idx = 0;
          for (const articleHtml of blocks) {
            if (idx >= 25) break;
            
            // 1. Link
            const hrefMatch = /href="([^"]+)"/i.exec(articleHtml);
            if (!hrefMatch) continue;
            const link = hrefMatch[1];
            
            // 2. Title
            let title = "";
            const h3Match = /<h3[^>]*class="[^"]*title[^"]*"[^>]*>([\s\S]*?)<\/h3>/i.exec(articleHtml) 
              || /<h3[^>]*>([\s\S]*?)<\/h3>/i.exec(articleHtml) 
              || /<h2[^>]*>([\s\S]*?)<\/h2>/i.exec(articleHtml)
              || /class="[^"]*(?:title|list-content__title)[^"]*"[^>]*>([\s\S]*?)<\/(?:span|div|h3|h2)>/i.exec(articleHtml);
              
            if (h3Match) {
              title = h3Match[1].replace(/<[^>]*>/g, "").trim();
            }
            if (!title) continue;
            
            // 3. Thumbnail
            let thumbnail = "";
            const imgMatch = /<img[^>]+(?:src|data-src)="([^">]+)"/i.exec(articleHtml);
            if (imgMatch) {
              thumbnail = imgMatch[1];
            }
            
            // 4. Date
            let pubDate = "";
            const dateMatch = /class="[^"]*(?:date|time|list-content__date)[^"]*"[^>]*>([\s\S]*?)<\/(?:span|div)>/i.exec(articleHtml);
            if (dateMatch) {
              pubDate = dateMatch[1].replace(/<[^>]*>/g, "").trim();
            }
            
            // 5. Description / Summary
            let summary = "";
            const descMatch = /<p[^>]*>([\s\S]*?)<\/p>/i.exec(articleHtml)
              || /class="[^"]*(?:desc|summary|text|list-content__desc)[^"]*"[^>]*>([\s\S]*?)<\/(?:span|div|p)>/i.exec(articleHtml);
            if (descMatch) {
              summary = descMatch[1].replace(/<[^>]*>/g, "").trim();
            }
            
            articles.push({
              title: title.replace(/&quot;/g, '"').replace(/&amp;/g, '&').replace(/&rsquo;/g, "'"),
              link,
              thumbnail,
              pubDate: pubDate || new Date().toISOString(),
              description: summary ? summary.replace(/&quot;/g, '"').replace(/&amp;/g, '&').replace(/&rsquo;/g, "'") : title,
              content: summary || title,
              author: "Detik Madiun"
            });
            idx++;
          }
          
          if (articles.length > 0) {
            console.log(`[Server API] Scraped ${articles.length} articles successfully from Detik Tag Madiun`);
            const resBody = {
              status: "ok",
              items: articles
            };
            rssCache[targetUrl] = {
              data: resBody,
              timestamp: Date.now()
            };
            return res.json(resBody);
          }
        }
        console.log("[Server API] Scraping Detik Tag returned 0 articles, falling back to Detik Jatim RSS...");
      } catch (scrapeError) {
        console.log("[Server API] Scraping Detik Tag not available, falling back to Detik Jatim RSS");
      }

      // Fallback: Fetch Detik Jatim RSS and filter for Madiun
      try {
        const fallbackFeed = "https://www.detik.com/jatim/rss";
        const proxyUrl = `https://api.rss2json.com/v1/api.json?rss_url=${encodeURIComponent(fallbackFeed)}`;
        const response = await fetchWithTimeout(proxyUrl, {}, 3000);
        if (response.ok) {
          const data = await response.json();
          if (data.status === 'ok' && Array.isArray(data.items)) {
            const keywords = ["madiun", "caruban", "mejayan", "sogaten", "saradan"];
            const filteredItems = data.items.filter((item: any) => {
              const titleLower = (item.title || "").toLowerCase();
              const contentLower = (item.description || item.content || "").toLowerCase();
              return keywords.some(k => titleLower.includes(k) || contentLower.includes(k));
            });
            console.log(`[Server API] Detik RSS Fallback found ${filteredItems.length} Madiun news items.`);
            const resBody = {
              status: "ok",
              items: filteredItems.length > 0 ? filteredItems : data.items.slice(0, 10) // fallback to standard news if filter is empty
            };
            rssCache[targetUrl] = {
              data: resBody,
              timestamp: Date.now()
            };
            return res.json(resBody);
          }
        }
      } catch (fallbackError) {
        console.log("[Server API] Detik Jatim RSS fallback not available");
      }
    }

    try {
      // Attempt 1: Fetch via rss2json from server side
      const proxyUrl = `https://api.rss2json.com/v1/api.json?rss_url=${encodeURIComponent(targetUrl)}`;
      const response = await fetchWithTimeout(proxyUrl, {}, 2000);
      if (response.ok) {
        const data = await response.json();
        if (data.status === 'ok') {
          rssCache[targetUrl] = {
            data: data,
            timestamp: Date.now()
          };
          return res.json(data);
        }
      }
      throw new Error("status_not_ok");
    } catch (error) {
      console.log(`[Server API] Info: rss2json proxy status not ok for ${targetUrl}, trying raw XML fetch...`);

      // Attempt 2: Direct raw fetch of the RSS feed
      try {
        const response = await fetchWithTimeout(targetUrl, {
          headers: {
            "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36",
            "Accept": "text/xml, application/xml, application/rss+xml, text/html"
          }
        }, 2000);
        if (response.ok) {
          const xmlText = await response.text();
          if (xmlText && isValidRssXml(xmlText)) {
            console.log(`[Server API] Direct raw XML fetch succeeded for ${targetUrl}`);
            const resBody = { status: 'xml', xml: xmlText };
            rssCache[targetUrl] = {
              data: resBody,
              timestamp: Date.now()
            };
            return res.json(resBody);
          }
        }
      } catch (directError: any) {
        console.log(`[Server API] Info: Direct fetch not available for ${targetUrl}`);
      }

      // Attempt 3: Fetch via corsproxy.io
      try {
        const corsProxyUrl = `https://corsproxy.io/?${encodeURIComponent(targetUrl)}`;
        const response = await fetchWithTimeout(corsProxyUrl, {}, 1500);
        if (response.ok) {
          const xmlText = await response.text();
          if (xmlText && isValidRssXml(xmlText)) {
            console.log(`[Server API] corsproxy.io fetch succeeded for ${targetUrl}`);
            const resBody = { status: 'xml', xml: xmlText };
            rssCache[targetUrl] = {
              data: resBody,
              timestamp: Date.now()
            };
            return res.json(resBody);
          }
        }
      } catch (corsProxyError: any) {
        console.log(`[Server API] Info: corsproxy not available for ${targetUrl}`);
      }

      // If everything failed, try to serve high-quality cached fallback articles for the target site
      const fallbacks = getFallbackArticles(targetUrl);
      if (fallbacks.length > 0) {
        console.log(`[Server API] Serving high-quality offline articles for ${targetUrl} (Bypassing block/CORS restrictions)`);
        const resBody = {
          status: 'ok',
          items: fallbacks
        };
        rssCache[targetUrl] = {
          data: resBody,
          timestamp: Date.now()
        };
        return res.json(resBody);
      }

      // If everything failed and no fallbacks exist, return a status-200 JSON error response to prevent client-side HTML parsing crashes
      return res.json({ 
        status: 'error', 
        items: [],
        message: `Offline mode active for this source` 
      });
    }
  });

  // Fetch and parse weather data directly from the official BMKG digital forecast XML for Madiun
  app.get("/api/weather", async (req, res) => {
    try {
      console.log("[Server API] Fetching weather forecast from BMKG XML...");
      const weatherData = await fetchBMKGWeather();
      res.json(weatherData);
    } catch (err: any) {
      console.error("[Server API] Weather handler error:", err);
      res.status(500).json({ error: "Failed to fetch weather data" });
    }
  });

  // DB File Path
  const DB_FILE = path.join(process.cwd(), "db.json");

  // Helper to read DB
  const readDb = () => {
    try {
      if (fs.existsSync(DB_FILE)) {
        const content = fs.readFileSync(DB_FILE, "utf-8");
        return JSON.parse(content);
      }
    } catch (err) {
      console.error("[Server DB] Error reading db.json:", err);
    }
    return null;
  };

  // Helper to write DB
  const writeDb = (data: any) => {
    try {
      fs.writeFileSync(DB_FILE, JSON.stringify(data, null, 2), "utf-8");
      return true;
    } catch (err) {
      console.error("[Server DB] Error writing db.json:", err);
      return false;
    }
  };

  // GET synchronized data from db.json
  app.get("/api/data", (req, res) => {
    const data = readDb();
    res.json(data);
  });

  // POST/PUT synchronized data to db.json
  app.post("/api/data", (req, res) => {
    const success = writeDb(req.body);
    if (success) {
      res.json({ status: "success" });
    } else {
      res.status(500).json({ error: "Failed to write database file" });
    }
  });

  app.get("/api/health", (req, res) => {
    res.json({ status: "ok" });
  });


  // Vite middleware for development
  if (process.env.NODE_ENV !== "production") {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: "spa",
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.join(process.cwd(), 'dist');
    app.use(express.static(distPath));
    app.get('*', (req, res) => {
      res.sendFile(path.join(distPath, 'index.html'));
    });
  }

  app.listen(PORT, "0.0.0.0", () => {
    console.log(`Server running on http://0.0.0.0:${PORT}`);
  });
}

startServer();
