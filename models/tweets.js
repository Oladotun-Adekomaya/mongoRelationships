const mongoose = require('mongoose')
const {Schema} = mongoose;

mongoose.connect('mongodb://localhost:27017/relationshipDemo',{
    useNewUrlParser: true, 
    useUnifiedTopology: true
})
    .then(() => console.log("MongoDB connection established"))
    .catch((e) => {
        console.log('MongoDB connection failed')
        console.log(e)
    })


const userSchema = new Schema({
    username:String,
    age:Number,
});

const tweetSchema = new Schema({
    text:String,
    likes:Number,
    user: [{type: Schema.Types.ObjectId, ref: 'User'}]
});

const User = mongoose.model('User', userSchema)
const Tweet = mongoose.model('Tweet', tweetSchema)

const makeTweets = async () => {
    //const user = new User({username: 'Dotun', age:'18'})
    const user = await User.findOne({username: 'Dotun'})
    //await user.save()
    console.log(user);
    const tweet = new Tweet({
        text: 'Hey this is my second tweet',
        likes:500000,
        user:[user]
    })
    tweet.save()
    console.log(tweet);
    //console.log(userr);
    //tweet.user.push({userr})
    
}
const tweet = async () =>{
    const t = await Tweet.findOne({})
        .populate('user','username')
    console.log(t);
}
tweet()
