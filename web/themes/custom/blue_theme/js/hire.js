(function ($, Drupal) {
  Drupal.behaviors.custom = {
    attach: function (context, settings) {
      function formatOption(option) {
        if (!option.id) {
          return option.text.trim().replace('.', '_').toLowerCase();
        }

        let images = $('.webform-submission-add-form .form-item-select-other-skills .js-webform-select2').attr('data-images');
        images = JSON.parse(images);
        let imageUrl = images[option.id] || '';

        return $('<div><img src="' + imageUrl + '" class="select2-icons" /> ' + option.text + '</div>');
      }

      if ($('#edit-select-other-skills').length) {
        $('#edit-select-other-skills').select2({
          templateResult: formatOption,
          templateSelection: formatOption,
        });
      }
    },
  };

  Drupal.behaviors.mostPopular = {
    attach: function (context, settings) {
      var images = document.querySelectorAll('.most-popular .form-checkboxes .form-item label img');

      if (images && images.length) {
        images.forEach(function (img) {
          var imgURL = img.src;

          fetch(imgURL)
            .then(function (response) {
              return response.text();
            })
            .then(function (text) {
              var parser = new DOMParser();
              var xmlDoc = parser.parseFromString(text, 'text/xml');

              // Get the SVG tag, ignore the rest
              var svg = xmlDoc.getElementsByTagName('svg')[0];
              // Replace img with svg
              if (svg) img.parentNode.replaceChild(svg, img);
            });
        });
      }
    },
  };

  Drupal.behaviors.phoneIti = {
    attach: function (context, settings) {
      var phoneField = $('#edit-phone');
      var inputValue;
      var countryCode = $('.iti__country.iti__active .iti__dial-code').text();

      phoneField.on('keydown input', function (event) {
        var val = this.value;
        inputValue = val;
        countryCode = $('.iti__country.iti__active .iti__dial-code').text();

        // Prevent from deleting the country code
        if ((event.keyCode === 8 && val == countryCode) || (event.keyCode === 46 && val == countryCode)) {
          event.preventDefault();
        }

        // If the phone number where selected with ALT + A and then deleted, reverse back the country code
        if (val.length <= 1) {
          this.value = countryCode + ' ';
        }
      });

      phoneField.on('focus', function () {
        var self = this;
        var val = this.value;
        inputValue = val

        if (countryCode == val) {
          this.value = inputValue + ' ';
        }

        setTimeout(function () {
          // Set the caret position to the end
          self.setSelectionRange(self.value.length + 1, self.value.length + 1);
        }, 0);
      });

      phoneField.on('blur', function () {
        // Keep phone number on blur
        phoneField.val(inputValue);
      });
    },
  };

  // Every time when placeholder is changed, we need to add mask to the input by placeholder
  Drupal.behaviors.telInputMask = {
    attach: function (context, settings) {
      const phoneField = $('#edit-phone');

      phoneField.on('focus', function () {
        var placeholder = $(this).attr('placeholder');
        if (!placeholder) return;
        var mask = placeholder.replace(/\d/g, '0');
        $(this).mask(mask);
      });
    },
  };
})(jQuery, Drupal);
