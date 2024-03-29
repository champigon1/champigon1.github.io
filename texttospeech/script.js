let speech = new SpeechSynthesisUtterance();
let voices = [];
let languageSet = new Set(); 
let languageSelect = document.querySelector("select");
let speedControl = document.getElementById("speed");
let pitchControl = document.getElementById("pitch");


function populateLanguageList() {
    voices = window.speechSynthesis.getVoices();
    languageSet.clear();
    languageSelect.innerHTML = '';


    voices.forEach(voice => languageSet.add(voice.lang));

    
    Array.from(languageSet).forEach(lang => {
        let option = document.createElement('option');
        option.textContent = lang;
        option.value = lang;
        languageSelect.appendChild(option);
    });
}


window.speechSynthesis.onvoiceschanged = populateLanguageList;
populateLanguageList(); 

languageSelect.addEventListener("change", () => {
    let selectedLanguage = languageSelect.value;
   
    let selectedVoice = voices.find(voice => voice.lang === selectedLanguage);
    if (selectedVoice) {
        speech.voice = selectedVoice;
    }
});

speedControl.addEventListener("input", () => {
    speech.rate = speedControl.value;
});

pitchControl.addEventListener("input", () => {
    speech.pitch = pitchControl.value;
});

document.querySelector("button").addEventListener("click", () => {
    speech.text = document.querySelector("textarea").value;
    window.speechSynthesis.speak(speech);
});
