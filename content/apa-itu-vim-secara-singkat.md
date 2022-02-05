---
title: Apa Itu Vim Secara Singkat
desc: aplikasi text editor berada di terminal yaitu vim dengan penggunaan dan konfigurasi tersendiri
author: afman42
github: afman42
telegram: afman42
date: 2022-02-04
cover: https://1.bp.blogspot.com/-gl_s6BL9y34/XVeO7mNRChI/AAAAAAAABEI/wQ554bkHgs41eGC-1Ni-xmOPrm4n6ajWACLcBGAs/s1600/Vim_logo.png
categories:
  - vim
---

# Apa Itu Vim Secara Singkat

Vim dikenal text editor di terminal dengan distribusi di sistem operasi windows,macos,dan linux. Aplikasi nya ringan dengan sekitar `~10mb` dan website nya pun belum berubah. Apakah vim powerfull untuk digunakan ? ya tergantung pengguna / pemakai bisa dijadikan IDE (Integration Development Environment). Vim ada dua versi tampilan yaitu tampilan Grafis atau tampilan terminal

## Unduh Aplikasi [Vim](https://www.vim.org/download.php)

- Windows: seperti biasa di klik website
- Linux: distribusi linux biasanya menggunakan terminal, seperti ubuntu: `sudo apt update && sudo apt install vim`
- Macos: bisa menggunakan unduh aplikasi atau pun mengetik di terminal

## Pengoperasian atau Penggunaanya

Ketika berada di aplikasi terminal dan sudah menginstal vim, bisa mengetik `vim` lalu `enter`

```bash
$ vim file.txt
```

dan jika sudah berada vim, dengan mengetik apapun tidak memunculkan sesuatu kecuali keymap udah di setting vim muncul.Ada beberapa Mode yaitu Normal Mode,Insert Mode, Visual Mode.lalu mengetikan `i` maka masuk insert mode dan beberapa huruf.

```
Ini Sangat Inda[h]
```

dan mau kembali normal mode harus ketik `esc`. dan lalu menggerakan cursor yang bentuk kotak.ketik `h` maka mengarahkan ke `[a]`.

```
Ini Sangat Ind[a]h
```

copy satu baris maka diperlukan `yy` dan jika paste diperlukan `p`. untuk menyimpan atau save file maka perlu `Shift+:` dan `w` atau pun dari keluar vim bisa menggunkan `:q`

# Penutup

Ini hanya sebatas penjelasan singkat dari saya. untuk cara kustomisasi bisa dicari internet dan penggunaan aplikasi vim di `vimtutor`. Berbagi pengetahuan itu sangat bagus karena bisa jadi apa yang kita bermanfaat bagi orang lain.
