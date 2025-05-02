import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { Link } from 'expo-router';

export default function Home() {
  return (
    <View style={styles.container}>
      <View style={styles.contentContainer}>
        <Text style={styles.title}>MRONJ風險評估</Text>
        
        <Text style={styles.introduction}>
          本網頁用於評估患者發生藥物相關性顎骨壞死(MRONJ)的風險:{'\n\n'}
          透過收集患者的用藥史和相關病史，我們可以提供個人化衛生教育。{'\n\n'}
          請注意：本網站的風險評估結果僅供參考，應根據醫療專業人員的判斷制定治療計畫。
        </Text>

        <Link href="/consent" asChild>
          <TouchableOpacity style={styles.agreeButton}>
            <Text style={styles.buttonText}>開始評估</Text>
          </TouchableOpacity>
        </Link>
      </View>
      
      <Text style={styles.version}>版本 1.0.0</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#ffffff',
    justifyContent: 'space-between',
  },
  contentContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    gap: 30,
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#333',
    textAlign: 'center',
  },
  introduction: {
    fontSize: 16,
    lineHeight: 24,
    color: '#333',
    textAlign: 'center',
    paddingHorizontal: 20,
  },
  agreeButton: {
    backgroundColor: '#007AFF',
    padding: 15,
    borderRadius: 10,
    width: '80%',
    alignItems: 'center',
  },
  buttonText: {
    color: 'white',
    fontSize: 18,
    fontWeight: '600',
  },
  version: {
    color: '#666',
    fontSize: 14,
    textAlign: 'center',
    marginBottom: 10,
  },
});
