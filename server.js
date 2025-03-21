import express from "express";

const app = express();

app.use(express.json());

const port = 3000;

let users = [
  {
    id: 1,
    name: "Alex",
    age: 29,
  },
  {
    id: 2,
    name: "John",
    age: 35,
  },
];

app.get("/user", (req, res) => {
  res.json(users);
});
app.post("/user", (req, res) => {
  const { name, age } = req.body;
  const newUser = {
    id: users.length + 1,
    name: name,
    age: age,
  };
  users.push(newUser);
  res.json({ message: "New user added", user: newUser });
});
app.put("/user/:id", (req, res) => {
  const { name, age } = req.body;
  const UserId = parseInt(req.params.id);
  const user = users.find((u) => u.id === UserId);
  if (!user) {
    return res.status(404).json({ message: "Book not found" });
  }
  user.name = name || user.name;
  user.age = age || user.age;
  res.json({ message: "book updated", user });
});
app.delete("/user/:id", (req, res) => {
  const userId = parseInt(req.params.id);
  users = users.filter((user) => user.id !== userId);
  res.json({ message: "User successfully deleted", users: users });
});
app.listen(port, () => {
  console.log(`Server is up and running on port ${port}`);
});
