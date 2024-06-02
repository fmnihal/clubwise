import { Request, Response } from 'express';
import BookRoomModel from '../models/mongodb/BookRooms';


export async function bookRoom(req: Request, res: Response) {
    try {
        console.log(req.body)
        const room = await BookRoomModel.findOneAndUpdate({
            date: req.body.date,
            club: req.body.club
        }, {
            $set: {
                description: req.body.description,
                date: req.body.date,
                club: req.body.club
            }
        }, {
            upsert: true
        }, );
        return res.status(201).json({error: false, message: "Room has been booked successfully", room});
    } catch (error) {
        console.log(error);
        res.json({ error: true, message: "Unexpected error occured." + (error as Error).message })
    }
}

export async function getRooms(req: Request, res: Response) {
    try {
        const room = await BookRoomModel.findOne({ date: (req.query?.date as string), club: req.query?.club});
        console.log(req.query)
        console.log(room)
        return res.status(200).json({error: false, room});
    } catch (error) {
        console.log(error);
        res.json({ error: true, message: "Unexpected error occured." + (error as Error).message })
    }
}