import { useApiRequest } from "@/hooks/useApiRequests";
import { useState } from "react";
import { ScrollView, StyleSheet, Text, TouchableOpacity } from "react-native";

export default function PhonesByBrand({ brandId = 64 }) {
  const { data, isLoading, error } = useApiRequest({
    queryKey: ["phones", brandId],
    endpoint: "/api/3622/iphone+database+api/4055/get+phone+by+brand",
    params: { brand_id: brandId },
  });

  const [selectedPhone, setSelectedPhone] = useState<string | null>(null);

  if (isLoading) return <Text>Yuklanmoqda...</Text>;
  if (error) return <Text>Xatolik: {error.message}</Text>;
  if (!data || data.data.length === 0) return <Text>Ma'lumot topilmadi</Text>;
  if (data.error) return <Text>Xatolik: {data.error}</Text>;
  if (data.length > 0) {
    console.table(data.data[0]);
  }
  return (
    <ScrollView>
      {data.data.map((phone: any) => (
        <TouchableOpacity
          activeOpacity={0.7}
          key={phone.id}
          style={[
            styles.phoneCard,
            selectedPhone === phone.id && styles.phoneCardActive,
          ]}
          onPress={() => setSelectedPhone(phone.id)}
        >
          {/* Agar rasm bo‘lsa, Image qo‘shing */}
          {/* <Image source={{ uri: phone.image }} style={styles.phoneImage} /> */}
          <Text style={styles.phoneTitle}>
            {phone.brand_name} {phone.phone_model}
          </Text>
          <Text style={styles.phoneDesc}>{phone.description}</Text>
          <Text style={styles.phoneId}>ID: {phone.id}</Text>
        </TouchableOpacity>
      ))}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  phoneCard: {
    backgroundColor: "#fff",
    borderRadius: 12,
    padding: 16,
    marginVertical: 8,
    marginHorizontal: 16,
    elevation: 2,
    borderWidth: 1,
    borderColor: "#eee",
  },
  phoneCardActive: {
    borderColor: "#007AFF",
    backgroundColor: "#e6f0ff",
  },
  phoneTitle: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 6,
  },
  phoneDesc: {
    fontSize: 14,
    color: "#444",
    marginBottom: 8,
  },
  phoneId: {
    fontSize: 12,
    color: "#888",
  },
  // phoneImage: {
  //   width: 60,
  //   height: 60,
  //   borderRadius: 8,
  //   marginBottom: 8,
  // },
});
