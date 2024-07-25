# Escape the Wilderness


[Link to live page](https://robertdivkovic.github.io/survive-wilderness/)

![alt text](/docs/images/responsive1.png)

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

## The Surface Plane

### Features Present Across the Project

#### Navigation Bar
- **Description:**
  - Not applicable for this project as it is a single-page application.
  - All navigation occurs within the game interface itself.

#### Game Interface

##### Turn Counter
- **Description:**
  - Displays the current turn and the maximum number of turns allowed.
- **Styles:**
  - **Colors:** Contrasting background and text colors to ensure readability.
  - **Font:** Bold and clear font to stand out on the interface.
  - **Position:** Placed prominently near the top of the game area for easy visibility.
- **Screenshots:**
  - ![Turn Counter](/docs/images/turncounter.png)

##### Event Area
- **Description:**
  - Displays the current event or scenario that the player must respond to.
  - Provides context and options for the player to choose from.
- **Styles:**
  - **Colors:** Neutral background with dark text for high readability.
  - **Font:** Clear and legible font with appropriate size for reading long paragraphs.
  - **Borders:** Subtle borders to separate the event text from other elements.
- **Screenshots:**
  - ![Event Area](/docs/images/eventarea.png)

##### Decision Buttons
- **Description:**
  - Interactive buttons allowing the player to make decisions that affect the game state.
  - Each button represents a possible action or response to the current event.
- **Styles:**
  - **Colors:** Primary colors that stand out against the background.
  - **Hover Effects:** Slight color changes and shadows to indicate interactivity.
  - **Click Effects:** Brief animations to provide feedback on button presses.
  - **Position:** Aligned centrally or contextually within the event area.
- **Screenshots:**
  - ![Decision Buttons](/docs/images/decisionbuttons.png)

##### Reset Button
- **Description:**
  - Allows players to reset the game and start over from the beginning.
- **Styles:**
  - **Colors:** Distinct color to differentiate from other buttons.
  - **Font:** Bold and clear to indicate its critical function.
  - **Position:** Placed conveniently within the game interface.
- **Screenshots:**
  - ![Reset Button](/docs/images/reset.png)

### Visual and Interaction Design

##### Color Scheme
- **Main Colors:** 
  - **Background:** #FFFFFF (white) for a clean and simple look.
  - **Primary Text:** #292828 (dark gray) for high readability.
  - **Accent Colors:** #7D481A (brown), #544F4F (gray), #87603C (light brown), and #C59C3D (gold) for thematic consistency.
- **Gradient Backgrounds:**
  - Used for sections such as the event area to provide depth and visual interest.
- **Examples:**
  - ![Gradient Background](/docs/images/gradient.png)

##### Typography
- **Fonts:**
  - **Primary Font:** Verdana, Geneva, Tahoma, sans-serif for all text, providing a clean and modern appearance.
  - **Font Styles:** Consistent use of font weights and sizes for headings, subheadings, and body text to create a clear visual hierarchy.

##### Imagery
- **Event Illustrations:**
  - High-quality images that illustrate the current events, enhancing the narrative and engagement.
- **Background Decorations:**
  - Subtle background images to add texture and context to the game interface without distracting from the main content.
- **Scaling:**
  - Images scale appropriately on different screen sizes to maintain quality and responsiveness.
- **Examples:**
  - ![Event Illustration](/docs/images/eventillustration.png)

##### Responsiveness
- **Layout Adjustments:**
  - Use of media queries to adjust the layout for various devices, ensuring that all game elements are accessible and visually appealing on tablets, laptops, and desktops.
- **Flexible Grid System:**
  - Ensures that images and text sections are well-organized and maintain their layout integrity across different screen sizes.
- **Examples:**
  - ![Responsive Layout](/docs/images/responsive.png)

##### Hover and Click Effects
- **Hover Effects:**
  - Subtle changes in color and shadow on interactive elements to indicate interactivity.
- **Click Effects:**
  - Brief animations or changes in button appearance to provide immediate feedback on user actions.

This detailed Surface Plane section ensures that the visual and interactive elements of the "Escape the Wilderness" game are cohesive, engaging, and accessible across various devices and screen sizes.

## Technologies Used
- [HTML](https://developer.mozilla.org/en-US/docs/Web/HTML)
- [CSS](https://developer.mozilla.org/en-US/docs/Web/CSS)
- [GitHub](https://github.com/)
- [Git](https://git-scm.com/)
- [jQuery](https://jquery.com/)
- [Flaticon](https://www.flaticon.com/)
- [JavaScript](https://developer.mozilla.org/en-US/docs/Web/JavaScript)
- [Hover.css](https://ianlunn.github.io/Hover/)
- [FontAwesome](https://fontawesome.com/)
- [CodeAnywhere](https://codeanywhere.com/)
- [Google Fonts](https://fonts.google.com/)
- [QuillBot](https://quillbot.com/)
- [Google Developer Tools](https://developers.google.com/web/tools/chrome-devtools)

## Testing

### User Stories Testing

- **Player Name Input:** Ensured the player must enter a name to start the game.
- **Difficulty Selection:** Tested all difficulty levels to ensure appropriate game behavior.
- **Event Descriptions:** Checked that all events and options display correctly.
- **Decision Buttons:** Confirmed that decision buttons work as expected and impact the game state.
- **Reset Button:** Ensured the reset button clears the game state and allows players to start over.

### Manual Testing

- **Navigation Bar:** Not applicable.
- **Footer:** Not applicable.
- **Game Interface:**
  - Fully responsive on large, medium, and small resolutions.
  - All interactive elements (buttons, inputs) function as expected.

### Devices Used During Testing
- Desktop Computer
- Razer Blade 15 Advanced (laptop)
- Samsung A53
- Samsung A50
- iPhone 13
- Lenovo Tab M10 Plus
- Acer (laptop)

### Browser Testing
The game was tested on the following browsers:
- Google Chrome
- Mozilla Firefox
- Microsoft Edge
- Safari

### Chrome Dev Tools
Chrome Dev Tools was used throughout the development of the project to test responsiveness. Responsiveness was tested using Dev Tools to emulate the following devices:
- iPhone SE
- iPhone XR
- iPhone 12 Pro
- iPhone 14 Pro Max
- Pixel 7
- Samsung Galaxy S8+
- Samsung Galaxy S20 Ultra
- iPad Mini
- iPad Air
- iPad Pro
- Surface Pro 7
- Surface Duo
- Galaxy Fold
- Samsung Galaxy A51/71
- Nest Hub
- Nest Hub Max