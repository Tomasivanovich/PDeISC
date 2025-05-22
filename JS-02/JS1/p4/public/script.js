try {
  async function postData(url, data) {
    const res = await fetch(url, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data),
    });
    return res.json();
  }

  async function cargarDatosIniciales() {
    try {
      const res = await fetch('/obtener');
      const data = await res.json();
      userNumeros = data.numeros;
      userMensajesChat = data.mensajes;
      colaClientes = data.clientes;

      updateNumerosDisplay();
      updateMensajesChatDisplay();
      updateColaClientesDisplay();
    } catch (error) {
      console.error('Error cargando datos iniciales:', error);
      alert('Error al cargar datos iniciales. Revisa la consola.');
    }
  }

  let userNumeros = [];
  let userMensajesChat = [];
  let colaClientes = [];

  // DOM
  const numerosArrayDisplay = document.getElementById('numerosArrayDisplay');
  const addNumeroForm = document.getElementById('addNumeroForm');
  const addNumeroInput = document.getElementById('addNumeroInput');
  const btnShiftNumero = document.getElementById('btnShiftNumero');
  const resultShiftNumero = document.getElementById('resultShiftNumero');

  function updateNumerosDisplay() {
    numerosArrayDisplay.textContent = `[${userNumeros.join(', ')}]`;
  }

  addNumeroForm.addEventListener('submit', async function (e) {
    e.preventDefault();
    try {
      const numero = parseFloat(addNumeroInput.value);
      if (!isNaN(numero)) {
        await postData('/guardar', { tipo: 'numero', valor: numero });
        userNumeros.push(numero);
        resultShiftNumero.textContent = `Número ${numero} agregado.`;
        addNumeroInput.value = '';
        updateNumerosDisplay();
      }
    } catch (error) {
      console.error('Error agregando número:', error);
      resultShiftNumero.textContent = 'Error al agregar número. Revisa la consola.';
    }
  });

  btnShiftNumero.addEventListener('click', async () => {
    try {
      const res = await postData('/shift', { tipo: 'numero' });
      const quitado = res.quitado;
      if (quitado !== undefined) {
        userNumeros.shift();
        resultShiftNumero.textContent = `Número quitado: ${quitado}`;
      } else {
        resultShiftNumero.textContent = 'El array de números está vacío.';
      }
      updateNumerosDisplay();
    } catch (error) {
      console.error('Error eliminando número:', error);
      resultShiftNumero.textContent = 'Error al eliminar número. Revisa la consola.';
    }
  });

  const mensajesChatDisplay = document.getElementById('mensajesChatDisplay');
  const addMensajeForm = document.getElementById('addMensajeForm');
  const addMensajeInput = document.getElementById('addMensajeInput');
  const btnShiftMensaje = document.getElementById('btnShiftMensaje');
  const resultShiftMensaje = document.getElementById('resultShiftMensaje');

  function updateMensajesChatDisplay() {
    mensajesChatDisplay.textContent = `["${userMensajesChat.join('", "')}"]`;
  }

  addMensajeForm.addEventListener('submit', async function (e) {
    e.preventDefault();
    try {
      const mensaje = addMensajeInput.value.trim();
      if (mensaje) {
        await postData('/guardar', { tipo: 'mensaje', valor: mensaje });
        userMensajesChat.push(mensaje);
        resultShiftMensaje.textContent = `Mensaje "${mensaje}" agregado.`;
        addMensajeInput.value = '';
        updateMensajesChatDisplay();
      }
    } catch (error) {
      console.error('Error agregando mensaje:', error);
      resultShiftMensaje.textContent = 'Error al agregar mensaje. Revisa la consola.';
    }
  });

  btnShiftMensaje.addEventListener('click', async () => {
    try {
      const res = await postData('/shift', { tipo: 'mensaje' });
      const quitado = res.quitado;
      if (quitado !== undefined) {
        userMensajesChat.shift();
        resultShiftMensaje.textContent = `Mensaje quitado: "${quitado}"`;
      } else {
        resultShiftMensaje.textContent = 'El array de mensajes está vacío.';
      }
      updateMensajesChatDisplay();
    } catch (error) {
      console.error('Error eliminando mensaje:', error);
      resultShiftMensaje.textContent = 'Error al eliminar mensaje. Revisa la consola.';
    }
  });

  const colaClientesDisplay = document.getElementById('colaClientesDisplay');
  const addClienteForm = document.getElementById('addClienteForm');
  const addClienteInput = document.getElementById('addClienteInput');
  const btnAtenderCliente = document.getElementById('btnAtenderCliente');
  const resultAtenderCliente = document.getElementById('resultAtenderCliente');
  const colaClientesError = document.getElementById('colaClientesError');

  function updateColaClientesDisplay() {
    colaClientesDisplay.textContent = `["${colaClientes.join('", "')}"]`;
    colaClientesError.textContent = colaClientes.length === 0 ? '¡La cola está vacía!' : '';
  }

  addClienteForm.addEventListener('submit', async function (e) {
    e.preventDefault();
    try {
      const cliente = addClienteInput.value.trim();
      if (cliente) {
        await postData('/guardar', { tipo: 'cliente', valor: cliente });
        colaClientes.push(cliente);
        resultAtenderCliente.textContent = `"${cliente}" agregado a la cola.`;
        addClienteInput.value = '';
        updateColaClientesDisplay();
      }
    } catch (error) {
      console.error('Error agregando cliente:', error);
      resultAtenderCliente.textContent = 'Error al agregar cliente. Revisa la consola.';
    }
  });

  btnAtenderCliente.addEventListener('click', async () => {
    try {
      const res = await postData('/shift', { tipo: 'cliente' });
      const quitado = res.quitado;
      if (quitado !== undefined) {
        colaClientes.shift();
        resultAtenderCliente.textContent = `Cliente atendido: "${quitado}".`;
      } else {
        resultAtenderCliente.textContent = 'No hay clientes en la cola.';
      }
      updateColaClientesDisplay();
    } catch (error) {
      console.error('Error atendiendo cliente:', error);
      resultAtenderCliente.textContent = 'Error al atender cliente. Revisa la consola.';
    }
  });

  // Inicializar datos del servidor
  cargarDatosIniciales();

} catch (error) {
  console.error('Error general en la aplicación:', error);
  alert('Error crítico en la aplicación. Revisa la consola.');
}
