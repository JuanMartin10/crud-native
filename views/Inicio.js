import React, { useState, useEffect } from 'react'
import { View, FlatList } from 'react-native'
import axios from 'axios'
import { List, Headline, Button, FAB } from 'react-native-paper'
import globalStyles from '../styles/global'

const Inicio = ({ navigation }) => {

    const [clients, setClients] = useState([])
    const [getAPI, setGetAPI] = useState(true)

    useEffect(() => {
        const getClientsApi = async () => {
            try {
                const result = await axios.get('http://localhost:3000/clientes')
                setClients(result.data)
                setGetAPI(false)
            } catch (error) {
                console.log(error)
            }
        }

        if (getAPI) {
            getClientsApi()
        }

    }, [getAPI])

    return (
        <View style={globalStyles.container}>

            <Button icon='plus-circle' onPress={() => navigation.navigate('NuevoCliente', { setGetAPI })}>
                Nuevo Cliente
            </Button>

            <Headline style={globalStyles.title}> {clients.length > 0 ? "Clientes" : "Aún no hay clientes"}</Headline>

            <FlatList
                data={clients}
                keyExtractor={client => (client.id).toString()}
                renderItem={({ item }) => (
                    <List.Item
                        title={item.name}
                        description={item.company}
                        onPress={() => navigation.navigate('DetallesCliente', { item, setGetAPI })}
                    />
                )}
            />
            <FAB
                icon="plus"
                style={globalStyles.fab}
                onPress={() => navigation.navigate('NuevoCliente', { setGetAPI })}
            />
        </View>
    )
}

export default Inicio

