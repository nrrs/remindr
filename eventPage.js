console.log('====================================');
console.log('eventPage.js');
console.log('====================================');

// Get Storage.local
chrome.storage.local.get(null, obj => console.log('Get Storage.local: ', obj));

// Get Alarms
chrome.alarms.getAll(obj => console.log('Get Alarms: ', obj));

chrome.alarms.onAlarm.addListener(function(alarm) {
    console.log("Got an alarm!", alarm);
    alert(`Alarm: ${alarm}`);
});

chrome.storage.onChanged.addListener(function(storageObj){
    console.log('Storage updated: ', storageObj.reminders);
});
