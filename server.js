const express = require('express');
const cors = require('cors')
const es6Renderer = require('express-es6-template-engine');
const cases = require('./cases')

const app = express();

app.use(express.static('public'))     //middleware for static files
app.use(cors())     //cors express middleware

app.engine('html', es6Renderer);     
app.set('views', 'templates');       
app.set('view engine', 'html');

const name = "Unidentified Does of Texas"
const qouter = "There are 1,621 unidentified deceased in the state of Texas as of September 10th 2019"
const linked = ' \"https://www.nbcdfw.com/news/local/fort-worth-home-to-database-for-missing-unidentified-dead/1964622/#:~:text=There%20were%201%2C621%20unidentified%20bodies,and%2046%20in%20Fort%20Worth.\" '
const newsSource = "NBC DFW"


app.get('/home', (req, res) => {
    
    const caseIds = Object.keys(cases)      //takes an object and
    const newCaseArray = caseIds.map( id => cases[id])      //converts it into an array
    const newImageArray = caseIds.map( image => cases[image])
    
    res.render('home', {
        locals: {       //makes an object
            title: `${name}`,       //makes another object
            qoute: `${qouter}`,
            newslink: `${linked}`,
            source: `${newsSource}`,
            newCaseArray,
            newImageArray
        }
    })
})

app.get("/case/:id", (req, res) => {
    const caseFile = cases[req.params.id]

    if(!caseFile){      //!caseFile === no caseFile
        res.send('404 Case Files not found')
    }

    res.render("case", {
        locals: {
            caseFile        //name of variable is the name of the key, i could write it like this
        }
    })
})


app.get("*", (req, res)=>{
    res.render("404")
})

app.listen("3000", () => {
    console.log('texas doe project server is running...')
})