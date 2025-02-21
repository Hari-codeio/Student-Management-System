const express=require("express")
const mysql=require("mysql2")
var app=express()
app.use(express.json())


const con=mysql.createConnection({
  host:"localhost",
  user:"root",
  password:"Hari@6003",
  database:"SMS"
})

con.connect((err)=>{
  if(err) console.log(err)
  else console.log("connected!")  
})

app.use(express.json());
app.post('/post', (req, res)=>{
  const name=req.body.name
  const age=req.body.age
  const city=req.body.city


  // insert into database
  con.query("insert into student (name, age, city) values(?,?,?);", [name, age, city], (err)=>{
    if(err) {
      console.log(err)
      res.status(500).send("Error inserting data")
    }
    else res.send("POSTED")
  })
})

// view from the database
app.get('/fetch', (req, res)=>{
  con.query("Select * from student",(err, result, fields)=>{
    if(err) {
      console.log(err)
    }
    else res.send(result)

  })
})


// fetch from id
app.get('/fetchbyid/:id', (req, res)=>{
  const id=req.params.id;
  con.query("Select * from student where id=?;", [id], (err, result)=>{
    if(err) {
      console.log(err)
      res.send("The id you are trying to fetch is not present in the database")
    }
  if(result.length==0) {
    res.send("Invalid ID")
  }
  else {
    res.send(result)
  }
  })
})

// update
app.put('/update/:id', (req, res)=>{
  const id=req.params.id;
  const name=req.params.name;
  const age=req.params.age;
  const city=req.params.city;
  con.query("update student set name=?, age=?, city=? where id=?;",[name, age, city, id], (err)=>{
    if(err) console.log(err)
      else 
            res.send("Update successfully")
      })
  })


  //delete
  app.delete('/delete/:id',(req, res)=>{
    const id=req.params.id;
    con.query("delete from student where id=?;", [id], (err)=>{
      if(err) console.log(err)
      else res.send("Deleted successfully")
    })
  })



app.listen(3001, (err)=>{
  if(err) console.log(err)
  else console.log("on port 3001")
})
