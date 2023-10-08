
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

const project1 = new Project({
  name: "projectA1",
  desc: "Short description of projectA1",
  progress: .50
})

const project2 = new Project({
  name: "projectA2",
  desc: "Short description of projectA2",
  progress: .25
})

const project3 = new Project({
  name: "projectA3",
  desc: "Short description of projectA3",
  progress: 0
})

const project4 = new Project({
  name: "projectA4",
  desc: "Short description of projectA4",
  progress: .95
})


const defaultProjects = [project1, project2, project3, project4];

 
app.get("/", async(req, res) => {
  
    const foundProjects = await Project.find({});
    if(foundProjects.length === 0) {
      
    Project.insertMany(defaultProjects)
    .then(function(){
    console.log("Data inserted")  // Success
    }).catch(function(error){
    console.log(error)      // Failure
    });
    
    res.redirect("/");
  } else {
    res.render("list", {listTitle: "Current Projects", newListProjects: foundProjects});
  }
   });
    
 
app.post("/", function(req, res){

  const projectName = req.body.newProject;
  const projectDesc = req.body.newDesc;
 // const projectProg = req.body.newProg;
  const project = new Project({
     name: projectName,
     desc: projectDesc,
    // progress: 0
  });
   project.save();
   res.redirect("/");
});


app.post("/delete", function(req,res){
 async function myDelete() {

 const checkedProjectId = req.body.checkbox;

 const del = await Project.findByIdAndRemove(checkedProjectId);

 };
    myDelete();
    res.redirect("/");
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
