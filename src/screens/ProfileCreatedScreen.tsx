import { ScrollView, Text, View } from 'react-native'
import { useAppState } from '../context/AppStateContext'
import Congrats from '../assets/img/illustrations/hand-holding-phone.svg'     
import BaseButton from '../components/ui/BaseButton'

export default function ProfileCreatedScreen() {
  const { user, goToRoute } = useAppState()

  return (
    <ScrollView className="flex-1 bg-kambista-appBg px-6" contentContainerStyle={{ flexGrow: 1, justifyContent: 'center', paddingBottom: 40 }}>
      <View className="flex-1 shadow-xl shadow-black/5 items-center justify-center">
        <View className="mb-6 flex-row items-center gap-3">
          <Congrats />
        </View>

        <Text className="text-3xl font-bold text-kambista-navy mb-4 text-center">
          ¡Felicitaciones {user?.displayName ?? 'Usuario'}, tu perfil ha sido creado!
        </Text>
        
        <Text className="text-base text-neutral-darkText text-center mb-8">
          Ya puedes empezar a Kambiar con la mejor tasa del mercado.
        </Text>

        <BaseButton label="CONTINUAR" onPress={() => goToRoute('dashboard')} />
      </View>
    </ScrollView>
  )
}