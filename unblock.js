function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}
function clickAll(buttons) {
    for (i = 0; i < buttons.length; i++) {
        buttons[i].click();
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
