
const BalaceModel = require("./../models/BalanceModel")
const balanceModel = new (BalaceModel)

class BalanceService{

  async envialService(req,res){
   const teste = (await balanceModel.balanceGet(req)).rows
        if (teste) {
            res.status(200).json({mensagem: "mensagem"})
        }
        else{


        }
    }


}
module.exports = BalanceService;