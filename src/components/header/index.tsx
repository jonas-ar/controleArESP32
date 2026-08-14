import { Text, TouchableOpacity, View } from "react-native";
import { style } from "../../pages/login/styles";

type HeaderProps = {
  title: string;
  subtitle?: string;
  onBack?: () => void;
  withTopSpacing?: boolean;
};

export default function Header({ title, subtitle, onBack, withTopSpacing = false }: HeaderProps) {
  return (
    <View style={[style.header, withTopSpacing && style.headerWithTopSpacing]}>
      {onBack && (
        <TouchableOpacity style={style.backButton} onPress={onBack} accessibilityLabel="Voltar para a conexão">
          <Text style={style.backButtonText}>‹</Text>
        </TouchableOpacity>
      )}
      <Text style={style.headerTitle}>{title}</Text>
      {!!subtitle && <Text style={style.headerSubtitle}>{subtitle}</Text>}
    </View>
  );
}
