
const express = require("express");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");

const app = express();

app.set('view engine', 'ejs');

app.use(bodyParser.urlencoded({extended: true}));
app.use(express.static("public"));

mongoose.connect("mongodb://localhost:27017/projectsDB");

const projectSchema = {
  name: String,
  desc: String,
  progress: Number
}

const Project = mongoose.model("Project", projectSchema);

   
 
  
app.get("/", async(req, res) => {
    const data = await Project.deleteMany({name:"projectA3"})
    res.render("list", {listTitle: "Current Projects", newListProjects: data});
    }
  );
  
 
app.post("/", function(req, res){

  const item = req.body.newProject;

  if (req.body.list === "Work") {
    workProjects.push(project);
    res.redirect("/work");
  } else {
    projects.push(project);
    res.redirect("/");
  }
});

app.get("/work", function(req,res){
  res.render("list", {listTitle: "Work List", newListProjects: workProjects});
});

app.get("/about", function(req, res){
  res.render("about");
});

app.listen(3000, function() {
  console.log("Server started on port 3000");
});
