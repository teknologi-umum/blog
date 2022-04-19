---
title: Belajar dan Berlatih Bersama Binary Search
desc: Binary search adalah salah satu teknik pertama yang biasanya diajarkan kepada programmer yang sedang belajar algoritma. Pelajaran apa yang bisa kita ambil dari binary search? 
author: Kemumaki
github: kemumaki375
twitter:
telegram: kemumaki_35753
date: 2022-04-19
cover: https://miro.medium.com/max/1400/1*GvdVNpUC_d6n80ZJNqrG1A.png
categories:
  - computer science
  - algorithm
---
[Binary search](https://en.wikipedia.org/wiki/Binary_search_algorithm) adalah algoritma untuk mencari nilai di dalam array. Teknik ini sedikit lebih rumit dibandingkan dengan *linear search* biasa (cari dari kiri ke kanan) namun memiliki performance yang jauh lebih baik.

Pada tulisan ini saya ingin mengurai beberapa pelajaran yang mungkin berguna terutama untuk programmer yang sedang dalam tahap awal belajar. 

## Kompleksitas Algoritma

Kompleksitas algoritma dari binary search adalah `O(Log N)`. Artinya, binary search membutuhkan maksimum `Log(1000000)` = `20` kali operasi saja untuk memproses array dengan panjang 1000.000. Bandingkan dengan linear search yang memiliki kompleksitas `O(N)`:

|N Elements | O(N) | O(log N)|
|-----------|------|---------|
|8 |8 |3|
|16 |16| 4|
|64 |64 |6|
|1024| 1024| 10|
|65536| 65536| 16|
|1048576| 1048576| 20|

**Tips**:
- Abaikan konstanta dalam menentukan [Big O Notation](https://teknologiumum.com/posts/apa-itu-big-o-notation-part-1). Algoritma dengan kompleksitas `O(1000N + 10)` dapat dianggap sama saja dengan `O(N)` [meskipun secara runtime tetap akan berpengaruh](https://stackoverflow.com/questions/22188851/why-is-the-constant-always-dropped-from-big-o-analysis).
- [Basis logaritma yang digunakan juga bisa kita abaikan](https://stackoverflow.com/questions/6701809/base-of-logarithms-in-time-complexity-algorithms). Untuk contoh binary search (dan algoritma lain yang memotong-motong data menjadi 2) basis logaritma yang digunakan adalah 2 karena kompleksitas binary search kira-kira artinya "berapa kali N harus dibagi 2 sampai nilainya menjadi 1". 
- Latihan: Pelajari [merge sort](https://en.wikipedia.org/wiki/Merge_sort) dan pahami mengapa kompleksitasnya O(N. Log N)

## Prekondisi
Jika binary search memang cepat, mengapa kita tidak ganti saja semua pencarian agar menggunakan binary search? **Karena binary search hanya dapat digunakan untuk array yang sudah terurut (ordered)**. Kalau datanya tidak terurut outputnya akan ngaco. 

Linear search biasa tidak membutuhkan syarat pre-kondisi seperti itu. 

**Bagaimana kalau kita urutkan dulu datanya sebelum proses binary search dilakukan?**

*Tidak bisa. Kalau seperti itu maka benefit yang didapat dari efisiensi binary search akan hilang. Proses sorting saja paling cepat `O(N Log N)`.*

**Kalau gitu kita cek saja apakah datanya sudah terurut atau belum. Kalau belum kita bisa fallback ke linear search biasa**.

*Tidak bisa juga, memeriksa apakah array sudah terurut atau belum membutuhkan proses `O(N)` sendiri.*

**Tips**: jangan karena mengejar performance di satu bagian kita justru memasukan proses-proses lain yang justru berdampak lebih buruk untuk sistem secara keseluruhan.

## Keep it Simple
Selain memerlukan prekondisi, implementasi binary search juga sedikit lebih rumit. Kode yang lebih rumit memiliki potensi *bug* lebih banyak: proses penghitungan *mid-point* bisa [berujung pada overflow](https://ai.googleblog.com/2006/06/extra-extra-read-all-about-it-nearly.html), penentuan *stop-condition* bisa salah, atau parameter input array bisa tidak sengaja disalin dulu (dengan kompleksitas O(N)) saat fungsi dipanggil.

> Make it work, Make it right, Make it fast

Pada saat menyelesaikan masalah, jangan langsung lompat ke teknik yang paling canggih. Coba dulu cara yang sederhana, mudah dipahami, mudah diimplementasikan, dan mudah di-debug. 

Periksa dulu sebelum memutuskan untuk melakukan optimalisasi habis-habisan:
- Apakah user akan terbantu? Atau *effort* saya lebih baik dialihkan untuk memperbaiki bug yang membuat Pak Joko dari finance marah-marah setiap sore?
- Apakah biaya infrastruktur dapat berkurang secara signifikan?
- Apakah **memang terbukti** kalau bagian tersebut adalah sumber masalahnya? Atau emang kamu gak suka aja ngeliat kode si Mahmud?

Jangan buang waktu untuk mengoptimalisasi proses yang hanya dipanggil satu user sebulan sekali dan sebenarnya sudah lumayan kencang. 

## Waktunya Upgrade Server?
Aplikasi yang awalnya ngebut umumnya akan melambat seiring dengan berjalannya waktu. Mungkin karena jumlah data semakin banyak.. mungkin juga karena programmer seniornya sudah pada resign. 

Pada saat seperti ini biasanya atasan menyuruh kita untuk  **throw money at the problem** - upgrade server sekarang juga. 

Apakah kita ikuti saja apa kata pak bos? Atau ikutan resign? 

Sebelum memutuskan untuk mengirim one month notice, cari tahu dulu permasalahannya dimana. Ingat, algoritma yang buruk juga akan terasa kencang kalau datanya cuma ada 5 biji. 
 
- Interview user untuk mencari tahu bagian mana dan proses apa yang lambat (bisa jadi sistem cuma lambat di laptop Intel Atom jadul punya Bu Dahlan).
- Umumnya persoalan performa hanya muncul di production environment karena data dev cuma dikit. 
- Nyalakan [instrumentasi](https://en.wikipedia.org/wiki/Instrumentation_(computer_programming)) untuk mendapatkan gambaran operasional sistem secara lebih jelas dan menyeluruh. 
- Lakukan [profiling](https://en.wikipedia.org/wiki/Profiling_(computer_programming)) untuk mencari tahu bagian mana yang menjadi sumber penyakit - biasanya disebut dengan [hot spot](https://en.wikipedia.org/wiki/Hot_spot_(computer_programming)). 

Jika terbukti kalau memang ada bagian kode yang harus dioptimisasi, maka lakukan. Jangan tutupi implementasi jelek menggunakan server upgrade. Makin lama ongkos upgrade akan makin tidak sebanding dengan tambahan performance yang didapat. 

**Tips:** 
- Sebelum memperbaiki, **buat unit testing terlebih dulu**. Jangan mengutak-atik kode yang tidak memiliki test. 
- Setelah perbaikan selesai, lakukan benchmark untuk memverifikasi kalau perbaikan tadi memang membuahkan hasil. 

## Latihan 1 - Membuat Unit Testing
Sebagai latihan, pelajari bagaimana [cara kerja binary search](https://www.programiz.com/dsa/binary-search)  lalu coba buat implementasinya menggunakan bahasa kesukaan anda (C#). 

Jangan berhenti sampai disitu, buat unit testing untuk memastikan kalau implementasinya sudah benar. 

**Tips:** Saat membuat unit testing, biasanya kita mulai dengan membuat test cases untuk skenario yang umum:

- Tes dengan nilai yang ada di dalam array, pastikan fungsi mengembalikan posisi index yang benar. 
- Tes dengan nilai yang tidak ada. Pastikan fungsi mengembalikan nilai -1 (atau `false` tergantung implementasi anda). 

Setelah kasus yang umum berhasil ditangani, kita pikirkan kasus-kasus selanjutnya terutama [edge-case](https://en.wikipedia.org/wiki/Edge_case) dimana bug mungkin ditemukan:

- Tes menggunakan array dengan jumlah element ganjil dan genap.
- Tes menggunakan array berisi 1 element.
- Tes menggunakan array kosong.
- Tes menggunakan array dengan elemen yang sama semua (index mana yang dikembalikan?).
- Tes dengan ukuran array sangat besar.
- Ada lagi..?

**Pelajari Lebih Jauh:**

- [Code coverage](https://en.wikipedia.org/wiki/Code_coverage) adalah metrics yang memperlihatkan sebarapa banyak kode yang kita tulis sudah memiliki testing. Pelajari konsep code coverage dan teknik untuk melihatnya (tips: pakai library, tools, atau IDE, jangan hitung manual).
- [Test driven development](https://en.wikipedia.org/wiki/Test-driven_development) adalah teknik development dimana kita membuat test terlebih dahulu sebelum membuat programnya.

## Latihan 2 - Membuat Versi Rekursif
Algoritma binary search bisa diimplementasikan secara natural dalam bentuk rekursif. 

Ide utama dari teknik rekursif adalah memanggil kembali fungsi yang sama dengan *scope* permasalahan yang lebih kecil sampai kondisi tertentu ditemukan - biasanya disebut dengan *base condition*. Bagaimana dengan binary search?

**Latihan**: 
- Implementasikan binary search secara rekursif lalu gunakan unit tests dari latihan 1 untuk memeriksa kebenarannya.
- Cara mana yang lebih mudah dipahami?
- Cari tahu dan pelajari soal [tail call optimization](https://stackoverflow.com/questions/310974/what-is-tail-call-optimization).

## Binary Search Sebagai Teknik Pemecahan Masalah
Tahukan anda kalau algoritma binary search bisa dilakukan untuk mencari jumlah cicilan yang harus dibayar per bulan? *No kidding*. Silahkan liat dan coba kerjakan [soal latihan ini](https://community.topcoder.com/stat?c=problem_statement&pm=2427&rd=4765). 

![](https://asset.kompas.com/crops/tYvXtRBHSmQ_-F-em4oKZRjWdSs=/201x0:1251x700/750x500/data/photo/2020/12/08/5fcfa34e6d44d.png)

Pesan moralnya adalah, _teknik pemecahan masalah yang sekilas memiliki ruang lingkup sangat spesifik  ternyata dapat digunakan untuk menyelesaikan masalah lain_.

Setelah mempelajari algoritma atau teknologi tertentu, coba pikirkan kira-kira dimana saja cara tersebut bisa diimplementasikan - baik yang memang terkenal atau yang *out of the box*. 

**Latihan:**  
Anda mungkin mengenal [redis](https://redis.io/) sebagai cache server. Coba pelajari bagaimana redis juga bisa digunakan sebagai [queue system](https://redis.com/ebook/part-2-core-concepts/chapter-6-application-components-in-redis/6-4-task-queues/6-4-1-first-in-first-out-queues/), [stat counter](https://redis.com/ebook/part-2-core-concepts/chapter-5-using-redis-for-application-support/5-2-counters-and-statistics/), [pub/sub](https://redis.io/docs/manual/pubsub/), [autocomplete](https://redis.com/ebook/part-2-core-concepts/chapter-6-application-components-in-redis/6-1-autocomplete/6-1-1-autocomplete-for-recent-contacts/), dan [rate limiter](https://redis.com/redis-best-practices/basic-rate-limiting/).
