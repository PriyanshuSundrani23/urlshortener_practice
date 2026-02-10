import jwt from 'jsonwebtoken';
import {userTokenSchema} from '../validation/token.validation.js';
const JWT_SECRET = process.env.JWT_SECRET;

export async function createuserToken(payload){
    const validationResult = await userTokenSchema.safeParseAsync(payload);
    if(!validationResult.success) {
        throw new Error(validationResult.error.message);
    }
    const payloadValidationData = validationResult.data;

    if(!JWT_SECRET){
        throw new Error("JWT_SECRET missing");
    }
    const token = jwt.sign(payloadValidationData, JWT_SECRET);
    return token;
}

export function validateUserToken(token) {
    try {
        const payload = jwt.verify(token, JWT_SECRET)
        return payload;
    } catch (error) {
        return null;
    } 
}