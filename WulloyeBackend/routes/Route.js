const express = require("express");
const {
  addPost,
  getPost,
  getDetailPost,
  register,
  login,
} = require("../controller/WulloyeController");

const route = express.Router();

// all routes here
route.post("/register", register);
route.post("/login", login);
route.post("/shareWulloyen", addPost);
route.get("/getWullos", getPost);
route.get("/getWullos/:id", getDetailPost);

module.exports = route;
