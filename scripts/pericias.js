let selectedOrigin = localStorage.getItem('selectedOrigin');
    let selectedRace = localStorage.getItem('selectedRace');
    let selectedCaminho = localStorage.getItem('selectedCaminho');
    let savePilha = localStorage.getItem('savePilha');
    let saveFortitude = localStorage.getItem('saveFortitude');
    let saveReflexo = localStorage.getItem('saveReflexo');
    let saveVontade = localStorage.getItem('saveVontade');
    let caminhosPontosPericia = localStorage.getItem('caminhosPontosPericia');
    let saveClasse = localStorage.getItem('saveClasse');
    let savePassado = localStorage.getItem('savePassado');
    let savePassadoSkill = localStorage.getItem('savePassadoSkill');
	let saveCaracteristica = localStorage.getItem('saveCaracteristica');

    document.getElementById('selected-origin').innerText = localStorage.getItem('selectedOrigin');
    document.getElementById('selected-race').innerText = localStorage.getItem('selectedRace');
    document.getElementById('selected-caminho').innerText = localStorage.getItem('selectedCaminho');
    document.getElementById('save-pilha').innerText = localStorage.getItem('savePilha');
    document.getElementById('save-fortitude').innerText = localStorage.getItem('saveFortitude');
    document.getElementById('save-reflexo').innerText = localStorage.getItem('saveReflexo');
    document.getElementById('save-vontade').innerText = localStorage.getItem('saveVontade');
    document.getElementById('caminhos-pontos-pericia').innerText = localStorage.getItem('caminhosPontosPericia');
    document.getElementById('selected-classe').innerText = localStorage.getItem('saveClasse');
    document.getElementById('selected-passado').innerText = savePassado;
	document.getElementById('selected-categoria').innerText = saveCaracteristica;

	let selectedCaminhoData;

    fetch("../json/caminhos.json")
        .then((response) => response.json())
        .then((data) => {
            selectedCaminhoData = data.caminhos.find(caminho => caminho.name === selectedCaminho);
            if (selectedCaminhoData) {
                const pericias1Container = document.getElementById("pericias1");
                const pericias2Container = document.getElementById("pericias2");
                const pericias3Container = document.getElementById("pericias3");
                const pericias4Container = document.getElementById("pericias4");

                fetch('../json/pericias.json')
                    .then(response => response.json())
                    .then(periciasData => {
                        displayPericias(selectedCaminhoData.pericias_1, pericias1Container, periciasData.pericias);
                        displayPericias(selectedCaminhoData.pericias_2, pericias2Container, periciasData.pericias);
                        displayPericias(selectedCaminhoData.pericias_3, pericias3Container, periciasData.pericias);
                        displayPericias(selectedCaminhoData.pericias_4, pericias4Container, periciasData.pericias);
						
						const listaPericias1Container = document.getElementById("lista-pericias1");
						const listaPericias2Container = document.getElementById("lista-pericias2");
						
						const selectedPericias = [
                        ...selectedCaminhoData.pericias_1,
                        ...selectedCaminhoData.pericias_2,
                        ...selectedCaminhoData.pericias_3,
                        ...selectedCaminhoData.pericias_4
                    ];
						const filteredPericias = periciasData.pericias.filter(pericia => selectedPericias.includes(pericia.name));

						const firstTenPericias = filteredPericias.slice(0, 10);
						const remainingPericias = filteredPericias.slice(10);
						
						displayListaPericias(firstTenPericias, listaPericias1Container);
						displayListaPericias(remainingPericias, listaPericias2Container);
						
						addDragStartListeners(listaPericias1Container, 3, selectedCaminhoData); // dropbox-primarias
						addDragStartListeners(listaPericias2Container, 2, selectedCaminhoData); // dropbox-secundarias
						addDragStartListeners(document.getElementById("dropbox-terciarias"), 1, selectedCaminhoData); // dropbox-terciarias
                    });
            } else {
                console.error(`Selected caminho '${selectedCaminho}' not found in caminhos.json`);
            }
        })
        .catch((error) => {
            console.error("Erro ao carregar o arquivo JSON:", error);
        });
		
	

    function displayPericias(periciasArray, container, periciasData) {
    // Clear the container first
    while (container.firstChild) {
        container.removeChild(container.firstChild);
    }

    // Filter out savePassadoSkill from the current container's periciasArray
    const filteredPericias = periciasArray.filter(p => p !== savePassadoSkill);

    // Add filtered pericias to the container
    filteredPericias.forEach((periciaName) => {
        const pericia = periciasData.find(per => per.name === periciaName);
        if (pericia) {
            const perLabel = document.createElement("label");
            perLabel.textContent = periciaName;
            perLabel.addEventListener('mouseenter', function () {
                showDescription(event, pericia.description);
            });

            perLabel.addEventListener('mouseleave', function () {
                hideDescription();
            });

            container.appendChild(perLabel);
            container.appendChild(document.createElement("br"));
        } else {
            console.error(`Perícia '${periciaName}' not found in pericias.json`);
        }
    });

    // Check if savePassadoSkill should be added to this container
    if (container.id === 'pericias1' && savePassadoSkill && !filteredPericias.includes(savePassadoSkill)) {
        const savedPericiaLabel = document.createElement("label");
        savedPericiaLabel.textContent = savePassadoSkill;
        savedPericiaLabel.addEventListener('mouseenter', function () {
            const savedPericia = periciasData.find(per => per.name === savePassadoSkill);
            if (savedPericia) {
                showDescription(event, savedPericia.description);
            } else {
                console.error(`Perícia '${savePassadoSkill}' not found in pericias.json`);
            }
        });

        savedPericiaLabel.addEventListener('mouseleave', function () {
            hideDescription();
        });

        container.appendChild(savedPericiaLabel);
        container.appendChild(document.createElement("br"));
    }
}

function displayListaPericias(periciasData, container) {
    // Clear the container first
    while (container.firstChild) {
        container.removeChild(container.firstChild);
    }

    // Add lista-pericias to the container
    periciasData.forEach(pericia => {
        const perLabel = document.createElement("label");
        perLabel.textContent = pericia.name;
        perLabel.draggable = true; // Make it draggable

        perLabel.addEventListener('dragstart', function (event) {
            event.dataTransfer.setData('text/plain', pericia.name);
        });

        container.appendChild(perLabel);
        container.appendChild(document.createElement("br"));
    });
}

function addDragStartListeners(container, costMultiplier, selectedCaminhoData) {
    container.querySelectorAll('label').forEach(label => {
        label.draggable = true;

        label.addEventListener('dragstart', function (event) {
            const periciaName = event.target.textContent;
            const periciaWeight = getPericiaWeight(periciaName, selectedCaminhoData);
            const cost = periciaWeight * costMultiplier;

            // Always set the drag data, regardless of points
            event.dataTransfer.setData('text/plain', periciaName);
            event.dataTransfer.setData('text/cost', cost.toString());
        });
    });
}

function getPericiaWeight(periciaName, selectedCaminhoData) {
    if (selectedCaminhoData && selectedCaminhoData.pericias_1 && selectedCaminhoData.pericias_1.includes(periciaName)) {
        return 1;
    } else if (selectedCaminhoData && selectedCaminhoData.pericias_2 && selectedCaminhoData.pericias_2.includes(periciaName)) {
        return 2;
    } else if (selectedCaminhoData && selectedCaminhoData.pericias_3 && selectedCaminhoData.pericias_3.includes(periciaName)) {
        return 3;
    } else if (selectedCaminhoData && selectedCaminhoData.pericias_4 && selectedCaminhoData.pericias_4.includes(periciaName)) {
        return 4;
    } else {
        return 0; // Default to 0 if not found in any periciaX
    }
}

function allowDrop(event) {
    event.preventDefault();
}

// Function to handle drop
function drop(event) {
    event.preventDefault();
    const periciaName = event.dataTransfer.getData('text/plain');

    // Check if periciaName is empty (indicating insufficient points)
    if (!periciaName) {
        return; // Do nothing if no valid periciaName
    }

    let periciaWeight = getPericiaWeight(periciaName, selectedCaminhoData);
    let cost = 0;

    // Determine the multiplier based on the drop zone
    let costMultiplier = 1; // Default multiplier for terciarias

    switch (event.target.id) {
        case 'dropbox-secundarias':
            costMultiplier = 2;
            break;
        case 'dropbox-primarias':
            costMultiplier = 3;

            // Check the number of items already dropped in dropbox-primarias
            const primariasContainer = document.getElementById('dropbox-primarias');
            const primariasItems = primariasContainer.querySelectorAll('.drop-item');
            if (saveCaracteristica == "Sabe-Tudo")
			{
				if (primariasItems.length >= 1)
				{
					alert("Você só pode ter no máximo 1 perícias primárias.");
					return; // Exit if maximum limit reached
				}
			}
			else {
				if (primariasItems.length >= 2) {
					alert("Você só pode ter no máximo 2 perícias primárias.");
					return; // Exit if maximum limit reached
				}
			}
            break;
        case 'dropbox-terciarias':
            costMultiplier = 1;
            break;
        default:
            break;
    }

    // Special case for savePassadoSkill (always treat it as pericias1)
    if (periciaName === savePassadoSkill) {
        periciaWeight = 1; // Set weight to 1 for savePassadoSkill
    }

    cost = periciaWeight * costMultiplier;

    // Check if user has enough points to drop the skill
    if (caminhosPontosPericia >= cost) {
        caminhosPontosPericia -= cost;
        localStorage.setItem('caminhosPontosPericia', caminhosPontosPericia);
        document.getElementById('caminhos-pontos-pericia').innerText = caminhosPontosPericia;

        const dropItem = document.createElement("div");
        dropItem.className = "drop-item";
        dropItem.textContent = periciaName;
        dropItem.dataset.cost = cost;

        const closeButton = document.createElement("span");
        closeButton.className = "close";
        closeButton.textContent = "×";
        closeButton.addEventListener("click", function() {
            const restorationCost = parseInt(dropItem.dataset.cost);
            caminhosPontosPericia += restorationCost;
            localStorage.setItem('caminhosPontosPericia', caminhosPontosPericia);
            document.getElementById('caminhos-pontos-pericia').innerText = caminhosPontosPericia;
            dropItem.remove();
        });

        dropItem.appendChild(closeButton);
        event.target.querySelector('.dropzone-content').appendChild(dropItem);
    }
}

// Event delegation for dynamically added close buttons
document.addEventListener('click', function(event) {
    if (event.target.classList.contains('close')) {
        const dropItem = event.target.parentElement;
        dropItem.remove(); // Remove the drop item when close button is clicked
    }
});

// Event delegation for dynamically added close buttons
document.addEventListener('click', function(event) {
    if (event.target.classList.contains('close')) {
        const dropItem = event.target.parentElement;
        const periciaName = dropItem.textContent;
        const cost = parseInt(event.dataTransfer.getData('text/cost'));

        // Restore points when item is removed
        caminhosPontosPericia += cost;
        localStorage.setItem('caminhosPontosPericia', caminhosPontosPericia);
        document.getElementById('caminhos-pontos-pericia').innerText = caminhosPontosPericia;

        // Remove the drop item from the DOM
        dropItem.remove();
    }
});

document.getElementById('caminhos-pontos-pericia').innerText = caminhosPontosPericia;

    let descriptionBox; // Define descriptionBox globally
    function showDescription(event, description) {
    if (!descriptionBox) {
        descriptionBox = document.createElement("div");
        descriptionBox.style.position = "absolute";
        descriptionBox.style.backgroundColor = "white";
        descriptionBox.style.border = "1px solid black";
        descriptionBox.style.padding = "10px";
        descriptionBox.style.maxWidth = "500px";
        document.body.appendChild(descriptionBox);
    }

    descriptionBox.textContent = description;

    // Calculate initial positions
    let boxTop = event.clientY + 10;
    let boxLeft = event.clientX + 10;

    // Adjust if the box exceeds the bottom of the window
    let windowHeight = window.innerHeight;
    let boxHeight = descriptionBox.offsetHeight; // Get the height of the description box

    if (boxTop + boxHeight > windowHeight) {
        boxTop = windowHeight - boxHeight - 10; // Adjust so it stays within the window
    }

    descriptionBox.style.top = `${boxTop}px`;
    descriptionBox.style.left = `${boxLeft}px`;
}

    function hideDescription() {
        if (descriptionBox) {
            descriptionBox.remove();
            descriptionBox = null;
        }
    }

    function saveSelection() {
    // Save other selections as before
    localStorage.setItem('selectedOrigin', selectedOrigin);
    localStorage.setItem('selectedRace', selectedRace);
    localStorage.setItem('selectedCaminho', selectedCaminho);
    localStorage.setItem('caminhosPontosPericia', caminhosPontosPericia);
    localStorage.setItem('savePilha', savePilha);
    localStorage.setItem('saveFortitude', saveFortitude);
    localStorage.setItem('saveReflexo', saveReflexo);
    localStorage.setItem('saveVontade', saveVontade);
    localStorage.setItem('savePassado', savePassado);
	localStorage.setItem('saveCaracteristica', saveCaracteristica);

    // Save perícias from dropboxes
    const periciasPrimarias = [];
    const periciasSecundarias = [];
    const periciasTerciarias = [];

    const dropboxPrimarias = document.getElementById('dropbox-primarias');
    const dropboxSecundarias = document.getElementById('dropbox-secundarias');
    const dropboxTerciarias = document.getElementById('dropbox-terciarias');

    collectPericias(dropboxPrimarias, periciasPrimarias);
    collectPericias(dropboxSecundarias, periciasSecundarias);
    collectPericias(dropboxTerciarias, periciasTerciarias);

    localStorage.setItem('periciasPrimarias', JSON.stringify(periciasPrimarias));
    localStorage.setItem('periciasSecundarias', JSON.stringify(periciasSecundarias));
    localStorage.setItem('periciasTerciarias', JSON.stringify(periciasTerciarias));

    // Navigate to end.html
    window.location.href = 'end.html';
}

	function collectPericias(dropbox, periciasArray) {
    const dropzoneContent = dropbox.querySelector('.dropzone-content');
    const dropItems = dropzoneContent.querySelectorAll('.drop-item');

    dropItems.forEach(item => {
        let periciaName = item.textContent;
        // Remove the last character from periciaName
        periciaName = periciaName.slice(0, -1);
        periciasArray.push(periciaName);
    });
}

    function goBack() {
        window.history.back();
    }