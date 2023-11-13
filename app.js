// Import required modules
const express = require("express");
const connect = require("./db");
const LicenseModel = require("./_models/license.model");
const UserModel = require("./_models/user.model");

// to connect mongo db
connect();

// Create an instance of the Express application
const app = express();

app.use(express.static("public"));

app.use(express.json());
app.use(express.urlencoded());

app.set("view engine", "ejs");
app.use(express.static(__dirname + "/public"));

// Define the route handlers
app.get("/", (req, res) => {
  res.render("home");
});
app.get("/g", (req, res) => {
  res.render("gLicense");
});
app.get("/g2", (req, res) => {
  res.render("g2License");
});
app.get("/dashboard", (req, res) => {
  res.render("dashboard");
});
app.get("/login", (req, res) => {
  res.render("login");
});
app.get("/signup", (req, res) => {
  res.render("signup");
});

// api endpoints
app.post("/api/userRegister", async (req, res) => {
  try {
    if (req.body.password === req.body.confirmPassword) {
      await UserModel.create(req.body);
      res.redirect("/dashboard");
    } else {
      res.status(500).send("Password and confirm password not match!");
    }
  } catch (error) {
    console.log("error", error);
    res.status(500).send(error);
  }
});
app.post("/api/g2_test", async (req, res) => {
  // api to create new API
  try {
    await LicenseModel.create(req.body);
    res.redirect("/dashboard");
  } catch (error) {
    res.status(500).send(error);
  }
});
// to search record by license
app.post("/api/searchLicense", async (req, res) => {
  try {
    let data = await LicenseModel.findOne({ licenseNo: req.body.licenseNo });
    if (!data) {
      res.render("g2License");
    }
    res.render("updateG2", { data });
  } catch (error) {
    res.render("g2License");
  }
});
// to update records
app.post("/api/updateLicense", async (req, res) => {
  const carDetails = req.body.carDetails;
  try {
    const data = await LicenseModel.findOneAndUpdate(
      { licenseNo: req.body.licenseNo },
      { carDetails },
      { new: true }
    );
    res.render("updateG2", { data });
  } catch (error) {
    res.send(error);
  }
});

// Start the server
const port = 3000; // You can change the port number if needed
app.listen(port, () => {
  console.log(`Server is listening on port ${port}`);
});
