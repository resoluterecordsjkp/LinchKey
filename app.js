LinchKey app.js
Copy everything below and paste it into the GitHub file named app.js
// LinchKey build: 2026-07-19 / Contest PWA v1.0.1
let CONFIG=null;let MODULES=null;
const baseQuestions=[
{id:'origin_docket',label:'Was a jurisdiction, declination, forum, emergency, or modification issue actually filed or docketed in the originating state?',code:'Origin-state process'},
{id:'origin_service',label:'Were all legally entitled parties served or notified for that specific later act?',code:'Notice / service'},
{id:'origin_hearing',label:'Did those parties have an opportunity to present facts and legal arguments?',code:'Opportunity to be heard'},
{id:'communication',label:'Was substantive judge-to-judge communication recorded, disclosed, and accessible?',code:'Court communication'},
{id:'loss_decline',label:'Is there a legally sufficient originating-state loss or declination determination?',code:'Continuing jurisdiction / decline'},
{id:'later_verify',label:'Did the later state independently verify the actual orders, dockets, legal parents, process, and jurisdictional status?',code:'Later-state due diligence'},
{id:'emergency_valid',label:'If emergency authority was used, were presence, current emergency facts, timing, duration, and communication requirements met?',code:'Temporary emergency'},
{id:'long_term_path',label:'Was a separate lawful long-term jurisdiction or modification pathway established?',code:'Modification'},
{id:'pkpa_gate',label:'Were both federal modification gates satisfied?',code:'28 U.S.C. § 1738A(f)'}
];
function stateOptions(selected){return MODULES.stateRegistry.map(s=>`<option value="${s.code}" ${s.code===selected?'selected':''}>${s.name} (${s.status})</option>`).join('')}
function buildQuestions(){document.getElementById('questionGrid').innerHTML=baseQuestions.map(q=>`<div class="question-card"><strong>${q.label}</strong><select id="${q.id}"><option value="unknown">Unknown</option><option value="yes">Yes</option><option value="no">No</option></select><div class="helper">${q.code}</div></div>`).join('')}
function value(id){return document.getElementById(id)?.value||'unknown'}
function makeNode(id,label,code){const v=value(id),cls=v==='yes'?'pass':v==='no'?'fail':'open';return{cls,icon:v==='yes'?'✓':v==='no'?'×':'?',label,code,status:v==='yes'?'Verified':v==='no'?'Failed':'Unresolved'}}
function analyze(){
 const origin=value('originState'),later=value('laterState'),prior=value('priorOrder');
 const nodes=[
 {cls:prior==='yes'?'pass':'open',icon:prior==='yes'?'✓':'?',label:'Prior-order pathway identified',code:'Definitions / PKPA',status:prior==='yes'?'Verified':'Unresolved'},
 makeNode('origin_docket','Originating-state legal event established',origin+' process'),
 makeNode('origin_service','Specific-act service or notice established',origin+' notice'),
 makeNode('origin_hearing','Opportunity to present facts and law established','Due process / PKPA(e)'),
 makeNode('communication','Court-communication requirements established','State communication code'),
 makeNode('loss_decline','Originating-state loss or valid declination established','Continuing jurisdiction'),
 makeNode('later_verify','Later-state independent verification established',later+' verification'),
 makeNode('emergency_valid','Temporary-emergency branch established','Emergency statute'),
 makeNode('long_term_path','Separate long-term authority established','Modification'),
 makeNode('pkpa_gate','Federal modification gate established','28 U.S.C. § 1738A(f)')
 ];
 const datesUnknown=document.getElementById('datesUnknown').checked;
 const dates=[value('eventDate'),value('tempDate'),value('permanentDate')];
 nodes.push({cls:(datesUnknown||dates.every(x=>!x))?'open':'pass',icon:(datesUnknown||dates.every(x=>!x))?'?':'✓',label:'Historical date/version branch',code:'Date-controlled authority',status:(datesUnknown||dates.every(x=>!x))?'Unresolved':'Verified'});
 const pass=nodes.filter(n=>n.cls==='pass').length,fail=nodes.filter(n=>n.cls==='fail').length,open=nodes.filter(n=>n.cls==='open').length;
 document.getElementById('resultMetrics').innerHTML=`<div class="metric"><span class="muted">Verified</span><strong>${pass}</strong></div><div class="metric"><span class="muted">Failed</span><strong>${fail}</strong></div><div class="metric"><span class="muted">Unresolved</span><strong>${open}</strong></div>`;
 document.getElementById('resultNodes').innerHTML=nodes.map(n=>`<div class="node ${n.cls}"><div class="icon">${n.icon}</div><div><strong>${n.label}</strong><div class="muted">${n.status}</div></div><div class="code">${n.code}</div></div>`).join('');
 const required=['origin_docket','origin_service','origin_hearing','loss_decline','later_verify','long_term_path','pkpa_gate'];
 const allYes=required.every(id=>value(id)==='yes');
 const anyNo=required.some(id=>value(id)==='no');
 let head='UNRESOLVED',explain='The current record does not establish every mandatory gate. Unknown facts remain unknown.';
 if(allYes&&prior==='yes'){head='Authority path provisionally established';explain='Every displayed mandatory gate is verified, subject to source-version, contradiction, exception, and evidence checks.'}
 else if(anyNo){head='FAILED / NOT ESTABLISHED';explain='The modification chain is conjunctive. One failed mandatory gate prevents the whole structure from being treated as satisfied.'}
 document.getElementById('overallResult').innerHTML=`<strong>${head}</strong><p>${explain}</p>`;
 document.getElementById('changeResult').innerHTML=`<p>Resolve failed or unknown nodes with the actual ${origin} and ${later} dockets, orders, service returns, hearing records, communication record, legal-parent authorities, dates, findings, and a separately valid long-term path.</p>`;
 document.getElementById('resultPanel').classList.remove('hidden');
 document.getElementById('resultPanel').scrollIntoView({behavior:'smooth'});
}
function loadDemo(){
 document.getElementById('question').value='The children have lived in Virginia for more than six months. Does Virginia have jurisdiction?';
 document.getElementById('originState').value='TX';document.getElementById('laterState').value='VA';
 document.getElementById('priorOrder').value='yes';document.getElementById('posture').value='direct';
 document.getElementById('datesUnknown').checked=true;
 const demo={origin_docket:'no',origin_service:'no',origin_hearing:'no',communication:'unknown',loss_decline:'no',later_verify:'no',emergency_valid:'unknown',long_term_path:'no',pkpa_gate:'no'};
 Object.entries(demo).forEach(([id,v])=>document.getElementById(id).value=v);analyze();
}
function resetAll(){
 document.querySelectorAll('select').forEach(s=>s.selectedIndex=0);
 document.querySelectorAll('input[type=date]').forEach(i=>i.value='');
 document.querySelectorAll('input[type=checkbox]').forEach(i=>i.checked=false);
 document.getElementById('question').value='';
 document.getElementById('originState').value='TX';document.getElementById('laterState').value='VA';
 document.getElementById('resultPanel').classList.add('hidden');
}
function renderLibrary(){
 const curated=MODULES.stateRegistry.filter(s=>s.status==='curated').length;
 document.getElementById('librarySummary').innerHTML=`<div class="metric"><span class="muted">Federal modules</span><strong>1</strong></div><div class="metric"><span class="muted">Curated states</span><strong>${curated}</strong></div><div class="metric"><span class="muted">Planned states</span><strong>${50-curated}</strong></div>`;
 document.getElementById('stateLibrary').innerHTML=MODULES.stateRegistry.map(s=>`<div class="state-item ${s.status}"><strong>${s.name}</strong><div class="muted">${s.code} • ${s.status}</div></div>`).join('');
}
async function init(){
 [CONFIG,MODULES]=await Promise.all([fetch('config.json').then(r=>r.json()),fetch('modules.json').then(r=>r.json())]);
 document.getElementById('originState').innerHTML=stateOptions('TX');
 document.getElementById('laterState').innerHTML=stateOptions('VA');
 if(CONFIG.supportEnabled&&CONFIG.supportUrl){document.getElementById('supportLink').href=CONFIG.supportUrl;document.getElementById('supportArea').classList.remove('hidden')}
 buildQuestions();renderLibrary();
 document.querySelectorAll('.tab').forEach(btn=>btn.addEventListener('click',()=>{document.querySelectorAll('.tab').forEach(b=>b.classList.remove('active'));document.querySelectorAll('.view').forEach(v=>v.classList.remove('active-view'));btn.classList.add('active');document.getElementById(btn.dataset.view).classList.add('active-view')}));
 document.getElementById('runAnalysis').addEventListener('click',analyze);
 document.getElementById('loadDemo').addEventListener('click',loadDemo);
 document.getElementById('resetAll').addEventListener('click',resetAll);
 if('serviceWorker'in navigator) navigator.serviceWorker.register('sw.js').catch(()=>{});
}
init();

