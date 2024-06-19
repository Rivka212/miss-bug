import express from 'express'
import cookieParser from 'cookie-parser'
import PDFDocument from 'pdfkit'
import fs from 'fs'

import { bugService } from './services/bug.service.js'
import { loggerService } from './services/logger.service.js'

const app = express()

app.use(express.static('public'))
app.use(cookieParser())
app.use(express.json())


app.get('/api/bug', (req, res) => {
    const filterBy = {
        txt: req.query.txt || '',
        minSeverity: +req.query.minSeverity || 0,
    }
    bugService.query(filterBy)
        .then(bugs => res.send(bugs))
        .catch(err => {
            loggerService.error(`Couldn't get bugs...`)
            res.status(500).send(`Couldn't get bugs...`)
        })
})

app.get('/api/bug/download', (req, res) => {
    console.log('in download')
    const doc = new PDFDocument()
    doc.pipe(fs.createWriteStream('bugs.pdf'))
    doc.fontSize(25).text('Bugs List').fontSize(16)
    bugService.query().then((bugs) => {
        bugs.forEach(bug => {
            var bugTxt = `${bug.title}:${bug.description}. severity:${bug.severity}`
            doc.text(bugTxt)
        })
    })
    bugService.query().then((bugs) => {
        bugs.forEach(bug => {
            var bugTxt = `${bug.title}:${bug.description}. severity:${bug.severity}`
            doc.text(bugTxt)
        })
        doc.end()
    })
})

app.put('/api/bug/:id', (req, res) => {
    const { _id, title, description, severity, createdAt } = req.body
    const bugToSave = { _id, title, description, severity: +severity, createdAt: +createdAt }
    bugService.save(bugToSave)
        .then(savedBug => res.send(savedBug))
})

app.post('/api/bug/', (req, res) => {
    const { title, description, severity } = req.body
    const bugToSave = { title, description, severity: +severity }
    // createdAt: +createdAt
    bugService.save(bugToSave)
        .then(savedBug => res.send(savedBug))
})

app.get('/api/bug/:id', (req, res) => {
    const { id } = req.params
    var visitedBugs = req.cookies.visitedBugs || []
    if (visitedBugs.length >= 3) res.status(401).send('Wait for a bit')
    // console.log(`User visited at the following bugs: ${req.cookies}`)

    if (!visitedBugs.includes(id)) visitedBugs.push(id)
    res.cookie('visitedBugs', visitedBugs, { maxAge: 7000 })

    bugService.getById(id)
        .then(bug => res.send(bug))
})


app.delete('/api/bug/:id', (req, res) => {
    const { id } = req.params
    bugService.remove(id)
        .then(() => res.send(`Bug ${id} deleted...`))
})





const port = 3030
app.listen(3030, () => loggerService.info(`Server listening on port http://127.0.0.1:${port}/`))



