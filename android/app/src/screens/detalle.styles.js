import { StyleSheet } from "react-native";

const styles = StyleSheet.create({

    cardContainer: {
        flex: 1,
        padding: 20,
        backgroundColor: "#F7D7B5",
    },
    headerContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: 20,
        padding: 20,
        backgroundColor: "white",
        borderRadius: 8,
    },
    headerTitle: {
        fontSize: 20,
        color: "black",
    },
    headerButtons: {
        flexDirection: 'row',
    },
    buttonText: {
        color: "white",
        marginLeft: 4,
        fontSize: 20,
    },
    //Estilos del Avatar
    outerAvatarRing: {
        width: 130,
        height: 130,
        borderRadius: 65,
        backgroundColor: '#f5b041',
        justifyContent: 'center',
        alignItems: 'center',
        marginBottom: 15,
    },
    detailAvatarBg: {
        width: 120,
        height: 120,
        borderRadius: 60,
        backgroundColor: '#E37C2C', // Gris de fondo para el círculo
        justifyContent: 'center',
        alignItems: 'center',
    },

    avatarContainer: {
        marginRight: 0,
        marginBottom: 15,
    },
  
    //Estilo para el icono/texto de avatar si no hay imagen
    avatarText: {
        fontSize: 32,
        lineHeight: 120,
        textAlign: 'center',
        width: '100%',
    },

  //Separación entre foto y texto
    infoRow: {
        flexDirection: 'column',
        alignItems: 'center',
        padding: 20,
        backgroundColor: "white",
        borderRadius: 8,
    },

    textInfoContainer: {
        width: '100%',
        alignItems: 'flex-start',
    },

    detailItem: {
        flexDirection: 'column',
        marginBottom: 12,
    },

    editFieldCard: {
        width: '100%',
        backgroundColor: 'white',
        borderRadius: 8,
        paddingHorizontal: 15,
        paddingTop: 15,
    },

    editRow: {
        flexDirection: 'column',
        //alignItems: 'center',
        padding: 20,
        backgroundColor: "white",
        borderRadius: 8,
    },

    textEditContainer: {

        //alignItems: 'flex-start',
    },

    editItem: {
        flexDirection: 'column',
        marginBottom: 12,
        alignItems: 'center',
    },

    // Botón naranja de marca
    btnBrand: {
      backgroundColor: '#e07a2f',
      borderColor: '#e07a2f',
      color: "white",
      borderRadius: 6,
      paddingVertical: 4,
      paddingHorizontal: 10,
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'center',
    },

      //Botón EDITAR
    btnEditFilled: {
      backgroundColor: '#E37C2C',
      borderColor: '#E37C2C',
      color: "white",
      borderRadius: 6,
      paddingVertical: 4,
      paddingHorizontal: 10,
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'center',
    },

    //Iconos alineados dentro de los botones
    buttonIcon: {
      marginRight: 4, // margin-right: 4px
    },

    label: {
      color: "gray",
      marginRight: 5,
      fontSize: 18,
    },

    value: {
      color: "black",
      fontSize: 18,
    },

    mediaContainer: {
        padding: 20,
        paddingBottom: 30,
        backgroundColor: "white",
        borderRadius: 8,
        marginTop: 20,
    },

    // Título "Media"
    mediaTitle: {
        fontSize: 20,
        color: "black",
        marginBottom: 15,
    },

    // Botón Naranja "Jugadas Destacadas"
    btnMedia: {
        backgroundColor: '#E37C2C',
        borderRadius: 6,
        paddingVertical: 10,
        paddingHorizontal: 15,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        elevation: 2,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 2,
    },

    // Texto del botón
    btnMediaText: {
        color: 'white',
        fontSize: 18,
        fontWeight: 'bold',
    },

    // Edición de jugador
    inputField: {
        borderWidth: 1,
        borderColor: '#ccc',
        borderRadius: 8,
        paddingHorizontal: 8,
        paddingVertical: 8,
        fontSize: 18,
        color: 'black',
        marginTop: 4,
        width: '100%',
    },

    btnEdit: {
        borderWidth: 1,
        borderColor: '#ccc',
        borderRadius: 6,
        paddingVertical: 10,
        paddingHorizontal: 15,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
    },

    buttonCancel: {
        color: 'gray',
        marginLeft: 4,
        fontSize: 20,
    },

    pickerContainer: {
        borderWidth: 1,
        borderColor: '#ccc',
        borderRadius: 8,
        marginTop: 4,
        overflow: 'hidden', // Para contener el picker dentro del borde
        backgroundColor: 'white',
        height: 50, // Altura fija para alineación
        justifyContent: 'center',
    },
    pickerStyle: {
        height: 50,
        width: '100%',
        color: 'black',
    },
    pickerItemStyle: {
        // Estilos específicos para ítems en iOS
        height: 50,
        fontSize: 18,
    },
});
export { styles };