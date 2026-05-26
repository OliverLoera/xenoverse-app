const express = require('express');
const cors = require('cors');
const db = require('./db');
const bcrypt = require('bcryptjs');

const app = express();

app.use(cors());
app.use(express.json());

// Ruta de prueba
app.get('/', (req, res) => {
  res.send('Servidor funcionando 🔥');
});

const PORT = process.env.PORT || 3000;

app.get('/api/crear-tablas', (req, res) => {
  const sql = `
    CREATE TABLE IF NOT EXISTS usuarios (
      id INT AUTO_INCREMENT PRIMARY KEY,
      nombre VARCHAR(100) NOT NULL,
      email VARCHAR(100) NOT NULL UNIQUE,
      password VARCHAR(255) NOT NULL,
      raza VARCHAR(50)
    );

    CREATE TABLE IF NOT EXISTS habilidades (
      id INT AUTO_INCREMENT PRIMARY KEY,
      nombre VARCHAR(100) NOT NULL,
      descripcion TEXT NOT NULL,
      categoria VARCHAR(50) NOT NULL,
      imagen TEXT,
      usuario_id INT NULL,
      FOREIGN KEY (usuario_id) REFERENCES usuarios(id) ON DELETE CASCADE
    );

    CREATE TABLE IF NOT EXISTS conjuntos (
      id INT AUTO_INCREMENT PRIMARY KEY,
      nombre VARCHAR(100) NOT NULL,
      descripcion TEXT,
      usuario_id INT,
      FOREIGN KEY (usuario_id) REFERENCES usuarios(id) ON DELETE CASCADE
    );

    CREATE TABLE IF NOT EXISTS conjunto_habilidades (
      id INT AUTO_INCREMENT PRIMARY KEY,
      conjunto_id INT NOT NULL,
      habilidad_id INT NOT NULL,
      FOREIGN KEY (conjunto_id) REFERENCES conjuntos(id) ON DELETE CASCADE,
      FOREIGN KEY (habilidad_id) REFERENCES habilidades(id) ON DELETE CASCADE
    );
  `;

  db.query(sql, (error) => {
    if (error) {
      console.log(error);
      return res.status(500).json({ error: 'Error al crear tablas' });
    }

    res.json({ mensaje: 'Tablas creadas correctamente' });
  });
});

app.listen(PORT, () => {
  console.log(`Servidor funcionando en puerto ${PORT}`);
});

// 👉 REGISTRO de usuario
app.post('/api/registro', (req, res) => {
  const { nombre, email, password } = req.body;

  const passwordEncriptada = bcrypt.hashSync(password, 10);

  const sql = `
    INSERT INTO usuarios (nombre, email, password)
    VALUES (?, ?, ?)
  `;

  db.query(sql, [nombre, email, passwordEncriptada], (error, result) => {
    if (error) {
      console.log(error);
      return res.status(500).json({
        error: 'Error al registrar usuario'
      });
    }

    res.json({
      mensaje: 'Usuario registrado correctamente',
      usuario: {
        id: result.insertId,
        nombre,
        email
      }
    });
  });
});


// 👉 LOGIN de usuario
app.post('/api/login', (req, res) => {
  const { email, password } = req.body;

  const sql = `
    SELECT * FROM usuarios
    WHERE email = ?
  `;

  db.query(sql, [email], (error, results) => {
    if (error) {
      console.log(error);
      return res.status(500).json({
        error: 'Error al iniciar sesión'
      });
    }

    if (results.length === 0) {
      return res.status(401).json({
        error: 'Usuario no encontrado'
      });
    }

    const usuario = results[0];

    const passwordCorrecta = bcrypt.compareSync(password, usuario.password);

    if (!passwordCorrecta) {
      return res.status(401).json({
        error: 'Contraseña incorrecta'
      });
    }

    res.json({
      mensaje: 'Inicio de sesión correcto',
      usuario: {
        id: usuario.id,
        nombre: usuario.nombre,
        email: usuario.email,
        raza: usuario.raza
      }
    });
  });
});

// 👉 ACTUALIZAR raza del usuario
app.put('/api/usuarios/:id/raza', (req, res) => {
  const id = parseInt(req.params.id);
  const { raza } = req.body;

  const sql = `
    UPDATE usuarios
    SET raza = ?
    WHERE id = ?
  `;

  db.query(sql, [raza, id], (error, result) => {
    if (error) {
      console.log(error);
      return res.status(500).json({
        error: 'Error al actualizar raza'
      });
    }

    res.json({
      mensaje: 'Raza actualizada correctamente',
      raza
    });
  });
});


// 👉 GET conjuntos desde MySQL filtrados por usuario
app.get('/api/conjuntos', (req, res) => {

  const usuario_id = req.query.usuario_id;

  const sql = `
    SELECT 
      c.id AS conjunto_id,
      c.nombre AS conjunto_nombre,
      c.descripcion AS conjunto_descripcion,
      h.id AS habilidad_id,
      h.nombre AS habilidad_nombre,
      h.descripcion AS habilidad_descripcion,
      h.categoria AS habilidad_categoria

    FROM conjuntos c

    LEFT JOIN conjunto_habilidades ch
      ON c.id = ch.conjunto_id

    LEFT JOIN habilidades h
      ON ch.habilidad_id = h.id

    WHERE c.usuario_id = ?

    ORDER BY c.id;
  `;

  db.query(sql, [usuario_id], (error, results) => {

    if (error) {
      console.log(error);

      return res.status(500).json({
        error: 'Error al obtener conjuntos'
      });
    }

    const conjuntosMap = {};

    results.forEach(row => {

      if (!conjuntosMap[row.conjunto_id]) {

        conjuntosMap[row.conjunto_id] = {
          id: row.conjunto_id,
          nombre: row.conjunto_nombre,
          descripcion: row.conjunto_descripcion,
          habilidades: []
        };

      }

      if (row.habilidad_id) {

        conjuntosMap[row.conjunto_id].habilidades.push({
          id: row.habilidad_id,
          nombre: row.habilidad_nombre,
          descripcion: row.habilidad_descripcion,
          categoria: row.habilidad_categoria
        });

      }

    });

    res.json(Object.values(conjuntosMap));

  });

});


// 👉 POST conjunto en MySQL con usuario
app.post('/api/conjuntos', (req, res) => {
  const { nombre, descripcion, usuario_id } = req.body;

  const sql = `
    INSERT INTO conjuntos (nombre, descripcion, usuario_id)
    VALUES (?, ?, ?)
  `;

  db.query(sql, [nombre, descripcion, usuario_id], (error, result) => {
    if (error) {
      console.log(error);
      return res.status(500).json({ error: 'Error al crear conjunto' });
    }

    res.json({
      id: result.insertId,
      nombre,
      descripcion,
      usuario_id,
      habilidades: []
    });
  });
});

// 👉 PUT conjunto en MySQL
app.put('/api/conjuntos/:id', (req, res) => {
  const id = parseInt(req.params.id);
  const { nombre, descripcion } = req.body;

  const sql = `
    UPDATE conjuntos
    SET nombre = ?, descripcion = ?
    WHERE id = ?
  `;

  db.query(sql, [nombre, descripcion, id], (error, result) => {
    if (error) {
      console.log(error);
      return res.status(500).json({ error: 'Error al actualizar conjunto' });
    }

    res.json({ mensaje: "Conjunto actualizado" });
  });
});


// 👉 DELETE conjunto en MySQL
app.delete('/api/conjuntos/:id', (req, res) => {
  const id = parseInt(req.params.id);

  db.query('DELETE FROM conjuntos WHERE id = ?', [id], (error, result) => {
    if (error) {
      console.log(error);
      return res.status(500).json({ error: 'Error al eliminar conjunto' });
    }

    res.json({ mensaje: "Conjunto eliminado" });
  });
});

app.get('/api/habilidades', (req, res) => {

  const usuarioId = req.query.usuario_id;

  const sql = `
    SELECT * FROM habilidades
    WHERE usuario_id IS NULL
    OR usuario_id = ?
  `;

  db.query(sql, [usuarioId], (error, results) => {

    if (error) {

      console.log(error);

      return res.status(500).json({
        error: 'Error al obtener habilidades'
      });
    }

    res.json(results);

  });

});

app.post('/api/habilidades', (req, res) => {

  const {
    nombre,
    descripcion,
    categoria,
    imagen,
    usuario_id
  } = req.body;

  const sql = `
    INSERT INTO habilidades
    (
      nombre,
      descripcion,
      categoria,
      imagen,
      usuario_id
    )
    VALUES (?, ?, ?, ?, ?)
  `;

  db.query(

    sql,

    [
      nombre,
      descripcion,
      categoria,
      imagen,
      usuario_id
    ],

    (error, result) => {

      if (error) {

        console.log(error);

        return res.status(500).json({
          error: 'Error al crear habilidad'
        });
      }

      res.json({

        id: result.insertId,

        nombre,
        descripcion,
        categoria,
        imagen,
        usuario_id

      });

    }

  );

});

// 👉 QUITAR habilidad de un conjunto
app.delete('/api/conjuntos/:conjuntoId/habilidades/:habilidadId', (req, res) => {
  const conjuntoId = parseInt(req.params.conjuntoId);
  const habilidadId = parseInt(req.params.habilidadId);

  const sql = `
    DELETE FROM conjunto_habilidades
    WHERE conjunto_id = ? AND habilidad_id = ?
  `;

  db.query(sql, [conjuntoId, habilidadId], (error, result) => {
    if (error) {
      console.log(error);
      return res.status(500).json({
        error: 'Error al quitar habilidad del conjunto'
      });
    }

    res.json({
      mensaje: 'Habilidad quitada del conjunto'
    });
  });
});

app.put('/api/habilidades/:id', (req, res) => {
  const id = parseInt(req.params.id);
  const { nombre, descripcion, categoria, imagen } = req.body;

  const sql = `
    UPDATE habilidades
    SET nombre = ?, descripcion = ?, categoria = ?, imagen = ?
    WHERE id = ?
  `;

  db.query(sql, [nombre, descripcion, categoria, imagen, id], (error, result) => {
    if (error) {
      console.log(error);
      return res.status(500).json({ error: 'Error al actualizar habilidad' });
    }

    res.json({ mensaje: "Habilidad actualizada" });
  });
});

app.delete('/api/habilidades/:id', (req, res) => {
  const id = parseInt(req.params.id);

  db.query('DELETE FROM habilidades WHERE id = ?', [id], (error, result) => {
    if (error) {
      console.log(error);
      return res.status(500).json({ error: 'Error al eliminar habilidad' });
    }

    res.json({ mensaje: "Habilidad eliminada" });
  });
});

// 👉 AGREGAR habilidad a conjunto en MySQL con límites
app.post('/api/conjuntos/:id/habilidades', (req, res) => {
  const conjuntoId = parseInt(req.params.id);
  const { habilidadId } = req.body;

  const sqlHabilidadesConjunto = `
    SELECT h.*
    FROM conjunto_habilidades ch
    JOIN habilidades h ON ch.habilidad_id = h.id
    WHERE ch.conjunto_id = ?
  `;

  db.query(sqlHabilidadesConjunto, [conjuntoId], (error, habilidadesActuales) => {
    if (error) {
      console.log(error);
      return res.status(500).json({ error: "Error al revisar el conjunto" });
    }

    const yaExiste = habilidadesActuales.some(h => h.id === habilidadId);

    if (yaExiste) {
      return res.status(400).json({ error: "Esta habilidad ya está en el conjunto" });
    }

    db.query('SELECT * FROM habilidades WHERE id = ?', [habilidadId], (error, habilidadResult) => {
      if (error) {
        console.log(error);
        return res.status(500).json({ error: "Error al buscar habilidad" });
      }

      if (habilidadResult.length === 0) {
        return res.status(404).json({ error: "Habilidad no encontrada" });
      }

      const habilidad = habilidadResult[0];

      const habilidadesNormales = habilidadesActuales.filter(
        h => h.categoria === "ki" || h.categoria === "golpe"
      ).length;

      const superTecnicas = habilidadesActuales.filter(
        h => h.categoria === "super_ki" || h.categoria === "super_golpe"
      ).length;

      const transformaciones = habilidadesActuales.filter(
        h => h.categoria === "transformacion"
      ).length;

      const esquives = habilidadesActuales.filter(
        h => h.categoria === "esquive"
      ).length;

      if ((habilidad.categoria === "ki" || habilidad.categoria === "golpe") && habilidadesNormales >= 4) {
        return res.status(400).json({ error: "Solo puedes tener 4 habilidades normales" });
      }

      if ((habilidad.categoria === "super_ki" || habilidad.categoria === "super_golpe") && superTecnicas >= 2) {
        return res.status(400).json({ error: "Solo puedes tener 2 super técnicas" });
      }

      if (habilidad.categoria === "transformacion" && transformaciones >= 1) {
        return res.status(400).json({ error: "Solo puedes tener 1 transformación" });
      }

      if (habilidad.categoria === "esquive" && esquives >= 1) {
        return res.status(400).json({ error: "Solo puedes tener 1 habilidad de esquive" });
      }

      const sqlInsert = `
        INSERT INTO conjunto_habilidades (conjunto_id, habilidad_id)
        VALUES (?, ?)
      `;

      db.query(sqlInsert, [conjuntoId, habilidadId], (error, result) => {
        if (error) {
          console.log(error);
          return res.status(500).json({ error: "Error al agregar habilidad al conjunto" });
        }

        res.json({
          mensaje: "Habilidad agregada al conjunto"
        });
      });
    });
  });
});



app.put('/api/usuarios/:id', async (req, res) => {

  const {
    nombre,
    correo,
    password
  } = req.body;

  const id = req.params.id;

  let passwordHash = null;

  try {

    if (password) {

      passwordHash = await bcrypt.hash(password, 10);

    }

    const sql = `
      UPDATE usuarios
      SET
        nombre = COALESCE(?, nombre),
        email = COALESCE(?, email),
        password = COALESCE(?, password)
      WHERE id = ?
    `;

    db.query(

      sql,

      [
        nombre || null,
        correo || null,
        passwordHash,
        id
      ],

      (error) => {

        if (error) {

          console.log(error);

          return res.status(500).json({
            error: 'Error al actualizar perfil'
          });
        }

        res.json({
          mensaje: 'Perfil actualizado'
        });

      }

    );

  } catch (error) {

    console.log(error);

    res.status(500).json({
      error: 'Error del servidor'
    });

  }

});