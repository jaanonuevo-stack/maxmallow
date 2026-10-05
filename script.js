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
  lb.innerHTML='<button type="button">close ✧</button><figure><div class="slot"></div><figcaption></figcaption><p class="hint"></p></figure>';
  document.body.appendChild(lb);
  const slot=lb.querySelector(".slot"), cap=lb.querySelector("figcaption"), btn=lb.querySelector("button"), hint=lb.querySelector(".hint");
  const HINT_IN="Tap the image to zoom in and read the details", HINT_OUT="Tap the image to see the full page again";
  let last=null;
  function open(el){
    last=el; slot.innerHTML="";
    const img=new Image(); img.alt=el.dataset.cap||"";
    img.onload=()=>{slot.innerHTML="";slot.appendChild(img);const tall=img.naturalHeight/img.naturalWidth>1.8;lb.classList.toggle("tall",tall);lb.classList.remove("zoom");hint.textContent=HINT_IN;lb.scrollTop=0;if(tall){img.addEventListener("click",()=>{const z=lb.classList.toggle("zoom");hint.textContent=z?HINT_OUT:HINT_IN;lb.scrollTop=0;});}};
    img.onerror=()=>{slot.innerHTML='<div class="none">⋆.𐙚<br>Add your image at<br><b>'+el.dataset.full+'</b></div>'};
    img.src=el.dataset.full;
    cap.textContent=el.dataset.cap||"";
    lb.classList.add("open"); btn.focus();
  }
  function close(){lb.classList.remove("open","tall","zoom"); if(last) last.focus();}
  items.forEach(el=>{
    el.addEventListener("click",()=>open(el));
    el.addEventListener("keydown",e=>{if(e.key==="Enter"||e.key===" "){e.preventDefault();open(el);}});
  });
  btn.addEventListener("click",close);
  lb.addEventListener("click",e=>{if(e.target===lb) close();});
  document.addEventListener("keydown",e=>{if(e.key==="Escape") close();});
})();

// contact form: sends straight to the owner's inbox through Formspree.
// Paste your Formspree form link ID below (the part after /f/). Until then it falls back to opening an email draft.
const FORMSPREE_ID = "moejagjo";

const form=document.getElementById("contactForm");
if(form){
  const status=document.getElementById("formStatus");
  const sendBtn=form.querySelector("button[type=submit]");
  function say(msg,ok){ if(!status) return; status.textContent=msg; status.className="form-status "+(ok?"ok":"bad"); }
  form.addEventListener("submit",async e=>{
    e.preventDefault();
    const d=new FormData(form);
    if(!FORMSPREE_ID){
      const body="From: "+d.get("name")+" ("+d.get("email")+")\n\n"+d.get("message");
      location.href="mailto:"+MY_EMAIL+"?subject="+encodeURIComponent(d.get("subject"))+"&body="+encodeURIComponent(body);
      return;
    }
    d.set("_subject",d.get("subject"));
    sendBtn.disabled=true; sendBtn.textContent="Sending ✧"; say("",true);
    try{
      const r=await fetch("https://formspree.io/f/"+FORMSPREE_ID,{method:"POST",body:d,headers:{Accept:"application/json"}});
      if(r.ok){ form.reset(); say("Message sent! Thank you ♡ I'll reply soon. ⋆.𐙚",true); }
      else{ say("Oops, the message didn't send. Please try again, or email me directly at "+MY_EMAIL+".",false); }
    }catch(err){
      say("Oops, no connection. Please try again, or email me directly at "+MY_EMAIL+".",false);
    }
    sendBtn.disabled=false; sendBtn.textContent="Send message ✧";
  });
}

// floating "back to portfolio" button appears after scrolling
(function(){
  const bf=document.querySelector(".back-float"); if(!bf) return;
  const t=()=>bf.classList.toggle("show",window.scrollY>240);
  window.addEventListener("scroll",t,{passive:true}); t();
})();
