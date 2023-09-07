const { Text, View, StyleSheet, Image } = require("react-native");

const Header = () => {
    return (
        <View style={styles.container}>
            <Image style={styles.logo} source={require('../assets/logo.png')} />
            {/* <Text style={{ fontSize: 24, color: '#fff' }}>Pokemons Wesley</Text> */}
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        backgroundColor: 'red',
        alignItems: 'center',

    },
    logo: {
        maxWidth: 300,
        height: 100,
        resizeMode: "contain",
    },
});

export default Header;
