
const canvas = document.getElementById('canvas');
const propertiesPanel = document.getElementById('propertiesPanel');
const propertyFields = document.getElementById('propertyFields');
let selectedElement = null;

document.querySelectorAll('.element').forEach(elem => {
  elem.addEventListener('dragstart', e => {
    e.dataTransfer.setData('type', e.target.dataset.type);
  });
});

function drop(e) {
  e.preventDefault();
  const type = e.dataTransfer.getData('type');
  const newElem = createElement(type);
  canvas.appendChild(newElem);
  document.querySelector('.placeholder')?.remove();
}

function createElement(type) {
  let elem;
  switch (type) {
    case 'text':
      elem = document.createElement('div');
      elem.textContent = 'Editable Text';
      elem.style.fontSize = '16px';
      elem.style.padding = '5px';
      break;
    case 'image':
      elem = document.createElement('img');
      elem.src = 'ck.jpg';
      elem.style.width = '150px';
      elem.style.display = 'block';
      break;
    case 'button':
      elem = document.createElement('button');
      elem.textContent = 'Click Me';
      break;
  }
  elem.style.margin = '10px 0';
  elem.setAttribute('data-type', type);
  elem.onclick = () => showProperties(elem);
  return elem;
}

function showProperties(elem) {
  selectedElement = elem;
  propertiesPanel.style.display = 'block';
  propertyFields.innerHTML = '';

  const type = elem.getAttribute('data-type');

  if (type === 'text' || type === 'button') {
    propertyFields.innerHTML += `
      <label>Text:</label>
      <input type="text" value="${elem.textContent}" onchange="selectedElement.textContent = this.value" />
      <label>Font Size (px):</label>
      <input type="number" value="${parseInt(elem.style.fontSize) || 16}" onchange="selectedElement.style.fontSize = this.value + 'px'" />
      <label>Color:</label>
      <input type="color" onchange="selectedElement.style.color = this.value" />
    `;
  }

  if (type === 'image') {
    propertyFields.innerHTML += `
      <label>Image URL:</label>
      <input type="text" value="${elem.src}" onchange="selectedElement.src = this.value" />
      <label>Width (px):</label>
      <input type="number" value="${parseInt(elem.style.width) || 150}" onchange="selectedElement.style.width = this.value + 'px'" />
    `;
  }
}

function deleteElement() {
  if (selectedElement) {
    selectedElement.remove();
    propertiesPanel.style.display = 'none';
  }
}
