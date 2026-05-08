import { View, Text, TextInput, TouchableOpacity, StyleSheet, SafeAreaView, KeyboardAvoidingView, Platform } from "react-native";
import { useRouter } from "expo-router";
import { useState } from "react";
import { colors, typography } from "../../src/theme/tokens";

export default function LoginScreen() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = () => {
    // TODO: Implement real auth
    router.replace("/(tabs)");
  };

  return (
    <SafeAreaView style={styles.container}>
      <KeyboardAvoidingView behavior={Platform.OS === "ios" ? "padding" : "height"} style={styles.content}>
        {/* Logo */}
        <View style={styles.logoContainer}>
          <View style={styles.logoIcon}>
            <Text style={styles.logoEmoji}>🎓</Text>
          </View>
          <Text style={styles.logoText}>SchoolSync</Text>
        </View>

        {/* Form */}
        <View style={styles.form}>
          <Text style={styles.heading}>Welcome back</Text>
          <Text style={styles.subheading}>Enter your credentials to continue</Text>

          <View style={styles.inputGroup}>
            <Text style={styles.label}>Email</Text>
            <TextInput
              style={styles.input}
              placeholder="you@school.com"
              placeholderTextColor={colors.slate[400]}
              value={email}
              onChangeText={setEmail}
              keyboardType="email-address"
              autoCapitalize="none"
            />
          </View>

          <View style={styles.inputGroup}>
            <Text style={styles.label}>Password</Text>
            <TextInput
              style={styles.input}
              placeholder="Enter your password"
              placeholderTextColor={colors.slate[400]}
              value={password}
              onChangeText={setPassword}
              secureTextEntry
            />
          </View>

          <TouchableOpacity style={styles.primaryButton} onPress={handleLogin} activeOpacity={0.8}>
            <Text style={styles.primaryButtonText}>Sign in</Text>
          </TouchableOpacity>

          <TouchableOpacity style={styles.link}>
            <Text style={styles.linkText}>Forgot password?</Text>
          </TouchableOpacity>
        </View>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#fff" },
  content: { flex: 1, justifyContent: "center", paddingHorizontal: 24 },
  logoContainer: { alignItems: "center", marginBottom: 40 },
  logoIcon: { width: 56, height: 56, borderRadius: 16, backgroundColor: colors.primary[600], justifyContent: "center", alignItems: "center", marginBottom: 12 },
  logoEmoji: { fontSize: 28 },
  logoText: { fontSize: 24, fontWeight: "700", color: colors.slate[900] },
  form: { gap: 16 },
  heading: { fontSize: 24, fontWeight: "700", color: colors.slate[900] },
  subheading: { fontSize: 14, color: colors.slate[500], marginBottom: 8 },
  inputGroup: { gap: 6 },
  label: { fontSize: 14, fontWeight: "500", color: colors.slate[700] },
  input: { height: 48, borderWidth: 1, borderColor: colors.slate[200], borderRadius: 12, paddingHorizontal: 16, fontSize: 16, color: colors.slate[900], backgroundColor: "#fff" },
  primaryButton: { height: 52, borderRadius: 12, backgroundColor: colors.primary[600], justifyContent: "center", alignItems: "center", marginTop: 8 },
  primaryButtonText: { fontSize: 16, fontWeight: "600", color: "#fff" },
  link: { alignItems: "center", marginTop: 8 },
  linkText: { fontSize: 14, fontWeight: "500", color: colors.primary[600] },
});
