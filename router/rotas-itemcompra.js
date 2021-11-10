const express=require('express')
const models=require('../models')
const {Sequelize}=require('../models')

const router=express.Router()

let compra=models.Compra
let itemcompra=models.ItemCompra

// CADASTRO ITEMCOMPRA


router.post('/itemcompra/cadastro',async(req,res)=>{

    await itemcompra.create(req.body).then((dados)=>{

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

//CADASTRO ITEMCOMPRA 2
router.post('/compra/:id/itemcompra',async(req,res)=>{

    if(!await compra.findByPk(req.params.id)){
        return res.status(400).json({
            error:true,
            message:'Compra não existe.'
        })
    } 
    
    await itemcompra.create(
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

//LISTAR ITEMCOMPRA
router.get('/listar/compra',async(req,res)=>{
                    

    await itemcompra.findAll({
        order:[['CompraId','ASC']]
    }).then((dados)=>{
       return res.json({
           error:false,
           dados
       })
   })

})

//LISTAR ITEMCOMPRA COMPRAID 

router.get('/itemcompra/:id',async(req,res)=>{

    await itemcompra.findAll({
        where:{CompraId:req.params.id}
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

//LISTAR ITEMCOMPRA PRODUTOID 

router.get('/listaritemcompra/:id',async(req,res)=>{

    await itemcompra.findAll({
        where:{ProdutoId:req.params.id}
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

//ATUALIZAR ITEMCOMPRA
router.put('/compra/:id/atualizaritemcompra',async(req,res)=>{

    const item={
        quantidade:req.body.quantidade,
        valor:req.body.valor,
        CompraId:req.body.CompraId
    }
    
    if(!await compra.findByPk(req.params.id)){

         return res.status(400).json({
             error:true,
             message:'Compra não foi encontrada'
         })
    }

    await itemcompra.update(item,{
        where:Sequelize.and({ProdutoId:req.params.id},{CompraId:req.body.CompraId})
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

//EXCLUIR ITEMCOMPRA
router.get('/compra/:id/excluiritemcompra',async(req,res)=>{

    if(!await compra.findByPk(req.params.id)){

        return res.status(400).json({
            error:true,
            message:'Compra não foi encontrado'
        })
   }


 
    await itemcompra.destroy({
        where:Sequelize.and({CompraId:req.params.id},{ProdutoId:req.body.ProdutoId})
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

//EXCLUIR ITEMCOMPRA ESPECIFICO
router.delete('/excluircompra/:id',async(req,res)=>{

    await itemcompra.destroy({
        where:{ProdutoId:req.params.id}
    }).then(()=>{

        return res.json({
            error:false,
            message:'ItemCompra excluído com sucesso.'
        })
    }).catch((erro)=>{

        res.status(400).json({
            error:true,
            message:'Não foi possível acessar Api.'
        })
    })
})

module.exports=router