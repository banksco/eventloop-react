import bcrypt from 'bcryptjs'

export const Users=[
    {
        name:"Jack",
        email:"jack@gmail.com",
        password:bcrypt.hashSync('ngfhjkgjm'),
        isAdmin:true
    },
    {
        name:"John Doe",
        email:"johndoe@gmail.com",
        password:bcrypt.hashSync('hghghjj')
        
    },
    {
        name:"Mia",
        email:"mia@gmail.com",
        password:bcrypt.hashSync('szdsad')

    },
    {
        name:"Ava",
        email:"ava@gmail.com",
        password:bcrypt.hashSync('bbmnb')
    },

]