import {getApp, getApps, initializeApp} from 'firebase/app';
import {getStorage} from 'firebase/storage'


//connect tp firebase
const firebaseConfig = {

    apiKey: process.env.REACT_APP_APIKEY,
  
    authDomain: process.env.REACT_APP_DOMAIN,
  
    projectId: process.env.REACT_APP_PROJECTID,
  
    storageBucket: process.env.REACT_APP_STORAGE,
  
    messagingSenderId: "508250527423",
  
    appId: "1:508250527423:web:877452aabd5e3d991ad80a"
  
  };
  
  const app = getApps.length > 0 ? getApp() : initializeApp(firebaseConfig);
  const storage = getStorage(app);

  export {app, storage};