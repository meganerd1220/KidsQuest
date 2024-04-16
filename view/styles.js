import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
    width: "100%",
  },
  containerFirstProfile: {
    marginTop: 8,

  },
  ContainerProfiles: {
    width: "100%",
    backgroundColor: "white"
  },
  squareContainer: {
    backgroundColor: "#34C0C2",
    alignItems: "center",
    justifyContent: "center",
    width: "90%",
    height: "auto",
    borderRadius: 30,
    padding: 20,


  },
  topContainer: {
    backgroundColor: '#fff',
    width: '100%',
    alignItems: 'center',
    paddingTop: 20, 
    paddingBottom: 30, 
    shadowOffset: {
      width: 0,
      height: 3,
    },
    shadowOpacity: 0.1,
    shadowRadius: 2, 
    elevation: 2, 
    position: 'absolute', 
    top: 0,
    zIndex: 1, 
  },
  topContainerProfiles: {
    flexDirection: 'row', 
    alignItems: 'center', 
    justifyContent: 'space-between', 
    marginTop: 50,
  },

  buttonContainer: {
    width: "100%",
    backgroundColor: "red",
  },
  settingsButton: {
    backgroundColor: '#FEFDEC', 
    paddingVertical: 15,
    paddingHorizontal: 30,
    borderRadius: 30,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.5,
    shadowRadius: 3.84,
    elevation: 5,
  },
  settingsFormat: {
    marginTop: 110,
    left: 120,
  },
  addFormat: {
    alignItems: "center"

  },
  choreButton: {
    marginTop: 20,
    marginBottom: 20

  },
  ProfileButton: {
    backgroundColor: '#FEFDEC',
    paddingVertical: 60,
    paddingHorizontal: 100,
    borderRadius: 40,
    shadowColor: '#000',
    marginBottom: 15,
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.5,
    shadowRadius: 3.84,
    elevation: 5,
  },

  choreItem: {
    padding: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#fff',
    marginBottom: 10,
  },
  choreText: {
    fontSize: 20,
    color: "#fff",
    fontFamily: "Arial"
  },
  title: {
    fontSize: 40,
    color: "#fff",
    marginBottom: 30,
    marginTop: 20,
    fontWeight: "bold",
    marginBottom: 1,

  },
  titleParent: {
    fontSize: 20,
    color: "gray",
    marginBottom: 30,
    marginTop: 20,
    fontWeight: "bold",
    left: 100

  },
  title2: {
    fontSize: 40,
    color: "#fff",
    fontFamily: '',
    marginBottom: 30,
    marginTop: 20,
    fontWeight: "bold",
    marginBottom: 1,

  },
  input: {
    backgroundColor: "#fff",
    padding: 10,
    width: "80%",
    color: "#000",
    borderRadius: 20,
    marginTop: 10,
    width: '80%'
  },
  firstinput: {
    marginTop: 40,
  },
  button: {
    backgroundColor: 'white',
    paddingVertical: 15,
    paddingHorizontal: 30,
    borderRadius: 30,
    marginTop: 25,
    marginBottom: 15,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.5,
    shadowRadius: 3.84,
    elevation: 5, 
  },
  profilePicButton: {
   color: "#FEFDEC", 
   fontWeight: "bold",
   fontSize: 16,
   marginTop: 5, 
   marginBottom: 10 

  },


  buttonText: {
    fontSize: 18,
    color: "#34C0C2",
    fontWeight: "bold",
    textAlign: "center",
  },
  forgotPassword: {
    marginTop: 10, 
  },
  forgotPasswordText: {
    color: '#ffff', 
    fontWeight: "bold",
    fontSize: 15,
    textAlign: "left"
  },
  optionsaccount: { 
    marginTop: 25,
    color: '#ffff',
    fontWeight: "bold",
    fontSize: 15,
    textAlign: "right",
    marginTop: 0,
    marginBottom: 25,
  },
  logo: {
    width: 200, 
    height: 200,
    resizeMode: 'contain',
  },
  minilogo: {
    width: 100, 
    height: 100,
    resizeMode: 'contain',
  },
  googleButton: {
    marginTop: 15,
    flexDirection: 'column',
    alignItems: 'center',
  },
  googleIcon: {
    marginTop: 15,
    width: 40,
    height: 40,
    marginRight: 10,
  },
  googleButtonText: {
    color: '#34C0C2', 
    fontWeight: "bold",
    fontSize: 15,
  },
  signupText: {
    marginTop: 15, 
  },
  signupTextContent: {
    color: '#34C0C2', 
    fontWeight: "bold",
    fontSize: 15,
  },
  roundImage: {
    width: 200,
    height: 200,
    resizeMode: 'contain',
    borderRadius: 100, 
    backgroundColor: 'gray', 
    justifyContent: 'center',
    alignItems: 'center',
  },

  profileImage:{
    width: 200, 
    height: 200,
    resizeMode: 'contain',
    borderRadius: 50, 

  }
});

export default styles;
