---
title: Top 5 Programming Language for Serious Backend Programmer
desc: Top 5 Programming Language for Serious Backend Programmer
author: Valian Masdani
github: vmasdani
twitter: VMasdani
telegram: vmasdani
cover: https://content.techgig.com/thumb/msid-67337479,width-860,resizemode-4/Top-5-programming-languages-for-backend-web-development.jpg?94297
date: 2022-02-05
categories:
  - backend
  - web
  - programming
---

There are tons upon tons of programming languages in the market nowadays, and it might be overwhelming for people who just started programming. This question is often asked among the beginner programmers:

**How do we pick the right programming language?**

Here's the thing about picking the most powerful, best ever programming language:

1. You can't
2. It depends

Why **can't you**? Because there are always a few considerations in picking a programming language for a certain field of work/expertise. In my experience, some of them includes:

1. **Popularity**  
   Is the language commonly used? Does it have big communities? Are big companies using it, supporting it, and endorsing it?  
   Popularity should be a strong factor in deciding which tech to use, because the bigger the community is, the easier for you to find a solution to a sometimes weird and quirky problem in a programming language, compiler, tooling, etc. You don't want to spend a few days trying to fix a weird bug when the fix is actually just adding a semicolon or comma, adding a single configuration line, or simple stupid things that can cost you precious time when trying to fix it.

2. **Demand**  
   This one applies if you are looking for programming language for work related purposes. You do not want to learn a language which has little to none job vacancies with decent pay to put food on your table.

3. **Local community**  
   Sometimes it's best to learn a particular tech within a local community in your area (city, country, university, etc). In some cases you can even share your knowledge in such social circles, brainstorm ideas clearer in person, and comfortably talk to people with common interest.

4. **Paradigm & use cases**  
   Always use the right tool for the right job. For example, you don't want to use low level languages (C, C++, Rust) to to prototype and build proof of concepts, we have high level languages (Javascript, Python, Go) for that. And you also don't want to use a high level language for something like a smart watch, set top boxes, or a micro-controller because they tend to have very little memory, and in this case low level language is better suited than the high level ones.

Now we are going to review the top 5 programming languages based on the considerations we have made above, which fit backend web programming.

tl;dr:

- 5. Spring Boot + Kotlin
- 4. Typescript NodeJS
- 3. PHP
- 2. Golang
- 1. .NET Core / C#

## 5. Spring Boot + Kotlin

- **Typing**: Strong, static
- **Founder**: Jetbrains (Kotlin), VMWare (Spring)
- **Paradigm**: multi paradigm, mainly object oriented

If you are looking for a "powerful" web backend solution which has been around for a long time and you want to build a cost effective enterprise web application, enter Spring and Kotlin.

Spring boot is a very mature open source web framework which runs on top of [JVM (Java Virtual Machine)](https://en.wikipedia.org/wiki/Java_virtual_machine) and is developed by the team at VMWare. It provides a complete solution for building web applications and utilizes modern web technologies such as **HATEOAS** & **microservices gateway** (Netflix Zuul & Eureka server) for data processing/presentation, and server templating engine such as [Thymeleaf](https://www.thymeleaf.org/) or [JSP](https://en.wikipedia.org/wiki/Jakarta_Server_Pages).

While primarily designed for **Java** in the userland aspect, **Kotlin** support in Spring Boot is fantastic. I think what the Java flavored Spring/Spring Boot framework lacks is modern programming language features like type inference, null safety, immutable struct/classes/variables, declarative queries, expression-based syntax etc in which Kotlin has all of them.

On top of the modern programming language features, Kotlin has 100% interoperability with Java, which makes Spring Boot also 100% compatible with Kotlin!

Here's how a Spring Boot REST API project in Kotlin typically looks like:

- Model

```kotlin
@Entity
data class Person(
   @Id
   @GeneratedValue(strategy=GenerationType.AUTO)
   var id: Long? = null,
   var name: String? = null,

   @ManyToOne
   var department: Department? = null,

   @CreationTimestamp
   var createdAt: Instant? = null
   @UpdateTimestamp
   var updatedAt: Instant? = null
)
```

- Repository

```kotlin
interface PersonRepository : JpaRepository<Person, Long>, JpaSpecificationExecutor<Person> {
}
```

- Controller

```kotlin
@RestController
class PersonController(
   private val environment: Environment,
   private val personRepository : PersonRepository
) {
   @GetMapping("/people")
   fun all() = personRepository.findAll()

   @GetMapping("/people/{id}")
   fun get(@PathVariable id: Long) = personRepository.findById(id)

   @PostMapping("/people")
   fun post(@RequestBody person: Person)
      = ResponseEntity.status(HttpStatus.CREATED).body(personRepository.save(person))
}
```

Writing Spring Boot codes using Kotlin is very productive. Many of the reasons are because of:

- **function return inference** which can lead to writing very concise controller functions.
- **dataclasses**
  which enables you to create a struct/record data type without **getters** and **setters**. Although you can generate getters and setters through most JVM-based IDEs like **IntelliJ Idea Community** and **Eclipse IDE**, not having to write getters and setters is very intuitive and not time-consuming.
- **declarative utility functions** such as **map, filter, fold** which Java does not (natively) have, and makes writing loops very, very concise.

```kotlin
// find something in array
val found = people.find { p -> p.id == selectedID }

// filter people more than 22 years old
val ageTwentyTwo = people.filter { p -> p.age > 22 }

// map people's ages
val onlyAges = people.map { p -> p.age }

```

- Lastly, one of the most important benefit of writing in Kotlin is **null safety**. Rolling-release project model which has very fast-changing RDBMS is very prone to error, and the data that is returned from the RDBMS might not always have a value, which might be a result of **column update**. But the null safety feature in Kotlin prevents your program from getting a random **null pointer exception** which you might will often encounter while writing Java due to Java not having nullable types, so it assumes that every variables are nullable by default, so you can't accidentally unpack a property which is actually **null** while writing Kotlin.

However, as good as Spring + Kotlin is, I would not choose Spring + Kotlin or any JVM based runtime to create a new web-based project these days, because of:

1. **Memory constraints**: JVM apps are notorious for having very big memory usage
2. **Asynchronous routines not first-class**. Although Kotlin has a neat green threads/coroutines system in the `kotlinx` library, Spring/Spring Boot does not natively support them, and setting them up is painful if you are not used to JVM project management system such as Gradle/Maven

If you or your company already has a Spring Boot project with Java, I really, really recommend migrating to Kotlin because the developer experience and productivity is like night and day.

## 4. Typescript NodeJS

- **Typing**: Strong, static
- **Founder**: Ryan Dahl (NodeJS), Typescript (Anders Hejlsberg/Microsoft)
- **Paradigm**: multi paradigm, mainly functional

**NodeJS** is probably one of the most common tools used in the backend web programming community, and that is not wihout reason. There are tons upon tons of free services providing NodeJS-based runtime because the runtime/language is **that** versatile and lightweight, and I think should be crowned the **write once, run anywhere** title--rather than Java--because Javascript/Node does run everywhere.

One of the most popular tool for creating web HTTP APIs for Node.JS is **Express**. It's an unopinionated web framework which is designed to create web APIs with great freedom, and the setup is very, very simple. Here is an example Express project:

```js
const express = require("express");
const app = express();
const port = 3000;

app.get("/", (req, res) => {
  res.send("Hello World!");
});

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`);
});
```

The above code will spin up an HTTP server on port 3000 inside the machine you are running your code in.

To send JSON, just use the `res.json()` function:

```js
app.get("/", (req, res) => {
  res.json({
    hello: "world!",
  });
});
```

Very, very simple.

One of the greatest thing about using NodeJS for backend server is being able to use **Typescript**. Dynamic languages like PHP or Python nowadays have something called **type hinting** in order for developers to be able to describe types for an object/variable/function return type. But in my opinion, a simple type hint feature is not really that powerful, and only helps developers in the development process. In the actual program runtime, these "types" are bound to change dynamically and oftentimes the developers are not aware of the "change" due to internal bugs or bugs from external APIs.

Typescript took the "weak type hinting" problem to a whole different level. Instead of just type hinting, Typescript has a full-blown **compiler** which really catches type errors in compile time--assuming that your program is fully written in Typescript. If you have some Javascript in your code, or there's a library you are using which still uses Javascript but you want to use it in a Typescript program, there's an **escape hatch** for you to use Javascript in a Typescript application, by using the `any` type.

Typescript is actually a **transpiler** which converts your Typescript files to Javascript files before putting it in a NodeJS runtime. However, you can directly run a Typescript project directly in NodeJS by using `ts-node`, which setup is as simple as this:

1. Create a NodeJS project

```sh
npm init
```

2. Install NPM dependencies

```
npm i @types/node @types/express ts-node
```

3. Create an `index.ts` file containing:

```ts
import express from "express";

const app = express();

app.get("/", (req, res) => {
  res.send({ hello: "world!" });
});

app.listen(3000);
```

4. Add `start` script to `package.json` file

```json
...
"scripts": {
   "test": "echo \"Error: no test specified\" && exit 1",
   "start": "ts-node index.ts"
},
...

```

5. Run your project

```sh
npm start
```

The server will spin up a Node Typescript project in `http://localhost:3000`.

### Persistence (Database/storage) Layer

There are many persistence options in NodeJS and Typescript such as [TypeORM](https://typeorm.io/) and [Sequelize](https://sequelize.org/) ORMs, but there's this one tech that is very nice called [Prisma](https://www.prisma.io/) and its first-class support is NodeJS. It makes writing persistence models very easy. It supports PostgreSQL, MySQL, SQLite, SQL server, and MongoDB currently.

Defining persistence model is as easy as this, thanks to code generation:

```prisma
datasource db {
  provider = "sqlite"
  url      = env("DATABASE_URL")
}

generator client {
  provider = "prisma-client-js"
}

model Post {
  id        Int @id @default(autoincrement())
  title     String
  content   String?
  published Boolean @default(false)
  author    User? @relation(fields: [authorId], references: [id])
  authorId  Int?
}
```

and you have a full SQLite connection interface which you can use in your project.

NodeJS is very nice for web projects, due to the massive community and platform support in which you can host NodeJS back-end projects everywhere, such as [Firebase Functions](https://firebase.google.com/products/functions), [Heroku](https://www.heroku.com/), [Vercel](https://vercel.com/guides/using-express-with-vercel), even CPanel hosting has NodeJS support, and these options are very cheap!

You can also deploy NodeJS in your own Virtual Private Server or on-premise servers by using port forwarding technology using the open-source **NGINX** or **Apache** Web servers.

## 3. PHP

- **Typing**: Weak, dynamic (optional static)
- **Founder**: Rasmus Lerdorf
- **Paradigm**: multi paradigm, mainly imperative

PHP is still the king of web programming, as it is the true pioneer and kickstarter of dynamic web applications. In fact, around 50% or more of the world wide web is still using PHP.

Back in the days, people used to use PHP with a CMS (content management system) such as **WordPress, Drupal, or Joomla** to make quick blogs or landing pages. But nowadays, creating high-level dynamic web applications with concurrent access and persistent storage is easily achieveable because of frameworks like [Laravel](https://laravel.com/) or [Lumen](https://lumen.laravel.com/).

Deploying PHP is very cheap, and that is because PHP can easily run on CPanel shared hosting servers, which mostly is packaged with **Apache** web server for serving and **MySQL** database for persistence/storage layer.

This is an example of a PHP code for creating database (Eloquent) model in Lumen, and routing.

1. First, you have to generate the migration.

```sh
$ php artisan make:migration create_employees_table
```

2. Then you go to the newly created file, for example 
```
database/migrations/2022_02_05_114054_create_employees_table.php
```
and define your database schema there.

```php
<?php
 public function up()
    {
        Schema::create('employees', function (Blueprint $table) {
            $table->id();

            $table->text('name')->nullable();
            $table->text('phone')->nullable();
            $table->text('address')->nullable();
            $table->bigInteger('employee_number')->nullable();
            $table->dateTime('date_of_birth')->nullable();

            $table->timestamps();
        });
    }
```

3. And then you define the model of the schema in `app/Models/Employee.php`.

```php
<?php
   namespace App\Models;

   class Employee extends Model
   {
      protected $fillable = [
         'id',
         'name',
         'phone',
         'address',
         'employee_number',
         'date_of_birth'
      ];

      // Additional property for date, for ISO8601 date formatting
      protected $dates = [
         'date_of_birth'
      ];
   }

```

4. Uncomment the line in `bootstrap/app.php` to use **Eloquent**:

```php
<?php
   $app->withEloquent(); // Uncomment this line

```

5. Then you can query the model in the `routes/web.php` file in the endpoint routes.

```php
<?php
   $router->get('/employees', function () use ($router) {
    return Employee::all();
   });

   $router->get('/employees/{id}', function ($id) use ($router) {
      return Employee::find($id);
   });

   $router->post('/employees', function (Request $request) use ($router) {
      $e = json_decode($request->getContent());
      return  Employee::updateOrCreate(['id' => $e?->id ], (array) $e);
   });
```

These are the steps in order to create a simple JSON API in the Lumen web framework. The steps are very opinionated but relatively straightforward.

The reason why PHP hosting is very cheap is because you can add as many PHP app/services as you want, because in most cases, there will only be one web server (Apache / NGINX + PHP FPM) which handles all of your requests, in which all of the requests are purely functional and does not cost any random access memory when idle, and will only consume memory when a request goes into any of these services, truly functional and stateless.

```
                                           ┌────────────────┐
                                      ┌────┤Human Resource  │
                                      │    │Laravel service │
                                      │    └────────────────┘
                                      │
                                      │    ┌────────────────┐
┌───────────────┐                     │    │Single sign-on  │
│ Web browser   ├─┐                   │ ┌──┤Laravel service │
└───────────────┘ │ ┌───────────────┐ │ │  └────────────────┘
                  └─┤Shared hosting ├─┘ │
                    │server w/Apache│   │
┌───────────────┐ ┌─┤               ├───┘  ┌────────────────┐
│ Mobile app    ├─┘ │PHP + MySQL    │    ┌─┤Attendance      │
└───────────────┘   │               ├────┘ │Laravel service │
                    │               │      └────────────────┘
                    │               ├───┐
                    └───────────────┘   │  ┌────────────────┐
                                        └──┤ Work orders    │
                                           │ Laravel service│
                                           └────────────────┘
```

As you can see from the above diagram, there only needs to be **one** web server instance to host all of the 4 services, in order for any clients--for example mobile or web browser--to be able to access the services over **HTTP**.

The downside of this concept, however, is exactly that you are limited to **HTTP**. If you want to add other protocols such as gRPC, MQTT, Kafka, or any type of listeners, you are out of luck. Publishing in each of these protocols is possible since these protocols use TCP/UDP, but creating subscribers or listeners is a hassle.

It **is** possible, but there are less resource/tutorials on creating PHP listeners/subscribers in anything other than HTTP, and that often means that you won't be able to use Apache/PHP-FPM and you have to opt to something like [Swoole](https://openswoole.com/) runtime.

You are also limited from creating in-app schedulers. For example if you want to create a script that runs every 5 minutes, while it is not hard to do in some languages, in PHP, you have to create an external cron trigger and you cannot integrate the scheduler inside your PHP Laravel/Lumen app.

About **optional static typing**, there's a really neat package called [JsonMapper](https://github.com/JsonMapper/JsonMapper) which is sponsored by [JetBrains](https://www.jetbrains.com/?from=JsonMapper), the company responsible for Android Studio's base (Intellij IDEA) IDE, and the Kotlin programming language.

The usage of JSONMapper is as simple as this:

```php
<?php
   class User
   {
      #[MapFrom("Identifier")]
      public int $id;
      #[MapFrom("UserName")]
      public string $name;
   }

   $cache = new NullCache();
   $mapper = (new JsonMapperFactory())->create(
      new PropertyMapper(),
      new Attributes(),
      new TypedProperties($cache)
   );
   $object = new User();

   $mapper->mapObjectFromString(json_decode('{ "UserName": "John Doe", "Identifier": 42 }'), $object);

   echo $object->getId(); // 42
   echo $object->getName(); // "John Doe"

```

You may have noticed that it is now possible to use code annotations in PHP such as `#[MapFrom("Identifier")]`, and that is a new feature of PHP 8 called attributes, in order to map JSON attribute into the respective php property name, like above example, when you want to map `"UserName"` but your PHP class' object property is named `$name`. You can write something like this:

```php
<?php
   #[MapFrom("UserName")]
   public string $name;
```

There are many improvements in PHP 8 such as:

- Annotations
- Null safety
- Named arguments
- Match expression

and many other [features](https://www.php.net/releases/8.0/en.php) I have not mentioned, which makes developer experiences easier, saner, and far more enjoyable compared to older times with PHP 5, so that hair-pulling will happen less while programming.

PHP is regaining traction.

## 2. Golang

- **Typing**: Strong, static
- **Founder**: Google
- **Paradigm**: multi paradigm, mainly functional & imperative

Golang is a relatively new programming language made by Google. Its original purpose was to replace C/C++ for some parts of internal Google code because there were too much boilerplate and the codebase was becoming too verbose. It has now become one of the most used programming language for web backend and CLI tools such as big companies, project, and/or services like [Docker](https://docs.docker.com/get-started/overview/#the-underlying-technology), [Gojek](https://www.gojek.io/blog/ruby-java-golang), [Kubernetes](https://en.wikipedia.org/wiki/Kubernetes), [yay](https://github.com/Jguer/yay) (arch linux AUR helper) etc.

See [Golang's FAQ](https://golang.org/doc/faq#creating_a_new_language)

> Go was born out of frustration with existing languages and environments for the work we were doing at Google. Programming had become too difficult and the choice of languages was partly to blame. One had to choose either efficient compilation, efficient execution, or ease of programming; all three were not available in the same mainstream language. Programmers who could were choosing ease over safety and efficiency by moving to dynamically typed languages such as Python and JavaScript rather than C++ or, to a lesser extent, Java.

Golang was built with simplicity, and it is **very pragmatic**. Meaning that a lot of actions you do while writing in the language affects your program's behaviour.

For example, in Golang you do not have to explicitly declare that a variable, function, or struct is exported or not exported like you do in javascript/typescript.

```js
// Exported
export const formatDateTime = () => {};

// Not exported
const formatDateTime = () => {};
```

Instead, you use **uppercase first letter** to export something.

```go
// Exported
func FormatDateTime() {

}

// Not exported
func formatDateTime() {

}
```

and there are many more pragmatic language designs and shorthand/sugar syntaxes. Such as variable declaration:

```go
// these both are the same
var myVar int = 0
myVar := 0
```

If you have written Python before, you might notice that variable declaration is the same in both python and go, just write the variable name and then assign it to a value, like `myVar := 0`. But the difference is that Go **infers** the variable type of a value, meaning that Go knows the type of the value zero (0) and will automatically assign zero as `int`. This is a modern programming language compiler technique called [Type inference](https://en.wikipedia.org/wiki/Type_inference), while Python uses [Duck typing](https://en.wikipedia.org/wiki/Duck_typing).

Creating an HTTP server with router is very easy in Golang. Using the `gorilla/mux` package, we can write a barebone REST server as simple as this:

```go
package main

import (
    "net/http"
    "log"
    "github.com/gorilla/mux"
)

func YourHandler(w http.ResponseWriter, r *http.Request) {
    w.Write([]byte("Gorilla!\n"))
}

func main() {
    r := mux.NewRouter()
    r.HandleFunc("/", YourHandler)
    log.Fatal(http.ListenAndServe(":8000", r))
}
```

And there are also projects like [GORM](https://gorm.io/index.html) for database object relational mapper and [HTTP frameworks](https://github.com/mingrammer/go-web-framework-stars) such as Gin Gonic, Echo, Fiber, Beego, etc. The web programming community in Golang is quite rich. You can even implement your own http web server with built-in Golang packages easily from the ground up using `net/http` module.

Golang is a great language, but not without pain points. These are the things that I find slightly obnoxious about Golang:

1. **Error handling, `if err != nil` hell**  
   Golang has a very innovative error catching system, because of the **multiple return value** functionality, you can return an error alongside data as a return type in a function, in contrast to many programming languages which still use `try/catch/finally` mechanism. For example if we want to convert string to int, we can execute:

```go
numStr := "35"
num, err := strconv.Atoi(numStr)

if err != nil {
   panic("Error converting " + numStr + "!" )
}

fmt.Println("Your number:", num)
```

This seems to work really well, protects your program from unnecessarily hair-pulling bugs and is very convenient so that errors can be caught early in compile-time. However, if you have **many functions that has error return values**, you have to write something like this:

```go
numStr := "35"
num, err := strconv.Atoi(numStr)

if err != nil {
   panic("Error converting " + numStr + "!" )
}

fmt.Println("Your number:", num)

resultOne, err := DoSomethingwithNum(num)

if err != nil {
   panic("Error doing something to num!" )
}

resultTwo, err := DoAnotherThingwithNum(resultOne)

if err != nil {
   panic("Error doing another thing to num!" )
}
```

So many `if err != nil`!

2. **Lack of `map, filter, reduce, foreach` in built-in golang std library**  
   Golang **does not have** the map, reduce, filter, foreach functionality in its std library. Which is a bit of a dealbreaker for me because most modern programming language has this feature, I tried very hard to adapt to the fact that golang does not have these features in the language, but I just could not get comfortable with the fact to this date.

In Javascript/Typescript, you can easily do this:

```js
employees.find((e) => e.id === selectedId)?.name;
```

But in Go, since there is no `Find(arr, func)` function built into the language, I have to manually loop for each items and break if I found the item.

```go
var employee Employee
var found = false

for _, e := range employees {
   if e.ID == selectedId {
      employee = e
      found = true
      break
   }
}

if found {
   fmt.Println("Employee name:", employee.Name)
}
```

Or you can use the [go-funk](https://github.com/thoas/go-funk) utility library:

```go
import (
	"fmt"

	"github.com/thoas/go-funk"
)

...

r, ok := funk.Find(employees, func(e Employee) bool {
   return e.Name == "Valian"
}).(Employee)

if !ok {
   fmt.Println("Employee not found.")
   return
}

fmt.Println("Employee found", r)
```

3. **Lack of generics**  
   One of the programming principle that you should hold dear is **DRY**, a.k.a. **Don't Repeat Yourself**, which means tedious tasks should be minimized as much as possible by utilizing the power of a programming language whenever possible. One of the concepts used for reducing code repetition is **generics**.  
   Generics allow you to define **types** to programming elements such as functions or classes so that th element can behave according to the type you have defined.  
   For example, if you want to create a function which serializes an object to indented JSON in Dart, you can write this:

```dart
String serializeIndented<T>(T json) {
  return JsonEncoder.withIndent(" ").convert(json);
}

// invocation
serializeIndented<Person>(person);

// or by type inference
serializeIndented(person);

```

But in Go, you can't supply a generic. Instead, you have to rely on **empty interfaces** which is basically a dynamic type that you can cast.

```go
func SerializeIndented(i interface{}) ([]byte, error) {
   return json.MarshalIndent(i, "", " ")
}

// invocation
ser, err := SerializeIndented(person)
```

Works for small, code-crunching stuff. But really uncomfortable to use in big projects which has many complex types.

FYI: Generics is coming in Go version 1.18!

4. **Lack of null safety**  
   Golang does not have a null safety operator, because the language is closer to machine and **nullable types** must be wrapped in a pointer.

   In C#, you can do something like this, in case you want to get an information from deeply nested objects:

   ```csharp
   ...

   val pCompanyAddress = person
      ?.Company
      ?.Address
      ?.Name;

   ...
   ```

   But in Go, you have to have a thorough null check in each nested property.

   ```go
   pCompanyAddress := ""

   if person.Company != nil && person.Company.Address != nil {
      pCompanyAddress = person.Company.Address.Name
   }

   ```

   There's a whole discussion about why null safety is not implemented in Go, see this [GitHub issue](https://github.com/golang/go/issues/42847)

Despite all these cons, Go is a really, really nice language which balances between developer experience which makes writing code fast, safe, and scalable, but also does not compromise performance--meaning that code written in Go is really fast, and very robust if your error handling game is played correctly. Memory usage is **very lightweight** too with Go. Definitely a correct option to pick Go for creating new projects in 2022.

Go is an excellent language for [gRPC](https://grpc.io/) too, but that leaves a room for another article.

## 1. .NET Core / C#

- **Typing**: Strong, static
- **Founder**: Microsoft
- **Paradigm**: multi paradigm, mainly object-oriented

This framework which is created by Microsoft is often given a negative impression at first glance because of the name **Microsoft** associated with .NET framework, but I assure you, nothing is about money-grabbing software made by greedy big corporations here.

There's a good [article](https://www.excella.com/insights/5-myths-about-net) about the misconceptions or myths about .NET, which points are:

1. .Net Only Runs on Windows
2. .Net is Only for Desktop Applications
3. .Net is a Proprietary, Closed Source Technology
4. .Net is Only Useful for Business Applications
5. .Net Doesn’t Fit Into My Development Stack

I personally have deployed a .NET 6 application in a Linux server for an HTTP API gateway which forwards HTTP API requests using the [Ocelot](https://github.com/ThreeMammals/Ocelot) API Gateway.

Okay, back to topic!

.NET is an open source ecosystem for creating web applications. The latest release is .NET 6, which brings very huge improvements to the whole .NET Core ecosystem in terms of performance, boilerplate reduction, etc.

To start a .NET 6 minimal web application, you can install the .NET CLI (works on Windows, Linux, or Mac OS) and then run this command:

```sh
$ dotnet new web -o myapp
$ cd myapp
```

Open `Program.cs`

```csharp
var builder = WebApplication.CreateBuilder(args);
var app = builder.Build();

app.MapGet("/", () => "Hello World!");

app.Run();
```

Modify `"Hello World!"` to:

```csharp
app.MapGet("/", () => "Hello People!");
```

then run

```sh
$ dotnet run
```

Now you have a .NET Core app running in your system. Open the link provided in the .NET CLI, in your browser. The port differs each time you create a .NET Core application, but you can configure the port into the one you want. When I created the project, I got `http://localhost:5197`.

### Persistence layer

The most popular persistence framework in .NET Core app is **Entity Framework Core (EF Core)**, which is compatible with Microsoft SQL Server, MySQL, and PostgreSQL. To add EF Core to your .NET Core 6 app, you can use the following command:

```sh
$ dotnet add package Microsoft.EntityFrameworkCore --version 6.0.1
$ dotnet add package Microsoft.EntityFrameworkCore.Design --version 6.0.1
$ dotnet add package Pomelo.EntityFrameworkCore.MySql --version 6.0.1
$ dotnet add package Microsoft.EntityFrameworkCore.Tools --version 6.0.1
```

And install the EF tools using this command

```sh
$ dotnet tool install --global dotnet-ef
```

Then in your `Program.cs`, put this code:

```csharp
using System.ComponentModel.DataAnnotations.Schema;
using Microsoft.EntityFrameworkCore;

var builder = WebApplication.CreateBuilder(args);
builder.Services.AddDbContext<ApplicationContext>(optionsBuilder => optionsBuilder.UseMySql("server=localhost;database=employeescstest;user=root;password=", ServerVersion.AutoDetect("server=localhost;database=employeescstest;user=root;password=")));
var app = builder.Build();

app.MapGet("/employee-add", async (ApplicationContext ctx) =>
{
    var emp = new Employee
    {
        Name = "MyName",
        Uuid = Guid.NewGuid().ToString()
    };
    ctx.Update(emp);
    await ctx.SaveChangesAsync();
    return emp;
});
app.MapGet("/employees", (ApplicationContext ctx) => ctx.Employee);

// Migrate
using (var ctx = new ApplicationContext())
{
    ctx.Database.Migrate();
}

app.Run();

class Employee
{
    [DatabaseGenerated(DatabaseGeneratedOption.Identity)]
    public long? ID { get; set; }
    public string? Uuid { get; set; }
    public string? Name { get; set; }

    [DatabaseGenerated(DatabaseGeneratedOption.Identity)]
    public DateTime? Created { get; set; }
}

class ApplicationContext : DbContext
{
    public ApplicationContext(DbContextOptions options) : base(options)
    {
    }

    public ApplicationContext()
    {
    }
    public DbSet<Employee>? Employee { get; set; }
    protected override void OnConfiguring(DbContextOptionsBuilder optionsBuilder)
    {
        optionsBuilder.UseMySql("server=localhost;database=employeescstest;user=root;password=", ServerVersion.AutoDetect("server=localhost;database=employeescstest;user=root;password="));
    }
}
```

> **Important:** Make sure you have a local MySQL database with the database called `employeescstest`

Run this:

```sh
$ dotnet ef migrations add InitialMigration
```

and call `dotnet run` in your terminal. Voila, a full .NET 6 minimal API with MySQL as persistent storage!

Each time your model changes, make sure to call:

```sh
$ dotnet ef migrations add InitialMigration
```

to make sure Entity Framework "reverse engineers" your model into MySQL statements.

You might want to use the [ISO 8601](https://docs.microsoft.com/en-us/dotnet/standard/datetime/system-text-json-support#custom-support-for--and-) format for JSON de/serializer for default JSON parser in your .NET app, since the default value is not [round-trip](https://docs.microsoft.com/en-us/dotnet/standard/base-types/standard-date-and-time-format-strings#the-round-trip-o-o-format-specifier) format by default.

.NET 6 is really nice to program with, and C# is a really high-level language with the features such as:

1. Type inference
2. Null safety
3. Record/immutable classes
4. Declarative pattern matching
5. Declarative iterable helpers (**LINQ**)

and many other modern programming language features which makes programming fast enough for building prototype applications, but also possible to have fine-grained control for performance improvement.

.NET 6 has a fantastic performance throughput. You can find the benchmarks at [TechEmpower Web Framework Benchmarks](https://www.techempower.com/benchmarks/) and for specifically .NET 6 improvements, you can look it up [here](https://devblogs.microsoft.com/dotnet/performance-improvements-in-net-6/).  

Working with [gRPC](https://grpc.io) is also nice with .NET Core, but maybe that is a room for another article.

#### That was a long ride!

Thank you for reading this far, and I hope this article helps you in choosing the next back-end technology for you to learn, or if you are not familiar with back-end web technologies and plans to learn one or two of them.

This article is originally from [vmasdani.my.id](vmasdani.my.id) , please visit my website!
