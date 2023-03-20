import { Request, Response } from 'express';
import userUseCase from '../useCase/userRepository';

interface getDTO {
    id: string;
    nome: string;
    role: string
}


export default class userController {
    async createUser(req: Request, res: Response) {

        const { nome, senha } = req.body;

        await new userUseCase().createUser({
            nome, 
            senha
        })

        return res.status(201).send("Usuario criado com Sucesso!")
    }

    async getUsers(req: Request, res: Response) {
        const { id, nome, role } = req.query;

        return res
        .status(200)
        .json(
            await new userUseCase().getUsers({
                id: id as string, 
                nome: nome as string, 
                role: role as string,
            })
        )
    }
    async editUser(req: Request, res: Response) {
        
        const { id } = req.params;

        const { nome,
                senha,
                role, 
            } = req.body;

        await new userUseCase().editUser({
            id,
            nome,
            senha,
            role,
            })

        return res.status(200).send(`Usuário de ID: ${id} editado com sucesso!`)
    }
    async deleteUser(req: Request, res: Response) {
        const { id } = req.params;

        await new userUseCase().deleteUser({
            id
        })

        return res.status(410).send(`Usuário de ID: ${id} deletado com sucesso!`)
    }
}