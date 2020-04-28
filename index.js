const express = require('express')
const app =express()
const port = 5000
const bodyParser = require('body-parser');
const mongoose = require('mongoose')
const { User } = require("./Models/User");
const config = require('./config/key');

app.use(bodyParser.urlencoded({extended: true})); // application/x-www-form-urlencoded

app.use(bodyParser.json()); //application/json


mongoose.connect(config.mongoURI, {
    useNewUrlParser: true, useUnifiedTopology: true, useCreateIndex: true, useFindAndModify: false //에러 방지
}).then(() => console.log('MongoDB Connected...'))
  .catch(err => console.log(err))


app.get('/', (req, res) => res.send('Hello World! My name is kim! What your name?'))



app.post('/register', (req, res) =>{
  //회원가입할때 필요한 정보들을 client에서 가져오면 그것들을 데이터베이스에 넣어준다.
  
  
  const user = new User(req.body)
  user.save((err, userInfo) => {
    if(err){
      return res.json({success:false, err})
    }else{
      return res.status(200).json({
        success: true
      })
    }
  }) //mongodb에 저장이 된다.
})


app.listen(port, () => console.log(`Example app listening on port ${port}!`))
