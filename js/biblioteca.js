function carregar(){
 const grid=document.getElementById('grid');
 const vazio=document.getElementById('vazio');
 let lista=JSON.parse(localStorage.getItem('vmia_biblioteca')||'[]');
 document.getElementById('total').innerText=lista.length+' itens';
 if(lista.length===0){grid.style.display='none';vazio.style.display='block';return;}
 vazio.style.display='none';grid.style.display='grid';
 grid.innerHTML='';
 lista.forEach(item=>{
   const card=document.createElement('div');
   card.className='video-card';
   card.innerHTML='<div class="video-thumb">'+(item.tipo==='video'?'🎬':'🎵')+'</div><div class="video-info"><h3>'+item.prompt.substring(0,40)+'</h3><div class="video-meta"><span>'+item.tipo+'</span><span>'+item.data+'</span></div><div class="video-actions"><button class="btn-action btn-baixar">Baixar</button><button class="btn-action btn-excluir" onclick="excluir('+item.id+')">Excluir</button></div></div>';
   grid.appendChild(card);
 });
}
function filtrar(tipo){
 document.querySelectorAll('.filtro-btn').forEach(b=>b.classList.remove('active')); event.target.classList.add('active');
 let lista=JSON.parse(localStorage.getItem('vmia_biblioteca')||'[]');
 if(tipo!=='todos') lista=lista.filter(i=>i.tipo===tipo);
 document.getElementById('grid').innerHTML='';
 if(lista.length===0){document.getElementById('vazio').style.display='block';document.getElementById('grid').style.display='none';return;}
 document.getElementById('vazio').style.display='none';document.getElementById('grid').style.display='grid';
 const grid=document.getElementById('grid');
 lista.forEach(item=>{
   const card=document.createElement('div');card.className='video-card';
   card.innerHTML='<div class="video-thumb">'+(item.tipo==='video'?'🎬':'🎵')+'</div><div class="video-info"><h3>'+item.prompt.substring(0,40)+'</h3><div class="video-meta"><span>'+item.tipo+'</span><span>'+item.data+'</span></div></div>';
   grid.appendChild(card);
 });
}
function excluir(id){ let lista=JSON.parse(localStorage.getItem('vmia_biblioteca')||'[]'); lista=lista.filter(i=>i.id!==id); localStorage.setItem('vmia_biblioteca',JSON.stringify(lista)); carregar(); }
document.addEventListener('DOMContentLoaded',carregar);
