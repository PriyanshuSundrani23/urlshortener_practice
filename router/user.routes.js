import express from 'express';  
import {db} from '../db/index.js';
import { usersTable } from '../models/user.model.js';
import { signupPostRequestBodySchema,loginPostRequestBodySchema } from '../validation/request.validation.js';
import {hashPasswordWithSalt} from '../utils/hash.js'
import {getUserByEmail} from '../services/user.service.js'
import {createuserToken} from '../utils/token.js';

const router = express.Router();

router.post('/signup', async (req, res) => {
    const validationResult = await signupPostRequestBodySchema.safeParseAsync(req.body);
    if(!validationResult.success){
        return res.status(400).json({error: validationResult.error.format() });
    }

    const {firstname, lastname, email, password} = validationResult.data;
    const existingUser = await getUserByEmail(email);

    if(existingUser) return res.status(400).json( {error: `user with email ${email} already exists!`});

    const {salt, password: hashedPassword} = hashPasswordWithSalt(password);

    const user = await db.insert(usersTable).values({
        email,
        firstname,
        lastname,
        salt,
        password: hashedPassword,
    }).returning({ id: usersTable.id });
    return res.status(201).json( {data: { userId: user[0].id }} )
});

router.post('/login', async(req, res)=>{

    const loginvalidation = await loginPostRequestBodySchema.safeParseAsync(req.body);

    if(!loginvalidation.success){
        return res.status(400).json({ error: loginvalidation.error.format() });
    }

    const { email, password } = loginvalidation.data;
    const user = await getUserByEmail(email);

    if(!user){
        return res
        .status(404)
        .json({ error: `user with email ${email} does not exist`}); 
    }

    const { password: hashedPassword } = hashPasswordWithSalt(password, user.salt);

    if(user.password !== hashedPassword){
        return res.status(400).json({ error: 'Invalid password' });
    }

    const token = await createuserToken({id: String(user.id)});

    return res.json({ token });
});


export default router;