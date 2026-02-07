const express = require("express");
const app = express();
const cors = require("cors");
const morgan = require("morgan");
const cookieParser = require("cookie-parser");
const { query, validationResult } = require("express-validator");

const { databaseInitialization } = require("./config/db.connect");
const corsOption = { origin: "http://localhost:3000", credentials: true };
databaseInitialization();

// MIDDLEWARE
app.use(express.json());
app.use(cors(corsOption));
app.use(morgan("tiny"));
app.use(cookieParser());

// APP ROUTES
app.use("/auth", require("./routes/signup"));

// ERROR HANDLER
app.use((err, _req, res, next) => {
  const status = err.statusCode || 500;
  const message = err.message || "Internal Server Error";
  return res.status(status).json({ success: false, message, stack: err.stack });
});

app.get("/practice", query("person").notEmpty().escape(), (req, res) => {
  const result = validationResult(req);
  // console.log(result);

  if (result.isEmpty()) {
    return res.send(`Hello, ${req.query.person}`);
  }
  // res.send(`Hello ${req.query.person}`);
  res.send({ errors: result.array() });
});

const PORT = 8000;
app.listen(PORT, () => {
  console.log(`The server is running at http://localhost:${PORT}`);
});
