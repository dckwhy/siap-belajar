export const ENV = process.env.VUE_APP_ENV
export const API = process.env.VUE_APP_API
export const BASE_API = process.env.VUE_APP_BASE
export const SIM = process.env.VUE_APP_SIM
export const COPYRIGHT = process.env.VUE_APP_COPYRIGHT || '&copy;' + new Date().getFullYear()
export const LOGO = process.env.VUE_APP_LOGO
export const MAX_UPLOAD_SIZE = process.env.VUE_APP_MAX_UPLOAD_SIZE || 1

export const TAWK_SRC = process.env.VUE_APP_TAWK_SRC
export const GMAP_KEY = process.env.VUE_APP_GMAP_KEY
export const CLIENT_ID = process.env.VUE_APP_CLIENT_ID
export const CLIENT_SECRET = process.env.VUE_APP_CLIENT_SECRET
export const SITE_KEY = process.env.VUE_APP_RECAPTCHA_SITE_KEY
export const PASSPORT = process.env.VUE_APP_PASSPORT
export const DSN_SENTRY = process.env.VUE_APP_DSN_SENTRY
export const GA = process.env.VUE_APP_GA
export const MAMOTO = process.env.VUE_APP_MAMOTO
export const MAMOTO_SITE_ID = process.env.VUE_APP_MAMOTO_SITE_ID || 0

export const THEME_ELEARNING = {
  primary: '#581a9f',
  secondary: '#FF9900 ',
  judul: '#4d78af',
  subjudul: '#6d9dcd',
  accent: '#2D1CE8',
  error: '#f44336',
  warning: '#FFC107',
  info: '#2196f3',
  success: '#4caf50',
  background: '#edeaf7',
}

export const THEME_ELEARNING_DARK = {
  primary: '#424242',
  secondary: '#ffffff',
  judul: '#212121',
  subjudul: '#757575',
  accent: '#0D47A1',
  error: '#f44336',
  warning: '#ffeb3b',
  info: '#2196f3',
  success: '#4caf50',
}

export const KELAMIN = [
  {
    id: 'L',
    label: 'Laki-laki',
  },
  {
    id: 'P',
    label: 'Perempuan',
  },
]

export const ROLE_OWNER = {
  id: 1,
  name: process.env.VUE_APP_ROLE_OWNER_LABEL || 'Owner',
}
export const ROLE_ADMIN_INSTITUSI = {
  id: 2,
  name: process.env.VUE_APP_ROLE_ADMIN_INSTITUSI_LABEL || 'Admin Institusi',
}
export const ROLE_ADMIN_DESA = {
  id: 3,
  name: process.env.VUE_APP_ROLE_ADMIN_DESA_LABEL || 'Admin Desa',
}
export const ROLE_PELAPOR = {
  id: 4,
  name: process.env.VUE_APP_ROLE_PELAPOR_LABEL || 'Pelapor',
}
export const ROLE_OPERATOR = {
  id: 5,
  name: process.env.VUE_APP_ROLE_OPERATOR_LABEL || 'Operator',
}

export const ALERT_INFO = {
  pengguna: {
    list: {
      judul: 'Pengguna',
      deskripsi:
        '<b>Info (Kelola Pengguna)</b> pada menu ini Anda dapat melakukan pengelolaan pengguna yang tersimpan dalam sistem. Penampilan data dapat di pilah berdasarkan pilihan filter yang dipilih atau dengan pencarian',
    },
    form: {
      judul: 'Form Penguna',
      deskripsi:
        '<b>Info  (Kelola Pengguna Baru)</b> pada laman ini Anda diharuskan melakukan pencarian surel user terlebih dahulu, kemudian lanjutkan dengan melengkapi data pengguna yang akan ditambahkan',
    },
    form2: {
      judul: 'Form Penguna',
      deskripsi:
        '<b>Info  (Kelola Pengguna Baru)</b> pada laman ini Anda diharuskan melengkapi data pengguna yang akan ditambahkan. <b>Kata Sandi</b> akan di berikan secara acak dan dapat di cek pada menu Cetak Akun.',
    },
  },
  siswappdb: {
    list: {
      judul: 'Siswa PPDB',
      deskripsi: '',
    },
    form: {
      judul: 'Form Penguna',
      deskripsi:
        '<b>Info  (Kelola Pengguna Baru)</b> pada laman ini Anda diharuskan melakukan pencarian surel user terlebih dahulu, kemudian lanjutkan dengan melengkapi data pengguna yang akan ditambahkan',
    },
    form2: {
      judul: 'Form Penguna',
      deskripsi:
        '<b>Info  (Kelola Pengguna Baru)</b> pada laman ini Anda diharuskan melengkapi data pengguna yang akan ditambahkan',
    },
  },
  modul: {
    list: {
      judul: 'Materi',
      deskripsi:
        '<b>Info (Kelola Materi)</b> pada menu ini Anda dapat melakukan pengelolaan materi yang tersimpan dalam sistem. Penampilan data dapat di pilah berdasarkan pilihan filter yang dipilih atau dengan pencarian',
    },
    form: {
      judul: 'Form Materi',
      deskripsi:
        '<b>Info (Kelola Materi Baru)</b> pada laman ini Anda diharuskan mengisi data yang sudah ditentukan, jika terdapat informasi belum lengkap, informasi bisa langsung disimpan dan akan dilengkapi dilain waktu',
    },
  },
  rombel: {
    list: {
      judul: 'Rombel',
      deskripsi:
        '<b>Info (Kelola Rombongan Belajar)</b> pada menu ini Anda dapat melakukan pengelolaan Rombongan Belajar anda juga dapat mencari data dengan fitur pencarian',
    },
    form: {
      judul: 'Form Rombel',
      deskripsi:
        "<span class='font-weight-bold'>Info (Tambah Rombongan Belajar Baru)</span> pada laman ini Anda diharuskan mengisi data yang sudah ditentukan, jika terdapat informasi belum lengkap, informasi bisa langsung disimpan dan akan dilengkapi dilain waktu",
    },
    anggota: {
      deskripsi:
        'Berikut adalah daftar pengguna yang bisa Anda tambahkan sebagai peserta Rombel sesuai Tingkat yang Anda Pilih',
    },
  },
  kelas: {
    list: {
      judul: 'Kelas',
      deskripsi:
        '<b>Info (Kelola Kelas Mata Pelajaran)</b> pada menu ini Anda dapat melakukan pengelolaan Kelas yang saat ini tersimpan dalam sistem. Penampilan data dapat di pilah berdasarkan pengaturan filter yang dipilih atau dengan pencarian',
    },
    form: {
      judul: 'Form Mapel',
      deskripsi:
        '<b>Info (Kelola Kelas Mata Pelajaran)</b> pada menu ini Anda dapat menambahkan data kelas mata pelajaran',
    },
  },
  kelasku: {
    list: {
      judul: 'Kelasku',
      deskripsi: '<b>Info (Kelasku)</b> menu ini menampilkan semua daftar kelas yang Anda ikuti',
    },
  },
  instansi: {
    list: {
      judul: 'Sekolah',
      deskripsi:
        "<span class='font-weight-bold'>Info (Kelola Sekolah)</span> pada menu ini Anda dapat melakukan pengelolaan sekolah yang tersimpan dalam sistem. Penampilan data dapat dipilah berdasarkan pengaturan filter yang dipilih atau dengan pencarian",
    },
    form: {
      judul: 'Form Sekolah',
      deskripsi:
        "<span class='font-weight-bold'>Info (Ubah Profil Instansi)</span> Silakan lengkapi data profil sekolah secara faktual dan lengkap, sesuai denan kondisi tertentu",
    },
  },
  mapel: {
    list: {
      judul: 'Mata Pelajaran',
      deskripsi:
        '<b>Info (Kelola Mata Pelajaran)</b> Modul ini berisi data  mata pelajaran yang nantinya dapat diikuti oleh pengguna.',
    },
    form: {
      judul: 'Form Mata Pelajaran',
      deskripsi:
        "<span class='font-weight-bold'>Info (Tambah Mata Pelajaran Baru)</span> pada laman ini Anda diharuskan mengisi data yang sudah ditentukan, jika terdapat informasi belum lengkap, informasi bisa langsung di simpan dan akan dilengkapi di lain waktu",
    },
  },
  akses: {
    list: {
      judul: 'Hak Akses',
      deskripsi:
        "<span class='font-weight-bold'>Info (Kelola Hak Akses)</span> pada menu ini Anda dapat melakukan pengelolaan Hak Akses yang nantinya akan dimiliki oleh setiap pengguna yang terdaftar.",
      size: '14px',
    },
    form: {
      judul: 'Form Ruang Kelas',
      keterangan:
        'Pada laman ini Anda dapat menambahkan Hak Akses baru dengan menginputkan nama Hak Akses tersebut, kemudian pilih modul-modul apa saja yang nantinya akan dapat diakses oleh pengguna tersebut',
    },
  },
  ajuan: {
    list: {
      judul: 'Ajuan Data Peserta PPDB',
      deskripsi: 'Berikut adalah daftar <b>Data Ajuan Peserta PPDB</b> yang harus Anda verifikasi',
    },
  },
}
