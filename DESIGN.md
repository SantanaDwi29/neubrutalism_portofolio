## Pembaruan UX portfolio (13 September 2026)

- Design read: portfolio developer untuk calon klien dan recruiter, dengan komposisi editorial, bahasa personal, dan identitas anime dari portrait asli.
- Redesign preserve: palet empat warna solid, identitas SANTANA.DEV, gambar hero, screenshot asli, data proyek, rute, anchor, dan label navigasi dipertahankan. React + Tailwind v3 dan CSS native tetap menjadi fondasi.
- Audit: judul kapital berulang, metadata teknis dekoratif, ukuran teks terlalu kecil, pola kartu seragam, sertifikat statis, dan filter SaaS yang tidak cocok dengan kapitalisasi data adalah masalah utama.
- `DESIGN_VARIANCE: 7`, `MOTION_INTENSITY: 5`, `VISUAL_DENSITY: 4`. Reveal memakai transform singkat untuk urutan baca, hover untuk feedback, perubahan panel untuk respons pilihan. Semua menghormati reduced motion; tidak ada scroll hijack, custom cursor, atau animasi tanpa henti.
- Tipografi: Plus Jakarta Sans variable disimpan lokal bersama lisensi OFL; ukuran teks konten utama 14-16px, heading menggunakan sentence case. Gambar baru tidak diperlukan karena portrait dan screenshot produk asli tersedia.
- Pola konten: hero asimetris, bio terbuka, tab stack dengan contoh proyek terkait, pengalaman dengan disclosure, galeri sertifikat, koleksi proyek bertingkat, dan kontak dengan pilihan topik email.
- Interaksi: filter kategori dari data, pencarian teknologi dengan trim, jumlah hasil dan reset, load more, modal sertifikat native dengan Escape dan pengembalian fokus, PDF asli, galeri detail proyek, tema manual tersimpan, serta feedback clipboard.
- Aksesibilitas: label pencarian, tab keyboard, skip link, status pembaca layar, target sentuh minimal 44px, dan fokus kontras. Card tetap sand dengan teks burgundy dalam kedua tema sesuai arahan pengguna sebelumnya; background halaman mengikuti tema sistem atau pilihan manual.

## Pembaruan palet UI (13 September 2026)

Arahan warna terbaru menggantikan ketentuan transparansi, gradient, glow, dan blur di brief awal di bawah ini.

- Warna utama: `#800020`; latar terang: `#FFF9F2`; bidang pendukung: `#F3E6D5`; aksen dekoratif: `#D45060`.
- Semua warna UI solid. Tidak memakai alpha, opacity parsial, gradient, mask, glass, atau shadow transparan pada komponen yang ditampilkan.
- Mode gelap mengikuti preferensi sistem dengan latar burgundy dan teks krem, tetap hanya menggunakan empat warna yang sama.
- Tombol utama memakai burgundy/krem agar kontras terbaca; rose dipakai untuk garis dan dekorasi, bukan teks kecil.
- Semua card memakai bidang sand `#F3E6D5` dengan teks burgundy `#800020`, termasuk pada mode gelap. Label dan kontrol pendukung di dalam card memakai krem `#FFF9F2` agar terpisah dari bidang card.
- Bentuk: kartu 16px, tombol 12px, label 8px, chip filter berbentuk pill.
- Gambar hero, screenshot proyek, informasi portofolio, rute, dan navigasi tetap menggunakan aset serta struktur yang tersedia.
- Implementasi: React + Tailwind v3 yang sudah terpasang, CSS native untuk permukaan solid. `DESIGN_VARIANCE: 6`, `MOTION_INTENSITY: 3`, `VISUAL_DENSITY: 4`.
- Skill `design-taste-frontend` dan `design-taste-frontend-v1` digunakan untuk audit, konsistensi warna, hierarki, dan pemeriksaan responsif. Permintaan empat warna solid menjadi acuan utama.

---

Saya memiliki sebuah **website portfolio pribadi** yang saat ini menggunakan konsep desain **Neobrutalism**.

Saya ingin melakukan redesign besar pada bagian visual website tersebut menjadi konsep:

# ANIME CINEMATIC PERSONAL PORTFOLIO

Website harus memiliki kesan seperti sebuah dunia anime modern dengan visual yang cinematic, dreamy, elegan, interaktif, dan tetap profesional sebagai portfolio seorang developer.

Saya SUDAH MEMILIKI GAMBAR HERO utama.

JANGAN mengganti gambar hero tersebut.

Gunakan gambar hero yang sudah tersedia sebagai **pusat dari keseluruhan art direction website**.

Warna, background, efek cahaya, dekorasi, gradient, dan elemen visual website sebisa mungkin menyesuaikan dengan warna dan suasana gambar hero tersebut.

---

# TUJUAN UTAMA

Ubah website dari:

Neobrutalism
→
Anime Cinematic Portfolio

Hilangkan atau kurangi ciri Neobrutalism seperti:

* border hitam sangat tebal
* shadow keras
* warna kontras kasar
* card berbentuk kotak kaku
* button blocky
* layout yang terlalu rigid

Ganti dengan visual:

Anime
+
Cinematic
+
Dreamy
+
Modern Japanese UI
+
Professional Developer Portfolio

PENTING:

Website jangan terlihat seperti:

"website biasa yang hanya ditempeli gambar anime."

Seluruh UI harus ikut memiliki identitas anime.

Anime harus terasa melalui:

* background
* warna
* typography
* navbar
* hero
* button
* card
* section
* gambar
* dekorasi
* animasi
* hover
* transisi
* microinteraction

Tetapi tetap pertahankan kesan profesional karena website ini merupakan **portfolio pribadi seorang developer**.

---

# 1. DESIGN SYSTEM

Sebelum mengubah component, buat terlebih dahulu design system baru.

Gunakan CSS variables / theme variables untuk:

--background
--background-secondary
--surface
--surface-glass

--primary
--secondary
--accent

--text-primary
--text-secondary
--text-muted

--border-soft

--shadow-soft
--shadow-glow

--gradient-primary
--gradient-background

Warna utama JANGAN ditentukan secara sembarangan.

Analisis warna gambar hero yang sudah ada kemudian gunakan warna dominan dari hero tersebut sebagai dasar palette website.

Gunakan kombinasi:

warna netral
+
warna pastel anime
+
1 warna primary
+
1 warna secondary
+
warna accent

Hindari penggunaan terlalu banyak warna.

---

# 2. BACKGROUND WEBSITE

Jangan menggunakan background polos.

Buat background yang memiliki atmosfer anime cinematic.

Gunakan kombinasi:

* gradient lembut
* radial gradient
* glow
* blurred gradient blob
* subtle grain/noise
* sparkle
* star
* light particle
* manga halftone pattern yang sangat subtle

Contoh struktur visual:

base background
↓
soft gradient
↓
large blurred glow
↓
subtle anime pattern
↓
particles
↓
content

Background antar section harus menyatu.

Jangan membuat setiap section terlihat seperti kotak yang berdiri sendiri.

---

# 3. NAVBAR

Buat navbar modern bergaya anime minimal.

Gunakan:

* floating navbar
* semi-transparent background
* backdrop blur
* border tipis transparan
* rounded corners
* subtle shadow

Menu:

Home
About
Skills
Experience
Projects
Certificates
Contact

Active menu dapat menggunakan:

* glowing dot
* gradient underline
* accent color

Ketika halaman di-scroll:

navbar menjadi sedikit lebih solid.

Tambahkan smooth scroll.

Navbar tetap harus responsive pada mobile.

---

# 4. HERO SECTION

Hero merupakan bagian PALING PENTING.

Gunakan gambar hero yang sudah tersedia.

JANGAN menggantinya.

JANGAN menaruh gambar hero hanya di dalam card persegi biasa.

Integrasikan gambar tersebut dengan keseluruhan composition hero.

Layout desktop dapat menggunakan:

LEFT:
intro + headline + description + CTA

RIGHT:
hero anime artwork

atau sesuaikan dengan komposisi gambar hero yang sudah ada.

Contoh konten:

Hello, I'm

[NAMA]

Full Stack Web Developer

I build modern, scalable and meaningful digital experiences.

Tambahkan decorative label kecil seperti:

PORTFOLIO // 2026

atau decorative Japanese typography seperti:

開発者
Developer

Tulisan Jepang hanya sebagai DEKORASI.

Jangan mengganti informasi utama dengan bahasa Jepang.

---

Hero title dibuat besar dan expressive.

Contoh:

FULL STACK
WEB DEVELOPER

Salah satu kata dapat menggunakan:

gradient text
atau
anime accent color.

---

Tambahkan CTA:

[ View My Work ]

[ Contact Me ]

Primary CTA menggunakan:

gradient
soft glow
rounded button
arrow icon

Secondary CTA menggunakan:

transparent/glass style.

---

# 5. HERO IMAGE TREATMENT

Gambar hero yang sudah tersedia harus terasa menyatu dengan website.

Tambahkan di belakang hero:

* radial glow
* blurred light
* decorative circle
* anime light ray
* sparkle
* subtle manga pattern

Jika memungkinkan gunakan:

mask-image

atau gradient mask sehingga bagian bawah hero artwork perlahan menyatu dengan background.

Tambahkan beberapa decorative floating elements.

Contoh:

✦
+
small star
small circle
Japanese typography
thin lines

Jangan berlebihan.

---

# 6. HERO ANIMATION

Tambahkan animasi sangat subtle pada hero.

Hero artwork:

floating vertical movement sekitar 4–8px.

Glow:

slow breathing effect.

Particles:

slow floating.

Decorative elements:

sedikit parallax berdasarkan cursor.

JANGAN membuat karakter bergerak terlalu banyak.

Tujuannya membuat gambar seperti **anime key visual yang hidup**, bukan animasi game.

---

# 7. ABOUT ME

Buat section:

ABOUT ME

Tambahkan decorative subtitle:

私について

Sebagai elemen visual kecil.

Layout:

portrait/image
+
deskripsi diri.

Tampilkan informasi seperti:

Nama
Role
Lokasi
Pendidikan
Fokus Development

Buat beberapa mini information cards.

Contoh:

01
Developer

02
Web Development

03
Indonesia

Gunakan desain minimal dengan:

soft glass surface
thin border
subtle glow.

---

# 8. SKILLS / TECH STACK

Buat section:

TECH STACK

atau

MY ARSENAL

Tampilkan teknologi yang digunakan.

Contoh kategori:

Frontend

React
TypeScript
JavaScript
Tailwind CSS
Next.js

Backend

Laravel
PHP
Node.js

Database

MySQL
MariaDB
MongoDB
Redis

DevOps / Tools

Docker
Git
Jenkins

Gunakan logo/icon masing-masing teknologi.

Jangan menggunakan card besar untuk setiap teknologi.

Gunakan compact technology chips/cards.

Hover:

icon naik sedikit
+
background glow
+
border berubah ke accent color.

---

# 9. EXPERIENCE

Buat section:

EXPERIENCE

Gunakan konsep **anime storyline / journey timeline**.

Timeline dapat berupa garis vertikal dengan glowing point.

Contoh:

2025
Internship

↓

2026
Full Stack Web Developer

Setiap experience memiliki:

* tahun
* posisi
* perusahaan
* deskripsi
* teknologi

Gunakan nomor chapter sebagai dekorasi:

CHAPTER 01
CHAPTER 02

Sehingga perjalanan karier terasa seperti chapter dalam sebuah cerita anime.

Tetap gunakan bahasa profesional.

---

# 10. PROJECT SECTION

Project merupakan section penting.

Judul:

SELECTED PROJECTS

Tambahkan decorative Japanese subtitle kecil jika cocok.

Gunakan project card yang lebih visual.

Setiap project memiliki:

* project image
* project name
* short description
* technology stack
* Live Demo
* GitHub / Detail

Card jangan menggunakan border hitam tebal.

Gunakan:

rounded corners
soft border
gradient surface
image overlay
subtle glow

Saat hover:

image scale 1.03
card translateY
border glow
arrow bergerak sedikit

Project unggulan dapat menggunakan card yang lebih besar.

Contoh layout:

PROJECT 01
large featured project

PROJECT 02 | PROJECT 03
smaller projects

Sehingga layout tidak monoton.

---

# 11. PROJECT IMAGE

Berikan treatment pada screenshot project.

Gunakan:

rounded image
gradient overlay
subtle anime color grading
soft glow

Jangan mengubah screenshot asli.

Hanya ubah cara presentasinya.

---

# 12. CERTIFICATES

Buat section:

CERTIFICATES
&
ACHIEVEMENTS

Tampilkan certificate dalam elegant card/grid.

Informasi:

Nama Sertifikat
Issuer
Tahun
Credential / Detail

Tambahkan decorative icon seperti:

✦
★
badge

tetapi tetap minimal.

---

# 13. ANIME DECORATIVE ELEMENTS

Gunakan decorative anime elements secara konsisten.

Contoh:

✦ sparkles

small stars

thin lines

circles

Japanese text

manga dots

halftone

light streak

cross symbols

floating particles

chapter numbers

Gunakan sebagai SECONDARY visual.

Jangan sampai dekorasi mengalahkan content.

---

# 14. MANGA PANEL INSPIRATION

Beberapa section dapat mengambil inspirasi layout manga.

BUKAN berarti menggunakan border hitam manga.

Gunakan konsep:

asymmetric layout
overlapping image
large typography
chapter number
decorative lines
cropped visual elements

Misalnya:

PROJECT
01

gambar project besar

teks berada sedikit overlap dengan gambar.

Ini memberikan anime/manga feeling tanpa terlihat childish.

---

# 15. CONTACT SECTION

Buat contact section seperti ending scene dari website.

Gunakan headline besar:

LET'S CREATE
SOMETHING AMAZING.

atau konten existing yang sudah ada.

Tambahkan:

Email
GitHub
LinkedIn
Social Media

CTA utama:

LET'S TALK →

Gunakan background yang sedikit lebih cinematic dibanding section sebelumnya.

Tambahkan glow besar di belakang headline.

---

# 16. FOOTER

Footer minimal.

Tampilkan:

Nama
Portfolio
Copyright
Social Links

Tambahkan decorative Japanese text kecil jika sesuai.

Contoh:

また会いましょう

hanya sebagai visual tambahan.

---

# 17. CURSOR & MICROINTERACTION

Jika sesuai dengan project saat ini, buat custom cursor yang sangat subtle.

Contoh:

small dot
+
soft outer circle

Saat hover button/link:

outer circle sedikit membesar.

Jangan gunakan custom cursor pada mobile.

Microinteraction lainnya:

button arrow movement
card lift
icon movement
image scale
glow transition
underline animation.

---

# 18. SCROLL ANIMATION

Gunakan scroll reveal.

Saat section masuk viewport:

opacity:
0 → 1

translateY:
20px → 0

duration:
sekitar 500–800ms

Gunakan stagger untuk card.

Contoh:

card 1
↓ 100ms

card 2
↓ 200ms

card 3
↓ 300ms

Animasi harus smooth.

Jangan membuat semua elemen bergerak secara berlebihan.

---

# 19. PARALLAX

Tambahkan parallax sangat subtle pada hero.

Background decorative element bergerak lebih lambat daripada content.

Hero artwork dapat memiliki sedikit depth.

Jangan gunakan efek yang berat.

Pastikan performa tetap bagus.

---

# 20. MOBILE DESIGN

Jangan hanya mengecilkan layout desktop.

Buat composition khusus mobile.

Hero mobile:

text
↓
CTA
↓
anime hero artwork

atau sesuaikan dengan gambar yang tersedia.

Kurangi:

particles
blur
glow
parallax

pada perangkat mobile.

Pastikan:

teks mudah dibaca
CTA mudah ditekan
gambar tidak terpotong buruk
navbar mudah digunakan
project card nyaman dilihat.

---

# 21. PERFORMANCE

Jangan mengorbankan performa demi efek visual.

Hindari:

terlalu banyak JavaScript animation
terlalu banyak particles
large blur berlebihan
unoptimized image
animation pada terlalu banyak element

Gunakan CSS animation jika memungkinkan.

Gunakan transform + opacity untuk animation.

Respect:

prefers-reduced-motion.

---

# 22. FILE / COMPONENT YANG PERLU DIPERIKSA

Sebelum melakukan perubahan, periksa struktur project terlebih dahulu.

Cari file/component yang menangani:

App
Layout
Navbar
Hero
About
Skills
Experience
Projects
Certificates
Contact
Footer

Cari juga:

global.css
index.css
app.css
tailwind config
theme
styles
assets
images

JANGAN langsung membuat file baru jika component yang sesuai sudah tersedia.

Utamakan UPDATE FILE EXISTING.

---

# 23. ATURAN MODIFIKASI FILE

Sebelum coding:

1. Analisis seluruh struktur frontend.
2. Cari component yang digunakan oleh halaman portfolio.
3. Cari global styling.
4. Cari lokasi hero image.
5. Identifikasi responsive breakpoint.
6. Identifikasi library animation yang sudah digunakan.

Setelah itu baru lakukan perubahan.

PRIORITAS FILE:

Global Style
↓
Layout
↓
Navbar
↓
Hero
↓
About
↓
Skills
↓
Experience
↓
Projects
↓
Certificates
↓
Contact
↓
Footer

Jika project menggunakan React, pertahankan struktur React.

Jika menggunakan TypeScript, jangan mengubah menjadi JavaScript.

Jika menggunakan Tailwind, prioritaskan Tailwind.

Jika sudah menggunakan library icon, gunakan library tersebut.

Jika animation library sudah tersedia, gunakan library existing.

JANGAN memasang dependency baru jika tidak diperlukan.

---

# 24. JANGAN UBAH

Jangan mengubah:

API
backend
database
routing
data project
data experience
informasi portfolio
link GitHub
link social media
contact information
existing functionality

kecuali memang diperlukan untuk redesign UI.

Fokus utama adalah VISUAL REDESIGN.

---

# 25. RESPONSIVE BREAKPOINT

Pastikan minimal diuji pada:

375px
Mobile

768px
Tablet

1024px
Laptop

1440px
Desktop

Pastikan tidak ada:

horizontal overflow
text terpotong
hero terpotong buruk
particle menutupi content
button keluar container
project image stretch.

---

# 26. ACCESSIBILITY

Pastikan:

contrast text tetap jelas

button memiliki focus state

link memiliki hover/focus state

image memiliki alt

animation menghormati prefers-reduced-motion

decorative element menggunakan pointer-events: none jika diperlukan.

Anime aesthetic tidak boleh mengurangi usability.

---

# 27. FINAL VISUAL TARGET

Hasil akhir harus terasa seperti:

Professional Developer Portfolio
×
Modern Japanese Anime
×
Cinematic Anime Key Visual
×
Visual Novel UI
×
Modern Interactive Website

Bayangkan visitor membuka website dan merasa seperti masuk ke **opening scene sebuah anime tentang seorang developer**, tetapi beberapa detik kemudian tetap langsung memahami:

siapa developer tersebut,
skill yang dimiliki,
pengalaman kerja,
project yang pernah dibuat,
dan bagaimana menghubunginya.

Anime menjadi IDENTITAS VISUAL.

Portfolio tetap menjadi FUNGSI UTAMA.

---

# 28. IMPLEMENTATION

Kerjakan secara bertahap.

STEP 1
Analisis existing project terlebih dahulu.

STEP 2
Jelaskan secara singkat file mana saja yang akan diubah dan alasan perubahan.

STEP 3
Buat anime design system berdasarkan hero image.

STEP 4
Implementasikan global background dan typography.

STEP 5
Redesign Navbar + Hero.

STEP 6
Redesign About + Skills.

STEP 7
Redesign Experience menggunakan konsep chapter/storyline.

STEP 8
Redesign Projects.

STEP 9
Redesign Certificates + Contact + Footer.

STEP 10
Tambahkan animation dan microinteraction.

STEP 11
Optimalkan responsive/mobile.

STEP 12
Review seluruh halaman dan perbaiki visual inconsistency.

Jangan berhenti setelah hanya mengubah Hero.

Redesign harus konsisten pada KESELURUHAN halaman portfolio.
