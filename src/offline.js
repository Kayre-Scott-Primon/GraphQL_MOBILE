/*
https://www.youtube.com/watch?v=EX48Yk_e2OE
youtube.com/watch?v=N5s6ESYjSDk
*/

import React, {useState, useEffect, useRef} from 'react'
import {View, Text} from 'react-native'
import NetInfo from "@react-native-community/netinfo";
import Realm  from "realm";

export default function ScreenOffline(){

     const [isConnectionNetInfo, setIsConnectionNetInfo] = useState(null)
     const [isConnectionNetInfoType, setIsConnectionNetInfoType] = useState(null)
     const [lastSyncDate, setLastSyncDate] = useState(null)
     const [ToDos, setToDos] = useState([])


     // inicio offlinefirst
     const SchemaToDo = {
          name: "ToDoList",
          properties: {
            id: "int",
            name: "string",
            create_at: 'date',
            update_at: 'date?',
            deleted_at: 'date?'
          }
     }

     const SchemaSettings = {
          name: "Settings",
          properties: {
            id: "int",
            last_update: 'date'
          }
     }

     const realmInstance = useRef(null)

     function getRealmInstance() {
          return Realm.open({
               schema: [SchemaToDo, SchemaSettings],
               schemaVersion: 1
          })
     }

     async function getToDoList(){
          //verificando se existe uma instancia do realm, se nao criando-a
          if(realmInstance.current == null){
               realmInstance.current = await getRealmInstance()
          }
     
          //trazendo os dados do realm
          const toDoFromRealm = realmInstance.current.objects('ToDoList').sorted('create_at')

          // adicionando um ouvindo nos dados do realm
          toDoFromRealm.addEventListener(() => {
               setToDos([...toDoFromRealm])
          })

          // reset dados de atualizações
          initializeAppConfig(realmInstance.current)

          //query
          const appSetting = realmInstance.current.objects('Settings')[0]

          // adicionando um ouvinte aos dados de configurações 
          appSetting.addEventListener((newAppSettings) => {
               setLastSyncDate(newAppSettings[0].last_update)
          })
     }

     // funcção de limpeza dos dados, voltando para null
     function cleanUp () {
          if(realmInstance.current){
               realmInstance.current.close()
               realmInstance.current = null
               setToDos([])
          }
     }

     // inicializa a configuração
     function initializeAppConfig (realmInstance) {
          realmInstance.write(() => {
               realmInstance.create(
                    'Settings',
                    {
                         id: 0,
                         last_update: null
                    },
                    true
               )
          })
     }

     // buscando alterações API
     async function pullChanges (realmInstance) {
          const { last_update } = await  realmInstance.current.objects('Settings')[0]

          // tomar a decisão se ja foi realizada alguma atualização ou nao
          const syncEndPoint = last_update ? `/sync?lastSyncedAt=${last_update.getTime()}` : '/sync'

          // requisição na API 
          //const response = apiService.get(syncEndPoint)
          const { toDos } = {created: [], deleted: []}//response.data

          //Escritas dos arquivos no banco Realm/local
          realmInstance.write(() => {
               toDos.created.forEach((toDo) => {
                    //realmInstance.create('nome da tabela', {dados}, se ja existir, nao da erro, so atualiza)
                    realmInstance.create('ToDosList', {
                         id: toDo.id,
                         name: toDo.name,
                         create_at: new Date(toDo.create_at),
                         update_at: new Date(toDo.update_at),
                         deleted_at: null
                    }, true)
               })

               toDos.deleted.forEach((toDo) => {
                    realmInstance.create('ToDosList', {
                         id: toDo.id,
                         deleted_at: new Date(toDo.deleted_at)
                    }, true)
               })
          })

     }

     // para enviar alterações para a API

     /*
          Aqui entraria a parte do graphQL, na chaamda dos dados da API,
          mas iddo dependerá de como a API estará estruturada e assim como retornará os dados quando realizada uma requisição
          e assim as funções/ações no react native se moldam de acordo com esses tratamentos com a API

     */

     async function pushChanges(realmInstance) {
          const { last_update } = await  realmInstance.current.objects('Settings')[0]

          if(last_update){

               const createdToDos = await realmInstance.current.
                    objects('ToDoList').
                    filtered('create_at >= $0 AND update_at == null AND deleted_at == null', last_update)

               const updateToDos = await realmInstance.current.
                    objects('ToDoList').
                    filtered('update_at == $0 AND deleted_at == null', last_update)

               const deletedToDos = await realmInstance.current.
                    objects('ToDoList').
                    filtered('deleted_at == $0', last_update)

               const toDoData = {
                    toDos: {
                         createdToDos: createdToDos,
                         updateToDos: updateToDos,
                         deletedToDos: deletedToDos
                    }
               }

               // chamando API para enviar esses dados
               //await apiServices.post('sync', toDoData)

          }

          realmInstance.write(() => {
               realmInstance.create(
                    'Settings',
                    {
                         id: '0',
                         last_update: new Date()
                    },
                    true
               )
          })
     }

     // fim offlinefirst
 
     useEffect(() => {
          NetInfo.addEventListener(networkState => {
               console.log("Connection type - ", networkState.type);
               console.log("Is connected? - ", );
               setIsConnectionNetInfo(networkState.isConnected)
               setIsConnectionNetInfoType(networkState.type)
          });
     })

     return(
          <View style={{backgroundColor: "#aed", flex: 1}}>
               <Text  style={{alignSelf: 'center', fontSize: 20, fontWeight: '900', margin: 15}}>Testando Offline</Text>
               <View style={{height: 1, width: '90%', alignSelf: 'center', backgroundColor: '#00a', marginBottom: 10}}/>
               <Text style={{ fontSize: 15, fontWeight: '500', margin: 25}}>
                    Aqui consta-se maiores informações no proprio codigo{'\n\n'}
                    Não foi possivel apresentar nada no front sobre o OffLine First devido a falta de uma API preparada para tal funcionalidade
               </Text>
               <Text 
                    style={{fontWeight: '900', marginBottom: 10, fontSize: 18, alignSelf: 'center', padding: 20}}
               >    Online NetInfo {isConnectionNetInfo ? 'online' : 'offline'}
               </Text>
               <Text 
                    style={{fontWeight: '900', marginBottom: 10, fontSize: 18, alignSelf: 'center', padding: 20}}
               >    Online type {isConnectionNetInfoType}
               </Text>
          </View>
     )

}