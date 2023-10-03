import authModel from "../src/models/authModel.js"

// Проверка на авторизацию
export function checkAuth(callback) {
    authModel.check().then((isAuthorize) => {
        callback(isAuthorize)
    })
}