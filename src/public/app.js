const list = document.getElementById("todo-list");
const form = document.getElementById("todo-form");
const input = document.getElementById("todo-input");

async function loadTodos() {
  const response = await fetch("/api/todos");
  const todos = await response.json();
  list.innerHTML = "";

  for (const todo of todos) {
    const item = document.createElement("li");
    item.className = `todo-item${todo.completed ? " completed" : ""}`;

    const checkbox = document.createElement("input");
    checkbox.type = "checkbox";
    checkbox.checked = todo.completed;
    checkbox.addEventListener("change", async () => {
      await fetch(`/api/todos/${todo.id}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ completed: checkbox.checked }),
      });
      await loadTodos();
    });

    const label = document.createElement("span");
    label.textContent = todo.title;

    const remove = document.createElement("button");
    remove.type = "button";
    remove.textContent = "Delete";
    remove.addEventListener("click", async () => {
      await fetch(`/api/todos/${todo.id}`, { method: "DELETE" });
      await loadTodos();
    });

    item.append(checkbox, label, remove);
    list.append(item);
  }
}

form.addEventListener("submit", async (event) => {
  event.preventDefault();
  const title = input.value.trim();
  if (!title) {
    return;
  }

  await fetch("/api/todos", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ title }),
  });

  input.value = "";
  await loadTodos();
});

loadTodos().catch((error) => {
  console.error(error);
  list.innerHTML = "<li>Failed to load todos.</li>";
});
