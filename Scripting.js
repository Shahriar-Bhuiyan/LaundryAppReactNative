const admin = require('firebase-admin');
const serviceAccount = require('./laundry-application-39fdf-firebase-adminsdk-iyv7z-436428795e.json'); // Replace with your own service account key

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  databaseURL: 'https://laundry-application-39fdf.firebaseio.com', // Replace with your Firebase database URL
});

const firestore = admin.firestore();

async function loadDataIntoFirestore() {
  try {
    const data = require('./service.json'); // Load your data

    for (const item of data) {
      await firestore.collection('types').add(item); // Replace 'your_collection_name' with the name of your collection
      console.log(`Added item: ${JSON.stringify(item)}`);
    }

    console.log('All data added successfully.');
  } catch (error) {
    console.error('Error adding data:', error);
  }
}

loadDataIntoFirestore();
