---
title: Tentang Belajar Pemrograman
desc: Sebuah rayuan kurang saintifik yang membelai kamu tentang programming
author: Airavata
github: artileda
twitter:
telegram: mikrofon_pelunas_hutang
date: 2021-09-26
categories:
  - Pengantar Teknologi Informasi
---

Halo, Jomblo. Sudah mencium kening pacar virtual kamu dan melatih model arsitektur RNN suara waifu tercintamu hari ini.

Berpikir tanpa bahasa bisa dibilang suatu hal yang sulit dibayangkan (Baca: 1984, Orwel. G), dari bangun tidur hingga tidur lagi tidak lepas dari penggunaan bahasa. Bahasa selain alat untuk komunikasi merupakan instrumen pikiran untuk menyimpan, mendefinisikan dan memahami buah pikiran manusia. Manusia dan komputer memiliki kesamaan pada titik ini.

Namun apakah yang manusia lakukan bisa komputer lakukan ?

## Apa itu Pemrograman

Pemrograman merupakan cara kita untuk melatih komputer untuk melakukan pekerjaan. Komputer tidak bisa kita minta untuk mengejar kucing yang mencuri ikan peliharan kita tetapi komputer mampu membantu kita untuk melakukan perhitungan seperti satu tambah satu, rumus pitagoras dan semacamnya. Lantas, pekerjaan apa yang bisa dilakukan oleh komputer kalau manusia juga bisa menghitung ?

Manusia bisa menghitung namun lamban laun kemampuan manusia menurun seiring besar dan lamanya perhitungan yang dihadapi sedangkan komputer tidak. Maka dari itu kita bisa mengajarkan komputer untuk melakukan perhitungan yang lebih besar seperti mengolah informasi dari pakar, menjadwalkan status transaksi dan semacamnya. Sudah tidak hanya operasi satu tambah satu biasa tetapi formula yang menjadi alat bagi kehidupan manusia.

## Bahasa Pemrograman sebagai instrumen transfer pikiran

Komputer adalah mesin "bodoh" bila tak ada program didalamnya, hanya sebuah layar hitam dengan suara dan kerlap kerlip lampu yang tak berarti. Maka komputer harus diajarkan bagaimana caranya berperilaku. Perilaku komputer ditentukan oleh perubahan status pada transistor CPU (_Central Proccesing Unit_) yang mengambarkan suatu kondisi, sayangnya komputer hanya mengerti 0 dan 1 tentu ini bukan bahasa yang cukup manusiawi untuk dimengerti oleh manusia.

Bahasa pemrograman adalah solusinya, bahasa penengah untuk menghubungkan manusia dan komputer untuk bertukar pikiran. Program merupakan kumpulan perintah komputer untuk melakukan perkerjaan, program ini akan memberikan definisi sebuah prilaku untuk komputer bertindak. Demikian dengan memrogram kita bisa melatih komputer untuk bertindak dan menindak interaksi yang diberikan kepadanya.

Kerlap kerlip dan layar hitam berubah menunjukan sesuatu yang berarti kelayar kita, dengan bantuan program bernama sistem operasi komputer kita bisa menggunakan komputer dengan mudah dan juga membuat program dengan mudah tidak serepot komputer generasi pertamanya yang harus colok kabel dan mengubah transistor manual.

```shell
$ UwU
```

Bahasa pemrograman berasal dari potongan bahasa inggris yang menjadi kata kunci bahasa berasal dari bahasa inggris, tentu ini merupakan suatu hal yang perlu diketahui saat belajar pemrograman. Terjemahkan kata kunci ke bahasa indonesia untuk mendapatkan konteks makna dari kata kunci bahasa pemrograman.

Berikut perbandingan antara bahasa manusia dengan bahasa pemrograman :

- Bahasa Inggris
  ```shell
  Computer show my name
  ```
- Bahasa Pemrograman
  ```javascript
  console.log(yourName);
  ```

Saat memrogram kita perlu memberikan arahan dan informasi yang jelas dari perintah kita, yang tidak jelas dari contoh diatas : Program tidak tau yourName itu sebuah nilai apa.

Maka perlu kita ubah dengan nama kita dalam bentuk yang dimengerti komputer, nilai ini`"UwU"` sebagai contoh.

```javascript
console.log('UwU');
```

## Paradigma sebagai kunci

Kita tidak bisa langsung "menyodorkan" pemikiran kita ke komputer, ide tersebut perlu dipoles agar muat kedalam program. Maka kita perlu sebuah arahan untuk menyusun ide kita agar muat kedalam program yang disebut dengan Paradigma Pemrograman.

Paradigma pemrograman mengatur kita untuk menuliskan kode program yang menwakili pemikiran kita, contoh sepert ini:

- Paradigma Imperatif

  ```javascript
  var nama;

  tulisNama(){
    console.log(nama)
  }

  nama = "UwU"
  tulisNama() // UwU
  nama = "Reine"
  tulisNama() // Reine
  ```

- Paradigma Fungsional

  ```javascript
  tulisNama(nama){
    console.log(nama)
  }

  tulisNama("UwU") // UwU
  tulisNama("Reine") // Reine
  ```

  Contoh diatas kita melihat bahwa paradigma imperatif lebih cenderung melakukan perubahan nilai sedengkan paradigma fungsional lebih cendrung memanggil fungsi, dari kedua contoh ini menghasilkan bentuk kode yang tidak jauh berbeda namun memerlukan cara berpikir yang berbeda untuk menghasilkan kode demikian.

## Program sebagai ekosistem pikiran

Program merupakan perwakilan pemikiran kita dalam komputer, baik mewakili pemikiran yang diharapkan dan yang tidak diinginkan. Mari kita beri nama pemikiran ini _feature_ dan _bugs_, _feature_ adalah sebuah perilaku program yang kita ingin untuk komputer hasilkan sedangkan bugs adalah perilaku program yang tidak kita inginkan.

_feature_ dan _bugs_ ini sering kita temukan ketika kita mengembangkan atau menggunakan program pada komputer contoh saat kita membuka website pada browser kita bisa melihat sebuah tampilan berisi informasi yang kita ingin cari namun terkadang browser berhenti tanpa diminta atau ada perilaku pada web yang tidak berkerja ketika diberi interaksi.

> Program written with 2 behaivour : an expected and unwanted -- Alan J. Perlis

## Manusia sebagai komputer sejati

Manusia membuat komputer untuk memenuhi kebutuhanya dalam perhitungan, namun manusia juga bisa melakukan perhitungan seperti komputer. Tatkala manusia juga bisa disebut komputer karena bisa melakukan perhitungan, komputer yang membuat komputer diluar dirinya.

Kita mungkin sadar banyak dampak yang dihasilkan oleh komputer seperti kemudahan dalam memproses informasi dan perhitungan yang rumit, namun apakah kita sadar bahwa ketika kita memrogram komputer kita juga sebenarnya sedang diprogram oleh komputer untuk berpikir mengikuti caranya ?

Pemrograman memang memiliki dampak yaitu eksternal dan internal pada diri kita. Dampak eksternal kita bisa membuat solusi dari masalah penghitungan rumit, kedua secara tidak langsung apa yang perlu kita tulis di komputer perlu jelas digambarkan ini juga melatih kemampuan kognitif dan ingatan kita dalam pengenalan pola serta penyelesaian masalah.

> A language that doesn't affect the way you think about programming, is not worth knowing -- Alan J. Perlis

### Referensi:

- Liem, I. 2008. Diktat Kuliah Dasar Pemrograman : Pemrograman Fungsional. ITB.
- [What is Programming Language ?](https://hackr.io/blog/what-is-programming-language)
- [What is Programming ?](https://hackr.io/blog/what-is-programming)
