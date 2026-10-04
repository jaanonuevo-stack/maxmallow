// ===== EDIT THIS: the email that receives messages from the contact form =====
const MY_EMAIL = "jaanonuevo@ccc.edu.ph";

// sparkles
(function(){
  const sky=document.getElementById("sky"); if(!sky) return;
  const marks=["✧","⋆","˚","₊","𐙚","۶ৎ"];
  for(let i=0;i<26;i++){
    const s=document.createElement("span");
    s.textContent=marks[i%marks.length];
    s.style.left=Math.random()*100+"%";
    s.style.top=Math.random()*100+"%";
    s.style.fontSize=(10+Math.random()*16)+"px";
    s.style.animationDelay=(Math.random()*5)+"s";
    s.style.animationDuration=(4+Math.random()*4)+"s";
    sky.appendChild(s);
  }
})();

// year
const yr=document.getElementById("yr"); if(yr) yr.textContent=new Date().getFullYear();

// lightbox
(function(){
  const items=document.querySelectorAll("[data-full]"); if(!items.length) return;
  const lb=document.createElement("div"); lb.className="lb"; lb.setAttribute("role","dialog"); lb.setAttribute("aria-modal","true");
  lb.innerHTML='<button type="button">close ✧</button><figure><div class="slot"></div><figcaption></figcaption></figure>';
  document.body.appendChild(lb);
  const slot=lb.querySelector(".slot"), cap=lb.querySelector("figcaption"), btn=lb.querySelector("button");
  let last=null;
  function open(el){
    last=el; slot.innerHTML="";
    const img=new Image(); img.alt=el.dataset.cap||"";
    img.onload=()=>{slot.innerHTML="";slot.appendChild(img);lb.classList.toggle("tall",img.naturalHeight/img.naturalWidth>1.5)};
    img.onerror=()=>{slot.innerHTML='<div class="none">⋆.𐙚<br>Add your image at<br><b>'+el.dataset.full+'</b></div>'};
    img.src=el.dataset.full;
    cap.textContent=el.dataset.cap||"";
    lb.classList.add("open"); btn.focus();
  }
  function close(){lb.classList.remove("open","tall"); if(last) last.focus();}
  items.forEach(el=>{
    el.addEventListener("click",()=>open(el));
    el.addEventListener("keydown",e=>{if(e.key==="Enter"||e.key===" "){e.preventDefault();open(el);}});
  });
  btn.addEventListener("click",close);
  lb.addEventListener("click",e=>{if(e.target===lb) close();});
  document.addEventListener("keydown",e=>{if(e.key==="Escape") close();});
})();

// contact form -> opens the visitor's email app
const form=document.getElementById("contactForm");
if(form){
  form.addEventListener("submit",e=>{
    e.preventDefault();
    const d=new FormData(form);
    const body="From: "+d.get("name")+" ("+d.get("email")+")\n\n"+d.get("message");
    location.href="mailto:"+MY_EMAIL+"?subject="+encodeURIComponent(d.get("subject"))+"&body="+encodeURIComponent(body);
  });
}
