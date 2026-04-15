<p align="center">
  <img
    width="400"
    src="https://raw.githubusercontent.com/starship/starship/master/media/logo.png"
    alt="GoldStarboard"
  />
</p>

---

This is my final project for ITAS 274 - Mobile Development II.

This is a leaderboard app for weather station.

Each station are ranked by how many days they held a gold star badge.

The gold star badge is granted to a station by providing high quality data to [weatherunderground](https://www.wunderground.com/) in which they dislay the gold star badge on the weather station page.

## Installation

---

### Prerequ

**1. Install Bun**

Linux & macOS
```zsh
curl -fsSL https://bun.sh/install | bash
```

Windows
```zsh
powershell -c "irm bun.sh/install.ps1 | iex"
```

**2. Install uv**

Linux & macOS
```zsh
curl -LsSf https://astral.sh/uv/install.sh | sh
```

Windows
```zsh
powershell -ExecutionPolicy ByPass -c "irm https://astral.sh/uv/install.ps1 | iex"
```

**3. Clone the repo**
```zsh
git clone https://github.com/MejarAdobo/goldstarboard.git
```

**4. Install mobile dependencies**
```zsh
cd client
bun install
```

**5. 

## Tech Stack

- Mobile
  - Framework: React Native
  - Tooling: Expo
  - Styling: Nativewind v4
  - Icons: Material Symbol
  - Package Manager: Bun
  - Libraries
	  - expo-router
		- react-native-reanimated
- Backend
  - Framework: Django
  - Language: Python
- Database
  - PostgeSQl
