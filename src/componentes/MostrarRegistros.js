import React, { useState, useEffect } from 'react';
import firebase from 'firebase/compat/app';
import 'firebase/compat/firestore';

const MostrarRegistros = () => {
  // Estado para almacenar los registros recuperados de Firebase
  const [registros, setRegistros] = useState([]);
  const [registroEditando, setRegistroEditando] = useState(null);
  const [modoEdicion, setModoEdicion] = useState(false);

  // Función para obtener los registros de Firebase
  const obtenerRegistros = () => {
    const firestore = firebase.firestore();

    firestore.collection('registros').get()
      .then((snapshot) => {
        const registrosObtenidos = snapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));
        setRegistros(registrosObtenidos);
      })
      .catch((error) => {
        console.error('Error al obtener los registros:', error);
      });
  };

  // Utiliza useEffect para cargar los registros una vez que el componente se monta
  useEffect(() => {
    obtenerRegistros();
  }, []);

  const handleEliminarRegistro = (id) => {
    const firestore = firebase.firestore();

    firestore
      .collection('registros')
      .doc(id)
      .delete()
      .then(() => {
        console.log('Registro eliminado con éxito.');
        setRegistros((prevRegistros) => prevRegistros.filter((registro) => registro.id !== id));
      })
      .catch((error) => {
        console.error('Error al eliminar el registro:', error);
      });
  };
  
  const handleEditarRegistro = (registro) => {
    setRegistroEditando({ ...registro });
    setModoEdicion(true);
  };

  const handleGuardarCambios = () => {
    const firestore = firebase.firestore();
  
    firestore
      .collection('registros')
      .doc(registroEditando.id)
      .update(registroEditando)
      .then(() => {
        console.log('Cambios guardados con éxito.');
        setModoEdicion(false);
      })
      .catch((error) => {
        console.error('Error al guardar los cambios:', error);
      });
  };

  return (
    <div>
      <h2>Registros almacenados:</h2>
      <ul>
        {registros.map((registro) => (
          <li key={registro.id}>
            {modoEdicion && registroEditando.id === registro.id ? (
              <div>
                <label style={{ display: 'block' }}>
                Nombre:
                <input
                  type="text"
                  value={registroEditando.nombre}
                  onChange={(e) =>
                    setRegistroEditando({ ...registroEditando, nombre: e.target.value })
                  }
                />
                </label>
                <label style={{ display: 'block' }}>
                Correo:
                <input
                  type="text"
                  value={registroEditando.correo}
                  onChange={(e) =>
                    setRegistroEditando({ ...registroEditando, correo: e.target.value })
                  }
                />
                </label>
                <label style={{ display: 'block' }}>
                Pais:
                <input
                  type="text"
                  value={registroEditando.pais}
                  onChange={(e) =>
                    setRegistroEditando({ ...registroEditando, pais: e.target.value })
                  }
                />
                </label >
                <label style={{ display: 'block' }}>
                Mensaje:
                <input
                  type="text"
                  value={registroEditando.mensaje}
                  onChange={(e) =>
                    setRegistroEditando({ ...registroEditando, mensaje: e.target.value })
                  }
                />
                </label>
                <label style={{ display: 'block' }}>
                Telefono:
                <input
                  type="text"
                  value={registroEditando.telefono}
                  onChange={(e) =>
                    setRegistroEditando({ ...registroEditando, telefono: e.target.value })
                  }
                />
                </label>
                <label style={{ display: 'block' }}>
                Genero:
                <input
                  type="text"
                  value={registroEditando.genero}
                  onChange={(e) =>
                    setRegistroEditando({ ...registroEditando, genero: e.target.value })
                  }
                />
                </label>
                <button onClick={handleGuardarCambios}>Guardar</button>
                <button onClick={() => setModoEdicion(false)}>Cancelar</button>
              </div>
            ) : (
              <div>
                <p>Nombre: {registro.nombre}</p>
                <p>Correo: {registro.correo}</p>
                <p>Pais: {registro.pais}</p>
                <p>Mensaje: {registro.mensaje}</p>
                <p>Telefono: {registro.telefono}</p>
                <p>Genero: {registro.genero}</p>
                <button onClick={() => handleEliminarRegistro(registro.id)}>Eliminar</button>
                <button onClick={() => handleEditarRegistro(registro)}>Editar</button>
              </div>
            )}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default MostrarRegistros;

