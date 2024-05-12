const {Router} = require("express");
const multer = require("multer")
const router = Router();


//Calls controllers/article.js
const ArticleController = require("../controllers/article");

const storage = multer.diskStorage({
    destination:  (req, file, cb)   =>{
        cb(null,'./images/articles')
    },
    filename: (req, file, cb) =>{
        cb(null,"article" + Date.now() + file.originalname)
    }

})
const uploads = multer({storage:storage})


//Test Routes
router.get("/test-route",ArticleController.test)
router.get("/hello_world",ArticleController.hello_world)
router.get("/course",ArticleController.course)

//Useful Routes
router.post("/create",ArticleController.create)
router.get("/list_articles",ArticleController.listArticles)
router.get("/article/:id",ArticleController.findArticle)
router.delete("/article/:id",ArticleController.deleteArticle)
router.put("/article/:id",ArticleController.editArticle)
//router.post("/upload-img/:id",[uploads.single("file0")],ArticleController.uploadImage)
router.get("/searcher/:searchTerm",ArticleController.searcher)
 
module.exports={
    router
}