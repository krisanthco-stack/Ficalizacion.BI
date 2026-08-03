'use strict';

const DESTINATARIO_FIJO = 'catastro@sarapiqui.go.cr';
const PREFIJO_ASUNTO = 'Fiscalización';
const PROPIEDAD_TOKEN = 'FISCALIZACION_TOKEN';
const MAX_DOCX_BASE64 = 18 * 1024 * 1024;
const MAX_HTML = 22 * 1024 * 1024;

function doGet() {
  return ContentService
    .createTextOutput(JSON.stringify({
      ok: true,
      service: 'FiscalizacionBIEmailGateway',
      recipient: DESTINATARIO_FIJO,
      configured: Boolean(PropertiesService.getScriptProperties().getProperty(PROPIEDAD_TOKEN)),
    }))
    .setMimeType(ContentService.MimeType.JSON);
}

function doPost(e) {
  let requestId = '';
  try {
    const raw = (e && e.parameter && e.parameter.payload)
      || (e && e.postData && e.postData.contents)
      || '';
    if (!raw) throw new Error('Solicitud vacía.');

    const payload = JSON.parse(raw);
    requestId = textoSeguro(payload.requestId, 180);
    validarPayload(payload);

    const configuredToken = PropertiesService
      .getScriptProperties()
      .getProperty(PROPIEDAD_TOKEN);
    if (!configuredToken) {
      throw new Error('La pasarela no tiene configurado FISCALIZACION_TOKEN.');
    }
    if (!comparacionConstante(String(payload.authorizationCode || ''), configuredToken)) {
      throw new Error('Código de autorización inválido.');
    }

    const lock = LockService.getScriptLock();
    lock.waitLock(30000);
    try {
      const cache = CacheService.getScriptCache();
      const cacheKey = 'sent_' + requestId;
      if (cache.get(cacheKey)) {
        return respuestaIframe(requestId, true, 'El envío ya había sido procesado.');
      }

      const tramite = textoSeguro(payload.tramite, 160);
      const asunto = `${PREFIJO_ASUNTO} ${tramite}`.trim();
      const docxName = nombreArchivo(payload.docxName, 'informe.docx');
      const pdfName = nombreArchivo(payload.pdfName, 'informe.pdf');

      const docxBytes = Utilities.base64Decode(String(payload.docxBase64 || ''));
      const docxBlob = Utilities
        .newBlob(
          docxBytes,
          'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
          docxName,
        );

      const reportHtml = String(payload.reportHtml || '');
      const pdfBlob = HtmlService
        .createHtmlOutput(reportHtml)
        .getAs(MimeType.PDF)
        .setName(pdfName);

      MailApp.sendEmail({
        to: DESTINATARIO_FIJO,
        subject: asunto,
        body: textoSeguro(payload.bodyText, 12000) || `Se adjuntan el informe Word y PDF de la fiscalización ${tramite}.`,
        htmlBody: htmlSeguro(payload.bodyHtml),
        name: 'Fiscalización B.I.',
        attachments: [docxBlob, pdfBlob],
      });

      cache.put(cacheKey, '1', 21600);
    } finally {
      lock.releaseLock();
    }

    return respuestaIframe(requestId, true, `Informe enviado a ${DESTINATARIO_FIJO}.`);
  } catch (error) {
    console.error(error && error.stack ? error.stack : error);
    return respuestaIframe(
      requestId,
      false,
      error && error.message ? error.message : 'No fue posible enviar el correo.',
    );
  }
}

function validarPayload(payload) {
  if (!payload || payload.schema !== 'FiscalizacionBIEmail') {
    throw new Error('Formato de solicitud no reconocido.');
  }
  if (!String(payload.requestId || '').trim()) {
    throw new Error('Falta el identificador de la solicitud.');
  }
  if (!String(payload.tramite || '').trim()) {
    throw new Error('Falta el número de trámite.');
  }
  if (!String(payload.docxBase64 || '').trim()) {
    throw new Error('No se recibió el archivo Word.');
  }
  if (!String(payload.reportHtml || '').trim()) {
    throw new Error('No se recibió el contenido para generar el PDF.');
  }
  if (String(payload.docxBase64).length > MAX_DOCX_BASE64) {
    throw new Error('El archivo Word supera el tamaño permitido por la pasarela.');
  }
  if (String(payload.reportHtml).length > MAX_HTML) {
    throw new Error('El informe supera el tamaño permitido para generar el PDF.');
  }
}

function comparacionConstante(a, b) {
  const aa = String(a || '');
  const bb = String(b || '');
  let diff = aa.length ^ bb.length;
  const max = Math.max(aa.length, bb.length);
  for (let i = 0; i < max; i += 1) {
    diff |= (aa.charCodeAt(i) || 0) ^ (bb.charCodeAt(i) || 0);
  }
  return diff === 0;
}

function textoSeguro(value, maxLength) {
  return String(value == null ? '' : value)
    .replace(/[\u0000-\u0008\u000B\u000C\u000E-\u001F\u007F]/g, '')
    .trim()
    .slice(0, maxLength || 5000);
}

function nombreArchivo(value, fallback) {
  const clean = textoSeguro(value, 180)
    .replace(/[\\/:*?"<>|]/g, '_')
    .replace(/\s+/g, '_');
  return clean || fallback;
}

function htmlSeguro(value) {
  const html = String(value || '');
  return html
    .replace(/<script[\s\S]*?<\/script>/gi, '')
    .replace(/\son\w+\s*=\s*(["']).*?\1/gi, '');
}

function respuestaIframe(requestId, ok, message) {
  const data = JSON.stringify({
    type: 'fiscalizacion-email-result',
    requestId: String(requestId || ''),
    ok: Boolean(ok),
    message: textoSeguro(message, 500),
  }).replace(/</g, '\\u003c');

  const visible = ok ? 'Envío procesado.' : 'No fue posible procesar el envío.';
  return HtmlService.createHtmlOutput(
    `<!doctype html><html><head><meta charset="utf-8"></head><body>`
      + `<p>${visible}</p>`
      + `<script>window.parent.postMessage(${data}, '*');<\/script>`
      + `</body></html>`,
  ).setTitle('Fiscalización B.I.');
}
