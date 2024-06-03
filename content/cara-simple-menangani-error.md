---
title: Cara simple menangani error
desc: Menangani error dengan mudah dan cepat tanpa perlu chatgpt atau AI lainnya.
author: Wahidin Aji
github: WahidinAji
twitter:
telegram:
cover: /image/cara-simple-menangani-error/error-banner.png
date: 2024-06-03
categories:
    - tutorial
    - error
    - chatgpt
---

Error adalah hal yang paling sering terjadi ketika kita sedang melakukan pengembangan aplikasi. Terkadang error tersebut membuat kita merasa frustasi dan tidak tahu harus bagaimana. Ada beberapa cara yang bisa kita lakukan untuk menangani error tersebut, salah satunya adalah dengan menggunakan chatgpt atau AI lainnya. Namun, cara tersebut terkadang membutuhkan waktu yang lama dan tidak efisien.
Atau malah membuat kita jadi ketergantungan akan AI? Maka dari itu, saya akan memberikan cara simple untuk menangani error tanpa perlu menggunakan chatgpt atau AI lainnya.

## 1 **BACA ERRORNYA**

    Ketika error terjadi, hal pertama yang harus kita lakukan adalah membaca error tersebut. Error tersebut biasanya akan memberikan informasi yang cukup jelas tentang apa yang terjadi. Dengan membaca error tersebut, kita bisa mengetahui apa yang menyebabkan error tersebut dan bagaimana cara menanganinya.

    Sebagai contoh, saya ada opsi untuk memperbaharui version pnpm saya.

    ![update availabel](/image/cara-simple-menangani-error/update-available.png)

    Saya coba lihat dulu versi dari pnpm yang sudah terpasang dengan perintah
    ```bash
    pnpm --version
    ```
    Hasilnya pnpm saya memakai versi 6.16.1

    ![pnpm version yang lama](/image/cara-simple-menangani-error/pnpm-version-old.png)

    Di saya mengalami error ketika ingin memperbaharui version pnpm saya seperti ini:

    ![error](/image/cara-simple-menangani-error/error.png)

    Di situ dijelaskan errornya apa, yaitu

    ```bash
    ERR_PNPM_NO_GLOBAL_BIN_DIR  Unable to find the global bin directory.
    ```

    Sip, error sudah terbaca. Kalau tidak tahu artinya, bisa ditranslate di Google Translate atau dicari di search engine.

## 2 **CARA MENANGANINYA**

    Nah, dari error yang sudah dilampirkan, terdapat seruan untuk dilakukan supaya error-nya bisa diselesaikan. Yaitu,
    ```bash
    Run "pnpm setup" to create it automatically, or set the global-bin-dir setting, or the PNPM_HOME env variable. The global bin directory should be in the PATH.
    ```
    Kita coba dengan perintah `pnpm setup` untuk menyelesaikan error tersebut.
    ```bash
    pnpm setup
    ```

    Setelah itu akan keluar keterangan seperti di bawah ini

    ![setup pnpm](/image/cara-simple-menangani-error/pnpm-setup.png)

    Nah, setelah itu muncul lagi perintah
    ```bash
    To start using pnpm, run:
    source /Users/wahidinaji/.zshrc
    ```
    Mari kita ikuti perintahnya dengan menjalankan perintahnya di terminal.
    ```bash
    source /Users/wahidinaji/.zshrc
    ```

    Kemudian setelah itu, akan muncul seperti ini

    ![source zshrc](/image/cara-simple-menangani-error/source-zshrc.png)

    Sip, error sudah selesai. Sekarang kita coba lagi perintah `pnpm --version` untuk melihat versi pnpm kita.

    ![pnpm version yang baru](/image/cara-simple-menangani-error/pnpm-version-new.png)

    SIP, ALL CLEAR YA!

## 3 **KESIMPULAN**

    Dengan membaca error dan mengetahui cara menanganinya, kita bisa menyelesaikan error tersebut dengan cepat dan efisien. Kita tidak perlu bergantung pada chatgpt atau AI lainnya untuk menyelesaikan error tersebut. Dengan cara simple ini, kita bisa menyelesaikan error tersebut dengan mudah dan cepat.
    Jadi, jangan takut ketika error terjadi. Coba baca errornya dan cari tahu cara menanganinya. Siapa tahu, error tersebut bisa diselesaikan dengan cara yang sangat simple. Oh iya, biasanya error juga bisa diselesaikan dengan cepat dengan kita membaca dokumentasi resmi dari apa yang kita gunakan.

    Ada sebuah lelucon yang menggambarkan tentang error ketika kita sedang memprogram,

    <blockquote class="twitter-tweet"><p lang="en" dir="ltr">6 hours of debugging can save you 5 minutes of reading documentation <a href="https://twitter.com/hashtag/devlife?src=hash&amp;ref_src=twsrc%5Etfw">#devlife</a> <a href="https://twitter.com/hashtag/programmers?src=hash&amp;ref_src=twsrc%5Etfw">#programmers</a> <a href="https://t.co/kjBeuekOFG">pic.twitter.com/kjBeuekOFG</a></p>&mdash; El Bruno 🇨🇦 💙 💜 🎗️ (@elbruno) <a href="https://twitter.com/elbruno/status/1396176506334941186?ref_src=twsrc%5Etfw">May 22, 2021</a></blockquote> <script async src="https://platform.twitter.com/widgets.js" charset="utf-8"></script>

    Semoga artikel ini bermanfaat dan bisa membantu teman-teman dalam menangani error. Jika ada pertanyaan atau saran, silahkan tulis di kolom komentar. Terima kasih.
