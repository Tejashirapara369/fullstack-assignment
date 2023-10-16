const mongoose = require('mongoose');
const connectionUrl = "mongodb+srv://tejashirapara369:Tejas123@cluster1.ymh0rhg.mongodb.net/";

async function connect() {
    try {
        const { connection } = await mongoose.connect(connectionUrl, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
        });
        console.log(`MongoDB Connected: ${connection.host}`);
    } catch (err) {
        console.error(`Error: ${err.message}`);
        process.exit(1);
    }
}

module.exports = connect;