import { StyleSheet } from 'react-native';

export default StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'transparent',
  },
  text: {
    fontSize:16,
    color: 'white',
  },
  backgroundImage: {
    flex: 1,
    resizeMode: 'cover',
    width: '100%',
    height: '100%',
    justifyContent: 'center', 
    alignItems: 'center'
  },
  input: {
    fontSize:16,
    marginVertical: 8,
    padding: 16,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: '#ccc',
    textAlign: 'left',
    paddingVertical: 2,
  },
  button: {
    borderWidth: 0,
    //backgroundColor: 'white',
    padding: 20,
    borderRadius: 10,
  },
  linkButton: {
    backgroundColor: 'transparent',  
    padding: 10,  
    color: 'white',
    textDecorationLine: 'underline',   
  },
  button1: {
    borderRadius: 8,
    borderWidth: 1,
    
    paddingVertical: 10, 
    paddingHorizontal: 20, 
    fontSize: 16, 
    fontWeight: '500',
    fontFamily: 'inherit',
    backgroundColor: '#C66FBC',
    borderColor: '#ccc'
  },
  body: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    minWidth: 320,
    minHeight: '100%',
  },
});