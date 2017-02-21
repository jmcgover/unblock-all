# unblock-all
A javascript script that unblocks all of a Twitter user's blocked Twitter accounts

# Overview
Unblocking everyone blocked on Twitter involves navigating to the blocked accounts (https://twitter.com/settings/blocked) page, scrolling down to the bottom until webpage loads the next few accounts, and then clicking the Ublock button one by one.
This script attempts to automate the process of scrolling until everyone is loaded, finding the block buttons, and automatically clicking them.
The `unblock.js` script performs each of those tasks by scrolling to the bottom of the page, waiting for it to load via a set timeout, and then continuing to scroll until it observes no difference in scroll height.
Once the script can no longer scroll, it finds all of the unblock buttons, by searching for the `'blocked-text'` class elements (à la https://gist.github.com/themorgantown/3e3e6a42e17ebcbc766c) and clicking on each of them individually.

# Usage
1. Open Google Chrome
1. Navigate to https://twitter.com/settings/blocked
 * Sign in, if necessary
1. Disable or whitelist any adblock or similar blocking extensions (just in case --- I have no idea if this is a problem)
1. Open the Javascript Console:
 * Windows/Linux: ``Ctrl + Shift + J``
 * OS X: ``Cmd + Option +J``
1. Paste the contents of ``unblock.js`` into the Console window
1. Run `main()` for a default scroll waiting period of 500ms or `unblock(timeoutInMilliseconds)` for a custom timeout.
1. Let it chooch
1. When the dialog pops up, verify that the number of blocked accounts obtained makes sense
 * Click Ok/Yes to unblock every account
 * Click Cancel/No to do nothing
1. Refresh the page to verify that accounts have been unblocked

# Issues
* If you **accidentally run the unblock script twice** (via either `main()` or `unblock(...)`) **without reloading**, you will follow everyone you just unblocked. 

 *If this occurs*:
  * **DO NOT RELOAD THE PAGE**
  * Run the script again
  * Press Ok/Yes to "unblock" every account. The button clicked by the script remains the same, but will instead unfollow the accounts.
