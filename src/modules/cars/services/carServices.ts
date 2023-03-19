import * as DTO from "../DTO/carDTO";
import AppError from "../../../errors/AppError";


export default class carServices {
    async verificarNulidade({
        cor,
        nome,
        user_id,
        comprado
    }: DTO.createCar) {
        if (cor.trim().length === 0) {
            throw new AppError("A cor do carro não pode ser vázia!", 406);
        } else if (nome.trim().length === 0) {
            throw new AppError("O nome do carro não pode ser vázio!", 406);
        } else if (user_id.trim().length === 0) {
            throw new AppError("O ID do usuário não pode ser vázio!", 406);
        }

        return true;
    }
}