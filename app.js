import express from "express";
import morgan from "morgan";
import cors from "cors";
import path from "path";

const app = express();

// Conexión a base de datos
const mongoose = require("mongoose");

// const uri = "mongodb://localhost:27017/utp_grupo32";
const uri = "mongodb+srv://ingluise:Luised148@cluster0.1omyz.mongodb.net/utp_grupo32?retryWrites=true&w=majority";
const options = { useNewUrlParser: true, UseUnifiedTopology: true };
mongoose.connect(uri, options).then(() => {
  console.log("Conectado a DB"),
    (err) => {
      console.log(err);
    };
});

// Middleware
app.use(morgan("tiny"));
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Rutas
// app.get("/", function (req, res) {
//   res.send("Hola mundo");
// });

app.use('https://ciclo3-notas-new.herokuapp.com/api', require('./routes/nota'));

// Middleware para vue.js router modo history
const history = require("connect-history-api-fallback");
app.use(history());
app.use(express.static(path.join(__dirname, "public")));

// Puerto
// app.listen(3000, function () {
//   console.log("¡Servidor escuchando por el puerto 3000!")
// })

app.set("puerto", process.env.PORT || 3000);
app.listen(app.get("puerto"), function () {
  console.log("¡Servidor escuchando por el puerto " + app.get("puerto") + "!");
});
