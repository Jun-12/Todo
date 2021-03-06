const functions = require('firebase-functions');
const admin = require('firebase-admin');
admin.initializeApp(functions.config().firebase);

exports.writeUrl = functions.storage.object().onFinalize((object) => {
    const bucketName = 'todo-fight.appspot.com';
    const filePath = object.name;
    const name = filePath.split('.').shift();
    const db = admin.firestore();
    
    db.collection('list').add({
        name: name,
        url: `https://firebasestorage.googleapis.com/v0 /b/${bucketName}/o/${encodeURIComponent(filePath)}?alt=media`,
    }).then(() => console.log('Done'));
});