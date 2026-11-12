/* EDIT YOUR BUSINESS DETAILS AND SERVICE CONTENT HERE.
   Images are local paths relative to index.html. No build or server required. */
const BUSINESS = {
  name: 'APW Gas Limited', phone: '07451 296165', phoneLink: '+447451296165',
  email: 'info@apwgas.uk', domain: 'apwgas.uk', companyNumber: '09591386',
  address: '16 Poplar Grove, Maidstone, Kent, England, ME16 0DE',
  areas: ['London', 'Kent', 'Surrey', 'Hampshire', 'Wiltshire', 'Berkshire', 'Hertfordshire', 'Essex', 'Cambridgeshire', 'Norfolk', 'Suffolk', 'East Sussex', 'West Sussex'],
  services: [
    {id:'commercial-heating', title:'Commercial gas & heating', image:'assets/heating-system.webp', alt:'Hot water cylinder and heating pipework', summary:'Commercial heating systems, plant rooms and hot water installations.', intro:'Heating and gas installations for commercial buildings, from complete plant rooms to individual appliances. We work on new and existing sites across London and the South of England.', items:['Complete heating systems and plant rooms','Heating boilers, radiators and fan convectors','Heating pumps, pressurisation units and expansion tanks','Gas-fired water heaters and radiant heating panels','Direct and indirect fired commercial appliances','Control valves, pressure vessels and welded alterations']},
    {id:'plumbing', title:'Commercial & domestic plumbing', image:'assets/plumber-working.webp', alt:'Plumber working on sink pipework', summary:'Hot and cold water services, plumbing installations and water mains.', intro:'Plumbing and water services for commercial and domestic properties. Talk to us about your installation, alteration or wider site requirements.', items:['Hot and cold water services','Hot water cylinders and cold water storage tanks','Water mains in plastic, steel and copper','Underground water pipework and supplies','Copper, galvanised and plastic pipework','Risers and water down services']},
    {id:'boilers', title:'Boiler services & installation', image:'assets/boiler-installation.webp', alt:'Wall mounted boiler with copper connections', summary:'Boiler installations, servicing and maintenance for businesses and homes.', intro:'Commercial and domestic boiler services, including installation, servicing and maintenance. Contact APW to discuss your boiler, the property and the work required.', items:['Boiler installation','Boiler servicing and maintenance','Commercial boiler and plant room installations','Associated heating pumps and controls','Hot water systems and cylinders']},
    {id:'gas-pipework', title:'Commercial gas pipework', image:'assets/gas_pipework.jpg', alt:'Commercial gas main installation on site', summary:'Gas mains, underground PE systems and welded pipework installations.', intro:'Specialist design and installation of commercial gas main systems. Our work covers gas pipework specification, sizing, installation and commissioning for new and existing sites.', items:['Gas main design, sizing and installation','Underground PE and MDPE fusion welded pipework','Mild steel and stainless steel welded pipework','Meter installation and connection','Solenoid installation','Gas equipment and pipework specification']},
    {id:'testing-purging', title:'Testing & purging', image:'assets/gas_pipework.jpg', alt:'Gas pipework installed on a commercial site', summary:'Strength testing, tightness testing, commissioning and decommissioning.', intro:'Commercial gas testing and purging for installations of any size. Work is carried out in accordance with IGEM regulations and utilisation procedures.', items:['On-site strength and tightness testing','Air-to-gas and gas-to-air purging','Commissioning and certification','Decommissioning, purging and certification','Pipework decommissioning','Hot tapping purge points where necessary for decommissioning']},
    {id:'welding', title:'Welding & fabrication', image:'assets/commercial_welding.jpg', alt:'Engineer welding commercial pipework', summary:'Commercial pipe fitting, welded alterations and on- and off-site fabrication.', intro:'Welding and fabrication for commercial gas, heating and water pipework. Discuss the pipework, materials and site requirements with our team.', items:['Mild steel and stainless steel welded pipework','On- and off-site fabrication','Commercial pipe fitting','Welded alterations','Underground PE plastic fusion welded gas installations','Chilled pipework and chilled plant']}
  ],
  faqs: [
    ['Do you work on commercial and domestic properties?', 'Yes. Commercial work is our main focus, alongside domestic plumbing and boiler services. Call to discuss the work you need.'],
    ['Which areas do you cover?', 'We are based in Maidstone and work across London and the South of England. We also travel nationwide for projects.'],
    ['Can you help with new and existing sites?', 'Yes. Gas and water services for new and existing sites are a particular focus, including installation, testing and commissioning.'],
    ['What should I include in an enquiry?', 'Tell us the site location, whether it is commercial or domestic, the service required and any relevant project details. Call or prepare an email using the form below.']
  ]
};
/* SITE BEHAVIOUR — content above can be edited independently. */
'use strict';
const $ = s => document.querySelector(s);
const escapeHTML = value => String(value).replace(/[&<>"']/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
function bindContacts(root=document){
  root.querySelectorAll('[data-phone]').forEach(a=>{a.href='tel:'+BUSINESS.phoneLink; if(a.textContent.includes('07451')) a.textContent=(a.textContent.startsWith('Call')?'Call ':'')+BUSINESS.phone;});
  root.querySelectorAll('[data-email]').forEach(a=>{a.href='mailto:'+BUSINESS.email;a.textContent=BUSINESS.email;});
}
bindContacts();
document.querySelectorAll('[data-address]').forEach(el=>el.textContent=BUSINESS.address);
$('[data-company]').textContent=BUSINESS.name;
$('[data-number]').textContent=BUSINESS.companyNumber;
$('#year').textContent=new Date().getFullYear();
$('#service-grid').innerHTML=BUSINESS.services.map((s,i)=>`<a class="service-card" href="#service/${s.id}"><img src="${escapeHTML(s.image)}" alt="${escapeHTML(s.alt)}" width="640" height="420" loading="lazy"><span class="number">0${i+1} / OUR SERVICES</span><h3>${escapeHTML(s.title)}</h3><p>${escapeHTML(s.summary)}</p><span class="text-link">View service</span></a>`).join('');
$('#area-list').innerHTML=BUSINESS.areas.map(a=>`<li>${escapeHTML(a)}</li>`).join('');
$('#faqs').innerHTML=BUSINESS.faqs.map(([q,a])=>`<details><summary>${escapeHTML(q)}</summary><p>${escapeHTML(a)}</p></details>`).join('');
$('#service-select').innerHTML='<option value="General enquiry">General enquiry</option>'+BUSINESS.services.map(s=>`<option>${escapeHTML(s.title)}</option>`).join('');
const menu=$('.menu'),nav=$('#navigation');
menu.addEventListener('click',()=>{const open=menu.getAttribute('aria-expanded')!=='true';menu.setAttribute('aria-expanded',String(open));nav.classList.toggle('open',open);menu.textContent=open?'Close':'Menu';});
function closeMenu(){menu.setAttribute('aria-expanded','false');nav.classList.remove('open');menu.textContent='Menu';}
document.addEventListener('keydown',e=>{if(e.key==='Escape')closeMenu();});
nav.addEventListener('click',e=>{if(e.target.closest('a'))closeMenu();});
function route(){
  const hash=location.hash,service=BUSINESS.services.find(s=>hash==='#service/'+s.id);
  const view=$('#service-view');
  $('#home-view').hidden=Boolean(service);view.hidden=!service;
  if(service){
    document.title=service.title+' | '+BUSINESS.name;
    view.innerHTML=`<a class="back" href="#services">Back to all services</a><div class="service-detail"><div><p class="eyebrow">APW GAS LIMITED / OUR SERVICES</p><h1 id="service-title" tabindex="-1">${escapeHTML(service.title)}</h1><p class="lead">${escapeHTML(service.intro)}</p><h2 style="font-size:25px">How we can help</h2><ul>${service.items.map(i=>`<li>${escapeHTML(i)}</li>`).join('')}</ul><div class="actions"><a class="button" data-phone>Call ${escapeHTML(BUSINESS.phone)}</a><a href="#contact" class="text-link">Enquire about this service</a></div></div><img src="${escapeHTML(service.image)}" alt="${escapeHTML(service.alt)}" width="640" height="520"></div>`;
    bindContacts(view);$('#service-select').value=service.title;window.scrollTo(0,0);$('#service-title').focus({preventScroll:true});
  }else{
    document.title='APW Gas Limited | Commercial Heating, Plumbing & Boilers';
    if(hash==='#privacy'){const dialog=$('#privacy');if(!dialog.open)dialog.showModal();}
    else{const id=hash.slice(1);const target=document.getElementById(id);if(target)requestAnimationFrame(()=>target.scrollIntoView());}
  }
  closeMenu();
}
window.addEventListener('hashchange',route);route();
// Keep navigation available when scrolling back toward earlier content.
const siteHeader = document.querySelector('header');
let previousScroll = Math.max(0, window.scrollY);
let scrollAnchor = previousScroll;
window.addEventListener('scroll', () => {
  const currentScroll = Math.max(0, window.scrollY);
  if (currentScroll < siteHeader.offsetHeight || menu.getAttribute('aria-expanded') === 'true') {
    siteHeader.classList.remove('header-hidden');
    scrollAnchor = currentScroll;
  } else if (Math.abs(currentScroll - scrollAnchor) >= 8) {
    siteHeader.classList.toggle('header-hidden', currentScroll > previousScroll);
    scrollAnchor = currentScroll;
  }
  previousScroll = currentScroll;
}, {passive:true});
siteHeader.addEventListener('focusin', () => siteHeader.classList.remove('header-hidden'));
$('#close-privacy').addEventListener('click',()=>$('#privacy').close());
$('#privacy').addEventListener('close',()=>{if(location.hash==='#privacy')history.replaceState(null,'',location.pathname+location.search);});
$('#enquiry-form').addEventListener('submit',e=>{
  e.preventDefault();const data=new FormData(e.currentTarget);
  const body=`Name: ${data.get('name')}\nEmail: ${data.get('email')}\nPhone: ${data.get('phone')||'Not provided'}\nService: ${data.get('service')}\n\n${data.get('message')}`;
  const mailto='mailto:'+BUSINESS.email+'?subject='+encodeURIComponent('Website enquiry: '+data.get('service'))+'&body='+encodeURIComponent(body);
  const status=$('#form-status');status.textContent='Your email app should open. If it does not, email '+BUSINESS.email+' or call '+BUSINESS.phone+'. Nothing has been sent by this website.';
  window.location.href=mailto;
});
