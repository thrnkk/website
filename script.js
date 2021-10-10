$(document).ready(() => {

    let name = 'Thomas Ricardo Reinke';

    let splitName;
    let strangeChars = ['א','ב','ג','ד','ה','ו','ז','ח','ט','י','כ','ל','מ','נ','ס','ע','פ','צ','ק','ר','ש','ת','?','.','?','?'];
    let promisesArray = [];

    setInterval(() => {

        splitName = name.split('');

        for (let index = 0; index < splitName.length; index++) {

            if (splitName[index] == ' ') {
                continue;
            } else {

                promisesArray.push(teste(index, splitName[index]).then((response) => {
                    splitName[response['position']] = response['original'];
                }));

            }
        }

        Promise.all(promisesArray).then(() => {

            $('#glitch').text(name);

        });

    }, 5000);

    async function teste(position, originalChar) {

        await new Promise(resolve => setTimeout(resolve, Math.floor(Math.random() * (2000))));

        return new Promise((resolve, reject) => {

            let count = 0;
            let limit = Math.floor(Math.random() * (100)) + 10;
            let speed = 0;
            let interval = setInterval(() => {
    
                if (count >= limit) {
                    resolve({'position': position, 'original': originalChar});
                    clearInterval(interval);
                    
                }

                let newChar = strangeChars[strangeChars.length * Math.random() | 0];
                splitName[position] = newChar;

                $('#glitch').text(splitName.join(''));

                count++;
        
            }, 10);
        });
    }

    function delay(ms) {
        return 
    }

});