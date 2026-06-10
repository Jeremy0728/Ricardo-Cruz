(function () {
  'use strict';

  function ready(callback) {
    if (document.readyState === 'loading') {
      document.addEventListener('DOMContentLoaded', callback);
      return;
    }

    callback();
  }

  function getFieldValue(form, name) {
    var field = form.querySelector('[name="' + name + '"]');
    return field ? field.value.trim() : '';
  }

  function getSelectedText(form, name) {
    var field = form.querySelector('[name="' + name + '"]');

    if (field && field.value && field.selectedOptions && field.selectedOptions.length) {
      return field.selectedOptions[0].text.trim();
    }

    return '';
  }

  function initWhatsAppForm(form) {
    if (form.getAttribute('data-whatsapp-form-ready') === 'true') {
      return;
    }

    form.addEventListener('submit', function (event) {
      var phone;
      var fields;
      var text;

      event.preventDefault();

      phone = form.getAttribute('data-whatsapp-phone') || '51993948464';
      fields = {
        name: getFieldValue(form, 'name'),
        email: getFieldValue(form, 'email'),
        date: getFieldValue(form, 'date'),
        service: getSelectedText(form, 'service'),
        message: getFieldValue(form, 'message'),
      };
      text = [
        'Hola, quiero coordinar una evaluación personalizada.',
        fields.name ? 'Nombre: ' + fields.name : '',
        fields.email ? 'Correo: ' + fields.email : '',
        fields.date ? 'Fecha de interés: ' + fields.date : '',
        fields.service ? 'Procedimiento: ' + fields.service : '',
        fields.message ? 'Mensaje: ' + fields.message : '',
      ].filter(Boolean).join('\n');

      window.open('https://wa.me/' + phone + '?text=' + encodeURIComponent(text), '_blank', 'noopener');
    });

    form.setAttribute('data-whatsapp-form-ready', 'true');
  }

  ready(function () {
    document.querySelectorAll('[data-whatsapp-form]').forEach(initWhatsAppForm);
  });
})();
