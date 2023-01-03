const express =  require('express');
const app = express();
const PORT = 3000;
const cors = require ('cors');
const { getAllPosts, createPost } = require('./services/posts');

//middleware 
app.use(express.json()) 
//middleware para archivos estáticos
app.use(express.static("public")); 
app.use(cors());

app.get("/", (req, res) => {
  try {
    res.sendFile();
  } catch (error) {
    res.json({ message: "error, faltan datos" });
  }
});

app.get("/posts", async (req, res) => {
  try {
    const getPosts = await getAllPosts();
    res.json(getPosts);
  } catch (error) {
    console.log(error);
  }
});

app.post("/posts", async (req, res) => {
  try {
    const { titulo, url, descripcion } = req.body;
    await createPost(titulo, url, descripcion);
    res.send("Post creado");
  } catch (error) {
    console.log(error);
  }
});

app.listen(PORT, () => {
  console.log(`Estoy escuchando el puerto ${PORT}`);
});