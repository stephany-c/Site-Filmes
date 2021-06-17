const CHAVE = 'api_key=99e77cdb76b7728396dabe6955ebab08'
const URLAPI = 'https://api.themoviedb.org/3'
const URLPOPULARES = '/discover/movie?sort_by=popularity.desc&'
const URLCINEMA = '/discover/movie?primary_release_date.gte=2014-09-15&primary_release_date.lte=2014-10-22&'
const resultPesquisa = URLAPI + '/search/movie?' + CHAVE
const API = URLAPI + URLPOPULARES + CHAVE
const CINEMA = URLAPI + URLCINEMA + CHAVE
const IMAGE = "https://image.tmdb.org/t/p/w500"
const linkAPI = "https://api.themoviedb.org/movie/"
let divInserirDestaque = document.getElementById('inserirDestaque')
let formulario = document.getElementById('formPesquisa')
let pesquisa = document.getElementById('pesquisa')

console.log(CINEMA)

function filmes(url) {
    fetch(url).then(res => res.json()).then(dados => {
        inserirDestaque(dados.results)
    })

}
filmes(API)

function filmesCinema(url) {
    fetch(url).then(res => res.json()).then(dados => {
        inserirCarousel(dados.results)
    })
}
filmesCinema(CINEMA)

function inserirCarousel(dados) {
    
    dados.forEach(filmes => {
        const { title, overview, release_date, poster_path } = filmes
        let carouselitens = document.getElementById('carouselitens')
        let div = document.createElement('div')
        div.classList.add('carousel-item')
        div.innerHTML = `
                    <div class="row slide teste">
                        <div class="col-12 col-sm-12 col-md-12 col-lg-6">
                        <div  class="slide">
                        <img src="${IMAGE + poster_path}" class="imagePoster" ></img>
                        </div>
                        </div>
                   <div class="col-12 col-sm-12 col-md-12  col-lg-6">
                        <div  class=" row slide">
                           <div>
                            <div class="row texto_lançamentos">
                              <h4 >${title}</h4>
                              <h8 style="text-align: justify"> <b>Sinopse: </b> ${overview}
                              </h8> 
                              <h7 ><b> Estreia:</b> ${release_date}</h7>
                              <h7 ><b><br/>Avaliação:</b></h7>
                               <h4> &#9733; &#9733; &#9733; &#9733; &#10032;</h4>
                           </div>
                        </div>
                        </div>
                        </div>
                       `
        carouselitens.appendChild(div)
    });
}

function inserirDestaque(dados) {
    divInserirDestaque.innerHTML = ""

    dados.forEach(filme => {
        console.log(filme)
        const {title, poster_path, id, release_date, popularity} = filme
        let div = document.createElement('div')
        div.classList.add('containerDestaques')
        div.innerHTML = `
        <div class="col-6 col-sm-6 col-md-3  col-lg-3 destaque">
            <img src="${IMAGE + poster_path}">
            <p><a style="color: black" href="${"https://www.themoviedb.org/movie/" + id}"><b>Filme:</b> ${title}</a></p>
            <p><b>Estréia:</b> ${release_date}</p>
            <p><b>Popularidade:</b> ${popularity}</p>
          </div>
 
        `

        divInserirDestaque.appendChild(div)
    })

}
 
formulario.addEventListener('submit', (e) => {
    e.preventDefault()

    const pesquisaValue = pesquisa.value
    if (pesquisaValue) {
        filmes(resultPesquisa + '&query=' + pesquisaValue)
    }
})
