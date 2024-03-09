document.addEventListener('DOMContentLoaded', function() {
    document.querySelector('#back-to-hugo').addEventListener('click', function(){
        window.history.back();
    });
});

const pdfPaths = {
    all: [
    'pdfs/(1) Calvin & Hobbes - Bill Watterson.pdf',
    'pdfs/(2) Something Under the Bed is Drooling - Bill Watterson.pdf',
    'pdfs/(3) Yukon Ho! - Bill Watterson.pdf',
    'pdfs/(4) Weirdos From Another Planet - Bill Watterson.pdf',
    'pdfs/(5) Revenge of the Baby-Sat - Bill Watterson.pdf',
    'pdfs/(6) Scientific Progress Goes Boink! - Bill Watterson.pdf',
    'pdfs/(7) Attack of the Deranged Mutant Killer Monster Snow Goons - Bill Watterson.pdf',
    'pdfs/(8) The Days are Just Packed - Bill Watterson.pdf',
    'pdfs/(9) Homocidal Psycho Jungle Cat - Bill Watterson.pdf',
    'pdfs/(10) Theres Treasure Everywhere - Bill Watterson.pdf',
    'pdfs/(11) Its a Magical World - Bill Watterson.pdf',
    'pdfs/(M) Calvin and Hobbes Miscellaneous - Bill Watterson.pdf',
    'pdfs/(S) Calvin and Hobbes Sunday Pages - Bill Watterson.pdf'
    ],
    favoriteslist: [
    'pdfs/(1) Calvin & Hobbes - Bill Watterson.pdf',
    'pdfs/(2) Something Under the Bed is Drooling - Bill Watterson.pdf',
    'pdfs/(3) Yukon Ho! - Bill Watterson.pdf',
    'pdfs/(4) Weirdos From Another Planet - Bill Watterson.pdf',
    'pdfs/(5) Revenge of the Baby-Sat - Bill Watterson.pdf',
    'pdfs/(6) Scientific Progress Goes Boink! - Bill Watterson.pdf',
    'pdfs/(7) Attack of the Deranged Mutant Killer Monster Snow Goons - Bill Watterson.pdf',
    'pdfs/(8) The Days are Just Packed - Bill Watterson.pdf',
    'pdfs/(9) Homocidal Psycho Jungle Cat - Bill Watterson.pdf',
    'pdfs/(10) Theres Treasure Everywhere - Bill Watterson.pdf',
    'pdfs/(11) Its a Magical World - Bill Watterson.pdf',
    'pdfs/(M) Calvin and Hobbes Miscellaneous - Bill Watterson.pdf',
    'pdfs/(S) Calvin and Hobbes Sunday Pages - Bill Watterson.pdf'
    ],
    volume1: ['pdfs/(1) Calvin & Hobbes - Bill Watterson.pdf'],
    volume2: ['pdfs/(2) Something Under the Bed is Drooling - Bill Watterson.pdf'],
    volume3: ['pdfs/(3) Yukon Ho! - Bill Watterson.pdf'],
    volume4: ['pdfs/(4) Weirdos From Another Planet - Bill Watterson.pdf',],
    volume5: [ 'pdfs/(5) Revenge of the Baby-Sat - Bill Watterson.pdf'],
    volume6: ['pdfs/(6) Scientific Progress Goes Boink! - Bill Watterson.pdf'],
    volume7: ['pdfs/(7) Attack of the Deranged Mutant Killer Monster Snow Goons - Bill Watterson.pdf'],
    volume8: ['pdfs/(8) The Days are Just Packed - Bill Watterson.pdf'],
    volume9: ['pdfs/(9) Homocidal Psycho Jungle Cat - Bill Watterson.pdf'],
    volume10: ['pdfs/(10) Theres Treasure Everywhere - Bill Watterson.pdf'],
    volume11: ['pdfs/(11) Its a Magical World - Bill Watterson.pdf'],
    volumeM: ['pdfs/(M) Calvin and Hobbes Miscellaneous - Bill Watterson.pdf'],
    volumeS: ['pdfs/(S) Calvin and Hobbes Sunday Pages - Bill Watterson.pdf'], 
};

let unseenPDFPaths = [];

function loadRandomComic() {
    const selectedVolume = document.getElementById('volume-selector').value;

    // Initialize or reset the unseenPDFPaths array when all comics are seen
    if (unseenPDFPaths.length === 0) {
        unseenPDFPaths = Array.from(pdfPaths[selectedVolume]);
    }

    const randomIndex = Math.floor(Math.random() * unseenPDFPaths.length);
    const randomPdfPath = unseenPDFPaths[randomIndex];
    unseenPDFPaths.splice(randomIndex, 1); // Remove the seen comic

    pdfjsLib.getDocument(randomPdfPath).promise.then(function(pdfDoc) {
        const numPages = pdfDoc.numPages;
        const randomPageNumber = Math.floor(Math.random() * numPages) + 1;

        pdfDoc.getPage(randomPageNumber).then(function(page) {
            const scale = 2; // Adjust the scale for higher resolution
            const viewport = page.getViewport({ scale: scale });
            const canvas = document.getElementById('pdfCanvas');
            const context = canvas.getContext('2d');

            canvas.height = viewport.height;
            canvas.width = viewport.width;

            // Render PDF page into canvas context
            const renderContext = {
                canvasContext: context,
                viewport: viewport
            };
            const renderTask = page.render(renderContext);

            renderTask.promise.then(function () {
                console.log('Page rendered');
            });
        });
    }).catch(function (error) {
        // Handle errors (e.g., PDF loading failed)
        console.error('Error loading PDF: ', error);
    });
}

// Add event listener to the 'Add to Favorites' button
loadRandomComic();
document.getElementById('random-cartoon').addEventListener('click', loadRandomComic);
document.getElementById('volume-selector').addEventListener('change', loadRandomComic);
window.onload = loadRandomComic();

function toggleColor(){
    const body = document.body;
    body.classList.toggle('white-background');
    body.classList.toggle('black-background');
}

document.getElementById('toggle').addEventListener('click',toggleColor);