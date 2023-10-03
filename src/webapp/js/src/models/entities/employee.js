
// Класс "сотрудник"
export class Employee {
    id          // ID
    firstname   // Имя
    lastname    // Фамилия
    middlename  // Отчество
    date        // Дата рождения
    adress      // Адрес

    constructor(id, firstname, lastname, middlename, date, adress) {
        this.Id = id
        this.Firstname = firstname
        this.Lastname = lastname
        this.Middlename = middlename
        this.Date = date
        this.Adress = adress
    }
}