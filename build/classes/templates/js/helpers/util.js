export function EmployeeReplacer(fetch, col){
    return fetch
    .then(data => {
        col = col.toString().replace(col, data.firstName+' '+data.lastName+' '+data.patronymic);
        return col;
    })
}

export function StatReplacer(fetch, col){
    return fetch
    .then(data => {
        col = col.toString().replace(col, data.name);
        return col;
    })
}