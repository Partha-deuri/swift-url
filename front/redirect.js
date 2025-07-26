const urlParams = new URLSearchParams(window.location.search);

const q = urlParams.get("q");

const fetchData = async () => {
    const res = await fetch('https://swift-url-api.onrender.com/api/longurl', {
        method: "POST",
        body: JSON.stringify({ shortUrl: q }),
        headers: {
            "Content-Type": "application/json",
        },
    })
    return res;
}

console.log(q);

if (q == null) {
    window.location.href = "./home.html";
} else {
    try {
        const res = fetchData();
        // console.log(res)
        res
            .then((response) => response.json())
            .then((json) => {
                if (json != 'url not found') {
                    if (json.longUrl !== undefined)
                        window.location.href = json.longUrl;
                }
                else {
                    window.location.href = './error.html';
                }
            })
            
    } catch (err) {
        console.log(err);
        window.location.href = './error.html';

    }
}
