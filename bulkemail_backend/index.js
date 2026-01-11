const env = require("dotenv");
const express = require("express")
const cors = require("cors")
const nodemailer = require("nodemailer")
const bcrypt = require("bcryptjs");

const mongoose = require("mongoose")

env.config()
const app = express()

app.use(cors())

app.use(express.json())

mongoose.connect(process.env.MONGO_URL).then(()=>{
    console.log("Database connected successfully..")
})
.catch(()=>{
    console.log("failed to connect!")
})

const credentialSchema = new mongoose.Schema({
  user: {
    type: String,
    required: true,
    trim: true
  },
  pass: {
    type: String,
    required: true,
    trim: true
  }
})

const emailHistorySchema = new mongoose.Schema({
  totalCount: Number,
  emailList: [String],
  status: String,
  subject: String,
  message:String,
  sentAt: {
    type: Date,
    default: Date.now
  }

})

const logincredentialSchema = new mongoose.Schema({
  username: {
    type: String,
    required: true,
    trim: true
  },
  password: {
    type: String,
    required: true,
    trim: true
  }
})

const credential = mongoose.model("credentials",credentialSchema,"bulkmail")
const EmailHistory = mongoose.model("EmailHistory", emailHistorySchema,"emailHistory")
const loginCredential = mongoose.model("LoginCredential",logincredentialSchema,"credential")


app.post("/login", async (req, res) => {
  try {
    const { username, password } = req.body;

    if (!username || !password) {
      return res.send(false);
    }

    const user = await loginCredential.findOne({ username });
    if (!user) return res.send(false);

    if (user.password !== password) return res.send(false);
    res.send(true);
  } catch (err) {
    console.error(err);
    res.status(500).send(false);
  }
});

app.post("/sendemail", async (req, res)=>{
    try {
    const emailBody = req.body.msg
    const emailList = req.body.emailList
    const subject = req.body.subject

    const data = await credential.find()
    console.log(data)
    const transporter = nodemailer.createTransport({
        service:"gmail",
        auth:{
        user:data[0].user,
        pass:data[0].pass
        },
    })
    await transporter.verify()

    if(!emailList || emailList.length === 0) {
            return res.send(false);
        }
            
        for(var i=0; i<emailList.length ; i++){
            await transporter.sendMail({
            from:data[0].user,
            to:emailList[i],
            subject:subject,
            text:emailBody


        })}

         await EmailHistory.create({
            totalCount: emailList.length,
            emailList: emailList,
            subject: subject,
            message: emailBody,
            status: "Success"
        })
        res.send(true)

        
    

    } catch (error) {
        console.log(error)
        await EmailHistory.create({
            totalCount: emailList?.length || 0,
            emailList: emailList || [],
            subject: subject,
            message: emailBody,
            Status: "Failed"})
        res.send(false)
    }
})

app.get("/email-history", async (req, res) => {
  const history = await EmailHistory.find().sort({ sentAt: -1 });
  res.json(history);
});


app.listen(5000, function(){
    console.log("Server started...")
})