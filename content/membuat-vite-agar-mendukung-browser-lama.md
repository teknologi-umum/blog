---
title: Membuat Website Yang Dibangun Menggunakan Vite Agar Mendukung Browser Lama
desc: Menambahkan plugin legacy pada vite agar hasil build mendukung browser lama
author: Bulu Kucing
github: bulukucing
telegram: abdulq32
cover: https://raw.githubusercontent.com/bulukucing/assets/main/teknum-blog/23-06-01-cover-blog-tentang-vite.jpg
date: 2022-01-01
categories:
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
Sebagian orang juga menggunakan browser dengan versi lama karena device mereka tidak mampu menjalankan browser terbaru.

Jadi agar user bisa menikmati website yang kita buat,
kita juga harus mendukung kekurangan yang ada pada device user dengan menambahkan support untuk browser lama.

## Menambahkan legacy plugins

Agar project yang kita buat bisa berjalan pada browser lama,
kita perlu menambahkan `@vitejs/plugin-legacy` pada project kita.

### Install @vitejs/plugin-legacy

Untuk menginstall `vitejs/plugin-legacy`
jalankan salah satu perintah berikut:

```bash
# Menggunakan NPM:
npm install @vitejs/plugin-legacy

# Menggunakan Yarn:
yarn add @vitejs/plugin-legacy
```

### Konfigurasi plugin

Setelah berhasil menginstall `@vitejs/plugin-legacy`
kita perlu menambahkan beberapa konfigurasi pada file `vite.config.js` yang ada pada project kita,
atau jika file tersebut tidak ada maka kalian bisa membuatnya terlebih dahulu.

```js
// vite.config.js
import legacy from "@vitejs/plugin-legacy";

export default {
    plugins: [
        legacy({
            targets: ["defaults"],
        }),
    ],
};
```

Baca dokumentasi resmi berikut untuk melihat lebih spesifik konfigurasi yang bisa diberikan:

-   [https://github.com/vitejs/vite/tree/main/packages/plugin-legacy](https://github.com/vitejs/vite/tree/main/packages/plugin-legacy)

## Mencoba hasil build

Disini saya akan melakukan uji coba
untuk memastikan apakah website yang kita buat menggunakan vite
akan tampil pada browser lama.

Saya akan menggunakan Chrome android dengan versi 55 pada uji coba ini.

![Chrome android versi 55](https://raw.githubusercontent.com/bulukucing/assets/main/teknum-blog/22-01-01-chrome-android-versi-55.jpg)

### Membuild project vite

Untuk membuild project vite kita,
jalankan salah satu perintah berikut:

```bash
# Menggunakan NPM:
npx vite build

# Menggunakan Yarn:
yarn exec vite build
```

Kalian juga bisa menggunakan npm script yang terdapat pada `package.json`

```js
  ..
  ..
  "scripts": {
    "dev": "vite",
    "build": "vite build",
    ..
  }
  ..
```

Dengan menjalankan salah satu perintah berikut:

```bash
# Menggunakan NPM:
npm run build

# Menggunakan Yarn:
yarn build
```

Hasil build akan tersimpan pada folder dist jika kita tidak mengubahnya pada konfigurasi vite.

Berikut adalah perbandingan hasil build sebelum dan sesudah menambahkan `@vitejs/plugin-legacy`:

<p align="center" style={{fontSize: "0.875em"}}>Sebelum:</p>

![hasil build vite sebelum menambahkan vite plugin legacy](https://raw.githubusercontent.com/bulukucing/assets/main/teknum-blog/21-01-01-vite-build-sebelum-menambahkan-plugin-legacy.jpg)

<p align="center" style={{fontSize: "0.875em"}}>Sesudah:</p>

![hasil build vite sesudah menambahkan vite plugin legacy](https://raw.githubusercontent.com/bulukucing/assets/main/teknum-blog/21-01-01-vite-build-sesudah-menambahkan-plugin-legacy.jpg)

Sebelum menambahkan `@vitejs/plugin-legacy` hasil build akan menggunakan
script dengan attribut module

```html
<script type="module" src="..."></script>
```

Sesudah menambahkan `@vitejs/plugin-legacy` hasil build
akan menambahkan script dengan attribut nomodule

```html
<script nomodule src="..."></script>
```

Maksudnya ?

Script dengan attribut module dan nomodule adalah bagian dari ES modules,
script dengan attribut module berarti kita mendukung `import` file dalam script tersebut,
tetapi script dengan attribut module tidak didukung oleh browser lama.

Jadi dengan menggunakan `@vitejs/plugin-legacy` kita menambahkan alternatif lain,
yaitu menggunakan script dengan attribut nomodule,
script dengan attribut nomodule ini akan mengabaikan eksekusi script modern di browser lama,
dan sebaliknya, script ini juga akan mengabaikan eksekusi script lama pada browser baru.

Baca lebih jelasnya disini:

-   [https://html.spec.whatwg.org/multipage/scripting.html#attr-script-nomodule](https://html.spec.whatwg.org/multipage/scripting.html#attr-script-nomodule)

### Melihat preview dari project yang sudah kita build

Untuk melihat preview dari hasil build project kita, jalankan salah satu perintah berikut:

```bash
# Menggunakan NPM:
npx vite preview --host

# Menggunakan Yarn:
yarn exec vite preview --host
```

Sama seperti sebelumnya,
kalian juga bisa menggunakan npm script dengan menjalankan perintah
yang terdapat pada `package.json` seperti contoh sebelumnya.

Berikut adalah tampilan website yang kita buat menggunakan vite sebelum dan sesudah menambahkan `@vitejs/plugin-legacy`:

![tampilan website yang dibuat menggunakan vite  sesudah menambahkan plugin legacy pada chrome android versi 52](https://raw.githubusercontent.com/bulukucing/assets/main/teknum-blog/22-01-01-tampilan-sblm-ssdh-menambahkan-plugin-legacy.jpg)

Terimakasih sudah membaca hingga akhir, mohon maaf bila ada kesalahan. Happy Coding:)
