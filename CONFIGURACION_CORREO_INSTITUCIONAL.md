# Configuración de correo institucional

La aplicación **no guarda contraseñas de Gmail, Microsoft ni SMTP**. El envío se realiza mediante una pasarela de Google Apps Script autorizada con OAuth y desplegada por la cuenta remitente.

## Resultado configurado

- Cuenta remitente prevista: `msarapiqui@gmail.com`.
- Destinatario fijo: `catastro@sarapiqui.go.cr`.
- Asunto: `Fiscalización` + número de trámite.
- Adjuntos: informe editable `.docx` y versión `.pdf`.
- Condición: el envío solo se habilita al completar los datos y la firma de quien avala.
- Auditoría: los errores críticos deben corregirse antes de enviar.
- Anexos: si los valores son aceptados, no se incorporan al informe ni al correo.

## Configuración recomendada con Gmail

1. Ingrese a `msarapiqui@gmail.com`, o a la cuenta institucional que finalmente funcionará como remitente.
2. Abra Google Apps Script y cree un proyecto nuevo.
3. Copie el contenido de `backend/google-apps-script/Code.gs` en el archivo `Code.gs`.
4. Active la visualización del manifiesto en la configuración del proyecto y copie `backend/google-apps-script/appsscript.json`.
5. En **Configuración del proyecto > Propiedades de la secuencia de comandos**, cree:
   - Nombre: `FISCALIZACION_TOKEN`.
   - Valor: un código aleatorio largo y exclusivo para esta aplicación. No use una contraseña del correo.
6. Seleccione **Implementar > Nueva implementación > Aplicación web**.
7. Configure:
   - Ejecutar como: **Yo**.
   - Quién tiene acceso: la opción que permita a los dispositivos autorizados invocar la aplicación web. Cuando la PWA está publicada en GitHub Pages, normalmente se utiliza el acceso compatible con usuarios no autenticados y la pasarela se protege con `FISCALIZACION_TOKEN`.
8. Autorice el permiso para enviar correo y copie la dirección de implementación terminada en `/exec`.
9. En Fiscalización B.I., abra **Gestión de expedientes > Correo institucional seguro**.
10. Pegue la dirección `/exec` y el mismo código definido en `FISCALIZACION_TOKEN`.
11. Guarde la configuración en cada dispositivo autorizado.
12. Realice un envío de prueba con un expediente de prueba completamente firmado y confirme la recepción de ambos archivos.

La dirección y el código se guardan únicamente en el almacenamiento local del dispositivo. No se incorporan al repositorio de GitHub ni al paquete instalable.

## Flujo de uso

1. Complete la fiscalización y el número de trámite.
2. Registre los datos y la firma de quien avala.
3. Ejecute la auditoría y corrija los errores críticos.
4. Pulse **Enviar Word + PDF**.
5. La aplicación genera el Word, entrega el contenido del informe a la pasarela para producir el PDF y envía ambos documentos a la dirección fija.
6. La confirmación del servidor queda registrada en el expediente.
7. Si no hay conexión o la pasarela no responde, el expediente queda en cola para reintento.

## Alternativa Microsoft 365

La alternativa segura es Microsoft Graph con permiso `Mail.Send` o un flujo de Power Automate con el conector de Outlook. Ninguna opción debe incluir una contraseña en JavaScript o en GitHub Pages. Para activarla se requieren la autorización del administrador del entorno Microsoft 365 y los identificadores del tenant, aplicación o flujo correspondiente.

## Seguridad obligatoria

- No coloque contraseñas de correo, contraseñas de aplicación ni secretos SMTP en el código, el manifiesto, GitHub o `localStorage`.
- `FISCALIZACION_TOKEN` no es una contraseña de Gmail; debe ser distinto, largo y exclusivo para la pasarela.
- Cualquier contraseña de aplicación que haya sido compartida en un chat o documento debe revocarse antes de publicar o probar el sistema.
- La pasarela fija el destinatario en el servidor para impedir que la PWA sea utilizada para enviar mensajes a otras direcciones.
- El servidor vuelve a construir el asunto con el número de trámite; no acepta un destinatario ni un asunto arbitrarios enviados desde el navegador.
