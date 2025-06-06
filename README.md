# Strongg

Strongg is a minimalistic workout tracker. The backend follows a Domain Driven Development structure implemented with .NET 9 minimal APIs. The frontend is built with React and TypeScript.

## Project Structure

```
backend/     - .NET source code organized by domain, application, infrastructure and web API
frontend/    - React application created with Vite
```

## Backend

The solution file `backend/Strongg.sln` references four projects:
- **Strongg.Domain** – domain entities and repository interfaces
- **Strongg.Application** – application services
- **Strongg.Infrastructure** – infrastructure implementations
- **Strongg.WebApi** – minimal API web server

## Frontend

The frontend is a simple React app that shows workouts in a GitHub style grid. Run the usual npm scripts to develop:

```bash
npm install
npm run dev
```

There are currently no tests or database integrations. This repository is only a starting point to be expanded later (for example with a MAUI mobile app).
