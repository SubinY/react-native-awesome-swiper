import { StyleSheet, Dimensions } from 'react-native';

const { width } = Dimensions.get('window');

export default StyleSheet.create({
  slider_container: {
    width,
    flexDirection: 'row',
  },
  slider_image: {
    width,
  },

  dots_container: {
    position: 'absolute',
    left: 0,
    right: 0,
    bottom: 0,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  dot: {
    width: 8,
    height: 8,
    borderRadius: 3,
    marginRight: 10,
    marginBottom: 15,
    backgroundColor: 'white',
    shadowColor: 'black',
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 1,
    shadowRadius: 2,
    elevation: 2,
  },
  line: {
    width: 24,
    height: 3,
    borderRadius: 3,
    marginRight: 10,
    marginBottom: 15,
    backgroundColor: 'white',
    shadowColor: 'black',
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 1,
    shadowRadius: 2,
    elevation: 2,
  },
  line_selected: {
    opacity: 0.4,
  },
  dot_selected: {
    opacity: 0.4,
  },
});
