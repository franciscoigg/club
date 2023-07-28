
import React, { useState } from 'react';
import firebase from 'firebase/compat/app';
import 'firebase/compat/firestore';

// Configura Firebase con la configuración proporcionada en el archivo de configuración de Firebase
const firebaseConfig = {
  apiKey: "AIzaSyA9emQPFhFX_-YFMF8VEZIsR5lWZBHLOMg",
  authDomain: "club-penguin-6a2e4.firebaseapp.com",
  projectId: "club-penguin-6a2e4",
  storageBucket: "club-penguin-6a2e4.appspot.com",
  messagingSenderId: "940299810724",
  appId: "1:940299810724:web:90db8fd6d79b954afff331",
  measurementId: "G-9EWW5DBZKN"
};

firebase.initializeApp(firebaseConfig);
const firestore = firebase.firestore();

const Formulario = () => {
  const [formData, setFormData] = useState({
    nombre: '',
    correo: '',
    mensaje: '',
    pais: '',
    telefono: '',
    terminos: false,
    genero: '',
    subscripcion: false,
  });

  const [errors, setErrors] = useState({
    nombre: '',
    correo: '',
    mensaje: '',
    pais: '',
    telefono: '',
    terminos: '',
    genero: '',
  });

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    const newValue = type === 'checkbox' ? checked : value;

    setFormData((prevData) => ({
      ...prevData,
      [name]: newValue,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    // Validaciones antes del envío
    const newErrors = {};

    if (!formData.nombre.trim()) {
      newErrors.nombre = 'El nombre es requerido';
    }

    if (!formData.correo.trim()) {
      newErrors.correo = 'El correo es requerido';
    } else if (!/^\S+@\S+\.\S+$/.test(formData.correo)) {
      newErrors.correo = 'El formato del correo es inválido';
    }

    if (!formData.mensaje.trim()) {
      newErrors.mensaje = 'El mensaje es requerido';
    }

    if (!formData.pais.trim()) {
      newErrors.pais = 'El pais es requerido';
    }

    if (!formData.telefono.trim()) {
      newErrors.telefono = 'El telefono es requerido';
    } else if (!/^\d+$/.test(formData.telefono)) {
      newErrors.telefono = 'El telefono solo debe contener dígitos';
    }

    if (!formData.terminos) {
      newErrors.terminos = 'Debes aceptar los términos y condiciones';
    }

    if (!formData.genero) {
      newErrors.genero = 'Debes seleccionar un genero';
    }

    // Si hay errores, detenemos el envío y mostramos los errores
    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    // Si no hay errores, enviamos los datos a Firebase Firestore
    firestore
      .collection('registros')
      .add(formData)
      .then(() => {
        // Limpia el formulario después de enviar los datos con éxito
        setFormData({
          nombre: '',
          correo: '',
          mensaje: '',
          pais: '',
          telefono: '',
          terminos: false,
          genero: '',
          subscripcion: false,
        });

        console.log('Datos enviados a Firebase Firestore con éxito.');
      })
      .catch((error) => {
        // Manejo de errores en caso de que algo salga mal al enviar los datos a Firebase Firestore
        console.error('Error al enviar los datos a Firebase Firestore:', error);
      });
  };

  return (
    <form onSubmit={handleSubmit}>
      <div>
        <label>Nombre:</label>
        <input type="text" name="nombre" value={formData.nombre} onChange={handleChange} />
        {errors.nombre && <span>{errors.nombre}</span>}
      </div>
      <div>
        <label>Correo:</label>
        <input type="email" name="correo" value={formData.correo} onChange={handleChange} />
        {errors.correo && <span>{errors.correo}</span>}
      </div>
      <div>
        <label>Mensaje:</label>
        <textarea name="mensaje" value={formData.mensaje} onChange={handleChange} />
        {errors.mensaje && <span>{errors.mensaje}</span>}
      </div>
      <div>
        <label>País:</label>
        <input type="text" name="pais" value={formData.pais} onChange={handleChange} />
        {errors.pais && <span>{errors.pais}</span>}
      </div>
      <div>
        <label>Teléfono:</label>
        <input type="tel" name="telefono" value={formData.telefono} onChange={handleChange} />
        {errors.telefono && <span>{errors.telefono}</span>}
      </div>
      <div>
        <label>Acepto los términos y condiciones:</label>
        <input
          type="checkbox"
          name="terminos"
          checked={formData.terminos}
          onChange={handleChange}
        />
        {errors.terminos && <span>{errors.terminos}</span>}
      </div>
      <div>
        <label>Género:</label>
        <select name="genero" value={formData.genero} onChange={handleChange}>
          <option value="">Selecciona una opción</option>
          <option value="masculino">Masculino</option>
          <option value="femenino">Femenino</option>
          <option value="otro">Otro</option>
        </select>
        {errors.genero && <span>{errors.genero}</span>}
      </div>
      <div>
        <label>Suscripción:</label>
        <input
          type="checkbox"
          name="subscripcion"
          checked={formData.subscripcion}
          onChange={handleChange}
        />
      </div>
      <button type="submit">Enviar</button>
    </form>
  );
};

export default Formulario;
