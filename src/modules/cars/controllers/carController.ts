import { Request, Response } from 'express';
import carUseCase from '../useCase/carUseCase';

export default class carController {
    async createCar(req: Request, res: Response) {

        const { nome, cor, user_id, comprado } = req.body;

        await new carUseCase().createCar({
            nome, cor, user_id, comprado
        })

        return res.status(201).send("Carro criado com sucesso!");
    }

    async getCars(req: Request, res: Response){
        const { id,
            cor,
            nome,
            user_id,
            comprado } = req.params;

        
        return res
        .status(200)
        .json(await new carUseCase().getCars({
            id,
            cor,
            nome,
            user_id,
            comprado
        }));

    }

    async editCar(req: Request, res: Response){
        const { id } = req.params;
        
        const {
            cor,
            nome,
            user_id,
            comprado
        } = req.body;

        await new carUseCase().editCar({
            id,
            cor,
            nome,
            user_id,
            comprado
        })

        return res
        .status(200)
        .send(`Carro de ID: ${id} editado com sucesso!`)
    }
    
    async deleteCar(req: Request, res: Response){
        const { id } = req.params;

        await new carUseCase().deleteCar({
            id
        })

        return res
        .status(410).send(`Carro de ID: ${id} deletado com sucesso!`)
    }
}