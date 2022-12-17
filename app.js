const express = require('express');
const morgan = require('morgan');
const mongoose = require('mongoose');
const { result } = require('lodash');
const blogRoutes = require('./routes/blogRoutes');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 3000;

// register/set view engine
app.set('view engine', 'ejs')

// connect to MongoDB
mongoose.connect(process.env.MONGO_URI)
    .then((result) => app.listen(PORT))
    .catch((err) => console.log(err))


// Middle example(in proper)
// app.use((req, res, next) => {
//     console.log('request made');
//     console.log('Hostname:', req.hostname);
//     console.log('path:', req.path);
//     console.log('method: ', req.method);
//     next();
// })

// app.use((req, res, next) => {
//     console.log('next middleware');
//     next();
// })

// 3rd Party Middleware (morgan)
//app.use(morgan('dev'))

// middleware(express) and static files
app.use(express.static('public'));
app.use(express.urlencoded({ extended: true }))

// mongoose and mongo route
// app.get('/add-blog', (req, res) => {
//     const blog = new Blog({
//         title: 'new blog 2',
//         snippet: 'about new blog',
//         body: 'more about the new blog'
//     })

//     blog.save()
//         .then((result) => {
//             res.send(result)
//         })
//         .catch((err) => console.log(err));
// })

// app.get('/all-blogs', (req, res) => {
//     Blog.find()
//         .then((result) => {
//             res.send(result)
//         })
//         .catch((err) => console.log(err));
// })

// app.get('/single-blog', (req, res) => {
//     Blog.findById('636776e0e2865686a9d62aaf')
//         .then((result) => {
//             res.send(result)
//         })
//         .catch((err) => console.log(err));

// routes
app.get('/', (req, res) => {
    res.redirect('/blogs')
});

// blog routes
app.use(blogRoutes)


app.get('/about', (req, res) => {
    res.render('about', { title: 'About'});
});



// 404 page
app.use((req, res) => {
    res.status(404).render('404', { title: '404'})
})













// redirects
// app.get('/about-us', (req, res) => {
//     res.redirect('/about');
// });