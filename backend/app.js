const express = require("express");
const bodyParser = require("body-parser");
const { config } = require("dotenv");
const sequelize = require("./utils/database.js");
const { Messages } = require("./models/index.js");

// Initialize environment variables
config();

const app = express();

// Middleware
app.use(express.json());
const cors = require("cors");
app.use(cors());
// Root route
app.get("/", async (req, res) => {
  console.log("success");
  return res.status(200).json(await Messages.findAll());
});
app.get("/:id", async (req, res) => {
  const id = req.params.id;
  try {
    const fetch = await Messages.findByPk(id);
    if (fetch) {
      return res.status(200).json(fetch);
    } else {
      return res.status(404).json("Uncorrect fetch");
    }
  } catch (error) {
    return res.status(500).json("Server error");
  }
});
app.post("/", async (req, res) => {
  const { message } = req.body;
  console.log(message);
  try {
    const existing = await Messages.findOne({ where: { message } });
    if (!existing) {
      const create = await Messages.create({ message: message });
      if (create) {
        return res.status(200).json("message created successfully!");
      } else {
        return res.status(500).json("semething went wrong");
      }
    } else {
      return res.status(409).json({ error: "Message already exists" });
    }
  } catch (error) {
    return res.status(500).json("Server error");
  }
});
app.put("/:id", async (req, res) => {
  const { id } = req.params;
  const { message } = req.body;
  console.log(id);
  console.log(message);

  try {
    const fetch = await Messages.findByPk(id);
    if (fetch) {
      const replacement = await Messages.update(
        { message: message },
        { where: { id } }
      );
      if (replacement) {
        return res.status(200).json("message updated successfully!");
      } else {
        return res.status(500).json("semething went wrong");
      }
    } else {
      return res.status(500).json("semething went wrong");
    }
  } catch (error) {
    return res.status(500).json("Server error");
  }
});
app.delete("/:id", async (req, res) => {
  const id = req.params.id;
  if (!id) {
    return res.status(500).json({ error: "Something went wrong" });
  }
  console.log(req.params);
  try {
    const deleted = await Messages.destroy({
      where: {
        id: id,
      },
    });
    if (deleted !== 0) {
      console.log("success to deliting message with id:", id);
      return res.status(200).json({ message: "message deleted successfully" });
    } else {
      return res.status(404).json({ error: "Message not found" });
    }
  } catch (error) {
    console.log("Server error");
    res.status(500).json("Server error");
  }
});

// Global Error Handling Middleware
app.use((error, req, res, next) => {
  const status = error.statusCode || 500;
  const message = error.message;
  const data = error.data;

  return res
    .status(status)
    .json({ success: false, message: message, data: data });
});
// DB Connection
(async () => {
  try {
    await sequelize.authenticate();
    app.listen(process.env.PORT, () => {
      console.log(`Server is running on port ${process.env.PORT}`);
    });
  } catch (error) {
    console.error("Unable to connect to the database: ", error);
  }
})();
