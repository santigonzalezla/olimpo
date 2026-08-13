import { useState } from 'react';
import { actions } from 'astro:actions';
import { toast, Toaster } from 'sonner';
import styles from './ContactForm.module.css';

export default function ContactForm() {
  const [loading, setLoading] = useState(false);

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setLoading(true);

    const formData = new FormData(e.currentTarget);
    const { error } = await actions.contact(formData);

    if (error) {
      toast.error('Ocurrió un error. Por favor intenta de nuevo.');
    } else {
      toast.success('¡Mensaje enviado! Nos pondremos en contacto pronto.');
      (e.target as HTMLFormElement).reset();
    }

    setLoading(false);
  }

  return (
    <>
      <Toaster position="bottom-right" richColors />
      <div className={styles.formBox}>
        <form className={styles.contactForm} onSubmit={handleSubmit}>
          <input
            className={styles.field}
            type="text"
            name="nombre"
            placeholder="Nombre"
            required
          />
          <input
            className={styles.field}
            type="email"
            name="email"
            placeholder="Email"
            required
          />
          <div className={styles.row}>
            <input
              className={styles.field}
              type="tel"
              name="telefono"
              placeholder="Teléfono"
            />
            <div className={styles.selectWrap}>
              <select className={`${styles.field} ${styles.select}`} name="tipo" required defaultValue="">
                <option value="" disabled>Tipo de apartamento</option>
                <option value="studio">Apartaestudio</option>
                <option value="3hab">3 Alcobas</option>
              </select>
              <svg className={styles.selectArrow} xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                <path d="m6 9 6 6 6-6"/>
              </svg>
            </div>
          </div>
          <textarea
            className={`${styles.field} ${styles.textarea}`}
            name="mensaje"
            placeholder="Mensaje"
          />
          <label className={styles.consent}>
            <input
              className={styles.consentCheckbox}
              type="checkbox"
              name="autorizacionDatos"
              required
            />
            <span>
              Acepto la{' '}
              <a href="/politica-tratamiento-datos">
                Política de Tratamiento de Datos
              </a>
            </span>
          </label>
          <button type="submit" className={styles.submit} disabled={loading}>
            {loading ? 'Enviando...' : 'Enviar Mensaje'}
            {!loading && (
              <svg className={styles.submitIcon} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M5 12h14M12 5l7 7-7 7"/>
              </svg>
            )}
          </button>
        </form>
      </div>
    </>
  );
}
