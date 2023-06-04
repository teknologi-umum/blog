---
title: Belajar Docker dalam 15 Menit
desc: Sebuah crash course tentang Docker yang akan menjadikan dirimu ahli DevOps hanya dalam 15 menit
author: Reinaldy Rafli
github: aldy505
twitter:
telegram: aldy505
cover: /image/belajar-docker-dalam-15-menit/header.png
date: 2021-09-02
categories:
  - tutorial
  - crash course
  - docker
---

15 menit, here we go.

Docker adalah software, menyerupai Virtual Machine yang biasanya dipakai orang-orang untuk menjalankan suatu operating system di dalam sebuah operating system.

Tapi, Docker cara kerjanya berbeda dengan Virtual Machine. Saya nggak hafal persis apa perbedaannya, tapi yang penting buat kamu: Docker jauh lebih ringan dari Virtual Machine.

Lalu kenapa kita harus pakai Docker?

- Bisa menyamakan development environment dan production environment, tanpa harus ke server production
- Untuk menyamakan development environment antar anggota tim.
- Agar meme ini tidak terjadi di kehidupan mu:

![it works on my machine](https://hackernoon.com/hn-images/1*ookfwogTLx_1qhHaiFJoJw.png)

Misalnya, sebuah aplikasi yang harus jalan di operating system Linux Debian versi 10. Sebelum jalanin servernya, kamu perlu install beberapa package dulu dari APT.

Kalau kamu jalanin ini satu-satu, kan capek ya. Docker mempermudah itu dengan bikin steps-steps yang ada di dalam satu file: **Dockerfile** (tanpa ekstensi apapun, bener-bener `Dockerfile` tok).

## Instalasi

Kalau kamu di Windows, install [Docker Desktop dari link ini](https://docs.docker.com/desktop/windows/install/). Kalau kamu di Mac, install juga [Docker Desktop dari link ini](https://docs.docker.com/desktop/mac/install/).

Nah.. kalau kamu di Linux, sesuaikan dengan distro yang kamu pakai ya. Petunjuk instalasinya ada [di link ini](https://docs.docker.com/engine/install/).

Khusus Linux, kamu harus install `docker-compose` terpisah, nggak include dalam bundle instalasi Docker Engine tadi. Install dari [link ini](https://docs.docker.com/compose/install/#install-compose).

## Dockerfile

```docker
FROM node:16.6.2-buster

WORKDIR /app

COPY . .

RUN npm install

EXPOSE 8080

CMD ["npm", "start"]
```

Itu contoh sederhana dari sebuah Dockerfile. Steps-nya bisa dijelaskan seperti ini:

1. Kita mulai dari base image Node.js versi 16.6.2 dengan operating system Debian Buster
2. `cd` (change directory) ke folder `/app`
3. Copy file yang ada di host (komputer kamu, directory yang ada Dockerfilenya doang) ke Docker
4. Jalanin `npm install`
5. Buka port 8080 ke host (komputer kamu)
6. Jalanin `npm start`, dan nyala terus.

Semua command itu cara jalaninnya cuma 2 langkah ini:

1. `docker build -t namaAplikasi:1.0 .` untuk build image Dockernya, dan
2. `docker run -p 8080:8080 namaAplikasi:1.0` untuk jalanin imagenya.

Setelah itu kamu bisa buka web browser favoritmu, buka `http://localhost:8080` dan kamu bakal lihat aplikasi mu jalan.

Keyword di Dockerfile yang umum dipakai biasanya ini:

```docker
# Komentar di Dockerfile gini caranya
# FROM biasanya di 1 image cuma satu
# Kecuali kamu mau bikin multi-stage build
# sayangnya nggak dibahas disini, hehe :)
FROM (image)
FROM python:3.9-buster
FROM golang:1.17.0-alpine3.13

WORKDIR (set current working directory)
WORKDIR /app
WORKDIR /home/usr/app

# Command ini bisa kamu lakuin berkali-kali
RUN (jalanin command di shell)
RUN pip install
RUN go

# COPY ini bisa menerima Glob
COPY (literally copy)
COPY package*.json .
COPY . .

ENV (kasih environment variable)
ENV PORT=3000
ENV SECRET_KEY=ajsdfnsidjfnWDIJRN

# Kamu juga bisa buka lebih dari 1 port
# kalau app nya emang mau expose lebih dari 1 port
EXPOSE (buka port)
EXPOSE 9229
EXPOSE 81

ARG (argument kalo punya)

CMD (main command)
CMD ["./app"]
CMD ["node", "index.js"]
```

## Docker Image

Hasil build tadi itu disebut sebagai `docker image`. Docker image ini bisa jalan kapan aja, dimana aja, nggak peduli apa komputer mu.

Lalu gimana kalau kamu nggak mau bikin image? Kamu udah nemu suatu image di [Docker Hub](https://hub.docker.com/search?q=&type=image) yang kamu mau coba, dan mau langsung jalanin di laptopmu.

Easy, tinggal `docker pull` dan `docker run`. Sesimpel itu.

Misalnya karena laptopmu Windows, kamu nggak bisa jalanin Redis (database untuk caching), kamu bisa:

1. `docker pull redis:6.2.5-alpine`
2. `docker run -p 6379:6379 redis:6.2.5-alpine`

Done! Redis udah jalan di Docker, dan kamu bisa akses ke database Redis tanpa pusing install dan konfigurasi sana sini.

## Docker Hub

Loh lalu itu `redis:6.2.5-alpine` tadi dapat darimana?

Docker mempunyai registry mereka sendiri untuk menyimpan docker image, yaitu [Docker Hub](https://hub.docker.com/). Disini juga kamu bisa cari base image apa yang bisa kamu pakai untuk bagian `FROM something` di Dockerfile mu.

Anggep semacam Github, bukan buat Git repository, tapi untuk Docker Image.

Canggih kan Docker? Just wait, it's getting more canggih.

## Docker Compose

Tadi yang anak Linux saya suruh install Docker Compose terpisah. Untuk apa sih?

Anggep kamu punya satu Dockerfile dan beberapa Docker Image yang kamu ambil dari Docker Hub. Kamu mau jalanin semua itu bersamaan. Gimana caranya?

Ribet kan ya kalau jalanin 1 app dari Dockerfile, terus database PostgreSQL dan Redis di 3 terminal terpisah.

Docker Compose to the rescue!

Sederhananya, Docker Compose adalah beberapa Docker image yang di compose jadi satu. Makanya namanya itu Docker Compose.

Kamu tinggal buat file `docker-compose.yml`, yang isinya bisa seperti ini:

```yaml
services:
  database:
    image: postgres:13.4-alpine # Image dari docker hub
    restart: always
    ports:
      - 5432:5432
    environment:
      POSTGRES_USER: postgres
      POSTGRES_PASSWORD: verysecure
  cache:
    image: redis:6.2-alpine # Image dari docker hub
    restart: always
    ports:
      - 6379:6379
  app:
    # Anggep Dockerfile nya ada di directory yang sama dengan docker-compose.yml
    build: . # Image dari Dockerfile dan harus build dulu
    restart: always
    ports:
      - 8080:8080
```

Cara jalaninnya?

1. `docker-compose up`

Done!

## Keluar dari Docker

Biar nggak kayak orang yang pertama kali pakai Vim, nggak tahu cara exit Vim, panik, dan shutdown komputer langsung.

Kalau kamu mengikuti cara jalanin Docker yang saya sebut tadi, kemungkinan besar aplikasi Docker-nya jalan terus di terminal. Cara untuk keluar adalah Ctrl + C (atau Cmd + C untuk Mac). Kalau mau Docker jalan di background, kamu bisa:

- Kalau Docker Image biasa (yang pakai `docker run`): `docker run -d <nama image>`
- Kalau Docker Compose: `docker-compose up -d`

Kalau ikutin cara ini, kan Dockernya nggak ada di terminal. Lalu matiinnya gimana?

- Kalau Docker Image biasa: `docker stop <nama image>`
- Kalau Docker Compose: `docker-compose stop`

Selamat! Kamu sudah jago Docker. Dimana lagi bisa bermain Docker? Heroku support deploy aplikasi pakai Docker, Github Actions support Docker, VPS (kalau punya) juga bisa kok di install Docker.
