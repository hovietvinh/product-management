//CHANGE STATUS
const buttonsChangeStatus = document.querySelectorAll("[button-change-status]");
if(buttonsChangeStatus.length>0){
    const formStatus = document.querySelector("#form-change-status");
    const path = formStatus.getAttribute("data-path");
    buttonsChangeStatus.forEach(button=>{
        button.addEventListener("click",()=>{
            const status = button.getAttribute("data-status")
            const id = button.getAttribute("data-id")
            const statusChange = status == "active" ? "inactive":"active";
            const action = path +`/${statusChange}/${id}?_method=PATCH`;
            formStatus.action = action;
            formStatus.submit();
        })
    })
}

// DELETE ITEM
const buttonsDelete = document.querySelectorAll("[button-delete]");
if(buttonsDelete.length>0){
    const formDelete = document.querySelector("#form-delete-item");
    const path = formDelete.getAttribute("data-path");
    buttonsDelete.forEach(button=>{
        button.addEventListener("click",()=>{
            const isConfirm = confirm("ban xac nhan xoa");
            if(isConfirm){
                const id = button.getAttribute("data-id");
                const action = `${path}/${id}?_method=DELETE`;
                formDelete.action = action;
                formDelete.submit();
            }
            

        })
    })
}