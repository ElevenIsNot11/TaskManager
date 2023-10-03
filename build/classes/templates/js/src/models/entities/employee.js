
// Класс "сотрудник"
export class Employee {
    id          // ID
    firstName   // Имя
    lastName    // Фамилия
    patronymic  // Отчество
    date        // Дата рождения
    adress      // Адрес

    constructor(id, firstName, lastName, patronymic, date, adress) {
        this.id = id
        this.firstName = firstName
        this.lastName = lastName
        this.patronymic = patronymic
        this.date = date
        this.adress = adress
    }
}