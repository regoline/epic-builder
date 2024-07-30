let selectedOrigin = localStorage.getItem('selectedOrigin');
let selectedRace = localStorage.getItem('selectedRace');
let selectedCaminho = localStorage.getItem('selectedCaminho');
let savePilha = localStorage.getItem('savePilha');
let saveFortitude = localStorage.getItem('saveFortitude');
let saveReflexo = localStorage.getItem('saveReflexo');
let saveVontade = localStorage.getItem('saveVontade');
let caminhosPontosPericia = localStorage.getItem('caminhosPontosPericia');
let saveClasse = localStorage.getItem('saveClasse');

document.getElementById('selected-origin').innerText = localStorage.getItem('selectedOrigin');
document.getElementById('selected-race').innerText = localStorage.getItem('selectedRace');
document.getElementById('selected-caminho').innerText = localStorage.getItem('selectedCaminho');
document.getElementById('save-pilha').innerText = localStorage.getItem('savePilha');
document.getElementById('save-fortitude').innerText = localStorage.getItem('saveFortitude');
document.getElementById('save-reflexo').innerText = localStorage.getItem('saveReflexo');
document.getElementById('save-vontade').innerText = localStorage.getItem('saveVontade');
document.getElementById('caminhos-pontos-pericia').innerText = localStorage.getItem('caminhosPontosPericia');

fetch("../json/classes_sabedoria.json")
    .then((response) => response.json())
    .then((data) => {
        const classesContainer = document.getElementById("classes-container");
        const descriptionContainer = document.getElementById("description-container");
        const classeImage = document.getElementById("classe-image");
        const habilidadeNome = document.getElementById("hab_nome");
        const habilidadeLevel = document.getElementById("hab_level");
        const habilidadeTipo = document.getElementById("hab_tipo");
        const habilidadeCusto = document.getElementById("hab_custo");
        const habilidadeCooldown = document.getElementById("hab_cooldown");
        const habilidadeDescricao = document.getElementById("hab_descricao");
        saveClasse = document.getElementById("selected-classe");

        const filteredClasses = data.classes_sabedoria.filter(classe => {
            return classe.exclusividade.includes("") || classe.exclusividade.includes(selectedOrigin);
        });

        filteredClasses.forEach((classe, index) => {
            const radioInput = document.createElement("input");
            radioInput.type = "radio";
            radioInput.name = "classe";
            radioInput.value = classe.name;
            radioInput.classList.add("form-check-input");

            const label = document.createElement("label");
            label.textContent = classe.name;
            label.classList.add("form-check-label");

            classesContainer.appendChild(radioInput);
            classesContainer.appendChild(label);
            classesContainer.appendChild(document.createElement("br"));

            if (index === 0) {
                radioInput.checked = true;
                descriptionContainer.innerHTML = classe.description.replace(/\n/g, '<br>');
                classeImage.src = `img/classes/sabedoria/${classe.imagem}`;
                setTimeout(() => {
                    radioInput.dispatchEvent(new Event("change"));
                }, 0);
            }

            radioInput.addEventListener("change", () => {
                const selectedClasse = data.classes_sabedoria.find((o) => o.name === radioInput.value);
                const outputElement = document.getElementById("selected-classe");
                outputElement.innerHTML = selectedClasse.name;

                descriptionContainer.innerHTML = selectedClasse.description.replace(/\n/g, '<br>');
                classeImage.src = `img/classes/sabedoria/${selectedClasse.imagem}`;
                displayHabilidades(selectedClasse.habilidades);
            });
        });
    })
    .catch((error) => {
        console.error("Erro ao carregar o arquivo JSON:", error);
    });

function displayHabilidades(habilidades) {
    const habilidadesRow = document.getElementById("habilidades-row");
    habilidadesRow.innerHTML = '';

    habilidades.forEach((habilidade) => {
        const habilidadeColNome = createColumn(habilidade.name, "col-2 text-center");
        const habilidadeColLevel = createColumn(habilidade.level, "col-1 text-center");
        const habilidadeColTipo = createColumn(habilidade.tipo, "col-1 text-center");
        const habilidadeColCusto = createColumn(habilidade.custo, "col-1 text-center");
        const habilidadeColCooldown = createColumn(habilidade.cooldown, "col-1 text-center");
        const habilidadeColDescricao = createColumn(habilidade.description.replace(/\n/g, '<br>'), "col-6 habilidade-descricao-justify");

        const habilidadeRow = document.createElement("div");
        habilidadeRow.classList.add("row", "habilidade-row");

        habilidadeRow.appendChild(habilidadeColNome);
        habilidadeRow.appendChild(habilidadeColLevel);
        habilidadeRow.appendChild(habilidadeColTipo);
        habilidadeRow.appendChild(habilidadeColCusto);
        habilidadeRow.appendChild(habilidadeColCooldown);
        habilidadeRow.appendChild(habilidadeColDescricao);

        habilidadesRow.appendChild(habilidadeRow);
    });
}

function createColumn(content, columnClass) {
    const column = document.createElement("div");
    column.classList.add(...columnClass.split(' '));
    column.innerHTML = content;
    return column;
}

function saveSelection() {
    const selectedClasse = document.querySelector('input[name="classe"]:checked').value;

    localStorage.setItem('selectedOrigin', selectedOrigin);
    localStorage.setItem('selectedRace', selectedRace);
    localStorage.setItem('selectedCaminho', selectedCaminho);
    localStorage.setItem('caminhosPontosPericia', caminhosPontosPericia);
    localStorage.setItem('savePilha', savePilha);
    localStorage.setItem('saveFortitude', saveFortitude);
    localStorage.setItem('saveReflexo', saveReflexo);
    localStorage.setItem('saveVontade', saveVontade);
    localStorage.setItem('saveClasse', selectedClasse);

    window.location.href = 'passados.html';
}

function goBack() {
    window.history.back();
}
