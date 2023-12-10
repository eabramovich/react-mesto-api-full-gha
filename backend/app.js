import express, { json } from "express";
import mongoose from "mongoose";
import router from "./routes/index.js";
import cookieParser from "cookie-parser";
import { errors } from "celebrate";
import cors from "cors";
import { requestLogger, errorLogger } from "./middlewares/logger.js";

const MONGO_DUPLICATE_ERROR_CODE = 11000;
const allowedCors = [
  'localhost:3000'
];

const app = express();
mongoose.connect("mongodb://127.0.0.1:27017/mestodb");
app.use(cors());

app.use(json());
app.use(cookieParser());
app.use(requestLogger);
app.use(router);
app.use(errorLogger);
app.use(errors());
app.use((err, req, res, next) => {
  let { statusCode = 500, message } = err;

  if (err.name === 'CastError') {
    statusCode = 400;
    message = 'Передан невалидный id';
  }

  if (err.name === 'ValidationError') {
    statusCode = 400;
    message = 'Ошибка валидации полей ' + err;
  }

  if(err.name === 'JsonWebTokenError') {
    return res.status(401).send({ message: 'С токеном что-то не так' });
  }

  if (err.code === MONGO_DUPLICATE_ERROR_CODE) {
    statusCode = 409;
    message = 'Пользователь с таким email уже зарегистрирован в системе';
  }

  res
    .status(statusCode)
    .send({
      message: statusCode === 500 ? "На сервере произошла ошибка" : message,
    });
});

app.listen(3000, () => {
  console.log("Server listen port $(3000)");
});
