---
title: Setup Ubuntu Linux for Laravel & Go Developer
desc: Linux is 🤍, so i made this one with 🤍 of Linux.
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

setelah sempat pensiun jadi pengguna punguin (Linux), akhirnya dari sekitar dua minggu yang lalu saya kembali memakai full linux untuk proses project development saya. Nah, maka dari itu untuk kali ini saya akan mencoba membagikan beberapa tips untuk setup Linux bagi para Laravel Developer. Oiya untuk distro Linux yang pakai adalah Ubuntu Linux versi 18.04 LTS.

# PHP

Pertama install php beserta extension-ekstensionnya (disini saya menggunakan php versi 7.4)

```bash
sudo apt update
sudo apt install php7.4
sudo apt install php7.4-common php7.4-mysql php7.4-xml php7.4-xmlrpc php7.4-curl php7.4-gd php7.4-imagick php7.4-cli php7.4-dev php7.4-imap php7.4-mbstring php7.4-opcache php7.4-soap php7.4-zip php7.4-intl -y
```

# Composer

Kemudian pasang composer,

```bash
php -r "copy('https://getcomposer.org/installer', 'composer-setup.php');"
php -r "if (hash_file('sha384', 'composer-setup.php') === '906a84df04cea2aa72f40b5f787e49f22d4c2f19492ac310e8cba5b96ac8b64115ac402c8cd292b8a03482574915d1a8') { echo 'Installer verified'; } else { echo 'Installer corrupt'; unlink('composer-setup.php'); } echo PHP_EOL;"
php composer-setup.php
php -r "unlink('composer-setup.php');"
```

setelah proses diatas sudah dijalankan satu-persatu, kemudian pindahkan composer.phar ke direktori PATH.

```bash
sudo mv composer.phar /usr/local/bin/composer
```

#
