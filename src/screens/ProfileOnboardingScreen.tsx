import { useMemo, useState } from 'react'
import { KeyboardAvoidingView, Platform, ScrollView, Text, View } from 'react-native'
import { useSafeAreaInsets } from 'react-native-safe-area-context'
import { useAppState } from '../context/AppStateContext'
import {
  validateBirthDate,
  validateDocumentNumber,
  validateDocumentType,
  validatePhone,
  validateProfileFullName
} from '../utils/profileValidation'
import BaseButton from '../components/ui/BaseButton'
import BaseCheckbox from '../components/ui/BaseCheckbox'
import BaseInput from '../components/ui/BaseInput'
import BaseSelect from '../components/ui/BaseSelect'
import InfoAlert from '../components/ui/InfoAlert'
import ConfirmExitModal from '../components/shared/ConfirmExitModal'
import ArrowLeft from '../assets/img/icons/icon-arrow-left.svg'
import Exit from '../assets/img/icons/icon-exit.svg'

const DOCUMENT_TYPE_OPTIONS = [
  { label: 'DNI', value: 'DNI' },
  { label: 'CE', value: 'CE' },
  { label: 'PAS', value: 'PAS' }
]

export default function ProfileOnboardingScreen() {
  const insets = useSafeAreaInsets()
  const { completeProfile, goToRoute } = useAppState()
  const [fullName, setFullName] = useState('')
  const [documentType, setDocumentType] = useState('')
  const [documentNumber, setDocumentNumber] = useState('')
  const [phone, setPhone] = useState('')
  const [birthDate, setBirthDate] = useState('')
  const [acceptedTerms, setAcceptedTerms] = useState(false)
  const [acceptedPrivacy, setAcceptedPrivacy] = useState(false)
  const [submitted, setSubmitted] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const [showConfirmExit, setShowConfirmExit] = useState(false)
  const [showInfoAlert, setShowInfoAlert] = useState(true)

  const fullNameError = useMemo(() => (submitted ? validateProfileFullName(fullName) : ''), [fullName, submitted])
  const documentTypeError = useMemo(() => (submitted ? validateDocumentType(documentType) : ''), [documentType, submitted])
  const documentNumberError = useMemo(
    () => (submitted ? validateDocumentNumber(documentNumber, documentType) : ''),
    [documentNumber, documentType, submitted]
  )
  const phoneError = useMemo(() => (submitted ? validatePhone(phone) : ''), [phone, submitted])
  const birthDateError = useMemo(() => (submitted ? validateBirthDate(birthDate) : ''), [birthDate, submitted])
  const acceptedTermsError = submitted && !acceptedTerms ? 'Debes aceptar los términos y condiciones.' : ''
  const acceptedPrivacyError = submitted && !acceptedPrivacy ? 'Debes aceptar la política de privacidad.' : ''

  const hasFormErrors = Boolean(
    fullNameError ||
    documentTypeError ||
    documentNumberError ||
    phoneError ||
    birthDateError ||
    acceptedTermsError ||
    acceptedPrivacyError
  )

  const isDisabled = isLoading || hasFormErrors

  const handleSubmit = async () => {
    setSubmitted(true)
    setIsLoading(true)

    await new Promise((resolve) => setTimeout(resolve, 800))

    const currentFullNameError = validateProfileFullName(fullName)
    const currentDocumentTypeError = validateDocumentType(documentType)
    const currentDocumentNumberError = validateDocumentNumber(documentNumber, documentType)
    const currentPhoneError = validatePhone(phone)
    const currentBirthDateError = validateBirthDate(birthDate)
    const currentAcceptedTermsError = !acceptedTerms
    const currentAcceptedPrivacyError = !acceptedPrivacy

    const hasErrors = Boolean(
      currentFullNameError ||
      currentDocumentTypeError ||
      currentDocumentNumberError ||
      currentPhoneError ||
      currentBirthDateError ||
      currentAcceptedTermsError ||
      currentAcceptedPrivacyError
    )

    if (hasErrors) {
      setIsLoading(false)
      return
    }

    completeProfile(fullName)
    setIsLoading(false)
  }

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      className="flex-1 bg-kambista-appBg]"
      style={{ paddingTop: insets.top }}
    >
      <ScrollView contentContainerStyle={{ padding: 24, paddingTop: 0, paddingBottom: 40 }}>
        <View className="space-y-6">
          <View className="flex-row items-center justify-between h-[36px]">
            <View className="flex-row items-center gap-3">
              <ArrowLeft width={20} height={20} onPress={() => setShowConfirmExit(true)} />
            </View>
            <View>
              <Text className="text-lg font-semibold text-kambista-navy">Completa tus datos</Text>
            </View>
            <View>
              <Exit width={20} height={20} onPress={() => setShowConfirmExit(true)} />
            </View>
          </View>

          <View className="items-center">
            <Text className="text-base text-kambista-navy mt-8 text-center">
              Completa tus datos{" "}
              <Text className="font-bold">
                como figuran en tu documento de identidad
              </Text>
            </Text>
          </View>

          <View className="space-y-4">
            <View>
              <BaseInput
                label="Nombres completos"
                value={fullName}
                onChangeText={setFullName}
                placeholder="Escribe tus nombres y apellidos"
                error={fullNameError}
              />
            </View>
            <View className="flex-row gap-x-2">
              <View className="flex-[0.4]">
                <BaseSelect
                  label="Documento"
                  options={DOCUMENT_TYPE_OPTIONS}
                  selectedValue={documentType}
                  onValueChange={setDocumentType}
                  placeholder="Tipo"
                  error={documentTypeError}
                />
              </View>
              <View className="flex-[0.6]">
                <BaseInput
                  label="N° de documento"
                  value={documentNumber}
                  onChangeText={setDocumentNumber}
                  placeholder="N° de documento"
                  error={documentNumberError}
                />
              </View>
            </View>
              {showInfoAlert ? (
                <InfoAlert
                  message="Tu documento de identidad debe coincidir con tus datos para evitar inconvenientes al momento de hacer una primera operación"
                />
              ) : null}
            <View className="flex-row gap-x-2">
              <View className="flex-1">
                <BaseInput
                  label="Celular"
                  value={phone}
                  onChangeText={setPhone}
                  placeholder="N° de celular"
                  keyboardType="phone-pad"
                  error={phoneError}
                />
              </View>
              <View className="flex-1">
                <BaseInput
                  label="Fecha de nacimiento"
                  value={birthDate}
                  onChangeText={setBirthDate}
                  placeholder="DD/MM/AAAA"
                  error={birthDateError}
                />
              </View>
            </View>
            <View className="mb-8">
              <BaseCheckbox
                label={
                  <>
                    He leído y acepto los{' '}
                    <Text className="font-bold">Términos y condiciones</Text>
                  </>
                }
                checked={acceptedTerms}
                onPress={() => setAcceptedTerms((current) => !current)}
                error={acceptedTermsError}
              />
              <BaseCheckbox
                label={
                  <>
                    Acepto de manera expresa e informada la{' '}
                    <Text className="font-bold">Política de Tratamiento de datos personales de Kambista</Text>
                  </>
                }
                checked={acceptedPrivacy}
                onPress={() => setAcceptedPrivacy((current) => !current)}
                error={acceptedPrivacyError}
              />
            </View>
            <View>
              <BaseButton label={isLoading ? 'Registrando...' : 'REGISTRARME'} onPress={handleSubmit} disabled={isDisabled} loading={isLoading} />
            </View>
          </View>
        </View>
      </ScrollView>

      <ConfirmExitModal
        visible={showConfirmExit}
        message="¿Deseas salir sin completar tus datos?"
        confirmText="Aceptar"
        cancelText="Cancelar"
        onConfirm={() => {
          setShowConfirmExit(false)
          goToRoute('login')
        }}
        onCancel={() => setShowConfirmExit(false)}
      />
    </KeyboardAvoidingView>
  )
}