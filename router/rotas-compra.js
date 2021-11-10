const express=require('express')
const models=require('../models')
const {Sequelize}=require('../models')
const router=express.Router()

let compra=models.Compra
let cliente=models.Cliente

// CADASTRO COMPRA 

router.post('/compra/cadastro',async(req,res)=>{

    await compra.create(req.body).then((dados)=>{

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
// CADASTRO DE COMPRA CLIENTE
router.post('/cliente/:id/compra',async(req,res)=>{
    
    const cp={
        data:req.body.data,
        ClienteId:req.params.id
    }

    if(!await cliente.findByPk(req.params.id)){
        return res.status(400).json({
            error:true,
            message:'cliente não existe'
        })
    }

  await compra.create(cp).then((dados)=>{
      return res.status(200).json({
          error:false,
          message:'Compra efeituada com sucesso!',
          dados
      })
  }).catch((erro)=>{

    return res.status(400).json({
        error:true,
        message:'Não foi possível fazer sua compra.'
    })
})

})

// LISTAR COMPRA ID
router.get('/compra/:id',async(req,res)=>{

    await compra.findByPk(req.params.id).then((dados)=>{
        
       return res.json({
           error:false,
           dados
       })     
            

    }).catch(()=>{

        return res.status(400).json({
            error:true,
            message:'Não foi possível acessar Api.'
        })
    })
 })


//LISTAR COMPRAS
router.get('/listarcompras',async(req,res)=>{

    await compra.findAll({
       order:[['data','ASC']]
    }).then((dados)=>{
       return res.status(200).json({
           error:false,
           dados
       })
   })
 })

 //ATUALIZAR COMPRAS
 router.put('/cliente/:id/atualizarcompra',async(req,res)=>{
    const cp={
       data:req.body.data,
       ClienteId:req.params.id
    }
    
    if(!await compra.findByPk(req.params.id)){
        return res.status(400).json({
            error:true,
            message:'Compra não encotrada.'
        })
        
    }
      await compra.update(cp,{
          where:Sequelize.and({ClienteId:req.params.id},{id:req.body.id})
      }).then(()=>{
          return res.json({
              error:false,
              message:'Compra atualizada com sucesso !'
          })
      }).catch((erro)=>{
          return res.status(400).json({
              error:true,
              message:'Não foi possível atualizar compra'
          })
      })
   
   })

   //ATUALIZAR COMPRA ESPECIFICA

   router.put('/compra/:id',async(req,res)=>{
    const ped={
        data:req.body.data,
        ClienteId:req.body.ClienteId,
        id:req.params.id
      }
  
      if(!await cliente.findByPk(req.body.ClienteId)){
        return res.status(400).json({
            error:true,
            message:'cliente não existe'
        })
    }
    
    await compra.update(ped,{
        where:Sequelize.and({ClienteId:req.body.ClienteId},{id:req.params.id})
    }).then((dados)=>{
        return res.json({
            error:false,
            message:'compra atualizada com sucesso',
            dados   
        })
    }).catch((erro)=>{
        return res.status(400).json({
            error:true,
            message:'Erro:não foi possível atualizar'
        })
    })
    
  

   })


   //EXCLUIR COMPRAS
   router.get('/cliente/:id/excluircompra',async(req,res)=>{

    if(!await cliente.findByPk(req.params.id)){
        return res.status(400).json({
            error:true,
            message:'Cliente não existe.'
        })
    }

    await compra.destroy({
        where:Sequelize.and({ClienteId:req.params.id},{id:req.body.id})
    }).then(()=>{
        return res.json({
            error:false,
            message:'Compra foi excluida com sucesso !'
        })
    }).catch((erro)=>{
        return res.status(400).json({
            error:true,
            message:'Não foi possível excluir sua compra.'
        })
    })

})

module.exports=router
