(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["chunk-3e2188a5"],{e0b9:function(e,t,n){"use strict";n.r(t);n("498a"),n("159b");var c=n("f2bf"),a=n("f42b"),r=n("16ce"),u=n("4940"),i=n("ed08"),o="fs-instant-search-mobile",l={name:o,props:{settings:Object},setup:function(e){var t=Object(c["ref"])(!1),n=Object(c["ref"])(!1),u=Object(c["ref"])();Object(c["provide"])("mSearchbarRef",u);var o=Object(c["inject"])("handleOnInput"),l=Object(c["inject"])("handleOnKeyDown"),s=Object(c["inject"])("suggestResults"),f=Object(c["inject"])("setStartSuggest"),b=Object(c["inject"])("query"),d=Object(c["inject"])("setQuery"),v=Object(c["ref"])();Object(c["watchEffect"])((function(){v.value&&(v.value.value=b.value)}));var h=function(){t.value=!1,n.value=!1},p=Object(c["inject"])("isContainerElem");Object(r["c"])(p,(function(){var e=document.getElementById("fs-is-searchbar-mobile");e&&"block"===window.getComputedStyle(e).display&&(f(!0),t.value=!0)}),{attributes:!0,childList:!0,subtree:!0});var j=function(e){return function(t){t.preventDefault(),t.stopPropagation(),n.value=!0,d(t.target.value.trim()),v.value=e;var c=new Event("touchstart",{bubbles:!0,cancelable:!0});u.value.dispatchEvent(c)}},O=Object(c["ref"])(0),g=Object(c["ref"])(),w=function(){var t=Object(i["o"])(e.settings),n=Object(a["b"])(t);n.length!==O.value&&(O.value=n.length,g.value=n,n.forEach((function(e){e.addEventListener("focus",j(e))})))},m=function(){g.value&&g.value.forEach((function(e){e.removeEventListener("focus",j(e))}))};Object(c["onMounted"])((function(){w()})),Object(c["onUnmounted"])((function(){m()})),Object(r["c"])(document.body,(function(){w()}),{childList:!0,subtree:!0});var y=Object(c["computed"])((function(){return!(!t.value||!s.value.query)}));return{mSearchbarRef:u,enableSearchBar:n,query:b,goBack:h,handleOnInput:o,handleOnKeyDown:l,doesShowWidget:y,suggestResults:s}},template:Object(u["b"])()[o],__scopeId:"data-v-6c4ea3aa"};t["default"]=l},f42b:function(e,t,n){"use strict";n.d(t,"a",(function(){return c})),n.d(t,"b",(function(){return a})),n.d(t,"c",(function(){return r}));n("159b"),n("caad"),n("2532"),n("498a"),n("5319"),n("ac1f");var c=function(e){var t=[];return document.querySelectorAll(e).forEach((function(e){t.push(e)})),t},a=function(e){var t=c(e),n=document.getElementById("fs-searchbox-on-search-page");return n&&t.push(n),t},r=function(e,t,n,c){var a,r;try{if(t.includes("%")){var u=parseFloat(t.replace("%","").trim());a=u*window.innerWidth/100}else a=t.includes("px")?parseFloat(t.replace("px","").trim()):500}catch(b){a=500}try{r=n.includes("px")?parseFloat(n.replace("px").trim()):1053}catch(b){r=1053}a>r&&(a=r);var i=e.getBoundingClientRect(),o=i.top+i.height,l=0;l=window.innerWidth-i.left<a?i.left-(a-i.width):i.left;var s=window.innerHeight-o-8,f=c;return i.width>c&&(f=i.width),{top:o,left:l,maxHeight:s,width:f}}}}]);