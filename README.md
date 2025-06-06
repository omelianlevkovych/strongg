# Strongg

Strongg is a minimalistic workout tracker. The backend follows a Domain Driven Development structure implemented with .NET 9 minimal APIs. The frontend is built with React and TypeScript.

## Project Structure

```
backend/     - .NET source code organized by domain, application, infrastructure and web API projects
frontend/    - React application created with Vite
```

## Backend

The solution file `Strongg.sln` references four projects located under `backend/`:
- **Strongg.Domain** – domain entities and repository interfaces
- **Strongg.Application** – application services
- **Strongg.Infrastructure** – infrastructure implementations
- **Strongg.WebApi** – minimal API web server

## Frontend

The frontend is a simple React app built with Vite. It now shows a yearly grid similar to GitHub contributions. Days containing workouts are highlighted in green and a button allows adding new workouts via a small popup form.
Use `pnpm` as the package manager:

```bash
pnpm install
pnpm run
```

During development the React app contacts the Web API running on
`http://localhost:5000` to display the list of workouts.

There are currently no tests or database integrations. This repository is only a starting point to be expanded later (for example with a MAUI mobile app).
