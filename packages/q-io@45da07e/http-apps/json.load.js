montageDefine("45da07e","http-apps/json",{dependencies:["q","./content","./status"],factory:function(e,t){var n=e("q"),i=e("./content"),r=e("./status");t.HandleJsonResponses=function(e,i,r){return function(a){return a.handleJsonResponse=t.handleJsonResponse,n.fcall(e,a).then(function(e){return void 0!==e.data?n.fcall(t.handleJsonResponse,e,i,r):e})}},t.handleJsonResponse=function(e,t,n){return e.headers["content-type"]="application/json",e.body={forEach:function(i){i(JSON.stringify(e.data,t,n))}},e},t.Json=function(e,i,r){return function(a,s){return n.when(e(a,s),function(e){return t.json(e,i,r)})}},t.json=function(e,t,r){try{var a=JSON.stringify(e,t,r)}catch(s){return n.reject(s)}return i.ok([a])},t.JsonRequest=function(e,t){return t||(t=r.badRequest),i.ContentRequest(function(n,i,r){try{var a=JSON.parse(n)}catch(s){return t(i,s)}return e(a,i,r)})}}});