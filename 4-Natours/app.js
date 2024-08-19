const express = require('express')
const fs = require('fs');
const morgan = require('morgan');
const app = express()

const port = 3000
// 1) MIDDLEWARES:
app.use(express.json());
app.use(morgan('dev'));

app.use((req,res,next) =>{
    console.log("Hello from the middleware 👏");
    next();
})
app.use((req,res,next) =>{
    req.requestTime = new Date().toISOString();
    next();
})

const tours = JSON.parse(fs.readFileSync(`${__dirname}/dev-data/data/tours-simple.json`));

const getAllTours = (req, res) => {
    res.status(200).json({
        status: "success",
        results: tours.length,
        data: {
            tours
        }
    });
}
const getTour = (req, res) => {
    const id = req.params.id *1;
    const tour = tours.find(el => el.id === id);

    if(!tour){
        return res.status(404).json({
            status: "faild",
            message: "Invalid Id"
        })
    }
    res.status(200).json({
        status: "success",
        data: {
            tours: tour
        }
    });
}
const createTour = function (req, res) {
    
    const newId = tours.length > 0 ? tours[tours.length - 1].id + 1 : 1;
    
    const newTour = Object.assign({id: newId}, req.body);
    console.log(tours);
    
    tours.push(newTour);
    fs.writeFile(`${__dirname}/dev-data/data/tours-simple.json`, JSON.stringify(tours), err =>{
        res.status(201).json({
            status: 'success',
            results: tours.length,
            data: {
                tours: newTour
            }
        })
    })
}
const updateTour = (req, res) => {
    const id = req.params.id *1;
    if(id > tours.length){
        return res.status(404).json({
            status: "faild",
            message: "Invalid Id"
        })
    }
    res.status(200).json({
        status: "success",
        data: {
            tours: "<h1>Update code in here</h1>"
        }
    });
}
const deleteTour = (req, res) => {
    const id = req.params.id *1;
    if(id > tours.length){
        return res.status(404).json({
            status: "faild",
            message: "Invalid Id"
        })
    }
    res.status(204).json({
        status: "success",
        data: null
    });
}

const getAllUsers = (req, res) =>{
    res.status(500).json({
        status: 'error',
        message: 'This route is not yet defined!'
    });
};

const getUser = (req, res) =>{
    res.status(500).json({
        status: 'error',
        message: 'This route is not yet defined!'
    });
};
const createUser = (req, res) =>{
    res.status(500).json({
        status: 'error',
        message: 'This route is not yet defined!'
    });
};
const updateUser = (req, res) =>{
    res.status(500).json({
        status: 'error',
        message: 'This route is not yet defined!'
    });
};
const deleteUser = (req, res) =>{
    res.status(500).json({
        status: 'error',
        message: 'This route is not yet defined!'
    });
};
// app.get('/api/v1/tours', getAllTours );
// app.get('/api/v1/tours/:id', getTour);
// app.post('/api/v1/tours', createTour);
// app.patch('/api/v1/tours/:id', updateTour);
// app.delete('/api/v1/tours/:id',deleteTour);

// Use route:
app.route('/api/v1/tours').get(getAllTours).post(createTour);
app.route('/api/v1/tours/:id').get(getTour).patch(updateTour).delete(deleteTour);
// Route User:
app.route('/api/v1/users').get(getAllUsers).post(createUser);
app.route('/api/v1/users/:id').get(getUser).patch(updateUser).delete(deleteUser);
app.listen(port, () => console.log(`Example app listening on port ${port}!`))