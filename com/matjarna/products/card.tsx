import {View, Text, Image, StyleSheet} from 'react-native';
import SkeletonPlaceholder from 'react-native-skeleton-placeholder';

interface CardProps {
  title: string;
  price: string;
  imageUri: string;
  loading: boolean;
}

const Card: React.FC<CardProps> = ({
  title,
  price,
  imageUri,
  loading,
}: CardProps) => {
  return (
    <SkeletonPlaceholder borderRadius={4} enabled={loading}>
      <View style={styles.card}>
        <View style={styles.imageContainer}>
          <Image source={{uri: imageUri}} style={styles.image} />
        </View>
        <View style={styles.content}>
          <Text numberOfLines={1} ellipsizeMode="tail" style={styles.title}>
            {title}
          </Text>
          <View style={styles.priceContainer}>
            <Text numberOfLines={1} ellipsizeMode="tail" style={styles.price}>
              {price}
            </Text>
          </View>
        </View>
      </View>
    </SkeletonPlaceholder>
  );
};

const styles = StyleSheet.create({
  card: {
    width: '100%',
    height: '100%',
    marginBottom: 12,
    borderRadius: 15,
    backgroundColor: '#FFFFFF',
  },
  imageContainer: {
    width: '100%',
    height: '75%',
  },
  image: {
    width: '100%',
    height: '100%',
    borderTopLeftRadius: 15,
    borderTopRightRadius: 15,
    resizeMode: 'cover',
  },
  content: {
    padding: 10,
  },
  title: {
    fontSize: 14,
    fontFamily: 'DMSansRegular',
    color: '#000000',
    lineHeight: 18.23,
    letterSpacing: 0.2,
    paddingBottom: 6,
  },
  price: {
    fontSize: 12,
    fontFamily: 'DMSansBold',
    color: '#0ACF83',
    lineHeight: 15.62,
    letterSpacing: 0.2,
  },
  priceContainer: {
    flexDirection: 'row',
    justifyContent: 'flex-start',
  },
});

export default Card;
