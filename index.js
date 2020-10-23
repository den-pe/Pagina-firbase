//llamada a la bsae
var db = firebase.database();

var update= document.getElementById('update');
update.disable=true;

function value(request){
    return  document.getElementById(request).value;
}
function asignation(request,response){
    return document.getElementById(request).value=response;
}
function printHTML(request,response){
    return document.getElementById(request).innerHTML+=response;
}
function inHTML(request,response){
    return document.getElementById(request).innerHTML=response;
}
//insertamos en la base
function insertTask(matricula, nombre,edad,promedio,sexo){
    db.ref('task/').push({
        matricula:matricula, nombre:nombre,edad:edad,promedio:promedio,sexo:sexo
    });
}

function onClickInsert(){
    var matricula =value("matricula");
    var nombre =value("nombre");
    var edad=value("edad");
    var promedio=value("promedio");
    var sexo=value("sexo");
    if(sexo=="mujer"){
        inHTML("tablaM","");
        insertTask( matricula, nombre,edad,promedio,sexo);
        asignation("matricula","");
        asignation("nombre","");
        asignation("edad","");
        asignation("promedio","");
        asignation("sexo","");
        alert("Guardado");
    }else if(sexo=="hombre"){        
        inHTML("tablaH","");
        insertTask( matricula, nombre,edad,promedio,sexo);
        asignation("matricula","");
        asignation("nombre","");
        asignation("edad","");
        asignation("promedio","");
        asignation("sexo","");
        alert("Guardado");
    }
    
}

function updateTask(matricula,nombre,edad,promedio,sexo,key){
    db.ref('task/'+key).update({
        matricula:matricula, nombre:nombre,edad:edad,promedio:promedio,sexo:sexo
    });
}



function onClickUpdate(){
    var matricula= value("maEdit");
    var nombre= value("nombreEdit");
    var edad= value("edadEdit");
    var promedio= value("promEdit");
    var sexo= value("sexEdit");
    var key= value("key");

    if(sexo=="mujer"){        
        inHTML("tablaM","");
        updateTask(matricula,nombre,edad,promedio,sexo,key);
        inHTML("editData","");
        alert("Modificado");
        update.disable=true;
    }
    if(sexo=="hombre"){        
        inHTML("tablaH","");
        updateTask(matricula,nombre,edad,promedio,sexo,key);
        inHTML("editData","");
        alert("Modificado");
        update.disable=true;
    }
}


function removeTask(key){   
    if(confirm("Seguro de eliminar?")){
        inHTML("tablaH","");
        inHTML("tablaM","");
        db.ref('task/'+key).remove();
    }
}


function table(matricula,nombre,edad,promedio,sexo,key){
    return '<tr><td>'+matricula+'</td><td>'+nombre+'</td><td>'+edad+'</td>'+'</td><td>'+promedio+'</td>'+'</td><td>'+sexo+'</td>'+'</td>'+
    '<td><a href="#" onclick="viewDataUpdate(\''+matricula+'\',\''+nombre+'\',\''+edad+'\',\''+promedio+'\',\''+sexo+'\',\''+key+'\')">'+
    '<i class="fas fa-edit blue icon-lg"></i></a></td>'+
    '<td><a href="#" onclick="removeTask(\''+key+'\')">'+
     '<i class="fas fa-trash-alt red icon-lg"></i></a></td></tr>'; 

}
function viewDataUpdate(matricula,nombre,edad,promedio,sexo,key){
    
    var response = '<div class="form-group"><input type="hidden" value='+key+' id="key">' +
    '<input type="text" id="maEdit" class="form-control" placeholder="matricula" value='+matricula+'>'+
    '<textarea placeholder="DescriptionEdit" class="form-control" id="nombreEdit">'+nombre+'</textarea>'+
    '<textarea placeholder="no me manda la edad" class="form-control" id="edadEdit">'+edad+'</textarea>'+
    '<textarea placeholder="no me manda la promedio" class="form-control" id="promEdit">'+promedio+'</textarea>'+
    '<textarea placeholder="no me manda la sexo" class="form-control" id="sexEdit">'+sexo+'</textarea>'+
    '</div>';
   
    inHTML('editData',response);
    update.disabled = false;
}

var reference = db.ref('task/');   x=0;
y=0;
prom=0;
var reference = db.ref('task/');    
reference.on('value',function(datas){
    var data = datas.val();
    $.each(data, function(nodo, value) {
            var sendData = table(value.matricula,value.nombre,value.edad,value.promedio,value.sexo,nodo);
            if(value.sexo=="mujer"){                                
                printHTML('tablaM',sendData);                
            }else if(value.sexo=="hombre"){
                printHTML('tablaH',sendData);
            }
            x++;
            if(isNaN(parseInt(data))){
                y++;
            }
            prom+=parseInt(value.promedio);
    });
    if(x==y){
        prom=prom/x;
        printHTML("promGral",prom);
        
        printHTML("aux",x);
        //alert("Num"+x+"Promedio"+ prom);
        x=0;
        y=0;
        prom=0;  
    }       
}); 
reference.on('value',function(datas){
    var data = datas.val();
    $.each(data, function(nodo, value) {
            var sendData = table(value.matricula,value.nombre,value.edad,value.promedio,value.sexo,nodo);
            if(value.sexo=="mujer"){                                
                printHTML('tablaM',sendData);                
            }else if(value.sexo=="hombre"){
                printHTML('tablaH',sendData);
            }
    });       
});
function busca(){
    var buscar= value("buscar");
    var reference= db.ref('task');
    reference.on('value',function(datas){
        var data=datas.val();
        inHTML("tablaM","");
        $.each(data,function(nodo,value){
            var senData=table(value.matricula,value.nombre,value.edad,value.promedio,value.sexo,nodo);            
                if(buscar==""){                   
                        printHTML('tablaM',senData);                     
                }else if((value.matricula==buscar)){
                    console.log(""+value.matricula+""+""+value.nombre+""+value.edad+""+""+value.promedio+""+""+value.sexo);
                        printHTML('tablaM',senData);                     
                }            
        });
    });
}   
function buscar(){
    var busca= value("busca");
    var reference= db.ref('task');
    reference.on('value',function(datas){
        var data=datas.val();
        inHTML("tablaH","");
        $.each(data,function(nodo,value){
            var senData=table(value.matricula,value.nombre,value.edad,value.promedio,value.sexo,nodo);            
                if(busca==""){                   
                        printHTML('tablaH',senData);                     
                }else if((value.matricula==busca)){
                        printHTML('tablaH',senData);                     
                }            
        });
    });
}




