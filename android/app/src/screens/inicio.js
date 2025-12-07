// android/app/src/screens/inicio.js
import React, { useEffect, useState } from 'react';
import {
  View,
  Text,
  FlatList,
  TouchableOpacity,
  Modal,
  TextInput,
  Alert,
  Image,
} from 'react-native';
import styles from './inicio.styles';
import logo from '../assets/logo.png';

import Icon from 'react-native-vector-icons/FontAwesome';
import { Picker } from '@react-native-picker/picker';

import { db } from '../firebase/firebase';
import { ref, onValue, get, child, push, set, remove } from 'firebase/database';

const POSICIONES_BASKET = ['Base', 'Escolta', 'Alero', 'Ala-Pívot', 'Pívot'];

export default function Inicio({ navigation }) {
  const [jugadores, setJugadores] = useState([]);

  // Estado del modal "Nuevo jugador"
  const [modalVisible, setModalVisible] = useState(false);
  const [nuevoJugador, setNuevoJugador] = useState({
    nombre: '',
    apellidos: '',
    posicion: '',
    edad: '0',
    altura: '1.92',
    videoUrl: '',
  });

  const navegarADetalles = jugador => {
    navigation.navigate('Detalle', {
      jugadorData: jugador,
    });
  };

  // ============================
  //   Carga de jugadores
  // ============================
  useEffect(() => {
    const rootRef = ref(db);

    // 1. Comprobación con get() (tipo once)
    get(child(rootRef, 'jugadores'))
      .then(snapshot => {
        if (snapshot.exists()) {
          console.log('Datos recibidos con get():', snapshot.val());
        } else {
          console.log('No existen datos en la ruta jugadores');
        }
      })
      .catch(err => console.error(err));

    // 2. Lectura en tiempo real
    const jugadoresRef = ref(db, 'jugadores');

    const unsubscribe = onValue(jugadoresRef, snapshot => {
      const data = snapshot.val();
      if (data) {
        const lista = Object.keys(data).map(id => ({
          id,
          ...data[id],
        }));
        setJugadores(lista);
      } else {
        setJugadores([]);
      }
    });

    return () => unsubscribe();
  }, []);

  // ============================
  //   Modal Nuevo jugador
  // ============================
  const abrirModal = () => {
    setNuevoJugador({
      nombre: '',
      apellidos: '',
      posicion: '',
      edad: '0',
      altura: '1.92',
      videoUrl: '',
    });
    setModalVisible(true);
  };

  const cerrarModal = () => {
    setModalVisible(false);
  };

  const handleChangeNuevo = (campo, valor) => {
    setNuevoJugador(prev => ({
      ...prev,
      [campo]: valor,
    }));
  };

  const guardarNuevoJugador = async () => {
    try {
      if (!nuevoJugador.nombre.trim() || !nuevoJugador.apellidos.trim()) {
        alert('Nombre y apellidos son obligatorios');
        return;
      }

      const jugadoresRef = ref(db, 'jugadores');
      const nuevaRef = push(jugadoresRef);

      await set(nuevaRef, {
        nombre: nuevoJugador.nombre.trim(),
        apellidos: nuevoJugador.apellidos.trim(),
        posicion: nuevoJugador.posicion || 'Sin posición',
        edad: parseInt(nuevoJugador.edad) || 0,
        altura: parseFloat(nuevoJugador.altura) || 0,
        videoUrl: nuevoJugador.videoUrl?.trim() || '',
      });

      cerrarModal();
    } catch (error) {
      console.error('Error al guardar jugador nuevo:', error);
      alert('Error al guardar el jugador. Inténtalo de nuevo.');
    }
  };

  // ============================
  //   Borrar jugador
  // ============================
  const borrarJugador = (id, nombre, apellidos) => {
    Alert.alert(
      'Confirmar eliminación',
      `¿Estás seguro de que deseas eliminar a ${nombre} ${apellidos}?`,
      [
        { text: 'Cancelar', style: 'cancel' },
        {
          text: 'Eliminar',
          style: 'destructive',
          onPress: () => {
            remove(ref(db, `jugadores/${id}`));
          },
        },
      ],
    );
  };

  return (
    <View style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <Image source={logo} style={styles.logo} resizeMode="contain" />
      </View>

      {/* Botón Nuevo jugador */}
      <TouchableOpacity style={styles.btnNuevoJugador} onPress={abrirModal}>
        <Text style={styles.btnText}>+ Nuevo jugador</Text>
      </TouchableOpacity>

      {/* Lista de jugadores */}
      <FlatList
        data={jugadores}
        keyExtractor={item => item.id}
        renderItem={({ item }) => (
          <TouchableOpacity
            style={styles.card}
            onPress={() => navegarADetalles(item)}
          >
            <View style={styles.cardLeft}>
              <View style={styles.avatar}>
                <Text style={styles.avatarText}>👤</Text>
              </View>

              <View>
                <Text style={styles.nombre}>
                  {item.nombre} {item.apellidos}
                </Text>
                <Text style={styles.posicion}>{item.posicion}</Text>
              </View>
            </View>

            <TouchableOpacity
              onPress={() =>
                borrarJugador(item.id, item.nombre, item.apellidos)
              }
            >
              <View style={styles.deleteIcon}>
                <Icon name="trash" size={18} color="#D9534F" />
              </View>
            </TouchableOpacity>
          </TouchableOpacity>
        )}
      />

      {/* Modal: Añadir nuevo jugador */}
      <Modal
        visible={modalVisible}
        transparent
        animationType="fade"
        onRequestClose={cerrarModal}
      >
        <View style={styles.modalOverlay}>
          <View style={styles.modalCard}>
            {/* Cabecera del modal */}
            <View style={styles.modalHeader}>
              <View style={styles.modalTitleRow}>
                <Icon
                  name="user-plus"
                  size={20}
                  color="white"
                  style={{ marginRight: 8 }}
                />
                <Text style={styles.modalHeaderTitle}>
                  Añadir nuevo jugador
                </Text>
              </View>

              <TouchableOpacity
                style={styles.modalCloseButton}
                onPress={cerrarModal}
              >
                <Icon name="close" size={22} color="white" />
              </TouchableOpacity>
            </View>

            {/* Cuerpo del modal */}
            <View style={styles.modalBody}>
              {/* Fila 1: Nombre / Apellidos */}
              <View style={styles.formRow}>
                <View style={styles.formField}>
                  <Text style={styles.label}>Nombre</Text>
                  <TextInput
                    style={styles.input}
                    placeholder="Nombre"
                    value={nuevoJugador.nombre}
                    onChangeText={val => handleChangeNuevo('nombre', val)}
                  />
                </View>

                <View style={styles.formField}>
                  <Text style={styles.label}>Apellidos</Text>
                  <TextInput
                    style={styles.input}
                    placeholder="Apellidos"
                    value={nuevoJugador.apellidos}
                    onChangeText={val => handleChangeNuevo('apellidos', val)}
                  />
                </View>
              </View>

              {/* Fila 2: Posición / Edad */}
              <View style={styles.formRow}>
                <View style={styles.formField}>
                  <Text style={styles.label}>Posición</Text>
                  <View style={styles.pickerContainer}>
                    <Picker
                      selectedValue={nuevoJugador.posicion}
                      onValueChange={val => handleChangeNuevo('posicion', val)}
                    >
                      <Picker.Item label="Selecciona" value="" />
                      {POSICIONES_BASKET.map(pos => (
                        <Picker.Item key={pos} label={pos} value={pos} />
                      ))}
                    </Picker>
                  </View>
                </View>

                <View style={styles.formField}>
                  <Text style={styles.label}>Edad</Text>
                  <TextInput
                    style={styles.input}
                    keyboardType="numeric"
                    value={String(nuevoJugador.edad)}
                    onChangeText={val => handleChangeNuevo('edad', val)}
                  />
                </View>
              </View>

              {/* Fila 3: Altura */}
              <View style={styles.formRow}>
                <View style={styles.formField}>
                  <Text style={styles.label}>Altura (m)</Text>
                  <TextInput
                    style={styles.input}
                    keyboardType="numeric"
                    value={String(nuevoJugador.altura)}
                    onChangeText={val => handleChangeNuevo('altura', val)}
                  />
                </View>
              </View>

              {/* Fila 4: URL vídeo (ocupa todo el ancho) */}
              <View style={styles.formRow}>
                <View style={[styles.formField, { flexBasis: '100%' }]}>
                  <Text style={styles.label}>URL del vídeo (YouTube)</Text>
                  <TextInput
                    style={styles.input}
                    placeholder="https://www.youtube.com/..."
                    autoCapitalize="none"
                    autoCorrect={false}
                    value={nuevoJugador.videoUrl}
                    onChangeText={val => handleChangeNuevo('videoUrl', val)}
                  />
                </View>
              </View>

              {/* Botón Guardar */}
              <View style={styles.saveButtonWrapper}>
                <TouchableOpacity
                  style={styles.saveButton}
                  onPress={guardarNuevoJugador}
                >
                  <Icon
                    name="save"
                    size={18}
                    color="white"
                    style={{ marginRight: 8 }}
                  />
                  <Text style={styles.saveButtonText}>Guardar</Text>
                </TouchableOpacity>
              </View>
            </View>
          </View>
        </View>
      </Modal>
    </View>
  );
}
