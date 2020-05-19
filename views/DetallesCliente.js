import React from 'react'
import { StyleSheet, View, Alert } from 'react-native'
import { Headline, Text, Subheading, Button, FAB } from 'react-native-paper'
import globalStyles from '../styles/global'
import axios from 'axios'


const DetallesCliente = ({ navigation, route }) => {
    const { setGetAPI } = route.params
    const { name, phone, email, company, id } = route.params.item

    const showConfirmation = () => {
        Alert.alert(
            '¿Deseas eliminar este cliente?',
            'Un contacto eliminado no se puede recuperar',
            [
                { text: 'Si Eliminar', onPress: () => deleteContact() },
                { text: 'Cancelar', style: 'cancel' },
            ]
        )
    }

    const deleteContact = async () => {
        const url = `http://localhost:3000/clientes/${id}`

        try {
            await axios.delete(url)
        } catch (error) {
            console.log(error)
        }

        // Redireccionar 
        navigation.navigate('Inicio')

        // Volver a consultar la API
        setGetAPI(true)
    }

    return (
        <View style={globalStyles.container}>
            <Headline style={globalStyles.title}>{name}</Headline>
            <Text style={styles.text}>Empresa: <Subheading>{company}</Subheading></Text>
            <Text style={styles.text}>Email: <Subheading>{email}</Subheading></Text>
            <Text style={styles.text}>Telefono: <Subheading>{phone}</Subheading></Text>

            <Button
                mode="contained"
                icon="cancel"
                style={styles.button}
                onPress={() => showConfirmation()}
            >
                Eliminar Cliente
            </Button>

            <FAB
                icon="pencil"
                style={globalStyles.fab}
                onPress={() => navigation.navigate('NuevoCliente', { client: route.params.item, setGetAPI })}
            />
        </View>
    )
}

export default DetallesCliente

const styles = StyleSheet.create({
    text: {
        marginBottom: 20,
        fontSize: 18,
    },
    button: {
        marginTop: 100,
        backgroundColor: 'red'
    }
})

