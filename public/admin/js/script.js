// BUTTON STATUS 
const buttonStatus = document.querySelectorAll("[button-status]");
if(buttonStatus.length>0){
    const url = new URL(window.location.href);
    buttonStatus.forEach(button=>{
        button.addEventListener("click",()=>{
            const status = button.getAttribute("button-status");
            console.log(status);
            if(status){
                url.searchParams.set("status",status)
            } 
            else{
                url.searchParams.delete("status");
            }
            window.location.href = url.href
        })
    })
}


// FORM SEARCH 
const formSearch = document.querySelector("#form-search");
if(formSearch){
    const url = new URL(window.location.href);
    formSearch.addEventListener("submit",(e)=>{
        e.preventDefault();
        const keyword = e.target.elements.keyword.value;
        if(keyword){
            url.searchParams.set("keyword",keyword);
        }
        else {
            url.searchParams.delete("keyword");
        }
        window.location.href = url.href
    })
}

// PAGINATION
const buttonsPagination = document.querySelectorAll("[button-pagination]");
if(buttonsPagination.length>0){
    const url = new URL(window.location.href);
    buttonsPagination.forEach(button=>{
        button.addEventListener("click",()=>{
            const page =button.getAttribute("button-pagination");
            url.searchParams.set("page",page);
            window.location.href = url.href;
        })
    })
}

// CHANGE-MULTI
const checkboxMulti = document.querySelector("[checkbox-multi]");
if(checkboxMulti){
    const inputCheckAll = checkboxMulti.querySelector("input[name='checkAll']");
    const inputsCheck = checkboxMulti.querySelectorAll("input[name='id']");
    inputCheckAll.addEventListener("click",()=>{
        if(inputCheckAll.checked){
            inputsCheck.forEach(input=>{
                input.checked=true
            })
        }
        else {
            inputsCheck.forEach(input=>{
                input.checked=false
            })
        }     
    })
    inputsCheck.forEach(input=>{
        input.addEventListener("click",()=>{
            const countChecked = checkboxMulti.querySelectorAll("input[name=id]:checked").length;
            const countInputs = inputsCheck.length;
            if(countChecked==countInputs){
                inputCheckAll.checked=true;
            }
            else{
                inputCheckAll.checked=false;
            }
        })
    })
}

// FORM-CHANGE-MULTI
const formChangeMulti = document.querySelector("[form-change-multi]");
if(formChangeMulti){
    console.log(formChangeMulti);
    formChangeMulti.addEventListener("submit",(e)=>{
        e.preventDefault();
        const checkboxMulti = document.querySelector("[checkbox-multi]");
        const inputsChecked = checkboxMulti.querySelectorAll("input[name=id]:checked");
        if(inputsChecked.length>0){
            let ids ="";
            inputsChecked.forEach(input=>{
                ids+= input.value +",";
            })
            const inputIds = e.target.elements.ids;
            inputIds.value = ids;
            formChangeMulti.submit();
        }
        else {
            alert("vui long chon it nhat 1 san pham");
        }
        
        


    })
}