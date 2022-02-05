---
title: Apa Itu Vim Secara Singkat
desc: Text editor yang berada di terminal dengan cara penggunaan dan konfigurasi yang cukup berbeda dari text editor lainnya
author: afman42
github: afman42
telegram: afman42
date: 2022-02-04
cover: https://upload.wikimedia.org/wikipedia/commons/thumb/9/9f/Vimlogo.svg/544px-Vimlogo.svg.png
categories:
  - vim
---

# Apa Itu Vim Secara Singkat

Vim dikenal sebagai text editor yang dapat berjalan pada sistem operasi Windows, MacOS, Linux, [dan lain sebagainya](<https://en.wikipedia.org/wiki/Vim_(text_editor)#Availability>). Aplikasi ini relatif ringan dibandingkan text editor lainnya. Apakah Vim powerful untuk digunakan? Hal ini sangat bergantung pada penggunanya. Vim dapat dijadikan sebagai Integrated Development Environment (IDE) atau sebatas Text Editor sederhana. Vim memiliki dua jenis tampilan yaitu Graphical User Interface (GUI) atau Terminal User Interface (TUI)

## Instalasi Vim

Terdapat beberapa cara untuk memasang Vim pada mesin kalian.

- Windows
  Kalian dapat mengunduh Vim melalui [website resminya](https://www.vim.org/download.php) lalu memasangnya seperti biasa. Kalian bisa juga menggunakan package manager seperti [chocolatey](https://community.chocolatey.org/packages/vim) atau [winget](https://winget.run/pkg/vim/vim)
- Linux
  Kalian dapat menggunakan package manager yang sudah tersedia pada distribusi masing masing. Biasanya Vim sudah terpasang secara _default_, namun apabila tidak ada, kalian dapat memasangnya dengan cara seperti ini:
  ```bash
  # ubuntu / debian / distribusi lain yang menggunakan apt
  sudo apt install vim

  # arch / manjaro / distribusi lain yang menggunakan pacman
  sudo pacman -S vim

  # fedora / distribusi lain yang menggunakan dnf
  sudo dnf install vim
  ```
- Mac OS
  Kalian dapat mengunduhnya melalui [website resmi Vim](https://www.vim.org/download.php)) atau menggunakan package manager yang ada pada Mac OS seperti [Homebrew](https://brew.sh/)

## Pengoperasian atau Penggunaanya

Ketika kalian berada di dalam terminal emulator dan sudah memasang Vim, kalian bisa langsung mengetik `vim` lalu tekan tombol <kbd>enter</kbd> untuk membukanya.

```bash
$ vim file.txt
```

Jika kalian sudah berada di dalam Vim, kalian akan sadar bahwa apabila kalian mulai mengetik, tidak ada huruf yang keluar seperti layaknya text editor biasanya. Vim menggunakan prinsip _Modal Editing_ yang berarti Vim memiliki beberapa _mode_ untuk melakukan text editing. Beberapa diantaranya yaitu Normal, Insert, Visual, [dan masih banyak lagi](http://vimdoc.sourceforge.net/htmldoc/intro.html#vim-modes-intro). Untuk masuk ke dalam Insert Mode, kalian bisa menekan <kbd>i</kbd> yang berarti _insert_ atau <kbd>a</kbd> yang berarti _append_.

- Normal Mode
  Dalam Normal Mode, ada perintah khusus - khusus pengoperasian. ketika input karakter dengan keyboard, input tersebut bukanlah dimasukan ke Vim melainkan command atau perintah. Berikut contohnya:

  - `e` - berada di belakang kata
  - `b` - berada di depan kata
  - `p` - mem*paste* jika telah di copy dengan `yank`
  - `x` - menghapus satu karaker atau _delete_
  - `u` - mengembalikan riwayat yang telah dihapus atau _undo_

  jika menggeser kursor dengan tanda panah atau _Arrow Keys_ biasanya. Di Vim berbeda dengan yang lain yaitu:

  - `h` - geser kursor ke kiri
  - `j` - geser kursor ke bawah
  - `k` - geser kursor ke atas
  - `l` - geser kursor ke kanan

- Insert Mode
  Dalam Insert Mode, kita bisa menuliskan atau mengedit text didalam VIM. Dan akses ke dalam yaitu masuk Normal Mode terlebih dahulu. Bisa juga seperti text editor pada umumnya: _enter_, _backspace_, _arrow keys_, _shift_ dan lain - lain. Berikut contohnya:

  - `i` - masuk ke Insert Mode
  - `a` - berada satu langkah di depan huruf dan masuk ke Insert Mode
  - `I` - masuk ke Insert Mode menuju ke awal huruf satu baris
  - `A` - masuk ke Insert Mode menuju ke akhir huruf satu baris

- Visual Mode
  Dalam Visual Mode, untuk menyeleksi text atau huruf. Dan akses ke Visual Mode yaitu masuk Insert Mode. Halnya seperti _delete_/_cut_/_copy_. Berikut contohnya:

  - `v` - masuk ke Visual Mode dan menyeleksi per karakter
  - `Shift+v` - masuk ke Visual Mode dan menyeleksi per baris

- Command Mode
  Di dalam _VIM_ tersedia perintah tertulis yang sudah ada. Dan bisa di jalankan terminal seperti berikut:

  - `:q` - menghapus jendela aktif
  - `:w` - menulis dan menyimpan file

  Dan juga di gabung perintah tersebut menjadi:

  - `:qa` - menghapus semua jendela aktif
  - `:wq` - menyimpan dan menghapus jendela aktif

# Penutup

Ini hanya sebatas penjelasan singkat dari saya. untuk cara kustomisasi bisa dicari internet dan penggunaan aplikasi vim di `vimtutor`. Berbagi pengetahuan itu sangat bagus karena bisa jadi apa yang kita bermanfaat bagi orang lain.
