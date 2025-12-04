import React, { useState, useLayoutEffect, useCallback } from 'react';
import { View, Text, Image, StyleSheet, TouchableOpacity, TextInput, ScrollView } from 'react-native';
import { styles } from './detalle.styles';
import Icon from 'react-native-vector-icons/FontAwesome';
import IonIcon from 'react-native-vector-icons/Ionicons';
import { Picker } from '@react-native-picker/picker';

import { db } from '../firebase/firebase';
import { ref, update } from 'firebase/database';

const POSICIONES_BASKET = [
  'Base',
  'Escolta',
  'Alero',
  'Ala-Pívot',
  'Pívot',
];

export default function Detalles({ route, navigation }) {

  const cancelEdit = useCallback(() => {
    setEditMode(false);
  }, []);

  const navegarAReproductor = () => {
      navigation.navigate('Media', {
          jugador: jugadorActual
      });
    }

    const initialJugadorData = route.params?.jugadorData || {};
    const [jugadorActual, setJugadorActual] = useState(initialJugadorData);

    const [editMode, setEditMode] = useState(false);
    const [jugadorEditable, setJugadorEditable] = useState(initialJugadorData);


    const enableEdit = () => {
      setJugadorEditable({...jugadorActual});
      setEditMode(true);
    };

    const saveChanges = async () => {
        try {
          const jugadorRef = ref(db, `jugadores/${jugadorActual.id}`);

          const datosAGuardar = {
            id: jugadorActual.id,
            nombre: jugadorEditable.nombre,
            apellidos: jugadorEditable.apellidos,
            posicion: jugadorEditable.posicion,
            videoUrl: jugadorEditable.videoUrl,
            edad: parseInt(jugadorEditable.edad) || 0,
            altura: parseFloat(jugadorEditable.altura) || 0,
          };

          await update(jugadorRef, datosAGuardar);
          setJugadorActual(datosAGuardar);

          console.log('Cambios guardados exitosamente en Realtime Database:', jugadorActual.id);

          setEditMode(false);
        } catch (error) {
          console.error('Error al guardar los cambios en Realtime Database:', error);
          alert("Error al guardar los datos. Inténtalo de nuevo.");
        }
    };

    const handleInputChange = (key, value) => {
      setJugadorEditable(prev => ({
        ...prev,
        [key]: value
      }));
    };

    if (!jugadorActual.id) {
      return (
        <View style={styles.cardContainer}>
          <Text style={styles.headerTitle}>No se han cargado los detalles del jugador.</Text>
        </View>
      );
    };

  useLayoutEffect(() => {

      const headerRightConfig = {
        headerRight: () => (
          <TouchableOpacity
            onPress={() => navigation.popToTop()}
            style={{ marginRight: 15 }}
          >
            <Icon name="home" size={24} color="white" />
          </TouchableOpacity>
        ),
      };
      if (editMode) {
        navigation.setOptions({
          ...headerRightConfig,
          headerLeft: () => (
            <TouchableOpacity
                onPress={cancelEdit}
                style={{ paddingLeft: 1, paddingRight: 32 }}
              >
                <IonIcon
                    name={'arrow-back'}
                    size={22.5}
                    color="white"
                />
              </TouchableOpacity>
          ),
          gestureEnabled: false,
        });
      } else {
        navigation.setOptions({
          ...headerRightConfig,
          headerLeft: undefined,
          gestureEnabled: true,
        });
      }

    }, [navigation, cancelEdit, editMode]);

  return (
    <View style={styles.cardContainer}>

      {/* 1. Cabecera (row g-3, d-flex justify-content-between) */}
      <View style={styles.headerContainer}>
        <Text style={styles.headerTitle}>{`${jugadorActual.nombre} ${jugadorActual.apellidos}`}</Text>

        <View style={styles.headerButtons}>

          {!editMode && (
            <TouchableOpacity
              style={styles.btnEditFilled}
              onPress={enableEdit}
            >
              <Icon
                name="pencil-square-o"
                size={20}
                color="white"
                style={styles.buttonIcon}
              />
              <Text style={styles.buttonText}>Editar</Text>
            </TouchableOpacity>
          )}

        </View>
      </View>
      <ScrollView contentContainerStyle={styles.scrollContent}>
        {editMode ? (
          <View style={styles.editRow}>

              <View style={styles.textEditContainer}>
                <View style={styles.editFieldCard}>
                  <View style={styles.detailItem}>
                    <Text style={styles.label}>Nombre</Text>
                    <TextInput
                      style={styles.inputField}
                      value={jugadorEditable.nombre}
                      onChangeText={(val) => handleInputChange('nombre', val)}
                    />
                  </View>
                </View>
                <View style={styles.editFieldCard}>
                  <View style={styles.detailItem}>
                    <Text style={styles.label}>Apellidos</Text>
                    <TextInput
                      style={styles.inputField}
                      value={jugadorEditable.apellidos}
                      onChangeText={(val) => handleInputChange('apellidos', val)}
                    />
                  </View>
                </View>
                <View style={styles.editFieldCard}>
                  <View style={styles.detailItem}>
                    <Text style={styles.label}>Posición</Text>
                    <View style={styles.pickerContainer}>
                      <Picker
                        selectedValue={jugadorEditable.posicion}
                        onValueChange={(itemValue) => handleInputChange('posicion', itemValue)}
                        style={styles.pickerStyle}
                      >
                        {POSICIONES_BASKET.map(posicion => (
                          <Picker.Item
                            label={posicion}
                            value={posicion}
                            key={posicion}
                          />
                        ))}
                      </Picker>
                    </View>
                  </View>
                </View>
                <View style={styles.editFieldCard}>
                  <View style={styles.detailItem}>
                    <Text style={styles.label}>Edad</Text>
                    <TextInput
                      style={styles.inputField}
                      value={String(jugadorEditable.edad)}
                      onChangeText={(val) => handleInputChange('edad', val)}
                      keyboardType="numeric"
                    />
                  </View>
                </View>
                <View style={styles.editFieldCard}>
                  <View style={styles.detailItem}>
                    <Text style={styles.label}>Altura</Text>
                    <TextInput
                      style={styles.inputField}
                      value={String(jugadorEditable.altura)}
                      onChangeText={(val) => handleInputChange('altura', val)}
                      keyboardType="numeric"
                    />
                  </View>
                </View>

                <View style={styles.editFieldCard}>
                  <View style={styles.detailItem}>
                    <Text style={styles.label}>URL del vídeo</Text>
                    <TextInput
                      style={styles.inputField}
                      value={String(jugadorEditable.videoUrl)}
                      onChangeText={(val) => handleInputChange('videoUrl', val)}
                    />
                  </View>
                </View>

                <View style={styles.editFieldCard}>
                  <TouchableOpacity
                    style={[styles.btnEdit, {backgroundColor: '#4747D4', marginBottom: 15}]}
                    onPress={saveChanges}
                  >
                    <Text style={styles.buttonText}>Guardar Cambios</Text>
                  </TouchableOpacity>
                  {/* Botón Cancelar */}
                  <TouchableOpacity
                    style={[styles.btnEdit, {backgroundColor: 'white'}]}
                    onPress={cancelEdit}
                  >
                    <Text style={styles.buttonCancel}>Cancelar</Text>
                  </TouchableOpacity>
                </View>
              </View>
          </View>
        ) : (
          <View>
              <View style={styles.infoRow}>

                {/* Avatar (detail-avatar) */}
                <View style={styles.outerAvatarRing}>
                  <View style={styles.detailAvatarBg}>
                    <Icon
                        name="user-o"
                        size={65}
                        color="white"
                    />
                  </View>
                </View>

                {/* Información del texto */}
                <View style={styles.textInfoContainer}>

                  <View style={styles.detailItem}>
                      <Text style={styles.label}>Nombre:</Text>

                      <Text style={styles.value}>{jugadorActual.nombre}</Text>
                  </View>
                  <View style={styles.detailItem}>
                      <Text style={styles.label}>Apellidos:</Text>

                      <Text style={styles.value}>{jugadorActual.apellidos}</Text>
                  </View>
                  <View style={styles.detailItem}>
                      <Text style={styles.label}>Posición:</Text>

                      <Text style={styles.value}>{jugadorActual.posicion}</Text>
                  </View>
                  <View style={styles.detailItem}>
                      <Text style={styles.label}>Edad:</Text>

                      <Text style={styles.value}>{jugadorActual.edad}</Text>
                  </View>
                  <View style={styles.detailItem}>
                      <Text style={styles.label}>Altura:</Text>

                      <Text style={styles.value}>{jugadorActual.altura} m</Text>
                  </View>

                </View>
              </View>

              <View style={styles.mediaContainer}>
                <Text style={styles.mediaTitle}>Media</Text>
                <TouchableOpacity style={styles.btnMedia} onPress={navegarAReproductor}>
                  <Icon name="play-circle" size={30} color="white" style={{marginRight: 12}} />
                  <Text style={styles.btnMediaText}>Jugadas Destacadas</Text>
                </TouchableOpacity>
              </View>
          </View>
        )}
      </ScrollView>
    </View>
  );
}