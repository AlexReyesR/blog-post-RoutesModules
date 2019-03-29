const express = require('express');
const router = express.Router();
const {ListPosts} = require('./blog-post-model');

router.get('/blog-posts',(req, res, next) => {
	let listWithPosts = ListPosts.get();
    res.status(200).json({
        message: "Successfully sent the list of posts",
        status : 200,
        posts : listWithPosts
    });
    return next();
});

router.get('/blog-posts/:author', (req, res, next) => {
    let received_author = req.params.author;

    if(!received_author)
    {
        res.status(406).json({
            message: "Missing author field",
            status: 406,
        });
        return next();      
    }

    let foundPosts = ListPosts.get_with_author(received_author);

    if(foundPosts.length > 0)
    {
        res.status(200).json({
            message: `Successfully sent the posts with author: ${received_author}`,
            status : 200,
            posts : foundPosts
        });
        return next();
    }
    else
    {
        res.status(404).json({
            message: "Author not found",
            status: 404
        });
        return next();
    }
});

router.post('/blog-posts', (req, res, next) => {
    let received_title = req.body.title;
    let received_content = req.body.content;
    let received_author = req.body.author;
    let received_publishDate = req.body.publishDate;

    if (!received_title | !received_content | !received_author | !received_publishDate)
    {
        res.status(406).json({
            message: "Missing field(s)",
            status: 406,
        });
        return next();
    }
    else
    {
        let date_parts = received_publishDate.split(" ");
        
        let new_post_added = ListPosts.post(received_title, received_content, received_author, date_parts)

        res.status(201).json({
            message: `Successfully added new post with title: ${received_title}`,
            status: 201,
            post: new_post_added
        });        
        return next();   
    }
});

router.delete('/blog-posts/:id*?', (req, res, next) =>{
    let received_id = req.params.id;
    let received_idBody = req.body.id;

    if(!received_id | !received_idBody | received_id != received_idBody)
    {
        res.status(406).json({
            message: "Missing or different ID field(s)",
            status: 406
        });
        return next();
    }
    else
    {
    	let deleted_posts = ListPosts.delete(received_id);

    	if (deleted_posts == 1)
    	{
    		res.status(204).json({
	            status: 204
	        });
	        return next();
        }
        else
        {
	        res.status(404).json({
		        message: "Post not found",
		        status: 404
	        });
	        return next();
        }
    }
});

router.put('/blog-posts/:id*?', (req, res, next) => {
    let received_id = req.params.id;

    if(!received_id)
    {
        res.status(406).json({
            message: "Missing ID field",
            status: 406,
        });
        return next();       
    }
    else
    {
        let received_title = req.body.title;
        let received_content = req.body.content;
        let received_author = req.body.author;
        let received_publishDate = req.body.publishDate;

        if (!received_title && !received_content && !received_author && !received_publishDate)
        {
            res.status(404).json({
                message: "No entered fields on body",
                status: 404,
            });
            return next();
        }
        else
        {
        	let modified_post = ListPosts.put(received_id, received_title, received_content, received_author, received_publishDate);
        	if(modified_post)
        	{
        		res.status(200).json({
	                message: `Successfully modified post with id: ${received_id}`,
	                status: 200,
	                post: modified_post
	            });
	            return next();
        	}

            res.status(404).json({
            message: `Post with ID ${received_id} not found`,
            status: 404
            });
            return next();
        }        
    }
});

module.exports = router;