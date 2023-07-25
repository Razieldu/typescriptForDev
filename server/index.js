const express = require('express');
const request = require('request');
const cors = require('cors'); // 引入 CORS 中间件
require('dotenv').config();

const app = express();
app.use(express.json());
app.use(cors()); // 使用 CORS 中间件

// 设置代理路由
app.post('/proxy', (req, res) => {
  const url = process.env.GET_MEMBER_DATA;
  req.pipe(request.post(url)).pipe(res);
});
app.post('/proxy2', (req, res) => {
  const url = process.env.APT_USER;
  req.pipe(request.post(url)).pipe(res);
});

app.post('/proxy3', (req, res) => {
  const url = process.env.UPDATE_MEMBER_DATA;
  const updateObject = req.body; // 获取要更新的对象
  const updateString = encodeURIComponent(JSON.stringify(updateObject));
  const fullUrl = `${url}?update_string=${updateString}`;

  request.post({ url: fullUrl }, (error, response, body) => {
    if (error) {
      console.error(error);
      res.status(500).send('Internal Server Error');
    } else {
      res.send(body);
    }
  });
});

app.post('/proxy4', (req, res) => {
  const url = process.env.INSERT_MEMBER_DATA;
  const updateObject = req.body; // 获取要更新的对象
  const updateString = encodeURIComponent(JSON.stringify(updateObject));
  const fullUrl = `${url}?insert_string=${updateString}`;

  request.post({ url: fullUrl }, (error, response, body) => {
    if (error) {
      console.error(error);
      res.status(500).send('Internal Server Error');
    } else {
      res.send(body);
    }
  });
});


// 启动服务器
app.listen(3000, () => {
  console.log('Proxy server listening on port 3000');
});


