const Product = require('../models/Product');
const qs = require('querystring');
const { header, footer, tableProduct } = require('../utils/html');
const logger = require('../utils/logger');
const { validations } = require('../utils/validation');

exports.index = async function (req, res, query) {
  res.setHeader('Content-Type', 'text/html');
  let html = '';

  html += header();

  try {
    const products = await Product.find({}).sort({ _id: -1 }).lean();
    let product = {};
    if (query.id) {
      const getProduct = await Product.findOne({ _id: query.id }).lean();
      if (getProduct) {
        product = getProduct;
      } else {
        res.writeHead(301, {
          Location: '/created',
        });
        res.end();
        return;
      }
    }
    html += tableProduct(products, {}, {}, query.message, product);
  } catch (error) {
    console.log(error);
    html += '<h1 class="error-message">Something error<h1>';
  }

  html += footer();
  res.end(html);
};

exports.productSave = async function (req, res, query) {
  var body = '';

  req.on('data', function (data) {
    body += data;
  });

  req.on('end', async function () {
    let data = qs.parse(body);

    try {
      const validate = validations([
        {
          label: 'name',
          value: data.name,
          required: true,
        },
        {
          label: 'price',
          value: data.price,
          required: true,
          number: true,
        },
        {
          label: 'description',
          value: data.description,
          required: true,
        },
        {
          label: 'category',
          value: data.category,
          required: true,
        },
      ]);

      if (Object.keys(validate).length > 0) {
        let html = header();

        const products = await Product.find({}).sort({ _id: -1 }).lean();

        html += tableProduct(products, validate, {
          name: data.name,
          price: data.price,
          description: data.description,
          category: data.category,
        });

        html += footer();
        res.end(html);

        return;
      }

      if (query?.id) {
        const id = query.id;

        const product = await Product.findOne({ _id: id }).lean();

        if (product) {
          await Product.updateOne(
            { _id: id },
            {
              $set: data,
            }
          );

          res.writeHead(301, {
            Location: '/?message=updated',
          });
          res.end();
        } else {
          res.writeHead(301, {
            Location: '/',
          });
          res.end();
        }
      } else {
        await Product.create(data);
        res.writeHead(301, {
          Location: '/?message=created',
        });
        res.end();
      }
    } catch (error) {
      logger.error(error);
      res.end('<h1 class="error-message">Something error<h1>');
    }
  });
};

exports.deleteProduct = async function (req, res, query) {
  const { id } = query;

  if (id) {
    try {
      await Product.deleteOne({ _id: id });

      res.writeHead(301, {
        Location: '/?message=deleted',
      });
      res.end();
    } catch (error) {
      console.log(error);
      res.writeHead(301, {
        Location: '/',
      });
      res.end();
    }

    return;
  }

  res.writeHead(301, {
    Location: '/',
  });
  res.end();
};
