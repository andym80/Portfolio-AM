const textz = document.getElementById('name');
const textArea =document.getElementById('msg');
const mailWays = document.getElementById('mail');
form.addEventListener('input', () =>{
constinputData = {
Name : textz.value,
Email:mailWays.value,
Area: textArea.value,
};
const collectData = JSON.stringify(inputData);
localStorage.setItem('collectData', collectData);
});

function reachData(){
	if (localStorage.getItem('collectData')){
const realDAta = JSON.parse(localStorage.getItem('collectData'));
textz.value = realDAta.Name;
mailWays.value = realDAta.Email;
textArea.value = realData.Area;
	}
}

reachData();