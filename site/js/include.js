async function loadPartial(id, path){
  const el=document.getElementById(id);
  if(!el) return;
  try{ const r=await fetch(path); el.innerHTML=await r.text(); }catch(e){}
}
loadPartial('header','/site/partials/header.html');
loadPartial('footer','/site/partials/footer.html');
