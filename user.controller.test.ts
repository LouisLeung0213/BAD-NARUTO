import { Request, Response } from "express";
import { stringify } from "querystring";
// import { describe } from "node:test";
// import { resourceLimits } from "node:worker_threads";
import { UserController } from "./user.controller";
import { UserService } from "./user.service";

describe("User test", () => {
  let userController: UserController;
  let userService: UserService;

  let req: any;
  let res: any;

  beforeAll(() => {
    userService = {} as any;
    userService.login = jest.fn(() => {
      throw new Error("should not be called");
    });
    userController = new UserController(userService);
    req = {
      body: {
        username: "scott",
        password: "scott",
      },
    } as any as Request;
    res = {} as any as Response;

    res.status = jest.fn().mockReturnValue(res);
    res.json = jest.fn();
  });

  //   it("should reject if username type is not string", async () => {
  //     // console.log(req);
  //     // Object.assign(req, {
  //     //   body: {
  //     //     username: "user",
  //     //     password: "pass",
  //     //   },
  //     // });
  //     // req.body.username = "scott";
  //     // req.body.password = "scott";
  //     // let testObj: any = {
  //     //   body: {
  //     //     username: "scott",
  //     //     password: "pw",
  //     //   },
  //     // };
  //     // console.log(testObj);
  //     await userController.login(req, res);

  //     expect(res.status).toBeCalledWith(400);
  //     expect(res.json).toBeCalledWith({
  //       message: "wrong username or password",
  //     });
  //   });
});
