const express = require("express");
const compression = require("compression");
const morgan = require("morgan");
const cors = require("cors");
const baseRouter = require("./router");
const initializeENV = require("./envloader").initializeENV;
initializeENV();

const initializeDB = require("./knex").initializeDB;
initializeDB();

const app = express();
const PORT = process.env.PORT || 3000;

app.use(cors());
app.use(express.json());
app.use(
  morgan(
    'REQUEST :response-time ms [:date[clf]] ":method :url HTTP/:http-version" :status :user-agent',
    {
      immediate: true,
      skip: (req) => {
        return req.path === "/api/";
      },
    }
  )
);
app.use(
  express.urlencoded({ extended: true, limit: "2mb", parameterLimit: 1e5 })
);

app.use(compression());

app.use("/api/", baseRouter);

app.get("/", (req, res) => {
  return res.status(200).send("Server is running");
});
app.listen(PORT, () => {
  console.log("Server is running at port: ", PORT);
});