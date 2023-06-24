function moreInfo() {
	let moreBtn=document.querySelector(".get-moreinfo");
	moreBtn.addEventListener("click" , function(event) {
        console.log("test")
        moreBtn.parentElement.classList.toggle("active");
    });
}
function linkMore(){
    console.log("linkMore");
    let linksOpener=document.querySelectorAll(".download-season,.one-season-links");
    linksOpener.forEach(elemnet=>{
        
        elemnet.addEventListener("click", function(event) {
           event.stopPropagation();
            console.log(this)
            this.classList.toggle("active");
        });
     });
}
function copyLinks(){
    let sides=document.querySelectorAll(".link-copyer");
    sides.forEach(elemnet=>{
        elemnet.addEventListener("click", function(event) {
           event.stopPropagation();
        });
     });
    let linksCopyer=document.querySelectorAll(".link-copyer-btn");
    linksCopyer.forEach(elemnet=>{
        
        elemnet.addEventListener("click", function(event) {
           event.stopPropagation();
            
                if(elemnet.textContent!="کپی شد"){
                    let myUrls="";
                    let links=this.parentElement.previousElementSibling.children;
                    for (let i = 0; i < links.length; i++) {
                        myUrls+=links[i]+"\n";
        
                    }
                    window.navigator.clipboard.writeText(myUrls);
                    let lastText=this.textContent;
                    this.textContent="کپی شد"   ;
                    setTimeout(function (){
                        elemnet.textContent=lastText;
                    },1100);
                }else {
                    let myUrls="";
                    let links=this.parentElement.previousElementSibling.children;
                    for (let i = 0; i < links.length; i++) {
                        myUrls+=links[i]+"\n";
        
                    }
                    window.navigator.clipboard.writeText(myUrls);
                }
        
        });
     });
    
}

function  activtion(){
    
    let test=document.getElementById("smallMenu-icon");
    test.addEventListener("click",function (event   ){
        event.stopPropagation();
        test.classList.add("active");
        for (let i = 0; i < test.children.length; i++) {
            test.children[i].addEventListener("click",function (eve){
              //  eve.stopPropagation();
            });
        }
    });

}
function  theMenu(){
    let closMenu=document.querySelector(".exit-btn");
    closMenu.addEventListener("click",function (event){
        event.stopPropagation();
        console.log("Clicked");
        document.querySelector("#smallMenu-icon").classList.remove("active");
    });
    let catcorys=document.querySelectorAll(".catacory,.catacory-body");
    catcorys.forEach(catcorysItem =>{
        catcorysItem.addEventListener("click",function (event){
            event.stopPropagation();
            if(catcorysItem.classList.contains("active")){
                let activedItem=catcorysItem.querySelectorAll(".active");
                console.log(activedItem);
                activedItem.forEach(elmnt =>{
                    elmnt.classList.remove("active");
                });
                
            }else {
            
            }
            catcorysItem.classList.toggle("active");
            
        });
    });
    let searchIcon=document.querySelector(".search-icon");
    searchIcon.querySelector(".small-search-box").addEventListener("click",function (eevent){
        eevent.stopPropagation();
    });
    searchIcon.addEventListener("click",function (){
        
        searchIcon.classList.toggle("active");
    });
}

var postInformation=null;
async function  ImportData(){
     console.log("ImportData");
    let movieLink=window.location.search;
    let myFetch= fetch("./json/pages.json").then
    (result=>result.json()).then
    (result=> FindPost(result.pages,movieLink)).then
    (function ( post) {
        postInformation=post;
        InsertPostInfo(post);
        ImportSuggestLists(post.suggestList);
        ImportTags(post.postTags);
        ImportDefultComment(post.postDefComment,post.postCommentCount);
        chackWhishList();
    }).then
    (res => linkMore()).then
    (res => copyLinks());
     console.log("ImportData End");
}
function  FindPost(pages,postLink){
    for (const page of pages) {
        if(page.postLink.includes(postLink))
        {
            console.log(postLink);
         return  page;
        }
    }
    return false;
}
function InsertPostInfo(postInfo){
    let post_name=document.getElementById("post-name");
    post_name.textContent=` دانلود ${postInfo.postType} ${postInfo.postName}`;
    let post_name_fa=document.getElementById("post-name-fa");
    post_name_fa.textContent=postInfo.postNameFa;
    let post_poster=document.getElementById("post-poster");
    post_poster.src=postInfo.postPoster;
    post_poster.alt=` دانلود ${postInfo.postType} ${postInfo.postName}`;
    let post_genres=document.getElementById("genres");
    for (const genre of postInfo.postGenres) {
    
        let theGenre=`<a href="${genre.href}" class="tag">${genre.name}</a>`;
        post_genres.insertAdjacentHTML("beforeend",theGenre);
    }
    
    let sub_states=document.getElementById("sub-states");
    sub_states.textContent=postInfo.postInfo.subtitle?"دارد" :"ندارد";
    let dubbe_states=document.getElementById("dubbe-states");
    dubbe_states.textContent=postInfo.postInfo.dubbed?"دارد" :"ندارد";

    let ages_states=document.getElementById("ages-states");
    ages_states.innerText=postInfo.postInfo.ages;
    let language_states=document.getElementById("language-states");
    language_states.textContent=postInfo.postInfo.language;
    let country_states=document.getElementById("country-states");
    country_states.textContent=postInfo.postInfo.country.name;
    let network_states=document.getElementById("network-states");
    network_states.textContent=postInfo.postInfo.network;
    let year_states=document.getElementById("year-states");
    year_states.textContent=postInfo.postInfo.year;
    let status_states=document.getElementById("status-states");
    status_states.textContent=postInfo.postInfo.status;
    let post_postUpdate=document.getElementById("postUpdate-states");
    if(postInfo.postType=="سریال"){
        if(postInfo.postUpdate.update){
            post_postUpdate.textContent=`بروزرسانی : فصل ${postInfo.postUpdate.season} قسمت ${postInfo.postUpdate.episode} اضافه شد .`;
        }else {
            post_postUpdate.textContent=postInfo.postUpdate.finished;
        }
    
    }
    else {
        post_postUpdate.textContent=`کیفیت ${postInfo.postQuality} اضافه شد.`;
    }
    
    let  post_county=document.getElementById("post-county");
    post_county.textContent=postInfo.postInfo.country.name;
    post_county.href=postInfo.postInfo.country.href;
    let  post_story=document.getElementById("the-story");
    post_story.textContent=postInfo.postStory;
    
    let post_postive=document.getElementById("post-postive");
    post_postive.textContent=postInfo.postUserRates.postive;
    let post_votes=document.getElementById("post-votes");
    post_votes.textContent=postInfo.postUserRates.votes;
    let rate_imdb=document.getElementById("rate-imdb");
    rate_imdb.textContent=postInfo.postRates.imdb;
    let rate_imdb_votes=document.getElementById("rate-imdb-votes");
    rate_imdb_votes.textContent=postInfo.postRates.imdbVotes;
    let rate_meter=document.getElementById("rate-meter");
    rate_meter.textContent=postInfo.postRates.meter;
    let rate_rotten=document.getElementById("rate-rotten");
    rate_rotten.textContent=postInfo.postRates.rotten;
    
    
    if(postInfo.postType=="سریال"){
        let download_box=document.getElementById("download-box");
        let postSeasons=postInfo.postDownloadLink;
     
        for (const postSeason of postSeasons) {
            let newDownloadSeason=document.getElementById("simple-download-season").cloneNode(true);
            newDownloadSeason.querySelector(".season-name").textContent=postSeason.seson_name;
            newDownloadSeason.querySelector(".season-state").textContent=postSeason.season_text;
            for (const qualityList of postSeason.quality_list) {
              let newSeasonLink=newDownloadSeason.querySelector("#simple-season-links").cloneNode(true);
       
                newSeasonLink.querySelector(".one-season-quality").childNodes[0].textContent=qualityList.text+" : ";
            
                 newSeasonLink.querySelector(".one-season-quality .notSmall").textContent=qualityList.long_info;
                 newSeasonLink.querySelector(".one-season-quality .isSmall").textContent=qualityList.short_info;
                newSeasonLink.querySelector(".one-season-episodes .episode-count").textContent=qualityList.episodes;
                newSeasonLink.querySelector(".one-season-size").childNodes[0].textContent=qualityList.avg_size;
                newSeasonLink.querySelector(".one-season-size .notSmall").textContent=qualityList.sizeType=="gb"?" گیگابایت ":" مگابایت ";
                newSeasonLink.querySelector(".one-season-size .isSmall").textContent=qualityList.sizeType=="gb"?" GB ":" MB ";
                newSeasonLink.querySelector(".subtite-type").textContent=qualityList.type_have;
               let simpleLink=newSeasonLink.querySelector("#simple-link-in-link-box").cloneNode(true);
                let SeasonLinks=newSeasonLink.querySelector(".one-season-link-box");
    
          
                for (const link of qualityList.links) {
                let myLink=simpleLink.cloneNode(true);
                     myLink.removeAttribute("id");
                     myLink.href=link.href;
                     myLink.querySelector(".episode-number").textContent=link.number;
                     myLink.setAttribute("title",link.size);
                     
                    myLink.style.display="inline";
                    SeasonLinks.appendChild(myLink);
                    
                }
                
                
                newSeasonLink.removeAttribute("id");
                newSeasonLink.style.display="flex";
               
                newDownloadSeason.querySelector(".season-links").appendChild(newSeasonLink)
            }
            
            
            
            newDownloadSeason.style.display="block";
            newDownloadSeason.removeAttribute("id");
            download_box.appendChild(newDownloadSeason);
            
        }
   
        
    }
    else {
    
    }
   
    
    
}
function ImportSuggestLists(saggestObj){
    let suggestSimple=document.getElementById("simple-suggest-list").cloneNode(true);
  let suggestPlace=document.querySelector("#suggest-box .suggest-lists");
  let suggestImg=document.getElementById("simple-suggest-img").cloneNode(true);
    let suggestMax=4;
    let suggestCounter=1;
    for (const suggestList of saggestObj) {
        if(suggestCounter>suggestMax){
            break;
        }else {
            suggestCounter++;
        }
        let mySuggestList=suggestSimple.cloneNode(true);
        let linkA= mySuggestList.querySelector(".suggest-link");
        linkA.href=suggestList.link;
        for (let i = 0; i < suggestList.suggestImgs.length; i++) {
            let myImg=suggestImg.cloneNode(true);
            myImg.src=suggestList.suggestImgs[i];
            myImg.style.display="inline";
        if(i<5){
          
            linkA.prepend(myImg);
            
        }else if(i==5){
            linkA.querySelector(".suggest-more").prepend(myImg);
           
        }else {
         break;
        }
        
        }
        console.log(suggestList.suggestImgs.length);
        if(suggestList.suggestImgs.length<6){
            
            linkA.querySelector(".suggest-more").style.display="none";
        }
        mySuggestList.querySelector(".suggest-more-counter").childNodes[0].textContent=suggestList.more_counter;
     let suggestName= mySuggestList.querySelector(".suggest-list-name>a");
        suggestName.textContent=suggestList.name;
        suggestName.href=suggestList.link;
        let suggestUser= mySuggestList.querySelector(".suggest-user-name");
        suggestUser.textContent=suggestList.user.name;
        suggestUser.href=suggestList.user.href;
        mySuggestList.querySelector(".suggest-list-time").textContent=suggestList.date;
      
        mySuggestList.style.display="block";
        mySuggestList.removeAttribute("id");
        suggestPlace.appendChild(mySuggestList);
    }
   
}
function ImportTags(tagList){
    let tagBox=document.querySelector("#tags-box .tags-box-list");
    for (const tag of tagList) {

    }
    for (let i = 0; i <tagList.length ; i++) {
        let aTag=document.createElement("a");
        aTag.href=tagList[i].href;
        aTag.textContent=tagList[i].text+" , ";
        if(i==tagList.length-1){
            aTag.textContent= aTag.textContent.replace(",","");
        }
        tagBox.appendChild(aTag);
     
    }
}

var commentNumber=0;
function ImportDefultComment(commentList,postCommentCount){
    let defCount=5;
    commentNumber+=defCount;
let commentHolder=document.getElementById("comments-body");
let commnetSimple=document.getElementById("simple-comment");
let commentCounter=document.querySelector("#comments-count>span:first-of-type");
    commentCounter.textContent=postCommentCount;
   
    for (let i = 0; i < defCount; i++) {
  
       if(commentList[i].pic==undefined||commentList[i].pic==null)
           break;
       
        let newComment=commnetSimple.cloneNode(true);
        newComment.querySelector(".simple-comment-img").src=commentList[i].pic;
        newComment.querySelector(".simple-comment-username").textContent=commentList[i].name;
        newComment.querySelector(".simple-comment-text").textContent=commentList[i].text;
        newComment.querySelector(".dis-like-counter").textContent=commentList[i].dislike;
        newComment.querySelector(".like-counter").textContent=commentList[i].like;
        newComment.querySelector(".comment-time").textContent=commentList[i].ago;
       
        
        newComment.style.display="flex";
        commentHolder.lastElementChild.before(newComment);
    }
}
function loadComment(count){
   
    commentList=postInformation.postDefComment;
   
    let commentHolder=document.getElementById("comments-body");
    let commnetSimple=document.getElementById("simple-comment");
    for (let i = commentNumber; i < count+commentNumber; i++) {
        if(commentList[i]==undefined||commentList[i]==null||commentNumber==0) {
            commentNumber = 0;
            commentHolder.lastElementChild.textContent="پایان نظرات";
            console.log( commentHolder.lastElementChild.textContent)
            return;;
        }
    
        let newComment=commnetSimple.cloneNode(true);
        newComment.querySelector(".simple-comment-img").src=commentList[i].pic;
        newComment.querySelector(".simple-comment-username").textContent=commentList[i].name;
        newComment.querySelector(".simple-comment-text").textContent=commentList[i].text;
        newComment.querySelector(".dis-like-counter").textContent=commentList[i].dislike;
        newComment.querySelector(".like-counter").textContent=commentList[i].like;
        newComment.querySelector(".comment-time").textContent=commentList[i].ago;
    
    
        newComment.style.display="flex";
        commentHolder.lastElementChild.before(newComment);
    }
    commentNumber+=count;
}
function  toggleWishlist(btn){
    btn.classList.toggle("active");
    if( btn.classList.contains("active")){
        let wishList=JSON.parse(window.localStorage.getItem("whishlist"));
        if(wishList==null){
            let listObj=[];
            listObj.push(postInformation.postID);
            window.localStorage.setItem("whishlist",JSON.stringify(listObj));
        }else {
         
          if(wishList.includes(postInformation.postID)){
              return;
          }
            wishList.push(postInformation.postID);
            window.localStorage.setItem("whishlist",JSON.stringify(wishList));
        }
     
    }
    else {
        let wishList=JSON.parse(window.localStorage.getItem("whishlist"));
        if(wishList!=null){
            wishList.pop(postInformation.postID);
            window.localStorage.setItem("whishlist",JSON.stringify(wishList));
            console.log(wishList+" whishlist");
        }
    }
}
function chackWhishList(){
    let wishList=JSON.parse(window.localStorage.getItem("whishlist"));
    if(wishList.includes(postInformation.postID)){
      document.getElementById("bookmark-icon").classList.add("active");
    }
}
function openTriler(){
    let videoParent=document.createElement("div");
    let myVideoPlayer=document.createElement("video");
    videoParent.addEventListener("click",(event)=>{
        myVideoPlayer.remove();
        videoParent.remove();
      
    })
    videoParent.style.width=window.outerWidth+"px";
    videoParent.style.height=window.outerHeight+"px";
    videoParent.style.top="0px";
    videoParent.style.position="fixed";
    videoParent.style.backgroundColor="#aaa";
    videoParent.style.opacity="0.4"
    
 
    myVideoPlayer.setAttribute("width","640");
  //  myVideoPlayer.setAttribute("height","240");
    myVideoPlayer.setAttribute("controls","s");
    myVideoPlayer.style.width=window.outerWidth/2+"px";
   // myVideoPlayer.style.height=window.outerHeight/2+"px";
    myVideoPlayer.style.position="fixed";
    myVideoPlayer.style.padding="8px";
    myVideoPlayer.style.backgroundColor="#222";
    myVideoPlayer.style.top=window.outerHeight/2+"px";
    myVideoPlayer.style.left=window.outerWidth/2+"px";
    console.log(  myVideoPlayer.style.top)
    console.log(   myVideoPlayer.style.left)
    
    
    videoParent.style.zIndex=100;
    myVideoPlayer.style.zIndex=videoParent.style.zIndex+1;
    let source=document.createElement("source");
    source.src=postInformation.postTriler.href;
    myVideoPlayer.appendChild(source);
    myVideoPlayer.style.transform="translate(-50%, -50%)";
   
    console.log( videoParent.style.backgroundColor)
    document.body.prepend(videoParent);
    document.body.prepend(myVideoPlayer);

    myVideoPlayer

}
ImportData();
theMenu();
activtion();
// copyLinks();
moreInfo();
// linkMore();
