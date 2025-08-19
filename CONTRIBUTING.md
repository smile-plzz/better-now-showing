# Contributing to NowShowing

Thank you for your interest in contributing to NowShowing! This document provides guidelines and information for contributors.

## 🤝 How to Contribute

### Types of Contributions

We welcome various types of contributions:

- **Bug Reports**: Report bugs and issues
- **Feature Requests**: Suggest new features
- **Code Contributions**: Submit code improvements
- **Documentation**: Improve documentation
- **Testing**: Help with testing and quality assurance
- **Design**: UI/UX improvements and suggestions

## 🚀 Getting Started

### Prerequisites

- Node.js 18+ 
- npm or yarn
- Git
- Basic knowledge of HTML, CSS, JavaScript

### Development Setup

1. **Fork the Repository**
   ```bash
   # Fork on GitHub, then clone your fork
   git clone https://github.com/yourusername/nowshowing.git
   cd nowshowing
   ```

2. **Install Dependencies**
   ```bash
   npm install
   ```

3. **Set Up Environment Variables**
   ```bash
   # Create .env file
   cp .env.example .env
   
   # Add your API keys
   OMDB_API_KEY=your_omdb_api_key_here
   GNEWS_API_KEY=your_gnews_api_key_here
   NODE_ENV=development
   ```

4. **Start Development Server**
   ```bash
   npm run dev
   ```

5. **Create a Branch**
   ```bash
   git checkout -b feature/your-feature-name
   # or
   git checkout -b fix/your-bug-fix
   ```

## 📝 Development Guidelines

### Code Style

#### JavaScript
- Use ES6+ features
- Follow consistent naming conventions
- Add comments for complex logic
- Use meaningful variable and function names
- Keep functions small and focused

```javascript
// Good
const fetchMovieDetails = async (imdbID) => {
  try {
    const response = await fetch(`/api/omdb-proxy?imdbID=${imdbID}`);
    return await response.json();
  } catch (error) {
    console.error('Failed to fetch movie details:', error);
    return null;
  }
};

// Bad
const getData = async (id) => {
  const r = await fetch(`/api/omdb-proxy?imdbID=${id}`);
  return r.json();
};
```

#### CSS
- Use CSS custom properties (variables)
- Follow BEM methodology for class naming
- Keep styles organized and commented
- Use responsive design principles

```css
/* Good */
.movie-card {
  --card-padding: 1rem;
  --card-radius: 8px;
  
  padding: var(--card-padding);
  border-radius: var(--card-radius);
  background: var(--background-color);
}

.movie-card__title {
  font-size: 1.2rem;
  font-weight: 600;
  color: var(--text-color);
}

/* Bad */
.movie-card {
  padding: 1rem;
  border-radius: 8px;
  background: #fff;
}
```

#### HTML
- Use semantic HTML elements
- Include proper ARIA attributes
- Ensure accessibility standards
- Keep structure clean and organized

```html
<!-- Good -->
<article class="movie-card" role="article">
  <header class="movie-card__header">
    <h3 class="movie-card__title" id="movie-title">Movie Title</h3>
  </header>
  <img class="movie-card__image" src="poster.jpg" alt="Movie poster" />
</article>

<!-- Bad -->
<div class="card">
  <div class="title">Movie Title</div>
  <img src="poster.jpg" />
</div>
```

### File Organization

```
nowshowing/
├── api/                 # Serverless functions
│   ├── check-video.js
│   ├── fetch-news.js
│   ├── omdb-proxy.js
│   └── test.js
├── docs/               # Documentation
├── assets/             # Static assets
├── app.js             # Main application logic
├── style.css          # Styles
├── index.html         # Main HTML file
├── vercel.json        # Vercel configuration
└── package.json       # Dependencies and scripts
```

### Testing

#### Running Tests
```bash
# Run all tests
npm test

# Run tests in watch mode
npm run test:watch

# Run tests with coverage
npm run test:coverage
```

#### Writing Tests
- Test all new functionality
- Include edge cases
- Test error conditions
- Maintain good test coverage

```javascript
// Example test
describe('Movie API', () => {
  test('should fetch movie details successfully', async () => {
    const mockResponse = { Response: 'True', Title: 'Test Movie' };
    global.fetch = jest.fn(() => 
      Promise.resolve({ json: () => Promise.resolve(mockResponse) })
    );
    
    const result = await fetchMovieDetails('tt123456');
    expect(result).toEqual(mockResponse);
  });
});
```

## 🐛 Bug Reports

### Before Submitting

1. **Check Existing Issues**: Search for similar issues
2. **Reproduce the Bug**: Ensure you can reproduce it consistently
3. **Test on Different Devices**: Check if it's device-specific
4. **Clear Browser Cache**: Ensure it's not a caching issue

### Bug Report Template

```markdown
## Bug Description
Brief description of the bug

## Steps to Reproduce
1. Go to '...'
2. Click on '...'
3. Scroll down to '...'
4. See error

## Expected Behavior
What should happen

## Actual Behavior
What actually happens

## Environment
- OS: [e.g. Windows 10, macOS, Linux]
- Browser: [e.g. Chrome, Firefox, Safari]
- Version: [e.g. 22]
- Device: [e.g. Desktop, Mobile]

## Additional Information
Screenshots, console logs, etc.
```

## 💡 Feature Requests

### Before Submitting

1. **Check Existing Features**: Ensure the feature doesn't already exist
2. **Think About Use Cases**: Consider how the feature would be used
3. **Consider Implementation**: Think about technical feasibility

### Feature Request Template

```markdown
## Feature Description
Brief description of the feature

## Use Case
How would this feature be used?

## Proposed Implementation
How could this be implemented?

## Benefits
What benefits would this feature provide?

## Additional Information
Mockups, examples, etc.
```

## 🔄 Pull Request Process

### Before Submitting a PR

1. **Update Documentation**: Update relevant documentation
2. **Add Tests**: Include tests for new functionality
3. **Test Thoroughly**: Test on multiple devices and browsers
4. **Follow Style Guide**: Ensure code follows style guidelines
5. **Update Changelog**: Add entry to CHANGELOG.md

### PR Template

```markdown
## Description
Brief description of changes

## Type of Change
- [ ] Bug fix
- [ ] New feature
- [ ] Documentation update
- [ ] Performance improvement
- [ ] Refactoring

## Testing
- [ ] Tests pass
- [ ] Tested on multiple browsers
- [ ] Tested on mobile devices
- [ ] No console errors

## Screenshots (if applicable)
Add screenshots for UI changes

## Checklist
- [ ] Code follows style guidelines
- [ ] Self-review completed
- [ ] Documentation updated
- [ ] Changelog updated
```

### PR Review Process

1. **Automated Checks**: Ensure all CI checks pass
2. **Code Review**: Address review comments
3. **Testing**: Verify changes work as expected
4. **Documentation**: Ensure documentation is updated
5. **Merge**: PR will be merged after approval

## 🏷️ Issue Labels

We use the following labels to categorize issues:

- **bug**: Something isn't working
- **enhancement**: New feature or request
- **documentation**: Improvements or additions to documentation
- **good first issue**: Good for newcomers
- **help wanted**: Extra attention is needed
- **priority: high**: High priority issues
- **priority: low**: Low priority issues
- **priority: medium**: Medium priority issues

## 📚 Documentation

### Contributing to Documentation

- Keep documentation up to date
- Use clear and concise language
- Include code examples where helpful
- Follow the existing documentation style

### Documentation Structure

- **README.md**: Project overview and quick start
- **API_DOCUMENTATION.md**: API reference
- **DEPLOYMENT_GUIDE.md**: Deployment instructions
- **TROUBLESHOOTING.md**: Common issues and solutions
- **CHANGELOG.md**: Version history

## 🎯 Development Priorities

### Current Focus Areas

1. **Performance Optimization**: Improve loading times and responsiveness
2. **Mobile Experience**: Enhance mobile usability
3. **Accessibility**: Improve accessibility features
4. **Error Handling**: Better error messages and recovery
5. **Testing**: Increase test coverage

### Future Roadmap

- User authentication system
- Advanced search filters
- Social features (reviews, ratings)
- Offline mode improvements
- Multi-language support

## 🤝 Community Guidelines

### Code of Conduct

- Be respectful and inclusive
- Help others learn and grow
- Provide constructive feedback
- Follow project guidelines
- Be patient with newcomers

### Communication

- Use clear and respectful language
- Provide context for suggestions
- Ask questions when unsure
- Share knowledge and resources

## 📞 Getting Help

### Resources

- **Documentation**: Check the docs folder
- **Issues**: Search existing issues
- **Discussions**: Use GitHub Discussions
- **Wiki**: Check project wiki (if available)

### Contact

- **Issues**: Create an issue on GitHub
- **Discussions**: Use GitHub Discussions
- **Email**: [Your email] (for sensitive matters)

## 🙏 Recognition

### Contributors

All contributors will be recognized in:
- **README.md**: Contributors section
- **CHANGELOG.md**: Version notes
- **GitHub**: Contributors page

### Hall of Fame

Special recognition for:
- Major feature contributions
- Bug fixes that save the day
- Documentation improvements
- Community support

---

**Thank you for contributing to NowShowing!** 🎬

Your contributions help make this project better for everyone. Whether you're fixing a bug, adding a feature, or improving documentation, your work is appreciated.
