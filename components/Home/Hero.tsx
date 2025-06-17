import { useNavigation } from "@react-navigation/native";
import { Image } from "expo-image";
import React, { useState } from "react";
import {
  FlatList,
  ImageBackground,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import PhonesByBrand from "./PhonesByBrand";

// Kategoriyalar va brandId larni moslashtiring
const categories = [
  {
    id: "1",
    title: "Смартфоны",
    image: require("@/assets/images/phone.png"),
    brandId: 64,
  },
  {
    id: "2",
    title: "Ноутбуки",
    image: require("@/assets/images/notebook.png"),
    brandId: 70,
  },
  {
    id: "3",
    title: "Планшеты",
    image: require("@/assets/images/tablet.png"),
    brandId: 80,
  },
  {
    id: "4",
    title: "Умные часы",
    image: require("@/assets/images/watch.png"),
    brandId: 90,
  },
];

const tags = ["Дизайн", "Динамик", "Камера", "Батарея"];

export default function Hero() {
  const [selectedCategory, setSelectedCategory] = useState(categories[0].id);
  const [selectedTag, setSelectedTag] = useState(tags[1]);
  const navigation = useNavigation<any>();

  // Tanlangan kategoriya uchun brandId ni topamiz
  const selectedBrandId =
    categories.find((cat) => cat.id === selectedCategory)?.brandId || 64;

  return (
    <View style={{ paddingTop: 52, padding: 5 }}>
      {/* Banner 1 */}
      <ImageBackground
        source={require("@/assets/images/patterns.jpg")}
        style={styles.banner}
        imageStyle={{ borderRadius: 16 }}
      >
        <Text style={styles.bannerTitle}>
          <Text style={{ color: "#FF4D4D", fontWeight: "bold" }}>1,8 млн</Text>
          <Text style={{ color: "#232A36" }}> товаров в </Text>
          <Text style={{ color: "#FF4D4D", fontWeight: "bold" }}>2 272</Text>
          <Text style={{ color: "#232A36" }}>
            {" "}
            магазинах.{"\n"}Найди, сравни, выбери!
          </Text>
        </Text>
        <TouchableOpacity
          onPress={() => navigation.navigate("Categories")}
          style={styles.bannerButton}
        >
          <Text style={styles.bannerButtonText}>Перейти к категориям</Text>
        </TouchableOpacity>
      </ImageBackground>

      {/* Banner 2 */}
      <ImageBackground
        source={require("@/assets/images/patterns.jpg")}
        style={[
          styles.banner,
          { flexDirection: "row", alignItems: "center", marginTop: 12 },
        ]}
        imageStyle={{ borderRadius: 16 }}
      >
        <View style={{ flex: 1 }}>
          <Text style={styles.bannerTitle2}>
            <Text style={{ color: "#FF4D4D", fontWeight: "bold" }}>Топ-10</Text>
            <Text style={{ color: "#232A36" }}> смартфонов{"\n"}2023 года</Text>
          </Text>
          <TouchableOpacity
            style={[styles.bannerButton, { width: 140, marginTop: 10 }]}
          >
            <Text style={styles.bannerButtonText}>Смотреть</Text>
          </TouchableOpacity>
        </View>
        <Image
          source={require("@/assets/images/phone.png")}
          contentFit="contain"
          style={{
            width: 90,
            height: 110,
            marginLeft: 10,
          }}
        />
      </ImageBackground>

      {/* Лучший выбор */}
      <Text style={styles.sectionTitle}>Лучший выбор</Text>
      <FlatList
        data={categories}
        horizontal
        showsHorizontalScrollIndicator={false}
        keyExtractor={(item) => item.id}
        style={{ marginVertical: 10 }}
        contentContainerStyle={{ gap: 12, paddingLeft: 2 }}
        renderItem={({ item }) => (
          <TouchableOpacity
            style={[
              styles.categoryCard,
              selectedCategory === item.id && styles.categoryCardActive,
            ]}
            onPress={() => setSelectedCategory(item.id)}
          >
            <Image source={item.image} style={styles.categoryImage} />
            <Text
              style={[
                styles.categoryText,
                selectedCategory === item.id && styles.categoryTextActive,
              ]}
            >
              {item.title}
            </Text>
          </TouchableOpacity>
        )}
      />

      {/* Tags */}
      <View style={styles.tagsRow}>
        {tags.map((tag) => (
          <TouchableOpacity
            key={tag}
            style={[styles.tag, selectedTag === tag && styles.tagActive]}
            onPress={() => setSelectedTag(tag)}
          >
            <Text
              style={[
                styles.tagText,
                selectedTag === tag && styles.tagTextActive,
              ]}
            >
              {tag}
            </Text>
          </TouchableOpacity>
        ))}
      </View>

      {/* Brand Api component */}
      <PhonesByBrand brandId={selectedBrandId} />
    </View>
  );
}

const styles = StyleSheet.create({
  titleContainer: {
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
  },
  stepContainer: {
    gap: 8,
    marginBottom: 8,
  },
  reactLogo: {
    height: 178,
    width: 290,
    bottom: 0,
    left: 0,
    position: "absolute",
  },
  container: {
    backgroundColor: "#F5F7FA",
    flex: 1,
    paddingHorizontal: 16,
    paddingTop: 12,
  },
  header: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 18,
    marginTop: 8,
  },
  logo: {
    width: 38,
    height: 38,
    marginRight: 10,
    resizeMode: "contain",
  },
  headerTitle: {
    fontSize: 22,
    fontWeight: "bold",
    color: "#232A36",
    marginBottom: 2,
  },
  headerSubtitle: {
    fontSize: 12,
    color: "#6B7685",
    lineHeight: 14,
  },
  searchBox: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#fff",
    borderRadius: 12,
    paddingHorizontal: 12,
    height: 44,
    marginBottom: 16,
    borderWidth: 1,
    borderColor: "#E3E6ED",
  },
  searchInput: {
    flex: 1,
    fontSize: 16,
    color: "#232A36",
  },
  banner: {
    backgroundColor: "#fff",
    borderRadius: 16,
    padding: 18,
    marginBottom: 8,
    minHeight: 120,
    justifyContent: "center",
  },
  bannerTitle: {
    fontSize: 20,
    fontWeight: "bold",
    color: "#232A36",
    marginBottom: 18,
    lineHeight: 26,
  },
  bannerTitle2: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#232A36",
    marginBottom: 0,
    lineHeight: 24,
  },
  bannerButton: {
    backgroundColor: "#FF4D4D",
    borderRadius: 10,
    paddingVertical: 12,
    alignItems: "center",
    marginTop: 12,
  },
  bannerButtonText: {
    color: "#fff",
    fontWeight: "bold",
    fontSize: 16,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#232A36",
    marginTop: 18,
    marginBottom: 2,
  },
  categoryCard: {
    backgroundColor: "#fff",
    borderRadius: 12,
    alignItems: "center",
    padding: 10,
    width: 90,
    borderWidth: 2,
    borderColor: "transparent",
  },
  categoryCardActive: {
    borderColor: "#007AFF",
  },
  categoryImage: {
    width: 54,
    height: 54,
    marginBottom: 6,
    resizeMode: "contain",
  },
  categoryText: {
    fontSize: 13,
    color: "#232A36",
    textAlign: "center",
  },
  categoryTextActive: {
    color: "#007AFF",
    fontWeight: "bold",
  },
  tagsRow: {
    flexDirection: "row",
    gap: 8,
    marginTop: 10,
    marginBottom: 10,
    flexWrap: "wrap",
  },
  tag: {
    backgroundColor: "#fff",
    borderRadius: 20,
    paddingHorizontal: 18,
    paddingVertical: 7,
    borderWidth: 1,
    borderColor: "#E3E6ED",
    marginRight: 8,
    marginBottom: 8,
  },
  tagActive: {
    backgroundColor: "#FFF0F0",
    borderColor: "#FF4D4D",
  },
  tagText: {
    color: "#6B7685",
    fontSize: 14,
  },
  tagTextActive: {
    color: "#FF4D4D",
    fontWeight: "bold",
  },
});
