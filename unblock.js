function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}
function clickAll(buttons) {
    for (i = 0; i < buttons.length; i++) {
        buttons[i].click();
    }
}
async function scrollAll(timeoutMs, maxScrolls) {
    var prevScrollY;
    var scrollY = window.scrollY;
    var numScrolls = 0;
    do {
        window.scrollTo(0,document.body.scrollHeight);
        numScrolls++;
        prevScrollY = scrollY;
        await sleep(timeoutMs);
        scrollY = window.scrollY;
    } while((scrollY - prevScrollY) > 0 && (typeof maxScrolls === 'undefined' || numScrolls < maxScrolls));
}
async function unblock(timeoutMs, maxScrolls) {
    await scrollAll(timeoutMs, maxScrolls);
    // user must be on settings/privacy and safety/blocked accounts page
    // let blockedContainer = document.querySelector('div[aria-label$="Blocked accounts"]');
    let unblockButtons = document.querySelectorAll('div[aria-label="Blocked"]');
    var actuallyBlock = confirm("Do you want to unblock all " + unblockButtons.length + " accounts?");
    if (actuallyBlock) {
        clickAll(unblockButtons);
    }
}
async function unmute(timeoutMs, maxScrolls) {
    // TODO check that user is on settings/privacy and safety/muted accounts page
    let actuallyMute = confirm("Do you want to unmute all accounts?");
    if (!actuallyMute) {
        return;
    }
    
    let muteButtons = document.querySelectorAll('div[role="button"][aria-label^="Unmute "]');
    do {
        muteButtons.forEach((b) => b.click());
        window.scrollBy(0,2500);
        await sleep(1000);
        muteButtons = document.querySelectorAll('div[role="button"][aria-label^="Unmute "]');
    } while (muteButtons.length);
}
function main() {
    unmute(500);
}
