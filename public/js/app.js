const firestore = firebase.firestore();
  const settings = {/* your settings... */ timestampsInSnapshots: true};
  firestore.settings(settings);


const docRef = firestore.doc("school/upenn/building/testBuilding");
const outputHeader = document.querySelector("#aspectRatioOutput");
const inputTextField = document.querySelector("#latestAspectRatioStatus");
const saveButton = document.querySelector("#saveButton");

saveButton.addEventListener("click", function () {
	const textToSave = inputTextField.value;
	console.log("I am going to save " + textToSave + " to Firestore");
	docRef.set({
		aspectRatioStatus: textToSave
	}).then(function () {
		console.log("Status saved!");
	}).catch(function (error) {
        console.log("Got an error: ", error);
	});
})

getRealTimeUpdates = function () {
	docRef.onSnapshot(function (doc) {
		if (doc && doc.exists) {
			const myData = doc.data();
			outputHeader.innerText = "Best Guess for this Room's Aspect Ratio: " + myData.aspectRatioStatus;
		}
	});
}

getRealTimeUpdates();