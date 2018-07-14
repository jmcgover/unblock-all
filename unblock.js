function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}
function clickAll(buttons) {
    for (i = 0; i < buttons.length; i++) {
        var button = buttons[i];

        // If somebody runs the script twice, we don't want to follow
        // the account they've just unblocked by re-clicking the buttons.
        //
        // We'll mark each button with an attribute so we know what we've
        // already clicked.
        var trackingAttribute = "hasBeenClickedByUnblockAll";
        if (button.getAttribute(trackingAttribute) === null) {
            button.click();
            button.setAttribute(trackingAttribute, true);
        }
    }
}
async function unblock(timeoutMs, maxScrolls) {
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

    var unblockButtons = document.getElementsByClassName("blocked-text")
    var actuallyBlock = confirm("Do you want to unblock all " + unblockButtons.length + " accounts?");
    if (actuallyBlock) {
        clickAll(unblockButtons);
    }
}
function main() {
    unblock(500);
}
