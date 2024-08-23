import React, { useState } from "react";
import { View, Image, StyleSheet, ActivityIndicator } from "react-native";

interface ImageWithSkeletonProps {
  uri: string | undefined;
  width: number;
  height: number;
  borderRadius?: number;
}

export const ImageWithSkeleton: React.FC<ImageWithSkeletonProps> = ({
  uri,
  width,
  height,
  borderRadius = 0,
}) => {
  const [loading, setLoading] = useState(true);
  const defaultImage = require("../../assets/no-img.jpg");

  const handleImageError = () => {
    setLoading(false);
  };

  return (
    <View style={[styles.container, { width, height, borderRadius }]}>
      {loading && (
        <View style={[styles.skeleton, { width, height, borderRadius }]}>
          <ActivityIndicator size="small" color="#cccccc" />
        </View>
      )}
      <Image
        source={uri ? { uri } : defaultImage}
        style={[styles.image, { width, height, borderRadius }]}
        onLoad={() => setLoading(false)}
        onError={handleImageError}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#e0e0e0",
    overflow: "hidden",
  },
  skeleton: {
    position: "absolute",
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#e0e0e0",
  },
  image: {
    width: "100%",
    height: "100%",
    position: "absolute",
  },
});
