const express = require("express");
const BancoBench = require("./conection/db");
const app = express();
const port = 3000;
var bodyParser = require("body-parser");
var cors = require("cors");

app.use(cors());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.post("/teste", async (req, res) => {
  console.log(req.body);
  const bancoBench = new BancoBench();
  const [login] = await bancoBench.listarLogin(req.body.dados);
console.log(login)
if(login){

const validation = {validation:true}

res.json({...login,...validation});

}

else{

   const validation = {validation:false}
   res.json({...login,...validation});

}


});

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
