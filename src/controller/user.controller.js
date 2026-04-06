exports.getalluser = (req, res)=>{
    res.send("get all user in home page")
}
// ------------          CRUD OPERATION         ------------------
let posts = [
    { id: 1, name: "Alice", title: "First Post" },
    { id: 2, name: "Bob", title: "Node.js Tips" }
];
exports.getAllPosts = (req, res) => {
    res.json(posts);
};
// CREATE - Add a new post
exports.createPost = (req, res) => {
    console.log("BODY:", req.body);
    res.json({ message: "Working", data: req.body });
};
// exports.createPost = (req, res) => {
//     console.log(req.body); // debug

//     const { name, title } = req.body;

//     if (!name || !title) {
//         return res.status(400).json({ message: "Name and title are required" });
//     }

//     const newPost = {
//         id: posts.length + 1,
//         name,
//         title
//     };

//     posts.push(newPost);
//     res.status(201).json(newPost);
// };
// UPDATE - Edit a post by ID
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

// DELETE - Remove a post by ID
exports.deletePost = (req, res) => {
    const id = parseInt(req.params.id);
    posts = posts.filter(p => p.id !== id);
    res.json({ message: `Post with ID ${id} deleted` });
};