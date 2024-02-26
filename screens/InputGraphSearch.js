import React, {useState} from 'react';
import { View, Text, Pressable, StyleSheet, Modal, TextInput, SafeAreaView, Alert} from 'react-native';



const InputGraphSearch = ({route, navigation}) => {
  const {graph, typeOfGraph} = route.params;
  const algorithmList = [
    'Duyệt theo chiều rộng', 
    'Duyệt theo chiều sâu', 
    'Duyệt theo chiều sâu đệ quy'
  ];

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

  const [algorithm, setAlgorithm] = useState('');
  const [modalVisible, setModalVisible] = useState(false);
  const [beginVertex, setBeginVertex] = useState(0);
  const [isPressed, setIsPressed] = useState(Array(algorithmList.length).fill(false));

  const handleIsPressed = (index) => {
    let temp = Array(algorithmList.length).fill(false);
    temp[index] = true;
    setIsPressed(temp);
  }

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

  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      {algorithmList.map((algorithm, index) => {
        return (
          <Pressable
            key={index}
            style={[{
              backgroundColor: '#78A083',
              padding: 10,
              borderRadius: 20,
              marginBottom: 20,
              width: '80%',
              },
              isPressed[index] && {borderWidth: 3},
            ]
            }
            onPress={() => {
              handleIsPressed(index);
              setAlgorithm(algorithName[algorithm]);
            }}
          >
            <Text style={{
              color: 'white',
              textAlign: 'center',
              fontSize: 14
              }}>{algorithm}</Text>
          </Pressable>
        );
      })} 
      
      
      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => {
          setModalVisible(!modalVisible);
        }}
      >
        <View
          style={styles.centeredView}
        >
          <SafeAreaView
            style={styles.modalView}
          >
            <TextInput
              style={{
                height: 50,
                margin: 10,
                padding: 5,
                borderWidth: 1,
                color: 'black',
                width: '100%'
              }}
              onChangeText={(text) => {setBeginVertex(Number(text))}}
              inputMode="numeric"
              placeholderTextColor={'black'}
              placeholder='Nhập đỉnh xuất phát'
            />

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
              style={styles.optionsButton}
            >
              <Text style={styles.textModal}>Chọn</Text>
            </Pressable>
          </SafeAreaView>
        </View>
      </Modal>

      <Pressable
        disabled={algorithm === ''}
        style={({ pressed }) => [
          (pressed && { opacity: 0.7 }),
          {
            backgroundColor: '#50727B',
            padding: 10,
            borderRadius: 5,
            width: '80%',
          },
          algorithm === '' && styles.buttonDisable,
        ]}
        onPress={() => {
          if (!needVertex(algorithm)) {
            navigation.navigate('GraphSearch', {
              algorithm: algorithm,
              graph: graph,
              typeOfGraph: typeOfGraph,
              beginVertex: 1
            })
          }
          else setModalVisible(true);
          
        }
        }
      >
        <Text style={{ color: 'white', textAlign: 'center'}}>Chọn</Text>
      </Pressable>
    </View>
  );
};

const styles = StyleSheet.create({
  // Modal styles
  centeredView: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center'
  },
  modalView: {
    width: '70%',
    height: '30%',
    
    backgroundColor: '#EEEEEE',
    borderRadius: 20,
    padding: 35,
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5
  },
  optionsButton: {
    backgroundColor: '#535C91',
    padding: 10,
    borderRadius: 5,
    marginTop: 10,
    width: '100%'
  },
  textModal: {
    color: 'white',
    textAlign: 'center'
  },


  //Button styles
  buttonDisable: {
    backgroundColor: "#C9D7DD",
  },

});


export default InputGraphSearch;
