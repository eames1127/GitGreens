# 🌱 GitGreens

A fun, nature-themed visualization of your GitHub activity! Watch your repositories bloom into a beautiful garden where each repo becomes a unique plant.

## ✨ Features

- **Living Garden**: Each repository becomes a stylized SVG plant based on project size
- **Plant Evolution**: 
  - **Grass** (< 100MB): Simple grass tufts for tiny projects
  - **Shrubs** (100MB - 500MB): Bushy plants for small-medium projects
  - **Trees** (500MB - 1GB): Branched trees for large projects
  - **Oak Trees** (> 1GB): Majestic oaks for massive codebases
- **Living Ecosystem**: 
  - 🐝 **Bees** (pulsing golden) = Recent activity (pushed in last 7 days)
  - 🪰 **Flies** (gray) = Open issues needing attention
  - 🦋 **Butterflies** (red) = Popular repositories (10+ stars)
- **Smart Visualization**: 
  - Plant height = repository size and activity
  - Flower color = programming language
  - Bloom size = star count
- **Interactive**: Hover tooltips with detailed repo information
- **Themes**: Light and dark garden modes
- **Animations**: Plants grow and sway naturally
- **Export Ready**: Built-in garden export functionality

## 🚀 Quick Start

```bash
# Install dependencies
npm install

# Start development server
npm run dev

# Build for production
npm run build
```

## 🏗️ Project Structure

```
GitGreens/
├── .github/
│   └── ISSUE_TEMPLATE/
├── src/
│   ├── components/
│   │   ├── GardenCanvas.vue  # Garden grid container
│   │   ├── Home.vue          # Main input and layout
│   │   └── Plant.vue         # Individual plant SVG
│   ├── composables/
│   │   └── useGitHub.js      # GitHub API logic
│   ├── App.vue               # Root component with theming
│   ├── main.js               # Vue app entry
│   └── style.css             # Global styles + animations
├── .gitignore
├── index.html                # Entry HTML file
├── LICENSE
├── package.json              # Dependencies and scripts
├── package-lock.json
├── postcss.config.js         # PostCSS configuration
├── README.md
├── tailwind.config.js        # TailwindCSS configuration
└── vite.config.js            # Vite build configuration
```

## 🎨 How It Works

1. **Enter Username**: Type any GitHub username
2. **Fetch Data**: Pulls public repositories via GitHub REST API
3. **Generate Garden**: Each repo becomes a plant with:
   - **Plant Type**: Determined by repository size (grass → shrub → tree → oak)
   - **Stem Height**: Based on repository activity and size
   - **Flower Color**: Matches the main programming language
   - **Bloom Size**: Reflects star count popularity
   - **Ecosystem**: Living insects show project health and activity
4. **Enjoy**: Watch your garden grow with smooth animations!

## 🌿 Garden Ecosystem

| Element | Meaning | Trigger |
|---------|---------|----------|
| 🐝 **Bees** | Active Development | Repository pushed to in last 7 days |
| 🪰 **Flies** | Issues Need Attention | Open issues count > 0 |
| 🦋 **Butterflies** | Community Love | Star count ≥ 10 |
| 🌱 **Grass** | Tiny Projects | Repository size < 100MB |
| 🌿 **Shrubs** | Small Projects | Repository size 100MB - 500MB |
| 🌳 **Trees** | Large Projects | Repository size 500MB - 1GB |
| 🌲 **Oak Trees** | Massive Projects | Repository size > 1GB |

## 🎨 Plant Mapping

| Repo Attribute | Plant Feature | Visual Effect |
|----------------|---------------|---------------|
| Repository Size | Plant Type | Grass → Shrub → Tree → Oak |
| Recent Activity | Bees (Pulsing) | Golden bees for active repos |
| Open Issues | Flies | Gray flies indicate maintenance needed |
| Star Count | Butterflies + Bloom Size | Red butterflies for popular repos |
| Language | Flower Color | JavaScript = yellow, Python = blue, etc. |
| Activity Level | Animation | Recent activity = more sway |

## 🎯 Future Enhancements

### 🌍 Ecosystem Expansion
- **Ground Cover Elements**:
  - README quality = grass health and density
  - Documentation coverage = flower bed richness
  - Test coverage = beneficial mushrooms
  - CI/CD status = garden irrigation systems

### 🎨 Visual Improvements
- **Seasonal Themes**: Spring blooms, autumn colors, winter frost
- **Weather Effects**: Rain for active days, sunshine for stars
- **Time-lapse Mode**: Watch garden evolution over time
- **Advanced Plant Types**: Fruit trees for mature repos, cacti for archived ones

### 🚀 Social Features
- **Garden Leaderboards**: Compare gardens with friends
- **Garden Sharing**: Social media integration with garden snapshots
- **Collaborative Gardens**: Team/organization garden views

### 📊 Advanced Metrics
- **Pull Requests**: Represented as visiting birds or pollinators
- **Contributors**: Show as garden visitors or helper animals
- **Commit Frequency**: Seasonal growth patterns
- **Repository Health**: Overall garden vitality scoring

## 🛠️ Tech Stack

- **Vue 3** - Reactive framework
- **Vite** - Fast build tool
- **TailwindCSS** - Utility-first styling
- **GitHub REST API** - Repository data
- **SVG** - Scalable plant graphics
- **html-to-image** - Garden export (optional)

## 🤖 Development

Inspired by the existing GitGarden concept, this project is a fresh reimagining with Vue 3 and modern web technologies. Initial project scaffolding was generated entirely by AI prompt using Amazon Q Developer.

## 🤝 Contributing

Fork, customize, and share your garden themes! This project is designed to be:
- **Modular**: Easy to add new plant types
- **Extensible**: Simple to add new data sources
- **Styleable**: TailwindCSS makes theming a breeze

## 📝 License

MIT - Grow your gardens freely! 🌻
