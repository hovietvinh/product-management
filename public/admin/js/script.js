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
    const inputsPosition = checkboxMulti.querySelectorAll("input[name='position']");
    inputsPosition.forEach(input=>{
        input.addEventListener("change",()=>{
            const inputCheck = input.closest("tr").querySelector("input[name='id']");
            inputCheck.checked=true;
            const formChangeMulti = document.querySelector("[form-change-multi]");
            const select = formChangeMulti.querySelector("select[name='type']")
            select.value = "change-position"
           
        })
    })

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
    formChangeMulti.addEventListener("submit",(e)=>{
        e.preventDefault();
        const checkboxMulti = document.querySelector("[checkbox-multi]");
        const inputsChecked = checkboxMulti.querySelectorAll("input[name=id]:checked");
        if(inputsChecked.length>0){
            const type = e.target.elements.type.value ;
            if(type=="delete-all"){
                const isConfirm = confirm("ban xac thuc muon xoa");
                if(!isConfirm){
                    return;
                }
            }

            let ids ="";
            if(type=="change-position"){
                inputsChecked.forEach(input=>{
                    const pos = input.closest("tr").querySelector("input[name='position']").value;
                    ids+= `${input.value}-${pos},`
                })
            }
            else{
                inputsChecked.forEach(input=>{
                    ids+= input.value +",";
                })
            }
            const inputIds = e.target.elements.ids;
            inputIds.value = ids;
            formChangeMulti.submit();
        }
        else {
            alert("vui long chon it nhat 1 san pham");
        }
        
        


    })
}

//SHOW ALERT 
const showAlert = document.querySelector("[show-alert]");
if(showAlert){
    const time = parseInt(showAlert.getAttribute("data-time"));
    const closeAlert = showAlert.querySelector("[close-alert]");
    closeAlert.addEventListener("click",()=>{
        showAlert.classList.add("alert-hidden");

    })
    setTimeout(()=>{
        showAlert.classList.add("alert-hidden");
    },time)
}


// PREVIEW IMG
const uploadImg = document.querySelector("[upload-image]");
if(uploadImg){
    const inputUploadImg = document.querySelector("[upload-image-input]");
    const ImgUploadImg = document.querySelector("[upload-image-img]");  
    const span = document.querySelector("[button-hidden-preview]");  
    if(!ImgUploadImg.src){
        
        span.classList.remove("btn-hide")
    }
    inputUploadImg.addEventListener("change",(e)=>{
        const [file] = e.target.files;
        if(file){
            ImgUploadImg.src = URL.createObjectURL(file)
            span.classList.remove("btn-hide")
        }
    })
    span.addEventListener("click",(e)=>{
        // console.log(e.target);
        e.target.classList.add("btn-hide");
        ImgUploadImg.src = "";
        inputUploadImg.value = ""
        // inputUploadImg.files.value =""
    })
}

//SORT
const sort = document.querySelector("[sort]");
if(sort){
    const url = new URL(window.location.href);
    const sortSelect = sort.querySelector("[sort-select]");
    const sortClear = sort.querySelector("[sort-clear]");
    sortSelect.addEventListener("change",(e)=>{
        const [sortKey,sortValue] = e.target.value.split("-");
        url.searchParams.set("sortKey",sortKey);
        url.searchParams.set("sortValue",sortValue);
        window.location.href = url.href;
    });
    sortClear.addEventListener("click",(e)=>{
        url.searchParams.delete("sortKey");
        url.searchParams.delete("sortValue");
        window.location.href = url.href;
    })
    const sortKey = url.searchParams.get("sortKey");
    const sortValue = url.searchParams.get("sortValue");

    // const optionChecked = sortSelect.querySelector("option[value='${sortKey}-${sortValue}']");
    if(sortKey && sortValue){
        const optionChecked = sortSelect.querySelector(`option[value='${sortKey}-${sortValue}']`);
        optionChecked.selected = true;
    }
   
    // optionChecked.selected = true;
}
