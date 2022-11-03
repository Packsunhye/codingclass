hljs.highlightAll();

//탭 메뉴
const SCbtn = document.querySelectorAll(".menu-bar > span")
const SCbox = document.querySelectorAll(".content .main > div")

SCbtn.forEach((el,i)=>{
    el.addEventListener("click", (event)=>{
        event.preventDefault();

        SCbtn.forEach(li => {
            li.classList.remove("active");
        });
        el.classList.add("active");

        SCbox.forEach(span => {
            span.style.display = "none" ;
        })

        SCbox[i].style.display = "block";
    })
});



//나오게 하기
const WbTn = document.querySelector(".icon6");
const SCcont = document.querySelector(".window");
const SCclose = document.querySelector(".window .close");

WbTn.addEventListener("click", ()=> {
    SCcont.classList.add("show");
    SCcont.classList.remove("hide");
});

SCclose.addEventListener("click", ()=> {
    SCcont.classList.add("hide");
    SCcont.classList.remove("show")
})


