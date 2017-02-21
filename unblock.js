function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}
function clickAll(buttons) {
    for (i = 0; i < buttons.length; i++) {
        buttons[i].click();
    }
}
async function unblock() {
    var timeoutMs = 500;
    var prevScrollY;
    var scrollY = window.scrollY;
    do {
        window.scrollTo(0,document.body.scrollHeight);
        prevScrollY = scrollY;
        await sleep(timeoutMs);
        scrollY = window.scrollY;
    } while((scrollY - prevScrollY) > 0);

    var unblockButtons = document.getElementsByClassName("blocked-text")
    var actuallyBlock = confirm("Do you want to unblock all " + unblockButtons.length + " accounts?");
    if (actuallyBlock) {
        clickAll(unblockButtons);
    }
}
