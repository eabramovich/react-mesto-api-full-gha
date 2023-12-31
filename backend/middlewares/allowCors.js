export default function(req, res, next) {
  const allowedCors = [
    'localhost:3000'
  ];

  const { origin } = req.headers;

  if(allowedCors.includes(origin)) {
    res.header('Access-Control-Allow-Origin', origin);
  }

  next();
}