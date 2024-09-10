+++
title = 'Hugo Quickstart'
date = 2024-09-09T15:31:53+08:00
draft = false
featured_image = '/images/notebook.jpg'
+++

# Build Your First Hugo Site

In this tutorial, you'll learn how to set up and build a Hugo site from scratch using the **Ananke** theme. Hugo is a fast, open-source static site generator.

## Prerequisites

Before you begin, ensure that you have the following tools installed on your machine:

1. **Git** - [Install Git](https://git-scm.com/book/en/v2/Getting-Started-Installing-Git).
2. **Hugo** - [Install Hugo](https://gohugo.io/getting-started/installing/).

```bash
brew install hugo
```

You can verify the installation by running the following commands in your terminal:

```bash
git --version
hugo version
```

## Step 1: Create a New Hugo Site

First, open your terminal and navigate to the directory where you want to create your site. Then, run the following command to create a new Hugo site:

```bash
hugo new site my-hugo-site
```

This will create a new directory called `my-hugo-site` with all the necessary Hugo files.

## Step 2: Add the Ananke Theme

Navigate to your site’s root directory:

```bash
cd my-hugo-site
```

Now, initialize a new Git repository and add the **Ananke** theme as a submodule:

```bash
git init
git submodule add https://github.com/theNewDynamic/gohugo-theme-ananke.git themes/ananke
```


## Step 3: Configure the Site

Open the `hugo.toml` file in your Hugo site root folder and add the following configurations:

```bash
baseURL = "http://example.org/"
languageCode = "en-us"
title = "My New Hugo Site"
theme = "ananke"
```

This tells Hugo to use the Ananke theme.

## Step 4: Create Your First Content

Now that your theme is set up, create your first content by running:

```bash
hugo new posts/my-first-post.md
```

This command generates a new markdown file in the `content/posts/` directory. Open it and start editing. You can update the content as needed.

Notice the `draft` value in the front matter is `true`. By default, Hugo does not publish draft content when you build the site.

## Step 5: Run the Local Development Server

To preview your site, you can run either of the following commands to include draft content.

```bash
hugo server --buildDrafts
hugo server -D
```

View your site at the URL displayed in your terminal. By default, Hugo serves your site at `http://localhost:1313/`. You can view your site in your web browser by navigating to that URL.

## Step 6: Build Your Site for Production

Once you're happy with your site, set the front matter `draft` parameter to `false`. Then you can build it for production by running:

```bash
hugo
```

This Command will not build `draft`, `future`, or `expired` content. The built files will be placed in the `public/` directory, ready to be deployed to your preferred hosting provider.

## Step 7: Deploy Your Site

There are various ways to deploy your Hugo site. Some common options are:

1. **GitHub Pages**
2. **Gitlab Pages**
3. **AWS Amplify**

Check Hugo's official [deployment guide](https://gohugo.io/hosting-and-deployment/) for detailed instructions.

## Conclusion

You’ve now built your first Hugo site using the **Ananke** theme! You can continue to customize your content, theme, and configuration to suit your needs.

For more advanced configurations, visit the [Ananke theme documentation](https://github.com/theNewDynamic/gohugo-theme-ananke).
