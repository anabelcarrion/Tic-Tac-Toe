import React from 'react';
import { StyleSheet, Text, View, TouchableOpacity, Alert,Button} from 'react-native';
import {MaterialCommunityIcons as Icon} from 'react-native-vector-icons'



export default class App extends React.Component {
  
  constructor (props){
    super(props);

    this.state={
      titleText: "Tic Tac Toe",
      bodyText: "♗♖?",
      gameState:[
        [0,0,0],
        [0,0,0],
        [0,0,0]
      ],
      currentPlayer: 1,
    }
  }

  componentDidMount(){
    this.initializeGame();
  }

  initializeGame=()=> {
    this.setState({gameState:
      [
        [0,0,0],
        [0,0,0],
        [0,0,0]
      ],
      currentPlayer: 1,
    });
  }

  getWinner =() =>{
    const NumTiles = 3;
    var arr = this.state.gameState;
    var sum;

    //filas
    for (var i= 0; i < NumTiles; i++){
      sum = arr[i][0] + arr[i][1] + arr[i][2];
      if (sum == 3) {return 1;}
      else if ( sum == -3){return -1;}
    }

    //colummnas
    for (var i= 0; i < NumTiles; i++){
      sum = arr[0][i] + arr[1][i] + arr[2][i];
      if (sum == 3) {return 1;}
      else if ( sum == -3){return -1;}
    }

    //diagonales
      sum = arr[0][0] + arr[1][1] + arr[2][2];
      if (sum == 3) {return 1;}
      else if ( sum == -3){return -1;}
    
     sum = arr[2][2] + arr[1][1] + arr[0][0];
      if (sum == 3) {return 1;}
      else if ( sum == -3){return -1;}
      
      sum = arr[0][2] + arr[1][1] + arr[2][0];
      if (sum == 3) {return 1;}
      else if ( sum == -3){return -1;}

      sum = arr[2][0] + arr[1][1] + arr[0][2];
      if (sum == 3) {return 1;}
      else if ( sum == -3){return -1;}
    
    // sin ganadores
     return 0;
  }
  
  onTilePress=(row, col)=>{
   //no permite que los azulejos cambien
   var value = this.state.gameState[row][col];
   if (value !=0){return; }

   //toma jugador actual
   var currentPlayer= this.state.currentPlayer;

   //establecer el mosaico correcto
   var arr =this.state.gameState.slice();
   arr[row][col]=currentPlayer;
   this.setState({gameState:arr});

   //cambiar a otro jugador
   var nextPlayer=(currentPlayer==1)?-1:1;
   this.setState({currentPlayer:nextPlayer});

   //chequeando ganador
    var winner = this.getWinner();
    if (winner == 1){
      Alert.alert(
        '♗',
        'El ganador es el Alfil',
        [
          {text: 'OK', onPress: () => console.log('OK Pressed')},
        ],
        {cancelable: false},
      );
      this.initializeGame();
    }else if (winner == -1){
      Alert.alert(
       '♖',
       'El ganador es la Torre',
       [
         {text: 'OK', onPress: () => console.log('OK Pressed')},
       ],
       {cancelable: false},
     );
      this.initializeGame();
    }

  }

 onNewGamePress =(row, col)=>{
   this.initializeGame();
  }

  renderIcon =(row, col)=> {
    var value= this.state.gameState[row][col];
    switch(value){
      case 1:  return <Icon name ="chess-pawn" style={styles.tileX}/>;
      case -1: return <Icon name="chess-rook" style={styles.tileO}/>;
      default: return <View/>;
    }
  }

  render(){
  return (
    <View style={styles.container}>
      <Text style={styles.titleText}>
        {this.state.titleText}
      </Text>
      <Text style={styles.bodyText}>
        {this.state.bodyText}{'\n'}{'\n'}{'\n'}
      </Text>
      
      <View style={{flexDirection:"row", alignItems:"center", justifyContent:"center"}}>
        <TouchableOpacity onPress={()=>this.onTilePress(0,0)} style={[styles.tile, {borderLeftWidth:0, borderTopWidth:0}]}>
          {this.renderIcon(0,0)}
        </TouchableOpacity>
        <TouchableOpacity onPress={()=>this.onTilePress(0,1)} style={[styles.tile, {borderTopWidth:0}]}>
          {this.renderIcon(0,1)}
        </TouchableOpacity>
        <TouchableOpacity onPress={()=>this.onTilePress(0,2)} style={[styles.tile, {borderRightWidth:0, borderTopWidth:0}]}>
          {this.renderIcon(0,2)}
        </TouchableOpacity>  
      </View>

      <View style={{flexDirection:"row"}}>
        <TouchableOpacity onPress={()=>this.onTilePress(1,0)} style={[styles.tile, {borderLeftWidth:0}]}>
          {this.renderIcon(1,0)}
        </TouchableOpacity> 
        <TouchableOpacity onPress={()=>this.onTilePress(1,1)} style={[styles.tile, {}]}>
          {this.renderIcon(1,1)}
        </TouchableOpacity> 
        <TouchableOpacity onPress={()=>this.onTilePress(1,2)} style={[styles.tile, {borderRightWidth:0}]}>
          {this.renderIcon(1,2)}
        </TouchableOpacity> 
      </View>

      <View style={{flexDirection:"row"}}>
        <TouchableOpacity onPress={()=>this.onTilePress(2,0)} style={[styles.tile, {borderBottomWidth:0, borderLeftWidth:0}]}>
          {this.renderIcon(2,0)}
        </TouchableOpacity> 
        <TouchableOpacity onPress={()=>this.onTilePress(2,1)} style={[styles.tile, {borderBottomWidth:0}]}>
          {this.renderIcon(2,1)}
        </TouchableOpacity> 
        <TouchableOpacity onPress={()=>this.onTilePress(2,2)} style={[styles.tile, {borderBottomWidth:0, borderRightWidth:0}]}>
          {this.renderIcon(2,2)}
        </TouchableOpacity> 
      </View>

      <Button style={styles.button} title="Jugar" onPress ={this.onNewGamePress}/>

    </View>
  );
}
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  tile:{
    borderWidth:4,
    width:90,
    height:90,
    alignItems: 'center',
    justifyContent: 'center',
    color:"#000066",
  },
  tileX:{
    color: "#0099FF",
    fontSize:50,
  },
  tileO:{
    color:"#FF6666",
    fontSize:50,
  },
  button:{
    color:"red",
  },
  titleText:{
    color:"#000066",
    fontSize:40,
  },
  bodyText:{
    color:"#000066",
    fontSize:20,
  }
});