(()=>{"use strict";(()=>{let e=document.getElementById("open-auth-btn"),t=document.getElementById("auth-modal"),s=t.querySelectorAll(".close-btn"),o=t.querySelector(".login-btn"),a=document.getElementById("logout-btn"),l=document.getElementById("open-cart-btn"),n=()=>{t.classList.remove("show"),setTimeout((()=>{t.classList.remove("d-block")}),500)},d=()=>{e.classList.add("d-none"),a.classList.remove("d-none"),l.classList.remove("d-none"),n()};e.addEventListener("click",(()=>{t.classList.add("d-block"),setTimeout((()=>{t.classList.add("show")}),200)})),s.forEach((e=>{e.addEventListener("click",n)})),o.addEventListener("click",(()=>{let e=t.querySelector("#login-form"),s=new FormData(e),o=s.get("login"),a=s.get("password");if(o&&a){let e={login:o,password:a};return localStorage.setItem("authData",JSON.stringify(e)),void d()}alert("Введите данные для входа")})),a.addEventListener("click",(()=>{localStorage.removeItem("authData"),e.classList.remove("d-none"),a.classList.add("d-none"),l.classList.add("d-none")})),JSON.parse(localStorage.getItem("authData"))&&d()})()})();