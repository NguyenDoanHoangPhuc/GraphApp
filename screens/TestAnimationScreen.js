import React from "react";
import { View, Text, Button, Pressable, StyleSheet} from "react-native"
import Animated, { cancelAnimation, useAnimatedStyle, useSharedValue, withDelay, withSpring, withTiming } from "react-native-reanimated"

const duration = 2000;

const AnimatedPressable = Animated.createAnimatedComponent(Pressable);

const TestAnimationScreen = () => {
    
    const offset1 = useSharedValue(0);
    const offset2 = useSharedValue(0);
    const offset3 = useSharedValue(0);

    const opacity = useSharedValue(0);

    const animated1 = useAnimatedStyle(() => ({
        transform: [{translateY: offset1.value}],
        opacity: opacity.value
    }))

    const animated2 = useAnimatedStyle(() => ({
        transform: [{translateY: offset2.value}],
        opacity: opacity.value
    }))
    
    const animated3 = useAnimatedStyle(() => ({
        transform: [{translateY: offset3.value}],
        opacity: opacity.value
    }))

    const handlePress = () => {
        
        setShowButton(!showButton);

        offset1.value = withSpring(showButton ? 0 : 20)
        offset2.value = withDelay(100, withSpring(showButton ? 0 : 20))
        offset3.value = withDelay(200, withSpring(showButton ? 0 : 20))

        opacity.value = withTiming(showButton ? 0 : 1, {duration: 400})
    }

    const [showButton, setShowButton] = React.useState(false);

    return (
        <View style={{flex: 1}}>
            <Pressable 
                style ={({pressed})=>[styles.button, {backgroundColor: 'blue'}, pressed && {opacity: 0.8}]}
                onPress={handlePress}
            >
                
                <Text style = {styles.buttonText}>Press me!</Text>
            </Pressable>


            {showButton && (
                <View>
                    <AnimatedPressable
                    style={[styles.button, animated1]}
                >
                    <Text style={styles.buttonText}>Hello</Text>
                </AnimatedPressable>
                <AnimatedPressable
                    style={[styles.button, animated2]}
                >
                    <Text style={styles.buttonText}>Hello</Text>
                </AnimatedPressable>
                <AnimatedPressable
                    style={[styles.button, animated3]}
                >
                    <Text style={styles.buttonText}>Hello</Text>
                </AnimatedPressable>
                </View>

                
                

            )}

        </View>
    )
}


const styles = StyleSheet.create({
    container: {
        flex: 1,
        
    },
    button: {
        width: '80%',
        height: 40,
        justifyContent: 'center',
        backgroundColor: 'blue',
        alignItems: 'center',
        marginTop: 10
    },
    buttonText: {
        color: 'white',
        fontSize: 20
    },

})
export default TestAnimationScreen