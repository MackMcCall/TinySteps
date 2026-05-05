//server.js
"use strict";
const express = require("express");
const app = express();
const path = require("path");

const multer = require("multer");
app.use(multer().none());
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.static("public"));

require("dotenv").config();

app.set("trust proxy", 1);

const session = require("express-session");
const passport = require("passport");
require("./auth/passport");
app.use(
    session({
        secret: process.env.SESSION_SECRET || "your_secret_key",
        resave: false,
        saveUninitialized: false,
        cookie: {
            secure: true,
            sameSite: "none",
        },
    }),
);
app.use(passport.initialize());
app.use(passport.session());

const cors = require("cors");
app.use(
    cors({
        origin: process.env.CLIENT_BASE_URL,
        methods: "GET,POST,PUT,DELETE",
        credentials: true,
    }),
);

const milestoneRoutes = require("./routes/milestoneRoutes");
const userRoutes = require("./routes/userRoutes");
const newsRoutes = require("./routes/newsRoutes");

app.use("/milestones", milestoneRoutes);
app.use("/users", userRoutes);
app.use("/news", newsRoutes);
app.use("/auth", require("./auth/authRoute"));

app.use(express.static(path.join(__dirname, "../react-frontend-client/dist")));

app.get("/{*splat}", (req, res) => {
    res.sendFile(
        path.join(__dirname, "../react-frontend-client/dist/index.html"),
    );
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, function () {
    console.log("Server listening on port: " + PORT + "!");
});
