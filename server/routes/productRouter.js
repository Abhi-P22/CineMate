const router=require('express').Router()
const proCtrl=require('../controllers/proCtrl')

router.route('/products')
.get(proCtrl.getPros)
.post(proCtrl.createPros)

router.route('/products/:id')
.delete(proCtrl.deletePros)
.put(proCtrl.updatePros)

module.exports=router

