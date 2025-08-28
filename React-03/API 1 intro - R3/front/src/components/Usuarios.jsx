import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Notification } from './Notification';
import '../styles/Usuarios.css';
import '../styles/Notification.css';

export const Usuarios = () => {
  // Estado para almacenar la lista de usuarios
  const [usuarios, setUsuarios] = useState([]);

  // Estado para manejar los datos del formulario
  const [form, setForm] = useState({
    nombre: '',
    apellido: '',
    direccion: '',
    telefono: '',
    celular: '',
    fecha_nacimiento: '',
    email: '',
    password: ''
  });

  // Estado para notificaciones
  const [notification, setNotification] = useState({ message: '', type: '' });

  // Estado para manejar edición de usuario
  const [editingUserId, setEditingUserId] = useState(null);

  // Estado para confirmación de eliminación
  const [confirmDelete, setConfirmDelete] = useState({ show: false, userId: null });

  // Cargar usuarios al montar el componente
  useEffect(() => {
    fetchUsuarios();
  }, []);

  // Función para obtener usuarios desde la API
  const fetchUsuarios = async () => {
    try {
      const res = await axios.get('http://localhost:3001/usuarios');
      setUsuarios(res.data);
    } catch (err) {
      showNotification('Error al cargar socios', 'error');
    }
  };

  // Manejo de cambios en inputs del formulario
  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  // Mostrar notificación temporal
  const showNotification = (msg, type = 'success') => {
    setNotification({ message: msg, type });
    setTimeout(() => setNotification({ message: '', type: '' }), 3000);
  };

  // Enviar formulario para crear o actualizar usuario
  const handleSubmit = async (e) => {
    e.preventDefault();

    // Validaciones básicas
    if (!form.nombre || !form.apellido || !form.email || !form.password) {
      showNotification('Todos los campos obligatorios deben completarse.', 'error');
      return;
    }

    // Validar email
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(form.email)) {
      showNotification('El email ingresado no es válido.', 'error');
      return;
    }

    // Validar fecha de nacimiento
    if (form.fecha_nacimiento) {
      const fecha = new Date(form.fecha_nacimiento);
      const hoy = new Date();
      if (fecha > hoy) {
        showNotification('La fecha de nacimiento no puede ser futura.', 'error');
        return;
      }
    }

    try {
      if (editingUserId) {
        // Actualizar usuario existente
        await axios.put(`http://localhost:3001/usuarios/${editingUserId}`, form);
        showNotification('Socio actualizado correctamente!', 'success');
        setEditingUserId(null);
      } else {
        // Crear nuevo usuario
        await axios.post('http://localhost:3001/usuarios', form);
        showNotification('Socio registrado correctamente!', 'success');
      }

      // Resetear formulario y recargar lista de usuarios
      setForm({
        nombre: '',
        apellido: '',
        direccion: '',
        telefono: '',
        celular: '',
        fecha_nacimiento: '',
        email: '',
        password: ''
      });
      fetchUsuarios();
    } catch (error) {
      showNotification(error.response?.data?.error || 'Error al guardar socio', 'error');
    }
  };

  // Cargar datos del usuario seleccionado para edición
  const handleEditClick = (user) => {
    setForm({
      nombre: user.nombre,
      apellido: user.apellido,
      direccion: user.direccion || '',
      telefono: user.telefono || '',
      celular: user.celular || '',
      fecha_nacimiento: user.fecha_nacimiento || '',
      email: user.email,
      password: user.password || ''
    });
    setEditingUserId(user.id);
  };

  // Mostrar confirmación de eliminación
  const handleDeleteClick = (id) => {
    setConfirmDelete({ show: true, userId: id });
  };

  // Confirmar eliminación de usuario
  const confirmDeleteUser = async () => {
    try {
      await axios.delete(`http://localhost:3001/usuarios/${confirmDelete.userId}`);
      showNotification('Socio eliminado.', 'success');
      fetchUsuarios();
    } catch (error) {
      showNotification('Error al eliminar socio.', 'error');
    } finally {
      setConfirmDelete({ show: false, userId: null });
    }
  };

  // Cancelar eliminación de usuario
  const cancelDeleteUser = () => {
    setConfirmDelete({ show: false, userId: null });
  };

  return (
    <div className="usuarios-page">
      {/* Encabezado de la página */}
      <header className="usuarios-header">
        <h1>Gestión de Socios - Club/Empresa XYZ</h1>
        <p>Administra los datos de todos los socios de manera rápida y segura.</p>
      </header>

      {/* Notificaciones */}
      <Notification message={notification.message} type={notification.type} />
      {confirmDelete.show && (
        <Notification
          type="confirm"
          message={
            <div style={{ textAlign: 'center', color: '#856404' }}>
              <p>¿Estás seguro de eliminar este usuario?</p>
              <div className="confirm-buttons">
                <button onClick={confirmDeleteUser}>Sí, eliminar</button>
                <button onClick={cancelDeleteUser}>Cancelar</button>
              </div>
            </div>
          }
        />
      )}

      {/* Formulario de registro/edición */}
      <div className="form-container">
        <h2>{editingUserId ? 'Editar socio' : 'Crear socio'}</h2>
        <form onSubmit={handleSubmit} className="registro-form">
          <input name="nombre" placeholder="Nombre" value={form.nombre} onChange={handleChange} required />
          <input name="apellido" placeholder="Apellido" value={form.apellido} onChange={handleChange} required />
          <input name="direccion" placeholder="Dirección" value={form.direccion} onChange={handleChange} />
          <input name="telefono" placeholder="Teléfono" value={form.telefono} onChange={handleChange} />
          <input name="celular" placeholder="Celular" value={form.celular} onChange={handleChange} />
          <input type="date" name="fecha_nacimiento" value={form.fecha_nacimiento} onChange={handleChange} />
          <input type="email" name="email" placeholder="Email" value={form.email} onChange={handleChange} required />
          <input type="password" name="password" placeholder="Contraseña" value={form.password} onChange={handleChange} required />
          <button type="submit">{editingUserId ? 'Actualizar' : 'Registrar'}</button>

          {editingUserId && (
            <button
              type="button"
              onClick={() => {
                setForm({
                  nombre: '',
                  apellido: '',
                  direccion: '',
                  telefono: '',
                  celular: '',
                  fecha_nacimiento: '',
                  email: '',
                  password: ''
                });
                setEditingUserId(null);
              }}
            >
              Cancelar
            </button>
          )}
        </form>
      </div>

      {/* Listado de usuarios */}
      <div className="usuarios-list">
        <h3>Listado de socios</h3>
        <table>
          <thead>
            <tr>
              <th>Nombre</th>
              <th>Apellido</th>
              <th>Dirección</th>
              <th>Teléfono</th>
              <th>Celular</th>
              <th>Fecha Nac.</th>
              <th>Email</th>
              <th>Contraseña</th>
              <th>Acciones</th>
            </tr>
          </thead>
          <tbody>
            {usuarios.map((u) => (
              <tr key={u.id}>
                <td>{u.nombre}</td>
                <td>{u.apellido}</td>
                <td>{u.direccion}</td>
                <td>{u.telefono}</td>
                <td>{u.celular}</td>
                <td>{u.fecha_nacimiento}</td>
                <td>{u.email}</td>
                <td>{u.password}</td>
                <td>
                  <button onClick={() => handleEditClick(u)}>Editar</button>
                  <button onClick={() => handleDeleteClick(u.id)} className="delete-btn">
                    Eliminar
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};
