import React, { useState, useEffect } from 'react';
import { View, Text, Button, Image, StyleSheet, ScrollView, FlatList, TextInput } from 'react-native';

const CardPokemon = () => {
    const [pokemonList, setPokemonList] = useState([]);
    const [loading, setLoading] = useState(false);
    const [search, setSearch] = useState('')

    // Função para buscar informações detalhadas de um Pokémon
    const fetchPokemonInfo = async () => {
        try {
            setLoading(true);
            const response = await fetch('https://pokeapi.co/api/v2/pokemon?limit=1281'); // Buscar informações de 10 Pokémon
            const data = await response.json();
            setSearch('');
            setPokemonList(data.results);
        } catch (error) {
            console.error('Erro ao buscar informações dos Pokémon:', error);
        } finally {
            setLoading(false);
        }
    };


    const renderItem = ({ item, index }) => (
        <View style={styles.card} key={index}>
            <Text style={{ fontSize: 20, fontWeight: '600', color: '#000' }}>{item.name}</Text>
            <Image
                source={{ uri: `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${index + 1}.png` }}
                style={styles.pokemonImage}
            />
        </View>
    );



    const filtrarPokemons = pokemonList.filter((pokemon) =>
        pokemon.name.toLowerCase().includes(search.toLowerCase())
    );

    useEffect(() => {
        // Chamando a função para buscar informações quando o componente montar
        fetchPokemonInfo();
    }, []);

    return (
        <View style={styles.container}>
            <TextInput
                style={styles.input}
                placeholder='Digite o nome do pokemon...'
                onChangeText={(text) => setSearch(text)}
                value={search}
            />

            {loading ? (
                <Text>Carregando...</Text>
            ) : (
                <FlatList
                    data={filtrarPokemons}
                    renderItem={renderItem}
                    keyExtractor={(item, index) => index.toString()}
                    numColumns={2} // Define o número de colunas na grade
                />
            )}

            <Button style={styles.button} title="Recarregar" onPress={fetchPokemonInfo} />

        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: 'red',
        alignItems: 'center',
        justifyContent: 'center',
    },
    input: {
        width: '85%',
        backgroundColor: '#fff',
        padding: 10,
        borderBottomWidth: 1,
        borderBottomColor: '#3d5fb4',
        marginBottom: 10,
        marginTop: 10
    },
    card: {
        width: '45%', // Define a largura do card para que haja espaço para 2 cards por linha
        margin: 5, // Espaçamento entre os cards
        padding: 10,
        justifyContent: 'center',
        alignItems: 'center',
        textAlign: 'center',
        borderRadius: 10,
        backgroundColor: 'white',
        borderColor: '#3D5FB4',
        borderWidth: 3
    },
    pokemonImage: {
        width: 100,
        height: 100,
        marginTop: 10,
    },
    button: {
        backgroundColor: '#FAC705'
    },
});

export default CardPokemon;
