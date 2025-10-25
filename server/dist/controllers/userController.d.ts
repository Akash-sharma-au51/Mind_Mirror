import express from "express";
import type { Request, Response } from "express";
declare const registerUser: (req: Request, res: Response) => Promise<express.Response<any, Record<string, any>> | undefined>;
declare const loginUser: (req: Request, res: Response) => Promise<express.Response<any, Record<string, any>> | undefined>;
declare const logoutUser: (req: Request, res: Response) => Promise<void>;
export { registerUser, loginUser, logoutUser };
//# sourceMappingURL=userController.d.ts.map