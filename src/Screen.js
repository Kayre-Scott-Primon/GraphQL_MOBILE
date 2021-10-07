import React from "react";
import {
    View,
    Text,
    Button
} from 'react-native'

export default Screen = ({navigation}) => {

    return (
        <View style={{padding: 25, backgroundColor: '#fa5', flex: 1, justifyContent: 'space-between'}}>
            <Text style={{fontSize: 22, fontWeight: '900', alignSelf: 'center'}}>App de Testes de tecnologias{'\n'}</Text>
            <Text style={{ fontSize: 15, fontWeight: '500'}}>
              Aqui segue-se um app em react-native com o intuito de se estudar e aplicar as seguintes tecnologias:{'\n \n'}
              - Requisição de API utilizando GraphQL{'\n'}
              - Realm como banco de dados locais {'\n'}
              - Conceito de OffLine First{'\n'}
              - Redux para acesso de estados nao persistentes{'\n'}
            </Text>
            
            <View>
              <View style={{ marginVertical: 10, marginHorizontal: 5, marginTop: 50}}>
                <Button
                  onPress={() => {navigation.navigate('GraphQL')}}  
                  title="GraphQL"  
                />
              </View>
              <View style={{ marginVertical: 10, marginHorizontal: 5}}>
                <Button
                  onPress={() => {navigation.navigate('Realm')}}  
                  title="Realm"  
                />
              </View>
              <View style={{ marginVertical: 10, marginHorizontal: 5}}>
                <Button
                  onPress={() => {navigation.navigate('Offline')}}  
                  title="Offline"  
                />
              </View>
              <View style={{ marginVertical: 10, marginHorizontal: 5}}>
                <Button
                  onPress={() => {navigation.navigate('Redux')}}  
                  title="Redux"  
                />
              </View>
              <View style={{ marginVertical: 10, marginHorizontal: 5}}>
                <Button
                  onPress={() => {navigation.navigate('GitHub')}}  
                  title="GitHub"  
                />
              </View>
            </View>
        </View>
    )
}