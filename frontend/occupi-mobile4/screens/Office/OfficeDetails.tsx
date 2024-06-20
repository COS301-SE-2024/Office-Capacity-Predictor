import React, { useState, useEffect, Component } from 'react';
import {
  TouchableOpacity,
  Modal,
  useColorScheme,
  StyleSheet
} from 'react-native';
import {
  Ionicons,
  FontAwesome,
  MaterialIcons,
  MaterialCommunityIcons,
  Octicons,
  Feather
} from '@expo/vector-icons';
import { Calendar } from 'react-native-calendars';
import CalendarPicker from "react-native-calendar-picker";
import { LinearGradient } from 'expo-linear-gradient';
import { Icon, ScrollView, View, Text, Image } from '@gluestack-ui/themed';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
// import Carousel from 'react-native-snap-carousel';
import { useNavigation, NavigationProp } from '@react-navigation/native';
import { Theme } from 'react-native-calendars/src/types';
import slotsData from './availableSlots.json';
import PagerView from 'react-native-pager-view';


type RootStackParamList = {
  BookingDetails: undefined;
};

const images = [
  {
    uri: 'https://cdn-bnokp.nitrocdn.com/QNoeDwCprhACHQcnEmHgXDhDpbEOlRHH/assets/images/optimized/rev-15fa1b1/www.decorilla.com/online-decorating/wp-content/uploads/2022/03/Modern-Office-Interior-with-Open-Floor-Plan-1024x683.jpeg',
  },
  {
    uri: 'https://cdn-bnokp.nitrocdn.com/QNoeDwCprhACHQcnEmHgXDhDpbEOlRHH/assets/images/optimized/rev-15fa1b1/www.decorilla.com/online-decorating/wp-content/uploads/2022/03/modern-office-design-for-a-large-conference-room-1024x838.jpeg',
  },
  {
    uri: 'https://cdn-bnokp.nitrocdn.com/QNoeDwCprhACHQcnEmHgXDhDpbEOlRHH/assets/images/optimized/rev-15fa1b1/www.decorilla.com/online-decorating/wp-content/uploads/2022/03/Industrial-style-office-interior-design-Sonia-C-1024x683.jpg',
  },
];

const OfficeDetails = () => {
  const [modalVisible, setModalVisible] = useState(false);
  const colorScheme = useColorScheme();
  const isDarkMode = colorScheme === 'dark';
  const navigation = useNavigation<NavigationProp<RootStackParamList>>();
  const [availableSlots, setAvailableSlots] = useState({});
  useEffect(() => {
    // Load the available slots from the JSON file
    setAvailableSlots(slotsData.slots);
  }, []);

  const handleCheckAvailability = () => {
    setModalVisible(true);
  };

  const renderItem = ({ item }: { item: { uri: string } }) => (
    <View style={{ borderRadius: wp('5%'), overflow: 'hidden' }}>
      <Image source={{ uri: item.uri }} style={{ width: '100%', height: hp('30%') }} />
    </View>
  );

  const handleSlotClick = () => {
    navigation.navigate('/booking-details');
  };

  return (
    <>
      {/* Top Section */}
      <View pt="$16" backgroundColor={colorScheme === 'dark' ? 'black' : 'white'} style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', padding: wp('5%') }}>
        <Icon right="$4" as={Feather} name="chevron-left" size="40" color={colorScheme === 'dark' ? 'white' : 'black'} />
        <Text right="$8" fontWeight="$bold" fontSize="$22" style={{ color: isDarkMode ? '#fff' : '#000' }}>The HDMI room</Text>
        <View alignItems="$center" flexDirection="$row" w="$24" justifyContent="$space-between">
          <View rounded="$full" backgroundColor={isDarkMode ? '#2C2C2E' : '#F3F3F3'} p="$2">
            <Feather name="heart" size={24} color={isDarkMode ? '#fff' : '#000'} />
          </View>
          <View rounded="$full" backgroundColor={isDarkMode ? '#2C2C2E' : '#F3F3F3'} p="$2">
            <Feather name="share" mx="$8" size={24} color={colorScheme === 'dark' ? 'white' : 'black'} />
          </View>
        </View>
      </View >
      <ScrollView style={{ backgroundColor: isDarkMode ? '#000' : '#fff' }}>
        <View height="$5/6" mt="$4" mb="$8">
          <PagerView style={styles.container} initialPage={0}>
            <View style={styles.page} key="1">
              <Image alt="slide1" style={{ width: '90%', height: '100%', borderRadius: 20 }} source={{ uri: 'https://content-files.shure.com/OriginFiles/BlogPosts/best-layouts-for-conference-rooms/img5.png' }} />
            </View>
            <View style={styles.page} key="2">
              <Image alt="slide2" style={{ width: '90%', height: '100%', borderRadius: 20 }} source={{ uri: 'https://content-files.shure.com/OriginFiles/BlogPosts/best-layouts-for-conference-rooms/img5.png' }} />
            </View>
            <View style={styles.page} key="3">
              <Image alt="slide3" style={{ width: '90%', height: '100%', borderRadius: 20 }} source={{ uri: 'https://content-files.shure.com/OriginFiles/BlogPosts/best-layouts-for-conference-rooms/img5.png' }} />
            </View>
          </PagerView>
        </View>
        <View style={{ padding: wp('5%') }}>
          <Text fontSize="$24" fontWeight="$bold" mb="$3" style={{ color: isDarkMode ? '#fff' : '#000' }}>The HDMI Room</Text>
          <View alignItems="center" flexDirection="row">
            <Ionicons name="wifi" size={24} color={isDarkMode ? '#fff' : '#000'} /><Text fontWeight="$light" color={isDarkMode ? '#fff' : '#000'}> Fast   </Text>
            <MaterialCommunityIcons name="television" size={24} color={isDarkMode ? '#fff' : '#000'} /><Text color={isDarkMode ? '#fff' : '#000'}> OLED   </Text>
            <Octicons name="people" size={24} color={isDarkMode ? '#fff' : '#000'} /><Text color={isDarkMode ? '#fff' : '#000'}> 5 People   </Text>
            <Feather name="layers" size={24} color={isDarkMode ? '#fff' : '#000'} /><Text fontWeight="$light" color={isDarkMode ? '#fff' : '#000'}> Floor 7   </Text>
          </View>
        </View>

        {/* Category Icons */}
        {/* <Text style={{ fontSize: wp('6%'), color: isDarkMode ? '#fff' : '#000', paddingLeft: wp('5%') }}>Categories</Text> */}
        {/* <View style={{ flexDirection: 'row', justifyContent: 'space-around', padding: wp('5%') }}>
          <View style={{ alignItems: 'center' }}>
            <MaterialCommunityIcons name="coffee" size={wp('6%')} color="#2196F3" />
            <Text style={{ color: isDarkMode ? '#fff' : '#000', fontSize: wp('4%'), marginTop: hp('0.5%') }}>Focus</Text>
          </View>
          <View style={{ alignItems: 'center' }}>
            <MaterialCommunityIcons name="leaf" size={wp('6%')} color="#4CAF50" />
            <Text style={{ color: isDarkMode ? '#fff' : '#000', fontSize: wp('4%'), marginTop: hp('0.5%') }}>Chill</Text>
          </View>
          <View style={{ alignItems: 'center' }}>
            <MaterialCommunityIcons name="lightbulb-on" size={wp('6%')} color="#FFC107" />
            <Text style={{ color: isDarkMode ? '#fff' : '#000', fontSize: wp('4%'), marginTop: hp('0.5%') }}>Ideas</Text>
          </View>
          <View style={{ alignItems: 'center' }}>
            <MaterialCommunityIcons name="volume-high" size={wp('6%')} color="#9C27B0" />
            <Text style={{ color: isDarkMode ? '#fff' : '#000', fontSize: wp('4%'), marginTop: hp('0.5%') }}>Loud</Text>
          </View>
          <View style={{ alignItems: 'center' }}>
            <MaterialCommunityIcons name="gamepad-variant" size={wp('6%')} color="#E91E63" />
            <Text style={{ color: isDarkMode ? '#fff' : '#000', fontSize: wp('4%'), marginTop: hp('0.5%') }}>Game</Text>
          </View>
        </View> */}

        {/* Description */}
        <View px="$5">
          <Text fontSize="$24" fontWeight="$bold" style={{ color: isDarkMode ? '#fff' : '#000' }}>Description</Text>
          <Text fontSize="$16" style={{ color: isDarkMode ? '#fff' : '#000' }}>
            Lorem ipsum dolor sit amet consectetur. Ut lectus rutrum imperdiet enim consectetur egestas sem. Est tellus id nulla morbi. Nibh nulla ut diam morbi cras viverra vivamus risus scelerisque.
          </Text>
        </View>

        {/* Check Availability Button */}
        <TouchableOpacity bottom="$0" style={{ margin: wp('5%')}} onPress={handleCheckAvailability}>
          <LinearGradient
            colors={['#614DC8', '#86EBCC', '#B2FC3A', '#EEF060']}
            start={{ x: 0, y: 0 }}
            end={{ x: 1, y: 0 }}
            style={{ padding: wp('4%'), alignItems: 'center', borderRadius: 18 }}
          >
            <Text color={isDarkMode ? '#000' : '#fff'} fontSize="$16" style={{ fontSize: wp('4%') }}>Check availability</Text>
          </LinearGradient>
        </TouchableOpacity>

        {/* Modal for Calendar */}
        <Modal
          animationType="slide"
          transparent={true}
          visible={modalVisible}
          onRequestClose={() => {
            setModalVisible(!modalVisible);
          }}
        >
          <View style={{ margin: wp('5%'), backgroundColor: isDarkMode ? '#333' : '#fff', borderRadius: wp('5%'), padding: wp('8%'), alignItems: 'center', shadowColor: '#000', shadowOffset: { width: 0, height: hp('0.25%') }, shadowOpacity: 0.25, shadowRadius: hp('0.5%'), elevation: 5 }}>
            <Text style={{ fontSize: wp('6%'), color: isDarkMode ? '#fff' : '#000', marginBottom: hp('2%') }}>Available slots</Text>
            {/* <CalendarPicker /> */}
            <View style={{ marginTop: hp('2%'), width: '100%' }}>
              {Object.keys(availableSlots).map(date => (
                availableSlots[date].map((slot, index) => (
                  <TouchableOpacity
                    key={`${date}-${index}`}
                    style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', padding: wp('4%'), borderRadius: wp('1%'), backgroundColor: isDarkMode ? '#444' : '#f0f0f0', marginBottom: hp('1%') }}
                    onPress={handleSlotClick}
                  >
                    <Text style={{ color: isDarkMode ? '#fff' : '#000', fontSize: wp('4%') }}>{date} at {slot}</Text>
                  </TouchableOpacity>
                ))
              ))}
            </View>
            <TouchableOpacity
              style={{ backgroundColor: 'red', padding: wp('2.5%'), borderRadius: wp('1%'), marginTop: wp('5%') }}
              onPress={() => setModalVisible(!modalVisible)}
            >
              <Text style={{ color: '#fff', fontSize: wp('4%') }}>Close</Text>
            </TouchableOpacity>
          </View>
        </Modal>
      </ScrollView>
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  page: {
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default OfficeDetails;

export const calendarTheme: Theme = {
  backgroundColor: '#ffffff',
  calendarBackground: '#ffffff',
  textSectionTitleColor: '#b6c1cd',
  textSectionTitleDisabledColor: '#d9e1e8',
  selectedDayBackgroundColor: '#00adf5',
  selectedDayTextColor: '#ffffff',
  todayTextColor: '#00adf5',
  dayTextColor: '#2d4150',
  textDisabledColor: '#d9e1e8',
  dotColor: '#00adf5',
  selectedDotColor: '#ffffff',
  arrowColor: 'orange',
  disabledArrowColor: '#d9e1e8',
  monthTextColor: 'blue',
  indicatorColor: 'blue',
  textDayFontFamily: 'monospace',
  textMonthFontFamily: 'monospace',
  textDayHeaderFontFamily: 'monospace',
  textDayFontWeight: '300',
  textMonthFontWeight: 'bold',
  textDayHeaderFontWeight: '300',
  textDayFontSize: 16,
  textMonthFontSize: 16,
  textDayHeaderFontSize: 16,
};
