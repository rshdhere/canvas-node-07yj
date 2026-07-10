const express = require("express");
const path = require("path");
const todosRouter = require("./routes/todos");

const app = express();
app.use(express.json());
app.use(express.static(path.join(__dirname, "public")));

app.get("/", (_req, res) => {
  res.sendFile(path.join(__dirname, "public", "index.html"));
});

app.get("/health", (_req, res) => {
  res.json({ ok: true });
});

app.use("/api/todos", todosRouter);

const port = Number(process.env.PORT || 3000);
app.listen(port, () => {
  console.log(`Todo app listening on http://localhost:${port}`);
});
