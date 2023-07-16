---
title: Belajar Membuat Dokumentasi API dengan Swagger Laravel
desc: Membuat Dokumentasi API dengan Swagger Laravel.
author: Sigit Wasis Subekti
github: Sigit-Wasis
twitter: Sigit_wasis13
telegram: wasissubekti
cover: /image/dokumentasi-api-swagger-laravel/swagger.png
date: 2023-07-16
categories:
    - tutorial
    - swagger
    - laravel
---

Halo Sahabat Koding, selamat membaca artikel yang saya buat yaa 😁 kali ini saya akan berbagi bagaimana cara membuat dokumentasi API dengan Swagger di Laravel (kayaknya sih bisa berjalan di semua versi laravel cuman yang saya pakai sekarang di versi 9).

## Swagger

Swagger adalah seperangkat alat untuk pengembang API dari Perangkat Lunak SmartBear dan spesifikasi sebelumnya yang menjadi dasar Spesifikasi OpenAPI.
Yahh paling enggak tau pengertiannya dulu kan.. cuman ya minimal maksimal harus tau mengenai Dokumentasi API. Swagger dapat diakses melalui https://swagger.io/.

### Langkah - Langkah

-   Install Projek Laravelnya dalam hal ini saya buat nama projeknya <b>example-app</b>

```bash
composer create-project laravel/laravel example-app
```

-   Masuk ke folder projek <b>example-app</b>

```bash
cd example-app
```

-   Install Package Swagger bisa lihat di dokumentasi swagger https://github.com/DarkaOnLine/L5-Swagger

```bash
composer require darkaonline/l5-swagger
```

-   Publish package swagger ke dalam projek laravel

```bash
php artisan vendor:publish --provider "L5Swagger\L5SwaggerServiceProvider"
```

-   Buat Folder dengan nama API di dalam folder app/Http/Contollers.
-   Kemudian Buat File di dalam folder API misalkan dengan nama <b> KategoriBeritaController.php </b> atau bisa generate dengan command line seperti ini

```bash
php artisan make:controller API/KategoriBeritaController
```

-   Kemudian Ketikan di dalam file tersebut untuk membuat Dokumentasi API misalkan menampilkan List Kategori Berita.

```php
    /**
    *    @OA\Get(
    *       path="/kategori-berita",
    *       tags={"Berita"},
    *       operationId="kategoriBerita",
    *       summary="Kategori Berita",
    *       description="Mengambil Data Kategori Berita",
    *       @OA\Response(
    *           response="200",
    *           description="Ok",
    *           @OA\JsonContent
    *           (example={
    *               "success": true,
    *               "message": "Berhasil mengambil Kategori Berita",
    *               "data": {
    *                   {
    *                   "id": "1",
    *                   "nama_kategori": "Pendidikan",
    *                  }
    *              }
    *          }),
    *      ),
    *  )
    */
    public function listKategoriBerita() {
        return 'true';
    }
```

-   Tambahkan @OA\Info() pada file Controller.php yang terdapat di dalam folder Controllers

```php
    <?php

    namespace App\Http\Controllers;

    use Illuminate\Foundation\Auth\Access\AuthorizesRequests;
    use Illuminate\Foundation\Bus\DispatchesJobs;
    use Illuminate\Foundation\Validation\ValidatesRequests;
    use Illuminate\Routing\Controller as BaseController;

    /**
    * @OA\Info(
    *      version="1.0.0",
    *      title="Dokumentasi API",
    *      description="Lorem Ipsum",
    *      @OA\Contact(
    *          email="hi.wasissubekti02@gmail.com"
    *      ),
    *      @OA\License(
    *          name="Apache 2.0",
    *          url="http://www.apache.org/licenses/LICENSE-2.0.html"
    *      )
    * )
    *
    * @OA\Server(
    *      url=L5_SWAGGER_CONST_HOST,
    *      description="Demo API Server"
    * )
    */
    class Controller extends BaseController
    {
        use AuthorizesRequests, DispatchesJobs, ValidatesRequests;
    }
```

-   Ubah URL untuk mengakses API, silahkan buka file l5-swagger.php yang terdapat di dalam folder config, dibagian bawah ubah menjadi seperti ini.

```php
    'constants' => [
        'L5_SWAGGER_CONST_HOST' =>
        env('L5_SWAGGER_CONST_HOST', 'http://localhost:8000/api/v1'),
    ],
```

-   Buat Route untuk menampilkan kategori berita, dengan cara lakukan perubahan pada file api.php yang terdapat di dalam folder routes seperti dibawah ini.

```php
    <?php

    use Illuminate\Support\Facades\Route;
    use App\Http\Controllers\API\KategoriBeritaController;

    /*
    |--------------------------------------------------------------------------
|     API Routes
|    --------------------------------------------------------------------------
|
|     Here is where you can register API routes for your application. These
|     routes are loaded by the RouteServiceProvider within a group which
|     is assigned the "api" middleware group. Enjoy building your API!
|
    */

    Route::group(['prefix' => 'v1'], function () {
        Route::get('kategori-berita', [KategoriBeritaController::class, 'listKategoriBerita']);
    });
```

-   Selanjutkan lakukan generate Documentation API dengan cara :

```bash
php artisan l5-swagger:generate
```

-   Periksa dokumentasi API yang barusan kita buat pada browser dengan mengetikkan URL dibawah ini

<b>http://localhost:8000/api/documentation</b>

Dan pastikan projek laravel telah dijalankan dengan perintah php artisan serve.

-   Maka jika berhasil akan tampil seperti berikut.

![](https://blogger.googleusercontent.com/img/b/R29vZ2xl/AVvXsEiedcaGBIi9qoEzfdsXS0HvNpZOGoqDCF6G_fcGRQEZNoFspWHXpJZA1zNULrUn2P7uDUw92FfiCkdhnVU0VIokUiU_Q6pCvIOnd3orUhLLLbc4bpSQpQwgQbgIVdtqXxd-RmBl2iIc_Ggcw3jrcRXDQcTbIG8hqQujAzIwSt_Tw7c165k_LqXPqKAv-TSv/s640/Group%201.png)

Okeee... Mungkin sekian untuk pembuatan Dokumentasi API dan nanti bisa Explor sendiri lebih jauh mengenai Method yang lainnya..
Semoga bermanfaat!
