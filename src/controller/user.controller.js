const Book = require("../model/book.model"); // Change it to 'Book' (Capital 'B')

exports.getalluser = (req, res) => {
    res.send("get all user in home page")
}

exports.getAllPosts = (req, res) => {
    res.json(posts);
};



exports.createPost = async (req, res) => {
    try {
        const { name, title } = req.body;

        if (!name || !title) {
            return res.status(400).json({ message: "Name and Title are required" });
        }

        // Now 'Book' matches the constant name above
        const newBook = new Book({ name, title });

        const savedBook = await newBook.save();
        res.status(201).json({
            message: "Book saved successfully",
            data: savedBook
        });
    } catch (error) {
        res.status(500).json({
            message: "Error saving to database",
            error: error.message
        });
    }
};



exports.updatePost = (req, res) => {
    const id = parseInt(req.params.id);
    const post = posts.find(p => p.id === id);

    if (post) {
        post.name = req.body.name || post.name;
        post.title = req.body.title || post.title;
        res.json({ message: "Post updated", post });
    } else {
        res.status(404).json({ message: "Post not found" });
    }
};


exports.deletePost = (req, res) => {
    const id = parseInt(req.params.id);
    const posts = posts.filter(p => p.id !== id);
    res.json({ message: `Post with ID ${id} deleted` });
};