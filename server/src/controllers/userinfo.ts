import { Request, Response } from "express";
import UserModel from "../models/mongodb/userModel";

class UserInfoRouteHandler {
  public async update(req: Request, res: Response) {
    const { username, contact } = req.body;
    const user = await UserModel.findOne({ email: res.locals.user.email });
    if (!user) {
      return res.status(404).json({
        error: true,
        message: "User does not exist",
      });
    }

    const updatedUser = await UserModel.findOneAndUpdate(
      { email: res.locals.user.email },
      {
        $set: {
          username: username || user.username,
          contact: contact || user.contact,
        },
      },
      { new: true }
    );
    if (updatedUser) updatedUser.password = "";
    res.status(200).json({ error: false, data: updatedUser });
  }

  public async delete(req: Request, res: Response) {
    const user = await UserModel.findOne({ email: res.locals.user.email });
    if (!user) {
      return res.status(404).json({
        error: true,
        message: "User does not exist",
      });
    }
    await UserModel.deleteOne({ email: user.email });
    res.status(200).json({ error: false, message: "Deleted successfully" });
  }
  // Admin usage only
  public updatebyAdmin = async (req: Request, res: Response) => {
    const { username, contact } = req.body;
    const user = await UserModel.findOne({ email: req.params.email });
    if (!user) {
      return res.status(404).json({
        error: true,
        message: "User does not exist",
      });
    }

    const updatedUser = await UserModel.findOneAndUpdate(
      { email: req.params.email },
      {
        $set: {
          username: username || user.username,
          contact: contact || user.contact,
        },
      },
      { new: true }
    );
    if (updatedUser) updatedUser.password = "";
    res.status(200).json({ error: false, data: updatedUser });
  }
}

export default UserInfoRouteHandler;
