# 🌱 GitGreens

A fun, nature-themed visualization of your GitHub activity! Watch your repositories bloom into a beautiful garden where each repo becomes a unique plant.

## ✨ Features

- **Living Garden**: Each repository becomes a stylized SVG plant
- **Smart Visualization**: 
  - Plant height = commit activity (repo size)
  - Flower color = programming language
  - Bloom size = star count
- **Interactive**: Hover tooltips with repo details
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
   - Stem height based on commit activity
   - Leaf color for vitality
   - Flower color matching the main programming language
   - Bloom size reflecting star count
4. **Enjoy**: Watch your garden grow with smooth animations!

## 🌿 Plant Mapping

| Repo Attribute | Plant Feature | Visual Effect |
|----------------|---------------|---------------|
| Commit Count   | Stem Height   | Taller = more active |
| Language       | Flower Color  | JavaScript = yellow, Python = blue, etc. |
| Stars          | Bloom Size    | Bigger blooms = more popular |
| Activity       | Animation     | Recent activity = more sway |

## 🎯 Next Phase Ideas

- **Seasonal Themes**: Spring blooms, autumn colors, winter frost
- **Garden Leaderboards**: Compare gardens with friends
- **Time-lapse Mode**: Watch garden evolution over time
- **Custom Plant Types**: Trees for old repos, flowers for new ones
- **Weather Effects**: Rain for active days, sunshine for stars
- **Garden Sharing**: Social media integration
- **Advanced Metrics**: Pull requests as butterflies, issues as weeds

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
