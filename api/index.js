const express=require('express');
const app=express();
const dotenv=require('dotenv');
dotenv.config();
const mongoose=require('mongoose')
const User = require('./model/User.js')
const Post = require('./model/Post.js')
const cors=require('cors')
const bcrypt=require('bcryptjs')
const jwt=require('jsonwebtoken')
const secret='anfdoafnw249734ndshcaiwseyh4398';
const cookieParser=require('cookie-parser');
const multer=require('multer');
const path=require("path");
// const uploadMiddleware=multer({dest:'/uploads'})
const uploadMiddleware = multer({ dest: path.join(__dirname, 'uploads') });
const fs=require('fs');
app.use(cors({credentials:true,origin:'https://mern-blog-1-luct.onrender.com'}));
app.use(express.json());
app.use(cookieParser());
const _dirname=path.resolve();
console.log(_dirname)
// app.use('/uploads',express.static(__dirname+'/uploads'))
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));
app.use(express.static(path.join(_dirname,"/client/dist")));
const salt=bcrypt.genSaltSync(10);
app.post('/register',async (req,res)=>{
    console.log("Register Form data submitted!!");
    const {username,password}=req.body;
    try{
        const Userdoc= await User.create({username,
            password:bcrypt.hashSync(password,salt)
        });
        res.json(Userdoc);
        console.log("User Created Successfully!!")
    }
    catch(e){
        console.log("Error happened while creating register user!");
        res.status(400).json(e);
    }
   
})
app.post('/login',async(req,res)=>{
    const {username,password}=req.body;
    const Userdoc=await User.findOne({username});
    console.log(Userdoc);
    // res.json(Userdoc);
    const passwordcheck=bcrypt.compareSync(password,Userdoc.password);
    // console.log(passwordcheck);
    // res.json(passwordcheck);
    if(passwordcheck){
        jwt.sign({username,id:Userdoc._id},secret,{},(err,token)=>{
            if(err) throw err;
            res.cookie('token',token).json({
                id:Userdoc._id,
                username,
            });
        })
    }
    else{
        res.status(400).json("Registration failed!!!!")
    }
})

app.get('/profile',(req,res)=>{
    const {token}=req.cookies;
    jwt.verify(token,secret,{},(err,info)=>{
        if(err) throw err;
        console.log(info)
        res.json(info);
    })
})

app.post('/logout',(req,res)=>{
    res.cookie('token','').json("Logout done!!")
})

// app.post('/post',uploadMiddleware.single('file'),async(req,res)=>{
//     // console.log(req.file);
//     const {originalname,path}=req.file;
//     // const parts=orignialname.split('.');
//     console.log(originalname);
//     const parts=originalname.split('.');
//     console.log(parts);
//     const extension=parts[parts.length-1]
//     console.log(path)
//     const modifiedPath=path+'.'+extension
//     fs.renameSync(path,modifiedPath);


//     const {token}=req.cookies;
//     jwt.verify(token,secret,{},async(err,info)=>{
//         if(err) throw err;
//         const {title,content,summary}=req.body;
//         const PostDoc=await Post.create({
//         title,
//         summary,
//         content,
//         cover:modifiedPath,
//         author:info.id
//     });
//         res.json({"Postdoc":PostDoc});
//     })
    
// })

app.post('/post', uploadMiddleware.single('file'), async (req, res) => {
    const { originalname, path: tempPath } = req.file;
    const parts = originalname.split('.');
    const extension = parts[parts.length - 1];
    const newPath = tempPath + '.' + extension;

    // Rename the uploaded file
    fs.renameSync(tempPath, newPath);

    const relativePath = `uploads/${path.basename(newPath)}`; // Relative path for the cover field

    const { token } = req.cookies;
    jwt.verify(token, secret, {}, async (err, info) => {
        if (err) throw err;
        const { title, content, summary } = req.body;
        const PostDoc = await Post.create({
            title,
            summary,
            content,
            cover: relativePath, // Save the relative path
            author: info.id,
        });
        res.json({ PostDoc });
    });
});


app.get('/post',async(req,res)=>{
    const Posts=await Post.find()
    .populate('author',['username'])
    .sort({createdAt:-1})
    .limit(20);
    res.json(Posts)
})

app.get('/post/:id',async(req,res)=>{
    const {id}=req.params;
    const postDoc= await Post.findById(id).populate('author',['username']);
    res.json(postDoc)
})

// app.put('/post',uploadMiddleware.single('file'), async (req,res) => {
//     let newPath = null;
//     if (req.file) {
//       const {originalname,path} = req.file;
//     //   console.log("originalname",originalname);
//     //   console.log("path",path);
//       const parts = originalname.split('.');
//     //   console.log("Parts",parts);
//       const ext = parts[parts.length - 1];
//     //   console.log("Extension",ext);
//       newPath = path+'.'+ext;
//     //   console.log("newPath",newPath)
//       fs.renameSync(path, newPath);
//     }
  
//     const {token} = req.cookies;
//     if(!token) return res.status(300).json("Sorry but you need to signin first!!")
//     jwt.verify(token, secret, {}, async (err,info) => {
//       if (err) throw err;
//       const {id,title,summary,content} = req.body;
//       const postDoc = await Post.findById(id);
//       console.log("postDoc author",JSON.stringify(postDoc.author))
//       console.log("info.id",JSON.stringify(info.id))
//       const isAuthor = JSON.stringify(postDoc.author) === JSON.stringify(info.id);
//       if (!isAuthor) {
//         return res.status(400).json('you are not the author');
//       }
//       await postDoc.updateOne({
//         title,
//         summary,
//         content,
//         cover: newPath ? newPath : postDoc.cover,
//       });
  
//       res.json(postDoc);
//     });
  
//   });

app.put('/post', uploadMiddleware.single('file'), async (req, res) => {
    let newPath = null;
    if (req.file) {
        const { originalname, path: tempPath } = req.file;
        const parts = originalname.split('.');
        const extension = parts[parts.length - 1];
        newPath = tempPath + '.' + extension;

        // Rename the uploaded file
        fs.renameSync(tempPath, newPath);

        newPath = `uploads/${path.basename(newPath)}`; // Convert to relative path
    }

    const { token } = req.cookies;
    if (!token) return res.status(300).json("Sorry but you need to sign in first!!");

    jwt.verify(token, secret, {}, async (err, info) => {
        if (err) throw err;
        const { id, title, summary, content } = req.body;
        const postDoc = await Post.findById(id);
        const isAuthor = JSON.stringify(postDoc.author) === JSON.stringify(info.id);

        if (!isAuthor) {
            return res.status(400).json('You are not the author');
        }

        await postDoc.updateOne({
            title,
            summary,
            content,
            cover: newPath ? newPath : postDoc.cover, // Use the updated relative path
        });

        res.json(postDoc);
    });
});

app.get('*',(req,res)=>{
    res.sendFile(path.resolve(_dirname,"client","dist","index.html"));
})
app.listen(process.env.PORT,()=>{
    console.log(`Server is running at ${process.env.PORT}`);
mongoose.connect(process.env.MONGO_URL)
.then(()=>{
    console.log("Database Connected Succcessfully!!");
})
.catch((error)=>{
    console.log("Error happened!!",error)
})
})