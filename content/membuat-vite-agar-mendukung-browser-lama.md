---
title: Membuat Website Yang Dibangun Menggunakan Vite Agar Mendukung Browser Lama
desc: menambahkan plugin legacy pada vite agar hasil build mendukung browser lama
author: Bulu Kucing
github: bulukucing
telegram: abdulqirom323
date: 2022-01-01
categories:
  - javascript
  - tutorial
  - vite
---

Vite menggunakan native **ES modules** untuk membuat proses development lebih cepat,
akan tetapi tidak semua browser mendukung fitur tersebut,
hanya beberapa browser atau browser dengan versi terbaru yang mendukungnya.

## Mengapa kita perlu mendukung browser lama?

Tidak semua orang menggunakan browser versi terbaru,
sebagian orang menggunakan browser yang tidak diupgrade
dikarenakan sistem komputer yang tidak mendukung.
Sebagian orang juga menggunakan browser versi lama karena device mereka tidak mampu menjalankan browser terbaru.

Jadi agar user bisa menikmati website yang kita buat,
kita juga harus mendukung kekurangan yang ada pada device user dengan menambahkan support untuk browser lama.

## Menambahkan legacy plugins

Agar project yang kita buat bisa berjalan pada browser lama,
kita perlu menambahkan `@vitejs/plugin-legacy` pada project kita.

### Install @vitejs/plugin-legacy

Menggunakan NPM:

```bash
npm install @vitejs/plugin-legacy
```

Menggunakan Yarn:

```bash
yarn add @vitejs/plugin-legacy
```

### Konfigurasi plugin

Setelah berhasil menginstall `@vitejs/plugin-legacy`
kita perlu menambahkan beberapa konfigurasi pada file `vite.config.js` yang ada pada project kita,
atau jika file tersebut tidak ada, kalian bisa membuatnya.

```js
// vite.config.js
import legacy from '@vitejs/plugin-legacy';

export default {
  plugins: [
    legacy({
      targets: ['defaults'],
    }),
  ],
};
```

Baca dokumentasi resmi berikut untuk melihat lebih spesifik konfigurasi yang bisa diberikan:

- https://github.com/vitejs/vite/tree/main/packages/plugin-legacy
