---
title: Git Flow benefit dan cara kerjanya
desc: Mengenal Git flow dari sisi benefit dan cara kerjanya
author: Iwan Firmawan
github: ifirmawan
twitter: iwan_firmawan
telegram:
date: 2023-10-14
cover:
categories:
    - git
    - git-flow
    - teamwork
---

# Apa itu Git Flow?

Git Flow adalah istilah yang mungkin sering kita dengar ketika hendak bekerja dengan tim untuk mengerjakan sebuah proyek atau sedang tertarik untuk belajar Git lebih dalam. Jika dilihat dari sejarahnya, Git FLow pertama kali diterbitkan oleh Vincent Dressen di website pribadinya dengan judul _["A successful Git branching model"](https://nvie.com/posts/a-successful-git-branching-model/)_. Dalam tulisannya tersebut ada catatan penting yang perlu kita ingat, bahwa alur kerja ini tidak menjamin keberhasilan 100%, melainkan perlu ada penyesuaian dari segi sumber daya (developer), cakupan proyek dan kesepakatan tim lainnya.

Disini saya coba berbagi pendapat dan memberikan penjelasan terkait dengan Git Flow. Git Flow pada dasarnya adalah alur kerja percabangan yang memiliki 2 branch utama (master/main dan develop). Dimana master branch ditetapkan sebagai _official release_ dan develop branch ditetapkan sebagai penggabungan dan asal dari semua fitur. Dapat dikata juga dari segi [_software deployment_](https://en.wikipedia.org/wiki/Software_deployment) master/main branch digunakan untuk _production_, sedangkan develop branch untuk _staging_. Untuk detail alur kerjanya, akan saya coba jelaskan pada bagian ["Bagaimana cara kerjanya?"](#bagaimana-cara-kerjanya)

## Apa keuntungan menggunakan Git Flow?

-   Memiliki strategi percabangan yang fleksibel karena fitur-fitur yang dibangun akan bermuara pada develop branch terlebih dahulu, sehingga lebih mudah untuk beralih antar jalur pengembangan.
-   Memungkinkan satu atau lebih developer berkolaborasi pada fitur yang sama, didukung pada poin pertama (fleksibilitas strategi percabangan).
-   Karena master/main branch ditetapkan sebagai _production_ maka hal ini dapat menjadi sumber yang terverifikasi dan teruji.

## Apa kelemahan menggunakan Git Flow?

# Bagaimana cara kerjanya?

## Studi kasus

### Tools yang digunakan

# Referensi :

-   https://nvie.com/posts/a-successful-git-branching-model/
-   https://medium.com/@rizael.ichigo28/gitflow-workflow-463645732a29
-   https://www.geeksforgeeks.org/git-flow-vs-github-flow/
-   https://www.scaler.com/topics/git/git-flow-vs-github-flow/
-   https://blog.jetbrains.com/space/2023/04/18/space-git-flow/
-   https://danielkummer.github.io/git-flow-cheatsheet/index.id_ID.html
