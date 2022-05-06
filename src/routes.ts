import express from 'express';
import { NodemailerHelper } from './helpers/nodemailer/nodemailerHelper';
import { PrismaFeedbacksRepository } from './repositories/prisma/prismaFeedbacksRepository';
import { SubmitFeedbackService } from './services/submitFeedbackService';
export const routes = express.Router();


routes.post('/feedbacks', async (req, res)=>{
  try{
    const {type, comment, screenshot} = req.body;
    const prismaFeedbacksRepository = new PrismaFeedbacksRepository();
    const nodemailerHelper = new NodemailerHelper();
    const submitFeedbackService = new SubmitFeedbackService(prismaFeedbacksRepository, nodemailerHelper);

    const response = await submitFeedbackService.execute({
      type, 
      comment, 
      screenshot
    })

      return res.status(201).json({data: response});
    } catch(err: any) {
      console.log("Um erro ocorreu no cadastro!", err)
      return res.status(500).send(err);
    };
  
  });