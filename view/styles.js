import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "lightblue",
        alignItems: "center",
        justifyContent: "center",
        width: "100%",
      },
      keyboard:{
        flex: 1,
        backgroundColor: "lightgreen",
        alignItems: "center",
        justifyContent: "center",
        width: "100%",
    
      }, 
      title: {
        fontSize: 40,
        color: "#fff",
        marginBottom: 20,
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
      googleText:{
        fontSize: 17, 
        color: "white", 
        fontWeight: "bold",
      },
      btnSettings:{
        backgroundColor: "#808080",
        paddingVertical: 15,
        paddingHorizontal: 30,
        borderRadius: 50,
        marginTop: 25,
        marginBottom: 25
      }
  });



export default styles;