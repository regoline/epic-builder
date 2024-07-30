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
let selectedCaracteristica;
let previouslySelectedElement;

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

        let firstCaracteristicaBox = null; // Variable to store the first characteristic box

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

                // Track the first characteristic box
                if (firstCaracteristicaBox === null) {
                    firstCaracteristicaBox = caracteristicaBox;
                }

                caracteristicaBox.addEventListener("click", () => {
                    const previouslySelectedIsSabeTudo = selectedCaracteristica === "Sabe-Tudo";
                    const clickedIsSabeTudo = caracteristica.name === "Sabe-Tudo";

                    if (previouslySelectedIsSabeTudo && !clickedIsSabeTudo) {
                        caminhosPontosPericia -= 5;
                    } else if (!previouslySelectedIsSabeTudo && clickedIsSabeTudo) {
                        caminhosPontosPericia += 5;
                    }

                    selectedCaracteristica = caracteristica.name;

                    // Highlight the selected box and remove highlight from the previously selected box
                    if (previouslySelectedElement) {
                        previouslySelectedElement.classList.remove('selected-caracteristica');
                    }
                    caracteristicaBox.classList.add('selected-caracteristica');
                    previouslySelectedElement = caracteristicaBox;

                    // Update the displayed value
                    document.getElementById('caminhos-pontos-pericia').innerText = caminhosPontosPericia;
                    document.getElementById('selected-caracteristica').innerText = selectedCaracteristica;
                });

                row.appendChild(caracteristicaBox);
            }

            caracteristicasContainer.appendChild(row);
        }

        // Set default selection if no characteristic is selected
        if (!selectedCaracteristica && firstCaracteristicaBox) {
            selectedCaracteristica = firstCaracteristicaBox.querySelector('.caracteristica-name').innerText;
            firstCaracteristicaBox.classList.add('selected-caracteristica');
            previouslySelectedElement = firstCaracteristicaBox;
            document.getElementById('caminhos-pontos-pericia').innerText = caminhosPontosPericia;
            document.getElementById('selected-caracteristica').innerText = selectedCaracteristica;
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
