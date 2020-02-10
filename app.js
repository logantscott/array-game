import Sortable, { Swap } from './node_modules/sortablejs/modular/sortable.core.esm.js';
import { data, direction } from './data.js';

let el = document.getElementById('items');
let topEl = document.getElementById('topitems');
let botEl = document.getElementById('botitems');

const mainArray = document.getElementById('items');
const topArray = document.getElementById('topitems');
const botArray = document.getElementById('botItems');

const listItems = mainArray.getElementsByTagName('li');

Sortable.mount(new Swap());

let fromEl;
let toEl;

let currentMethod;

function nextMethod() {
    return [Object.keys(data)[Math.floor(Math.random() * Object.keys(data))], Object.keys(direction)[Math.floor(Math.random() * Object.keys(direction))]];
}

function parseMethod(random) {
    let randomData = random[0];
    let randomDirection = random[1];


}

// sortable.animation = 150;
// sortable.ghostClass = 'blue-background-class';

let dragGhost = {};

let sortable = new Sortable(el, {
    animation: 300,
    sort: false,
    filter: '.filtered',
    group: {
        name: 'shared'
    },
    ghostClass: 'blue-background-class',
    emptyInsertThreshold: 30,
    direction: 'horizontal',
    swapThreshold: 0.5,
    setData: function(dataTransfer, dragEl) {
        // Create the clone (with content)
        dragGhost = dragEl.cloneNode(true);
        // Stylize it
        dragGhost.classList.add('hidden-drag-ghost');
        // Place it into the DOM tree
        document.body.appendChild(dragGhost);
        // Set the new stylized "drag image" of the dragged element
        dataTransfer.setDragImage(dragGhost, 0, 0);
    },
      // Don't forget to remove the ghost DOM object when done dragging
    onStart: function(evt) {
        // console.log('start');
        // console.log(evt);
    },
    onEnd: function(evt) {
        dragGhost.parentNode.removeChild(dragGhost);
        // console.log(evt);
        let newEvt = {};
        // console.log(newEvt);
        fromEl = evt.from;
        toEl = evt.to;
        // switch (evt.oldIndex) {
        //     case 0:
        //         listItems[0].insertAdjacentElement('beforebegin', evt.item);
        //         break;
        //     case 1:
        //         listItems[1].insertAdjacentElement('beforebegin', evt.item);
        //         break;
        //     case 2:
        //         listItems[1].insertAdjacentElement('afterend', evt.item);
        //         break;
        // }
    }
});

let topSortable = new Sortable(topEl, {
    animation: 300,
    swap: true,
    direction: 'horizontal',
    swapThreshold: 0.5,
    group: {
        name: 'shared'
    },
    ghostClass: 'blue-background-class',
    emptyInsertThreshold: 30,
    setData: function(dataTransfer, dragEl) {
        // Create the clone (with content)
        dragGhost = dragEl.cloneNode(true);
        // Stylize it
        dragGhost.classList.add('hidden-drag-ghost');
        // Place it into the DOM tree
        document.body.appendChild(dragGhost);
        // Set the new stylized "drag image" of the dragged element
        dataTransfer.setDragImage(dragGhost, 0, 0);
    },
      // Don't forget to remove the ghost DOM object when done dragging
    onEnd: function(evt) {
        dragGhost.parentNode.removeChild(dragGhost);
        // console.log(evt.oldIndex);
    }
});

let botSortable = new Sortable(botEl, {
    animation: 300,
    direction: 'horizontal',
    swapThreshold: 0.5,
    group: {
        name: 'shared'
    },
    ghostClass: 'blue-background-class',
    emptyInsertThreshold: 30,
    setData: function(dataTransfer, dragEl) {
        // Create the clone (with content)
        dragGhost = dragEl.cloneNode(true);
        // Stylize it
        dragGhost.classList.add('hidden-drag-ghost');
        // Place it into the DOM tree
        document.body.appendChild(dragGhost);
        // Set the new stylized "drag image" of the dragged element
        dataTransfer.setDragImage(dragGhost, 0, 0);
    },
      // Don't forget to remove the ghost DOM object when done dragging
    onEnd: function() {
        dragGhost.parentNode.removeChild(dragGhost);
    }
});

const container = document.getElementById('game-container');

// let left = document.createElement('span');
// let right = document.createElement('span');

// left.textContent = '[';
// right.textContent = ']';

// left.draggable = true;
// left.style.position = 'relative';

// container.insertBefore(left, container.firstChild);
// container.appendChild(right);

//TOP
const topcontainer = document.getElementById('top-container');

let topLeft = document.createElement('span');
let topRight = document.createElement('span');

topLeft.textContent = '(';
topRight.textContent = ')';

topLeft.draggable = true;
topLeft.style.position = 'relative';

topcontainer.insertBefore(topLeft, topcontainer.firstChild);
topcontainer.appendChild(topRight);

//BOTTOM
const botcontainer = document.getElementById('bot-container');

let botLeft = document.createElement('span');
let botRight = document.createElement('span');

botLeft.textContent = '(';
botRight.textContent = ')';

botLeft.draggable = true;
botLeft.style.position = 'relative';

botcontainer.insertBefore(botLeft, botcontainer.firstChild);
botcontainer.appendChild(botRight);

let leftpos = 0;
// leftpos = left.offsetLeft;
// console.log(leftpos);


// Make the DIV element draggable:
// dragElement(left);

// left.addEventListener('dragmou')

function dragElement(elmnt) {
    let pos1 = 0, pos2 = 0;
    if (document.getElementById(elmnt.id + 'header')) {
    // if present, the header is where you move the DIV from:
        document.getElementById(elmnt.id + 'header').onmousedown = dragMouseDown;
    } else {
    // otherwise, move the DIV from anywhere inside the DIV:
        elmnt.onmousedown = dragMouseDown;
    }

    function dragMouseDown(e) {
        e = e || window.event;
        e.preventDefault();
    // get the mouse cursor position at startup:
        pos2 = e.clientX;
        // console.log(leftpos);
        document.onmouseup = closeDragElement;
    // call a function whenever the cursor moves:
        document.onmousemove = elementDrag;
    }

    function elementDrag(e) {
        e = e || window.event;
        e.preventDefault();
    // calculate the new cursor position:
        pos1 = pos2 - e.clientX;
        pos2 = e.clientX;
        // console.log('elmnt.offsetLeft / leftpos: ' + (300 - ((Math.pow(((300)), Math.min((e.clientX) / leftpos, .99))))) + ';  math.pow: ' + (Math.min((e.clientX) / leftpos, .99)) + ';  elmnt.offsetLeft: ' + (elmnt.offsetLeft - 1) + ';  leftpos: ' + (leftpos));
    // set the element's new position:
        // elmnt.style.top = (elmnt.offsetTop) + 'px';
        elmnt.style.left = leftpos;
        elmnt.style.left = ((Math.pow(300, Math.min((e.clientX) / leftpos, .99)))) - 300 + 'px';

        
    }

    function closeDragElement() {
    // stop moving when mouse button is released:
        document.onmouseup = null;
        document.onmousemove = null;
        // console.log(leftpos);
        // console.log(left);
        elmnt.style.left = 0 + 'px';
        elmnt.style.transition = '.4s';
    }
}