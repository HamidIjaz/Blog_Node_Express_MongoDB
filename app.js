const express = require("express");
// const morgan = require("morgan");
const mongoose = require("mongoose");
const blogRoutes = require('./routes/blogRoutes');

// express app
const app = express();

// connect to mongoDB
const dbUrl =
  "mongodb+srv://<useName>:<password>@firstnodeblog.vykz7.mongodb.net/<dataBaseName>?retryWrites=true&w=majority";
mongoose
  .connect(dbUrl, { useNewUrlParser: true, useUnifiedTopology: true })
  .then((result) => app.listen(3000))
  .catch((err) => console.log(err));

// middlewaes and static files
app.use(express.static("public"));
app.use(express.urlencoded({ extended: true })); //takes url encoded data and passes that into object that we can use on request object
// app.use(morgan('dev'))      // this is to log the requests info

// register view engine
app.set("view engine", "ejs");
// app.set('views', 'myviews');

// // mongoose & mongo tests
// app.get("/add-blog", (req, res) => {
//   const blog = new Blog({
//     title: "new blog 3",
//     snippet: "about my new blog",
//     body: "more about my new blog",
//   });
//   blog
//     .save()
//     .then((result) => {
//       res.send(result);
//     })
//     .catch((err) => {
//       console.log(err);
//     });
// });

// app.get("/all-blogs", (req, res) => {
//   Blog.find()
//     .then((result) => {
//       res.send(result);
//     })
//     .catch((err) => {
//       console.log(err);
//     });
// });

// app.get("/single-blog", (req, res) => {
//   Blog.findById("6097fedd141c242ce8db2aca")
//     .then((result) => {
//       res.send(result);
//     })
//     .catch((err) => {
//       console.log(err);
//     });
// });


// routes
// blog routes
app.use('/blogs', blogRoutes);

//other Routes
app.get("/", (req, res) => {
  res.redirect("/blogs");
});

app.get("/about", (req, res) => {
  res.render("about", { title: "About" });
});


// 404 page
app.use((req, res) => {
  res.status(404).render("404", { title: "404" });
});
 
