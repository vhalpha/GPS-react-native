import React, { useState, useEffect, useRef } from 'react';
import MapView, { Marker, Callout } from 'react-native-maps';
import { View, Text } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
const DevicePosition = ({ route }:any) => {
  const [devices, setDevices] = useState([]);
  const [devicesPosition, setDevicesPosition] = useState<any[]>([]);

  const mapRef = useRef(null);

  const fetchData = async () => {
    try {
      const response = await fetch(
        `http://192.168.1.6:5094/api/Device/user/${route.params.email}`,
        {
          headers: {
            Authorization: 'Bearer ' + AsyncStorage.getItem('token') , 
          },
        }
      );
      const data = await response.json();
      setDevices(data);

      // Clear devicesPosition array before re-fetching positions
      setDevicesPosition([]);

      const positionDataPromises = data.map(async ({device}:any) => {
        const positionResponse = await fetch(
          `http://192.168.1.6:5094/api/DevicePacket/position/${device.id}`,
          {
            headers: {
              Authorization: 'Bearer '+AsyncStorage.getItem('token') , 
            },
          }
        );
        const positionData = await positionResponse.json();
        return positionData;
      });

      const allPositionData = await Promise.all(positionDataPromises);
      setDevicesPosition(allPositionData);

      // Update map center based on the first device's position
      if (allPositionData.length > 0 && mapRef.current) {
        (mapRef.current as any)?.animateToRegion({
          latitude: allPositionData[0].latitude,
          longitude: allPositionData[0].longitude,
          latitudeDelta: 0.0922,
          longitudeDelta: 0.0421,
        });
      }
    } catch (error) {
      console.error('Error:', error);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  useEffect(() => {
    const intervalId = setInterval(() => {
      fetchData();
    }, 5000);


    return () => clearInterval(intervalId);
  }, [devices]);

  return (
    <View style={{ flex: 1 }}>
      <MapView
        style={{ flex: 1 }}
        ref={mapRef}
        initialRegion={{
          latitude: 0,
          longitude: 0,
          latitudeDelta: 0.0922,
          longitudeDelta: 0.0421,
        }}
      >
        {devicesPosition.map((position, index) => (
          <Marker
            key={index}
            coordinate={{
              latitude: position.latitude,
              longitude: position.longitude,
            }}
          >
            <Callout>
              <Text>Hello {index}</Text>
            </Callout>
          </Marker>
        ))}
      </MapView>
    </View>
  );
};
export default DevicePosition;
