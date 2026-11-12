/* Davix Ninja Chat: demo local de perguntas frequentes, NÃO um modelo de IA. */
(() => {
  'use strict';
  if (document.getElementById('davix-ninja-app')) return;
  // O dono do site pode trocar o destaque manualmente quando quiser.
  const HUB_EM_DESTAQUE = 'Quantum Hub';
  const url = name => name;
  const app = document.createElement('div');
  app.id = 'davix-ninja-app';
  const ninja = `<svg class="dn-ninja" viewBox="0 0 100 100" aria-hidden="true" xmlns="http://www.w3.org/2000/svg">
    <defs><linearGradient id="dn-hood" x1="0" x2="1" y2="1"><stop stop-color="#9d1745"/><stop offset=".6" stop-color="#451020"/><stop offset="1" stop-color="#180b16"/></linearGradient></defs>
    <path d="M50 5C23 13 10 36 10 61c0 21 17 35 40 35s40-14 40-35C90 35 77 13 50 5Z" fill="url(#dn-hood)" stroke="#ff5275" stroke-width="3.6"/>
    <path d="M14 53 25 38l25-10 25 10 11 15-11 27-25 9-25-9Z" fill="#130c16" stroke="#64203a" stroke-width="2"/>
    <path class="dn-eye" d="M19 50 45 56 41 64 29 62Z" fill="#ff5478"/><path class="dn-eye" d="M81 50 55 56 59 64 71 62Z" fill="#ff5478"/>
    <path d="M33 73 50 80 67 73" stroke="#ee355e" stroke-width="2" fill="none" stroke-linecap="round"/>
    <path d="M15 54 9 45M85 54 91 45" stroke="#ff6786" stroke-width="2"/>
  </svg>`;
  app.innerHTML = `
    <button class="dn-launcher" type="button" aria-label="Abrir chat com Davix Ninja" aria-expanded="false" aria-controls="dn-panel">${ninja}<span class="dn-launcher-badge">CHAT</span></button>
    <section class="dn-panel" id="dn-panel" role="dialog" aria-label="Davix Ninja - Assistente do site" hidden>
      <div class="dn-head">${ninja}<div class="dn-heading"><strong>DAVIX NINJA</strong><small>ASSISTENTE DO SITE • DEMO</small></div><button class="dn-close" type="button" aria-label="Fechar chat">×</button></div>
      <div class="dn-messages" role="log" aria-live="polite" aria-relevant="additions text"></div>
      <div class="dn-quick"><button type="button" data-q="Qual o melhor script grátis de Blox Fruits?">Melhor script grátis?</button><button type="button" data-q="Como pegar a key do Delta?">Key do Delta</button><button type="button" data-q="Qual o melhor executor para PC?">Melhor executor PC?</button><button type="button" data-q="Tenho dúvidas, como abrir um ticket?">Abrir ticket</button></div>
      <form class="dn-form"><input type="text" aria-label="Escreva para o Davix Ninja" maxlength="250" autocomplete="off" placeholder="Pergunte algo sobre o site..." required><button type="submit" aria-label="Enviar mensagem">Enviar</button></form>
      <div class="dn-note">Respostas programadas • Não é uma IA conectada</div>
    </section>`;
  document.body.appendChild(app);
  const launcher = app.querySelector('.dn-launcher');
  const panel = app.querySelector('.dn-panel');
  const closer = app.querySelector('.dn-close');
  const log = app.querySelector('.dn-messages');
  const form = app.querySelector('.dn-form');
  const field = form.querySelector('input');
  const clean = s => s.normalize('NFD').replace(/[\u0300-\u036f]/g, '').toLowerCase().trim();
  const makeLink = (href, label) => ({href, label});

  function addMessage(message, sender='bot', links=[]) {
    const bubble = document.createElement('div');
    bubble.className = 'dn-bubble' + (sender === 'user' ? ' dn-user' : '');
    const tag = document.createElement('span');tag.className = 'dn-message-tag';tag.textContent = sender === 'user' ? 'VOCÊ' : 'DAVIX NINJA';
    bubble.appendChild(tag);
    const body = document.createElement('span');body.textContent = message;bubble.appendChild(body);
    if(links.length){
      const footer = document.createElement('div');footer.style.marginTop='9px';footer.style.display='flex';footer.style.flexWrap='wrap';footer.style.gap='12px';
      links.forEach(l => {const a=document.createElement('a');a.href=l.href;a.textContent=l.label;
        if(l.href.startsWith('https://')){a.target='_blank';a.rel='noopener noreferrer';}
        footer.appendChild(a);});bubble.appendChild(footer);
    }
    log.appendChild(bubble);log.scrollTop=log.scrollHeight;
  }
  function reply(question){
    const q = clean(question);
    const discord = [makeLink('https://discord.gg/7Sf28AV9WZ','Ir para o Discord ↗')];
    const talksAboutDelta = q.includes('delta');
    const talksAboutKey = q.includes('key') || q.includes('chave') || q.includes('codigo') || q.includes('pegar') || q.includes('obter');
    // FAQ solicitada: a resposta apenas encaminha para o Discord; não ensina a obter keys.
    if (talksAboutDelta && talksAboutKey) {
      return {text:'Para informações sobre a key do Delta, vá no nosso Discord.', links:discord};
    }
    if (q.includes('ticket') || q.includes('chamado') || q.includes('abrir suporte') || q.includes('tenho duvida') || q.includes('tenho uma duvida')) {
      return {text:'Tem dúvidas? Abra um ticket no nosso Discord.', links:discord};
    }
    if ((q.includes('melhor') || q.includes('recomend') || q.includes('qual') || q.includes('indica')) && (q.includes('executor') || q.includes('executores')) && (q.includes('pc') || q.includes('computador') || q.includes('windows'))) {
      return {text:'Na indicação da Davix Scripts, o Real Executor é a opção em destaque para PC. Essa é uma recomendação do site, não um ranking verificado em tempo real.', links:[makeLink('executores-pc.html','Ver executores para PC ↗')]};
    }
    if ((q.includes('melhor') || q.includes('recomend') || q.includes('qual') || q.includes('indica') || q.includes('gratis') || q.includes('gratuito')) && (q.includes('blox') || q.includes('fruits') || q.includes('script') || q.includes('hub'))) {
      return {text:'O melhor script grátis, segundo a indicação da Davix Scripts, é o Quantum Hub! Essa é a sugestão do catálogo, não um ranking atualizado em tempo real.', links:[makeLink('blox-fruits.html','Ver Quantum Hub em Blox Fruits ↗')]};
    }
    if(q.includes('blox') || q.includes('fruits'))return {text:'Temos 7 hubs cadastrados para Blox Fruits! Entre na página para explorar as opções.',links:[makeLink('blox-fruits.html','Abrir Blox Fruits ↗')]};
    if(q.includes('king') || q.includes('legacy'))return {text:'King Legacy tem 3 hubs no catálogo. Acesse a categoria para conferir.',links:[makeLink('king-legacy.html','Abrir King Legacy ↗')]};
    if(q.includes('ovo') || q.includes('egg') || q.includes('lennon'))return {text:'Roube Um Ovo tem Lennon Hub, BK Hub e Tsuo Hub no catálogo.',links:[makeLink('roube-um-ovo.html','Ver Roube Um Ovo ↗')]};
    if(q.includes('discord') || q.includes('suporte') || q.includes('contato') || q.includes('duvida'))return {text:'Tem dúvidas? Abra um ticket no nosso Discord.',links:discord};
    if(q.includes('execut') || q.includes('mobile') || q.includes('celular') || q.includes('pc'))return {text:'As categorias de executores estão separadas em Mobile e PC. Confira informações de procedência e segurança antes de instalar programas de terceiros.',links:[makeLink('executores.html','Ver executores ↗')]};
    if(q.includes('copiar') || q.includes('codigo') || q.includes('como usar'))return {text:'Abra Scripts, escolha o jogo e use o botão COPIAR SCRIPT no hub desejado. Evite executar código de origem desconhecida.',links:[makeLink('scripts.html','Ir para Scripts ↗')]};
    if(q.includes('script') || q.includes('jogo') || q.includes('hubs'))return {text:'O catálogo está dividido em Blox Fruits, King Legacy e Roube Um Ovo. Qual desses jogos você procura?',links:[makeLink('scripts.html','Abrir Scripts ↗')]};
    if(q.includes('oi') || q.includes('ola') || q.includes('bom dia') || q.includes('boa noite'))return {text:'Salve! 🥷 Sou o Davix Ninja. Posso te guiar pelos scripts, jogos e redes sociais do site. O que você quer encontrar?'};
    return {text:'Sou o Davix Ninja! Tenho respostas programadas sobre scripts, executores e suporte. Experimente perguntar “Qual o melhor script grátis?”, “Qual o melhor executor PC?” ou “Como abrir ticket?”.'};
  }
  function send(q){const text=q.trim();if(!text)return;addMessage(text,'user');const result=reply(text);addMessage(result.text,'bot',result.links);}
  let greeted=false;
  function setOpen(open){panel.hidden=!open;launcher.setAttribute('aria-expanded',String(open));launcher.setAttribute('aria-label',open?'Fechar chat com Davix Ninja':'Abrir chat com Davix Ninja');
    if(open){if(!greeted){addMessage('Olá! Sou o Davix Ninja 🥷. Pergunte sobre scripts grátis, executores, key do Delta ou tickets no Discord!');greeted=true;}field.focus();}else launcher.focus();}
  launcher.addEventListener('click',()=>setOpen(panel.hidden));
  closer.addEventListener('click',()=>setOpen(false));
  app.querySelectorAll('[data-q]').forEach(btn=>btn.addEventListener('click',()=>send(btn.dataset.q)));
  form.addEventListener('submit',e=>{e.preventDefault();send(field.value);field.value='';field.focus();});
  document.addEventListener('keydown',e=>{if(e.key==='Escape'&&!panel.hidden)setOpen(false);});
})();
