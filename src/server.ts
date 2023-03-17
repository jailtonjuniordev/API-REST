import "dotenv/config";
import "express-async-errors";
import swaggerUi from "swagger-ui-express";
import swaggerDoc from "./swagger.json";
import express, { NextFunction, Request, Response } from "express";
import cors from "cors";
import AppError from "./errors/AppError";
import routes from "./routes";

express()
.use(express.json())
.use(cors())
.use("/api/v1", routes)
.use("/api/v1/doc", swaggerUi.serve, swaggerUi.setup(swaggerDoc))
.use((err: Error, req: Request, res: Response, next: NextFunction) => {
    if(err instanceof AppError){
        return res.status(err.statusCode).json({
            status: "error",
            message: err.message,
        });
    }
    return res.status(500).json({
        status: "error",
        message: `Erro interno no Servidor - ${err.message}`,
    })
})
.listen(process.env.SERVER_PORT, () => {
    console.log(`Servidor rodando na URL: http://localhost:${process.env.SERVER_PORT}`)
});