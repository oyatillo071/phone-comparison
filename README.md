# 📱 PhoneCompare App

A lightweight React Native mobile app for browsing and comparing mobile phone specifications by brand and model.  
This is a **pet project** built for learning purposes using **React Native**, **React Query**, and **ZylaLabs public API**.

---

## 🔧 Features

- 📲 Browse phones by brand
- 🔍 View detailed technical specifications
- 🔁 Compare two phone models
- 🌐 Fetches data from a public API (ZylaLabs)
- 📶 Offline-first pattern using React Query caching
- 🖼️ Placeholder images (no real images provided in API)

---

## 🚫 Note on Images

> The API used (ZylaLabs) does not provide image URLs for phones.  
> Since this project does not include a backend or media storage, default static images are used instead of real phone images.  
> Each phone card displays a placeholder image (`/assets/default-phone.png`) to maintain UI consistency.

---

## 🧑‍💻 Tech Stack

| Tool                                             | Purpose                             |
| ------------------------------------------------ | ----------------------------------- |
| [React Native](https://reactnative.dev/)         | Cross-platform mobile development   |
| [Expo](https://expo.dev/)                        | Development and deployment platform |
| [React Query](https://tanstack.com/query/latest) | Data fetching and caching           |
| [Axios](https://axios-http.com/)                 | API requests                        |
| [ZylaLabs API](https://zylalabs.com)             | Phone data source                   |

---

## 🚀 Getting Started

```bash
# Clone the repo
git clone https://github.com/oyatillo071/phone-compare-app.git
cd phone-compare-app

# Install dependencies
npm install

# Start the Expo server
npx expo start
```

> Make sure you have [Expo CLI](https://docs.expo.dev/get-started/installation/) installed.

---

## 🔑 API Key Setup

> ZylaLabs API requires an API key for access.

1. Create a free account on [https://zylalabs.com](https://zylalabs.com)
2. Go to your selected API (e.g., iPhone Database API)
3. Copy your API key
4. Create a `.env` file in the root of the project:

```env
API_KEY=8722|your_key_here
API_BASE_URL=https://zylalabs.com
```

---

## 🧪 Example Usage

```ts
import { useApiRequest } from "@/hooks/useApiRequest";

const { data, isLoading, error } = useApiRequest({
  queryKey: "phones",
  endpoint: "/api/3622/iphone+database+api/4055/get+phone+by+brand",
  params: { brand_id: 64 },
});
```

---

## 📂 Folder Structure (simplified)

```
src/
├── api/
│   └── request.ts
├── assets/
│   └── default-phone.png
├── components/
│   └── PhoneCard.tsx
│   └── CompareScreen.tsx
├── hooks/
│   └── useApiRequest.ts
├── screens/
│   └── HomeScreen.tsx
├── App.tsx
```

---

## 🧭 Roadmap

- [x] Phone list by brand
- [x] Comparison screen
- [ ] Search functionality
- [ ] Favorites list
- [ ] Dark mode toggle

---

## 📄 License

MIT License. Free to use, fork, and modify for non-commercial purposes.

---

## 🤝 Acknowledgements

- [ZylaLabs](https://zylalabs.com) — For the open API
- [React Native Community](https://reactnative.dev/)
- [TanStack React Query](https://tanstack.com/query)
