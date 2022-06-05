---
title: Elixir Pattern Matching, Assignment, & Immutability
desc: Elixir disebut bahasa fungsional, karena evaluasi suatu program menggunakan konsep evaluasi fungsi dalam matematika. Secara bersamaan fp selalu populer dengan sifat pure dan immutable.
author: Alfin Surya
github: natserract
twitter:
telegram: dotnatserract
date: 2022-06-05
cover: https://files.speakerdeck.com/presentations/0ee235074d534893ac19cf5218a58204/slide_3.jpg
categories:
  - elixir
  - functional programming
---

[Elixir](https://github.com/elixir-lang/elixir) adalah bahasa pemrograman fungsional, dinamis, dan _metaprogrammable_ dibangun untuk membuat aplikasi yang scalable dan maintanable. Elixir dibangun dari bahasa pemrograman [Erlang](https://www.erlang.org/), secara bersamaan bahasa ini melakukan pendekatan [actor based](https://www.oreilly.com/library/view/functional-programming-a/9781680502756/f_0061.xhtml) untuk masalah **[concurrency](<https://en.wikipedia.org/wiki/Concurrency_(computer_science)>)** dengan syntax yang lebih sederhana, clean, namun kuat.

[José Valim](https://github.com/josevalim) creator dari Elixir membangun bahasa ini dengan tujuan untuk meningkatkan ekstensibilitas dan produktivitas yang lebih tinggi dengan Erlang Virtual Machine yaitu [BEAM (Bogdan/Björn’s Erlang Abstract Machine)](<https://en.wikipedia.org/wiki/BEAM_(Erlang_virtual_machine)>). VM ini akan meng-compile source code Elixir dan Erlang ke file bytecode (`.beam`) yang nantinya berjalan di BEAM. Ini berarti kita bisa menjalankan erlang code di Elixir tanpa ada masalah runtime sama sekali.

> There’s nothing you can do in Erlang that can’t be done in Elixir!

## Pattern Matching & Assignment

Jika Anda mulai belajar Elixir, tentunya Anda akan bertemu dengan pernyataan yang sedikit membingungkan di Elixir, disana disebut bahwa Elixir tidak memiliki operator assignment `=`. Maka dari itu disini kita coba kupas secara mendetail bagaimana pernyataan aneh tersebut menjadi sesuatu yang kita bisa pahami bagaimana itu bekerja.

In a nutshell, pattern matching adalah pola untuk membandingkan suatu data dengan struktur pola tertentu. Cara ini digunakan di banyak bahasa pemrograman. Dalam kutipan artikel [Wikipedia](https://en.wikipedia.org/wiki/SNOBOL), pattern matching pertama kali digunakan pada [SNOBOL(1962)](http://www.snobol4.org/docs/burks/tutorial/ch4.htm) yang digunakan untuk operasi string. Di masa modern kini, fitur ini banyak digunakan seperti di bahasa pemrograman seperti OCaml, ML, Rust, Haskell, etc.

Dalam Elixir, pattern match digunakan salah satunya saat pendeklarasian variabel (bindings). **Elixir merupakan bahasa pemrograman dinamis**, jadi Anda tidak perlu mendeklarasikan variabel atau tipenya secara _eksplisit_:

```rust
let y: f32 = 3.0;
```

Elixir secara dinamis akan menentukan tipe variabelnya ketika data sudah diisi:

```bash
iex(1)> num = 32
32

iex(2)> is_integer(num)
true
```

### Let's Start Smaller

Baik, mari kita coba lihat kode ini:

```bash
iex(3)> a = 1
1

iex(4)> b = 2
2
```

Itu adalah contoh kode yang sederhana, di bahasa pemrograman seperti Javascript itu terlihat seperti operasi [assignment](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/Assignment) (`=`) nilai pada sebuah variabel. Namun ketika di Elixir, itu adalah hal yang berbeda. Di Elixir, operator `=` bukanlah operator assignment melainkan _match operator_ atau bisa juga disebut _binding_.

Dalam Elixir, apapun adalah ekspresi, dan setiap ekspresi memiliki hasil. Artinya, dalam case diatas hasilnya adalah apapun yang ada disebelah kanan operator `=` yaitu `1`, `2`. Jadi **ketika mendeklarasikan variabel dengan nilai, maka variabel tersebut sudah menjadi milik nilai itu**. Lalu antara nilai dengan variabel **di evaluasi/ di-check jika itu cocok/sama** maka hasil terakhirnya selesai di evaluasi.

Supaya lebih clear, mari kita lihat contoh ini:

### Match

```bash
iex(1)> num = 10
# ^ num akan di-binds (menjadi milik) nilai 10

10
# ^ Hasil dari ekspresi terakhir

iex(2)> 5 = num
** (MatchError) no match of right hand side value: 10
# ^ 5 tidak sama dengan `num`

iex(2)> 10 = num
# ^ 10 sama dengan `num`

10
# ^ Hasil dari ekspresi terakhir
```

Anda lihat? Pada bagian operasi pertama `num = 10`, proses yang terjadi yakni:

- Nilai 10 di cocokan dengan `num` apakah nilainya ada? jika ada maka 10 dicocokan dengan nilai tersebut. Namun jika nilai tidak ada, maka artinya `num` memiliki nilai 10. Proses pencocokan tersebut, sekaligus melakukan binding `num = 10` dengan `10 = num`.
- Saat coba dicocokan dengan nilai yang lain, `5 = num` dan itu sudah exists. Maka artinya 5 tidak sama dengan 10 dan tentunya `match error`.

Itu sebenarnya seperti kondisi biasa, jika _num == 10_ maka cetak!

### List Matches

Contoh pattern match lainnya:

```bash
iex(6)> list = [1, 2, 3]
[1, 2, 3]

iex(7)> [a, b, c] = list
[1, 2, 3]

iex(8)> a
1

iex(9)> b
2

iex(10)> c
3
```

> Rumusnya, **apa yang dibutuhkan? tulis di sebelah kanan, lalu buat pola nya disebelah kiri**.

Di Elixir, nama variabel selalu dimulai dengan karakter alfabet huruf kecil, dan [PascalCase](https://techterms.com/definition/pascalcase) untuk penamaan Module. Selain itu, kombinasi dengan karakter seperti numeric, dan garis bawah juga dibolehkan.

```bash
valid_variable_name
also_valid_1
validButNotRecommended
NotValid
```

Nama variabel juga dapat diakhiri dengan karakter tanda tanya (?) atau tanda seru (!):

```bash
valid_name?
juga_ok!
```

- (`?`): Fungsi yang mengembalikan nilai boolean.
- (`!`): Fungsi atau makro di mana kasus kegagalan memunculkan exception.

Lihat [konvensi penamaan](https://hexdocs.pm/elixir/main/naming-conventions.html) lainnya.

### Bindings, Allocations

Bind secara sederhana, **mengaitkan/memberi nama dengan suatu nilai atau fungsi**. Di Elixir, binding dilakukan dengan operator `=`, disebelah kanan adalah ekspresi, disebelah kiri adalah namanya. Bind dilakukan untuk **mereferensikan suatu istilah (variabel) ke dalam memori**. Jadi ketika membuat variabel, itu secara tidak langsung menjadikan nama variabel tersebut menjadi referensi dari memori.

Untuk melihat bagaimana **bindings** bekerja, mari lihat kode ini:

```bash
iex(1)> num = 10 # <- Initial value
10
iex(2)> num # <- Verify
10

iex(3)> num = 20 # <- Bind ulang variabel num
20
iex(4)> num # <- Verify
20
```

Secara default semua data di Elixir bersifat [immutable](https://en.wikipedia.org/wiki/Immutable_object). Artinya, yang dilakukan pada operasi diatas bukanlah merubah nilai `num` menjadi `20`, melainkan rebinding `num` dengan `20`. Rebinding di Elixir, **tidak mengubah nilai aslinya**. Tetapi **membuat memori baru dan menetapkan nama ke lokasi memori yang baru**. Jadi ketika rebind dilakukan, istilah (variabel) tersebut akan mengambil referensi ke lokasi memori yang berbeda. Ini berkaitan dengan [manajemen memori](https://www.honeybadger.io/blog/elixir-memory-structure/) (allocations) di Elixir.

### Elixir GC

Elixir adalah [garbage-collected (GC) language](https://www.erlang.org/doc/apps/erts/garbagecollection), yang berarti Anda tidak perlu ** mengatur memori secara manual**, ini sudah dilakukan secara otomatis oleh Elixir melalui VM Erlang. Setiap proses di Erlang memiliki tumpukan-tumpukan yang dialokasikan dalam blok memori. VM Erlang akan melacak variabel mana yang akan digunakan di masa mendatang dan variabel mana yang dapat dihapus dari memori. Ketika sebuah variabel sudah diluar cakupan atau tidak dapat direferensikan lagi maka nantinya BEAM secara otomatis akan membersihkan memori. Umumnya, sebagian besar memori akan dibagi antara versi lama dan baru.

## Immutability (FP Principles)

Elixir disebut bahasa fungsional, karena evaluasi suatu program menggunakan konsep evaluasi fungsi dalam matematika. Secara bersamaan fp selalu populer dengan sifat _pure_ dan _immutable_. Immutable merupakan konsep inti Pemrograman Fungsional.

Immutable berarti, **data yang sudah dibuat tidak dapat diubah**. Secara sederhana, itu berarti **semua variabel Anda adalah konstan**. Ini juga berkaitan dengan fungsi murni (_pure function_), ketika diberikan input yang sama, akan selalu menghasilkan output yang sama dan tidak memiliki efek samping.

### Bekerja dengan Immutable Data

Data di Elixir secara default tidak dapat diubah. Setiap fungsi akan mengembalikan **salinan baru yang dimodifikasi dari data input**. Untuk mengubahnya, Anda harus **mengambil salinan baru ke variabel lain atau re-bind kembali ke nama/variabel yang sama**.

Nantinya, hasil evaluasi akan disimpan di lokasi memori lain. Jadi ketika kita me-modifikasi input maka hal itu tidak akan mengubah inputan aslinya, tetapi akan melalui beberapa penyalinan data. Coba lihat contoh ini:

```bash
iex(1)> list = [3, 2, 1]
[3, 2, 1]

iex(2)> list2 = [4 | list]
[4, 3, 2, 1]

iex(3)> list = list2
[4, 3, 2, 1]
#  ^ reference baru
```

List di Elixir disimpan sebagai [linked list](https://www.educative.io/edpresso/what-is-a-linked-list) dimana setiap data (nodes) saling berhubungan dengan node berikutnya. Node pertama disebut kepala (`head`) dan terakhir disebut ekor (`tail`):

```bash
Prelude> list = 1 : [2, 3]
Prelude> head list
1

Prelude> tail list
[2, 3]
```

Jadi jika dilihat pada `list2`, secara teori itu berarti variabel `list` ditambahkan di element bagian akhir / _tail_ dalam `list2`. Nilai yang berada dalam `list`: `[3, 2, 1]` akan **disalin** kedalam `list2` sehingga output dari `list2` akan menjadi `[4, 3, 2, 1]`. Itu mirip seperti operasi [`concat`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/concat) pada Javascript.

### Operasi Lainnya

```bash
iex(9)> name = "elixir"
"elixir"

# String.capitalize(t(), :default | :ascii | :greek | :turkic) :: t()
iex(10)> new_name = String.capitalize(name)
"Elixir"

iex(11)> name
"elixir"
```

`String.capitalize()`, mengkonversi karakter pertama dalam string menjadi huruf besar dan sisanya menjadi huruf kecil menurut mode (e.g. `:default`).

### Manfaat Immutability

Yang harus diingat saat bekerja dengan pemrograman fungsional adalah, **kami akan selalu mengubah data! tapi kami tidak pernah memodifikasi di tempat aslinya**. Konsep ini mungkin terasa aneh di beberapa bahasa pemrograman, karena biasanya di OO language secara default state bisa berubah. Mungkin Anda sedikit bertanya-tanya apa manfaat dari konsep immutable ini?

Ada dua manfaat penting dari immutability, yaitu **terbebas dari side effect (safe)** dan **[konsistensi data](https://en.wikipedia.org/wiki/Purely_functional_data_structure)**. Sebenernya itu saling berhubungan, terbebas dari side effect ini berarti Anda tidak perlu khawatir data Anda akan berubah, ketika satu instance dan instance lainnya mengakses data tersebut, ia harus membuat salinan baru sehingga data aslinya tidak berubah (_think if you have 1 million processes_).

Immutability, sekaligus juga membuat kode Anda lebih mudah diuji, dan mudah dipahami, karena jalur nya jelas fokus bagian perbagian sesuai tugasnya. Sebenernya masih banyak manfaat dari konsep ini, tapi saya bisa berpendapat bahwa:

> **Inti fokus dari pemrograman fungsional adalah untuk konsistensi dan keamanan data. Sedangkan [OOP](https://www.techtarget.com/searchapparchitecture/definition/object-oriented-programming-OOP) sendiri lebih fokus untuk manufaktur (arsitektur) dan desain suatu aplikasi**. Meskipun kedua paradigma ini bisa untuk dua alasan diatas, itu adalah murni pendapat saya. _So every people can make own decision right?_

## Additional Reading:

- [https://dockyard.com/blog/2021/03/30/elixir-is-safe](https://dockyard.com/blog/2021/03/30/elixir-is-safe)
- [https://www.youtube.com/watch?v=lxYFOM3UJzo](https://www.youtube.com/watch?v=lxYFOM3UJzo)
