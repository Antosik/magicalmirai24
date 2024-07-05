# Architecture

## Technologies

### Core

- [Svelte](https://svelte.dev/) - JS web framework
- [TypeScript](https://www.typescriptlang.org/) - programming languages
- [SASS](https://sass-lang.com/) - css extension language

### Additional Web APIs

- [Screen Wake Lock API](https://developer.mozilla.org/en-US/docs/Web/API/Screen_Wake_Lock_API) is used to prevent devices sleep during the game process (see [code](../src/lib/utils/screen.ts))
- [Web Audio API](https://developer.mozilla.org/en-US/docs/Web/API/Web_Audio_API) is used to apply cool fadeout/fadein effect for background music and add an ability to change volume on iOS devices (see [code](../src/lib/utils/background-audio.ts))

## Project structure

### General structure

    .
    ├── .github/workflow/       # GitHub Actions folder (contains Lint CI)
    ├── docs/                   # Documentation files
    ├── src/                    # Source files
    │   ├── lib                 # Components & scripts
    │   ├── scss                # Contains general SCSS styles that available in all components
    │   ├── app.scss            # General app styles
    │   ├── App.svelte          # General app component
    │   ├── main.ts             # General app script - contains contexts and app initialization
    │   └── ...                 # Misc TypeScript definitions
    ├── static/                 # Static assets
    └── ...                     # Misc config files

### Lib folder structure

    lib /                               # Components & scripts
    ├── blocks/
    │   ├── FullscreenButton.svelte     # Enables fullscreen mode
    │   ├── PauseButton.svelte          # Simple pause button
    │   └── PauseButton.svelte          # Volume slider
    ├── components/
    │   ├── clouds/                     # Contains components for different types of clouds
    │   ├── BackgroundMusic.svelte      # Enables background music
    │   ├── Slider.svelte               # Reusable slider component
    │   └── Stars.svelte                # Background stars
    ├── contexts/
    │   ├── games/                      # Data provider for in-game objects rendering (symbols)
    │   ├── locale/                     # Data provider for localization
    │   ├── page/                       # Data provider for active page (main menu, game, credits, etc.)
    │   ├── player/                     # Data provider for TextAlive player instance
    │   ├── playerPosition/             # Data provider for in-game player position
    │   ├── playerState/                # Data provider for audio player state (selected song, TextAlive manageability, readiness, etc.)
    │   └── settings/                   # Data provider for game settings (volume, autoplay, speed)
    ├── game/
    │   ├── constants.ts                # Game constants
    │   ├── Game.svelte                 # Game screen (characters renderer)
    │   ├── Pause.svelte                # Pause window content
    │   ├── Results.svelte              # Results window content
    │   ├── SongInfo.svelte             # Provides info about selected song
    │   └── utils.ts                    # Game utils functions (position and colors calculation, etc.)
    ├── scenes/
    │   ├── GameScene.svelte            # Game scene renderer (background, moon, player and error nodes)
    │   ├── Pause.svelte                # Game state scene renderer (used during the pause & results)
    │   └── Results.svelte              # General UI scene (background, moon, etc.)
    ├── songs/                          # Contains info about in-game available songs
    ├── utils/
    │   ├── background-audio.ts         # Background audio utils (volume control, fadein/fadeout)
    │   ├── packages.ts                 # Contains info about used packages
    │   ├── screen.ts                   # Screen wake utils
    │   ├── settings.ts                 # Contains some utils for settings data provider
    │   └── types.ts                    # Contains utility types
    └── widgets/
    │   ├── credits/                    # Contains components to render on "Credits" page
    │   ├── Credits.svelte              # Contains "Credits" page content
    │   ├── Game.svelte                 # Contains "Game" page content and logic around pause/results rendering
    │   ├── Help.svelte                 # Contains "Help" page content
    │   ├── MainMenu.svelte             # Contains "Main Menu" page content
    └── └── Start.svelte                # Contains "Start" page content
