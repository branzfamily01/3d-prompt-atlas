const state = {
  catalog: [],
  filtered: [],
  selected: new Set(),
  favorites: new Set(JSON.parse(localStorage.getItem('atlas:favorites') || '[]')),
  proven: JSON.parse(localStorage.getItem('atlas:proven') || '[]')
};

const $ = (id) => document.getElementById(id);
const els = {
  goal: $('goalInput'), search: $('searchInput'), model: $('modelFilter'), useCase: $('useCaseFilter'),
  favoritesOnly: $('favoritesOnly'), cards: $('cards'), resultCount: $('resultCount'), selectedCount: $('selectedCount'),
  principles: $('principles'), output: $('promptOutput'), provenTitle: $('provenTitle'), provenNote: $('provenNote'),
  provenList: $('provenList')
};

const synonymMap = {
  '教育':['Education','Inspect','Tap'], '勉強':['Education'], '学習':['Education'],
  'ゲーム':['Game'], 'game':['Game'], '地図':['Map','World','Explore'], 'map':['Map','World'],
  '探索':['Explore','Open World'], '冒険':['Game','Open World','Explore'],
  'ブラウザ':['Browser','3D Web','Three.js'], 'web':['3D Web','Browser','Three.js'],
  'three':['Three.js'], 'three.js':['Three.js'], 'blender':['Blender'], 'unity':['Unity'], 'unreal':['Unreal Engine'],
  'iphone':['iPhone','Tap'], 'ipad':['iPad','Tap'], 'スマホ':['iPhone','Tap'], 'モバイル':['iPhone','iPad','Tap'],
  '自然':['Nature'], '森':['Nature'], '水':['Nature','Simulation'], '建築':['Architecture','Building'],
  'キャラクター':['Character'], '商品':['Product'], 'シミュレーション':['Simulation'],
  'ボクセル':['Voxel'], 'minecraft':['Voxel','Build','Game'], '音声':['Voice Iteration']
};

function normalize(v=''){ return String(v).toLowerCase().normalize('NFKC'); }
function flattenItem(item){
  return [item.title,item.model,item.author,item.sourceType,...item.technologies,...item.useCases,...item.interactions,...item.worldTypes,...item.assetTypes,...item.devices,...item.derivedPrinciples].join(' ');
}
function scoreItem(item, query){
  const q = normalize(query).trim();
  if(!q) return 0;
  const hay = normalize(flattenItem(item));
  let score = 0;
  const tokens = q.split(/[\s、。,.\/]+/).filter(Boolean);
  tokens.forEach(token => {
    if(hay.includes(token)) score += 3;
    Object.entries(synonymMap).forEach(([key, vals]) => {
      if(token.includes(normalize(key)) || normalize(key).includes(token)) {
        vals.forEach(v => { if(hay.includes(normalize(v))) score += 2; });
      }
    });
  });
  if(normalize(item.title).includes(q)) score += 6;
  return score;
}

async function init(){
  try {
    const [catalogRes, taxonomyRes] = await Promise.all([fetch('data/catalog.json'), fetch('data/taxonomy.json')]);
    if(!catalogRes.ok || !taxonomyRes.ok) throw new Error('data load failed');
    state.catalog = await catalogRes.json();
    const taxonomy = await taxonomyRes.json();
    populateSelect(els.model, taxonomy.models);
    populateSelect(els.useCase, taxonomy.useCases);
    state.filtered = [...state.catalog];
    bindEvents();
    render();
    renderProven();
  } catch (error) {
    els.resultCount.textContent = 'データを読み込めませんでした';
    els.cards.innerHTML = '<div class="notice">catalog.json の読み込みに失敗しました。Webサーバー上で開いているか確認してください。</div>';
    console.error(error);
  }
}

function populateSelect(select, values){
  values.forEach(value => {
    const opt = document.createElement('option'); opt.value = value; opt.textContent = value; select.appendChild(opt);
  });
}

function bindEvents(){
  $('recommendBtn').addEventListener('click', recommend);
  $('clearBtn').addEventListener('click', clearAll);
  $('generateBtn').addEventListener('click', generatePrompt);
  $('copyBtn').addEventListener('click', copyPrompt);
  $('saveProvenBtn').addEventListener('click', saveProven);
  [els.search, els.model, els.useCase, els.favoritesOnly].forEach(el => el.addEventListener('input', applyFilters));
  document.querySelectorAll('[data-add]').forEach(btn => btn.addEventListener('click', () => {
    const add = btn.dataset.add; els.goal.value = [els.goal.value.trim(), add].filter(Boolean).join(' '); els.goal.focus();
  }));
}

function clearAll(){
  els.goal.value=''; els.search.value=''; els.model.value=''; els.useCase.value=''; els.favoritesOnly.checked=false;
  state.selected.clear(); state.filtered=[...state.catalog]; els.output.value=''; render(); renderPrinciples();
}

function recommend(){
  const goal = els.goal.value.trim();
  if(!goal){ els.goal.focus(); return; }
  const ranked = state.catalog.map(item => ({item, score:scoreItem(item,goal)})).sort((a,b)=>b.score-a.score);
  const useful = ranked.filter(x=>x.score>0).map(x=>x.item);
  state.filtered = useful.length ? useful : [...state.catalog];
  render();
  window.scrollTo({top: document.querySelector('.toolbar').offsetTop - 80, behavior:'smooth'});
}

function applyFilters(){
  const q = normalize(els.search.value);
  state.filtered = state.catalog.filter(item => {
    if(q && !normalize(flattenItem(item)).includes(q)) return false;
    if(els.model.value && item.model !== els.model.value) return false;
    if(els.useCase.value && !item.useCases.includes(els.useCase.value)) return false;
    if(els.favoritesOnly.checked && !state.favorites.has(item.id)) return false;
    return true;
  });
  render();
}

function render(){
  els.resultCount.textContent = `${state.filtered.length} 件の作例`;
  els.selectedCount.textContent = state.selected.size;
  els.cards.innerHTML='';
  if(!state.filtered.length){
    els.cards.innerHTML='<div class="empty-state">該当する作例がありません。条件を少し広げてください。</div>';
    return;
  }
  state.filtered.forEach(item => els.cards.appendChild(cardFor(item)));
}

function cardFor(item){
  const card=document.createElement('article');
  card.className=`card${state.selected.has(item.id)?' selected':''}`;
  const tags=[...item.useCases,...item.technologies,...item.interactions,...item.devices].slice(0,7);
  card.innerHTML=`
    <div class="card-top">
      <div><span class="badge">${escapeHtml(item.model)}</span><h3>${escapeHtml(item.title)}</h3></div>
      <span class="meta">${escapeHtml(item.publishedAt)}</span>
    </div>
    <div class="meta">${escapeHtml(item.author)} · ${escapeHtml(item.sourceType)}</div>
    <div class="tags">${tags.map(t=>`<span class="tag">${escapeHtml(t)}</span>`).join('')}</div>
    <ul class="principle-list">${item.derivedPrinciples.slice(0,3).map(p=>`<li>${escapeHtml(p)}</li>`).join('')}</ul>
    <div class="card-actions">
      <button class="select-btn">${state.selected.has(item.id)?'✓ 比較中':'＋ 比較に追加'}</button>
      <button class="favorite-btn" aria-label="お気に入り">${state.favorites.has(item.id)?'★':'☆'}</button>
      <a class="source-link" href="${item.sourceUrl}" target="_blank" rel="noopener noreferrer">出典 ↗</a>
    </div>`;
  card.querySelector('.select-btn').addEventListener('click',()=>toggleSelected(item.id));
  card.querySelector('.favorite-btn').addEventListener('click',()=>toggleFavorite(item.id));
  return card;
}

function toggleSelected(id){
  if(state.selected.has(id)) state.selected.delete(id); else state.selected.add(id);
  render(); renderPrinciples();
}
function toggleFavorite(id){
  if(state.favorites.has(id)) state.favorites.delete(id); else state.favorites.add(id);
  localStorage.setItem('atlas:favorites', JSON.stringify([...state.favorites]));
  if(els.favoritesOnly.checked) applyFilters(); else render();
}
function selectedItems(){ return state.catalog.filter(item=>state.selected.has(item.id)); }

function renderPrinciples(){
  const items=selectedItems();
  if(!items.length){ els.principles.className='principles empty-state'; els.principles.textContent='作例を2〜5件選ぶと、採用候補の技法がここに並びます。'; return; }
  const all=[];
  items.forEach(item=>item.derivedPrinciples.forEach(p=>all.push({text:p,source:item.title})));
  els.principles.className='principles'; els.principles.innerHTML='';
  all.forEach((p,i)=>{
    const label=document.createElement('label'); label.className='principle';
    label.innerHTML=`<input type="checkbox" data-principle="${i}" checked><span><strong>${escapeHtml(p.text)}</strong><br><small class="meta">from ${escapeHtml(p.source)}</small></span>`;
    els.principles.appendChild(label);
  });
}

function activePrinciples(){
  const items=selectedItems(); const all=[];
  items.forEach(item=>item.derivedPrinciples.forEach(p=>all.push(p)));
  const checks=[...els.principles.querySelectorAll('input[data-principle]')];
  if(!checks.length) return all;
  return checks.filter(c=>c.checked).map(c=>all[Number(c.dataset.principle)]).filter(Boolean);
}

function generatePrompt(){
  const items=selectedItems();
  if(!items.length){ els.output.value='先に参考作例を1件以上「比較に追加」してください。'; return; }
  const goal=els.goal.value.trim() || '［ここに制作目的を追記］';
  const principles=activePrinciples();
  const tech=unique(items.flatMap(x=>x.technologies));
  const interactions=unique(items.flatMap(x=>x.interactions));
  const devices=unique(items.flatMap(x=>x.devices));
  const refs=items.map((x,i)=>`${i+1}. ${x.title}\n   Source: ${x.sourceUrl}`).join('\n');
  els.output.value=`PROJECT\n${goal}\n\nUSER\n対象ユーザー、利用場面、3D経験レベルを目的から推定し、不確かな部分は仮定として明示する。\n\nTARGET EXPERIENCE\n最初の30秒で目的と操作が分かり、中心体験をすぐ試せること。視覚的な派手さより、操作→反応→理解/達成のループを優先する。\n\nREFERENCE PATTERNS\n以下は複製対象ではなく、設計原理を参考にする公開事例。\n${refs}\n\n採用する設計原理:\n${principles.map(p=>`- ${p}`).join('\n')}\n\nTECHNOLOGY\n候補: ${tech.join(', ') || '目的に最も単純で保守しやすい技術を選ぶ'}\n既存プロジェクトがある場合はその構成を優先し、全面再実装を前提にしない。\n\nWORLD / SCENE\n目的達成に必要な空間だけを最初に作る。大規模な世界は地区・シーン・マイルストーンに分割する。\n\nOBJECTS / EDITABILITY\n後で変更する可能性が高いオブジェクトは、別オブジェクトとして名前を付け、編集可能に保つ。見た目だけの一枚殻にしない。\n\nART DIRECTION\n対象ユーザーと目的に合う一貫した画風を決める。情報の読みやすさ、奥行き、主要操作の視認性を優先する。\n\nCAMERA\n目的に合う初期視点を設定し、迷子になりにくい範囲で移動・ズーム・回転を許可する。\n\nCONTROLS\n参考候補: ${interactions.join(', ') || 'Tap / Drag / Orbit'}\n主要操作は少なくし、iPhone/iPadでは44px以上のタップ領域と誤操作から戻れる導線を用意する。\n\nGAME / EXPERIENCE LOOP\n開始 → 目的理解 → 主要操作 → 即時フィードバック → 成功/失敗 → 次の行動、が途切れず成立すること。\n\nPERFORMANCE\n対象候補: ${devices.join(', ') || 'Browser'}\n実際に動かし、フレームレート低下、入力遅延、読み込み待ち、画面外UIを確認する。大量オブジェクトはインスタンシング、LOD、描画削減等を検討する。\n\nRESPONSIVE\n320 / 375 / 768 / 1440pxを確認。スマホ縦画面では、3Dキャンバスと操作UIが重ならないこと。\n\nSAVE / RECOVERY\n進捗や設定を保存する必要がある場合は、正本・保存先・再読込・初期化・復元方法を明示する。\n\nFAILURE STATES\n読み込み失敗、アセット欠落、入力ミス、操作不能、性能不足時の状態を設計する。失敗しても戻れること。\n\nDELIVERABLES\n- 実行可能な完成物\n- 必要なソース/アセット\n- READMEまたは導入手順\n- 主要操作の確認結果\n- 未確認事項の明記\n\nACCEPTANCE TESTS\n1. 初見ユーザーが目的を理解できる\n2. 中心操作が実際に動く\n3. 成功/失敗/再試行が成立する\n4. 対象端末でレイアウトが破綻しない\n5. 主要アセットの欠落がない\n6. 保存が必要な場合、再読込後も復元できる\n7. 見た目の確認だけでなく、実操作で検証する\n\nIMPLEMENTATION PHASES\nPhase 1: greybox / 中心体験だけを実装して動作確認\nPhase 2: 3D表現・アセット・フィードバックを改善\nPhase 3: 性能・レスポンシブ・失敗状態・保存・最終品質を仕上げる\n\nSELF REVIEW\n各Phaseの最後に実際に実行し、見える不具合と操作上の不具合を修正してから次へ進む。推測で「完成」と判断しない。`;
  els.output.scrollIntoView({behavior:'smooth',block:'center'});
}

async function copyPrompt(){
  if(!els.output.value) return;
  try { await navigator.clipboard.writeText(els.output.value); $('copyBtn').textContent='コピー済み ✓'; setTimeout(()=>$('copyBtn').textContent='コピー',1400); }
  catch { els.output.select(); document.execCommand('copy'); }
}

function saveProven(){
  const title=els.provenTitle.value.trim(); const note=els.provenNote.value.trim();
  if(!title){ els.provenTitle.focus(); return; }
  state.proven.unshift({id:crypto.randomUUID ? crypto.randomUUID() : String(Date.now()), title, note, prompt:els.output.value, createdAt:new Date().toISOString()});
  localStorage.setItem('atlas:proven', JSON.stringify(state.proven));
  els.provenTitle.value=''; els.provenNote.value=''; renderProven();
}
function renderProven(){
  els.provenList.innerHTML='';
  if(!state.proven.length){ els.provenList.innerHTML='<div class="empty-state">まだ成功例はありません。実際に試して効いた型だけ残します。</div>'; return; }
  state.proven.forEach(item=>{
    const el=document.createElement('div'); el.className='proven-item';
    el.innerHTML=`<strong>${escapeHtml(item.title)}</strong><p>${escapeHtml(item.note || 'メモなし')}</p><span class="meta">${new Date(item.createdAt).toLocaleString('ja-JP')}</span><br><button>削除</button>`;
    el.querySelector('button').addEventListener('click',()=>{
      state.proven=state.proven.filter(x=>x.id!==item.id); localStorage.setItem('atlas:proven',JSON.stringify(state.proven)); renderProven();
    });
    els.provenList.appendChild(el);
  });
}

function unique(values){ return [...new Set(values)].filter(Boolean); }
function escapeHtml(value=''){ return String(value).replace(/[&<>'"]/g,ch=>({'&':'&amp;','<':'&lt;','>':'&gt;',"'":'&#39;','"':'&quot;'}[ch])); }

init();
