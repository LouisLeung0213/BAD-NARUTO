import { Request, Response } from "express";
// import { stringify } from "querystring";
// import { textChangeRangeIsUnchanged } from "typescript";
import { HTTPError, handleError } from "./error";
import { hashPassword } from "./hash";
import { RestfulController } from "./restful.controller";
import { UserService } from "./user.service";
import "./session";

export class UserController extends RestfulController {
  constructor(private userService: UserService) {
    super();
    this.router.post("/login", this.login);
    this.router.post("/signup", this.signup);
    this.router.get("/isNewBie", this.isNewBie);
    this.router.get("/logout", this.logout);
  }

  login = async (req: Request, res: Response) => {
    try {
      const { username, password } = req.body;
      let json = await this.userService.login(username, password);
      req.session["user"] = { id: json!.id, username: username };
      req.session.save();
      res.json({ json });
    } catch (message) {
      if (message instanceof HTTPError) {
        return res.status(message.status).json({ message });
      } else {
        console.log(message);
        return res.status(500).json({ message });
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
        return res
          .status(400)
          .json({ message: "Please double confirm your password" });
      } else if (!username) {
        return res.status(400).json({ message: "Missing username" });
      } else if (!password) {
        return res.status(400).json({ message: "Missing password" });
      } else if (password !== password2) {
        return res.status(400).json({ message: "Password does not match" });
      } else if (!email) {
        return res.status(400).json({ message: "Missing email" });
      } else if (!nickname) {
        return res.status(400).json({ message: "Missing nickname" });
      } else {
        let hashedPassWord = await hashPassword(password as string);
        let json = await this.userService.signup(
          username,
          hashedPassWord,
          email,
          nickname
        );
        console.log("JSON id and json", +json, json);
        req.session["user"] = { id: +json, username: username };
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

  isNewBie = async (req: Request, res: Response) => {
    try {
      if (!req.session.user) {
        throw new HTTPError(401, "cannot get user id ");
      }
      let userId = req.session.user.id;
      let json = await this.userService.isNewBie(userId);
      res.json({ json });
    } catch (error) {
      console.log(error);
      return res.status(500).json({ message: "013" });
    }
  };
  logout = async (req: Request, res: Response) => {
    try {
      req.session?.destroy((err) => {
        if (err) {
          handleError(res, err);
          return;
        }
        // res.redirect(303, "../login/login.html");
        res.status(303).json({});
      });
    } catch (error) {
      handleError(res, error);
    }
  };
}
