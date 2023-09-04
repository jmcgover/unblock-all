function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}
async function unblockOrUnmute(timeoutMs, maxIter, scrollHeight, isUnblock) {
    // TODO check that user is on settings/privacy and safety/mute and block/blocked|muted accounts page
    const actionMsg = isUnblock ? 'unblock' : 'unmute';
    if (!confirm(`Do you want to ${actionMsg} all accounts?`)) {
        return;
    }

    // TODO perf - query button container instead of document
    //  buttonContainer = document.querySelector('div[aria-label$="Blocked accounts"]');
    const btnSelector = isUnblock ? 
        'div[aria-label="Blocked"]' :
        'div[role="button"][aria-label^="Unmute "]';
    let buttons = document.querySelectorAll(btnSelector);
    let iterCount = 0;
    do {
        buttons.forEach((b) => {
            const btnUser = b.previousElementSibling.querySelector('SPAN SPAN').innerText;
            console.debug(`${actionMsg},iterCount="${iterCount}",btnUser="${btnUser}"`);
            //b.click();
        });
        window.scrollBy(0,scrollHeight);
        await sleep(timeoutMs);
        buttons = document.querySelectorAll(btnSelector);
    } while (buttons.length && ++iterCount < maxIter);
}
function main() {
    unblockOrUnmute(1000, 2, 100, true);
}
