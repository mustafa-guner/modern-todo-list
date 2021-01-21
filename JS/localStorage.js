
class LocalStorage {
    constructor() {

    }
    //Getting Datas From Local Storage and testing if it is exists.
    static getItemsFromLocalStorage(key) {
        let tasks; 

        if (localStorage.getItem(key) === null) {

            tasks = [];
            
        } else {
            tasks = JSON.parse(localStorage.getItem(key));
        }

        return tasks;
    }

    //Adding new items to local storage.
    static addItemsToLocalStorage(storeData,keyOfStoredData) {
        let data = this.getItemsFromLocalStorage(keyOfStoredData);

        data.push(storeData);
    
        localStorage.setItem(keyOfStoredData,JSON.stringify(data));

        //Sending key to UI
        UI.createSavedList(keyOfStoredData);
    }




    //Saving datas to localstorage on save button click
static saveToLocalStorage() {
   
    let saveData = tasklist.childNodes;
    let saveDataInformations = [];
    saveData.forEach(data => {
        if (data.nodeType === 1) {
            data.childNodes.forEach((element, index) => {
                if (index >= 3 && index <= 9 && element.firstChild !== null) {
                    saveDataInformations.push(element.firstChild.value); //[] 
                };
            })
        }
    });

    return new Promise((resolve, reject) => {
        if (saveDataInformations.length !== 0) {
            resolve(saveDataInformations)
        } else {
            reject("Cant Save Empty List");
        }


    }).then(saveDataInformations => {
        let result = [];
        const wordsPerLine = 4;

        for (let line = 0; line < saveDataInformations.length; line += wordsPerLine) {
            let lineWords = [];
            for (let i = 0; i < wordsPerLine; i++) {
                const value = saveDataInformations[line + i];
                lineWords.push(value);

            }
            result.push(lineWords);
        }

        //Value of header for the key of the local storage and the rest of data.
       this.addItemsToLocalStorage(result, taskHeader.innerText);
    }).then(Swal.fire({
        position: 'top-center',
        icon: 'success',
        title: 'Saved',
        showConfirmButton: false,
        timer: 1500
      })).catch((err)=>{
        UI.error(err);
    })
}


    static deleteFromListStorage(){
        //Deleting task elements according to the name of the list
        let taskList = document.getElementById("tasklist");
        let nameOfList = LocalStorage.getItemsFromLocalStorage(taskList);
        console.log(nameOfList)
    }


    //Deletes all rows from list exept header.
    static deleteFromTableList(listKey){

        if(listKey){
           
            let specifiedList = this.getItemsFromLocalStorage(listKey);
            const swalWithBootstrapButtons = Swal.mixin({
                customClass: {
                  confirmButton: 'btn btn-success',
                  cancelButton: 'btn btn-danger'
                },
                buttonsStyling: false
              })
              swalWithBootstrapButtons.fire({
                title: 'Are you sure?',
                text: "You won't be able to revert this!",
                icon: 'warning',
                showCancelButton: true,
                confirmButtonText: 'Yes, delete it!',
                cancelButtonText: 'No, cancel!',
                reverseButtons: true
              }).then((result) => {
                if (result.isConfirmed) {

                    let deletedNewArr = specifiedList.slice(1)
                    UI.deleteAllFromUI()
         
                     localStorage.setItem(listKey,JSON.stringify(deletedNewArr))
                   
                    swalWithBootstrapButtons.fire(
                    'Deleted!',
                    'Your file has been deleted.',
                    'success'
                  )
                } else if (
                  /* Read more about handling dismissals below */
                  result.dismiss === Swal.DismissReason.cancel
                ) {
                  swalWithBootstrapButtons.fire(
                    'Cancelled',
                    'Your imaginary file is safe :)',
                    'error'
                  )
                }
              })
            
        } else{
            UI.error("Cant Delete Empty List!")
        }
        
    }
    


    //Delete single row from list
    static deleteSingleDataRow(listKey){
        const taskHeader = document.getElementById("taskHeader");
        let deletedArr = [];
        let specifiedList = this.getItemsFromLocalStorage(taskHeader.innerText);
       
       
        localStorage.setItem(specifiedList,JSON.stringify(deletedArr))
    }

}

