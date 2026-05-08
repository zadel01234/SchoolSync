import { View, Text, SafeAreaView, StyleSheet, TouchableOpacity } from "react-native";
import { colors } from "../../src/theme/tokens";
import { useRouter } from "expo-router";

export default function ProfileScreen() {
  const router = useRouter();

  return (
    <SafeAreaView style={s.container}>
      <View style={s.header}><Text style={s.title}>Profile</Text></View>
      <View style={s.content}>
        <View style={s.avatar}><Text style={s.avatarText}>DO</Text></View>
        <Text style={s.name}>David Okon</Text>
        <Text style={s.class}>JSS 2B • SS-2024-001</Text>

        {[
          { label: "Personal Info", emoji: "👤" },
          { label: "Notifications", emoji: "🔔" },
          { label: "Theme", emoji: "🎨" },
          { label: "Help & Support", emoji: "❓" },
        ].map((item, i) => (
          <TouchableOpacity key={i} style={s.menuItem} activeOpacity={0.7}>
            <Text style={s.menuEmoji}>{item.emoji}</Text>
            <Text style={s.menuLabel}>{item.label}</Text>
            <Text style={s.menuArrow}>›</Text>
          </TouchableOpacity>
        ))}

        <TouchableOpacity
          style={s.logoutButton}
          onPress={() => router.replace("/(auth)/login")}
          activeOpacity={0.8}
        >
          <Text style={s.logoutText}>Log out</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}

const s = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#fff" },
  header: { padding: 20, borderBottomWidth: 1, borderBottomColor: colors.slate[100] },
  title: { fontSize: 24, fontWeight: "700", color: colors.slate[900] },
  content: { alignItems: "center", padding: 20 },
  avatar: { width: 80, height: 80, borderRadius: 40, backgroundColor: colors.primary[100], justifyContent: "center", alignItems: "center", marginBottom: 12 },
  avatarText: { fontSize: 28, fontWeight: "700", color: colors.primary[600] },
  name: { fontSize: 20, fontWeight: "700", color: colors.slate[900] },
  class: { fontSize: 14, color: colors.slate[500], marginBottom: 28 },
  menuItem: { flexDirection: "row", alignItems: "center", width: "100%", paddingVertical: 14, borderBottomWidth: 1, borderBottomColor: colors.slate[100] },
  menuEmoji: { fontSize: 20, marginRight: 12 },
  menuLabel: { flex: 1, fontSize: 16, color: colors.slate[700] },
  menuArrow: { fontSize: 22, color: colors.slate[400] },
  logoutButton: { marginTop: 28, width: "100%", height: 48, borderRadius: 12, backgroundColor: colors.danger[50], justifyContent: "center", alignItems: "center" },
  logoutText: { fontSize: 16, fontWeight: "600", color: colors.danger[600] },
});
