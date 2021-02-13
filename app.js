const Btn = {
    search() {
        const searchBtn = document.getElementById('searchBtn')
        searchBtn.addEventListener('click', async function (e) {
            e.preventDefault()
            const searchTerm = form.elements.query.value
            const config = { params: { q: searchTerm } }
            const res = await axios.get(`http://api.tvmaze.com/search/shows`, config);
            Util.shows(res.data)
            form.elements.query.value = ''
        })
    },
    reset() {
        const resetBtn = document.getElementById('resetBtn')
        resetBtn.addEventListener('click', () => {
            box.forEach(function (img) {
                box.removeChild(img)
            })
        })
    }
}

const Util = {
    shows(shows) {
        for (let result of shows) {
            if (result.show) {
                const showBox = document.createElement('div')
                showBox.setAttribute('id', 'showBox')
                const image = Util.images(result)
                const showSub = Util.subtitle(result)
                showBox.append(image)
                showBox.append(showSub)
                box.append(showBox)
            }
        }
    },
    images(result) {
        if (result.show.image) {
            const img = document.createElement('img')
            img.src = result.show.image.medium
            return img
        } else {
            const subImg = document.createElement('img')
            subImg.src = "/img/subImage.png"
            return subImg
        }
    },
    subtitle(result) {
        const subtitle = document.createElement('div')
        subtitle.setAttribute("id", "subtitle")
        if (result.show.genres || result.show.rating) {
            const name = document.createElement('p')
            name.setAttribute("id", "name")
            name.innerText = result.show.name
            subtitle.append(name)

            const rating = document.createElement('p')
            rating.setAttribute("id", "rating")
            rating.innerText = result.show.rating.average
            subtitle.append(rating)

            const showGenre = Util.genres(result)
            subtitle.append(showGenre)

            return subtitle
        }
    },
    genres(result) {
        const ul = document.createElement('ul')
        const genres = result.show.genres
        for (let i = 0; i < genres.length; i++) {
            let span = document.createElement('span')
            span.innerText = genres[i]
            ul.append(span)
        }

        return ul
    },
}

const form = document.getElementById('searchForm')
const box = document.getElementById('box')

Btn.search()
Btn.reset()