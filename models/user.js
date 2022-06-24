const mongoose = require('mongoose')

mongoose.connect('mongodb://localhost:27017/relationshipDemo',{
    useNewUrlParser: true, 
    useUnifiedTopology: true
})
    .then(() => console.log("MongoDB connection established"))
    .catch((e) => {
        console.log('MongoDB connection failed')
        console.log(e)
    }) 

const userSchema = new mongoose.Schema({
    first: String,
    last: String,
    addresses:[
        {
            street: String,
            city: String,
            state: String,
            country: String
        }
    ]
})

const User = mongoose.model('User', userSchema);

// ONE TO FEW
const makeUser = async () => {
    const u = new User({
        first: 'Harry',
        last: 'Potter'
    })
    u.addresses.push({
        street: 'Big boy street',
        city: 'New York',
        state:'New York',
        country: 'US'

    })
    const res = await u.save()
    console.log(res);
}
makeUser()