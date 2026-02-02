import express from 'express';  
import {db} from '../db/index.js';
import { usersTable } from '../models/user.model.js';
import {eq} from 'drizzle-orm';
import {randomBytes, createHmac} from 'crypto'

const router = express.Router();

router.post('/signup', async (req, res) => {
    const { firstname, lastname, email, password} = req.body;

    const [existingUser] = await db
    .select({
        id: usersTable.id,
    })
    .from(usersTable)
    .where(eq(existingUser.email, email));

    if(existingUser) return res.status(400).json( {error: `user with email ${email} already exists!`});

    const salt = randomBytes(256).toString('hex');
    const hashedPassword = createHmac('sha256', salt)

    const user = await db.insert(usersTable).values({
        email,
        firstname,
        lastname,
    });
});

export default router;