/*
 *	Timer	改変・再配布自由 GPL
 *	http://hw.bbzone.net/
 *	timer.js by hidew 2005-12-16
 */
 var time;
 var first = 'b';	//最初の手番
 var bt = 0;			//黒の残り考慮時間
 var wt = 0;			//白の残り考慮時間
 var fischer = 0;	//フィッシャー (sec)
 var delay   = 0;	//遅延時間 (sec)
 var byo     = 0;	//遅延時間 (sec)
 var dt = delay;
 var moves = 0;		//手数
 var byo_black = false;	//黒 秒読みフラグ
 var byo_white = false;	//白 
 var sound = 'timeWarning.au';
 
 function switch_bw(){
 
     if(turn == 'w'){
         if(byo_white){
             byo_white = false;
             wt = 0;
             WhiteTime.innerText = clock_disp(wt);
         }
         turn = 'b';
 
         if(byo > 0 && byo_black)	bt = byo;
         else if(fischer > 0)		bt += fischer;
         document.getElementById('BlackTime').className = "on";
         document.getElementById('WhiteTime').className = "off";
     }
     else{
         if(byo_black){
             byo_black = false;
             bt = 0;
             BlackTime.innerText = clock_disp(bt);
         }
 
         turn = 'w';
         if(byo > 0 && byo_white)		wt = byo;
         else  if(fischer > 0)		wt += fischer;
 
         document.getElementById('WhiteTime').className = "on";
         document.getElementById('BlackTime').className = "off";
     }
     dt = delay;
     document.f.moves.value = ++moves;
 }
 
 function game_start(){
     reset();
     if(turn == 'b'){
         bt += fischer;
         document.getElementById('BlackTime').className = "on";
     }
     else{
         wt += fischer;
         document.getElementById('WhiteTime').className = "on";
     }
     dt = delay;
     clock_start();
 }
 function end(){
     clock_stop();
     if(turn == 'b')			alert("黒の時間切れ負け");
     else if(turn == 'w')	alert("白の時間切れ負け");
     return false;
 }
 function clock_start() {	//スタート
   time = 0;
   tm = setInterval("clock()",1000);
 }
 function clock_stop() {		//ストップ
   clearInterval(tm);
 }
 function clock() {		   //時間表示
     time++;
     window.status = clock_disp(time);
 
     if(dt){		//遅延時間
         dt--;
         //window.status = dt;
         document.f.dt.value = dt;
     }
     else{
         if(turn == 'b'){
             bt--;
             BlackTime.innerText = clock_disp(bt);
             if(byo > 0){	//秒読み付き
                 if(bt <= 0){
                     if(byo_black)	end();
                     else{
                         byo_black = true;
                         bt = byo;
                         BlackTime.innerText = clock_disp(bt);
                         document.getElementById('BlackTime').className = "warning";
                         if(sound != "")	ring.src = sound;
                     }
                 }
             }
             else{			//秒読みなし
                 if(bt <= 10){
                     document.getElementById('BlackTime').className = "warning";
                     if(sound != "")	ring.src = sound;
                 }
                 if(bt <= 0)		end();
             }
         }
         else if(turn == 'w'){
             wt--;
             WhiteTime.innerText = clock_disp(wt);
             if(byo > 0){	//秒読み付き
                 if(wt <= 0){
                     if(byo_white)	end();
                     else{
                         byo_white = true;
                         wt = byo;
                         WhiteTime.innerText = clock_disp(wt);
                         document.getElementById('WhiteTime').className = "warning";
                         if(sound != "")	ring.src = sound;
                     }
                 }
             }
             else{			//秒読みなし
                 if(wt <= 10){
                     document.getElementById('WhiteTime').className = "warning";
                     if(sound != "")	ring.src = sound;
                 }
                 if(wt <= 0)		end();
             }
         }
     }
 }
 
 function clock_disp(second) {		   //時間表示
     if(second <= 0)		return '0:00:00';
     hour	= Math.floor(second / 3600);	 //時間（経過秒数÷3600秒）
     min		= Math.floor((second % 3600) / 60);	//分（時間の余り÷60秒）
     min1	= Math.floor(min / 10);		 //分の10の位
     min2	= min % 10;					//分の1の位
     sec		= second % 60;				//秒（経過秒数÷60秒の余り）
     sec1	= Math.floor(sec / 10);		 //秒の10の位
     sec2	= second % 10;				//秒の1の位
     //TimeArea.innerText = min1 + min2 + ":" + sec1 + sec2;
     return hour + ":" + min1 + min2 + ":" + sec1 + sec2;
 }
 
 function reset(){
     bt = 0;
     wt = 0;
     time = 0;
     moves = 0;
 
     if(document.f.first[1].checked)	first = 'w'
     else first = 'b';
     if(document.f.fischer.value){	fischer = parseInt(document.f.fischer.value, 10) + 1	}
     if(document.f.delay.value){		delay   = parseInt(document.f.delay.value, 10)	}
     if(document.f.byo.value){		byo     = parseInt(document.f.byo.value, 10)	}
     if(document.f.bt.value){	bt = parseInt(document.f.bt.value, 10)	}
     if(document.f.wt.value){	wt = parseInt(document.f.wt.value, 10)	}
     turn = first;
     byo_black = false;
     byo_white = false;
     BlackTime.innerText = clock_disp(bt);
     WhiteTime.innerText = clock_disp(wt);
     document.getElementById('BlackTime').className = "off";
     document.getElementById('WhiteTime').className = "off";
     document.f.moves.value = moves;
 
 }
 
 function ez_set(str){
     var x = str.split(",");	
     document.f.bt.value = x[0];
     document.f.wt.value = x[1];
     document.f.fischer.value = x[2];
     document.f.delay.value = x[3];
     document.f.byo.value = x[4];
 }
 
 