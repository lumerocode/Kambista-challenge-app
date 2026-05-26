export const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
export const passwordRegex = /^(?=.*[A-Za-z])(?=.*\d).{8,}$/

export function validateEmail(value: string) {
  const trimmed = value.trim()
  if (!trimmed) return 'El correo electrónico es requerido.'
  if (!emailRegex.test(trimmed)) return 'Ingresa un formato de correo válido.'
  return ''
}

export function validatePassword(value: string) {
  if (!value) return 'La contraseña es requerida.'
  if (!passwordRegex.test(value)) {
    return 'Debe tener mínimo 8 caracteres, incluyendo una letra y un número.'
  }
  return ''
}

export function normalizeLoginCredentials(email: string, password: string) {
  return {
    email: email.trim().toLowerCase(),
    password
  }
}
