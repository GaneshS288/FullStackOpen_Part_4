import "dotenv/config";

const MONGODB_URL =
    process.env.NODE_ENV === "test"
        ? process.env.MONGODB_TEST_URL
        : process.env.MONGODB_URL;
const PORT = process.env.PORT;

export { MONGODB_URL, PORT };
