# App Web

## Deskripsi
Guru Belajar adalah gerakan kolaboratif antara pemerintah, masyarakat, dan organisasi yang terlibat dalam pengembangan guru dan personel pendidikan (GTK) untuk menyediakan berbagai program pembelajaran online yang relevan yang dapat diikuti oleh guru dan personel pendidikan.
Guru Belajar adalah sistem berbasis web. Sistem ini memiliki fitur manajemen seri, jenis kelas, kelas, dan kohort. Guru dan personel pendidikan dapat memilih sebuah seri, lalu mengikuti kelas-kelas yang tersedia di setiap seri.

## Project setup
```
cp .env.example .env
```
Sesuaikan varible VUE_APP_TITLE untuk judul WebApp
Contoh :
```
VUE_APP_TITLE=My App
```
Sesuaikan variable VUE_APP_API untuk URL API
Contoh :
```
VUE_APP_API=http://localhost:8000/api
```
Catatan :
Setiap kali anda mengubah .env dan sedang menjalan hot-reload, maka pastikan untuk mematikan merestart hot-reload

Install package
```
yarn install
```

### Compiles and hot-reloads for development
```
yarn run serve
```

### Compiles and minifies for production
```
yarn run build
```

### Lints and fixes files
```
yarn run lint
```
