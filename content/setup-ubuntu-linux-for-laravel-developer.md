---
title: Setup Ubuntu Linux for Laravel & Go Developer
desc: Linux is 🤝, so I made this one with 🧑🏾‍💻.
author: Wahidin Aji
github: WahidinAji
twitter: a17wahidin
telegram:
cover: image/pinguin.png
date: 2022-01-05
categories:
  - laravel
  - tips
  - ubuntu
---

Setelah sempat pensiun jadi pengguna penguin (Linux), akhirnya sejak sekitar dua minggu yang lalu saya kembali menggunakan Linux secara penuh untuk proses project development saya. Nah, maka dari itu untuk kali ini saya akan mencoba membagikan beberapa tips untuk setup Linux bagi para Laravel Developer. Oiya untuk distro Linux yang saya pakai adalah Ubuntu Linux versi 18.04 LTS.

# PHP

Pertama, install PHP beserta ekstensi-ekstensinya (disini saya menggunakan PHP versi 7.4)

```bash
sudo apt update
sudo apt install php7.4
sudo apt install php7.4-common php7.4-mysql php7.4-xml php7.4-xmlrpc php7.4-curl php7.4-gd php7.4-imagick php7.4-cli php7.4-dev php7.4-imap php7.4-mbstring php7.4-opcache php7.4-soap php7.4-zip php7.4-intl -y
```

# Composer

Kemudian pasang composer

```bash
php -r "copy('https://getcomposer.org/installer', 'composer-setup.php');"
php -r "if (hash_file('sha384', 'composer-setup.php') === '906a84df04cea2aa72f40b5f787e49f22d4c2f19492ac310e8cba5b96ac8b64115ac402c8cd292b8a03482574915d1a8') { echo 'Installer verified'; } else { echo 'Installer corrupt'; unlink('composer-setup.php'); } echo PHP_EOL;"
php composer-setup.php
php -r "unlink('composer-setup.php');"
```

Setelah proses diatas sudah dijalankan satu per satu, pindahkan composer.phar ke direktori PATH.

```bash
sudo mv composer.phar /usr/local/bin/composer
```

# Node.js

Kita perlu memasang Node.js untuk memasang NPM (Node Package Manager), caranya pun cukup mudah. Jalankan perintah di bawah ini satu per satu:

```bash
curl -sL https://deb.nodesource.com/setup_17.x -o nodesource_setup.sh
sudo bash nodesource_setup.sh
sudo apt install nodejs
```

Untuk version pada `https://deb.nodesource.com/setup_17.x`, ini opsional ya. Kalian bisa menyesuaikan sesuai dengan kebutuhan.

# MySQL

Nah, untuk MySQL ini kalian sebenarnya tidak perlu bingung. Cukup buka link ini

- [`MySQL Downloads`](https://dev.mysql.com/downloads/mysql/),

Download MySQL-nya dan sesuaikan dengan Distro OS Linux kalian. Kemudian ikuti langkah-langkahnya seperti yang ada di dokumentasi ini

- [`Cara Install`](https://dev.mysql.com/doc/refman/8.0/en/linux-installation-debian.html).

Lohhh, kok ke dokumentasi? Ya sekalian belajar baca-baca dokumentasinya juga hehehe :). Belajar dari yang mudah untuk diikuti terlebih dahulu aja okay ^~^.

Untuk MySQL Client nya sendiri, saya menggunakan ekstensi Database yang ada di Visual Studio Code. Jadi, saya ga perlu install PHPMyAdmin, MySQL Client, atau sejenisnya.

Oiya, disini saya tidak menggunakan Web Server ya. Karena Laravel sendiri sudah menyediakannya dengan cara menjalankan command `php artisan serve`.

Sip, selanjutnya kita install Go untuk kebutuhan kalau kita pengen ngoding Go.

# Go

Sebenarnya, langkahnya cukup mudah. Pertama [Download Go disini](https://go.dev/doc/install), setelah itu jalankan perintah dibawah ini satu per satu

```bash
rm -rf /usr/local/go && tar -C /usr/local -xzf go1.17.6.linux-amd64.tar.gz
export PATH=$PATH:/usr/local/go/bin
```

Untuk catatan, terkadang `PATH` ini tidak bersifat permanen ya. Apalagi kalau kalian menggunakan `ZSH` sebagai default terminal kalian di Linux. Kalian perlu menambahkan konfigurasi export-nya secara manual dengan cara,

```bash
sudo nano ~/.zshrc
```

Atau jika kalian menggunakan default terminal seperti Bash, yang kebetulan menjadi default terminal di Linux Ubuntu yang saya pakai. Kalian cukup mengganti nama filenya sesuai dengan nama file konfigurasi default terminal kalian. kalau kalian tidak tahu nama file-nya, kalian bisa memeriksanya terlebih dahulu dengan command,

```bash
ls -a ~/
```

Setelah susah memastikan nama file konfigurasi default terminal kalian, kemudian tambahkan kode bash seperti dibawah ini, jangan lupa disimpan ya.

```bash
export PATH=$PATH:/usr/local/go/bin
```

Udah deh, tinggal cek. Apakah sudah terpasang atau belum dengan command

```bash
go version
```

# PostgreSQL

Yapss. karena kebanyakan Go Developer lebih suka menggunakan PostgreSQL dari pada MySQL, maka kita akan install juga. Caranya ini cukup mudah. Cukup ikuti langkah-langkahnya seperti yang ada di dokumentasi resmi ini.

- [Cara Install PostgreSQL](https://www.postgresql.org/download/linux/ubuntu/)

Kalau sudah, untuk PostgreSQL Clientnya sendiri, saya juga menggunakan ekstensi yang ada di Visual Studio Code / GoLand.

`kalian : boleh minta link ekstensinya ga om?`

`saya : boleh, tapi enggak dibahas disini ya, 😁😁😁.`

Kenapa beberapa langkah saya arahkan ke dokumentasi langsung? ya sambil belajar baca dokumentasi dikit-dikitlah ya, supaya enggak terjebak di tutorial hell mhehehe :)

Okay cukup sekian,

What's next? if you have some req tips. reach me on twitter [@a17wahidin](https://twitter.com/a17wahidin)

```bash
PHP IS STILL ALIVE.
BUT GO IS WHAT MAKES ME HAPPY TO CODE 😆.
```
