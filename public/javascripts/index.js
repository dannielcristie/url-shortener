function copyLink() {
    let copyText = document.getElementById("copyText") 

    console.log(copyLink)

    var selection = window.getSelection();

    var range = document.createRange();

    range.selectNodeContents(copyText);

    selection.removeAllRanges();

    selection.addRange(range);

    document.execCommand('copy');
}