const router = require('express').Router()
const auth = require('../../middleware/auth')

/*
	Require User Model
*/
const User = require('../../models/User')

/*
	@route GET /api/todos
	@desc Get All todos
	@access Private
*/
router.get('/', auth, (req, res) => {
	User.findById(req.user.id).select('-password').then(v => res.status(200).json(v.todos))
})


/*
	@route POST /api/todos
	@desc Create a todo
	@access Private
*/
router.post('/', auth, async (req, res) => {
	// Get id from token in headers
	const _id = req.user.id
	const userData = await User.findById({ _id }) 
	const todos = req.body

	if(!todos.name) return res.status(400).json({ msg: 'Todo tidak boleh kosong' })

	// Check if todo is exists
	const todoExists = userData.todos.find(todo => todo.name === todos.name)
	if(todoExists) return res.status(400).json({ msg: 'Todo sudah ada' })
	try {

		const todoUpdated = await User.findOneAndUpdate({ _id }, { $push: { todos } }, { new: true } ).select('-password')
		return res.status(202).json({ msg: 'Todo berhasil ditambahkan', data: todoUpdated })

	}catch(err) {
		return res.send(err)
	}
})

/*
	@route DELETE /api/todos/:id
	@desc Delete a todo
	@access Private
*/
router.delete('/:id', auth, async (req, res) => {
	// Get id from token in headers
	const _id = req.user.id

	try {
		const todoUpdated = await User.findOneAndUpdate({ _id }, { $pull: { todos: { _id: req.params.id } } }, { new: true } ).select('-password')
		return res.status(202).json({ msg: 'Todo berhasil di hapus', data: todoUpdated })

	}catch(err) {
		return res.send(err)
	}
})

/*
	@route PUT /api/todos/:id
	@desc Edit a todo
	@access Private
*/
router.put('/:id', auth, async (req, res) => {
	// Get id from token in headers
	const _id = req.user.id

	try {
		const todoUpdated = await User.findOneAndUpdate({ _id, 'todos._id': req.params.id }, { $set: { 'todos.$.name': req.body.name } }, { new: true } ).select('-password')
		return res.status(202).json({ msg: 'Todo berhasil di update', data: todoUpdated })

	}catch(error) {
		return res.status(400).json({ error })
	}
})

module.exports = router
