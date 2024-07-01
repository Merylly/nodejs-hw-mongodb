import { Router } from 'express';
import { ctrlWrapper } from '../middlewares/ctrlWrapper.js';
import {
  loginUserController,
  logoutController,
  refreshTokenController,
  registerUserController,
} from '../controllers/auth.js';
import { validateBody } from '../middlewares/validateBody.js';
import { registerSchema } from '../validation/registerSchema.js';
import { loginSchema } from '../validation/loginSchema.js';
import { authenticate } from '../middlewares/authenticate.js';


const authRouter = Router();

authRouter.post(
  '/register',
  validateBody(registerSchema),
  ctrlWrapper(registerUserController),
);

authRouter.post(
  '/login',
  validateBody(loginSchema),
  ctrlWrapper(loginUserController),
);

authRouter.post('/refresh', authenticate, ctrlWrapper(refreshTokenController));

authRouter.post('/logout', authenticate, ctrlWrapper(logoutController));

export default authRouter;
