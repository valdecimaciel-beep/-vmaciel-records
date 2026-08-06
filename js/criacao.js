let tipoAtual='video';
function setTipo(t){tipoAtual=t; document.querySelectorAll('.tab').forEach(b=>b.classList.remove('active')); event.target.classList.add('active');}
async function gerar(){
 const prompt=document.getElementById('prompt').value;
 if(!prompt){alert('Descreva o que quer criar!');return;}
 const resDiv=document.getElementById('resultado');
 resDiv.classList.add('show');
 resDiv.innerHTML='⏳ Gerando seu '+tipoAtual+' com IA...';
 // Simula geração e salva no localStorage + Supabase
 setTimeout(async()=>{
   const item={id:Date.now(),tipo:tipoAtual,prompt:prompt,estilo:document.getElementById('estilo').value,data:new Date().toLocaleDateString()};
   let lista=JSON.parse(localStorage.getItem('vmia_biblioteca')||'[]');
   lista.unshift(item);
   localStorage.setItem('vmia_biblioteca',JSON.stringify(lista));
   // Tenta salvar no Supabase se configurado
   try{ if(SUPABASE_URL.includes('supabase.co') && !SUPABASE_URL.includes('SEU_PROJETO')){ await supabaseClient.from('conteudos').insert([item]); } }catch(e){}
   resDiv.innerHTML='<h3>✅ '+tipoAtual+' criado!</h3><p><b>Prompt:</b> '+prompt+'</p><p>Salvo na sua biblioteca</p><a href="biblioteca.html" class="btn-primary" style="margin-top:10px;display:inline-block">Ver Biblioteca</a>';
 },1500);
}
