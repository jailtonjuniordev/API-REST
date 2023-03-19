import * as DTO from "../DTO/carDTO";
import { Car } from "@prisma/client";
import prismaClient from "../../../database/prismaClient";
import AppError from "../../../errors/AppError";
import carServices from "../services/carServices";


export default class carRepository {
    async createCar({
        cor,
        nome,
        user_id,
        comprado
    }: DTO.createCar): Promise<Car> {

       await new carServices().verificarNulidade({
            cor,
            nome,
            user_id,
            comprado
        })
        
        return await prismaClient.car.create({
            data: {
                nome,
                cor,
                userId: user_id,
                comprado
            }
        })
    }

    async getCars({
        id,
        cor,
        nome,
        user_id,
        comprado
    }: DTO.getCars): Promise<Car[]> {
        const cars = await prismaClient.car.findMany({
            include: {
                user: true,
            }
        })

        if(id) {
            const car = cars.filter((car) => car.id === id);
            return car;
        } else if (cor) {
            const car = cars.filter((car) => car.cor === cor);
            return car;
        }  else if (nome) {
            const car = cars.filter((car) => car.nome === nome);
            return car;
        }  else if (user_id) {
            const car = cars.filter((car) => car.userId === user_id);
            return car;
        }  else if (comprado) {
            const car = cars.filter((car) => car.comprado === comprado);
            return car;
        }
        return cars;
    }

    async editCar({
        id,
        cor,
        nome,
        comprado,
        user_id,
    }: DTO.editCar): Promise<Car> {
        const car = await prismaClient.car.findUnique({
            where: {
                id: id,
            }
        })

        if(!car) {
            throw new AppError("Carro não encontrado", 404);
        }

        return await prismaClient.car.update({
            where: {
                id: id
            }, data: {
                cor,
                nome,
                comprado,
                user_id,
            }
        })
    }

    async deleteCar({
        id,
    }: DTO.deleteCar){
        
        const car = await prismaClient.car.findUnique({
            where: {
                id: id,
            }
        })

        if(!car) {
            throw new AppError("Carro não encontrado", 404);
        }

        await prismaClient.car.delete({
            where: {
                id: id
            }
        })

    }
}