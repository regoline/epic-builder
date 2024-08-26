let selectedOrigin = localStorage.getItem('selectedOrigin');
let selectedRace = localStorage.getItem('selectedRace');
let raceImage = localStorage.getItem('selectedRace');
let selectedCaminho = localStorage.getItem('selectedCaminho');
let savePilha_atr = localStorage.getItem('savePilha');
let saveFortitude_atr = localStorage.getItem('saveFortitude');
let saveReflexo_atr = localStorage.getItem('saveReflexo');
let saveVontade_atr = localStorage.getItem('saveVontade');
let caminhosPontosPericia = localStorage.getItem('caminhosPontosPericia');
let saveClasse = localStorage.getItem('saveClasse');
let savePassado_atr = localStorage.getItem('savePassado');
let saveCaracteristica_atr = localStorage.getItem('saveCaracteristica');
let fortitude_frio = saveFortitude_atr;
let fortitude_calor = saveFortitude_atr;
let fortitude_veneno = saveFortitude_atr;
let origin = localStorage.getItem('selectedOrigin');

// Update UI with stored values
document.getElementById('selected-race').innerText = selectedRace;
document.getElementById('caracteristica-name').innerText = saveCaracteristica_atr;
document.getElementById('selected-caracteristica').innerText = saveCaracteristica_atr;
document.getElementById('selected-passado').innerText = savePassado_atr;
document.getElementById('selected-classe').innerText = saveClasse;
document.getElementById('save-pilha').innerText = savePilha_atr;
document.getElementById('selected-race-resumo').innerText = selectedRace;
document.getElementById('selected-origin').innerText = selectedOrigin;
document.getElementById('selected-caminho').innerText = selectedCaminho;

let atr_str = 40;
let atr_dex = 40;
let atr_int = 40;
let atr_max = 100;
let remainingPoints = 80;

const initial_str = atr_str;
const initial_dex = atr_dex;
const initial_int = atr_int;

let final_str;
let final_dex;
let final_int;
let final_vida;
let final_mana;
let final_stamina;
let final_fort_frio;
let final_fort_calor;
let final_fort_veneno;
let final_vontade;
let final_reflexos;


// Object to store race information including bonuses
let race = {};
let carac = {};

// Function to round value to the nearest multiple of 5
function roundToNearestFive(value) {
    return Math.round(value / 5) * 5;
}

// Function to validate and update attribute values
function updateAttributes(attribute, change) {
    let newValue;
    switch(attribute) {
        case 'str':
            newValue = roundToNearestFive(atr_str + change);
            if (newValue >= initial_str && newValue <= atr_max) {
                const difference = newValue - atr_str;
                if (remainingPoints - difference >= 0) {
                    remainingPoints -= difference;
                    atr_str = newValue;
                }
            }
            break;
        case 'dex':
            newValue = roundToNearestFive(atr_dex + change);
            if (newValue >= initial_dex && newValue <= atr_max) {
                const difference = newValue - atr_dex;
                if (remainingPoints - difference >= 0) {
                    remainingPoints -= difference;
                    atr_dex = newValue;
                }
            }
            break;
        case 'int':
            newValue = roundToNearestFive(atr_int + change);
            if (newValue >= initial_int && newValue <= atr_max) {
                const difference = newValue - atr_int;
                if (remainingPoints - difference >= 0) {
                    remainingPoints -= difference;
                    atr_int = newValue;
                }
            }
            break;
    }
    updateDisplay();
}

// Function to update the display with current attribute values and bonuses
function updateDisplay() {
    document.getElementById('box-str').value = atr_str;
    document.getElementById('box-dex').value = atr_dex;
    document.getElementById('box-int').value = atr_int;
    document.getElementById('label-points').innerText = remainingPoints;

	final_str = atr_str + (race.bonus_str || 0) + (carac.bonus_str || 0);
	final_dex = atr_dex + (race.bonus_dex || 0) + (carac.bonus_dex || 0);
	final_int = atr_int + (race.bonus_int || 0) + (carac.bonus_int || 0);

    // Update with bonuses if race information is available
    document.getElementById('label-str').innerText = final_str;
    document.getElementById('label-dex').innerText = final_dex;
    document.getElementById('label-int').innerText = final_int;
	
	document.getElementById('lbl-str-racial').innerText = race.bonus_str;
    document.getElementById('lbl-str-carac').innerText = carac.bonus_str;
	
	document.getElementById('lbl-dex-racial').innerText = race.bonus_dex;
    document.getElementById('lbl-dex-carac').innerText = carac.bonus_dex;
	
	document.getElementById('lbl-int-racial').innerText = race.bonus_int;
    document.getElementById('lbl-int-carac').innerText = carac.bonus_int;
	
	
	document.getElementById('label-str').innerText = final_str;
	
	const pilha = Math.floor(+savePilha_atr);
	const vida = Math.floor((atr_str + (race.bonus_str || 0) + (carac.bonus_str || 0)) + pilha);
	final_vida = vida;
	document.getElementById('label-vida').innerText = vida;
	final_mana = final_int + (carac.bonus_mana || 0);
	document.getElementById('label-mana').innerText = final_mana;
	final_stamina = final_dex;
	document.getElementById('label-stamina').innerText = final_stamina;
	final_fort_frio = Math.floor(+fortitude_frio + (final_str/4) + (carac.bonus_fortitude_frio || 0));
	document.getElementById('label-fort-frio').innerText = final_fort_frio;
	final_fort_calor = Math.floor(+fortitude_calor + (final_str/4) + (carac.bonus_fortitude_calor || 0));
	document.getElementById('label-fort-calor').innerText = final_fort_calor;
	final_fort_veneno = Math.floor(+fortitude_veneno + (final_str/4) + (carac.bonus_fortitude_veneno || 0));
	document.getElementById('label-fort-veneno').innerText = final_fort_veneno;
	final_vontade = Math.floor(+saveVontade_atr + (final_int/4) + (carac.bonus_vontade || 0) + (race.bonus_vontade || 0));
	document.getElementById('label-vontade').innerText = final_vontade;
	final_reflexos = Math.floor(+saveReflexo_atr + (final_dex/4) + (carac.bonus_reflexos || 0));
	document.getElementById('label-reflexos').innerText = final_reflexos;
}

// Event listeners for increment and decrement buttons
document.getElementById('btn-str-increment').addEventListener('click', function() {
    updateAttributes('str', 5);
});

document.getElementById('btn-str-decrement').addEventListener('click', function() {
    updateAttributes('str', -5);
});

document.getElementById('btn-dex-increment').addEventListener('click', function() {
    updateAttributes('dex', 5);
});

document.getElementById('btn-dex-decrement').addEventListener('click', function() {
    updateAttributes('dex', -5);
});

document.getElementById('btn-int-increment').addEventListener('click', function() {
    updateAttributes('int', 5);
});

document.getElementById('btn-int-decrement').addEventListener('click', function() {
    updateAttributes('int', -5);
});

// Event listeners for input changes
document.getElementById('box-str').addEventListener('input', function() {
    validateInput('str', this.value);
});

document.getElementById('box-dex').addEventListener('input', function() {
    validateInput('dex', this.value);
});

document.getElementById('box-int').addEventListener('input', function() {
    validateInput('int', this.value);
});

// Initial display update
updateDisplay();

fetch("../json/povos.json")
    .then((response) => response.json())
    .then((data) => {
        const povo = data.povos.find(p => p.name === selectedOrigin);
        race = povo.racas.find(r => r.name === selectedRace) || {};
        document.getElementById("race-vantagem1").textContent = race.vantagem1 || "N/A";
        document.getElementById("race-vantagem2").textContent = race.vantagem2 || "N/A";
		
        updateDisplay();
    })
    .catch((error) => {
        console.error('Error fetching JSON data:', error);
    });
	
fetch("../json/caracteristicas.json")
    .then((response) => response.json())
    .then((data) => {
        carac = data.caracteristicas.find(r => r.name === saveCaracteristica_atr) || {};
        document.getElementById("carac-vantagem").textContent = carac.vantagem || "N/A";
        document.getElementById("carac-desvantagem").textContent = carac.desvantagem || "N/A";
		
        updateDisplay();
    })
    .catch((error) => {
        console.error('Error fetching JSON data:', error);
    });
	
function goBack() {
	window.history.back();
}

function saveSelection() 
	{
		localStorage.setItem('end-str', final_str);
		localStorage.setItem('end-dex', final_dex);
		localStorage.setItem('end-int', final_int);
		localStorage.setItem('end-vida', final_vida);
		localStorage.setItem('end-stamina', final_stamina);
		localStorage.setItem('end-mana', final_mana);
		localStorage.setItem('end-fort-frio', final_fort_frio);
		localStorage.setItem('end-fort-calor', final_fort_calor);
		localStorage.setItem('end-fort-veneno', final_fort_veneno);
		localStorage.setItem('end-reflexos', final_reflexos);
		localStorage.setItem('end-vontade', final_vontade);
		window.location.href = 'end.html';
	}
