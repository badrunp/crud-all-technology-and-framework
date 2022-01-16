exports.validations = function (data) {
  let validate = {};

  data.map((item) => {
    if (item.required) {
      if (item.value == '') {
        validate[item.label] = `${item.label} is required`;
      } else {
        delete validate[item.label];
      }
    }

    if (item.number) {
      if (item.value != '') {
        if (!/^[0-9]+$/.test(item.value)) {
          validate[item.label] = `${item.label} number only!`;
        } else {
          delete validate[item.label];
        }
      }
    }
  });

  return validate;
};
