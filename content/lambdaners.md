---
title: Kenapa kamu perlu belajar paradigma fungsional
desc: Ceramah yang mengantarkan kamu untuk mengenal pemrograman fungsional
author: Airavata de la Weeb
github: artileda
twitter:
telegram: mikrofon_pelunas_hutang
date: 2021-09-26
categories:
  - functional programming
---

![gambar kucing](https://storage.googleapis.com/kotakode-prod-public/images/8a3c3f16-4397-4cea-90fa-491c05378d5e-image.png)

Soyuz neruzmy, kamerad pembaca.

Pemrograman memiliki kompas haluan yang di sebut paradigma, kompas ini mendikte bagaimana seseorang berpikir 
dalam menuliskan ide mereka menjadi kumpulan baris kode bahasa program.

Jika pada pemrograman objek kita berfokus bagaimana suatu kelas bisa mewakili entitas dari masalah yang kita hadapi,
pada pemrograman fungsional kita berfokus bagaimana fungsi bisa mewakili entitas suatu masalah.

**Kasus:** Kita memiliki sebuah teka-teki untuk menyusun rangkaian atom karbon berdasarkan nomor atom dan tidak menampilkan
atom radioaktif, buatkan sebuah program yang dapat melakukan hal tersebut.

Pada kasus ini kita memiliki stockpile atom

| Nama Unsur | Nomor Atom |
|--|--|
| Oxygen | 8 |
| Thorium | 90 |
| Hydragyrum | 80 |
| Zirkon | 40 |
| Oganesson | 118 |
| Astatine | 84 |
| Uranium | 92 |


```haskell
data Atom = {nomorAtom :: Int, nama :: String}

stockpile :: [Atom]
stockpile = [ Atom 8 "Oxygen"
  , Atom 90 "Thorium"
  , Atom 80 "Hydragyrum"
  , Atom 40 "Zirkon"
  , Atom 118 "Oganesson"
  , Atom 84 "Astatine"
  , Atom 92 "Uranium" ]
  
 
```
