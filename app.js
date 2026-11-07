const audio=document.getElementById('audio'), files=document.getElementById('files'), list=document.getElementById('playlist');
let tracks=[],index=-1,shuffle=false,loop=true;
function draw(){list.innerHTML='';document.getElementById('count').textContent=tracks.length+' TRACK';if(!tracks.length){list.innerHTML='<p class="empty">Még nincs zene. Tölts be MP3 vagy más támogatott hangfájlokat!</p>';return}
tracks.forEach((t,i)=>{const row=document.createElement('div');row.className='trackrow'+(i===index?' current':'');const n=document.createElement('span');n.className='name';n.textContent=(i+1)+'. '+t.name;const play=document.createElement('button');play.textContent='▶';play.setAttribute('aria-label','Lejátszás');play.onclick=()=>playTrack(i);const del=document.createElement('button');del.textContent='×';del.setAttribute('aria-label','Törlés');del.onclick=()=>{tracks.splice(i,1);if(i===index){audio.pause();index=-1;document.getElementById('trackName').textContent='Válassz zenét!'}else if(i<index)index--;draw()};row.append(n,play,del);list.append(row)})}
function playTrack(i){if(!tracks.length)return;index=(i+tracks.length)%tracks.length;audio.src=tracks[index].src;audio.play().catch(()=>{});document.getElementById('trackName').textContent=tracks[index].name;document.getElementById('trackTime').textContent='ONYX MUSIC';draw()}
files.onchange=e=>{[...e.target.files].forEach(f=>tracks.push({name:f.name,src:URL.createObjectURL(f)}));draw();if(index<0&&tracks.length)playTrack(0);files.value=''};
document.getElementById('prev').onclick=()=>playTrack(index<=0?tracks.length-1:index-1);
document.getElementById('next').onclick=()=>nextTrack();
function nextTrack(){if(!tracks.length)return;playTrack(shuffle?Math.floor(Math.random()*tracks.length):index+1)}
audio.onended=()=>{if(loop)nextTrack()};
document.getElementById('shuffle').onclick=e=>{shuffle=!shuffle;e.target.textContent='🔀 KEVERÉS: '+(shuffle?'BE':'KI')};
document.getElementById('loop').onclick=e=>{loop=!loop;e.target.textContent='🔁 ISMÉTLÉS: '+(loop?'BE':'KI');audio.loop=false};
document.getElementById('clear').onclick=()=>{audio.pause();tracks.forEach(t=>URL.revokeObjectURL(t.src));tracks=[];index=-1;document.getElementById('trackName').textContent='Válassz zenéket a lejátszási listához!';draw()};
document.getElementById('playAll').onclick=()=>playTrack(index<0?0:index);
document.getElementById('streamBtn').onclick=()=>{const url=document.getElementById('stream').value.trim();if(!url)return;audio.src=url;audio.play().catch(()=>{});document.getElementById('trackName').textContent='Online zenei stream';document.getElementById('trackTime').textContent='ONLINE STREAM'};
document.getElementById('clock').textContent=new Date().toLocaleTimeString('hu-HU');setInterval(()=>document.getElementById('clock').textContent=new Date().toLocaleTimeString('hu-HU'),1000);
draw();
