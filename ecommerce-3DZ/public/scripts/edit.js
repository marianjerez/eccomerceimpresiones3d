window.addEventListener("load",function(){
    
    let formularioedit = document.querySelector(".formularioedit");
    formularioedit.addEventListener('submit',function(e){ 

        let errores = [];

        let inputName = document.querySelector('input#name');
            if (inputName.value == " "){
               errores.push("Campo nombre vacio");
            } else if (inputName.value.length < 3){
                errores.push("El nombre debe tener al menos 4 caracteres")
            }

        let inputPrice = document.querySelector('input#price');
            if (inputPrice.value == " "){
                errores.push("Campo precio vacio");
            } else if (inputPrice.value < 0){
                errores.push("No se admiten precios con valores negativos")
            }
        
        
        if(errores.length > 0){
            e.preventDefault();
            let divErrores = document.querySelector('div.errores ul');
            divErrores.innerHTML = "";
            for(i=0; i<errores.length; i++){
                divErrores.innerHTML += "<li>" + errores[i] + "</li>"
            }
        }

    })
})