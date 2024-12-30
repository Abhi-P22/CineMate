const router=require('express').Router()
const catCtrl=require('../controllers/catCtrl')
const auth=require('../middlewares/auth')
const authAdmin=require('../middlewares/authAdmin')

router.route('/category')
.get(catCtrl.getCat)
.post(auth,authAdmin,catCtrl.createCat)

router.route('/category/:id')
.delete(auth,authAdmin,catCtrl.delCat)
.put(auth,authAdmin,catCtrl.updateCat)
module.exports=router