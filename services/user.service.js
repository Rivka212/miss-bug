import fs from 'fs'
import Cryptr from 'cryptr'
import { utilService } from './util.service.js'
import { log } from 'console'

const cryptr = new Cryptr(process.env.SECRET1 ||  'secret-puk-1234')
const users = utilService.readJsonFile('data/user.json')

export const userService = {
    query,
    getById,
    remove,
    save,
    checkLogin,
    getLoginToken,
    validateToken
}

function validateToken(token) {
    if (!token) return null
    const str = cryptr.decrypt(token)
    const user = JSON.parse(str)
    return user
}

function getLoginToken(user) {
    const str = JSON.stringify(user)
    const encryptedStr = cryptr.encrypt(str)
    return encryptedStr
}

function checkLogin({ username, password }) {
    var user = users.find(user => user.username === username)
    if (user)  {
        user = {
            _id : user._id,
            fullname : user.fullname,
            isAdmin : user.isAdmin,
        }
    }
    return Promise.resolve(user)
}


function query() {
    return Promise.resolve(users)
}

function getById(userId) {
    var user = users.find(user => user._id === userId)
    if (!user) return Promise.reject('User not found!')
    user = {
        _id: user._id,
        username: user.username,
        fullname: user.fullname,
    }
    return Promise.resolve(user)
}

function remove(userId) {
    users = users.filter(user => user._id !== userId)
    return _saveUsersToFile()
}

function save(user) {
    user._id = utilService.makeId()
    users.push(user)
    return _saveUsersToFile().then(() => ({
        _id: user._id,
        fullname: user.fullname,
        isAdmin: user.isAdmin,
    }))
}

function _saveUsersToFile() {
    return new Promise((resolve, reject) => {
        const usersStr = JSON.stringify(users, null, 2)
        fs.writeFile('data/user.json', usersStr, (err) => {
            if (err) {
                return console.log(err);
            }
            resolve()
        })
    })
}