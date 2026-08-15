import { StyleSheet } from "react-native";
import { themes } from "../../global/themes";

export const style = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: themes.colors.bgScreen,
  },
  scrollContent: {
    flexGrow: 1,
    justifyContent: "center",
    padding: 24,
  },
  content: {
    width: "100%",
    alignSelf: "center",
    maxWidth: 460,
  },
  appTitle: {
    color: "#ffffff",
    fontSize: 30,
    fontWeight: "700",
    textAlign: "center",
  },
  appSubtitle: {
    color: "#cbd5e1",
    fontSize: 15,
    textAlign: "center",
    marginTop: 6,
    marginBottom: 28,
  },
  formCard: {
    backgroundColor: "#ffffff",
    borderRadius: 18,
    padding: 22,
    shadowColor: "#000000",
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.2,
    shadowRadius: 14,
    elevation: 8,
  },
  formTitle: {
    color: "#1e293b",
    fontSize: 21,
    fontWeight: "700",
    marginBottom: 10,
  },
  label: {
    color: "#334155",
    fontSize: 14,
    fontWeight: "600",
    marginTop: 14,
    marginBottom: 6,
  },
  input: {
    backgroundColor: "#f8fafc",
    borderColor: "#cbd5e1",
    borderRadius: 10,
    borderWidth: 1,
    color: "#0f172a",
    fontSize: 16,
    minHeight: 48,
    paddingHorizontal: 13,
  },
  rememberRow: {
    alignItems: "center",
    flexDirection: "row",
    marginTop: 20,
  },
  checkbox: {
    alignItems: "center",
    borderColor: "#94a3b8",
    borderRadius: 5,
    borderWidth: 1,
    height: 22,
    justifyContent: "center",
    marginRight: 9,
    width: 22,
  },
  checkboxChecked: {
    backgroundColor: themes.colors.primary,
    borderColor: themes.colors.primary,
  },
  checkmark: {
    color: "#ffffff",
    fontWeight: "700",
  },
  rememberText: {
    color: "#475569",
    fontSize: 14,
  },
  connectButton: {
    alignItems: "center",
    backgroundColor: themes.colors.primary,
    borderRadius: 12,
    justifyContent: "center",
    marginTop: 18,
    minHeight: 54,
    shadowColor: "#000000",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.22,
    shadowRadius: 6,
    elevation: 5,
  },
  connectButtonDisabled: {
    opacity: 0.7,
  },
  connectButtonText: {
    color: "#ffffff",
    fontSize: 17,
    fontWeight: "700",
  },
});
