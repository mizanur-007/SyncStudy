const express = require("express");
const cors = require("cors");
require("dotenv").config();
const jwt = require("jsonwebtoken");
const cookieParser = require('cookie-parser');
const { MongoClient, ServerApiVersion, ObjectId } = require('mongodb');

const app = express();
const port = process.env.PORT || 5000;

// middleware 
app.use(express.json())
app.use(cors({
  origin: ["https://syncstudy-d2433.web.app", 'https://syncstudy-d2433.firebaseapp.com', 'http://localhost:5173'],
  credentials: true
}));
app.use(cookieParser())


const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASSWORD}@cluster0.ay5n7wa.mongodb.net/?retryWrites=true&w=majority`;

// Create a MongoClient with a MongoClientOptions object to set the Stable API version
const client = new MongoClient(uri, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  }
});

const assignmentCollection = client.db("SyncStudy").collection("Assignments");
const submissionCollection = client.db("SyncStudy").collection("Submissions");
const notesCollection = client.db("SyncStudy").collection("Notes");

async function run() {
  try {
    // Connect the client to the server	(optional starting in v4.7)
    await client.connect();
    // Send a ping to confirm a successful connection
    await client.db("admin").command({ ping: 1 });
    console.log("Pinged your deployment. You successfully connected to MongoDB!");
  } finally {
    // Ensures that the client will close when you finish/error
    // await client.close();
  }
}
run().catch(console.dir);


//verify token

const VerifyToken = (req,res,next)=>{
  try{
    const token = req.cookies?.token;
    console.log(token)
    if(!token){
      return res.status(401).send({message:"Unauthorized Access"})
    }
    else{
      jwt.verify(token, process.env.ACCESS_TOKEN, function(err,decoded){
        if(err){
          return res.status(401).send({message:"Unauthorized Access"})
  
        }
        else{
          req.user = decoded;
          console.log(req.user)
          next()
          
        }
      })
    }
  }
  catch{
    console.log("error")
  }
}


// get operations 
app.get("/", (req, res) => {
    res.send("app is running");
  });

  //all assignments 
  app.get("/api/v1/assignments", async(req,res)=>{
    try{
        const page = parseInt(req.query.currentPage);
    const size = parseInt(req.query.size);

    if(page || size){
        const result = await assignmentCollection.find().skip(page*size).limit(size).toArray()
    const count = await assignmentCollection.estimatedDocumentCount();
    res.send({result, count})
    }
    else{
        const result = await assignmentCollection.find().toArray()
        res.send(result)
    }
    }
    catch{
        console.log("error")
    }
  })

  //all submissions 
  app.get("/api/v1/submissions",VerifyToken, async(req,res)=>{
    try{
        const page = parseInt(req.query.currentPage);
    const size = parseInt(req.query.size);
    const status_query = req.query.status;
    const query_email = req.query.email;
    const query ={status: status_query}
    const query2 ={submitter_email: query_email}
    if(page || size){
        const result = await assignmentCollection.find().skip(page*size).limit(size).toArray()
    const count = await assignmentCollection.estimatedDocumentCount();
    res.send({result, count})
    }
    else{
        if(status_query){
          const result = await submissionCollection.find(query).toArray()
        res.send(result)
        }
        else if(query_email){
          const result = await submissionCollection.find(query2).toArray()
        res.send(result)
        }
        else{
          const result = await submissionCollection.find().toArray()
        res.send(result)
        }
    }
    }
    catch{
        console.log("error")
    }
  })

  //get notes data
  app.get("/api/v1/notes", async(req,res)=>{
try{
  const result = await notesCollection.find().toArray();
  res.send(result)
}
catch{
  console.log("error")
}
  })




    //assignment with id
    app.get("/api/v1/assignments/:id",VerifyToken, async(req,res)=>{
      const id = req.params.id;
      const query = {_id : new ObjectId(id)};
      const result = await assignmentCollection.findOne(query);
      res.send(result)
    })

      //add a assignment
  app.post('/api/v1/assignments',VerifyToken, async(req,res)=>{
    try{
      const data = req.body;
      const result = await assignmentCollection.insertOne(data);
res.send(result)
    }
    catch{
      console.log(error)
    }
  })

      //add a submission
  app.post('/api/v1/submissions',VerifyToken, async(req,res)=>{
    try{
      const data = req.body;
      const result = await submissionCollection.insertOne(data);
res.send(result)
    }
    catch{
      console.log(error)
    }
  })
      //add a note
  app.post('/api/v1/notes',VerifyToken, async(req,res)=>{
    try{
      const data = req.body;
      const result = await notesCollection.insertOne(data);
res.send(result)
    }
    catch{
      console.log(error)
    }
  })


    //update a doc
    app.put('/api/v1/assignments/update/:id',VerifyToken,async(req,res)=>{
      const id = req.params.id;
      const updatedAssignment = req.body;
      const query = {_id: new ObjectId(id)};
      const option = {upsert: true }
      const updatedDoc = {
        $set:{
          title: updatedAssignment.title,
          description: updatedAssignment.description,
          marks: updatedAssignment.marks,
          thumbnail_url: updatedAssignment.thumbnail_url,
          difficulty_level: updatedAssignment.difficulty_level,
          due_date: updatedAssignment.due_date
        }
      }
      const result = await assignmentCollection.updateOne(query,updatedDoc,option);
      res.send(result)
    })

    //update a doc in submissions
    app.put('/api/v1/submissions/update/:id',VerifyToken,async(req,res)=>{
      const id = req.params.id;
      const updatedSubmission = req.body;
      const query = {_id: new ObjectId(id)};
      const option = {upsert: true }
      const updatedDoc = {
        $set:{
          obtained_mark: updatedSubmission.obtained_mark,
          feedback: updatedSubmission.feedback,
          status: updatedSubmission.status,
          marked_by: updatedSubmission.marked_by,
          title: updatedSubmission.title,
          marks: updatedSubmission.marks,
          creator_email: updatedSubmission.creator_email,
          creator_name: updatedSubmission.creator_name,
          drive_link: updatedSubmission.drive_link,
          comment: updatedSubmission.comment,
          submitter_email: updatedSubmission.submitter_email,
          submitter_name: updatedSubmission.submitter_name
        }
      }
      const result = await submissionCollection.updateOne(query,updatedDoc,option);
      res.send(result)
    })


  //delete a assignment
    app.delete('/api/v1/assignments/:id',VerifyToken, async(req,res)=>{
      try{
        const id = req.params.id;
      const query = { _id: new ObjectId(id)}
      const result = await assignmentCollection.deleteOne(query)
      res.send(result)
      }
      catch{
        console.log(error)
      }
    })

  //delete a note
    app.delete('/api/v1/notes/:id',VerifyToken, async(req,res)=>{
      try{
        const id = req.params.id;
      const query = { _id: new ObjectId(id)}
      const result = await notesCollection.deleteOne(query)
      res.send(result)
      }
      catch{
        console.log(error)
      }
    })



    //create a cookie with jwt
app.post('/jwt', async(req,res)=>{
  const data = req.body;
  const token = jwt.sign(data, process.env.ACCESS_TOKEN, {expiresIn: '1h'});
  res
  .cookie('token', token, {
    httpOnly: true,
    secure: true,
    sameSite: 'none'
  })
  .send({message: 'success'})
})

//clear cookie
app.post('/logout', async(req,res)=>{
  const data = req.body;
  res.clearCookie('token', {maxAge: 0}).send({message:'cleared cookie'})
})


  //listen
  app.listen(port, ()=>{
    console.log("app is running")
  })