/**
 * react-native-swiper
 * @author ivukusic<ivanvukusic15@gmail.com>
 */

import React, {Component} from 'react';
import { TouchableOpacity, Dimensions, ScrollView, View, Image } from 'react-native';
import styles from './Swiper.style';

const { width } = Dimensions.get('window');

type Props = {
  containerStyle?: Object|Array<Object>,
  height?: number,
  images: Array<Object>,
  resizeMode?: 'contain'|'cover'|'stretch'|'center' |'repeat',
  scrollEnabled?: boolean,
  sliderContainerStyle?: Object|Array<Object>,
  thumbnailStyle?: 'dot'|'line'
};

export default class Swiper extends Component<Props> {

  static defaultProps = {
    containerStyle: {},
    height: width * 0.6,
    resizeMode: 'cover',
    scrollEnabled: true,
    sliderContainerStyle: {},
    thumbnailStyle: 'line',
  }

  constructor(props: Props) {
    super(props);

    const { images } = props;
    const newImages = [];
    newImages.push({ ...images[images.length-1], index: images.length-1 });
    images.map((image, index) => newImages.length < images.length && newImages.push({ ...image, index }) );

    this.state = {
      images: newImages,
      index: 0,
    }
  }

  componentDidMount() {
    if (this.props.images.length > 1) {
      this.scrollView.scrollTo({x: width, y: 0, animated: false });
      // this.setInterval();
    }
  }

  initImages() {
    const { images } = this.props;
    const newImages = [];
    newImages.push({ ...images[images.length-1], index: images.length-1 });
    images.map((image, index) => newImages.length < images.length && newImages.push({ ...image, index }) );
    this.setState({ images: newImages }, () => {
      if (newImages.length > 1) {
        this.scrollView.scrollTo({x: width, y: 0, animated: false });
        this.setInterval();
      }
    });
  }

  setInterval() {
    this.interval = setInterval(() => {
      this.nextImageInterval();
    }, 3000)
  }

  nextImageInterval() {
    if (this.state.images) {
      this.nextImage((images) => this.setState({ images, index: images[1].index }, () => {
        this.scrollView.scrollTo({x: 0, y: 0, animated: false });
        this.imageScrollForward(0, width);
      }))
    }
  }

  nextImage(cb) {
    const { images } = this.state;
    const newImages = [];
    let i = 1;
    while (i < images.length) {
      newImages.push(images[i]);
      i++;
    }
    newImages.push(images[0]);
    cb(newImages)
  }

  previousImageInterval() {
    if (this.state.images) {
      this.previousImage((images) => this.setState({ images, index: images[1].index }, () => {
        this.scrollView.scrollTo({x: width * (this.state.images.length - 1), y: 0, animated: false });
        this.imageScrollForward(width * (this.state.images.length - 1), width);
      }))
    }
  }

  previousImage(cb) {
    const newImages = [];
    const { images } = this.state;
    newImages.push(images[images.length-1]);
    images.map(image => newImages.length < images.length && newImages.push(image) );
    cb(newImages)
  }

  imageScrollForward(startPosition, endPosition) {
    this.scrollView.scrollTo({x: endPosition, y: 0, animated: true });
  }

  onScrollBeginDrag = () => this.interval && clearInterval(this.interval) 

  onScrollEndDrag = (event) => this.resetIndex(event.nativeEvent.contentOffset.x)

  resetIndex(position) {
    let condition = position/width - Math.floor(position/width);
    if (position < width) {
      condition = -1 + condition;
    }
    if (condition > 0.25) {
      this.scrollView.scrollTo({x: width * 2, y: 0, animated: true });
      this.nextImage((images) => setTimeout(() => this.setState({ images, index: images[1].index }, () => {
        this.scrollView.scrollTo({x: width, y: 0, animated: false });
      }), 500))
    } else if (condition < -0.25) {
      this.scrollView.scrollTo({x: 0, y: 0, animated: true });
      this.previousImage((images) => setTimeout(()=> this.setState({ images, index: images[1].index }, () => {
        this.scrollView.scrollTo({x: width, y: 0, animated: false });
      }), 500))
    }
    this.setInterval();
  }

  renderDots() {
    const {
      images,
      index,
    } = this.state;
    if (images && images.length > 1) {
      const {
        thumbnailStyle,
      } = this.props;
      return (
        <View style={styles.dots_container}>
          {images && images.map((image,i)=> (
            <View 
              key={'dot-' + i} 
              style={[styles[thumbnailStyle], index === i && styles[`${thumbnailStyle}_selected`] ]} />
          ))}
        </View>
      );
    }
    return null;
  }

  render() {
    const {
      images,
    } = this.state;
    const {
      containerStyle,
      height,
      resizeMode,
      sliderContainerStyle,
      scrollEnabled,
    } = this.props;
    if (images && images.length > 0) {
      return (
        <View style={{containerStyle}}>
          {images.length > 1 
            ?
              <ScrollView 
                ref={ref => this.scrollView = ref} 
                scrollEnabled={scrollEnabled}
                style={[styles.slider_container, sliderContainerStyle]} 
                horizontal 
                pagingEnabled={true}
                showsHorizontalScrollIndicator={false}
                onScrollBeginDrag={this.onScrollBeginDrag}
                onScrollEndDrag={this.onScrollEndDrag}
                scrollEventThrottle={16}>
                  {images && 
                    images.map((image,i)=> (
                    <Image 
                      key={image.url}
                      style={[styles.slider_image, {height}]}
                      source={image.url}
                      resizeMode={resizeMode} />
                  ))}
              </ScrollView>
          :
              <Image 
                key={images[0].url}
                style={[styles.slider_image, {height}]}
                source={images[0].url}
                resizeMode={resizeMode} />
          }
          {this.renderDots()}
        </View>
      );
    }
    return null;
  }
}
