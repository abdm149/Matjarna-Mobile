import {View, Text, Image, StyleSheet} from 'react-native';
import SkeletonPlaceholder from 'react-native-skeleton-placeholder';

interface CardProps {
  title: string;
  imageUri: string;
  loading: boolean;
}

const Card: React.FC<CardProps> = ({title, imageUri, loading}: CardProps) => {
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
    fontFamily: 'DMSansBold',
    color: '#000000',
  },
});

export default Card;
