const router = require('express').Router()
const bcrypt = require('bcryptjs')
const config = require('config')
const jwt = require('jsonwebtoken')

/*
	Require User Model	
*/
const User = require('../../models/User')

/*	
	@route    POST /api/users
	@desc     Register new user
	@access   public
*/
router.post('/', (req, res) => {
	const { name, email, password } = req.body

	// Simple validation
	if(!name, !email, !password) return res.status(400).json({ msg: 'Mohon isi semua kolom' })

	// Check for existing user
	User.findOne({ email })
		.then(user => {
			if(user) return res.status(400).json({ msg: 'Email sudah terdaftar' })
			const newUser = new User({ name, email, password })
			// Create salt and hash the password
			bcrypt.genSalt(10, (err, salt) => {
				bcrypt.hash(newUser.password, salt, (err, hash) => {
					if(err) throw err
					newUser.password = hash
					newUser.save()
						.then(user => {
							jwt.sign(
								{ id: user.id },
								config.get('jwtSecret'),
								{ expiresIn : 3600 },
								(err, token) => {
									if(err) throw err
									return res.status(201).json({ msg: 'Registrasi berhasil', token, user: { id: user.id, name: user.name, email: user.email } })
								}
							)
						})
				})
			})
		})
})

module.exports = router
