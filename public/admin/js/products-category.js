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