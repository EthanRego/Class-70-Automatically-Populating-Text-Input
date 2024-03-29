import React from 'react'
import {Text,View,TouchableOpacity,StyleSheet, TextInput, Image} from 'react-native'
import {BarCodeScanner} from 'expo-barcode-scanner'
import * as Permissions from 'expo-permissions'
export default class TransactionScreen extends React.Component{

    constructor(){
        super()
        this.state={
            hasCameraPermissions:null,
            scanned:false,
            scannedBookId:'',
            scannedStudentId:'',
            buttonState:'normal',
        }
    }


handleBarCodeScanned=async({type,data})=>{
    const buttonState=this.state.buttonState
    if (buttonState === 'BookId'){
        this.setState({
            scanned:true,
            scannedBookId:data,
            buttonState:'normal'
        })
    }
    else if (buttonState === 'StudentId'){
        this.setState({
            scanned:true,
            scannedStudentId:data,
            buttonState:'normal'
        })
    }

    }

    getCameraPermissions=async(id)=>{
      const {status}=await Permissions.askAsync(Permissions.CAMERA)
      this.setState({
          hasCameraPermissions:status==='granted',
          buttonState:id,
          scanned:false
      })  
    }

render(){
    const hasCameraPermissions=this.state.hasCameraPermissions
    const scanned=this.state.scanned
    const buttonState=this.state.buttonState
    if (buttonState!=='normal' && hasCameraPermissions) {
        return(
            <BarCodeScanner style={StyleSheet.absoluteFillObject}
            onBarCodeScanned={scanned?undefined:this.handleBarCodeScanned}
            />
        )
    }
    else if (buttonState==='normal'){
        return(
            <View style={{justifyContent:'center', alignItems:'center', flex: 1, }}>
                <View>
                <Image
                     style={{width:200,height:200}}
                    source={require('../assets/booklogo.jpg')}
                />
                <Text style={{fontSize:30, textAlign:'center'}}>Willy</Text>
                </View>

                <View style={styles.inputView}>

                    <TextInput 
                    style={styles.inputBox} 
                    placeholder='Book ID'
                    value={this.state.scannedBookId}/>

                    <TouchableOpacity 
                    style={styles.scanButton}
                    onPress={()=>{
                        this.getCameraPermissions('BookId')
                    }}
                    >
                        <Text style={styles.buttonText}>Scan</Text>
                    </TouchableOpacity>
                    
                </View>



                <View style={styles.inputView}>

                    <TextInput 
                    style={styles.inputBox} 
                    placeholder='Student ID'
                    value={this.state.scannedStudentId}/>

                    <TouchableOpacity 
                    style={styles.scanButton}
                    onPress={()=>{
                        this.getCameraPermissions('StudentId')
                    }}
                    >
                        <Text style={styles.buttonText}>Scan</Text>
                    </TouchableOpacity>
                    
                </View>

            </View>
            
            )}
        }
        }
const styles = StyleSheet.create({ 
    container: { flex: 1, justifyContent: 'center', alignItems: 'center' }, 
    displayText:{ fontSize: 15, textDecorationLine: 'underline' }, 
    scanButton:{ backgroundColor: '#2196F3', padding: 10, margin: 10 }, 
    buttonText:{ fontSize: 15, textAlign: 'center', marginTop: 10, textAlignVertical: 'center', }, 
    inputView:{ flexDirection: 'row', margin: 20 }, 
    inputBox:{ width: 200, height: 40, borderWidth: 1.5, borderRightWidth: 0, fontSize: 20 }, 
    scanButton:{ backgroundColor: '#66BB6A', width: 50, borderWidth: 1.5, borderLeftWidth: 0 } });


