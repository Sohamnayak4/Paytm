import express from 'express';
import {User,Bank} from '../db.js';
import zod from 'zod';
import jwt from 'jsonwebtoken';
import JWT_SECRET from '../config.js';
import authMiddleware from '../middleware.js';

const router= express.Router();

const signupSchema=zod.object({
    firstname: zod.string(),
    lastname: zod.string(),
    email: zod.string().email(),
    password: zod.string().min(6),
});

router.post("/signup", async(req, res) => {
    const { success } = signupSchema.safeParse(req.body)
    if (!success) {
        return res.status(411).json({
            message: "Email already taken / Incorrect inputs"
        })
    }

    const existingUser = await User.findOne({
        email: req.body.email
    })

    if (existingUser) {
        return res.status(411).json({
            message: "Email already taken/Incorrect inputs"
        })
    }

    const user = await User.create({
        firstname: req.body.firstname,
        lastname: req.body.lastname,
        email: req.body.email,
        password: req.body.password
    })
    const userId = user._id;

    await Bank.create({
        userId,
        balance: Math.floor(Math.random() * 10000)
    });

    const token = jwt.sign({
        userId
    }, JWT_SECRET);

    res.json({
        message: "User created successfully",
        token: token
    })
    
});  

const signinSchema=zod.object({
    email: zod.string().email(),
    password: zod.string().min(6),
});

router.post("/signin", async(req, res) => {
    const body=req.body;
    const {success}=signinSchema.safeParse(body);
    if(!success){
        res.json({
            msg:"Incorrect data"
        })
    }
    const user=User.findOne({
        email:body.email,
        password:body.password
    })
    if(user){
        const userId=user._id;
        const token=jwt.sign({
            userId
        },JWT_SECRET);
        res.json({
            msg:"User signed in",
            token:token
        })
    }
    res.json({
        msg:"Incorrect email or password"
    })
});

const updateBody=zod.object({
    firstname: zod.string().optional(),
    lastname: zod.string().optional(),
    email: zod.string().optional()
});

router.put("/", authMiddleware, async(req, res) => {
    const {success}=updateBody.safeParse(req.body);
    if(!success){
        res.json({
            msg:"Incorrect data"
        })
    }
    await User.updateOne({
        _id:req.userId
    },req.body);
    res.json({
        msg:"User updated"
    })
});

router.get("/bulk", authMiddleware, async(req, res) => {
    const filter=req.query.filter || "";
    let users=await User.find({
        $or:[
            {
                firstname:{
                    $regex:filter
                }
            },
            {
                lastname:{
                    $regex:filter
                }
            }
        ]
    });
    res.json({
        user: users.map(user => ({
            firstname: user.firstname,
            lastname: user.lastname,
            email: user.email,
            _id: user._id
        }))
    })
});

export default router;    