import {Request, Response} from "express"

export interface IAuthorization {
    registration: (req: Request, res: Response) => any
    confimToken: (req: Request, res: Response) => any
}