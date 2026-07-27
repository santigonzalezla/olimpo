import {ActionError, defineAction} from 'astro:actions';
import {z} from 'astro:schema';
import {Resend} from 'resend';

const resend = new Resend(import.meta.env.RESEND_API_KEY);

export const server = {
    contact: defineAction({
        accept: 'form',
        input: z.object({
            nombre: z.string().min(1, 'El nombre es requerido'),
            email: z.string().email('Email inválido'),
            telefono: z.string().optional(),
            tipo: z.string().min(1, 'Selecciona un tipo de apartamento'),
            mensaje: z.string().optional()
        }),
        handler: async ({nombre, email, telefono, tipo, mensaje}) =>
        {
            const tipoLabel = tipo === 'studio' ? 'Apartaestudio' : '3 Alcobas';

            const {error: emailError} = await resend.emails.send({
                from: 'Olimpo by IN Constructora <onboarding@resend.dev>',
                to: ['info@inconstructora.com.co'],
                subject: `Nuevo lead Olimpo: ${nombre}`,
                html: `
          <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
            <h2 style="color: #1a3a5c; border-bottom: 2px solid #1a3a5c; padding-bottom: 8px;">
              Nuevo contacto desde la landing de Olimpo
            </h2>
            <table style="width: 100%; border-collapse: collapse; margin-top: 16px;">
              <tr>
                <td style="padding: 10px; background: #f4f6f8; font-weight: bold; width: 35%;">Nombre</td>
                <td style="padding: 10px;">${nombre}</td>
              </tr>
              <tr>
                <td style="padding: 10px; background: #f4f6f8; font-weight: bold;">Email</td>
                <td style="padding: 10px;"><a href="mailto:${email}">${email}</a></td>
              </tr>
              <tr>
                <td style="padding: 10px; background: #f4f6f8; font-weight: bold;">Teléfono</td>
                <td style="padding: 10px;">${telefono || '—'}</td>
              </tr>
              <tr>
                <td style="padding: 10px; background: #f4f6f8; font-weight: bold;">Interés</td>
                <td style="padding: 10px;">${tipoLabel}</td>
              </tr>
              ${mensaje ? `
              <tr>
                <td style="padding: 10px; background: #f4f6f8; font-weight: bold;">Mensaje</td>
                <td style="padding: 10px;">${mensaje}</td>
              </tr>` : ''}
            </table>
          </div>
        `
            });

            if (emailError) {
                throw new ActionError({code: 'INTERNAL_SERVER_ERROR', message: emailError.message});
            }

            const portalId = import.meta.env.HUBSPOT_PORTAL_ID;
            const formGuid = import.meta.env.HUBSPOT_FORM_GUID;
            if (portalId && formGuid) {
                await fetch(
                    `https://api.hsforms.com/submissions/v3/integration/submit/${portalId}/${formGuid}`,
                    {
                        method: 'POST',
                        headers: {'Content-Type': 'application/json'},
                        body: JSON.stringify({
                            fields: [
                                {name: 'full_name', value: nombre},
                                {name: 'email', value: email},
                                {name: 'phone', value: telefono || ''},
                                {name: 'apartment_type', value: tipo},
                                {name: 'message', value: mensaje || ''},
                            ],
                            context: {
                                pageUri: 'https://olimpo.inconstructora.com.co',
                                pageName: 'Olimpo Landing',
                            },
                        }),
                    }
                ).catch(() => {
                    // No bloqueamos el flujo si HubSpot falla
                });
            }

            return {success: true};
        }
    })
};
