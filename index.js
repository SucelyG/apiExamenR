const express = require('express');
var cors = require('cors');
const app = express();
app.use(express.json());

app.use(cors());

app.set('port', process.env.PORT || 3000);

app.use(require('./routes/lista-estudiantes'));
app.use(require('./routes/personas'));
app.use(require('./routes/maestros'));
app.use(require('./routes/estudiantes'));
app.use(require('./routes/curso'));
app.use(require('./routes/curso-docente'));
app.use(require('./routes/estudiantes-curso'));

app.listen(app.get('port'), () => {
    console.log(`Server en puerto ${app.get('port')}`);
});