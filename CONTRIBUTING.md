# Contributing Guide

Hello! We'd love to see your contribution on this repository soon, even if it's just a typo fix!

Contributing means anything from submitting blog post, reporting bugs, ideas, suggestion, code fix, even new feature.

**JUMP STRAIGHT TO:**

- [Add a blog post](#add-a-blog-post)
- [Bug report, ideas and suggestion](#bug-report-ideas-and-suggestion)
- [Code fix and new feature](#code-fix-and-new-feature)

## Add a blog post

You must [fork](https://help.github.com/articles/fork-a-repo/) this repository to your own Github account and [clone](https://help.github.com/articles/cloning-a-repository/) it to your local device.

To make life easier, we provide a [blog post template](./.github/BLOG_TEMPLATE.md) that you can fill out. Please fill out the metadata (title, description, author), so we can track the reader's analytics and the post performance. The post should be written in Markdown format.

If you have any confusion or burning questions, please reach out to the guys on [Teknologi Umum's Telegram group](https://t.me/teknologi_umum_v2).

## Bug report, ideas and suggestion

The [issues](https://github.com/teknologi-umum/blog/issues) page is a great way to communicate to us. Other than that, we have a [Telegram group](https://t.me/teknologi_umum) that you can discuss your ideas into. If you're not an Indonesian speaker, it's 100% fine to talk in English there.

Please make sure that the issue you're creating is in as much detail as possible. Poor communication might lead to a big mistake, we're trying to avoid that.

## Code fix and new feature

**A big heads up before you're writing a breaking change code or a new feature: Please open up an [issue](https://github.com/teknologi-umum/blog/issues) regarding what you're working on, or just talk in the [Telegram group](https://t.me/teknologi_umum_v2).**

### Prerequisites

You will need a few things to get things working:

1. Node.js current version (as of now, we're using v16.6.2 as defined in the `.nvmrc` file). You can install it through the [official Node.js download page](https://nodejs.org/en/download/), but we recommend using [nvm](https://github.com/nvm-sh/nvm) or [fnm](https://github.com/Schniz/fnm). Here's a simple installation/setup guide, but you should really refer directly to the corresponding repository's README.

```sh
# If you want to install fnm
$ curl -fsSL https://fnm.vercel.app/install | bash

# Then simply use this command
$ fnm use

# OR if you want to install nvm
$ curl -o- https://raw.githubusercontent.com/nvm-sh/nvm/v0.38.0/install.sh | bash

$ nvm use
```

That's it actually.

### Getting Started

1. [Fork](https://help.github.com/articles/fork-a-repo/) this repository to your own Github account and [clone](https://help.github.com/articles/cloning-a-repository/) it to your local device.
2. Run `npm install` to install the dependencies needed.
3. Run the development server with:

```bash
npm run dev
```

4. Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `pages/index.tsx`. The page auto-updates as you edit the file.

### Directory structure

### Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js/) - your feedback and contributions are welcome!

### Before creating a PR

Please run ESLint and Prettier with these commands so you're good on the CI/CD process.

```sh
$ npm run lint
$ npm run format
```

And you're set!
