const CompletedDetail = require('../model/completed')

exports.getAllDetails = ((req,res,next)=>{
    CompletedDetail.findAll().then(completed=>{
        res.json({completed})
    }).catch(err=>console.log(err))
})
exports.postDetails = ((req,res,next)=>{
    const jsonData = req.body
    CompletedDetail.create({todo:jsonData.todo,description:jsonData.description})
    .then(r=>res.json({r}))
    .catch(err=>console.log(err))
})