const express =require('express')
const models=require('../models')
const {Sequelize}=require('../models')
const router = express.Router()

let pedido=models.Pedido
let cliente=models.Cliente

//CADASTRO DE PEDIDO CLIENTE
router.post('/cliente/:id/pedido',async(req,res)=>{
    
    const ped={
        data:req.body.data,
        ClienteId:req.params.id
    }

    if(!await cliente.findByPk(req.params.id)){
        return res.status(400).json({
            error:true,
            message:'cliente não existe'
        })
    }

  await pedido.create(ped).then((dados)=>{
      return res.json({
          error:false,
          message:'Pedido cadastrado com sucesso!',
          dados
      })
  }).catch((erro)=>{

    return res.status(400).json({
        error:true,
        message:'O Pedido não foi cadastrado.'
    })
})

})

//CADASTRO PEDIDO
router.post('/pedido/cadastro',async(req,res)=>{
    
    const ped={
        data:req.body.data,
        ClienteId:req.body.ClienteId
    }

    

  await pedido.create(ped).then((dados)=>{
      return res.json({
          error:false,
          message:'Pedido cadastrado com sucesso!',
          dados
      })
  }).catch((erro)=>{

    return res.status(400).json({
        error:true,
        message:'O Pedido não foi cadastrado.'
    })
})

})



//LISTAR PEDIDOS
router.get('/listarpedidos',async(req,res)=>{

    await pedido.findAll({
       order:[['data','ASC']]
    }).then((dados)=>{
       return res.status(200).json({
           error:false,
           dados
       })
   })
 })

 
//LISTAR PEDIDO CLIENTE ID
  router.get('/cliente/:id/pedidos',async(req,res)=>{

    await pedido.findAll({
        where:{ClienteId:req.params.id}
    }).then((ped)=>{
        return res.json({
            error:false,
            ped
        })
    }).catch((erro)=>{
        return res.status(400).json({
            error:false,
            message:'Não foi possível acessar Api.'
        })
    })
  })

  //LISTAR PEDIDO ESPECÍFICO

  router.get('/pedido/:id',async(req,res)=>{

     await pedido.findByPk(req.params.id).then((dados)=>{
         
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

  //ATUALIZAR PEDIDO 

   router.put('/pedido/:id',async(req,res)=>{
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
    
    await pedido.update(ped,{
        where:Sequelize.and({ClienteId:req.body.ClienteId},{id:req.params.id})
    }).then((pedidos)=>{
        return res.json({
            error:false,
            message:'pedido atualizado com sucesso',
            pedidos
        })
    }).catch((erro)=>{
        return res.status(400).json({
            error:true,
            message:'Erro:não foi possível atualizar'
        })
    })
    
  

   })

 //ATUALIZAR PEDIDO CLIENTE
 router.put('/cliente/:id/pedido',async(req,res)=>{
    const ped={
      data:req.body.data,
      ClienteId:req.params.id
    }

    if(!await cliente.findByPk(req.params.id)){
      return res.status(400).json({
          error:true,
          message:'cliente não existe'
      })
  }
  
  await pedido.update(ped,{
      where:Sequelize.and({ClienteId:req.params.id},{id:req.body.id})
  }).then((pedidos)=>{
      return res.json({
          error:false,
          message:'pedido atualizado com sucesso',
          pedidos
      })
  }).catch((erro)=>{
      return res.status(400).json({
          error:true,
          message:'Erro:não foi possível atualizar'
      })
  })
  

})

//EXCLUIR PEDIDO CLIENTE
router.get('/cliente/:id/excluirpedido',async(req,res)=>{

    if(!await cliente.findByPk(req.params.id)){
        return res.status(400).json({
            error:true,
            message:'Pedido não existe.'
        })
    }

    await pedido.destroy({
        where:Sequelize.and({ClienteId:req.params.id},{id:req.body.id})
    }).then(()=>{
        return res.json({
            error:false,
            message:'Pedido foi excluido com sucesso !'
        })
    }).catch((erro)=>{
        return res.status(400).json({
            error:true,
            message:'Não foi possível excluir o pedido.'
        })
    })
})

//EXCLUIR PEDIDO ID

  router.delete('/excluir/pedido/:id',async(req,res)=>{
/*
    if(!await cliente.findByPk(req.body.ClienteId)){
        return res.status(400).json({
            error:true,
            message:'Cliente não existe.'
        })
    }
    */

    await pedido.destroy({
        where:{id:req.params.id}
    }).then(()=>{

      return  res.json({
            erro:false,
            message:'Pedido excluído com sucesso.'
        })
    }).catch(()=>{

         return res.status(400).json({
             error:true,
             message:'Não foi possível acessar a Api.'
         })
    })

      
  })
module.exports=router