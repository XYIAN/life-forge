# 📚 Life Forge Documentation

This directory contains all technical and development-related documentation for Life Forge.

## 📁 Documentation Structure

### 📖 User Documentation

- **`../README.md`** - Main user-facing documentation and feature guide
- **`../CHANGELOG.md`** - Version history and feature updates

### 🛠️ Developer Documentation

- **`DEV.md`** - Complete development guide with setup, architecture, and guidelines
- **`README.md`** (this file) - Documentation organization and overview

### 🗺️ SEO & Navigation

- **`../public/sitemap.xml`** - SEO sitemap for search engines

## 🎯 Documentation Philosophy

### User-First Approach

- **README.md** focuses entirely on end-user experience and features
- No technical jargon or development instructions in user docs
- Emphasizes benefits, features, and how to use the application

### Developer Resources

- All technical information consolidated in `docs/DEV.md`
- Comprehensive setup instructions and architecture details
- Best practices and contribution guidelines

### Version Management

- **`package.json`** - Semantic versioning for releases
- **`CHANGELOG.md`** - Detailed change tracking for users and developers
- **`docs/DEV.md`** - Version management guidelines for contributors

## 🔄 Keeping Documentation Current

### When to Update

- **New Features**: Update README.md (user impact) and DEV.md (technical details)
- **Bug Fixes**: Update CHANGELOG.md and increment patch version
- **Breaking Changes**: Update version (major), README.md, DEV.md, and CHANGELOG.md
- **Dependencies**: Update DEV.md tech stack section

### Documentation Standards

- Use clear, friendly language for user docs
- Include emoji and visual elements for engagement
- Provide code examples in developer docs
- Keep both high-level (README) and detailed (DEV) perspectives

## 📋 Quick Reference

| File           | Purpose          | Audience       | Update Frequency |
| -------------- | ---------------- | -------------- | ---------------- |
| `README.md`    | Feature showcase | End users      | Major releases   |
| `docs/DEV.md`  | Technical guide  | Developers     | Each release     |
| `CHANGELOG.md` | Version history  | Both           | Every version    |
| `package.json` | Version control  | System         | Every version    |
| `sitemap.xml`  | SEO optimization | Search engines | Major updates    |

## 🌟 Best Practices

### For Contributors

1. Read `DEV.md` for complete development setup
2. Update documentation alongside code changes
3. Test all examples and instructions before submitting
4. Follow the established tone and style for each document type

### For Maintainers

1. Keep user and developer documentation separate
2. Update version numbers in sync across all files
3. Maintain consistency in emoji usage and formatting
4. Review documentation during each release cycle

---

**Need help?** Check `DEV.md` for detailed technical information or contact the development team.
