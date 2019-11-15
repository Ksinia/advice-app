function getRandomAdvice() {
    fetch("https://api.adviceslip.com/advice") // make the request
        .then(response => response.json()) // convert response to json
        .then(myJson => { // display data in the browser
            const adviceText = myJson.slip.advice
            document.getElementById("advice").innerHTML = adviceText
            // keywords(adviceText)
        })
}

// function searchAdvice() {
//     const keyword = document.getElementById('keyword').value
//     console.log(keyword)
//     fetch(`https://api.adviceslip.com/advice/search/${keyword}`) // make the request
//         .then(response => response.json()) // convert response to json
//         .then(myJson => { // display data in the browser
//             const qty = myJson.slips.length
//             console.log(qty)
//             const rand = Math.floor(Math.random() * qty)
//             console.log(rand)
//             document.getElementById("advice").innerHTML =
//                 myJson.slips[rand].advice
//             // "<pre>" + JSON.stringify(myJson, null, " ") + "</pre>"
//         })
// }
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

function searchK(keyword) {
    return fetch(`https://api.adviceslip.com/advice/search/${keyword}`) // make the request
        .then(response => response.json()) // convert response to json
}

async function keywords(sentence) {
    const arr = sentence.split(' ')
    const filteredArr = arr.filter(async (element) => {
        console.log("Element: ", element)
        const searchRes = await searchK(element)
        const searchResQty = searchRes.total_results
        console.log("Search Result:", searchRes)
        console.log("Search Result Qty:", searchResQty)
        console.log("Search Result Qty > 1", searchRes > 1)
        return searchResQty > 1
    })
    console.log("Filtered array", filteredArr)
    return filteredArr
}

getRandomAdvice()