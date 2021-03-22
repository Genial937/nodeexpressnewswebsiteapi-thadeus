const express = require('express');
const axios = require('axios')

const newsRouter = express.Router();

newsRouter.get('', async (req,res)=>{
    try {
        const newsAPI = await axios.get(`https://raddy.co.uk/wp-json/wp/v2/posts/`);
        res.render('news', {articles: newsAPI.data});
    } catch (error) {
        if(error.response){
            console.log(error.response.data);
            console.log(error.response.status);
            console.log(error.response.headers);
        } else if(error.request){
           console.log(error.request);
        } else {
            console.log('Error: ', error.message);
        }
    }
})

// get single news by id
newsRouter.get('/:id', async (req,res)=>{
    const articleId = req.params.id;
    try {
        const newsAPI = await axios.get(`https://raddy.co.uk/wp-json/wp/v2/posts/${articleId}`);
        res.render('newsSingle', {article: newsAPI.data});
    } catch (error) {
        if(error.response){
            console.log(error.response.data);
            console.log(error.response.status);
            console.log(error.response.headers);
        } else if(error.request){
           console.log(error.request);
        } else {
            console.log('Error: ', error.message);
        }
    }
})

//search news
newsRouter.post('', async (req,res)=>{
    const search = req.body.search;
    try {
        const newsAPI = await axios.get(`https://raddy.co.uk/wp-json/wp/v2/posts?search=${search}`);
        res.render('newsSearch', {articles: newsAPI.data});
    } catch (error) {
        if(error.response){
            console.log(error.response.data);
            console.log(error.response.status);
            console.log(error.response.headers);
        } else if(error.request){
           console.log(error.request);
        } else {
            console.log('Error: ', error.message);
        }
    }
})


module.exports = newsRouter;