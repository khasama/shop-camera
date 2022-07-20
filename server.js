const app = require("./app");
require("dotenv").config();
const PORT = process.env.PORT || 4441;
app.listen(PORT, () => {
    console.log(`Server running port ${PORT}`);
});
