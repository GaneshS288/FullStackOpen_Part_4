function request(req, res, next) {
    const {method, path, body } = req;

    console.log(`Method: ${method}, Path: ${path}`);
    console.log(`Body: ${JSON.stringify(body)}`);
    next()
}

function error(error) {
    console.error(error);
}

export { request, error };
