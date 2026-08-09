const inpBox = document.getElementById('url-inp');
const pasteBtn = document.getElementById('paste-btn');
const submitBtn = document.getElementById('lets-go-btn');

const resultBox = document.getElementById('result-box');
const shortUrlBox = document.getElementById('short-url-box');
const copyBtn = document.getElementById('copy-btn');
const gotoBtn = document.getElementById('goto-link');
const qrCode = document.getElementById('qr-code');
const downloadQrBtn = document.getElementById('download-qr-btn');

let shortUrl = '';

const wakeUpServer = async () => {
    await fetch("https://swift-url-api.onrender.com/api/");
};

wakeUpServer();

const hideResult = () => {
    resultBox.classList.add('hidden');
    if (downloadQrBtn) downloadQrBtn.classList.add('hidden');
    gotoBtn.href = '#';
    shortUrlBox.innerText = '';
};

const showResult = () => {
    resultBox.classList.remove('hidden');
    if (downloadQrBtn) downloadQrBtn.classList.remove('hidden');
};

document.addEventListener('DOMContentLoaded', function () {
    hideResult();
    wakeUpServer();
    shortUrl = '';
});

const handlePaste = () => {
    hideResult();
    navigator.clipboard.readText().then((res) => {
        inpBox.value = res;
    });
};

const handleCopy = async () => {
    navigator.clipboard.writeText(shortUrlBox.innerText);
    window.alert('Copied to clipboard!');
};

const handleDownloadQr = async () => {
    try {
        const response = await fetch(qrCode.src);
        const blob = await response.blob();
        const blobUrl = URL.createObjectURL(blob);
        
        const tempLink = document.createElement('a');
        tempLink.href = blobUrl;
        tempLink.download = 'swift-url-qr.png';
        document.body.appendChild(tempLink);
        tempLink.click();
        
        document.body.removeChild(tempLink);
        URL.revokeObjectURL(blobUrl);
    } catch (error) {
        console.error('Failed to download QR code:', error);
    }
};

const fetchData = async (url) => {
    const res = await fetch('https://swift-url-api.onrender.com/api/shorturl', {
        method: "POST",
        body: JSON.stringify({ longUrl: url }),
        headers: {
            "Content-Type": "application/json",
        },
    });
    return res;
};

const validateUrl = (url) => {
    if (url.length < 5) {
        return false;
    }
    const re = /^https?:\/\/.+\..+/g;
    return re.test(url);
};

const handleSubmit = async (e) => {
    e.preventDefault();
    const url = inpBox.value;
    if (validateUrl(url)) {
        const res = fetchData(url);
        res
            .then((response) => response.json())
            .then(json => {
                const cleanUrl = window.location.hostname + '/?q=' + json.shortUrl;
                const absoluteUrl = window.location.protocol + '//' + cleanUrl;

                shortUrlBox.innerText = cleanUrl; 
                gotoBtn.href = absoluteUrl;      
                qrCode.src = 'https://quickchart.io/qr?text=' + absoluteUrl; 
                
                showResult();
            })
            .catch(err => {
                console.log(err);
            });
    } else {
        console.log("Invalid Url");
    }
};

inpBox.addEventListener('change', hideResult);
pasteBtn.addEventListener('click', handlePaste);
copyBtn.addEventListener('click', handleCopy);
submitBtn.addEventListener('click', handleSubmit);

if (downloadQrBtn) {
    downloadQrBtn.addEventListener('click', handleDownloadQr);
}
