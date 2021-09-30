import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, FlatList } from 'react-native';
import { gql, useQuery } from '@apollo/client'

export default function ScreenGraphQL() {


     const CHAPTERS_QUERY = gql`
       query {
         chapters {
           id
           number
           title
         }
       }
     `
     const { data, loading } = useQuery(CHAPTERS_QUERY)

     console.log(loading)
 
     !loading ? console.log(data.chapters[0].id) : false
 
     return (
          <View style={{padding: 15, backgroundColor: '#ff5', flex: 1}}>
               <Text 
                    style={{fontSize: 25, fontWeight: 'bold', alignSelf: 'center', borderBottomWidth: 1, borderColor: '#909', width: '95%', textAlign: 'center'}}
                    >Testando chamada GraphQL{'\n'}
               </Text>
             {!loading ? 
             <FlatList
                 data={data.chapters}
                 keyExtractor={(chapter) => chapter.id.toString()}
                 style={{
                      backgroundColor: '#da9',
                      borderLeftWidth: 10,
                      borderColor: '#444',
                      marginTop: 20
                 }}
                 renderItem={({ item }) => (
                     <Text style={{ fontSize: 18, borderBottomWidth: 2, borderColor: '#999', margin: 10}}>{item.title}</Text>
                 )}
             />
             : <Text style={{ fontSize: 20, alignSelf: 'center', margin: 20}}>Loading...</Text>
             }
          </View>
     )
}