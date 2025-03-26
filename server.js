import express from "express";
import swaggerJSDoc from "swagger-jsdoc";
import swaggerUi from "swagger-ui-express";

const app = express();

app.use(express.json());

const port = 3000;

const swaggerOptions = {
  definition: {
    openapi: "3.0.0",
    info: {
      title: "Users API",
      version: "1.0.0",
      description: "A simple Express Users API",
    },
  },
  apis: ["./server.js"],
};

const swaggerDocs = swaggerJSDoc(swaggerOptions);

app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerDocs));

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

/**
 * @swagger
 * /user:
 *   get:
 *     summary: Retrieves all users
 *     description: Retrieve a list of users.
 *     responses:
 *       200:
 *         description: A list of users.
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   id:
 *                     type: integer
 *                   name:
 *                     type: string
 *                   age:
 *                     type: integer
 */

app.get("/user", (req, res) => {
  res.json(users);
});

/**
 * @swagger
 * /user:
 *   post:
 *     summary: Adds a new user
 *     description: Creates a new user with a name and age.
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - name
 *               - age
 *             properties:
 *               name:
 *                 type: string
 *               age:
 *                 type: integer
 *     responses:
 *       200:
 *         description: User successfully added.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                 user:
 *                   type: object
 *                   properties:
 *                     id:
 *                       type: integer
 *                     name:
 *                       type: string
 *                     age:
 *                       type: integer
 *       400:
 *         description: Missing user data.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 */

app.post("/user", (req, res) => {
  const { name, age } = req.body;
  if (!name || !age) {
    return res
      .status(400)
      .json({ message: "Missing user data: 'name' and 'age' are required" });
  }
  const newUser = {
    id: users.length + 1,
    name: name,
    age: age,
  };
  users.push(newUser);
  res.json({ message: "New user added", user: newUser });
});

/**
 * @swagger
 * /user/{id}:
 *   put:
 *     summary: Updates an existing user
 *     description: Modifies a user's name and/or age by ID.
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: The ID of the user to update.
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *               age:
 *                 type: integer
 *     responses:
 *       200:
 *         description: User successfully updated.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                 user:
 *                   type: object
 *                   properties:
 *                     id:
 *                       type: integer
 *                     name:
 *                       type: string
 *                     age:
 *                       type: integer
 *       404:
 *         description: User not found.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 */

app.put("/user/:id", (req, res) => {
  const { name, age } = req.body;
  const UserId = parseInt(req.params.id);
  const user = users.find((u) => u.id === UserId);
  if (!user) {
    return res.status(404).json({ message: "User not found" });
  }
  user.name = name || user.name;
  user.age = age || user.age;
  res.json({ message: "User sucessfully updated", user });
});

/**
 * @swagger
 * /user/{id}:
 *   delete:
 *     summary: Deletes a user
 *     description: Removes a user by their ID.
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: The ID of the user to delete.
 *     responses:
 *       200:
 *         description: User successfully deleted.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 */

app.delete("/user/:id", (req, res) => {
  const userId = parseInt(req.params.id);
  users = users.filter((user) => user.id !== userId);
  res.json({ message: "User successfully deleted" });
});
app.listen(port, () => {
  console.log(`Server is up and running on port ${port}`);
});
