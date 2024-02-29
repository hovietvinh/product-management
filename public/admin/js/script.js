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