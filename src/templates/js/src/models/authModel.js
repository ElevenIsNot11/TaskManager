

class AuthModel extends Model {
    constructor() {
        super()
    }

    login(user) { 
       // return this.post('/user/login', user)
    }

    logout () {
       //
    }

    // Получить текущего сотрудника
    getCurrentEmployee() {
        //
    }

    check() {
        //
    }


}

const authModel = new AuthModel();
export default authModel