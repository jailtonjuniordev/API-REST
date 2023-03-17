interface createCar { 
    cor: string;
    nome: string;
    comprado?: Boolean;
    user_id: string;
}

interface getCars {
    id: string;
    cor: string;
    nome: string;
    comprado: Boolean;
    user_id: string;
}

interface editCar {
    id: string;
    cor?: string;
    nome?: string;
    comprado?: Boolean;
    user_id?: string;
}

interface deleteCar {
    id: string;
}

export { createCar, getCars, editCar, deleteCar };