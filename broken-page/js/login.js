let emailCurrent=false;

function focousToInput(event){
console.log(event);
let inputObj=event.parentElement.querySelector("input");
if(inputObj!=null){
	inputObj.focus();
}else {
	inputObj=event.parentElement.parentElement.querySelector("input");
	inputObj.focus();
}

}
function changeText(event) {
	console.log(event.value);
	
	if(event.value.length>0&&!event.parentElement.classList.contains("javascript")){
		event.parentElement.classList.add("javascript");
	} else if (event.value.length<0&&event.parentElement.classList.contains("javascript")) {
		event.parentElement.classList.remove("javascript");
	}
	
	
	if(event.dataset.type=="email"){
		
		if(checkEmain(event.value)){
			emailCurrent=true;
		}else{
			emailCurrent=false;
		}
		
	}
}

function checkEmain(mail){
	let regx=new RegExp("^\\w+@{1}\\D{2,9}\\.{1}\\w{2,9}","g");
	return  regx.test(mail);
}

