# Sleep Quality Predictor 😴

A sleek, highly interactive web application that predicts your sleep efficiency based on daily habits. Built with an intuitive, real-time glassmorphism UI, this tool dynamically calculates a sleep score and offers actionable insights without ever sending your data to a server.

## Features ✨
- **Real-Time Forecasting**: Instantly calculates your sleep score as you tweak your daily habits (no submit button required).
- **Dynamic Insights**: Provides intelligent, personalized tips based on your specific inputs (e.g., warning you about high caffeine intake or screen time).
- **Premium Aesthetics**: Features a modern "glassmorphism" design with a starry, mouse-tracking background gradient and fluid animations.
- **Privacy First**: All calculations are heuristic and happen locally in your browser. No data is stored or transmitted.
- **Fully Responsive**: Works beautifully on both desktop and mobile devices.

## Tech Stack 🛠️
- **HTML5**: Semantic structure.
- **CSS3**: Custom properties, Flexbox/Grid, keyframe animations, and backdrop-filter for glass effects.
- **Vanilla JavaScript (ES6)**: Real-time event listeners, DOM manipulation, and the heuristic scoring algorithm.
- **FontAwesome**: Scalable vector icons.

## How to Run 🚀
Since this is a static frontend application, no complex build tools or servers are required!

1. Clone or download this repository.
2. Navigate to the project folder.
3. Simply double-click the `index.html` file to open it in your favorite web browser (Chrome, Edge, Firefox, etc.).
4. Start adjusting the sliders and watch your sleep score update!

## The Algorithm 🧠
*Note: This is a heuristic model designed for educational and portfolio purposes. It is not a clinical diagnostic tool.*

The underlying logic starts with a base score and applies penalties or bonuses based on scientifically recognized sleep factors:
- **Caffeine**: Penalizes high intake (over 200mg).
- **Screen Time**: Deducts points for extended blue light exposure right before sleep.
- **Exercise**: Rewards moderate physical activity (30-120 minutes).
- **Stress & Alcohol**: Deducts points based on severity and volume, as both fragment REM sleep.
- **Sleep Duration**: Heavily penalizes sleep debt (under 7 hours) and slightly penalizes oversleeping.

## License 📄
This project is open-source and free to use for personal or educational purposes.
