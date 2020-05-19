import React, { useState, useEffect } from 'react'
import { StyleSheet, View, Platform } from 'react-native'
import { TextInput, Headline, Button, Paragraph, Dialog, Portal } from 'react-native-paper'
import globalStyles from '../styles/global'
import axios from 'axios'

const NuevoCliente = ({ navigation, route }) => {

    const { setGetAPI } = route.params

    // Campos formulario
    const [name, setName] = useState('')
    const [phone, setPhone] = useState('')
    const [email, setEmail] = useState('')
    const [company, setCompany] = useState('')
    const [alert, setAlert] = useState(false)


    // Detectar si es edición
    useEffect(() => {
        if (route.params.client) {
            const { name, phone, email, company } = route.params.client

            setName(name)
            setPhone(phone)
            setEmail(email)
            setCompany(company)
        } else {
            console.log('nuevo cliente')
        }

    }, [])

    const saveClient = async () => {

        // Validar
        if (name === '' || phone === '' || email === '' || company === '') {
            setAlert(true)
            return
        }

        // Generar el cliente
        const client = { name, phone, email, company }

        // Si es edición o creacion de cliente
        if (route.params.client) {

            const { id } = route.params.client
            client.id = id

            const url = `http://localhost:3000/clientes/${id}`

            try {
                await axios.put(url, client)
            } catch (error) {
                console.log(error)
            }

        } else {
            // Guardar el cliente en la API
            try {
                if (Platform.OS === 'ios') {
                    // para ios:
                    await axios.post('http://localhost:3000/clientes', client)
                } else {
                    // Para android:
                    await axios.post('http://10.0.2.2:3000/clientes', client)
                }
            } catch (error) {
                console.log(error)
            }
        }

        // Redireccionar
        navigation.navigate('Inicio')

        // Limpiar el form
        setName('')
        setPhone('')
        setEmail('')
        setCompany('')

        // Cambiar a true para tener el nuevo cliente
        setGetAPI(true)
    }

    return (
        <View style={globalStyles.container}>
            <Headline style={globalStyles.title}>Añadir Nuevo Cliente</Headline>

            <TextInput
                label='Nombre'
                placeholder='Juan'
                onChangeText={text => setName(text)}
                value={name}
                style={styles.input}
            />
            <TextInput
                label='Telefono'
                placeholder='629381920'
                onChangeText={text => setPhone(text)}
                value={phone}
                style={styles.input}
            />
            <TextInput
                label='Email'
                placeholder='correo@correo.com'
                onChangeText={text => setEmail(text)}
                value={email}
                style={styles.input}
            />
            <TextInput
                label='Empresa'
                placeholder='Nombre de la empresa'
                onChangeText={text => setCompany(text)}
                value={company}
                style={styles.input}
            />

            <Button icon="pencil-circle" mode="contained" onPress={() => saveClient()}>
                Guardar Cliente
            </Button>

            <Portal>
                <Dialog
                    visible={alert}
                    onDismiss={() => setAlert(false)}
                >
                    <Dialog.Title>Error</Dialog.Title>
                    <Dialog.Content>
                        <Paragraph>Todos los campos son obligatorios</Paragraph>
                    </Dialog.Content>
                    <Dialog.Actions>
                        <Button onPress={() => setAlert(false)}>OK</Button>
                    </Dialog.Actions>
                </Dialog>
            </Portal>

        </View>
    )
}

const styles = StyleSheet.create({
    input: {
        marginBottom: 20,
        backgroundColor: 'transparent'
    }
})

export default NuevoCliente

