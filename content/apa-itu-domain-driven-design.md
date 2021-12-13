---
title: Apa itu domain-driven design?
desc: Penjelasan singkat dan sederhana terkait domain driven design.
author: Reinaldy Rafli
github: aldy505
twitter:
telegram: aldy505
date: 2021-12-12
cover: https://link/to/image (not really required, leave it empty by deleting this line)
categories:
  - domain driven design
---

**Domain-driven design** adalah istilah yang sering terdengar namanya belakangan ini, dan ini lumayan terdengar seperti
suatu hal yang baru dan keren sekali, karena sering diperbicangkan sana-sini. Karena saya malas dan terburu-buru,
mari kita buat artikelnya cepat saja.

Domain-driven design bukanlah sebuah framework, bukan pattern, bukan juga sebuah struktur folder yang harus ditaati
oleh seorang developer. Kalau kalimat itu sudah paham, mari kita lanjut.

_Domain_ sendiri adalah unit yang menjadi bagian dari bisnis suatu proyek yang kamu kerjakan. Jadi, misalnya kamu memiliki
sebuah proyek untuk mengerjakan sebuah aplikasi untuk sekolah, dimana dalam aplikasi tersebut terdapat beberapa fitur yang
menjadi kebutuhan: absensi, data guru & murid, data pelajaran, dan rapor. Masing-masing fitur tersebut dapat menjadi
sebuah domain yang berdiri sendiri, walaupun nanti sebuah domain dapat mempunyai ketergantungan (bahasa inggris: dependent)
kepada domain lain. Misalnya untuk mengeksekusi suatu fungsi dari domain absensi, harus mengambil beberapa data dari data
guru & murid. Namun, masing-masing domain juga memiliki aturan dan batasan untuk hal-hal yang dapat dilakukan.

Dalam domain-driven design, seorang developer nggak bisa dilepas sendiri untuk develop sebuah domain tanpa mengetahui
business requirement tanpa bicara dengan _domain expert_. Wah, istilah baru lagi. Domain expert adalah seseorang yang mengerti
dengan ranah bisnis dari suatu domain.

Setelah ngobrol-ngobrol dengan domain expert, dalam menciptakan suatu model domain, biasanya diperlukan sebuah konteks.
Konteks dapat berupa _event_, _statement_, ide, atau apapun itu yang mempunyai ikatan dengan domain. Biasanya, seorang developer
akan kepikiran untuk menciptakan model untuk domainnya. Dalam suatu domain, sangat umum juga apabila terdapat lebih dari
satu model. Dalam setiap model pasti memiliki aturan dan batasannya sendiri, begitu pula dengan implementasinya.

Menghadapi banyak model secara bersamaan akan menjadi suatu masalah. Oleh karena itu, harus terdapat _ubiquitous language_,
yang bearti penamaan (bahasa inggris: naming convention) atas segala sesuatu yang ada di dalam konteks tersebut harus
manusiawi dan lebih dekat dengan bisnis. Nggak boleh disingkat-singkat atau bahkan misleading.

Sampai titik ini kamu seharusnya sadar bahwa domain-driven design itu tidak berfokus kepada developers saja, namun kepada
semua orang hingga tim bisnis.

Lalu bagaimana secara arsitektur?

Dalam sebuah aplikasi yang kompleks, biasanya berbagai hal seperti UI, database, sampai business logic dipisahkan kedalam
beberapa layer, yang biasanya membantu developer untuk me-manage kompleksitas kodenya. Secara dogmatis, domain-driven design
menyarankan kita untuk memisahkan ekspresi antara model dengan business logic. Buat sebuah desain arsitektur yang mana
masing-masing layer hanya mempunyai ketergantungan terhadap layer dibawahnya. Sehingga kode tersebut menjadi loosely-coupled,
yang mana berarti terpisah antara UI, aplikasi, dan kode infrastruktur. Ada beberapa istilah dalam _layered architecture_:

1. _Entity_, yang merujuk kepada sebuah object yang memiliki identitas, punya behavior, aturan, dan side effect. Dimana
   identitas dari suatu entity ini tidak akan pernah berubah, namun property lain di dalamnya bisa berubah
   (atau ter-mutate).
2. _Value object_ merupakan sebuah object yang tidak memiliki indentitas, lebih sederhana lagi dapat didefinisikan sebagai
   atribut dan logika dari sebuah elemen dalam model. Value object ini dapat berubah, namun seharusnya diperlakukan sebagai
   suatu object yang immutable (atau isinya tidak bisa diubah). Apabila berubah, suatu value object baru akan diciptakan
   dan di-assign kepada layer diatasnya yang biasanya merupakan sebuah entity.

Sebetulnya ada 3 istilah lagi seperti _services_, _aggregates_ dan _factory & repository_ yang menjadi bagian dalam
pembahasan ini. Namun, karena saya malas, kita pindah topik saja ke suatu hal yang lebih dipedulikan oleh developer:

Lalu dalam real-world project, bagaimana cara menerapkan domain-driven design?

Karena domain-driven design tidak mempunyai aturan terkait bagaimana struktur folder atau pattern-pattern lain
(seperti repository pattern, dan design pattern lain) yang dapat digunakan didalamnya, maka tidak ada konvensi juga
terkait 2 hal itu. Namun, kalau ingin mengetahui bagaimana cara paling umum dalam penerapannya, kamu bisa melihat
ke konsep _Clean Architecture_, yang dari namanya mungkin akan memberikan struktur folder, namun sebenarnya tidak juga.

Singkatnya, _Clean Architecture_ memisahkan antara business logic, wrapper seperti database dan hal-hal lain yang dapat
digantikan kapanpun, serta UI (atau biasanya lebih familiar dengan sebutan presentation layer).

Masih banyak resource yang harus dieksplor sendiri, karena tidak akan habis kalau domain-driven design dijelaskan melalui
sebuah artikel saja.

- [Microsoft: Design a DDD-oriented microservice](https://docs.microsoft.com/en-us/dotnet/architecture/microservices/microservice-ddd-cqrs-patterns/ddd-oriented-microservice)
- [Anemic Domain Model](https://martinfowler.com/bliki/AnemicDomainModel.html)
- [Stackoverflow - What is domain driven design](https://stackoverflow.com/questions/1222392/what-is-domain-driven-design-ddd/1222488#1222488)
- [Awesome DDD - Curated list of DDD resource](https://github.com/heynickc/awesome-ddd)
