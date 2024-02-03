---
title: Penggunaan Registry Proxy
desc: Download dependency lambat? Sekarang sudah nggak lagi!
author: Reinaldy Rafli
github: aldy505
twitter:
telegram: aldy505
date: 2024-02-03
cover: /image/penggunaan-registry-proxy/header.jpeg
categories:
    - proxy
---

## Latar Belakang

Sebagai programmer, tentu saja banyak sekali permasalahan yang kita hadapi dalam mendownload berbagai dependency, apalagi permasalahan dimana internet kita sedang tidak stabil, dan akhirnya terkena timeout seperti gambar berikut.

![](/image/penggunaan-registry-proxy/npmjs-timeout.png)

Kemudian berbagai solusi yang ditawarkan orang-orang di internet biasanya:

-   Gunakan package manager lain yang punya _local cache_
-   Perpanjang timeoutnya
-   Tambah retry attempt nya

Namun, kalau masalahnya ada pada koneksi internet, tentu perpanjang timeout dan _retry attempts_ bisa membuat instalasi berhasil. **Tapi mau kapan proses install-nya selesai?**

## Tentang networking Indonesia

Mungkin kamu berpikir bahwa internet yang kita gunakan ini bisa dicapai karena satelit yang super banyak, kan?

Tidak salah, namun pada kenyataannya, internet yang kita gunakan ini [backbone](https://en.wikipedia.org/wiki/Internet_backbone)-nya terdapat pada kabel internet bawah laut. Ada [peta kabel internet bawah laut gratis](https://www.submarinecablemap.com/) yang kamu bisa lihat, kalau penasaran. Ada juga [artikel interaktif dari New York Times](https://www.nytimes.com/interactive/2019/03/10/technology/internet-cables-oceans.html) yang kamu bisa lihat. Singkatnya, data transfer melalui kabel yang ditanam dibawah laut itu jauh lebih murah, dan dampaknya kita bisa menggunakan bandwidth lebih tinggi untuk akses internet. Berbeda dengan satelit yang sangat terbatas, dan jauh lebih mahal, karena kamu harus meluncurkan satelit ke luar angkasa dengan roket, dan tentu saja ini terlalu mahal. Ada satu artikel tambahan dari [Vox tentang 40 peta yang menjelaskan internet](https://www.vox.com/a/internet-maps).

Di Indonesia sendiri, ada yang disebut sebagai [Indonesia Internet Exchange](https://en.wikipedia.org/wiki/Indonesia_Internet_Exchange) dimana semua ISP (Internet Service Provider -- seperti Indihome, Biznet, MyRepublic, dan lainnya) itu bisa bersatu untuk mewujudkan interkoneksi antar provider. Sehingga semua device yang memerlukan internet di Indonesia dapat saling terkoneksi.

Kembali ke registry untuk programming language seperti npmjs, nuget, dan lainnya. Lantas, dimanakah server-server mereka berada? Kalau kita coba lakukan `traceroute`, kita bisa tahu kalau ternyata `https://npmjs.org/` itu server tujuannya ada di Amerika.

```
traceroute to npmjs.org (104.16.24.34), 30 hops max, 60 byte packets
 1  _gateway (192.168.1.1)  8.000 ms  9.461 ms  9.628 ms
 2  180.***.***.* (180.***.***.*)  9.724 ms  9.851 ms  9.999 ms
 3  180.***.***.* (180.***.***.*)  14.877 ms  14.861 ms  14.085 ms
 4  * 180.240.190.109 (180.240.190.109)  36.758 ms  33.977 ms
 5  180.240.190.109 (180.240.190.109)  33.529 ms * *
 6  180.240.205.82 (180.240.205.82)  36.618 ms  26.404 ms 180.240.205.80 (180.240.205.80)  25.154 ms
 7  * * 162.158.160.248 (162.158.160.248)  27.478 ms
 8  162.158.104.3 (162.158.104.3)  28.027 ms 162.158.116.3 (162.158.116.3)  35.245 ms 162.158.160.19 (162.158.160.19)  27.439 ms
 9  104.16.24.34 (104.16.24.34)  27.419 ms  22.761 ms  23.832 ms
```

Kamu bisa cek lokasi geografis dari suatu IP dengan cara berikut:

```sh
curl ipinfo.io/104.16.24.34

# {
#   "ip": "104.16.24.34",
#   "anycast": true,
#   "city": "San Francisco",
#   "region": "California",
#   "country": "US",
#   "loc": "37.7621,-122.3971",
#   "org": "AS13335 Cloudflare, Inc.",
#   "postal": "94107",
#   "timezone": "America/Los_Angeles",
#   "readme": "https://ipinfo.io/missingauth"
# }
```

Kalau dilihat lagi dengan jalur kabel internet bawah laut tadi, berapa banyak hops (lompatan -- literally) yang harus kita lakukan agar bisa sampai ke tujuan? Banyak kan. Secara logika, kalau kita bisa meminimalisir hops tersebut, maka response time yang kita dapat akan lebih singkat, artinya... proses install dependency akan lebih cepat!

## Regional Proxy

Dari pola pikir itu (yang secara teknis, itu benar), menjadi salah satu landasan banyak orang mempunyai mirror untuk berbagai macam hal. Selain dependency, hal ini sudah lumrah kalau di dunia package Linux seperti Ubuntu, yang kamu bisa [lihat disini](https://launchpad.net/ubuntu/+archivemirrors), kemudian scroll kebawah, cari negara "Indonesia".

Komunitas Teknologi Umum sendiri bergerak di programming, banyak orang yang kesulitan untuk menyelesaikan masalah ini. Kalau komunitas ini mempunyai VM di wilayah Indonesia yang masih dalam ruang IIX (Indonesia Internet Exchange) tadi, apakah bisa menyelesaikan masalah ini dan membuat semua proses install menjadi lebih cepat?

Setelah kami pasang, jawabannya: bisa.

Bahkan hasil `traceroute` sendiri menunjukan `ping` time yang rendah.

```
 1  _gateway (192.168.1.1)  2.577 ms  6.073 ms  6.261 ms
 2  180.***.***.* (180.***.***.*)  7.343 ms  7.445 ms  7.700 ms
 3  180.***.***.* (180..***.***.*)  11.934 ms  8.044 ms  11.892 ms
 4  * 36.95.253.225 (36.95.253.225)  11.359 ms  11.445 ms
 5  36.95.253.226 (36.95.253.226)  20.350 ms  17.041 ms  17.012 ms
 6  10.174.0.53 (10.174.0.53)  17.109 ms  8.287 ms  6.657 ms
 7  10.100.206.2 (10.100.206.2)  9.986 ms  9.976 ms  9.970 ms
 8  xe-0-1.dr01.wjv.biznetg.io (137.59.127.122)  9.932 ms  9.925 ms  9.918 ms
```

## Setup untuk NPM

Proxy Registry untuk NPM yang digunakan adalah [Verdaccio](https://github.com/teknologi-umum/verdaccio).

Cara pakainya sederhana:

```sh
cd ~/project
# Hanya untuk command ini sekali saja
npm install --registry https://npmjs.teknologiumum.com

# Configure global untuk satu komputer
npm config set registry https://npmjs.teknologiumum.com

# Hanya di session terminal/shell ini saja
# Linux / Bash
export NPM_CONFIG_REGISTRY=https://npmjs.teknologiumum.com
npm install

# Windows / Powershell
$env:NPM_CONFIG_REGISTRY = "https://npmjs.teknologiumum.com";
npm install
```

Informasi lanjutan terkait cara pakainya ada di https://verdaccio.org/docs/setup-npm. Cara pakai untuk `pnpm` dan `yarn` juga ada di website tersebut.

## Setup untuk Nuget

Proxy Registry untuk Nuget yang digunakan adalah [BaGetter](https://github.com/teknologi-umum/BaGetter).

Cara pakainya juga sederhana:

```bash
dotnet restore --source https://nuget.teknologiumum.com/v3/index.json
```

Jika kamu menggunakan Visual Studio langsung, kamu bisa mengikuti [guide ini](https://learn.microsoft.com/en-us/nuget/consume-packages/install-use-packages-visual-studio#package-sources). Pakai URL berikut sebagai "Source": `https://nuget.teknologiumum.com/v3/index.json`.

## Setup untuk Golang

Proxy Registry untuk Golang yang akan digunakan adalah [Goproxy](https://github.com/teknologi-umum/goproxy).

Cara pakainya sederhana, jalankan command ini sekali saja. Setelah itu kamu bisa download package Go seperti biasanya. Konfigurasi ini berlaku global pada komputermu.

```sh
go env -w GOPROXY="https://goproxy.teknologiumum.com,https://proxy.golang.org,direct"
```

## Secara Infrastruktur

Server untuk registry proxy diatas semua menggunakan [BiznetGio Cloud](https://www.biznetgio.com/). Kami tidak dibayar atau disponsori oleh BiznetGio Cloud, namun pengalaman kami dengan BiznetGio Cloud ini cukup baik. Terkait bagaimana cara kami melakukan deployment pada server kami, dapat kamu lihat pada repository [teknologi-umum/infrastructure](https://github.com/teknologi-umum/infrastructure). Tidak perlu khawatir tentang segala macam security threat seperti [MITM](https://en.wikipedia.org/wiki/Man-in-the-middle_attack), karena kami menjamin semua ini 100% transparan dan open source.

Silahkan menyebarluaskan ini ke teman-temanmu yang kebetulan jadi korban network timeout saat install dependency. Lebih baik lagi dengan membantu menyumbang kami agar bisa terus bertahan membayar segala macam biaya yang digunakan pada [Saweria](https://saweria.co/teknologiumum).
