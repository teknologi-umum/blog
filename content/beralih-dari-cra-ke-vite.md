---
title: Beralih dari C-R-A ke Vite
desc: Vite adalah sebuah Frontend Tooling yange cepat, mari menggunakan Vite untuk aplikasi React daripada create-react-app.
author: Rizki Maulana Citra
github: rizkimcitra
twitter: rizkimcitra
telegram:
date: 2021-08-31
categories:
  - react
  - vite
  - tutorial
---

React adalah sebuah JavaScript Library untuk membangun Antarmuka Pengguna, React hadir dengan memberikan banyak fitur yang keren buat Developer seperti _[JSX](https://reactjs.org/docs/introducing-jsx.html)_ dan _[Virtual DOM](https://reactjs.org/docs/faq-internals.html#what-is-the-virtual-dom)_ untuk mempermudah Developer dalam mengembangkan sebuah aplikasi.

Namun ketika aplikasi yang sedang dibangun menjadi lebih kompleks dan lebih besar, penurunan performa pada saat pengembangan pun akan terasa, disinilah para Developer butuh tools yang lebih cepat, Vite adalah salah satu solusinya.

## Apa itu Vite?

Vite _("Cepat" dalam bahasa Prancis)_ adalah sebuah _Frontend tooling_ atau bisa juga disebut sebuah _build tools_ yang dibangun diatas ESBuild.

Vite dibuat untuk memenuhi pengalaman pengembangan projek website modern yang cepat, ada 2 fitur utama yang Vite berikan:

1. Development server yang menyediakan peningkatan fitur yang kaya atas ES Native, contohnya HMR atau _Hot Module Replacement_ yang sangat cepat.
2. Bundle kode dengan _[Rollup](https://rollupjs.org/)_, yang telah dikonfigurasi sebelumnya untuk menghasilkan aset statis yang sangat dioptimalkan untuk produksi.

Kunjungi _[website resmi Vite](https://vitejs.dev/)_ untuk mempelajari Vite lebih lanjut.

## Kenapa Vite?

Ketika hendak membuat sebuah aplikasi dengan React, biasanya kamu akan menggunakan tool atau perintah `npx create-react-app` pada terminal, karena nantinya kamu akan mendapatkan template yang sudah diberikan oleh React agar mempermudah dalam mengembangkan aplikasi React.

Namun, tidak jarang kamu akan mengalami proses instalasi yang sedikit lama meskipun koneksi internet kamu tidak ada kendala, dengan menginstall React menggunakan Vite, proses instalasi akan terasa lebih cepat, penasaran? mari lanjutkan pembahasannya.

## Membandingkan CRA dengan Vite

Mari kita bandingan untuk proses instalasi React dengan create-react-app dan Vite.

![proses instalasi dengan CRA](https://ik.imagekit.io/mlnzyx/cra-to-vite/npx-cra-example-2_3M2wHL_TP.png?updatedAt=1633024384848)

Pada tangkapan layar diatas, saya menginstall React dengan perintah _C-R-A_, dan waktu yang dibutuhkan untuk menginstall React dengan _C-R-A_ membutuhkan kurang lebih 2 menit untuk selesai, selanjutnya, mari install React dengan menggunakan cli dari Vite.

![proses instalasi dengan Vite](https://ik.imagekit.io/mlnzyx/cra-to-vite/npm-vite-react-2_AJsi_gp5lfl.png?updatedAt=1633024961587)

Pada tangkapan layar diatas, Vite hanya akan memberikan sebuah template dan atau struktur folder saja, disini kamu belum menginstall apa-apa, maka selanjutnya masuk ke direktorinya dan ketikkan `npm install` pada terminal untuk menginstall react dengan Vite.

![proses instalasi dengan Vite](https://ik.imagekit.io/mlnzyx/cra-to-vite/npm-vite-react-3_U5sgeRyFPg.png?updatedAt=1633024962539)

Lihat betapa cepatnya proses instalasi React dengan Vite, hanya membutuhkan waktu kurang lebih 30 detik untuk proses instalasi selesai, lalu ketika kamu mencoba menjalankan Dev Server, kamu akan merasakan betapa cepatnya kodemu untuk tercompile oleh Vite.

## Haruskah menggunakan Vite?

Tools _C-R-A_ memberikan template yang sudah disusun oleh tim React sedemikian mungkin, tools tersebut memberikan kamu banyak package yang sekiranya kamu butuhkan, walaupun kamu sendiri tidak akan menggunakannya seperti _[Testing Library](https://testing-library.com/docs/react-testing-library/intro)_, dan mungkin masih ada banyak packages yang terinstall didalam folder _node_modules_ yang juga tidak akan kamu gunakan, kamu bisa melihat package apa saja yang terinstall dengan menggunakan tools _C-R-A_ pada file `package.json`.

Beda halnya dengan menginstall React menggunakan Vite, kamu hanya akan mendapatkan 4 packages, yaitu React, ReactDOM, dan Vite itu sendiri.

Ada informasi tambahan, ketika kamu menggunakan _[Tailwind CSS](https://tailwindcss.com)_ dengan aplikasi React yang kamu install menggunakan _C-R-A_, maka kamu harus menginstall dan mengkonfigurasi _[Craco](https://github.com/gsoft-inc/craco)_ agar dapat menggunakan Tailwind itu sendiri, sedangkan jika aplikasi React yang kamu install dengan Vite, kamu tidak perlu menginstall dan mengkonfigurasi Craco agar dapat menggunakan Talwind CSS.
