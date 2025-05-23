import mongoose from 'mongoose'
import 'dotenv/config'

import Movie from './models/movie.js'
import Review from "./models/review.js"
import User from "./models/user.js"

import movies from './data/movies.js'
import reviewData from "./data/reviews.js"
import userData from "./data/users.js"

const seedDatabase = async () => {
    try {
      await mongoose.connect(process.env.MONGODB_URI)
      console.log('Database connected')
  
      // Clear DB
      await Movie.deleteMany()
      await Review.deleteMany()
      await User.deleteMany()      
      
      const newMovies = await Movie.create(movies)
      console.log(`${movies.length} posts created`)

      const userWithFavMovies = {
        ...userData[0],
        favourites: [newMovies[0]._id, newMovies[1]._id]
      }

      await User.create(userWithFavMovies)
      console.log('user created with favs')

      const remainingUsers = userData.slice(1)
      const users = await User.create(remainingUsers)
      console.log(`${users.length} users created`)

      const reviews = await Review.create(reviewData.map(review => ({
        content: review.content,
        author: users[Math.floor(Math.random() * users.length)]._id,
        movieId: newMovies.find((movie) => movie.title === review.title)._id

      })))

      console.log(`${reviews.length} reviews added`)

      await mongoose.connection.close()
      console.log('Database connection closed')
  
    } catch (error) {
      console.log(error)
    }
  }
  seedDatabase()