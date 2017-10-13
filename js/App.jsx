import React from 'react';

import List from './list';
import Add from './add';

// chrome.storage.local.set({ reminders: [] }, function() {
//   console.log("chrome.storage.sync.set");
//   //   alert(`Reminder ${reminder.alert}  Set`);
// });

const App = () => {
  return(
    <div className="App">
      <Add />
      <List />
    </div>
  );
};

export default App;