import { Request, Response } from 'express';
import path from 'path';
import multiparty from 'multiparty';
import PostModel from '../models/mongodb/Post';
import { existsSync, mkdirSync, move } from 'fs-extra';

const uploadDir = './uploads';

if (!existsSync(uploadDir)) {
    mkdirSync(uploadDir, { recursive: true });
}

export async function createPost(req: Request, res: Response) {
    try {
        const admin = res.locals.user;
        if (!admin.isAdmin) return res.status(401).json({ error: true, message: "You are not logged in as Admin." });
        
        const upDir = path.join(uploadDir, "images", "posts");

        if (!existsSync(upDir)) {
            mkdirSync(upDir, { recursive: true });
        }

        const form = new multiparty.Form({ uploadDir: upDir });

        form.parse(req, async (err, fields, files) => {
            console.log(err)
            if (err) return res.status(500).json({ error: true, message: "Internal server error." });

            const { title, club, shortDescription, longDescription } = fields;
            const newPath = path.join(upDir, Date.now().toString() + path.extname(files.file[0].path));
            await move(files.file[0].path, newPath, { overwrite: true });

            const post = new PostModel({
                title: title[0],
                club: club[0],
                shortDescription: shortDescription[0],
                longDescription: longDescription[0],
                isPublic: fields.isPublic[0] == "true",
                picture: newPath.replace(/\\/g, "/"),
            });
            
            await post.save();
            
            res.status(200).json({ error: false, message: "Post created successfully." });
        });
    } catch (error) {

    }
}
