const express=require('express')
const models=require('../models')
const {Sequelize}=require('../models')

const router=express.Router()

let itempedido=models.ItemPedido
let pedido=models.Pedido



//CADASTRAR ITEMPEDIDO

router.post('/itempedido/cadastro',async(req,res)=>{

     await itempedido.create(req.body).then((dados)=>{

        return res.json({
            error:false,
            dados
        })
     }).catch((erro)=>{

        return res.status(400).json({
            error:true,
            message:'Nao foi possível acessar Api.'
        })
     })
})


//CADASTRAR ITEMPEDIDO ATRAVÉS DE PEDIDO
router.post('/pedido/:id/itempedido',async(req,res)=>{
     
       
    if(!await pedido.findByPk(req.params.id)){
        return res.status(400).json({
            error:true,
            message:'Pedido não existe'
        })
    }
     
    await itempedido.create(
        req.body
    ).then(()=>{
        return res.status(200).json({
            error:false,
            message:'Item criado com sucesso !'
        })
    }).catch((erro)=>{
        return res.status(400).json({
            error:true,
            message:'O Item não foi criado.'
        })
    })

   })

   //LISTAR ITEMPEDIDO
   router.get('/listar',async(req,res)=>{
                    

    await itempedido.findAll({
        order:[['PedidoId','ASC']]
    }).then((dados)=>{
       return res.json({
           error:false,
           dados
           
       })
   }).catch((erro)=>{
       
    return res.status(400).json({
        error:true,
        message:'Não foi possível acessar Api.'
    })
   })

})

//LISTAR ITEMPEDIDO POR PEDIDOID

router.get('/itempedido/:id',async(req,res)=>{

    await itempedido.findAll({
        where:{PedidoId:req.params.id}
    }).then((dados)=>{

        return res.json({
            error:false,
            dados
        })
    }).catch((erro)=>{

        return res.status(400).json({
            error:true,
            message:'Não foi possível acessar Api'
        })
    })
})

//LISTAR ITEMPEDIDO POR SERVICOID

router.get('/servicoid/:id',async(req,res)=>{

    await itempedido.findAll({
        where:{ServicoId:req.params.id}
    }).then((dados)=>{

        return res.json({
            error:false,
            dados
        })
    }).catch((erro)=>{

        return res.status(400).json({
            error:true,
            message:'Não foi possivel acessar Api.'
        })
    })

    })

// ATUALIZAR ITEMPEDIDO ESPECÍFICO
router.put('/atualizar/:id',async(req,res)=>{
     
    const ped={
       quantidade:req.body.quantidade,
       valor:req.body.valor,
       PedidoId:req.body.PedidoId,
       ServicoId:req.params.id

    }

    await itempedido.update(ped,{
        where:Sequelize.and({ServicoId:req.params.id},{PedidoId:req.body.PedidoId})
    }).then((dados)=>{

        return res.json({
            error:false,
            dados
        })
    }).catch((erro)=>{

        return res.status(400).json({
            error:true,
            message:'Não foi possivel acessar Api.'
        })
    })
})

//ATUALIZAR ITEMPEDIDO PELO PEDIDO
router.put('/pedido/:id/atualizaritem',async(req,res)=>{

    const item={
        quantidade:req.body.quantidade,
        valor:req.body.valor
    }
    
    if(!await pedido.findByPk(req.params.id)){

         return res.status(400).json({
             error:true,
             message:'Pedido não foi encontrado'
         })
    }

    await itempedido.update(item,{
        where:Sequelize.and({PedidoId:req.params.id},{ServicoId:req.body.ServicoId})
    }).then((dados)=>{
        return res.json({
            error:false,
            message:'Item alterado com sucesso !',
            dados
        })
    }).catch((erro)=>{
        return res.status(400).json({
            error:true,
            message:'Item não foi alterado.'
        })
    })

})

//EXCLUIR ITEMPEDIDO
router.delete('/pedido/:id/excluiritem',async(req,res)=>{

    if(!await pedido.findByPk(req.params.id)){

        return res.status(400).json({
            error:true,
            message:'Pedido não foi encontrado'
        })
   }


 
    await itempedido.destroy({
        where:Sequelize.and({PedidoId:req.params.id},{ServicoId:req.body.ServicoId})
    }).then(()=>{
        return res.json({
            error:false,
            message:'Item foi excluído com sucesso !'
        })
    }).catch((erro)=>{
        return res.status(400).json({
            error:true,
            message:'Não foi possivel excluir item.'
        })
    })

})

// EXCLUIR ITEMPEDIDO ESPECIFICO

router.delete('/excluir/:id',async(req,res)=>{

    await itempedido.destroy({
        where:{ServicoId:req.params.id}
    }).then(()=>{

        return res.json({
            error:false,
            message:'ItemPedido excluído com sucesso.'
        })
    }).catch((erro)=>{

        res.status(400).json({
            error:true,
            message:'Não foi possível acessar Api.'
        })
    })
})

module.exports=router