import { useState } from 'react';
import { legalLinkItems } from '../data/legalLinks';
import { validateConsent, validateEmail, validateName } from '../logic/validation';

type LeadGateProps = {
  onSubmit: (lead: { name: string; email: string; consentAccepted: boolean }) => void;
};

export function LeadGate({ onSubmit }: LeadGateProps) {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [consentAccepted, setConsentAccepted] = useState(false);
  const [errors, setErrors] = useState<Record<string, string>>({});

  function submit() {
    const nextErrors: Record<string, string> = {};
    const nameResult = validateName(name);
    const emailResult = validateEmail(email);
    const consentResult = validateConsent(consentAccepted);

    if (!nameResult.valid) nextErrors.name = nameResult.error ?? '';
    if (!emailResult.valid) nextErrors.email = emailResult.error ?? '';
    if (!consentResult.valid) nextErrors.consent = consentResult.error ?? '';

    setErrors(nextErrors);

    if (Object.keys(nextErrors).length === 0) {
      onSubmit({ name: name.trim(), email: email.trim(), consentAccepted });
    }
  }

  return (
    <section className="screen lead-screen">
      <div className="screen-heading">
        <h1>
          Последний шаг.
          <span className="lead-title-break">Введите имя и почту, чтобы открыть ваш результат</span>
        </h1>
      </div>

      <div className="lead-form">
        <label>
          Имя
          <input
            type="text"
            autoComplete="name"
            placeholder="Ваше имя"
            value={name}
            onChange={(event) => {
              setName(event.target.value);
              setErrors((current) => ({ ...current, name: '' }));
            }}
          />
          {errors.name ? <span className="field-error">{errors.name}</span> : null}
        </label>

        <label>
          Почта
          <input
            type="email"
            autoComplete="email"
            placeholder="Ваша почта"
            value={email}
            onChange={(event) => {
              setEmail(event.target.value);
              setErrors((current) => ({ ...current, email: '' }));
            }}
          />
          {errors.email ? <span className="field-error">{errors.email}</span> : null}
        </label>

        <p className="lead-note">Почта нужна только для входа, писем не отправляем.</p>

        <label className="consent-row">
          <input
            type="checkbox"
            checked={consentAccepted}
            onChange={(event) => {
              setConsentAccepted(event.target.checked);
              setErrors((current) => ({ ...current, consent: '' }));
            }}
          />
          <span>
            Я принимаю оферту, политику конфиденциальности и согласие на обработку персональных данных.
          </span>
        </label>
        {errors.consent ? <span className="field-error">{errors.consent}</span> : null}

        <div className="legal-links compact">
          {legalLinkItems.map((item) => (
            <a key={item.href} href={item.href} target="_blank" rel="noreferrer">
              {item.label}
            </a>
          ))}
        </div>

        <button className="primary-button sticky-action" type="button" onClick={submit}>
          Показать результат
        </button>
      </div>
    </section>
  );
}
