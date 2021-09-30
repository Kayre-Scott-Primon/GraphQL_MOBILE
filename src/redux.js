//https://www.youtube.com/watch?v=-kogWG190PI

import React, { useReducer, useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, FlatList } from 'react-native';
import { sha256 } from 'react-native-sha256'

export default function ScreenRedux() {

     const [initialState, setInitialState] = useState([])
     const [input, setInput] = useState('')

     function reducer(state, action) {
          switch(action.type){
               case 'ADD':
                    return [...state, action.item]
               case 'CHECK':
                    return state.map(item => {
                         if(item.id == action.id){
                              return {...item, check: !item.check}
                         }else{
                              return item
                         }
                    })
               case 'REMOVE': 
                    return state.filter(item => {
                         return item.id !== action.id
                    })
               default:
                    return state
          }
     }

     const [state, dispatch] = useReducer(reducer, initialState)

     return(
          <View>
               <Text style={{alignSelf: 'center', fontSize: 20, fontWeight: '900', margin: 15}}>
                    Testando redux react native
               </Text>
               <View style={{height: 1, width: '90%', alignSelf: 'center', backgroundColor: '#715'}}/>
               <Text style={{fontSize: 19, fontWeight: '700', margin: 15}}> Lista de compras: </Text>
               <TextInput 
                    placeholder='Adicionar item' 
                    style={{
                         marginHorizontal: 15, 
                         backgroundColor: '#ddd', 
                         borderWidth: 2, 
                         borderRadius: 10, 
                         borderColor: '#0d8',
                         padding: 10,
                         fontSize: 20
                    }}
                    onChangeText={setInput}
                    value={input}
               />
               <TouchableOpacity 
                    style={{ 
                         padding: 18,
                         backgroundColor: '#3d7',
                         alignSelf: 'center',
                         alignContent: 'center',
                         margin: 20,
                         borderWidth: 2,
                         borderRadius: 8,
                         borderColor: '#161'
                    }}
                    onPress={async () => {

                         const hashID = await sha256(input)

                         // dispachar o estado: item, contendo o objeto do estado e passando qual ação que ele deve fazer com esse estado: 'ADD'
                         dispatch({type: 'ADD', item: {
                              id: hashID,
                              title: input,
                              checked: false
                         }})

                         setInput("")
                    }}
               >
                    <Text style={{ fontSize: 20, color: '#fff', fontWeight: 'bold'}}>Adicionar</Text>
               </TouchableOpacity>
               <FlatList
                    data={state}
                    keyExtractor={(item) => item.id}
                    style={{
                         margin: 15,
                         backgroundColor: '#fe0',
                         padding: 10,
                         borderLeftWidth: 10,
                         borderLeftColor: '#555'
                    }}
                    renderItem={({item}) => (
                         <View style={{flexDirection: 'row', borderBottomWidth: 1, borderColor: '#000'}}>
                              <TouchableOpacity 
                                   style={{padding: 10, flex: 1}}
                                   onPress={() => dispatch({
                                        type: 'CHECK',
                                        id: item.id     
                                   })}
                                   >
                                   <Text 
                                        style={[{ fontSize: 20, color: '#123'}, item.check ? {textDecorationLine: 'line-through', color: '#666'} : {}]}
                                   >
                                        - {item.title}
                                   </Text>
                              </TouchableOpacity>
                              <TouchableOpacity 
                                   style={{
                                        alignItems: 'center', 
                                        borderWidth: 2,
                                        borderColor: '#f00', 
                                        borderRadius: 8, 
                                        paddingHorizontal: 10, 
                                        marginVertical: 5,
                                        marginHorizontal: 10
                                   }}
                                   onPress={() => dispatch({
                                        type: 'REMOVE',
                                        id: item.id     
                                   })}
                                   >
                                   <Text style={{fontSize: 25, fontWeight: 'bold', color: '#f00'}}>X</Text>
                              </TouchableOpacity>
                         </View>
                    )}
               />
          </View>
     )

}