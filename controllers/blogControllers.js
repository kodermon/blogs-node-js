// blog_index, blog_create_get, blog_create_post, blog_details, blog_delete

const Blog = require('../models/blog');


const blog_index = (req, res) => {
    Blog.find().sort({ createdAt: -1 })
        .then((result) => {
            res.render('blogs/index', { title: 'blogs', blogs: result })
        })
        .catch((err) => console.log(err));
}

const blog_create_get = (req, res) => {
    res.render('blogs/create', { title: 'Create'});
}

const blog_create_post = (req, res) => {
    const blog = new Blog(req.body);

    blog.save()
        .then((result) => {
            res.redirect('/blogs')
        })
        .catch((err) => console.log(err));
}

const blog_details = (req, res) => {
    const id = req.params.id

    Blog.findById(id)
        .then((result) => {
            res.render('blogs/details', { title: 'Blog Details', blog: result})
        })
        .catch((err) => {
            res.status(404).render('404', { title: 'Blog not found'})
        })
}

const blog_delete = (req, res) => {
    const id = req.params.id

    Blog.findByIdAndDelete(id)
        .then((result) => {
            res.json({ redirect: '/blogs' })
        })
        .catch((err) => console.log(err))
}

module.exports = {
    blog_index,
    blog_create_get,
    blog_create_post,
    blog_details,
    blog_delete,
}