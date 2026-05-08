import { View, Text, ScrollView, StyleSheet, SafeAreaView } from "react-native";
import { colors } from "../../src/theme/tokens";

export default function HomeScreen() {
  return (
    <SafeAreaView style={styles.container}>
      <ScrollView contentContainerStyle={styles.scroll} showsVerticalScrollIndicator={false}>
        {/* Header */}
        <View style={styles.header}>
          <View style={styles.avatar}><Text style={styles.avatarText}>DO</Text></View>
          <View>
            <Text style={styles.greeting}>Good Morning, David 👋</Text>
            <Text style={styles.subtitle}>JSS 2B • 2025/2026 First Term</Text>
          </View>
        </View>

        {/* Quick Stats */}
        <View style={styles.statsRow}>
          <View style={styles.statCard}>
            <Text style={styles.statValue}>92%</Text>
            <Text style={styles.statLabel}>Attendance</Text>
          </View>
          <View style={styles.statCard}>
            <Text style={[styles.statValue, { color: colors.warning[600] }]}>3</Text>
            <Text style={styles.statLabel}>Pending</Text>
          </View>
          <View style={styles.statCard}>
            <Text style={[styles.statValue, { color: colors.primary[600] }]}>B+</Text>
            <Text style={styles.statLabel}>Avg Grade</Text>
          </View>
        </View>

        {/* Today's Timetable */}
        <Text style={styles.sectionTitle}>Today&apos;s Timetable</Text>
        {[
          { subject: "Mathematics", time: "8:00 – 8:45", teacher: "Mr. Adeyemi", color: colors.primary[500], active: true },
          { subject: "English", time: "8:45 – 9:30", teacher: "Mrs. Obi", color: colors.success[500], active: false },
          { subject: "Basic Science", time: "10:00 – 10:45", teacher: "Mr. Nnamdi", color: colors.warning[500], active: false },
        ].map((entry, i) => (
          <View key={i} style={[styles.timetableItem, entry.active && styles.timetableActive]}>
            <View style={[styles.timetableBar, { backgroundColor: entry.color }]} />
            <View style={styles.timetableContent}>
              <View style={styles.timetableRow}>
                <Text style={styles.timetableSubject}>{entry.subject}</Text>
                {entry.active && <View style={styles.activeBadge}><Text style={styles.activeBadgeText}>Now</Text></View>}
              </View>
              <Text style={styles.timetableMeta}>{entry.teacher} • {entry.time}</Text>
            </View>
          </View>
        ))}

        {/* Announcements */}
        <Text style={styles.sectionTitle}>Announcements</Text>
        {[
          { title: "Mid-term exam timetable released", time: "2h ago" },
          { title: "PTA meeting rescheduled to Friday", time: "5h ago" },
        ].map((a, i) => (
          <View key={i} style={styles.announcementItem}>
            <View style={styles.announcementDot} />
            <View style={{ flex: 1 }}>
              <Text style={styles.announcementTitle}>{a.title}</Text>
              <Text style={styles.announcementTime}>{a.time}</Text>
            </View>
          </View>
        ))}
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#fff" },
  scroll: { padding: 20, paddingBottom: 40 },
  header: { flexDirection: "row", alignItems: "center", gap: 12, marginBottom: 24 },
  avatar: { width: 52, height: 52, borderRadius: 26, backgroundColor: colors.primary[100], justifyContent: "center", alignItems: "center" },
  avatarText: { fontSize: 18, fontWeight: "700", color: colors.primary[600] },
  greeting: { fontSize: 20, fontWeight: "700", color: colors.slate[900] },
  subtitle: { fontSize: 13, color: colors.slate[500], marginTop: 2 },
  statsRow: { flexDirection: "row", gap: 12, marginBottom: 28 },
  statCard: { flex: 1, borderRadius: 16, borderWidth: 1, borderColor: colors.slate[200], padding: 16, alignItems: "center" },
  statValue: { fontSize: 22, fontWeight: "700", color: colors.slate[900] },
  statLabel: { fontSize: 11, color: colors.slate[500], marginTop: 4 },
  sectionTitle: { fontSize: 17, fontWeight: "700", color: colors.slate[900], marginBottom: 12, marginTop: 4 },
  timetableItem: { flexDirection: "row", alignItems: "center", gap: 12, borderRadius: 12, padding: 14, marginBottom: 8, borderWidth: 1, borderColor: colors.slate[100] },
  timetableActive: { backgroundColor: colors.primary[50], borderColor: colors.primary[200] },
  timetableBar: { width: 4, height: 40, borderRadius: 4 },
  timetableContent: { flex: 1 },
  timetableRow: { flexDirection: "row", alignItems: "center", gap: 8 },
  timetableSubject: { fontSize: 15, fontWeight: "600", color: colors.slate[900] },
  timetableMeta: { fontSize: 12, color: colors.slate[500], marginTop: 2 },
  activeBadge: { backgroundColor: colors.primary[600], borderRadius: 6, paddingHorizontal: 8, paddingVertical: 2 },
  activeBadgeText: { fontSize: 10, fontWeight: "600", color: "#fff" },
  announcementItem: { flexDirection: "row", alignItems: "flex-start", gap: 10, marginBottom: 14 },
  announcementDot: { width: 8, height: 8, borderRadius: 4, backgroundColor: colors.primary[500], marginTop: 6 },
  announcementTitle: { fontSize: 14, fontWeight: "500", color: colors.slate[900] },
  announcementTime: { fontSize: 12, color: colors.slate[400], marginTop: 2 },
});
