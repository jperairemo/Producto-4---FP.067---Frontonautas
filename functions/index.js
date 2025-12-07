const functions = require("firebase-functions");
const admin = require("firebase-admin");

admin.initializeApp();

// Usamos esta sintaxis específica para asegurar compatibilidad
exports.enviarNotificacionAlEscribir = functions.database.ref('/mensajes/{mensajeId}')
    .onWrite((change, context) => {
        
        // 1. Si se borra el mensaje, salimos
        if (!change.after.exists()) {
            return null;
        }

        // 2. Datos del mensaje
        const datosMensaje = change.after.val();
        
        // 3. Buscar tokens en la base de datos
        return admin.database().ref('/tokens').once('value')
            .then(snapshot => {
                if (!snapshot.exists()) {
                    console.log("No hay tokens para enviar.");
                    return null;
                }

                // Recopilar tokens limpios
                const tokens = [];
                snapshot.forEach(child => {
                    const val = child.val();
                    const token = val.token || val; // Detecta si es objeto o string
                    if (token) tokens.push(token);
                });

                if (tokens.length === 0) return null;

                // 4. Configurar notificación
                const payload = {
                    notification: {
                        title: '¡Nueva entrada!',
                        body: `Mensaje: ${datosMensaje.texto || 'Nuevo dato'}`,
                        sound: 'default'
                    }
                };

                // 5. Enviar
                return admin.messaging().sendToDevice(tokens, payload);
            })
            .then(response => {
                if (response) console.log('Notificación enviada:', response);
                return null;
            })
            .catch(error => {
                console.log('Error:', error);
                return null;
            });
    });