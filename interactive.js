const {titleHTMLElement, title, animeId} = getAnimeInfo()

// Hama scanner for Plex searches titles in this format
const clipboardText = title + " [anidb-" + animeId + "]";

setupTooltipElements(titleHTMLElement, clipboardText);


function getAnimeInfo() {
    // Main title currently located as a child to a 'romaji' class. Might change in the future
    const titleHTMLElement = document.querySelector('.romaji [itemprop="name"]');
    const title = titleHTMLElement.textContent

    const url = window.location.pathname;
    const animeId = url.substring(url.lastIndexOf('/') + 1);

    return {
        titleHTMLElement,
        title,
        animeId,
    }
}


function setupTooltipElements(parentElement, copiedText) {
    // Create tooltip text element to add to existing title element
    const tooltipTextSpan = document.createElement("span");
    tooltipTextSpan.textContent = "Copy to Clipboard";
    tooltipTextSpan.setAttribute('id', 'title-tooltip__text')
    tooltipTextSpan.classList.add("tooltip__text")
    parentElement.appendChild(tooltipTextSpan);
    parentElement.classList.add("main-title", "tooltip")

    // Setup tooltip events
    parentElement.onclick = function () {
        navigator.clipboard.writeText(copiedText);
        tooltipTextSpan.innerHTML = "Copied:\n" + copiedText;
    };
    parentElement.onmouseout = function () {
        tooltipTextSpan.innerHTML = "Copy to clipboard";
    }
}
