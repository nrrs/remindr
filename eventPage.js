console.log('====================================');
console.log('eventPage.js');
console.log('====================================');

const reminderKey = 'reminder';

// Get Storage.local
chrome.storage.local.get(null, obj => console.log('Get Storage: ', obj));

// Get Alarms
chrome.alarms.getAll(obj => console.log('Get Alarms: ', obj));

// Get Notifications
chrome.notifications.getAll(obj => console.log('Get Notifications: ', obj));

/* 
 * Add Listeners
 */
chrome.alarms.onAlarm.addListener(function(alarm) {
    console.log(`Alarm [${Date.now()}]`, alarm);
    var notification = { type: "basic", title: "Remindrs!", message: `${alarm.name}`, iconUrl: "./favicon.png" };
    pushNotification(notification);
});

chrome.storage.onChanged.addListener(function(storageObj) {
    console.log('Storage Updated: ', storageObj.reminders);
});

chrome.browserAction.onClicked.addListener(function() {
    console.log('Browser Action: clicked');
    openOrFocusOptionsPage();
});

chrome.notifications.onClicked.addListener(function() {
    console.log('Clicked outside notification close');
    clearNotification();
});

/*
 * Helpers
 */
function clearNotification() {
    chrome.notifications.getAll(items => {
        if (items) {
            for (let key in items) {
                if (key == reminderKey) { chrome.notifications.clear(key); }
            }
        }
    });
}

function pushNotification(opt) {
    chrome.notifications.create('remindr', opt, () =>
      console.log("Notification Created: ", opt)
    );
}

function openOrFocusOptionsPage() {
    const optionsURL = chrome.extension.getURL("options.html");

    chrome.tabs.query({}, function(tabs) {
        let found = false;
        // search all tabs for matching optionsURL
        for (let i = 0; i < tabs.length; i++) {
            if (optionsURL == tabs[i].url) {
                found = true;
                chrome.tabs.update(tabs[i].id, { "selected": true });
            }
        }
        // if options tab not open, open it.
        if (found == false) { 
            chrome.tabs.create({ url: "options.html "}); 
        }
    });
}