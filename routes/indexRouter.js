const {Router} = require ('express');
const router = Router();
const Item = require ('../models/item');

router.get('/', async(req,res)=>{
    let allItems = await Item.find({}).sort({date: 'desc'});
    let allItemsArray = allItems.map((item)=>
    item.toObject());

       res.render('index', {allItemsArray});
})

router.post('/', async(req,res)=>{
    let newItem = await(req.body.item);
    
    const item = new Item ({
        item: newItem
    })

    await item.save();
    res.redirect('/');

})


router.post('/delete', async(req,res)=>{
    let objectID = req.body.delete;
    console.log(objectID);
    let deleteItem = await Item.findByIdAndDelete({_id: objectID});
    res.redirect('/');
})

router.post('/completeToggle', async(req,res)=>{
    let objectID = req.body.checkbox;
    // console.log(objectID);
    let getStatus = await Item.findById({_id: objectID});
    // console.log(getStatus)
    if(getStatus.completed == false) {
        let updateItem = await Item.findByIdAndUpdate({_id: objectID}, {completed: true}, {function(err){
            console.log("error")
        }});
    } else {
        let updateItem = await Item.findByIdAndUpdate({_id: objectID}, {completed: false}, {function(err){
            console.log("error")
        }});   
    }
    res.redirect('/');
})

router.post('/color', async(req,res)=>{
    let objectID = req.body.objectID;
    console.log(objectID);
    let getColorCode = req.body.colorCode;
    console.log(getColorCode);
    let setColorCode = await Item.findByIdAndUpdate({_id: objectID}, {colorCode: getColorCode}, {function(err){
        console.log("error")
    }});

    res.redirect('/');
})

router.post('/edit', async(req,res)=>{
    let newInput = req.body.editContent;
    let objectID = req.body.editBtn;
    
    let updateInput = await Item.findByIdAndUpdate({_id: objectID},{item: newInput},{function(err){
        console.log(err);
    }})
    res.redirect('/');
})
module.exports = router;