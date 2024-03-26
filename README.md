# TODO App

A simple TODO application built with Next JS, TypeScript, Context API, Drizzle & Prisma framework with PostgreSQL for managing tasks and their statuses.

## Installation

1. Clone this repository.
2. Install dependencies using `npm install`.

## Usage

### Tailwind CSS Configuration

This project utilizes Tailwind CSS for styling. The configuration file can be found at `tailwind.config.js`. It includes custom classes and base styles for consistent UI design.

### Database Migration

Database migration is managed using the Drizzle framework with PostgreSQL as the database driver. The migration configuration file can be found at `drizzle.config.js`. Ensure the specified database schema file exists and the `DB_CONNECTION_URL` environment variable is set with the database connection URL.

### Components and Hooks

The project includes various React components and custom hooks for building UI elements and handling application logic. Components such as TodoList, TodoItem, Form, and Modal are documented with their props and usage instructions.

### Providers

Providers such as TodoProvider, RouterProvider, and FlagStatesProvider manage application state and context. They are used to share data and functions across components.

### Custom CSS

Custom CSS classes are defined for specific styling needs. They extend the utility classes provided by Tailwind CSS and can be applied to HTML elements as needed.

### Next.js and TypeScript

This project is built using Next.js and TypeScript, providing benefits such as static typing and server-side rendering.

### Context API

Context API is used for managing application state and sharing data between components. Context providers and hooks are implemented to facilitate state management.
