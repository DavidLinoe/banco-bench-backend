const app = require('./src/app');

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log(`Server listening on port ${PORT}`);
});
app.get('/rota', (req,res) => { // teste de rota no postman
res.json({msg: "Hello World"})
}); 