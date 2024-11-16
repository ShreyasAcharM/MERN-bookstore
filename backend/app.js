const express = require("express");
const app = express();
require("dotenv").config();
require("./conn/conn");
const cors = require("cors");
const user = require("./routes/user");
const book = require("./routes/book");
const favourite = require("./routes/favourite")
const cart = require("./routes/cart")
const order = require("./routes/order")

app.use(cors());
app.use(express.json());

app.use("/api/v1",user);
app.use("/api/v1",book);
app.use("/api/v1",favourite);
app.use("/api/v1",cart);
app.use("/api/v1",order);

app.listen(process.env.PORT, () => {
    console.log(`server started ${process.env.PORT}`);
})