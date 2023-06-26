function toggleClick() {
  let myToggles = document.querySelectorAll("#search-engine-def .toggle");

  myToggles.forEach((myToggle) => {
    myToggle.addEventListener("click", function (event) {
      if (this.dataset.isActive == "false") {
        this.dataset.isActive = "true";

        let icon = this.querySelector("i");
        icon.classList.remove("fa-toggle-off");
        icon.classList.add("fa-toggle-on");

        icon.style.color = "#e88103";
      } else {
        this.dataset.isActive = "false";
        let icon = this.querySelector("i");
        icon.classList.remove("fa-toggle-on");
        icon.classList.add("fa-toggle-off");

        icon.style.color = "#8e8e8e";
      }
    });
  });
}
function searchTypeClick() {
  let myTypes = document.querySelectorAll("#search-type li");

  myTypes.forEach((type) => {
    type.addEventListener("click", function (event) {
      myTypes.forEach((typeList) => {
        typeList.dataset.isActive = "false";
        typeList.style.backgroundColor = "transparent";
        typeList.classList.remove("selected-item");
      });
      if (this.dataset.isActive == "false") {
        this.dataset.isActive = "true";
        this.classList.add("selected-item");
        this.style.backgroundColor = "#854c07";
      }
    });
  });
}
function activtion() {
  let test = document.getElementById("smallMenu-icon");
  test.addEventListener("click", function (event) {
    event.stopPropagation();
    test.classList.add("active");
    for (let i = 0; i < test.children.length; i++) {
      test.children[i].addEventListener("click", function (eve) {
        //  eve.stopPropagation();
      });
    }
  });
}

let closMenu = document.querySelector(".exit-btn");
closMenu.addEventListener("click", function (event) {
  event.stopPropagation();
  console.log("Clicked");
  document.querySelector("#smallMenu-icon").classList.remove("active");
});
let catcorys = document.querySelectorAll(".catacory,.catacory-body");
catcorys.forEach((catcorysItem) => {
  catcorysItem.addEventListener("click", function (event) {
    event.stopPropagation();
    if (catcorysItem.classList.contains("active")) {
      let activedItem = catcorysItem.querySelectorAll(".active");
      console.log(activedItem);
      activedItem.forEach((elmnt) => {
        elmnt.classList.remove("active");
      });
    } else {
    }
    catcorysItem.classList.toggle("active");
  });
});
let searchIcon = document.querySelector(".search-icon");
searchIcon
  .querySelector(".small-search-box")
  .addEventListener("click", function (eevent) {
    eevent.stopPropagation();
  });
searchIcon.addEventListener("click", function () {
  searchIcon.classList.toggle("active");
});
let firstList = document.getElementById("moving-list");
//let scrollStep=firstList.scrollWidth/firstList.children.length;

let itsFirst = true;
let changingTime = 4000;
let backdropImg = document.querySelector("#image>img");
let backdropInfoBox = document.getElementById("backdrop-info");
let backdropMovieName = backdropInfoBox.querySelector(".backdrop-movie-name");
let backdropMovieScore = backdropInfoBox.querySelector(".backdrop-movie-score");
let backdropMovieQuality = backdropInfoBox.querySelector(".backdrop-quality");
let backdropPlayBtn = document.getElementById("play-btn");
let bgRootAddress = "./images/backdrops/";

function scrollTest() {
  setInterval(function () {
    let scrollStep = 0;
    let itemObj = null;
    let imgPath = "";
    let movieName = "";
    let movieScore = "";
    let movieQuality = "";
    let movieLink = "";
    if (itsFirst) {
      scrollStep = firstList.children[0].offsetWidth;
      itemObj = firstList.children[1];
    } else {
      scrollStep = firstList.children[1].offsetWidth;
      itemObj = firstList.children[2];
      //imgPath=firstList.children[2].dataset.bgPath;
    }

    if (firstList.scrollLeft > scrollStep * 2) {
      let firstObj = firstList.children[0];
      //firstList.children[0].remove();
      //imgPath=firstList.children[3].dataset.bgPath;
      itemObj = firstList.children[3];
      firstList.appendChild(firstObj);
      firstList.scrollBy({
        top: 0,
        left: scrollStep,
        behavior: "smooth",
      });
    } else {
      firstList.scrollBy({
        top: 0,
        left: scrollStep,
        behavior: "smooth",
      });
    }

    imgPath = itemObj.dataset.bgPath;
    movieScore = itemObj.dataset.score;
    movieLink = itemObj.dataset.postLink;
    movieQuality = itemObj.dataset.quality;

    backdropImg.src = bgRootAddress + imgPath;

    movieName = itemObj.dataset.movieName;
    backdropMovieName.textContent = movieName;
    backdropMovieName.href = movieLink;
    backdropMovieScore.childNodes[0].nodeValue = movieScore;
    backdropMovieQuality.textContent = movieQuality;
    backdropPlayBtn.href = movieLink;

    itsFirst = false;
  }, changingTime);
}
function CategoryLists() {
  let listboxCount = 5;
  for (let i = 1; i <= listboxCount; i++) {

	
 let theListSubject=  document.getElementById("listbox-" + i.toString());
 let theListItems=document.getElementById("listitem-" + i.toString());
 console.log(theListSubject);
 theListSubject.addEventListener("mouseenter",()=>{
  for (let j = 1; j <= listboxCount; j++) {
    let allListSubject=  document.getElementById("listbox-" + j.toString());
    
    let allListItems=document.getElementById("listitem-" + j.toString());
    allListSubject.classList.remove("selected");
    allListItems.classList.remove("visable");
     
  }
	theListSubject.classList.add("selected");
	theListItems.classList.add("visable");
 });

  }
}
// scrollTest();
activtion();
toggleClick();
searchTypeClick();
CategoryLists();