---
title: Berkenalan dengan Laravel Scout
desc: Membuat searching data makin mudah dan cepat (udah kayak tagline isp ga tuh)
author: krido
github: yuxxeun
twitter: yuxxeun
cover: https://laravelnews.s3.amazonaws.com/images/laravel-scout-featured.png?w=1366&h=698.52272727273&q=90&auto=format&fit=crop
telegram:
date: 2023-06-01
categories:
    - laravel
    - php
---

Belakangan ini [Laravel](https://laravel.com) menjadi salah satu _go-to weapon_ gue dalam membuat perangkat lunak yang berbasis web. Gue memilih si Laravel ini tentu bukan karena engga sengaja, salah satu yang gue suka ialah _ecosystem_-nya yang oke banget (sounds like ehm im an Laravel evangelist).

Beberapa alasan gue memilih Laravel antara lain: mengusung konsep MVC by default, syntax elegant, _built-in authentication_ -baik secara _session_ maupun secara _API_- tanpa library tambahan, konfigurasi yang berada di level `.env` yang mana mengikuti pola 12 factor-app, Seeding (dummy) data yang ehm cukup mudah, serta beberapa "magic" yang bisa dilakukan dengan `composer` via terminal, dan masih banyak lagi yang engga bisa gue sebutin satu per satu.

Tapi di tulisan kali ini yang ingin gue bahas yaitu si [Laravel Scout](https://laravel.com/docs/10.x/scout).

## Explain like im five, can you?

Jadi, apa itu Laravel Scout?
Kalau menurut Laravel sendiri, kira-kira begini penjelasannya:

> Laravel Scout provides a simple, driver based solution for adding full-text search to your Eloquent models

Singkatnya, Laravel Scout adalah "driver" untuk mencari data via `eloquent model`. Yang menarik dari si scout ini yaitu dukungan integrasi dengan _third-party_ driver lainnya seperti Algolia, Meilisearch, MySQL dan PostgreSQL.

Oke-oke, cukup basa-basinya.

Sekarang, ijinkan gue untuk malakukan sedikit eksperimen dalam menggunakan Laravel Scout. Di sini gue akan membuat dummy project yang mana nantinya menggunakan driver-nya si MySQL (which is i dont need any library, right?) untuk ber-eksperimen.

## Initialize

Ritual pertama yaitu gue membuat project laravel dengan perintah `laravel new laravel-scout`
![init laravel project](/image/berkenalan-dengan-laravel-scout/init-laravel-project.png)

## Setup environment

Selanjutnya -seperti biasa- gue mengatur agar aplikasi laravel ini bisa _connect_ dengan basis data, di sini gue arahkan ke basis data yang bernama `laravel_scout`

```php
DB_CONNECTION=mysql
DB_HOST=127.0.0.1
DB_PORT=3306
DB_DATABASE=laravel_scout
DB_USERNAME=root
DB_PASSWORD=
```

## Let's Migrate

Jika sudah setup basis data, ritual selanjutnya adalah lakukan migrasi database dengan perintah `php artisan migrate`.
Jika basis data yang kita deklarasikan di file `.env` belum dibuat, maka Laravel secara otomatis akan 'bertanya' via cli (atau terminal) apakah mau 'dibuatkan' atau tidak.
![menjalankan migrasi](/image/berkenalan-dengan-laravel-scout/migrate-table.png)
![dan ya, ini hasil migrasinya](/image/berkenalan-dengan-laravel-scout/hasil-migrasi.png)

## Installing Laravel Scout

Lanjut, seperti _package_ pada umumnya, untuk dapat menggunakan scout kita perlu memasangnya via cli (termial) dengan perintah `composer required laravel/scout`. Setelah itu publish file konfigurasi scout dengan perintah `php artisan vendor:publish --provider="Laravel\Scout\ScoutServiceProvider"`

## Scout Driver?

Untuk dapat menggunakan Laravel Scout, pada file `.env` kita membutuhkan variabel `SCOUT_DRIVER` yang memiliki value `database`, bukan tanpa alasan mengapa value-nya adalah `database` (semoga masih ingat dengan driver yang gue pilih seperti yang tertulis di paragraf sebelumnya).

```php
SCOUT_DRIVER=database
```

## Give me a path!

Rute yang akan gue pakai kali ini adalah `something/users` yang mana menggunakan method `get` maka bisa menulisnya seperti ini:

```php
Route::get('/users', [UserController::class, 'index'])->name('users.index');
```

Ya, dari cuplikan singkat kode di atas gue mennggunakan fungsi `index` yang ada pada controller user dan memberi nama `users.index` (ini engga wajib cuman karena kebiasaan & memudahkan pemanggilan rute kedepannya)

## Very Model

Oke, karena di sini data yang ingin gue jadikan tumbal adalah data user, maka gue membutuhkan `use Searchable` dan meng-import-nya di `user model`.

```php
use Laravel\Scout\Searchable;

class User extends Authenticatable
{
  public function toSearchableArray(): array
    {
      return [
        'name' => $this->name,
      ];
  }
}
```

Data yang gue cari hanya berdasarkan nama, maka gue hanya butuh 'kembalian' `'name' => $this->name`, ini opsional sesuaikan saja berdasarkan kebutuhan.

## The Controller

```php
<?php

namespace App\Http\Controllers;

use App\Models\User;
use Illuminate\Http\Request;

class UserController extends Controller
{
    public function index(Request $request)
    {
        if ($request->keyword) {
            $users = User::search($request->keyword)->get();
        } else {
            $users = User::get();
        }

        return view('users.index', compact('users'));
    }
}
```

Jika kita perhatikan potongan kode di atas, gue menulis parameter `Request $request` yang harapannya nanti akan menangkap setiap `request` yang kita tulis pada `input` section yang ada di `views/users/index.blade.php`.

### View

Bentar ambil rokok.

Variabel `$users` dari controller user sudah bisa kita panggil (thanks to `compact()` function!), yang dibutuhkan sekarang adalah menampilakan semua data dan `form` untuk melakukan pencarian.

```php
  <form action="{{ route('users.index') }}" method="get">
    <input type="text" name="keyword" placeholder="cari nama...">
  </form>
```

Hal yang ingin gue soroti di sini adalah nama dari `input` yaitu `keyword` (semoga masih ingat dengan `Request $request` yang ada pada bagian controller), `keyword` inilah yang akan dijadikan parameter nantinya.

Lanjut, dibagian ini gue melakukan perulangan untuk menampilkan semua data yang ada.

```php
  <ul>
    @foreach ($users as $user)
      <li>{{ $user->name }} — {{ $user->email }}</li>
    @endforeach
  </ul>
```

Terlihat familiar bukan?

## Run development mode

Sudah menjadi rahasia umum jika ingin menjalankan Laravel-based project yaitu dengan perintah `php artisan serve` dan by default Laravel menggunakan port 8000, artinya bisa kita akses via peramban dengan url `127.0.0.1:8000/users` atau jika lebih familiar `localhost:8000/users`

## Show me the result

Perlu dicatat bahwa di sini gue hanya ingin membahas apa dan bagaimana cara menggunakan Laravel Scout, karena hal tersebut-lah gue tidak teralalu peduli dengan tampilannya alias seadanya haha.

![halaman users](/image/berkenalan-dengan-laravel-scout/users-index.png)

Gue mencoba melakukan pencarian dengan kata kunci krido (narsis banget gila lol)
![hasil pencarian](/image/berkenalan-dengan-laravel-scout/hasil-pencarian.png)

## Penutup

That's it, terima kasih sudah membaca semoga tidak menjadikan hari-harimu semakin pusing.
