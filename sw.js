const V='ds-v3',SHELL=['./','./index.html','./manifest.json','./icon-192.png','./icon-512.png','./firebase-config.js'];
self.addEventListener('install',e=>{e.waitUntil(caches.open(V).then(c=>c.addAll(SHELL)).then(()=>self.skipWaiting()))});
self.addEventListener('activate',e=>{e.waitUntil(caches.keys().then(k=>Promise.all(k.filter(x=>x!==V).map(x=>caches.delete(x)))).then(()=>self.clients.claim()))});
self.addEventListener('fetch',e=>{const r=e.request,u=new URL(r.url);if(r.method!=='GET')return;
 const own=u.origin===location.origin,lib=u.hostname==='www.gstatic.com'&&u.pathname.includes('/firebasejs/'),font=u.hostname==='fonts.gstatic.com'||u.hostname==='fonts.googleapis.com';
 if(!own&&!lib&&!font)return; /* Firebase API / Google login calls go straight to network */
 if(u.pathname.includes('/__/auth/'))return;
 e.respondWith(caches.open(V).then(async c=>{const hit=await c.match(r);const net=fetch(r).then(res=>{if(res&&(res.ok||res.type==='opaque'))c.put(r,res.clone());return res}).catch(()=>hit);return hit||net}))});
