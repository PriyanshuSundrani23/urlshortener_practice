import jwt from 'jsonwebtoken';
import {userTokenSchema} from '../validation/token.validation.js';
const JWT_SECRET = process.env.JWT_SECRET;

export async function createuserToken(payload){
    const validationResult = await userTokenSchema.safeParseAsync(payload);
    if(validationResult) throw new Error(validationResult.error.message);
        const payloadValidationData = validationResult.data;

    const token = jwt.sign(payloadValidationData, JWT_SECRET);
    return token;
}