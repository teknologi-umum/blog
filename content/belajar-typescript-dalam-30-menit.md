---
title: Belajar Typescript dalam 30 Menit
desc: Typescript adalah bahasa superset dari Javascript. Sepertinya menakutkan, tapi kamu tidak perlu takut lagi kalau kamu bisa belajar Typescript hanya dalam 30 menit.
author: Reinaldy Rafli
github: aldy505
twitter:
telegram: aldy505
date: 2021-09-02
categories:
  - tutorial
  - crash course
  - typescript
---

Tulisan ini terinspirasi dari [Learn Rust in 30 minutes](https://fasterthanli.me/articles/a-half-hour-to-learn-rust) dan berbagai tutorial singkat tentang topik tertentu lainnya. Topik yang dibahas disini tidak mencakup 100% fitur Typescript, karena fiturnya banyak sekali. Namun, lumayan cukup untuk memulai perjalananmu belajar Typescript.

Sebelumnya kamu harus memahami Javascript terlebih dahulu, karena Typescript merupakan suatu bahasa superset (setingkat lebih tinggi) dari Javascript.

## Kenapa Typescript? Kapan harus pakai Typescript?

- Setiap saat, apalagi disaat kamu tidak ingin ada error pada saat aplikasi buatanmu berjalan. Semua kemungkinan error dapat ditangkap saat compile ke Javascript, atau bahkan saat kamu masih mengetik kodenya di code editor kamu!
- Kalau kamu mau menjamin hasil kode kamu berkualitas tanpa error berkepanjangan.
- Dapat akses ke fitur-fitur Javascript yang wujudnya masih proposal Stage 3, tanpa ribet-ribet siapin Babel untuk polyfill kode kamu.
- Autocomplete segala tulisanmu, apalagi saat menggunakan library orang lain.

## Data Types

Pada Javascript, ada beberapa tipe data yang valid, yang kemudian terdapat juga versi _constructor_-nya, yaitu: `String`, `Number`, `Boolean`, `Object`, `Array`, hingga beberapa tipe data lainnya seperti `BigInt`, dan `Date`.

Typescript merupakan bahasa statically typed, artinya tipe datanya bisa (dan sebaiknya) didefinisikan terlebih dahulu.

Sama dengan Javascript, tipe datanya berlaku juga di Typescript, namun untuk `String`, `Number`, `Boolean`, dan `Object` ditulis dengan huruf kecil semua:

```ts
let title: string; // Valid
let author: String; // Error!

let age: number;
let old: boolean;

let name: string = 'Ronny'; // Valid juga
```

Bagaimana kalau tipe datanya tidak kita definisikan terlebih dahulu? Bisa juga! Namun, kalau kita ubah isi tipe datanya, akan error.

```ts
let name = 'Ronny';

name = 'Rubi'; // Valid
name = 30; // Error! name is a variable with a type string!
```

Bagaimana dengan array? Simpel! Ada dua cara:

```ts
// Portfolio mempunyai tipe data array yang isinya hanya tipe string
let portfolio: string[];
let portfolio: Array<string>;

portfolio = ['Graphene', 'Flourite', 'LaodeAI'];
```

Bagaimana kalau kamu mau tipe datanya bebas, benar-benar sebebas mungkin? Bisa pakai `any` (literally, anything). Tapi penggunaan `any` ini agak dijauhi karena... percuma dong pake Typescript kalo ujung-ujungnya pake `any`?

```ts
let anything: any;

// Valid semua
anything = 'literally';
anything = 123;
anything = ['anything'];
anythhing = null;
```

## Union Type

Kalau tipe datanya mau lebih dari satu, bagaimana? Kamu bisa menggunakan _union type_. Sesederhana ini:

```ts
let price: number | string;

price = 30000; // Valid
price = '50000'; // Valid
price = false; // Error!
```

## Literal Type

Tipe data juga bisa didefinisikan secara literal. Benar-benar literal.

```ts
let name: 'Norman' | 'Jason';

name = 'Norman'; // Valid
name = 'Jason'; // Valid
name = 'Dicha'; // Error!
```

## Interface

Interface umumnya dipakai untuk mendefinisikan suatu _schema_ dari tipe data object.

```ts
// Tidak harus dimulai dengan huruf besar,
// "person" aja valid kok. Nggak harus "Person".
// Tapi disini, saya pakai Person biar nggak bingungin aja.
interface Person {
  name: string;
  age: number;
  email: string;
}

// variabel harry punya tipe data Person
const harry: Person = {
  name: 'Harry',
  age: 27,
  email: 'harry@harhar.id',
};
```

Kalau kamu menggunakan IDE seperti Visual Studio Code atau sejenisnya yang mendukung _type annotation_ saat variabel tersebut di-hover, maka akan muncul variabel tersebut harus diisi dengan _key_ apa dan _value_ dengan tipe data apa.

Kerennya lagi, seperti `class`, `interface` bisa di "`extends`" dengan `interface` lain.

```ts
interface Person {
  name: string;
  age: number;
  email: string;
}

interface Programmer extends Person {
  github: string;
  languages: string[];
}

const ronny: Programmer = {
  name: 'Ronny',
  age: 26,
  email: 'ron@dot.net',
  github: 'ronnygunawan',
  languages: ['C#', 'Kotlin', 'Typescript'],
};
```

Bagaimana kalau ada _key_ yang wujudnya optional/tidak harus diisi? Bisa dengan memberikan `?`:

```ts
interface Person {
  name: string; // Wajib diisi
  job?: string; // Tidak wajib diisi
}
```

## Type

Tipe data `type` itu menyerupai `interface`, tujuannya kurang lebih sama, namun ada beberapa konvensi yang menggunakan `interface` hanya untuk tipe data `object` dan menggunakan `type` untuk tipe data lain (seperti union type & literal type). Tapi bukan berarti `type` tidak bisa digunakan untuk tipe data `object`, dua-duanya valid.

```ts
type person = {
  name: string;
};

interface person {
  name: string;
}

// Dua hal ini sama saja
```

`type` bisa juga untuk mendefinisikan sesuatu, yang nanti bisa digabungkan dengan array:

```ts
// Union type tadi bisa dipakai disini juga!
type ErrorStatus = 404 | 429 | 500 | 503;

let error: ErrorStatus;
error = 404;

let errors: ErrorStatus[];
errors = [404, 429, 500, 503];
```

Tadi sempat bahas union type, lalu bagaimana kalau `type` ingin di `extends` seperti `interface`? Bisa dengan `&`:

```ts
type Name = { name: string };
type Email = { email: string };
type Person = Name & Email;

const person: Person = { name: 'Another', email: 'another@person.com' };
```

Kalau kamu masih kurang paham dan penasaran, bisa cek [Typescript Handbook - Differences Between Type Aliases and Interfaces](https://www.typescriptlang.org/docs/handbook/2/everyday-types.html#differences-between-type-aliases-and-interfaces).

## Object

Topik ini agak tricky, sejauh ini kita bisa mendefinisikan object dengan cara `interface` atau `type` tadi kan? Tapi bagaimana kalau kita ingin tipe datanya object tanpa peduli konten dari objectnya itu apa?

Kamu bisa pakai `Record<typeKey, typeValue>`.

```ts
let something: Record<string, number> = {
  some: 12,
  thing: 42,
};
```

Atau kalau malas pakai tipe data `object` saja. Tapi nggak terlalu direkomendasikan:

```ts
let something: object = {};
```

## Function

Tipe data dari parameter function dan tipe data hasil return nya juga bisa kok didefinisikan.

```ts
// Function dengan nama "hackNASA", punya 3 parameters:
// port - tipe data number
// key - tipe data string
// verbose - tipe data boolean
// Dia akan mereturn void (alias, nggak return apa-apa)
function hackNASA(port: number, key: string, verbose: boolean): void {
  // ...
}

// Bagaimana dengan async function yang return Promise?
// Bisa pakai Promise<tipe data output>
async function stealYourGirlfriend(yourGF: name): Promise<string> {
  // ...
}
```

"Ah, aku tipe orang yang functionnya suka dibikin dalam `const`! Bisa juga kok:

```ts
const hackNASA = (port: number, key: string, verbose: boolean): void => { ... }
```

Atau suka yang lebih powerful lagi? Kita definisikan dulu tipe functionnya, lalu kita buat jadi function.

```ts
type NASAFunction = (port: number, key: string, verbose: boolean) => void

const hackNASA: NASAFunction = (port, key, verbose) => { ... }
// Tipe data port, key, dan verbose sudah di infer
// oleh tipe data NASAFunction tadi.
```

Basic selesai. Mari kita masuk ke ranah dimana Typescript mulai jauh berbeda dibandingkan dengan Javascript.

## Intermediate: Function overloads

Kalau kamu nggak suka dengan fungsi yang cuma bisa menerima parameters dan return type dengan satu cara saja, kamu bisa menggunakan function overload.

```ts
function insertData(id: string, data: Content): Data;
function insertData(id: string, name: string, data: Content): Data {
  // ...
}
```

## Intermediate: Class & implements

Kalau kamu hobi banget sama yang namanya OOP, dan bingung cara mendefinisikan constructor dalam sebuah class, kamu bisa mulai dengan buat interface-nya terlebih dahulu.

```ts
interface Post {
  id: number;
  title: string;
  author: string;
  date: Date;
  content: string;
}

interface BlogConstructor {
  url: string;
  posts: Post[];
}

interface BlogClass extends BlogConstructor {
  addPost(title: string, author: string, content: string): string;
  editPost(id: string, content: string): string;
  deletePost(id: string): boolean;
}
```

Lalu bisa menggunakan `implements` di dalam class:

```ts
class Blog implements BlogClass {
  constructor(url: string, posts: Post[]) {
    this.url = url;
    this.posts = posts;
  }

  addPost(title, author, content) { ... }

  editPost(id, content) { ... }

  deletePost(id) { ... }
}
```

## Intermediate: Enum

Enum adalah satu tipe data yang ada di berbagai bahasa pemrogramman lain, tapi di Javascript nggak ada.

Sederhananya, enum adalah sebuah named constant. Bersifat seperti variabel yang mempunyai value tetap, tujannya bisa dipakai untuk banyak hal.

```ts
enum Language {
  Javascript, // Ini ekuivalen dengan angka 0
  Typescript, // Lalu, ini 1, dan seterusnya
  Dart,
}

// Penggunaannya
function choose(lang: Language): string {
  switch (lang) {
    case Language.Javascript:
      return 'You poor noob';
    case Language.Typescript:
      return 'I respect you';
    case Language.Dart:
      return 'What kind of language is that?';
    default:
      return 'Language must be supplied!';
  }
}

choose(Language.Typescript); // "I respect you"
choose(1); // "I respect you"
choose('blabla'); // Error: Argument of type '"blabla"' is not assignable to parameter of type 'Language'.
```

## Advanced: Generics

Karena orang Indonesia hobinya menyusahkan diri sendiri, mari kita belajar generics.

Generics dalam bahasa pemrograman merupakan gaya penulisan dimana tipe datanya di spesifikasi nanti pada saat penggunaannya.

Dalam Typescript, generics ditandai dengan `<>`.

```ts
// Nggak harus T, apa aja bisa yang penting
// nggak pernah di definisikan sebelumnya.
function eatFood<T>(food: T): number { ... }
// Tipe data parameter food ini nanti user nya yang definisiin.

eatFood('spagetti') // Error! tipe data T harus didefinisikan terlebih dahulu
eatFood<string>('pizza')
eatFood<'hamburger'>('hamburger')
```

Bisa juga didefinisikan terlebih dahulu, agar nggak ngawur-ngawur amat penggunaannya.

```ts
type Food = 'pizza' | 'hamburger' | 'fried chicken'

function eatFood<G extends Food>(food: G): number { ... }

eatFood('pizza') // Valid
eatFood('macaroni') // Error!

eatFood<'macaroni'>('macaroni') // Valid!
```

Apakah generics bisa lebih dari satu? Yes.

```ts
function getFat<A extends string, B extends number>(food: A, weight: B): number { ... }
```

Seharusnya sudah 30 menit, termasuk mencerna semua tulisan yang ada disini. Seharusnya saat kamu baca tulisan ini, paling nggak kamu sudah mengetahui hal-hal yang aku sendiri harus menghabiskan berbulan-bulan untuk belajarnya.

Masih banyak lagi fitur-fitur Typescript lain yang bisa kamu pelajari, salah satunya yang membuat Typescript se-powerful itu adalah [Decorators](https://www.typescriptlang.org/docs/handbook/decorators.html).

Tadi juga sempat bertemu dengan `Array<>`, `Records<>` dan `Promise<>`. Masih banyak [utility types lainnya](https://www.typescriptlang.org/docs/handbook/utility-types.html) yang bisa kamu pelajari. Salah satunya yang paling umum dipakai adalah `Partial<>`, `Pick<>`, dan `Omit<>`.

Kalau kamu suka bikin library untuk Javascript, kamu juga bisa belajar [Typescript Modules](https://www.typescriptlang.org/docs/handbook/modules.html) dan [Declaration Files](https://www.typescriptlang.org/docs/handbook/declaration-files/introduction.html).
