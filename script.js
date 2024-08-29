const data = [
    { text: "Freedom of speech and expression", article: "Article 19" },
    { text: "Right to equality", article: "Article 14" },
    { text: "Right to life and personal liberty", article: "Article 21" },
];

const isTouchDevice = () => {
    try {
        document.createEvent("TouchEvent");
        return true;
    } catch (e) {
        return false;
    }
};

const randomValueGenerator = () => {
    return data[Math.floor(Math.random() * data.length)];
};

let count = 0;

const stopGame = () => {
    document.querySelector(".controls-container").classList.remove("hide");
    document.getElementById("start").classList.remove("hide");
};

function dragStart(e) {
    e.dataTransfer.setData("text", e.target.id);
}

function dragOver(e) {
    e.preventDefault();
}

function drop(e) {
    e.preventDefault();
    const draggedElementData = e.dataTransfer.getData("text");
    const droppableElementData = e.target.getAttribute('data-id');

    if (draggedElementData === droppableElementData) {
        e.target.classList.add("dropped");
        document.getElementById(draggedElementData).classList.add("hide");
        e.target.innerHTML = `<p>${draggedElementData}</p>`;
        count += 1;
        if (count === 3) {
            document.getElementById("result").innerText = 'You Won!';
            stopGame();
        }
    }
}

const startGame = () => {
    count = 0;
    document.querySelector(".controls-container").classList.add("hide");
    document.getElementById("start").classList.add("hide");

    let randomData = [];
    while (randomData.length < 3) {
        let randomValue = randomValueGenerator();
        if (!randomData.includes(randomValue)) {
            randomData.push(randomValue);
        }
    }

    const dragContainer = document.querySelector(".draggable-objects");
    const dropContainer = document.querySelector(".drop-points");
    dragContainer.innerHTML = "";
    dropContainer.innerHTML = "";

    randomData.forEach(item => {
        const textDiv = document.createElement("div");
        textDiv.classList.add("draggable-text");
        textDiv.setAttribute("draggable", true);
        textDiv.id = item.text;
        textDiv.innerText = item.text;
        dragContainer.appendChild(textDiv);

        const articleDiv = document.createElement("div");
        articleDiv.classList.add("articles");
        articleDiv.setAttribute("data-id", item.text);
        articleDiv.innerText = item.article;
        dropContainer.appendChild(articleDiv);
    });

    document.querySelectorAll(".draggable-text").forEach(element => {
        element.addEventListener("dragstart", dragStart);
    });

    document.querySelectorAll(".articles").forEach(element => {
        element.addEventListener("dragover", dragOver);
        element.addEventListener("drop", drop);
    });
};

document.getElementById("start").addEventListener("click", startGame);
