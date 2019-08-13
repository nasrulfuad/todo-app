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
	User.findById(req.user.id).select('-password').then(v => res.json(v))
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
	const newTodo = req.body

	if(!newTodo.name) return res.json({ msg: 'Todo tidak boleh kosong' })

	// Check if todo is exists
	const todoExists = userData.todos.find(todo => todo.name === newTodo.name)
	if(todoExists) return res.status(400).json({ msg: 'Todo sudah ada' })

	try {

		await User.updateOne({ _id }, { $push: { newTodo } } )
		return res.json({ msg: 'Todo berhasil ditambahkan' })

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
	const userData = await User.findById({ _id }) 

	try {

		await User.updateOne({ _id }, { $pull: { todos: { _id: req.params.id } } } )
		return res.json({ msg: 'Todo berhasil dihapus' })

	}catch(err) {
		return res.send(err)
	}
})

module.exports = router
