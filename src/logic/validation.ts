export type ValidationResult = {
  valid: boolean;
  error?: string;
};

export function validateNumber(value: string, min: number, max: number, label: string): ValidationResult {
  const normalized = value.replace(',', '.').trim();
  const numeric = Number(normalized);

  if (!normalized) {
    return { valid: false, error: `Укажите ${label.toLowerCase()}` };
  }

  if (!Number.isFinite(numeric)) {
    return { valid: false, error: 'Введите число' };
  }

  if (numeric < min || numeric > max) {
    return { valid: false, error: `${label} должен быть в диапазоне ${min}-${max}` };
  }

  return { valid: true };
}

export function validateName(value: string): ValidationResult {
  if (value.trim().length < 2) {
    return { valid: false, error: 'Введите имя' };
  }

  return { valid: true };
}

export function validateEmail(value: string): ValidationResult {
  const trimmed = value.trim();
  const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

  if (!trimmed) {
    return { valid: false, error: 'Введите электронную почту' };
  }

  if (!emailPattern.test(trimmed)) {
    return { valid: false, error: 'Проверьте электронную почту' };
  }

  return { valid: true };
}

export function validateConsent(accepted: boolean): ValidationResult {
  if (!accepted) {
    return { valid: false, error: 'Подтвердите согласие, чтобы увидеть результат' };
  }

  return { valid: true };
}
