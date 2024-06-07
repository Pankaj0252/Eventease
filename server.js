const http = require("http");
const dotenv = require("dotenv");
dotenv.config();
const port = process.env.PORT || 5001;
const app = require("./app");
const server = http.createServer(app);
console.log(`Running on Port ${port}`);
server.listen(port);


// Middlewares
app.use(cors());
app.use(bodyParser.json());

// MongoDB connection
mongoose.connect(process.env.DATABASE_URL, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  dbName: 'Eventease'
})
  .then(() => console.log('MongoDB connected...'))
  .catch(err => console.error('MongoDB connection error:', err));

// Routes
app.use('/api', require('./routes/events'));
app.use('/api', require('./routes/user'));

// Start server
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});