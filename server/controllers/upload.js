const express = require('express');
const router = express.Router();
const cloudinary = require("../utlis/cloudinary");
const upload = require("../middlewares/multer");

 router.post('/upload', upload.single('image'), function (req, res) {
  cloudinary.uploader.upload(req.file.path, function (err, result){
    if(err) {
      console.log(err);
      return res.status(500).json({
        success: false,
        message: "Error"
      })
    }

    res.status(200).json({
      // success: true,
      // message:"Uploaded!",
      public_id: result.public_id,
      url:result.url
    })
  })
});

module.exports = router;