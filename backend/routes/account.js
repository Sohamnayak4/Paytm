import express from 'express';
import authMiddleware from '../middleware.js';
import { Bank } from '../db.js';
import mongoose from 'mongoose';

const router = express.Router();

router.get('/balance',authMiddleware, async(req, res) => {
    const bank =await Bank.findOne({
        userId: req.userId
    });
    res.json({
        balance: bank.balance
    });
});

router.post("/transfer", authMiddleware, async (req, res) => {
    const session= await mongoose.startSession();
    session.startTransaction();
    const {amount, to}=req.body;
    const fromAccount=await Bank.findOne({
        userId:req.userId
    }).session(session);
    if(!fromAccount || fromAccount.balance<amount){
        res.json({
            msg:"Insufficient funds"
        })
        return;
    }
    const toAccount=await Bank.findOne({
        userId:to
    }).session(session);
    if(!toAccount){
        res.json({
            msg:"Invalid account"
        })
        return;
    }
    await Bank.updateOne({
        userId:req.userId
    },{
        $inc:{
            balance:-amount
        }
    }).session(session);
    await Bank.updateOne({
        userId:to
    },{
        $inc:{
            balance:amount
        }
    }).session(session);

    await session.commitTransaction();
    res.json({
        msg:"Transfer successful"
    });
});



export default router;  