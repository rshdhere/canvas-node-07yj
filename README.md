# Drift Base

Node.js todo app with Express API and a simple web UI.

## Getting started

```bash
npm install
npm start
```

Open [http://localhost:3000](http://localhost:3000).

## API

- `GET /api/todos` — list todos
- `POST /api/todos` — create todo (`{ "title": "..." }`)
- `PATCH /api/todos/:id` — update todo
- `DELETE /api/todos/:id` — delete todo
- `GET /health` — health check
