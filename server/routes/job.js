const express = require("express");
const app = express.Router();
const {
  obtainedJobs,
  postedJobs,
  findJobDetails,
  deleteJobs,
} = require("../controller/jobController");

app.get("/job", obtainedJobs);
app.post("/job", postedJobs);
app.get("/job/:id", findJobDetails);
app.delete("/job/:id", deleteJobs);

module.exports = app;
