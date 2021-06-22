import express, { Request, Response } from 'express';
import commonApi from './common/common.api';
import userApi from './user/user.api';
import hmacApi from './hmac/hmac.api';

export const router = express.Router();

router.use('/', commonApi);
router.use('/user', userApi);
router.use('/hmac', hmacApi);
