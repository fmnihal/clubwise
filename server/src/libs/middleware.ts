import { error } from "console";
import { NextFunction, Request, Response } from "express";
import { verify } from "jsonwebtoken";

export class Middleware {

  public static verifyUserRoute(req: Request, res: Response, next:NextFunction) {
    try {
        const token = verify(req.cookies['access_token'], process.env.JWT_SECRET_KEY as string);
        if (token && typeof token !== 'string') {
            res.locals.user = token;
            next();
        } else return res.status(403).json({ message: "Failed to authenticate" });
    } catch (error: any) {
        console.log(error.message);
        return res.status(403).json({ message: "Failed to authenticate" });
    }
  }
  public static validateLogin(req: Request, res: Response, next: NextFunction) {
    try {
      const { email, password } = req.body;
      console.log(email, password)
      const emailRgx = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailRgx.test(email))
        return res.status(401).json({ error: true, message: "Invalid email" });
      if (password.length <= 5)
        return res
          .status(401)
          .json({ error: true, message: "Password length must be 6 or more." });
      next();

    } catch (error) {
      res
        .status(403)
        .json({
          error: true,
          message: "Unexpected error: " + (error as Error).message,
        });
      console.log(error);
    }
  }
  public static validateSignup(
    req: Request,
    res: Response,
    next: NextFunction
  ) {
    try {
      const { username, password, email, contact_no } = req.body;
      const emailRgx = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      const contactNoRgx = /^(\+8801\d{9}|\b01\d{9})$/;
      if (!username || username.trim().length <= 2)
        return res
          .status(401)
          .json({
            error: true,
            message: "Username must be of length 3 or more",
          });
      if (!emailRgx.test(email))
        return res.status(401).json({ error: true, message: "Invalid email" });
      if (password.length <= 5)
        return res
          .status(401)
          .json({ error: true, message: "Password length must be 6 or more." });
      if (!contactNoRgx.test(contact_no))
        return res
          .status(401)
          .json({
            error: true,
            message: "Invalid contact number. Must start with +8801 or 01",
          });
      next();
    } catch (error) {
      res
        .status(403)
        .json({
          error: true,
          message: "Unexpected error: " + (error as Error).message,
        });
      console.log(error);
    }
  }

  public static verifyAdmin(req: Request, res: Response, next: NextFunction) {
      try {
          console.log("Cookie ", req.cookies['access_token'])
          const token = verify(req.cookies['access_token'], process.env.JWT_SECRET_KEY as string);
          if (token && typeof token !== 'string') {
              res.locals.user = token;
              next();
          } else return res.status(403).json({ message: "Failed to authenticate", error:true });
      } catch (error: any) {
          console.log(error.message);
          return res.status(403).json({ message: "Failed to authenticate", error:true });
      }
  }
}
