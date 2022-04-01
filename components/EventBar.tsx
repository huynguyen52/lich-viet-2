import React from 'react';
import { Text, View, StyleSheet, TouchableOpacity } from 'react-native';

function EventBar(props: any) {
  const { color, event, time = 'cả ngày' } = props;
  return (
    <TouchableOpacity style={styles.eventBar}>
      <View style={styles.container}>
        <BorderLeftBar color={color} />
        <Text style={styles.event}>{event}</Text>
        <Text style={styles.time}>{time}</Text>
      </View>
    </TouchableOpacity>
  );
}

const BorderLeftBar = ({ color }: any) => {
  return (
    <View
      style={{
        height: '100%',
        width: 4,
        borderRadius: 2,
        backgroundColor: color,
        marginRight: 8,
      }}
    />
  );
};

const styles = StyleSheet.create({
  eventBar: {},
  container: {
    flexDirection: 'row',
    justifyContent: 'flex-start',
    paddingVertical: 8,
  },
  event: {
    fontWeight: '500',
    color: '#000',
    fontSize: 16,
    flex: 1,
  },
  time: {
    fontWeight: '500',
    color: '#000',
    fontSize: 16,
    marginLeft: 'auto',
  },
});

export default EventBar;
