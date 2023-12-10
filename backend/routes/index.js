import { Router } from "express";
import userRouter from "./users.js";
import cardRouter from "./cards.js";
import { createUser, login } from "../controllers/user.js";
import auth from "../middlewares/auth.js";
import { NotFoundError } from "../errors/not-found-err.js";
import userSiginValidate from "../middlewares/userSiginValidate.js";
import userSignupValidate from "../middlewares/userSignupValidate.js";


const router = Router();

router.get('/crash-test', () => {
  setTimeout(() => {
    throw new Error('Сервер сейчас упадёт');
  }, 0);
});

router.post("/signin", userSiginValidate, login);

router.post("/signup", userSignupValidate, createUser);

router.use("/users", auth, userRouter);
router.use("/cards", auth, cardRouter);
router.use("*", auth, (req, res, next) => {
  next(new NotFoundError("Ресурс не найден. Проверьте URL и метод запроса"));
});
export default router;
