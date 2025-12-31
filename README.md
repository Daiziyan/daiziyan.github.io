# Dai Ziyan's Personal Website

Personal website built with [Academic Pages](https://github.com/academicpages/academicpages.github.io), a Jekyll-based GitHub Pages template for personal and professional portfolio-oriented websites.

🌐 **Live Site:** [https://daiziyan.github.io](https://daiziyan.github.io)

---

## About This Website

This is my personal website showcasing:
- **CV/Resume** - Professional experience and achievements
- **Blog Posts** - Technical writing tips, tool usage, and career development
- **Technical Writing Portfolio** - Documentation projects and writing samples
- **Portfolio** - Selected work and projects

The site is built using the Academic Pages template, which is based on the [Minimal Mistakes Jekyll theme](https://mmistakes.github.io/minimal-mistakes/).

---

## Tech Stack

- **Static Site Generator:** Jekyll
- **Template:** Academic Pages (forked from Minimal Mistakes)
- **Hosting:** GitHub Pages
- **Styling:** SCSS/CSS
- **Content:** Markdown

---

## Local Development

### Prerequisites

- **Ruby** (version 3.2+)
- **Bundler** (Ruby gem manager)
- **Node.js** (for JavaScript dependencies)
- **Git**

### Option 1: Using Docker (Recommended)

If you have Docker installed, this is the easiest way to run the site locally:

```bash
# Build and start the container
docker compose up

# The site will be available at http://localhost:4000
# Changes to files will automatically trigger a rebuild
```

To stop the server:
```bash
docker compose down
```

### Option 2: Local Ruby Installation

#### macOS

```bash
# Install Ruby and Node.js
brew install ruby
brew install node

# Install Bundler
gem install bundler

# Install dependencies
bundle install

# If you encounter permission errors, install gems locally:
bundle config set --local path 'vendor/bundle'
bundle install
# Then add 'vendor' to .gitignore
```

#### Linux / WSL

```bash
# Install dependencies
sudo apt update
sudo apt install ruby-dev ruby-bundler nodejs build-essential gcc make

# If packages are not found, update first:
sudo apt update && sudo apt upgrade -y
sudo apt install ruby-dev ruby-bundler nodejs

# Install dependencies
bundle install

# If you encounter permission errors:
bundle config set --local path 'vendor/bundle'
bundle install
# Add 'vendor' to .gitignore
```

#### Running the Site

```bash
# Start the Jekyll server
bundle exec jekyll serve -l -H localhost

# Or simply:
jekyll serve -l -H localhost

# The site will be available at http://localhost:4000
# The server will automatically rebuild when files change
```

**Note:** If you modify `_config.yml`, you need to restart the Jekyll server for changes to take effect.

---

## Project Structure

```
.
├── _config.yml              # Site configuration
├── _data/                   # Data files (navigation, authors, etc.)
├── _includes/               # Reusable components
├── _layouts/                # Page layouts
├── _pages/                  # Individual pages (CV, about, etc.)
├── _posts/                  # Blog posts
├── _sass/                   # SCSS stylesheets
│   └── custom/              # Custom styles (wider layout)
├── assets/                  # CSS, JS, fonts
├── images/                  # Images (including bio-photo.jpg)
├── Dockerfile               # Docker configuration
├── docker-compose.yaml      # Docker Compose configuration
├── Gemfile                  # Ruby dependencies
└── README.md               # This file
```

---

## Customization

### Key Customizations Made

1. **Wider Page Layout** - Custom CSS in `_sass/custom/_custom.scss` to increase content width for better readability
2. **Navigation** - Modified `_data/navigation.yml` to remove Talks and Teaching sections
3. **Profile** - Updated `_config.yml` with personal information and avatar

### Adding New Content

#### Blog Posts
- Create new Markdown files in `_posts/` directory
- Follow naming convention: `YYYY-MM-DD-title.md`
- Include front matter with metadata:

```markdown
---
title: 'Your Post Title'
date: 2025-01-01
permalink: /posts/2025/01/your-post-title
tags:
  - tag1
  - tag2
---

Your content here...
```

#### Pages
- Add Markdown files to `_pages/` directory
- Include front matter with layout and permalink

#### Technical Writing Portfolio
- Add files to `_technical-writing/` directory
- Follow the same front matter format as blog posts

---

## Configuration

### Site Settings (`_config.yml`)

Key settings to customize:
- `title` - Site title
- `name` - Your name
- `description` - Site description
- `url` - Your GitHub Pages URL
- `author` - Author information (name, bio, avatar, location, etc.)
- `navigation` - Menu items (configured in `_data/navigation.yml`)

### Avatar Image

- Place your avatar image in `images/` directory
- Update `author.avatar` in `_config.yml` (e.g., `"bio-photo.jpg"`)
- Recommended size: 400x400 pixels
- Format: JPG or PNG

---

## Deployment

This site is automatically deployed to GitHub Pages when changes are pushed to the `main` branch.

### Manual Deployment

1. Make your changes locally
2. Commit and push:
   ```bash
   git add .
   git commit -m "Your commit message"
   git push origin main
   ```
3. GitHub Pages will automatically build and deploy (usually takes 1-2 minutes)
4. Check deployment status in repository Settings → Pages

---

## Troubleshooting

### Jekyll Server Issues

**Port already in use:**
```bash
# Kill the process using port 4000
lsof -ti:4000 | xargs kill -9
```

**Dependencies issues:**
```bash
# Delete Gemfile.lock and reinstall
rm Gemfile.lock
bundle install
```

**Cache issues:**
```bash
# Clear Jekyll cache
rm -rf .jekyll-cache _site
bundle exec jekyll serve
```

### Docker Issues

**Container won't start:**
```bash
# Rebuild the container
docker compose down
docker compose build --no-cache
docker compose up
```

**Port conflicts:**
- Modify `docker-compose.yaml` to use a different port (e.g., `4001:4000`)

---

## About Academic Pages Template

This website is built using the [Academic Pages](https://github.com/academicpages/academicpages.github.io) template, which is:

- **Forked from:** [Minimal Mistakes Jekyll Theme](https://mmistakes.github.io/minimal-mistakes/) by Michael Rose
- **Maintained by:** [Robert Zupko](https://github.com/rjzupkoii) and the Academic Pages community
- **License:** MIT License (see LICENSE.md)

### Template Features

- Responsive design
- Multiple content types (posts, publications, talks, teaching, portfolio)
- Author profile sidebar
- Tag and category archives
- RSS feed support
- SEO optimized
- GitHub Pages compatible

### Template Documentation

- [Academic Pages Guide](https://academicpages.github.io/)
- [Minimal Mistakes Documentation](https://mmistakes.github.io/minimal-mistakes/docs/configuration/)
- [Jekyll Documentation](https://jekyllrb.com/docs/)

---

## License

This website's content is © Dai Ziyan. All rights reserved.

The Academic Pages template is released under the MIT License. See [LICENSE](LICENSE) file for details.

---

## Contact

- **Website:** [https://daiziyan.github.io](https://daiziyan.github.io)
- **Email:** dora_online@163.com
- **GitHub:** [@daiziyan](https://github.com/daiziyan)

---

## Quick Reference

### Common Commands

```bash
# Start local server (Docker)
docker compose up

# Start local server (Ruby)
bundle exec jekyll serve -l -H localhost

# Build site without server
bundle exec jekyll build

# Clean and rebuild
rm -rf _site .jekyll-cache
bundle exec jekyll serve
```

### Important Files

- `_config.yml` - Site configuration (restart server after changes)
- `_data/navigation.yml` - Navigation menu
- `_sass/custom/_custom.scss` - Custom styles
- `images/bio-photo.jpg` - Profile avatar

---

**Last Updated:** January 2025
