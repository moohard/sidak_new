import type { AxiosRequestConfig, AxiosResponse } from "axios";
import { REFERENCE_CONFIG } from "./referenceConfig";

export const isMockApi = process.env.NEXT_PUBLIC_MOCK_API === "true";

export const mockUser = {
  id: "u-1",
  name: "Demo Admin",
  username: "demo",
  group: "SUPERADMIN",
  nip: "198001012005011001",
  permissions: ["*"],
};

const mockNewsCategories = [
  { id: 1, name: "Pengumuman" },
  { id: 2, name: "Kegiatan" },
  { id: 3, name: "Informasi" },
];

const mockNews = [
  {
    id: 1,
    title: "Pengumuman Libur Nasional",
    slug: "pengumuman-libur-nasional",
    category_id: 1,
    category_name: "Pengumuman",
    published_at: "2026-01-02",
    status: "published",
    cover_url: "/assets/images/dashboard/default-news.png",
    content: "<p>Libur nasional berlaku untuk seluruh pegawai.</p>",
    tags: [{ title: "libur" }, { title: "pengumuman" }],
  },
  {
    id: 2,
    title: "Sosialisasi Sistem Kepegawaian",
    slug: "sosialisasi-sistem-kepegawaian",
    category_id: 2,
    category_name: "Kegiatan",
    published_at: "2026-01-05",
    status: "published",
    cover_url: "/assets/images/dashboard/default-news.png",
    content: "<p>Kegiatan sosialisasi diadakan di aula utama.</p>",
    tags: [{ title: "sistem" }, { title: "kegiatan" }],
  },
  {
    id: 3,
    title: "Update Data Pegawai",
    slug: "update-data-pegawai",
    category_id: 3,
    category_name: "Informasi",
    published_at: null,
    status: "draft",
    cover_url: "/assets/images/dashboard/default-news.png",
    content: "<p>Mohon lengkapi data pegawai Anda.</p>",
    tags: [{ title: "data" }],
  },
];

const mockSlides = [
  {
    id: 1,
    title: "Selamat Datang di SIDAK",
    link: "/portal",
    order: 1,
    start_date: "2026-01-01",
    end_date: "2026-12-31",
    image_url: "/assets/images/slider/1.jpg",
  },
  {
    id: 2,
    title: "Layanan Kepegawaian Terpadu",
    link: "/portal",
    order: 2,
    start_date: "2026-01-01",
    end_date: "2026-12-31",
    image_url: "/assets/images/slider/2.jpg",
  },
];

const mockReferensiMap: Record<string, any[]> = {
  agama: [
    { id: 1, agama: "Islam" },
    { id: 2, agama: "Kristen" },
    { id: 3, agama: "Hindu" },
  ],
  unit: [
    { id: 1, unit_kerja: "BKD" },
    { id: 2, unit_kerja: "Biro Umum" },
    { id: 3, unit_kerja: "Dinas Pendidikan" },
  ],
  ref_bank: [
    { id: 1, bank_name: "Bank Kaltim", bank_code: "124" },
    { id: 2, bank_name: "BRI", bank_code: "002" },
  ],
  ref_eselon: [
    { id: 1, eselon_name: "Eselon II" },
    { id: 2, eselon_name: "Eselon III" },
  ],
  ref_diklat: [
    { id: 1, diklat_name: "Pelatihan Kepemimpinan" },
    { id: 2, diklat_name: "Manajemen SDM" },
  ],
  ref_golongan: [
    { id: 1, golongan: "III/a", pangkat: "Penata Muda" },
    { id: 2, golongan: "III/b", pangkat: "Penata Muda Tk.I" },
  ],
  ref_kawin: [
    { id: 1, status_kawin: "Kawin" },
    { id: 2, status_kawin: "Belum Kawin" },
  ],
  ref_pendidikan: [
    { id: 1, tingkat_pendidikan: "S1" },
    { id: 2, tingkat_pendidikan: "S2" },
  ],
  ref_status_keluarga: [
    { id: 1, status_keluarga: "Kepala Keluarga" },
    { id: 2, status_keluarga: "Pasangan" },
  ],
  ref_pegawai_jenis: [
    { id: 1, jenis_pegawai: "PNS" },
    { id: 2, jenis_pegawai: "PPPK" },
  ],
  ref_pekerjaan: [
    { id: 1, pekerjaan_name: "Guru" },
    { id: 2, pekerjaan_name: "Analis" },
  ],
};

const mockPegawaiList = [
  {
    id: 1,
    nip: "197902012005011001",
    nama: "Budi Santoso",
    unit_kerja: "BKD",
    golongan: "III/a",
    jabatan: "Analis SDM",
    jenis_pegawai: "PNS",
    status_pegawai: "Aktif",
    foto: "/assets/images/user/user.png",
  },
  {
    id: 2,
    nip: "198406122009022001",
    nama: "Sari Wulandari",
    unit_kerja: "Dinas Pendidikan",
    golongan: "III/b",
    jabatan: "Staf Keuangan",
    jenis_pegawai: "PNS",
    status_pegawai: "Aktif",
    foto: "/assets/images/user/user.png",
  },
  {
    id: 3,
    nip: "198912212012031002",
    nama: "Ahmad Prasetyo",
    unit_kerja: "Biro Umum",
    golongan: "II/c",
    jabatan: "Arsiparis",
    jenis_pegawai: "PPPK",
    status_pegawai: "Aktif",
    foto: "/assets/images/user/user.png",
  },
];

const mockPegawaiDetail = {
  ...mockPegawaiList[0],
  tempat_lahir: "Samarinda",
  tgl_lahir: "1979-02-01",
  jenis_kelamin: "Laki-laki",
  agama: "Islam",
  status_kawin: "Kawin",
  pangkat: "Penata Muda",
  tmt_pegawai: "2005-01-01",
  email: "budi.santoso@example.com",
  hp: "081234567890",
  alamat: "Jl. Merdeka No. 10",
};

const mockKeluarga = [
  {
    nama: "Siti Santoso",
    hubungan_keluarga: "Istri",
    tempat_lahir: "Balikpapan",
    tgl_lahir: "1983-05-12",
    pekerjaan: "Ibu Rumah Tangga",
  },
  {
    nama: "Rizky Santoso",
    hubungan_keluarga: "Anak",
    tempat_lahir: "Samarinda",
    tgl_lahir: "2012-09-21",
    pekerjaan: "Pelajar",
  },
];

const mockRiwayatJabatan = [
  {
    jabatan: "Analis SDM",
    unit_kerja: "BKD",
    tmt_jabatan: "2020-01-01",
    no_sk: "SK-001/2020",
    jabatan_name: "Analis SDM",
    unit_kerja_name: "BKD",
  },
];

const mockRiwayatPangkat = [
  {
    golongan: "III/a",
    pangkat: "Penata Muda",
    tmt_pangkat: "2021-01-01",
    no_sk: "SK-002/2021",
    golongan_name: "III/a",
    pangkat_name: "Penata Muda",
  },
];

const mockRiwayatPendidikan = [
  {
    tingkat_pendidikan: "S1",
    nama_sekolah: "Universitas Mulawarman",
    thn_lulus: "2002",
    no_ijazah: "IJZ-2002-001",
    pendidikan_name: "S1",
    tahun_lulus: "2002",
  },
];

const mockRiwayatDiklat = [
  {
    nama_diklat: "Pelatihan Kepemimpinan",
    penyelenggara: "LAN",
    tahun: "2023",
  },
];

const mockRiwayatTandaJasa = [
  {
    tandajasa_name: "Satya Lencana",
    tahun: "2022",
  },
];

const mockTteQueue = [
  {
    id: 101,
    no_dokumen: "DOC-2026-001",
    jenis_dokumen: "Surat Tugas",
    created_at: "2026-01-03",
    pemohon_nama: "Budi Santoso",
    pemohon_nip: "197902012005011001",
    pejabat_nama: "Kepala BKD",
    status: "Pending",
    updated_at: "2026-01-03",
  },
];

const mockTteHistory = [
  {
    id: 201,
    no_dokumen: "DOC-2025-099",
    jenis_dokumen: "Surat Keterangan",
    signed_at: "2025-12-20",
    pejabat_nama: "Sekretaris Daerah",
    status: "Completed",
    updated_at: "2025-12-20",
  },
];

const mockHakAksesTtd = [
  { id: 1, pejabat_nama: "Kepala BKD", unit_kerja: "BKD" },
  { id: 2, pejabat_nama: "Sekretaris Daerah", unit_kerja: "Sekretariat" },
];

const mockAbsensiHarian = [
  {
    id: 1,
    nama: "Budi Santoso",
    nip: "197902012005011001",
    jam_masuk: "07:45",
    jam_pulang: "16:10",
    status: "H",
    status_ket: "Hadir",
    status_color: "success",
    lat: -0.502,
    lng: 117.153,
    foto: "/assets/images/user/user.png",
  },
  {
    id: 2,
    nama: "Sari Wulandari",
    nip: "198406122009022001",
    jam_masuk: "08:10",
    jam_pulang: "16:05",
    status: "T",
    status_ket: "Terlambat",
    status_color: "warning",
    lat: -0.498,
    lng: 117.149,
    foto: "/assets/images/user/user.png",
  },
];

const mockAbsensiKehadiran = [
  {
    tanggal: "2026-01-01",
    jam_masuk: "07:50",
    jam_pulang: "16:15",
    status: "H",
    status_name: "Hadir",
    terlambat: 0,
  },
  {
    tanggal: "2026-01-02",
    jam_masuk: "08:15",
    jam_pulang: "16:05",
    status: "T",
    status_name: "Terlambat",
    terlambat: 15,
  },
  {
    tanggal: "2026-01-03",
    jam_masuk: null,
    jam_pulang: null,
    status: "I",
    status_name: "Izin",
    terlambat: 0,
  },
];

const mockPengajuanAbsensi = [
  {
    id: 1,
    created_at: "2026-01-03",
    jenis_absensi_name: "Izin",
    keterangan: "Keperluan keluarga",
    status: "pending",
  },
];

const mockUangMakan = [
  { id: 1, nip: "197902012005011001", nama: "Budi Santoso", total_uang_makan: 550000 },
];

const mockLaporanSDM = [
  {
    nip: "197902012005011001",
    nama: "Budi Santoso",
    unit_kerja: "BKD",
    golongan: "III/a",
    jabatan: "Analis SDM",
    jenis_pegawai: "PNS",
    status_pegawai: "Aktif",
  },
  {
    nip: "198406122009022001",
    nama: "Sari Wulandari",
    unit_kerja: "Dinas Pendidikan",
    golongan: "III/b",
    jabatan: "Staf Keuangan",
    jenis_pegawai: "PNS",
    status_pegawai: "Aktif",
  },
];

const mockLaporanKehadiran = [
  {
    nip: "197902012005011001",
    nama: "Budi Santoso",
    total_hadir: 20,
    total_terlambat: 2,
    total_ijin: 1,
    total_sakit: 0,
    total_alpa: 0,
    total_uang_makan: 550000,
  },
];

const mockMonitoringPensiun = [
  {
    nip: "196501012000011001",
    nama: "Wahyuni",
    unit_kerja: "BKD",
    tgl_lahir: "1965-01-01",
    tgl_pensiun: "2026-05-01",
  },
];

const mockMonitoringBerkala = [
  {
    nip: "197902012005011001",
    nama: "Budi Santoso",
    golongan: "III/a",
    gaji_lama: 3500000,
    tgl_berkala: "2026-03-01",
  },
];

const mockBkdSisterList = [
  {
    id: 1,
    created_at: "2026-01-02T08:00:00Z",
    filename: "bkd_sister_2025.xlsx",
    keterangan: "Semester Genap 2025",
    sync_status: "success",
    file_url: "/assets/sample/bkd_sister_2025.xlsx",
  },
];

const mockModul = [
  { id: 1, name: "Pegawai", code: "pegawai" },
  { id: 2, name: "Absensi", code: "absensi" },
  { id: 3, name: "CMS", code: "news" },
];

const mockGroups = [
  { id: 1, name: "Admin", description: "Administrator" },
  { id: 2, name: "Operator", description: "Operator Kepegawaian" },
];

const mockUserReset = [
  {
    id: 1,
    nama: "Budi Santoso",
    nip: "197902012005011001",
    username: "budi.santoso",
    group_name: "Admin",
    is_active: true,
  },
];

const mockDashboard = {
  total_pegawai: 1280,
  pegawai_aktif: 1230,
  usulan_pending: 12,
  hadir_hari_ini: 982,
};

const mockRekapPangkat = [
  { name: "III/a", value: 420 },
  { name: "III/b", value: 300 },
  { name: "II/c", value: 180 },
];

const mockRekapPendidikan = [
  { name: "S1", value: 640 },
  { name: "S2", value: 320 },
  { name: "D3", value: 140 },
];

const buildReferensiFallback = (entity: string) => {
  const config = REFERENCE_CONFIG[entity];
  if (!config) return [];
  const columns = config.columns as string[];
  return Array.from({ length: 3 }, (_item, index) => {
    const row: Record<string, string | number> = { id: index + 1 };
    columns.forEach((col: string) => {
      row[col] = `${config.title} ${index + 1}`;
    });
    return row;
  });
};

const normalizePath = (url?: string, baseURL?: string) => {
  if (!url) return "";
  try {
    if (url.startsWith("http")) return new URL(url).pathname;
    if (baseURL && baseURL.startsWith("http")) return new URL(url, baseURL).pathname;
  } catch (error) {
    return url.split("?")[0];
  }
  return url.split("?")[0];
};

const jsonResponse = (config: AxiosRequestConfig, data: any, status = 200): AxiosResponse => ({
  data,
  status,
  statusText: status === 200 ? "OK" : "ERROR",
  headers: {},
  config: config as any,
});

const listResponse = (config: AxiosRequestConfig, items: any[]) =>
  jsonResponse(config, { data: items, total: items.length });

const dataResponse = (config: AxiosRequestConfig, payload: any) =>
  jsonResponse(config, { data: payload });

const okResponse = (config: AxiosRequestConfig, payload?: any) =>
  jsonResponse(config, { message: "OK", data: payload ?? null });

const getMockNewsDetail = (idOrSlug: string) =>
  mockNews.find((item) => String(item.id) === idOrSlug || item.slug === idOrSlug) || mockNews[0];

const getReferensiList = (entity: string) =>
  mockReferensiMap[entity] || buildReferensiFallback(entity);

export const mockAdapter = async (config: AxiosRequestConfig): Promise<AxiosResponse> => {
  const method = (config.method || "get").toLowerCase();
  const path = normalizePath(config.url, config.baseURL);

  if (path === "/login" && method === "post") {
    return jsonResponse(config, { token: "mock-token", user: mockUser });
  }

  if (method === "get") {
    if (path === "/kepegawaian/news-categories") return listResponse(config, mockNewsCategories);
    if (path === "/kepegawaian/news") return listResponse(config, mockNews);
    if (path.startsWith("/kepegawaian/news/")) {
      const slugOrId = path.replace("/kepegawaian/news/", "");
      return dataResponse(config, getMockNewsDetail(slugOrId));
    }

    if (path === "/kepegawaian/slide") return listResponse(config, mockSlides);
    if (path.startsWith("/kepegawaian/slide/")) return dataResponse(config, mockSlides[0]);

    if (path.startsWith("/kepegawaian/referensi/")) {
      const entity = path.replace("/kepegawaian/referensi/", "").split("/")[0];
      const list = getReferensiList(entity);
      if (path.split("/").length > 4) return dataResponse(config, list[0] || null);
      return listResponse(config, list);
    }

    if (path === "/kepegawaian/pegawai") return listResponse(config, mockPegawaiList);
    if (path.startsWith("/kepegawaian/pegawai/detail/")) return dataResponse(config, mockPegawaiDetail);
    if (path.startsWith("/kepegawaian/pegawai/") && path !== "/kepegawaian/pegawai") {
      return dataResponse(config, mockPegawaiDetail);
    }
    if (path.startsWith("/kepegawaian/pegawaikeluarga/list/")) return listResponse(config, mockKeluarga);

    if (path === "/kepegawaian/rwjabatan") return listResponse(config, mockRiwayatJabatan);
    if (path === "/kepegawaian/rwpangkat") return listResponse(config, mockRiwayatPangkat);
    if (path === "/kepegawaian/rwpendidikan") return listResponse(config, mockRiwayatPendidikan);
    if (path === "/kepegawaian/rwdiklat") return listResponse(config, mockRiwayatDiklat);
    if (path === "/kepegawaian/rwtandajasa") return listResponse(config, mockRiwayatTandaJasa);

    if (path === "/kepegawaian/rwpegawaittd") {
      const status = String((config.params as any)?.status || "").toLowerCase();
      if (status === "pending") return listResponse(config, mockTteQueue);
      if (status === "completed") return listResponse(config, mockTteHistory);
      return listResponse(config, [...mockTteQueue, ...mockTteHistory]);
    }
    if (path === "/kepegawaian/rwpegawaittd/token") {
      return dataResponse(config, { token: "mock-token" });
    }
    if (path.startsWith("/kepegawaian/rwpegawaittd/")) return dataResponse(config, mockTteHistory[0]);
    if (path === "/kepegawaian/ttd/hak-akses") return listResponse(config, mockHakAksesTtd);

    if (path === "/kepegawaian/laporan/sdm") return listResponse(config, mockLaporanSDM);
    if (path === "/kepegawaian/laporan/kehadiran") return listResponse(config, mockLaporanKehadiran);
    if (path === "/kepegawaian/laporan/rekap_kehadiran") return listResponse(config, mockLaporanKehadiran);
    if (path === "/kepegawaian/laporan/bkd_sister") return listResponse(config, mockBkdSisterList);
    if (path.startsWith("/kepegawaian/laporan/bkd_sister/")) {
      return dataResponse(config, mockBkdSisterList[0]);
    }

    if (path === "/kepegawaian/monitoring/pensiun") return listResponse(config, mockMonitoringPensiun);
    if (path === "/kepegawaian/monitoring/berkala") return listResponse(config, mockMonitoringBerkala);

    if (path === "/kepegawaian/absensi/harian") return listResponse(config, mockAbsensiHarian);
    if (path === "/kepegawaian/absensi/kehadiran") return listResponse(config, mockAbsensiKehadiran);
    if (path === "/kepegawaian/absensi") return listResponse(config, mockAbsensiHarian);
    if (path === "/kepegawaian/pengajuan_absensi") return listResponse(config, mockPengajuanAbsensi);
    if (path === "/kepegawaian/uang_makan") return listResponse(config, mockUangMakan);

    if (path === "/kepegawaian/modul") return listResponse(config, mockModul);
    if (path === "/kepegawaian/modul/nested") return dataResponse(config, mockModul);
    if (path.startsWith("/kepegawaian/modul/")) return dataResponse(config, mockModul[0]);

    if (path === "/kepegawaian/groups-pegawai") return listResponse(config, mockGroups);
    if (path.endsWith("/modul")) return listResponse(config, mockModul);
    if (path.endsWith("/unit")) return listResponse(config, mockReferensiMap.unit || []);

    if (path === "/kepegawaian/user_reset") return listResponse(config, mockUserReset);
    if (path.startsWith("/kepegawaian/user_reset/")) return dataResponse(config, mockUserReset[0]);

    if (path === "/kepegawaian/rekap/dashboard") return dataResponse(config, mockDashboard);
    if (path === "/kepegawaian/rekap/pangkat") return listResponse(config, mockRekapPangkat);
    if (path === "/kepegawaian/rekap/pendidikan") return listResponse(config, mockRekapPendidikan);
    if (path === "/kepegawaian/rekap/jenis_kelamin") {
      return listResponse(config, [
        { name: "Laki-laki", value: 680 },
        { name: "Perempuan", value: 600 },
      ]);
    }
    if (path === "/kepegawaian/rekap/usia") {
      return listResponse(config, [
        { name: "20-30", value: 150 },
        { name: "31-40", value: 420 },
        { name: "41-50", value: 380 },
        { name: "51+", value: 330 },
      ]);
    }
    if (path === "/kepegawaian/rekap/jabatan") return listResponse(config, mockRiwayatJabatan);
    if (path === "/kepegawaian/rekap/unit_tree") return dataResponse(config, mockReferensiMap.unit || []);

    return listResponse(config, []);
  }

  let parsedPayload: any = null;
  if (typeof config.data === "string") {
    try {
      parsedPayload = JSON.parse(config.data);
    } catch (error) {
      parsedPayload = config.data;
    }
  } else {
    parsedPayload = config.data || null;
  }

  return okResponse(config, parsedPayload);
};
