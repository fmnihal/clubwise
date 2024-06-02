import { Request, Response } from 'express';
import ClubApprovalModel from '../models/mongodb/ClubApproval';

export async function createApproval(req: Request, res: Response) {
    try {
        const clubApproval = await ClubApprovalModel.create({
            ...req.body
        });
        await clubApproval.save();
        return res.status(201).json({error: false, message: "Application has been sent"});
    } catch (error) {
        console.log(error);
        res.json({ error: true, message: "Unexpected error occured." + (error as Error).message })
    }
}