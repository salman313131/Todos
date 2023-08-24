const TodoDetail = require('../model/todo')
exports.getAllDetails=((req,res,next)=>{
    TodoDetail.findAll()
    .then(todos=>{
        res.json({todos})
    }).catch(err=>console.log(err))
})
exports.getDetail = ((req,res,next)=>{
    const userId = req.params.userId
    TodoDetail.findByPk(userId).then(response=>{
        res.json({response})
    }).catch(err=>console.log(err))
})
exports.postDetails = ((req,res,next)=>{
    const jsonData = req.body
    TodoDetail.create({todo:jsonData.todo,description:jsonData.description})
    .then(r=>res.json({r}))
    .catch(err=>console.log(err))
})
exports.deleteUser = ((req,res,next)=>{
    const userId = req.params.userId
    TodoDetail.destroy({where:{id:userId}})
    .then(response=>{
        res.json({response})
    }).catch(err=>console.log(err))
})