function getRandomAdvice() {
    fetch("https://api.adviceslip.com/advice") // make the request
        .then(response => response.json()) // convert response to json
        .then(async myJson => { // display data in the browser
            const adviceText = myJson.slip.advice
            await redrawAdvice(adviceText)
        })
}

async function redrawAdvice(advice) {
    document.getElementById("advice").innerHTML = advice
    const filtered = await keywords(advice)
    const keywordsDiv = document.getElementById("keywords")
    keywordsDiv.innerHTML = ''
    filtered.forEach(word => {
        const btn = document.createElement("button")
        btn.innerHTML = word
        btn.onclick = async function () {
            myJson = await searchK(word)
            const qty = myJson.slips.length
            const rand = Math.floor(Math.random() * qty)
            const new_advice = myJson.slips[rand].advice
            document.getElementById('advice').innerHTML = new_advice
            await redrawAdvice(new_advice)
        }
        keywordsDiv.appendChild(btn)
    })
}

async function searchAdvice1() {
    const keyword = document.getElementById('keyword').value
    const myJson = await searchK(keyword)
    console.log("myJson:", myJson)
    const qty = myJson.slips.length
    const rand = Math.floor(Math.random() * qty)
    const new_advice = myJson.slips[rand].advice
    document.getElementById("advice").innerHTML = new_advice
    await redrawAdvice(new_advice)
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