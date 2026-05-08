import { View, Text, SafeAreaView, StyleSheet } from "react-native";
import { colors } from "../../src/theme/tokens";

export default function AssignmentsScreen() {
  return (
    <SafeAreaView style={s.container}>
      <View style={s.header}><Text style={s.title}>Assignments</Text><Text style={s.sub}>Your pending and completed work</Text></View>
      <View style={s.placeholder}><Text style={s.emoji}>📝</Text><Text style={s.placeholderText}>Assignment list coming soon</Text></View>
    </SafeAreaView>
  );
}

const s = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#fff" },
  header: { padding: 20, borderBottomWidth: 1, borderBottomColor: colors.slate[100] },
  title: { fontSize: 24, fontWeight: "700", color: colors.slate[900] },
  sub: { fontSize: 14, color: colors.slate[500], marginTop: 4 },
  placeholder: { flex: 1, justifyContent: "center", alignItems: "center" },
  emoji: { fontSize: 48, marginBottom: 12 },
  placeholderText: { fontSize: 16, color: colors.slate[400] },
});
