# CIS 3500: Nara Extension Starter

## Overview
For this project, Shafaa and Andrea contributed to the Nara Extension Starter by implementing the following features:

1. Rotating Weekly Challenge (Shafaa)

- Added a “Weekly Challenge” module that selects a new mini‑challenge each Monday from a configurable list (e.g. “Drink 8 glasses of water,” “Take a 10‑minute walk”).

- Integrated checkboxes next to each challenge so users can mark progress alongside their normal tasks.

- Persisted completion state in Chrome storage and automatically resets the challenge at the start of each week.

2. Inspirational Quote Overlay (Shafaa)

- Created a New Tab override that displays a randomly chosen inspirational quote or affirmation on every tab load.

- Styled the overlay to be lightweight and unobtrusive (opacity, font size, positioning).

3. Speech Bubble Encouragement (Andrea)

- Implemented a feature such that whenever a user has completed their task, a thought bubble appears with encouraging message
  
- Designed the feature to bubble up slightly and disappear after a few seconds.

4. Mood Selection Prompt (Andrea)

- Designed a mood selection feature that allows users to choose a mood that they align with in order to store their emotional state

**Original project:** [Nara](https://github.com/luyiZhang818/Nara-Chrome-Extension)

## Project Description
Nara is a Chrome extension that helps users manage their tasks and reminders efficiently. Your task is to enhance this extension by implementing new features.

## Enhancement Options
Choose one of the following enhancements to implement:

1. **Speech Bubble Encouragement**: Implement a feature where, whenever the user checks off a task, a speech or thought bubble appears near the deer with a short, encouraging message (e.g., “Great job!”, “You’re making progress!”, “Keep going!”).
2. **Daily Gratitude Log**: Implement a small text area where users can note one thing they’re grateful for each day. Over time, they can revisit a dedicated “gratitude log” to see their positive moments. Provide an interesting method to save these entries and display them on a separate screen so users can easily access their past entries.
3. **Mood Selection Prompt**: Implement a simple mood selection feature(e.g., happy, stressed, neutral) with a small icon or emoji. This allows users to log their emotional state quickly each day.
4. **Rotating Weekly Challenge**: Implement a weekly challenge system—such as “Drink 8 glasses of water each day” or “Take a 10-minute walk daily.” Users can check off these mini-challenges alongside their normal tasks for extra motivation.
5. **Inspirational Quote Overlay**: Implement a short inspirational quote or positive affirmation that appears on each new tab, displayed in a subtle text overlay.
6. **Implement a History Feature**: Maintain a log of all tasks and reminders created by the user, allowing them to revisit past items and track progress over time.
7. **Custom Feature**: Propose a unique feature (requires instructor/TA approval).

## Getting Started

### Step 1: Team Organization
- Assign a team member as the **Product Manager (PM)** for Nara.
- Ensure this PM is different from the one assigned to the Lunch Lotto project.

### Step 2: Repository Setup
The PM should fork the repository:
1. Navigate to the `nara-extension-starter` repository on GitHub.
2. Click the **Fork** button to create a copy under their account.

### Step 3: Cloning the Repository
Once the PM has forked the repository, team members should clone it locally:
```sh
git clone https://github.com/<PM-username>/nara-extension-starter.git
```

### Step 4: Development Workflow
1. Open the project in a text editor (e.g., **Visual Studio Code** recommended).
2. Make changes to the codebase.
3. Use the following commands to commit and push your changes:

```sh
git add .
git commit -m "feat: [feature name] added"
git push
```

4. As team members contribute, collaborate using **Pull Requests (PRs)** on GitHub.
5. Regularly sync your local repository with the latest changes:

```sh
git pull
```

6. Resolve merge conflicts as needed and ensure smooth integration.

## Submission
- Submit the final version of your project as per course guidelines.
- Include a brief write-up of your implemented features and any challenges faced.

---
Happy coding, and good luck with Nara! 🦌
