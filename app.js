const { firestore, getDocs, addDoc, updateDoc, deleteDoc, doc, collection, query, where } = require('./config');
const express = require('express');
const cors = require('cors');

const app = express();
app.use(express.json());
app.use(cors());

// get data from firebase firestore
app.get('/getDataFromFirestore', async(req, res) => {
    try {
        // var colct = collection(firestore, 'User');
        // var snapShot = await getDocs(data);
        // var data = snapShot.docs.map(ele => ({id : ele.id, ...ele.data()}));
        // res.send(data)

        var data = (await getDocs(collection(firestore, 'User'))).docs.map(ele => ({
            id : ele.id,
            ...ele.data()
        }))
        res.send(data)
    } catch {
        res.status(404).send("Not found");
    }
})

// POST data from firebase firestore
app.post('/postDataToFirestore', async(req, res) => {
    try {
        await addDoc(collection(firestore, 'User'), {...req.body});
        res.send("Success")
    } catch {
        res.status(400).send("Unable to post data")
    }
})

// update data from firebase firestore
app.put('/updateFirestoreData', async (req, res) => {
    // try {
    //     var colct = collection(firestore, 'User');
    //     var user = doc(colct, req.body.id);
    //     await updateDoc(user, req.body);
    //     res.send("updated")
    // } catch {
    //     res.status(400).send("Update failed")
    // }
    
    try {
        var colct = collection(firestore, 'User');
        var snapShot = query(colct, where('email', '==', req.body.email));
        var querySnapshot = await getDocs(snapShot);
    
        querySnapshot.forEach(async (ele) => {
            ref = ele.ref;
            await updateDoc(ref, {name : req.body.name});
        })
        res.status(200).send("updated successfull")
    } catch {
        res.status(400).send("error while updating data")
    }
})

// delete one collection from firestore
app.delete('/deleteFirestoreData', async (req, res) => {
    try {
        var colct = collection(firestore, 'User');
        var snapShot = query(colct, where('email', '==', req.body.email));
        var querySnapshot = await getDocs(snapShot);

        querySnapshot.forEach(async (ele) => {
            var ref = ele.ref;
            await deleteDoc(ref)
        })
        res.send("Delete successfull")
    } catch {
        res.status(400).send("Error while delete data");
    }
})

app.listen(4000, () => {
    console.log("App running on 4000 port")
})