interface createUser {
    nome: string;
    senha: string;
}

interface getUser {
    id: string;
    nome: string;
    role: string;
}

interface editUser {
    id: string;
    nome?: string;
    senha?: string;
    role?: string;
}

interface deleteUser {
    id: string;
}

export { createUser, getUser, editUser, deleteUser };