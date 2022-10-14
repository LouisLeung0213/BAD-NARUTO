import { Request, Response } from "express";
import { stringify } from "querystring";
import { textChangeRangeIsUnchanged } from "typescript";
import { HTTPError } from "./error";
import { RestfulController } from "./restful.controller";
import { UserService } from "./user.service";

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
      res.json(json);
    } catch (error) {
      res.status(400);
      res.json({ message: "wrong username or password" });
      return;
    }
  };
  signup = async (req: Request, res: Response) => {
    try {
      const username: string = req.body.username;
      const password: number = req.body.password;
      const password2: number = req.body.rePassword;
      const email: string = req.body.email;
      const birthday: number = req.body.birthday;
      let json = await this.userService.signup(
        username,
        password,
        email,
        birthday
      );
    } catch (error) {}
  };
}
