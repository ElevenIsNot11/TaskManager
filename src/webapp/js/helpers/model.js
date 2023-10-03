export default class Model {
    // Метод GET запроса
    get(url) {
        return new Promise(function (resolve, reject) {
            let xmlRequest = new XMLHttpRequest();
            xmlRequest.open('GET', url);
            xmlRequest.responseType = 'json'
            xmlRequest.onload = () => {
                // Проверка статуса HTTP запроса
                // Статусы запроса 'loading'/'done' == 200
                if (xmlRequest.status != 200) {
                    reject()
                } else {
                    if (!xmlRequest.response) {
                        return
                    }
                    // Валидация статуса ответа сервера
                    if (!xmlRequest.response.status) {
                        webix.message('Ошибка при запросе', 'ошибка')
                        reject()
                    }

                    // Проверка статуса ответа сервера
                    switch (xmlRequest.response.status) {
                        // Успех
                        case RESULT.SUCCESS:
                            resolve(xmlRequest.response.data);
                            return;
                        // Провал
                        case RESULT.FAIL:
                            webix.message('Не удалось совершить запрос', 'ошибка');
                            reject();
                            return;
                        // Ошибка
                        default:
                            webix.message('Не удалось совершить запрос', 'ошибка');
                            reject();
                            return;
                    }
                }
            }
            xmlRequest.send()
        }) 
    }


    // Метод POST запроса
    post(url,params) {
        return new Promise(function (resolve, reject) {
            let xmlRequest = new XMLHttpRequest();
            xmlRequest.open('POST', url);
            xmlRequest.responseType = 'json'
            xmlRequest.onload = () => {
                // Проверка статуса HTTP запроса
                // Статусы запроса 'loading'/'done' == 200
                if (xmlRequest.status !== 200) {
                    webix.message(xmlRequest.status + ': ' + xmlRequest.statusText, 'ошибка');
                    reject()
                } else {
                    if (!xmlRequest.response) {
                        return
                    }
                    // Валидация статуса ответа сервера
                    if (!xmlRequest.response.status) {
                        webix.message('Ошибка при запросе', 'ошибка');
                        reject()
                    }

                    // Проверка статуса ответа сервера
                    switch (xmlRequest.response.status) {
                        // Успех
                        case RESULT.SUCCESS:
                            resolve(xmlRequest.response.data);
                            return;
                        // Провал
                        case RESULT.FAIL:
                            webix.message('Не удалось совершить запрос', 'ошибка');
                            reject();
                            return;
                        // Ошибка
                        default:
                            webix.message('Не удалось совершить запрос', 'ошибка');
                            reject();
                            return; 
                    }
                }
            }
            xmlRequest.send(JSON.stringify(params))
        })
    }
}

const RESULT = {
    SUCCESS: 'success',
    FAIL: 'fail'
}