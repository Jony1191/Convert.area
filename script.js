const inputData = document.getElementById('inputData');
const outputData = document.getElementById('outputData');
const realTimeClock = document.getElementById('realTimeClock');

// Configuration for the converter
const delimiter = ',';
const itemPrefix = '';
const itemSuffix = '';
const resultPrefix = '';
const resultSuffix = '';

function convertData() {
    // Split input by new line, trim whitespace, and filter out empty lines
    const lines = inputData.value.split('\n').map(line => line.trim()).filter(line => line !== '');
    // Apply prefix and suffix to each line
    const processedLines = lines.map(line => itemPrefix + line + itemSuffix);
    // Join lines with the specified delimiter and apply result prefix/suffix
    const result = resultPrefix + processedLines.join(delimiter) + resultSuffix;
    outputData.textContent = result;
}

function copyToClipboard() {
    const textToCopy = outputData.textContent;
    if (textToCopy) {
        navigator.clipboard.writeText(textToCopy)
            .then(() => {
                console.log('Text copied to clipboard!');
                alert('Text copied to clipboard!'); // User feedback
            })
            .catch(err => {
                console.error('Failed to copy: ', err);
                alert('Failed to copy text. Please copy it manually or check browser permissions.');
            });
    } else {
        alert('Nothing to copy!');
    }
}

// Function to update the clock
function updateClock() {
    const now = new Date();
    const options = {
        hour: '2-digit',
        minute: '2-digit',
        second: '2-digit',
        hour12: true // AM/PM format
    };
    realTimeClock.textContent = now.toLocaleTimeString('en-US', options);
}

// Event listener for input changes
inputData.addEventListener('input', convertData);

// Initial conversion when the page loads
convertData();

// Update the clock immediately and then every second
updateClock();
setInterval(updateClock, 1000);