import Realm  from "realm";
import React , { useEffect, useState } from "react";
import {
    View,
    Text,
    FlatList
} from 'react-native'
import { gql, useQuery } from '@apollo/client'

const CHAPTERS_QUERY = gql`
  query {
    chapters {
      id
      number
      title
    }
  }
`

const Schema = {
    name: "Test",
    properties: {
      id: "int",
      number: "string",
      title: "string?",
    }
}

export default function ScreenRealm() {
    const { data, loading } = useQuery(CHAPTERS_QUERY)

    const [Datas, setDatas] = useState([])

    useEffect(() => {
            RealmFunction()
    },[Datas])

    async function RealmFunction(){
        console.log('oi')

        // abrindo comunicação...
        const realm = await Realm.open({
            path: "myrealm",
            schema: [Schema],
        });

        //Delete
        /*realm.write(() => {
            realm.delete(realm.objects("Test"));
        });*/

        //escrevendo ...
        const tasksForRead = await realm.objects("Test");
        if(tasksForRead.length == 0){
            let obj
            data.chapters.forEach(data => {
                realm.write(() => {
                obj = realm.create("Test", {
                    id: data.id,
                    number: data.number + '',
                    title: data.title,
                });
                console.log(`created: ${obj.title}`);
                });
            })
        }

        //lendo ...
        const tasks = await realm.objects("Test");
        console.log(tasks.length)
        console.log(tasks[0])
        tasks.forEach(el => {
            Datas.push(el)
        })
        setDatas(Datas)


        // lendo com graphQL ...
        /*const query = {
            tasks(query:  { title: "Preface" }) {
              title
              id
            }
          }*/

        console.log('GRAPH ' + response)

        /*tasks.filtered({
            query: query
        })*/

        // update
        Datas.forEach(e => {
            data.chapters.forEach(q => {
                if(e.title == q.title){
                    console.log(e) // avalisa-se se é melhor apargar todo o objeto e salva-lo novamente 
                }
            })
        })

        // leitura Realm usando GraphQL
        

        //fechando comunicação ...
        //realm.close();
    }

    return(
        <View style={{backgroundColor: '#5f5', flex: 1}}>
            <Text>
                Tetsando Screen Realm
            </Text>
            {!loading ? 
            <FlatList
                data={Datas}
                keyExtractor={(chapter) => chapter.id.toString()}
                renderItem={({ item }) => (
                    <Text>{item.title}</Text>
                )}
            />
            : <Text>Loading</Text>
            }
        </View>
    )
}