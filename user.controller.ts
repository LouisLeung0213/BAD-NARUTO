import { Request, Response } from "express";
// import { stringify } from "querystring";
// import { textChangeRangeIsUnchanged } from "typescript";
import { HTTPError } from "./error";
import { hashPassword } from "./hash";
import { RestfulController } from "./restful.controller";
import { UserService } from "./user.service";
import "./session";

export class UserController extends RestfulController {
  constructor(private userService: UserService) {
    super();
    this.router.post("/login", this.login);
    this.router.post("/signup", this.signup);
  }

  login = async (req: Request, res: Response) => {
    try {
      const username: string = req.body.username;
      const password: string = req.body.password;
      let json = await this.userService.login(username, password);
      req.session["user"] = { id: json!.id, username: username };
      req.session.save();
      res.json({ json });
    } catch (error) {
      if (error instanceof HTTPError && error.status == 404) {
        res.status(404);
        res.json({ message: "User does not exist" });
        return;
      }
      if (error instanceof HTTPError && error.status == 401) {
        res.status(401);
        res.json({ message: "wrong username or password" });
        return;
      } else {
        console.log(error);
        res.status(500);
        return;
      }
    }
  };
  signup = async (req: Request, res: Response) => {
    try {
      console.log(req.body);
      const username: string = req.body.username;
      const password: string = req.body.password;
      const password2: string = req.body.rePassword;
      const email: string = req.body.email;
      const nickname: string = req.body.nickname;

      // const birthday: number = req.body.birthday;
      if (!password2) {
        res.status(400);
        res.json({ message: "Please double confirm your password" });
        return;
      } else if (!username) {
        res.status(400);
        res.json({ message: "Missing username" });
        return;
      } else if (!password) {
        res.status(400);
        res.json({ message: "Missing password" });
        return;
      } else if (password !== password2) {
        res.status(400);
        res.json({ message: "Password does not match" });
        return;
      } else if (!email) {
        res.status(400);
        res.json({ message: "Missing email" });
        return;
      } else if (!nickname) {
        res.status(400);
        res.json({ message: "Missing nickname" });
      } else {
        let hashedPassWord = await hashPassword(password as string);
        let json = await this.userService.signup(
          username,
          hashedPassWord,
          email,
          nickname
        );
        req.session["user"] = { id: json.id, username: username };
        req.session.save();
        res.json({ json });
      }
    } catch (error) {
      if (error instanceof HTTPError && error.status == 401) {
        res.status(401);
        res.json({ message: "username is taken" });
        return;
      } else {
        console.log(error);
        res.status(400);
        res.json({ message: "Invalid input" });
        return;
      }
      // console.log(error);
    }
  };
}
