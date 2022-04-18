import React, {useState, useEffect} from 'react';
import {SafeAreaView, Text, StyleSheet, View, FlatList, ScrollView} from 'react-native';
import SearchBar from 'react-native-dynamic-search-bar';
import {ElementCard} from './ElementCard';
import Colors from '../constants/colors';
import { LocalOrgCard } from './LocalOrgCard';
import {
  MainText,
} from '../styles/HomeStyles';
import { CategoryCard } from './CategoryCard';
import firestore from '@react-native-firebase/firestore';

const masterDataSource=[
  {
    id:1,
    title:"Mircea Costea",
    description:"Caut muncitori sezonieri.",
    photo:require("./../assets/post1.jpg"),
    phone: "+40725845658",
    suma: "1.000RON",
    town: "Brasov",
    category: "Muncitori",
    detalii: "Sunt in cautarea a 5 persoane muncitoare care sa imi ofere o mana de ajutor la recoltarea granelor. Dispun de un buget de 1.000RON. Rog persoanele interesate sa ma apeleze la +40724685988 L-V: 10:00-18:00."

  },
  {
    id:2,
    title:"Ion Mihai",
    description:"Vand vaci. Pret avantajos!",
    photo:require("./../assets/post2.jpg"),
    phone: "+40725845658",
    suma: "900RON",
    town: "Butuceni",
    category: "Vanzare",
    detalii: "Vand vaci la un pret avantajos. Varsta cuprinsa intre 2 si 3 ani."

  },
  {
    id:3,
    title:"Costache Marin",
    description:"Ichiriez tractor...",
    photo:require("./../assets/post3.jpg"),
    phone: "+40723222586",
    suma: "300RON",
    town: "Ilfov",
    category: "Inchiriere",
    detalii: "Buna tuturor! Caut sa inchiriez un tractor pentru 3 saptamani. Sunt dispus sa platest 300RON pentru fiecare zi de utilizare!"

  },
  {
    id:4,
    title:"Carstea Vlad",
    description:"Ofer ingrasaminte plante.",
    photo:require("./../assets/post4.jpg"),
    phone: "+40725449966",
    suma: "100RON",
    town: "Brasov",
    category: "Vanzare",
    detalii: "Ingrasaminte foarte bune pentru plante. Roada creste de aproximativ 2.3X ori! Nu ezitati sa ne contactati!"
  },
  {
    id:5,
    title:"Cazacu Ioana",
    description:"Ichiriez pamant arabil.",
    photo:require("./../assets/post5.jpg"),
    phone: "+40725845658",
    suma: "1.000RON",
    town: "Iasi",
    category: "Inchiriere",
    detalii: "Dispun de teren arabil 24ha. Inchiriez pentru tot sezonul urmator."
  },
  {
    id:6,
    title:"Dumitrescu Ion",
    description:"Dau in chirie angar.",
    photo:require("./../assets/post6.jpg"),
    phone: "+40725845658",
    suma: "700RON",
    town: "Cluj",
    category: "Inchiriere",
    detalii: "Angar spatios de 340m patrati. Dau in chirie pentru 6 luni. Va rog sa ma contactati daca aveti nevoie!"

  },
  {
    id:7,
    title:"Mesteacan Vlad si Ioana",
    description:"Ingrasaminte entru porumb.",
    photo:require("./../assets/post7.jpg"),
    phone: "+40725845558",
    suma: "40RON",
    town: "Constanta",
    category: "Vanzare",
    detalii: "Porumbul necesita ingrasaminte speciale pentru a creste corect si a da o roada buna! Avem la vanzare ingrasaminte de la 10 lei kilogramul!"

  },
  {
    id:8,
    title:"Chizaru Mihai",
    description:"Caut tractor pentru munca sezoniera.",
    photo:require("./../assets/post8.jpg"),
    phone: "+40725847778",
    suma: "400RON",
    town: "Brasov",
    category: "Inchiriere",
    detalii: "Sunt in cautarea unui tractor pentru perioada 12-18 februarie. Daca are cineva disponibil va rog sa ma contactati!"

  }
]

let categories = [
  {
    id: 1,
    title: "Muncitori",
    photo: require("./../assets/onboard/onboard1.png")
  },
  {
    id: 2,
    title: "Inchiriere",
    photo: require("./../assets/onboard/onboard2.png")
  },
  {
    id: 3,
    title: "Vanzare",
    photo: require("./../assets/onboard/onboard3.png")
  },
  {
    id: 4,
    title: "Cumparare",
    photo: require("./../assets/onboard/onboard1.png")
  },
  {
    id: 5,
    title: "Toate",
    photo: require("./../assets/onboard/onboard1.png")
  },
]

function Search({navigation}) {
  const [search, setSearch] = useState('');
  const [filteredDataSource, setFilteredDataSource] = useState([]);
  const [posts, setPosts] = useState([]);
  const [localPosts, setLocalPosts] = useState([]);
  const [fposts, setFposts] = useState([]);

  useEffect(() => {
    getPosts()
 }, []);

 function getPosts() {
  const postsCollection = firestore().collection('post');
  let list = [];
  // if(masterDataSource.length!=0) {
  //   masterDataSource.map((el) => postsCollection.add(el));
  //   masterDataSource = []
  // }
  postsCollection.get()
  .then(querySnapshot => {
    querySnapshot.forEach(documentSnapshot => {
      const objCategory = documentSnapshot.data();
      list.push(objCategory);
    });
    setPosts(list);
    setFilteredDataSource(list);
  });
 }

  async function searchFilterFunction (text) {
    if (text) {
      const newData = masterDataSource.filter(function (item) {
        const itemData = item.description
          ? item.description.toUpperCase()
          : ''.toUpperCase();
        const textData = text.toUpperCase();
        return itemData.indexOf(textData) > -1;
      });
      setFilteredDataSource(newData);
      setSearch(text);
    } else {
      setFilteredDataSource(masterDataSource);
      setSearch(text);
    }
  };

  async function categoryFilter(item) {
    // getPosts()
    // setPosts(masterDataSource)
    console.log(item)
    if(item.item.id==5) {
      setFilteredDataSource(masterDataSource)
    }
    else {
      const newData = posts.filter((post) => post.category == item.item.title);
      setFilteredDataSource(newData);
    }
  };

  return (
    <View style={({flex: 1}, {backgroundColor: Colors.background})}>
      <View>
        <MainText style={{marginBottom: 10, marginLeft: 10}}>Categorii</MainText>
        <SafeAreaView style={{flex: 1}}>
          <FlatList
              horizontal
              showsHorizontalScrollIndicator={false}
              data={categories}
              keyExtractor={(item, index) => item.id+'/'}
              renderItem={({item}) => (
                <CategoryCard item={item} onPress={() => categoryFilter({item})}/>
              )}
          />
        </SafeAreaView>
        <View style={styles.searchStyle}>
          <SearchBar
            round
            onChangeText={(text) => searchFilterFunction(text)}
            onClear={(text) => searchFilterFunction('')}
            placeholder="Search..."
            // value={search}
            underlineColorAndroid="white"
          />
        </View>
        <SafeAreaView style={{flex: 1}}>
          <FlatList
            numColumns={2}
            showsVerticalScrollIndicator={false}
            data={filteredDataSource}
            keyExtractor={(item, index) => item.id+'/'}
            renderItem={({item}) => (
              <ElementCard item={item} navigation={navigation} />
            )}
        />
        </SafeAreaView>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  searchStyle: {
    padding: 10,
  },
  container: {
    margin: 10,
    marginLeft: 15,
    backgroundColor: 'white',
    borderRadius: 10,
    width: '90%',
  }
});

export default Search;
