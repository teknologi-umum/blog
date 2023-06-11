---
title: "Cara Membuat Image Lazyload"
desc: "Lazy load adalah salah satu cara mengoptimasi performa website dengan memuat image ketika telah berada di dalam viewport"
author: "Bakunya | medeveloper.me"
github: "bakunya"
telegram: "shuvi_chan"
cover: https://picsum.photos/500
date: 2021-10-03
categories:
    - javascript
    - intersection-observer
    - lazyload
    - image lazyload
    - optimasi
    - optimasi website
---

Lazy load adalah salah satu cara mengoptimasi performa website dengan memuat image ketika telah berada di dalam viewport

Ada banyak sekali cara untuk mengoptimasi performa sebuah website, salah satunya adalah menggunakan image lazyload. Maksudnya begini, ketika pengguna memasuki sebuah situs web, seluruh asset termasuk image akan dimuat oleh browser secara bersamaan.

Namun jika menggunakan teknik lazyload, image tidak akan dimuat seluruhnya. Hanya yang dilihat oleh pengguna saja yang akan dimuat oleh browser.

Contohnya adalah website [medeveloper.me](https://medeveloper.me/intersection-observer), coba teman-teman refresh dan perhatikan image yang ada di bawah. Gambar utama tidak akan dimuat hingga teman-teman melihatnya secara keseluruhan.

Akan tampak 2 kali perubahan image, yang pertama adalah preload image dan yang kedua adalah image utama. Ketika pertama kali halaman dimuat, hanya image preload yang akan ditampilkan dan hasilnya performa halaman web meningkat.

Atau teman-teman bisa mengecek sendiri apakah suatu website menggunakan teknik lazyload atau tidak, menggunakan browser developer tools di bagian tab network.

## Image lazyload

Tidak perlu berlama-lama lagi, kita mulai sekarang tutorial bagaimana cara membuat image lazyload.

Tapi sebelum saya mulai, teman-teman harus mengetahui lebih dahulu apa itu [Intersection Observer API](https://medeveloper.me/intersection-observer), dan sedikit HTML juga CSS.

**HTML**

Sebelum mulai menulis baris kode, kita buat directory seperti folder tree dibawah ini.

```bash
.
 ├── img
 |   ├── img-1.png
 |   ├── img-2.png
 |   ├── img-3.png
 |   ├── img-4.png
 |   ├── img-5.png
 ├── index.html
 ├── style.css
 ├── main.js
 |
```

Kemudian kita buat container dan juga tag imagenya, tapi attribute src-nya jangan ditulis dahulu karena akan kita set di kode javascript nantinya. Namun sebagai ganti attribute src, kita tulis data-src dan masukkan source image ke dalamnya.

```html
<div class="container">
    <img data-src="/img/img-1.png" />
    <img data-src="/img/img-2.png" />
    <img data-src="/img/img-3.png" />
    <img data-src="/img/img-4.png" />
    <img data-src="/img/img-5.png" />
</div>
```

## CSS

Untuk tutorial kali ini, kita cukup membuat layout dan tampilan yang sederhana terlebih dahulu. Nantinya kalian bisa utak-atik sendiri sesuai selera teman-teman.

```css
* {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
}

body {
    min-height: 100vh;
}

.container {
    display: flex;
    align-items: center;
    flex-direction: column;
    justify-content: center;
}

.container img {
    margin: 40px 0;
    width: 500px;
    height: 300px;
    background: lightblue;
    border: none;
    outline: none;
    display: block;
}
```

**JavaScript**

Dan akhirnya kita sampai di bagian javascript. Ada beberapa langkah yang harus dilakukan untuk membuat image lazyload.

Pertama kita membutuhkan target untuk diobserve oleh IntersectionObserver, dalam konteks ini adalah tag image.

```js
const elements = document.querySelectorAll("img[data-src]");
```

Yang kedua adalah options sebagai pengaturan dalam kondisi apa target harus diobservasi.

```js
const options = {
    root: null,
    rootMargin: "0px",
    threshold: 1,
};
```

Kemudian kita inisialisasi callback function, sebagai tempat logic atau untuk kita melakukan sesuatu terhadap target yang telah di observasi.

Di dalamnya, kita lakukan beberapa destructuring dan juga mengatur atrribute src yang sebelumnya tidak kita tuliskan.

Jangan lupa juga kita panggil method unobserve() supaya IntersectionObserver tidak mengobservasi kembali target yang telah diobservasi.

```js
const callback = (entries, observer) => {
    const [entry] = entries;
    const { src } = entry.target.dataset;
    if (entry.isIntersecting) {
        entry.target.setAttribute("src", src);
        observer.unobserve(entry.target);
    }
};
```

Setelah itu, kita instansiasi constructor IntersectionObserver() dan meneruskan callback juga options yang telah dibuat sebelumnya.

```js
const lazyload = new IntersectionObserver(callback, options);
```

Karena element kembalian dari querySelectorAll adalah html collection, maka kita perlu melakukan pengulangan. Dan akhirnya kita panggil method observe() dan masukkan target untuk di observasi.

```js
elements.forEach((elm) => lazyload.observe(elm));
```

## Full code

Untuk mempersingkat halaman, disini saya menggunakan satu file HTML.

```html
<html lang="en">
    <head>
        <meta charset="UTF-8" />
        <meta http-equiv="X-UA-Compatible" content="IE=edge" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <style>
            * {
                margin: 0;
                padding: 0;
                box-sizing: border-box;
            }

            body {
                min-height: 100vh;
            }

            .container {
                display: flex;
                align-items: center;
                flex-direction: column;
                justify-content: center;
            }

            .container img {
                margin: 40px 0;
                width: 500px;
                height: 300px;
                background: lightblue;
                border: none;
                outline: none;
                display: block;
            }
        </style>
        <title>Lazy Load</title>
    </head>
    <body>
        <div class="container">
            <img data-src="/img/img-1.png" />
            <img data-src="/img/img-2.png" />
            <img data-src="/img/img-3.png" />
            <img data-src="/img/img-4.png" />
            <img data-src="/img/img-5.png" />
        </div>

        <script>
            const elements = document.querySelectorAll("img[data-src]");
            const options = {
                root: null,
                rootMargin: "0px",
                threshold: 1,
            };
            const callback = (entries, observer) => {
                const [entry] = entries;
                const { src } = entry.target.dataset;
                if (entry.isIntersecting) {
                    entry.target.setAttribute("src", src);
                    observer.unobserve(entry.target);
                }
            };

            const lazyload = new IntersectionObserver(callback, options);

            elements.forEach((elm) => lazyload.observe(elm));
        </script>
    </body>
</html>
```

## Akhir kata

Jadi begitulah cara membuat lazyload image sebagai optimasi performa website. Bagaimana, mudah bukan?

Sekarang teman-teman bisa mulai menggunakan lazyload dalam halaman website teman-teman buat.

Terimakasih telah membaca hingga bagian akhir.
