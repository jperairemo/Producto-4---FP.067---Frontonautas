import { StyleSheet } from 'react-native';

export default StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F7D7B5',
    paddingHorizontal: 20,
    paddingTop: 40,
  },

  header: {
    // backgroundColor: '#D9792B',
    paddingVertical: 8,
    borderRadius: 20,
    alignItems: 'center',
    marginBottom: 20,
  },

  headerText: {
    color: 'white',
    fontWeight: 'bold',
    fontSize: 20,
  },

  btnNuevoJugador: {
    backgroundColor: '#D9792B',
    paddingVertical: 12,
    borderRadius: 12,
    alignItems: 'center',
    marginBottom: 20,
  },

  btnText: {
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold',
  },

  card: {
    backgroundColor: 'white',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: 15,
    borderRadius: 12,
    marginBottom: 15,
    elevation: 3,
  },

  cardLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 15,
  },

  avatar: {
    backgroundColor: '#F7D7B5',
    padding: 12,
    borderRadius: 40,
  },

  avatarText: {
    fontSize: 22,
  },

  nombre: {
    fontSize: 16,
    fontWeight: 'bold',
  },

  posicion: {
    fontSize: 14,
    color: 'gray',
  },

  deleteIcon: {
    backgroundColor: '#FFD6D6',
    padding: 10,
    borderRadius: 10,
    fontSize: 18,
  },

  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.35)',
    justifyContent: 'center',
    alignItems: 'center',
  },

  modalCard: {
    width: '90%',
    backgroundColor: 'white',
    borderRadius: 16,
    overflow: 'hidden',
  },

  modalHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: '#D9792B',
    paddingHorizontal: 16,
    paddingVertical: 12,
  },

  modalTitleRow: {
    flexDirection: 'row',
    alignItems: 'center',
  },

  modalHeaderTitle: {
    color: 'white',
    fontSize: 18,
    fontWeight: 'bold',
  },

  modalCloseButton: {
    padding: 4,
  },

  modalBody: {
    paddingHorizontal: 16,
    paddingVertical: 16,
  },

  formRow: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    marginBottom: 12,
  },

  formField: {
    flexBasis: '48%',
    marginBottom: 8,
  },

  label: {
    fontSize: 14,
    color: '#555',
    marginBottom: 4,
  },

  input: {
    backgroundColor: '#F5F5F5',
    borderRadius: 8,
    paddingHorizontal: 10,
    paddingVertical: 8,
    fontSize: 14,
    borderWidth: 1,
    borderColor: '#ddd',
  },

  pickerContainer: {
    backgroundColor: '#F5F5F5',
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#ddd',
    overflow: 'hidden',
  },

  saveButtonWrapper: {
    marginTop: 12,
    alignItems: 'flex-end',
  },

  saveButton: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#3D6BE5',
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderRadius: 10,
  },

  saveButtonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold',
  },
  logo: {
    width: 160, // ajusta según lo grande que lo quieras
    height: 80,
    marginBottom: 5,
  },
});
