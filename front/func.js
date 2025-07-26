const inpBox = document.getElementById('url-inp');
const pasteBtn = document.getElementById('paste-btn');
const submitBtn = document.getElementById('lets-go-btn');


const resultBox = document.getElementById('result-box');
const shortUrlBox = document.getElementById('short-url-box');
const copyBtn = document.getElementById('copy-btn');
const gotoBtn = document.getElementById('goto-link');

// states
let shortUrl = ''

const hideResult = () => {
    resultBox.classList.add('hidden');
    gotoBtn.href = '#'
    shortUrlBox.innerText = '';
}
const showResult = () => {
    resultBox.classList.remove('hidden');
}

document.addEventListener('DOMContentLoaded', function () {
    hideResult();
    shortUrl = '';
})

const handlePaste = () => {
    hideResult()
    // console.log('test')
    navigator.clipboard.readText().then((res) => {
        inpBox.value = res;
    })
}
const handleCopy = async () => {
    navigator.clipboard.writeText(shortUrlBox.innerText);
}
const fetchData = async (url) => {
    result = false;
    const res = await fetch('https://swift-url-api.onrender.com/api/shorturl', {
        method: "POST",
        body: JSON.stringify({ longUrl: url }),
        headers: {
            "Content-Type": "application/json",
        },
    })
    return res;
}
const validateUrl = (url) => {
    console.log(url);
    if (url.length < 5) {
        return false;
    }
    const re = /^https?:\/\/.+\..+/g;
    return re.test(url)
}

const handleSubmit = async (e) => {
    e.preventDefault();
    const url = inpBox.value
    if (validateUrl(url)) {
        const res = fetchData(url);
        // console.log(res);
        res
            .then((response) => response.json())
            .then(json => {
                shortUrl = 'https://swift-url.onrender.com/?q=' + json.shortUrl;
                shortUrlBox.innerText = shortUrl;
                gotoBtn.href = shortUrl;
                showResult()
                // console.log(json);
            })
            .catch(err => {
                console.log(err)
            })
    }
}



inpBox.addEventListener('change', hideResult);
pasteBtn.addEventListener('click', handlePaste);
copyBtn.addEventListener('click', handleCopy);
submitBtn.addEventListener('click', handleSubmit);