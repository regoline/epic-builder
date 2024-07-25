const selectedOrigin = localStorage.getItem('selectedOrigin');
const selectedRace = localStorage.getItem('selectedRace');
const selectedCaminho = localStorage.getItem('selectedCaminho');
const savePilha = localStorage.getItem('savePilha');
const saveFortitude = localStorage.getItem('saveFortitude');
const saveReflexo = localStorage.getItem('saveReflexo');
const saveVontade = localStorage.getItem('saveVontade');
let caminhosPontosPericia = parseInt(localStorage.getItem('caminhosPontosPericia')) || 0;
const saveClasse = localStorage.getItem('saveClasse');
const savePassado = localStorage.getItem('savePassado');
const savePassadoSkill = localStorage.getItem('savePassadoSkill');
let selectedCaracteristica = localStorage.getItem('saveCaracteristica'); // Make sure to retrieve this correctly

document.getElementById('selected-origin').innerText = selectedOrigin;
document.getElementById('selected-race').innerText = selectedRace;
document.getElementById('selected-caminho').innerText = selectedCaminho;
document.getElementById('save-pilha').innerText = savePilha;
document.getElementById('save-fortitude').innerText = saveFortitude;
document.getElementById('save-reflexo').innerText = saveReflexo;
document.getElementById('save-vontade').innerText = saveVontade;
document.getElementById('caminhos-pontos-pericia').innerText = caminhosPontosPericia;
document.getElementById('selected-classe').innerText = saveClasse;
document.getElementById('selected-passado').innerText = savePassado;

fetch("../json/caracteristicas.json")
    .then((response) => response.json())
    .then((data) => {
        const caracteristicasContainer = document.getElementById("caracteristicas-container");

        const filteredCaracteristicas = data.caracteristicas.filter(caracteristica => {
            return (
                (caracteristica.exclusividade_cultural.includes("") || caracteristica.exclusividade_cultural.includes(selectedOrigin)) &&
                (caracteristica.exclusividade_racial.includes("") || caracteristica.exclusividade_racial.includes(selectedRace)) &&
                (caracteristica.exclusividade_caminho.includes("") || caracteristica.exclusividade_caminho.includes(selectedCaminho))
            );
        });

        // Split characteristics into rows of three
        for (let i = 0; i < filteredCaracteristicas.length; i += 3) {
            const row = document.createElement("div");
            row.classList.add("row");

            // Add up to three characteristics in this row
            for (let j = i; j < i + 3 && j < filteredCaracteristicas.length; j++) {
                const caracteristica = filteredCaracteristicas[j];

                // Create a box (div) for each characteristic
                const caracteristicaBox = document.createElement("div");
                caracteristicaBox.classList.add("col-4", "caracteristica-box");
                caracteristicaBox.innerHTML = `
                    <div class="caracteristica-name">${caracteristica.name}</div>
                    <div class="caracteristica-vantagem">${caracteristica.vantagem}</div>
                    <div class="caracteristica-desvantagem">${caracteristica.desvantagem}</div>
                `;

                caracteristicaBox.addEventListener("click", () => {
                    // Deduct 5 points if "Sabe-Tudo" was previously selected
                    if (selectedCaracteristica === "Sabe-Tudo") {
                        caminhosPontosPericia -= 5;
                    }

                    selectedCaracteristica = caracteristica.name;

                    // Add 5 points if "Sabe-Tudo" is selected
                    if (selectedCaracteristica === "Sabe-Tudo") {
                        caminhosPontosPericia += 5;
                    }

                    // Update the displayed value
                    document.getElementById('caminhos-pontos-pericia').innerText = caminhosPontosPericia;
                    document.getElementById('selected-caracteristica').innerText = selectedCaracteristica;
                });

                row.appendChild(caracteristicaBox);
            }

            caracteristicasContainer.appendChild(row);
        }
    })
    .catch((error) => {
        console.error("Erro ao carregar o arquivo JSON:", error);
    });

function saveSelection() {
    localStorage.setItem('selectedOrigin', selectedOrigin);
    localStorage.setItem('selectedRace', selectedRace);
    localStorage.setItem('selectedCaminho', selectedCaminho);
    localStorage.setItem('caminhosPontosPericia', caminhosPontosPericia);
    localStorage.setItem('savePilha', savePilha);
    localStorage.setItem('saveFortitude', saveFortitude);
    localStorage.setItem('saveReflexo', saveReflexo);
    localStorage.setItem('saveVontade', saveVontade);
    localStorage.setItem('savePassado', savePassado);
    localStorage.setItem('savePassadoSkill', savePassadoSkill);
    localStorage.setItem('saveCaracteristica', selectedCaracteristica);

    window.location.href = 'pericias.html';
}

function goBack() {
    window.history.back();
}
