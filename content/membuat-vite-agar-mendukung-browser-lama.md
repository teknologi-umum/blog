---
title: Membuat Vite Agar Mendukung Browser Lama
desc: menambahkan plugin lagacy pada vite agar mendukung browser lama
author: Bulu Kucing
github: bulukucing
telegram: abdulqirom323
date: 2022-01-01
categories:
  - javascript
  - tutorial
  - vite
---

Vite menggunakan **ES modules** agar membuat proses development lebih cepat,
akan tetapi tidak semua browser mendukung fitur tersebut,
hanya beberapa browser atau browser dengan versi terbaru yang mendukung.

## Menambahkan lagacy plugins

Agar project yang kita buat bisa berjalan pada browser lama,

kita perlu menambahkan `@vitejs/plugin-legacy` pada project kita,

### Install @vitejs/plugin-legacy

menggunakan npm:

```sh
npm install @vitejs/plugin-lagacy
```

atau jika menggunakan yarn:

```sh
yarn add @vitejs/plugin-lagacy
```

### Konfigurasi plugin

setelah berhasil menginstall `@vitejs/plugin-lagacy`

kita perlu
menambahkan beberapa konfigurasi pada file `vite.config.js` yang ada pada project kita,

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

## Mengapa kita perlu ?

Tidak semua orang menggunakan browser versi terbaru,
sebagian orang menggunakan browser yang tidak diupgrade,
dikarenakan sistem komputer yang tidak mendukung.
Sebagian orang lagi menggunakan browser dengan versi lawas. karena device orang tersebut tidak mampu mengangkat browser tersebut,

Jadi agar user bisa menikmati browser yang kita buat,
kita juga harus mendukung kekurangan yang ada pada device user dengan menambahkan support untuk browser lama.

_happy end :)_
