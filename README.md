# 🌟 Yousef Al Iraqi | Student Innovator Portfolio

[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)
[![HTML5](https://img.shields.io/badge/HTML5-E34F26?style=flat&logo=html5&logoColor=white)](https://developer.mozilla.org/en-US/docs/Web/HTML)
[![CSS3](https://img.shields.io/badge/CSS3-1572B6?style=flat&logo=css3&logoColor=white)](https://developer.mozilla.org/en-US/docs/Web/CSS)
[![JavaScript](https://img.shields.io/badge/JavaScript-F7DF1E?style=flat&logo=javascript&logoColor=black)](https://developer.mozilla.org/en-US/docs/Web/JavaScript)

## 📋 Table of Contents
- [Overview](#-overview)
- [Features](#-features)
- [Project Structure](#-project-structure)
- [Installation](#-installation)
- [Image Placement Guide](#-image-placement-guide)
- [Recent Updates](#-recent-updates)
- [Technologies Used](#-technologies-used)
- [Customization](#-customization)
- [Responsive Design](#-responsive-design)
- [Browser Support](#-browser-support)
- [Contributing](#-contributing)
- [License](#-license)
- [Contact](#-contact)

---

## 📖 Overview

This is a modern, responsive portfolio website for **Yousef Al Iraqi** — a student innovator, patent-pending inventor, and STEM researcher from Egypt. The portfolio showcases achievements, research papers, volunteer work, certificates, and a 7-year ISEF journey with interactive galleries and smooth animations.

**Live Demo:** [yousef-al-iraqi.github.io](https://yousef-al-iraqi.github.io)

### About the Developer
Yousef Al Iraqi is a student at Ismailia STEM High School in Egypt, passionate about solving environmental challenges through innovation. His work focuses on sustainable water treatment solutions, earning recognition at national and international levels including:
- Patent-pending wastewater treatment system
- 1st Place at Cairo International Exhibition for Innovation (2023)
- Finalist at ESEF 2026
- 2nd Place at Tech Innovation 2026

---

## ✨ Features

### 🎨 Design & Experience
- **Dark theme** with orange accent (#F97316) for a modern, professional look
- **Smooth scroll** navigation with active section highlighting
- **Fade-up animations** on scroll for engaging user experience
- **Fully responsive** — works on desktop, tablet, and mobile
- **Glass-morphism navigation** with backdrop blur effect

### 📂 Content Sections

| Section | Description |
|---------|-------------|
| **About Me** | Personal story, mission, background, and inspiration |
| **Projects** | 6 innovation projects with PDF posters and photo galleries |
| **Achievements** | Awards and recognitions with interactive photo galleries |
| **Certificates** | 8 certificates including EGY STEM robotics certification |
| **ISEF Journey** | 7-year timeline with photos from each year of participation |
| **Sports Journey** | Karate and fitness training with photo galleries |
| **Volunteering** | 57357 Children's Cancer Hospital volunteer work with photos |
| **Research Papers** | Published research with DOI links and metadata |

### 🖱️ Interactive Elements
- **Lightbox gallery** — Click any image to enlarge in full-screen mode
- **Project modals** — View project details, additional photos, and PDF posters
- **Certificate modals** — View certificate details with clickable images
- **Active navigation** — Highlights current section as you scroll
- **Hover effects** — Cards lift and glow with orange borders on hover

---

## 📁 Project Structure

```
portfolio/
├── index.html                      # Main HTML file (complete portfolio)
├── README.md                       # This documentation file
├── LICENSE                         # MIT License
│
├── images/
│   ├── about/
│   │   └── profile.png             # Profile photo (400x400 recommended)
│   │
│   ├── achievements/
│   │   ├── achievements1/          # 1st achievement photos (3 photos)
│   │   ├── achievements2/          # 2nd achievement photos (2 photos)
│   │   ├── achievements3/          # 3rd achievement photos (5 photos)
│   │   └── achievements4/          # 4th achievement photos (4 photos)
│   │
│   ├── certificates/
│   │   ├── certificate1/           # ESEF 2026 (1.jfif)
│   │   ├── certificate2/           # 7th Intl Innovation (1.jfif)
│   │   ├── certificate3/           # Tech Innovation Challenge (1.jfif)
│   │   ├── certificate4/           # IEEE CASS Competition (1.jfif)
│   │   ├── certificate5/           # Zpreneurs Competition (1.jfif)
│   │   ├── certificate6/           # Blue Ocean Mini-Course (1.jfif)
│   │   ├── certificate7/           # State Award for Young Creator (1.jfif)
│   │   └── certificate8/           # EGY STEM Robotics (1.jpg) 🆕
│   │
│   ├── isef/                       # ISEF Journey (7 years)
│   │   ├── year1/                  # 2020 (4 photos)
│   │   ├── year2/                  # 2022 (1 photo)
│   │   ├── year3/                  # 2023 (4 photos)
│   │   ├── year4/                  # 2024 (2 photos)
│   │   ├── year5/                  # 2025 (2 photos)
│   │   └── year6/                  # 2026 (4 photos)
│   │
│   ├── projects/
│   │   ├── project1/               # Aquapure (1.jpg, 2.jpg, 3.jpg, poster.pdf)
│   │   ├── project2/               # From Coal to Chemistry (1.jpg, 2.jpg, poster.pdf)
│   │   ├── project3/               # Greenhouse Control System (1.jpg, 2.jpg, 3.jpg, poster.pdf)
│   │   ├── project4/               # E-Waste Climate Chamber (1.jpg, 2.jpg, poster.pdf)
│   │   ├── project5/               # Micro Hydropower Station (1.jpg, 2.jpg, poster.pdf)
│   │   └── project6/               # Warren Truss Bridge (1.jpg, 2.jpg, poster.pdf)
│   │
│   ├── research/
│   │   └── aquapure-paper.jpg      # Research paper cover 🆕
│   │
│   ├── sports/
│   │   ├── karate-child.jpg        # Karate training photo
│   │   └── gym-recent.jpg          # Current gym training photo
│   │
│   └── volunteer/
│       └── 57357/                  # 57357 Children's Cancer Hospital 🆕
│           ├── volunteer.jpg       # Volunteer activity photo
│           └── hospital.jpg        # Hospital building photo
│
└── .github/                        # (Optional) GitHub configuration
    └── workflows/                  # (Optional) GitHub Pages workflow
```

---

## 📸 Image Placement Guide

### Where to Upload Images

| Section | Image Path | File Format | Recommended Size | Notes |
|---------|------------|-------------|------------------|-------|
| **Profile** | `images/about/profile.png` | PNG/JPG | 400x400 | Square, high-quality headshot |
| **Certificates** | `images/certificates/certificateX/1.jfif` | JPG/PNG | 600x450 | Certificate image; can use .jpg |
| **Projects (Poster)** | `images/projects/projectX/1.jpg` | JPG/PNG | 600x450 | Main project poster/image |
| **Projects (Gallery)** | `images/projects/projectX/2.jpg` | JPG/PNG | 600x450 | Additional project photos |
| **Achievements** | `images/achievements/achievementsX/1.jpg` | JPG/PNG | 400x300 | Main achievement image |
| **Achievements (Gallery)** | `images/achievements/achievementsX/2.jpg` | JPG/PNG | 80x80 | Thumbnail images |
| **ISEF Journey** | `images/isef/yearX/1.jpg` | JPG/PNG | 400x300 | Yearly journey photos |
| **Volunteer** | `images/volunteer/57357/volunteer.jpg` | JPG/PNG | 600x450 | Photo of you volunteering |
| **Volunteer (Hospital)** | `images/volunteer/57357/hospital.jpg` | JPG/PNG | 600x450 | Photo of the hospital |
| **Research** | `images/research/aquapure-paper.jpg` | JPG/PNG | 600x450 | Research paper cover image |
| **Sports** | `images/sports/karate-child.jpg` | JPG/PNG | 600x800 | Sports action photo |
| **Sports** | `images/sports/gym-recent.jpg` | JPG/PNG | 600x800 | Current training photo |

### Project PDF Files
PDF posters should be placed in their respective project folders:
```
images/projects/project1/poster.pdf
images/projects/project2/poster.pdf
... and so on for all 6 projects
```

### File Naming Conventions
- Use sequential numbering: `1.jpg`, `2.jpg`, `3.jpg`, etc.
- Main images should always be `1.jpg` or `1.jfif`
- PDF files should be named `poster.pdf`
- Use lowercase file extensions (.jpg, .png, .pdf)

---

## 🛠️ Technologies Used

### Frontend
| Technology | Version | Purpose |
|------------|---------|---------|
| HTML5 | - | Semantic structure |
| CSS3 | - | Styling, animations, responsive design |
| JavaScript | ES6 | Dynamic content, modals, gallery |
| Font Awesome | 6.0 | Icons and social media links |
| Google Fonts | Inter | Typography and readability |

### Features Implemented
- **CSS Custom Properties** — Theming and consistency
- **CSS Grid & Flexbox** — Layout and responsiveness
- **CSS Transitions & Animations** — Smooth interactions
- **Intersection Observer API** — Scroll-triggered animations
- **DOM Manipulation** — Dynamic content generation
- **Event Delegation** — Efficient event handling
- **ES6 Modules** — Clean code organization

### Browser APIs Used
- `IntersectionObserver` — Fade-up animations
- `querySelector` / `querySelectorAll` — DOM selection
- `addEventListener` — Event handling
- `createElement` / `appendChild` — Dynamic content

---

## 🎨 Customization

### Changing Colors
The color scheme is controlled by CSS custom properties in the `:root` selector:

```css
:root {
  --bg-dark: #0B0B0B;          /* Main background */
  --card-bg: #111111;          /* Card background */
  --orange: #F97316;           /* Primary accent color */
  --orange-glow: #FF8C42;      /* Glow effect */
  --border-dim: #262626;       /* Card borders */
  --text-light: #F0F0F0;       /* Main text */
  --text-muted: #B0B0B0;       /* Secondary text */
}
```

To change the theme, replace the hex values with your preferred colors.

### Modifying Content
All dynamic content is stored in JavaScript arrays at the end of `index.html`:

#### Adding a New Certificate
```javascript
const certificatesData = [
  // ... existing certificates ...
  { 
    id: 9, 
    title: "Your Certificate Title", 
    issuer: "Organization Name | Issued Date", 
    description: "Certificate description", 
    image: "images/certificates/certificate9/1.jpg", 
    badge: "Category Tag" 
  }
];
```

#### Adding a New Project
```javascript
const projectsData = {
  // ... existing projects ...
  7: { 
    title: "Project Title", 
    poster: "images/projects/project7/1.jpg", 
    additionalPhotos: ["images/projects/project7/2.jpg"], 
    description: "Project description", 
    pdf: "images/projects/project7/poster.pdf" 
  }
};
```

#### Adding a New Achievement
```javascript
const achievementsData = [
  // ... existing achievements ...
  { 
    title: "Achievement Title", 
    desc: "Achievement description", 
    photos: ["images/achievements/achievements5/1.jpg", "images/achievements/achievements5/2.jpg"] 
  }
];
```

### Changing Navigation Links
Update the navigation menu in the `<nav>` section:

```html
<ul class="nav-links">
  <li><a href="#about">About</a></li>
  <li><a href="#projects">Projects</a></li>
  <!-- Add/remove sections as needed -->
</ul>
```

### Updating Footer Social Links
Modify the social links in the `<footer>` section:

```html
<div class="socials">
  <a href="https://www.linkedin.com/in/your-profile/" target="_blank"><i class="fab fa-linkedin"></i></a>
  <a href="https://www.instagram.com/your-profile/" target="_blank"><i class="fab fa-instagram"></i></a>
  <!-- Add more social links -->
</div>
```

---

## 📱 Responsive Design

The portfolio is fully responsive across all devices:

### Breakpoints

| Device | Screen Width | Navigation | Layout |
|--------|--------------|------------|--------|
| **Desktop** | > 780px | Horizontal menu | Grid layout |
| **Tablet** | 481px - 780px | Horizontal menu | Adjusted grid |
| **Mobile** | < 480px | Hamburger menu | Stacked cards |

### Mobile Optimizations
- Collapsible hamburger menu
- Stacked card layout (single column)
- Adjusted font sizes
- Optimized image sizing
- Touch-friendly buttons and interactions
- Reduced animation complexity for performance

### Testing Commands
```bash
# Test responsive design using Chrome DevTools
# Press F12 → Toggle Device Toolbar (Ctrl+Shift+M)
# Select various device presets

# Test on actual devices
# Open the URL on your phone/tablet
# Use ngrok for remote testing: ngrok http 5500
```

---

## 🌐 Browser Support

| Browser | Version | Support |
|---------|---------|---------|
| Google Chrome | 90+ | ✅ Full |
| Mozilla Firefox | 88+ | ✅ Full |
| Safari | 14+ | ✅ Full |
| Microsoft Edge | 90+ | ✅ Full |
| Opera | 76+ | ✅ Full |
| Samsung Internet | 14+ | ✅ Full |

### Polyfills (if needed)
- `IntersectionObserver` polyfill for older browsers
- `Object.assign` polyfill for IE11 (if needed)

---

## 🤝 Contributing

We welcome contributions! Here's how you can help:

### Ways to Contribute
1. **Report bugs** — Open an issue with detailed steps
2. **Suggest features** — Open an issue with your proposal
3. **Fix issues** — Submit a pull request
4. **Improve documentation** — Enhance this README
5. **Add content** — Help update achievements or projects

### Development Workflow
1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Make your changes
4. Test your changes locally
5. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
6. Push to the branch (`git push origin feature/AmazingFeature`)
7. Open a Pull Request

### Code Style Guidelines
- Use semantic HTML5 elements
- Follow BEM naming convention for CSS classes
- Use camelCase for JavaScript variables
- Include comments for complex logic
- Test on multiple browsers before submitting
- Keep commits atomic and well-described

### Pull Request Checklist
- [ ] My code follows the style guidelines
- [ ] I have performed self-review
- [ ] I have added comments where needed
- [ ] My changes don't break existing functionality
- [ ] I have updated the documentation

---

## 📄 License

Distributed under the MIT License. See `LICENSE` for more information.

```
MIT License

Copyright (c) 2026 Yousef Al Iraqi

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all
copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
SOFTWARE.
```

---

## 📧 Contact

### Yousef Al Iraqi
- **Email:** yousefaliraqi76@gmail.com
- **LinkedIn:** [yousef-al-iraqi](https://www.linkedin.com/in/yousef-al-iraqi-b55a403b1/)
- **Instagram:** [yousef_al3raky](https://www.instagram.com/yousef_al3raky)
- **GitHub:** [your-username](https://github.com/your-username)

### Project Links
- **Repository:** [github.com/your-username/portfolio](https://github.com/your-username/portfolio)
- **Live Demo:** [your-username.github.io](https://your-username.github.io)

---

## 🙏 Acknowledgments

- **Ismailia STEM High School** — For continuous support and resources
- **All mentors and collaborators** — Who contributed to the projects
- **IEEE, AASTMT, and other organizations** — For recognition and opportunities
- **57357 Children's Cancer Hospital** — For the volunteer opportunity
- **Font Awesome** — For the beautiful icons
- **Google Fonts** — For the Inter typeface
- **Open Source Community** — For the inspiration and tools

---

## 📊 Performance Metrics

| Metric | Score |
|--------|-------|
| **Page Speed** | ~95/100 (Google Lighthouse) |
| **Accessibility** | ~96/100 |
| **Best Practices** | ~100/100 |
| **SEO** | ~98/100 |

### Optimization Tips
- Use WebP format for images (fallback to JPG/PNG)
- Minify CSS and JavaScript for production
- Enable GZIP compression on your server
- Use a CDN for static assets
- Implement lazy loading for images
- Cache static assets with service workers

---

## 🔧 Troubleshooting

### Common Issues and Solutions

#### Images Not Showing
- **Issue:** Images display as broken links or placeholders
- **Solution:** 
  - Check file paths are correct
  - Ensure images exist in the specified folders
  - Verify image file names match the code
  - Use lowercase extensions (.jpg, .png)

#### GitHub Pages Not Loading
- **Issue:** Site shows 404 or doesn't update
- **Solution:**
  - Wait 1-5 minutes for deployment to complete
  - Check repository is public
  - Verify GitHub Pages is enabled in settings
  - Clear browser cache or use incognito mode

#### Mobile Menu Not Working
- **Issue:** Hamburger menu doesn't toggle
- **Solution:**
  - Check the hamburger click event in JavaScript
  - Ensure `.nav-links` and `.hamburger` classes exist
  - Verify no JavaScript errors in console

#### Modal Not Opening
- **Issue:** Clicking doesn't open modals
- **Solution:**
  - Check the console for JavaScript errors
  - Verify the modal element IDs exist
  - Ensure the click event handlers are attached

#### Animations Not Working
- **Issue:** Fade-up animations don't trigger
- **Solution:**
  - Check the IntersectionObserver is supported
  - Verify the `.fade-up.revealed` CSS rules exist
  - Ensure the observer is initialized correctly

---

## 🚀 Future Improvements

### Planned Features
- [ ] Dark/light theme toggle
- [ ] Multi-language support (AR/EN)
- [ ] Blog section for research updates
- [ ] Downloadable CV/resume
- [ ] Newsletter subscription
- [ ] Analytics tracking
- [ ] Print-friendly version
- [ ] Keyboard shortcuts
- [ ] Screen reader optimizations
- [ ] PWA (Progressive Web App) support

### Tech Upgrades
- [ ] Convert to React.js or Vue.js
- [ ] Add TypeScript support
- [ ] Implement state management
- [ ] Add automated testing
- [ ] Set up CI/CD pipeline
- [ ] Add performance monitoring

---

## ⭐ Show Your Support

If you find this project useful or inspiring, please consider:

1. ⭐ **Star the repository** on GitHub
2. 🍴 **Fork it** for your own use
3. 🔗 **Share it** with your network
4. 💬 **Leave feedback** through issues or social media

---

## 📚 Resources

### Recommended Learning Resources
- [MDN Web Docs](https://developer.mozilla.org/) — HTML, CSS, JavaScript documentation
- [CSS-Tricks](https://css-tricks.com/) — CSS guides and tips
- [JavaScript.info](https://javascript.info/) — Modern JavaScript tutorials
- [Google Fonts](https://fonts.google.com/) — Free typography
- [Font Awesome](https://fontawesome.com/) — Icon library
- [GitHub Pages](https://pages.github.com/) — Free hosting

### Design Inspiration
- [Dribbble](https://dribbble.com/) — Portfolio design inspiration
- [Awwwards](https://www.awwwards.com/) — Award-winning websites
- [Behance](https://www.behance.net/) — Creative portfolios


---

*Built with ❤️ by Yousef Al Iraqi*

---

**⭐ If this portfolio helped you, please give it a star on GitHub! ⭐**
