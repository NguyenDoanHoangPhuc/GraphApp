import React, { useEffect, useState } from 'react';
import { View, Text, Pressable, StyleSheet, Modal, TextInput, SafeAreaView, Alert, ImageBackground, Image, ScrollView } from 'react-native';
import color from '../constants/color';
import image from '../constants/image';
import { PrivateValueStore } from '@react-navigation/native';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';

import Animated, { ReduceMotion, cancelAnimation, useAnimatedStyle, useSharedValue,Easing, withDelay, withSpring, withTiming } from "react-native-reanimated"



const InputGraphSearch = ({ route, navigation }) => {
  const { graph, typeOfGraph } = route.params;
  
  //Mieu ta thuat toan
  const algorithmList = [
    'Duyệt theo chiều rộng',
    'Duyệt theo chiều sâu',
    'Duyệt theo chiều sâu đệ quy'
  ];
  
  //Tieu de thuat toan
  const algorithmTitle = {
    'Duyệt theo chiều rộng': 'BFS',
    'Duyệt theo chiều sâu': 'DFS',
    'Duyệt theo chiều sâu đệ quy': 'DFS\nRecursion'
  }
  
  //Ten thuat toan theo thu vien
  const algorithName = {
    'Duyệt theo chiều rộng': 'BFS',
    'Duyệt theo chiều sâu': 'DFS',
    'Duyệt theo chiều sâu đệ quy': 'DFS-Recursion'
  }
  

  const needVertexAlgorithm = [
    'DFS', 'BFS', 'DFS-Recursion'
  ]

  const needVertex = (algorithm) => {
    if (needVertexAlgorithm.find((element) => element === algorithm)) {
      return true;
    }
    else return false;
  }

  const squareButtonColor = [
    '#715660',
    '#846470',
    '#566071',
    '#727f96',
    '#c39f72',
    '#d5bf95',
    '#667762',
    '#879e82'
  ]



  const [algorithm, setAlgorithm] = useState(''); //Thuat toan ma nguoi dung chon
  const [modalVisible, setModalVisible] = useState(false); //Modal co hien thi khong


  //Dinh bat dau do thi
  const [beginVertex, setBeginVertex] = useState(0);



  //Kiem tra xem dinh bat dau nhap vao co dung khong
  const checkBeginVertexValue = (value) => {
    const temp = Number(value);
    if (temp > 0 && temp <= graph.vertices.length) {
      return true;
    }
    else {
      Alert.alert('Lỗi', 'Đỉnh xuất phát không hợp lệ');
      return false;
    }
  }

  // ANIMATION
  const offset = Array(algorithmList.length).fill(useSharedValue(-100));
  const opacity = useSharedValue(0);

  const animatedStyle = Array(algorithmList.length);
  for (let i = 0; i < algorithmList.length; i++) {
    animatedStyle[i] = useAnimatedStyle(() => ({
      transform : [{ translateX: offset[i].value }],
      opacity: opacity.value
    }))
  }

  useEffect(() => {
    offset.forEach((element, index) => {
      element.value = withTiming(0, {
        duration: 500,
        easing: Easing.inOut(Easing.quad),
        reduceMotion: ReduceMotion.System
    })
    })

    opacity.value = withTiming(1, {
      duration: 600,
      easing: Easing.inOut(Easing.quad),
      reduceMotion: ReduceMotion.System
  });
  }, [])

  const AnimatedPressable = Animated.createAnimatedComponent(Pressable);

  return (
    <View style={styles.container}>
      <View
        style={styles.headerLayout}
      >
        <Pressable style={{
          position: 'absolute',
          top: 20,
          left: 20,
          width: 40,
          height: 40,
          borderRadius: 40,
          justifyContent: 'center',
          alignItems: 'center',
          zIndex: 2
        }} onPress={() => navigation.goBack()}>
          <FontAwesomeIcon icon="fa-solid fa-arrow-left" size={24} color="white" />
        </Pressable>
        <ImageBackground
          style={styles.headerBackground}
          source={image.inputBackground}
        >
          <View style={styles.overlay}>
            <Image
              style={styles.logo}
              source={image.whiteLogo} />
            <Text style={styles.headerText}>Hãy chọn</Text>
            <Text style={styles.headerHighlightText}>thuật toán</Text>
          </View>
        </ImageBackground>
      </View>
      <ScrollView>

      <View style={styles.buttonLayout}>

        {algorithmList.map((algorithm, index) => {
          return (
            <AnimatedPressable
              key={index}
              style={[
                styles.squareButton,
                animatedStyle[index],
                {backgroundColor: squareButtonColor[index % 8]}
              ]}
              onPress={() => {
              setAlgorithm(algorithName[algorithm]);
                if (!needVertex(algorithName[algorithm])) {
                  navigation.navigate('GraphSearch', {
                    algorithm: algorithm,
                    graph: graph,
                    typeOfGraph: typeOfGraph,
                    beginVertex: 1
                  })
                }
                else setModalVisible(true);
    
              }}
            >
              <Text style={styles.squareButtonTitle}>{algorithmTitle[algorithm]}</Text>
              <Text style={styles.squareButtonDescription}>{algorithm}</Text>
            </AnimatedPressable>
          );
        })}
      
      </View>
      </ScrollView>




      <Modal
        animationType="fade"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => {
          setModalVisible(!modalVisible);
        }}
      >
        <View
          style={styles.overlayModal}
        >
          <SafeAreaView
            style={styles.modalContent}
          >
            <Pressable
              style={styles.modalCloseButton}
              onPress={() => setModalVisible(false)}
            >
              <FontAwesomeIcon icon="fa-xmark" size={26} color={color.modalPrimary} />
            </Pressable>

            <Text style={styles.modalHeader}>Nhập đỉnh xuất phát</Text>
            <Text style={styles.modalDescription}>Nhập đỉnh xuất phát để bắt đầu thuật toán</Text>
            <Text style={styles.modalInputTitle}>Đỉnh xuất phát (1 - {graph.vertices.length})</Text>
            <TextInput
              style={styles.modalInput}
              onChangeText={(text) => { setBeginVertex(Number(text)) }}
              inputMode="numeric"
              placeholderTextColor={'#858585'}
              placeholder='Nhập đỉnh xuất phát'
              color="white"
            />

            <View style ={styles.modalButtonContainer}>

            <Pressable
              style={styles.modalCancelButton}
              onPress={() => {
                setModalVisible(false);
              }}
            >
              <Text style={styles.modalInputTitle}>Thoát</Text>
            </Pressable>
            <Pressable
              onPress={() => {
                setModalVisible(false);
                if (checkBeginVertexValue(beginVertex))
                  navigation.navigate('GraphSearch', {
                    algorithm: algorithm,
                    graph: graph,
                    typeOfGraph: typeOfGraph,
                    beginVertex: beginVertex
                  })
              }}
              style={styles.modalSaveButton}
            >
              <Text style={styles.modalInputTitle}>Chọn</Text>
            </Pressable>
            </View>
          </SafeAreaView>
        </View>
      </Modal>


    </View>
  );
};

const styles = StyleSheet.create({
  // Layout
  container: {
    flex: 1,
    backgroundColor: color.primaryBackground
  },
  headerLayout: {
    height: '20%',
    width: '100%',

    borderBottomRightRadius: 100,
    overflow: 'hidden',
  },

  buttonLayout: {
    height: '80%',
    width: '100%',

    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    flexWrap: 'wrap'
  },
  //Button

  // Modal styles
  overlayModal: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 39, 0.4)',

    justifyContent: 'center',
    alignItems: 'center',
},

modalContent: {
    width: '90%',
    
    backgroundColor: color.primaryBackground,
    
    borderColor: color.modalPrimary,
    borderWidth: 1,
    padding: 20
},

modalHeader: {
    fontSize: 20,
    color: 'white',
    fontFamily: 'Montserrat-Bold',
    
},

modalDescription: {
    fontSize: 14,
    color: 'white',
    fontFamily: 'Montserrat-Regular',
    marginVertical: 18
},

modalInput: {
    width: '100%',
    height: 60,
    backgroundColor: '#1E1F26',
    borderRadius: 100,
    marginVertical: 10,
    paddingLeft: 20,
},

modalInputTitle: {
    fontSize: 14,
    fontFamily: 'Roboto-Regular',
    color: 'white',
},

modalCloseButton: {
    width: 40,
    height: 40,

    position: 'absolute',
    top: 10,
    right: 0
},

modalCancelButton: {
    height: 50,
    width: '50%',

    borderRadius: 30,
    backgroundColor: color.primaryBackground,
    justifyContent: 'center',
    alignItems: 'center',
},

modalSaveButton: {
    height: 50,
    width: '50%',

    borderRadius: 30,
    backgroundColor: color.modalPrimary,
    justifyContent: 'center',
    alignItems: 'center',
},

modalButtonContainer: {
    display: 'flex',
    flexDirection: 'row',
    marginTop: 10
},

  //Header
  headerBackground: {
    flex: 1
  },
  overlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 39, 0.4)',
    padding: 20,
    justifyContent: 'flex-end'
  },
  logo: {
    width: 40,
    height: 40,

    position: 'absolute',
    top: 20,
    right: 20
  },
  headerText: {
    fontSize: 24,
    fontFamily: 'Montserrat-Regular',

    color: 'white'
  },
  headerHighlightText: {
    fontSize: 26,
    fontFamily: 'Montserrat-Black',
    textTransform: 'uppercase',
    color: 'white'
  },

  //Button

  squareButton: {
    width: '40%',
    aspectRatio: 1,
    padding: 10,
    margin: 10,

    borderRadius: 30,

    justifyContent: 'center',
    alignItems: 'center'
  },
  squareButtonTitle: {
    fontSize: 16,
    fontFamily: 'Montserrat-Black',

    color: 'white',
    textAlign: 'center',
    textTransform: 'uppercase',
    marginBottom: 5
  },
  squareButtonDescription: {
    fontSize: 12,
    fontFamily: 'Poppins-Regular',
    color: 'white',
    textAlign: 'center'
  },

});


export default InputGraphSearch;
