import { users } from '@/data/user';
import type { NextApiRequest, NextApiResponse } from 'next'

type ResponseData = {
    user: any
}

export default function handler(
    req: NextApiRequest,
    res: NextApiResponse<ResponseData>
) {
    if(req.method === "POST"){

        const { username, password} = req.body;

        const user = users.find((user) => {
            user.username === username && user.password === password
        })

        if(user){
            res.status(200).json({ user });
        }
    } else {
        res.status(405).end()
    }
}