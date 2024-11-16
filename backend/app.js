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

const corsOptions = {
    origin: ['https://steady-strudel-2febde.netlify.app', 'http://localhost:3000'],  // Allow both Netlify and localhost
    methods: 'GET, POST, PUT, DELETE',  // Allow these methods for CORS requests
    credentials: true  // If you need to send cookies or credentials
  };
  
app.use(cors(corsOptions));

app.use(express.json());

app.use("/api/v1",user);
app.use("/api/v1",book);
app.use("/api/v1",favourite);
app.use("/api/v1",cart);
app.use("/api/v1",order);

app.listen(process.env.PORT, () => {
    console.log(`server started ${process.env.PORT}`);
})