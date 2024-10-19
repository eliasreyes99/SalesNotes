const { Router } = require('express');
const {getUser, newUser, user } = require('../controllers/users.controllers');
const { newClient, getAllClient,getClient, deleteClient, updateClient } = require('../controllers/client.controllers');
const { newNotebook, getAllNotebook, getNotebook, updateNotebook, deleteNotebook} = require('../controllers/notebooks.controllers');
const { newNote, getallnotes, getNote, deleteNote, updateNote, deleteAllNotes } = require('../controllers/notes.controllers');

const router = Router();
//users
router.post('/user', getUser )
router.get('/user/:id',user)
router.post('/newUser', newUser)

//clients
router.post('/newClient/:id', newClient)
router.get('/getAllClient/:id', getAllClient)
router.get('/getClient/:id', getClient)
router.delete('/deleteClient/:id', deleteClient)
router.put('/updateClient/:id', updateClient)

//notebooks
router.post('/newNotebook/:id', newNotebook)
router.get('/getAllNotebook/:id', getAllNotebook)
router.get('/getNotebook/:id', getNotebook)
router.put('/updateNotebook/:id', updateNotebook)
router.delete('/deleteNotebook/:id', deleteNotebook)



router.post('/newNote/:id', newNote)
router.get('/getAllNote/:id', getallnotes)
router.get('/getNote/:id', getNote)
router.delete('/deleteNote/:id', deleteNote)
router.put('/updateNote/:id', updateNote)
router.delete('/deleteAllNotes/:id', deleteAllNotes)

module.exports = router;