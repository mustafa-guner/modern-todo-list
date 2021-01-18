
//For disabling all form element attributes
function disablingAllFormInputs(){
    for(let i = 0;i<form.elements.length;i++){
        form.elements[i].readOnly = true;
    }
    addBtn.disabled = true;
}

//For enabling all form element attributes
function EnablingAllFormInputs(){
    for(let i = 0;i<form.elements.length;i++){
        form.elements[i].readOnly = false;
    }
    addBtn.disabled = false;
}