/*
    Node.js controller for the API. 
    Each action is a function that takes two parameters: req and res. The req parameter represents the incoming request, and the res parameter represents the response that will be sent back to the client.
    Inside each action, the code uses the res parameter to send a response to the client. The response can be a JSON object, a string, or an HTTP status code.    
*/
const validator = require('validator');
const Article = require('../models/articles');
const { error } = require('console');


const test = (req, res) => {
    return res.status(200).json({ message: "Im a test action in my articles controller" })
}

const hello_world = (req, res) => {
    return res.status(200).send(
        "<h1>Hello World</h1>"
    );
    ;
}

const course = (req, res) => {
    return res.status(200).send(
        {
            message: 'Hello World',
            autor: "jorge garcia"
        }
    );
}


const create = (req, res) => {
    //Get parameters from the request (POST)
    let parameters = req.body;

    //Validate Values
    try {
        let validate_title = !validator.isEmpty(parameters.title) &&
            validator.isLength(parameters.title, { min: 3, max: 30 });
        let validate_content = !validator.isEmpty(parameters.content);
        console.log(validate_title, validate_content);
        if (!validate_title || !validate_content) {
            throw new Error("Info not validated");
        }
    } catch {
        return res.status(400).json({ status: "error", message: "Parameters not validated" });
    }

    //Create a new article
    const article = new Article(parameters); //Automatically generates the article from models/articles.js
    article.save()
        .then((savedArticle) => {
            // Article saved successfully
            return res.status(200).json({
                status: "success",
                article: savedArticle,
            });
        })
        .catch((error) => {
            // Error saving the article
            return res.status(400).json({
                status: "error",
                message: "Article not saved",
            });
        });

}


const listArticles = async (req, res) => {
    try {
        const query = await Article.find({})
            .skip(0) // Skip the first 0 documents
            .limit(2) // Limit the results to 2 documents
            .sort({ title: 1 }); // Sort the results by title in ascending order
        return res.status(200).json({
            status: "success",
            articles: query,
        });
    } catch (error) {
        return res.status(400).json({
            status: "error",
            message: "Articles not found",
        });
    }
}


const findArticle = async (req, res) => {
    try {
        const query = await Article.findById(req.params._id)
        return res.status(200).json(
            {
                status: "success",
                article: query,
            })

    } catch (error) {
        return res.status(400).json({
            status: "error",
            message: "Article not found",
        })
    }
}


const deleteArticle = async (req, res) => {
    let id = req.params.id;
    try {
        const article = await Article.findOneAndDelete({ _id: id });
        if (!article) {
            return res.status(404).json({
                status: "error",
                message: "Article not found",
            });
        }
        return res.status(200).json({
            status: "success",
            message: "Article deleted",
            deletedArticle: article
        });
    } catch (error) {
        return res.status(500).json({
            status: "error",
            message: "Something went wrong, Article not deleted",
            error: error.message
        });
    }
}


const editArticle = async (req, res) => {
    let id = req.params.id;
    let parameters = req.body;
    //Validate Values
    try {
        let validate_title = !validator.isEmpty(parameters.title) &&
            validator.isLength(parameters.title, { min: 3, max: 30 });
        let validate_content = !validator.isEmpty(parameters.content);
        console.log(validate_title, validate_content);
        if (!validate_title || !validate_content) {
            throw new Error("Info not validated");
        }
    } catch (error) {
        return res.status(400).json({ status: "error", message: "Parameters not validated" });
    }

    try {
        const updatedArticle = await Article.findOneAndUpdate({ _id: id }, parameters, { new: true });
        if (!updatedArticle) {
            return res.status(404).json({ status: "error", message: "Article not found" });
        }
        return res.status(200).json({ status: "success", message: "Article updated", updatedArticle });
    } catch (error) {
        console.error(error);
        res.status(500).json({ status: "error", message: "Article not updated" });
    }
}

const uploadImg = async (req, res) => {
    try {
        if (!req.file) {
            return res.status(400).json({ status: "error", message: "No file uploaded" });
        }
        console.log(req.file)
        return res.status(200).json({ status: "success", message: "Image uploaded" });
    } catch (error) {
        return res.status(500).json({ status: "error", message: "Image not uploaded" });

    }
}


const searcher = async (req, res) => {
    console.log("search params?",req.params)
    let search = req.params.searchTerm;
    console.log("search: ", search)

    try{
        
        const query = await Article.find({
            $or: [
                { title: { $regex: search, $options: 'i' } },
                { content: { $regex: search, $options: 'i' } }
            ]

        }) 
        console.log("LLEGA")
        return res.status(200).json({
            status: "success",
            articles: query,
        });
        
    }catch(error){
        return res.status(500).json({ status: "error", message: "Something went wrong" });
    }
}


module.exports = {
    test,
    hello_world,
    course,
    create,
    listArticles,
    findArticle,
    deleteArticle,
    editArticle,
    //uploadImg,
    searcher
}
