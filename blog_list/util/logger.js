function request(req, res, next) {
    const { method, path, body } = req;
    if (process.env.NODE_ENV !== "test") {
        console.log(`Method: ${method}, Path: ${path}`);
        console.log(`Body: ${JSON.stringify(body)}`);
    }

    next();
}

function error(error) {
    if (process.env.NODE_ENV !== "test") console.error(error);
}

export { request, error };
