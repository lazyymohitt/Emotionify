const Redis  = require("ioredis").default


const redis = new Redis({
    host:process.env.REDIS_HOST,
    port:process.env.REDIS_PORT,
    password:process.env.REDIS_PSWRD
})

redis.on("connect",()=>{
    console.log("Redis DB connected")
})

module.exports  = redis