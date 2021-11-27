const express = require('express');
const cors = require('cors');
const app = express();
app.use(express.json());

app.use(cors());

app.set('port', process.env.PORT || 3000);

app.use(require('./routes/cliente'));
app.use(require('./routes/dieta'));
app.use(require('./routes/entrenador'));
app.use(require('./routes/entrenos'));
app.use(require('./routes/persona'));
app.use(require('./routes/progreso'));
app.use(require('./routes/rutinas'));
app.use(require('./routes/security'));


app.listen(app.get('port'), () => {
    console.log(`Server en puerto ${app.get('port')}`);
});