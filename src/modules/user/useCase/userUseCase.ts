import { Request, Response } from 'express';
import { User } from "@prisma/client";
import prismaClient from '../../../services/prismaClient';
import AppError from '../../../errors/AppError';
import * as DTO from '../DTO/userDTO';
import * as bcrypt from "bcrypt";

export default class userUseCase {
    async createUser({
        nome,
        senha}: DTO.createUser):Promise<User> {

        const nomeAlreadyExists = await prismaClient.user.findUnique({
            where: {
                nome
            }
        });
        
        if (nomeAlreadyExists) {
            throw new AppError("Nome Já cadastrado!", 406);
        }

        if (nome.trim().length === 0) {
            throw new AppError("O nome não pode ser vázio!", 406);
        }

        return await prismaClient.user.create({
            data: {
                nome,
                senha: await bcrypt.hash(senha, 8),
            }
        });
    }

    async getUsers({
        id,
        nome,
        role,
    }: DTO.getUser):Promise<User[]> {
        const users = await prismaClient.user.findMany({
            include: {
                carros: true,
            }
        })

        if(id) {
            const user = users.filter((user) => user.id === id);
            return user;
        } else if (nome) {
            const user = users.filter((user) => user.nome === nome);
            return user;
        } else if (role) {
            const user = users.filter((user) => user.role === role);
            return user;
        }

        return users;
    }

    async editUser ({
        id,
        nome,
        senha,
        role,
    }: DTO.editUser):Promise<User> {
        
        const user = await prismaClient.user.findUnique({
            where: {
                id: id
            }
        })

        if(!user) {
            throw new AppError("Usuario não encontrado", 404);
        }
        
        if(senha === null || senha === undefined) {
        return await prismaClient.user.update({
            where: {
                id: id
            },
            data: {
                nome,
                role,
            }
        })
    } else {
        return await prismaClient.user.update({
            where: {
                id: id
            },
            data: {
                nome,
                senha: await bcrypt.hash(senha, 8),
                role,
            }
        })
    }

        
    }

    async deleteUser ({
        id
    }: DTO.deleteUser){
        
        const user = await prismaClient.user.findUnique({
            where: {
                id: id,
            }
        })

        if(!user) {
            throw new AppError("Usuario não encontrado", 404);
        }

        await prismaClient.user.delete({
            where: {
                id: id,
            }
        })
    }


    
}