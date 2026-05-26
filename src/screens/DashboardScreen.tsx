import { useState } from 'react'
import { ScrollView, View } from 'react-native'
import { useAppState } from '../context/AppStateContext'
import DashboardFooter from '../components/dashboard/DashboardFooter'
import ExchangeScreen from '../components/ExchangeScreen'

export default function DashboardScreen() {
  const { startOperationFlow, logout, user } = useAppState()
  const [menuVisible, setMenuVisible] = useState(false)

  return (
    <View className="flex-1 bg-kambista-appBg">
      <ScrollView className="flex-1" contentContainerStyle={{ paddingBottom: 100 }}>
        <View>
          <ExchangeScreen />
        </View>
      </ScrollView>
      <DashboardFooter />
    </View>
  )
}
