const uuid = require('uuid');

let postsArray = [
    {
        id: uuid.v4(),
        title: "School anniversary",
        content: "The school celebrated its 50th anniversary this month.",
        author: "Juan Gonzalez",
        publishDate: new Date(2018, 8, 6)
    },
    {
        id: uuid.v4(),
        title: "Mexico wins on gastronomy challenge.",
        content: "Three participant won gold on the challenge.",
        author: "Emilio Becerra",
        publishDate: new Date(2019, 0, 6)
    },
    {
        id: uuid.v4(),
        title: "Welcome to the new blog.",
        content: "This is a new blog. I hope you all enjoy it.",
        author: "Juan Gonzalez",
        publishDate: new Date(2015, 1, 6)
    }
];

const ListPosts = {
    get: function() {
        return postsArray;
    },
    get_with_author : function(author_name) {
        let matching_posts = [];
        postsArray.forEach(item => {
            if(item.author == author_name) {
                matching_posts.push(item);
            }
        });
        return matching_posts;
    },
    post : function(received_title, received_content, received_author, date_parts) {
        let newPost = {
            id: uuid.v4(),
            title: received_title,
            content: received_content,
            author: received_author,
            publishDate: new Date(date_parts[0], date_parts[1] -1, date_parts[2])
        };

        postsArray.push(newPost);
        return newPost;
    },
    delete : function(received_id) {
        let found_posts = 0;
        postsArray.forEach((item, index) => {
            if(item.id == received_id)
            {
                delete postsArray[index];
                found_posts += 1;
            }    
        });

        return found_posts;
    },
    put : function(received_id, received_title, received_content, received_author, received_publishDate) {
        let modified_post;

        postsArray.forEach(item => {
            if(item.id == received_id)
            {
                if(received_title)
                    item.title = received_title;

                if(received_content)
                    item.content = received_content;

                if(received_author)
                    item.author = received_author;

                if(received_publishDate)
                {
                    let date_parts = received_publishDate.split(" ");
                    item.publishDate = new Date(date_parts[0], date_parts[1] -1, date_parts[2]);
                }
                modified_post = item;                     
            }
        });
        return modified_post;
    }
}
module.exports = {ListPosts};