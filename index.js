import express from "express";
import bodyParser from "body-parser";
import pg from "pg";
import dotenv from "dotenv";

dotenv.config();

const app = express();
const port = 3000;

const db = new pg.Client({
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    host: process.env.DB_HOST,
    database: process.env.DB_NAME,
    port: process.env.DB_PORT
  });
  db.connect();

const currentDate = new Date().toDateString();
let tasks = [];
let monthTasks = [];

app.use(bodyParser.urlencoded({extended: true}));
app.use(express.static("public"));



app.get("/", async (req, res)=>{
  try{
  const result = await db.query('select * from items');
  tasks = result.rows;
  console.log(tasks);
  res.render("index.ejs", {
    date: currentDate,
    tasksList: tasks,
  });
 } catch (err){
    console.log(err);
  }
});
 


app.post("/add", async (req, res) =>{
  try{
  const userTasks = req.body.newTask;
  // tasks.push(userTasks);
  await db.query('insert into items (title) values ($1)', [userTasks]);
  res.redirect("/");
  } catch (err){
    console.log(err);
  }
});

app.post('/toggle', async (req, res) => {
  try{
    const checkedItemId = req.body.itemId;
    await db.query('UPDATE items SET completed = NOT completed WHERE ID = $1', [checkedItemId]);
      res.redirect('/');
    }
   catch (err) {
      console.log(err);
  }
})

app.post("/edit", async (req, res) =>{
  try{
    const updatedId = req.body.updtdItmId;
    const updatedItem = req.body.updtdItmTtl;
    await db.query('update items set title = $1 where id = $2', [updatedItem, updatedId]);
    res.redirect('/');
  } catch (err){
    console.log(err);
  }
})

app.post("/delete", async (req, res) =>{
  try{
    const deletedItm = req.body.delItmId;
    await db.query('delete from items where id = $1', [deletedItm]);
    res.redirect("/");
  } catch(err){
    console.log(err);
  }
  })



app.get("/Month", async (req, res)=>{
  try{
      const result = await db.query("select * from monthlyitems");
      monthTasks = result.rows;
      console.log(monthTasks)
      res.render("Month.ejs", {monthTask: monthTasks});
  }catch(err){
    console.log(err)
  };
});

app.post("/m-toggle", async (req, res)=>{
  try{
    const checkedItemId = req.body.itemId
    await db.query('update monthlyitems set complete = not complete where id = $1',[checkedItemId]);
    res.redirect("/Month");
  }catch(err){
    console.log(err);
  }
});

app.post("/m-edit", async (req, res) =>{
try{
  const updatedId = req.body.updtdItmId;
  const updatedItem = req.body.updtdItmTtl;
  await db.query('update monthlyitems set title = $1 where id = $2',[updatedItem, updatedId]);
  res.redirect('/Month');
} catch (err){
  console.log(err);
}
});

app.post("/m-delete", async (req, res) =>{
  try{
    const deletedId = req.body.delItmId;
  await db.query('delete from monthlyitems where id = $1',[deletedId]);
  res.redirect('/Month');
  } catch(err){
    console.log
  }
});

app.post("/m-add", async (req, res) =>{
  try{
  const newItem = req.body.newItem;
  await db.query('insert into monthlyitems(title) values($1)', [newItem]);
  res.redirect('/Month');
}catch(err){
  console.log(err);;
}});



app.listen(port, ()=>{
    console.log("server is runnig on port " + port);
});