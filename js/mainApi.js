function GetVitrinInfo(allVitrinPosts){
	let myVitrin=allVitrinPosts;
	let myVitrinBody=document.getElementById("moving-list");

	
	document.querySelector("#image>img").src=bgRootAddress+myVitrin[0].postBgImage;
	document.querySelector("#backdrop-info .backdrop-quality").textContent=myVitrin[0].postQuality;
	document.querySelector("#backdrop-info .backdrop-movie-name").textContent=myVitrin[0].postName;
	document.querySelector("#backdrop-info .backdrop-movie-score").childNodes[0].nodeValue=myVitrin[0].postScore;
	document.querySelector("#play-btn").href=myVitrin[0].postLink;

	for (let post of myVitrin) {
		let postName=post.postName;
		let postPoster=post.postPoster;
		let postBgImage=post.postBgImage;
		let postScore=post.postScore;
		let langType=post.langType;
		let postQuality=post.postQuality;
		let postLink=post.postLink;
		let postLike=post.postLike;
	//	let typeClass=langType=="sub"?"isSubtitle":(langType=="dub"?"isDubbed":"none");
		let typeClass="";
		let typeClassText="";
		if(langType=="sub"){
			typeClass="isSubtitle";
			typeClassText = "زیرنویس"
		}else if(langType="dube"){
			typeClass="isDubbed";
			typeClassText = "دوبله"
		}else {
			typeClass="none;"
			typeClassText = "زبان اصلی"
		}
		let postText=`<a target="_blank" href="${postLink}" class="moviepost vitrin"  data-post-link="${postLink}" data-quality="${postQuality}" data-score="${postScore}" data-movie-name="${postName}" data-bg-path="${postBgImage}">
          <img
            class="poster"4
            src="${postPoster}"
            alt="${postName}"
          />
          <span class="${typeClass}">
            <span> ${typeClassText} </span>
          </span>
          <span class="score">
            <span>${postScore}</span>
            <span>/</span>
            <span>10</span>
          </span>
          <span class="like">${postLike}% <i class="fa-light fa-thumbs-up"></i></span>
          <span class="playicon">
            <span>
              <img src="./images/icons/play-button.png" alt="" />
            </span>
          </span>
        </a> `;
		myVitrinBody.insertAdjacentHTML("beforeend", postText);
	}
	console.log(myVitrin);
	scrollTest();
}
function UpdatePosters(newUpdates){
let pattern=document.getElementById("updates-poster-sample");
let updatesList=document.getElementById("updates-main");
	newUpdates.forEach(update => {
		let newObj=pattern.outerHTML;
		newObj=newObj.replaceAll("##PostLink",update.postLink);
		newObj=newObj.replace("##Backdrop",bgRootAddress+update.postBgImage);
		newObj=newObj.replace("##Likes",update.postLike);
		newObj=newObj.replace("##Season",update.postSeason);
		newObj=newObj.replace("##Episod",update.postEpisod);
		newObj=newObj.replace("##MovieName",update.postName);
		newObj=newObj.replace("style=\"display:none;\"","");
		updatesList.insertAdjacentHTML("beforeend", newObj);
		
	});
}
function  GetCategorys(categoryLists){
	console.log("getCategorys");
let simple_hlheader=document.getElementById("simple-hlheader").cloneNode(true);
	let simple_hlist=document.getElementById("simple-hlist").cloneNode(true);
	let simple_moviepost=document.getElementById("simple-moviepost").cloneNode(true);
	let afterThis=document.querySelector("#updates-main");
	
	for (const list of categoryLists) {
		if(list.isRect){
			console.log("list.isRect")
			let rectList=document.getElementById("simple-haveRect").cloneNode(true);
			rectList.setAttribute("id","");
			rectList.style.display="grid";
			rectList.querySelector(".horizontal-list-rect-header>span").textContent=list.text;
			rectList.querySelector(".horizontal-list-rect-header h2").textContent=list.name;
			console.log( list.posts);
			for (let i = 0; i < list.posts.length; i++) {
				
				if(i>5){break;}
			
				let myPost = simple_moviepost.cloneNode(true);
				let post=list.posts[i];
				let img = myPost.querySelector("img:first-of-type");
				img.src = post.postBgImage;
				img.style.alt = post.postName;
				
				let langType = post.langType;
				let langText = "";
				let classNamelang = "";
				if (langType == "sub") {
					classNamelang = "isSubtitle";
					langText = "زیرنویس";
				} else if (langType == "dubbed") {
					classNamelang = "isDubbed";
					langText = "دوبله";
				}else {
					classNamelang = "isOrginal";
					langText = "اصلی";
				}
				if (classNamelang.length > 0)
				{
					myPost.querySelector("span:first-of-type").classList.add(classNamelang);
					myPost.querySelector("span:first-of-type span:first-of-type").textContent=langText;
				}
				if(i>0){
					myPost.classList.add("mybey-none");
				}
				myPost.querySelector(".score span:first-of-type").textContent=post.postScore;
				myPost.querySelector(".like").childNodes[0].textContent=post.postLike+"%";
				myPost.querySelector(".movie-poster-link").href=post.postLink;
				myPost.querySelector(".movie-poster-link span").textContent=post.postName;
				myPost.addEventListener("click",()=>{
					window.open(post.postLink,"blank");
				})
				myPost.style.display="flex";
				myPost.setAttribute("id","");
				
				rectList.prepend(myPost);
			
			
			
			}
			afterThis.parentNode.insertBefore(rectList,afterThis.nextSibling);
			
			afterThis=rectList;
			continue;
		}
		let hListHeader=simple_hlheader.cloneNode(true);
		hListHeader.style.display="flex";
		hListHeader.setAttribute("id","");
		hListHeader.querySelector(".horizontal-list-header-text").textContent=list.name;
		hListHeader.querySelector(".get-full-list").href=list.link;
		
		let hlist=simple_hlist.cloneNode(true);
		hlist.style.display="grid";
		hlist.setAttribute("id","");
		for (const post of list.posts) {
			let myPost = simple_moviepost.cloneNode(true);
			let img = myPost.querySelector("img:first-of-type");
			img.src = post.postBgImage;
			img.style.alt = post.postName;
			
			let langType = post.langType;
			let langText = "";
			let classNamelang = "";
			if (langType == "sub") {
				classNamelang = "isSubtitle";
				langText = "زیرنویس";
			} else if (langType == "dubbed") {
				classNamelang = "isDubbed";
				langText = "دوبله";
			}else {
				classNamelang = "isOrginal";
				langText = "اصلی";
			}
			if (classNamelang.length > 0)
			{
				myPost.querySelector("span:first-of-type").classList.add(classNamelang);
				myPost.querySelector("span:first-of-type span:first-of-type").textContent=langText;
			}
			myPost.querySelector(".score span:first-of-type").textContent=post.postScore;
			myPost.querySelector(".like").childNodes[0].textContent=post.postLike+"%";
			myPost.querySelector(".movie-poster-link").href=post.postLink;
			myPost.querySelector(".movie-poster-link span").textContent=post.postName;
			myPost.addEventListener("click",()=>{
				window.open(post.postLink,"blank");
			})
			myPost.style.display="flex";
			myPost.setAttribute("id","");
			
			hlist.appendChild(myPost);
		}
		
		afterThis.parentNode.insertBefore(hlist,afterThis.nextSibling);
		afterThis.parentNode.insertBefore(hListHeader,afterThis.nextSibling);
		afterThis=hlist;
	}
}
let simpleEasySearchResult=document.querySelector(".easy-search-result-simple");
let resultHolder=document.querySelector(".results-holder");
function EasySearching(text) {
	let counter=0;
	resultHolder.querySelectorAll("a").forEach(thePost=>{
		thePost.remove();
	});
	setTimeout(()=>{
		serachResShowing=true;
	},200);
	allDataBase.forEach(post => {
		
			if(counter<3){
			
			
		
		if(post.postName.toLowerCase().startsWith(text.toLowerCase())){
			counter++;
			let result_item=simpleEasySearchResult.cloneNode(true);
			result_item.style.display="flex";
			result_item.querySelector("img").src=post.postBgImage;
			result_item.querySelector("img").alt=post.postName;
			
			if(post.langType=="sub"){
				result_item.querySelector(".isSubtitle").textContent="زیرنویس";
			}else {
				result_item.querySelector(".isSubtitle").textContent="اصلی";
			}
			resultHolder.appendChild(result_item);
			console.log(result_item);
		}else {
		
		}
			}
	});


	document.getElementById("easy-search-result").style.display="flex";
}
let allDataBase;

let myFetch=fetch("./json/main.json");
myFetch.then(result =>result.json()).then(result =>{
	GetVitrinInfo(result.vitrin);
	UpdatePosters(result.updated_series);
	GetCategorys(result.categorys);
	allDataBase=result.allPosts;
});