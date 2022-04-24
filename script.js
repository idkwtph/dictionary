const alertContainer = document.querySelector("[data-alert-container]")

function changeToWhite() {
    document.body.style.backgroundImage = "url('https://www.google.com/url?sa=i&url=https%3A%2F%2Funsplash.com%2Fs%2Fphotos%2Fwhite-colour&psig=AOvVaw3TOXjRKgW7ik9LZugHKkl9&ust=1646609616498000&source=images&cd=vfe&ved=0CAsQjRxqFwoTCNi4tumXsPYCFQAAAAAdAAAAABAp')";
}

let dictionary = {
    fetchWord: function (word) {
        let myRequest = new Request("https://api.dictionaryapi.dev/api/v2/entries/en/" + word)
         fetch(myRequest)
            .then(function(resp) {
                if (resp.ok) {
                    return resp.json();
                } else {
                    alert("Word " + word + " Not Found\n" + "Try using an actual word (Currently countries are not considered words)")
                }
            })
            .then((data) => this.displayWord(data))
        .catch(function(err) {
            alert("Word " + word + " Not Found\n" + "Try using an actual word (Currently countries are not considered words)")
             console.log(err)
         })
    },
    displayWord: function (data) {
            const { title } = data || null
            console.log(title)
            const content = document.querySelector(".card")
            console.log(content)
            content.classList.add(".loading");
            const { word } = data[0]
            const { partOfSpeech } = data[0].meanings[0];
            const { definition } = data[0].meanings[0].definitions[0];
            if (word != 'mouse') {
                var { text } = data[0].phonetics[0] || null
                var { text } = text || data[0].phonetics[1]
                var { phonetic } = data[0] || null
            }
            if (word == 'mouse') {
                document.querySelector(".word").innerText = "Meaning for mouse:";   
                document.querySelector(".pronunciation").innerText = "/maʊs/";
                document.querySelector(".partOfSpeech").innerText = partOfSpeech;
                document.querySelector(".meaning").innerText = definition;
                document.body.style.backgroundImage = "url('https://source.unsplash.com/1600x900/?mouse')";
                content.classList.remove("loading");
                return
            } else {
                if (phonetic == null && text == null) {
                    document.querySelector(".pronunciation").innerText = "No phonetic was provided";
                } else if (phonetic != null) {
                    document.querySelector(".pronunciation").innerText = phonetic;
                } else if (text != null) {
                    document.querySelector(".pronunciation").innerText = text;
                } else {
                    document.querySelector(".pronunciation").innerText = "No phonetic was provided";
                }
                document.querySelector(".word").innerText = "Meaning for " + word + ":";   
                document.querySelector(".partOfSpeech").innerText = partOfSpeech;
                document.querySelector(".meaning").innerText = definition;
                document.body.style.backgroundImage = "url('https://source.unsplash.com/1600x900/?" + word + "')";
                content.classList.remove("loading");
        }
        },
    search: function (word) {
        dictionary.fetchWord(word);
    },
    error: function (word, duration = 1000) {
            const alert = document.createElement("div")
            alert.textContent = word
            alert.classList.add("alert")
            alertContainer.prepend(alert)
            if (duration == null) return
          
            setTimeout(() => {
              alert.classList.add("hide")
              alert.addEventListener("transitionend", () => {
                alert.remove()
              })
            }, duration)
          }
};

document.querySelector(".search button").addEventListener('click', function () {
    dictionary.search(document.querySelector(".search-bar").value);
});

document.querySelector(".search-bar").addEventListener('keyup', function (event) {
if (event.key == "Enter") {
    dictionary.search(document.querySelector(".search-bar").value);
}
});
