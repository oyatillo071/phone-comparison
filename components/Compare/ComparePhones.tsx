import { useApiRequest } from "@/hooks/useApiRequests";
import React, { useRef, useState } from "react";
import {
  ActivityIndicator,
  FlatList,
  Image,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";

function useDebouncedValue<T>(value: T, delay: number) {
  const [debounced, setDebounced] = useState(value);
  const timeout = useRef<number | null>(null);

  React.useEffect(() => {
    if (timeout.current) clearTimeout(timeout.current);
    timeout.current = window.setTimeout(() => setDebounced(value), delay);
    return () => {
      if (timeout.current) clearTimeout(timeout.current);
    };
  }, [value, delay]);
  return debounced;
}

function usePhoneSearch(query: string) {
  return useApiRequest({
    queryKey: ["phoneSearch", query],
    endpoint: query
      ? `/api/3622/iphone+database+api/4057/search?q=${encodeURIComponent(
          query
        )}`
      : "",
    enabled: !!query && query.length > 1,
  });
}

export default function ComparePhones() {
  // 1-telefon uchun qidiruv
  const [search1, setSearch1] = useState("");
  const [phoneId1, setPhoneId1] = useState<string | null>(null);
  const [showSearch1, setShowSearch1] = useState(false);
  const debouncedSearch1 = useDebouncedValue(search1, 500);
  const { data: searchData1, isLoading: searching1 } =
    usePhoneSearch(debouncedSearch1);

  // 2-telefon uchun qidiruv
  const [search2, setSearch2] = useState("");
  const [phoneId2, setPhoneId2] = useState<string | null>(null);
  const [showSearch2, setShowSearch2] = useState(false);
  const debouncedSearch2 = useDebouncedValue(search2, 500);
  const { data: searchData2, isLoading: searching2 } =
    usePhoneSearch(debouncedSearch2);

  const [compare, setCompare] = useState(false);

  // Telefon detallarini olish
  const {
    data: data1,
    isLoading: loading1,
    error: error1,
    refetch: refetch1,
  } = useApiRequest({
    queryKey: ["phoneDetails", phoneId1],
    endpoint: phoneId1
      ? `/api/3622/iphone+database+api/4056/get+phone+details?phone_id=${encodeURIComponent(
          phoneId1
        )}`
      : "",
    enabled: false,
  });

  const {
    data: data2,
    isLoading: loading2,
    error: error2,
    refetch: refetch2,
  } = useApiRequest({
    queryKey: ["phoneDetails", phoneId2],
    endpoint: phoneId2
      ? `/api/3622/iphone+database+api/4056/get+phone+details?phone_id=${encodeURIComponent(
          phoneId2
        )}`
      : "",
    enabled: false,
  });

  const handleCompare = async () => {
    setCompare(true);
    await Promise.all([refetch1(), refetch2()]);
  };

  return (
    <ScrollView style={styles.container} keyboardShouldPersistTaps="handled">
      <Text style={styles.title}>Qurilmalarni solishtirish</Text>
      {/* 1-telefon qidiruv */}
      <Text style={styles.label}>1-telefonni qidiring</Text>
      <TextInput
        style={styles.input}
        value={search1}
        onChangeText={(t) => {
          setSearch1(t);
          setPhoneId1(null);
          setCompare(false);
          setShowSearch1(true);
        }}
        placeholder="Masalan: iPhone 15"
        onFocus={() => setShowSearch1(true)}
      />
      {searching1 && showSearch1 && (
        <ActivityIndicator size="small" color="#007AFF" />
      )}
      {showSearch1 && !phoneId1 && searchData1?.data && (
        <FlatList
          data={searchData1.data}
          keyExtractor={(item) => item.id}
          style={styles.searchList}
          keyboardShouldPersistTaps="handled"
          renderItem={({ item }) => (
            <TouchableOpacity
              style={styles.searchItem}
              onPress={() => {
                setPhoneId1(item.id);
                setSearch1(item.brand_name + " " + item.phone_model);
                setShowSearch1(false);
              }}
            >
              <Text style={{ fontWeight: "bold" }}>
                {item.brand_name} {item.phone_model}
              </Text>
              <Text style={{ color: "#888", fontSize: 12 }}>
                {item.description}
              </Text>
            </TouchableOpacity>
          )}
        />
      )}

      {/* 2-telefon qidiruv */}
      <Text style={styles.label}>2-telefonni qidiring</Text>
      <TextInput
        style={styles.input}
        value={search2}
        onChangeText={(t) => {
          setSearch2(t);
          setPhoneId2(null);
          setCompare(false);
          setShowSearch2(true);
        }}
        placeholder="Masalan: iPhone 14"
        onFocus={() => setShowSearch2(true)}
      />
      {searching2 && showSearch2 && (
        <ActivityIndicator size="small" color="#007AFF" />
      )}
      {showSearch2 && !phoneId2 && searchData2?.data && (
        <FlatList
          data={searchData2.data}
          keyExtractor={(item) => item.id}
          style={styles.searchList}
          keyboardShouldPersistTaps="handled"
          renderItem={({ item }) => (
            <TouchableOpacity
              style={styles.searchItem}
              onPress={() => {
                setPhoneId2(item.id);
                setSearch2(item.brand_name + " " + item.phone_model);
                setShowSearch2(false);
              }}
            >
              <Text style={{ fontWeight: "bold" }}>
                {item.brand_name} {item.phone_model}
              </Text>
              <Text style={{ color: "#888", fontSize: 12 }}>
                {item.description}
              </Text>
            </TouchableOpacity>
          )}
        />
      )}

      <TouchableOpacity
        style={[
          styles.button,
          !(phoneId1 && phoneId2) && { backgroundColor: "#ccc" },
        ]}
        onPress={handleCompare}
        disabled={!(phoneId1 && phoneId2)}
      >
        <Text style={styles.buttonText}>Solishtirish</Text>
      </TouchableOpacity>

      {(loading1 || loading2) && compare && (
        <ActivityIndicator
          size="large"
          color="#007AFF"
          style={{ marginTop: 20 }}
        />
      )}

      {(error1 || error2) && compare && (
        <Text style={{ color: "red", textAlign: "center" }}>
          Xatolik: {error1?.message || error2?.message}
        </Text>
      )}

      {data1?.data && data2?.data && compare && (
        <View style={styles.compareRow}>
          {/* Phone 1 */}
          <View style={styles.phoneCol}>
            <Image
              source={{ uri: data1.data.image_url }}
              style={styles.phoneImg}
            />
            <Text style={styles.phoneName}>{search1}</Text>
            <Text style={styles.phoneTitle}>
              {data1.data.spotlight?.releaseDate}
            </Text>
          </View>
          {/* Specs */}
          <View style={styles.specsCol}>
            <Text style={styles.specTitle}>Ekran</Text>
            <Text style={styles.specValue}>
              {data1.data.spotlight?.display_size} /{" "}
              {data2.data.spotlight?.display_size}
            </Text>
            <Text style={styles.specTitle}>RAM</Text>
            <Text style={styles.specValue}>
              {data1.data.spotlight?.ram} / {data2.data.spotlight?.ram}
            </Text>
            <Text style={styles.specTitle}>Chipset</Text>
            <Text style={styles.specValue}>
              {data1.data.spotlight?.chipset} / {data2.data.spotlight?.chipset}
            </Text>
            <Text style={styles.specTitle}>Batareya</Text>
            <Text style={styles.specValue}>
              {data1.data.spotlight?.battery_size} /{" "}
              {data2.data.spotlight?.battery_size}
            </Text>
            <Text style={styles.specTitle}>Kamera</Text>
            <Text style={styles.specValue}>
              {data1.data.spotlight?.camera_pixels}MP /{" "}
              {data2.data.spotlight?.camera_pixels}MP
            </Text>
            <Text style={styles.specTitle}>OS</Text>
            <Text style={styles.specValue}>
              {data1.data.spotlight?.os} / {data2.data.spotlight?.os}
            </Text>
          </View>
          {/* Phone 2 */}
          <View style={styles.phoneCol}>
            <Image
              source={{ uri: data2.data.image_url }}
              style={styles.phoneImg}
            />
            <Text style={styles.phoneName}>{search2}</Text>
            <Text style={styles.phoneTitle}>
              {data2.data.spotlight?.releaseDate}
            </Text>
          </View>
        </View>
      )}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1 },
  title: {
    fontSize: 22,
    fontWeight: "bold",
    marginBottom: 16,
    textAlign: "center",
  },
  label: {
    fontWeight: "bold",
    marginTop: 10,
    marginBottom: 4,
    fontSize: 15,
  },
  input: {
    borderWidth: 1,
    borderColor: "#E3E6ED",
    borderRadius: 8,
    padding: 8,
    width: "100%",
    backgroundColor: "#fff",
    marginBottom: 6,
  },
  button: {
    backgroundColor: "#007AFF",
    borderRadius: 8,
    padding: 12,
    alignItems: "center",
    marginBottom: 20,
    marginTop: 10,
  },
  buttonText: { color: "#fff", fontWeight: "bold", fontSize: 16 },
  compareRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: 20,
    gap: 8,
  },
  phoneCol: { flex: 1, alignItems: "center" },
  phoneImg: {
    width: 90,
    height: 120,
    borderRadius: 12,
    marginBottom: 8,
    backgroundColor: "#eee",
  },
  phoneName: {
    fontWeight: "bold",
    fontSize: 14,
    textAlign: "center",
    marginBottom: 4,
  },
  phoneTitle: {
    fontSize: 12,
    color: "#888",
    textAlign: "center",
    marginBottom: 8,
  },
  specsCol: {
    flex: 1.2,
    justifyContent: "center",
    alignItems: "center",
    overflowY: "scroll",
    backgroundColor: "#fff",
    borderRadius: 12,
    padding: 10,
    marginHorizontal: 4,
  },
  specTitle: {
    fontWeight: "bold",
    fontSize: 13,
    marginTop: 8,
    color: "#232A36",
  },
  specValue: {
    fontSize: 13,
    color: "#007AFF",
    marginBottom: 2,
    textAlign: "center",
  },
  searchList: {
    maxHeight: 180,
    backgroundColor: "#fff",
    borderRadius: 8,
    marginBottom: 6,
    borderWidth: 1,
    borderColor: "#eee",
  },
  searchItem: {
    padding: 10,
    borderBottomWidth: 1,
    borderBottomColor: "#f0f0f0",
  },
});
