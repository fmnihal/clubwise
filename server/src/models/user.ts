// User.ts
import { randomBytes, scryptSync, timingSafeEqual } from "crypto";
import { LOGIN_DURATION } from "../libs";
import { MandatoryInfoProps } from "./MandatoryInfo";
import UserModel from "./mongodb/userModel";
import jwt from "jsonwebtoken";

export class User implements MandatoryInfoProps {
  // MandatoryInfoProps properties
  _username: string;
  _password: string;
  _email: string;
  _contact_no: string;
  _isAdmin: boolean = false;

  // Constructor
  constructor(mandatoryInfo: MandatoryInfoProps) {
    // Assigning values from MandatoryInfoProps
    this._username = mandatoryInfo.username;
    this._password = mandatoryInfo.password;
    this._email = mandatoryInfo.email;
    this._contact_no = mandatoryInfo.contact_no;
  }
  // MandatoryInfoProps getters and setters
  get username(): string {
    return this._username;
  }
  set username(value: string) {
    this._username = value;
  }

  get password(): string {
    return this._password;
  }
  set password(value: string) {
    this._password = value;
  }

  get email(): string {
    return this._email;
  }
  set email(value: string) {
    this._email = value;
  }

  get contact_no(): string {
    return this._contact_no;
  }
  set contact_no(value: string) {
    this._contact_no = value;
  }

  get isAdmin(): boolean {
    return this._isAdmin;
  }
  set isAdmin(value: boolean) {
    this._isAdmin = value;
  }

  private hashPassword(password: string) {
    const salt = randomBytes(16).toString("hex");
    const hashedPassword = scryptSync(password, salt, 64).toString("hex");

    return `${salt}:${hashedPassword}`;
  }
  private static checkPasswordMatch(password: string, hashedPassword: string) {
    const [salt, key] = hashedPassword.split(":");
    const hashedBuffer = scryptSync(password, salt, 64);
    const keyBuffer = Buffer.from(key, "hex");
    const match = timingSafeEqual(hashedBuffer, keyBuffer);

    if (match) return true;
    return false;
  }

  public async signUp() {
    if (!this._username || !this._email || !this._password || !this._contact_no)
      throw Error("Missing a mandatory property");
    const user = await UserModel.findOne({ email: this._email });

    if (user) throw Error("An account already exist for this email");

    const password = this.hashPassword(this._password);
    const newUser = new UserModel({
      username: this._username,
      email: this._email,
      contact: this._contact_no,
      password,
    });
    await newUser.save();
  }

  public static async login(email: string, password: string) {
    if (!email || !password)
      throw Error("Invalid email or password.");
    
    const user = await UserModel.findOne({ email });
    
    if (!user)
      throw Error("Invalid email or password.");
    if (this.checkPasswordMatch(password, user.password)) {
      const userInfo = {
        username: user.username,
        email: user.email,
        contact: user.contact,
        isAdmin: user.isAdmin,
      };

      const token = jwt.sign(userInfo, process.env.JWT_SECRET_KEY as string, {
        expiresIn: LOGIN_DURATION,
      });
      return {token, userInfo};
    } else throw Error("Invalid email or password.");
  }
}

export default User;
