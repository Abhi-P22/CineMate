const router=require('express').Router()
const proCtrl=require('../controllers/proCtrl')

router.route('/products')
.get(proCtrl.getPros)
.post(proCtrl.createPros)


router.route('/products/:id')
.delete(proCtrl.deletePros)
.put(proCtrl.updatePros)

router.post('/chatbot', proCtrl.chatBot);


module.exports=router

