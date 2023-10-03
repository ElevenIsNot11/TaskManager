export function ProjectTabView(InfoWindow){
    return  {
        id: "projectTab",
        css: "",
        cols: [
        {
        view: "datatable",
        css: "datatable webix_header_border webix_data_border select_disabled",
        select: "row",
        id: "projectTable",
        widthAuto: true,
        height: 545,
        scroll: "xy",
        data: "",
        columns: [ 
            { id: "id", hidden: true},
            { id: "number", header: "Номер", width: 75, sort: "int"},
            { id: "name", header: "Название", fillspace: 2, sort: "string"},
            { id: "teamlead", header: ["Тимлид",{ content:"textFilter" },], fillspace: 3, sort: "string"},
            { id: "desc", header: "Описание", fillspace: 4, sort: "string"}
            ],
        scheme: {
            $init:function(obj){
                obj.number = number
                number++
            }
        }
        },    
            InfoWindow.config()     
    ]
    }
}

let number = 1

export function ProjectTabContextMenu()
{
    return{
        view:"contextmenu", 
        id:"projectTabContextMenu",
        data: ["Добавить", "Удалить"]
    }
}
