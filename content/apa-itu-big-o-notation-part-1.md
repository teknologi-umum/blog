---
title: Apa itu Big O Notation dalam pemrograman? Part 1
desc: Penjelasan sederhana mengenai kompleksitas waktu sebuah algoritma
author: Krishna Rowter
github: krowter
twitter:
telegram: krishna_1412
date: 2022-03-19
cover: https://images.unsplash.com/photo-1506719040632-7d586470c936?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1010&q=80
categories:
    - computer science
---

Pernah lihat iklan PrivyID yang ini?

![Sumber Youtube PrivyID](https://i.imgur.com/1e6yLvl.png)

Ceritanya si staf naik pesawat dari Indonesia lalu terjun payung di Hawaii untuk meminta tanda tangan dokumen dari bosnya yang sedang liburan.

Jarak dari Hawaii ke Indonesia adalah 10,000 km atau sekitar 12 jam penerbangan dengan rute tanpa transit. Katakanlah dokumen tersebut terdiri dari 10 halaman dan, jika di-scan, ukuran totalnya adalah 1MB. Berarti dengan metode kurir pesawat, kecepatan transfer data di sini adalah 1MB/12 jam atau 0.00002 MB/s.

Sedangkan kecepatan internet di Hawaii adalah 10MB/s, si bos bisa download dokumennya secepat matanya berkedip.

Jadi transfer data melalui internet adalah cara yang jelas tercepat bukan?

.

Sekarang mari lihat proses transfer data ini dengan skala yang lebih besar. Jauuhh lebih besar.

Pada 10 April 2019, diadakan konferensi pers yang ditunggu-tunggu oleh astronom di seluruh dunia. Para ilmuwan berhasil menangkap "gambar" dari lubang hitam.

![Sumber https://www.nasa.gov/mission_pages/chandra/news/black-hole-image-makes-history](https://www.nasa.gov/sites/default/files/styles/full_width/public/thumbnails/image/blackhole.png?itok=THJrwcHP)

Walau sebenarnya itu bukan sebuah foto, melainkan hasil pemetaan dari data yang dikumpulkan dari 7 teleskop yang tersebar di berbagai belahan dunia—salah satunya di Hawaii. Data tersebut harus dikirim dari Hawaii ke Haystack Observatory di Massachusetts.

Tapi data yang kita bicarakan bukan dokumen sebesar 1–10MB lho. Sudah bukan pakai MB atau GB lagi hitungannya. Data lubang hitam yang dikumpulkan seluruhnya dilaporkan mencapai 5 PB (petabytes). Jadi kira-kira ada 1/7-nya (atau sekitar 700TB) data yang harus ditransfer dari Hawaii ke Massachusetts.

Dengan kecepatan internet tadi (asumsi kecepatan upload sama dengan kecepatan download dan kecepatannya stabil), dibutuhkan waktu sekitar 2.2 tahun!

Bagaimana dengan metode kurir pesawat? tetap hanya 12 jam.

.

Notasi Big O memberi gambaran berapa waktu (atau ruang) yang dibutuhkan sebuah algoritma untuk memproses sebuah input **relatif terhadap ukuran input** tersebut.

![time complexity graph comparison](https://qph.cf2.quoracdn.net/main-qimg-ae97cd3fd4a944f5d362fa42134f4e76)

_Penting untuk diingat: ini bukan soal kecepatan atau ruang absolut ya—melainkan kompleksitas: berapa perubahan waktu/ruang yang diperlukan saat inputnya diperbesar._

Dalam contoh saya tadi, metode kurir pesawat adalah proses O(1) atau "konstan". Kenapa? Karena berapapun data yang dikirim, mau kirim 1 flashdisk sampai ratusan harddrive berkapasitas 1TB, asalkan jarak tempuh pesawatnya tidak berubah, waktu yang diperlukan sama saja. Dengan kata lain, **ukuran input tidak memengaruhi laju prosesnya**.

Sedangkan metode transfer data lewat internet adalah proses O(n), atau "linear", di mana laju proses tersebut **sebanding dengan ukuran inputnya**.

-   download dokument 1MB, di bawah 1 detik,
-   download film 500MB, mungkin 10 menitan,
-   download Call of Duty: Warzone 130GB, butuh sehari penuh

Apakah O(1) selalu lebih baik dari O(n)? Oh tidak. Di contoh di atas saja O(1) baru bisa mengungguli O(n) saat inputnya sangat besar.

Jadi saat kita membandingkan dua buah notasi big O, tanyakan "Berapa besar range inputnya?" Inilah alasan soal-soal algoritma itu selalu ada constraint-nya misalkan 100 < N < 1000. Jadi penulis program dapat memilih algoritma yang sesuai.

.

Terima kasih sudah membaca ^^

Originally posted on [my Quora profile](https://qr.ae/pGLzuX)
