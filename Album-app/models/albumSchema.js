const { default: mongoose } = require('mongoose');

const acceptableGenres = [
  'Rock',
  'Pop',
  'Jazz',
  'Jazz Rock',
  'Classical',
  'Hip-Hop',
  'Electronic',
  'Country',
  'Blues',
  'Reggae',
  'Folk',
  'Soul',
  'Power Metal',
  'Melodic Death Metal',
  'Ambient Electronic',
  'Jazz Fusion',
  'Folk Rock',
  'Progressive Rock',
  'Synthpop',
  'Indie Pop',
  'Hip Hop',
  'New Age',
  'World Music',
  'Pop Rock',
  'Rock and Roll',
  'Hard Rock',
  'Grunge, Alternative Rock'
];

const albumSchema = new mongoose.Schema({
  albumId: Number,
  artist: {
    type: String,
    required: [true, 'Please provide artist name'],
    minlength: [2, 'Minimum artist name length is 2 characters'],
    maxlength: [50, 'Maximum artist name length is 50 characters']
  },
  title: {
    type: String,
    required: [true, 'Please provide title name'],
    minlength: [2, 'Minimum title name length is 2 characters'],
    maxlength: [50, 'Maximum title name length is 50 characters']
  },
  year: {
    type: Number,
    required: [true, 'Please provide release year'],
    min: [1900, 'Release year must be atleast 1900'],
    max: [new Date().getFullYear(), 'Release year cannot exceed current year']
  },
  genre: {
    type: String,
    required: [true, 'Please provide a genre'],
    enum: {
      values: acceptableGenres,
      message: '{VALUE} is not a valid genre'
    }
  },
  tracks: {
    type: Number,
    min: [1, 'Track count must be at least 1'],
    max: [100, 'Track count cannot exceed 100']
  },
  userId: {
    type: String,
  },
  updatedAt: {
    type: Date
  }
}, { collection: 'albums' });

albumSchema.pre('save', function (next) {
  this.updatedAt = new Date();
  next();
});

const Album = mongoose.model('Album', albumSchema);

module.exports = Album;

