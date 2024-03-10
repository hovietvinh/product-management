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