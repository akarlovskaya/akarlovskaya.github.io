/* jshint esversion: 6 */
document.querySelector('.get-jokes').addEventListener('click', getJokes);
const UL_EL = document.querySelector('.jokes');

function getJokes(e) {
    const INPUT_EL = document.getElementById('text');
    const IMG_EL = document.querySelector('.image-div');
    let inputVal = String(INPUT_EL.value);
    let jokesOutput = '';

    if ( inputVal.length <= 0 ) {
        jokesOutput += `
            <li class="error">Please enter search query</li>
        `;
        UL_EL.innerHTML = jokesOutput;
        e.preventDefault();
        return;
    }

    // create new XMLHttpRequest Object instance
    const XHR = new XMLHttpRequest();
    // specify request using open() method
    XHR.open('GET', `https://api.chucknorris.io/jokes/search?query=${inputVal}`, true);

    XHR.onload = function() {
        // check if request was status seccessful
        if ( this.status === 200 ) {
            // convert text in JS Object
            let jokesObj = JSON.parse(this.responseText);
            // getting jokes arr using "value" property
            let jokesArr = jokesObj.result;

            if ( jokesArr.length >= 0 ) {
                // show image
                IMG_EL.className += ' shown';
                // iterate through jokesArr
                jokesArr.forEach(function(item){
                    jokesOutput += `
                        <li>${item.value}</li>
                    `;
                });
            } else {
                jokesOutput += `<li>Something went wrong</li>`;
            }
            UL_EL.innerHTML = jokesOutput;
        }
    };

    XHR.send();
    e.preventDefault();
}

function clearInput() {
    UL_EL.innerHTML = '';
  };
