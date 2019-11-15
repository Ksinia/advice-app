function getRandomAdvice() {
    fetch("https://api.adviceslip.com/advice") // make the request
        .then(response => response.json()) // convert response to json
        .then(async myJson => { // display data in the browser
            const adviceText = myJson.slip.advice
            document.getElementById("advice").innerHTML = adviceText
            const filtered = await keywords(adviceText)
            const keywordsDiv = document.getElementById("keywords")
            filtered.forEach(word => {
                const btn = document.createElement("button")
                btn.innerHTML = word
                btn.onclick = async function () {
                    myJson = await searchK(word)
                    const qty = myJson.slips.length
                    const rand = Math.floor(Math.random() * qty)
                    document.getElementById('advice').innerHTML = myJson.slips[rand].advice
                }
                keywordsDiv.appendChild(btn)
            })
        })
}

async function searchAdvice1() {
    const keyword = document.getElementById('keyword').value
    // console.log(keyword)
    const myJson = await searchK(keyword)
    console.log("myJson:", myJson)
    const qty = myJson.slips.length
    // console.log(qty)
    const rand = Math.floor(Math.random() * qty)
    // console.log(rand)
    document.getElementById("advice").innerHTML =
        myJson.slips[rand].advice
}

async function searchK(keyword) {
    const response = await fetch(`https://api.adviceslip.com/advice/search/${keyword}`)
    let data = await response.json()
    return data
}

async function keywords(sentence) {
    const arr = sentence.split(' ')
    const filteredArr = await filter(arr, async element => {
        if (element.length < 5) {
            return false
        }
        // console.log("Element: ", element)
        const searchRes = await searchK(element)
        const searchResQty = searchRes.total_results
        // console.log("Search Result:", searchRes)
        // console.log("Search Result Qty:", searchResQty)
        // console.log("Search Result Qty > 1 is", searchResQty > 1)
        return searchResQty > 1
    })
    return filteredArr
}

async function filter(arr, callback) {
    const fail = Symbol()
    return (await Promise.all(arr.map(async item => (await callback(item)) ? item : fail))).filter(i => i !== fail)
}

getRandomAdvice()