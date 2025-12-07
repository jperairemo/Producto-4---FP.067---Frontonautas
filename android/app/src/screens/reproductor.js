// android/app/src/screens/reproductor.js
import React, { useCallback, useRef, useState, useLayoutEffect } from 'react';
import { View, Text, TouchableOpacity} from 'react-native';
import styles  from './reproductor.styles';
import YoutubePlayer from 'react-native-youtube-iframe';
import Icon from 'react-native-vector-icons/FontAwesome';

// Extrae el ID de YouTube a partir de una URL o directamente del ID
function extractYoutubeId(url = '') {
  if (!url) return null;

  // https://www.youtube.com/watch?v=ID
  const vMatch = url.match(/[?&]v=([^&#]+)/);
  if (vMatch && vMatch[1]) return vMatch[1];

  // https://youtu.be/ID
  const shortMatch = url.match(/youtu\.be\/([^?&#]+)/);
  if (shortMatch && shortMatch[1]) return shortMatch[1];

  // Si ya viene solo el ID (sin http)
  if (!url.includes('http')) return url;

  return null;
}

export default function Reproductor({ route, navigation }) {

  useLayoutEffect(() => {
    navigation.setOptions({
      headerRight: () => (
        <TouchableOpacity
          onPress={() => navigation.popToTop()}
          style={{ marginRight: 15 }}
        >
          <Icon
            name="home"
            size={24}
            color="white"
          />
        </TouchableOpacity>
      ),
    });
  }, [navigation]);

  // ⬅️ Detalles navega así: navigation.navigate('Media', { jugador: jugadorActual })
  const { jugador } = route.params || {};
  const youtubeId = extractYoutubeId(jugador?.videoUrl || '');

  const [playing, setPlaying] = useState(false);
  const playerRef = useRef(null);

  const onStateChange = useCallback((state) => {
    if (state === 'ended') {
      setPlaying(false);
    }
  }, []);

  // Mantengo la lógica simple: estado "playing" + seekTo.
  const togglePlayPause = () => {
    setPlaying(prev => !prev);
  };

  const handlePause = () => {
    setPlaying(false);
  };

  const handleStop = () => {
    setPlaying(false);
    playerRef.current?.seekTo?.(0, true);
  };

  const handleRestart = () => {
    playerRef.current?.seekTo?.(0, true);
    setPlaying(true);
  };

  // Si no hay vídeo configurado para ese jugador
  if (!youtubeId) {
    return (
      <View style={styles.container}>
        <Text style={styles.title}>
          Jugadas de {jugador?.nombre} {jugador?.apellidos}
        </Text>
        <View style={styles.noVideoBox}>
          <Text style={styles.noVideoText}>
            Este jugador todavía no tiene un vídeo de YouTube asignado.
          </Text>
          <Text style={styles.noVideoTextSmall}>
            Añade una URL de YouTube en el campo "videoUrl" del jugador en Firebase.
          </Text>
        </View>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <Text style={styles.title}>
        Jugadas de {jugador?.nombre} {jugador?.apellidos}
      </Text>

      <View style={styles.playerWrapper}>
        <YoutubePlayer
          ref={playerRef}
          height={230}
          width={'100%'}
          videoId={youtubeId}
          play={playing}
          onChangeState={onStateChange}
        />
      </View>

      {/* Controles redondos con FontAwesome */}
      <View style={styles.buttonsRow}>
        <TouchableOpacity style={styles.iconButton} onPress={togglePlayPause}>
          <Icon name="play" size={26} color="#fff" />
        </TouchableOpacity>

        <TouchableOpacity style={styles.iconButton} onPress={handlePause}>
          <Icon name="pause" size={26} color="#fff" />
        </TouchableOpacity>

        <TouchableOpacity style={styles.iconButton} onPress={handleStop}>
          <Icon name="stop" size={26} color="#fff" />
        </TouchableOpacity>

        <TouchableOpacity style={styles.iconButton} onPress={handleRestart}>
          <Icon name="repeat" size={24} color="#fff" />
        </TouchableOpacity>
      </View>
    </View>
  );
}


