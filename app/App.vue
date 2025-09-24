<template lang="pug">
q-layout(view="hHh lpR fFf")
  q-header.bg-primary.text-white(elevated)
    q-toolbar
      q-toolbar-title NowShowing
      q-space
      q-input(dark dense standout v-model="searchQuery" placeholder="Search for movies..." @update:model-value="searchMovies")
        template(v-slot:append)
          q-icon(name="search")

  q-page-container
    q-page.q-pa-md
      .row.q-col-gutter-md(v-if="movies.length > 0")
        .col-xs-12.col-sm-6.col-md-4.col-lg-3(v-for="movie in movies" :key="movie.imdbID")
          q-card.movie-card(@click="showMovieDetails(movie.imdbID)")
            q-img(:src="movie.Poster" :alt="movie.Title")
              .absolute-bottom.text-subtitle2.text-center
                | {{ movie.Title }}
      .row(v-else)
        .col.text-center
          p(v-if="loading") Loading popular movies...
          p(v-else-if="!searchQuery") No popular movies found. Try searching for a movie.
          p(v-else) No movies found.

  q-footer.bg-grey-8.text-white
    q-toolbar
      q-toolbar-title
        small &copy; 2025 NowShowing

  q-dialog(v-model="showDetailsDialog")
    q-card(v-if="selectedMovie")
      q-card-section.row.items-center.q-pb-none
        .text-h6 {{ selectedMovie.Title }}
        q-space
        q-btn(icon="close" flat round dense v-close-popup)
      q-card-section
        .row
          .col-md-4
            q-img(:src="selectedMovie.Poster" :alt="selectedMovie.Title")
          .col-md-8.q-pl-md
            p {{ selectedMovie.Plot }}
            p
              strong Year:
              |  {{ selectedMovie.Year }}
            p
              strong Rated:
              |  {{ selectedMovie.Rated }}
            p
              strong Genre:
              |  {{ selectedMovie.Genre }}
            p
              strong IMDB Rating:
              |  {{ selectedMovie.imdbRating }}
</template>

<script setup>
import { ref, onMounted } from 'vue'

const searchQuery = ref('')
const movies = ref([])
const loading = ref(false)
const showDetailsDialog = ref(false)
const selectedMovie = ref(null)
let debounceTimer = null

const searchMovies = () => {
  clearTimeout(debounceTimer)
  debounceTimer = setTimeout(async () => {
    if (searchQuery.value.length > 0) {
      loading.value = true
      try {
        const response = await fetch(`/api/omdb-proxy?s=${searchQuery.value}`)
        const data = await response.json()
        if (data.Search) {
          movies.value = data.Search
        } else {
          movies.value = []
        }
      } catch (error) {
        console.error("Error fetching movies:", error)
        movies.value = []
      } finally {
        loading.value = false
      }
    } else {
      fetchPopularMovies()
    }
  }, 500) // 500ms debounce
}

const fetchPopularMovies = async () => {
  loading.value = true
  const popularTitles = ['Inception', 'The Matrix', 'Interstellar', 'The Avengers'];
  const moviePromises = popularTitles.map(title => fetch(`/api/omdb-proxy?t=${title}`).then(res => res.json()))
  try {
    const popularMovies = await Promise.all(moviePromises)
    movies.value = popularMovies.filter(movie => movie.Response === 'True')
  } catch (error) {
    console.error("Error fetching popular movies:", error)
    movies.value = []
  } finally {
    loading.value = false
  }
}

const showMovieDetails = async (imdbID) => {
  try {
    const response = await fetch(`/api/omdb-proxy?i=${imdbID}&plot=full`)
    const data = await response.json()
    if (data.Response === 'True') {
      selectedMovie.value = data
      showDetailsDialog.value = true
    } else {
      console.error("Error fetching movie details:", data.Error)
    }
  } catch (error) {
    console.error("Error fetching movie details:", error)
  }
}

onMounted(() => {
  fetchPopularMovies()
})

</script>

<style lang="scss">
.movie-card {
  cursor: pointer;
  transition: transform 0.2s;
}

.movie-card:hover {
  transform: scale(1.05);
}
</style>