const success = 200;
const unauthorized = 401;
const badRequest = 400;
const duplicateRecord = 409;
const serverError = 500;
const notFound = 404;
const validationError = 422;
const serverErrorMessage = 'Internal Server Error. Please try again later.';
const tokenExpire = '1 day';
const tokenAlgo  = 'RS256';
const tokenKey = "assignment";


module.exports = {
    status: {
        success,
        unauthorized,
        badRequest,
        duplicateRecord,
        serverError,
        notFound,
        validationError
    },
    messages: {
        serverErrorMessage,
    },
    tokenExpire,
    tokenAlgo,
    tokenKey
};
