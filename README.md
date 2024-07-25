# Escape the Wilderness

Welcome to "Escape the Wilderness"! This game challenges players to survive in a wilderness filled with obstacles, enemies, and friendly creatures. Players must navigate through various events and make strategic decisions to ensure their survival.

## Table of Contents
- [Introduction](#introduction)
- [User Experience (UX)](#user-experience-ux)
  - [Strategy Plane](#strategy-plane)
  - [Scope Plane](#scope-plane)
  - [Structure Plane](#structure-plane)
  - [Skeleton Plane](#skeleton-plane)
  - [Surface Plane](#surface-plane)
- [Features](#features)
- [Technologies Used](#technologies-used)
- [Testing](#testing)
- [Deployment](#deployment)
- [Credits](#credits)

## Introduction

"Escape the Wilderness" is an interactive survival game where players face various challenges in the wilderness. The game is designed to be engaging and entertaining, providing users with an immersive experience. Players start by entering their name and selecting a difficulty level, and then navigate through a series of events that test their survival skills.

## User Experience (UX)

### Strategy Plane

#### Creator Goals
- Provide an engaging and interactive game experience.
- Ensure the game is accessible and user-friendly across different devices.
- Encourage players to make strategic decisions and think critically.
- Offer multiple difficulty levels to cater to different player skills.

#### User Stories
- As a player, I want to easily start the game and understand the objective.
- As a player, I want to be able to choose different difficulty levels.
- As a player, I want to see my health status and progress throughout the game.
- As a player, I want to be able to reset the game and play again.

### Scope Plane

#### Features Implemented at Launch
- **Home Page:** Introduction to the game and starting interface.
- **Game Interface:** Display of player health, event descriptions, and decision buttons.
- **Reset Functionality:** Allows players to reset the game and start over.

#### Planned Future Features
- **Leaderboard:** Display top player scores.
- **Achievements:** Unlockable achievements for completing specific challenges.
- **Multiplayer Mode:** Option to play with friends online.

### Structure Plane
- **Home Page:** Introduction, player name input, difficulty selection, and start button.
- **Game Interface:** Health bar, turn counter, event area, and decision buttons.
- **Reset Button:** Allows players to reset the game and start over.

### Skeleton Plane

#### Layout Design

##### Header
- **Elements:**
  - Game title displayed prominently.
  - Brief introduction text explaining the game.
- **Styles:**
  - Centered text.
  - Font style and size consistent with the overall theme.
  - Responsive layout to adjust to different screen sizes.

##### Main Content

###### Introduction Section
- **Elements:**
  - Input field for the player to enter their name.
  - Dropdown or buttons for selecting the difficulty level (Easy, Moderate, Hard, Custom).
  - Start button to begin the game.
- **Styles:**
  - Form elements are centered and evenly spaced.
  - Use of padding and margins to ensure a clean layout.
  - Font styles and sizes consistent with the overall design.
  - Responsive design to adjust input field and button sizes for different screen sizes.

###### Game Area
- **Elements:**
  - **Health Bar:**
    - Visual representation of player health.
    - Dynamic updates based on player decisions.
  - **Turn Counter:**
    - Displays the current turn and maximum turns allowed.
  - **Event Area:**
    - Descriptive text area that presents the current event or challenge.
    - Options or choices for the player to make (buttons or links).
  - **Decision Buttons:**
    - Interactive buttons allowing the player to make choices that affect the game state.
    - Buttons for different actions based on the event.
  - **Reset Button:**
    - Button to reset the game to its initial state, allowing the player to start over.
- **Styles:**
  - Health bar with a color gradient to visually represent health levels.
  - Turn counter styled to be prominent and easily readable.
  - Event description area with a clear, readable font and appropriate background for contrast.
  - Decision buttons styled with consistent colors, hover effects, and click animations.
  - Responsive design to ensure that all elements are accessible and visually appealing on various devices.

##### Footer
- **Elements:**
  - Footer elements are minimal due to the single-page nature of the game.
  - If needed, include social media links or additional navigation options.
- **Styles:**
  - Consistent with the overall theme of the game.
  - Responsive to ensure proper display on all devices.

#### Navigation Design
- **Desktop:**
  - Simple, single-page layout with no need for a traditional navigation bar.
- **Mobile:**
  - Responsive adjustments to ensure that all game elements are easily accessible and readable on smaller screens.
  - Consideration for touch interactions on mobile devices.

#### Forms and Interactions

###### Player Name Input
- **Element:**
  - Text input field for the player to enter their name.
- **Validation:**
  - Required field with validation to ensure the player enters a name before starting the game.

###### Difficulty Selection
- **Elements:**
  - Radio buttons or a dropdown menu for selecting the difficulty level.
- **Validation:**
  - Required selection to ensure the player chooses a difficulty level before starting the game.

###### Event and Decision Interactions
- **Elements:**
  - Dynamic event descriptions that change based on player decisions.
  - Interactive decision buttons that update the game state and player's health.
- **Validation:**
  - Ensure all decision buttons trigger the appropriate game logic and updates.

#### Media and Responsive Design
- **Responsive Layout:**
  - Use of media queries to adjust the layout for tablets, laptops, and desktops.
  - Flexible grid system to ensure images and text sections are well-organized.
- **Images:**
  - High-quality images for event illustrations and background decorations.
  - Images scale appropriately on different screen sizes without losing quality.
- **Typography:**
  - Consistent use of fonts across the site for a unified look and feel.
  - Font sizes and weights adjusted for headings, subheadings, and body text to create a clear visual hierarchy.
