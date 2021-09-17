import React from "react";
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

export default Screen = () => {

    const { data, loading } = useQuery(CHAPTERS_QUERY)

    console.log(loading)

    !loading ? console.log(data.chapters[0].id) : false

    return (
        <View>
            <Text>Teste{'\n'}</Text>
            {!loading ? 
            <FlatList
                data={data.chapters}
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