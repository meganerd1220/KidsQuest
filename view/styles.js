import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "lightblue",
    alignItems: "center",
    justifyContent: "center",
    width: "100%",
  },
  keyboard: {
    flex: 1,
    backgroundColor: "lightgreen",
    alignItems: "center",
    justifyContent: "center",
    width: "100%",

  },
  title: {
    fontSize: 40,
    color: "#fff",
    marginBottom: 50,
    marginTop: 70,  
    fontWeight: "bold",
  },
  input: {
    backgroundColor: "#fff",
    padding: 10,
    width: "80%",
    marginTop: 15,
    color: "#000",
    borderRadius: 20,
  },
  choreButton: {
    backgroundColor: "#007BFF",
    paddingVertical: 20,
    paddingHorizontal: 50,
    borderRadius: 10,
    marginTop: 50,
  },
  choreButtonText: {
    fontSize: 18,
    color: "#fff",
    fontWeight: "bold",
    textAlign: "center",
    textTransform: "uppercase",
  },
  button: {
    backgroundColor: "#007BFF",
    paddingVertical: 15,
    paddingHorizontal: 30,
    borderRadius: 10,
    marginTop: 50,
  },
  buttonDelete: {
    backgroundColor: "#FDFD96",
    borderRadius: 2,
    position: "absolute",
    borderColor: "#007BFF"
  },
  buttonText: {
    fontSize: 18,
    color: "#fff",
    fontWeight: "bold",
    textAlign: "center",
    textTransform: "uppercase",
  },
  optionsaccount: {
    marginTop: 25,
    color: '#007BFF',
    textDecorationLine: 'underline',
    fontSize: 15,
  },
  createAccountText: {
    marginTop: 10,
    color: '#007BFF',
    textDecorationLine: 'underline',

  },
  googleButton: {
    flexDirection: 'column',
    alignItems: 'center',
  },
  googleIcon: {
    marginTop: 15,
    width: 40,
    height: 40,
    marginRight: 10,
    alignItems: "center",
  },
  googleText: {
    fontSize: 17,
    color: "white",
    fontWeight: "bold",
  },
  btnSettings: {
    backgroundColor: "#808080",
    paddingVertical: 15,
    paddingHorizontal: 30,
    borderRadius: 50,
    marginTop: 25,
    marginBottom: 25
  },
  centeredView: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(173, 216, 230, 0.7)', // Blueish background

  },
  modalView: {
    margin: 20,
    backgroundColor: 'white',
    borderRadius: 20,
    padding: 35,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },

  modalText: {
    marginBottom: 15,
    textAlign: 'center',
  },
  modalButton: {
    backgroundColor: 'blue',
    borderRadius: 5,
    padding: 10,
    elevation: 2,
  },
  modalButtonText: {
    color: 'white',
    fontWeight: 'bold',
    textAlign: 'center',
  },
  itemContainer: {
    backgroundColor: '#fff',
    padding: 20,
    marginVertical: 8,
    marginHorizontal: 16,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: '#007BFF',
  },
  itemText: {
    fontSize: 18,
    color: '#000',
  },
  
});



export default styles;
