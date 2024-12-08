import express from "express";
import bodyParser from "body-parser";


const app = express();
const port = 3000;
const currentDate = new Date().toDateString();
let tasks = [];
let workTask = [];

app.use(bodyParser.urlencoded({extended: true}));

app.use(express.static("public"));

app.get("/", (req, res)=>{
  res.render("index.ejs", {
    date: currentDate,
    tasks: tasks,
  });
});

app.post("/add", (req, res) =>{
  const userTasks = {name: req.body["newTask"], completed: false};
  // var userTasks = {completed: false} 
  tasks.push(userTasks);
  res.redirect("/");
});

app.post("/addW", (req, res) =>{
  const userTasks = {name: req.body["newTask"], completed: false};
  workTask.push(userTasks);
  res.redirect("/work");
});

app.get("/work", (req, res)=>{
  res.render("work.ejs", {workTasks: workTask});
});

app.listen(port, ()=>{
    console.log("server is runnig on port " + port);
});