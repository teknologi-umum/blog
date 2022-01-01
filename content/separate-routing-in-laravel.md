---
title: Memisahkan Routing agar lebih mudah untuk di-maintain di Laravel (Separate Routing in Laravel)
desc: Laravel is a web application framework with expressive, elegant syntax. A web framework provides a structure and starting point for creating your application, allowing you to focus on creating something amazing while we sweat the details.
author: Wahidin Aji
github: WahidinAji
twitter: a17wahidin
telegram:
cover: https://laravel.com/img/logomark.min.svg
date: 2022-01-01
categories:
  - laravel
  - php
  - tips
---

Singkat saja, sederhananya didalam routing laravel biasanya kita menempatkannya pada 1 file web.php. secara harfiah memang seperti itu, akan tetapi ketika project sudah besar dan ada berbagai macam routing, terkadang itu akan membuat kita merasa kesulitan untuk menemukan routing mana yang akan kita edit. Contoh,

```php
Route::prefix('front')->name('front.')->middleware('auth','user')->group(function (){
  /**
   * your routing for public page here.
  */
});
Route::prefix('backoffice')->name('backoffice.')->group(function () {
    Route::get('login', [BackofficeLoginController::class, 'index'])->name('login');
    Route::post('authenticate', [BackofficeLoginController::class, 'authenticate'])->name('authenticate');
});

Route::prefix('seller')->name('seller.')->group(function () {
    Route::get('login', [SellerLoginController::class, 'index'])->name('login');
    Route::post('authenticate', [SellerLoginController::class, 'authenticate'])->name('authenticate');
    Route::get('register', [SellerRegisterController::class, 'index'])->name('register');
    Route::post('register', [SellerRegisterController::class, 'store'])->name('register.store');
});
Route::group(['middleware' => ['auth']], function () {
    Route::prefix('account')->name('account.')->group(function () {
        Route::get('faqs', [FaqController::class, 'index'])->name('faqs');
        Route::get('profile', [ProfileController::class, 'index'])->name('profile');
        Route::get('edit-profile', [ProfileController::class, 'edit'])->name('profile.edit');
        Route::post('profile', [ProfileController::class, 'update'])->name('profile.update');
        Route::post('update-avatar', [ProfileController::class, 'avatarUpdate'])->name('avatar.update');
        Route::get('change-password', [ChangePasswordController::class, 'index'])->name('change-password');
        Route::post('change-password', [ChangePasswordController::class, 'update'])->name('change-password.update');
        Route::get('user-manuals', [UserManualController::class, 'index'])->name('user-manuals');
        Route::get('user-manuals/{id}/download', [UserManualController::class, 'download'])->name('user-manuals.download');
        Route::get('notifications', [NotificationController::class, 'index'])->name('notifications');
        Route::get('notifications/{id}', [NotificationController::class, 'show'])->name('notifications.show');
    });
    Route::namespace('Systems')->prefix('systems')->name('systems.')->group(function () {
      /**
       * your routing for systems panel page here.
      */
    });
    Route::namespace('Backoffice')->name('backoffice.')->prefix('backoffice')->group(function () {
      /**
       * your routing for backoffice panel page here.
      */
    });
});
```

mungkin contohnya terlihat sedikit complex. sebentar, saya buatkan contoh yang lebih sederhana.

<p align="center" style={{fontSize: "0.875em"}}> gambar 1</p>

![This is a routing image before edit](https://raw.githubusercontent.com/WahidinAji/tips-teknum-assets/master/routing%20laravel%20tip/before%20edit%20routing.png)
pada gambar diatas ini 👆, terlihat ada 2 routing di dalam 1 file `web.php`.
nah, biasanya agar lebih mudah di mapping ketika terjadi perubahan pada routing tertentu, saya biasanya memisahkannya kembali menjadi 1 file berbeda. dari yang sebelumnya struktur file-folder nya seperti ini :

```bash
.
 ├── routes
 |   ├── api.php
 |   ├── channels.php
 |   ├── console.php
 |   ├── web.php
 |
```

menjadi

```bash
.
 ├── routes
 |   ├── admin  <-- untuk ini, saya lebih suka pakai nama web karena didalamnya ada beberpa file routing. untuk kali ini saya spesifikkan saja biar jelas
 |   |   ├── admin.php
 |   ├── api.php
 |   ├── channels.php
 |   ├── console.php
 |   ├── web.php
 |
```

setelah itu, pada `gambar 1` line 6-8 kita pindahkan ke `admin.php`.

<p align="center" style={{fontSize: "0.875em"}}> gambar 3</p>

![This is a routing-admin.php image](https://raw.githubusercontent.com/WahidinAji/tips-teknum-assets/master/routing%20laravel%20tip/how%20to%20use%20in%20admin.php.png)

lah kok cuma line 6-8?  
ya sabarr....

nahh, selanjutnya ini untuk naming dan prefixing kita atur di pengaturan routing. (`pengaturan`) 😁 nya ada di folder `app/Providers/RouteServiceProvider.php`, lihat code pada line 50-55

<p align="center" style={{fontSize: "0.875em"}}> gambar 4</p>

![This is a routing-servie image](https://raw.githubusercontent.com/WahidinAji/tips-teknum-assets/master/routing%20laravel%20tip/admin%20routing%20done.png)
di sanalah kita meletakkan name x prefixnya.

untuk uji coba silahkan lihat pada beberapa gambar ini,

```bash
before edit routing
```

- adminpage
<p align="center" style={{fontSize: "0.875em"}}> gambar 5</p>

![This is a adminpage image before edit routing](https://raw.githubusercontent.com/WahidinAji/tips-teknum-assets/master/routing%20laravel%20tip/before-admin-page.png)

- homepage
<p align="center" style={{fontSize: "0.875em"}}> gambar 6</p>

![This is a home image before edit routing](https://raw.githubusercontent.com/WahidinAji/tips-teknum-assets/master/routing%20laravel%20tip/before-home-page.png)

```bash
after edit routing
```

- adminpage
<p align="center" style={{fontSize: "0.875em"}}> gambar 7</p>

![This is a adminpage image before edit routing](https://raw.githubusercontent.com/WahidinAji/tips-teknum-assets/master/routing%20laravel%20tip/after-admin-page.png)

- homepage
<p align="center" style={{fontSize: "0.875em"}}> gambar 8</p>

![This is a home image before edit routing](https://raw.githubusercontent.com/WahidinAji/tips-teknum-assets/master/routing%20laravel%20tip/after-home-page.png)

### [Repo project](https://github.com/WahidinAji/routing-tips-laravel).

what's next? if you have some req tips. reach me on twitter [@a17wahidin](https://twitter.com/a17wahidin)

```bash
PHP IS STILL ALIVE 😆
```
