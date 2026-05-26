import { useMemo, useState } from 'react'
import { Pressable, ScrollView, Text, View } from 'react-native'
import { useAppState } from '../context/AppStateContext'
import { useExchange } from '../context/ExchangeContext'
import BaseButton from '../components/ui/BaseButton'
import FileUpload from '../components/ui/FileUpload'
import AddBankAccountDrawer from '../components/shared/AddBankAccountDrawer'
import BankAccountsModal from '../components/shared/BankAccountsModal'

const HOME_BANKS = ['BCP', 'Interbank', 'BanBif', 'Scotia']
const RECEIVER_ACCOUNTS = ['Cuenta corriente', 'Cuenta de ahorros']
const SOURCE_FUNDS = ['Ahorros', 'Sueldo', 'Venta de activos']

export default function OperationFlowScreen() {
  const { finishReceiptFlow, goToRoute } = useAppState()
  const { currentRates } = useExchange()
  const [step, setStep] = useState(1)
  const [senderBank, setSenderBank] = useState('')
  const [receiverAccount, setReceiverAccount] = useState('')
  const [sourceFunds, setSourceFunds] = useState('')
  const [receiptUploaded, setReceiptUploaded] = useState(false)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [bankDrawerVisible, setBankDrawerVisible] = useState(false)
  const [accountsModalVisible, setAccountsModalVisible] = useState(false)

  const isStep1Valid = senderBank && receiverAccount && sourceFunds

  const estimatedSend = '$ 100.00'
  const estimatedReceive = 'S/ 353.00'

  const headerText = useMemo(() => {
    if (step === 1) return 'Completa los datos de tu operación'
    if (step === 2) return 'Transfiere a Kambista'
    return 'Envía tu constancia'
  }, [step])

  const handleNext = async () => {
    if (step === 1) {
      if (!isStep1Valid) return
      setStep(2)
      return
    }

    if (step === 2) {
      setStep(3)
      return
    }

    if (step === 3) {
      if (!receiptUploaded) return
      setIsSubmitting(true)
      await new Promise((resolve) => setTimeout(resolve, 800))
      setIsSubmitting(false)
      finishReceiptFlow()
    }
  }

  const progressDots = [1, 2, 3].map((value) => (
    <View
      key={value}
      className={`h-3 w-3 rounded-full ${step >= value ? 'bg-kambista-navy' : 'bg-neutral-grayBorder'}`}
    />
  ))

  return (
    <ScrollView className="flex-1 bg-kambista-appBg px-6 pt-8" contentContainerStyle={{ paddingBottom: 40 }}>
      <View className="rounded-[28px] bg-white p-6 shadow-xl shadow-black/5 mb-6">
        <View className="flex-row items-center justify-between mb-4">
          <Text className="text-xl font-bold text-kambista-navy">{headerText}</Text>
          <View className="flex-row gap-2">{progressDots}</View>
        </View>

        {step === 1 ? (
          <View className="space-y-5">
            <View className="rounded-3xl bg-kambista-appBg p-4">
              <Text className="text-sm text-neutral-grayText mb-2">Tú envías</Text>
              <Text className="text-lg font-semibold text-kambista-navy">{estimatedSend}</Text>
            </View>
            <View className="rounded-3xl bg-kambista-appBg p-4">
              <Text className="text-sm text-neutral-grayText mb-2">Tú recibes</Text>
              <Text className="text-lg font-semibold text-kambista-navy">{estimatedReceive}</Text>
            </View>
            <View className="rounded-3xl bg-kambista-appBg p-4">
              <Text className="text-sm text-neutral-grayText mb-4">Tipo de cambio</Text>
              <Text className="text-lg font-semibold text-kambista-navy">S/ {currentRates?.ask.toFixed(2) ?? '---'}</Text>
            </View>

            <View>
              <Text className="text-sm font-semibold text-kambista-navy mb-3">¿Desde qué banco nos envías?</Text>
              <Pressable
                onPress={() => setBankDrawerVisible(true)}
                className="rounded-3xl border border-neutral-grayBorder bg-kambista-appBg px-4 py-4"
              >
                <Text className="text-base text-kambista-navy">{senderBank || 'Seleccionar banco'}</Text>
              </Pressable>
            </View>

            <View>
              <Text className="text-sm font-semibold text-kambista-navy mb-3">¿En qué cuenta recibirás?</Text>
              <Pressable
                onPress={() => setAccountsModalVisible(true)}
                className="rounded-3xl border border-neutral-grayBorder bg-kambista-appBg px-4 py-4"
              >
                <Text className="text-base text-kambista-navy">{receiverAccount || 'Seleccionar cuenta'}</Text>
              </Pressable>
            </View>

            <View>
              <Text className="text-sm font-semibold text-kambista-navy mb-3">Origen de fondos</Text>
              <View className="space-y-3">
                {SOURCE_FUNDS.map((source) => (
                  <Pressable
                    key={source}
                    onPress={() => setSourceFunds(source)}
                    className={`rounded-3xl border px-4 py-3 ${sourceFunds === source ? 'border-kambista-mint bg-kambista-mint/20' : 'border-neutral-grayBorder bg-kambista-appBg'}`}
                  >
                    <Text className={`text-base ${sourceFunds === source ? 'text-kambista-navy' : 'text-neutral-darkText'}`}>{source}</Text>
                  </Pressable>
                ))}
              </View>
            </View>
          </View>
        ) : step === 2 ? (
          <View className="space-y-5">
            <View className="rounded-3xl bg-kambista-appBg p-4">
              <Text className="text-sm text-neutral-grayText mb-2">Instrucciones de transferencia</Text>
              <Text className="text-base text-kambista-navy">Transfiere desde tu app bancaria usando el código de operación que se generará.</Text>
            </View>
            <View className="rounded-3xl border border-neutral-grayBorder bg-white p-4">
              <Text className="text-sm text-neutral-grayText">Banco</Text>
              <Text className="mt-2 text-lg font-semibold text-kambista-navy">Kambista SAC</Text>
              <Text className="mt-4 text-sm text-neutral-grayText">Cuenta</Text>
              <Text className="mt-2 text-lg font-semibold text-kambista-navy">2010100000000000</Text>
              <Text className="mt-4 text-sm text-neutral-grayText">RUC</Text>
              <Text className="mt-2 text-lg font-semibold text-kambista-navy">20601708141</Text>
            </View>
          </View>
        ) : (
          <View className="space-y-5">
            <View className="rounded-3xl bg-kambista-appBg p-4">
              <Text className="text-sm text-neutral-grayText mb-2">Adjunta tu constancia</Text>
              <Text className="text-base text-kambista-navy">Sube el comprobante de tu transferencia para verificar la operación.</Text>
            </View>
            <FileUpload
              label="Constancia de transferencia"
              fileName={receiptUploaded ? 'comprobante.pdf' : undefined}
              onUploadPress={() => setReceiptUploaded(true)}
            />
          </View>
        )}
      </View>

      <View className="px-6">
        <BaseButton
          label={step === 1 ? 'CONTINUAR' : step === 2 ? 'YA HICE MI TRANSFERENCIA' : isSubmitting ? 'ENVIANDO...' : 'ENVIAR CONSTANCIA'}
          onPress={handleNext}
          disabled={step === 1 ? !isStep1Valid : step === 3 ? !receiptUploaded || isSubmitting : false}
        />

        <Pressable onPress={() => goToRoute('dashboard')} className="mt-4 items-center">
          <Text className="text-sm text-neutral-darkText underline">Volver al panel</Text>
        </Pressable>
      </View>

      <AddBankAccountDrawer
        visible={bankDrawerVisible}
        accounts={HOME_BANKS}
        onSelect={(account) => {
          setSenderBank(account)
          setBankDrawerVisible(false)
        }}
        onClose={() => setBankDrawerVisible(false)}
      />

      <BankAccountsModal
        visible={accountsModalVisible}
        accounts={RECEIVER_ACCOUNTS}
        selectedAccount={receiverAccount}
        onSelect={(account) => {
          setReceiverAccount(account)
          setAccountsModalVisible(false)
        }}
        onClose={() => setAccountsModalVisible(false)}
      />
    </ScrollView>
  )
}
