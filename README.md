# BitMaster Frontend

**BitMaster** is an interactive DSA (Data Structures and Algorithms) practicing website that features an online code compiler. The frontend is built using modern JavaScript frameworks, aiming for a smooth user experience while practicing and submitting coding challenges.

## Table of Contents

1. [Project Overview](#project-overview)
2. [Tech Stack](#tech-stack)
3. [Getting Started](#getting-started)
   - [Prerequisites](#prerequisites)
   - [Installation](#installation)
   - [Running the Project](#running-the-project)
4. [Features](#features)
5. [Folder Structure](#folder-structure)
6. [Contribution Guidelines](#contribution-guidelines)
7. [License](#license)

---

## Project Overview

BitMaster's frontend provides an intuitive platform for users to practice DSA problems, submit solutions, and receive immediate feedback through the integrated online compiler.

Key features include:
- User authentication and profile management
- Problem selection and filtering
- Real-time code execution and results display
- Problem history and performance tracking

## Tech Stack

- **Frontend Framework**: React.js + Typescript
- **State Management**: Redux Toolkit
- **Styling**: Tailwind CSS
- **API Integration**: Axios for API calls to the backend
- **Code Editor**: Integrated with [Monaco Editor](https://microsoft.github.io/monaco-editor/)
- **Database**: Mongodb

## Getting Started

### Prerequisites

Ensure you have the following installed:

- Node.js (>= 14.x)
- npm or yarn
- Git

### Installation

1. Clone the repository:

   ```bash
   git clone https://github.com/Shwetank-nitp/bitmaster.git
   cd bitmaster
   ```

2. Install dependencies:

   ```bash
   npm install
   # or
   yarn install
   ```

### Running the Project

To start the development server:

```bash
npm run dev
# or
yarn dev
```

By default, the app will be accessible at `http://localhost:5173`.

## Features

- **User Authentication**: Register and login features.
- **Practice Problems**: Filter problems by difficulty or category.
- **Code Editor**: Online editor with real-time feedback for test cases.
- **Responsive Design**: Optimized for desktop and mobile use.
- **Performance History**: Track progress over time.

## Folder Structure

Here's an overview of the folder structure:

```bash
bitmaster-frontend/
├── public/               # Static assets like images, fonts, etc.
├── src/
│   ├── components/       # Main folder for all reusable components
│   │   ├── editor/       # Code editor-related components
│   │   ├── layouts/      # Layout components (headers, footers, etc.)
│   │   ├── navigation-bar/ # Components related to navigation and menus
│   │   ├── pages/        # Page components (e.g., Home, ProblemDetails)
│   │   ├── problem-statement/ # Components for displaying problems
│   │   ├── shared/       # Shared reusable components across the app
│   │   └── ui/           # UI components like buttons, inputs, etc.
│   ├── hooks/            # Custom React hooks
│   ├── redux/            # Redux store, actions, reducers
│   ├── App.tsx           # Root application component
│   ├── index.css         # Global styles
│   ├── main.tsx          # Main entry point for the React app
│   └── vite-env.d.ts     # Vite environment types
└── README.md             # You're here!
```

## Contribution Guidelines

We welcome contributions from the community! To get started:

1. Fork the repository.
2. Create a new branch (`git checkout -b feature/new-feature`).
3. Make your changes.
4. Commit your changes (`git commit -m 'Add some feature'`).
5. Push to the branch (`git push origin feature/new-feature`).
6. Open a pull request.

### Adding Problems

To add a new problem to the platform:

- Ensure that the problem has a clear description, input/output formats, constraints, and example test cases.
- The problem should be tested locally to ensure validity before submitting.

Check the [Problem Contribution Guide](link-to-backend-repo) for more information.
