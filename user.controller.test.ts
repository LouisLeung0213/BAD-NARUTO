import { Request, Response } from "express";
import { UserController } from "./user.controller";
import { UserService } from "./user.service";

describe("UserController Unit Test", () => {
  let userController: UserController;
  let userService: UserService;

  let req: any;
  let res: any;

  beforeAll(() => {
    userService = {} as any;
    userService.login = jest.fn(() => {
      throw new Error("should not be called");
    });
    userService.signup = jest.fn(() => {
      throw new Error("should not be called");
    });
    userController = new UserController(userService);
  });

  beforeEach(() => {
    req = {
      body: {},
      session: {},
    } as any as Request;
    res = {} as any as Response;

    res.status = jest.fn().mockReturnValue(res);
    res.json = jest.fn();
    req.session.save = jest.fn();
  });

  afterEach(() => {
    (userService.signup as jest.Mock).mockReset();
    (userService.login as jest.Mock).mockReset();
  });

  it("should success login", async () => {
    let mockId = Math.random();
    req.session.save();
    jest
      .spyOn(userService, "login")
      .mockReturnValue(Promise.resolve({ id: mockId }));
    await userController.login(req, res);

    // expect(res.status).toBeCalledWith(400);
    expect(res.json).toBeCalledWith({ id: mockId });
  });

  it("should not success login", async () => {
    req = {};
    await userController.login(req, res);
    expect(res.status).toBeCalledWith(500);
    // expect(res.json).toBeCalledWith({
    //   message: "wrong username or password",
    // });
  });

  it("should reject if password does not match", async () => {
    req.body.username = "scott";
    req.body.password = "scott";
    req.body.rePassword = "scottt";
    req.body.email = "scott@gmail.com";
    // req.body.birthday = "1998";
    await userController.signup(req, res);
    expect(res.status).toBeCalledWith(400);
    expect(res.json).toBeCalledWith({ message: "Password does not match" });
  });

  it("should reject if missing password", async () => {
    req.body.username = "scott";
    // req.body.password = "scott";
    req.body.rePassword = "scottt";
    req.body.email = "scott@gmail.com";
    // req.body.birthday = "1998";
    await userController.signup(req, res);
    expect(res.status).toBeCalledWith(400);
    expect(res.json).toBeCalledWith({
      message: "Missing password",
    });
  });

  it("should reject if missing re-password", async () => {
    req.body.username = "scott";
    req.body.password = "scott";
    // req.body.rePassword = "scott";
    req.body.email = "scott@gmail.com";
    // req.body.birthday = "1998";
    await userController.signup(req, res);
    expect(res.status).toBeCalledWith(400);
    expect(res.json).toBeCalledWith({
      message: "Please double confirm your password",
    });
  });

  it("should reject if missing username", async () => {
    // req.body.username = "scott";
    req.body.password = "scott";
    req.body.rePassword = "scott";
    req.body.email = "scott@gmail.com";
    // req.body.birthday = "1998";
    await userController.signup(req, res);
    expect(res.status).toBeCalledWith(400);
    expect(res.json).toBeCalledWith({
      message: "Missing username",
    });
  });

  it("should reject if missing email", async () => {
    req.body.username = "scott";
    req.body.password = "scott";
    req.body.rePassword = "scott";
    // req.body.email = "scott@gmail.com";
    // req.body.birthday = "1998";
    await userController.signup(req, res);
    expect(res.status).toBeCalledWith(400);
    expect(res.json).toBeCalledWith({
      message: "Missing email",
    });
  });

  it("should accept", async () => {
    let mockId = Math.random();
    req.body.username = "scott";
    req.body.password = "scott";
    req.body.rePassword = "scott";
    req.body.email = "scott@gmail.com";
    req.body.nickname = "scott";
    // req.body.birthday = "1998";
    jest
      .spyOn(userService, "signup")
      .mockReturnValue(Promise.resolve({ id: mockId }));
    await userController.signup(req, res);
    expect(res.json).toBeCalledWith({ json: { id: mockId } });
  });
});
